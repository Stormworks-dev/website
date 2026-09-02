package telemetry

import "fmt"

type Event struct {
	Type EventType `json:"type"`

	Page   Page       `json:"page"`
	Target LinkTarget `json:"target"`

	Tool            Tool   `json:"tool"`
	InputBytes      uint64 `json:"input_bytes"`
	OutputBytes     uint64 `json:"output_bytes"`
	ProcessingMS    uint64 `json:"processing_ms"`
	BlocksChanged   uint64 `json:"blocks_changed"`
	BlocksPreserved uint64 `json:"blocks_preserved"`
}

func (e Event) Validate() error {
	if e.Type >= EventTypeCount {
		return fmt.Errorf("invalid event type: %d", e.Type)
	}

	switch e.Type {
	case EventPageServed, EventView5, EventRead30:
		if e.Page >= PageCount {
			return fmt.Errorf("invalid page: %d", e.Page)
		}

	case EventLinkClick:
		if e.Page >= PageCount {
			return fmt.Errorf("invalid page: %d", e.Page)
		}
		if e.Target >= LinkTargetCount {
			return fmt.Errorf("invalid link target: %d", e.Target)
		}

	case EventToolProcess:
		if e.Tool >= ToolCount {
			return fmt.Errorf("invalid tool: %d", e.Tool)
		}
	}

	return nil
}
