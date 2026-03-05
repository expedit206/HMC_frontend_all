<template>
  <DashboardLayout>

    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6 animate-fadeIn">
        <div>
          <h1 class="text-4xl font-black text-[#1B0B38] leading-tight">
            Profil Bailleur
          </h1>
          <p class="text-gray-500 text-sm mt-2">
            Gérez votre compte, vos paramètres et suivez vos performances
          </p>
        </div>
        <div class="flex gap-3 items-center w-full lg:w-auto justify-between lg:justify-end">
          <!-- Mobile Menu Button -->
          <button @click="mobileMenuOpen = !mobileMenuOpen"
            class="lg:hidden p-2 text-gray-500 hover:text-[#E54801] transition-colors">
            <i class="fas fa-bars text-xl"></i>
          </button>

          <div class="flex gap-3">
            <button
              class="px-6 py-3 bg-white border border-gray-200 text-gray-600 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center gap-3">
              <i class="fas fa-download"></i>
              <span class="hidden sm:inline">Exporter</span>
            </button>
            <button
              class="px-6 py-3 bg-[#E54801] text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-[#913327] transition-all flex items-center gap-3 shadow-md">
              <i class="fas fa-plus"></i>
              <span class="hidden sm:inline">Nouveau Bien</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Stats Overview -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 animate-fadeIn"
        style="animation-delay: 0.1s">
        <div
          class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:-translate-y-1 transition-transform duration-300">
          <div class="flex justify-between items-start mb-4">
            <div>
              <p class="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-1">
                Valeur Patrimoine
              </p>
              <p class="text-2xl font-black text-[#1B0B38]">
                {{ stats.total_value }} XAF
              </p>
            </div>
            <div class="w-10 h-10 bg-[#FAF9F5] text-[#E54801] rounded-xl flex items-center justify-center">
              <i class="fas fa-landmark"></i>
            </div>
          </div>
          <p class="text-[10px] text-gray-500">Estimé par HMC</p>
        </div>

        <div
          class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:-translate-y-1 transition-transform duration-300">
          <div class="flex justify-between items-start mb-4">
            <div>
              <p class="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-1">
                Revenu Mensuel
              </p>
              <p class="text-2xl font-black text-[#1B0B38]">
                {{ formatPrice(stats.monthly_revenue) }} XAF
              </p>
            </div>
            <div class="w-10 h-10 bg-[#FAF9F5] text-[#E54801] rounded-xl flex items-center justify-center">
              <i class="fas fa-money-bill-wave"></i>
            </div>
          </div>
          <p class="text-[10px] text-gray-500">Flux de trésorerie actuel</p>
        </div>

        <div
          class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:-translate-y-1 transition-transform duration-300">
          <div class="flex justify-between items-start mb-4">
            <div>
              <p class="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-1">
                Taux Occupation
              </p>
              <p class="text-2xl font-black text-[#1B0B38]">
                {{ stats.occupancy_rate }}%
              </p>
            </div>
            <div class="w-10 h-10 bg-[#FAF9F5] text-[#E54801] rounded-xl flex items-center justify-center">
              <i class="fas fa-chart-line"></i>
            </div>
          </div>
          <div class="h-1.5 w-full bg-gray-100 rounded-full mt-2 overflow-hidden">
            <div class="h-full bg-gradient-to-r from-[#E54801] to-[#913327] rounded-full transition-all duration-1000"
              :style="{ width: stats.occupancy_rate + '%' }"></div>
          </div>
        </div>

        <div
          class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:-translate-y-1 transition-transform duration-300">
          <div class="flex justify-between items-start mb-4">
            <div>
              <p class="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-1">
                Biens Publiés
              </p>
              <div class="flex items-center gap-2">
                <p class="text-2xl font-black text-[#1B0B38]">
                  {{ stats.property_count }}
                </p>
              </div>
            </div>
            <div class="w-10 h-10 bg-[#FAF9F5] text-[#E54801] rounded-xl flex items-center justify-center">
              <i class="fas fa-building"></i>
            </div>
          </div>
          <p class="text-[10px] text-gray-500">Sous gestion</p>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn" style="animation-delay: 0.2s">
        <!-- Left Column: Profile Info -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Loading State -->
          <div v-if="isLoading" class="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
            <i class="fas fa-circle-notch fa-spin text-3xl text-[#E54801] mb-2"></i>
            <p class="font-bold uppercase text-[10px] tracking-widest">
              Chargement du profil...
            </p>
          </div>

          <!-- Profile Header -->
          <div v-else class="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <div class="flex flex-col md:flex-row gap-8 items-center">
              <div class="relative group cursor-pointer">
                <div
                  class="w-32 h-32 rounded-3xl bg-gradient-to-br from-[#E54801] to-[#913327] text-white flex items-center justify-center text-4xl font-black border-4 border-white shadow-2xl group-hover:scale-105 transition-transform">
                  {{ userInitials }}
                </div>
                <button
                  class="absolute -bottom-2 -right-2 w-10 h-10 bg-[#1B0B38] text-white rounded-xl flex items-center justify-center border-4 border-white shadow-lg group-hover:scale-110 transition-transform">
                  <i class="fas fa-camera text-sm"></i>
                </button>
              </div>
              <div class="flex-1 text-center md:text-left w-full">
                <div class="flex flex-col md:flex-row justify-between items-center md:items-start mb-4 gap-4">
                  <div>
                    <h2 class="text-3xl font-black text-[#1B0B38] leading-tight">
                      {{ authStore.user?.name }}
                    </h2>
                    <p class="text-gray-500 font-black uppercase tracking-[0.2em] text-[10px] mt-1 opacity-60">
                      Bailleur HMC • Certifié
                    </p>
                  </div>
                </div>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div class="text-center p-3 bg-gray-50 rounded-2xl">
                    <p class="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-1">
                      Biens
                    </p>
                    <p class="text-lg font-black text-[#1B0B38]">
                      {{ stats.property_count }}
                    </p>
                  </div>
                  <div class="text-center p-3 bg-gray-50 rounded-2xl">
                    <p class="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-1">
                      Taux Occ.
                    </p>
                    <p class="text-lg font-black text-[#1B0B38]">
                      {{ stats.occupancy_rate }}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Formulaire de modification -->
          <div v-if="!isLoading" class="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <div class="flex justify-between items-center mb-8">
              <h3 class="text-xs font-black text-[#1B0B38] uppercase tracking-[0.2em]">
                Informations du Compte
              </h3>
              <span v-if="saveMessage" class="text-[10px] font-bold text-green-600 uppercase">{{ saveMessage }}</span>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-[9px] text-gray-400 font-black uppercase tracking-widest mb-2">Nom
                  Complet</label>
                <input v-model="form.name" type="text"
                  class="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-bold text-[#1B0B38] focus:ring-2 focus:ring-[#E54801]/20 outline-none transition-all" />
              </div>
              <div>
                <label
                  class="block text-[9px] text-gray-400 font-black uppercase tracking-widest mb-2">Téléphone</label>
                <input v-model="form.phone" type="text"
                  class="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-bold text-[#1B0B38] focus:ring-2 focus:ring-[#E54801]/20 outline-none transition-all" />
              </div>
              <div>
                <label class="block text-[9px] text-gray-400 font-black uppercase tracking-widest mb-2">Ville de
                  Résidence</label>
                <input v-model="form.city" type="text"
                  class="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-bold text-[#1B0B38] focus:ring-2 focus:ring-[#E54801]/20 outline-none transition-all" />
              </div>
              <div class="md:col-span-2">
                <label class="block text-[9px] text-gray-400 font-black uppercase tracking-widest mb-2">Ma Bio /
                  Présentation</label>
                <textarea v-model="form.bio" rows="4"
                  class="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-bold text-[#1B0B38] focus:ring-2 focus:ring-[#E54801]/20 outline-none transition-all"></textarea>
              </div>
            </div>

            <div class="mt-8 flex justify-end">
              <button @click="updateProfile" :disabled="isSaving"
                class="px-8 py-3 bg-[#1B0B38] text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-[#E54801] transition-all flex items-center gap-2">
                <i v-if="isSaving" class="fas fa-circle-notch fa-spin"></i>
                {{
                  isSaving
                    ? "Enregistrement..."
                    : "Enregistrer les modifications"
                }}
              </button>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <h3 class="text-xs font-black text-[#1B0B38] uppercase tracking-[0.2em] mb-6">
              Actions Rapides
            </h3>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <button v-for="(action, idx) in quickActions" :key="idx"
                class="p-4 bg-[#FAF9F5] rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-[#E54801] hover:text-white transition-all group">
                <div
                  class="w-12 h-12 bg-white text-[#E54801] rounded-xl flex items-center justify-center group-hover:bg-white group-hover:text-[#E54801] shadow-sm">
                  <i :class="action.icon"></i>
                </div>
                <span class="text-[10px] font-bold uppercase tracking-widest text-center">{{ action.label }}</span>
              </button>
            </div>
          </div>

          <!-- Informations Personnelles -->
          <div class="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <div class="flex justify-between items-center mb-8">
              <h3 class="text-xs font-black text-[#1B0B38] uppercase tracking-[0.2em]">
                Informations Personnelles
              </h3>
              <button
                class="w-8 h-8 rounded-lg bg-[#FAF9F5] text-[#E54801] flex items-center justify-center hover:bg-[#E54801] hover:text-white transition-all">
                <i class="fas fa-pen text-[10px]"></i>
              </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label class="block text-[9px] text-gray-400 font-black uppercase tracking-widest mb-2">Nom
                  Complet</label>
                <p class="text-sm font-black text-[#1B0B38]">Jean Bailleur</p>
              </div>
              <div>
                <label class="block text-[9px] text-gray-400 font-black uppercase tracking-widest mb-2">Statut
                  Professionnel</label>
                <p class="text-sm font-black text-[#1B0B38]">
                  Propriétaire-Investisseur
                </p>
              </div>
              <div>
                <label class="block text-[9px] text-gray-400 font-black uppercase tracking-widest mb-2">E-mail
                  Principal</label>
                <p class="text-sm font-black text-[#1B0B38]">
                  jean.bailleur@email.com
                </p>
              </div>
              <div>
                <label
                  class="block text-[9px] text-gray-400 font-black uppercase tracking-widest mb-2">Téléphone</label>
                <p class="text-sm font-black text-[#1B0B38]">
                  +237 699 99 99 99
                </p>
              </div>
              <div>
                <label class="block text-[9px] text-gray-400 font-black uppercase tracking-widest mb-2">Adresse</label>
                <p class="text-sm font-black text-[#1B0B38]">
                  Bastos, Yaoundé
                </p>
              </div>
              <div>
                <label
                  class="block text-[9px] text-gray-400 font-black uppercase tracking-widest mb-2">RIB/Compte</label>
                <p class="text-sm font-black text-[#1B0B38]">
                  •••• •••• •••• 4528
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Security & Notifications -->
        <div class="space-y-8">
          <!-- Notifications Recentes -->
          <div class="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <h3 class="text-xs font-black text-[#1B0B38] uppercase tracking-[0.2em] mb-6">
              Notifications Récentes
            </h3>
            <div class="space-y-4">
              <div class="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                <div class="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                  <i class="fas fa-money-bill-wave text-xs"></i>
                </div>
                <div>
                  <p class="text-xs font-bold text-[#1B0B38]">
                    Paiement reçu
                  </p>
                  <p class="text-[10px] text-gray-500">
                    Appartement Bastos • 150.000 XAF
                  </p>
                  <p class="text-[9px] text-gray-400">Il y a 2 heures</p>
                </div>
              </div>
              <div class="flex items-start gap-3 p-3 bg-yellow-50 rounded-xl">
                <div class="w-8 h-8 bg-yellow-100 text-[#E54801] rounded-lg flex items-center justify-center shrink-0">
                  <i class="fas fa-tools text-xs"></i>
                </div>
                <div>
                  <p class="text-xs font-bold text-[#1B0B38]">
                    Maintenance demandée
                  </p>
                  <p class="text-[10px] text-gray-500">
                    Studio Akwa • Fuite d'eau
                  </p>
                  <p class="text-[9px] text-gray-400">Hier, 14:30</p>
                </div>
              </div>
            </div>
            <button
              class="w-full mt-6 py-3 bg-[#FAF9F5] text-[#E54801] rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#E54801] hover:text-white transition-all">
              Voir toutes les notifications
            </button>
          </div>

          <!-- Badges -->
          <div class="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <h3 class="text-xs font-black text-[#1B0B38] uppercase tracking-[0.2em] mb-6">
              Récompenses HMC
            </h3>
            <div class="grid grid-cols-3 gap-4">
              <div class="text-center group">
                <div
                  class="w-16 h-16 bg-[#FAF9F5] text-[#E54801] rounded-2xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <i class="fas fa-crown"></i>
                </div>
                <p class="text-[10px] font-bold uppercase text-[#1B0B38]">
                  Premium
                </p>
              </div>
              <div class="text-center group">
                <div
                  class="w-16 h-16 bg-[#FAF9F5] text-[#E54801] rounded-2xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <i class="fas fa-shield-check"></i>
                </div>
                <p class="text-[10px] font-bold uppercase text-[#1B0B38]">
                  Fiable
                </p>
              </div>
              <div class="text-center group">
                <div
                  class="w-16 h-16 bg-[#FAF9F5] text-[#E54801] rounded-2xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <i class="fas fa-rocket"></i>
                </div>
                <p class="text-[10px] font-bold uppercase text-[#1B0B38]">
                  Actif
                </p>
              </div>
            </div>
          </div>

          <!-- Sécurité -->
          <div class="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
            <h3 class="text-xs font-black text-[#1B0B38] uppercase tracking-[0.2em] mb-6">
              Sécurité
            </h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between p-4 bg-[#FAF9F5] rounded-2xl">
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 bg-white text-[#E54801] rounded-xl flex items-center justify-center">
                    <i class="fas fa-lock"></i>
                  </div>
                  <div>
                    <p class="text-[10px] font-black uppercase tracking-widest text-[#1B0B38]">
                      Mot de passe
                    </p>
                    <p class="text-[9px] text-gray-400">MàJ: 15/12/2023</p>
                  </div>
                </div>
                <button
                  class="w-8 h-8 rounded-lg bg-white text-[#E54801] flex items-center justify-center hover:bg-[#E54801] hover:text-white transition-all shadow-sm">
                  <i class="fas fa-pen text-[10px]"></i>
                </button>
              </div>
              <div class="flex items-center justify-between p-4 bg-[#FAF9F5] rounded-2xl">
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 bg-white text-[#E54801] rounded-xl flex items-center justify-center">
                    <i class="fas fa-fingerprint"></i>
                  </div>
                  <div>
                    <p class="text-[10px] font-black uppercase tracking-widest text-[#1B0B38]">
                      2FA
                    </p>
                    <p class="text-[9px] text-gray-400">Désactivé</p>
                  </div>
                </div>
                <div class="w-10 h-5 bg-gray-200 rounded-full relative cursor-pointer">
                  <div class="w-5 h-5 bg-white rounded-full shadow-md transform scale-90 transition-transform"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  </DashboardLayout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import DashboardLayout from "../../layouts/DashboardLayout.vue";
import UserAvatar from "../../components/common/UserAvatar.vue";
import { useAuthStore } from "../../stores/auth";
import axios from "../../axios";
const authStore = useAuthStore();
const avatarInput = ref(null);
const isUpdatingAvatar = ref(false);
const isLoading = ref(true);
const isSaving = ref(false);
const saveMessage = ref("");

const form = ref({
  name: "",
  phone: "",
  city: "Yaoundé",
  bio: "",
});

const stats = ref({
  total_value: "125M", // Realistic mock or calc
  monthly_revenue: 0,
  occupancy_rate: 0,
  property_count: 0,
});

const quickActions = [
  { label: "Nouveau Bail", icon: "fas fa-file-contract" },
  { label: "Rapport Financier", icon: "fas fa-chart-bar" },
  { label: "Gérer Locataires", icon: "fas fa-users" },
  { label: "Maintenance", icon: "fas fa-tools" },
  { label: "Factures", icon: "fas fa-file-invoice-dollar" },
  { label: "Support", icon: "fas fa-headset" },
];

const fetchData = async () => {
  isLoading.value = true;
  try {
    const [profileRes, dashRes] = await Promise.all([
      axios.get("/api/bailleur/profile"),
      axios.get("/api/bailleur/dashboard"),
    ]);

    if (profileRes.data.success) {
      const u = profileRes.data.data;
      form.value.name = u.name;
      form.value.phone = u.phone || "";
      form.value.city = u.city || "Yaoundé";
      form.value.bio = u.bio || "";
      stats.value.property_count = u.properties_count;
    }

    if (dashRes.data.success) {
      const s = dashRes.data.data.stats;
      stats.value.monthly_revenue = s.monthly_revenue;
      stats.value.occupancy_rate = s.occupancy_rate;
    }
  } catch (err) {
    console.error("Erreur chargement profil bailleur:", err);
  } finally {
    isLoading.value = false;
  }
};

const updateProfile = async () => {
  if (!form.value.name) return;
  isSaving.value = true;
  saveMessage.value = "";
  try {
    const { data } = await axios.put("/api/bailleur/profile", form.value);
    if (data.success) {
      authStore.user = data.data;
      saveMessage.value = "Profil mis à jour !";
      setTimeout(() => (saveMessage.value = ""), 3000);
    }
  } catch (err) {
    console.error("Erreur MAJ profil bailleur:", err);
    alert(err.response?.data?.message || "Erreur lors de la mise à jour.");
  } finally {
    isSaving.value = false;
  }
};

onMounted(fetchData);

const formatPrice = (v) => new Intl.NumberFormat("fr-FR").format(v || 0);
const userInitials = computed(() => {
  const name = authStore.user?.name ?? "B";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
});
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
