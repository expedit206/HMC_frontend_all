<template>
  <DashboardLayout>

      <div class="max-w-6xl mx-auto">
        <!-- Header -->
        <div
          class="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 animate-fadeIn"
        >
          <div>
            <h1 class="text-2xl font-bold text-gray-900">
              Assistance Personnalisée
            </h1>
            <p class="text-gray-500 text-sm mt-1">
              Bénéficiez d'un accompagnement sur mesure pour sécuriser et
              optimiser votre gestion locative.
            </p>
          </div>
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="lg:hidden p-2 text-gray-500 hover:text-[#E54801] transition-colors"
          >
            <i class="fas fa-bars text-xl"></i>
          </button>
        </div>

        <!-- Hero Section / Search -->
        <div
          class="bg-gradient-to-r from-[#1B0B38] to-[#913327] rounded-3xl p-8 mb-12 text-white shadow-xl relative overflow-hidden animate-fadeIn"
          style="animation-delay: 0.1s"
        >
          <div class="relative z-10 lg:w-2/3">
            <h2 class="text-3xl font-bold mb-4">
              Comment pouvons-nous vous aider aujourd'hui ?
            </h2>
            <p class="text-white/80 mb-6 font-light">
              Que ce soit pour une assurance, un litige ou un conseil
              stratégique, nos experts sont à votre disposition.
            </p>
            <div class="relative max-w-md">
              <input
                type="text"
                placeholder="Rechercher une aide, un document..."
                class="w-full bg-white/10 border border-white/20 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/50 focus:bg-white focus:text-[#1B0B38] focus:outline-none transition-all shadow-inner"
              />
              <i
                class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none"
              ></i>
            </div>
          </div>
          <div
            class="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-1/4 translate-y-1/4"
          >
            <i class="fas fa-headset text-[240px]"></i>
          </div>
        </div>

        <!-- Assistance Areas -->
        <div
          class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 animate-fadeIn"
          style="animation-delay: 0.2s"
        >
          <!-- Insurance -->
          <div
            class="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex flex-col hover:-translate-y-2 transition-transform duration-300"
          >
            <div
              class="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-[#E54801] mb-6"
            >
              <i class="fas fa-shield-halved text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">
              Assurance & Protection
            </h3>
            <p class="text-gray-500 text-sm mb-6 flex-grow">
              Protégez vos revenus locatifs contre les impayés et sécurisez vos
              biens immobiliers.
            </p>
            <ul class="space-y-3 mb-8">
              <li class="flex items-center gap-2 text-sm text-gray-600">
                <i class="fas fa-check-circle text-green-500"></i> Garantie
                Loyers Impayés (GLI)
              </li>
              <li class="flex items-center gap-2 text-sm text-gray-600">
                <i class="fas fa-check-circle text-green-500"></i> Assurance
                Propriétaire (PNO)
              </li>
            </ul>
            <button
              class="w-full py-4 bg-gray-50 text-[#E54801] font-bold rounded-2xl hover:bg-[#E54801] hover:text-white transition-all text-sm uppercase tracking-wide"
            >
              Demander un devis
            </button>
          </div>

          <!-- Legal Support -->
          <div
            class="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex flex-col hover:-translate-y-2 transition-transform duration-300"
          >
            <div
              class="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6"
            >
              <i class="fas fa-gavel text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">
              Gestion des Litiges
            </h3>
            <p class="text-gray-500 text-sm mb-6 flex-grow">
              Un problème avec un locataire ? Nos experts juridiques vous
              accompagnent dans la résolution.
            </p>
            <ul class="space-y-3 mb-8">
              <li class="flex items-center gap-2 text-sm text-gray-600">
                <i class="fas fa-check-circle text-green-500"></i> Médiation
                amiable
              </li>
              <li class="flex items-center gap-2 text-sm text-gray-600">
                <i class="fas fa-check-circle text-green-500"></i> Assistance
                Recouvrement
              </li>
            </ul>
            <button
              class="w-full py-4 bg-gray-50 text-blue-600 font-bold rounded-2xl hover:bg-blue-600 hover:text-white transition-all text-sm uppercase tracking-wide"
            >
              Ouvrir un dossier
            </button>
          </div>

          <!-- Personal Follow-up -->
          <div
            class="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex flex-col hover:-translate-y-2 transition-transform duration-300"
          >
            <div
              class="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6"
            >
              <i class="fas fa-user-tie text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">
              Suivi Personnalisé
            </h3>
            <p class="text-gray-500 text-sm mb-6 flex-grow">
              Un conseiller dédié pour optimiser votre patrimoine et vous aider
              dans vos démarches.
            </p>
            <ul class="space-y-3 mb-8">
              <li class="flex items-center gap-2 text-sm text-gray-600">
                <i class="fas fa-check-circle text-green-500"></i> Conseil en
                investissement
              </li>
              <li class="flex items-center gap-2 text-sm text-gray-600">
                <i class="fas fa-check-circle text-green-500"></i> Audit de vos
                contrats
              </li>
            </ul>
            <button
              class="w-full py-4 bg-gray-50 text-purple-600 font-bold rounded-2xl hover:bg-purple-600 hover:text-white transition-all text-sm uppercase tracking-wide"
            >
              RDV avec un conseiller
            </button>
          </div>
        </div>

        <!-- Documentation Section -->
        <div
          class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-12 animate-fadeIn"
          style="animation-delay: 0.3s"
        >
          <div
            class="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50"
          >
            <h2 class="text-xl font-bold text-gray-900">
              Bibliothèque de documents types
            </h2>
            <button
              class="text-sm font-semibold text-[#E54801] hover:underline"
            >
              Voir tout
            </button>
          </div>
          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-x divide-y divide-gray-50"
          >
            <div
              class="p-6 hover:bg-gray-50 transition-colors flex items-center gap-4 group cursor-pointer"
            >
              <div
                class="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform"
              >
                <i class="fas fa-file-pdf"></i>
              </div>
              <div>
                <h4
                  class="text-sm font-bold group-hover:text-[#E54801] transition-colors"
                >
                  Contrat de bail type
                </h4>
                <p class="text-[11px] text-gray-400 uppercase font-bold">
                  Mis à jour Jan. 2024
                </p>
              </div>
            </div>
            <div
              class="p-6 hover:bg-gray-50 transition-colors flex items-center gap-4 group cursor-pointer"
            >
              <div
                class="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform"
              >
                <i class="fas fa-file-word"></i>
              </div>
              <div>
                <h4
                  class="text-sm font-bold group-hover:text-[#E54801] transition-colors"
                >
                  Modèle de mise en demeure
                </h4>
                <p class="text-[11px] text-gray-400 uppercase font-bold">
                  Conforme loi 2023
                </p>
              </div>
            </div>
            <div
              class="p-6 hover:bg-gray-50 transition-colors flex items-center gap-4 group cursor-pointer"
            >
              <div
                class="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform"
              >
                <i class="fas fa-file-invoice"></i>
              </div>
              <div>
                <h4
                  class="text-sm font-bold group-hover:text-[#E54801] transition-colors"
                >
                  Quittance de loyer vierge
                </h4>
                <p class="text-[11px] text-gray-400 uppercase font-bold">
                  Prêt à l'emploi
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Emergency Contact -->
        <div
          class="bg-red-50 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-red-100 animate-fadeIn"
          style="animation-delay: 0.4s"
        >
          <div class="flex items-center gap-6">
            <div
              class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-red-600 shadow-sm animate-pulse"
            >
              <i class="fas fa-phone-volume text-2xl"></i>
            </div>
            <div>
              <h3 class="text-xl font-bold text-red-900 leading-tight">
                Besoin d'aide immédiate ?
              </h3>
              <p class="text-red-700 text-sm">
                Nos gestionnaires sont disponibles 7j/7 pour les urgences
                critiques.
              </p>
            </div>
          </div>
          <a
            href="tel:+237600000000"
            class="px-8 py-4 bg-red-600 text-white font-bold rounded-2xl hover:bg-red-700 transition-all shadow-lg text-center whitespace-nowrap hover:scale-105"
          >
            Appeler le +237 678 51 46 45
          </a>
        </div>
      </div>
    

  </DashboardLayout>
</template>

<script setup>
import { ref } from "vue";
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

