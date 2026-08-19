/**
 * Shared page chrome: header nav, footer, and theme toggle.
 * Injected into #site-header / #site-footer on each page.
 * Theme class is pre-applied by the inline bootstrap script in <head>
 * to avoid a flash of the wrong theme.
 */

const THEME_KEY = "normal-ui-theme";

const NAV: Array<{ href: string; id: string; label: string }> = [
  { href: "/", id: "home", label: "Home" },
  { href: "/components.html", id: "components", label: "Components" },
  { href: "/examples.html", id: "examples", label: "Examples" },
];

function icon(kind: "sun" | "moon"): string {
  const sun = `
    <svg id="theme-sun" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>`;
  const moon = `
    <svg id="theme-moon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
  return kind === "sun" ? sun : moon;
}

function headerMarkup(active: string): string {
  const links = NAV.map(
    (item) => `
      <a
        href="${item.href}"
        data-nav="${item.id}"
        class="rounded-md px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:px-3 ${active === item.id ? "bg-muted font-medium text-foreground" : ""}"
        ${active === item.id ? 'aria-current="page"' : ""}
      >${item.label}</a>`,
  ).join("");

  return `
    <div class="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
      <a href="/" class="flex items-center gap-2 text-sm font-semibold tracking-tight">
        <span class="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xs font-bold">n</span>
        <span class="hidden sm:inline">normal-ui</span>
      </a>
      <nav class="hidden items-center gap-1 sm:flex" aria-label="Main">
        ${links}
      </nav>
      <div class="flex items-center gap-2">
        <nav class="flex items-center gap-1 sm:hidden" aria-label="Main">
          ${links}
        </nav>
        <button
          id="theme-toggle"
          type="button"
          class="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Toggle theme"
        >
          ${icon("sun")}${icon("moon")}
        </button>
      </div>
    </div>`;
}

function footerMarkup(): string {
  return `
    <div class="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-4 py-8 text-xs text-muted-foreground sm:flex-row sm:px-6">
      <p>normal-ui — a design system.</p>
      <p>Tokens · Components · Examples</p>
    </div>`;
}

export function initLayout(active: string) {
  const header = document.querySelector<HTMLElement>("#site-header");
  const footer = document.querySelector<HTMLElement>("#site-footer");
  if (header) header.innerHTML = headerMarkup(active);
  if (footer) footer.innerHTML = footerMarkup();

  const stored = localStorage.getItem(THEME_KEY);
  const theme =
    stored === "light" || stored === "dark"
      ? stored
      : matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
  document.documentElement.classList.toggle("dark", theme === "dark");

  const toggle = document.querySelector<HTMLButtonElement>("#theme-toggle");
  toggle?.addEventListener("click", () => {
    const next = document.documentElement.classList.contains("dark") ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem(THEME_KEY, next);
  });
}
