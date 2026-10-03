import * as stylex from '@stylexjs/stylex';
import type { StyleXStyles } from '@stylexjs/stylex';
import { Children, createContext, isValidElement, useContext, useId } from 'react';
import type { ReactNode } from 'react';
import { color, font, space } from '../tokens.stylex';

/*
 * Card: a container for related content, such as a form, a list or a summary.
 * Structure and naming follow Flux's card (card / header / heading / subheading /
 * actions / body / footer / bleed, with `body`, `variant`, `size`, `divider`); the look
 * is Normal UI's: 1px borders, no shadows, square corners, system colours only
 * (the surface-* tokens for tints).
 */

export type CardBodyTreatment = 'seamless' | 'inset' | 'flush' | 'divided' | 'separated';
export type CardSize = 'xs' | 'sm' | 'md' | 'lg';
export type CardVariant = 'default' | 'muted' | 'soft' | 'outline' | 'filled';

type Ctx = { body: CardBodyTreatment; insetDivider: boolean; headingId: string; nested: boolean };
const CardContext = createContext<Ctx | null>(null);

/** Padding and the space between parts, per size: the system's spacing steps. */
const pads: Record<CardSize, string> = { xs: space.sm, sm: '12px', md: space.md, lg: space.lg };

/**
 * The card. Put parts inside (Card.Header, Card.Body, Card.Footer), or any content,
 * which is padded evenly.
 */
function CardRoot({
  body = 'seamless',
  variant = 'default',
  size = 'md',
  divider,
  as: As = 'div',
  children,
  xstyle,
}: {
  /** How the header, body and footer are set apart. */
  body?: CardBodyTreatment;
  /**
   * The card's surface. `default`: a bordered box on canvas, for primary content.
   * `muted`: a quieter tint for secondary panels. `soft`: the faintest tint, for light
   * grouping. `outline`: just the border, over whatever is behind it. `filled`: a tint
   * with no edge, for inline surfaces.
   */
  variant?: CardVariant;
  /** Scales padding and the space between parts. */
  size?: CardSize;
  /** With body="divided", `inset` stops the lines at the content's edges. */
  divider?: 'inset';
  /**
   * `section` or `article` make the card a region named by its Card.Heading. Use them
   * only when the card is a real section of the page; most cards are a plain `div`.
   */
  as?: 'div' | 'section' | 'article' | 'li';
  children?: ReactNode;
  xstyle?: StyleXStyles;
}) {
  const headingId = `${useId()}-heading`;
  const insetDivider = body === 'divided' && divider === 'inset';
  const named = As === 'section' || As === 'article';
  return (
    <CardContext.Provider value={{ body, insetDivider, headingId, nested: false }}>
      <As
        aria-labelledby={named ? headingId : undefined}
        {...stylex.props(
          styles.card,
          styles.pad(pads[size]),
          variant === 'outline' && styles.outline,
          variant === 'muted' && styles.muted,
          variant === 'soft' && styles.soft,
          variant === 'filled' && styles.filled,
          (body === 'seamless' || body === 'inset') && styles.padAll,
          body === 'flush' && styles.padBlock,
          insetDivider && styles.padInline,
          (body === 'divided' || body === 'separated') && styles.noGap,
          xstyle,
        )}
      >
        {children}
      </As>
    </CardContext.Provider>
  );
}

/**
 * The card's title row: a Card.Heading, an optional Card.Subheading and optional
 * Card.Actions. Actions after the heading sit at the end, before it at the start.
 * Inside a Card.Body it becomes a bare sub-section heading; outside a card it works
 * on its own, above the card it introduces.
 */
export function CardHeader({ children, xstyle }: { children: ReactNode; xstyle?: StyleXStyles }) {
  const ctx = useContext(CardContext);
  const items = Children.toArray(children);
  const isActions = (c: unknown) => isValidElement(c) && c.type === CardActions;
  const actions = items.filter(isActions);
  const titles = items.filter((c) => !isActions(c));
  const actionsFirst = items.findIndex(isActions) === 0 && titles.length > 0;
  return (
    <div {...stylex.props(styles.header, ...partStyles(ctx, 'header'), xstyle)}>
      {actionsFirst ? actions : null}
      <div {...stylex.props(styles.titles)}>{titles}</div>
      {actionsFirst ? null : actions}
    </div>
  );
}

const headingSizes = { base: '1rem', lg: '1.17rem', xl: '1.5rem' } as const;

