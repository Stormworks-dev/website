package telemetry

import (
	"io"
)

type Stats struct {
	Uses       uint64
	InputBytes uint64
}

func ReadStats(path string, tool Tool) (Stats, error) {
	reader, err := OpenReader(path)
	if err != nil {
		return Stats{}, err
	}
	defer reader.Close()

	var stats Stats

	for {
		record, err := reader.Next()

		if err == io.EOF {
			return stats, nil
		}

		if err != nil {
			return Stats{}, err
		}

		if record.Event.Type != EventToolProcess ||
			record.Event.Tool != tool {
			continue
		}

		stats.Uses++
		stats.InputBytes += record.Event.InputBytes
	}
}
