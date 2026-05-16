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
          { titre: "Comptabilité Gestion I", image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&q=80", desc: "Tenue des comptes, fiscalité, paie", definition: "Formation pratique en comptabilité générale. Saisie comptable, factures, paie, déclarations fiscales de base et logiciels comptables.", debouches: ["Aide-comptable", "Assistant gestion PME", "Gestionnaire paie"], programme: ["Comptabilité générale", "Fiscalité TVA", "Paie", "Logiciels Sage", "Stage 3 mois"] },
          { titre: "Comptabilité Gestion II", image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&q=80", desc: "Compta approfondie, analytique", definition: "Approfondissement comptabilité générale et analytique. Fiscalité avancée, gestion budgétaire.", debouches: ["Comptable", "Contrôleur gestion junior"], programme: ["Compta analytique", "Fiscalité avancée", "Budget", "Sage"] },
          { titre: "Secrétariat Médical", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80", desc: "Accueil patients, dossiers médicaux", definition: "Accueil patients, gestion dossiers médicaux, prise RDV, facturation actes.", debouches: ["Secrétaire médicale", "Assistant dentaire"], programme: ["Terminologie médicale", "Gestion dossiers", "Logiciels médicaux"] },
          { titre: "Plomberie Sanitaire", image: "https://images.unsplash.com/photo-1607472586893-41bdbf5f59c9?w=800&q=80", desc: "Installation sanitaire, canalisations", definition: "Installation et maintenance des systèmes sanitaires et de canalisation.", debouches: ["Plombier", "Technicien sanitaire"], programme: ["Lecture plan", "Canalisation", "Chauffage", "Stage"] },
          { titre: "Secrétariat Comptable", image: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=800&q=80", desc: "Bureautique, compta de base", definition: "Secrétariat et comptabilité de base pour PME.", debouches: ["Secrétaire comptable", "Assistant administratif"], programme: ["Word Excel", "Compta de base", "Classement"] },
          { titre: "Froid et Climatisation", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80", desc: "Installation clim, froid industriel", definition: "Installation et maintenance systèmes de froid et climatisation.", debouches: ["Frigoriste", "Technicien clim"], programme: ["Thermodynamique", "Installation", "Maintenance"] },
          { titre: "Mécanique Automobile", image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80", desc: "Diagnostic, réparation moteurs", definition: "Diagnostic et réparation véhicules légers.", debouches: ["Mécanicien auto", "Technicien diagnostic"], programme: ["Moteurs thermiques", "Diagnostic", "Freinage", "Électricité auto"] },
          { titre: "Peinture Bâtiment", image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&q=80", desc: "Peinture, enduit, décoration", definition: "Préparation support, peinture intérieure/extérieure, décoration.", debouches: ["Peintre bâtiment", "Décorateur"], programme: ["Préparation support", "Peinture", "Enduit", "Décoration"] },
          { titre: "Électricité Bâtiment", image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80", desc: "Installation électrique NFC 15-100", definition: "Installation électrique bâtiment. Tableaux, câblage, prises, éclairage.", debouches: ["Électricien bâtiment", "Monteur câbleur"], programme: ["Électricité générale", "Normes NFC", "Tableaux", "Domotique"] },
          { titre: "Infographie", image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80", desc: "Photoshop, Illustrator, PAO", definition: "Création graphique, PAO, mise en page. Suite Adobe.", debouches: ["Infographiste", "Maquettiste"], programme: ["Photoshop", "Illustrator", "InDesign", "Typographie"] },
          { titre: "Tourisme", image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80", desc: "Accueil touristique, agence voyage", definition: "Accueil, conseil, billetterie, organisation voyages.", debouches: ["Agent voyage", "Guide touristique"], programme: ["GDS", "Billetterie", "Tourisme durable"] },
          { titre: "Boulangerie Pâtisserie", image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=800&q=80", desc: "Pain, viennoiserie, pâtisserie", definition: "Fabrication pain, viennoiserie, pâtisserie.", debouches: ["Boulanger", "Pâtissier"], programme: ["Pétrissage", "Cuisson", "Décoration"] },
          { titre: "Adjoint Archiviste", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", desc: "Gestion archives, classement", definition: "Collecte, classement, conservation et communication des archives.", debouches: ["Adjoint archiviste", "Gestionnaire doc"], programme: ["Archivistique", "Numérisation", "Base de données"] },
          { titre: "Opérateur Comptable", image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&q=80", desc: "Saisie comptable, facturation", definition: "Saisie comptable, facturation, rapprochement bancaire.", debouches: ["Opérateur comptable", "Assistant comptable"], programme: ["Saisie", "Facturation", "Sage"] },
          { titre: "Caisse Vente", image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&q=80", desc: "Encaissement, conseil client", definition: "Gestion caisse, encaissement, conseil et fidélisation client.", debouches: ["Caissier", "Vendeur"], programme: ["Encaissement", "Vente", "Gestion stock"] },
          { titre: "Chaudronnerie Soudure", image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80", desc: "Soudure MIG, TIG, ARC", definition: "Fabrication et assemblage pièces métalliques par soudure.", debouches: ["Soudeur", "Chaudronnier"], programme: ["Soudure MIG/TIG", "Lecture plan", "Métrologie"] },
          { titre: "Transit Douane I & II", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80", desc: "Dédouanement, logistique import/export", definition: "Procédures douanières, dédouanement, transit international.", debouches: ["Agent transit", "Déclarant douane"], programme: ["Douane", "Incoterms", "Logistique"] },
          { titre: "Carrosserie Automobile", image: "https://images.unsplash.com/photo-1613214149922-bba0f238519a?w=800&q=80", desc: "Réparation carrosserie, peinture", definition: "Réparation et remise en état carrosserie automobile.", debouches: ["Carrossier", "Débosseleur"], programme: ["Débosselage", "Mastiquage", "Peinture"] },
          { titre: "Électricité Automobile", image: "https://images.unsplash.com/photo-1619642751034-765df7c58e?w=800&q=80", desc: "Circuit électrique auto", definition: "Diagnostic et réparation circuits électriques automobile.", debouches: ["Électricien auto", "Technicien diag"], programme: ["Électricité auto", "Diagnostic", "Clim auto"] },
          { titre: "Froid Domestique", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80", desc: "Réfrigérateurs, congélateurs", definition: "Installation et réparation appareils froid domestique.", debouches: ["Technicien froid", "Dépanneur"], programme: ["Thermodynamique", "Réparation", "Gaz frigorigène"] },
          { titre: "Mécanique d’Entretien", image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80", desc: "Maintenance industrielle", definition: "Maintenance préventive et corrective équipements industriels.", debouches: ["Mécanicien entretien", "Technicien maintenance"], programme: ["Mécanique", "Hydraulique", "Pneumatique"] },
          { titre: "Tôlerie Carrosserie", image: "https://images.unsplash.com/photo-1613214149922-bba0f238519a?w=800&q=80", desc: "Tôlerie, soudure, finition", definition: "Travail de la tôle et finition carrosserie.", debouches: ["Tôlier", "Carrossier"], programme: ["Tôlerie", "Soudure", "Finition"] },
        ],
        dts: [
          { titre: "GRH", image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80", desc: "Recrutement, paie, droit du travail", definition: "DTS RH. Recrutement, gestion administrative personnel, paie, droit du travail gabonais.", debouches: ["Assistant RH", "Chargé recrutement"], programme: ["Recrutement", "Admin personnel", "Paie SIRH", "Droit travail"] },
          { titre: "Logistique Transport", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80", desc: "Supply chain, gestion stocks", definition: "Gestion flux physiques et information. Stocks, transport, entrepôt.", debouches: ["Responsable logistique", "Affréteur"], programme: ["Stocks", "Transport", "Entrepôt", "WMS", "Douane"] },
          { titre: "Comptabilité Gestion", image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&q=80", desc: "Compta générale, analytique", definition: "Comptabilité générale et analytique, fiscalité, audit.", debouches: ["Comptable", "Contrôleur gestion"], programme: ["Compta générale", "Analytique", "Fiscalité", "Audit"] },
        ],
        bts: [
          { titre: "GRH", image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80", desc: "Gestion ressources humaines", definition: "Gestion administrative et stratégique des RH.", debouches: ["Assistant RH", "Chargé RH"], programme: ["Recrutement", "Paie", "Droit travail"] },
          { titre: "Logistique Transport", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80", desc: "Supply chain, transport", definition: "Organisation et gestion flux logistiques.", debouches: ["Responsable logistique"], programme: ["Transport", "Entrepôt", "Douane"] },
          { titre: "Administration du Travail et de la Sécurité Sociale", image: "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=800&q=80", desc: "Droit social, inspection travail", definition: "Gestion droit du travail et sécurité sociale.", debouches: ["Inspecteur travail", "Gestionnaire SS"], programme: ["Droit social", "SS", "Inspection"] },
          { titre: "Chaudronnerie Internationale", image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80", desc: "Chaudronnerie industrielle", definition: "Fabrication structures métalliques industrielles.", debouches: ["Chaudronnier industriel"], programme: ["Lecture plan", "Soudure", "Métrologie"] },
          { titre: "Tourisme", image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80", desc: "Tourisme et hôtellerie", definition: "Gestion activités touristiques et hôtelières.", debouches: ["Agent tourisme", "Réceptionniste"], programme: ["Accueil", "Billetterie", "Tourisme"] },
          { titre: "Géomètre Topographe", image: "https://images.unsplash.com/photo-1541976590-713941681591?w=800&q=80", desc: "Topographie, levés terrain", definition: "Mesures et levés topographiques pour BTP.", debouches: ["Géomètre", "Topographe"], programme: ["Topographie", "SIG", "DAO"] },
          { titre: "Réseaux et Télécommunications", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80", desc: "Réseaux, télécoms", definition: "Installation et maintenance réseaux et télécoms.", debouches: ["Technicien réseau", "Technicien telecom"], programme: ["Réseaux", "Fibre optique", "Téléphonie"] },
          { titre: "Génie Civil", image: "https://images.unsplash.com/photo-1541976590-713941681591?w=800&q=80", desc: "BTP, construction", definition: "Conception et suivi travaux BTP.", debouches: ["Technicien génie civil"], programme: ["Béton armé", "DAO", "Chantier"] },
          { titre: "Comptabilité Gestion", image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&q=80", desc: "Compta et gestion", definition: "Gestion comptable et financière entreprise.", debouches: ["Comptable", "Gestionnaire"], programme: ["Compta", "Gestion", "Fiscalité"] },
          { titre: "Commerce Marketing", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80", desc: "Vente, marketing", definition: "Stratégie commerciale et marketing.", debouches: ["Commercial", "Chef produit"], programme: ["Marketing", "Vente", "Négociation"] },
          { titre: "Transit et Douane", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80", desc: "Transit international", definition: "Gestion opérations transit et douane.", debouches: ["Agent transit"], programme: ["Douane", "Logistique", "Incoterms"] },
          { titre: "Banque Finance", image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80", desc: "Banque, finance", definition: "Gestion opérations bancaires et financières.", debouches: ["Conseiller bancaire"], programme: ["Banque", "Finance", "Crédit"] },
          { titre: "Assurance", image: "https://images.unsplash.com/photo-1450101499163-c8848c66f0c8?w=800&q=80", desc: "Assurance IARD, vie", definition: "Gestion contrats et sinistres assurance.", debouches: ["Agent assurance"], programme: ["Assurance", "Sinistre", "Commercial"] },
          { titre: "Gestion Touristique et Hôtellerie", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80", desc: "Hôtellerie, restauration", definition: "Gestion hôtel et restaurant.", debouches: ["Manager hôtel"], programme: ["Hôtellerie", "Restauration", "Gestion"] },
          { titre: "Action Commerciale", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80", desc: "Force de vente", definition: "Animation et développement force de vente.", debouches: ["Commercial terrain"], programme: ["Vente", "Négociation", "CRM"] },
          { titre: "Mine, Géologie, Pétrole et Gaz", image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80", desc: "Exploitation minière", definition: "Exploration et exploitation ressources minières.", debouches: ["Technicien mine"], programme: ["Géologie", "Forage", "Sécurité"] },
          { titre: "Informatique de Gestion", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80", desc: "SI, gestion informatique", definition: "Gestion systèmes d’information entreprise.", debouches: ["Analyste SI"], programme: ["Bases données", "ERP", "Gestion projet"] },
        ],
        licence: [
          { titre: "Informatique de Gestion", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80", desc: "SI et gestion", definition: "Conception SI pour gestion entreprise.", debouches: ["Analyste SI", "Chef projet SI"], programme: ["SI", "ERP", "Gestion projet"] },
          { titre: "Gestion des Ressources Humaines", image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80", desc: "Management RH", definition: "Management stratégique RH.", debouches: ["RRH", "Chargé RH"], programme: ["GRH", "Droit social", "GPEC"] },
          { titre: "Délégué Médical", image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80", desc: "Visite médicale, pharma", definition: "Promotion produits pharmaceutiques.", debouches: ["Délégué médical"], programme: ["Pharma", "Visite médicale", "Vente"] },
          { titre: "Comptabilité Gestion", image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&q=80", desc: "Compta approfondie", definition: "Expertise comptable et gestion.", debouches: ["Comptable", "CAC"], programme: ["Compta", "Audit", "Fiscalité"] },
          { titre: "Négoce et Vente du Bois", image: "https://images.unsplash.com/photo-1441986300917-64615d78d53e?w=800&q=80", desc: "Commerce bois", definition: "Commerce et négoce filière bois.", debouches: ["Commercial bois"], programme: ["Filière bois", "Négoce", "Export"] },
          { titre: "Énergies Renouvelables", image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80", desc: "Solaire, éolien", definition: "Installation systèmes énergies renouvelables.", debouches: ["Technicien ENR"], programme: ["Solaire", "Éolien", "Maintenance"] },
          { titre: "Support Action Managériale SAM", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80", desc: "Assistanat direction", definition: "Support management et direction.", debouches: ["Assistant manager"], programme: ["Management", "Bureautique", "Gestion projet"] },
          { titre: "Logistique Internationale", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80", desc: "Logistique import/export", definition: "Gestion logistique internationale.", debouches: ["Logisticien international"], programme: ["Transport intl", "Douane", "Supply chain"] },
          { titre: "Développeur Web & Mobile", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80", desc: "React, Node.js, Flutter", definition: "Développement applications web et mobiles.", debouches: ["Dev Web", "Dev Mobile"], programme: ["React", "Node.js", "Flutter", "API REST"] },
          { titre: "Réseaux et Télécommunications", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80", desc: "Réseaux avancés", definition: "Administration réseaux et télécoms.", debouches: ["Admin réseau"], programme: ["Réseaux", "Sécurité", "Cloud"] },
          { titre: "Génie Civil", image: "https://images.unsplash.com/photo-1541976590-713941681591?w=800&q=80", desc: "BTP avancé", definition: "Conception ouvrages génie civil.", debouches: ["Ingénieur travaux"], programme: ["Béton armé", "Charpente", "DAO"] },
          { titre: "Management des Unités Commerciales", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80", desc: "Management commerce", definition: "Gestion point de vente et équipe commerciale.", debouches: ["Manager UC"], programme: ["Management", "Commerce", "Gestion"] },
          { titre: "Conception-Réalisation Chaudronnerie", image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80", desc: "CAO chaudronnerie", definition: "Conception et réalisation chaudronnerie.", debouches: ["Dessinateur chaudronnerie"], programme: ["CAO", "DAO", "Soudure"] },
          { titre: "Cybersécurité", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80", desc: "Sécurité SI", definition: "Protection systèmes d’information.", debouches: ["Analyste SOC", "Pentester"], programme: ["Sécurité", "Ethical Hacking", "Forensic"] },
          { titre: "Énergie et Environnement", image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80", desc: "Énergie, environnement", definition: "Gestion énergie et environnement.", debouches: ["Chargé énergie"], programme: ["Énergie", "Environnement", "ISO 14001"] },
          { titre: "Multimédia et Internet", image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80", desc: "Web, multimédia", definition: "Création contenus multimédia web.", debouches: ["Webdesigner", "Motion designer"], programme: ["Web", "Vidéo", "Graphisme"] },
          { titre: "Technicien Construction Civile", image: "https://images.unsplash.com/photo-1541976590-713941681591?w=800&q=80", desc: "BTP construction", definition: "Suivi chantier construction civile.", debouches: ["Conducteur travaux"], programme: ["BTP", "Chantier", "Sécurité"] },
          { titre: "Logistique Hospitalière", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80", desc: "Logistique santé", definition: "Gestion logistique établissements santé.", debouches: ["Logisticien hôpital"], programme: ["Logistique santé", "Stock", "Achats"] },
          { titre: "QHSE", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80", desc: "Qualité, HSE", definition: "Qualité, hygiène, sécurité, environnement.", debouches: ["Animateur QHSE"], programme: ["ISO 9001", "ISO 14001", "ISO 45001"] },
          { titre: "Assurance Banque", image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80", desc: "Banque assurance", definition: "Gestion produits bancaires et assurance.", debouches: ["Conseiller banque assurance"], programme: ["Banque", "Assurance", "Finance"] },
          { titre: "Action Commerciale", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80", desc: "Commercial terrain", definition: "Développement commercial terrain.", debouches: ["Commercial"], programme: ["Vente", "Négociation", "Prospection"] },
        ]
      }
    },
    cameroun: {
      nom: "CAMEROUN",
      drapeau: "🇨🇲",
      ville: "Yaoundé",
      niveaux: {
        bts: [
          { titre: "Gestion de Projets", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80", desc: "Agile, Scrum, MS Project", definition: "Pilotage projets A à Z.", debouches: ["Chef projet", "Scrum Master"], programme: ["Agile", "MS Project", "Budget"] },
          { titre: "Production Animale", image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&q=80", desc: "Élevage", definition: "Production et gestion élevage.", debouches: ["Technicien élevage"], programme: ["Élevage", "Alimentation", "Santé animale"] },
          { titre: "Production Végétale", image: "https://images.unsplash.com/photo-1464226184884-fa280b87c62b?w=800&q=80", desc: "Agriculture", definition: "Production végétale et agronomie.", debouches: ["Technicien agricole"], programme: ["Agronomie", "Culture", "Irrigation"] },
          { titre: "Conseiller Agricole", image: "https://images.unsplash.com/photo-1464226184884-fa280b87c62b?w=800&q=80", desc: "Conseil agricole", definition: "Conseil et accompagnement agriculteurs.", debouches: ["Conseiller agricole"], programme: ["Agronomie", "Conseil", "Gestion"] },
          { titre: "Technique Commerciale et Agricole", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80", desc: "Commerce agricole", definition: "Commercialisation produits agricoles.", debouches: ["Commercial agricole"], programme: ["Commerce", "Agriculture", "Marketing"] },
          { titre: "Droit Foncier et Domanial", image: "https://images.unsplash.com/photo-1589391886635-98b796ee5a84?w=800&q=80", desc: "Droit foncier", definition: "Gestion foncier et domaine.", debouches: ["Juriste foncier"], programme: ["Droit foncier", "Cadastre", "Gestion"] },
          { titre: "Agroéquipement", image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80", desc: "Machinisme agricole", definition: "Maintenance matériel agricole.", debouches: ["Technicien agroéquipement"], programme: ["Mécanique", "Hydraulique", "Maintenance"] },
          { titre: "Techniques Pharmaceutiques", image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80", desc: "Pharmacie", definition: "Production et contrôle médicaments.", debouches: ["Technicien pharma"], programme: ["Production", "Contrôle qualité", "BPF"] },
          { titre: "Exploitation Transport Aérien", image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80", desc: "Transport aérien", definition: "Exploitation et gestion transport aérien.", debouches: ["Agent aéroportuaire"], programme: ["Aviation", "Logistique", "Sécurité"] },
          { titre: "Administration Scolaire", image: "https://images.unsplash.com/photo-1503676382389-4809596d5290?w=800&q=80", desc: "Gestion école", definition: "Administration établissements scolaires.", debouches: ["Gestionnaire école"], programme: ["Administration", "Gestion", "Pédagogie"] },
          { titre: "Gestion Administration Ports", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80", desc: "Gestion portuaire", definition: "Gestion opérations portuaires.", debouches: ["Agent portuaire"], programme: ["Port", "Logistique", "Douane"] },
          { titre: "Hydraulique", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80", desc: "Hydraulique", definition: "Gestion eau et hydraulique.", debouches: ["Technicien hydraulique"], programme: ["Hydraulique", "Réseau eau", "Station"] },
          { titre: "Traitement des Eaux", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80", desc: "Traitement eau", definition: "Traitement et potabilisation eau.", debouches: ["Technicien traitement eau"], programme: ["Traitement", "Chimie", "Analyse"] },
        ],
        dut: [
          { titre: "Génie Ferroviaire", image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&q=80", desc: "Ferroviaire", definition: "Maintenance et exploitation ferroviaire.", debouches: ["Technicien ferroviaire"], programme: ["Ferroviaire", "Signalisation", "Maintenance"] },
          { titre: "Génie des Mines", image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80", desc: "Mines", definition: "Exploitation minière.", debouches: ["Technicien mines"], programme: ["Géologie", "Exploitation", "Sécurité"] },
          { titre: "Pétrole et Gaz", image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80", desc: "Pétrole gaz", definition: "Exploitation pétrole et gaz.", debouches: ["Technicien pétrole"], programme: ["Forage", "Production", "Sécurité"] },
          { titre: "QHSE Alimentaire", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80", desc: "QHSE agroalimentaire", definition: "Qualité hygiène sécurité alimentaire.", debouches: ["Responsable QHSE"], programme: ["HACCP", "ISO 22000", "Audit"] },
          { titre: "Maintenance Équipements Biomédicaux", image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80", desc: "Biomédical", definition: "Maintenance équipements médicaux.", debouches: ["Technicien biomédical"], programme: ["Biomédical", "Maintenance", "Métrologie"] },
          { titre: "Carrières Juridiques", image: "https://images.unsplash.com/photo-1589391886635-98b796ee5a84?w=800&q=80", desc: "Droit", definition: "Carrières juridiques.", debouches: ["Assistant juridique"], programme: ["Droit civil", "Procédure", "Rédaction"] },
          { titre: "Entreprenariat", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80", desc: "Création entreprise", definition: "Création et gestion entreprise.", debouches: ["Entrepreneur"], programme: ["Business plan", "Gestion", "Finance"] },
          { titre: "GRH", image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80", desc: "RH", definition: "Gestion ressources humaines.", debouches: ["Assistant RH"], programme: ["RH", "Paie", "Droit travail"] },
          { titre: "Gestion Logistique Transport", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80", desc: "Logistique", definition: "Gestion logistique et transport.", debouches: ["Logisticien"], programme: ["Logistique", "Transport", "Stock"] },
          { titre: "Gestion Appliquée PME", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80", desc: "Gestion PME", definition: "Gestion PME-PMI.", debouches: ["Gestionnaire PME"], programme: ["Gestion", "Compta", "Marketing"] },
          { titre: "Gestion Comptable Financière", image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&q=80", desc: "Compta finance", definition: "Gestion comptable et financière.", debouches: ["Comptable"], programme: ["Compta", "Finance", "Fiscalité"] },
          { titre: "Banque Finance", image: "https://images.unsplash.com/photo-1560472354-2354-b33ff0c44a43?w=800&q=80", desc: "Banque", definition: "Gestion bancaire.", debouches: ["Conseiller bancaire"], programme: ["Banque", "Crédit", "Finance"] },
        ],
        licence: [
          { titre: "Techniques Pharmaceutiques", image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80", desc: "Pharma", definition: "Production pharmaceutique.", debouches: ["Technicien pharma"], programme: ["Production", "Contrôle qualité"] },
          { titre: "Sciences Technologies Alimentaires", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80", desc: "Agroalimentaire", definition: "Sciences et technologies alimentaires.", debouches: ["Ingénieur agro"], programme: ["Agroalimentaire", "Qualité"] },
          { titre: "Production Agricole Biotechnologies", image: "https://images.unsplash.com/photo-1464226184884-fa280b87c62b?w=800&q=80", desc: "Biotech agricole", definition: "Production agricole et biotechnologies.", debouches: ["Ingénieur agronome"], programme: ["Biotech", "Agronomie", "Génétique"] },
          { titre: "Gestion Expertise Immobilière", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80", desc: "Immobilier", definition: "Gestion et expertise immobilière.", debouches: ["Gestionnaire immobilier"], programme: ["Immobilier", "Expertise", "Gestion"] },
          { titre: "Management Produits Pétroliers", image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80", desc: "Pétrole", definition: "Management produits pétroliers.", debouches: ["Manager pétrole"], programme: ["Pétrole", "Logistique", "Commerce"] },
          { titre: "Gestion Opérations Maritimes Portuaires", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80", desc: "Maritime portuaire", definition: "Gestion opérations maritimes et portuaires.", debouches: ["Agent maritime"], programme: ["Maritime", "Port", "Logistique"] },
          { titre: "Gestion Patrimoine Métiers Bourse", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80", desc: "Bourse finance", definition: "Gestion patrimoine et métiers de la bourse.", debouches: ["Gestionnaire patrimoine"], programme: ["Bourse", "Finance", "Patrimoine"] },
          { titre: "Finances Publiques", image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&q=80", desc: "Finance publique", definition: "Gestion finances publiques.", debouches: ["Gestionnaire finances publiques"], programme: ["Finance publique", "Budget", "Compta publique"] },
          { titre: "Conseil Juridique Fiscal", image: "https://images.unsplash.com/photo-1589391886635-98b796ee5a84?w=800&q=80", desc: "Conseil juridique", definition: "Conseil juridique et fiscal.", debouches: ["Conseiller juridique"], programme: ["Droit fiscal", "Conseil", "Procédure"] },
          { titre: "Management des Projets", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80", desc: "Gestion projet", definition: "Management de projets.", debouches: ["Chef projet"], programme: ["Gestion projet", "Agile", "MS Project"] },
          { titre: "Management Logistique Transport", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80", desc: "Logistique transport", definition: "Management logistique et transport.", debouches: ["Manager logistique"], programme: ["Logistique", "Transport", "Supply chain"] },
          { titre: "Gestion Établissements Santé", image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80", desc: "Gestion santé", definition: "Gestion établissements de santé.", debouches: ["Gestionnaire santé"], programme: ["Gestion santé", "Hôpital", "Management"] },
          { titre: "Sûreté Sécurité Installations Portuaires", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80", desc: "Sécurité portuaire", definition: "Sûreté et sécurité portuaire.", debouches: ["Agent sécurité portuaire"], programme: ["Sûreté", "Sécurité", "Port"] },
          { titre: "Gestion Établissements Hôteliers Restauration", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80", desc: "Hôtellerie restauration", definition: "Gestion hôtellerie et restauration.", debouches: ["Manager hôtel"], programme: ["Hôtellerie", "Restauration", "Gestion"] },
        ],
        bachelor: [
          { titre: "Transport Logistique", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80", desc: "Transport logistique", definition: "Transport et logistique.", debouches: ["Responsable transport"], programme: ["Transport", "Logistique", "Douane"] },
          { titre: "Assurance", image: "https://images.unsplash.com/photo-1450101499163-c8848c66f0c8?w=800&q=80", desc: "Assurance", definition: "Assurance et gestion des risques.", debouches: ["Agent assurance"], programme: ["Assurance", "Risque", "Commercial"] },
          { titre: "Comptabilité Contrôle Audit", image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&q=80", desc: "Compta audit", definition: "Comptabilité, contrôle et audit.", debouches: ["Auditeur"], programme: ["Compta", "Audit", "Contrôle"] },
          { titre: "Finances Publiques", image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&q=80", desc: "Finance publique", definition: "Finances publiques.", debouches: ["Gestionnaire finances publiques"], programme: ["Finance publique", "Budget"] },
          { titre: "E-Commerce Digital Marketing", image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&q=80", desc: "E-commerce marketing", definition: "E-commerce et marketing digital.", debouches: ["Responsable e-commerce"], programme: ["E-commerce", "Marketing digital", "SEO"] },
        ],
        master: [
          { titre: "Techniques Pharmaceutiques", image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80", desc: "Pharma avancé", definition: "Master techniques pharmaceutiques.", debouches: ["Pharmacien industriel"], programme: ["Pharma", "R&D", "Réglementation"] },
          { titre: "Sciences Technologies Alimentaires", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80", desc: "Agroalimentaire avancé", definition: "Master sciences et technologies alimentaires.", debouches: ["Ingénieur R&D agro"], programme: ["Agroalimentaire", "R&D", "Qualité"] },
          { titre: "Production Agricole Biotechnologies", image: "https://images.unsplash.com/photo-1464226184884-fa280b87c62b?w=800&q=80", desc: "Biotech agricole", definition: "Master production agricole et biotechnologies.", debouches: ["Chercheur agronome"], programme: ["Biotech", "Agronomie", "Recherche"] },
          { titre: "Gestion Expertise Immobilière", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80", desc: "Immobilier avancé", definition: "Master gestion et expertise immobilière.", debouches: ["Expert immobilier"], programme: ["Immobilier", "Expertise", "Gestion"] },
          { titre: "Management Produits Pétroliers", image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80", desc: "Pétrole avancé", definition: "Master management produits pétroliers.", debouches: ["Manager pétrole gaz"], programme: ["Pétrole", "Management", "Commerce"] },
          { titre: "Gestion Opérations Maritimes Portuaires", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80", desc: "Maritime avancé", definition: "Master gestion opérations maritimes portuaires.", debouches: ["Directeur portuaire"], programme: ["Maritime", "Port", "Logistique"] },
          { titre: "Gestion Patrimoine Métiers Bourse", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80", desc: "Bourse avancé", definition: "Master gestion patrimoine et métiers de la bourse.", debouches: ["Gestionnaire patrimoine"], programme: ["Bourse", "Finance", "Patrimoine"] },
          { titre: "Finances Publiques", image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&q=80", desc: "Finance publique avancé", definition: "Master finances publiques.", debouches: ["Inspecteur finances"], programme: ["Finance publique", "Budget", "Contrôle"] },
          { titre: "Conseil Juridique Fiscal", image: "https://images.unsplash.com/photo-1589391886635-98b796ee5a84?w=800&q=80", desc: "Conseil juridique avancé", definition: "Master conseil juridique et fiscal.", debouches: ["Juriste fiscaliste"], programme: ["Droit fiscal", "Conseil", "Contentieux"] },
          { titre: "Management des Projets", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80", desc: "Gestion projet avancé", definition: "Master management des projets.", debouches: ["Chef projet senior"], programme: ["Gestion projet", "PMP", "Agile"] },
          { titre: "Management Logistique Transport", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80", desc: "Logistique avancé", definition: "Master management logistique transport.", debouches: ["Directeur logistique"], programme: ["Logistique", "Supply chain", "Transport"] },
          { titre: "Gestion Établissements Santé", image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80", desc: "Gestion santé avancé", definition: "Master gestion établissements de santé.", debouches: ["Directeur hôpital"], programme: ["Gestion santé", "Hôpital", "Management"] },
          { titre: "Gestion Hôtelière Restauration", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80", desc: "Hôtellerie avancé", definition: "Master gestion hôtelière et restauration.", debouches: ["Directeur hôtel"], programme: ["Hôtellerie", "Restauration", "Management"] },
        ],
        mba: [
          { titre: "Banque Finance Assurance", image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80", desc: "MBA Banque finance assurance", definition: "MBA banque, finance, assurance.", debouches: ["Directeur banque"], programme: ["Banque", "Finance", "Assurance", "Management"] },
          { titre: "Gestion Entreprises Organisations", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80", desc: "MBA Management", definition: "MBA gestion des entreprises et organisations.", debouches: ["Directeur général"], programme: ["Stratégie", "Management", "Finance"] },
          { titre: "Gestion Ressources Humaines", image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80", desc: "MBA RH", definition: "MBA gestion des ressources humaines.", debouches: ["DRH"], programme: ["GRH", "Stratégie RH", "Droit social"] },
        ]
      }
    },
    europe: {
      nom: "EUROPE",
      drapeau: "🇫🇷",
      ville: "France",
      niveaux: {
        technicien: [
          { titre: "Action Commerciale Marketing", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80", desc: "Commerce marketing", definition: "Technicien action commerciale et marketing.", debouches: ["Commercial", "Assistant marketing"], programme: ["Vente", "Marketing", "CRM"] },
          { titre: "Gestion Administrative Comptable", image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&q=80", desc: "Gestion admin compta", definition: "Technicien gestion administrative et comptable.", debouches: ["Assistant gestion"], programme: ["Gestion", "Compta", "Bureautique"] },
        ],
        technicien_specialise: [
          { titre: "Commerce International", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80", desc: "Commerce international", definition: "Technicien spécialisé commerce international.", debouches: ["Assistant export"], programme: ["Commerce intl", "Douane", "Logistique"] },
          { titre: "Gestion des Entreprises", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80", desc: "Gestion entreprise", definition: "Technicien spécialisé gestion des entreprises.", debouches: ["Gestionnaire PME"], programme: ["Gestion", "Management", "Compta"] },
          { titre: "Développement Multimédia", image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80", desc: "Multimédia", definition: "Technicien spécialisé développement multimédia.", debouches: ["Développeur multimédia"], programme: ["Web", "Graphisme", "Vidéo"] },
          { titre: "Développement Informatique", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80", desc: "Dev informatique", definition: "Technicien spécialisé développement informatique.", debouches: ["Développeur"], programme: ["Programmation", "Bases données", "Web"] },
        ],
        prepa: [
          { titre: "Prépa Scientifique Ingénieur", image: "https://images.unsplash.com/photo-1503676382389-4809596d5290?w=800&q=80", desc: "Prépa scientifique", definition: "Classe préparatoire scientifique pour écoles d'ingénieurs.", debouches: ["École ingénieur"], programme: ["Maths", "Physique", "Chimie"] },
          { titre: "Prépa Business School", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80", desc: "Prépa commerce", definition: "Classe préparatoire pour écoles de commerce.", debouches: ["École commerce"], programme: ["Maths", "Économie", "Culture générale"] },
        ],
        licence: [
          { titre: "Techniques Son Image", image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&q=80", desc: "Son image", definition: "Licence techniques du son et de l'image.", debouches: ["Technicien son"], programme: ["Son", "Image", "Montage"] },
          { titre: "Montage Audiovisuel Réalisation Cinématographique", image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&q=80", desc: "Audiovisuel cinéma", definition: "Licence montage audiovisuel et réalisation.", debouches: ["Monteur vidéo", "Réalisateur"], programme: ["Montage", "Réalisation", "Scénario"] },
          { titre: "Énergies Renouvelables", image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80", desc: "Énergies renouvelables", definition: "Licence énergies renouvelables.", debouches: ["Technicien ENR"], programme: ["Solaire", "Éolien", "Maintenance"] },
          { titre: "Comptabilité Contrôle Gestion Finance", image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&q=80", desc: "Compta finance", definition: "Licence comptabilité, contrôle de gestion et finance.", debouches: ["Contrôleur gestion"], programme: ["Compta", "Contrôle", "Finance"] },
          { titre: "Management Gestion Organisations", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80", desc: "Management orga", definition: "Licence management et gestion des organisations.", debouches: ["Manager"], programme: ["Management", "Stratégie", "RH"] },
          { titre: "Logistique Transport", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80", desc: "Logistique transport", definition: "Licence logistique et transport.", debouches: ["Responsable logistique"], programme: ["Logistique", "Transport", "Supply chain"] },
          { titre: "E-Commerce Marketing Numérique", image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&q=80", desc: "E-commerce digital", definition: "Licence e-commerce et marketing numérique.", debouches: ["Responsable e-commerce"], programme: ["E-commerce", "Digital", "SEO"] },
          { titre: "Développement Avancé Applications Web", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80", desc: "Dev web avancé", definition: "Licence développement avancé d'applications web.", debouches: ["Développeur fullstack"], programme: ["React", "Node.js", "API"] },
          { titre: "Conception Fabrication Produits Industriels", image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80", desc: "Conception industrielle", definition: "Licence conception et fabrication produits industriels.", debouches: ["Ingénieur conception"], programme: ["CAO", "Fabrication", "Gestion prod"] },
          { titre: "QHSE", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80", desc: "Qualité HSE", definition: "Licence QHSE.", debouches: ["Animateur QHSE"], programme: ["ISO 9001", "ISO 14001", "ISO 45001"] },
        ],bachelor: [
          { titre: "Relations Publiques Communication", image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80", desc: "RP communication", definition: "Bachelor relations publiques et communication.", debouches: ["Chargé RP"], programme: ["Communication", "RP", "Événementiel"] },
          { titre: "Banque Finance Assurance", image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80", desc: "BFA", definition: "Bachelor banque, finance, assurance.", debouches: ["Conseiller bancaire"], programme: ["Banque", "Finance", "Assurance"] },
          { titre: "Assistance Juridique", image: "https://images.unsplash.com/photo-1589391886635-98b796ee5a84?w=800&q=80", desc: "Assistance juridique", definition: "Bachelor assistance juridique.", debouches: ["Assistant juridique"], programme: ["Droit", "Procédure", "Rédaction"] },
          { titre: "Professions Notariales", image: "https://images.unsplash.com/photo-1589391886635-98b796ee5a84?w=800&q=80", desc: "Notariat", definition: "Bachelor professions notariales.", debouches: ["Clerc notaire"], programme: ["Droit notarial", "Immobilier", "Procédure"] },
          { titre: "Audit Contrôle Gestion", image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&q=80", desc: "Audit gestion", definition: "Bachelor audit et contrôle de gestion.", debouches: ["Auditeur"], programme: ["Audit", "Contrôle", "Compta"] },
          { titre: "Marketing Stratégique E-Commerce", image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&q=80", desc: "Marketing e-commerce", definition: "Bachelor marketing stratégique et e-commerce.", debouches: ["Responsable marketing"], programme: ["Marketing", "E-commerce", "Stratégie"] },
          { titre: "Métiers du Luxe", image: "https://images.unsplash.com/photo-1441986300917-64615d78d53e?w=800&q=80", desc: "Luxe", definition: "Bachelor métiers du luxe.", debouches: ["Responsable boutique luxe"], programme: ["Luxe", "Vente", "Marketing"] },
          { titre: "Investissement Immobilier", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80", desc: "Immobilier investissement", definition: "Bachelor investissement immobilier.", debouches: ["Investisseur immobilier"], programme: ["Immobilier", "Finance", "Gestion"] },
          { titre: "Gestion Ressources Humaines", image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80", desc: "GRH", definition: "Bachelor gestion ressources humaines.", debouches: ["Chargé RH"], programme: ["GRH", "Recrutement", "Droit social"] },
          { titre: "Développeur Informatique", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80", desc: "Dev informatique", definition: "Bachelor développeur informatique.", debouches: ["Développeur"], programme: ["Programmation", "Bases données", "Web"] },
          { titre: "Finance", image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80", desc: "Finance", definition: "Bachelor finance.", debouches: ["Analyste financier"], programme: ["Finance", "Marchés", "Gestion"] },
          { titre: "Transport Logistique", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80", desc: "Transport logistique", definition: "Bachelor transport logistique.", debouches: ["Responsable transport"], programme: ["Transport", "Logistique", "Douane"] },
          { titre: "Management Gestion PME", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80", desc: "Management PME", definition: "Bachelor management et gestion PME.", debouches: ["Manager PME"], programme: ["Management", "Gestion", "Stratégie"] },
          { titre: "E-Business Commerce International", image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&q=80", desc: "E-business international", definition: "Bachelor e-business et commerce international.", debouches: ["Responsable e-business"], programme: ["E-business", "Commerce intl", "Digital"] },
          { titre: "Gestion Structures Sanitaires Sociales", image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80", desc: "Gestion santé social", definition: "Bachelor gestion structures sanitaires et sociales.", debouches: ["Gestionnaire santé"], programme: ["Santé", "Social", "Gestion"] },
          { titre: "Marketing Digital", image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&q=80", desc: "Marketing digital", definition: "Bachelor marketing digital.", debouches: ["Digital marketer"], programme: ["Digital", "SEO", "SEA", "Social media"] },
          { titre: "Génie Civil", image: "https://images.unsplash.com/photo-1541976590-713941681591?w=800&q=80", desc: "Génie civil", definition: "Bachelor génie civil.", debouches: ["Conducteur travaux"], programme: ["BTP", "DAO", "Chantier"] },
          { titre: "Informatique Réseaux Sécurité", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80", desc: "Info réseaux sécurité", definition: "Bachelor informatique réseaux et sécurité.", debouches: ["Admin réseau"], programme: ["Réseaux", "Sécurité", "Systèmes"] },
          { titre: "Cybersécurité Ingénierie IP", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80", desc: "Cybersécurité IP", definition: "Bachelor cybersécurité et ingénierie IP.", debouches: ["Ingénieur cybersécurité"], programme: ["Cybersécurité", "Réseaux", "Forensic"] },
          { titre: "Cloud Computing", image: "https://images.unsplash.com/photo-1544197150-b99a580bbe95?w=800&q=80", desc: "Cloud", definition: "Bachelor cloud computing.", debouches: ["Cloud engineer"], programme: ["AWS", "Azure", "DevOps"] },
          { titre: "Développeur Web Mobile Full Stack", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80", desc: "Dev full stack", definition: "Bachelor développeur web mobile full stack.", debouches: ["Développeur fullstack"], programme: ["React", "Node.js", "Mobile"] },
          { titre: "Développement JAVA J2EE", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80", desc: "Java J2EE", definition: "Bachelor développement JAVA/J2EE.", debouches: ["Développeur Java"], programme: ["Java", "J2EE", "Spring"] },
          { titre: "Développement Applications Mobiles", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80", desc: "Dev mobile", definition: "Bachelor développement applications mobiles.", debouches: ["Développeur mobile"], programme: ["Flutter", "React Native", "iOS", "Android"] },
          { titre: "Base Données Technologies Web", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80", desc: "BDD web", definition: "Bachelor base de données et technologies web.", debouches: ["DBA", "Développeur web"], programme: ["SQL", "NoSQL", "Web"] },
          { titre: "Multimédia Technologie Web", image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80", desc: "Multimédia web", definition: "Bachelor multimédia et technologie web.", debouches: ["Webdesigner"], programme: ["Web", "Multimédia", "Graphisme"] },
        ],
        master: [
          { titre: "Finance option Gestion Actifs", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80", desc: "Finance gestion actifs", definition: "Master finance option gestion d'actifs.", debouches: ["Gestionnaire actif"], programme: ["Finance", "Gestion actif", "Marchés"] },
          { titre: "Management RH", image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80", desc: "Management RH", definition: "Master management RH.", debouches: ["DRH"], programme: ["GRH", "Stratégie RH", "Droit social"] },
          { titre: "Commerce International", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80", desc: "Commerce intl", definition: "Master commerce international.", debouches: ["Responsable export"], programme: ["Commerce intl", "Douane", "Logistique"] },
          { titre: "Stratégie d'Entreprise", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80", desc: "Stratégie", definition: "Master stratégie d'entreprise.", debouches: ["Consultant stratégie"], programme: ["Stratégie", "Management", "Finance"] },
          { titre: "Communication", image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80", desc: "Communication", definition: "Master communication.", debouches: ["Responsable communication"], programme: ["Communication", "RP", "Digital"] },
          { titre: "Stratégie Financière", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80", desc: "Stratégie financière", definition: "Master stratégie financière.", debouches: ["CFO"], programme: ["Finance", "Stratégie", "Contrôle"] },
          { titre: "Marketing", image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&q=80", desc: "Marketing", definition: "Master marketing.", debouches: ["Directeur marketing"], programme: ["Marketing", "Digital", "Études marché"] },
          { titre: "Droit Notarial Immobilier", image: "https://images.unsplash.com/photo-1589391886635-98b796ee5a84?w=800&q=80", desc: "Droit notarial", definition: "Master droit notarial et immobilier.", debouches: ["Notaire"], programme: ["Droit notarial", "Immobilier", "Succession"] },
          { titre: "Santé Publique", image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80", desc: "Santé publique", definition: "Master santé publique.", debouches: ["Responsable santé publique"], programme: ["Santé publique", "Épidémiologie", "Gestion"] },
          { titre: "Transport Logistique", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80", desc: "Transport logistique", definition: "Master transport logistique.", debouches: ["Directeur logistique"], programme: ["Logistique", "Transport", "Supply chain"] },
          { titre: "IA Recherche Clinique", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80", desc: "IA santé", definition: "Master IA en recherche clinique.", debouches: ["Data scientist santé"], programme: ["IA", "Data science", "Recherche clinique"] },
          { titre: "Marketing Développement Commercial", image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&q=80", desc: "Marketing commercial", definition: "Master marketing et développement commercial.", debouches: ["Directeur commercial"], programme: ["Marketing", "Vente", "Stratégie"] },
          { titre: "Management QHSE", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80", desc: "Management QHSE", definition: "Master management QHSE.", debouches: ["Responsable QHSE"], programme: ["QHSE", "ISO", "Audit"] },
          { titre: "Ingénierie Systèmes Réseaux Sécurité", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80", desc: "Ingénierie réseaux", definition: "Master ingénierie systèmes réseaux et sécurité.", debouches: ["Ingénieur réseaux"], programme: ["Réseaux", "Sécurité", "Systèmes"] },
          { titre: "Ingénierie Développement Applications", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80", desc: "Ingénierie dev", definition: "Master ingénierie et développement d'applications.", debouches: ["Ingénieur logiciel"], programme: ["Développement", "Architecture", "DevOps"] },
        ],
        mba: [
          { titre: "Santé Publique", image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80", desc: "MBA santé publique", definition: "MBA santé publique.", debouches: ["Directeur santé publique"], programme: ["Santé publique", "Management", "Politique santé"] },
          { titre: "Transport Logistique International", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80", desc: "MBA logistique intl", definition: "MBA transport logistique international.", debouches: ["Directeur logistique intl"], programme: ["Logistique intl", "Supply chain", "Transport"] },
          { titre: "Gestion Ressources Humaines", image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80", desc: "MBA RH", definition: "MBA gestion des ressources humaines.", debouches: ["DRH"], programme: ["GRH", "Stratégie RH", "Leadership"] },
          { titre: "Management Stratégies Financières", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80", desc: "MBA finance", definition: "MBA management et stratégies financières.", debouches: ["CFO"], programme: ["Finance", "Stratégie", "Management"] },
          { titre: "Management Stratégie d'Entreprise", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80", desc: "MBA stratégie", definition: "MBA management et stratégie d'entreprise.", debouches: ["DG"], programme: ["Stratégie", "Management", "Innovation"] },
          { titre: "Marketing Développement Commercial", image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&q=80", desc: "MBAMarketing commercial", definition: "MBA marketing et développement commercial.", debouches: ["Directeur commercial"], programme: ["Marketing", "Vente", "Stratégie"] },
        ],
        dba: [
          { titre: "Gestion Ressources Humaines", image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80", desc: "DBA GRH", definition: "DBA gestion des ressources humaines.", debouches: ["DRH Groupe"], programme: ["GRH", "Leadership", "Stratégie"] },
          { titre: "Gestion Stratégique", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80", desc: "DBA stratégie", definition: "DBA gestion stratégique.", debouches: ["Directeur stratégie"], programme: ["Stratégie", "Management", "Finance"] },
          { titre: "Leadership Management", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80", desc: "DBA leadership", definition: "DBA leadership et management.", debouches: ["DG"], programme: ["Leadership", "Management", "Organisation"] },
          { titre: "Marketing Stratégique", image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&q=80", desc: "DBA marketing", definition: "DBA marketing stratégique.", debouches: ["Directeur marketing"], programme: ["Marketing", "Stratégie", "Innovation"] },
          { titre: "Finance d'Entreprise", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80", desc: "DBA finance", definition: "DBA finance d'entreprise.", debouches: ["CFO"], programme: ["Finance", "Corporate finance", "M&A"] },
          { titre: "Innovation Technologie", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80", desc: "DBA innovation", definition: "DBA innovation et technologie.", debouches: ["CTO"], programme: ["Innovation", "Tech", "R&D"] },
          { titre: "Entrepreneuriat Innovation", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80", desc: "DBA entrepreneuriat", definition: "DBA entrepreneuriat et innovation.", debouches: ["Entrepreneur"], programme: ["Entrepreneuriat", "Innovation", "Business model"] },
          { titre: "Supply Chain Opérations", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80", desc: "DBA supply chain", definition: "DBA supply chain et gestion des opérations.", debouches: ["Directeur supply chain"], programme: ["Supply chain", "Logistique", "Opérations"] },
          { titre: "Comportement Organisationnel", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80", desc: "DBA comportement orga", definition: "DBA comportement organisationnel.", debouches: ["Consultant RH"], programme: ["Comportement orga", "Psychologie", "Management"] },
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
      {/* HERO SLIDER IMAGES */}
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

        <div className="absolute inset-0 flex-col justify-center items-center text-white text-center z-10 px-4 pt-32">
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
                      : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'
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
                className={`px-3 py-1.5 rounded-md text-xs font-black transition uppercase ${
                  niveauActif === 'all'? 'bg-orange-500 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'
                }`}
              >
                Tous
              </button>
              {niveaux.map((niv) => (
                <button
                  key={niv}
                  onClick={() => setNiveauActif(niv)}
                  className={`px-3 py-1.5 rounded-md text-xs font-black transition uppercase ${
                    niveauActif === niv? 'bg-orange-500 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'
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
                  className="group cursor-pointer relative rounded-xl overflow-hidden bg-white border-gray-200 hover:border-blue-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
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
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white border-gray-300 rounded-2xl shadow-2xl"
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
                      <div key={i} className="flex items-start gap-2 bg-gray-50 border-gray-200 p-2.5 rounded-lg">
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
                      <div key={i} className="flex items-start gap-2 bg-gray-50 border-gray-200 p-2.5 rounded-lg">
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