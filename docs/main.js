const tools = [
  {
    id: "epoch",
    name: "Epoch → IST Converter"
  }
];

// Navigation
function showSection(section) {
  document.getElementById("tools").style.display = "none";
  document.getElementById("favorites").style.display = "none";
  document.getElementById(section).style.display = "block";

  renderTools();
  renderFavorites();
}

// Favorites
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

// Render Tools
function renderTools() {
  const container = document.getElementById("toolContainer");
  container.innerHTML = "";
  const favs = getFavorites();

  tools.forEach(tool => {
    const card = document.createElement("div");
    card.className = "card";
    card.onclick = () => openTool(tool.id);

    card.innerHTML = `
      <span class="fav-icon" onclick="event.stopPropagation(); toggleFavorite('${tool.id}')">
        ${favs.includes(tool.id) ? "⭐" : "☆"}
      </span>
      <h4>${tool.name}</h4>
    `;

    container.appendChild(card);
  });
}

// Render Favorites
function renderFavorites() {
  const container = document.getElementById("favContainer");
  container.innerHTML = "";
  const favs = getFavorites();

  tools
    .filter(tool => favs.includes(tool.id))
    .forEach(tool => {
      const card = document.createElement("div");
      card.className = "card";
      card.onclick = () => openTool(tool.id);

      card.innerHTML = `
        <span class="fav-icon" onclick="event.stopPropagation(); toggleFavorite('${tool.id}')">
          ⭐
        </span>
        <h4>${tool.name}</h4>
      `;

      container.appendChild(card);
    });
}

// Modal
function openTool() {
  resetTool();
  document.getElementById("toolModal").style.display = "flex";
}

function closeTool() {
  document.getElementById("toolModal").style.display = "none";
  resetTool();
}

// Reset Tool
function resetTool() {
  document.getElementById("epochInput").value = "";
  document.getElementById("result").innerText = "";
  document.getElementById("resultBox").style.display = "none";
}

// Convert
function convertEpoch() {
  const epoch = document.getElementById("epochInput").value;

  if (!epoch) {
    document.getElementById("result").innerText = "Enter valid epoch.";
    document.getElementById("resultBox").style.display = "block";
    return;
  }

  const date = new Date(epoch * 1000);
  const ist = date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  document.getElementById("result").innerText = ist;
  document.getElementById("resultBox").style.display = "block";
}

// Copy Result
function copyResult() {
  const text = document.getElementById("result").innerText;
  navigator.clipboard.writeText(text);
  alert("Copied!");
}

// Close on outside click
window.onclick = function(event) {
  const modal = document.getElementById("toolModal");
  if (event.target === modal) {
    closeTool();
  }
};

// Escape key close
document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    closeTool();
  }
}); 
function clearTool() {
  resetTool();
}
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then(reg => console.log("✅ SW Registered:", reg.scope))
      .catch(err => console.error("❌ SW Error:", err));
  });
}

// Initial Render
renderTools();
renderFavorites();



//   "icons": [
//     {
//       "src": "icon-192.png",
//       "sizes": "192x192",
//       "type": "image/png",
//       "purpose": "any"
//     },
//     {
//       "src": "icon-512.png",
//       "sizes": "512x512",
//       "type": "image/png",
//       "purpose": "any"
//     }
//   ],

//   "screenshots": [
//     {
//       "src": "screenshot-wide.png",
//       "sizes": "1366x768",
//       "type": "image/png",
//       "form_factor": "wide"
//     },
//     {
//       "src": "screenshot-mobile.png",
//       "sizes": "320x512",
//       "type": "image/png"
//     }
//   ]