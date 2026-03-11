<template>
  <DashboardLayout title="Administration HMC">
    <div v-if="isLoading" class="flex flex-col items-center justify-center h-full min-h-[60vh]">
      <div class="w-16 h-16 border-4 border-[#E54801] border-t-transparent rounded-full animate-spin mb-4"></div>
      <p class="text-gray-500 font-bold uppercase tracking-widest text-xs">
        Accès sécurisé en cours...
      </p>
    </div>

    <div v-else class="max-w-7xl mx-auto">
      <!-- STATS CARDS -->
      <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fadeIn">
        <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
              <i class="fas fa-users text-[#E54801] text-xl"></i>
            </div>
            <span class="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full">Actifs</span>
          </div>
          <h3 class="text-2xl font-bold text-[#1B0B38] mb-1">
            {{ dashboardData.stats.total_users }}
          </h3>
          <p class="text-sm text-gray-500">Utilisateurs inscrits</p>
        </div>

        <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
              <i class="fas fa-home text-blue-600 text-xl"></i>
            </div>
            <span class="text-xs font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded-full">{{
              dashboardData.stats.pending_properties }} en attente</span>
          </div>
          <h3 class="text-2xl font-bold text-[#1B0B38] mb-1">
            {{ dashboardData.stats.total_properties }}
          </h3>
          <p class="text-sm text-gray-500">Biens immobiliers</p>
        </div>

        <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
              <i class="fas fa-handshake text-green-600 text-xl"></i>
            </div>
            <span class="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full">Confirmées</span>
          </div>
          <h3 class="text-2xl font-bold text-[#1B0B38] mb-1">
            {{ dashboardData.stats.total_transactions }}
          </h3>
          <p class="text-sm text-gray-500">Transactions totales</p>
        </div>

        <div class="bg-gradient-to-br from-[#E54801] to-[#913327] p-6 rounded-2xl shadow-lg text-white">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <i class="fas fa-wallet text-white text-xl"></i>
            </div>
            <span class="text-xs font-bold text-white/80 bg-white/10 px-2 py-1 rounded-full">Mensuel</span>
          </div>
          <h3 class="text-2xl font-bold mb-1">
            {{ formatPrice(dashboardData.stats.monthly_revenue) }}
          </h3>
          <p class="text-sm text-white/80">
            Chiffre d'affaires ({{ currentMonthName }})
          </p>
        </div>
      </div>

      <!-- CHARTS AND ACTIVITY -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 animate-fadeIn" style="animation-delay: 0.1s">
        <!-- REVENUE CHART MOCKUP (Using static visual for now, but could be dynamic later) -->
        <div class="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div class="flex justify-between items-center mb-6">
            <div>
              <h3 class="text-lg font-bold text-[#1B0B38]">Revenus</h3>
              <p class="text-sm text-gray-500">
                Évolution globale des transactions
              </p>
            </div>
          </div>
          <div class="h-64 bg-gray-50 rounded-xl flex items-end justify-between p-4 px-8 gap-4">
            <div v-for="(val, i) in [40, 55, 65, 70, 60, 85]" :key="i"
              class="w-full bg-[#E54801] opacity-70 rounded-t-lg hover:opacity-100 transition relative group"
              :style="`height: ${val}%`">
              <span
                class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">{{
                  (val * 50).toLocaleString() }}k</span>
            </div>
          </div>
          <div class="flex justify-between px-8 mt-2 text-xs text-gray-500 font-bold uppercase">
            <span>Août</span><span>Sept</span><span>Oct</span><span>Nov</span><span>Déc</span><span>Jan</span>
          </div>
        </div>

        <!-- QUICK ACTIONS -->
        <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 class="text-lg font-bold text-[#1B0B38] mb-6">
            Actions système
          </h3>
          <div class="space-y-3">
            <RouterLink :to="{ name: 'AdminUtilisateurs' }"
              class="w-full flex items-center gap-3 p-3 bg-orange-50 text-[#E54801] rounded-xl hover:bg-orange-100 transition-all text-left font-semibold">
              <i class="fas fa-users-cog w-6 text-center"></i>
              Gérer les utilisateurs
            </RouterLink>
            <RouterLink :to="{ name: 'AdminBiensAnnonces' }"
              class="w-full flex items-center gap-3 p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-all text-left font-semibold">
              <i class="fas fa-home w-6 text-center"></i>
              Modérer les annonces ({{
                dashboardData.stats.pending_properties
              }})
            </RouterLink>
            <RouterLink :to="{ name: 'AdminServices' }"
              class="w-full flex items-center gap-3 p-3 bg-purple-50 text-purple-600 rounded-xl hover:bg-purple-100 transition-all text-left font-semibold">
              <i class="fas fa-tools w-6 text-center"></i>
              Superviser les services
            </RouterLink>
            <button
              class="w-full flex items-center gap-3 p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all text-left font-semibold">
              <i class="fas fa-exclamation-triangle w-6 text-center"></i>
              Voir les signalements
            </button>
          </div>
        </div>
      </div>

      <!-- TABLES SECTION -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 animate-fadeIn" style="animation-delay: 0.2s">
        <!-- RECENT USERS -->
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div class="p-6 border-b border-gray-100 flex justify-between items-center">
            <div>
              <h3 class="text-lg font-bold text-[#1B0B38]">
                Inscriptions récentes
              </h3>
              <p class="text-sm text-gray-500">
                Les 5 derniers membres inscrits
              </p>
            </div>
          </div>
          <div v-if="dashboardData.recent_users.length === 0" class="p-10 text-center text-gray-400">
            Aucun utilisateur récent
          </div>
          <div v-else class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="text-left p-4 text-xs font-bold text-gray-500 uppercase">
                    Utilisateur
                  </th>
                  <th class="text-left p-4 text-xs font-bold text-gray-500 uppercase">
                    Rôle
                  </th>
                  <th class="text-left p-4 text-xs font-bold text-gray-500 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr v-for="user in dashboardData.recent_users" :key="user.id"
                  class="hover:bg-gray-50 transition-colors">
                  <td class="p-4">
                    <div class="flex items-center gap-3">
                      <div
                        class="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
                        {{ user.name.charAt(0) }}
                      </div>
                      <div>
                        <p class="text-sm font-semibold text-gray-800">
                          {{ user.name }}
                        </p>
                        <p class="text-xs text-gray-500 ellipsis max-w-[150px]">
                          {{ user.email }}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td class="p-4">
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-gray-100 text-gray-600">
                      {{ user.role }}
                    </span>
                  </td>
                  <td class="p-4">
                    <span :class="[
                      'px-2 py-0.5 rounded-full text-[10px] font-bold uppercase',
                      user.status === 'active'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-orange-100 text-orange-600',
                    ]">
                      {{ user.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="p-4 border-t border-gray-100 text-center">
            <RouterLink :to="{ name: 'AdminUtilisateurs' }"
              class="text-sm font-semibold text-[#E54801] hover:underline">
              Gérer la base utilisateurs
            </RouterLink>
          </div>
        </div>

        <!-- RECENT PROPERTIES -->
        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div class="p-6 border-b border-gray-100">
            <h3 class="text-lg font-bold text-[#1B0B38]">
              Dernières annonces
            </h3>
            <p class="text-sm text-gray-500">
              Besoin de validation ou modération
            </p>
          </div>
          <div v-if="dashboardData.recent_properties.length === 0" class="p-10 text-center text-gray-400">
            Aucune annonce récente
          </div>
          <div v-else class="divide-y divide-gray-100">
            <div v-for="prop in dashboardData.recent_properties" :key="prop.id"
              class="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden flex items-center justify-center">
                  <img v-if="prop.images && prop.images.length > 0" :src="`/storage/${prop.images[0].path}`"
                    class="w-full h-full object-cover" />
                  <i v-else class="fas fa-image text-gray-300"></i>
                </div>
                <div>
                  <p class="text-sm font-semibold text-gray-800">
                    {{ prop.title }}
                  </p>
                  <div class="flex items-center gap-2 mt-1">
                    <span class="text-xs text-gray-500">{{
                      prop.city
                    }}</span>
                    <span class="text-xs font-bold text-[#E54801]">{{
                      formatPrice(prop.price)
                    }}</span>
                  </div>
                </div>
              </div>
              <div>
                <span :class="[
                  'px-2 py-1 rounded-full text-[10px] font-bold uppercase',
                  prop.status === 'active'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-orange-100 text-orange-600',
                ]">
                  {{ prop.status }}
                </span>
              </div>
            </div>
          </div>
          <div class="p-4 border-t border-gray-100 text-center">
            <RouterLink :to="{ name: 'AdminBiensAnnonces' }"
              class="text-sm font-semibold text-[#E54801] hover:underline">
              Consulter toute l'offre immo
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- SYSTEM STATUS -->
      <div class="bg-gradient-to-r from-[#1B0B38] to-[#0F0521] text-white rounded-2xl p-6 mb-8 shadow-xl">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h3 class="text-lg font-bold">Statut du système</h3>
            <p class="text-sm text-white/70">
              Infrastructure et connectivité
            </p>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span class="text-xs font-semibold">Services opérationnels</span>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/5">
            <div class="flex items-center justify-between mb-3">
              <span class="text-sm font-semibold">Serveur Backend</span>
              <span class="text-xs font-bold text-green-400">Stable</span>
            </div>
            <div class="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div class="h-full bg-green-500 rounded-full" style="width: 100%"></div>
            </div>
          </div>
          <div class="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/5">
            <div class="flex items-center justify-between mb-3">
              <span class="text-sm font-semibold">Base de données</span>
              <span class="text-xs font-bold text-green-400">98%</span>
            </div>
            <div class="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div class="h-full bg-green-500 rounded-full" style="width: 98%"></div>
            </div>
          </div>
          <div class="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/5">
            <div class="flex items-center justify-between mb-3">
              <span class="text-sm font-semibold">API REST</span>
              <span class="text-xs font-bold text-green-400">100%</span>
            </div>
            <div class="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div class="h-full bg-green-500 rounded-full" style="width: 100%"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import axios from "../../axios";
import DashboardLayout from "../../layouts/DashboardLayout.vue";

const isLoading = ref(true);
const dashboardData = ref({
  stats: {
    total_users: 0,
    active_users: 0,
    total_properties: 0,
    pending_properties: 0,
    total_transactions: 0,
    total_revenue: 0,
    monthly_revenue: 0,
  },
  recent_users: [],
  recent_properties: [],
  recent_transactions: [],
});

const currentMonthName = new Intl.DateTimeFormat("fr-FR", {
  month: "long",
}).format(new Date());

const fetchData = async () => {
  isLoading.value = true;
  try {
    const { data } = await axios.get("/api/admin/dashboard");
    if (data.success) {
      dashboardData.value = data.data;
    }
  } catch (err) {
    console.error("Erreur chargement dashboard admin:", err);
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchData);

const formatPrice = (p) => {
  return new Intl.NumberFormat("fr-CM", {
    style: "currency",
    currency: "XAF",
    maximumFractionDigits: 0,
  }).format(p || 0);
};
</script>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.4s ease-out forwards;
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

.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
