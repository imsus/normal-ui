// Site data: the atomic levels, the components from the demo registry, and the templates and pages
// parsed from src/examples/*.html (each keeps its original markup, styles and script).
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { groups as componentGroups, registry } from '../demos/registry';

export const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const href = (path: string) => `${base}${path}`;

/**
 * URLs use kebab-case slugs made from the human title, not the code names: TextField
 * is /atoms/text-field/.
 * Examples drop a trailing "Page", which the /pages/ section already says:
 * CheckoutPage is /pages/checkout/.
 */
const words = (name: string, isExample = false) =>
  (isExample ? name.replace(/(.)Page$/, '$1') : name)
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .split(' ');

/** The URL slug, from the title: "Tri-state checkbox" is tri-state-checkbox. */
export const slugify = (name: string, isExample = false) =>
  titleOf(name, isExample).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Titles that sentence case alone gets wrong.
const titles: Record<string, string> = {
  TriStateCheckbox: 'Tri-state checkbox',
  CommandDialog: 'Dialog',
  ErrorPage: 'Error pages',
  PasswordResetPage: 'Password reset',
  SignUpPage: 'Sign-up',
  DetailPage: 'Order detail',
  HelpCenterPage: 'Help centre',
  AppShellSidebar: 'App shell with sidebar',
  AppShellTopbar: 'App shell with top bar',
  SaasLayout2026: '2026 SaaS layout',
};

/** A human title in sentence case, keeping acronyms: PWALayout is "PWA layout". */
export const titleOf = (name: string, isExample = false) =>
  titles[name] ??
  words(name, isExample)
    .map((w, i) => (/^[A-Z]{2,}$/.test(w) ? w : i === 0 ? w : w.toLowerCase()))
    .join(' ');

export type ExampleMeta = {
  name: string;
  level: 'templates' | 'pages';
  group: string;
  subtitle: string;
  width: number;
  height: number;
  bodyClass: string;
  head: string;
  body: string;
};

// Read from disk on every call rather than imported: an imported file is cached by the
// dev server, so edits to an example would not show until a restart.
const examplesDir = join(process.cwd(), 'src', 'examples');

function parse(name: string, html: string): ExampleMeta {
  const card = html.match(/<!--\s*@dsCard([^>]*)-->/)?.[1] ?? '';
  const attr = (k: string) => card.match(new RegExp(`${k}="([^"]*)"`))?.[1] ?? card.match(new RegExp(`${k}=(\\d+)`))?.[1];
  const styles = [...html.matchAll(/<style[^>]*>[\s\S]*?<\/style>/g)].map((m) => m[0]).join('\n');
  const metas = [...html.matchAll(/<meta name="theme-color"[^>]*>/g)].map((m) => m[0]).join('\n');
  const bodyMatch = html.match(/<body([^>]*)>([\s\S]*?)<\/body>/);
  const body = bodyMatch ? bodyMatch[2] : html.replace(/^[\s\S]*?<\/head>/, '').replace(/<\/?html[^>]*>/g, '');
  return {
    name,
    level: attr('level') === 'templates' ? 'templates' : 'pages',
    group: attr('group') ?? 'Showcase',
    subtitle: attr('subtitle') ?? '',
    width: Number(attr('width') ?? 960),
    height: Number(attr('height') ?? 600),
    bodyClass: bodyMatch?.[1].match(/class="([^"]*)"/)?.[1] ?? '',
    head: metas + styles,
    body,
  };
}

// A build reads each example once; the dev server reads it fresh every time.
const parsed = import.meta.env.PROD ? new Map<string, ExampleMeta>() : null;

/** One example, from src/examples/<name>.html. */
export function loadExample(name: string): ExampleMeta {
  const cached = parsed?.get(name);
  if (cached) return cached;
  const meta = parse(name, readFileSync(join(examplesDir, `${name}.html`), 'utf8'));
  parsed?.set(name, meta);
  return meta;
}

