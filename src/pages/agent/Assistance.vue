<template>
  <DashboardLayout>
    <div class="max-w-7xl mx-auto h-full">
      <!-- HERO SECTION -->
      <div class="text-center mb-14 animate-fadeIn">
        <div
          class="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-secondary to-secondary/80 mb-6 shadow-lg"
        >
          <i class="fas fa-headset text-4xl text-primary-foreground"></i>
        </div>
        <h1 class="text-3xl sm:text-4xl font-bold text-foreground mb-3">
          Assistance et Support 24/7
        </h1>
        <p class="text-muted-foreground max-w-2xl mx-auto text-lg">
          Nous vous accompagnons à chaque étape de votre carrière avec des
          outils, des formations et une assistance personnalisée.
        </p>
      </div>

      <!-- MAIN SERVICES GRID -->
      <div
        class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14 animate-slide-up"
      >
        <!-- SERVICE 1: GARANTIE FINANCIÈRE -->
        <div
          class="bg-card rounded-2xl shadow-sm border border-border p-6 sm:p-8 flex flex-col hover:-translate-y-2 hover:shadow-lg transition-all duration-300"
        >
          <div
            class="w-[60px] h-[60px] flex items-center justify-center rounded-2xl bg-secondary/10 text-secondary text-2xl mb-6"
          >
            <i class="fas fa-shield-alt"></i>
          </div>
          <h3 class="text-xl font-bold text-foreground mb-3">
            Garantie Financière
          </h3>
          <p class="text-muted-foreground mb-6 flex-grow">
            Protégez vos transactions avec une garantie financière conforme
            aux normes camerounaises et une couverture RC Pro complète.
          </p>
          <div class="bg-muted/20 rounded-lg p-4 mb-6">
            <ul class="space-y-2 text-sm">
              <li class="flex items-center gap-2">
                <i class="fas fa-check text-green-500 dark:text-green-400"></i>
                <span class="text-foreground/80">Garantie jusqu'à 50M FCFA</span>
              </li>
              <li class="flex items-center gap-2">
                <i class="fas fa-check text-green-500 dark:text-green-400"></i>
                <span class="text-foreground/80">RC Professionnelle incluse</span>
              </li>
              <li class="flex items-center gap-2">
                <i class="fas fa-check text-green-500 dark:text-green-400"></i>
                <span class="text-foreground/80">Frais d'adhésion négociés</span>
              </li>
            </ul>
          </div>
          <button
            class="w-full py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/90 transition"
          >
            <i class="fas fa-file-pdf mr-2"></i> Demander une attestation
          </button>
        </div>

        <!-- SERVICE 2: EXPERTISE JURIDIQUE -->
        <div
          class="bg-card rounded-2xl shadow-sm border border-border p-6 sm:p-8 flex flex-col hover:-translate-y-2 hover:shadow-lg transition-all duration-300"
        >
          <div
            class="w-[60px] h-[60px] flex items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 text-2xl mb-6"
          >
            <i class="fas fa-gavel"></i>
          </div>
          <h3 class="text-xl font-bold text-foreground mb-3">
            Expertise Juridique
          </h3>
          <p class="text-muted-foreground mb-6 flex-grow">
            Consultez nos juristes spécialisés en immobilier pour des conseils
            sur vos contrats, mandats et litiges.
          </p>
          <div class="bg-muted/20 rounded-lg p-4 mb-6">
            <ul class="space-y-2 text-sm">
              <li class="flex items-center gap-2">
                <i class="fas fa-check text-green-500 dark:text-green-400"></i>
                <span class="text-foreground/80">Consultations gratuites</span>
              </li>
              <li class="flex items-center gap-2">
                <i class="fas fa-check text-green-500 dark:text-green-400"></i>
                <span class="text-foreground/80">Modèles de contrats</span>
              </li>
              <li class="flex items-center gap-2">
                <i class="fas fa-check text-green-500 dark:text-green-400"></i>
                <span class="text-foreground/80">Récours en cas de litige</span>
              </li>
            </ul>
          </div>
          <button
            class="w-full py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/90 transition"
          >
            <i class="fas fa-video mr-2"></i> Contacter un juriste
          </button>
        </div>

        <!-- SERVICE 3: FORMATIONS CONTINUES -->
        <div
          class="bg-card rounded-2xl shadow-sm border border-border p-6 sm:p-8 flex flex-col hover:-translate-y-2 hover:shadow-lg transition-all duration-300"
        >
          <div
            class="w-[60px] h-[60px] flex items-center justify-center rounded-2xl bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 text-2xl mb-6"
          >
            <i class="fas fa-graduation-cap"></i>
          </div>
          <h3 class="text-xl font-bold text-foreground mb-3">
            Formations Continues
          </h3>
          <p class="text-muted-foreground mb-6 flex-grow">
            Restez à jour avec nos webinaires mensuels sur les nouvelles
            tendances et techniques immobilières.
          </p>
          <div class="bg-muted/20 rounded-lg p-4 mb-6">
            <ul class="space-y-2 text-sm">
              <li class="flex items-center gap-2">
                <i class="fas fa-check text-green-500 dark:text-green-400"></i>
                <span class="text-foreground/80">Webinaires mensuels</span>
              </li>
              <li class="flex items-center gap-2">
                <i class="fas fa-check text-green-500 dark:text-green-400"></i>
                <span class="text-foreground/80">Actualités immobilières</span>
              </li>
              <li class="flex items-center gap-2">
                <i class="fas fa-check text-green-500 dark:text-green-400"></i>
                <span class="text-foreground/80">Ressources téléchargeables</span>
              </li>
            </ul>
          </div>
          <button
            class="w-full py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/90 transition"
          >
            <i class="fas fa-calendar-check mr-2"></i> Voir les formations
          </button>
        </div>
      </div>

      <!-- SECONDARY SERVICES -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14 animate-slide-up"
        style="animation-delay: 0.1s"
      >
        <!-- SERVICE 4: OUTILS CRM -->
        <div
          class="bg-gradient-to-br from-card to-muted/20 rounded-2xl shadow-sm border border-border p-6 sm:p-8"
        >
          <div class="flex items-start justify-between mb-4">
            <div>
              <h3 class="text-xl font-bold text-foreground mb-2">
                Outils CRM Exclusifs
              </h3>
              <p class="text-muted-foreground">
                Gérez vos contacts, notes et suivis de transactions
                facilement.
              </p>
            </div>
            <div class="text-4xl text-secondary">
              <i class="fas fa-laptop"></i>
            </div>
          </div>
          <div class="bg-card rounded-lg p-4 mt-4 border border-border">
            <ul class="space-y-2 text-sm text-foreground/80">
              <li>
                <i class="fas fa-check text-green-500 dark:text-green-400 mr-2"></i> Gestion de
                portefeuille clients
              </li>
              <li>
                <i class="fas fa-check text-green-500 dark:text-green-400 mr-2"></i>
                Automatisation des relances
              </li>
              <li>
                <i class="fas fa-check text-green-500 dark:text-green-400 mr-2"></i> Analytics et
                rapports
              </li>
            </ul>
          </div>
        </div>

        <!-- SERVICE 5: SUPPORT MARKETING -->
        <div
          class="bg-gradient-to-br from-card to-muted/20 rounded-2xl shadow-sm border border-border p-6 sm:p-8"
        >
          <div class="flex items-start justify-between mb-4">
            <div>
              <h3 class="text-xl font-bold text-foreground mb-2">
                Support Marketing
              </h3>
              <p class="text-muted-foreground">
                Amplifiez votre présence avec nos outils et stratégies
                marketing.
              </p>
            </div>
            <div class="text-4xl text-purple-600 dark:text-purple-400">
              <i class="fas fa-bullhorn"></i>
            </div>
          </div>
          <div class="bg-card rounded-lg p-4 mt-4 border border-border">
            <ul class="space-y-2 text-sm text-foreground/80">
              <li>
                <i class="fas fa-check text-green-500 dark:text-green-400 mr-2"></i> Templates de
                contenus
              </li>
              <li>
                <i class="fas fa-check text-green-500 dark:text-green-400 mr-2"></i> Conseils
                réseaux sociaux
              </li>
              <li>
                <i class="fas fa-check text-green-500 dark:text-green-400 mr-2"></i> Kits
                promotionnels
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- PERSONALIZED SUPPORT SECTION -->
      <div
        class="bg-gradient-to-r from-secondary to-secondary/80 rounded-2xl shadow-lg p-8 sm:p-12 text-primary-foreground text-center mb-14 animate-slide-up"
        style="animation-delay: 0.2s"
      >
        <div
          class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-6"
        >
          <i class="fas fa-star text-3xl"></i>
        </div>
        <h2 class="text-2xl sm:text-3xl font-bold mb-4">
          Besoin d'un Suivi Personnel ?
        </h2>
        <p class="mb-8 text-primary-foreground/90 max-w-2xl mx-auto text-lg">
          Un manager de réseau dédié pour débloquer les dossiers complexes,
          optimiser votre stratégie commerciale et accélérer votre croissance.
        </p>
        <button
          class="inline-flex items-center justify-center px-8 py-4 bg-background text-secondary rounded-xl font-bold hover:bg-background/90 transition shadow-lg transform hover:-translate-y-1"
        >
          <i class="fas fa-calendar-check mr-3"></i>
          Prendre rendez-vous avec un Manager
        </button>
      </div>

      <!-- FAQ SECTION -->
      <div class="mb-14 animate-slide-up" style="animation-delay: 0.3s">
        <h2
          class="text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center"
        >
          Questions Fréquentes
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition"
          >
            <button
              @click="toggleFaq(index)"
              class="flex items-center justify-between w-full px-6 py-4 cursor-pointer hover:bg-muted/10 text-left focus:outline-none"
            >
              <h4 class="font-semibold text-foreground">{{ faq.question }}</h4>
              <i
                :class="[
                  'fas fa-chevron-down text-secondary transition-transform duration-300',
                  faq.isOpen ? 'rotate-180' : '',
                ]"
              ></i>
            </button>
            <div v-show="faq.isOpen" class="px-6 pb-4 text-muted-foreground text-sm">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- CHAT SUPPORT PREVIEW -->
      <div
        class="bg-card rounded-2xl shadow-sm border border-border overflow-hidden animate-slide-up"
        style="animation-delay: 0.4s"
      >
        <div
          class="bg-gradient-to-r from-secondary to-secondary/80 text-primary-foreground p-6 sm:p-8"
        >
          <h3 class="text-2xl font-bold mb-2">Besoin d'aide immédiate ?</h3>
          <p class="text-primary-foreground/90">
            Nos agents sont disponibles en ligne 24/7
          </p>
        </div>

        <div class="p-6 sm:p-8 space-y-4">
          <div class="flex justify-start animate-fadeIn">
            <div class="max-w-xs bg-muted/20 rounded-lg p-4">
              <p class="text-sm text-foreground">
                Bonjour 👋 Comment puis-je vous aider aujourd'hui ?
              </p>
            </div>
          </div>

          <div
            class="flex justify-end animate-fadeIn"
            style="animation-delay: 0.1s"
          >
            <div class="max-w-xs bg-secondary text-secondary-foreground rounded-lg p-4">
              <p class="text-sm">
                Je souhaite obtenir mon attestation de garantie
              </p>
            </div>
          </div>

          <div
            class="flex justify-start animate-fadeIn"
            style="animation-delay: 0.2s"
          >
            <div class="max-w-xs bg-muted/20 rounded-lg p-4">
              <p class="text-sm text-foreground">
                Pas de souci ! Je vous prépare cela maintenant. Vous aurez
                votre attestation dans les 24h.
              </p>
            </div>
          </div>

          <div class="mt-6 flex gap-2">
            <input
              type="text"
              placeholder="Tapez votre message..."
              class="flex-1 px-4 py-3 border border-border bg-background text-foreground placeholder:text-muted-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
            />
            <button
              class="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/90 transition"
            >
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, reactive } from "vue";
import DashboardLayout from "../../layouts/DashboardLayout.vue";

