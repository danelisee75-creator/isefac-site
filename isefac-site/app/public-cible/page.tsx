"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Montserrat } from 'next/font/google'
import {
  GraduationCap,
  Briefcase,
  RefreshCw,
  Globe,
  CheckCircle,
  ArrowRight
} from 'lucide-react'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900']
})

export default function PublicCible() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mounted, setMounted] = useState(false)

  // HERO AVEC PERSONNES NOIRES
  const slides = [
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1920&q=80', // Étudiante noire diplômée
    'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=1920&q=80', // Pro noir au bureau
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=1920&q=80'  // Groupe étudiants noirs
  ]

  const profils = [
    {
      icon: GraduationCap,
      titre: 'Bacheliers & Étudiants',
      desc: 'Vous venez d\'obtenir votre Bac ou vous êtes en cours d\'études supérieures',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80',
      avantages: [
        'Formation initiale professionnalisante',
        'Stages en entreprise dès la 1ère année',
        'Diplôme reconnu par l\'État',
        'Accompagnement vers l\'emploi'
      ]
    },
    {
      icon: Briefcase,
      titre: 'Professionnels en activité',
      desc: 'Vous travaillez et souhaitez monter en compétences ou vous spécialiser',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&q=80',
      avantages: [
        'Horaires aménagés soir & weekend',
        'Formation continue certifiante',
        'Validation des acquis VAE',
        'Évolution de carrière garantie'
      ]
    },
    {
      icon: RefreshCw,
      titre: 'En reconversion',
      desc: 'Vous changez de métier et cherchez une formation courte et efficace',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80',
      avantages: [
        'Certifications courtes 6-12 mois',
        'Formation pratique intensive',
        'Réseau d\'entreprises partenaires',
        'Suivi personnalisé'
      ]
    },
    {
      icon: Globe,
      titre: 'Entrepreneurs',
      desc: 'Vous lancez votre business et avez besoin de compétences en gestion',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
      avantages: [
        'Formation entrepreneuriat',
        'Accompagnement projet',
        'Incubateur ISEFAC',
        'Réseau de mentors'
      ]
    },
  ]

  const stats = [
    { chiffre: '4', texte: "Profils concernés" },
    { chiffre: '100%', texte: 'Formations adaptées' },
    { chiffre: '6-24', texte: 'Mois de formation' },
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

      {/* HERO - MÊME STYLE QUE HOME */}
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
              alt="ISEFAC Public cible"
              fill
              className="object-cover"
              priority={index === 0}
              unoptimized
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
        ))}

        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center z-20 px-4 pt-20 md:pt-32">
          <p className="text-xs sm:text-sm md:text-xl mb-4 drop-shadow-lg uppercase tracking-wider font-semibold text-orange-400">
            À QUI S'ADRESSE ISEFAC?
          </p>

          <h1 className="text-3xl md:text-6xl font-black mb-3 drop-shadow-2xl">
            UNE FORMATION POUR CHAQUE PROFIL
          </h1>

          <p className="text-base md:text-xl mb-8 max-w-3xl font-medium px-4">
            Que vous soyez bachelier, professionnel ou en reconversion, ISEFAC a la formation qu'il vous faut
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/formations"
              className="cursor-pointer relative z-20 bg-orange-500 hover:bg-orange-600 px-5 py-3 rounded-md font-bold transition hover:scale-105 text-sm md:text-base"
            >
              🎓 Voir les formations
            </Link>

            <Link
              href="/inscription"
              className="cursor-pointer relative z-20 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-md font-bold transition hover:scale-105 text-sm md:text-base"
            >
              📝 S'inscrire
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

      {/* BIENVENUE GLASS - MÊME STYLE QUE HOME */}
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
          <div className="backdrop-blur-2xl bg-white/5 border border-white/20 rounded-3xl p-12 md:p-20 shadow-2xl relative overflow-hidden group">
            <div className="absolute -inset-px bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_3s_ease-in-out_infinite] -skew-x-12"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black mb-6 text-white drop-shadow-2xl text-center">
                VOUS ÊTES CONCERNÉ SI...
              </h2>

              <p className="text-xl md:text-2xl text-blue-100 font-semibold mb-8 drop-shadow-lg text-center">
                ISEFAC s'adapte à votre parcours et vos objectifs
              </p>

              <div className="w-32 h-1.5 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto rounded-full shadow-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* PROFILS CIBLES */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {profils.map((profil, i) => (
              <div key={i} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-orange-400 group">
                <div className="relative h-64">
                  <Image
                    src={profil.image}
                    alt={profil.titre}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-6 left-6 flex items-center gap-4">
                    <div className="bg-orange-500 p-4 rounded-2xl shadow-xl">
                      <profil.icon className="text-white" size={28} />
                    </div>
                    <h3 className="text-2xl font-black text-white drop-shadow-lg">{profil.titre}</h3>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-gray-700 font-semibold mb-6 text-base">{profil.desc}</p>
                  <ul className="space-y-3">
                    {profil.avantages.map((av, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 font-medium">{av}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[#1e2a5e] text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-black text-center mb-12">
            Pourquoi choisir ISEFAC ?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl font-black mb-2 text-orange-400">
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

      {/* CTA */}
      <section className="bg-white py-20 border-t">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">
            VOUS VOUS RECONNAISSEZ?
          </h2>
          <p className="text-xl mb-8 text-gray-700 font-semibold">
            Découvrez nos formations adaptées à votre profil
          </p>
          <Link href="/formations" className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 px-10 py-4 rounded-xl font-black text-lg transition shadow-2xl hover:scale-105 text-white">
            Voir les formations <ArrowRight size={24} />
          </Link>
        </div>
      </section>
    </div>
  )
}