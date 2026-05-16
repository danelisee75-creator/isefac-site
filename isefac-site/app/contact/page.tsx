"use client"

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Montserrat } from 'next/font/google'
import { MapPin, Phone, Mail, Send, Clock, MessageCircle } from "lucide-react"

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900']
})

export default function Contact() {
  const [mounted, setMounted] = useState(false)
  const [displayText, setDisplayText] = useState('')
  const fullText = 'BIENVENUE À LA PAGE CONTACT'

  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    sujet: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  // Animation machine à écrire
  useEffect(() => {
    setMounted(true)
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 80)
    return () => clearInterval(timer)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(r => setTimeout(r, 1500))
    setIsSubmitting(false)
    setSuccess(true)
    setFormData({ nom: '', email: '', sujet: '', message: '' })
  }

  if (!mounted) return null

  return (
    <main className={montserrat.className}>
      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
     .cursor {
          animation: blink 1s infinite;
        }
      `}</style>

      {/* HERO */}
      <section className="relative h-[calc(100vh-80px)] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=80"
          alt="ISEFAC Contact"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center z-10 px-4 pt-32">
          <p className="text-xs sm:text-sm md:text-xl mb-4 drop-shadow-lg uppercase tracking-wider font-semibold text-[#F4B400]">
            UNE QUESTION? UN PROJET?
          </p>
          <h1 className="text-3xl md:text-6xl font-black mb-3 drop-shadow-2xl">
            CONTACTEZ-NOUS
          </h1>
          <p className="text-lg md:text-2xl mb-8 max-w-3xl font-medium px-4">
            Notre équipe vous répond sous 24h
          </p>
        </div>
      </section>

      {/* BIENVENUE AVEC ANIMATION TYPING */}
      <section className="relative py-32 overflow-hidden bg-[#1e2a5e]">
        <div className="relative max-w-5xl mx-auto px-6">
          <div className="backdrop-blur-2xl bg-white/5 border border-white/20 rounded-3xl p-12 md:p-20 shadow-2xl">
            <h2 className="text-4xl md:text-6xl font-black mb-6 text-white drop-shadow-2xl text-center min-h- md:min-h- flex items-center justify-center">
              {displayText}
              <span className="cursor text-[#F4B400]">|</span>
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 font-semibold mb-8 drop-shadow-lg text-center">
              Parlons de votre projet de formation
            </p>
            <div className="w-32 h-1.5 bg-[#F4B400] mx-auto rounded-full shadow-lg"></div>
          </div>
        </div>
      </section>

      {/* INFOS + FORMULAIRE */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* INFOS */}
            <div className="space-y-6">
              <h3 className="text-3xl font-black text-gray-900 mb-8">
                NOS COORDONNÉES
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:border-[#F4B400] group">
                  <div className="bg-[#1e2a5e] p-3 rounded-xl group-hover:scale-110 transition">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 mb-2">Campus Owendo</h4>
                    <p className="text-gray-700 font-medium">Zone Owendo Campus Quartier AWOUNGOU Terminus ITO</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:border-[#F4B400] group">
                  <div className="bg-[#1e2a5e] p-3 rounded-xl group-hover:scale-110 transition">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 mb-2">Campus Espace PME</h4>
                    <p className="text-gray-700 font-medium">Quartier AWENDJE</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:border-[#F4B400] group">
                  <div className="bg-[#F4B400] p-3 rounded-xl group-hover:scale-110 transition">
                    <Phone className="text-gray-900" size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 mb-2">Téléphone</h4>
                    <p className="text-gray-700 font-medium">+241 74804937 / 65604787</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:border-[#F4B400] group">
                  <div className="bg-[#F4B400] p-3 rounded-xl group-hover:scale-110 transition">
                    <Mail className="text-gray-900" size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 mb-2">Email</h4>
                    <p className="text-gray-700 font-medium">isefacgabon@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:border-[#F4B400] group">
                  <div className="bg-[#1e2a5e] p-3 rounded-xl group-hover:scale-110 transition">
                    <Clock className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 mb-2">Horaires</h4>
                    <p className="text-gray-700 font-medium">Lundi - Vendredi : 8h - 18h</p>
                    <p className="text-gray-700 font-medium">Samedi : 9h - 13h</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FORMULAIRE */}
            <div className="bg-white border-2 border-gray-100 rounded-2xl shadow-2xl p-8">
              {success? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MessageCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 mb-3">Message envoyé!</h3>
                  <p className="text-gray-600 mb-8 font-medium">On vous répond sous 24h.</p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="bg-[#1e2a5e] text-white px-8 py-3 rounded-xl font-black hover:bg-blue-900 transition"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-black text-gray-900 mb-6">
                    Envoyez-nous un message
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <input
                      name="nom"
                      type="text"
                      required
                      value={formData.nom}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F4B400] focus:border-[#F4B400] outline-none transition font-medium"
                      placeholder="Nom complet"
                    />
                    <input
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F4B400] focus:border-[#F4B400] outline-none transition font-medium"
                      placeholder="Email"
                    />
                    <input
                      name="sujet"
                      type="text"
                      required
                      value={formData.sujet}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F4B400] focus:border-[#F4B400] outline-none transition font-medium"
                      placeholder="Sujet"
                    />
                    <textarea
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F4B400] focus:border-[#F4B400] outline-none transition resize-none font-medium"
                      placeholder="Votre message..."
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#F4B400] hover:bg-[#e0a500] text-gray-900 py-4 rounded-xl font-black text-lg shadow-xl transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      <Send size={20} />
                      {isSubmitting? 'Envoi...' : 'Envoyer le message'}
                    </button>
                  </form>
                </>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* GOOGLE MAPS ESPACE PME AWENDJE */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
              CAMPUS ESPACE PME AWENDJE
            </h3>
            <p className="text-lg text-gray-600 font-semibold">
              Retrouvez-nous facilement à Awèndje
            </p>
            <div className="w-24 h-1 bg-[#F4B400] mx-auto mt-4"></div>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-gray-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.8!2d9.4675!3d0.3956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMjMnNDQuMiJOIDnCsDI4JzAzLjAiRQ!5e0!3m2!1sfr!2sga!4v1700000000000"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Campus Espace PME Awèndje"
            ></iframe>

            <div className="bg-[#1e2a5e] p-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-white">
                <MapPin className="text-[#F4B400]" size={24} />
                <div>
                  <p className="font-black text-lg">Campus Espace PME</p>
                  <p className="text-sm text-blue-200">Quartier AWENDJE, Libreville</p>
                </div>
              </div>
              <a
                href="https://maps.app.goo.gl/ZPnopaVdh7C786W36"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#F4B400] hover:bg-[#e0a500] text-gray-900 px-6 py-3 rounded-xl font-black transition hover:scale-105"
              >
                Ouvrir dans Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}