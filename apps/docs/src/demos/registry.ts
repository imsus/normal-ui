// Docs metadata for each component: its atomic level, its group (what it is for),
// whether its demo needs hydrating, and a short React usage example. The guidelines
// live in docs/components/<Name>.md.
//
// Levels follow Brad Frost's atomic design:
// - atoms: one control or element, with the label it needs to be usable. It cannot be
//   split further without losing its meaning.
// - molecules: a few atoms working as one unit with one job.
// - organisms: a distinct section of an interface, often with its own state and
//   keyboard model.
export type Level = 'atoms' | 'molecules' | 'organisms';
export type Entry = {
  level: Level;
  /** The smaller parts it is built from, by registry name. "Used in" is the reverse. */
  madeOf?: string[];
  group: string;
  interactive: boolean;
  usage: string;
};

export const groups = ['Actions', 'Navigation', 'Forms', 'Status', 'Disclosure', 'Content', 'Data', 'Layout'] as const;

export const registry: Record<string, Entry> = {
  Button: { level: 'atoms', group: 'Actions', interactive: false, usage: `<Button onClick={save}>Save address</Button>
<Button type="submit">Place order</Button>
<Button pressed={bold} onClick={toggleBold}>Bold</Button>

// One character or icon: square, named in words
<Button square aria-label="Close">×</Button>` },
  ButtonGroup: { level: 'molecules', madeOf: ['Button'], group: 'Actions', interactive: true, usage: `<ButtonGroup label="View">
  <Button pressed={view === 'list'} onClick={() => setView('list')}>List</Button>
  <Button pressed={view === 'grid'} onClick={() => setView('grid')}>Grid</Button>
</ButtonGroup>

// Anything that is not a <Button> takes the joined look by hand
<ButtonGroup>
  <Button square aria-label="Decrease quantity">−</Button>
  <input type="number" {...stylex.props(joined.item)} />
  <Button square aria-label="Increase quantity">+</Button>
</ButtonGroup>` },
  MenuButton: { level: 'molecules', madeOf: ['Button'], group: 'Actions', interactive: true, usage: `<MenuButton label="Order actions">
  <MenuItem onClick={print}>Print packing slip</MenuItem>
  <MenuItem href="#email">Email the customer</MenuItem>
  <MenuSeparator />
  <MenuItem onClick={confirmCancel}>Cancel order…</MenuItem>
</MenuButton>` },
  Menubar: { level: 'organisms', madeOf: ['MenuButton'], group: 'Actions', interactive: true, usage: `<Menubar label="Product editor" menus={[
  { label: 'Edit', items: [
    { label: 'Undo', shortcut: 'Ctrl+Z', keyshortcuts: 'Control+Z', onSelect: undo },
    { type: 'separator' },
    { type: 'checkbox', label: 'Show archived', checked, onChange: setChecked },
  ] },
]} />` },
  Toolbar: { level: 'organisms', madeOf: ['ButtonGroup', 'Button'], group: 'Actions', interactive: true, usage: `<Toolbar label="Text formatting" controls="desc">
  <ButtonGroup label="Text style">
    <Button square pressed={bold} onClick={toggleBold} aria-label="Bold">B</Button>
    <Button square pressed={italic} onClick={toggleItalic} aria-label="Italic">I</Button>
  </ButtonGroup>
  <ToolbarSeparator />
  <Button onClick={clear}>Clear formatting</Button>
</Toolbar>` },
  Tooltip: { level: 'molecules', madeOf: ['Button'], group: 'Actions', interactive: true, usage: `<Tooltip content="We email you when stock falls below this number.">
  <button type="button" aria-label="About stock alerts">?</button>
</Tooltip>` },
  HintPopover: { level: 'molecules', madeOf: ['Button'], group: 'Actions', interactive: false, usage: `<HintPopover label="What is the stock alert level?"
  hint="We email you when stock falls below this number." />` },
  CommandDialog: { level: 'organisms', madeOf: ['Button'], group: 'Actions', interactive: true, usage: `<Dialog open={open} role="alertdialog" title="Delete Batik table runner?"
  description="You cannot undo this."
  onClose={(value) => { setOpen(false); if (value === 'delete') remove(); }}
  actions={<><button value="keep" autoFocus>Keep product</button>
             <button value="delete">Delete product</button></>} />` },
  Link: { level: 'atoms', group: 'Navigation', interactive: false, usage: `<Link href="/refunds">Read the refund policy</Link>` },
  Breadcrumb: { level: 'molecules', madeOf: ['Link'], group: 'Navigation', interactive: false, usage: `<Breadcrumb items={[
  { href: '/help', label: 'Help' },
  { href: '/help/returns', label: 'Returning an item' },
]} />` },
  Tabs: { level: 'organisms', group: 'Navigation', interactive: true, usage: `<Tabs label="Order details" tabs={[
  { label: 'Items', content: <Items /> },
  { label: 'Delivery', content: <Delivery /> },
]} />` },
  Stepper: { level: 'molecules', group: 'Navigation', interactive: false, usage: `<Stepper label="Checkout progress" current={2}
  steps={['Basket', 'Delivery', 'Payment', 'Review']} />` },
  TableOfContents: { level: 'organisms', madeOf: ['Link'], group: 'Navigation', interactive: true, usage: `<TableOfContents items={[{ href: '#how', label: 'How to return' }]} />` },
  TreeView: { level: 'organisms', group: 'Navigation', interactive: true, usage: `<TreeView label="Categories" defaultExpanded={['all']} onSelect={(n) => show(n.id)}
  items={[{ id: 'all', label: 'All products', children: [{ id: 'food', label: 'Food' }] }]} />` },
  TextField: { level: 'atoms', group: 'Forms', interactive: false, usage: `<TextField label="Email address" type="email" autoComplete="email"
  placeholder="name@example.com" />
<TextField label="Delivery date" error="Enter a date after today." />
<TextField label="Note" multiline />` },
  Select: { level: 'atoms', group: 'Forms', interactive: false, usage: `<Select label="Country" autoComplete="country-name">
  <option>Indonesia</option><option>Malaysia</option>
</Select>

// Label beside the field, for toolbars, filters and top bars
<Select label="Sort by" layout="inline">…</Select>` },
  InputGroup: { level: 'molecules', madeOf: ['Button', 'TextField'], group: 'Forms', interactive: false, usage: `<InputGroup label="Website" hint="The part after https://.">
  <InputGroupAddon>https://</InputGroupAddon>
  <InputGroupInput autoComplete="url" placeholder="example.com" />
</InputGroup>

// Two or more fields: each names itself with label
<InputGroup label="Phone number">
  <InputGroupSelect label="Country code" autoComplete="tel-country-code">
    <option>+62</option><option>+60</option>
  </InputGroupSelect>
  <InputGroupInput label="Number" type="tel" autoComplete="tel-national" />
</InputGroup>

// Buttons join the row by themselves
<InputGroup label="Search products">
  <InputGroupInput type="search" />
  <Button type="submit">Search</Button>
</InputGroup>` },
  CustomSelect: { level: 'atoms', group: 'Forms', interactive: false, usage: `<CustomSelect label="Courier" defaultValue="jnt" options={[
  { value: 'jnt', label: 'J&T Express', detail: '2–3 days · Rp 22.000' },
]} />` },
  Checkbox: { level: 'atoms', group: 'Forms', interactive: false, usage: `<Checkbox label="Gift wrap this order" checked={wrap} onChange={(e) => setWrap(e.target.checked)} />` },
  Radio: { level: 'atoms', group: 'Forms', interactive: false, usage: `<Fieldset legend="Delivery speed">
  <Radio name="speed" value="std" label="Standard, 3–5 days" defaultChecked />
  <Radio name="speed" value="exp" label="Express, 1–2 days" />
</Fieldset>` },
  Fieldset: { level: 'molecules', madeOf: ['Checkbox', 'Radio'], group: 'Forms', interactive: false, usage: `<Fieldset legend="Delivery speed">…</Fieldset>` },
  TriStateCheckbox: { level: 'molecules', madeOf: ['Fieldset', 'Checkbox'], group: 'Forms', interactive: true, usage: `<TriStateCheckbox legend="Notify me by" parentLabel="All channels"
  options={['Email', 'Push notification', 'WhatsApp']} onChange={setChannels} />` },
  Switch: { level: 'atoms', group: 'Forms', interactive: false, usage: `<Switch label="Holiday mode" description="Hides the shop." checked={on}
  onChange={(e) => save(e.target.checked)} />` },
  Slider: { level: 'atoms', group: 'Forms', interactive: true, usage: `<Slider label="Low stock alert" min={0} max={50} defaultValue={5}
  describe={(v) => <>Email me below <b>{v}</b> items.</>} valueText={(v) => v + ' items'} />` },
  RangeSlider: { level: 'molecules', madeOf: ['Fieldset', 'Slider'], group: 'Forms', interactive: true, usage: `<RangeSlider legend="Price range" min={0} max={500000} step={10000}
  defaultValue={[100000, 300000]} format={(v) => 'Rp ' + v.toLocaleString('id-ID')} />` },
  Spinbutton: { level: 'molecules', madeOf: ['ButtonGroup', 'Button'], group: 'Forms', interactive: true, usage: `<Spinbutton label="Quantity" min={1} max={10} hint="1 to 10 per order." />` },
  Listbox: { level: 'molecules', group: 'Forms', interactive: true, usage: `<Listbox label="Default courier" options={couriers} onChange={setCourier} />` },
  Combobox: { level: 'molecules', madeOf: ['TextField'], group: 'Forms', interactive: true, usage: `<Combobox label="City" options={cities} noun={['city', 'cities']} onSelect={setCity} />` },
  FileUpload: { level: 'molecules', madeOf: ['Button'], group: 'Forms', interactive: true, usage: `<FileUpload label="Product photos" prompt="Drop photos here or choose files"
  hint="JPEG or PNG, up to 10 MB each." accept="image/*" files={files} onFiles={upload} />` },
  Alert: { level: 'atoms', group: 'Status', interactive: false, usage: `<Alert kind="warning">3 products are almost out of stock.</Alert>
<Alert kind="error" role="alert">Payments could not be loaded.</Alert>` },
  CommandPalette: { level: 'organisms', madeOf: ['CommandDialog', 'Combobox'], group: 'Navigation', interactive: true, usage: `const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)} aria-keyshortcuts="Control+K Meta+K">Search</Button>
<CommandPalette open={open} onOpenChange={setOpen} shortcut="k" commands={[
  { label: 'Orders', href: '/orders', group: 'Go to' },
  { label: 'New product', group: 'Actions', keywords: 'add create', onSelect: newProduct },
  { label: 'Export orders', group: 'Actions', detail: 'CSV', onSelect: exportCsv },
]} />` },
  AlertDialog: { level: 'organisms', madeOf: ['Button'], group: 'Status', interactive: true, usage: `<AlertDialog open={open} title="Discard your changes?"
  description="Your edits are lost if you leave now."
  cancel="Keep editing" confirm="Discard changes"
  onClose={(confirmed) => { setOpen(false); if (confirmed) discard(); }} />` },
  Badge: { level: 'atoms', group: 'Status', interactive: false, usage: `<Badge>Paid</Badge> <Badge tone="strong">3 low</Badge>` },
  Loading: { level: 'molecules', madeOf: ['Button'], group: 'Status', interactive: true, usage: `// Button: the action is under way
<Button loading={saving} loadingText="Saving…" onClick={save}>Save changes</Button>

// Component: a skeleton shaped like the content
<Loading busy={loading} label="Loading customer…" placeholder={<Skeleton lines={2} />}>
  <Customer />
</Loading>

// Region or page: the label and an indeterminate progress bar
<Loading busy={loading} label="Loading orders…" size="page">
  <Orders />
</Loading>` },
  Meter: { level: 'atoms', group: 'Status', interactive: false, usage: `<Meter label="Photo storage" min={0} max={10} high={9} value={9.2}
  description="Nearly full: 9.2 GB of 10 GB used." />` },
  Toast: { level: 'molecules', madeOf: ['Button'], group: 'Status', interactive: true, usage: `<Toast open={saved} onDismiss={() => setSaved(false)}
  action={{ label: 'Undo', onClick: undo }}>Changes saved.</Toast>` },
  Accordion: { level: 'organisms', madeOf: ['Button'], group: 'Disclosure', interactive: true, usage: `<Accordion level={3} items={[
  { title: 'Shipping', content: <p>3–5 days.</p> },
  { title: 'Returns', content: <p>Within 30 days.</p> },
]} />` },
  Details: { level: 'atoms', group: 'Disclosure', interactive: false, usage: `<Details summary="What does delivery cost?" name="faq">
  Free over Rp 250.000.
</Details>` },
  Card: { level: 'organisms', madeOf: ['Button', 'Table'], group: 'Content', interactive: false, usage: `<Card body="inset" size="lg">
  <Card.Header>
    <Card.Heading level={2}>Profile</Card.Heading>
    <Card.Subheading>This is how others will see you</Card.Subheading>
    <Card.Actions><Button square aria-label="More options">⋯</Button></Card.Actions>
  </Card.Header>
  <Card.Body>
    <TextField label="Name" />
  </Card.Body>
  <Card.Footer>
    <p>Last saved 2 minutes ago</p>
    <Card.Actions><Button>Cancel</Button><Button type="submit">Save</Button></Card.Actions>
  </Card.Footer>
</Card>` },
  Carousel: { level: 'organisms', madeOf: ['Button'], group: 'Content', interactive: true, usage: `<Carousel label="Shop highlights" slides={[{ title: 'Autumn sale', body: '…' }]} />` },
  ScrollCarousel: { level: 'organisms', group: 'Content', interactive: false, usage: `<ScrollCarousel label="Shop highlights" items={[{ title: 'Autumn sale', body: '…' }]} />` },
  Feed: { level: 'organisms', madeOf: ['Loading', 'Button'], group: 'Content', interactive: true, usage: `<Feed label="Customer reviews" articles={reviews} busy={loading} onLoadMore={loadMore} />` },
  ReviewComments: { level: 'molecules', group: 'Content', interactive: false, usage: `<p>From <Suggestion remove="local" insert="sustainably harvested" /> rattan.
  <Commented commentId="c1">45 × 30 cm</Commented></p>
<Comment id="c1" author="Rina" time={{ iso: '2026-09-29T09:14', label: '09:14' }}>
  Outer size or inside?
</Comment>` },
  Table: { level: 'organisms', group: 'Data', interactive: false, usage: `<Table caption="Orders this week" rowKey={(r) => r.order}
  columns={[{ key: 'order', label: 'Order' }, { key: 'total', label: 'Total', numeric: true }]}
  rows={orders} />` },
  Grid: { level: 'organisms', madeOf: ['TextField'], group: 'Data', interactive: true, usage: `<Grid label="Stock levels" rows={products} rowName={(r) => r.product}
  columns={columns} editable={['stock']} onEdit={(row, key, value) => save(row, value)} />` },
  Treegrid: { level: 'organisms', madeOf: ['Table'], group: 'Data', interactive: true, usage: `<Treegrid label="Orders by category" columns={['Category', 'Orders']}
  groups={[{ label: 'Food', value: 96, children: [{ label: 'Coffee', value: 96 }] }]} />` },
  WindowSplitter: { level: 'organisms', group: 'Layout', interactive: true, usage: `<WindowSplitter label="Resize order list" start={<Orders />} end={<Order />} />` },
};
