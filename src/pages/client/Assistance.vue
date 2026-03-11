<template>
  <DashboardLayout>
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12 animate-fadeIn">
        <span
          class="text-secondary font-bold tracking-wider uppercase text-xs mb-2 block"
          >Support Client</span
        >
        <h1 class="text-3xl md:text-4xl font-black text-foreground mb-4">
          Comment pouvons-nous vous aider ?
        </h1>
        <p class="text-muted-foreground text-lg">
          Notre équipe est là pour vous accompagner dans tous vos projets
          immobiliers.
        </p>
      </div>

      <!-- Services Grid -->
      <div
        class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 animate-slide-up"
      >
        <!-- Aide à la recherche -->
        <div
          class="bg-card rounded-[2rem] p-8 shadow-sm border border-border hover:shadow-lg transition group"
        >
          <div
            class="w-14 h-14 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition"
          >
            <i class="fas fa-magnifying-glass-location text-2xl"></i>
          </div>
          <h3 class="text-xl font-bold text-foreground mb-3">
            Recherche Assistée
          </h3>
          <p class="text-muted-foreground text-sm mb-6 leading-relaxed">
            Nos agents dénichent pour vous les meilleures pépites selon vos
            critères spécifiques.
          </p>
          <button
            class="w-full py-3 bg-secondary text-secondary-foreground font-bold rounded-xl hover:bg-secondary/90 transition shadow-md"
          >
            Lancer une recherche
          </button>
        </div>

        <!-- Conseil Juridique -->
        <div
          class="bg-card rounded-[2rem] p-8 shadow-sm border border-border hover:shadow-lg transition group"
        >
          <div
            class="w-14 h-14 bg-blue-100 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition"
          >
            <i class="fas fa-file-contract text-2xl"></i>
          </div>
          <h3 class="text-xl font-bold text-foreground mb-3">
            Vérification Documents
          </h3>
          <p class="text-muted-foreground text-sm mb-6 leading-relaxed">
            Sécurisez vos transactions en faisant vérifier vos titres
            fonciers et contrats.
          </p>
          <button
            class="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-md"
          >
            Vérifier un dossier
          </button>
        </div>

        <!-- Suivi Personnel -->
        <div
          class="bg-card rounded-[2rem] p-8 shadow-sm border border-border hover:shadow-lg transition group"
        >
          <div
            class="w-14 h-14 bg-purple-100 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition"
          >
            <i class="fas fa-crown text-2xl"></i>
          </div>
          <h3 class="text-xl font-bold text-foreground mb-3">
            Coaching VIP
          </h3>
          <p class="text-muted-foreground text-sm mb-6 leading-relaxed">
            Un conseiller personnel vous guide à chaque étape : visites,
            négociation, achat.
          </p>
          <button
            class="w-full py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition shadow-md"
          >
            Devenir Membre VIP
          </button>
        </div>
      </div>

      <!-- FAQ Section -->
      <div
        class="bg-card rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-border animate-slide-up"
        style="animation-delay: 0.1s"
      >
        <h2 class="text-2xl font-black text-foreground mb-8 text-center">
          Questions Fréquentes
        </h2>
        <div class="space-y-4">
          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="border border-border rounded-2xl overflow-hidden"
          >
            <button
              @click="faq.open = !faq.open"
              class="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-muted/20 transition"
            >
              <span class="font-bold text-foreground">{{
                faq.question
              }}</span>
              <i
                :class="[
                  'fas fa-chevron-down transition-transform text-muted-foreground',
                  faq.open ? 'rotate-180' : '',
                ]"
              ></i>
            </button>
            <div
              v-show="faq.open"
              class="px-6 pb-4 pt-0 text-muted-foreground text-sm leading-relaxed"
            >
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Support -->
      <div
        class="mt-12 text-center animate-slide-up"
        style="animation-delay: 0.2s"
      >
        <p class="text-muted-foreground mb-4">Vous ne trouvez pas la réponse ?</p>
        <button
          class="px-8 py-3 bg-card border-2 border-border text-foreground font-bold rounded-xl hover:bg-muted/20 transition flex items-center gap-2 mx-auto"
        >
          <i class="fas fa-envelope"></i> Contacter le support
        </button>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { reactive } from "vue";
import DashboardLayout from "../../layouts/DashboardLayout.vue";

const faqs = reactive([
  {
    question: "Comment rechercher un bien spécifique ?",
    answer:
      "Utilisez la barre de recherche en haut de la page 'Annonces'. Vous pouvez filtrer par ville, type de bien, prix et superficie. Si vous ne trouvez pas, utilisez notre service de Recherche Assistée.",
    open: false,
  },
  {
    question: "Les annonces sont-elles vérifiées ?",
    answer:
      "Oui, toutes les annonces publiées par nos agents certifiés et bailleurs partenaires sont vérifiées. Pour plus de sécurité, nous recommandons toujours de visiter les lieux avec un de nos agents.",
    open: false,
  },
  {
    question: "Comment contacter un agent ?",
    answer:
      "Sur chaque page de détail d'une annonce, vous trouverez un bouton 'Contacter' ou 'Programmer une visite'. Vous pouvez également discuter via notre messagerie intégrée.",
    open: false,
  },
  {
    question: "Est-ce payant ?",
    answer:
      "L'inscription et la recherche de biens sont 100% gratuites pour les clients. Des frais peuvent s'appliquer uniquement lors de la finalisation d'une transaction (frais d'agence ou de notaire).",
    open: false,
  },
]);
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