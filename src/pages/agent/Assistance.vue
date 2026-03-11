<template>
  <SharedAssistanceLayout title="Assistance et Support 24/7"
    subtitle="Nous vous accompagnons à chaque étape de votre carrière avec des outils, des formations et une assistance personnalisée."
    headerIcon="fa-headset" :faqs="faqs" :showContactParams="false">
    <!-- HERO SECTION -->
    <template #hero>
      <div class="text-center mb-14 animate-fadeIn">
        <div
          class="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#E54801] to-[#913327] mb-6 shadow-lg">
          <i class="fas fa-headset text-4xl text-white"></i>
        </div>
        <h1 class="text-3xl sm:text-4xl font-bold text-[#1B0B38] mb-3">
          Assistance et Support 24/7
        </h1>
        <p class="text-gray-600 max-w-2xl mx-auto text-lg">
          Nous vous accompagnons à chaque étape de votre carrière avec des outils, des formations et une assistance
          personnalisée.
        </p>
      </div>
    </template>

    <template #services>
      <!-- SERVICE 1: GARANTIE FINANCIÈRE -->
      <div
        class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 flex flex-col hover:-translate-y-2 hover:shadow-lg transition-all duration-300">
        <div
          class="w-[60px] h-[60px] flex items-center justify-center rounded-2xl bg-[#E54801]/10 text-[#E54801] text-2xl mb-6">
          <i class="fas fa-shield-alt"></i>
        </div>
        <h3 class="text-xl font-bold text-[#1B0B38] mb-3">Garantie Financière</h3>
        <p class="text-gray-600 mb-6 flex-grow">
          Protégez vos transactions avec une garantie financière conforme aux normes camerounaises et une couverture RC
          Pro complète.
        </p>
        <button class="w-full py-3 bg-[#E54801] text-white rounded-lg font-semibold hover:bg-[#913327] transition">
          <i class="fas fa-file-pdf mr-2"></i> Demander une attestation
        </button>
      </div>

      <!-- SERVICE 2: EXPERTISE JURIDIQUE -->
      <div
        class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 flex flex-col hover:-translate-y-2 hover:shadow-lg transition-all duration-300">
        <div
          class="w-[60px] h-[60px] flex items-center justify-center rounded-2xl bg-blue-50 text-blue-600 text-2xl mb-6">
          <i class="fas fa-gavel"></i>
        </div>
        <h3 class="text-xl font-bold text-[#1B0B38] mb-3">Expertise Juridique</h3>
        <p class="text-gray-600 mb-6 flex-grow">
          Consultez nos juristes spécialisés en immobilier pour des conseils sur vos contrats, mandats et litiges.
        </p>
        <button class="w-full py-3 bg-[#E54801] text-white rounded-lg font-semibold hover:bg-[#913327] transition">
          <i class="fas fa-video mr-2"></i> Contacter un juriste
        </button>
      </div>

      <!-- SERVICE 3: FORMATIONS CONTINUES -->
      <div
        class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 flex flex-col hover:-translate-y-2 hover:shadow-lg transition-all duration-300">
        <div
          class="w-[60px] h-[60px] flex items-center justify-center rounded-2xl bg-purple-50 text-purple-600 text-2xl mb-6">
          <i class="fas fa-graduation-cap"></i>
        </div>
        <h3 class="text-xl font-bold text-[#1B0B38] mb-3">Formations Continues</h3>
        <p class="text-gray-600 mb-6 flex-grow">
          Restez à jour avec nos webinaires mensuels sur les nouvelles tendances et techniques immobilières.
        </p>
        <button class="w-full py-3 bg-[#E54801] text-white rounded-lg font-semibold hover:bg-[#913327] transition">
          <i class="fas fa-calendar-check mr-2"></i> Voir les formations
        </button>
      </div>
    </template>

    <template #main-content>
      <!-- SECONDARY SERVICES -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14 animate-slide-up" style="animation-delay: 0.1s">
        <!-- SERVICE 4: OUTILS CRM -->
        <div class="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <div class="flex items-start justify-between mb-4">
            <div>
              <h3 class="text-xl font-bold text-[#1B0B38] mb-2">Outils CRM Exclusifs</h3>
              <p class="text-gray-600">Gérez vos contacts, notes et suivis de transactions facilement.</p>
            </div>
            <div class="text-4xl text-[#E54801]">
              <i class="fas fa-laptop"></i>
            </div>
          </div>
        </div>

        <!-- SERVICE 5: SUPPORT MARKETING -->
        <div class="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <div class="flex items-start justify-between mb-4">
            <div>
              <h3 class="text-xl font-bold text-[#1B0B38] mb-2">Support Marketing</h3>
              <p class="text-gray-600">Amplifiez votre présence avec nos outils et stratégies marketing.</p>
            </div>
            <div class="text-4xl text-purple-600">
              <i class="fas fa-bullhorn"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- PERSONALIZED SUPPORT SECTION -->
      <div
        class="bg-gradient-to-r from-[#E54801] to-[#913327] rounded-2xl shadow-lg p-8 sm:p-12 text-white text-center mb-14 animate-slide-up"
        style="animation-delay: 0.2s">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-6">
          <i class="fas fa-star text-3xl"></i>
        </div>
        <h2 class="text-2xl sm:text-3xl font-bold mb-4">Besoin d'un Suivi Personnel ?</h2>
        <p class="mb-8 text-white/90 max-w-2xl mx-auto text-lg">
          Un manager de réseau dédié pour débloquer les dossiers complexes, optimiser votre stratégie commerciale et
          accélérer votre croissance.
        </p>
        <button
          class="inline-flex items-center justify-center px-8 py-4 bg-white text-[#E54801] rounded-xl font-bold hover:bg-gray-100 transition shadow-lg transform hover:-translate-y-1">
          <i class="fas fa-calendar-check mr-3"></i> Prenez rendez-vous avec un Manager
        </button>
      </div>

      <!-- CHAT SUPPORT PREVIEW -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-slide-up"
        style="animation-delay: 0.4s">
        <div class="bg-gradient-to-r from-[#E54801] to-[#913327] text-white p-6 sm:p-8">
          <h3 class="text-2xl font-bold mb-2">Besoin d'aide immédiate ?</h3>
          <p class="text-white/90">Nos agents sont disponibles en ligne 24/7</p>
        </div>
        <div class="p-6 sm:p-8 space-y-4">
          <div class="flex justify-start animate-fadeIn">
            <div class="max-w-xs bg-gray-100 rounded-lg p-4">
              <p class="text-sm text-gray-700">Bonjour 👋 Comment puis-je vous aider aujourd'hui ?</p>
            </div>
          </div>
          <div class="flex justify-end animate-fadeIn" style="animation-delay: 0.1s">
            <div class="max-w-xs bg-[#E54801] text-white rounded-lg p-4">
              <p class="text-sm">Je souhaite obtenir mon attestation de garantie</p>
            </div>
          </div>
          <div class="flex justify-start animate-fadeIn" style="animation-delay: 0.2s">
            <div class="max-w-xs bg-gray-100 rounded-lg p-4">
              <p class="text-sm text-gray-700">Pas de souci ! Je vous prépare cela maintenant.</p>
            </div>
          </div>
          <div class="mt-6 flex gap-2">
            <input type="text" placeholder="Tapez votre message..."
              class="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E54801]" />
            <button class="px-6 py-3 bg-[#E54801] text-white rounded-lg font-semibold hover:bg-[#913327]">
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </template>
  </SharedAssistanceLayout>
