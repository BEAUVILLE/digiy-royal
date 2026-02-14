/* DIGIY HUB F16 ENHANCED — Business-ready • Data-driven • 0% commission
   ✅ MODULES définis en dur (plus besoin de modules.json)
*/

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const STORAGE_PHONE  = "DIGIY_HUB_PHONE";
const STORAGE_FILTER = "DIGIY_HUB_FILTER";
const STORAGE_SEARCH = "DIGIY_HUB_SEARCH";

const state = {
  phone: "",
  filter: "all", // all | public | pro
  q: ""
};

/* =========================
   LINKS (SOUS-DOMAINES OFFICIELS)
   ========================= */
const LINKS = {
  digiylyfe:    "https://digiylyfe.com/",
  apps:         "https://apps.digiylyfe.com/",
  admin:        "https://admin.digiylyfe.com/",
  tarifs:       "https://tarifs.digiylyfe.com/",

  // ✅ "Vas chez DIGIY"
  vasChezDigiy: "https://vas-chez-digiy.digiylyfe.com/",

  // NDIMBAL
  ndimbalMap:       "https://ndimbal-map.digiylyfe.com/",
  ndimbalAnnonces:  "https://ndimbal-annonces.digiylyfe.com/",
  ndimbalLoc:       "https://ndimbal-loc.digiylyfe.com/",

  // ✅ HubDrive = NDIMBAL annonces
  hubDrive:     "https://ndimbal-annonces.digiylyfe.com/",

  // Public
  bonneAffaire: "https://bonne-affaire.digiylyfe.com/",
  driverClient: "https://driver-client.digiylyfe.com/",
  loc:          "https://loc.digiylyfe.com/",
  resto:        "https://resto.digiylyfe.com/",
  build:        "https://build.digiylyfe.com/",
  explore:      "https://explore.digiylyfe.com/",
  market:       "https://market.digiylyfe.com/",
  jobs:         "https://jobs.digiylyfe.com/",
  pay:          "https://pay.digiylyfe.com/",
  resaTable:    "https://resa-table-resto.digiylyfe.com/",

  // GitHub
  notable:      "https://beauville.github.io/digiy-notable/",

  // PRO
  inscriptionPro: "https://inscription-pro.digiylyfe.com/",
  espacePro:      "https://pro-espace.digiylyfe.com/",

  // Modules PRO dédiés
  driverPro:    "https://pro-driver.digiylyfe.com/",
  locPro:       "https://pro-loc.digiylyfe.com/",
  caissePro:    "https://pro-caisse.digiylyfe.com/",
  buildPro:     "https://pro-build.digiylyfe.com/",
  marketPro:    "https://pro-market.digiylyfe.com/",
  jobsPro:      "https://pro-job.digiylyfe.com/",
  restoPro:     "https://pro-resto.digiylyfe.com/",
  resaTablePro: "https://pro-resa-resto.digiylyfe.com/",
  payPro:       "https://pay.digiylyfe.com/",
  explorePro:   "https://explore.digiylyfe.com/",

  // FRET PIN direct
  fretClientProPin:     "https://pro-fret-client.digiylyfe.com/pin.html",
  fretChauffeurProPin:  "https://pro-fret-chauffeur.digiylyfe.com/pin.html"
};

const PRO_DEFAULT_URL = LINKS.espacePro;

/* =========================
   MODULES (définis en dur)
   ========================= */
