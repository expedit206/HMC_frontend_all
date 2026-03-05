<template>
  <DashboardLayout>

      <div
        v-if="isLoading"
        class="flex flex-col items-center justify-center h-full min-h-[60vh]"
      >
        <div
          class="w-16 h-16 border-4 border-[#E54801] border-t-transparent rounded-full animate-spin mb-4"
        ></div>
        <p class="text-gray-500 font-bold uppercase tracking-widest text-xs">
          Chargement des interventions...
        </p>
      </div>

      <div v-else class="max-w-7xl mx-auto">
    

        <!-- Header -->
        <div class="mb-8 animate-fadeIn">
          <div class="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <RouterLink
              :to="{ name: 'PrestataireDashboard' }"
              class="hover:text-[#E54801] transition-colors"
              >Tableau de bord</RouterLink
            >
            <i class="fas fa-chevron-right text-xs"></i>
            <span class="font-semibold text-[#1B0B38]">Interventions</span>
          </div>
          <div
            class="flex flex-col lg:flex-row lg:items-center justify-between gap-4"
          >
            <div>
              <h1 class="text-3xl lg:text-4xl font-black text-[#1B0B38] mb-2">
                Demandes d'Interventions
              </h1>
              <p class="text-gray-500 text-sm font-medium">
                Visualisez et gérez toutes les demandes de service sur la
                plateforme
              </p>
            </div>
            <div class="flex items-center gap-3">
              <span class="status-badge bg-blue-100 text-blue-700">
                <i class="fas fa-bell mr-1"></i>
                {{ stats.pending }} nouvelles
              </span>
              <span class="status-badge bg-green-100 text-green-700">
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
            class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-3xl font-black text-[#1B0B38] mb-1">
                  {{ stats.total }}
                </p>
                <p
                  class="text-xs font-bold text-gray-400 uppercase tracking-widest"
                >
                  Total demandes
                </p>
              </div>
              <div
                class="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center"
              >
                <i class="fas fa-inbox text-[#E54801] text-xl"></i>
              </div>
            </div>
          </div>

          <div
            class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-3xl font-black text-[#1B0B38] mb-1">
                  {{ stats.pending }}
                </p>
                <p
                  class="text-xs font-bold text-gray-400 uppercase tracking-widest"
                >
                  En attente
                </p>
              </div>
              <div
                class="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center"
              >
                <i class="fas fa-clock text-blue-500 text-xl"></i>
              </div>
            </div>
          </div>

          <div
            class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-3xl font-black text-[#1B0B38] mb-1">
                  {{ stats.accepted }}
                </p>
                <p
                  class="text-xs font-bold text-gray-400 uppercase tracking-widest"
                >
                  Confirmées
                </p>
              </div>
              <div
                class="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center"
              >
                <i class="fas fa-check-circle text-green-500 text-xl"></i>
              </div>
            </div>
          </div>

          <div
            class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-3xl font-black text-[#1B0B38] mb-1">
                  {{ formatPrice(stats.earnings) }}
                </p>
                <p
                  class="text-xs font-bold text-gray-400 uppercase tracking-widest"
                >
                  Revenus terminés
                </p>
              </div>
              <div
                class="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center"
              >
                <i class="fas fa-money-bill-wave text-purple-600 text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        <!-- Tabs de navigation -->
        <div
          class="flex mb-8 border-b border-gray-200 overflow-x-auto animate-fadeIn"
          style="animation-delay: 0.15s"
        >
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'tab-button px-6 py-3 text-sm font-bold transition whitespace-nowrap',
              activeTab === tab.id
                ? 'border-b-2 border-[#E54801] text-[#E54801]'
                : 'text-gray-500 hover:text-[#1B0B38]',
            ]"
          >
            <i :class="`fas ${tab.icon} mr-2`"></i>{{ tab.label }}
          </button>
        </div>

        <!-- Liste des Interventions -->
        <div class="space-y-6">
          <div
            v-if="filteredInterventions.length === 0"
            class="py-20 text-center bg-white rounded-3xl border border-dashed border-gray-200"
          >
            <i class="fas fa-inbox text-5xl text-gray-100 mb-4"></i>
            <p
              class="text-sm font-bold text-gray-400 uppercase tracking-widest"
            >
              Aucune intervention dans cette catégorie
            </p>
          </div>

          <div
            v-for="intervention in filteredInterventions"
            :key="intervention.id"
            :class="[
              'intervention-card bg-white rounded-3xl p-6 shadow-sm border border-gray-100 border-l-4 animate-slide-up',
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
                  <h3 class="text-xl font-bold text-[#1B0B38]">
                    {{ intervention.service?.title }}
                  </h3>
                  <span
                    v-if="intervention.status === 'pending'"
                    class="status-badge bg-blue-100 text-blue-700"
                  >
                    <i class="fas fa-clock mr-1"></i>
                    En attente
                  </span>
                  <span
                    v-else-if="intervention.status === 'accepted'"
                    class="status-badge bg-green-100 text-green-700"
                  >
                    <i class="fas fa-check-circle mr-1"></i>
                    Confirmée
                  </span>
                  <span v-else class="status-badge bg-gray-100 text-gray-700">
                    Terminée
                  </span>
                </div>

                <p class="text-gray-500 text-sm mb-6 leading-relaxed">
                  {{
                    intervention.notes || "Aucun détail supplémentaire fourni."
                  }}
                </p>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center"
                    >
                      <i class="fas fa-user text-[#E54801]"></i>
                    </div>
                    <div>
                      <p class="text-xs text-gray-400 uppercase font-bold">
                        Client
                      </p>
                      <p class="font-semibold text-[#1B0B38]">
                        {{ intervention.requester?.name }}
                      </p>
                    </div>
                  </div>

                  <div class="flex items-center gap-3">
                    <div
                      class="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center"
                    >
                      <i class="fas fa-map-marker-alt text-blue-500"></i>
                    </div>
                    <div>
                      <p class="text-xs text-gray-400 uppercase font-bold">
                        Adresse
                      </p>
                      <p class="font-semibold text-[#1B0B38]">
                        {{ intervention.property?.city || "Cameroun" }}
                      </p>
                    </div>
                  </div>

                  <div class="flex items-center gap-3">
                    <div
                      class="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center"
                    >
                      <i class="fas fa-tag text-purple-600"></i>
                    </div>
                    <div>
                      <p class="text-xs text-gray-400 uppercase font-bold">
                        Budget
                      </p>
                      <p class="font-bold text-[#E54801]">
                        {{ formatPrice(intervention.service?.base_price) }} FCFA
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  class="flex flex-wrap items-center gap-4 text-xs text-gray-400"
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
                  class="px-6 py-4 bg-[#E54801] text-white font-bold rounded-2xl hover:bg-[#913327] transition-colors shadow-md flex items-center justify-center gap-3"
                >
                  <i class="fas fa-check-circle"></i>
                  Accepter
                </button>
                <button
                  v-if="intervention.status === 'pending'"
                  @click="declineIntervention(intervention.id)"
                  class="px-6 py-4 bg-white text-red-500 border border-red-200 font-bold rounded-2xl hover:bg-red-50 transition-colors flex items-center justify-center gap-3"
                >
                  <i class="fas fa-times-circle"></i>
                  Décliner
                </button>
                <button
                  v-if="intervention.status === 'accepted'"
                  class="px-6 py-4 bg-green-500 text-white font-bold rounded-2xl hover:bg-green-600 transition-colors shadow-md flex items-center justify-center gap-3"
                >
                  <i class="fas fa-play-circle"></i>
                  Démarrer
                </button>
                <button
                  class="px-6 py-4 bg-gray-50 text-[#1B0B38] font-bold rounded-2xl hover:bg-gray-100 transition-colors flex items-center justify-center gap-3"
                >
                  <i class="fas fa-info-circle"></i>
                  Détails
                </button>
              </div>
            </div>
          </div>

          <!-- Section Support -->
          <div
            class="mt-12 bg-[#1B0B38] rounded-3xl p-8 text-white relative overflow-hidden animate-slide-up"
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
                  <p class="text-gray-300 text-sm font-medium">
                    Besoin d'aide pour une intervention complexe ? Consultez
                    notre base de connaissances ou contactez notre équipe
                    support pour les interventions techniques difficiles.
                  </p>
                </div>
                <div class="flex flex-col sm:flex-row gap-4">
                  <RouterLink
                    :to="{ name: 'PrestataireAssistance' }"
                    class="px-6 py-4 bg-[#E54801] text-white text-sm font-bold rounded-2xl hover:bg-[#913327] transition-colors shadow-lg flex items-center justify-center gap-3"
                  >
                    <i class="fas fa-life-ring"></i>
                    Support Pro
                  </RouterLink>
                  <a
                    href="#"
                    class="px-6 py-4 bg-white/10 backdrop-blur-sm text-white text-sm font-bold rounded-2xl hover:bg-white/20 transition-colors flex items-center justify-center gap-3"
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
    

  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import DashboardLayout from "../../layouts/DashboardLayout.vue";
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
  box-shadow: 0 12px 32px rgba(27, 11, 56, 0.15);
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

