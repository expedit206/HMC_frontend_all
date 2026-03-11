<template>
  <SharedAssistanceLayout title="Votre Compagnon Locatif"
    subtitle="Assurance, caution, assistance juridique et bien plus pour vivre serein"
    headerIcon="fa-hand-holding-heart" :faqs="faqs" :showContactParams="false"
    servicesGridClass="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
    <template #services>
      <!-- Assurance Garantie Loyer -->
      <div
        class="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-6 border border-blue-100 shadow-sm hover:shadow-lg transition-all group cursor-pointer">
        <div class="flex gap-5">
          <div
            class="w-14 h-14 bg-blue-100 text-[#913327] rounded-2xl flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform">
            <i class="fas fa-shield-alt"></i>
          </div>
          <div>
            <h3 class="text-lg font-bold text-[#1B0B38] mb-3">Assurance Garantie Loyer</h3>
            <p class="text-sm text-gray-500 mb-6">Protégez vos revenus en cas d'impayés</p>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-[#913327] bg-blue-50 px-3 py-1 rounded-full">À partir de 5.000
            XAF/mois</span>
          <i class="fas fa-arrow-right text-[#E54801] group-hover:translate-x-1 transition-transform"></i>
        </div>
      </div>

      <!-- Caution Digitale -->
      <div
        class="bg-gradient-to-br from-purple-50 to-white rounded-3xl p-6 border border-purple-100 shadow-sm hover:shadow-lg transition-all group cursor-pointer">
        <div class="flex gap-5">
          <div
            class="w-14 h-14 bg-purple-100 text-[#913327] rounded-2xl flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform">
            <i class="fas fa-lock"></i>
          </div>
          <div>
            <h3 class="text-lg font-bold text-[#1B0B38] mb-3">Caution Digitale</h3>
            <p class="text-sm text-gray-500 mb-6">Évitez le blocage de votre capital</p>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-[#913327] bg-purple-50 px-3 py-1 rounded-full">2,5% du loyer annuel</span>
          <i class="fas fa-arrow-right text-[#E54801] group-hover:translate-x-1 transition-transform"></i>
        </div>
      </div>

      <!-- Assistance Juridique -->
      <div
        class="bg-gradient-to-br from-green-50 to-white rounded-3xl p-6 border border-green-100 shadow-sm hover:shadow-lg transition-all group cursor-pointer">
        <div class="flex gap-5">
          <div
            class="w-14 h-14 bg-green-100 text-[#913327] rounded-2xl flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform">
            <i class="fas fa-balance-scale"></i>
          </div>
          <div>
            <h3 class="text-lg font-bold text-[#1B0B38] mb-3">Assistance Juridique</h3>
            <p class="text-sm text-gray-500 mb-6">Conseils et défense pour vos litiges</p>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-[#913327] bg-green-50 px-3 py-1 rounded-full">Premium</span>
          <i class="fas fa-arrow-right text-[#E54801] group-hover:translate-x-1 transition-transform"></i>
        </div>
      </div>

      <!-- Support 24/7 -->
      <div
        class="bg-gradient-to-br from-orange-50 to-white rounded-3xl p-6 border border-orange-100 shadow-sm hover:shadow-lg transition-all group cursor-pointer">
        <div class="flex gap-5">
          <div
            class="w-14 h-14 bg-orange-100 text-[#913327] rounded-2xl flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform">
            <i class="fas fa-headset"></i>
          </div>
          <div>
            <h3 class="text-lg font-bold text-[#1B0B38] mb-3">Support Urgence 24/7</h3>
            <p class="text-sm text-gray-500 mb-6">Urgences, dépannage, assistance</p>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-[#913327] bg-orange-50 px-3 py-1 rounded-full">Inclus Premium</span>
          <i class="fas fa-arrow-right text-[#E54801] group-hover:translate-x-1 transition-transform"></i>
        </div>
      </div>
    </template>

    <template #main-content>
      <!-- Contact Direct -->
      <div class="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mb-8">
        <div class="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h3 class="text-2xl font-bold text-[#1B0B38] mb-2">Contactez notre équipe</h3>
            <p class="text-gray-500">Nos experts sont disponibles pour vous aider</p>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-gray-50 rounded-2xl p-6">
            <div class="w-12 h-12 bg-[#E54801] text-white rounded-xl flex items-center justify-center text-lg mb-4">
              <i class="fas fa-comments"></i>
            </div>
            <h4 class="font-bold text-gray-800 mb-2">Chat en direct</h4>
            <p class="text-sm text-gray-500 mb-4">Réponse immédiate pour vos questions simples</p>
            <button
              class="w-full py-3 bg-[#E54801] text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#913327] transition-all">
              Démarrer un chat
            </button>
          </div>
          <div class="bg-gray-50 rounded-2xl p-6">
            <div class="w-12 h-12 bg-[#1B0B38] text-white rounded-xl flex items-center justify-center text-lg mb-4">
              <i class="fas fa-phone"></i>
            </div>
            <h4 class="font-bold text-gray-800 mb-2">Appel téléphonique</h4>
            <p class="text-sm text-gray-500 mb-4">Pour les urgences et questions complexes</p>
            <a href="tel:+237600000000"
              class="block w-full py-3 bg-[#1B0B38] text-white text-center rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#E54801] transition-all">
              Appeler maintenant
            </a>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="bg-gradient-to-r from-[#E54801] to-[#913327] rounded-3xl p-12 text-white shadow-xl text-center">
        <h3 class="text-3xl font-bold mb-4">Besoin d'une solution sur mesure ?</h3>
        <p class="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
          Notre équipe d'experts peut vous proposer un package personnalisé selon vos besoins spécifiques.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            class="px-8 py-4 bg-white text-[#E54801] rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-gray-100 transition-all">
            Demander un devis
          </button>
          <button
            class="px-8 py-4 bg-transparent border-2 border-white text-white rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all">
            <i class="fas fa-calendar-alt mr-2"></i> Prendre RDV
          </button>
        </div>
      </div>
    </template>

    <template #sidebar-content>
      <!-- Stats & Info -->
      <div class="bg-[#1B0B38] text-white rounded-3xl p-8 shadow-xl">
        <h3 class="text-2xl font-bold mb-8">Nos chiffres</h3>
        <div class="space-y-6">
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-gray-300 text-sm">Tickets résolus</span>
              <span class="text-2xl font-bold">98%</span>
            </div>
            <div class="w-full bg-gray-700 rounded-full h-2">
              <div class="bg-green-500 h-2 rounded-full" style="width: 98%"></div>
            </div>
          </div>
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-gray-300 text-sm">Temps moyen réponse</span>
              <span class="text-2xl font-bold">2h</span>
            </div>
            <div class="w-full bg-gray-700 rounded-full h-2">
              <div class="bg-blue-500 h-2 rounded-full" style="width: 90%"></div>
            </div>
          </div>
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-gray-300 text-sm">Satisfaction clients</span>
              <span class="text-2xl font-bold">4.8/5</span>
            </div>
            <div class="w-full bg-gray-700 rounded-full h-2">
              <div class="bg-yellow-500 h-2 rounded-full" style="width: 96%"></div>
            </div>
          </div>
        </div>
        <div class="mt-8 pt-6 border-t border-white/10">
          <p class="text-gray-300 text-sm">
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
    open: false,
  },
  {
    question: "Que couvre l'assurance garantie loyer ?",
    answer: "Cette assurance protège votre bailleur contre les impayés de loyer pendant 18 mois maximum. Elle inclut également la garantie des dégâts locatifs, la protection juridique et une assistance.",
    open: false,
  },
  {
    question: "Comment bénéficier de l'assistance juridique ?",
    answer: "Notre assistance juridique est disponible pour tous les locataires premium. Elle comprend des conseils téléphoniques et de l'aide à la rédaction de courriers.",
    open: false,
  },
  {
    question: "Que faire en cas d'urgence dans mon logement ?",
    answer: "Pour les urgences, appelez le +237 600 000 000. Un professionnel est dépêché dans les 2 heures.",
    open: false,
  },
]);
</script>
