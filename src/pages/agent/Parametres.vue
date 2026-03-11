<template>
  <SharedParametresLayout title="Paramètres du compte" subtitle="Gérez vos informations personnelles et préférences"
    :tabs="tabs" defaultTab="profile" :defaultNotificationPrefs="agentNotificationPrefs">
    <!-- PROFILE TAB -->
    <template #profile>
      <div class="space-y-6">
        <div class="flex items-center gap-6 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-50">
          <div class="relative">
            <div class="w-24 h-24 rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow-md">
              <img src="https://ui-avatars.com/api/?name=John+Doe&background=E54801&color=fff" alt="Avatar"
                class="w-full h-full object-cover" />
            </div>
            <button
              class="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#E54801] shadow-sm">
              <i class="fas fa-camera text-xs"></i>
            </button>
          </div>
          <div>
            <h3 class="font-bold text-gray-900 text-lg">Photo de profil</h3>
            <p class="text-sm text-gray-500 mb-2">JPG, PNG ou GIF. Max 2MB.</p>
            <div class="flex gap-2">
              <button
                class="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded transition-colors">Changer</button>
              <button
                class="px-3 py-1.5 text-red-500 hover:bg-red-50 text-xs font-medium rounded transition-colors">Supprimer</button>
            </div>
          </div>
        </div>

        <div class="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-50">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-bold text-[#1B0B38] mb-2">Prénom</label>
              <input type="text" value="John"
                class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E54801] text-gray-900" />
            </div>
            <div>
              <label class="block text-sm font-bold text-[#1B0B38] mb-2">Nom</label>
              <input type="text" value="Doe"
                class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E54801] text-gray-900" />
            </div>
            <div>
              <label class="block text-sm font-bold text-[#1B0B38] mb-2">Email</label>
              <input type="email" value="john.doe@example.com"
                class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E54801] text-gray-900" />
            </div>
            <div>
              <label class="block text-sm font-bold text-[#1B0B38] mb-2">Téléphone</label>
              <input type="tel" value="+237 6 99 99 99 99"
                class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E54801] text-gray-900" />
            </div>
            <div class="sm:col-span-2">
              <label class="block text-sm font-bold text-[#1B0B38] mb-2">Bio / Description</label>
              <textarea rows="3"
                class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E54801] text-gray-900 resize-none">Agent immobilier passionné avec 5 ans d'expérience sur le marché de Douala et Yaoundé.</textarea>
            </div>
          </div>
          <div class="flex justify-end pt-6">
            <button
              class="px-6 py-3 bg-[#E54801] text-white font-bold rounded-xl hover:bg-[#913327] transition shadow-md">Enregistrer
              les modifications</button>
          </div>
        </div>
      </div>
    </template>

    <!-- BILLING TAB (Abonnement) -->
    <template #billing>
      <div class="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-50">
        <h2 class="text-lg font-bold text-[#1B0B38] mb-6 flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <i class="fas fa-credit-card"></i>
          </div>
          Mon Abonnement Actuel
        </h2>
        <div class="p-6 border border-purple-100 bg-purple-50 rounded-2xl flex items-center justify-between">
          <div>
            <p class="font-bold text-lg text-[#1B0B38]">Plan PRO</p>
            <p class="text-sm text-gray-600">Prochain prélèvement le 15 Janvier 2025</p>
          </div>
          <span
            class="px-3 py-1 bg-white text-purple-600 font-bold rounded-full text-xs shadow-sm shadow-purple-200">Actif</span>
        </div>
        <div class="pt-6 flex justify-end">
          <button
            class="px-6 py-3 bg-white border border-[#E54801] text-[#E54801] font-bold rounded-xl hover:bg-orange-50 transition shadow-sm">
            Gérer mon abonnement
          </button>
        </div>
      </div>
    </template>

  </SharedParametresLayout>
</template>

<script setup>
import { reactive } from "vue";
import SharedParametresLayout from "../../components/settings/SharedParametresLayout.vue";

const tabs = [
  { id: "profile", label: "Profil" },
  { id: "security", label: "Sécurité" },
  { id: "notifications", label: "Notifications" },
  { id: "billing", label: "Abonnement" },
];

const agentNotificationPrefs = reactive({
  missions: { checked: true, title: "Nouvelles missions", desc: "Alerte pour de nouveaux biens assignés" },
  rdv: { checked: true, title: "Rappels de rendez-vous", desc: "Notification 24h avant une visite" },
  messages: { checked: true, title: "Nouveaux messages clients", desc: "Avertissement lors de réception de messages" },
  news: { checked: false, title: "Actualités de la plateforme", desc: "Mises à jour et nouvelles fonctionnalités" }
});
</script>
