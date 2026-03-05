<template>
  <div class="bg-background min-h-screen">

    <!-- Hero Header -->
    <div class="bg-primary py-20 px-6 text-center relative overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <!-- <div class="absolute inset-0" style="background-image: url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\");"></div> -->
      </div>
      <div class="relative max-w-4xl mx-auto">
        <h1 class="text-white text-3xl md:text-5xl font-bold mb-6 uppercase tracking-tight">
          Politique de <span class="text-white/80">Confidentialité</span>
        </h1>
        <p class="text-white/80 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Votre confiance est la pierre angulaire de notre service de location.
          Voici comment <strong>HOME Cameroon</strong> veille sur vos données personnelles.
        </p>
      </div>
    </div>

    <!-- Contenu principal -->
    <main class="max-w-6xl mx-auto -mt-10 pb-20 px-4 sm:px-6">

      <!-- Engagement de transparence -->
      <div class="bg-card rounded-2xl p-8 md:p-12 shadow-xl mb-12 border-t-4 border-secondary border border-border">
        <div class="flex flex-col md:flex-row items-center gap-6">
          <div class="bg-muted p-5 rounded-full flex-shrink-0">
            <i class="fas fa-user-shield text-4xl text-secondary"></i>
          </div>
          <div>
            <h2 class="text-xl font-bold text-primary mb-2">Engagement de Transparence</h2>
            <p class="text-foreground/70 text-sm leading-relaxed">
              En utilisant la plateforme de location <strong>HOME Cameroon</strong>, vous nous confiez vos
              informations. Cette politique est conçue pour vous aider à comprendre quelles données nous
              collectons, pourquoi nous les collectons et comment nous les sécurisons.
            </p>
          </div>
        </div>
      </div>

      <!-- Grille des sections -->
      <div class="grid md:grid-cols-2 gap-8 mb-12">

        <!-- Données collectées -->
        <section
          class="bg-card rounded-2xl p-8 border border-border shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300"
        >
          <h3 class="text-secondary font-bold text-lg mb-4 flex items-center gap-3">
            <i class="fas fa-folder-open text-secondary"></i>
            Données Collectées
          </h3>
          <div class="space-y-4 text-sm text-foreground/70">
            <p>
              <strong class="text-foreground">Identité :</strong> Nom, prénom, copie de CNI
              (pour les contrats de bail).
            </p>
            <p>
              <strong class="text-foreground">Contact :</strong> Numéro de téléphone, email,
              adresse de résidence actuelle.
            </p>
            <p>
              <strong class="text-foreground">Logement :</strong> Préférences de location,
              budget et historique des visites.
            </p>
          </div>
        </section>

        <!-- Pourquoi ces données -->
        <section
          class="bg-card rounded-2xl p-8 border border-border shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300"
        >
          <h3 class="text-secondary font-bold text-lg mb-4 flex items-center gap-3">
            <i class="fas fa-handshake text-secondary"></i>
            Pourquoi ces données ?
          </h3>
          <ul class="space-y-3 text-sm text-foreground/70">
            <li class="flex items-center gap-2">
              <i class="fas fa-chevron-right text-secondary flex-shrink-0"></i>
              Facilitation des visites de maisons.
            </li>
            <li class="flex items-center gap-2">
              <i class="fas fa-chevron-right text-secondary flex-shrink-0"></i>
              Rédaction des contrats de bail sécurisés.
            </li>
            <li class="flex items-center gap-2">
              <i class="fas fa-chevron-right text-secondary flex-shrink-0"></i>
              Mise en relation locataires / bailleurs.
            </li>
            <li class="flex items-center gap-2">
              <i class="fas fa-chevron-right text-secondary flex-shrink-0"></i>
              Amélioration continue de nos services.
            </li>
          </ul>
        </section>

        <!-- Sécurité -->
        <section
          class="bg-card rounded-2xl p-8 border-l-4 border-primary border border-border shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300"
        >
          <h3 class="text-primary font-bold text-lg mb-4 flex items-center gap-3">
            <i class="fas fa-lock text-primary"></i>
            Sécurité des informations
          </h3>
          <p class="text-sm text-foreground/70 leading-relaxed mb-4">
            Vos données sont stockées sur des serveurs sécurisés et ne sont accessibles qu'au
            personnel autorisé de <strong>HOME Cameroon</strong> pour la gestion de vos dossiers.
          </p>
          <span class="text-xs bg-muted px-3 py-1 rounded-full uppercase font-bold text-muted-foreground">
            <i class="fas fa-shield-alt mr-1 text-secondary"></i>
            Cryptage SSL activé
          </span>
        </section>

        <!-- Vos droits -->
        <section
          class="bg-card rounded-2xl p-8 border-l-4 border-secondary border border-border shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300"
        >
          <h3 class="text-secondary font-bold text-lg mb-4 flex items-center gap-3">
            <i class="fas fa-user-check text-secondary"></i>
            Vos droits
          </h3>
          <p class="text-sm text-foreground/70 mb-4">
            Conformément à la réglementation, vous disposez des droits suivants :
          </p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="right in rights"
              :key="right"
              class="bg-muted text-foreground text-xs px-3 py-1.5 rounded-lg border border-border font-medium"
            >
              {{ right }}
            </span>
          </div>
        </section>

        <!-- Partage des données -->
        <section
          class="bg-card rounded-2xl p-8 border border-border shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300"
        >
          <h3 class="text-secondary font-bold text-lg mb-4 flex items-center gap-3">
            <i class="fas fa-share-alt text-secondary"></i>
            Partage des données
          </h3>
          <p class="text-sm text-foreground/70 mb-3">Nous ne partageons vos données qu'avec :</p>
          <ul class="space-y-2 text-sm text-foreground/70">
            <li class="flex items-start gap-2">
              <i class="fas fa-arrow-right text-secondary mt-0.5 flex-shrink-0"></i>
              <span><strong class="text-foreground">Prestataires :</strong> Entreprises nous aidant à fournir nos services.</span>
            </li>
            <li class="flex items-start gap-2">
              <i class="fas fa-arrow-right text-secondary mt-0.5 flex-shrink-0"></i>
              <span><strong class="text-foreground">Partenaires :</strong> Uniquement avec votre consentement explicite.</span>
            </li>
            <li class="flex items-start gap-2">
              <i class="fas fa-arrow-right text-secondary mt-0.5 flex-shrink-0"></i>
              <span><strong class="text-foreground">Obligations légales :</strong> Si requis par la loi.</span>
            </li>
          </ul>
        </section>

        <!-- Conservation -->
        <section
          class="bg-card rounded-2xl p-8 border border-border shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300"
        >
          <h3 class="text-secondary font-bold text-lg mb-4 flex items-center gap-3">
            <i class="fas fa-database text-secondary"></i>
            Conservation des données
          </h3>
          <p class="text-sm text-foreground/70 leading-relaxed mb-4">
            Vos données sont conservées pendant la durée nécessaire à la fourniture de nos services,
            puis archivées conformément aux obligations légales camerounaises.
          </p>
          <div class="grid grid-cols-2 gap-3">
            <div class="bg-muted/50 p-3 rounded-xl text-center">
              <p class="text-2xl font-bold text-secondary">3 ans</p>
              <p class="text-xs text-foreground/60">Données de compte</p>
            </div>
            <div class="bg-muted/50 p-3 rounded-xl text-center">
              <p class="text-2xl font-bold text-secondary">5 ans</p>
              <p class="text-xs text-foreground/60">Données contractuelles</p>
            </div>
          </div>
        </section>

      </div>

      <!-- CTA Contact -->
      <div class="bg-secondary rounded-2xl p-10 text-center text-white shadow-2xl">
        <i class="fas fa-envelope text-4xl mb-4 opacity-80 block"></i>
        <h2 class="text-2xl font-bold mb-4">Besoin d'éclaircissements ?</h2>
        <p class="opacity-80 text-sm mb-8 max-w-md mx-auto">
          Notre délégué à la protection des données répond à vos préoccupations dans les 48 heures.
        </p>
        <a
          href="mailto:contact@homecameroon.cm"
          class="inline-block bg-primary hover:bg-white hover:text-secondary text-white px-10 py-4 rounded-full font-bold transition-all shadow-lg"
        >
          <i class="fas fa-paper-plane mr-2"></i>
          Nous écrire directement
        </a>
      </div>

      <!-- Date de mise à jour -->
      <div class="text-center mt-10 pt-6 border-t border-border">
        <p class="text-muted-foreground text-sm">
          <i class="fas fa-calendar mr-2 text-secondary"></i>
          Dernière mise à jour : <strong>Janvier 2025</strong>
        </p>
      </div>

    </main>
  </div>
</template>

<script setup>
const rights = ['Accès', 'Rectification', 'Suppression', 'Opposition', 'Portabilité', 'Limitation']
</script>

<style scoped>
section {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
