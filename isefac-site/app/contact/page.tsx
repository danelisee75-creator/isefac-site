"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Montserrat } from 'next/font/google'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900']
})

export default function Contact() {
  const [scrolled, setScrolled] = useState(false)
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    sujet: '',
    message: ''
  })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => {
      setSent(false)
      setFormData({ nom: '', email: '', telephone: '', sujet: '', message: '' })
    }, 3000)
  }

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
            <Link href="/formations" className="hover:text-blue-200">Formations</Link>
            <Link href="/contact" className="text-orange-400 hover:text-orange-300">Contact</Link>
            <Link href="/espace-etudiant" className="hover:text-blue-200">Espace étudiant</Link>
            <Link href="/faq" className="hover:text-blue-200">FAQ</Link>
          </nav>
        </div>
      </header>

      {/* Hero Contact - AVEC IMAGE DE FOND */}
      <section className="relative bg-[#1e2a4a] text-white pt-32 pb-24 px-6 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=80"
          alt="Contact ISEFAC"
          fill
          className="object-cover opacity-15"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1e2a4a]/80 to-[#1e2a4a]/95" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-black mb-6 drop-shadow-2xl">
            CONTACTEZ-NOUS
          </h1>
          <p className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto font-medium">
            Une question sur nos formations? Notre équipe vous répond sous 24h
          </p>
          <div className="w-24 h-1 bg-orange-500 mx-auto mt-8"></div>
        </div>
      </section>

      {/* Infos Contact + Formulaire */}
      <section className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">

            {/* Colonne Infos - 2 colonnes */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-4xl font-black text-gray-900 mb-3">
                  Nos Campus
                </h2>
                <p className="text-gray-600 text-lg mb-8">
                  Retrouvez-nous à Libreville sur nos deux sites
                </p>
              </div>

              {/* Campus Owendo */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition border border-gray-100">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-gray-900 mb-2">Campus Owendo</h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      Quartier AWOUNGOU<br />
                      Terminus ITO
                    </p>
                  </div>
                </div>
              </div>

              {/* Campus Espace PME - TA VRAIE LOCALISATION */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 shadow-xl text-white">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-black mb-2">Campus Espace PME</h3>
                    <p className="text-blue-100 text-lg leading-relaxed mb-5">
                      Quartier AWENDJE<br />
                      Libreville, Gabon
                    </p>
                    <a
                      href="https://maps.app.goo.gl/xNB5PTz1cxsqL9ndA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-white text-blue-700 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition shadow-lg"
                    >
                      <MapPin className="w-5 h-5" />
                      Voir sur Google Maps
                    </a>
                  </div>
                </div>
              </div>

              {/* Coordonnées */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 space-y-5">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Coordonnées</h3>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 transition">
                    <Phone className="w-6 h-6 text-blue-600 group-hover:text-white transition" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold mb-1">Téléphone</p>
                    <p className="text-lg text-gray-900 font-bold">+241 74 80 49 37</p>
                    <p className="text-lg text-gray-900 font-bold">+241 65 60 47 87</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 transition">
                    <Mail className="w-6 h-6 text-blue-600 group-hover:text-white transition" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold mb-1">Email</p>
                    <a href="mailto:isefacgabon@gmail.com" className="text-lg text-gray-900 font-bold hover:text-blue-600 transition">
                      isefacgabon@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 transition">
                    <Clock className="w-6 h-6 text-blue-600 group-hover:text-white transition" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-semibold mb-1">Horaires d'ouverture</p>
                    <p className="text-lg text-gray-900 font-bold">Lun - Ven : 8h00 - 17h00</p>
                    <p className="text-lg text-gray-900 font-bold">Sam : 9h00 - 13h00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Colonne Formulaire - 3 colonnes */}
            <div className="lg:col-span-3">
              <div className="bg-gradient-to-br from-[#1e2a5e] to-[#162042] rounded-3xl p-8 md:p-12 text-white shadow-2xl">
                <h2 className="text-3xl md:text-4xl font-black mb-3">
                  Envoyez-nous un message
                </h2>
                <p className="text-blue-200 text-lg mb-8">
                  Remplissez le formulaire et nous vous répondrons sous 24h
                </p>

                {sent? (
                  <div className="bg-green-500/20 border-2 border-green-400 rounded-2xl p-8 text-center">
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Message envoyé!</h3>
                    <p className="text-green-100">Nous vous répondrons dans les plus brefs délais.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-blue-200">Nom complet *</label>
                        <input
                          type="text"
                          required
                          value={formData.nom}
                          onChange={(e) => setFormData({...formData, nom: e.target.value})}
                          className="w-full px-5 py-4 rounded-xl bg-white/10 backdrop-blur border-2 border-white/20 text-white placeholder-blue-300 focus:outline-none focus:border-orange-400 focus:bg-white/15 transition"
                          placeholder="Jean Dupont"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2 text-blue-200">Email *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full px-5 py-4 rounded-xl bg-white/10 backdrop-blur border-2 border-white/20 text-white placeholder-blue-300 focus:outline-none focus:border-orange-400 focus:bg-white/15 transition"
                          placeholder="jean@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-blue-200">Téléphone</label>
                        <input
                          type="tel"
                          value={formData.telephone}
                          onChange={(e) => setFormData({...formData, telephone: e.target.value})}
                          className="w-full px-5 py-4 rounded-xl bg-white/10 backdrop-blur border-2 border-white/20 text-white placeholder-blue-300 focus:outline-none focus:border-orange-400 focus:bg-white/15 transition"
                          placeholder="+241 06 12 34 56"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2 text-blue-200">Sujet *</label>
                        <select
                          required
                          value={formData.sujet}
                          onChange={(e) => setFormData({...formData, sujet: e.target.value})}
                          className="w-full px-5 py-4 rounded-xl bg-white/10 backdrop-blur border-2 border-white/20 text-white focus:outline-none focus:border-orange-400 focus:bg-white/15 transition"
                        >
                          <option value="" className="bg-[#1e2a5e]">Choisir un sujet</option>
                          <option value="inscription" className="bg-[#1e2a5e]">Inscription</option>
                          <option value="formations" className="bg-[#1e2a5e]">Formations</option>
                          <option value="alternance" className="bg-[#1e2a5e]">Alternance</option>
                          <option value="autre" className="bg-[#1e2a5e]">Autre</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-blue-200">Message *</label>
                      <textarea
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full px-5 py-4 rounded-xl bg-white/10 backdrop-blur border-2 border-white/20 text-white placeholder-blue-300 focus:outline-none focus:border-orange-400 focus:bg-white/15 transition resize-none"
                        placeholder="Décrivez votre demande..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-5 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition hover:scale-[1.02] shadow-xl"
                    >
                      <Send className="w-6 h-6" />
                      Envoyer le message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Carte Google Maps intégrée - TON VRAI LIEN */}
      <section className="h- w-full relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.7!2d9.458!3d0.38!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sEspace+PME+Awendje!5e0!3m2!1sfr!2sga!4v1700000000000"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Carte ISEFAC Espace PME Awendje"
          className="grayscale hover:grayscale-0 transition-all duration-500"
        ></iframe>

        {/* Bouton flottant vers Maps */}
        <a
          href="https://maps.app.goo.gl/xNB5PTz1cxsqL9ndA"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl font-bold shadow-2xl flex items-center gap-3 transition hover:scale-105"
        >
          <MapPin className="w-6 h-6" />
          Ouvrir dans Google Maps
        </a>
      </section>
    </main>
  )
}