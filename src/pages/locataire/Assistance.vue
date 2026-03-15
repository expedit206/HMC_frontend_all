<template>
  <SharedAssistanceLayout title="Votre Compagnon Locatif"
    subtitle="Assurance, caution, assistance juridique et bien plus pour vivre serein"
    headerIcon="fa-hand-holding-heart" :faqs="faqs" :showContactParams="false"
    servicesGridClass="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
    <template #services>
      <!-- Assurance Garantie Loyer -->
      <div
        class="bg-gradient-to-br from-blue-50 dark:from-blue-950/30 to-card rounded-3xl p-6 border border-blue-100 dark:border-blue-800/50 shadow-sm hover:shadow-lg transition-all group cursor-pointer">
        <div class="flex gap-5">
          <div
            class="w-14 h-14 bg-blue-100 dark:bg-blue-900/50 text-secondary rounded-2xl flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform">
            <i class="fas fa-shield-alt"></i>
          </div>
          <div>
            <h3 class="text-lg font-bold text-foreground mb-3">Assurance Garantie Loyer</h3>
            <p class="text-sm text-muted-foreground mb-6">Protégez vos revenus en cas d'impayés</p>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-secondary bg-blue-50 dark:bg-blue-950/50 px-3 py-1 rounded-full">À partir de 5.000
            XAF/mois</span>
          <i class="fas fa-arrow-right text-secondary group-hover:translate-x-1 transition-transform"></i>
        </div>
      </div>

      <!-- Caution Digitale -->
      <div
        class="bg-gradient-to-br from-purple-50 dark:from-purple-950/30 to-card rounded-3xl p-6 border border-purple-100 dark:border-purple-800/50 shadow-sm hover:shadow-lg transition-all group cursor-pointer">
        <div class="flex gap-5">
          <div
            class="w-14 h-14 bg-purple-100 dark:bg-purple-900/50 text-secondary rounded-2xl flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform">
            <i class="fas fa-lock"></i>
          </div>
          <div>
            <h3 class="text-lg font-bold text-foreground mb-3">Caution Digitale</h3>
            <p class="text-sm text-muted-foreground mb-6">Évitez le blocage de votre capital</p>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-secondary bg-purple-50 dark:bg-purple-950/50 px-3 py-1 rounded-full">2,5% du loyer annuel</span>
          <i class="fas fa-arrow-right text-secondary group-hover:translate-x-1 transition-transform"></i>
        </div>
      </div>

      <!-- Assistance Juridique -->
      <div
        class="bg-gradient-to-br from-green-50 dark:from-green-950/30 to-card rounded-3xl p-6 border border-green-100 dark:border-green-800/50 shadow-sm hover:shadow-lg transition-all group cursor-pointer">
        <div class="flex gap-5">
          <div
            class="w-14 h-14 bg-green-100 dark:bg-green-900/50 text-secondary rounded-2xl flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform">
            <i class="fas fa-balance-scale"></i>
          </div>
          <div>
            <h3 class="text-lg font-bold text-foreground mb-3">Assistance Juridique</h3>
            <p class="text-sm text-muted-foreground mb-6">Conseils et défense pour vos litiges</p>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-secondary bg-green-50 dark:bg-green-950/50 px-3 py-1 rounded-full">Premium</span>
          <i class="fas fa-arrow-right text-secondary group-hover:translate-x-1 transition-transform"></i>
        </div>
      </div>

      <!-- Support 24/7 -->
      <div
        class="bg-gradient-to-br from-orange-50 dark:from-secondary/10 to-card rounded-3xl p-6 border border-orange-100 dark:border-secondary/20 shadow-sm hover:shadow-lg transition-all group cursor-pointer">
        <div class="flex gap-5">
          <div
            class="w-14 h-14 bg-orange-100 dark:bg-secondary/20 text-secondary rounded-2xl flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform">
            <i class="fas fa-headset"></i>
          </div>
          <div>
            <h3 class="text-lg font-bold text-foreground mb-3">Support Urgence 24/7</h3>
            <p class="text-sm text-muted-foreground mb-6">Urgences, dépannage, assistance</p>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-secondary bg-orange-50 dark:bg-secondary/10 px-3 py-1 rounded-full">Inclus Premium</span>
          <i class="fas fa-arrow-right text-secondary group-hover:translate-x-1 transition-transform"></i>
        </div>
      </div>
    </template>

    <template #main-content>
      <!-- Contact Direct -->
      <div class="bg-card rounded-3xl p-8 border border-border shadow-sm mb-8">
        <div class="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h3 class="text-2xl font-bold text-foreground mb-2">Contactez notre équipe</h3>
            <p class="text-muted-foreground">Nos experts sont disponibles pour vous aider</p>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-muted/20 rounded-2xl p-6 border border-border">
            <div class="w-12 h-12 bg-secondary text-secondary-foreground rounded-xl flex items-center justify-center text-lg mb-4">
              <i class="fas fa-comments"></i>
            </div>
            <h4 class="font-bold text-foreground mb-2">Chat en direct</h4>
            <p class="text-sm text-muted-foreground mb-4">Réponse immédiate pour vos questions simples</p>
            <button
              class="w-full py-3 bg-secondary text-secondary-foreground rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-secondary/90 transition-all">
              Démarrer un chat
            </button>
          </div>
          <div class="bg-muted/20 rounded-2xl p-6 border border-border">
            <div class="w-12 h-12 bg-primary text-primary-foreground rounded-xl flex items-center justify-center text-lg mb-4">
              <i class="fas fa-phone"></i>
            </div>
            <h4 class="font-bold text-foreground mb-2">Appel téléphonique</h4>
            <p class="text-sm text-muted-foreground mb-4">Pour les urgences et questions complexes</p>
            <a href="tel:+237678514645"
              class="block w-full py-3 bg-primary text-primary-foreground text-center rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-secondary hover:text-secondary-foreground transition-all">
              Appeler maintenant
            </a>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="bg-gradient-to-r from-secondary to-secondary/80 rounded-3xl p-12 text-secondary-foreground shadow-xl text-center">
        <h3 class="text-3xl font-bold mb-4">Besoin d'une solution sur mesure ?</h3>
        <p class="text-secondary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
          Notre équipe d'experts peut vous proposer un package personnalisé selon vos besoins spécifiques.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            class="px-8 py-4 bg-background text-secondary rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-muted transition-all">
            Demander un devis
          </button>
          <button
            class="px-8 py-4 bg-transparent border-2 border-secondary-foreground text-secondary-foreground rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-secondary-foreground/10 transition-all">
            <i class="fas fa-calendar-alt mr-2"></i> Prendre RDV
          </button>
        </div>
      </div>
    </template>

    <template #sidebar-content>
      <!-- Stats & Info -->
      <div class="bg-primary text-primary-foreground rounded-3xl p-8 shadow-xl">
        <h3 class="text-2xl font-bold mb-8">Nos chiffres</h3>
        <div class="space-y-6">
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-primary-foreground/70 text-sm">Tickets résolus</span>
              <span class="text-2xl font-bold">98%</span>
            </div>
            <div class="w-full bg-primary-foreground/20 rounded-full h-2">
              <div class="bg-green-500 h-2 rounded-full" style="width: 98%"></div>
            </div>
          </div>
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-primary-foreground/70 text-sm">Temps moyen réponse</span>
              <span class="text-2xl font-bold">2h</span>
            </div>
            <div class="w-full bg-primary-foreground/20 rounded-full h-2">
              <div class="bg-blue-500 h-2 rounded-full" style="width: 90%"></div>
            </div>
          </div>
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-primary-foreground/70 text-sm">Satisfaction clients</span>
              <span class="text-2xl font-bold">4.8/5</span>
            </div>
            <div class="w-full bg-primary-foreground/20 rounded-full h-2">
              <div class="bg-yellow-500 h-2 rounded-full" style="width: 96%"></div>
            </div>
          </div>
        </div>
        <div class="mt-8 pt-6 border-t border-primary-foreground/10">
          <p class="text-primary-foreground/70 text-sm">
            <i class="fas fa-clock mr-2"></i>
            Disponible 7j/7 de 8h à 22h
          </p>
        </div>
      </div>
    </template>
  </SharedAssistanceLayout>
