<template>
  <DashboardLayout>

      <div class="max-w-4xl mx-auto h-full">
 

        <!-- HEADER -->
        <div class="mb-8 animate-fadeIn">
          <h1 class="text-2xl font-bold text-[#1B0B38]">
            Paramètres du compte
          </h1>
          <p class="text-gray-500">
            Gérez vos informations personnelles et préférences
          </p>
        </div>

        <!-- TABS -->
        <div
          class="flex flex-wrap gap-2 mb-6 border-b border-gray-200 animate-slide-up"
        >
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'px-4 py-3 text-sm font-medium rounded-t-lg transition-colors',
              activeTab === tab.id
                ? 'bg-white border-x border-t border-gray-200 text-[#E54801] relative -mb-px'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50',
            ]"
          >
            <i :class="tab.icon" class="mr-2"></i>
            {{ tab.label }}
          </button>
        </div>

        <!-- CONTENT -->
        <div
          class="bg-white rounded-b-2xl rounded-tr-2xl shadow-sm border border-gray-200 p-6 sm:p-8 animate-slide-up"
          style="animation-delay: 0.1s"
        >
          <!-- PROFILE TAB -->
          <div v-if="activeTab === 'profile'" class="space-y-6">
            <div class="flex items-center gap-6">
              <div class="relative">
                <div
                  class="w-24 h-24 rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow-md"
                >
                  <img
                    src="https://ui-avatars.com/api/?name=John+Doe&background=E54801&color=fff"
                    alt="Avatar"
                    class="w-full h-full object-cover"
                  />
                </div>
                <button
                  class="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#E54801] shadow-sm"
                >
                  <i class="fas fa-camera text-xs"></i>
                </button>
              </div>
              <div>
                <h3 class="font-bold text-gray-900 text-lg">Photo de profil</h3>
                <p class="text-sm text-gray-500 mb-2">
                  JPG, PNG ou GIF. Max 2MB.
                </p>
                <div class="flex gap-2">
                  <button
                    class="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded transition-colors"
                  >
                    Changer
                  </button>
                  <button
                    class="px-3 py-1.5 text-red-500 hover:bg-red-50 text-xs font-medium rounded transition-colors"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>

            <hr class="border-gray-100" />

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Prénom</label
                >
                <input
                  type="text"
                  value="John"
                  class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E54801] text-gray-900"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Nom</label
                >
                <input
                  type="text"
                  value="Doe"
                  class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E54801] text-gray-900"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Email</label
                >
                <input
                  type="email"
                  value="john.doe@example.com"
                  class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E54801] text-gray-900"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Téléphone</label
                >
                <input
                  type="tel"
                  value="+237 6 99 99 99 99"
                  class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E54801] text-gray-900"
                />
              </div>
              <div class="sm:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Bio / Description</label
                >
                <textarea
                  rows="3"
                  class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E54801] text-gray-900 resize-none"
                >
Agent immobilier passionné avec 5 ans d'expérience sur le marché de Douala et Yaoundé.</textarea
                >
              </div>
            </div>

            <div class="flex justify-end pt-4">
              <button
                class="px-6 py-2 bg-[#E54801] text-white font-medium rounded-lg hover:bg-[#913327] transition shadow-md"
              >
                Enregistrer les modifications
              </button>
            </div>
          </div>

          <!-- SECURITY TAB -->
          <div v-if="activeTab === 'security'" class="space-y-6">
            <div>
              <h3 class="font-bold text-gray-900 mb-4">
                Changer le mot du passe
              </h3>
              <div class="space-y-4 max-w-md">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Mot de passe actuel</label
                  >
                  <input
                    type="password"
                    class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E54801]"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Nouveau mot de passe</label
                  >
                  <input
                    type="password"
                    class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E54801]"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2"
                    >Confirmer le nouveau mot de passe</label
                  >
                  <input
                    type="password"
                    class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E54801]"
                  />
                </div>
              </div>
            </div>

            <hr class="border-gray-100" />

            <div>
              <h3 class="font-bold text-gray-900 mb-4">
                Double authentification (2FA)
              </h3>
              <div
                class="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100"
              >
                <div>
                  <p class="font-medium text-gray-900">SMS / Email</p>
                  <p class="text-sm text-gray-500">
                    Recevez un code de sécurité lors de la connexion.
                  </p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" class="sr-only peer" />
                  <div
                    class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E54801]"
                  ></div>
                </label>
              </div>
            </div>

            <div class="flex justify-end pt-4">
              <button
                class="px-6 py-2 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition shadow-md"
              >
                Mettre à jour la sécurité
              </button>
            </div>
          </div>

          <!-- NOTIFICATIONS TAB -->
          <div v-if="activeTab === 'notifications'" class="space-y-6">
            <div>
              <h3 class="font-bold text-gray-900 mb-4">
                Préférences de notification
              </h3>
              <div class="space-y-4">
                <label
                  class="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <span class="text-gray-700 font-medium"
                    >Nouvelles missions</span
                  >
                  <input
                    type="checkbox"
                    checked
                    class="w-5 h-5 text-[#E54801] rounded focus:ring-[#E54801]"
                  />
                </label>
                <label
                  class="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <span class="text-gray-700 font-medium"
                    >Rappels de rendez-vous</span
                  >
                  <input
                    type="checkbox"
                    checked
                    class="w-5 h-5 text-[#E54801] rounded focus:ring-[#E54801]"
                  />
                </label>
                <label
                  class="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <span class="text-gray-700 font-medium"
                    >Nouveaux messages clients</span
                  >
                  <input
                    type="checkbox"
                    checked
                    class="w-5 h-5 text-[#E54801] rounded focus:ring-[#E54801]"
                  />
                </label>
                <label
                  class="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <span class="text-gray-700 font-medium"
                    >Actualités de la plateforme</span
                  >
                  <input
                    type="checkbox"
                    class="w-5 h-5 text-[#E54801] rounded focus:ring-[#E54801]"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    

  </DashboardLayout>
</template>

<script setup>
import { ref } from "vue";
import DashboardLayout from "../../layouts/DashboardLayout.vue";
const activeTab = ref("profile");

const tabs = [
  { id: "profile", label: "Profil", icon: "fas fa-user" },
  { id: "security", label: "Sécurité", icon: "fas fa-shield-alt" },
  { id: "notifications", label: "Notifications", icon: "fas fa-bell" },
  { id: "billing", label: "Abonnement", icon: "fas fa-credit-card" },
];
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