/** Every example (files starting with _ are not examples), sorted by name. */
export function listExamples(): ExampleMeta[] {
  return readdirSync(examplesDir)
    .filter((f) => f.endsWith('.html') && !f.startsWith('_'))
    .map((f) => loadExample(f.slice(0, -5)))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export const examples = listExamples().map((e) => ({
  ...e,
  slug: slugify(e.name, true),
  title: titleOf(e.name, true),
  href: href(`/${e.level}/${slugify(e.name, true)}/`),
  preview: href(`/${e.level}/${slugify(e.name, true)}/preview/`),
}));
export type Example = (typeof examples)[number];

export const components = Object.entries(registry)
  .map(([name, entry]) => ({
    name,
    ...entry,
    slug: slugify(name),
    title: titleOf(name),
    href: href(`/${entry.level}/${slugify(name)}/`),
  }))
  .sort((a, b) => a.title.localeCompare(b.title));
export type Component = (typeof components)[number];

/**
 * Brad Frost's five stages of atomic design, smallest first. Each is a section of the
 * docs at /<id>/; its groups say what the things in it are for.
 */
export const levels = [
  {
    id: 'atoms', label: 'Atoms', singular: 'Atom', kind: 'component',
    intro: 'The smallest parts: one control or element, with the label it needs to be usable. Split an atom any further and it stops meaning anything.',
    groups: [...componentGroups],
  },
  {
    id: 'molecules', label: 'Molecules', singular: 'Molecule', kind: 'component',
    intro: 'A few atoms working together as one unit with one job: a quantity stepper, a menu button, a breadcrumb trail.',
    groups: [...componentGroups],
  },
  {
    id: 'organisms', label: 'Organisms', singular: 'Organism', kind: 'component',
    intro: 'Distinct sections of an interface, built from molecules and atoms, often with their own state and keyboard model: tabs, a data grid, a dialog.',
    groups: [...componentGroups],
  },
  {
    id: 'templates', label: 'Templates', singular: 'Template', kind: 'example',
    intro: 'Page layouts with placeholder content: where the regions go, how they reflow, and the rhythm text follows. They show structure, not final content.',
    groups: ['App shells', 'Mobile', 'Type'],
  },
  {
    id: 'pages', label: 'Pages', singular: 'Page', kind: 'example',
    intro: 'Templates filled with real content, and their states: empty, loading, error and done. Pages are where the system is tested against the words and data it will actually hold.',
    groups: ['Content', 'App', 'Flows', 'States', 'Marketing', 'Mobile', 'Showcase'],
  },
] as const;
export type LevelId = (typeof levels)[number]['id'];

export const levelOf = (id: string) => {
  const l = levels.find((x) => x.id === id)!;
  return { ...l, href: href(`/${l.id}/`) };
};

/** What is in a level, as nav links: components for the first three, examples after. */
export const itemsIn = (id: LevelId): { title: string; href: string; group: string }[] =>
  levelOf(id).kind === 'component'
    ? components.filter((c) => c.level === id)
    : examples.filter((e) => e.level === id).sort((a, b) => a.title.localeCompare(b.title));

export type NavSection = { title: string; href?: string; links: { label: string; href: string }[] };

export const nav: NavSection[] = [
  { title: 'Start', links: [
    { label: 'Overview', href: href('/') },
    { label: 'Getting started', href: href('/getting-started/') },
  ] },
  { title: 'Foundations', links: [
    { label: 'Guidelines', href: href('/guidelines/') },
    { label: 'Tokens', href: href('/tokens/') },
    { label: 'Typography', href: href('/typography/') },
    { label: 'Themes', href: href('/themes/') },
  ] },
  ...levels.map((l) => ({
    title: l.label,
    href: href(`/${l.id}/`),
    links: itemsIn(l.id).map((i) => ({ label: i.title, href: i.href })),
  })),
];

// The first sentence of each component's guidelines, as its summary in lists.
const componentDocs = import.meta.glob<string>('../../docs/components/*.md', { query: '?raw', import: 'default', eager: true });
export const summaryOf = (name: string) => {
  const md = componentDocs[`../../docs/components/${name}.md`] ?? '';
  const para = md.split('\n\n').find((p) => p.trim() && !p.startsWith('#')) ?? '';
  return para.replace(/`([^`]+)`/g, '$1').replace(/\*\*/g, '').split(/(?<=\.)\s/)[0];
};

/** Everything in a level with a one-line summary, for the level's index and the overview. */
export const entriesIn = (id: LevelId) =>
  levelOf(id).kind === 'component'
    ? components.filter((c) => c.level === id).map((c) => ({ title: c.title, href: c.href, group: c.group, text: summaryOf(c.name) }))
    : examples.filter((e) => e.level === id).sort((a, b) => a.title.localeCompare(b.title))
        .map((e) => ({ title: e.title, href: e.href, group: e.group, text: e.subtitle }));

/** The registry names a component is built from, and the ones built from it. */
export const madeOf = (c: Component) => (c.madeOf ?? []).map((n) => components.find((x) => x.name === n)!);
export const usedIn = (c: Component) => components.filter((x) => x.madeOf?.includes(c.name));

/**
 * Every docs page as a command for the docs' command palette (Ctrl/Cmd+K), in nav
 * order. Components are also found by their code name and group; templates and pages
 * by their file name and subtitle.
 */
export const searchIndex = [
  ...nav.slice(0, 2).flatMap((section) => section.links.map((l) => ({ label: l.label, href: l.href, group: section.title }))),
  ...levels.flatMap((l) => [
    { label: `All ${l.label.toLowerCase()}`, href: href(`/${l.id}/`), group: l.label, keywords: l.singular },
    ...(l.kind === 'component'
      ? components.filter((c) => c.level === l.id)
          .map((c) => ({ label: c.title, href: c.href, group: l.label, detail: c.group, keywords: `${c.name} ${c.group}` }))
      : examples.filter((e) => e.level === l.id).sort((a, b) => a.title.localeCompare(b.title))
          .map((e) => ({ label: e.title, href: e.href, group: l.label, detail: e.group, keywords: `${e.name} ${e.subtitle}` }))),
  ]),
];
