import * as stylex from '@stylexjs/stylex';
import { Badge } from '@imsus/normal-ui-react/components/Badge';
import { Button } from '@imsus/normal-ui-react/components/Button';
import { Card } from '@imsus/normal-ui-react/components/Card';
import { Meter } from '@imsus/normal-ui-react/components/Meter';
import { Switch } from '@imsus/normal-ui-react/components/Switch';
import { Table } from '@imsus/normal-ui-react/components/Table';
import { TextField } from '@imsus/normal-ui-react/components/Field';
import type { CardBodyTreatment, CardVariant } from '@imsus/normal-ui-react/components/Card';
import { shared } from '@imsus/normal-ui-react/components/shared';

const s = stylex.create({
  page: { display: 'grid', gap: 32 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 16rem), 1fr))', gap: 16, alignItems: 'start' },
  label: { margin: '0 0 8px' },
  row: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 },
  p0: { margin: 0 },
  art: { display: 'block', width: '100%', height: 'auto' },
  wide: { maxWidth: '28rem' },
});

const Label = ({ children }: { children: string }) => (
  <p {...stylex.props(shared.eyebrow, s.label)}>{children}</p>
);

const Notifications = ({ body, divider, variant }: { body: CardBodyTreatment; divider?: 'inset'; variant?: CardVariant }) => (
  <Card body={body} divider={divider} variant={variant}>
    <Card.Header>
      <Card.Heading level={3}>Notifications</Card.Heading>
      <Card.Subheading>Choose what you hear about</Card.Subheading>
    </Card.Header>
    <Card.Body>
      <Switch label="Product updates" defaultChecked />
      <Switch label="Weekly digest" />
    </Card.Body>
    <Card.Footer>
      <p>Saved automatically</p>
    </Card.Footer>
  </Card>
);

