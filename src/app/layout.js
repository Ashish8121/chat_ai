import './globals.css';
import { ThemeProvider } from './context/ThemeContext';
import { Providers } from './store/provider';

export const metadata = {
  title: 'Login Page - Beautiful Authentication',
  description: 'A beautiful login page with dark/light theme support and animations',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ThemeProvider>{children}</ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
