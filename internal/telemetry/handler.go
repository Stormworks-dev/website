package telemetry

import (
	"encoding/json"
	"log"
	"net/http"
)

type HandlerConfig struct {
	Debug   bool
	Storage *Storage
}

func NewHandler(config HandlerConfig) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
			return
		}

		event, err := Decode(r.Body)
		if err != nil {
			http.Error(w, "invalid telemetry", http.StatusBadRequest)
			return
		}

		if err := event.Validate(); err != nil {
			http.Error(w, "invalid telemetry", http.StatusBadRequest)
			return
		}

		if err := config.Storage.Append(event); err != nil {
			http.Error(w, "failed to store telemetry", http.StatusInternalServerError)
			return
		}

		if config.Debug {
			logEvent(event)
		}

		w.WriteHeader(http.StatusNoContent)
	}
}

func ConfigHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	w.Header().Set("Content-Type", "application/json")

	if err := json.NewEncoder(w).Encode(BrowserConfig()); err != nil {
		http.Error(w, "failed to encode telemetry config", http.StatusInternalServerError)
	}
}

func logEvent(event Event) {
	switch event.Type {
	case EventPageServed:
		log.Printf("page served page=%s", event.Page)

	case EventView5:
		log.Printf("view 5 page=%s", event.Page)

	case EventRead30:
		log.Printf("read 30 page=%s", event.Page)

	case EventLinkClick:
		log.Printf("link clicked: page=%s target=%s", event.Page, event.Target)

	case EventToolProcess:
		log.Printf(
			"tool used: tool=%s input=%d output=%d processing=%dms changed=%d preserved=%d",
			event.Tool,
			event.InputBytes,
			event.OutputBytes,
			event.ProcessingMS,
			event.BlocksChanged,
			event.BlocksPreserved,
		)

	default:
		log.Printf("unknown event type=%d", event.Type)
	}
}
