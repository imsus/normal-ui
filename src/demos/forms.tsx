import * as stylex from '@stylexjs/stylex';
import { useState } from 'react';
import { Checkbox, Fieldset, Radio, Select, TextField } from '../components/Field';
import { Combobox } from '../components/Combobox';
import { CustomSelect } from '../components/CustomSelect';
import { FileUpload } from '../components/FileUpload';
import { Listbox } from '../components/Listbox';
import { RangeSlider, Slider, Spinbutton } from '../components/Range';
import { Switch } from '../components/Switch';
import { TriStateCheckbox } from '../components/TriStateCheckbox';
import type { UploadItem } from '../components/FileUpload';
import { shared } from '../components/shared';

const rp = (v: number) => `Rp ${v.toLocaleString('id-ID')}`;
const s = stylex.create({ gap: { display: 'grid', gap: 12 } });

export const Forms = {
  Checkbox: () => (
    <div>
      <Checkbox label="Email me when it ships" defaultChecked />
      <Checkbox label="Gift wrap this order" />
      <Checkbox label="Next-day delivery (not available to this address)" disabled />
    </div>
  ),
  Radio: () => (
    <div>
      <Radio name="ship" label="Standard, 3–5 days" defaultChecked />
      <Radio name="ship" label="Express, 1–2 days" />
      <Radio name="ship" label="Collect from store" />
    </div>
  ),
  Fieldset: () => (
    <Fieldset legend="Delivery speed">
      <Radio name="spd" label="Standard, 3–5 days" defaultChecked />
      <Radio name="spd" label="Express, 1–2 days" />
    </Fieldset>
  ),
  TextField: () => (
    <div {...stylex.props(s.gap)}>
      <TextField label="Email address" type="email" placeholder="name@example.com" autoComplete="email" />
      <TextField label="Delivery date" defaultValue="12 March" error="Enter a date after today, like 30 September." />
      <TextField label="Note for the courier" multiline hint="Grows as you type, up to 12 lines." />
    </div>
  ),
  Select: () => (
    <div {...stylex.props(s.gap)}>
      <Select label="Country" autoComplete="country-name">
        <option>Indonesia</option><option>Malaysia</option><option>Singapore</option><option>Thailand</option>
      </Select>
      <Select label="Sort by" layout="inline">
        <option>Newest first</option><option>Price, low to high</option><option>Price, high to low</option>
      </Select>
    </div>
  ),
  CustomSelect: () => (
    <div>
      <CustomSelect label="Courier" defaultValue="jnt" options={[
        { value: 'jne', label: 'JNE Regular', detail: '3–5 days · Rp 18.000' },
        { value: 'jnt', label: 'J&T Express', detail: '2–3 days · Rp 22.000' },
        { value: 'sicepat', label: 'SiCepat', detail: '1–2 days · Rp 27.000' },
        { value: 'gosend', label: 'GoSend Same Day', detail: 'today · Rp 45.000' },
      ]} />
      <p {...stylex.props(shared.muted)}><small>Browsers without customizable select show the native list with the same options.</small></p>
    </div>
  ),
  Switch: () => (
    <div>
      <Switch label="Email me about new orders" defaultChecked description="Sent as they arrive, to imam@example.com." />
      <Switch label="Holiday mode: hide the shop" />
      <Switch label="Same-day delivery (not available in your area)" disabled />
    </div>
  ),
  Slider: () => (
    <Slider label="Low stock alert" min={0} max={50} defaultValue={5}
      describe={(v) => <>Email me when stock falls below <b>{v}</b> {v === 1 ? 'item' : 'items'}.</>}
      valueText={(v) => `${v} ${v === 1 ? 'item' : 'items'}`} />
  ),
  RangeSlider: () => (
    <RangeSlider legend="Price range" min={0} max={500000} step={10000} defaultValue={[100000, 300000]} format={rp} />
  ),
  Spinbutton: () => <Spinbutton label="Quantity" min={1} max={10} defaultValue={2} hint="1 to 10 per order." />,
  TriStateCheckbox: () => (
    <TriStateCheckbox legend="Notify me by" parentLabel="All channels" options={['Email', 'Push notification', 'WhatsApp']}
      defaultChecked={['Email', 'WhatsApp']} />
  ),
  FileUpload: function FileUploadDemo() {
    const [files, setFiles] = useState<UploadItem[]>([
      { name: 'rattan-tray-front.jpg', size: 2.1 * 1048576, progress: 100, status: 'Uploaded' },
      { name: 'rattan-tray-side.jpg', size: 3.4 * 1048576, progress: 40, status: '40%' },
    ]);
    return (
      <FileUpload label="Product photos" prompt={<><b>Drop photos here</b> or choose files</>}
        hint="JPEG, PNG or WebP, up to 10 MB each." accept="image/jpeg,image/png,image/webp" files={files}
        onFiles={(fs) => setFiles((cur) => [...cur, ...fs.map((f) => ({ name: f.name, size: f.size, status: 'Ready' }))])} />
    );
  },
  Listbox: () => (
    <div>
      <Listbox label="Default courier" defaultValue="J&T Express"
        options={['JNE Regular', 'JNE YES', 'J&T Express', 'SiCepat', 'Pos Indonesia', 'GoSend Same Day']} />
      <p {...stylex.props(shared.muted)}><small>Up and Down move the selection; type a letter to jump.</small></p>
    </div>
  ),
  Combobox: () => (
    <Combobox label="City" defaultValue="Ban" hint="Type to filter, then use the arrow keys." noun={['city', 'cities']}
      options={['Ambon', 'Balikpapan', 'Banda Aceh', 'Bandar Lampung', 'Bandung', 'Banjarmasin', 'Batam', 'Bekasi', 'Bogor',
        'Denpasar', 'Jakarta', 'Makassar', 'Malang', 'Medan', 'Padang', 'Palembang', 'Semarang', 'Surabaya', 'Yogyakarta']} />
  ),
};
