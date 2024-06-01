import { Inter } from 'next/font/google'
import './globals.css'
import { UserProvider } from '../contexts/UserContext'
import { AuthProvider } from './Providers'
import { SelectProvider } from '@contexts/SelectContext'
import 'react-toastify/dist/ReactToastify.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Showtime',
  description: 'Your personal entertainment playlist',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AuthProvider>
          <UserProvider>
            <SelectProvider>{children}</SelectProvider>
          </UserProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
