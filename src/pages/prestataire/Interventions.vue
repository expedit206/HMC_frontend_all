<template>
  <div class="dashboard-page-content">
    <div
      v-if="isLoading"
      class="flex flex-col items-center justify-center h-full min-h-[60vh]"
    >
      <div
        class="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full animate-spin mb-4"
      ></div>
      <p class="text-muted-foreground font-bold uppercase tracking-widest text-xs">
        Chargement des interventions...
      </p>
    </div>

    <div v-else class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8 animate-fadeIn">
        <div class="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <RouterLink
            :to="{ name: 'PrestataireDashboard' }"
            class="hover:text-secondary transition-colors"
            >Tableau de bord</RouterLink
          >
          <i class="fas fa-chevron-right text-xs"></i>
          <span class="font-semibold text-foreground">Interventions</span>
        </div>
        <div
          class="flex flex-col lg:flex-row lg:items-center justify-between gap-4"
        >
          <div>
            <h1 class="text-3xl lg:text-4xl font-black text-foreground mb-2">
              Demandes d'Interventions
            </h1>
            <p class="text-muted-foreground text-sm font-medium">
              Visualisez et gérez toutes les demandes de service sur la
              plateforme
            </p>
          </div>
          <div class="flex items-center gap-3">
            <span class="status-badge bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400">
              <i class="fas fa-bell mr-1"></i>
              {{ stats.pending }} nouvelles
            </span>
            <span class="status-badge bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400">
              <i class="fas fa-calendar-check mr-1"></i>
              {{ stats.accepted }} confirmées
            </span>
          </div>
        </div>
      </div>

      <!-- Filtres et Statistiques -->
      <div
        class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 animate-fadeIn"
        style="animation-delay: 0.1s"
      >
        <div
          class="bg-card rounded-2xl p-6 shadow-sm border border-border"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-3xl font-black text-foreground mb-1">
                {{ stats.total }}
              </p>
              <p
                class="text-xs font-bold text-muted-foreground uppercase tracking-widest"
              >
                Total demandes
              </p>
            </div>
            <div
              class="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center"
            >
              <i class="fas fa-inbox text-secondary text-xl"></i>
            </div>
          </div>
        </div>

        <div
          class="bg-card rounded-2xl p-6 shadow-sm border border-border"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-3xl font-black text-foreground mb-1">
                {{ stats.pending }}
              </p>
              <p
                class="text-xs font-bold text-muted-foreground uppercase tracking-widest"
              >
                En attente
              </p>
            </div>
            <div
              class="w-12 h-12 bg-blue-100 dark:bg-blue-950/30 rounded-2xl flex items-center justify-center"
            >
              <i class="fas fa-clock text-blue-600 dark:text-blue-400 text-xl"></i>
            </div>
          </div>
        </div>

        <div
          class="bg-card rounded-2xl p-6 shadow-sm border border-border"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-3xl font-black text-foreground mb-1">
                {{ stats.accepted }}
              </p>
              <p
                class="text-xs font-bold text-muted-foreground uppercase tracking-widest"
              >
                Confirmées
              </p>
            </div>
            <div
              class="w-12 h-12 bg-green-100 dark:bg-green-950/30 rounded-2xl flex items-center justify-center"
            >
              <i class="fas fa-check-circle text-green-600 dark:text-green-400 text-xl"></i>
            </div>
          </div>
        </div>

        <div
          class="bg-card rounded-2xl p-6 shadow-sm border border-border"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-3xl font-black text-foreground mb-1">
                {{ formatPrice(stats.earnings) }}
              </p>
              <p
                class="text-xs font-bold text-muted-foreground uppercase tracking-widest"
              >
                Revenus terminés
              </p>
            </div>
            <div
              class="w-12 h-12 bg-purple-100 dark:bg-purple-950/30 rounded-2xl flex items-center justify-center"
            >
              <i class="fas fa-money-bill-wave text-purple-600 dark:text-purple-400 text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs de navigation -->
      <div
        class="flex mb-8 border-b border-border overflow-x-auto animate-fadeIn"
        style="animation-delay: 0.15s"
      >
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'tab-button px-6 py-3 text-sm font-bold transition whitespace-nowrap',
            activeTab === tab.id
              ? 'border-b-2 border-secondary text-secondary'
              : 'text-muted-foreground hover:text-foreground',
          ]"
        >
          <i :class="`fas ${tab.icon} mr-2`"></i>{{ tab.label }}
        </button>
      </div>

      <!-- Liste des Interventions -->
      <div class="space-y-6">
        <div
          v-if="filteredInterventions.length === 0"
          class="py-20 text-center bg-card rounded-3xl border border-dashed border-border"
        >
          <i class="fas fa-inbox text-5xl text-muted-foreground/20 mb-4"></i>
          <p
            class="text-sm font-bold text-muted-foreground uppercase tracking-widest"
          >
            Aucune intervention dans cette catégorie
          </p>
        </div>

        <div
          v-for="intervention in filteredInterventions"
          :key="intervention.id"
          :class="[
            'intervention-card bg-card rounded-3xl p-6 shadow-sm border border-border border-l-4 animate-slide-up',
            intervention.status === 'pending'
              ? 'border-l-orange-500'
              : intervention.status === 'accepted'
                ? 'border-l-blue-500'
                : 'border-l-green-500',
          ]"
        >
          <div
            class="flex flex-col lg:flex-row lg:items-start justify-between gap-6"
          >
            <!-- Info Intervention -->
            <div class="flex-1">
              <div class="flex flex-wrap items-center gap-3 mb-4">
                <h3 class="text-xl font-bold text-foreground">
                  {{ intervention.service?.title }}
                </h3>
                <span
                  v-if="intervention.status === 'pending'"
                  class="status-badge bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400"
                >
                  <i class="fas fa-clock mr-1"></i>
                  En attente
                </span>
                <span
                  v-else-if="intervention.status === 'accepted'"
                  class="status-badge bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400"
                >
                  <i class="fas fa-check-circle mr-1"></i>
                  Confirmée
                </span>
                <span v-else class="status-badge bg-muted text-muted-foreground">
                  Terminée
                </span>
              </div>

              <p class="text-muted-foreground text-sm mb-6 leading-relaxed">
                {{
                  intervention.notes || "Aucun détail supplémentaire fourni."
                }}
              </p>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center"
                  >
                    <i class="fas fa-user text-secondary"></i>
                  </div>
                  <div>
                    <p class="text-xs text-muted-foreground uppercase font-bold">
                      Client
                    </p>
                    <p class="font-semibold text-foreground">
                      {{ intervention.requester?.name }}
                    </p>
                  </div>
                </div>

                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 bg-blue-100 dark:bg-blue-950/30 rounded-xl flex items-center justify-center"
                  >
                    <i class="fas fa-map-marker-alt text-blue-600 dark:text-blue-400"></i>
                  </div>
                  <div>
                    <p class="text-xs text-muted-foreground uppercase font-bold">
                      Adresse
                    </p>
                    <p class="font-semibold text-foreground">
                      {{ intervention.property?.city || "Cameroun" }}
                    </p>
                  </div>
                </div>

                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 bg-purple-100 dark:bg-purple-950/30 rounded-xl flex items-center justify-center"
                  >
                    <i class="fas fa-tag text-purple-600 dark:text-purple-400"></i>
                  </div>
                  <div>
                    <p class="text-xs text-muted-foreground uppercase font-bold">
                      Budget
                    </p>
                    <p class="font-bold text-secondary">
                      {{ formatPrice(intervention.service?.base_price) }} FCFA
                    </p>
                  </div>
                </div>
              </div>

              <div
                class="flex flex-wrap items-center gap-4 text-xs text-muted-foreground"
              >
                <span class="flex items-center gap-2">
                  <i class="fas fa-calendar"></i>
                  Prévue le
                  {{
                    new Date(intervention.scheduled_at).toLocaleDateString()
                  }}
                </span>
                <span class="flex items-center gap-2">
                  <i
                    :class="`fas ${getInterventionIcon(intervention.service?.category)}`"
                  ></i>
                  {{ intervention.service?.category?.name }}
                </span>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex flex-col gap-3 min-w-[200px]">
              <button
                v-if="intervention.status === 'pending'"
                @click="acceptIntervention(intervention.id)"
                class="px-6 py-4 bg-secondary text-secondary-foreground font-bold rounded-2xl hover:bg-secondary/90 transition-colors shadow-md flex items-center justify-center gap-3"
              >
                <i class="fas fa-check-circle"></i>
                Accepter
              </button>
              <button
                v-if="intervention.status === 'pending'"
                @click="declineIntervention(intervention.id)"
                class="px-6 py-4 bg-card text-destructive border border-destructive/30 font-bold rounded-2xl hover:bg-destructive/10 transition-colors flex items-center justify-center gap-3"
              >
                <i class="fas fa-times-circle"></i>
                Décliner
              </button>
              <button
                v-if="intervention.status === 'accepted'"
                class="px-6 py-4 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 transition-colors shadow-md flex items-center justify-center gap-3"
              >
                <i class="fas fa-play-circle"></i>
                Démarrer
              </button>
              <button
                class="px-6 py-4 bg-muted/20 text-foreground font-bold rounded-2xl hover:bg-muted/30 transition-colors flex items-center justify-center gap-3"
              >
                <i class="fas fa-info-circle"></i>
                Détails
              </button>
            </div>
          </div>
        </div>

        <!-- Section Support -->
        <div
          class="mt-12 bg-primary rounded-3xl p-8 text-primary-foreground relative overflow-hidden animate-slide-up"
          style="animation-delay: 0.3s"
        >
          <div class="relative z-10">
            <div
              class="flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              <div>
                <h3 class="text-2xl font-black mb-3">
                  Assistance Technique & Support
                </h3>
                <p class="text-primary-foreground/70 text-sm font-medium">
                  Besoin d'aide pour une intervention complexe ? Consultez
                  notre base de connaissances ou contactez notre équipe
                  support pour les interventions techniques difficiles.
                </p>
              </div>
              <div class="flex flex-col sm:flex-row gap-4">
                <RouterLink
                  :to="{ name: 'PrestataireAssistance' }"
                  class="px-6 py-4 bg-secondary text-secondary-foreground text-sm font-bold rounded-2xl hover:bg-secondary/90 transition-colors shadow-lg flex items-center justify-center gap-3"
                >
                  <i class="fas fa-life-ring"></i>
                  Support Pro
                </RouterLink>
                <a
                  href="#"
                  class="px-6 py-4 bg-white/10 backdrop-blur-sm text-primary-foreground text-sm font-bold rounded-2xl hover:bg-white/20 transition-colors flex items-center justify-center gap-3"
                >
                  <i class="fas fa-book"></i>
                  Guides
                </a>
              </div>
            </div>
          </div>
          <i
            class="fas fa-tools absolute -right-8 -bottom-8 text-[150px] text-white/5"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { RouterLink } from "vue-router";