const MODULES = [
  // === PUBLIC ===
  { key: "bonneAffaire", name: "Bonne Affaire", icon: "🎯", tag: "marketplace", desc: "Deals & offres", kind: "public", status: "live", statusLabel: "LIVE", phoneParam: false },
  { key: "driverClient", name: "DIGIY DRIVER", icon: "🚗", tag: "transport", desc: "Réserver ta course VTC", kind: "public", status: "live", statusLabel: "LIVE", phoneParam: true },
  { key: "loc", name: "DIGIY LOC", icon: "🏠", tag: "accommodation", desc: "Trouver un logement", kind: "public", status: "live", statusLabel: "LIVE", phoneParam: true },
  { key: "resto", name: "DIGIY RESTO", icon: "🍽️", tag: "restaurant", desc: "Commander à manger", kind: "public", status: "live", statusLabel: "LIVE", phoneParam: true },
  { key: "resaTable", name: "Résa Table", icon: "📅", tag: "reservation", desc: "Réserver une table", kind: "public", status: "live", statusLabel: "LIVE", phoneParam: true },
  { key: "build", name: "DIGIY BUILD", icon: "🏗️", tag: "services", desc: "Services de construction", kind: "public", status: "beta", statusLabel: "BETA", phoneParam: true },
  { key: "explore", name: "Explore", icon: "🗺️", tag: "discovery", desc: "Découvrir la région", kind: "public", status: "live", statusLabel: "LIVE", phoneParam: false },
  { key: "market", name: "DIGIY MARKET", icon: "🛍️", tag: "marketplace", desc: "Acheter/vendre", kind: "public", status: "live", statusLabel: "LIVE", phoneParam: true },
  { key: "jobs", name: "DIGIY JOBS", icon: "💼", tag: "emploi", desc: "Offres d'emploi", kind: "public", status: "live", statusLabel: "LIVE", phoneParam: true },
  { key: "pay", name: "DIGIY PAY", icon: "💳", tag: "paiement", desc: "Portefeuille digital", kind: "public", status: "live", statusLabel: "LIVE", phoneParam: true },
  { key: "notable", name: "Notable", icon: "📝", tag: "documentation", desc: "Blog & ressources", kind: "public", status: "live", statusLabel: "LIVE", phoneParam: false },
  
  // === NDIMBAL ===
  { key: "ndimbalMap", name: "NDIMBAL Map", icon: "🗺️", tag: "ndimbal", desc: "Carte des annonces", kind: "public", status: "live", statusLabel: "LIVE", phoneParam: true },
  { key: "ndimbalAnnonces", name: "NDIMBAL Annonces", icon: "📢", tag: "ndimbal", desc: "Hub Drive - Vendre", kind: "public", status: "live", statusLabel: "LIVE", phoneParam: true },
  { key: "ndimbalLoc", name: "NDIMBAL Loc", icon: "🏡", tag: "ndimbal", desc: "Locations NDIMBAL", kind: "public", status: "live", statusLabel: "LIVE", phoneParam: true },

  // === PRO ===
  { key: "inscriptionPro", name: "Inscription PRO", icon: "✍️", tag: "auth", desc: "Créer compte professionnel", kind: "pro", status: "live", statusLabel: "LIVE", phoneParam: true },
  { key: "espacePro", name: "Espace PRO", icon: "🏢", tag: "dashboard", desc: "Tableau de bord pro", kind: "pro", status: "live", statusLabel: "LIVE", phoneParam: true },
  { key: "driverPro", name: "DIGIY DRIVER PRO", icon: "🚗", tag: "vtc", desc: "Gérer ta flotte VTC", kind: "pro", status: "live", statusLabel: "LIVE", phoneParam: true },
  { key: "locPro", name: "DIGIY LOC PRO", icon: "🏠", tag: "properties", desc: "Gérer tes logements", kind: "pro", status: "live", statusLabel: "LIVE", phoneParam: true },
  { key: "restoPro", name: "DIGIY RESTO PRO", icon: "👨‍🍳", tag: "restaurant", desc: "Gérer ton resto", kind: "pro", status: "live", statusLabel: "LIVE", phoneParam: true },
  { key: "caissePro", name: "Caisse PRO", icon: "💰", tag: "pos", desc: "Point de vente", kind: "pro", status: "live", statusLabel: "LIVE", phoneParam: true },
  { key: "buildPro", name: "DIGIY BUILD PRO", icon: "🏗️", tag: "construction", desc: "Gérer chantiers", kind: "pro", status: "beta", statusLabel: "BETA", phoneParam: true },
  { key: "marketPro", name: "DIGIY MARKET PRO", icon: "🛍️", tag: "marketplace", desc: "Vendre sur market", kind: "pro", status: "live", statusLabel: "LIVE", phoneParam: true },
  { key: "jobsPro", name: "DIGIY JOBS PRO", icon: "💼", tag: "recruitement", desc: "Recruter", kind: "pro", status: "live", statusLabel: "LIVE", phoneParam: true },
  { key: "payPro", name: "DIGIY PAY PRO", icon: "💳", tag: "paiement", desc: "Gérer paiements", kind: "pro", status: "live", statusLabel: "LIVE", phoneParam: true },
  { key: "explorePro", name: "Explore PRO", icon: "🗺️", tag: "analytics", desc: "Analytics & stats", kind: "pro", status: "live", statusLabel: "LIVE", phoneParam: false },
  { key: "resaTablePro", name: "Résa Table PRO", icon: "📅", tag: "reservation", desc: "Gérer réservations", kind: "pro", status: "live", statusLabel: "LIVE", phoneParam: true }
];

