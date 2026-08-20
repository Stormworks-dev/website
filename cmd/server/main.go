package main

import (
	"html/template"
	"log"
	"net/http"
)

const port = ":8080"

func main() {
	http.Handle("/static/", http.StripPrefix(
		"/static/",
		http.FileServer(http.Dir("web/static")),
	))

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		page := selectPage(r.URL.Path)

		templates := template.Must(template.ParseFiles(
			"web/templates/layout.html",
			"web/templates/header.html",
			"web/templates/footer.html",
			page,
		))

		err := templates.ExecuteTemplate(w, "layout.html", nil)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	})

	if err := http.ListenAndServe(port, nil); err != nil {
		log.Fatal(err)
	}
}

func selectPage(path string) string {
	switch path {
	case "/":
		return "web/pages/home.html"
	case "/releases":
		return "web/pages/releases.html"
	default:
		return "web/pages/404.html"
	}
}
