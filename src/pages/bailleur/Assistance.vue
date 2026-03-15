<template>
  <SharedAssistanceLayout title="Assistance Personnalisée"
    subtitle="Bénéficiez d'un accompagnement sur mesure pour sécuriser et optimiser votre gestion locative."
    :showContactParams="false">
    <!-- Hero / Search Section -->
    <template #hero>
      <div
        class="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 mb-12 text-primary-foreground shadow-xl relative overflow-hidden animate-fadeIn">
        <div class="relative z-10 lg:w-2/3">
          <h2 class="text-3xl font-bold mb-4">
            Comment pouvons-nous vous aider aujourd'hui ?
          </h2>
          <p class="text-primary-foreground/80 mb-6 font-light">
            Que ce soit pour une assurance, un litige ou un conseil stratégique, nos experts sont à votre disposition.
          </p>
          <div class="relative max-w-md">
            <input type="text" placeholder="Rechercher une aide, un document..."
              class="w-full bg-white/10 border border-white/20 rounded-xl py-3 pl-12 pr-4 text-primary-foreground placeholder:text-primary-foreground/50 focus:bg-card focus:text-foreground focus:outline-none transition-all shadow-inner" />
            <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-primary-foreground/50 pointer-events-none"></i>
          </div>
        </div>
        <div class="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-1/4 translate-y-1/4">
          <i class="fas fa-headset text-[240px]"></i>
        </div>
      </div>
    </template>

    <!-- Services -->
    <template #services>
      <!-- Insurance -->
      <div
        class="bg-card rounded-3xl border border-border shadow-sm p-8 flex flex-col hover:-translate-y-2 transition-transform duration-300">
        <div class="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-6">
          <i class="fas fa-shield-halved text-2xl"></i>
        </div>
        <h3 class="text-xl font-bold text-foreground mb-3">Assurance & Protection</h3>
        <p class="text-muted-foreground text-sm mb-6 flex-grow">
          Protégez vos revenus locatifs contre les impayés et sécurisez vos biens immobiliers.
        </p>
        <ul class="space-y-3 mb-8">
          <li class="flex items-center gap-2 text-sm text-muted-foreground">
            <i class="fas fa-check-circle text-green-500 dark:text-green-400"></i> Garantie Loyers Impayés (GLI)
          </li>
          <li class="flex items-center gap-2 text-sm text-muted-foreground">
            <i class="fas fa-check-circle text-green-500 dark:text-green-400"></i> Assurance Propriétaire (PNO)
          </li>
        </ul>
        <button
          class="w-full py-4 bg-muted/20 text-secondary font-bold rounded-2xl hover:bg-secondary hover:text-secondary-foreground transition-all text-sm uppercase tracking-wide">
          Demander un devis
        </button>
      </div>

      <!-- Legal Support -->
      <div
        class="bg-card rounded-3xl border border-border shadow-sm p-8 flex flex-col hover:-translate-y-2 transition-transform duration-300">
        <div class="w-16 h-16 bg-blue-50 dark:bg-blue-950/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
          <i class="fas fa-gavel text-2xl"></i>
        </div>
        <h3 class="text-xl font-bold text-foreground mb-3">Gestion des Litiges</h3>
        <p class="text-muted-foreground text-sm mb-6 flex-grow">
          Un problème avec un locataire ? Nos experts juridiques vous accompagnent dans la résolution.
        </p>
        <ul class="space-y-3 mb-8">
          <li class="flex items-center gap-2 text-sm text-muted-foreground">
            <i class="fas fa-check-circle text-green-500 dark:text-green-400"></i> Médiation amiable
          </li>
          <li class="flex items-center gap-2 text-sm text-muted-foreground">
            <i class="fas fa-check-circle text-green-500 dark:text-green-400"></i> Assistance Recouvrement
          </li>
        </ul>
        <button
          class="w-full py-4 bg-muted/20 text-blue-600 dark:text-blue-400 font-bold rounded-2xl hover:bg-blue-600 hover:text-white dark:hover:bg-blue-700 transition-all text-sm uppercase tracking-wide">
          Ouvrir un dossier
        </button>
      </div>

      <!-- Personal Follow-up -->
      <div
        class="bg-card rounded-3xl border border-border shadow-sm p-8 flex flex-col hover:-translate-y-2 transition-transform duration-300">
        <div class="w-16 h-16 bg-purple-50 dark:bg-purple-950/30 rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6">
          <i class="fas fa-user-tie text-2xl"></i>
        </div>
        <h3 class="text-xl font-bold text-foreground mb-3">Suivi Personnalisé</h3>
        <p class="text-muted-foreground text-sm mb-6 flex-grow">
          Un conseiller dédié pour optimiser votre patrimoine et vous aider dans vos démarches.
        </p>
        <ul class="space-y-3 mb-8">
          <li class="flex items-center gap-2 text-sm text-muted-foreground">
            <i class="fas fa-check-circle text-green-500 dark:text-green-400"></i> Conseil en investissement
          </li>
          <li class="flex items-center gap-2 text-sm text-muted-foreground">
            <i class="fas fa-check-circle text-green-500 dark:text-green-400"></i> Audit de vos contrats
          </li>
        </ul>
        <button
          class="w-full py-4 bg-muted/20 text-purple-600 dark:text-purple-400 font-bold rounded-2xl hover:bg-purple-600 hover:text-white dark:hover:bg-purple-700 transition-all text-sm uppercase tracking-wide">
          RDV avec un conseiller
        </button>
      </div>
    </template>

    <template #main-content>
      <!-- Bibliothèque de documents types -->
      <div class="bg-card rounded-3xl shadow-sm border border-border overflow-hidden mb-12 animate-fadeIn"
        style="animation-delay: 0.3s">
        <div class="p-8 border-b border-border flex justify-between items-center bg-muted/10">
          <h2 class="text-xl font-bold text-foreground">Bibliothèque de documents types</h2>
          <button class="text-sm font-semibold text-secondary hover:underline">Voir tout</button>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 divide-x divide-y divide-border">
          <div class="p-6 hover:bg-muted/5 transition-colors flex items-center gap-4 group cursor-pointer">
            <div
              class="w-10 h-10 rounded-lg bg-red-50 dark:bg-red-950/30 flex items-center justify-center text-red-500 dark:text-red-400 group-hover:scale-110 transition-transform">
              <i class="fas fa-file-pdf"></i>
            </div>
            <div>
              <h4 class="text-sm font-bold group-hover:text-secondary transition-colors text-foreground">Contrat de bail type</h4>
              <p class="text-[11px] text-muted-foreground uppercase font-bold">Mis à jour Jan. 2024</p>
            </div>
          </div>
          <div class="p-6 hover:bg-muted/5 transition-colors flex items-center gap-4 group cursor-pointer">
            <div
              class="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center text-blue-500 dark:text-blue-400 group-hover:scale-110 transition-transform">
              <i class="fas fa-file-word"></i>
            </div>
            <div>
              <h4 class="text-sm font-bold group-hover:text-secondary transition-colors text-foreground">Modèle de mise en demeure</h4>
              <p class="text-[11px] text-muted-foreground uppercase font-bold">Conforme loi 2023</p>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #sidebar-content>
      <!-- Emergency Contact -->
      <div
        class="bg-destructive/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center border border-destructive/20 shadow-sm animate-pulse">
        <div class="w-16 h-16 bg-card rounded-2xl flex items-center justify-center text-destructive shadow-sm mb-4">
          <i class="fas fa-phone-volume text-2xl"></i>
        </div>
        <h3 class="text-xl font-bold text-destructive leading-tight mb-2">
          Besoin d'aide immédiate ?
        </h3>
        <p class="text-destructive font-medium text-sm mb-6">
          Nos gestionnaires sont disponibles 7j/7 pour les urgences critiques.
        </p>
        <a href="tel:+237678514645"
          class="w-full py-4 bg-destructive text-destructive-foreground font-bold rounded-2xl hover:bg-destructive/90 transition-all shadow-md text-center hover:scale-105">
          Appeler le +237 678 51 46 45
        </a>
      </div>
    </template>

  </SharedAssistanceLayout>
</template>

<script setup>
import SharedAssistanceLayout from "../../components/support/SharedAssistanceLayout.vue";
</script>
