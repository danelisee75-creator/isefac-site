"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Montserrat } from 'next/font/google'
import { GraduationCap, Globe, Briefcase, CheckCircle2, Scale, Banknote, Users, Truck } from 'lucide-react'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900']
})

export default function APropos() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className={`min-h-screen ${montserrat.className}`}>
      {/* HEADER IDENTIQUE A LA HOME */}
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
            <Link href="/a-propos" className="text-orange-400 hover:text-orange-300">A propos</Link>
            <Link href="/formations" className="hover:text-blue-200">Formations</Link>
            <a href="/#public" className="hover:text-blue-200">Public cible</a>
            <a href="/#contact" className="hover:text-blue-200">Contact</a>
            <Link href="/espace-etudiant" className="hover:text-blue-200">Espace étudiant</Link>
            <a href="/#faq" className="hover:text-blue-200">FAQ</a>
          </nav>
        </div>
      </header>

      {/* Hero A Propos - AVEC IMAGE DE FOND */}
      <section className="relative bg-[#1e2a4a] text-white pt-32 pb-20 px-6 overflow-hidden">
        {/* Image de fond */}
        <Image
          src="https://images.unsplash.com/photo-1562774053-701939374585?w=1920&q=80"
          alt="Campus ISEFAC"
          fill
          className="object-cover opacity-20"
          priority
          unoptimized
        />
        {/* Overlay bleu foncé */}
        <div className="absolute inset-0 bg-[#1e2a4a]/70" />
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-2xl">
            À PROPOS D'ISEFAC BS
          </h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
        </div>
      </section>

      {/* Présentation école */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                BIENVENUE À L'ISEFAC BUSINESS SCHOOL
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Établissement Privé d'Enseignement Supérieur et Professionnel agréé par l'État
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                ISEFAC Business School forme depuis plus de 25 ans les cadres et professionnels 
                dans des secteurs stratégiques : <span className="font-semibold text-gray-900">Management, 
                Banque & Finance, Ressources Humaines, Droit, Logistique, Marketing, Communication, 
                Commerce International, Comptabilité et Informatique de gestion</span>.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Notre approche : l’alternance, les cas réels d’entreprise, et un réseau de 
                15 000 alumni actifs au Gabon et à l’international.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Nos formations sont homologuées et reconnues par l’État : CFP, BTS, DUT,
                Bachelor, Licence Pro, Master, MBA et DBA. 100% orientées employabilité.
              </p>
            </div>
            <Image
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070"
              alt="Étudiants ISEFAC"
              width={600}
              height={450}
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>

          {/* Pourquoi ISEFAC */}
          <div className="bg-[#1e2a4a] text-white rounded-2xl p-12 mb-16">
            <h3 className="text-3xl font-bold text-center mb-12">Choisissez ISEFAC</h3>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold text-blue-400 mb-2">92%</div>
                <p className="text-blue-200">Taux d'insertion</p>
              </div>
              <div>
                <div className="text-5xl font-bold text-blue-400 mb-2">1500+</div>
                <p className="text-blue-200">Étudiants</p>
              </div>
              <div>
                <div className="text-5xl font-bold text-blue-400 mb-2">300</div>
                <p className="text-blue-200">Entreprises partenaires</p>
              </div>
            </div>
          </div>

          {/* Domaines de formation */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">Nos Domaines d'Excellence</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-7 h-7 text-blue-600" />
                </div>
                <h4 className="font-bold text-gray-900">Management</h4>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Banknote className="w-7 h-7 text-blue-600" />
                </div>
                <h4 className="font-bold text-gray-900">Banque & Finance</h4>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-7 h-7 text-blue-600" />
                </div>
                <h4 className="font-bold text-gray-900">Ressources Humaines</h4>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Scale className="w-7 h-7 text-blue-600" />
                </div>
                <h4 className="font-bold text-gray-900">Droit</h4>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-7 h-7 text-blue-600" />
                </div>
                <h4 className="font-bold text-gray-900">Logistique</h4>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-7 h-7 text-blue-600" />
                </div>
                <h4 className="font-bold text-gray-900">Marketing & Com</h4>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-7 h-7 text-blue-600" />
                </div>
                <h4 className="font-bold text-gray-900">Commerce Inter.</h4>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-7 h-7 text-blue-600" />
                </div>
                <h4 className="font-bold text-gray-900">Comptabilité</h4>
              </div>
            </div>
          </div>

          {/* Valeurs */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold mb-3 text-gray-900">Excellence académique</h4>
              <p className="text-gray-600">
                Formateurs experts issus du monde professionnel. Formations en Gestion, Finance, 
                Droit, RH, Logistique, Marketing, certifiées et reconnues.
              </p>
            </div>
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold mb-3 text-gray-900">Ouverture internationale</h4>
              <p className="text-gray-600">
                Partenariats avec des universités françaises, camerounaises et tunisiennes 
                en délocalisation de diplômes.
              </p>
            </div>
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold mb-3 text-gray-900">Alternance & Insertion</h4>
              <p className="text-gray-600">
                95% d’insertion professionnelle. Stages obligatoires et places gratuites 
                chaque année avec l’ANBS.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mot du fondateur */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              LE MOT DU FONDATEUR
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-5 gap-12 items-start bg-white rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="md:col-span-2">
              <Image
                src="/directeur.jpg"
                alt="M. MINKO MI NGWA Bruno"
                width={400}
                height={533}
                className="rounded-xl shadow-xl w-full h-auto"
                priority
              />
              <div className="mt-6 text-center">
                <p className="font-bold text-xl text-gray-900">M. MINKO MI NGWA Bruno</p>
                <p className="text-blue-600 font-semibold">Fondateur & Président Exécutif</p>
                <p className="text-gray-500 text-sm mt-1">ISEFAC Business School</p>
              </div>
            </div>

            <div className="md:col-span-3 space-y-5 text-lg text-gray-700 leading-relaxed">
              <p>
                J’ai fondé ISEFAC Business School afin de capitaliser sur mon expérience
                professionnelle : plus de 25 ans dans des secteurs variés — économie, finance,
                banque, transport, éducation, commerce, conseil, audit et courrier.
                Mon objectif : transmettre aux jeunes générations.
              </p>

              <p>
                Je me suis entouré de formateurs experts avec un enjeu pédagogique clair :
                donner à nos étudiants et apprenants les clés pour trouver leur place en entreprise.
                Nous œuvrons chaque jour pour leur employabilité future.
              </p>

              <p>
                J’ai à cœur que cet établissement respecte la vie de nos jeunes et leur propose
                des moments de convivialité, tout en intégrant une dimension citoyenne et internationale.
              </p>

              <div className="flex items-start gap-3 py-4">
                <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <p>
                  <span className="font-semibold">Formations homologuées</span> par l’État :
                  CFP, Technicien, DTS, DUT, BTS, Bachelor, Licence Pro, Master, MBA, DBA en 
                  Management, Finance, RH, Droit, Logistique et plus.
                </p>
              </div>

              <div className="flex items-start gap-3 py-4">
                <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <p>
                  <span className="font-semibold">Alternance</span> mise en place pour renforcer
                  l’aspect pratique. Places gratuites chaque année avec l’ANBS.
                </p>
              </div>

              <div className="flex items-start gap-3 py-4">
                <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <p>
                  <span className="font-semibold">Partenariats</span> avec des universités
                  françaises, camerounaises et tunisiennes en délocalisation.
                </p>
              </div>

              <p className="pt-6 border-t border-gray-200 font-bold text-gray-900 text-xl">
                ISEFAC BS vous ouvre les portes de la réussite. ISEFAC BS est inclassable, et j’en suis fier.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-[#1e2a4a]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Prêt à rejoindre ISEFAC BS?
          </h2>
          <p className="text-xl text-blue-200 mb-8">
            Candidature en ligne. Réponse sous 48h.
          </p>
          <a
            href="/inscription"
            className="inline-block bg-red-600 text-white px-10 py-4 rounded-lg font-semibold hover:bg-red-700 transition text-lg"
          >
            Étudiez maintenant
          </a>
        </div>
      </section>
    </main>
  )
}