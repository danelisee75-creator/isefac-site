"use client"
import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900']
})

export default function Connexion() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message === 'Invalid login credentials' 
        ? 'Email ou mot de passe incorrect' 
        : error.message)
      setLoading(false)
    } else {
      router.push('/espace-etudiant')
      router.refresh() // IMPORTANT: refresh pour que le serveur voie la session
    }
  }

  return (
    <main className={`min-h-screen bg-gray-50 flex items-center justify-center p-6 ${montserrat.className}`}>
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <Image
            src="/logo-isefac.jpeg"
            alt="ISEFAC"
            width={80}
            height={80}
            className="mx-auto mb-4"
          />
          <h1 className="text-3xl font-black text-gray-900">Connexion</h1>
          <p className="text-gray-600 mt-2">Accède à ton espace étudiant</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-black text-gray-900 mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="ton@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-black text-gray-900 mb-2">Mot de passe</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1e2a5e] hover:bg-blue-900 text-white px-6 py-3 rounded-lg font-black transition disabled:opacity-50"
          >
            {loading? 'Connexion...' : 'Se connecter'}
          </button>

          <p className="text-center text-sm text-gray-600">
            Pas de compte ?{' '}
            <Link href="/inscription" className="text-blue-600 font-black hover:underline">
              S'inscrire
            </Link>
          </p>
        </form>
      </div>
    </main>
  )
}