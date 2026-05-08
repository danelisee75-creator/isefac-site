import './globals.css'
import { Montserrat } from 'next/font/google'
import type { Metadata } from 'next'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900']
})

export const metadata: Metadata = {
  title: 'ISEFAC - École Supérieure Professionnelle',
  description: 'Formations CFP, DTS, BTS, Licence, Bachelor, Master au Gabon',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={montserrat.className}>
        {children}
      </body>
    </html>
  )
}