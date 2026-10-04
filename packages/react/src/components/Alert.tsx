import * as stylex from '@stylexjs/stylex';
import type { AriaRole, ReactNode } from 'react';
import { color, font, shape, space } from '@imsus/normal-ui-css/tokens.stylex';

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
}: {
  kind?: AlertKind;
  /** The leading word. Defaults to Note:, Done:, Warning: or Error:. */
  label?: string;
  role?: AriaRole;
  children: ReactNode;
}) {
  return (
    <div role={role} {...stylex.props(styles.alert, styles[kind])}>
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
