import * as stylex from '@stylexjs/stylex';
import type { ReactNode } from 'react';
import { color, space } from '../tokens.stylex';
import { shared } from '../components/shared';
import { Select } from '../components/Field';
import { Breadcrumb } from '../components/Breadcrumb';
import type { NavSection } from '../lib/site';
import { themes } from '../themes';

/**
 * The docs chrome: skip link, top bar with the theme and color-scheme switches, sidebar nav,
 * main. Server-rendered only; the switches are wired by a tiny inline script.
 */
export function DocsShell({
  nav,
  current,
  home,
  crumbs = [],
  search,
  children,
}: {
  nav: NavSection[];
  current: string;
  home: string;
  /** The trail to this page, ending with it. None on the home page. */
  crumbs?: { href: string; label: string }[];
  /** The page finder for the top bar (an island, passed in as a slot). */
  search?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div {...stylex.props(s.shell)}>
      <a href="#main" {...stylex.props(s.skip)}>Skip to main content</a>
      <header {...stylex.props(s.top, s.topWrap)}>
        <a href={home} {...stylex.props(s.brand)}>Normal UI</a>
        <div {...stylex.props(s.tools)}>
          {search}
          <Select id="pd-theme" label="Theme" layout="inline" defaultValue="">
            <option value="">Normal UI</option>
            {themes.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
          </Select>
          <Select id="pd-color-scheme" label="Color scheme" layout="inline" defaultValue="auto">
            <option value="auto">Device</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </Select>
        </div>
      </header>
      <nav id="docs-nav" aria-label="Docs" {...stylex.props(s.side)}>
        {nav.map((section) => (
          <div key={section.title} {...stylex.props(s.section)}>
            <h2 {...stylex.props(shared.eyebrow, s.navTitle)}>
              {section.href ? (
                <a href={section.href} aria-current={section.href === current ? 'page' : undefined}
                  {...stylex.props(s.navTitleLink, section.href === current && s.navHere)}>
                  {section.title}
                </a>
              ) : section.title}
            </h2>
            <ul {...stylex.props(s.navList)}>
              {section.links.map((l) => {
                const here = l.href === current;
                return (
                  <li key={l.href}>
                    <a href={l.href} aria-current={here ? 'page' : undefined} {...stylex.props(s.navLink, here && s.navHere)}>
                      {l.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      {/* Runs as soon as the nav is parsed, before first paint, so it never jumps. */}
      <script dangerouslySetInnerHTML={{ __html: keepNavScroll }} />
      <main id="main" tabIndex={-1} {...stylex.props(s.main)}>
        {crumbs.length > 1 ? (
          <div {...stylex.props(s.crumbs)}>
            <Breadcrumb items={crumbs} />
          </div>
        ) : null}
        {children}
      </main>
    </div>
  );
}

/**
 * Every docs page is a full page load, so the sidebar would start at the top each time.
 * Save its scroll position when leaving a page and restore it on the next one.
 */
const keepNavScroll = `(function () {
  var nav = document.getElementById('docs-nav');
  if (!nav || nav.scrollHeight <= nav.clientHeight) return; // On phones the nav does not scroll.
  var key = 'pd-docs-nav-scroll', saved = null;
  try { saved = sessionStorage.getItem(key); } catch (e) {}
  if (saved !== null) nav.scrollTop = +saved;
  // Arrived some other way (first visit, a link in the content)? Keep the current page's
  // link in view, scrolling only the nav, never the page.
  var here = nav.querySelector('[aria-current="page"]');
  if (here) {
    var a = here.getBoundingClientRect(), r = nav.getBoundingClientRect();
    if (a.top < r.top || a.bottom > r.bottom) nav.scrollTop += a.top - r.top - nav.clientHeight / 2;
  }
  addEventListener('pagehide', function () {
    try { sessionStorage.setItem(key, String(nav.scrollTop)); } catch (e) {}
  });
})();`;

const narrow = '@media (max-width: 800px)';
const s = stylex.create({
  shell: {
    display: 'grid',
    gridTemplateColumns: { default: '15rem minmax(0, 1fr)', [narrow]: '1fr' },
    gridTemplateRows: 'auto 1fr',
    gridTemplateAreas: { default: '"top top" "side main"', [narrow]: '"top" "main" "side"' },
    minHeight: '100dvh',
  },
  skip: {
    position: 'absolute',
    insetInlineStart: space.sm,
    top: { default: -100, ':focus': space.sm },
    zIndex: 10,
    backgroundColor: color.canvas,
    paddingBlock: space.xs,
    paddingInline: space.sm,
  },
  top: {
    gridArea: 'top',
    position: 'sticky',
    top: 0,
    zIndex: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: space.md,
    minHeight: 56,
    paddingInline: space.md,
    backgroundColor: color.canvas,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: color.controlBorder,
  },
  tools: { display: 'flex', alignItems: 'center', gap: space.md, marginInlineStart: 'auto' },
  // On a phone the tools drop below the name rather than squeezing it.
  topWrap: { flexWrap: 'wrap', rowGap: space.xs, paddingBlock: space.xs },
  brand: { whiteSpace: 'nowrap', fontWeight: 700, fontSize: '1.17em', color: color.canvasText },
  side: {
    gridArea: 'side',
    position: { default: 'sticky', [narrow]: 'static' },
    top: 56,
    alignSelf: 'start',
    maxHeight: { default: 'calc(100dvh - 56px)', [narrow]: 'none' },
    overflow: 'auto',
    padding: space.md,
    borderInlineEndWidth: { default: 1, [narrow]: 0 },
    borderTopWidth: { default: 0, [narrow]: 1 },
    borderStyle: 'solid',
    borderColor: color.controlBorder,
  },
  section: { marginBlockEnd: space.md },
  navTitle: { margin: `0 0 ${space.xs}` },
  // A level's heading links to its index; it keeps the eyebrow look, underlined as a link.
  navTitleLink: { display: 'inline-block', color: 'inherit', paddingInline: space.sm, marginInline: `calc(-1 * ${space.sm})` },
  navList: { listStyle: 'none', margin: 0, padding: 0 },
  navLink: { display: 'flex', alignItems: 'center', minHeight: '2rem', paddingInline: space.sm },
  navHere: { backgroundColor: color.highlight, color: color.highlightText, fontWeight: 700, textDecoration: 'none' },
  crumbs: { marginBlockEnd: space.md },
  main: {
    gridArea: 'main',
    minWidth: 0,
    paddingBlock: space.md,
    paddingInline: space.lg,
    maxWidth: '56rem',
    outline: { default: null, ':focus': 'none' },
  },
});
