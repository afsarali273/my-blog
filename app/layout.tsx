import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Personal Website',
  description: 'A showcase of my work, skills, and experiences',
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
      <body className={inter.className}>
      <Header />
      <main className="min-h-screen bg-gray-100 py-8">
        {children}
      </main>
      <Footer />
      </body>
      </html>
  )
}
