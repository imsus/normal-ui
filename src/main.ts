import "./index.css";

// Comparison frames suppress only the 8px body margin so both panes share a
// baseline; every other user-agent default stays intact.
const FRAME_HEAD = '<!doctype html><meta charset="utf-8"><style>body{margin:0}</style>';

type Mode = "tw" | "native" | "both";
interface SpecLine {
  tag: string;
  cls: string;
}
interface PropDiff {
  el: string;
  prop: string;
  mine: string;
  native: string;
}
interface CardReport {
  card: string;
  nodes: number;
  diffs: PropDiff[];
}

declare global {
  interface Window {
    __audit: () => Promise<CardReport[]>;
  }
}

const $ = <T extends Element>(s: string, r: ParentNode = document): T | null =>
  r.querySelector<T>(s);
const $$ = <T extends Element>(s: string, r: ParentNode = document): T[] => [
  ...r.querySelectorAll<T>(s),
];

const delay = (ms: number): Promise<void> => {
  const { promise, resolve } = Promise.withResolvers<void>();
  setTimeout(resolve, ms);
  return promise;
};

/* ---------- rail ---------- */
const rail = $("#rail-list");
$$<HTMLElement>("[data-section]").forEach((sec) => {
  const li = document.createElement("li");
  li.innerHTML =
    `<a href="#${sec.id}" class="block rounded px-2 py-1 text-[#8a8a82] hover:text-[#191917] ` +
    `[&[aria-current]]:bg-white [&[aria-current]]:font-semibold [&[aria-current]]:text-[#0000ee] ` +
    `shadow-none [&[aria-current]]:shadow-[0_1px_2px_rgb(0_0_0/.05)]">${sec.dataset.section ?? ""}</a>`;
  rail?.append(li);
});
const links = $$<HTMLAnchorElement>("a", rail ?? document);
const sections = $$<HTMLElement>("[data-section]");
const spy = (): void => {
  const marker = innerHeight * 0.35;
  let current: string | undefined = sections[0]?.id;
  for (const s of sections) if (s.getBoundingClientRect().top <= marker) current = s.id;
  links.forEach((l) => {
    if (l.getAttribute("href") === "#" + current) l.setAttribute("aria-current", "true");
    else l.removeAttribute("aria-current");
  });
};
addEventListener("scroll", spy, { passive: true });
addEventListener("resize", spy, { passive: true });
spy();

/* ---------- native frames ---------- */
function cleanClone(card: HTMLElement): string {
  const spec = $("[data-spec]", card);
  if (!spec) return "";
  const frag = spec.cloneNode(true) as HTMLElement;
  $$("[data-chrome]", frag).forEach((n) => n.remove());
  const scrub = (n: Element): void => {
    [...n.attributes].forEach((a) => {
      if (a.name === "class" || a.name.startsWith("data-")) n.removeAttribute(a.name);
    });
  };
  $$("*", frag).forEach(scrub);
  scrub(frag);
  return frag.innerHTML;
}

function fitFrame(f: HTMLIFrameElement): void {
  try {
    const d = f.contentDocument;
    if (!d || !d.body) return;
    f.style.height = Math.ceil(d.documentElement.scrollHeight) + "px";
  } catch {
    /* same-origin by construction; nothing to recover */
  }
}

function buildFrame(card: HTMLElement): void {
  if (card.dataset.built) return;
  card.dataset.built = "1";
  const f = $<HTMLIFrameElement>(".frame", card);
  if (!f) return;
  f.setAttribute("sandbox", "allow-same-origin");
  f.srcdoc = FRAME_HEAD + cleanClone(card);
  f.addEventListener("load", () => fitFrame(f));
}

/* ---------- mode ---------- */
function setMode(mode: Mode): void {
  document.documentElement.dataset.mode = mode;
  const cards = $$<HTMLElement>("[data-card]");
  if (mode !== "tw") cards.forEach(buildFrame);
  requestAnimationFrame(() =>
    requestAnimationFrame(() =>
      cards.forEach((c) => {
        const f = $<HTMLIFrameElement>(".frame", c);
        if (f && !f.hidden && c.dataset.built) fitFrame(f);
      }),
    ),
  );
}
$("#mode-switch")?.addEventListener("change", (e) => {
  const t = e.target;
  if (t instanceof HTMLInputElement) setMode(t.value as Mode);
});

/* ---------- spec chips + copy ---------- */
function specLines(spec: Element): SpecLine[] {
  const seen = new Map<string, string[]>();
  const walk = (el: Element): void => {
    for (const n of el.children) {
      if (n.hasAttribute("data-chrome")) continue;
      const cls = [...n.classList];
      if (cls.length) {
        const key = n.tagName.toLowerCase();
        const list = seen.get(key) ?? [];
        list.push(cls.join(" "));
        seen.set(key, list);
      }
      walk(n);
    }
  };
  walk(spec);
  return [...seen]
    .map(([tag, classes]) => [...new Set(classes)].map((cls) => ({ tag, cls })))
    .flat();
}

