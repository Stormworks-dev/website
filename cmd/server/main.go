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
	case "/tools/deAdditizer":
		return "web/pages/deAdditizer.html", "deAdditizer | Stormworks.dev"

	default:
		return "web/pages/404.html", "Page not found | Stormworks.dev"
	}
}
