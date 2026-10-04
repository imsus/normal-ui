import * as stylex from '@stylexjs/stylex';
import { useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { Breadcrumb } from '@imsus/normal-ui-react/components/Breadcrumb';
import { Button } from '@imsus/normal-ui-react/components/Button';
import { ButtonGroup } from '@imsus/normal-ui-react/components/ButtonGroup';
import { Cluster, VisuallyHidden } from '@imsus/normal-ui-react/components/Layout';
import { CommandPalette } from '@imsus/normal-ui-react/components/CommandPalette';
import { Dialog } from '@imsus/normal-ui-react/components/Dialog';
import { HintPopover, MenuButton, MenuItem, MenuSeparator, Tooltip } from '@imsus/normal-ui-react/components/Popups';
import { Link } from '@imsus/normal-ui-react/components/Link';
import { Menubar } from '@imsus/normal-ui-react/components/Menubar';
import { TableOfContents } from '@imsus/normal-ui-react/components/TableOfContents';
import { Tabs } from '@imsus/normal-ui-react/components/Tabs';
import { Toolbar, ToolbarSeparator } from '@imsus/normal-ui-react/components/Toolbar';
import { TreeView } from '@imsus/normal-ui-react/components/TreeView';
import { shared } from '@imsus/normal-ui-react/components/shared';
import { buttonStyles } from '@imsus/normal-ui-react/components/Button';

const s = stylex.create({
  focused: { outline: '2px solid var(--focus-ring)', outlineOffset: 2 },
  spaced: { marginTop: 56 },
  status: { marginTop: 160 },
  toolbar: { display: 'grid', gap: 4, maxWidth: '34rem' },
  bold: { fontWeight: 700 },
  italic: { fontStyle: 'italic' },
  underline: { textDecorationLine: 'underline' },
  toc: { display: 'grid', gridTemplateColumns: '12rem 1fr', gap: 24, height: 320 },
  article: { overflowY: 'auto', paddingRight: 8 },
  last: { marginBottom: 200 },
});

export const Actions = {
  Button: () => (
    <Cluster>
      <Button>Save address</Button>
      <Button type="submit">Place order</Button>
      <Button xstyle={s.focused}>Focused</Button>
      <Button disabled>Unavailable</Button>
      <Button square aria-label="Close">×</Button>
      <Button square aria-label="More options">⋯</Button>
    </Cluster>
  ),
  Link: () => (
    <div>
      <p>Read the <Link href="#refunds">refund policy</Link> before you return an item. You already opened the{' '}
        <Link href="about:blank">shipping guide</Link>.</p>
      <p><Link href="#help" xstyle={s.focused}>Contact support</Link> (shown with its keyboard focus ring)</p>
    </div>
  ),
  ButtonGroup: function ButtonGroupDemo() {
    const [view, setView] = useState<'List' | 'Grid'>('List');
    const [status, setStatus] = useState('');
    return (
      <Cluster gap="16px">
        <ButtonGroup label="View">
          {(['List', 'Grid'] as const).map((v) => (
            <Button key={v} pressed={view === v} onClick={() => setView(v)}>{v}</Button>
          ))}
        </ButtonGroup>
        <ButtonGroup label="Order">
          <Button onClick={() => setStatus('Previous order.')}>Previous</Button>
          <Button onClick={() => setStatus('Next order.')}>Next</Button>
        </ButtonGroup>
        <ButtonGroup label="Export">
          <Button>CSV</Button>
          <Button>PDF</Button>
          <Button disabled>Excel</Button>
        </ButtonGroup>
        <p role="status" {...stylex.props(shared.muted)}>{status || `Showing as ${view.toLowerCase()}.`}</p>
      </Cluster>
    );
  },
  MenuButton: () => (
    <MenuButton label="Order actions">
      <MenuItem>Print packing slip</MenuItem>
      <MenuItem>Mark as shipped</MenuItem>
      <MenuItem href="#email">Email the customer</MenuItem>
      <MenuSeparator />
      <MenuItem>Cancel order…</MenuItem>
    </MenuButton>
  ),
  Tooltip: () => (
    <p {...stylex.props(s.spaced)}>
      Stock alert level{' '}
      <Tooltip content="We email you when stock falls below this number.">
        <button type="button" {...stylex.props(buttonStyles.square)}>?</button>
      </Tooltip>
    </p>
  ),
  HintPopover: () => (
    <p {...stylex.props(s.spaced)}>
      Stock alert level <HintPopover label="What is the stock alert level?" hint="We email you when stock falls below this number." />
    </p>
  ),
  CommandDialog: function CommandDialogDemo() {
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState('');
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Delete Batik table runner…</Button>
        <Dialog open={open} role="alertdialog" title="Delete Batik table runner?"
          description="It disappears from the shop straight away. You cannot undo this."
          onClose={(v) => { setOpen(false); setStatus(v === 'delete' ? 'Batik table runner deleted.' : 'Kept.'); }}
          actions={<><button value="keep" autoFocus>Keep product</button><button value="delete">Delete product</button></>} />
        <p role="status" {...stylex.props(shared.muted)}>{status}</p>
      </div>
    );
  },
  Toolbar: function ToolbarDemo() {
    const [on, setOn] = useState({ bold: false, italic: false, underline: false });
    const flip = (k: keyof typeof on) => setOn((o) => ({ ...o, [k]: !o[k] }));
    return (
      <div {...stylex.props(s.toolbar)}>
        <span id="tb-l">Product description</span>
        <Toolbar label="Text formatting" controls="tb-desc">
          <ButtonGroup label="Text style">
            <Button square pressed={on.bold} aria-keyshortcuts="Control+B" onClick={() => flip('bold')}><b>B</b><VisuallyHidden> Bold</VisuallyHidden></Button>
            <Button square pressed={on.italic} aria-keyshortcuts="Control+I" onClick={() => flip('italic')}><i>I</i><VisuallyHidden> Italic</VisuallyHidden></Button>
            <Button square pressed={on.underline} aria-keyshortcuts="Control+U" onClick={() => flip('underline')}><u>U</u><VisuallyHidden> Underline</VisuallyHidden></Button>
          </ButtonGroup>
          <ToolbarSeparator />
          <Button>Insert link</Button>
          <Button onClick={() => setOn({ bold: false, italic: false, underline: false })}>Clear formatting</Button>
        </Toolbar>
        <textarea id="tb-desc" aria-labelledby="tb-l" defaultValue="Hand-woven in Cirebon from natural rattan. 45 × 30 cm."
          onKeyDown={(e) => {
            if (!e.ctrlKey && !e.metaKey) return;
            const k = ({ b: 'bold', i: 'italic', u: 'underline' } as const)[e.key.toLowerCase() as 'b'];
            if (!k) return;
            e.preventDefault();
            flip(k);
          }}
          {...stylex.props(on.bold && s.bold, on.italic && s.italic, on.underline && s.underline)} />
      </div>
    );
  },
  Menubar: function MenubarDemo() {
    const [status, setStatus] = useState('Left and Right move along the bar; Down opens a menu.');
    const [layout, setLayout] = useState('List');
    const [archived, setArchived] = useState(false);
    const pick = (l: string) => () => setStatus(`${l} chosen.`);
    return (
      <div>
        <Menubar label="Product editor" menus={[
          { label: 'Product', items: [
            { label: 'New product', shortcut: 'Ctrl+N', keyshortcuts: 'Control+N', onSelect: pick('New product') },
            { label: 'Duplicate', onSelect: pick('Duplicate') },
            { type: 'separator' },
            { label: 'Archive…', onSelect: pick('Archive') },
          ] },
          { label: 'Edit', items: [
            { label: 'Undo', shortcut: 'Ctrl+Z', keyshortcuts: 'Control+Z', onSelect: pick('Undo') },
            { label: 'Redo', shortcut: 'Ctrl+Shift+Z', keyshortcuts: 'Control+Shift+Z', onSelect: pick('Redo') },
          ] },
          { label: 'View', items: [
            { type: 'radio', label: 'Layout', options: ['List', 'Grid'], value: layout, onChange: (v) => { setLayout(v); setStatus(`${v} view`); } },
            { type: 'separator' },
            { type: 'checkbox', label: 'Show archived', checked: archived, onChange: (c) => { setArchived(c); setStatus(`Show archived ${c ? 'on' : 'off'}`); } },
          ] },
        ]} />
        <p role="status" {...stylex.props(shared.muted, s.status)}><small>{status}</small></p>
      </div>
    );
  },
  Breadcrumb: () => (
    <Breadcrumb items={[
      { href: '#help', label: 'Help' },
      { href: '#orders', label: 'Orders and delivery' },
      { href: '#returns', label: 'Returning an item' },
    ]} />
  ),
  Tabs: () => (
    <div>
      <Tabs label="Order details" tabs={[
        { label: 'Items', content: <p>2 items: Linen shirt (M), Teak cutting board.</p> },
        { label: 'Delivery', content: <p>Standard, 3–5 days, to Jl. Braga No. 12, Bandung.</p> },
        { label: 'Payment', content: <p>Paid by bank transfer on 28 September.</p> },
      ]} />
      <p {...stylex.props(shared.muted)}><small>Use the arrow keys to move between tabs.</small></p>
    </div>
  ),
  TreeView: function TreeViewDemo() {
    const [status, setStatus] = useState('Up/Down move, Right opens, Left closes, Enter selects.');
    return (
      <div>
        <TreeView label="Categories" defaultExpanded={['all', 'clothing']} onSelect={(n) => setStatus(`Showing ${n.label}.`)} items={[
          { id: 'all', label: 'All products', children: [
            { id: 'clothing', label: 'Clothing', children: [{ id: 'shirts', label: 'Shirts' }, { id: 'batik', label: 'Batik' }] },
            { id: 'home', label: 'Home and kitchen', children: [
              { id: 'boards', label: 'Cutting boards' }, { id: 'baskets', label: 'Baskets' }, { id: 'linen', label: 'Table linen' }] },
            { id: 'food', label: 'Food', children: [{ id: 'coffee', label: 'Coffee' }, { id: 'snacks', label: 'Snacks' }] },
          ] },
        ]} />
        <p role="status" {...stylex.props(shared.muted)}><small>{status}</small></p>
      </div>
    );
  },
  TableOfContents: () => {
    // On a real page the links are plain fragment links. Here the article is a small
    // panel inside the docs page, and following a fragment would scroll the docs page
    // too and change its URL. So the demo keeps the jump inside the panel: it scrolls
    // only the article, then moves focus to the heading, as fragment navigation does.
    const article = useRef<HTMLDivElement>(null);
    const jump = (e: MouseEvent) => {
      const link = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      const panel = article.current;
      const heading = link && panel?.querySelector<HTMLElement>(link.hash);
      if (!heading || !panel) return;
      e.preventDefault();
      panel.scrollTo({ top: panel.scrollTop + heading.getBoundingClientRect().top - panel.getBoundingClientRect().top });
      heading.focus({ preventScroll: true });
    };
    const h = (id: string, text: string) => <h2 id={`toc-demo-${id}`} tabIndex={-1}>{text}</h2>;
    return (
      <div onClick={jump} {...stylex.props(s.toc)}>
        <TableOfContents items={[
          { href: '#toc-demo-1', label: 'How to return' }, { href: '#toc-demo-2', label: 'Return windows' },
          { href: '#toc-demo-3', label: 'Refunds' }, { href: '#toc-demo-4', label: 'Damaged items' },
        ]} />
        <div ref={article} tabIndex={0} aria-label="Article" {...stylex.props(s.article)}>
          {h('1', 'How to return')}<p>Open Your orders, choose the order and select Return items. Show the QR code at any drop-off point.</p><p>Keep the receipt until your refund arrives.</p>
          {h('2', 'Return windows')}<p>30 days for clothing and home items, 14 days for electronics. Food cannot be returned.</p><p>The window starts on the day the parcel is delivered.</p>
          {h('3', 'Refunds')}<p>We refund to the way you paid within 5 working days of receiving the item.</p><p>Bank transfers can take 2 more days to appear.</p>
          {h('4', 'Damaged items')}<p>Choose Arrived damaged and add a photo. We refund straight away.</p><p {...stylex.props(s.last)}>You do not need to send the item back.</p>
        </div>
      </div>
    );
  },
  CommandPalette: () => {
    const [open, setOpen] = useState(false);
    const [ran, setRan] = useState('');
    const say = (what: string) => () => setRan(what);
    return (
      <Cluster>
        {/* No shortcut here: Ctrl/Cmd+K already opens the docs' own palette. */}
        <Button onClick={() => setOpen(true)} aria-haspopup="dialog">Open command palette</Button>
        <span role="status">{ran ? `Ran: ${ran}` : ''}</span>
        <CommandPalette open={open} onOpenChange={setOpen} label="Shop commands" commands={[
          { label: 'Orders', group: 'Go to', keywords: 'sales', onSelect: say('Go to orders') },
          { label: 'Products', group: 'Go to', keywords: 'stock catalogue', onSelect: say('Go to products') },
          { label: 'Customers', group: 'Go to', keywords: 'people buyers', onSelect: say('Go to customers') },
          { label: 'Settings', group: 'Go to', keywords: 'preferences', onSelect: say('Go to settings') },
          { label: 'New product', group: 'Actions', keywords: 'add create', onSelect: say('New product') },
          { label: 'Export orders', group: 'Actions', detail: 'CSV', keywords: 'download spreadsheet', onSelect: say('Export orders') },
          { label: 'Print packing slips', group: 'Actions', detail: '3 orders', onSelect: say('Print packing slips') },
          { label: 'Turn on holiday mode', group: 'Shop', keywords: 'pause close vacation', onSelect: say('Turn on holiday mode') },
        ]} />
      </Cluster>
    );
  },
};
