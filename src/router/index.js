import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

import AuthLayout from '../layouts/AuthLayout.vue'
import SocialLayout from '../layouts/SocialLayout.vue'

// Public Pages
const Accueil = () => import('../pages/public/Accueil.vue')
const Annonces = () => import('../pages/public/Annonces.vue')
const DetailAnnonce = () => import('../pages/public/DetailAnnonce.vue')
const ProgrammerVisite = () => import('../pages/public/ProgrammerVisite.vue')
const PolitiqueConfidentialite = () => import('../pages/public/PolitiqueConfidentialite.vue')
const Notifications = () => import('../pages/public/Notifications.vue')
const Assistance = () => import('../pages/public/Assistance.vue')
const Payment = () => import('../pages/public/Payment.vue')

// Auth Pages
const Connexion = () => import('../pages/auth/Connexion.vue')
const Inscription = () => import('../pages/auth/Inscription.vue')
const MotDePasseOublie = () => import('../pages/auth/MotDePasseOublie.vue')

// Admin Pages
const AdminDashboard = () => import('../pages/admin/Dashboard.vue')
const AdminUtilisateurs = () => import('../pages/admin/Utilisateurs.vue')
const AdminBiensAnnonces = () => import('../pages/admin/BiensAnnonces.vue')
const AdminFinances = () => import('../pages/admin/Finances.vue')
const AdminServices = () => import('../pages/admin/Services.vue')
const AdminSupervisionLocation = () => import('../pages/admin/SupervisionLocation.vue')
const AdminDemandesPublication = () => import('../pages/admin/DemandesPublication.vue')

// Agent Pages
const AgentDashboard = () => import('../pages/agent/Dashboard.vue')
const AgentAgenda = () => import('../pages/agent/Agenda.vue')
const AgentAssistance = () => import('../pages/agent/Assistance.vue')
const AgentFormation = () => import('../pages/agent/Formation.vue')
const AgentInscription = () => import('../pages/agent/Inscription.vue')
const AgentMissions = () => import('../pages/agent/Missions.vue')
const AgentClients = () => import('../pages/agent/Clients.vue')
const AgentBiens = () => import('../pages/agent/Biens.vue')
const AgentContrats = () => import('../pages/agent/Contrats.vue')
const AgentStatistiques = () => import('../pages/agent/Statistiques.vue')
const AgentPublierBien = () => import('../pages/agent/AgentPublierBien.vue')

// Bailleur Pages
const BailleurDashboard = () => import('../pages/bailleur/Dashboard.vue')
const BailleurMesBiens = () => import('../pages/bailleur/MesBiens.vue')
const PublierBien = () => import('../pages/shared/PublishProperty.vue')
const BailleurEditerBien = () => import('../pages/bailleur/EditerBien.vue')
const BailleurMesLocataires = () => import('../pages/bailleur/MesLocataires.vue')
const BailleurInterventions = () => import('../pages/bailleur/Interventions.vue')
const BailleurVisites = () => import('../pages/bailleur/Visites.vue')
const BailleurFinances = () => import('../pages/bailleur/Finances.vue')
const BailleurAssistance = () => import('../pages/bailleur/Assistance.vue')
const BailleurDevenirPrestataire = () => import('../pages/bailleur/DevenirPrestataire.vue')
const BailleurFormulaire = () => import('../pages/bailleur/FormulaireBailleur.vue')
const MesDemandes = () => import('../pages/shared/MesDemandes.vue')

// Page Paramètres unifiée (tous rôles)
const SharedParametres = () => import('../pages/shared/Parametres.vue')

// Client Pages
const ClientDashboard = () => import('../pages/client/Dashboard.vue')
const ClientAssistance = () => import('../pages/client/Assistance.vue')

// Locataire Pages
const LocataireDashboard = () => import('../pages/locataire/Dashboard.vue')
const LocataireMesLocations = () => import('../pages/locataire/MesLocations.vue')
const MesFavoris = () => import('../pages/shared/MesFavoris.vue')
const LocataireInterventions = () => import('../pages/locataire/Interventions.vue')
const LocataireMesPaiements = () => import('../pages/locataire/MesPaiements.vue')
const LocataireDetailMonBien = () => import('../pages/locataire/DetailMonBien.vue')
const LocataireFormulaireLocation = () => import('../pages/locataire/FormulaireLocation.vue')
const LocataireInscription = () => import('../pages/locataire/Inscription.vue')
const LocataireAssistance = () => import('../pages/locataire/Assistance.vue')
const LocatairePaiementFacture = () => import('../pages/locataire/PaiementFacture.vue')
const LocataireRecapitulatifPaiement = () => import('../pages/locataire/RecapitulatifPaiement.vue')

