"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Montserrat } from 'next/font/google'
import { 
  GraduationCap, 
  TrendingUp, 
  Users, 
  Briefcase, 
  Award, 
  CheckCircle, 
  ArrowRight,
  BookOpen,
  Globe,
  Target,
  FileText,
  Clock
} from 'lucide-react'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900']
})

export default function Formations() {
  const [scrolled, setScrolled] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80',
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&q=80',
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&q=80'
  ]

  const formations = [
    {
      titre: 'Marketing Digital',
      niveau: 'Licence',
      duree: '3 ans',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
      points: ['SEO/SEA', 'Réseaux sociaux', 'E-commerce', 'Data Analytics'],
      debouches: ['Community Manager', 'Traffic Manager', 'Chef de projet digital'],
      prix: '1 500 000 FCFA/an'
    },
    {
      titre: 'Comptabilité & Gestion',
      niveau: 'Licence',
      duree: '3 ans',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80',
      points: ['Comptabilité', 'Fiscalité', 'Audit', 'Contrôle de gestion'],
      debouches: ['Comptable', 'Contrôleur de gestion', 'Auditeur junior'],
      prix: '1 500 000 FCFA/an'
    },
    {
      titre: 'Communication d\'Entreprise',
      niveau: 'Certification',
      duree: '6 mois',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&q=80',
      points: ['Relations publiques', 'Événementiel', 'Communication interne', 'Branding'],
      debouches: ['Chargé de com', 'Attaché de presse', 'Event planner'],
      prix: '800 000 FCFA'
    },
  ]

  const avantages = [
    { icon: Briefcase, titre: 'Stages Garantis', desc: 'En entreprise dès la 1ère année' },
    { icon: Globe, titre: 'Diplôme Reconnu', desc: 'Agréé par l\'État gabonais' },
    { icon: Users, titre: 'Réseau Pro', desc: '+300 entreprises partenaires' },
    { icon: Target, titre: '92% Insertion', desc: 'Taux d\'employabilité record' },
  ]

  const temoignages = [
    {
      nom: 'Aïcha Mba',
      poste: 'Community Manager chez Airtel Gabon',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
      texte: 'ISEFAC m\'a donné les clés pour réussir. 3 mois après mon diplôme, j\'étais embauchée.'
    },
    {
      nom: 'Jean Obame',
      poste: 'Comptable chez BGFI Bank',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
      texte: 'La formation est très pratique. Les stages m\'ont permis de créer mon réseau.'
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
      {/* HEADER IDENTIQUE */}
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
            <Link href="/formations" className="text-orange-400 hover:text-orange-300">Formations</Link>
            <Link href="/contact" className="hover:text-blue-200">Contact</Link>
            <Link href="/espace-etudiant" className="hover:text-blue-200">Espace étudiant</Link>
            <Link href="/faq" className="hover:text-blue-200">FAQ</Link>
          </nav>
          <Link href="/inscription" className="hidden md:block bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-bold transition">
            S'inscrire
          </Link>
        </div>
      </header>

      {/* HERO SLIDER */}
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
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
          </div>
        ))}

        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center z-10 px-4 pt-32">
          <p className="text-base md:text-xl mb-4 drop-shadow-lg uppercase tracking-wider font-semibold text-orange-400">
            FORMATIONS PROFESSIONNALISANTES
          </p>
          <h1 className="text-4xl md:text-7xl font-black mb-4 drop-shadow-2xl">
            TON AVENIR COMMENCE ICI
          </h1>
          <p className="text-xl md:text-2xl mb-8 drop-shadow-lg max-w-3xl font-medium">
            Licence, Master, Certification - Des diplômes reconnus par l'État et les entreprises
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="#formations" className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-black text-lg flex items-center gap-2 transition hover:scale-105 shadow-2xl">
              <BookOpen size={24} />
              Voir les formations
            </Link>
            <Link href="/inscription" className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-xl font-black text-lg flex items-center gap-2 transition hover:scale-105 shadow-2xl">
              <GraduationCap size={24} />
              Je m'inscris
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

      {/* POURQUOI ISEFAC */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">
              POURQUOI CHOISIR ISEFAC ?
            </h2>
            <p className="text-xl text-gray-700 font-semibold max-w-3xl mx-auto">
              Une école qui prépare vraiment à l'emploi avec 92% d'insertion professionnelle
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {avantages.map((av, i) => (
              <div key={i} className="text-center group">
                <div className="bg-gradient-to-br from-[#1e2a5e] to-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:scale-110 transition">
                  <av.icon className="text-white" size={36} />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2">{av.titre}</h3>
                <p className="text-gray-600 font-medium">{av.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOS FORMATIONS */}
      <section id="formations" className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">
              NOS FORMATIONS
            </h2>
            <p className="text-xl text-gray-700 font-semibold">
              Choisis ton parcours vers l'excellence
            </p>
            <div className="w-24 h-1 bg-orange-500 mx-auto mt-6"></div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {formations.map((form, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:scale-105 border-2 border-gray-100">
                <div className="relative h-56">
                  <Image
                    src={form.image}
                    alt={form.titre}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-4 py-2 rounded-full font-black text-sm">
                    {form.niveau}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-black text-gray-900 mb-2">{form.titre}</h3>
                  <p className="text-blue-600 font-bold mb-4">{form.duree}</p>
                  
                  <div className="mb-6">
                    <p className="text-sm font-bold text-gray-700 mb-2">Au programme :</p>
                    <ul className="space-y-2">
                      {form.points.map((point, j) => (
                        <li key={j} className="flex items-center gap-2 text-gray-600">
                          <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                          <span className="font-medium">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm font-bold text-gray-700 mb-2">Débouchés :</p>
                    <div className="flex flex-wrap gap-2">
                      {form.debouches.map((deb, k) => (
                        <span key={k} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                          {deb}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="text-xs text-gray-500 font-semibold">Frais de scolarité</p>
                        <p className="text-2xl font-black text-gray-900">{form.prix}</p>
                      </div>
                    </div>
                    <Link href="/inscription" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-black flex items-center justify-center gap-2 transition shadow-lg">
                      Je m'inscris <ArrowRight size={20} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES */}
      <section className="bg-[#1e2a5e] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
              ILS ONT RÉUSSI AVEC ISEFAC
            </h2>
            <p className="text-xl text-blue-200 font-semibold">
              Nos diplômés témoignent
            </p>
            <div className="w-24 h-1 bg-orange-500 mx-auto mt-6"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {temoignages.map((tem, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <Image
                    src={tem.photo}
                    alt={tem.nom}
                    width={70}
                    height={70}
                    className="rounded-full object-cover"
                    unoptimized
                  />
                  <div>
                    <h4 className="font-black text-xl text-gray-900">{tem.nom}</h4>
                    <p className="text-blue-600 font-bold">{tem.poste}</p>
                  </div>
                </div>
                <p className="text-gray-700 text-lg font-medium italic">"{tem.texte}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            PRÊT À LANCER TA CARRIÈRE ?
          </h2>
          <p className="text-xl mb-8 font-semibold">
            Les inscriptions 2026-2027 sont ouvertes. Places limitées.
          </p>
          <Link href="/inscription" className="inline-block bg-white text-orange-600 px-10 py-4 rounded-xl font-black text-lg hover:bg-gray-100 transition shadow-2xl hover:scale-105">
            Je m'inscris maintenant
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1e2a5e] text-white py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-3">
            <p className="font-black text-xl">École Supérieure Professionnelle ISEFAC</p>
            <p className="text-sm text-blue-100">Reconnue par arrêté n°000324/MENICFP/SG/DGFP/DFP</p>
            <div className="flex flex-wrap justify-center gap-8 text-sm pt-4">
              <div className="flex items-center gap-2">
                <Briefcase size={16} />
                <span>Zone Owendo Campus Quartier AWOUNGOU</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase size={16} />
                <span>Campus Espace PME Quartier AWENDJE</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-sm pt-2">
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>+241 74804937 / 65604787</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText size={16} />
                <span>isefacgabon@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}