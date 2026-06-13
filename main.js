let tools = [];
let mainLayout = "";


function getAsset(path) {
  if (typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.getURL) {
    return chrome.runtime.getURL(path);
  }
  return path;
}
/* =========================
   LOAD TOOLS
========================= */

async function loadTools() {

  try {

    // const res = await fetch(getAsset("./tools.json"));
    const res = await fetch(getAsset("tools.json"));
    const toolPaths = await res.json();

    for (const path of toolPaths) {

      const tool = await fetch(getAsset(path)).then(r => r.json());
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

      const res = await fetch(getAsset(`tools/${id}/index.html`));

      if (!res.ok) {
        document.getElementById("app").innerHTML = "<h3>Tool not found</h3>";
        return;
      }

      const html = await res.text();

      // Parse full HTML tool
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      // Inject body only

      document.querySelectorAll(".tool-script").forEach(el => el.remove());
      document.querySelectorAll(".tool-style").forEach(el => el.remove());
      const app = document.getElementById("app");
      app.innerHTML = "";

      // 🔥 TOOL WRAPPER
      const wrapper = document.createElement("div");
      wrapper.className = "tool-root";
      wrapper.innerHTML = doc.body.innerHTML;

      // 🔥 CLOSE BUTTON
      const closeBtn = document.createElement("button");
      closeBtn.innerText = "✖";
      closeBtn.className = "close-floating";

      closeBtn.addEventListener("click", () => {

        const isExtension =
          typeof chrome !== "undefined" &&
          chrome.runtime &&
          chrome.runtime.id;

        if (isExtension) {
          location.hash = "#/";
        } else {
          history.back();
        }

      });

      // append
      app.appendChild(wrapper);
      app.appendChild(closeBtn);
      /* =========================
         LOAD TOOL CSS
      ========================= */

      doc.querySelectorAll("link[rel='stylesheet']").forEach(link => {

        const css = document.createElement("link");
        css.rel = "stylesheet";
        // css.href = `tools/${id}/${link.getAttribute("href")}`;
        css.href = getAsset(`tools/${id}/${link.getAttribute("href")}`);
        css.classList.add("tool-style");
        document.head.appendChild(css);

      });

      /* =========================
         LOAD TOOL SCRIPTS
      ========================= */

      doc.querySelectorAll("script").forEach(s => {

        const script = document.createElement("script");

        if (s.src) {
          script.src = getAsset(`tools/${id}/${s.getAttribute("src")}`);
          script.defer = true;
          script.classList.add("tool-script");
        } else {
          console.warn("Inline scripts are not allowed in extension");
        }

        document.body.appendChild(script);

      });
    } catch {

      document.getElementById("app").innerHTML = "<h3>Tool not found</h3>";

    }

  }

  else if (hash === "#/favorites") {
    if (!tools.length) {
      document.getElementById("app").innerHTML = "<p>Loading tools...</p>";
      return;
    }
    document.getElementById("app").innerHTML = mainLayout;

    renderTools();
    renderFavorites();

    setTimeout(() => {
      showSection("favorites");
    }, 0);

  }

  // DEFAULT PAGE
  else {
    if (!tools.length) {
      document.getElementById("app").innerHTML = "<p>Loading tools...</p>";
      return;
    }
    setTimeout(() => {
      showSection("tools");
    }, 0);
    document.getElementById("app").innerHTML = mainLayout;

    renderTools();
    renderFavorites();

  }

}

/* =========================
   NAVIGATION
========================= */

function bindNavigation() {
  const toolsBtn = document.getElementById("nav-tools");
  const favBtn = document.getElementById("nav-favorites");

  const mobTools = document.getElementById("mob-tools");
  const mobFav = document.getElementById("mob-favorites");

  if (toolsBtn) toolsBtn.addEventListener("click", () => {
    location.hash = "#/";
  });

  if (favBtn) favBtn.addEventListener("click", () => {
    location.hash = "#/favorites";
  });

  if (mobTools) mobTools.addEventListener("click", () => {
    location.hash = "#/";
  });

  if (mobFav) mobFav.addEventListener("click", () => {
    location.hash = "#/favorites";
  });
}