/* =========================
   HELPERS
   ========================= */
function normPhone(p) {
  if (!p) return "";
  let s = String(p).trim();
  s = s.replace(/[^\d+]/g, "");
  if (s && !s.startsWith("+")) {
    if (s.startsWith("221")) s = "+" + s;
  }
  return s;
}

function withPhone(url, phone, param = "phone") {
  if (!url) return "";
  if (!phone) return url;
  try {
    const u = new URL(url);
    u.searchParams.set(param, phone);
    return u.toString();
  } catch (_) {
    const sep = url.includes("?") ? "&" : "?";
    return url + sep + encodeURIComponent(param) + "=" + encodeURIComponent(phone);
  }
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (m) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;",
    '"': "&quot;", "'": "&#039;"
  }[m]));
}

/* =========================
   MODAL
   ========================= */
const modal = {
  root: null,
  titleEl: null,
  textEl: null,
  okBtn: null,
  cancelBtn: null,
  _onOk: null,
  _onCancel: null,

  init() {
    this.root = $("#modal");
    this.titleEl = $("#modalTitle");
    this.textEl = $("#modalText");
    this.okBtn = $("#modalOk");
    this.cancelBtn = $("#modalCancel");
    if (!this.root) return;

    this.okBtn?.addEventListener("click", () => {
      this.hide();
      if (typeof this._onOk === "function") this._onOk();
    });
    this.cancelBtn?.addEventListener("click", () => {
      this.hide();
      if (typeof this._onCancel === "function") this._onCancel();
    });

    this.root.addEventListener("click", (e) => {
      if (e.target === this.root) this.hide();
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !this.root.classList.contains("hidden")) this.hide();
    });
  },

  show({ title, text, okText = "OK", cancelText = "Annuler", onOk = null, onCancel = null, hideCancel = false }) {
    if (!this.root) return;
    this.titleEl.textContent = title || "Info";
    this.textEl.innerHTML = text || "";
    this.okBtn.textContent = okText;
    this.cancelBtn.textContent = cancelText;
    this._onOk = onOk;
    this._onCancel = onCancel;
    this.cancelBtn.style.display = hideCancel ? "none" : "";
    this.root.classList.remove("hidden");
    this.root.setAttribute("aria-hidden", "false");
  },

  info({ title, text, okText = "OK" }) {
    this.show({ title, text, okText, hideCancel: true });
  },

  hide() {
    if (!this.root) return;
    this.root.classList.add("hidden");
    this.root.setAttribute("aria-hidden", "true");
    this._onOk = null;
    this._onCancel = null;
  }
};

/* =========================
   HUB OVERLAY
   ========================= */
