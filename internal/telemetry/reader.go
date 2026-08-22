package telemetry

import (
	"encoding/binary"
	"io"
	"os"
)

const initializationTimestampSize = 8

type Record struct {
	Timestamp int64
	Event     Event
}

type Reader struct {
	file      *os.File
	timestamp int64
}

func OpenReader(path string) (*Reader, error) {
	file, err := os.Open(path)
	if err != nil {
		return nil, err
	}

	var buf [initializationTimestampSize]byte

	if _, err := io.ReadFull(file, buf[:]); err != nil {
		file.Close()
		return nil, err
	}

	return &Reader{
		file:      file,
		timestamp: int64(binary.LittleEndian.Uint64(buf[:])),
	}, nil
}

func (r *Reader) Next() (Record, error) {
	var typeBuf [1]byte

	if _, err := io.ReadFull(r.file, typeBuf[:]); err != nil {
		return Record{}, err
	}

	delta, err := binary.ReadUvarint(byteReader{file: r.file})
	if err != nil {
		return Record{}, err
	}

	r.timestamp += int64(delta)

	event := Event{
		Type: EventType(typeBuf[0]),
	}

	switch event.Type {
	case EventPageServed, EventView5, EventRead30:
		page, err := readByte(r.file)
		if err != nil {
			return Record{}, err
		}

		event.Page = Page(page)

	case EventLinkClick:
		page, err := readByte(r.file)
		if err != nil {
			return Record{}, err
		}

		target, err := readByte(r.file)
		if err != nil {
			return Record{}, err
		}

		event.Page = Page(page)
		event.Target = LinkTarget(target)

	case EventToolProcess:
		tool, err := readByte(r.file)
		if err != nil {
			return Record{}, err
		}

		inputBytes, err := binary.ReadUvarint(byteReader{file: r.file})
		if err != nil {
			return Record{}, err
		}

		outputBytes, err := binary.ReadUvarint(byteReader{file: r.file})
		if err != nil {
			return Record{}, err
		}

		processingMS, err := binary.ReadUvarint(byteReader{file: r.file})
		if err != nil {
			return Record{}, err
		}

		blocksChanged, err := binary.ReadUvarint(byteReader{file: r.file})
		if err != nil {
			return Record{}, err
		}

		blocksPreserved, err := binary.ReadUvarint(byteReader{file: r.file})
		if err != nil {
			return Record{}, err
		}

		event.Tool = Tool(tool)
		event.InputBytes = inputBytes
		event.OutputBytes = outputBytes
		event.ProcessingMS = processingMS
		event.BlocksChanged = blocksChanged
		event.BlocksPreserved = blocksPreserved

	default:
		return Record{}, os.ErrInvalid
	}

	if err := event.Validate(); err != nil {
		return Record{}, err
	}

	return Record{
		Timestamp: r.timestamp,
		Event:     event,
	}, nil
}

func (r *Reader) Close() error {
	return r.file.Close()
}

func readByte(r io.Reader) (byte, error) {
	var buf [1]byte

	_, err := io.ReadFull(r, buf[:])
	return buf[0], err
}

type byteReader struct {
	file *os.File
}

func (r byteReader) ReadByte() (byte, error) {
	var buf [1]byte

	_, err := io.ReadFull(r.file, buf[:])
	return buf[0], err
}
