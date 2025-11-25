import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Swing Trading Academy - Learn Alan Farley\'s Methods',
  description: 'Master swing trading with interactive lessons based on Alan Farley\'s principles',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  )
}
