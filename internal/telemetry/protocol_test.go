package telemetry

import (
	"bytes"
	"encoding/json"
	"testing"
)

func TestProtocol(t *testing.T) {
	tests := []struct {
		name           string
		input          string
		event          Event
		timestampDelta uint64
		data           []byte
	}{
		{
			name:           "page served",
			input:          `{"type":0,"page":0}`,
			timestampDelta: 0,
			event: Event{
				Type: EventPageServed,
				Page: PageHome,
			},
			data: []byte{
				byte(EventPageServed),
				0,
				byte(PageHome),
			},
		},
		{
			name:           "view 5",
			input:          `{"type":1,"page":1}`,
			timestampDelta: 3,
			event: Event{
				Type: EventView5,
				Page: PageBlog,
			},
			data: []byte{
				byte(EventView5),
				3,
				byte(PageBlog),
			},
		},
		{
			name:           "read 30",
			input:          `{"type":2,"page":2}`,
			timestampDelta: 12,
			event: Event{
				Type: EventRead30,
				Page: PageReleases,
			},
			data: []byte{
				byte(EventRead30),
				12,
				byte(PageReleases),
			},
		},
		{
			name:           "link click",
			input:          `{"type":3,"page":0,"target":1}`,
			timestampDelta: 7,
			event: Event{
				Type:   EventLinkClick,
				Page:   PageHome,
				Target: TargetGitHub,
			},
			data: []byte{
				byte(EventLinkClick),
				7,
				byte(PageHome),
				byte(TargetGitHub),
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			var event Event

			if err := json.Unmarshal([]byte(tt.input), &event); err != nil {
				t.Fatal(err)
			}

			if err := event.Validate(); err != nil {
				t.Fatal(err)
			}

			if event != tt.event {
				t.Fatalf("decoded event = %+v, want %+v", event, tt.event)
			}

			got := Encode(event, tt.timestampDelta)

			if !bytes.Equal(got, tt.data) {
				t.Fatalf("encoded data = %v, want %v", got, tt.data)
			}
		})
	}
}
