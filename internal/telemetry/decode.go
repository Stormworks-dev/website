package telemetry

import (
	"encoding/json"
	"io"
)

func Decode(r io.Reader) (Event, error) {
	var event Event

	if err := json.NewDecoder(r).Decode(&event); err != nil {
		return Event{}, err
	}

	if err := event.Validate(); err != nil {
		return Event{}, err
	}

	return event, nil
}
