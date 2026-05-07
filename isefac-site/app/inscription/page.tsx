"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Montserrat } from 'next/font/google'
import { MapPin, Phone, Mail, UserPlus, Lock, Mail as MailIcon, User, ChevronRight } from "lucide-react"
import { signupAction } from './actions'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900']
})

export default function Inscription() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const slides = [
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&q=80',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1920&q=80',
    'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1920&q=80'
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (formData.name.length < 2) newErrors.name = 'Minimum 2 caractères'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email invalide'
    if (formData.password.length < 8) newErrors.password = 'Minimum 8 caractères'
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Les mots de passe ne correspondent pas'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validate()) return
    
    setIsSubmitting(true)
    const formDataSubmit = new FormData(e.currentTarget)
    const res = await signupAction(formDataSubmit)
    setIsSubmitting(false)
    
    if (res.error) {
      setErrors({ submit: res.error })
    } else {
      setSuccess(true)
    }
  }

  if (!mounted) return null

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
            <Link href="/formations" className="hover:text-blue-200">Formations</Link>
            <Link href="/inscription" className="text-orange-400">Inscription</Link>
            <Link href="/contact" className="hover:text-blue-200">Contact</Link>
            <Link href="/espace-etudiant" className="hover:text-blue-200">Espace étudiant</Link>
          </nav>
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
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ))}

        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center z-10 px-4 pt-32">
          <h1 className="text-4xl md:text-6xl font-black mb-2 drop-shadow-2xl">
            INSCRIPTION
          </h1>
          <p className="text-xl md:text-2xl mb-4 font-bold text-blue-300 drop-shadow-lg">
            Rejoignez ISEFAC
          </p>
          <p className="text-lg md:text-xl mb-8 drop-shadow-lg max-w-3xl font-medium">
            Créez votre compte en 30 secondes et démarrez votre parcours
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

      {/* FOND BLANC */}
      <div className="bg-white">
        {/* Section Bienvenue */}
        <section className="bg-white py-24">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-gray-900">
              CRÉEZ VOTRE COMPTE
            </h2>
            <p className="text-xl text-gray-700 font-semibold mb-8">
              Accédez à toutes nos formations et suivez votre progression
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
        </section>

        {/* FORMULAIRE */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              
              {/* Colonne gauche : avantages */}
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-gray-900 mb-6">
                  Pourquoi s'inscrire ?
                </h3>
                <div className="space-y-4">
                  {[
                    { icon: UserPlus, title: 'Accès illimité', desc: 'Consultez toutes les formations et ressources' },
                    { icon: Lock, title: 'Espace personnel', desc: 'Suivez vos cours et certifications' },
                    { icon: MailIcon, title: 'Support prioritaire', desc: 'Assistance 7j/7 par notre équipe' },
                    { icon: User, title: 'Communauté', desc: 'Rejoignez +10 000 apprenants ISEFAC' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
                      <div className="bg-[#1e2a5e] p-2 rounded-lg">
                        <item.icon className="text-white" size={20} />
                      </div>
                      <div>
                        <h4 className="font-black text-gray-900 mb-1">{item.title}</h4>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Colonne droite : form */}
              <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-8">
                {success ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-2">Compte créé !</h3>
                    <p className="text-gray-600 mb-6">Vérifiez votre email pour activer votre compte.</p>
                    <Link href="/espace-etudiant" className="inline-block bg-[#1e2a5e] text-white px-6 py-3 rounded-lg font-black hover:bg-blue-900 transition">
                      Accéder à mon espace
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-black text-gray-900 mb-2">
                        Nom complet
                      </label>
                      <input
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-black text-gray-900 mb-2">
                        Email
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        placeholder="john@email.com"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-black text-gray-900 mb-2">
                        Mot de passe
                      </label>
                      <input
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        placeholder="••••••••"
                      />
                      {errors.password && <p className="text-red-500 text-xs mt-1 font-medium">{errors.password}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-black text-gray-900 mb-2">
                        Confirmer le mot de passe
                      </label>
                      <input
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        placeholder="••••••••"
                      />
                      {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 font-medium">{errors.confirmPassword}</p>}
                    </div>

                    {errors.submit && (
                      <p className="text-red-500 text-sm text-center bg-red-50 py-2 rounded-lg font-medium">
                        {errors.submit}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3.5 rounded-xl font-black text-base shadow-xl transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Création...' : 'Créer mon compte'}
                    </button>

                    <p className="text-center text-sm text-gray-600">
                      Déjà inscrit ?{' '}
                      <Link href="/connexion" className="text-blue-600 font-black hover:underline">
                        Se connecter
                      </Link>
                    </p>
                  </form>
                )}
              </div>

            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-[#1e2a5e] text-white py-10">
          <div className="max-w-7xl mx-auto px-6"/>
            <div className="text-center space-y-3">
              <p className="font-black text-xl">École Supérieure Professionnelle ISEFAC</p>
              <p className="text-sm text-blue-100">Reconnue par arrêté n°000324/MENICFP/SG/DGFP/DFP</p>
              <div className="flex flex-wrap justify-center gap-8 text-sm pt-4">
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>Zone Owendo Campus Quartier AWOUNGOU Terminus ITO</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>Campus Espace PME Quartier AWENDJE</span>
                </div>
              <div className="flex flex-wrap justify-center gap-8 text-sm pt-2">
                <div className="flex items-center gap-2">
                  <Phone size={16} />
                  <span>+241 74804937 / 65604787</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  <span>isefacgabon@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}