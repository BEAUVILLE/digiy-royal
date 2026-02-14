/* modules.js — DIGIY ROYAL HUB
   - Centralise l'annuaire des modules (sans surcharger ROYAL)
   - Recherche + filtres + badges
   - Aucune dépendance
*/

export const DIGIY_MODULES = [
  // ✅ PRO (pilotes)
  {
    id: "loc-pro",
    name: "DIGIY LOC PRO",
    slug: "loc-pro",
    kind: "pro",
    status: "live",          // live | beta | off
    city: "Saly",
    tags: ["logement", "reservation", "vitrine", "cockpit"],
    url: "https://beauville.github.io/digiy-loc-pro/"
  },
  {
    id: "driver-pro",
    name: "DIGIY DRIVER PRO",
    slug: "driver-pro",
    kind: "pro",
    status: "beta",
    city: "Dakar",
    tags: ["chauffeur", "trajet", "0% commission", "cockpit"],
    url: "https://beauville.github.io/digiy-driver-pro/"
  },
  {
    id: "build-pro",
    name: "DIGIY BUILD PRO",
    slug: "build-pro",
    kind: "pro",
    status: "beta",
    city: "Dakar",
    tags: ["artisan", "devis", "chantier", "cockpit"],
    url: "https://beauville.github.io/digiy-build/"
  },

  // 🌍 HUB / vitrine
  {
    id: "royal",
    name: "DIGIY ROYAL",
    slug: "royal",
    kind: "hub",
    status: "live",
    city: "Global",
    tags: ["hub", "0% commission", "vitrine"],
    url: "https://beauville.github.io/digiy-royal/"
  },

  // ➕ Ajoute tes autres modules ici (market, explore, pay, jobs…)
];

function el(tag, attrs = {}, children = []) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") n.className = v;
    else if (k === "html") n.innerHTML = v;
    else if (k.startsWith("on") && typeof v === "function") n.addEventListener(k.slice(2), v);
    else n.setAttribute(k, v);
  }
  for (const c of children) n.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  return n;
}