const hub = {
  overlay: null,
  frame: null,
  backBtn: null,
  closeBtn: null,

  init() {
    this.overlay = $("#hubOverlay");
    this.frame = $("#hubFrame");
    this.backBtn = $("#hubBackBtn");
    this.closeBtn = $("#hubCloseBtn");
    if (!this.overlay || !this.frame) return;

    const close = () => this.close();
    this.closeBtn?.addEventListener("click", close);
    this.backBtn?.addEventListener("click", close);

    this.overlay.addEventListener("click", (e) => {
      if (e.target === this.overlay) close();
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !this.overlay.classList.contains("hidden")) close();
    });
  },

  open(url) {
    if (!url) return;
    this.frame.src = url;
    this.overlay.classList.remove("hidden");
    this.overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  },

  close() {
    if (!this.overlay) return;
    this.overlay.classList.add("hidden");
    this.overlay.setAttribute("aria-hidden", "true");
    this.frame.src = "about:blank";
    document.body.style.overflow = "";
  }
};

/* =========================
   UI REFS
   ========================= */
let modulesGridEl, phoneTextEl, searchInputEl;
let statTotalEl, statPublicEl, statProEl;

/* =========================
   FILTERS
   ========================= */
function setFilter(f) {
  state.filter = f;
  localStorage.setItem(STORAGE_FILTER, f);
  $$(".tab").forEach(btn => btn.classList.toggle("active", btn.dataset.filter === f));
  render();
}

function setSearch(q) {
  state.q = q;
  localStorage.setItem(STORAGE_SEARCH, q);
  render();
}

function getFilteredModules() {
  const q = (state.q || "").trim().toLowerCase();

  return MODULES.filter(m => {
    if (state.filter === "public" && m.kind !== "public") return false;
    if (state.filter === "pro" && m.kind !== "pro") return false;
    if (!q) return true;

    const hay = [m.key, m.name, m.tag, m.desc, m.kind, m.status, m.statusLabel].join(" ").toLowerCase();
    return hay.includes(q);
  });
}

function updateStats(filtered) {
  const total = filtered.length;
  const pub = filtered.filter(m => m.kind === "public").length;
  const pro = filtered.filter(m => m.kind === "pro").length;

  if (statTotalEl) statTotalEl.textContent = String(total);
  if (statPublicEl) statPublicEl.textContent = String(pub);
  if (statProEl) statProEl.textContent = String(pro);
}

/* =========================
   CARDS
   ========================= */
function badgeHTML(kind, status, statusLabel) {
  const kindBadge = `<span class="badge kind-${kind}">${kind === "pro" ? "PRO" : "PUBLIC"}</span>`;
  const st = status || "soon";
  const label = statusLabel || st.toUpperCase();
  const stBadge = `<span class="badge ${st}">${escapeHtml(label)}</span>`;
  return kindBadge + stBadge;
}

function getModuleUrl(m) {
  let base = m.directUrl || LINKS[m.key] || "";

  // fallback : si module PRO sans directUrl, on l'envoie vers le portail PRO
  if (m.kind === "pro" && !m.directUrl && !LINKS[m.key]) {
    base = PRO_DEFAULT_URL;
  }

  if (!base) return "";

  if (m.phoneParam && state.phone) {
    base = withPhone(base, state.phone, "phone");
  }
  return base;
}

function cardHTML(m) {
  const url = getModuleUrl(m);
  const disabled = !url;

  return `
    <div class="card" tabindex="0" role="button" aria-label="${escapeHtml(m.name)}" data-key="${escapeHtml(m.key)}">
      <div class="cardTop">
        <div class="icon">${escapeHtml(m.icon || "∞")}</div>
        <div style="flex:1;min-width:0">
          <div class="cardTitle">${escapeHtml(m.name)}</div>
          <div class="cardTag">${escapeHtml(m.tag || "")}</div>
          <div class="cardDesc">${escapeHtml(m.desc || "")}</div>

          <div class="badges">
            ${badgeHTML(m.kind, m.status, m.statusLabel)}
          </div>
        </div>
      </div>

      <div class="cardActions">
        <button class="btn ${disabled ? "disabled" : "primary"}" data-action="open" ${disabled ? "disabled" : ""} type="button">
          Ouvrir →
        </button>
        <button class="btn ${disabled ? "disabled" : ""}" data-action="copy" ${disabled ? "disabled" : ""} type="button">
          Copier lien
        </button>
      </div>
    </div>
  `;
}

