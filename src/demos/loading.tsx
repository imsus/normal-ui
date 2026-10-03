import * as stylex from '@stylexjs/stylex';
import { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Cluster } from '../components/Layout';
import { Loading, Skeleton } from '../components/Loading';
import { Table } from '../components/Table';
import { shared } from '../components/shared';

const s = stylex.create({
  page: { display: 'grid', gap: 32 },
  label: { margin: '0 0 8px' },
  row: { display: 'flex', gap: 12, alignItems: 'center' },
  grow: { flex: 1 },
  card: { maxWidth: '24rem' },
  p0: { margin: 0 },
});

const Label = ({ children }: { children: string }) => <p {...stylex.props(shared.eyebrow, s.label)}>{children}</p>;

/** Fake a request: busy for `ms`, then done. Starts busy on mount. */
function useFakeLoad(ms: number): [boolean, () => void] {
  const [busy, setBusy] = useState(true);
  const [run, setRun] = useState(0);
  useEffect(() => {
    setBusy(true);
    const t = setTimeout(() => setBusy(false), ms);
    return () => clearTimeout(t);
  }, [run, ms]);
  return [busy, () => setRun((n) => n + 1)];
}

/** Loading at button, component and region level. */
export function LoadingDemo() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState('');
  const [cardBusy, reloadCard] = useFakeLoad(1800);
  const [tableBusy, reloadTable] = useFakeLoad(2200);

  return (
    <div {...stylex.props(s.page)}>
      <section>
        <Label>Button: the action is under way</Label>
        <Cluster>
          <Button loading={saving} loadingText="Saving…"
            onClick={() => { setSaving(true); setSaved(''); setTimeout(() => { setSaving(false); setSaved('Changes saved.'); }, 1800); }}>
            Save changes
          </Button>
          <Button loading loadingText="Uploading 3 photos…">Upload</Button>
          <span role="status" {...stylex.props(shared.muted)}>{saved}</span>
        </Cluster>
      </section>

      <section>
        <Label>Component: a skeleton shaped like the content</Label>
        <Card xstyle={s.card}>
          <Loading busy={cardBusy} label="Loading customer…" placeholder={
            <div {...stylex.props(s.row)}>
              <Skeleton shape="circle" width="2.5rem" />
              <div {...stylex.props(s.grow)}><Skeleton lines={2} /></div>
            </div>
          }>
            <div {...stylex.props(s.row)}>
              <div>
                <p {...stylex.props(s.p0)}><b>Sari Wulandari</b></p>
                <p {...stylex.props(s.p0, shared.muted)}>12 orders · customer since 2024</p>
              </div>
            </div>
          </Loading>
        </Card>
        <p><Button onClick={reloadCard}>Reload customer</Button></p>
      </section>

      <section>
        <Label>Region or page: words and an indeterminate progress bar</Label>
        <Loading busy={tableBusy} label="Loading orders…">
          <Table caption="Latest orders" rowKey={(r) => r.order}
            columns={[{ key: 'order', label: 'Order' }, { key: 'customer', label: 'Customer' }, { key: 'total', label: 'Total', numeric: true }]}
            rows={[
              { order: '#1048', customer: 'Budi Hartono', total: 'Rp 289.000' },
              { order: '#1047', customer: 'Sari Wulandari', total: 'Rp 412.000' },
            ]} />
        </Loading>
        <p><Button onClick={reloadTable}>Reload orders</Button></p>
      </section>
    </div>
  );
}
