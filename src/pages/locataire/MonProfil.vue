<template>
  <SharedProfileLayout title="Mon Profil Personnel"
    subtitle="Gérez vos informations, votre sécurité et votre dossier locatif" roleLabel="Locataire Premium"
    :form="form" :isSaving="isSaving" :saveMessage="saveMessage" @save="updateProfile">
    <!-- Badge couronné pour le Locataire Premium -->
    <template #badge-icon>
      <i class="fas fa-crown text-[#913327]"></i>
    </template>

    <!-- Score Locatif sous l'avatar -->
    <template #left-column-bottom>
      <div class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-bold text-[#1B0B38]">Score Locatif HMC</h3>
          <i class="fas fa-chart-line text-[#E54801] text-xl"></i>
        </div>

        <div class="relative w-40 h-40 mx-auto mb-6">
          <svg class="w-full h-full" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" stroke="#E5E7EB" stroke-width="8" fill="transparent" />
            <circle cx="50" cy="50" r="45" stroke="#E54801" stroke-width="8" fill="transparent" stroke-dasharray="283"
              stroke-dashoffset="56" stroke-linecap="round" transform="rotate(-90 50 50)" />
          </svg>
          <div class="absolute inset-0 flex flex-col items-center justify-center">
            <span class="text-5xl font-black text-[#E54801]">8.5</span>
            <span class="text-xs font-bold text-gray-400">/10</span>
          </div>
        </div>

        <div class="text-center">
          <p class="text-sm text-gray-500 mb-4">
            Votre score vous place dans le <span class="font-bold text-[#E54801]">top 15%</span> des locataires
          </p>
          <button
            class="w-full py-4 bg-[#1B0B38] text-white font-bold rounded-2xl hover:bg-[#E54801] transition-colors shadow-md">
            Améliorer mon score
          </button>
        </div>
      </div>
    </template>

    <!-- Gestion des rôles, Préférences et Stats à droite -->
    <template #right-column-extra>
      <!-- Gestion des Rôles -->
      <div class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-bold text-[#1B0B38]">Gestion des Rôles & Multi-comptes</h3>
          <i class="fas fa-users-cog text-[#E54801] text-xl"></i>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Rôle Bailleur -->
          <div
            :class="['p-5 rounded-2xl border transition-all flex items-center justify-between gap-3', authStore.availableRoles.includes('bailleur') ? 'bg-green-50 border-green-100' : 'bg-gray-50 border-gray-100']">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                <i class="fas fa-hand-holding-heart text-[#E54801]"></i>
              </div>
              <div>
                <p class="font-bold text-sm text-[#1B0B38]">Compte Bailleur</p>
                <p class="text-[10px] text-gray-500">Pour louer vos biens</p>
              </div>
            </div>
            <div v-if="authStore.availableRoles.includes('bailleur')" class="text-green-600">
              <i class="fas fa-check-circle"></i>
            </div>
            <button v-else @click="handleAcquireRole('bailleur')"
              class="px-3 py-1.5 bg-[#E54801] text-white text-[10px] font-bold rounded-lg hover:bg-[#913327] transition-all">
              Activer
            </button>
          </div>

          <!-- Rôle Prestataire -->
          <div
            :class="['p-5 rounded-2xl border transition-all flex items-center justify-between gap-3', authStore.availableRoles.includes('prestataire') ? 'bg-green-50 border-green-100' : 'bg-gray-50 border-gray-100']">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                <i class="fas fa-tools text-[#E54801]"></i>
              </div>
              <div>
                <p class="font-bold text-sm text-[#1B0B38]">Compte Prestataire</p>
                <p class="text-[10px] text-gray-500">Pour proposer services</p>
              </div>
            </div>
            <div v-if="authStore.availableRoles.includes('prestataire')" class="text-green-600">
              <i class="fas fa-check-circle"></i>
            </div>
            <button v-else @click="handleAcquireRole('prestataire')"
              class="px-3 py-1.5 bg-[#E54801] text-white text-[10px] font-bold rounded-lg hover:bg-[#913327] transition-all">
              Activer
            </button>
          </div>

          <!-- Rôle Agent -->
          <div
            :class="['p-5 rounded-2xl border transition-all flex items-center justify-between gap-3', authStore.availableRoles.includes('agent') ? 'bg-green-50 border-green-100' : 'bg-gray-50 border-gray-100']">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                <i class="fas fa-user-tie text-[#E54801]"></i>
              </div>
              <div>
                <p class="font-bold text-sm text-[#1B0B38]">Compte Agent</p>
                <p class="text-[10px] text-gray-500">Gérer des biens</p>
              </div>
            </div>
            <div v-if="authStore.availableRoles.includes('agent')" class="text-green-600">
              <i class="fas fa-check-circle"></i>
            </div>
            <button v-else @click="handleAcquireRole('agent')"
              class="px-3 py-1.5 bg-[#E54801] text-white text-[10px] font-bold rounded-lg hover:bg-[#913327] transition-all">
              Activer
            </button>
          </div>
        </div>
      </div>

      <!-- Mes Préférences -->
      <div class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <h3 class="text-xl font-bold text-[#1B0B38] mb-6">Mes Préférences</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="p-5 bg-orange-50 rounded-2xl border border-orange-100 flex items-start gap-3">
            <div class="w-12 h-12 bg-[#E54801] rounded-2xl flex items-center justify-center flex-shrink-0">
              <i class="fas fa-home text-white text-xl"></i>
            </div>
            <div>
              <h4 class="font-bold text-[#1B0B38] mb-1">Type de logement</h4>
              <p class="text-sm text-gray-500">Appartement, Villa</p>
            </div>
          </div>
          <div class="p-5 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-3">
            <div class="w-12 h-12 bg-[#1B0B38] rounded-2xl flex items-center justify-center flex-shrink-0">
              <i class="fas fa-city text-white text-xl"></i>
            </div>
            <div>
              <h4 class="font-bold text-[#1B0B38] mb-1">Villes préférées</h4>
              <p class="text-sm text-gray-500">Yaoundé, Douala</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-white p-4 rounded-2xl text-center shadow-sm border border-gray-100">
          <p class="text-2xl font-black text-[#1B0B38]">24</p>
          <p class="text-[10px] font-bold text-gray-400 uppercase">Visites</p>
        </div>
        <div class="bg-white p-4 rounded-2xl text-center shadow-sm border border-gray-100">
          <p class="text-2xl font-black text-[#1B0B38]">8</p>
          <p class="text-[10px] font-bold text-gray-400 uppercase">Favoris</p>
        </div>
        <div class="bg-white p-4 rounded-2xl text-center shadow-sm border border-gray-100">
          <p class="text-2xl font-black text-[#1B0B38]">3</p>
          <p class="text-[10px] font-bold text-gray-400 uppercase">Demandes</p>
        </div>
        <div class="bg-white p-4 rounded-2xl text-center shadow-sm border border-gray-100">
          <p class="text-2xl font-black text-green-600">Top</p>
          <p class="text-[10px] font-bold text-gray-400 uppercase">Statut</p>
        </div>
      </div>
    </template>
  </SharedProfileLayout>
</template>

<script setup>
import { ref } from "vue";
import SharedProfileLayout from "../../components/profile/SharedProfileLayout.vue";
import { useAuthStore } from "../../stores/auth";
import axios from "../../axios";

const authStore = useAuthStore();
const form = ref({
  name: authStore.user?.name || "",
  email: authStore.user?.email || "",
  phone: authStore.user?.phone || "",
  city: authStore.user?.city || "",
});

const isSaving = ref(false);
const saveMessage = ref("");

const updateProfile = async () => {
  if (!form.value.name) return;

  isSaving.value = true;
  saveMessage.value = "";
  try {
    const { data } = await axios.put("/api/tenant/profile", form.value);
    if (data.success) {
      authStore.user = data.data;
      saveMessage.value = "Profil mis à jour avec succès !";
      setTimeout(() => (saveMessage.value = ""), 3000);
    }
  } catch (err) {
    console.error("Erreur mise à jour profil:", err);
    alert(err.response?.data?.message || "Une erreur est survenue.");
  } finally {
    isSaving.value = false;
  }
};

const handleAcquireRole = async (role) => {
  if (confirm(`Voulez-vous vraiment activer le rôle ${role} sur votre compte ?`)) {
    isSaving.value = true;
    try {
      const success = await authStore.acquireRole(role);
      if (success) {
        saveMessage.value = `Félicitations ! Le rôle ${role} est activé.`;
        setTimeout(() => (saveMessage.value = ""), 5000);
      }
    } catch (err) {
      console.error("Erreur acquisition rôle:", err);
    } finally {
      isSaving.value = false;
    }
  }
};
</script>