/* =========================
   RENDER
   ========================= */
function renderGrid() {
  const grid = modulesGridEl;
  if (!grid) return;

  const filtered = getFilteredModules();
  grid.innerHTML = filtered.length
    ? filtered.map(cardHTML).join("")
    : `<div class="empty">
         Aucun module ne correspond à ta recherche frérot.<br>
         <small style="opacity:.75">Pierre par pierre on construit l'empire! 🔥</small>
       </div>`;

  $$(".card", grid).forEach(card => {
    card.addEventListener("click", (e) => {
      const btn = e.target?.closest?.("button");
      const key = card.getAttribute("data-key");
      const m = MODULES.find(x => x.key === key);
      if (!m) return;

      if (btn && btn.dataset.action === "copy") {
        e.preventDefault();
        e.stopPropagation();
        const link = getModuleUrl(m);
        if (!link) return;
        navigator.clipboard?.writeText(link).catch(() => {});
        modal.info({ title: "Copié ✅", text: `Lien copié.<br><small>${escapeHtml(link)}</small>` });
        return;
      }

      openModule(key);
    });

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModule(card.getAttribute("data-key"));
      }
    });
  });

  updateStats(filtered);
}

function renderPhone() {
  if (!phoneTextEl) return;
  phoneTextEl.textContent = state.phone ? state.phone : "non mémorisé";
}

function render() {
  renderPhone();
  renderGrid();
}

/* =========================
   ACTIONS
   ========================= */
function openModule(key) {
  const m = MODULES.find(x => x.key === key);
  if (!m) return;

  const url = getModuleUrl(m);
  if (!url) {
    modal.info({
      title: "Module non disponible",
      text: "Lien non défini frérot."
    });
    return;
  }

  hub.open(url);
}

function askPhone() {
  modal.show({
    title: "Numéro (optionnel)",
    text:
      `Entre ton numéro (ex: <b>+221771234567</b>)<br>
       <small>Le HUB peut l'envoyer à certains modules.</small>
       <div style="margin-top:10px">
         <input id="phonePrompt"
           style="width:100%;padding:12px;border-radius:14px;border:1px solid rgba(148,163,184,.25);background:rgba(2,6,23,.18);color:#fff;outline:none"
           placeholder="+221..." value="${escapeHtml(state.phone)}"/>
       </div>`,
    okText: "Enregistrer",
    cancelText: "Annuler",
    onOk: () => {
      const inp = $("#phonePrompt");
      const val = normPhone(inp?.value || "");
      state.phone = val;
      localStorage.setItem(STORAGE_PHONE, val);
      render();
    }
  });

  setTimeout(() => $("#phonePrompt")?.focus(), 50);
}

/* =========================
   INIT
   ========================= */
