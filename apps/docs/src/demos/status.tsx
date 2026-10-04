import * as stylex from '@stylexjs/stylex';
import { useState } from 'react';
import { Alert } from '@imsus/normal-ui-react/components/Alert';
import { AlertDialog } from '@imsus/normal-ui-react/components/Dialog';
import { Badge } from '@imsus/normal-ui-react/components/Badge';
import { Button } from '@imsus/normal-ui-react/components/Button';
import { Cluster } from '@imsus/normal-ui-react/components/Layout';
import { Meter } from '@imsus/normal-ui-react/components/Meter';
import { Stepper } from '@imsus/normal-ui-react/components/Stepper';
import { Toast } from '@imsus/normal-ui-react/components/Popups';
import { shared } from '@imsus/normal-ui-react/components/shared';

export const Status = {
  Badge: () => (
    <Cluster>
      <Badge>Paid</Badge><Badge>Packing</Badge><Badge>Late</Badge>
      <Badge tone="strong">New</Badge><Badge tone="strong">3 low</Badge>
    </Cluster>
  ),
  Alert: () => (
    <div>
      <Alert kind="info" role="note">Couriers do not collect on Sunday 4 October, a public holiday.</Alert>
      <Alert kind="success" role="status">12 orders marked as shipped. Customers have been emailed.</Alert>
      <Alert kind="warning">3 products are almost out of stock. <a href="#stock">Review stock</a></Alert>
      <Alert kind="error" role="alert">Payments could not be loaded. Check your connection and <a href="#retry">try again</a>.</Alert>
    </div>
  ),
  AlertDialog: function AlertDialogDemo() {
    const [open, setOpen] = useState(false);
    const [result, setResult] = useState('');
    return (
      <div>
        <Button aria-haspopup="dialog" onClick={() => setOpen(true)}>Discard changes…</Button>
        <AlertDialog open={open} title="Discard your changes?"
          description="You edited the price and description of Rattan tray. If you leave now, those edits are lost."
          cancel="Keep editing" confirm="Discard changes"
          onClose={(confirmed) => { setOpen(false); setResult(confirmed ? 'Changes discarded.' : 'Still editing.'); }} />
        <p role="status" {...stylex.props(shared.muted)}>{result}</p>
      </div>
    );
  },
  Meter: () => (
    <div>
      <Meter label="Photo storage" min={0} max={10} low={7} high={9} optimum={0} value={9.2}
        description={<><b>Nearly full:</b> 9.2 GB of 10 GB used. <a href="#photos">Remove old photos</a></>}>9.2 GB of 10 GB</Meter>
      <Meter label="Orders this month" min={0} max={1000} value={412}
        description={<span {...stylex.props(shared.muted)}>412 of 1,000 included in your plan.</span>}>412 of 1,000</Meter>
    </div>
  ),
  Toast: function ToastDemo() {
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('Changes saved.');
    return (
      <div>
        <Button onClick={() => { setMsg('Changes saved.'); setOpen(true); }}>Save changes</Button>
        <Toast open={open} onDismiss={() => setOpen(false)} action={{ label: 'Undo', onClick: () => setMsg('Change undone.') }}>
          {msg}
        </Toast>
      </div>
    );
  },
  Stepper: () => <Stepper label="Checkout progress" steps={['Basket', 'Delivery', 'Payment', 'Review']} current={2} />,
};
