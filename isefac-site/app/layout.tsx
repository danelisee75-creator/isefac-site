"use client"

import './globals.css'
import { Montserrat } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900']
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

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
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen? 'hidden' : 'unset'
  }, [mobileMenuOpen])

  return (
    <html lang="fr">
      <body className={montserrat.className}>
        {/* HEADER UNIQUE - TRANSPARENT ET REDUIT AU REPOS */}
        <header className={`fixed top-0 left-0 right-0 w-full z-[9999] transition-all duration-300 ${
          scrolled? 'bg-[#1e2a5e] shadow-xl py-3 md:py-4' : 'bg-transparent py-2 md:py-3'
        }`}>
          <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
            <Link href="/">
              <Image
                src="/logo-isefac.jpeg"
                alt="ISEFAC"
                width={scrolled? 70 : 60}
                height={scrolled? 70 : 60}
                className={`bg-white p-1.5 md:p-2 rounded-lg object-contain transition-all duration-300 ${
                  scrolled? 'md:w- md:h-' : 'md:w- md:h-'
                } w- h-`}
                priority
              />
            </Link>

            <nav className="hidden md:flex space-x-8 text-white font-medium drop-shadow-lg">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`hover:text-blue-300 transition ${
                    pathname === link.href? 'text-blue-400' : 'text-white'
                  } ${scrolled? 'text-base' : 'text-sm'}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/inscription"
              className={`hidden md:block bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold transition ${
                scrolled? 'px-6 py-3 text-base' : 'px-4 py-2 text-sm'
              }`}
            >
              S'inscrire
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden text-white p-2 rounded-lg relative z-[99999] transition ${
                scrolled? 'bg-black/40' : 'bg-black/60'
              }`}
            >
              {mobileMenuOpen? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </header>

        {/* MENU MOBILE */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-[#1e2a5e] z-[9998] pt-20 overflow-y-auto">
            <nav className="flex flex-col px-6 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-3 px-4 rounded-lg font-bold transition ${
                    pathname === link.href
                 ? 'bg-blue-500 text-white'
                      : 'text-white hover:bg-blue-800'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href="/inscription"
                onClick={() => setMobileMenuOpen(false)}
                className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-bold text-center mt-4"
              >
                S'inscrire
              </Link>
            </nav>
          </div>
        )}

        <main>
          {children}
        </main>
      </body>
    </html>
  )
}