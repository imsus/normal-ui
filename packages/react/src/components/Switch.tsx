import * as stylex from '@stylexjs/stylex';
import { useId } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { color, shape, space } from '@imsus/normal-ui-css/tokens.stylex';
import { shared } from './shared';

/**
 * A checkbox with role="switch", drawn 44×24 with a sliding knob. For settings that
 * take effect at once; inside a form saved with a button, use a Checkbox.
 * Knob position and fill both change, so state never relies on colour alone.
 */
export function Switch({
  label,
  description,
  id,
  ...rest
}: Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'style' | 'type' | 'role'> & {
  /** Names the setting, not the state: "Holiday mode". */
  label: ReactNode;
  description?: ReactNode;
}) {
  const auto = useId();
  const inputId = id ?? auto;
  const descId = description ? `${inputId}-d` : undefined;
  return (
    <div {...stylex.props(styles.wrap)}>
      <p {...stylex.props(styles.row)}>
        <input type="checkbox" role="switch" id={inputId} aria-describedby={descId} {...rest} {...stylex.props(styles.track)} />
        <label htmlFor={inputId}>{label}</label>
      </p>
      {description ? (
        <p id={descId} {...stylex.props(shared.muted, styles.desc)}>
          <small>{description}</small>
        </p>
      ) : null}
    </div>
  );
}

const off = `radial-gradient(circle at 11px 50%, ${color.canvasText} 7px, transparent 7.5px)`;
const on = `radial-gradient(circle at calc(100% - 11px) 50%, ${color.canvas} 7px, transparent 7.5px)`;

const styles = stylex.create({
  wrap: { marginBlockEnd: '12px' },
  row: { display: 'flex', alignItems: 'center', margin: 0 },
  desc: { marginBlock: '4px 0', marginInlineStart: '52px' },
  track: {
    appearance: 'none',
    flex: 'none',
    width: 44,
    height: 24,
    margin: 0,
    marginInlineEnd: space.sm,
    verticalAlign: 'middle',
    borderWidth: shape.borderWidth,
    borderStyle: { default: 'solid', ':disabled': 'dashed' },
    borderColor: { default: color.controlBorder, ':checked': color.accent, '@media (forced-colors: active)': 'CanvasText' },
    borderRadius: 12,
    cursor: { default: 'pointer', ':disabled': 'not-allowed' },
    opacity: 1,
    backgroundColor: { default: color.field, ':checked': color.accent },
    backgroundImage: { default: off, ':checked': on },
    forcedColorAdjust: 'none',
    transition: { default: null, '@media (prefers-reduced-motion: no-preference)': 'background-position .15s' },
  },
});