function boot() {
  modulesGridEl = $("#modulesGrid");
  phoneTextEl   = $("#phoneText");
  searchInputEl = $("#searchInput");
  statTotalEl   = $("#statTotal");
  statPublicEl  = $("#statPublic");
  statProEl     = $("#statPro");

  modal.init();
  hub.init();

  // state load
  state.phone  = normPhone(localStorage.getItem(STORAGE_PHONE) || "");
  state.filter = localStorage.getItem(STORAGE_FILTER) || "all";
  state.q      = localStorage.getItem(STORAGE_SEARCH) || "";

  // phone buttons
  $("#btnEditPhone")?.addEventListener("click", askPhone);
  $("#btnClearPhone")?.addEventListener("click", () => {
    state.phone = "";
    localStorage.removeItem(STORAGE_PHONE);
    render();
  });

  // hero CTAs
  $("#btnGetHub")?.addEventListener("click", () => hub.open(withPhone(PRO_DEFAULT_URL, state.phone, "phone")));
  $("#btnDeals")?.addEventListener("click", () => hub.open(LINKS.bonneAffaire));

  // tabs
  $$(".tab").forEach(btn => btn.addEventListener("click", () => setFilter(btn.dataset.filter)));

  // search
  if (searchInputEl) {
    searchInputEl.value = state.q || "";
    searchInputEl.addEventListener("input", () => setSearch(searchInputEl.value));
  }

  $("#btnReset")?.addEventListener("click", () => {
    state.q = "";
    localStorage.removeItem(STORAGE_SEARCH);
    if (searchInputEl) searchInputEl.value = "";
    setFilter("all");
  });

  // brand scroll top
  $("#homeBrand")?.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ===========================
  // BOUTONS FLOTTANTS
  // ===========================
  const tarifBtn = $("#tarif-bubble-btn");
  const espaceBtn = $("#espace-pro-btn");
  const ndimbalHelpBtn = $("#digiy-help-btn");

  // 🏷️ Tarifs DIGIY
  if (tarifBtn) tarifBtn.addEventListener("click", () => hub.open(LINKS.tarifs));

  // 🧰 ESPACE PRO
  if (espaceBtn) espaceBtn.addEventListener("click", () => hub.open(withPhone(PRO_DEFAULT_URL, state.phone, "phone")));

  // ♾️ NDIMBAL - ouvrir popup
  if (ndimbalHelpBtn) {
    ndimbalHelpBtn.addEventListener("click", () => {
      const ndimbal = $("#digiy-ndimbal");
      if (ndimbal) {
        ndimbal.classList.remove("hidden");
        ndimbal.setAttribute("aria-hidden", "false");
      }
    });
  }

  // 📖 MANIFESTE - ouvrir dans nouvel onglet
  const manifestoBtn = document.getElementById('manifesto-bubble-btn');
  if (manifestoBtn) {
    manifestoBtn.addEventListener('click', () => {
      window.open('https://digiylyfe.net/la-revolution-digitale-africaine-sans-commission/', '_blank');
    });
  }

  // NDIMBAL - fermer
  $("#digiyCloseBtn")?.addEventListener("click", () => {
    const ndimbal = $("#digiy-ndimbal");
    if (ndimbal) {
      ndimbal.classList.add("hidden");
      ndimbal.setAttribute("aria-hidden", "true");
    }
  });

  // NDIMBAL - actions
  const ndimbalPopup = $("#digiy-ndimbal");
  if (ndimbalPopup) {
    ndimbalPopup.addEventListener("click", (e) => {
      if (e.target === ndimbalPopup) {
        ndimbalPopup.classList.add("hidden");
        ndimbalPopup.setAttribute("aria-hidden", "true");
        return;
      }

      const btn = e.target?.closest?.("button");
      if (!btn || !btn.dataset.action) return;

      const action = btn.dataset.action;

      ndimbalPopup.classList.add("hidden");
      ndimbalPopup.setAttribute("aria-hidden", "true");

      if (action === "sell") {
        hub.open(withPhone(LINKS.hubDrive, state.phone, "phone"));
      } else if (action === "job") {
        hub.open(withPhone(LINKS.jobs, state.phone, "phone"));
      } else if (action === "qr") {
        const qrModal = $("#qrModal");
        if (qrModal) {
          qrModal.classList.remove("hidden");
          qrModal.setAttribute("aria-hidden", "false");
        }
      }
    });
  }

  // QR Modal - fermer
  $("#qrClose")?.addEventListener("click", () => {
    const qrModal = $("#qrModal");
    if (qrModal) {
      qrModal.classList.add("hidden");
      qrModal.setAttribute("aria-hidden", "true");
    }
  });

  // QR Modal - fermer sur fond
  const qrModalPopup = $("#qrModal");
  if (qrModalPopup) {
    qrModalPopup.addEventListener("click", (e) => {
      if (e.target === qrModalPopup) {
        qrModalPopup.classList.add("hidden");
        qrModalPopup.setAttribute("aria-hidden", "true");
      }
    });
  }

  // apply tab active
  $$(".tab").forEach(btn => btn.classList.toggle("active", btn.dataset.filter === state.filter));

  render();
}

document.addEventListener("DOMContentLoaded", () => { boot(); });
