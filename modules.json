/* PRO-ESPACE — HUB PRO (JSON)
   - charge ./modules.json
   - filtre + recherche
   - ouvre les modules via pin.html (avec slug si présent)
*/

const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

const STORAGE_PHONE = "DIGIY_HUB_PHONE"; // si tu veux passer phone
const STORAGE_SLUG  = "DIGIY_PRO_SLUG";  // optionnel si tu veux mémoriser slug côté pro-espace

let MODULES = [];
const MODULES_JSON_URL = "./modules.json";

const state = {
  q: "",
  status: "all" // all | live | nouveau | priorite | beta...
};

function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, m => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[m]));
}

function getPhone(){
  try { return (localStorage.getItem(STORAGE_PHONE) || "").trim(); }
  catch(_){ return ""; }
}

function getSlugFromUrl(){
  try { return (new URL(location.href)).searchParams.get("slug") || ""; }
  catch(_){ return ""; }
}

function getSlug(){
  // priorité URL > localStorage
  const u = getSlugFromUrl();
  if (u) return u.trim();
  try { return (localStorage.getItem(STORAGE_SLUG) || "").trim(); }
  catch(_){ return ""; }
}

function withParam(url, k, v){
  if (!url) return "";
  if (!v) return url;
  try{
    const u = new URL(url);
    u.searchParams.set(k, v);
    return u.toString();
  }catch(_){
    const sep = url.includes("?") ? "&" : "?";
    return url + sep + encodeURIComponent(k) + "=" + encodeURIComponent(v);
  }
}

async function loadModules(){
  const r = await fetch(`${MODULES_JSON_URL}?v=${Date.now()}`, { cache:"no-store" });
  if (!r.ok) throw new Error(`modules.json HTTP ${r.status}`);
  const j = await r.json();
  const arr = Array.isArray(j.modules) ? j.modules : [];
  MODULES = arr.filter(Boolean).map(m => ({
    key: String(m.key||"").trim(),
    name: String(m.name||"").trim(),
    icon: m.icon || "∞",
    tag: String(m.tag||"").trim(),
    desc: String(m.desc||"").trim(),
    kind: "pro",
    status: String(m.status||"").trim(),
    statusLabel: String(m.statusLabel||"").trim(),
    phoneParam: !!m.phoneParam,
    directUrl: String(m.directUrl||"").trim()
  })).filter(m => m.key && m.name && m.directUrl);
}

function badgeHTML(status, label){
  const cls = status || "soon";
  const txt = label || (status ? status.toUpperCase() : "—");
  return `<span class="badge ${escapeHtml(cls)}">${escapeHtml(txt)}</span>`;
}

function cardHTML(m){
  return `
  <div class="card" data-key="${escapeHtml(m.key)}" tabindex="0" role="button" aria-label="${escapeHtml(m.name)}">
    <div class="cardTop">
      <div class="icon">${escapeHtml(m.icon)}</div>
      <div style="flex:1;min-width:0">
        <div class="cardTitle">${escapeHtml(m.name)}</div>
        <div class="cardTag">${escapeHtml(m.tag)}</div>
        <div class="cardDesc">${escapeHtml(m.desc)}</div>
        <div class="badges">${badgeHTML(m.status, m.statusLabel)}</div>
      </div>
    </div>
    <div class="cardActions">
      <button class="btn primary" data-action="open" type="button">Entrer →</button>
      <button class="btn" data-action="copy" type="button">Copier lien</button>
    </div>
  </div>`;
}

function filtered(){
  const q = (state.q||"").trim().toLowerCase();
  return MODULES.filter(m => {
    if (state.status !== "all" && m.status !== state.status) return false;
    if (!q) return true;
    const hay = [m.key,m.name,m.tag,m.desc,m.status,m.statusLabel].join(" ").toLowerCase();
    return hay.includes(q);
  });
}

function openModule(m){
  const phone = getPhone();
  const slug  = getSlug();

  // ✅ ouvrir direct le PIN du module
  let url = m.directUrl;

  // slug > phone (slug c’est l’identité du lieu/pro)
  if (slug) url = withParam(url, "slug", slug);
  else if (m.phoneParam && phone) url = withParam(url, "phone", phone);

  // mémorise slug si présent dans l’URL (pratique)
  if (slug) {
    try { localStorage.setItem(STORAGE_SLUG, slug); } catch(_){}
  }

  window.location.href = url;
}

function render(){
  const grid = $("#modulesGrid");
  if (!grid) return;

  const list = filtered();
  grid.innerHTML = list.length ? list.map(cardHTML).join("") : `<div class="empty">Aucun module PRO trouvé.</div>`;

  $$(".card", grid).forEach(card => {
    const key = card.getAttribute("data-key");
    const m = MODULES.find(x => x.key === key);
    if (!m) return;

    card.addEventListener("click", (e) => {
      const btn = e.target?.closest?.("button");
      if (btn?.dataset?.action === "copy") {
        e.preventDefault();
        const slug = getSlug();
        const phone = getPhone();
        let link = m.directUrl;
        if (slug) link = withParam(link, "slug", slug);
        else if (m.phoneParam && phone) link = withParam(link, "phone", phone);
        navigator.clipboard?.writeText(link).catch(()=>{});
        alert("Copié ✅\n" + link);
        return;
      }
      openModule(m);
    });

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModule(m);
      }
    });
  });
}

async function boot(){
  // search
  $("#searchInput")?.addEventListener("input", (e) => { state.q = e.target.value; render(); });

  // status filter (si tu as des boutons)
  $$(".tab").forEach(btn => {
    btn.addEventListener("click", () => {
      $$(".tab").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.status = btn.dataset.status || "all";
      render();
    });
  });

  await loadModules();
  render();
}

document.addEventListener("DOMContentLoaded", boot);
