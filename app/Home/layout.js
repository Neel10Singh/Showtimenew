import { Inter } from 'next/font/google'
import '../globals.css'
import Nav from '@app/components/Nav'
const inter = Inter({ subsets: ['latin'] })
import { ToastContainer } from 'react-toastify'

export const metadata = {
  title: 'Home-Showtime',
  description: 'Your personal entertainment playlist',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Nav />
        <ToastContainer theme='dark' />
        {children}
      </body>
    </html>
  )
}