/** Every Card arrangement, following the sections of Flux's card docs. */
export function CardDemo() {
  return (
    <div {...stylex.props(s.page)}>
      <section>
        <Label>Header, body and footer · body="inset" size="lg"</Label>
        <Card body="inset" size="lg" xstyle={s.wide}>
          <Card.Header>
            <Card.Heading level={3}>Profile</Card.Heading>
            <Card.Subheading>This is how others will see you</Card.Subheading>
            <Card.Actions>
              <Button square aria-label="More options">⋯</Button>
            </Card.Actions>
          </Card.Header>
          <Card.Body>
            <TextField label="Name" defaultValue="Sari Wulandari" />
            <TextField label="Bio" multiline placeholder="A few words about yourself" />
          </Card.Body>
          <Card.Footer>
            <p>Last saved 2 minutes ago</p>
            <Card.Actions>
              <Button>Cancel</Button>
              <Button type="submit">Save</Button>
            </Card.Actions>
          </Card.Footer>
        </Card>
      </section>

      <section>
        <Label>Simple card: content straight inside, padded evenly</Label>
        <Card xstyle={s.wide}>
          <h3>Delete this post?</h3>
          <p>It is deleted permanently. This cannot be undone.</p>
          <p><Button>Delete post</Button></p>
        </Card>
      </section>

      <section>
        <Label>Variants</Label>
        <div {...stylex.props(s.grid)}>
          {([
            ['default', 'A bordered box on canvas, for primary content.'],
            ['muted', 'A quieter tint for secondary panels.'],
            ['soft', 'The faintest tint, for light grouping.'],
            ['outline', 'Just the border, over whatever is behind it.'],
            ['filled', 'A tint with no edge, for inline surfaces.'],
          ] as const).map(([variant, text]) => (
            <Card key={variant} variant={variant}>
              <Card.Heading level={3}>{variant}</Card.Heading>
              <p>{text}</p>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <Label>Sizes</Label>
        <div {...stylex.props(s.grid)}>
          {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
            <Card key={size} size={size} body="separated">
              <Card.Header>
                <Card.Heading level={3}>{size}</Card.Heading>
                <Card.Actions><Button>Edit</Button></Card.Actions>
              </Card.Header>
              <Card.Body>
                <p>{{ xs: 'Compact, for dense lists.', sm: 'Tight, for small widgets.', md: 'The default.', lg: 'Roomy, for forms.' }[size]}</p>
              </Card.Body>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <Label>Body treatments</Label>
        <div {...stylex.props(s.grid)}>
          {(['seamless', 'inset', 'flush', 'divided', 'separated'] as const).map((body) => (
            <div key={body}>
              <p {...stylex.props(s.label)}><code>body="{body}"</code></p>
              <Notifications body={body} />
            </div>
          ))}
          <div>
            <p {...stylex.props(s.label)}><code>body="divided" divider="inset"</code></p>
            <Notifications body="divided" divider="inset" />
          </div>
        </div>
      </section>

      <section>
        <Label>On a tinted card, panels and bands are raised instead of recessed</Label>
        <div {...stylex.props(s.grid)}>
          {(['inset', 'flush', 'separated'] as const).map((body) => (
            <div key={body}>
              <p {...stylex.props(s.label)}><code>variant="muted" body="{body}"</code></p>
              <Notifications body={body} variant="muted" />
            </div>
          ))}
        </div>
      </section>

      <section>
        <Label>A bleeding table: rows edge to edge, content lined up with the card</Label>
        <Card variant="muted" body="flush" xstyle={s.wide}>
          <Card.Header>
            <Card.Heading level={3}>Past transactions</Card.Heading>
            <Card.Actions><Button>Filter</Button></Card.Actions>
          </Card.Header>
          <Card.Body>
            <Table bleed caption="Last four transactions" rowKey={(r) => r.who}
              columns={[{ key: 'who', label: 'Payee', rowHeader: true }, { key: 'what', label: 'Category' }, { key: 'amount', label: 'Amount', numeric: true }]}
              rows={[
                { who: 'Kopi Kenangan', what: 'Dining', amount: '−Rp 48.000' },
                { who: 'Lintas Cargo', what: 'Payroll', amount: '+Rp 12.500.000' },
                { who: 'Pasar Baru', what: 'Groceries', amount: '−Rp 320.000' },
                { who: 'Vidio', what: 'Subscriptions', amount: '−Rp 39.000' },
              ]} />
          </Card.Body>
        </Card>
      </section>

      <section>
        <Label>Bleed: media out to the card's edges</Label>
        <div {...stylex.props(s.grid)}>
          {(['seamless', 'inset'] as const).map((body) => (
            <Card key={body} body={body}>
              <Card.Body>
                <Card.Bleed>
                  <svg viewBox="0 0 320 180" role="img" aria-label="Orders per month, rising from May to September" {...stylex.props(s.art)}>
                    <rect width="320" height="180" fill="var(--highlight)" />
                    <g fill="var(--link)">
                      <rect x="30" y="110" width="40" height="70" /><rect x="85" y="92" width="40" height="88" />
                      <rect x="140" y="98" width="40" height="82" /><rect x="195" y="70" width="40" height="110" />
                      <rect x="250" y="44" width="40" height="136" />
                    </g>
                  </svg>
                </Card.Bleed>
              </Card.Body>
              <Card.Footer>
                <Card.Heading level={3}>Orders, May to September</Card.Heading>
                <Card.Actions><Button square aria-label="More options">⋯</Button></Card.Actions>
              </Card.Footer>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <Label>A header outside a card, and sub-sections inside a body</Label>
        <div {...stylex.props(s.wide)}>
          <Card.Header>
            <Card.Heading level={3} size="lg">Billing</Card.Heading>
            <Card.Actions><Button>Invoices</Button></Card.Actions>
          </Card.Header>
          <Card body="inset">
            <Card.Body>
              <Card.Header>
                <Card.Heading level={4}>Pro plan</Card.Heading>
                <Card.Subheading>Rp 240.000 per month, renews 12 October</Card.Subheading>
                <Card.Actions><Button>Change plan</Button></Card.Actions>
              </Card.Header>
              <Meter label="Seats used" min={0} max={10} value={8} description="8 of 10 seats used.">8 of 10</Meter>
              <hr {...stylex.props(s.p0)} />
              <Card.Header>
                <Card.Heading level={4}>Payment method</Card.Heading>
                <Card.Actions><Button>Update</Button></Card.Actions>
              </Card.Header>
              <div {...stylex.props(s.row)}>
                <p {...stylex.props(s.p0)}>Bank transfer, BCA ending 4242</p>
                <Badge>Default</Badge>
              </div>
            </Card.Body>
            <Card.Footer>
              <p>Invoices are emailed to billing@example.com</p>
            </Card.Footer>
          </Card>
        </div>
      </section>
    </div>
  );
}
