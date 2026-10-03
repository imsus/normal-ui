import * as stylex from '@stylexjs/stylex';
import { color, font, space } from '../tokens.stylex';

/** The system's cover: one tall link-blue slab, a button face with its focus ring, ink, rules and mark. */
export function Cover() {
  return (
    <div {...stylex.props(s.cover)}>
      <svg viewBox="0 0 480 288" aria-hidden="true" {...stylex.props(s.art)}>
        <rect x="16" y="-8" width="176" height="272" fill={color.link} />
        <line x1="32" y1="168" x2="176" y2="168" stroke={color.canvas} strokeWidth="2" />
        <line x1="32" y1="200" x2="160" y2="200" stroke={color.canvas} strokeWidth="2" />
        <line x1="32" y1="232" x2="112" y2="232" stroke={color.canvas} strokeWidth="2" />
        <rect x="208.5" y="24.5" width="152" height="48" rx="2" fill={color.buttonFace} stroke={color.controlBorder} />
        <rect x="204" y="20" width="161" height="57" rx="4" fill="none" stroke={color.focusRing} strokeWidth="2" />
        <rect x="208" y="96" width="152" height="168" fill={color.canvasText} />
        <line x1="376" y1="40.5" x2="480" y2="40.5" stroke={color.rule} />
        <line x1="376" y1="80.5" x2="480" y2="80.5" stroke={color.rule} />
        <line x1="376" y1="120.5" x2="480" y2="120.5" stroke={color.rule} />
        <rect x="376" y="176" width="112" height="88" fill={color.mark} />
      </svg>
      <div {...stylex.props(s.words)}>
        <h1 {...stylex.props(s.name)}>Normal <br />UI</h1>
        <p {...stylex.props(s.tag)}>The browser's own stylesheet, repaired to WCAG 2.2 AA.</p>
      </div>
    </div>
  );
}

const narrow = '@media (max-width: 720px)';
const s = stylex.create({
  cover: {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: { default: '1fr 1fr', [narrow]: '1fr' },
    alignItems: 'end',
    minHeight: 288,
    overflow: 'hidden',
    marginBlockEnd: space.lg,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: color.rule,
  },
  art: { display: 'block', width: '100%', maxWidth: 480, height: 'auto', gridColumn: { default: 2, [narrow]: 1 }, gridRow: 1 },
  words: { gridColumn: 1, gridRow: { default: 1, [narrow]: 2 }, paddingBlock: space.lg },
  name: { margin: 0, fontSize: 'clamp(3rem, 9vw, 6rem)', lineHeight: 0.95, fontWeight: 700, letterSpacing: '-0.02em' },
  tag: { margin: `${space.sm} 0 0 4px`, fontSize: 14, lineHeight: '20px', color: color.grayText, fontFamily: font.sans },
});
