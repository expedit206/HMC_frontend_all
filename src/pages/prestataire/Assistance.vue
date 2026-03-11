<template>
  <DashboardLayout>
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16 animate-fadeIn">
        <h1 class="text-3xl lg:text-4xl font-extrabold text-foreground mb-4">
          Assistance Personnalisée Prestataire
        </h1>
        <p class="text-lg lg:text-xl text-muted-foreground">
          Nous vous aidons à sécuriser votre activité et à gérer vos
          interventions sereinement.
        </p>
      </div>

      <div
        class="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fadeIn"
        style="animation-delay: 0.1s"
      >
        <!-- Assurance -->
        <div
          class="bg-card rounded-2xl shadow-sm border border-border p-8 transform hover:-translate-y-2 transition-transform duration-300"
        >
          <div
            class="w-12 h-12 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center mb-6"
          >
            <i class="fas fa-briefcase text-2xl"></i>
          </div>
          <h3 class="text-xl font-bold text-foreground mb-4">
            Assurance Professionnelle
          </h3>
          <p class="text-muted-foreground text-sm mb-6 leading-relaxed">
            Couvrez votre responsabilité civile professionnelle (RC Pro) et
            protégez vos outils de travail.
          </p>
          <button
            class="w-full py-3 bg-secondary text-secondary-foreground font-bold rounded-lg hover:bg-secondary/90 transition-colors shadow-md"
          >
            Demander un devis RC Pro
          </button>
        </div>

        <!-- Litiges -->
        <div
          class="bg-card rounded-2xl shadow-sm border border-border p-8 transform hover:-translate-y-2 transition-transform duration-300"
        >
          <div
            class="w-12 h-12 bg-blue-100 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-6"
          >
            <i class="fas fa-hand-holding-dollar text-2xl"></i>
          </div>
          <h3 class="text-xl font-bold text-foreground mb-4">
            Aide au Recouvrement
          </h3>
          <p class="text-muted-foreground text-sm mb-6 leading-relaxed">
            Un client refuse de payer après une intervention ? Nos experts
            vous aident à récupérer vos fonds.
          </p>
          <button
            class="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            Signaler un impayé
          </button>
        </div>

        <!-- Suivi -->
        <div
          class="bg-card rounded-2xl shadow-sm border border-border p-8 transform hover:-translate-y-2 transition-transform duration-300"
        >
          <div
            class="w-12 h-12 bg-purple-100 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center mb-6"
          >
            <i class="fas fa-chart-line text-2xl"></i>
          </div>
          <h3 class="text-xl font-bold text-foreground mb-4">
            Suivi & Croissance
          </h3>
          <p class="text-muted-foreground text-sm mb-6 leading-relaxed">
            Bénéficiez d'un audit de votre profil et de conseils pour
            augmenter votre nombre d'interventions.
          </p>
          <button
            class="w-full py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors shadow-md"
          >
            Optimiser mon profil
          </button>
        </div>
      </div>

      <div
        class="mt-16 bg-primary rounded-3xl p-8 lg:p-12 text-primary-foreground flex flex-col md:flex-row items-center justify-between animate-fadeIn"
        style="animation-delay: 0.2s"
      >
        <div class="mb-8 md:mb-0">
          <h2 class="text-2xl font-bold mb-2">
            Besoin d'un conseil juridique ?
          </h2>
          <p class="text-primary-foreground/70">
            Nos experts répondent à vos questions sous 24h.
          </p>
        </div>
        <button
          class="px-8 py-4 bg-background text-primary font-bold rounded-xl hover:bg-muted transition-colors shadow-lg"
        >
          Contacter un expert juridique
        </button>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import DashboardLayout from "../../layouts/DashboardLayout.vue";
</script>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.5s ease-out forwards;
  opacity: 0;
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
</style>