import '@imsus/normal-ui-css';
import '@imsus/normal-ui-css/themes/mcmaster.css';
import '@imsus/normal-ui-react/styles.css';

export const metadata = { title: 'Normal UI Next fixture' };

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-color-scheme="dark" data-theme="mcmaster">
      <body>{children}</body>
    </html>
  );
}