import axios from "../../axios";

const activeTab = ref("toutes");
const isLoading = ref(true);
const interventions = ref([]);

const tabs = [
  { id: "toutes", label: "Toutes les demandes", icon: "fa-list" },
  { id: "pending", label: "En attente", icon: "fa-clock", status: "pending" },
  {
    id: "accepted",
    label: "Confirmées",
    icon: "fa-check-circle",
    status: "accepted",
  },
  {
    id: "completed",
    label: "Terminées",
    icon: "fa-flag-checkered",
    status: "completed",
  },
];

const fetchInterventions = async () => {
  isLoading.value = true;
  try {
    const { data } = await axios.get("/api/prestataire/interventions");
    if (data.success) {
      interventions.value = data.data.data;
    }
  } catch (err) {
    console.error("Erreur chargement interventions prestataire:", err);
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchInterventions);

const filteredInterventions = computed(() => {
  if (activeTab.value === "toutes") return interventions.value;
  const tab = tabs.find((t) => t.id === activeTab.value);
  return interventions.value.filter((i) => i.status === tab.status);
});

const stats = computed(() => {
  return {
    total: interventions.value.length,
    pending: interventions.value.filter((i) => i.status === "pending").length,
    accepted: interventions.value.filter((i) => i.status === "accepted").length,
    earnings: interventions.value
      .filter((i) => i.status === "completed")
      .reduce((acc, i) => acc + parseFloat(i.service?.base_price || 0), 0),
  };
});

const formatPrice = (p) => new Intl.NumberFormat("fr-FR").format(p || 0);

const getInterventionIcon = (category) => {
  const map = {
    plomberie: "fa-faucet",
    electricite: "fa-bolt",
    climatisation: "fa-wind",
    peinture: "fa-brush",
  };
  return map[category?.slug] || "fa-tools";
};

const acceptIntervention = (id) => {
  if (confirm("Accepter cette intervention ?")) {
    alert("Fonctionnalité d'acceptation à venir");
  }
};

const declineIntervention = (id) => {
  if (confirm("Décliner cette intervention ?")) {
    alert("Fonctionnalité de refus à venir");
  }
};

const startIntervention = (id) => {
  alert("Démarrage de l'intervention...");
};
</script>

<style scoped>
.status-badge {
  border-radius: 9999px;
  padding: 4px 12px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.intervention-card {
  transition: all 0.3s ease;
}

.intervention-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px hsl(var(--primary) / 0.15);
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-out forwards;
  opacity: 0;
}

.animate-slide-up {
  animation: slideUp 0.4s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
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