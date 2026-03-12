<template>
  <DashboardLayout title="Espace Agent HMC">
    <div class="max-w-7xl mx-auto h-full">
      <!-- Role Switcher -->
      <DashboardRoleSwitcher />
      <!-- Header -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 animate-fadeIn">
        <div>
          <h1 class="text-2xl font-bold text-[#1B0B38]">Tableau de bord</h1>
          <p class="text-gray-500 text-sm mt-1">
            Vue d'ensemble de votre activité d'agent immobilier
          </p>
        </div>
        <div
          class="flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-200 text-green-600 text-xs font-bold uppercase tracking-wider">
          <i class="fas fa-check-circle"></i> Agent certifié
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div
          class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all group animate-fadeIn">
          <div class="flex items-center justify-between mb-3">
            <div class="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <i class="fas fa-building text-blue-600"></i>
            </div>
            <span class="text-xs font-bold text-green-600">Total</span>
          </div>
          <p class="text-2xl font-bold text-[#1B0B38] mb-1">
            {{ dashboardData.stats.managed_properties }}
          </p>
          <p class="text-xs text-gray-500 font-medium uppercase tracking-wide">
            Biens gérés
          </p>
        </div>

        <div
          class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all group animate-fadeIn">
          <div class="flex items-center justify-between mb-3">
            <div class="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
              <i class="fas fa-key text-green-600"></i>
            </div>
            <span class="text-xs font-bold text-green-600">Actifs</span>
          </div>
          <p class="text-2xl font-bold text-[#1B0B38] mb-1">
            {{ dashboardData.stats.active_rentals }}
          </p>
          <p class="text-xs text-gray-500 font-medium uppercase tracking-wide">
            Locations
          </p>
        </div>

        <div
          class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all group animate-fadeIn">
          <div class="flex items-center justify-between mb-3">
            <div class="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
              <i class="fas fa-calendar-alt text-purple-600"></i>
            </div>
            <span class="text-xs font-bold text-orange-600">En attente</span>
          </div>
          <p class="text-2xl font-bold text-[#1B0B38] mb-1">
            {{ dashboardData.stats.pending_visits }}
          </p>
          <p class="text-xs text-gray-500 font-medium uppercase tracking-wide">
            Visites
          </p>
        </div>

        <div
          class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all group animate-fadeIn">
          <div class="flex items-center justify-between mb-3">
            <div class="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <i class="fas fa-star text-amber-600"></i>
            </div>
            <span class="text-xs font-bold text-amber-600">Top</span>
          </div>
          <p class="text-2xl font-bold text-[#1B0B38] mb-1">
            {{ dashboardData.stats.rating }}
          </p>
          <p class="text-xs text-gray-500 font-medium uppercase tracking-wide">
            Note moyenne
          </p>
        </div>
      </div>

      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <!-- Left Column (Chart + Missions) -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Performance Chart -->
          <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-slide-up">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h3 class="text-lg font-bold text-[#1B0B38]">
                  Performance mensuelle
                </h3>
                <p class="text-xs text-gray-500 font-medium">
                  Évolution de vos ventes et commissions
                </p>
              </div>
            </div>
            <div class="h-64 w-full relative">
              <svg viewBox="0 0 400 200" class="w-full h-full overflow-visible">
                <polyline points="0,160 100,120 200,100 300,60 400,80" fill="none" stroke="#E54801" stroke-width="3"
                  stroke-linecap="round" stroke-linejoin="round" />
                <circle cx="0" cy="160" r="4" fill="#E54801" stroke="white" stroke-width="2" />
                <circle cx="100" cy="120" r="4" fill="#E54801" stroke="white" stroke-width="2" />
                <circle cx="200" cy="100" r="4" fill="#E54801" stroke="white" stroke-width="2" />
                <circle cx="300" cy="60" r="4" fill="#E54801" stroke="white" stroke-width="2" />
                <circle cx="400" cy="80" r="4" fill="#E54801" stroke="white" stroke-width="2" />
              </svg>
            </div>
          </div>

          <!-- Missions Actives -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-slide-up"
            style="animation-delay: 0.1s">
            <div class="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
              <div>
                <h3 class="text-sm font-black text-[#1B0B38] uppercase tracking-widest">
                  Missions en attente
                </h3>
                <p class="text-[10px] text-gray-500 font-bold">
                  VISITES À CONFIRMER
                </p>
              </div>
              <RouterLink :to="{ name: 'AgentMissions' }"
                class="text-[10px] font-black text-[#E54801] uppercase tracking-widest hover:underline">Voir tout
              </RouterLink>
            </div>
            <div v-if="dashboardData.missions?.length === 0" class="p-10 text-center text-gray-400">
              <p class="text-xs font-bold uppercase">
                Aucune mission en attente
              </p>
            </div>
            <div v-else class="divide-y divide-gray-50">
              <div v-for="mission in dashboardData.missions" :key="mission.id"
                class="p-5 flex items-center gap-4 hover:bg-gray-50 transition-colors group">
                <div
                  class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <i class="fas fa-eye"></i>
                </div>
                <div class="flex-1 min-w-0">
                  <h4 class="font-bold text-[#1B0B38] truncate text-sm">
                    Visite: {{ mission.property?.title }}
                  </h4>
                  <div class="flex items-center gap-2 mt-1">
                    <span class="text-[10px] text-gray-500 font-bold uppercase flex items-center gap-1">
                      <i class="fas fa-user"></i> {{ mission.visitor?.name }}
                    </span>
                    <span class="text-[10px] text-gray-400">•</span>
                    <span class="text-[10px] text-gray-500 font-bold">
                      {{ new Date(mission.scheduled_at).toLocaleDateString() }}
                    </span>
                  </div>
                </div>
                <button
                  class="w-8 h-8 rounded-lg bg-gray-50 text-gray-400 flex items-center justify-center hover:bg-[#E54801] hover:text-white transition-colors">
                  <i class="fas fa-chevron-right text-xs"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="space-y-6">
          <!-- Profile Card -->
          <div
            class="bg-gradient-to-br from-[#1B0B38] to-[#2c1b3d] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden group animate-slide-up"
            style="animation-delay: 0.2s">
            <div class="relative z-10 text-center">
              <div
                class="w-20 h-20 rounded-2xl bg-white/10 border-2 border-white/20 flex items-center justify-center text-xl font-bold mx-auto mb-4 backdrop-blur-sm">
                {{ userProfile.initials || "?" }}
              </div>
              <h4 class="text-lg font-bold mb-1">{{ userProfile.name }}</h4>
              <div class="text-xs text-white/70 mb-6 font-medium uppercase tracking-widest">
                {{ userProfile.city }}
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div
                  class="text-center p-3 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-colors">
                  <div class="text-lg font-bold">
                    {{ dashboardData.stats.managed_properties }}
                  </div>
                  <div class="text-[9px] text-white/70 mt-1 font-bold uppercase">
                    Biens
                  </div>
                </div>
                <div
                  class="text-center p-3 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-colors">
                  <div class="text-lg font-bold">
                    {{ dashboardData.stats.active_rentals }}
                  </div>
                  <div class="text-[9px] text-white/70 mt-1 font-bold uppercase">
                    Baux
                  </div>
                </div>
              </div>
              <RouterLink :to="{ name: 'AgentParametres' }"
                class="w-full mt-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-colors backdrop-blur-sm block">
                Gérer profil
              </RouterLink>
            </div>
            <i
              class="fas fa-id-badge absolute -right-6 -bottom-6 text-8xl text-white/5 opacity-50 transform -rotate-12 group-hover:scale-110 transition-transform"></i>
          </div>

          <!-- Aujourd'hui -->
          <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm animate-slide-up"
            style="animation-delay: 0.3s">
            <div class="flex items-center justify-between mb-6">
              <div>
                <h3 class="text-sm font-black text-[#1B0B38] uppercase tracking-widest">
                  Aujourd'hui
                </h3>
                <p class="text-[10px] text-gray-500 font-bold mt-1">
                  VOS RENDEZ-VOUS
                </p>
              </div>
              <span
                class="text-[10px] font-bold text-[#E54801] bg-orange-50 px-2 py-1 rounded-full uppercase tracking-wider">{{
                  dashboardData.agenda.length }} RDV</span>
            </div>

            <div v-if="dashboardData.agenda.length === 0"
              class="text-center py-6 text-gray-400 text-xs font-bold uppercase">
              Aucun RDV aujourd'hui
            </div>
            <div v-else class="space-y-4">
              <div v-for="rdv in dashboardData.agenda" :key="rdv.id" class="flex items-start gap-3 group">
                <div
                  class="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 font-bold text-xs text-blue-600">
                  {{ new Date(rdv.scheduled_at).getHours() }}:{{
                    new Date(rdv.scheduled_at)
                      .getMinutes()
                      .toString()
                      .padStart(2, "0")
                  }}
                </div>
                <div class="flex-1">
                  <div class="font-bold text-[#1B0B38] text-sm group-hover:text-[#E54801] transition-colors">
                    {{ rdv.property?.title }}
                  </div>
                  <div class="text-[10px] text-gray-500 font-medium">
                    Visiteur: {{ rdv.visitor?.name }}
                  </div>
                </div>
              </div>
            </div>

            <RouterLink :to="{ name: 'AgentAgenda' }"
              class="w-full mt-6 py-2 border border-gray-200 text-gray-600 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors text-center block">
              <i class="fas fa-calendar-alt mr-2"></i> Ouvrir l'agenda
            </RouterLink>
          </div>

          <!-- Actions Rapides -->
          <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm animate-slide-up"
            style="animation-delay: 0.4s">
            <h3 class="text-xs font-black text-[#1B0B38] uppercase tracking-widest mb-4">
              Actions Rapides
            </h3>
            <div class="grid grid-cols-2 gap-3">
              <button
                class="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors text-[10px] font-bold uppercase flex flex-col items-center justify-center gap-2 h-20">
                <i class="fas fa-plus text-lg"></i>
                <span>Visite</span>
              </button>
              <button
                class="p-3 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-colors text-[10px] font-bold uppercase flex flex-col items-center justify-center gap-2 h-20">
                <i class="fas fa-file-contract text-lg"></i>
                <span>Contrat</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { RouterLink, useRouter } from "vue-router";
import axios from "../../axios";
import DashboardLayout from "../../layouts/DashboardLayout.vue";
import DashboardRoleSwitcher from "../../components/common/DashboardRoleSwitcher.vue";

const router = useRouter();
const isLoading = ref(true);

const dashboardData = ref({
  stats: {
    managed_properties: 0,
    active_rentals: 0,
    pending_visits: 0,
    rating: 0,
  },
  missions: [],
  agenda: [],
});

const userProfile = ref({
  name: "",
  initials: "",
  city: "",
});

const fetchData = async () => {
  isLoading.value = true;
  try {
    const [dashRes, userRes] = await Promise.all([
      axios.get("/api/agent/dashboard"),
      axios.get("/api/user"),
    ]);

    if (dashRes.data.success) {
      dashboardData.value = dashRes.data.data;
    }

    if (userRes.data) {
      const u = userRes.data;
      userProfile.value = {
        name: u.name,
        initials: u.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase(),
        city: u.city || "Cameroun",
      };
    }
  } catch (err) {
    console.error("Erreur chargement dashboard agent:", err);
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchData);

const formatPrice = (p) => new Intl.NumberFormat("fr-FR").format(p || 0);
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
