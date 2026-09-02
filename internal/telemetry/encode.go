package telemetry

import "encoding/binary"

//varints use high bit to indicate continuation

func Encode(event Event, timestampDelta uint64) []byte {
	data := make([]byte, 0, 32)

	data = append(data, byte(event.Type))

	var buf [10]byte
	n := binary.PutUvarint(buf[:], timestampDelta)
	data = append(data, buf[:n]...)

	switch event.Type {
	case EventPageServed, EventView5, EventRead30:
		data = append(data, byte(event.Page))

	case EventLinkClick:
		data = append(data, byte(event.Page))
		data = append(data, byte(event.Target))

	case EventToolProcess:
		data = append(data, byte(event.Tool))

		n = binary.PutUvarint(buf[:], event.InputBytes)
		data = append(data, buf[:n]...)

		n = binary.PutUvarint(buf[:], event.OutputBytes)
		data = append(data, buf[:n]...)

		n = binary.PutUvarint(buf[:], event.ProcessingMS)
		data = append(data, buf[:n]...)

		n = binary.PutUvarint(buf[:], event.BlocksChanged)
		data = append(data, buf[:n]...)

		n = binary.PutUvarint(buf[:], event.BlocksPreserved)
		data = append(data, buf[:n]...)
	}

	return data
}
