"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Montserrat } from 'next/font/google'
import { createBrowserClient } from '@supabase/ssr'
import {
  LogOut,
  Bell,
  ChevronRight,
  Clock,
  FileText,
  MessageSquare,
  MapPin
} from 'lucide-react'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900']
})

export default function EspaceEtudiant() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const slides = [
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80',
    'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1920&q=80',
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&q=80'
  ]

  const stats = [
    {
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&q=80',
      chiffre: '5',
      texte: 'Cours Actifs',
      color: 'from-blue-500 to-blue-600'
    },
    {
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80',
      chiffre: '2',
      texte: 'Certifications',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80',
      chiffre: '78%',
      texte: 'Progression',
      color: 'from-orange-500 to-orange-600'
    },
    {
      image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&q=80',
      chiffre: '142h',
      texte: 'Heures Validées',
      color: 'from-purple-500 to-purple-600'
    },
  ]

  const coursRecents = [
    {
      titre: 'Marketing Digital Avancé',
      progression: 85,
      module: 'Module 4 sur 5',
      prochainCours: 'Mercredi 8 Mai - 14h00',
      statut: 'En cours',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80'
    },
    {
      titre: 'Comptabilité & Gestion',
      progression: 60,
      module: 'Module 3 sur 6',
      prochainCours: 'Vendredi 10 Mai - 10h00',
      statut: 'En cours',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80'
    },
    {
      titre: 'Communication d\'Entreprise',
      progression: 100,
      module: 'Formation terminée',
      prochainCours: 'Certificat disponible',
      statut: 'Terminé',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&q=80'
    },
  ]

  const notifications = [
    {
      titre: 'Nouveau module disponible',
      desc: 'Droit des Affaires - Chapitre 3 est maintenant en ligne',
      date: 'Il y a 2h',
      type: 'info',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=100&q=80'
    },
    {
      titre: 'Évaluation à venir',
      desc: 'Marketing Digital - Vendredi 9 Mai à 14h00',
      date: 'Il y a 1j',
      type: 'warning',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=100&q=80'
    },
    {
      titre: 'Certificat validé',
      desc: 'Communication d\'Entreprise - Téléchargez votre attestation',
      date: 'Il y a 3j',
      type: 'success',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=100&q=80'
    },
  ]

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/inscription')
      } else {
        setUser(user)
        setLoading(false)
      }
    }
    checkUser()
  }, [router, supabase])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  if (loading) {
    return (
      <main className={`min-h-screen flex items-center justify-center ${montserrat.className}`}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-bold">Vérification...</p>
        </div>
      </main>
    )
  }

  if (!user) {
    return null
  }

  return (
    <main className={`min-h-screen ${montserrat.className}`}>
      {/* HERO - pt-20 pour mobile, pas de header ici */}
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

        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center z-10 px-4 pt-20">
          <p className="text-sm md:text-xl mb-3 md:mb-4 drop-shadow-lg uppercase tracking-wider font-semibold text-[#F4B400]">
            ESPACE ÉTUDIANT ISEFAC BUSINESS SCHOOL
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black mb-2 drop-shadow-2xl break-words px-2">
            BIENVENUE, {user?.email?.split('@')[0]?.toUpperCase()} 👋
          </h1>
          <p className="text-lg md:text-2xl mb-3 font-bold text-orange-400 drop-shadow-lg">
            Continue ton parcours d'excellence
          </p>
          <p className="text-base md:text-xl mb-6 md:mb-8 drop-shadow-lg max-w-3xl font-medium px-2">
            Accède à tes cours, certifications et ressources en un clic
          </p>

          <div className="flex flex-wrap gap-3 md:gap-4 justify-center px-2">
            <Link href="#dashboard" className="bg-blue-600 hover:bg-blue-700 px-4 md:px-6 py-2.5 md:py-3 rounded-md font-bold flex items-center gap-2 transition hover:scale-105 text-sm md:text-base">
              <FileText size={18} />
              Mes Cours
            </Link>
            <Link href="#notifications" className="bg-sky-500 hover:bg-sky-600 px-4 md:px-6 py-2.5 md:py-3 rounded-md font-bold flex items-center gap-2 transition hover:scale-105 text-sm md:text-base">
              <Bell size={18} />
              Notifications
            </Link>
            <button
              onClick={handleSignOut}
              className="bg-red-600 hover:bg-red-700 px-4 md:px-6 py-2.5 md:py-3 rounded-md font-bold flex items-center gap-2 transition hover:scale-105 text-sm md:text-base"
            >
              <LogOut size={18} />
              Déconnexion
            </button>
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

      <section id="dashboard" className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-5xl font-black mb-4 md:mb-6 text-gray-900 text-center">
            TABLEAU DE BORD
          </h2>
          <p className="text-lg md:text-xl text-gray-700 font-semibold mb-8 md:mb-12 text-center">
            Vue d'ensemble de ton parcours académique
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-12 md:mb-16"></div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105 border border-gray-100 overflow-hidden">
                <div className="relative h-24 md:h-32">
                  <Image
                    src={stat.image}
                    alt={stat.texte}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-90`}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-3xl md:text-5xl font-black text-white drop-shadow-lg">{stat.chiffre}</p>
                  </div>
                </div>
                <div className="p-3 md:p-4">
                  <p className="text-gray-900 text-xs md:text-sm font-black uppercase tracking-wide">{stat.texte}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border-2 border-gray-100">
                <div className="flex items-center justify-between mb-6 md:mb-8">
                  <h3 className="text-2xl md:text-3xl font-black text-gray-900 flex items-center gap-3">
                    <Image
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=100&q=80"
                      alt="Formation"
                      width={32}
                      height={32}
                      className="rounded-xl object-cover"
                      unoptimized
                    />
                    <span className="hidden sm:inline">Mes Formations</span>
                    <span className="sm:hidden">Formations</span>
                  </h3>
                  <Link href="/formations" className="text-blue-600 hover:text-blue-800 font-bold text-xs md:text-sm flex items-center gap-1">
                    Catalogue <ChevronRight size={16} />
                  </Link>
                </div>

                <div className="space-y-4 md:space-y-5">
                  {coursRecents.map((cours, i) => (
                    <div key={i} className="border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-blue-400 hover:shadow-lg transition-all">
                      <div className="flex flex-col sm:flex-row gap-0 sm:gap-4">
                        <div className="relative w-full sm:w-32 h-32 flex-shrink-0">
                          <Image
                            src={cours.image}
                            alt={cours.titre}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                          <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-black ${
                            cours.statut === 'Terminé'
                      ? 'bg-green-500 text-white'
                              : 'bg-blue-500 text-white'
                          }`}>
                            {cours.statut}
                          </div>
                        </div>
                        <div className="flex-1 p-4">
                          <h4 className="font-black text-base md:text-lg text-gray-900 mb-1">{cours.titre}</h4>
                          <p className="text-xs md:text-sm text-gray-600 font-semibold mb-2">{cours.module}</p>
                          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-700 font-medium mb-3">
                            <Clock size={14} />
                            <span>{cours.prochainCours}</span>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs font-black text-gray-700">
                              <span>Progression</span>
                              <span>{cours.progression}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden shadow-inner">
                              <div
                                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-700"
                                style={{ width: `${cours.progression}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border-2 border-gray-100">
                <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-6 flex items-center gap-3">
                  <Image
                    src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=100&q=80"
                    alt="Agenda"
                    width={32}
                    height={32}
                    className="rounded-xl object-cover"
                    unoptimized
                  />
                  Prochains Événements
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 md:p-5 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200">
                    <div className="bg-blue-600 text-white rounded-xl p-3 md:p-4 text-center min-w- md:min-w-20 shadow-lg">
                      <p className="text-2xl md:text-3xl font-black">09</p>
                      <p className="text-xs font-bold">MAI</p>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-black text-gray-900 text-base md:text-lg mb-1">Évaluation Marketing Digital</h4>
                      <p className="text-xs md:text-sm text-gray-700 font-semibold">14h00 - Salle B12 - Prof. Mbadinga</p>
                      <span className="inline-block mt-2 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                        Important
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 md:p-5 bg-gray-50 rounded-2xl border-2 border-gray-200">
                    <div className="bg-gray-700 text-white rounded-xl p-3 md:p-4 text-center min-w- md:min-w-20 shadow-lg">
                      <p className="text-2xl md:text-3xl font-black">15</p>
                      <p className="text-xs font-bold">MAI</p>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-black text-gray-900 text-base md:text-lg mb-1">Conférence Entrepreneuriat</h4>
                      <p className="text-xs md:text-sm text-gray-700 font-semibold">10h00 - Amphithéâtre Principal</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[#1e2a5e] to-[#162042] rounded-3xl p-6 text-white shadow-2xl">
                <div className="text-center mb-6">
                  <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto mb-4">
                    <Image
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80"
                      alt="Profile"
                      fill
                      className="rounded-full object-cover border-4 border-white/20"
                      unoptimized
                    />
                  </div>
                  <h3 className="font-black text-lg md:text-xl break-all">{user?.email?.split('@')[0]}</h3>
                  <p className="text-blue-200 text-xs md:text-sm font-semibold">Étudiant ISEFAC BS</p>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur rounded-xl">
                    <FileText size={16} className="flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs text-blue-200 font-semibold">Email</p>
                      <p className="font-bold text-xs md:text-sm break-all">{user?.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur rounded-xl">
                    <Clock size={16} className="flex-shrink-0" />
                    <div>
                      <p className="text-xs text-blue-200 font-semibold">Inscrit le</p>
                      <p className="font-bold text-xs md:text-sm">{user?.created_at? new Date(user.created_at).toLocaleDateString('fr-FR') : 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div id="notifications" className="bg-white rounded-3xl p-6 shadow-xl border-2 border-gray-100">
                <h3 className="text-lg md:text-xl font-black text-gray-900 mb-5 flex items-center gap-2">
                  <Bell className="text-blue-600" size={22} />
                  Notifications
                </h3>
                <div className="space-y-4">
                  {notifications.map((notif, i) => (
                    <div key={i} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                      <div className="flex items-start gap-3">
                        <Image
                          src={notif.image}
                          alt={notif.titre}
                          width={40}
                          height={40}
                          className="rounded-lg object-cover flex-shrink-0"
                          unoptimized
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-black text-xs md:text-sm text-gray-900 mb-1">{notif.titre}</h4>
                          <p className="text-xs text-gray-600 mb-1">{notif.desc}</p>
                          <p className="text-xs text-gray-400 font-bold">{notif.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-gray-100">
                <h3 className="text-lg md:text-xl font-black text-gray-900 mb-5">Actions Rapides</h3>
                <div className="space-y-3">
                  <Link href="/formations" className="flex items-center gap-3 p-3 md:p-4 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-xl transition group">
                    <Image
                      src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=100&q=80"
                      alt="Formations"
                      width={32}
                      height={32}
                      className="rounded-lg object-cover flex-shrink-0"
                      unoptimized
                    />
                    <span className="font-bold text-gray-700 flex-1 text-sm md:text-base">Mes Formations</span>
                    <ChevronRight size={18} className="text-blue-600 group-hover:translate-x-1 transition flex-shrink-0" />
                  </Link>
                  <Link href="/contact" className="flex items-center gap-3 p-3 md:p-4 bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-xl transition group">
                    <Image
                      src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=100&q=80"
                      alt="Support"
                      width={32}
                      height={32}
                      className="rounded-lg object-cover flex-shrink-0"
                      unoptimized
                    />
                    <span className="font-bold text-gray-700 flex-1 text-sm md:text-base">Support</span>
                    <ChevronRight size={18} className="text-purple-600 group-hover:translate-x-1 transition flex-shrink-0" />
                  </Link>
                  <button className="w-full flex items-center gap-3 p-3 md:p-4 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-xl transition group">
                    <Image
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=100&q=80"
                      alt="Certificats"
                      width={32}
                      height={32}
                      className="rounded-lg object-cover flex-shrink-0"
                      unoptimized
                    />
                    <span className="font-bold text-gray-700 flex-1 text-left text-sm md:text-base">Certificats</span>
                    <ChevronRight size={18} className="text-green-600 group-hover:translate-x-1 transition flex-shrink-0" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}