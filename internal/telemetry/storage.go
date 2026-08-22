package telemetry

import (
	"encoding/binary"
	"errors"
	"os"
	"path/filepath"
	"time"
)

const (
	storageDir    = "data"
	telemetryBin  = "telemetry.bin"
	telemetryMeta = "telemetry.meta"
)

type Storage struct {
	bin           *os.File
	meta          *os.File
	lastTimestamp int64
}

func OpenStorage() (*Storage, error) {
	if err := os.MkdirAll(storageDir, 0755); err != nil {
		return nil, err
	}

	binPath := filepath.Join(storageDir, telemetryBin)
	metaPath := filepath.Join(storageDir, telemetryMeta)

	bin, err := os.OpenFile(binPath, os.O_RDWR|os.O_CREATE, 0644)
	if err != nil {
		return nil, err
	}

	meta, err := os.OpenFile(metaPath, os.O_RDWR|os.O_CREATE, 0644)
	if err != nil {
		bin.Close()
		return nil, err
	}

	storage := &Storage{
		bin:  bin,
		meta: meta,
	}

	if err := storage.initialize(); err != nil {
		bin.Close()
		meta.Close()
		return nil, err
	}

	return storage, nil
}

func (s *Storage) initialize() error {
	info, err := s.bin.Stat()
	if err != nil {
		return err
	}

	if info.Size() == 0 {
		now := time.Now().Unix()

		var buf [8]byte
		binary.LittleEndian.PutUint64(buf[:], uint64(now))

		if _, err := s.bin.Write(buf[:]); err != nil {
			return err
		}

		if err := s.bin.Sync(); err != nil {
			return err
		}

		if err := writeMeta(s.meta, now); err != nil {
			return err
		}

		s.lastTimestamp = now
		return nil
	}

	timestamp, err := readMeta(s.meta)
	if err != nil {
		return errors.New("failed to read telemetry metadata")
	}

	s.lastTimestamp = timestamp
	return nil
}

func (s *Storage) Append(event Event) error {
	now := time.Now().Unix()

	delta := uint64(now - s.lastTimestamp)

	data := Encode(event, delta)

	if _, err := s.bin.Seek(0, os.SEEK_END); err != nil {
		return err
	}

	if _, err := s.bin.Write(data); err != nil {
		return err
	}

	if err := s.bin.Sync(); err != nil {
		return err
	}

	if err := writeMeta(s.meta, now); err != nil {
		return err
	}

	s.lastTimestamp = now

	return nil
}

func (s *Storage) Close() error {
	binErr := s.bin.Close()
	metaErr := s.meta.Close()

	if binErr != nil {
		return binErr
	}

	return metaErr
}
