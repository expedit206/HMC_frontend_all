<template>
  <SharedProfileLayout title="Espace Client" subtitle="Gérez votre profil et suivez votre activité"
    roleLabel="Client Privilège" :form="form" :isSaving="isSaving" :saveMessage="saveMessage" @save="updateProfile">
    <template #badge-icon>
      <i class="fas fa-gem text-blue-500"></i>
    </template>

    <!-- Stats sous avatar -->
    <template #left-column-stats>
      <div class="grid grid-cols-2 gap-4 mt-6">
        <div class="text-center p-3 bg-gray-50 rounded-2xl border border-gray-100">
          <p class="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Favoris</p>
          <p class="text-xl font-black text-[#1B0B38]">8</p>
        </div>
        <div class="text-center p-3 bg-gray-50 rounded-2xl border border-gray-100">
          <p class="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Visites</p>
          <p class="text-xl font-black text-[#1B0B38]">3</p>
        </div>
      </div>
    </template>

    <!-- Menu rapide en bas à gauche -->
    <template #left-column-bottom>
      <div class="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center lg:text-left">
        <h3 class="text-xs font-black text-[#1B0B38] uppercase tracking-[0.2em] mb-4">Liens Rapides</h3>
        <div class="flex flex-col gap-3">
          <RouterLink to="/mes-favoris"
            class="p-4 bg-[#FAF9F5] rounded-2xl flex items-center justify-between hover:bg-[#E54801] hover:text-white transition-all group border border-gray-100">
            <div class="flex items-center gap-3">
              <i class="fas fa-heart text-[#E54801] group-hover:text-white"></i>
              <span class="text-sm font-bold">Mes Favoris</span>
            </div>
            <i class="fas fa-chevron-right text-xs"></i>
          </RouterLink>
          <RouterLink to="/mon-suivi"
            class="p-4 bg-[#FAF9F5] rounded-2xl flex items-center justify-between hover:bg-[#E54801] hover:text-white transition-all group border border-gray-100">
            <div class="flex items-center gap-3">
              <i class="fas fa-map-marker-alt text-[#E54801] group-hover:text-white"></i>
              <span class="text-sm font-bold">Mon Suivi de Location</span>
            </div>
            <i class="fas fa-chevron-right text-xs"></i>
          </RouterLink>
          <RouterLink to="/mes-demandes"
            class="p-4 bg-[#FAF9F5] rounded-2xl flex items-center justify-between hover:bg-[#E54801] hover:text-white transition-all group border border-gray-100">
            <div class="flex items-center gap-3">
              <i class="fas fa-file-alt text-[#E54801] group-hover:text-white"></i>
              <span class="text-sm font-bold">Mes Demandes</span>
            </div>
            <i class="fas fa-chevron-right text-xs"></i>
          </RouterLink>
        </div>
      </div>
    </template>

    <template #right-column-extra>
      <div class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <h3 class="text-xl font-bold text-[#1B0B38] mb-6">Mes Préférences de Recherche</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="p-5 bg-orange-50 rounded-2xl border border-orange-100 flex items-start gap-3">
            <div class="w-12 h-12 bg-[#E54801] rounded-2xl flex items-center justify-center flex-shrink-0">
              <i class="fas fa-home text-white text-xl"></i>
            </div>
            <div>
              <h4 class="font-bold text-[#1B0B38] mb-1">Type de bien recherché</h4>
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
    // Adapter selon le endpoint de modification de profil client si vous en avez un différent
    const { data } = await axios.put("/api/client/profile", form.value);
    if (data.success) {
      authStore.user = data.data;
      saveMessage.value = "Profil mis à jour avec succès !";
      setTimeout(() => (saveMessage.value = ""), 3000);
    }
  } catch (err) {
    console.warn("Mise à jour (Mode démo si api absente): ", form.value, err);
    saveMessage.value = "Modifications enregistrées (mode démo)";
    setTimeout(() => (saveMessage.value = ""), 3000);
  } finally {
    isSaving.value = false;
  }
};
</script>
