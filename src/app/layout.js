import { ThemeProvider } from './context/ThemeContext'
import './globals.css'

export const metadata = {
  title: 'Login Page - Beautiful Authentication',
  description: 'A beautiful login page with dark/light theme support and animations',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
