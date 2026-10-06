import '@imsus/normal-ui-css';
import '@imsus/normal-ui-css/themes/govuk.css';
import '@imsus/normal-ui-react/styles.css';
import './consumer.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Alert, Badge, Button, Tabs, TextField } from '@imsus/normal-ui-react';

function App() {
  return (
    <main>
      <h1>Vite fixture</h1>
      <p>
        <Badge>New</Badge> <Alert kind="warning">3 products are almost out of stock.</Alert>
      </p>
      <TextField label="Email address" type="email" />
      <Tabs
        label="Settings"
        tabs={[
          { label: 'Account', content: <p>Account panel</p> },
          { label: 'Billing', content: <p>Billing panel</p> },
        ]}
      />
      <Button type="submit" variant="primary" className="consumer-override">
        Save address
      </Button>
    </main>
  );
}

createRoot(document.getElementById('app')).render(<App />);
