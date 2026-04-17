<template>
  <div class="dashboard-page-content">
    <div class="max-w-7xl mx-auto h-full">
      <!-- Role Switcher -->
      <DashboardRoleSwitcher />
      <!-- Header -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 animate-fadeIn">
        <div>
          <h1 class="text-2xl font-bold text-foreground">Tableau de bord</h1>
          <p class="text-muted-foreground text-sm mt-1">
            Vue d'ensemble de votre activité d'agent immobilier
          </p>
        </div>
        <div
          class="flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 text-xs font-bold uppercase tracking-wider"
        >
          <i class="fas fa-check-circle"></i> Agent certifié
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div
          class="bg-card p-5 rounded-2xl shadow-sm border border-border hover:shadow-lg transition-all group animate-fadeIn"
        >
          <div class="flex items-center justify-between mb-3">
            <div
              class="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center"
            >
              <i class="fas fa-building text-blue-600 dark:text-blue-400"></i>
            </div>
            <span class="text-xs font-bold text-green-600 dark:text-green-400">Total</span>
          </div>
          <p class="text-2xl font-bold text-foreground mb-1">
            {{ dashboardData.stats.managed_properties }}
          </p>
          <p class="text-xs text-muted-foreground font-medium uppercase tracking-wide">
            Biens gérés
          </p>
        </div>

        <div
          class="bg-card p-5 rounded-2xl shadow-sm border border-border hover:shadow-lg transition-all group animate-fadeIn"
        >
          <div class="flex items-center justify-between mb-3">
            <div
              class="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-950/30 flex items-center justify-center"
            >
              <i class="fas fa-key text-green-600 dark:text-green-400"></i>
            </div>
            <span class="text-xs font-bold text-green-600 dark:text-green-400">Actifs</span>
          </div>
          <p class="text-2xl font-bold text-foreground mb-1">
            {{ dashboardData.stats.active_rentals }}
          </p>
          <p class="text-xs text-muted-foreground font-medium uppercase tracking-wide">
            Locations
          </p>
        </div>

        <div
          class="bg-card p-5 rounded-2xl shadow-sm border border-border hover:shadow-lg transition-all group animate-fadeIn"
        >
          <div class="flex items-center justify-between mb-3">
            <div
              class="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/30 flex items-center justify-center"
            >
              <i class="fas fa-calendar-alt text-purple-600 dark:text-purple-400"></i>

            </div>
            <span class="text-xs font-bold text-orange-600 dark:text-orange-400">En attente</span>
          </div>
          <p class="text-2xl font-bold text-foreground mb-1">
            {{ dashboardData.stats.pending_visits }}
          </p>
          <p class="text-xs text-muted-foreground font-medium uppercase tracking-wide">
            Visites
          </p>
        </div>

        <div
          class="bg-card p-5 rounded-2xl shadow-sm border border-border hover:shadow-lg transition-all group animate-fadeIn"
        >
          <div class="flex items-center justify-between mb-3">
            <div
              class="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center"
            >
              <i class="fas fa-star text-amber-600 dark:text-amber-400"></i>
 
            </div>
            <span class="text-xs font-bold text-amber-600 dark:text-amber-400">Top</span>
          </div>
          <p class="text-2xl font-bold text-foreground mb-1">
            {{ dashboardData.stats.rating }}
          </p>
          <p class="text-xs text-muted-foreground font-medium uppercase tracking-wide">
            Note moyenne
          </p>
        </div>
      </div>

      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <!-- Left Column (Chart + Missions) -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Performance Chart -->
          <div
            class="bg-card p-6 rounded-2xl shadow-sm border border-border animate-slide-up"
          >
            <div
              class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4"
            >

              <div>
                <h3 class="text-lg font-bold text-foreground">
                  Performance mensuelle
                </h3>
                <p class="text-xs text-muted-foreground font-medium">
                  Évolution de vos ventes et commissions
                </p>
              </div>
            </div>
            <div class="h-64 w-full relative">
              <svg viewBox="0 0 400 200" class="w-full h-full overflow-visible">
                <polyline
                  points="0,160 100,120 200,100 300,60 400,80"
                  fill="none"
                  stroke="hsl(var(--secondary))"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <circle
                  cx="0"
                  cy="160"
                  r="4"
                  fill="hsl(var(--secondary))"
                  stroke="hsl(var(--background))"
                  stroke-width="2"
                />
                <circle
                  cx="100"
                  cy="120"
                  r="4"
                  fill="hsl(var(--secondary))"
                  stroke="hsl(var(--background))"
                  stroke-width="2"
                />
                <circle
                  cx="200"
                  cy="100"
                  r="4"
                  fill="hsl(var(--secondary))"
                  stroke="hsl(var(--background))"
                  stroke-width="2"
                />
                <circle
                  cx="300"
                  cy="60"
                  r="4"
                  fill="hsl(var(--secondary))"
                  stroke="hsl(var(--background))"
                  stroke-width="2"
                />
                <circle
                  cx="400"
                  cy="80"
                  r="4"
                  fill="hsl(var(--secondary))"
                  stroke="hsl(var(--background))"
                  stroke-width="2"
                />

              </svg>
            </div>
          </div>

          <!-- Missions Actives -->
          <div
            class="bg-card rounded-2xl shadow-sm border border-border overflow-hidden animate-slide-up"
            style="animation-delay: 0.1s"
          >
            <div
              class="p-6 border-b border-border flex justify-between items-center bg-muted/20"
            >
              <div>
                <h3
                  class="text-sm font-black text-foreground uppercase tracking-widest"
                >
                  Missions en attente
                </h3>
                <p class="text-[10px] text-muted-foreground font-bold">
                  VISITES À CONFIRMER
                </p>
              </div>
              <RouterLink
                :to="{ name: 'AgentMissions' }"
                class="text-[10px] font-black text-secondary uppercase tracking-widest hover:text-primary transition-colors"
                >Voir tout</RouterLink
              >
            </div>
            <div
              v-if="dashboardData.missions?.length === 0"
              class="p-10 text-center text-muted-foreground"
            >
              <p class="text-xs font-bold uppercase">
                Aucune mission en attente
              </p>
            </div>
            <div v-else class="divide-y divide-border">
              <div
                v-for="mission in dashboardData.missions"
                :key="mission.id"
                class="p-5 flex items-center gap-4 hover:bg-muted/5 transition-colors group"
              >
                <div
                  class="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                >
                  <i class="fas fa-eye"></i>
                </div>
                <div class="flex-1 min-w-0">
                  <h4 class="font-bold text-foreground truncate text-sm">
                    Visite: {{ mission.property?.title }}
                  </h4>
                  <div class="flex items-center gap-2 mt-1">
                    <span
                      class="text-[10px] text-muted-foreground font-bold uppercase flex items-center gap-1"
                    >
                      <i class="fas fa-user"></i> {{ mission.visitor?.name }}
                    </span>
                    <span class="text-[10px] text-muted-foreground/50">•</span>
                    <span class="text-[10px] text-muted-foreground font-bold">
                      {{ formatDate(mission.scheduled_at) }}
                    </span>
                  </div>
                </div>
                <button
                  class="w-8 h-8 rounded-lg bg-muted/20 text-muted-foreground flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors"
                >
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
            class="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 text-primary-foreground shadow-xl relative overflow-hidden group animate-slide-up"
            style="animation-delay: 0.2s"
          >
            <div class="relative z-10 text-center">
              <div
                class="w-20 h-20 rounded-2xl bg-white/10 border-2 border-white/20 flex items-center justify-center text-xl font-bold mx-auto mb-4 backdrop-blur-sm">
                {{ userProfile.initials || "?" }}
              </div>
              <h4 class="text-lg font-bold mb-1">{{ userProfile.name }}</h4>
              <div
                class="text-xs text-primary-foreground/70 mb-6 font-medium uppercase tracking-widest"
              >
                {{ userProfile.city }}
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div
                  class="text-center p-3 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-colors">
                  <div class="text-lg font-bold">
                    {{ dashboardData.stats.managed_properties }}
                  </div>
                  <div
                    class="text-[9px] text-primary-foreground/70 mt-1 font-bold uppercase"
                  >
                    Biens
                  </div>
                </div>
                <div
                  class="text-center p-3 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-colors">
                  <div class="text-lg font-bold">
                    {{ dashboardData.stats.active_rentals }}
                  </div>
                  <div
                    class="text-[9px] text-primary-foreground/70 mt-1 font-bold uppercase"
                  >
                    Baux
                  </div>
                </div>
              </div>
              <RouterLink
                :to="{ name: 'Parametres' }"
                class="w-full mt-6 py-2 bg-white/20 hover:bg-white/30 text-primary-foreground rounded-xl text-xs font-bold uppercase tracking-widest transition-colors backdrop-blur-sm block"
              >
                Gérer profil
              </RouterLink>
            </div>
             <i class="fas fa-id-badge absolute -right-6 -bottom-6 text-8xl text-primary-foreground/5 opacity-50 transform -rotate-12 group-hover:scale-110 transition-transform"
            ></i>
          </div>

          <!-- Aujourd'hui -->
          <div
            class="bg-card p-6 rounded-2xl border border-border shadow-sm animate-slide-up"
            style="animation-delay: 0.3s"
          >
            <div class="flex items-center justify-between mb-6">
              <div>
                <h3
                  class="text-sm font-black text-foreground uppercase tracking-widest"
                >
                  Aujourd'hui
                </h3>
                <p class="text-[10px] text-muted-foreground font-bold mt-1">
                  VOS RENDEZ-VOUS
                </p>
              </div>
              <span
                class="text-[10px] font-bold text-secondary bg-secondary/10 px-2 py-1 rounded-full uppercase tracking-wider"
                >{{ dashboardData.agenda.length }} RDV</span
              >
            </div>

            <div
              v-if="dashboardData.agenda.length === 0"
              class="text-center py-6 text-muted-foreground text-xs font-bold uppercase"
            >
              Aucun RDV aujourd'hui
            </div>
            <div v-else class="space-y-4">
              <div v-for="rdv in dashboardData.agenda" :key="rdv.id" class="flex items-start gap-3 group">
                <div
                  class="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center flex-shrink-0 font-bold text-xs text-blue-600 dark:text-blue-400"
                >
                  {{ formatTime(rdv.scheduled_at) }}
                </div>
                <div class="flex-1">
                  <div
                    class="font-bold text-foreground text-sm group-hover:text-secondary transition-colors"
                  >
                    {{ rdv.property?.title }}
                  </div>
                  <div class="text-[10px] text-muted-foreground font-medium">
                    Visiteur: {{ rdv.visitor?.name }}
                  </div>
                </div>
              </div>
            </div>

            <RouterLink
              :to="{ name: 'AgentAgenda' }"
              class="w-full mt-6 py-2 border border-border text-muted-foreground rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-muted/20 transition-colors text-center block"
            >
              <i class="fas fa-calendar-alt mr-2"></i> Ouvrir l'agenda
            </RouterLink>
          </div>

          <!-- Actions Rapides -->
          <div
            class="bg-card p-6 rounded-2xl border border-border shadow-sm animate-slide-up"
            style="animation-delay: 0.4s"
          >
            <h3
              class="text-xs font-black text-foreground uppercase tracking-widest mb-4"
            >
              Actions Rapides
            </h3>
            <div class="grid grid-cols-2 gap-3">
              <button
                class="p-3 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors text-[10px] font-bold uppercase flex flex-col items-center justify-center gap-2 h-20"
              >
                <i class="fas fa-plus text-lg"></i>
                <span>Visite</span>
              </button>
              <button
                class="p-3 bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors text-[10px] font-bold uppercase flex flex-col items-center justify-center gap-2 h-20"
              >
                <i class="fas fa-file-contract text-lg"></i>
                <span>Contrat</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { RouterLink, useRouter } from "vue-router";
import axios from "../../axios";
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

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
  });
};

const formatTime = (dateStr) => {
  const date = new Date(dateStr);
  return `${date.getHours().toString().padStart(2, "0")}h${date.getMinutes().toString().padStart(2, "0")}`;
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