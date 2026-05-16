"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900']
})

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mounted, setMounted] = useState(false)

  const slides = [
    '/slide5.jpg',
    '/slide6.jpg',
    '/slide7.jpg',
    '/slide8.jpg'
  ]

  const partenaires = [
    { nom: 'IUT', logo: '/IUT.jpeg' },
    { nom: 'Sorbonne', logo: '/sorbonne.jpeg' },
    { nom: 'Evry', logo: '/evry.jpeg' },
    { nom: 'ILEC', logo: '/ilec.jpeg' },
    { nom: 'IFAGE', logo: '/ifage.jpg' },
    { nom: 'INUBIL', logo: '/inubil.jpeg' },
    { nom: 'ISTAMA', logo: '/Istama.png' },
    { nom: 'Université de Bamenda', logo: '/Université de Bamenda.jpeg' },
    { nom: 'Université de Douala', logo: '/université de douala.jpeg' },
    { nom: 'Université de Limoges', logo: '/université -de-limoges.jpeg' },
    { nom: 'Université Yaoundé', logo: '/université-Yaoundé.jpeg' },
  ]

  const stats = [
    { chiffre: '92%', texte: "Taux d'insertion" },
    { chiffre: '1500+', texte: 'Étudiants' },
    { chiffre: '300', texte: 'Entreprises partenaires' },
  ]

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  if (!mounted) return null

  return (
    <div className={montserrat.className}>
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
      `}</style>

      {/* HERO */}
      <section className="relative h-[calc(100vh-80px)] w-full overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide}
              alt="Étudiants ISEFAC Libreville"
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
        ))}

        <div className="absolute inset-0 flex-col justify-center items-center text-white text-center z-20 px-4 pt-20 md:pt-32">
          <p className="text-xs sm:text-sm md:text-xl mb-4 drop-shadow-lg uppercase tracking-wider font-semibold text-white">
            INSTITUT DES SCIENCES DE L'ENSEIGNEMENT ET DE LA FORMATION EN ADMINISTRATION ET COMMERCE
          </p>

          <h1 className="text-3xl md:text-6xl font-black mb-3 drop-shadow-2xl">
            ISEFAC BUSINESS SCHOOL
          </h1>

          <p className="text-lg md:text-2xl mb-4 font-bold text-white">
            Libreville, Gabon
          </p>

          <p className="text-base md:text-xl mb-8 max-w-3xl font-medium px-4">
            Une école professionnelle d'excellence au service de votre avenir
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/inscription"
              className="cursor-pointer relative z-20 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-md font-bold transition hover:scale-105 text-sm md:text-base"
            >
              📝 L'inscription
            </Link>

            <Link
              href="/contact"
              className="cursor-pointer relative z-20 bg-sky-500 hover:bg-sky-600 px-5 py-3 rounded-md font-bold transition hover:scale-105 text-sm md:text-base"
            >
              📰 Actualités
            </Link>

            <Link
              href="/a-propos"
              className="cursor-pointer relative z-20 bg-blue-800 hover:bg-blue-900 px-5 py-3 rounded-md font-bold transition hover:scale-105 text-sm md:text-base"
            >
              👍 Références
            </Link>

            <Link
              href="/formations"
              className="cursor-pointer relative z-20 bg-red-600 hover:bg-red-700 px-5 py-3 rounded-md font-bold transition hover:scale-105 text-sm md:text-base"
            >
              ✈ Erasmus
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
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

      {/* BIENVENUE - GLASS ANIMÉE */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/slide6.jpg"
            alt="Background"
            fill
            className="object-cover scale-105 animate-[pulse_8s_ease-in-out_infinite]"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#1e2a5e]/85 via-blue-900/75 to-[#1e2a5e]/85 backdrop-blur-sm" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6">
          <div className="backdrop-blur-2xl bg-white/5 border-white/20 rounded-3xl p-12 md:p-20 shadow-2xl relative overflow-hidden group">
            <div className="absolute -inset-px bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_3s_ease-in-out_infinite] -skew-x-12"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black mb-6 text-white drop-shadow-2xl text-center">
                BIENVENUE À L'ISEFAC BUSINESS SCHOOL
              </h2>

              <p className="text-xl md:text-2xl text-blue-100 font-semibold mb-8 drop-shadow-lg text-center">
                Établissement Privé d'Enseignement Supérieur et Professionnel agréé par l'État
              </p>

              <div className="w-32 h-1.5 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full shadow-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[#1e2a5e] text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-black text-center mb-12">
            Choisissez ISEFAC
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl font-black mb-2">
                  {stat.chiffre}
                </div>

                <div className="text-blue-200 font-medium">
                  {stat.texte}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTENAIRES - STATIQUE ET RÉDUIT */}
      <section className="bg-white py-16 md:py-20 border-t">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-center text-gray-800 text-xl md:text-2xl mb-10 md:mb-12 font-black">
            Nos écoles et universités partenaires
          </p>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 md:gap-6">
            {partenaires.map((p, i) => (
              <div
                key={i}
                className="flex justify-center items-center p-3 bg-gray-50 rounded-lg hover:shadow-md transition h-20 md:h-24"
              >
                <Image
                  src={p.logo}
                  alt={p.nom}
                  width={120}
                  height={60}
                  className="object-contain h-12 md:h-16 w-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}