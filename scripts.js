// navbar.js
const navItems = [
  { text: "Home", href: "index.html" },
  { text: "Projects", href: "projects.html" },
  { text: "Articles", href: "articles.html" },
  { text: "Contact", href: "contact.html" },
];

const nav = document.getElementById("navbar");
const isInArticlesFolder = window.location.pathname.includes("/articles/");
const isArticlesPage = window.location.pathname.endsWith("/articles.html") || window.location.pathname.endsWith("/articles/");

// ---------- Navbar Creation ----------
const navContent = document.createElement("div");
navContent.className = "nav-content";

const navCenter = document.createElement("div");
navCenter.className = "nav-center";
const navList = document.createElement("ul");

navItems.forEach(({ text, href }) => {
  const link = document.createElement("a");
  link.textContent = text;
  link.href = isInArticlesFolder ? `../${href}` : href;

  const listItem = document.createElement("li");
  listItem.appendChild(link);
  navList.appendChild(listItem);
});

navCenter.appendChild(navList);
navContent.appendChild(navCenter);

const toggleButton = document.createElement("button");
toggleButton.id = "darkModeToggle";
navContent.appendChild(toggleButton);

function updateDarkModeUI(isDark) {
  document.body.classList.toggle("dark-mode", isDark);
  toggleButton.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
  updateLogo(isDark);
}

function applyDarkModeSetting() {
  const isDark = localStorage.getItem("darkMode") === "true";
  updateDarkModeUI(isDark);
}

toggleButton.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", isDark);
  updateDarkModeUI(isDark);
});

applyDarkModeSetting();
nav.appendChild(navContent);

function updateLogo(isDark) {
  const logo = document.getElementById("site-logo");
  if (logo) {
    logo.src = isDark ? "images/transparent_Adward.png" : "images/black_transparent_Adward.png";
  }
}

if (isArticlesPage) {
  const previewContainer = document.getElementById("article-preview");
  const basePath = isInArticlesFolder ? "" : "articles/";
  const articleFiles = [
    "AboutArticles.html"
  ];

  articleFiles.forEach(file => {
    const fullPath = `${basePath}${file}`;

    fetch(fullPath)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to load ${fullPath}`);
        return res.text();
      })
      .then(html => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        const title = doc.querySelector("h1#article-title");

        if (title) {
          const preview = document.createElement("div");
          preview.className = "article-entry";
          preview.innerHTML = `<h2><a href="${fullPath}">${title.textContent}</a></h2>`;
          previewContainer.appendChild(preview);
        }
      })
      .catch(err => console.error(`Error loading ${fullPath}:`, err));
  });
}