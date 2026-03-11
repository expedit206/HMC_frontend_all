import os
import re

routes = {
    '/': 'Accueil',
    '/annonces': 'Annonces',
    '/annonces/': 'DetailAnnonce', # Hard to generically replace dynamic params like '/annonces/${id}' with pure regex, but we will try.
    '/programmer-visite': 'ProgrammerVisite',
    '/politique-confidentialite': 'PolitiqueConfidentialite',
    '/notifications': 'Notifications',
    '/assistance': 'Assistance',

    '/auth/connexion': 'Connexion',
    '/auth/inscription': 'Inscription',
    '/auth/mot-de-passe-oublie': 'MotDePasseOublie',

    '/admin/dashboard': 'AdminDashboard',
    '/admin/utilisateurs': 'AdminUtilisateurs',
    '/admin/biens-annonces': 'AdminBiensAnnonces',
    '/admin/finances': 'AdminFinances',
    '/admin/services': 'AdminServices',
    '/admin/parametres': 'AdminParametres',

    '/agent/dashboard': 'AgentDashboard',
    '/agent/agenda': 'AgentAgenda',
    '/agent/assistance': 'AgentAssistance',
    '/agent/formation': 'AgentFormation',
    '/agent/inscription': 'AgentInscription',
    '/agent/missions': 'AgentMissions',
    '/agent/clients': 'AgentClients',
    '/agent/biens': 'AgentBiens',
    '/agent/contrats': 'AgentContrats',
    '/agent/statistiques': 'AgentStatistiques',
    '/agent/parametres': 'AgentParametres',

    '/bailleur/dashboard': 'BailleurDashboard',
    '/bailleur/mes-biens': 'BailleurMesBiens',
    '/bailleur/publier-bien': 'PublierBien',
    '/bailleur/mes-locataires': 'BailleurMesLocataires',
    '/bailleur/interventions': 'BailleurInterventions',
    '/bailleur/visites': 'BailleurVisites',
    '/bailleur/finances': 'BailleurFinances',
    '/bailleur/mon-profil': 'BailleurMonProfil',
    '/bailleur/assistance': 'BailleurAssistance',
    '/bailleur/devenir-prestataire': 'BailleurDevenirPrestataire',
    '/bailleur/formulaire': 'BailleurFormulaire',

    '/client/dashboard': 'ClientDashboard',
    '/client/profil': 'ClientProfil',
    '/client/parametres': 'ClientParametres',
    '/client/assistance': 'ClientAssistance',

    '/locataire/dashboard': 'LocataireDashboard',
    '/locataire/mes-locations': 'LocataireMesLocations',
    '/locataire/mes-favoris': 'LocataireMesFavoris',
    '/locataire/interventions': 'LocataireInterventions',
    '/locataire/mes-paiements': 'LocataireMesPaiements',
    '/locataire/mon-profil': 'LocataireMonProfil',
    '/locataire/detail-mon-bien': 'LocataireDetailMonBien',
    '/locataire/formulaire-location': 'LocataireFormulaireLocation',
    '/locataire/inscription': 'LocataireInscription',
    '/locataire/assistance': 'LocataireAssistance',
    '/locataire/paiement-facture': 'LocatairePaiementFacture',
    '/locataire/recapitulatif-paiement': 'LocataireRecapitulatifPaiement',

    '/prestataire/dashboard': 'PrestataireDashboard',
    '/prestataire/mes-services': 'PrestataireServices',
    '/prestataire/interventions': 'PrestataireInterventions',
    '/prestataire/agenda': 'PrestataireAgenda',
    '/prestataire/finances': 'PrestataireFinances',
    '/prestataire/assistance': 'PrestataireAssistance',
    '/prestataire/inscription': 'PrestataireInscription',

    '/marketplace': 'MarketplaceIndex',
    '/marketplace/aide': 'MarketplaceAide',
    '/marketplace/contact': 'MarketplaceContact',
}

base_dir = r'c:\laragon\www\home-cameroon\frontend\src'

def replace_to(match):
    path = match.group(1)
    if path in routes:
        return ':to=\"{ name: \'' + routes[path] + '\' }\"'
    return match.group(0)

def replace_router_push(match):
    path = match.group(1)
    if path in routes:
        return 'router.push({ name: \'' + routes[path] + '\' })'
    return match.group(0)

modified_files = []

for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file.endswith('.vue'):
            file_path = os.path.join(root, file)
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()

            original_content = content
            content = re.sub(r'to=\"(.*?)\"', replace_to, content)
            content = re.sub(r'router\.push\([\'\"](.*?)[\'\"]\)', replace_router_push, content)

            if content != original_content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                modified_files.append(file_path)

print(f'Modified {len(modified_files)} files.')
for f in modified_files:
    print(f)
