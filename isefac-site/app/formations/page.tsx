"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Montserrat } from 'next/font/google'
import { X, MapPin, Briefcase, GraduationCap, ChevronRight, Phone, Mail, Download } from "lucide-react"

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900']
})

export default function Formations() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [paysActif, setPaysActif] = useState('gabon')
  const [niveauActif, setNiveauActif] = useState('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [formationActive, setFormationActive] = useState<any>(null)
  const [mounted, setMounted] = useState(false)

  const slides = [
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&q=80',
    'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1920&q=80',
    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&q=80'
  ]

  const dataFormations = {
    gabon: {
      nom: "GABON",
      drapeau: "🇬🇦",
      ville: "Libreville",
      niveaux: {
        cfp: [
          { titre: "Comptabilité Gestion", image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&q=80", desc: "Tenue des comptes, fiscalité, paie", definition: "Formation pratique en comptabilité générale. Saisie comptable, factures, paie, déclarations fiscales de base et logiciels comptables.", debouches: ["Aide-comptable", "Assistant gestion PME", "Gestionnaire paie"], programme: ["Comptabilité générale", "Fiscalité TVA", "Paie", "Logiciels Sage", "Stage 3 mois"] },
          { titre: "Secrétariat médical", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80", desc: "Accueil patients, dossiers médicaux", definition: "Accueil patients, gestion dossiers médicaux, prise RDV, facturation actes. Vocabulaire médical et logiciels spécialisés.", debouches: ["Secrétaire médicale", "Assistant dentaire", "Agent accueil hôpital"], programme: ["Terminologie médicale", "Gestion dossiers", "Logiciels médicaux", "Facturation CPAM", "Stage hôpital"] },
          { titre: "Mécanique Automobile", image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80", desc: "Diagnostic, réparation moteurs", definition: "Diagnostic et réparation véhicules légers. Moteurs, embrayage, freins, suspension, électronique.", debouches: ["Mécanicien auto", "Technicien diagnostic", "Chef atelier"], programme: ["Moteurs thermiques", "Diagnostic", "Freinage", "Électricité auto", "Stage garage"] },
          { titre: "Électricité Bâtiment", image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80", desc: "Installation électrique NFC 15-100", definition: "Installation électrique bâtiment. Tableaux, câblage, prises, éclairage. Normes NFC 15-100.", debouches: ["Électricien bâtiment", "Monteur câbleur", "Technicien maintenance"], programme: ["Électricité générale", "Normes NFC", "Tableaux", "Domotique", "Stage"] },
          { titre: "Infographie", image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80", desc: "Photoshop, Illustrator, PAO", definition: "Création graphique, PAO, mise en page. Suite Adobe : Photoshop, Illustrator, InDesign.", debouches: ["Infographiste", "Maquettiste", "Webdesigner"], programme: ["Photoshop", "Illustrator", "InDesign", "Typographie", "Web"] },
        ],
        dts: [
          { titre: "GRH", image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80", desc: "Recrutement, paie, droit du travail", definition: "DTS RH. Recrutement, gestion administrative personnel, paie, droit du travail gabonais, GPEC.", debouches: ["Assistant RH", "Chargé recrutement", "Gestionnaire paie"], programme: ["Recrutement", "Admin personnel", "Paie SIRH", "Droit travail", "GPEC"] },
          { titre: "Logistique Transport", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80", desc: "Supply chain, gestion stocks", definition: "Gestion flux physiques et information. Stocks, transport, entrepôt, supply chain.", debouches: ["Responsable logistique", "Affréteur", "Gestionnaire entrepôt"], programme: ["Stocks", "Transport", "Entrepôt", "WMS", "Douane"] },
          { titre: "Comptabilité Gestion", image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&q=80", desc: "Compta générale, analytique", definition: "Comptabilité générale et analytique, fiscalité, audit. Préparation DCG.", debouches: ["Comptable", "Contrôleur gestion", "Auditeur"], programme: ["Compta générale", "Analytique", "Fiscalité", "Audit", "Sage"] },
        ],
        bts: [
          { titre: "Cybersécurité", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80", desc: "Ethical hacking, SOC, forensic", definition: "Protection SI contre cyberattaques. Ethical hacking, sécurité réseaux, cryptographie, forensic, RGPD.", debouches: ["Analyste SOC", "Pentester", "Consultant cyber"], programme: ["Sécurité réseaux", "Ethical Hacking", "Cryptographie", "Forensic", "ISO 27001"] },
          { titre: "Développeur Web & Mobile", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80", desc: "React, Node.js, Flutter", definition: "Développement applications web et mobiles. React, Node.js, Flutter, API. Projets réels.", debouches: ["Dev Web", "Dev Mobile", "Tech Lead"], programme: ["React", "Node.js", "Flutter", "API REST", "DevOps"] },
          { titre: "QHSE", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80", desc: "ISO 9001/14001/45001, audit", definition: "Qualité, Hygiène, Sécurité, Environnement. Normes ISO, prévention risques, audit qualité, RSE.", debouches: ["Animateur QHSE", "Auditeur qualité", "Responsable HSE"], programme: ["ISO 9001/14001/45001", "Prévention risques", "Audit", "RSE"] },
        ]
      }
    },
    cameroun: {
      nom: "CAMEROUN",
      drapeau: "🇨🇲",
      ville: "Yaoundé",
      niveaux: {
        bts: [
          { titre: "Gestion de Projets", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80", desc: "Agile, Scrum, MS Project", definition: "Pilotage projets A à Z : cadrage, planification, budget, équipe, risques. Agile, Scrum, PMP.", debouches: ["Chef projet", "Scrum Master", "PMO"], programme: ["Agile & Scrum", "MS Project", "Budget", "Management", "PMP"] },
        ],
        licence: [
          { titre: "Techniques Pharmaceutiques", image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80", desc: "Production médicaments, BPF", definition: "Production médicaments, contrôle qualité, BPF. Industrie pharmaceutique.", debouches: ["Technicien pharma", "Contrôleur qualité", "Délégué pharma"], programme: ["Production", "Contrôle qualité", "BPF", "Réglementation"] },
        ]
      }
    },
    europe: {
      nom: "EUROPE",
      drapeau: "🇫🇷",
      ville: "France",
      niveaux: {
        bachelor: [
          { titre: "Cybersécurité", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80", desc: "Pentest, SOC, Cloud Security", definition: "Bac+3 cybersécurité offensive/défensive. Pentest, SOC, forensic, cloud security. Certif CEH, CISSP.", debouches: ["Pentester", "Analyste SOC", "Consultant cyber"], programme: ["Ethical Hacking", "Cloud Security", "Forensic", "ISO 27001"] },
        ],
        master: [
          { titre: "Intelligence Artificielle", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80", desc: "Deep Learning, NLP", definition: "Master Bac+5 IA. Deep Learning, NLP, Computer Vision, MLOps. Recherche, stage 6 mois.", debouches: ["Data Scientist", "Ingénieur IA", "ML Engineer"], programme: ["Deep Learning", "NLP", "Computer Vision", "MLOps", "PyTorch"] },
        ]
      }
    }
  }

  const paysActuel = dataFormations[paysActif as keyof typeof dataFormations]
  const niveaux = Object.keys(paysActuel.niveaux)
  const formationsFiltrees = niveauActif === 'all'
? Object.values(paysActuel.niveaux).flatMap(n => n)
    : paysActuel.niveaux[niveauActif as keyof typeof paysActuel.niveaux] || []

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

  const openModal = (formation: any) => {
    setFormationActive(formation)
    setModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setModalOpen(false)
    document.body.style.overflow = 'auto'
  }

  if (!mounted) return null

  return (
    <main className={`min-h-screen ${montserrat.className}`}>
      {/* HEADER IDENTIQUE ACCUEIL */}
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
            <Link href="/formations" className="text-orange-400">Formations</Link>
            <Link href="/inscription" className="hover:text-blue-200">Inscription</Link>
            <Link href="/contact" className="hover:text-blue-200">Contact</Link>
            <Link href="/espace-etudiant" className="hover:text-blue-200">Espace étudiant</Link>
          </nav>
        </div>
      </header>

      {/* HERO SLIDER IMAGES - IDENTIQUE ACCUEIL */}
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
            NOS FORMATIONS
          </h1>
          <p className="text-xl md:text-2xl mb-4 font-bold text-blue-300 drop-shadow-lg">
            Libreville, Gabon
          </p>
          <p className="text-lg md:text-xl mb-8 drop-shadow-lg max-w-3xl font-medium">
            Du CFP au Master · Formations professionnelles reconnues
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

      {/* FOND BLANC POUR TOUT LE RESTE */}
      <div className="bg-white">
        {/* Section Bienvenue */}
        <section className="bg-white py-24">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-gray-900">
              CHOISISSEZ VOTRE AVENIR
            </h2>
            <p className="text-xl text-gray-700 font-semibold mb-8">
              École Supérieure Professionnelle reconnue par arrêté n°000324/MENICFP/SG/DGFP/DFP
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
        </section>

        {/* FILTRES + PDF */}
        <section className="bg-gray-50 py-12 border-y border-gray-200">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex justify-center gap-3 mb-6 flex-wrap">
              {Object.entries(dataFormations).map(([key, pays]) => (
                <button
                  key={key}
                  onClick={() => { setPaysActif(key); setNiveauActif('all') }}
                  className={`px-5 py-2 rounded-lg font-black text-xs transition-all flex items-center gap-2 ${
                    paysActif === key
            ? 'bg-[#1e2a5e] text-white shadow-xl scale-105'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  <span className="text-base">{pays.drapeau}</span>
                  {pays.nom}
                </button>
              ))}
            </div>

            <div className="flex justify-center gap-2 flex-wrap mb-6">
              <button
                onClick={() => setNiveauActif('all')}
                className={`px-3 py-1.5 rounded-md text- font-black transition uppercase ${
                  niveauActif === 'all'? 'bg-orange-500 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                Tous
              </button>
              {niveaux.map((niv) => (
                <button
                  key={niv}
                  onClick={() => setNiveauActif(niv)}
                  className={`px-3 py-1.5 rounded-md text- font-black transition uppercase ${
                    niveauActif === niv? 'bg-orange-500 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {niv}
                </button>
              ))}
            </div>

            <div className="flex justify-center">
              <a
                href="/brochure-isefac.pdf"
                download
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-black text-sm shadow-xl transition hover:scale-105 flex items-center gap-2"
              >
                <Download size={18} />
                Télécharger la brochure PDF
              </a>
            </div>
          </div>
        </section>

        {/* GRILLE FORMATIONS */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 mb-6 text-gray-900">
              <MapPin size={18} />
              <span className="font-black text-lg">{paysActuel.nom}</span>
              <ChevronRight size={18} />
              <span>{paysActuel.ville}</span>
              <span className="bg-[#1e2a5e] text-white px-3 py-1 rounded-md text-xs font-black ml-2">
                {formationsFiltrees.length} formations
              </span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {formationsFiltrees.map((f, i) => (
                <div
                  key={i}
                  onClick={() => openModal(f)}
                  className="group cursor-pointer relative rounded-xl overflow-hidden bg-white border border-gray-200 hover:border-blue-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div style={{ height: '160px' }} className="relative overflow-hidden">
                    <img
                      src={f.image}
                      alt={f.titre}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-black mb-2 text-gray-900 group-hover:text-blue-600 transition line-clamp-2">
                      {f.titre}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2 mb-3">{f.desc}</p>
                    <div className="flex items-center gap-1 text-orange-500 font-black text-xs group-hover:gap-1.5 transition-all">
                      Voir détails <ChevronRight size={14} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
                  <MapPin size={16} />
                  <span>Zone Owendo Campus Quartier AWOUNGOU Terminus ITO</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>Campus Espace PME Quartier AWENDJE</span>
                </div>
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

      {/* MODAL */}
      {modalOpen && formationActive && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" onClick={closeModal}>
          <div
            className="relative w-full max-w-3xl max-h- overflow-y-auto bg-white border border-gray-300 rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-gray-800/80 hover:bg-gray-900 backdrop-blur-md rounded-full p-2 text-white transition"
            >
              <X size={20} />
            </button>

            <div className="relative h-64 overflow-hidden rounded-t-2xl">
              <img
                src={formationActive.image}
                alt={formationActive.titre}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e2a5e] via-[#1e2a5e]/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h2 className="text-2xl md:text-3xl font-black text-white mb-1">
                  {formationActive.titre}
                </h2>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-black text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed text-sm">
                  {formationActive.definition}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Briefcase className="text-orange-500" size={18} />
                    <h3 className="text-lg font-black text-gray-900">Débouchés</h3>
                  </div>
                  <div className="space-y-2">
                    {formationActive.debouches.map((d: string, i: number) => (
                      <div key={i} className="flex items-start gap-2 bg-gray-50 border border-gray-200 p-2.5 rounded-lg">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-1.5 flex-shrink-0" />
                        <span className="text-gray-700 text-xs">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <GraduationCap className="text-blue-600" size={18} />
                    <h3 className="text-lg font-black text-gray-900">Programme</h3>
                  </div>
                  <div className="space-y-2">
                    {formationActive.programme.map((p: string, i: number) => (
                      <div key={i} className="flex items-start gap-2 bg-gray-50 border border-gray-200 p-2.5 rounded-lg">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 flex-shrink-0" />
                        <span className="text-gray-700 text-xs">{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Link href="/inscription" className="inline-block bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 rounded-xl font-black text-base shadow-2xl transition hover:scale-105">
                  Je m'inscris
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}