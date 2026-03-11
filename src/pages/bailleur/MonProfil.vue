<template>
  <SharedProfileLayout title="Profil Bailleur" subtitle="Gérez votre compte, vos paramètres et suivez vos performances"
    roleLabel="Bailleur HMC • Certifié" :form="form" :isSaving="isSaving" :saveMessage="saveMessage" :showBio="true"
    @save="updateProfile">
    <!-- Header Actions (Boutons haut à droite) -->
    <template #header-actions>
      <div class="flex gap-3">
        <button
          class="px-6 py-3 bg-white border border-gray-100 text-[#1B0B38] rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center gap-3">
          <i class="fas fa-download"></i>
          <span class="hidden sm:inline">Exporter</span>
        </button>
        <button
          class="px-6 py-3 bg-[#E54801] text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-[#913327] transition-all flex items-center gap-3 shadow-md">
          <i class="fas fa-plus"></i>
          <span class="hidden sm:inline">Nouveau Bien</span>
        </button>
      </div>
    </template>

    <!-- Stats Overview Top -->
    <template #stats-overview>
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
    </template>

    <!-- Stats Avatar -->
    <template #left-column-stats>
      <div class="grid grid-cols-2 gap-4 mt-6">
        <div class="text-center p-3 bg-gray-50 rounded-2xl border border-gray-100">
          <p class="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Biens</p>
          <p class="text-xl font-black text-[#1B0B38]">{{ stats.property_count }}</p>
        </div>
        <div class="text-center p-3 bg-gray-50 rounded-2xl border border-gray-100">
          <p class="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Taux Loc.</p>
          <p class="text-xl font-black text-[#1B0B38]">{{ stats.occupancy_rate }}%</p>
        </div>
      </div>
    </template>

    <!-- Quick Actions Under Form -->
    <template #right-column-extra>
      <div class="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <h3 class="text-xs font-black text-[#1B0B38] uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
          <i class="fas fa-bolt text-[#E54801]"></i> Actions Rapides
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <button v-for="(action, idx) in quickActions" :key="idx"
            class="p-4 bg-[#FAF9F5] rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-[#E54801] hover:text-white transition-all group border border-gray-100">
            <div class="w-12 h-12 bg-white text-[#E54801] rounded-xl flex items-center justify-center shadow-sm">
              <i :class="action.icon"></i>
            </div>
            <span class="text-[10px] font-bold uppercase tracking-widest text-center">{{ action.label }}</span>
          </button>
        </div>
      </div>

      <!-- Badges and Notifications -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Badges -->
        <div class="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden">
          <div class="absolute -right-4 -bottom-4 opacity-5">
            <i class="fas fa-award text-9xl"></i>
          </div>
          <h3 class="text-xs font-black text-[#1B0B38] uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
            <i class="fas fa-star text-[#E54801]"></i> Récompenses HMC
          </h3>
          <div class="grid grid-cols-3 gap-4 relative z-10">
            <div class="text-center group">
              <div
                class="w-12 h-12 bg-[#FAF9F5] text-[#E54801] rounded-2xl flex items-center justify-center mx-auto mb-2 group-hover:-translate-y-2 transition-transform shadow-sm">
                <i class="fas fa-crown"></i>
              </div>
              <p class="text-[9px] font-bold uppercase text-[#1B0B38]">Premium</p>
            </div>
            <div class="text-center group">
              <div
                class="w-12 h-12 bg-[#FAF9F5] text-[#E54801] rounded-2xl flex items-center justify-center mx-auto mb-2 group-hover:-translate-y-2 transition-transform shadow-sm">
                <i class="fas fa-shield-check"></i>
              </div>
              <p class="text-[9px] font-bold uppercase text-[#1B0B38]">Fiable</p>
            </div>
            <div class="text-center group">
              <div
                class="w-12 h-12 bg-[#FAF9F5] text-[#E54801] rounded-2xl flex items-center justify-center mx-auto mb-2 group-hover:-translate-y-2 transition-transform shadow-sm">
                <i class="fas fa-rocket"></i>
              </div>
              <p class="text-[9px] font-bold uppercase text-[#1B0B38]">Actif</p>
            </div>
          </div>
        </div>

        <!-- Notifications -->
        <div class="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden">
          <div class="absolute -right-4 -bottom-4 opacity-5">
            <i class="fas fa-bell text-9xl"></i>
          </div>
          <h3 class="text-xs font-black text-[#1B0B38] uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
            <i class="fas fa-bell text-[#E54801]"></i> Récents
          </h3>
          <div class="space-y-4 relative z-10">
            <div class="flex items-start gap-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100">
              <div
                class="w-8 h-8 bg-white text-blue-600 rounded-lg flex items-center justify-center shrink-0 shadow-sm">
                <i class="fas fa-money-bill-wave text-xs"></i>
              </div>
              <div>
                <p class="text-[11px] font-bold text-[#1B0B38]">Paiement reçu</p>
                <p class="text-[9px] text-gray-500">Appartement Bastos</p>
                <p class="text-[8px] text-gray-400 font-bold uppercase mt-1">2h</p>
              </div>
            </div>
            <div class="flex items-start gap-3 p-3 bg-yellow-50/50 rounded-xl border border-yellow-100">
              <div
                class="w-8 h-8 bg-white text-[#E54801] rounded-lg flex items-center justify-center shrink-0 shadow-sm">
                <i class="fas fa-tools text-xs"></i>
              </div>
              <div>
                <p class="text-[11px] font-bold text-[#1B0B38]">Maintenance</p>
                <p class="text-[9px] text-gray-500">Fuite d'eau Studio Akwa</p>
                <p class="text-[8px] text-gray-400 font-bold uppercase mt-1">Hier</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #security-extra>
      <div
        class="flex items-center justify-between p-4 bg-[#FAF9F5] border border-gray-100 rounded-2xl group hover:border-gray-200 transition-colors">
        <div class="flex items-center gap-4">
          <div
            class="w-10 h-10 bg-white shadow-sm text-[#E54801] rounded-xl flex items-center justify-center group-hover:bg-[#E54801] group-hover:text-white transition-colors">
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
    </template>
  </SharedProfileLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import SharedProfileLayout from "../../components/profile/SharedProfileLayout.vue";
import { useAuthStore } from "../../stores/auth";
import axios from "../../axios";

const authStore = useAuthStore();
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
  total_value: "125M",
  monthly_revenue: 0,
  occupancy_rate: 0,
  property_count: 0,
});

const quickActions = [
  { label: "Nouveau Bail", icon: "fas fa-file-contract" },
  { label: "Rapport Financier", icon: "fas fa-chart-bar" },
  { label: "Services", icon: "fas fa-tools" },
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
      form.value.email = u.email || ""; // Assurez-vous d'avoir l'email s'il y en a un
      stats.value.property_count = u.properties_count;
    } else {
      // Fallback
      form.value.name = authStore.user?.name || "";
      form.value.email = authStore.user?.email || "";
    }

    if (dashRes.data.success) {
      const s = dashRes.data.data.stats;
      stats.value.monthly_revenue = s.monthly_revenue || 0;
      stats.value.occupancy_rate = s.occupancy_rate || 0;
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
</script>