// Prestataire Pages
const PrestataireDashboard = () => import('../pages/prestataire/Dashboard.vue')
const PrestataireServices = () => import('../pages/prestataire/MesServices.vue')
const PrestataireInterventions = () => import('../pages/prestataire/Interventions.vue')
const PrestataireAgenda = () => import('../pages/prestataire/Agenda.vue')
const PrestataireFinances = () => import('../pages/prestataire/Finances.vue')
const PrestataireAssistance = () => import('../pages/prestataire/Assistance.vue')
const PrestataireInscription = () => import('../pages/prestataire/Inscription.vue')

// Marketplace Pages
const MarketplaceIndex = () => import('../market-place/Index.vue')
const MarketplaceDetail = () => import('../market-place/DetailProduit.vue')
const MarketplaceAide = () => import('../market-place/Aide.vue')
const MarketplaceContact = () => import('../market-place/Contact.vue')
const DemandesServices = () => import('../market-place/DemandesServices.vue')
const Prestataires = () => import('../market-place/Prestataires.vue')

// Nouvelles pages du processus locatif
const MonSuivi = () => import('../pages/public/MonSuivi.vue')
const DossierLocation = () => import('../pages/public/DossierLocation.vue')

// Routes nécessitant uniquement d'être authentifié (pas de rôle spécifique requis)
const authOnlyPaths = [
  '/programmer-visite',
  '/mon-suivi',
  '/dossier-location',
  '/locataire/formulaire-location',
  '/locataire/inscription',
  '/bailleur/formulaire',
  '/prestataire/inscription',
  '/agent/inscription',
  '/publier-bien',
  '/mes-demandes',
  '/mes-favoris',
  '/parametres',
  '/feed',
]

