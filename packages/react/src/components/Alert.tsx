import * as stylex from '@stylexjs/stylex';
import type { AriaRole, CSSProperties, ReactNode } from 'react';
import { color, font, shape, space } from '@imsus/normal-ui-css/tokens.stylex';
import { mergeRootProps } from './shared';

export type AlertKind = 'info' | 'success' | 'warning' | 'error';

const words: Record<AlertKind, string> = { info: 'Note:', success: 'Done:', warning: 'Warning:', error: 'Error:' };

/**
 * A page-level message in a bordered box. It starts with its kind in words, and the
 * border weight is a second cue: 1px note, 2px done, 2px dashed warning, 3px error.
 * The status-* tokens colour the border and lead word: text colour in Normal UI, a hue
 * where a theme gives one.
 *
 * Roles: `alert` only for errors that appear after an action, `status` for success
 * after an action, none for messages present on load.
 */
export function Alert({
  kind = 'info',
  label = words[kind],
  role,
  children,
  className,
  style,
}: {
  kind?: AlertKind;
  /** The leading word. Defaults to Note:, Done:, Warning: or Error:. */
  label?: string;
  role?: AriaRole;
  children: ReactNode;
  /** Extra classes, concatenated after the component's own. Unlayered CSS wins. */
  className?: string;
  /** Inline style, spread after StyleX output. Wins property by property. */
  style?: CSSProperties;
}) {
  return (
    <div role={role} {...mergeRootProps(stylex.props(styles.alert, styles[kind]), { className, style })}>
      <p {...stylex.props(styles.body)}>
        <strong {...stylex.props(styles.label)}>{label}</strong> {children}
      </p>
    </div>
  );
}

const styles = stylex.create({
  alert: {
    borderWidth: shape.borderWidth,
    borderStyle: 'solid',
    borderColor: color.statusInfo,
    paddingBlock: space.sm,
    paddingInline: space.md,
    marginBlock: space.md,
  },
  body: { margin: 0 },
  label: { fontFamily: font.sans, color: 'var(--pd-status, inherit)' },
  info: { '--pd-status': color.statusInfo },
  success: { borderWidth: 2, borderColor: color.statusSuccess, '--pd-status': color.statusSuccess },
  warning: { borderWidth: 2, borderStyle: 'dashed', borderColor: color.statusWarning, '--pd-status': color.statusWarning },
  error: { borderWidth: 3, borderColor: color.statusError, '--pd-status': color.statusError },
});
