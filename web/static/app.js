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

  const updateCurrent = () => {
    const trigger = window.innerHeight * 0.3;
    let current = articles[0];

    articles.forEach((article) => {
      if (article.getBoundingClientRect().top <= trigger) {
        current = article;
      }
    });

    const id = current.id;

    links.forEach((link) => {
      link.classList.toggle("current", link.hash === `#${id}`);
    });
  };

  window.addEventListener("scroll", updateCurrent, { passive: true });
  updateCurrent();
}

const blog = document.querySelector(".blog");

if (blog) {
  const sidebar = document.querySelector(".blog-sidebar");
  const toggle = document.querySelector(".sidebar-toggle");

  toggle.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
    toggle.textContent = sidebar.classList.contains("collapsed") ? "+" : "−";
  });

  const articles = blog.querySelectorAll(".post");
  const links = blog.querySelectorAll(".blog-nav a");

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