/** The card's title. Pick `level` to fit the page's heading outline. */
export function CardHeading({
  level = 2,
  size = 'base',
  children,
}: {
  /** The heading level to render: 2 for an h2. */
  level?: 2 | 3 | 4 | 5 | 6;
  size?: 'base' | 'lg' | 'xl';
  children: ReactNode;
}) {
  const ctx = useContext(CardContext);
  const H = `h${level}` as const;
  // The card's own heading names the card; a sub-section heading inside the body does not.
  const id = ctx && !ctx.nested ? ctx.headingId : undefined;
  return (
    <H id={id} {...stylex.props(styles.heading, styles.headingSize(headingSizes[size]))}>
      {children}
    </H>
  );
}

/** Supporting text tucked under the heading. */
export function CardSubheading({ children }: { children: ReactNode }) {
  return <p {...stylex.props(styles.subheading)}>{children}</p>;
}

/**
 * Buttons or other controls. In a header they line up with the heading and tuck into
 * the corner instead of making the header taller; in a footer they sit at the end.
 */
export function CardActions({ children }: { children: ReactNode }) {
  return <div {...stylex.props(styles.actions)}>{children}</div>;
}

/**
 * The card's main content. It can hold its own Card.Header and Card.Footer, which then
 * act as titled sub-sections.
 */
export function CardBody({ children, xstyle }: { children: ReactNode; xstyle?: StyleXStyles }) {
  const ctx = useContext(CardContext);
  const body = ctx?.body ?? 'seamless';
  return (
    <CardContext.Provider value={ctx ? { ...ctx, nested: true } : null}>
      <div
        {...stylex.props(
          styles.body,
          body === 'seamless' && styles.bodySeamless,
          body === 'inset' && styles.bodyInset,
          body === 'flush' && styles.bodyFlush,
          (body === 'divided' || body === 'separated') && (ctx?.insetDivider ? styles.bodyPadBlock : styles.bodyPad),
          xstyle,
        )}
      >
        {children}
      </div>
    </CardContext.Provider>
  );
}

/** Supporting text and optional Card.Actions, under the body. */
export function CardFooter({ children, xstyle }: { children: ReactNode; xstyle?: StyleXStyles }) {
  const ctx = useContext(CardContext);
  return <div {...stylex.props(styles.footer, ...partStyles(ctx, 'footer'), xstyle)}>{children}</div>;
}

/**
 * Media run out to the card's edges, such as an image or a chart. It always reaches
 * the sides, and reaches the top or bottom when it is the first or last thing in the
 * body. Give an image `display: block; width: 100%`.
 */
export function CardBleed({ children }: { children: ReactNode }) {
  return <div {...stylex.props(cardBleed.bleed)}>{children}</div>;
}

/** How a header or footer sits in the card, from the card's body treatment. */
function partStyles(ctx: Ctx | null, part: 'header' | 'footer') {
  if (!ctx) return [styles.standalone];
  if (ctx.nested) return [];
  const line = part === 'header' ? styles.lineBelow : styles.lineAbove;
  switch (ctx.body) {
    case 'flush':
      return [styles.partPadInline];
    case 'divided':
      return [ctx.insetDivider ? styles.partPadBlock : styles.partPad, line];
    case 'separated':
      return [styles.partPad, styles.band, line];
    default:
      return [];
  }
}

const P = 'var(--pd-card-pad)';

