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
  Target,
  ArrowRight,
  CheckCircle
} from 'lucide-react'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900']
})

export default function PublicCible() {
  const [scrolled, setScrolled] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&q=80',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80',
    'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1920&q=80'
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
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&q=80',
      avantages: [
        'Formation entrepreneuriat',
        'Accompagnement projet',
        'Incubateur ISEFAC',
        'Réseau de mentors'
      ]
    },
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
      {/* HEADER */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
  ? 'bg-[#1e2a5e] shadow-xl py-4'
          : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Image
            src="/logo-isefac.jpeg"
            alt="ISEFAC"
            width={70}
            height={70}
            className="bg-white p-2 rounded-lg object-contain"
          />
          <nav className="hidden md:flex space-x-8 text-white font-medium drop-shadow-lg">
            <Link href="/" className="hover:text-blue-200">Accueil</Link>
            <Link href="/a-propos" className="hover:text-blue-200">A propos</Link>
            <Link href="/public-cible" className="text-orange-400 hover:text-orange-300">Public cible</Link>
            <Link href="/formations" className="hover:text-blue-200">Formations</Link>
            <Link href="/contact" className="hover:text-blue-200">Contact</Link>
            <Link href="/espace-etudiant" className="hover:text-blue-200">Espace étudiant</Link>
          </nav>
        </div>
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
              alt="ISEFAC"
              fill
              className="object-cover"
              priority={index === 0}
              unoptimized
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ))}

        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center z-10 px-4 pt-32">
          <p className="text-base md:text-xl mb-4 drop-shadow-lg uppercase tracking-wider font-semibold text-orange-400">
            À QUI S'ADRESSE ISEFAC ?
          </p>
          <h1 className="text-4xl md:text-6xl font-black mb-4 drop-shadow-2xl">
            UNE FORMATION POUR CHAQUE PROFIL
          </h1>
          <p className="text-xl md:text-2xl mb-8 drop-shadow-lg max-w-3xl font-medium">
            Que vous soyez bachelier, professionnel ou en reconversion, ISEFAC a la formation qu'il vous faut
          </p>
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

      {/* PROFILS CIBLES */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">
              VOUS ÊTES CONCERNÉ SI...
            </h2>
            <p className="text-xl text-gray-700 font-semibold">
              ISEFAC s'adapte à votre parcours et vos objectifs
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {profils.map((profil, i) => (
              <div key={i} className="bg-gradient-to-br from-gray-50 to-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all border-2 border-gray-100">
                <div className="relative h-64">
                  <Image
                    src={profil.image}
                    alt={profil.titre}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-6 left-6 flex items-center gap-4">
                    <div className="bg-orange-500 p-4 rounded-2xl">
                      <profil.icon className="text-white" size={32} />
                    </div>
                    <h3 className="text-2xl font-black text-white">{profil.titre}</h3>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-gray-700 font-semibold mb-6">{profil.desc}</p>
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

      {/* CTA */}
      <section className="bg-[#1e2a5e] py-20">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            VOUS VOUS RECONNAISSEZ ?
          </h2>
          <p className="text-xl mb-8 font-semibold text-blue-200">
            Découvrez nos formations adaptées à votre profil
          </p>
          <Link href="/formations" className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 px-10 py-4 rounded-xl font-black text-lg transition shadow-2xl hover:scale-105">
            Voir les formations <ArrowRight size={24} />
          </Link>
        </div>
      </section>
    </main>
  )
}