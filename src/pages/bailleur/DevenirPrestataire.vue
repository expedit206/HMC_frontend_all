<template>
  <div class="bg-[#FAF9F5] min-h-screen font-sans text-gray-800">
    <!-- HEADER -->
    <header
      class="bg-white sticky top-0 z-50 shadow-sm py-4 px-6 border-b border-gray-100 flex justify-between items-center"
    >
      <RouterLink :to="{ name: 'BailleurDashboard' }" class="flex items-center gap-2">
        <span class="font-black text-lg uppercase tracking-tight text-[#1B0B38]"
          >Home<span class="text-[#E54801]">Cameroon</span></span
        >
      </RouterLink>
      <RouterLink
        :to="{ name: 'BailleurDashboard' }"
        class="text-xs font-black text-gray-400 hover:text-[#E54801] transition-all flex items-center gap-2 uppercase tracking-widest group"
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
          class="text-3xl font-black text-[#1B0B38] leading-tight uppercase tracking-tight"
        >
          Étendez vos possibilités
        </h1>
        <p
          class="text-gray-500 font-bold uppercase tracking-[0.2em] text-[11px] mt-2 italic"
        >
          Ajoutez d'autres casquettes à votre compte Home Cameroon
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Prestataire -->
        <div
          class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center group hover:shadow-xl hover:border-[#E54801]/20 transition-all duration-500 transform hover:-translate-y-1 cursor-pointer"
        >
          <div
            class="w-20 h-20 rounded-2xl bg-orange-50 text-[#E54801] flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform"
          >
            <i class="fas fa-tools"></i>
          </div>
          <h3
            class="text-xl font-black text-[#1B0B38] uppercase tracking-tight mb-2"
          >
            Prestataire de Services
          </h3>
          <p class="text-[11px] text-gray-500 font-medium leading-relaxed mb-8">
            Vous êtes plombier, électricien, menuisier ou expert en rénovation ?
            Offrez vos services aux milliers de propriétaires et locataires de
            la plateforme.
          </p>
          <div class="space-y-4 w-full mt-auto">
            <div
              class="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest justify-center"
            >
              <i class="fas fa-check-circle text-green-500"></i> Visibilité
              accrue
              <i class="fas fa-check-circle text-green-500"></i> Paiements
              sécurisés
            </div>
            <button
              class="w-full py-4 bg-[#1B0B38] text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-[#E54801] transition-all shadow-lg group-hover:shadow-xl"
            >
              S'enregistrer comme Prestataire
            </button>
          </div>
        </div>

        <!-- Agent Immobilier -->
        <div
          class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center group hover:shadow-xl hover:border-[#E54801]/20 transition-all duration-500 transform hover:-translate-y-1 cursor-pointer"
        >
          <div
            class="w-20 h-20 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform"
          >
            <i class="fas fa-user-tie"></i>
          </div>
          <h3
            class="text-xl font-black text-[#1B0B38] uppercase tracking-tight mb-2"
          >
            Agent Immobilier
          </h3>
          <p class="text-[11px] text-gray-500 font-medium leading-relaxed mb-8">
            Gérez des parcs immobiliers pour d'autres propriétaires, organisez
            des visites et percevez des commissions sur les transactions.
          </p>
          <div class="space-y-4 w-full mt-auto">
            <div
              class="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest justify-center"
            >
              <i class="fas fa-check-circle text-green-500"></i> Outils de
              gestion CRM
              <i class="fas fa-check-circle text-green-500"></i> Statistiques
              avancées
            </div>
            <button
              class="w-full py-4 bg-[#1B0B38] text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-[#E54801] transition-all shadow-lg group-hover:shadow-xl"
            >
              Devenir Agent Partenaire
            </button>
          </div>
        </div>

        <!-- Conciergerie -->
        <div
          class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center group hover:shadow-lg transition-all duration-500 opacity-80 hover:opacity-100"
        >
          <div
            class="w-20 h-20 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform"
          >
            <i class="fas fa-concierge-bell"></i>
          </div>
          <h3
            class="text-xl font-black text-[#1B0B38] uppercase tracking-tight mb-2"
          >
            Service de Conciergerie
          </h3>
          <p class="text-[11px] text-gray-500 font-medium leading-relaxed mb-8">
            Proposez des services de nettoyage, de gardiennage ou de gestion de
            clés pour les locations de courte durée.
          </p>
          <button
            class="w-full py-4 border-2 border-dashed border-gray-200 text-gray-400 rounded-2xl text-xs font-black uppercase tracking-widest cursor-not-allowed bg-gray-50"
          >
            À venir prochainement
          </button>
        </div>

        <!-- Autre / Aide -->
        <div
          class="bg-gradient-to-br from-[#E54801] to-[#913327] rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center text-white justify-center hover:scale-[1.02] transition-transform duration-300"
        >
          <h3
            class="text-2xl font-black uppercase tracking-tight mb-4 leading-tight"
          >
            Vous ne trouvez pas votre rôle ?
          </h3>
          <p class="text-xs text-white/80 font-medium mb-8">
            Contactez notre équipe support pour discuter d'un partenariat
            personnalisé ou d'une demande spécifique.
          </p>
          <button
            class="px-8 py-3 bg-white text-[#E54801] rounded-xl text-xs font-black uppercase tracking-widest shadow-xl hover:bg-gray-100 transition-all"
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