const faqs = reactive([
  {
    question: "Comment obtenir mon attestation de garantie ?",
    answer:
      "Cliquez sur 'Demander une attestation'. Notre équipe traitera votre demande dans les 24h et vous enverra directement votre attestation par email.",
    isOpen: false,
  },
  {
    question: "La consultation juridique est-elle vraiment gratuite ?",
    answer:
      "Oui, jusqu'à 2h de consultation par mois sont comprises dans votre adhésion. Les heures supplémentaires sont facturées à prix réduit.",
    isOpen: false,
  },
  {
    question: "Quand ont lieu les webinaires de formation ?",
    answer:
      "Les webinaires ont lieu tous les deuxièmes jeudis du mois à 18h. Vous recevrez des invitations par email et pourrez accéder aux replays.",
    isOpen: false,
  },
  {
    question: "Comment accéder au CRM ?",
    answer:
      "Accédez via votre dashboard dans la section 'Outils'. Une formation de 30 minutes vous sera proposée lors de votre première connexion.",
    isOpen: false,
  },
  {
    question: "Puis-je contacter un manager à tout moment ?",
    answer:
      "Oui, vous avez accès à un manager 24/7 via chat, email ou appel vidéo. Réponse garantie dans les 2h.",
    isOpen: false,
  },
  {
    question: "Puis-je partager les templates marketing ?",
    answer:
      "Les templates sont pour votre usage personnel uniquement. Vous pouvez les personnaliser et les utiliser pour vos annonces immobilières.",
    isOpen: false,
  },
]);

const toggleFaq = (index) => {
  faqs[index].isOpen = !faqs[index].isOpen;
};
</script>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.5s ease-out backwards;
}
.animate-slide-up {
  animation: slideUp 0.5s ease-out backwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>