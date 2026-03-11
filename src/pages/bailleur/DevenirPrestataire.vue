<template>
  <div class="bg-background min-h-screen font-sans text-foreground">
    <!-- HEADER -->
    <header
      class="bg-card sticky top-0 z-50 shadow-sm py-4 px-6 border-b border-border flex justify-between items-center"
    >
      <RouterLink :to="{ name: 'BailleurDashboard' }" class="flex items-center gap-2">
        <span class="font-black text-lg uppercase tracking-tight text-foreground"
          >Home<span class="text-secondary">Cameroon</span></span
        >
      </RouterLink>
      <RouterLink
        :to="{ name: 'BailleurDashboard' }"
        class="text-xs font-black text-muted-foreground hover:text-secondary transition-all flex items-center gap-2 uppercase tracking-widest group"
      >
        <i
          class="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"
        ></i>
        Retour au Tableau de bord
      </RouterLink>
    </header>

    <main class="max-w-4xl mx-auto py-12 px-6 animate-fadeIn">
      <div class="text-center mb-16">
        <h1
          class="text-3xl font-black text-foreground leading-tight uppercase tracking-tight"
        >
          Étendez vos possibilités
        </h1>
        <p
          class="text-muted-foreground font-bold uppercase tracking-[0.2em] text-[11px] mt-2 italic"
        >
          Ajoutez d'autres casquettes à votre compte Home Cameroon
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Prestataire -->
        <div
          class="bg-card rounded-3xl p-8 shadow-sm border border-border flex flex-col items-center text-center group hover:shadow-xl hover:border-secondary/20 transition-all duration-500 transform hover:-translate-y-1 cursor-pointer"
        >
          <div
            class="w-20 h-20 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform"
          >
            <i class="fas fa-tools"></i>
          </div>
          <h3
            class="text-xl font-black text-foreground uppercase tracking-tight mb-2"
          >
            Prestataire de Services
          </h3>
          <p class="text-[11px] text-muted-foreground font-medium leading-relaxed mb-8">
            Vous êtes plombier, électricien, menuisier ou expert en rénovation ?
            Offrez vos services aux milliers de propriétaires et locataires de
            la plateforme.
          </p>
          <div class="space-y-4 w-full mt-auto">
            <div
              class="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest justify-center"
            >
              <i class="fas fa-check-circle text-green-500 dark:text-green-400"></i> Visibilité
              accrue
              <i class="fas fa-check-circle text-green-500 dark:text-green-400"></i> Paiements
              sécurisés
            </div>
            <button
              class="w-full py-4 bg-primary text-primary-foreground rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-secondary hover:text-secondary-foreground transition-all shadow-lg group-hover:shadow-xl"
            >
              S'enregistrer comme Prestataire
            </button>
          </div>
        </div>

        <!-- Agent Immobilier -->
        <div
          class="bg-card rounded-3xl p-8 shadow-sm border border-border flex flex-col items-center text-center group hover:shadow-xl hover:border-secondary/20 transition-all duration-500 transform hover:-translate-y-1 cursor-pointer"
        >
          <div
            class="w-20 h-20 rounded-2xl bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform"
          >
            <i class="fas fa-user-tie"></i>
          </div>
          <h3
            class="text-xl font-black text-foreground uppercase tracking-tight mb-2"
          >
            Agent Immobilier
          </h3>
          <p class="text-[11px] text-muted-foreground font-medium leading-relaxed mb-8">
            Gérez des parcs immobiliers pour d'autres propriétaires, organisez
            des visites et percevez des commissions sur les transactions.
          </p>
          <div class="space-y-4 w-full mt-auto">
            <div
              class="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest justify-center"
            >
              <i class="fas fa-check-circle text-green-500 dark:text-green-400"></i> Outils de
              gestion CRM
              <i class="fas fa-check-circle text-green-500 dark:text-green-400"></i> Statistiques
              avancées
            </div>
            <button
              class="w-full py-4 bg-primary text-primary-foreground rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-secondary hover:text-secondary-foreground transition-all shadow-lg group-hover:shadow-xl"
            >
              Devenir Agent Partenaire
            </button>
          </div>
        </div>

        <!-- Conciergerie -->
        <div
          class="bg-card rounded-3xl p-8 shadow-sm border border-border flex flex-col items-center text-center group hover:shadow-lg transition-all duration-500 opacity-80 hover:opacity-100"
        >
          <div
            class="w-20 h-20 rounded-2xl bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform"
          >
            <i class="fas fa-concierge-bell"></i>
          </div>
          <h3
            class="text-xl font-black text-foreground uppercase tracking-tight mb-2"
          >
            Service de Conciergerie
          </h3>
          <p class="text-[11px] text-muted-foreground font-medium leading-relaxed mb-8">
            Proposez des services de nettoyage, de gardiennage ou de gestion de
            clés pour les locations de courte durée.
          </p>
          <button
            class="w-full py-4 border-2 border-dashed border-border text-muted-foreground rounded-2xl text-xs font-black uppercase tracking-widest cursor-not-allowed bg-muted/20"
          >
            À venir prochainement
          </button>
        </div>

        <!-- Autre / Aide -->
        <div
          class="bg-gradient-to-br from-secondary to-secondary/80 rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center text-secondary-foreground justify-center hover:scale-[1.02] transition-transform duration-300"
        >
          <h3
            class="text-2xl font-black uppercase tracking-tight mb-4 leading-tight"
          >
            Vous ne trouvez pas votre rôle ?
          </h3>
          <p class="text-xs text-secondary-foreground/80 font-medium mb-8">
            Contactez notre équipe support pour discuter d'un partenariat
            personnalisé ou d'une demande spécifique.
          </p>
          <button
            class="px-8 py-3 bg-background text-secondary rounded-xl text-xs font-black uppercase tracking-widest shadow-xl hover:bg-background/90 transition-all"
          >
            Contacter le Support
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.8s ease-out forwards;
  opacity: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>