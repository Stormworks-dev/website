package telemetry

import (
	"encoding/binary"
	"io"
	"os"
)

func readMeta(file *os.File) (int64, error) {
	var buf [8]byte

	_, err := io.ReadFull(file, buf[:])
	if err != nil {
		return 0, err
	}

	return int64(binary.LittleEndian.Uint64(buf[:])), nil
}

func writeMeta(file *os.File, timestamp int64) error {
	var buf [8]byte

	binary.LittleEndian.PutUint64(buf[:], uint64(timestamp))

	if _, err := file.WriteAt(buf[:], 0); err != nil {
		return err
	}

	return file.Sync()
}
