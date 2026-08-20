package main

import (
	"html/template"
	"log"
	"net/http"
)

func main() {
	templates := template.Must(template.ParseFiles(
		"web/templates/layout.html",
		"web/templates/header.html",
		"web/templates/footer.html",
	))

	http.Handle("/static/", http.StripPrefix(
		"/static/",
		http.FileServer(http.Dir("web/static")),
	))

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		err := templates.ExecuteTemplate(w, "layout.html", nil)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	})

	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}
}
