// ===== Auth guard (frontend-only) =====
const authRaw = localStorage.getItem("ws_auth");
if (!authRaw) window.location.href = "index.html";

let auth;
try {
  auth = JSON.parse(authRaw);
} catch {
  localStorage.removeItem("ws_auth");
  window.location.href = "index.html";
}

// Set email on profile section
const emailEl = document.getElementById("userEmail");
if (emailEl) emailEl.textContent = auth?.email || "user@email";

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Mobile nav toggle =====
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle?.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
});

// Close nav when click a link (mobile)
document.querySelectorAll('.ws-link').forEach(a => {
  a.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

// ===== Logout =====
document.getElementById("logoutBtn")?.addEventListener("click", () => {
  localStorage.removeItem("ws_auth");
  window.location.href = "index.html";
});

// ===== Slider (hero right) =====
const slides = Array.from(document.querySelectorAll(".ws-slide"));
const dotsWrap = document.getElementById("dots");
let idx = 0;

function renderDots() {
  dotsWrap.innerHTML = "";
  slides.forEach((_, i) => {
    const d = document.createElement("div");
    d.className = "ws-dot" + (i === idx ? " is-on" : "");
    d.addEventListener("click", () => go(i));
    dotsWrap.appendChild(d);
  });
}

function go(i){
  idx = (i + slides.length) % slides.length;
  slides.forEach((s, k) => s.classList.toggle("is-active", k === idx));
  renderDots();
}

document.getElementById("prevSlide")?.addEventListener("click", () => go(idx - 1));
document.getElementById("nextSlide")?.addEventListener("click", () => go(idx + 1));

renderDots();
go(0);

// Auto slide (demo)
setInterval(() => go(idx + 1), 4500);

// ===== Simple search (demo) =====
document.getElementById("buyBtn")?.addEventListener("click", () => {
  alert("Paket belum diaktifkan (demo UI).");
});

document.getElementById("searchInput")?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const q = e.target.value.trim();
    alert(q ? `Cari: "${q}" (demo)` : "Ketik kata kunci dulu.");
  }
});
