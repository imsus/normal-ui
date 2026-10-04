import * as stylex from '@stylexjs/stylex';
import { useId } from 'react';
import type { MeterHTMLAttributes, ReactNode } from 'react';
import { color, shape } from '@imsus/normal-ui-css/tokens.stylex';
import { shared } from './shared';

/**
 * A native meter for a measurement in a known range. The bar is always `link`
 * blue: browsers' green/yellow/red is removed, so `description` says what the
 * value means in words.
 */
export function Meter({
  label,
  description,
  children,
  ...rest
}: Omit<MeterHTMLAttributes<HTMLMeterElement>, 'className' | 'style'> & {
  label: ReactNode;
  description: ReactNode;
  /** Fallback text inside the meter, e.g. "9.2 GB of 10 GB". */
  children?: ReactNode;
}) {
  const id = useId();
  return (
    <div {...stylex.props(shared.field, styles.wrap)}>
      <label htmlFor={id}>{label}</label>
      <meter id={id} aria-describedby={`${id}-d`} {...rest} {...stylex.props(styles.meter)}>
        {children}
      </meter>
      <small id={`${id}-d`}>{description}</small>
    </div>
  );
}

const styles = stylex.create({
  wrap: { maxWidth: '24rem', marginBlockEnd: 16 },
  meter: {
    width: '100%',
    height: '1rem',
    accentColor: color.accent,
    '::-webkit-meter-bar': { backgroundColor: color.field, borderWidth: shape.borderWidth, borderStyle: 'solid', borderColor: color.controlBorder },
    '::-webkit-meter-optimum-value': { backgroundColor: color.link },
    '::-webkit-meter-suboptimum-value': { backgroundColor: color.link },
    '::-webkit-meter-even-less-good-value': { backgroundColor: color.link },
    '::-moz-meter-bar': { backgroundColor: color.link },
  },
});
