package main

import (
	"encoding/json"
	"html/template"
	"log"
	"net/http"

	"github.com/Stormworks-dev/website/internal/telemetry"
)

const port = ":8080"
const debug = true

func main() {
	if debug {
		log.Println("debug logging enabled")
	}

	storage, err := telemetry.OpenStorage()
	if err != nil {
		log.Fatal(err)
	}
	defer storage.Close()

	http.HandleFunc("/telemetry", telemetry.NewHandler(telemetry.HandlerConfig{
		Debug:   debug,
		Storage: storage,
	}))
	http.HandleFunc("/telemetry/config", telemetry.ConfigHandler)

	http.HandleFunc("/telemetry/stats", func(w http.ResponseWriter, r *http.Request) {
		stats, err := telemetry.ReadStats("data/telemetry.bin", telemetry.ToolVehicleOptimizer)
		if err != nil {
			http.Error(w, "failed to read telemetry stats", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")

		json.NewEncoder(w).Encode(struct {
			Uses    uint64  `json:"uses"`
			InputMB float64 `json:"input_mb"`
		}{
			Uses:    stats.Uses,
			InputMB: float64(stats.InputBytes) / 1024 / 1024,
		})
	})

	http.Handle("/static/", http.StripPrefix(
		"/static/",
		http.FileServer(http.Dir("web/static")),
	))

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if redirect, status, ok := redirectPage(r.URL.Path); ok {
			http.Redirect(w, r, redirect, status)
			return
		}

		page, title := selectPage(r.URL.Path)

		templates := template.Must(template.ParseFiles(
			"web/templates/layout.html",
			"web/templates/header.html",
			"web/templates/footer.html",
			page,
		))

		data := struct {
			Title string
		}{
			Title: title,
		}

		err := templates.ExecuteTemplate(w, "layout.html", data)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	})

	log.Println("server listening on port", port)
	if err := http.ListenAndServe(port, nil); err != nil {
		log.Fatal(err)
	}
}

func selectPage(path string) (string, string) {
	switch path {
	case "/":
		return "web/pages/home.html", "Stormworks.dev"
	case "/releases":
		return "web/pages/releases.html", "Releases | Stormworks.dev"
	case "/blog":
		return "web/pages/blog.html", "Blog | Stormworks.dev"
	case "/tools/vehicle-optimizer":
		return "web/pages/vehicle-optimizer.html", "Vehicle optimizer | Stormworks.dev"

	default:
		return "web/pages/404.html", "Page not found | Stormworks.dev"
	}
}

func redirectPage(path string) (string, int, bool) {
	switch path {
	case "/tools/deadditizer", "/tools/deAdditizer":
		return "/tools/vehicle-optimizer", http.StatusMovedPermanently, true

	case "/optimizer", "/vehicle-optimizer":
		return "/tools/vehicle-optimizer", http.StatusMovedPermanently, true
	}

	return "", 0, false
}
