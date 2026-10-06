import * as stylex from '@stylexjs/stylex';
import { useState } from 'react';
import { Accordion, Details } from '@imsus/normal-ui-react/components/Disclosure';
import { Button } from '@imsus/normal-ui-react/components/Button';
import { Carousel, Comment, Commented, Feed, ScrollCarousel, Suggestion } from '@imsus/normal-ui-react/components/Content';
import { Grid, Table, Treegrid } from '@imsus/normal-ui-react/components/Table';
import { WindowSplitter } from '@imsus/normal-ui-react/components/WindowSplitter';
import type { FeedArticle } from '@imsus/normal-ui-react/components/Content';
import { shared } from '@imsus/normal-ui-react/components/shared';

const s = stylex.create({
  article: { maxWidth: '36rem' },
  h3: { marginTop: 0 },
  row: { display: 'flex', gap: 8, flexWrap: 'wrap' },
  paneTitle: { marginTop: 0, fontSize: '1rem' },
  list: { paddingInlineStart: '1.25em', margin: 0 },
  p0: { margin: 0 },
});

const reviews: [string, string][] = [
  ['Agus Pratama', 'Coffee arrived fresh, well packed.'],
  ['Rina Kusuma', 'Rattan basket is sturdy and a good size.'],
];

export const Content = {
  Accordion: () => (
    <Accordion items={[
      { title: 'Shipping', content: <p>Standard delivery takes 3–5 days. Express takes 1–2 days in Java and Bali.</p> },
      { title: 'Returns', content: <p>Return most items within 30 days. Return labels are free.</p> },
      { title: 'Payment', content: <p>Bank transfer, e-wallets and cards. You are charged when the order ships.</p> },
    ]} />
  ),
  Details: () => (
    <div>
      <Details summary="What does delivery cost?" open>Standard delivery is free over Rp 250.000. Express costs Rp 35.000.</Details>
      <Details summary="Can I change my address after ordering?">Yes, until the order is packed.</Details>
    </div>
  ),
  Carousel: () => (
    <Carousel label="Shop highlights" slides={[
      { title: 'Autumn sale', body: <>Up to 30% off home and kitchen until 15 October. <a href="#s0">See more</a></> },
      { title: 'New: batik runners', body: <>Hand-printed in Pekalongan, six patterns. <a href="#s1">See more</a></> },
      { title: 'Free returns', body: <>Every order, any reason, within 30 days. <a href="#s2">See more</a></> },
    ]} />
  ),
  ScrollCarousel: () => (
    <ScrollCarousel label="Shop highlights" items={[
      { title: 'Autumn sale', body: 'Up to 30% off home and kitchen until 15 October.' },
      { title: 'Batik runners', body: 'Hand-printed in Pekalongan, six patterns.' },
      { title: 'Free returns', body: 'Every order, any reason, within 30 days.' },
      { title: 'Same-day delivery', body: 'In Bandung and Jakarta, ordered before 12:00.' },
    ]} />
  ),
  Feed: function FeedDemo() {
    const [articles, setArticles] = useState<FeedArticle[]>([
      { id: 'f0', title: 'Sari Wulandari', body: 'The linen shirt fits perfectly. Fast delivery to Bandung.' },
      { id: 'f1', title: 'Budi Hartono', body: 'Teak board is heavier than I expected, in a good way.' },
      { id: 'f2', title: 'Dewi Lestari', body: 'Batik runner colours are exactly like the photos.' },
    ]);
    const [busy, setBusy] = useState(false);
    return (
      <Feed label="Customer reviews" articles={articles} busy={busy} loadMoreLabel="Load more reviews"
        onLoadMore={() => {
          setBusy(true);
          setTimeout(() => {
            setArticles((a) => [...a, ...reviews.map(([title, body], i) => ({ id: `f${a.length + i}`, title, body }))]);
            setBusy(false);
          }, 400);
        }} />
    );
  },
  ReviewComments: () => (
    <article {...stylex.props(s.article)}>
      <h3 {...stylex.props(s.h3)}>Rattan tray: description</h3>
      <p>Hand-woven in Cirebon from <Suggestion remove="local" insert="sustainably harvested" /> rattan.{' '}
        <Commented commentId="c1">Measures 45 × 30 cm</Commented> and weighs 650 g.</p>
      <Comment id="c1" author="Rina" time={{ iso: '2026-09-29T09:14', label: '09:14' }}>
        Is 45 cm the outer size or the inside? Customers asked last month.
      </Comment>
      <p {...stylex.props(s.row)}>
        <Button aria-description="Replaces 'local' with 'sustainably harvested'">Accept suggestion</Button>
        <Button>Reject</Button><Button>Reply to Rina</Button>
      </p>
    </article>
  ),
  Table: () => (
    <Table caption="Orders this week" rowKey={(r) => r.order}
      columns={[{ key: 'order', label: 'Order' }, { key: 'items', label: 'Items', numeric: true },
        { key: 'total', label: 'Total', numeric: true }, { key: 'status', label: 'Status' }]}
      rows={[
        { order: '#1042', items: '3', total: 'Rp 412.000', status: 'Shipped' },
        { order: '#1043', items: '1', total: 'Rp 89.000', status: 'Packing' },
        { order: '#1044', items: '2', total: 'Rp 150.000', status: 'Awaiting payment' },
      ]} />
  ),
  Grid: () => (
    <Grid label="Stock levels" hint="Arrow keys move between cells. Enter edits Stock; Enter again saves, Esc cancels."
      rowName={(r) => r.product} editable={['stock']}
      columns={[{ key: 'product', label: 'Product' }, { key: 'category', label: 'Category' },
        { key: 'stock', label: 'Stock', numeric: true }, { key: 'price', label: 'Price', numeric: true }]}
      rows={[
        { product: 'Linen shirt', category: 'Clothing', stock: 34, price: 'Rp 289.000' },
        { product: 'Teak cutting board', category: 'Home and kitchen', stock: 2, price: 'Rp 123.000' },
        { product: 'Batik table runner', category: 'Home and kitchen', stock: 12, price: 'Rp 175.000' },
        { product: 'Coffee 250 g', category: 'Food', stock: 58, price: 'Rp 96.000' },
      ]} />
  ),
  Treegrid: () => (
    <div>
      <Treegrid label="Orders by category, September" columns={['Category or product', 'Orders']} groups={[
        { label: 'Clothing', value: 623, children: [{ label: 'Linen shirt', value: 412 }, { label: 'Batik shirt', value: 211 }] },
        { label: 'Home and kitchen', value: 298, children: [{ label: 'Teak cutting board', value: 176 }, { label: 'Batik table runner', value: 122 }] },
        { label: 'Food', value: 96, children: [{ label: 'Coffee 250 g', value: 96 }] },
      ]} />
      <p {...stylex.props(shared.muted)}><small>Up/Down move between rows; Right expands a category, Left collapses it.</small></p>
    </div>
  ),
  WindowSplitter: () => (
    <div>
      <WindowSplitter label="Resize order list"
        start={<><h3 {...stylex.props(s.paneTitle)}>Orders</h3>
          <ul {...stylex.props(s.list)}><li>#1048 Budi Hartono</li><li><b>#1047 Sari Wulandari</b></li><li>#1046 Dewi Lestari</li></ul></>}
        end={<><h3 {...stylex.props(s.paneTitle)}>#1047 Sari Wulandari</h3>
          <p {...stylex.props(s.p0)}>Linen shirt (M), Teak cutting board. Packing. Rp 412.000.</p></>} />
      <p {...stylex.props(shared.muted)}><small>Focus the divider: Left/Right resize, Enter collapses and restores.</small></p>
    </div>
  ),
};
