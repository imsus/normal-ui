import * as stylex from '@stylexjs/stylex';
import { useId } from 'react';
import type { ReactNode, SelectHTMLAttributes } from 'react';
import { color, shape, space } from '../tokens.stylex';
import { shared } from './shared';
import { chevron } from './chevron.stylex';

export type CustomSelectOption = { value: string; label: string; detail?: string };

/**
 * A real <select> styled with `appearance: base-select`. Still native: keyboard,
 * typeahead and form submission are the browser's. Browsers without it show the
 * plain select with the same options.
 */
export function CustomSelect({
  label,
  options,
  ...rest
}: Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className' | 'style' | 'children'> & {
  label: ReactNode;
  options: CustomSelectOption[];
}) {
  const id = useId();
  return (
    <div {...stylex.props(shared.field, styles.wrap)}>
      <label htmlFor={id}>{label}</label>
      <select id={id} {...rest} {...stylex.props(styles.select)}>
        {/* @ts-expect-error <selectedcontent> is newer than React's JSX types */}
        <button><selectedcontent /></button>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} {...stylex.props(styles.option)}>
            {opt.label}
            {opt.detail ? <small {...stylex.props(styles.small)}> · {opt.detail}</small> : null}
          </option>
        ))}
      </select>
    </div>
  );
}

const base = '@supports (appearance: base-select)';
const styles = stylex.create({
  wrap: { maxWidth: '22rem' },
  select: {
    appearance: { default: null, [base]: 'base-select' },
    // With base-select the ::picker-icon draws the arrow; without it, base.css's
    // background arrow stays as the fallback.
    backgroundImage: { default: null, [base]: 'none' },
    paddingInlineEnd: { default: null, [base]: space.sm },
    display: { default: null, [base]: 'inline-flex' },
    alignItems: 'center',
    gap: space.sm,
    minHeight: { default: null, [base]: `calc(${shape.targetMin} + ${space.md})` },
    paddingInline: { default: null, [base]: space.sm },
    borderColor: { default: null, ':open': color.canvasText },
    '::picker(select)': {
      appearance: 'base-select',
      marginBlock: 2,
      padding: space.xs,
      borderWidth: shape.borderWidth,
      borderStyle: 'solid',
      borderColor: color.controlBorder,
      backgroundColor: color.surfaceRaised,
      color: color.canvasText,
    },
    '::picker-icon': {
      content: '""',
      width: chevron.size,
      height: chevron.size,
      backgroundColor: 'currentColor',
      mask: chevron.mask,
      forcedColorAdjust: 'none',
      rotate: { default: '0deg', ':open': chevron.flipped },
      transition: { default: null, '@media (prefers-reduced-motion: no-preference)': chevron.transition },
    },
  },
  option: {
    display: 'flex',
    alignItems: 'center',
    gap: space.sm,
    minHeight: `calc(${shape.targetMin} + ${space.sm})`,
    paddingBlock: space.xs,
    paddingInline: space.sm,
    backgroundColor: { default: null, ':hover': color.highlight, ':focus-visible': color.highlight },
    color: { default: null, ':hover': color.highlightText, ':focus-visible': color.highlightText },
    outline: { default: null, ':focus-visible': 'none' },
    fontWeight: { default: null, ':checked': 700 },
    '::checkmark': { content: '"✓"' },
  },
  small: { color: 'inherit', fontWeight: 400 },
});
