package telemetry

import (
	"encoding/binary"
	"io"
	"os"
	"path/filepath"
	"testing"
)

func TestReader(t *testing.T) {
	dir := t.TempDir()
	path := filepath.Join(dir, "telemetry.bin")

	start := int64(1_000)

	data := make([]byte, 0, 32)

	var timestamp [8]byte
	binary.LittleEndian.PutUint64(timestamp[:], uint64(start))
	data = append(data, timestamp[:]...)

	data = append(data,
		byte(EventPageServed),
		5,
		byte(PageHome),
	)

	data = append(data,
		byte(EventView5),
		10,
		byte(PageBlog),
	)

	data = append(data,
		byte(EventRead30),
		25,
		byte(PageReleases),
	)

	if err := os.WriteFile(path, data, 0644); err != nil {
		t.Fatal(err)
	}

	reader, err := OpenReader(path)
	if err != nil {
		t.Fatal(err)
	}
	defer reader.Close()

	tests := []struct {
		name      string
		timestamp int64
		event     Event
	}{
		{
			name:      "page served",
			timestamp: 1005,
			event: Event{
				Type: EventPageServed,
				Page: PageHome,
			},
		},
		{
			name:      "view 5",
			timestamp: 1015,
			event: Event{
				Type: EventView5,
				Page: PageBlog,
			},
		},
		{
			name:      "read 30",
			timestamp: 1040,
			event: Event{
				Type: EventRead30,
				Page: PageReleases,
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := reader.Next()
			if err != nil {
				t.Fatal(err)
			}

			if got.Timestamp != tt.timestamp {
				t.Fatalf("timestamp: got %d, want %d", got.Timestamp, tt.timestamp)
			}

			if got.Event != tt.event {
				t.Fatalf("event: got %+v, want %+v", got.Event, tt.event)
			}
		})
	}

	_, err = reader.Next()
	if err != io.EOF {
		t.Fatalf("got error %v, want io.EOF", err)
	}
}
