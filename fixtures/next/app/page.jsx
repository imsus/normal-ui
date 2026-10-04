// A server component page: no 'use client' here. Static components stay
// server-rendered; interactive ones (Button, Tabs) are client boundaries
// through their own directives in the packed modules.
import { Alert, Badge, Button, Tabs, TextField } from '@imsus/normal-ui-react';

export default function Page() {
  return (
    <main>
      <h1>Next fixture</h1>
      <p>
        <Badge>New</Badge> <Alert kind="success">Saved.</Alert>
      </p>
      <TextField label="Full name" autoComplete="name" />
      <Tabs
        label="Views"
        tabs={[
          { label: 'List', content: <p>List panel</p> },
          { label: 'Grid', content: <p>Grid panel</p> },
        ]}
      />
      <Button variant="primary">Save</Button>
    </main>
  );
}