</template>

<script setup>
import { ref } from "vue";
import SharedAssistanceLayout from "../../components/support/SharedAssistanceLayout.vue";

const faqs = ref([
  {
    question: "Comment fonctionne la caution digitale ?",
    answer: "La caution digitale remplace votre dépôt de garantie traditionnel. Pour un montant équivalent à 2,5% du loyer annuel, nous garantissons votre bailleur contre les impayés. Vous conservez votre capital et gagnez en flexibilité.",
    tag: "Sans engagement",
    icon: "fa-file-contract",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    textColor: "text-blue-600 dark:text-blue-400",
    open: false,
  },
  {
    question: "Que couvre l'assurance garantie loyer ?",
    answer: `Cette assurance protège votre bailleur contre les impayés de loyer pendant 18 mois maximum. Elle inclut également :
        <ul class="mt-3 space-y-2 text-sm text-muted-foreground">
            <li class="flex items-center gap-2"><i class="fas fa-check text-green-500"></i> Garantie des dégâts locatifs</li>
            <li class="flex items-center gap-2"><i class="fas fa-check text-green-500"></i> Protection juridique</li>
            <li class="flex items-center gap-2"><i class="fas fa-check text-green-500"></i> Assistance déplacement si expulsion</li>
        </ul>`,
    icon: "fa-shield-alt",
    bgColor: "bg-green-50 dark:bg-green-950/30",
    textColor: "text-green-600 dark:text-green-400",
    open: false,
  },
  {
    question: "Comment bénéficier de l'assistance juridique ?",
    answer: `Notre assistance juridique est disponible pour tous les locataires premium. Elle comprend :
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div class="bg-muted/20 p-4 rounded-xl border border-border">
                <i class="fas fa-comments text-purple-500 mb-2"></i>
                <p class="text-sm font-bold text-foreground">Conseils téléphoniques</p>
                <p class="text-xs text-muted-foreground">24h/24 pour vos questions</p>
            </div>
            <div class="bg-muted/20 p-4 rounded-xl border border-border">
                <i class="fas fa-file-signature text-purple-500 mb-2"></i>
                <p class="text-sm font-bold text-foreground">Rédaction de courriers</p>
                <p class="text-xs text-muted-foreground">Mise en demeure, résiliation</p>
            </div>
        </div>`,
    icon: "fa-gavel",
    bgColor: "bg-purple-50 dark:bg-purple-950/30",
    textColor: "text-purple-600 dark:text-purple-400",
    open: false,
  },
  {
    question: "Que faire en cas d'urgence dans mon logement ?",
    answer: `Pour les urgences (fuite d'eau, panne électrique, serrure bloquée) :
        <ol class="mt-3 space-y-2 text-sm text-muted-foreground list-decimal list-inside">
            <li>Appelez le <strong class="text-foreground">+237 678 51 46 45</strong> (urgence 24/7)</li>
            <li>Décrivez précisément le problème</li>
            <li>Un professionnel est dépêché dans les 2 heures</li>
            <li>Nous contactons votre bailleur pour autorisation</li>
        </ol>
        <div class="mt-4 p-3 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800/50 rounded-xl">
            <p class="text-xs text-yellow-700 dark:text-yellow-400">
                <i class="fas fa-exclamation-triangle mr-2"></i>
                Les frais d'intervention urgente sont pris en charge par notre assurance partenaire.
            </p>
        </div>`,
    icon: "fa-tools",
    bgColor: "bg-orange-50 dark:bg-secondary/10",
    textColor: "text-orange-600 dark:text-secondary",
    open: false,
  },
]);
</script>
