import * as stylex from '@stylexjs/stylex';
import { color, font, shape, space } from '../tokens.stylex';

/** Option rows shared by Listbox and Combobox. */
export const optionStyles = stylex.create({
  list: {
    listStyle: 'none',
    margin: 0,
    padding: 2,
    borderWidth: shape.borderWidth,
    borderStyle: 'solid',
    borderColor: color.controlBorder,
    backgroundColor: color.field,
    color: color.fieldText,
    maxHeight: '14rem',
    overflowY: 'auto',
  },
  option: {
    display: 'flex',
    alignItems: 'center',
    gap: space.sm,
    minHeight: `calc(${shape.targetMin} + ${space.sm})`,
    paddingBlock: space.xs,
    paddingInline: space.sm,
    cursor: 'default',
    fontFamily: font.sans,
    backgroundColor: { default: null, ':hover': color.highlight },
    color: { default: null, ':hover': color.highlightText },
    '::before': { content: '""', width: '1em', flex: 'none' },
  },
  selected: { fontWeight: 700, '::before': { content: '"✓" / ""', width: '1em', flex: 'none' } },
  active: {
    backgroundColor: { default: color.highlight, '@media (forced-colors: active)': 'Highlight' },
    color: { default: color.highlightText, '@media (forced-colors: active)': 'HighlightText' },
    outlineWidth: shape.focusWidth,
    outlineStyle: 'solid',
    outlineColor: color.focusRing,
    outlineOffset: `calc(-1 * ${shape.focusWidth})`,
    boxShadow: `inset 0 0 0 calc(${shape.focusWidth} + 2px) ${color.focusInset}`,
    forcedColorAdjust: 'none',
  },
});