</template>

<script setup>
import { reactive } from "vue";
import SharedAssistanceLayout from "../../components/support/SharedAssistanceLayout.vue";

const faqs = reactive([
  {
    question: "Comment obtenir mon attestation de garantie ?",
    answer: "Cliquez sur 'Demander une attestation'. Notre équipe traitera votre demande dans les 24h et vous enverra directement votre attestation par email.",
    isOpen: false,
  },
  {
    question: "La consultation juridique est-elle vraiment gratuite ?",
    answer: "Oui, jusqu'à 2h de consultation par mois sont comprises dans votre adhésion. Les heures supplémentaires sont facturées à prix réduit.",
    isOpen: false,
  },
  {
    question: "Quand ont lieu les webinaires de formation ?",
    answer: "Les webinaires ont lieu tous les deuxièmes jeudis du mois à 18h. Vous recevrez des invitations par email et pourrez accéder aux replays.",
    isOpen: false,
  },
  {
    question: "Comment accéder au CRM ?",
    answer: "Accédez via votre dashboard dans la section 'Outils'. Une formation de 30 minutes vous sera proposée lors de votre première connexion.",
    isOpen: false,
  },
  {
    question: "Puis-je contacter un manager à tout moment ?",
    answer: "Oui, vous avez accès à un manager 24/7 via chat, email ou appel vidéo. Réponse garantie dans les 2h.",
    isOpen: false,
  },
]);
</script>
