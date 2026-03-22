let tools = [];
let mainLayout = "";

/* =========================
   LOAD TOOLS
========================= */

async function loadTools() {

  try {

    const res = await fetch("./tools.json");
    const toolPaths = await res.json();

    for (const path of toolPaths) {

      const tool = await fetch(path).then(r => r.json());
      tools.push(tool);

    }

  } catch (err) {

    console.error("Tool loading error:", err);

  }

}
/* =========================
   ROUTER
========================= */

window.addEventListener("hashchange", router);

async function router() {

  const hash = location.hash;

  // TOOL PAGE
  if (hash.startsWith("#/tool/")) {

    const id = hash.split("/")[2];

    try {

      const res = await fetch(`tools/${id}/index.html`);

      if (!res.ok) {
        document.getElementById("app").innerHTML = "<h3>Tool not found</h3>";
        return;
      }

      const html = await res.text();

      // Parse full HTML tool
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      // Inject body only
      document.getElementById("app").innerHTML = doc.body.innerHTML;

      /* =========================
         LOAD TOOL CSS
      ========================= */

      doc.querySelectorAll("link[rel='stylesheet']").forEach(link => {

        const css = document.createElement("link");
        css.rel = "stylesheet";
        css.href = `tools/${id}/${link.getAttribute("href")}`;

        document.head.appendChild(css);

      });

      /* =========================
         LOAD TOOL SCRIPTS
      ========================= */

      doc.querySelectorAll("script").forEach(s => {

        const script = document.createElement("script");

        if (s.src) {
          script.src = `tools/${id}/${s.getAttribute("src")}`;
        } else {
          script.textContent = s.textContent;
        }

        document.body.appendChild(script);

      });

    } catch {

      document.getElementById("app").innerHTML = "<h3>Tool not found</h3>";

    }

  }

  else if (hash === "#/favorites") {

    document.getElementById("app").innerHTML = mainLayout;

    renderTools();
    renderFavorites();

    setTimeout(() => {
      showSection("favorites");
    }, 0);

  }

  // DEFAULT PAGE
  else {

    document.getElementById("app").innerHTML = mainLayout;

    renderTools();
    renderFavorites();

  }

}

/* =========================
   NAVIGATION
========================= */

function showSection(section) {

  document.getElementById("tools").style.display = "none";
  document.getElementById("favorites").style.display = "none";

  document.getElementById(section).style.display = "block";

}


/* =========================
   FAVORITES
========================= */

function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

function toggleFavorite(toolId) {

  let favs = getFavorites();

  if (favs.includes(toolId)) {
    favs = favs.filter(id => id !== toolId);
  } else {
    favs.push(toolId);
  }

  localStorage.setItem("favorites", JSON.stringify(favs));

  renderTools();
  renderFavorites();

}


/* =========================
   RENDER TOOLS
========================= */

function renderTools() {

  const container = document.getElementById("toolContainer");

  if (!container) return;

  container.innerHTML = "";

  const favs = getFavorites();

  tools.forEach(tool => {

    const card = document.createElement("div");
    card.className = "card";

    card.onclick = () => openTool(tool);

    card.innerHTML = `
      <span class="fav-icon"
        onclick="event.stopPropagation(); toggleFavorite('${tool.id}')">
        ${favs.includes(tool.id) ? "⭐" : "☆"}
      </span>

      <h4>${tool.icon || "🛠"} ${tool.name}</h4>
    `;

    container.appendChild(card);

  });

}


/* =========================
   RENDER FAVORITES
========================= */

function renderFavorites() {

  const container = document.getElementById("favContainer");

  if (!container) return;

  container.innerHTML = "";

  const favs = getFavorites();

  tools
    .filter(tool => favs.includes(tool.id))
    .forEach(tool => {

      const card = document.createElement("div");
      card.className = "card";

      card.onclick = () => openTool(tool);

      card.innerHTML = `
        <span class="fav-icon"
          onclick="event.stopPropagation(); toggleFavorite('${tool.id}')">
          ⭐
        </span>

        <h4>${tool.icon || "🛠"} ${tool.name}</h4>
      `;

      container.appendChild(card);

    });

}


/* =========================
   OPEN TOOL
========================= */

function openTool(tool) {

  location.hash = `/tool/${tool.id}`;

}


/* =========================
   SERVICE WORKER
========================= */

if ("serviceWorker" in navigator) {

  window.addEventListener("load", () => {

    navigator.serviceWorker
      .register("./service-worker.js")
      .then(reg => console.log("SW registered:", reg.scope))
      .catch(err => console.log("SW error:", err));

  });

}


/* =========================
   START APP
========================= */

async function startApp() {

  mainLayout = document.getElementById("app").innerHTML;

  await loadTools();

  router();

}

startApp();