function norm(s) {
  return (s || "").toString().toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

function badge(status) {
  const map = {
    live: { t: "LIVE", c: "digiy-badge digiy-live" },
    beta: { t: "BETA", c: "digiy-badge digiy-beta" },
    off:  { t: "OFF",  c: "digiy-badge digiy-off" },
  };
  const b = map[status] || { t: status?.toUpperCase() || "?", c: "digiy-badge" };
  return el("span", { class: b.c }, [b.t]);
}

function pill(text) {
  return el("span", { class: "digiy-pill" }, [text]);
}

function renderStyles(root) {
  // styles minimes, tu peux les migrer dans ton CSS si tu veux
  const css = `
  .digiy-wrap{max-width:1100px;margin:0 auto;padding:16px}
  .digiy-top{display:flex;gap:12px;flex-wrap:wrap;align-items:center;margin-bottom:14px}
  .digiy-input{flex:1;min-width:240px;padding:12px 12px;border-radius:12px;border:1px solid rgba(255,255,255,.14);background:rgba(0,0,0,.18);color:#fff;outline:none}
  .digiy-select{padding:12px;border-radius:12px;border:1px solid rgba(255,255,255,.14);background:rgba(0,0,0,.18);color:#fff;outline:none}
  .digiy-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px}
  .digiy-card{border-radius:16px;border:1px solid rgba(255,255,255,.14);background:rgba(0,0,0,.22);padding:14px;box-shadow:0 18px 55px rgba(0,0,0,.35)}
  .digiy-head{display:flex;justify-content:space-between;gap:10px;align-items:flex-start}
  .digiy-title{font-weight:800;letter-spacing:.2px}
  .digiy-sub{opacity:.8;font-size:.92rem;margin-top:6px}
  .digiy-row{display:flex;gap:6px;flex-wrap:wrap;margin-top:10px}
  .digiy-pill{font-size:.78rem;padding:6px 8px;border-radius:999px;border:1px solid rgba(255,255,255,.14);opacity:.9}
  .digiy-badge{font-size:.72rem;padding:6px 9px;border-radius:999px;font-weight:900;border:1px solid rgba(255,255,255,.14)}
  .digiy-live{background:rgba(34,197,94,.18)}
  .digiy-beta{background:rgba(250,204,21,.18)}
  .digiy-off{background:rgba(244,63,94,.14)}
  .digiy-btn{margin-top:12px;width:100%;padding:12px 12px;border-radius:14px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.08);color:#fff;font-weight:800;cursor:pointer}
  .digiy-btn:hover{background:rgba(255,255,255,.12)}
  .digiy-empty{opacity:.85;padding:14px;border-radius:14px;border:1px dashed rgba(255,255,255,.18)}
  `;
  const style = el("style", { html: css });
  root.appendChild(style);
}

export function mountModulesApp({
  targetId = "modulesApp",
  modules = DIGIY_MODULES,
  defaultKind = "all" // all | pro | client | hub
} = {}) {
  const target = document.getElementById(targetId);
  if (!target) throw new Error(`modules.js: container #${targetId} introuvable`);

  target.innerHTML = "";
  renderStyles(target);

  const state = {
    q: "",
    kind: defaultKind,
    status: "all",
    city: "all",
  };

  const qInput = el("input", {
    class: "digiy-input",
    placeholder: "Recherche : logement, chauffeur, artisan, pay, market…",
    oninput: (e) => { state.q = e.target.value; draw(); }
  });

  const kindSel = el("select", {
    class: "digiy-select",
    onchange: (e) => { state.kind = e.target.value; draw(); }
  }, [
    el("option", { value: "all" }, ["Tous"]),
    el("option", { value: "pro" }, ["PRO"]),
    el("option", { value: "client" }, ["CLIENT"]),
    el("option", { value: "hub" }, ["HUB"]),
  ]);
  kindSel.value = defaultKind;

  const statusSel = el("select", {
    class: "digiy-select",
    onchange: (e) => { state.status = e.target.value; draw(); }
  }, [
    el("option", { value: "all" }, ["Tous statuts"]),
    el("option", { value: "live" }, ["LIVE"]),
    el("option", { value: "beta" }, ["BETA"]),
    el("option", { value: "off" }, ["OFF"]),
  ]);

  const cities = Array.from(new Set(modules.map(m => m.city).filter(Boolean))).sort((a,b)=>a.localeCompare(b));
  const citySel = el("select", {
    class: "digiy-select",
    onchange: (e) => { state.city = e.target.value; draw(); }
  }, [
    el("option", { value: "all" }, ["Toutes villes"]),
    ...cities.map(c => el("option", { value: c }, [c]))
  ]);

  const top = el("div", { class: "digiy-wrap" }, [
    el("div", { class: "digiy-top" }, [qInput, kindSel, statusSel, citySel]),
  ]);

  const grid = el("div", { class: "digiy-grid" });
  top.appendChild(grid);
  target.appendChild(top);

  function matches(m) {
    if (state.kind !== "all" && m.kind !== state.kind) return false;
    if (state.status !== "all" && m.status !== state.status) return false;
    if (state.city !== "all" && m.city !== state.city) return false;

    const hay = norm([m.name, m.slug, m.city, m.status, m.kind, ...(m.tags||[])].join(" "));
    const needle = norm(state.q);
    if (needle && !hay.includes(needle)) return false;

    return true;
  }

  function card(m) {
    const head = el("div", { class: "digiy-head" }, [
      el("div", {}, [
        el("div", { class: "digiy-title" }, [m.name]),
        el("div", { class: "digiy-sub" }, [`${m.kind.toUpperCase()} • ${m.city}`]),
      ]),
      badge(m.status)
    ]);

    const tagsRow = el("div", { class: "digiy-row" }, (m.tags || []).slice(0, 6).map(pill));

    const btn = el("button", {
      class: "digiy-btn",
      onclick: () => window.open(m.url, "_blank", "noopener")
    }, ["Ouvrir"]);

    return el("div", { class: "digiy-card" }, [head, tagsRow, btn]);
  }

  function draw() {
    grid.innerHTML = "";
    const list = modules.filter(matches);

    if (!list.length) {
      grid.appendChild(el("div", { class: "digiy-empty" }, [
        "Aucun module trouvé. Essaie un mot-clé (ex: “chauffeur”, “artisan”, “paiement”)."
      ]));
      return;
    }

    // Tri : live d’abord, puis beta, puis off
    const rank = { live: 0, beta: 1, off: 2 };
    list.sort((a,b) => (rank[a.status] ?? 9) - (rank[b.status] ?? 9) || a.name.localeCompare(b.name));

    for (const m of list) grid.appendChild(card(m));
  }

  draw();
}
