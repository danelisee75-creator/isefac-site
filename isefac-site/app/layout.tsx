"use client"

import './globals.css'
import { Montserrat } from 'next/font/google'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

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

  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/a-propos', label: 'A propos' },
    { href: '/public-cible', label: 'Public cible' },
    { href: '/formations', label: 'Formations' },
    { href: '/inscription', label: 'Inscription' },
    { href: '/contact', label: 'Contact' },
    { href: '/espace-etudiant', label: 'Espace étudiant' },
    { href: '/faq', label: 'FAQ' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <html lang="fr">

      <body className={montserrat.className}>

        {/* HEADER */}
        <header
          className={`fixed top-0 left-0 right-0 w-full z-[9999] transition-all duration-300 ${
            scrolled
              ? 'bg-[#1e2a5e] shadow-xl py-4'
              : 'bg-[#1e2a5e] py-5'
          }`}
        >

          <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">

            {/* LOGO */}
            <Link href="/">
              <Image
                src="/logo-isefac.jpeg"
                alt="ISEFAC"
                width={70}
                height={70}
                className="bg-white p-2 rounded-lg object-contain"
                priority
              />
            </Link>

            {/* MENU DESKTOP */}
            <nav className="hidden md:flex space-x-8 text-white font-medium">

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-orange-300 transition"
                >
                  {link.label}
                </Link>
              ))}

            </nav>

            {/* BTN INSCRIPTION */}
            <Link
              href="/inscription"
              className="hidden md:block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-bold transition"
            >
              S'inscrire
            </Link>

            {/* BURGER MOBILE */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2 bg-black/40 rounded-lg"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

          </div>

          {/* MENU MOBILE */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-[#1e2a5e] border-t border-blue-800 z-[9999]">

              <nav className="flex flex-col px-6 py-4 space-y-2">

                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-3 px-4 rounded-lg font-bold text-white hover:bg-blue-800 transition"
                  >
                    {link.label}
                  </Link>
                ))}

              </nav>

            </div>
          )}

        </header>

        {/* CONTENU */}
        <main className="pt-32">
          {children}
        </main>

      </body>

    </html>
  )
}