const routes = [
  // Public routes
  {
    path: '/',
    component: SocialLayout,
    meta: { hasSidebar: false, isFullWidth: true },
    children: [
      { path: '/', name: 'Accueil', component: Accueil  },
      { path: 'annonces', name: 'Annonces', component: Annonces, meta: { hideFooter: true, noMainScroll: true } },
      { path: 'annonces/:slug', name: 'DetailAnnonce', component: DetailAnnonce },
      { path: 'programmer-visite', name: 'ProgrammerVisite', component: ProgrammerVisite },
      { path: 'politique-confidentialite', name: 'PolitiqueConfidentialite', component: PolitiqueConfidentialite },
      { path: 'notifications', name: 'Notifications', component: Notifications },
      { path: 'assistance', name: 'Assistance', component: Assistance },
      // Pages du processus locatif (auth requise, pas de rôle spécifique)
      { path: 'mon-suivi', name: 'MonSuivi', component: MonSuivi, meta: { hasSidebar: false } },
      { path: 'payment', name: 'Payment', component: Payment },
      
      { path: 'dossier-location', name: 'DossierLocation', component: DossierLocation },
      { path: '/publier-bien', name: 'PublierBien', component: PublierBien, meta: { hasSidebar: true, isFullWidth: false } },
      { path: '/mes-demandes', name: 'PublicationRequests', component: MesDemandes, meta: { hasSidebar: true, isFullWidth: false } },
      { path: '/mes-favoris', name: 'MesFavoris', component: MesFavoris, meta: { hasSidebar: true, isFullWidth: false } },
      // Page Paramètres unifiée (tous rôles confondus)
      { path: '/parametres', name: 'Parametres', component: SharedParametres, meta: { hasSidebar: true, isFullWidth: false } },
      { path: '/messages', name: 'Messages', component: () => import('../pages/shared/Messages.vue'), meta: { hasSidebar: true, isFullWidth: false } },
    ]
  },

  // Social Feed & Authenticated Layout
  {
    path: '/',
    component: SocialLayout,
    children: [
       { path: '/feed', name: 'SocialFeed', component: () => import('../pages/public/social/SocialFeed.vue'), meta: { hasSidebar: true, showRightSidebar: true } },
    ]
  },

  // Auth routes
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      { path: 'connexion', name: 'Connexion', component: Connexion },
      { path: 'inscription', name: 'Inscription', component: Inscription },
      { path: 'mot-de-passe-oublie', name: 'MotDePasseOublie', component: MotDePasseOublie },
    ]
  },

  // Admin routes
  {
    path: '/admin',
    component: SocialLayout,
    meta: { hasSidebar: true },
    children: [
      { path: 'dashboard',            name: 'AdminDashboard',            component: AdminDashboard },
      { path: 'utilisateurs',         name: 'AdminUtilisateurs',         component: AdminUtilisateurs },
      { path: 'biens-annonces',       name: 'AdminBiensAnnonces',        component: AdminBiensAnnonces },
      { path: 'finances',             name: 'AdminFinances',             component: AdminFinances },
      { path: 'services',             name: 'AdminServices',             component: AdminServices },
      { path: 'supervision-location', name: 'AdminSupervisionLocation',  component: AdminSupervisionLocation },
      { path: 'demandes-publication', name: 'AdminDemandesPublication',  component: AdminDemandesPublication },
    ]
  },

  // Agent routes
  {
    path: '/agent',
    component: SocialLayout,
    meta: { hasSidebar: true },
    children: [
      { path: 'dashboard', name: 'AgentDashboard', component: AgentDashboard },
      { path: 'agenda', name: 'AgentAgenda', component: AgentAgenda },
      { path: 'assistance', name: 'AgentAssistance', component: AgentAssistance },
      { path: 'formation', name: 'AgentFormation', component: AgentFormation },
      { path: 'inscription', name: 'AgentInscription', component: AgentInscription, meta: { hasSidebar: false } },
      { path: 'missions', name: 'AgentMissions', component: AgentMissions },
      { path: 'clients', name: 'AgentClients', component: AgentClients },
      { path: 'biens', name: 'AgentBiens', component: AgentBiens },
      { path: 'contrats', name: 'AgentContrats', component: AgentContrats },
      { path: 'statistiques', name: 'AgentStatistiques', component: AgentStatistiques },
      { path: 'publication-missions/:id/audit', name: 'AgentPublierBien', component: AgentPublierBien },
    ]
  },

  // Bailleur routes
  {
    path: '/bailleur',
    component: SocialLayout,
    meta: { hasSidebar: true },
    children: [
      { path: 'dashboard', name: 'BailleurDashboard', component: BailleurDashboard },
      { path: 'mes-biens', name: 'BailleurMesBiens', component: BailleurMesBiens },
      { path: 'biens/:id/editer', name: 'BailleurEditerBien', component: BailleurEditerBien },
      { path: 'mes-locataires', name: 'BailleurMesLocataires', component: BailleurMesLocataires },
      { path: 'interventions', name: 'BailleurInterventions', component: BailleurInterventions },
      { path: 'visites', name: 'BailleurVisites', component: BailleurVisites },
      { path: 'finances', name: 'BailleurFinances', component: BailleurFinances },
      { path: 'assistance', name: 'BailleurAssistance', component: BailleurAssistance },
      { path: 'devenir-prestataire', name: 'BailleurDevenirPrestataire', component: BailleurDevenirPrestataire, meta: { hasSidebar: false } },
      { path: 'formulaire', name: 'BailleurFormulaire', component: BailleurFormulaire, meta: { hasSidebar: false } },
    ]
  },

  // Client routes
  {
    path: '/client',
    component: SocialLayout,
    meta: { hasSidebar: true },
    children: [
      { path: 'dashboard', name: 'ClientDashboard', component: ClientDashboard },
      { path: 'assistance', name: 'ClientAssistance', component: ClientAssistance },
    ]
  },

  // Locataire routes
  {
    path: '/locataire',
    component: SocialLayout,
    meta: { hasSidebar: true },
    children: [
      { path: 'dashboard', name: 'LocataireDashboard', component: LocataireDashboard },
      { path: 'mes-locations', name: 'LocataireMesLocations', component: LocataireMesLocations },
      { path: 'interventions', name: 'LocataireInterventions', component: LocataireInterventions },
      { path: 'mes-paiements', name: 'LocataireMesPaiements', component: LocataireMesPaiements },
      { path: 'detail-mon-bien', name: 'LocataireDetailMonBien', component: LocataireDetailMonBien },
      { path: 'formulaire-location', name: 'LocataireFormulaireLocation', component: LocataireFormulaireLocation, meta: { hasSidebar: false } },
      { path: 'inscription', name: 'LocataireInscription', component: LocataireInscription, meta: { hasSidebar: false } },
      { path: 'assistance', name: 'LocataireAssistance', component: LocataireAssistance },
      { path: 'paiement-facture', name: 'LocatairePaiementFacture', component: LocatairePaiementFacture },
      { path: 'recapitulatif-paiement', name: 'LocataireRecapitulatifPaiement', component: LocataireRecapitulatifPaiement },
    ]
  },

  // Prestataire routes
  {
    path: '/prestataire',
    component: SocialLayout,
    meta: { hasSidebar: true },
    children: [
      { path: 'dashboard', name: 'PrestataireDashboard', component: PrestataireDashboard },
      { path: 'mes-services', name: 'PrestataireServices', component: PrestataireServices },
      { path: 'interventions', name: 'PrestataireInterventions', component: PrestataireInterventions },
      { path: 'agenda', name: 'PrestataireAgenda', component: PrestataireAgenda },
      { path: 'finances', name: 'PrestataireFinances', component: PrestataireFinances },
      { path: 'assistance', name: 'PrestataireAssistance', component: PrestataireAssistance },
      { path: 'inscription', name: 'PrestataireInscription', component: PrestataireInscription, meta: { hasSidebar: false } }, // Exclu
    ]
  },

  // Marketplace routes
  {
    path: '/marketplace',
    component: SocialLayout,
    meta: { hasSidebar: false, isFullWidth: true },
    children: [
      { path: '', name: 'MarketplaceIndex', component: MarketplaceIndex },
      { path: 'demandes', name: 'MarketplaceDemandes', component: DemandesServices },
      { path: 'prestataires', name: 'MarketplacePrestataires', component: Prestataires },
      { path: 'demandes/:id', name: 'ServicePostDetail', component: () => import('../market-place/ServicePostDetail.vue') },
      { path: ':id', name: 'MarketplaceDetail', component: MarketplaceDetail },
      { path: 'aide', name: 'MarketplaceAide', component: MarketplaceAide },
      { path: 'contact', name: 'MarketplaceContact', component: MarketplaceContact },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // 1. Charger l'utilisateur si on a un token mais pas l'user (refresh page)
  if (authStore.token && !authStore.user) {
    await authStore.fetchUser()
  }

  const isAuthenticated = authStore.isAuthenticated
  const userRole = authStore.user?.role

  // 2. Rediriger vers le dashboard si on est connecté et qu'on tente d'accéder aux pages auth
  if (isAuthenticated && to.path.startsWith('/auth')) {
      let redirectPath = '/'
      switch(userRole) {
          case 'admin': redirectPath = '/admin/dashboard'; break;
          case 'bailleur': redirectPath = '/bailleur/dashboard'; break;
          case 'locataire': redirectPath = '/locataire/dashboard'; break;
          case 'prestataire': redirectPath = '/prestataire/dashboard'; break;
          case 'agent': redirectPath = '/agent/dashboard'; break;
      }
      return next(redirectPath)
  }

  // 3a. Routes auth-only (authentification requise, mais sans rôle spécifique)
  const isAuthOnly = authOnlyPaths.some(p => to.path.startsWith(p))
  if (isAuthOnly) {
    if (!isAuthenticated) {
      return next({ path: '/auth/connexion', query: { redirect: to.fullPath } })
    }
    return next()
  }

  // 3b. Protection des routes par rôle
  const protectedPrefixes = [
    { prefix: '/admin', role: 'admin' },
    { prefix: '/bailleur', role: 'bailleur', excludes: ['/bailleur/formulaire'] },
    { prefix: '/locataire', role: 'locataire', excludes: ['/locataire/formulaire-location', '/locataire/inscription'] },
    { prefix: '/prestataire', role: 'prestataire', excludes: ['/prestataire/inscription'] },
    { prefix: '/agent', role: 'agent', excludes: ['/agent/inscription'] },
    { prefix: '/client', role: 'client' }, 
  ]

  const matchedProtection = protectedPrefixes.find(p => {
    if (!to.path.startsWith(p.prefix)) return false
    if (p.excludes && p.excludes.some(ex => to.path.startsWith(ex))) return false
    return true
  })

  if (matchedProtection) {
    if (!isAuthenticated) {
      return next({ path: '/auth/connexion', query: { redirect: to.fullPath } })
    }
    
    // Si l'utilisateur n'a pas le bon rôle
    if (userRole !== matchedProtection.role && userRole !== 'admin') {
       return next('/') 
    }
  }

  next()
})

export default router
