// ===== Auth guard =====
const authRaw = localStorage.getItem("ws_auth");
if (!authRaw) window.location.href = "index.html";

let auth;
try { auth = JSON.parse(authRaw); }
catch { localStorage.removeItem("ws_auth"); window.location.href = "index.html"; }

// Tahun footer
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Logout
document.getElementById("logoutBtn")?.addEventListener("click", () => {
  localStorage.removeItem("ws_auth");
  window.location.href = "index.html";
});

// Burger (mobile)
document.getElementById("navToggle")?.addEventListener("click", () => {
  const menu = document.getElementById("navMenu");
  const isOpen = menu.classList.toggle("open");
  document.getElementById("navToggle").setAttribute("aria-expanded", isOpen ? "true" : "false");
});

// ===== Isi data demo =====
const email = auth?.email || "-";
document.getElementById("sideEmail") && (document.getElementById("sideEmail").textContent = email);
document.getElementById("emailText") && (document.getElementById("emailText").textContent = email);

const saved = JSON.parse(localStorage.getItem("ws_profile") || "{}");
const name = saved.name || "Wisma Student";
const phone = saved.phone || "-";

document.getElementById("sideName") && (document.getElementById("sideName").textContent = name);
document.getElementById("fullName") && (document.getElementById("fullName").textContent = name);
document.getElementById("phoneText") && (document.getElementById("phoneText").textContent = phone);

document.getElementById("cityText") && (document.getElementById("cityText").textContent = saved.city || "Online");
document.getElementById("targetText") && (document.getElementById("targetText").textContent = saved.target || "English Improvement");
document.getElementById("startDateText") && (document.getElementById("startDateText").textContent = saved.startDate || "—");
document.getElementById("lastLoginText") && (document.getElementById("lastLoginText").textContent =
  auth?.loginAt ? new Date(auth.loginAt).toLocaleString("id-ID") : "—"
);

// tombol edit demo
document.getElementById("editBtn")?.addEventListener("click", () => {
  alert("Edit Profile belum dihubungkan (frontend-only).");
});

// ====== SWITCH PANEL (ganti page) ======
const panels = Array.from(document.querySelectorAll(".ws-prof-panel"));
const tabs = Array.from(document.querySelectorAll(".ws-prof-tab"));
const sideLinks = Array.from(document.querySelectorAll(".ws-prof-nav"));
const sideProgress = document.getElementById("sideProgress");
const sideFiles = document.getElementById("sideFiles");


function setActiveTab(name){
  tabs.forEach(t => t.classList.toggle("active", t.dataset.tab === name));
}

function setActivePanel(name){
  panels.forEach(p => p.classList.toggle("is-active", p.dataset.panel === name));
}

function setActiveSide(name){
  sideLinks.forEach(a => a.classList.remove("active"));

  if (name === "overview"){
    sideLinks[0]?.classList.add("active");   // link Profile
  } else if (name === "progress"){
    sideProgress?.classList.add("active");
  } else if (name === "files"){
    sideFiles?.classList.add("active");
  }
}

function go(name){
  setActiveTab(name);
  setActivePanel(name);
  setActiveSide(name);
  // optional: pindahkan fokus ke judul agar terasa seperti pindah halaman
  document.querySelector(".ws-prof-title")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// klik tab
tabs.forEach(btn => {
  btn.addEventListener("click", () => go(btn.dataset.tab));
});

// klik sidebar progress => pindah panel progress (bukan scroll)
sideProgress?.addEventListener("click", (e) => {
  e.preventDefault();
  go("progress");
});

// klik sidebar files => pindah panel files (bukan scroll)
sideFiles?.addEventListener("click", (e) => {
  e.preventDefault();
  go("files");
});

// ===== hitung overall % (demo) =====
(function calcOverall(){
  const getPct = (id) => {
    const el = document.getElementById(id);
    if (!el) return 0;
    const w = (el.style.width || "0%").replace("%","");
    return parseInt(w, 10) || 0;
  };

  const avg = Math.round((getPct("pSD")+getPct("pSMP")+getPct("pSMA")+getPct("pTOEFL"))/4);
  const out = document.getElementById("overallPct");
  if (out) out.textContent = `${avg}%`;
})();

// default landing: overview
go("overview");