function showSection(section) {

  document.getElementById("tools").style.display = "none";
  document.getElementById("favorites").style.display = "none";

  document.getElementById(section).style.display = "block";

  const navTools = document.getElementById("nav-tools");
  const navFav = document.getElementById("nav-favorites");

  if (section === "tools") {
    navTools.classList.add("active");
    navFav.classList.remove("active");
  } else {
    navFav.classList.add("active");
    navTools.classList.remove("active");
  }
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

    // ICON
    const icon = document.createElement("img");
    icon.className = "card-icon";
    const isValidPath = tool.icon && tool.icon.includes("/");

    const iconPath = isValidPath
      ? getAsset(tool.icon)
      : getAsset("assets/icons/tool.svg");
    icon.src = iconPath;
    icon.onerror = () => {
      icon.src = getAsset("assets/icons/tool.svg");
    };

    // TEXT
    const text = document.createElement("div");
    text.className = "card-text";

    const title = document.createElement("div");
    title.className = "title";
    title.innerText = tool.name;

    const subtitle = document.createElement("div");
    subtitle.className = "subtitle";
    subtitle.innerText = tool.description || "Tool Details";

    text.appendChild(title);
    text.appendChild(subtitle);

    // ❤️ HEART (FILLED SVG)
    const favIcon = document.createElement("div");
    favIcon.className = "fav-icon";

    favIcon.innerHTML = `
      <svg class="heart" viewBox="0 0 24 24">
        <path d="m7 3.4c-1.5355 0-3.0784 0.5-4.25 1.7-2.3431 2.4-2.2788 6.1 0 8.5l9.25 9.8 9.25-9.8c2.279-2.4 2.343-6.1 0-8.5-2.343-2.3-6.157-2.3-8.5 0l-0.75 0.8-0.75-0.8c-1.172-1.2-2.7145-1.7-4.25-1.7z"/>
      </svg>
    `;

    if (favs.includes(tool.id)) {
      favIcon.classList.add("active");
    }

    favIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFavorite(tool.id);
    });

    card.appendChild(icon);
    card.appendChild(text);
    card.appendChild(favIcon);

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

      const icon = document.createElement("img");
      icon.className = "card-icon";

      const iconPath = tool.icon
        ? getAsset(tool.icon)
        : getAsset("assets/icons/tool.svg");

      icon.src = iconPath;
      icon.onerror = () => {
        icon.src = getAsset("assets/icons/tool.svg");
      };

      const text = document.createElement("div");
      text.className = "card-text";

      const title = document.createElement("div");
      title.className = "title";
      title.innerText = tool.name;

      const subtitle = document.createElement("div");
      subtitle.className = "subtitle";
      subtitle.innerText = tool.description || "Tool Details";

      text.appendChild(title);
      text.appendChild(subtitle);

      // ❤️ HEART
      const favIcon = document.createElement("div");
      favIcon.className = "fav-icon";

      favIcon.innerHTML = `
        <svg class="heart" viewBox="0 0 24 24">
          <path d="m7 3.4c-1.5355 0-3.0784 0.5-4.25 1.7-2.3431 2.4-2.2788 6.1 0 8.5l9.25 9.8 9.25-9.8c2.279-2.4 2.343-6.1 0-8.5-2.343-2.3-6.157-2.3-8.5 0l-0.75 0.8-0.75-0.8c-1.172-1.2-2.7145-1.7-4.25-1.7z"/>
        </svg>
      `;

      if (favs.includes(tool.id)) {
        favIcon.classList.add("active");
      }

      favIcon.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleFavorite(tool.id);
      });

      card.appendChild(icon);
      card.appendChild(text);
      card.appendChild(favIcon);

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
const isExtension =
  typeof chrome !== "undefined" &&
  chrome.runtime &&
  chrome.runtime.id;

if (!isExtension && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("service-worker.js")
      .then(reg => console.log("SW registered:", reg.scope))
      .catch(err => console.log("SW error:", err));
  });
}


/* =========================
   START APP
========================= */

async function startApp() {

  await loadTools();

  if (isExtension) {
    document.body.classList.add("extension-mode");
  }

  mainLayout = document.getElementById("app").innerHTML;
  bindNavigation();

  router();

}

startApp();