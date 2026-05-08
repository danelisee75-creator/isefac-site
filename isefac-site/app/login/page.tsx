"use client"
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Montserrat } from 'next/font/google'
import { Lock, Mail as MailIcon } from 'lucide-react'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900']
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/espace-etudiant')
    }
  }

  return (
    <main className={`min-h-screen ${montserrat.className}`}>
      {/* HEADER IDENTIQUE AUX AUTRES PAGES */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#1e2a5e] shadow-xl py-4'
          : 'bg-[#1e2a5e] py-5'
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
          <nav className="hidden md:flex space-x-8 text-white font-medium">
            <Link href="/" className="hover:text-blue-200">Accueil</Link>
            <Link href="/a-propos" className="hover:text-blue-200">A propos</Link>
            <Link href="/public-cible" className="hover:text-blue-200">Public cible</Link>
            <Link href="/formations" className="hover:text-blue-200">Formations</Link>
            <Link href="/inscription" className="hover:text-blue-200">Inscription</Link>
            <Link href="/contact" className="hover:text-blue-200">Contact</Link>
            <Link href="/espace-etudiant" className="hover:text-blue-200">Espace étudiant</Link>
            <Link href="/faq" className="hover:text-blue-200">FAQ</Link>
          </nav>
        </div>
      </header>

      {/* FOND AVEC HERO */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e2a5e] via-blue-900 to-[#1e2a5e]">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80')] bg-cover bg-center opacity-20"></div>
        </div>

        <div className="relative z-10 w-full max-w-md px-6">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-gray-100">
            <div className="text-center mb-8">
              <div className="bg-[#1e2a5e] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Lock className="text-white" size={32} />
              </div>
              <h1 className="text-3xl font-black text-gray-900 mb-2">Connexion Étudiant</h1>
              <p className="text-gray-600 font-semibold">Accédez à votre espace personnel</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm font-bold">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-black text-gray-900 mb-2">
                  Email
                </label>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-black text-gray-900 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#1e2a5e] to-blue-700 hover:from-blue-800 hover:to-blue-900 text-white py-3.5 rounded-xl font-black text-base shadow-xl transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Connexion...' : 'Se connecter'}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                Pas encore inscrit ?{' '}
                <Link href="/inscription" className="text-blue-600 font-black hover:underline">
                  Créer un compte
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}