const styles = stylex.create({
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: P,
    minWidth: 0,
    backgroundColor: color.canvas,
    color: color.canvasText,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: color.controlBorder,
    // Parts are spaced by gap, so flow margins and heading margins are off inside.
    '--pd-flow': '0',
    '--pd-h-after': '0',
    '--pd-h2-before': '0',
    '--pd-h3-before': '0',
    '--pd-h4-before': '0',
    // Secondary text colour; a separated band swaps it for one that reads on its fill.
    '--pd-card-muted': color.grayText,
    // Heading colour: full text colour, even inside a footer's secondary text.
    '--pd-card-strong': color.canvasText,
    // The inset or flush body panel: a recessed well on a plain card. Tinted cards
    // swap it for a raised panel.
    '--pd-card-panel': color.surfaceMuted,
    // Separated header and footer bands follow the same rule.
    '--pd-card-band': color.surfaceMuted,
    // How far Card.Bleed reaches sideways: to the card's edge.
    '--pd-card-bleed-x': P,
  },
  pad: (pad: string) => ({ '--pd-card-pad': pad }),
  outline: { backgroundColor: 'transparent' },
  muted: { backgroundColor: color.surfaceMuted, '--pd-card-panel': color.surfaceRaised, '--pd-card-band': color.surfaceRaised },
  soft: { backgroundColor: color.surfaceSoft, '--pd-card-panel': color.surfaceRaised, '--pd-card-band': color.surfaceRaised },
  // No edge; forced-colours mode draws one back, since the tint disappears there.
  filled: {
    backgroundColor: color.surfaceMuted,
    borderStyle: { default: 'none', '@media (forced-colors: active)': 'solid' },
    '--pd-card-panel': color.surfaceRaised,
    '--pd-card-band': color.surfaceRaised,
  },
  padAll: { padding: P },
  padBlock: { paddingBlock: P },
  padInline: { paddingInline: P },
  noGap: { gap: 0 },

  header: { display: 'flex', alignItems: 'flex-start', gap: space.sm },
  titles: { display: 'flex', flexDirection: 'column', gap: '2px', flex: 1, minWidth: 0 },
  heading: { margin: 0, fontWeight: 700, lineHeight: 1.25, color: 'var(--pd-card-strong, inherit)' },
  headingSize: (fontSize: string) => ({ fontSize }),
  subheading: { margin: 0, fontSize: '0.875rem', color: 'var(--pd-card-muted, var(--gray-text))' },
  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: space.sm,
    flex: 'none',
    // After text, push to the end of the row (a header's titles already fill the rest).
    marginInlineStart: 'auto',
    // In a header: tuck into the corner rather than growing the row.
    marginBlock: `calc(${space.xs} * -1)`,
  },

  body: {
    display: 'flex',
    flexDirection: 'column',
    gap: P,
    minWidth: 0,
    '--pd-card-bleed-top': '0px',
    '--pd-card-bleed-bottom': '0px',
  },
  // One surface: the body has no padding of its own; at the card's top or bottom its
  // bleed reaches through the card's padding.
  bodySeamless: {
    '--pd-card-bleed-top': { default: '0px', ':first-child': P },
    '--pd-card-bleed-bottom': { default: '0px', ':last-child': P },
  },
  // A bordered well, set in from the card's edges.
  bodyInset: {
    padding: P,
    backgroundColor: 'var(--pd-card-panel)',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: color.rule,
    '--pd-card-bleed-top': P,
    '--pd-card-bleed-bottom': P,
  },
  // A panel running to the card's sides, between full-width lines.
  bodyFlush: {
    padding: P,
    backgroundColor: 'var(--pd-card-panel)',
    borderBlockWidth: 1,
    borderBlockStyle: 'solid',
    borderBlockColor: color.rule,
    '--pd-card-bleed-top': P,
    '--pd-card-bleed-bottom': P,
  },
  bodyPad: { padding: P, '--pd-card-bleed-top': P, '--pd-card-bleed-bottom': P },
  bodyPadBlock: { paddingBlock: P, '--pd-card-bleed-top': P, '--pd-card-bleed-bottom': P },

  footer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    columnGap: space.md,
    rowGap: space.sm,
    fontSize: '0.875rem',
    color: 'var(--pd-card-muted, var(--gray-text))',
    '--pd-flow': '0',
  },

  standalone: { marginBlockEnd: space.sm },
  partPad: { padding: P },
  partPadBlock: { paddingBlock: P },
  partPadInline: { paddingInline: P },
  lineBelow: { borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: color.rule },
  lineAbove: { borderTopWidth: 1, borderTopStyle: 'solid', borderTopColor: color.rule },
  // A separated header or footer: a tinted band (recessed on a plain card, raised on a
  // tinted one). Every surface keeps gray-text above 4.5:1, so text colours stay.
  band: { backgroundColor: 'var(--pd-card-band)' },

});

/**
 * Run out to the card's edges: always the sides, and the top or bottom when first or
 * last in the body. Used by Card.Bleed and by <Table bleed>; outside a card it does nothing.
 */
export const cardBleed = stylex.create({
  bleed: {
    marginInline: 'calc(var(--pd-card-bleed-x, 0px) * -1)',
    marginBlockStart: { default: 0, ':first-child': 'calc(var(--pd-card-bleed-top, 0px) * -1)' },
    marginBlockEnd: { default: 0, ':last-child': 'calc(var(--pd-card-bleed-bottom, 0px) * -1)' },
  },
});

/** The card with its parts: Card.Header, Card.Heading, Card.Subheading, Card.Actions, Card.Body, Card.Footer, Card.Bleed. */
export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Heading: CardHeading,
  Subheading: CardSubheading,
  Actions: CardActions,
  Body: CardBody,
  Footer: CardFooter,
  Bleed: CardBleed,
});