$$<HTMLElement>("article[data-card]").forEach((card) => {
  const spec = $("[data-spec]", card);
  if (!spec) return;
  let footer = $(".specline", card);
  if (!footer) {
    footer = document.createElement("footer");
    footer.className = "specline";
    card.append(footer);
  }
  const lines = specLines(spec);
  if (!lines.length) {
    footer.remove();
    return;
  }
  footer.innerHTML = "";
  lines.forEach(({ tag, cls }) => {
    const row = document.createElement("div");
    row.className = "specrow";
    row.innerHTML =
      `<code class="spec-tag">${tag}</code>` +
      `<code class="spec-cls" title="${cls.replaceAll('"', "&quot;")}">${cls}</code>` +
      `<button type="button" class="copybtn" aria-label="Copy ${tag} classes">copy</button>`;
    const btn = $<HTMLButtonElement>(".copybtn", row);
    btn?.addEventListener("click", () => {
      btn.textContent = "copied";
      void Promise.race([navigator.clipboard.writeText(cls), delay(400)]).catch(() => {});
      setTimeout(() => (btn.textContent = "copy"), 900);
    });
    footer.append(row);
  });
});

/* ---------- fidelity audit (console API) ---------- */
const PROPS = [
  "display",
  "marginTop",
  "marginBottom",
  "marginLeft",
  "marginRight",
  "paddingTop",
  "paddingBottom",
  "paddingLeft",
  "paddingRight",
  "fontSize",
  "fontWeight",
  "fontStyle",
  "lineHeight",
  "fontFamily",
  "color",
  "backgroundColor",
  "borderTopWidth",
  "borderTopStyle",
  "borderTopColor",
  "borderBottomWidth",
  "textDecorationLine",
  "textDecorationStyle",
  "listStyleType",
  "textAlign",
  "verticalAlign",
  "width",
  "height",
] as const;

window.__audit = async (): Promise<CardReport[]> => {
  const report: CardReport[] = [];
  for (const card of $$<HTMLElement>("article[data-card]")) {
    const spec = $("[data-spec]", card);
    if (!spec) continue;
    const mine: Element[] = [];
    const theirs: Element[] = [];
    const grab = (root: Element, out: Element[], skipChrome: boolean): void => {
      const rec = (el: Element): void => {
        for (const n of el.children) {
          if (skipChrome && n.hasAttribute("data-chrome")) continue;
          out.push(n);
          rec(n);
        }
      };
      rec(root);
    };
    grab(spec, mine, true);

    const c = spec.cloneNode(true) as HTMLElement;
    $$("[data-chrome]", c).forEach((n) => n.remove());
    const scrub = (n: Element): void => {
      [...n.attributes].forEach((a) => {
        if (a.name === "class" || a.name.startsWith("data-")) n.removeAttribute(a.name);
      });
    };
    $$("*", c).forEach(scrub);
    scrub(c);

    const f = document.createElement("iframe");
    f.style.cssText = "position:absolute;visibility:hidden;width:800px;height:600px;border:0";
    f.setAttribute("sandbox", "allow-same-origin");
    f.srcdoc = FRAME_HEAD + c.innerHTML;
    const { promise: loaded, resolve: onLoaded } = Promise.withResolvers<void>();
    f.addEventListener("load", () => onLoaded(), { once: true });
    document.body.append(f);
    await loaded;
    grab(f.contentDocument!.body, theirs, false);

    const win = f.contentWindow!;
    const diffs: PropDiff[] = [];
    mine.forEach((el, i) => {
      const twin = theirs[i];
      if (!twin) return;
      const a = getComputedStyle(el);
      const b = win.getComputedStyle(twin);
      const borderTopZeroed =
        (a.borderTopWidth || "0px") === "0px" && (b.borderTopWidth || "0px") === "0px";
      for (const p of PROPS) {
        if (p === "borderTopStyle" && borderTopZeroed) continue;
        if ((a[p] || "") !== (b[p] || "")) {
          diffs.push({ el: el.tagName.toLowerCase(), prop: p, mine: a[p], native: b[p] });
        }
      }
      const pseudos =
        el.tagName === "Q" ? ["::before", "::after"] : el.tagName === "SUMMARY" ? ["::marker"] : [];
      for (const ps of pseudos) {
        const ca = getComputedStyle(el, ps).content;
        const cb = win.getComputedStyle(twin, ps).content;
        if (ca !== cb) {
          diffs.push({ el: el.tagName.toLowerCase() + ps, prop: "content", mine: ca, native: cb });
        }
      }
    });

    report.push({ card: card.dataset.card ?? "", nodes: mine.length, diffs });
    f.remove();
  }
  const bad = report.filter((r) => r.diffs.length > 0);
  console.table(bad.flatMap((r) => r.diffs.map((d) => ({ card: r.card, ...d }))));
  console.log(`__audit: ${report.length} cards, ${bad.length} with diffs`);
  return report;
};
