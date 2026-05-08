"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Montserrat } from 'next/font/google'
import { Menu, X } from 'lucide-react'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900']
})

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const slides = [
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&q=80',
    'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1920&q=80',
    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&q=80'
  ]

  const partenaires = [
    { nom: 'IUT', logo: '/IUT.jpeg' },
    { nom: 'Sorbonne', logo: '/sorbonne.jpeg' },
    { nom: 'Evry', logo: '/evry.jpeg' },
    { nom: 'ILEC', logo: '/ilec.jpeg' },
    { nom: 'IUT', logo: '/IUT.jpeg' },
    { nom: 'Sorbonne', logo: '/sorbonne.jpeg' },
  ]

  const stats = [
    { chiffre: '92%', texte: 'Taux d\'insertion' },
    { chiffre: '1500+', texte: 'Étudiants' },
    { chiffre: '300', texte: 'Entreprises partenaires' },
  ]

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
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className={`min-h-screen ${montserrat.className}`}>
      {/* HEADER AVEC MENU BURGER MOBILE */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#1e2a5e] shadow-xl py-4'
          : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link href="/">
            <Image
              src="/logo-isefac.jpeg"
              alt="ISEFAC"
              width={70}
              height={70}
              className="bg-white p-2 rounded-lg object-contain"
            />
          </Link>
          
          {/* NAV DESKTOP */}
          <nav className="hidden md:flex space-x-8 text-white font-medium drop-shadow-lg">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={link.href === '/' ? 'text-orange-400 hover:text-orange-300' : 'hover:text-blue-200'}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* BOUTON S'INSCRIRE DESKTOP */}
          <Link href="/inscription" className="hidden md:block bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-bold transition">
            S'inscrire
          </Link>

          {/* BURGER MOBILE */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* MENU MOBILE DÉROULANT */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#1e2a5e] border-t border-blue-800">
            <nav className="flex flex-col space-y-1 px-6 py-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-3 px-4 rounded-lg font-bold transition ${
                    link.href === '/' 
                      ? 'bg-orange-500 text-white' 
                      : 'text-white hover:bg-blue-800'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link 
                href="/inscription" 
                onClick={() => setMobileMenuOpen(false)}
                className="bg-orange-500 text-white py-3 px-4 rounded-lg font-bold text-center mt-2"
              >
                S'inscrire
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative h-screen w-full overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide}
              alt="ISEFAC Campus"
              fill
              className="object-cover"
              priority={index === 0}
              unoptimized
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ))}

        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center z-10 px-4 pt-32">
          <p className="text-sm md:text-xl mb-4 drop-shadow-lg uppercase tracking-wider font-semibold">
            INSTITUT DES SCIENCES DE L'ENSEIGNEMENT ET DE LA FORMATION EN ADMINISTRATION ET COMMERCE
          </p>
          <h1 className="text-3xl md:text-6xl font-black mb-2 drop-shadow-2xl">
            ISEFAC BUSINESS SCHOOL
          </h1>
          <p className="text-lg md:text-2xl mb-4 font-bold text-blue-300 drop-shadow-lg">
            Libreville, Gabon
          </p>
          <p className="text-base md:text-xl mb-8 drop-shadow-lg max-w-3xl font-medium px-4">
            Une école professionnelle d'excellence au service de votre avenir
          </p>

          <div className="flex flex-wrap gap-3 justify-center px-4">
            <Link href="/inscription" className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-md font-bold flex items-center gap-2 transition hover:scale-105 text-sm md:text-base">
              📝 L'inscription
            </Link>
            <Link href="/contact" className="bg-sky-500 hover:bg-sky-600 px-5 py-3 rounded-md font-bold flex items-center gap-2 transition hover:scale-105 text-sm md:text-base">
              📰 Actualités
            </Link>
            <Link href="/a-propos" className="bg-blue-800 hover:bg-blue-900 px-5 py-3 rounded-md font-bold flex items-center gap-2 transition hover:scale-105 text-sm md:text-base">
              👍 Références
            </Link>
            <Link href="/formations" className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-md font-bold flex items-center gap-2 transition hover:scale-105 text-sm md:text-base">
              ✈️ Erasmus
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === currentSlide? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Section Bienvenue */}
      <section id="apropos" className="bg-white py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-6 text-gray-900">
            BIENVENUE À L'ISEFAC BUSINESS SCHOOL
          </h2>
          <p className="text-xl text-gray-700 font-semibold mb-8">
            Établissement Privé d'Enseignement Supérieur et Professionnel agréé par l'État
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>
      </section>

      {/* Section Statistiques */}
      <section className="bg-[#1e2a5e] text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-black text-center mb-12">Choisissez ISEFAC</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl font-black mb-2">{stat.chiffre}</div>
                <div className="text-blue-200 font-medium">{stat.texte}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section VOUS RECHERCHEZ */}
      <section id="nos-formations" className="bg-[#1e2a5e] py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80')] bg-cover bg-center opacity-10"></div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl md:text-5xl font-black mb-6 text-white leading-tight">
                Vous recherchez une école qui prépare vraiment à l'emploi et votre avenir?
              </h3>
              <p className="text-lg text-blue-100 mb-6 leading-relaxed font-medium">
                À l'ISEFAC Business School, nous formons les leaders de demain. Nos programmes allient théorie et pratique avec des stages en entreprise dès la première année.
              </p>
              <p className="text-lg text-blue-100 mb-8 leading-relaxed font-medium">
                Communication, Marketing, Digital, Événementiel : choisissez une formation reconnue par l'État et plébiscitée par les recruteurs.
              </p>
              <Link href="/inscription" className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-xl transition hover:scale-105">
                Étudiez maintenant
              </Link>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 group">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
                alt="Étudiants ISEFAC"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section Partenaires - FIX MOBILE */}
      <section id="partenaires" className="bg-white py-20 border-t overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-gray-800 text-2xl mb-12 font-black">
            Nos écoles et universités partenaires
          </p>

          <div className="relative w-full overflow-hidden">
            <div className="flex animate-scroll">
              {[...partenaires,...partenaires].map((p, i) => (
                <div key={i} className="flex-shrink-0 w-48 md:w-64 mx-4 md:mx-8">
                  <Image
                    src={p.logo}
                    alt={p.nom}
                    width={200}
                    height={100}
                    className="object-contain h-20 md:h-24 w-full mx-auto"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.333%); }
          }
          .animate-scroll {
            animation: scroll 25s linear infinite;
          }
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>
    </main>
  )
}