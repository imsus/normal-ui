import * as stylex from '@stylexjs/stylex';
import tokens from '../../tokens.json';
import { color, font, space } from '../tokens.stylex';
import { shared } from '../components/shared';

type ColorToken = { name: string; value: string | Record<string, string>; usage: string };
type Style = { name: string; fontSize: string; lineHeight: string | number; fontWeight: number; letterSpacing?: string; sample: string; usage: string };

/** Usage notes write token names in `backticks`: show them as code. */
const Usage = ({ text }: { text: string }) => (
  <>{text.split(/`([^`]+)`/).map((part, i) => (i % 2 ? <code key={i}>{part}</code> : part))}</>
);

const camel = (s: string) => s.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase());

/** Every token from tokens.json, shown in both themes, with its StyleX name and usage. */
export function TokenTables() {
  const themes = tokens.color.themes;
  return (
    <>
      <h2>Colour</h2>
      <p>Each swatch is drawn inside a <code>data-theme</code> box, so both themes show whatever the page is set to.</p>
      <div {...stylex.props(s.scroll)}>
        <table {...stylex.props(s.table)}>
          <thead>
            <tr>
              <th scope="col">Token</th>
              {themes.map((t) => <th key={t.id} scope="col">{t.name}</th>)}
              <th scope="col">Usage</th>
            </tr>
          </thead>
          <tbody>
            {(tokens.color.tokens as ColorToken[]).map((t) => (
              <tr key={t.name}>
                <th scope="row">
                  <code>--{t.name}</code>
                  <br />
                  <small {...stylex.props(shared.muted)}><code>color.{camel(t.name)}</code></small>
                </th>
                {themes.map((th) => {
                  const v = typeof t.value === 'string' ? t.value : (t.value[th.id] ?? t.value[themes[0].id]);
                  return (
                    <td key={th.id} data-theme={th.id} {...stylex.props(s.swatchCell)}>
                      <span {...stylex.props(s.swatch, s.fill(`var(--${t.name})`))} />
                      <code>{v}</code>
                    </td>
                  );
                })}
                <td><Usage text={t.usage} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Type</h2>
      {Object.entries(tokens.type.families).map(([k, v]) => (
        <p key={k}><code>--font-{k}</code> / <code>font.{k}</code>: <span {...stylex.props(shared.muted)}>{v}</span></p>
      ))}
      {tokens.type.groups.map((g) => (
        <section key={g.name}>
          <h3>{g.name}</h3>
          <div {...stylex.props(s.scroll)}>
            <table {...stylex.props(s.table)}>
              <thead><tr><th scope="col">Style</th><th scope="col">Sample</th><th scope="col">Usage</th></tr></thead>
              <tbody>
                {(g.styles as Style[]).map((st) => (
                  <tr key={st.name}>
                    <th scope="row">
                      <code>{st.name}</code>
                      <br />
                      <small {...stylex.props(shared.muted)}>{st.fontSize} / {String(st.lineHeight)} · {st.fontWeight}</small>
                    </th>
                    <td>
                      <span {...stylex.props(s.sample(st.fontSize, String(st.lineHeight), String(st.fontWeight), st.letterSpacing ?? 'normal',
                        g.family === 'mono' ? font.mono : font.sans), st.name === 'h6' && s.upper)}>{st.sample}</span>
                    </td>
                    <td><Usage text={st.usage} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      <h2>Spacing</h2>
      <Lengths family="spacing" prefix="space" bar />
      <h2>Radius</h2>
      <Lengths family="radius" prefix="radius" />
      <h2>Shape</h2>
      <p>Borders, target size, button edges and the focus ring. Normal UI's values reproduce the browser's look; themes change them.</p>
      <Lengths family="shape" prefix="shape" />
      <h2>Text treatments</h2>
      <p>Heading sizes, control text, eyebrows and the link treatment in navigation, as values a theme can change.</p>
      <Lengths family="text" prefix="text" />
    </>
  );
}

function Lengths({ family, prefix, bar = false }: { family: 'spacing' | 'radius' | 'shape' | 'text'; prefix: string; bar?: boolean }) {
  // Spacing and radius drop their prefix in StyleX (space.md, radius.control); shape and text keep the full name.
  const key = (name: string) =>
    family === 'shape' || family === 'text' ? camel(name) : camel(name.replace(`${prefix}-`, '').replace(/^2xs$/, 'xxs'));
  return (
    <div {...stylex.props(s.scroll)}>
      <table {...stylex.props(s.table)}>
        <thead><tr><th scope="col">Token</th><th scope="col">Value</th><th scope="col">Usage</th></tr></thead>
        <tbody>
          {tokens[family].tokens.map((t) => (
            <tr key={t.name}>
              <th scope="row">
                <code>--{t.name}</code>
                <br />
                <small {...stylex.props(shared.muted)}>
                  <code>{prefix}.{key(t.name)}</code>
                </small>
              </th>
              <td>
                {bar ? <span {...stylex.props(s.bar, s.width(t.value))} /> : null} <code>{t.value}</code>
              </td>
              <td><Usage text={t.usage} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const s = stylex.create({
  scroll: { overflowX: 'auto', marginBlockEnd: space.lg },
  table: { width: '100%' },
  swatchCell: { backgroundColor: color.canvas, color: color.canvasText, whiteSpace: 'nowrap' },
  swatch: {
    display: 'inline-block',
    width: 24,
    height: 24,
    marginInlineEnd: space.sm,
    verticalAlign: 'middle',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: color.controlBorder,
  },
  fill: (backgroundColor: string) => ({ backgroundColor }),
  sample: (fontSize: string, lineHeight: string, fontWeight: string, letterSpacing: string, fontFamily: string) => ({
    fontSize, lineHeight, fontWeight, letterSpacing, fontFamily,
  }),
  upper: { textTransform: 'uppercase' },
  bar: { display: 'inline-block', height: 12, backgroundColor: color.link, verticalAlign: 'middle' },
  width: (width: string) => ({ width }),
});
