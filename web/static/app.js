const releases = document.querySelector(".releases");
if (releases) {
  const sidebar = document.querySelector(".releases-sidebar");
  const toggle = document.querySelector(".sidebar-toggle");

  toggle.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
    toggle.textContent = sidebar.classList.contains("collapsed") ? "+" : "−";
  });

  const articles = releases.querySelectorAll(".release");
  const links = releases.querySelectorAll(".release-nav a");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const id = entry.target.id;

        links.forEach((link) => {
          link.classList.toggle("current", link.hash === `#${id}`);
        });
      });
    },
    {
      rootMargin: "0px 0px -90% 0px",
    },
  );

  articles.forEach((article) => {
    observer.observe(article);
  });
}
