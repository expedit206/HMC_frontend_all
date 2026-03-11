<template>
  <DashboardLayout>
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="mb-10 flex justify-between items-end">
        <div>
          <h1 class="text-2xl font-black text-[#1B0B38] uppercase relative">
            Mes Demandes de Publication
            <span class="absolute -bottom-2 left-0 w-20 h-1 bg-[#E54801]"></span>
          </h1>
          <p class="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-4">
            Suivi de l'audit terrain et vérification HMC
          </p>
        </div>
        <RouterLink :to="{ name: 'PublierBien' }"
          class="px-4 py-2 bg-[#E54801] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#c43d01] transition-all flex items-center gap-2 shadow-sm">
          <i class="fas fa-plus"></i> Nouvelle demande
        </RouterLink>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center text-xl">
            <i class="fas fa-clipboard-list"></i>
          </div>
          <div>
            <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Total
            </p>
            <p class="text-xl font-black text-[#1B0B38]">
              {{ requests.length }}
            </p>
          </div>
        </div>
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center text-xl">
            <i class="fas fa-user-shield"></i>
          </div>
          <div>
            <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              En cours d'audit
            </p>
            <p class="text-xl font-black text-[#1B0B38]">{{ pendingCount }}</p>
          </div>
        </div>
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl bg-green-50 text-green-500 flex items-center justify-center text-xl">
            <i class="fas fa-check-double"></i>
          </div>
          <div>
            <p class="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Publiés
            </p>
            <p class="text-xl font-black text-[#1B0B38]">
              {{ publishedCount }}
            </p>
          </div>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="isLoading" class="flex flex-col items-center justify-center h-64">
        <div class="w-12 h-12 border-4 border-[#E54801] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p class="text-gray-400 font-bold uppercase tracking-widest text-[10px]">
          Chargement de vos demandes...
        </p>
      </div>

      <!-- Empty -->
      <div v-else-if="requests.length === 0"
        class="bg-white p-20 rounded-3xl border border-dashed border-gray-200 text-center">
        <i class="fas fa-file-contract text-5xl text-gray-100 mb-6"></i>
        <h3 class="text-lg font-bold text-gray-900 mb-2">
          Aucune demande trouvée
        </h3>
        <p class="text-sm text-gray-500 mb-8 max-w-sm mx-auto">
          Vous n'avez pas encore soumis de demande de publication. Un agent doit
          auditer votre bien avant qu'il ne soit visible.
        </p>
        <RouterLink :to="{ name: 'PublierBien' }"
          class="px-8 py-4 bg-[#1B0B38] text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-[#E54801] transition-all">
          Soumettre un bien pour audit
        </RouterLink>
      </div>

      <!-- List -->
      <div v-else class="space-y-4">
        <div v-for="req in requests" :key="req.id"
          class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all group overflow-hidden relative">
          <!-- Barre latérale colorée -->
          <div :class="[
            'absolute top-0 left-0 w-1.5 h-full transition-all',
            getStatusBarColor(req.status),
          ]"></div>

          <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <!-- Infos principale -->
            <div class="flex items-start gap-4 flex-1">
              <div
                class="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-300 text-2xl shrink-0 group-hover:bg-orange-50 group-hover:text-orange-300 transition-all">
                <i :class="getCategoryIcon(req.category)"></i>
              </div>
              <div>
                <div class="flex items-center gap-3 mb-1">
                  <h3 class="font-black text-[#1B0B38] text-lg">
                    {{ req.title }}
                  </h3>
                  <span :class="[
                    'px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter',
                    getStatusClass(req.status),
                  ]">
                    {{ getStatusLabel(req.status) }}
                  </span>
                </div>
                <p class="text-xs text-gray-500 flex items-center gap-2">
                  <i class="fas fa-map-marker-alt text-orange-500"></i>
                  {{ req.city }}, {{ req.location }}
                </p>
                <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">
                  Estimé à {{ formatPrice(req.price_estimate) }} FCFA
                </p>
              </div>
            </div>

            <!-- Agent Info -->
            <div class="bg-gray-50/50 p-4 rounded-2xl border border-gray-100/50 flex items-center gap-4 min-w-[240px]">
              <div v-if="req.agent" class="flex items-center gap-3 w-full">
                <div
                  class="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {{ req.agent.name.charAt(0) }}
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">
                    Agent Responsable
                  </p>
                  <p class="text-xs font-black text-[#1B0B38] truncate">
                    {{ req.agent.name }}
                  </p>
                  <p class="text-[10px] text-orange-600 font-bold">
                    {{ req.agent.phone }}
                  </p>
                </div>
                <div
                  class="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shadow-sm border border-orange-200">
                  <i class="fas fa-phone-alt text-xs"></i>
                </div>
              </div>
              <div v-else class="flex flex-col">
                <p class="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-2">
                  Agent Responsable
                </p>
                <div
                  class="flex items-center gap-2 text-blue-500 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
                  <i class="fas fa-spinner fa-spin text-[10px]"></i>
                  <span class="text-[10px] font-black uppercase tracking-tight">En attente d'affectation</span>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex md:flex-col gap-2 shrink-0 w-full md:w-auto items-end">
              <!-- Audit programmé -->
              <div v-if="req.scheduled_at && !req.visited_at"
                class="bg-blue-50/70 border border-blue-100 p-3 rounded-2xl mb-2 w-full max-w-[220px] shadow-sm">
                <p class="text-[9px] font-black text-blue-500 uppercase tracking-widest leading-none mb-1 text-right">
                  📅 RDV Audit Terrain
                </p>
                <p class="text-xs font-black text-blue-800 text-right">
                  {{ formatDateFull(req.scheduled_at) }}
                </p>
                <p v-if="req.agent_notes"
                  class="text-[9px] text-blue-600 italic text-right mt-1.5 border-t border-blue-100 pt-1">
                  <i class="fas fa-quote-left mr-1 opacity-50"></i>{{ req.agent_notes }}
                </p>
              </div>
              <button @click="openDetail(req)"
                class="flex-1 md:flex-none px-4 py-2 bg-[#1B0B38] text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-[#E54801] transition-all flex items-center justify-center gap-2">
                <i class="fas fa-eye"></i> Détails
              </button>
              <span v-if="req.visited_at"
                class="text-[9px] font-bold text-green-600 text-center uppercase tracking-widest">
                Audit Réalisé le {{ formatDate(req.visited_at) }}
              </span>
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
import { RouterLink } from "vue-router";
import axios from "../../axios";
const isLoading = ref(true);
const requests = ref([]);
const selectedRequest = ref(null);

const fetchData = async () => {
  isLoading.value = true;
  try {
    const { data } = await axios.get("/api/bailleur/publication-requests");
    if (data.success) requests.value = data.data;
  } catch (err) {
    console.error("Erreur chargement demandes bailleur:", err);
  } finally {
    isLoading.value = false;
  }
};

// ── Modale Détail ──
const openDetail = (req) => {
  selectedRequest.value = req;
};
const closeDetail = () => {
  selectedRequest.value = null;
};

// ── Timeline statut ──
const statusSteps = [
  { key: "pending", label: "Soumis", icon: "fas fa-paper-plane" },
  { key: "assigned", label: "Affecté", icon: "fas fa-user-shield" },
  { key: "visited", label: "Audité", icon: "fas fa-camera" },
  { key: "published", label: "Publié", icon: "fas fa-globe" },
];

const stepOrder = ["pending", "assigned", "visited", "published"];

const isStepDone = (key) => {
  const current = selectedRequest.value?.status;
  if (current === "rejected") return false;
  return stepOrder.indexOf(current) > stepOrder.indexOf(key);
};

const isCurrentStep = (key) => {
  const current = selectedRequest.value?.status;
  if (current === "rejected") return false;
  return current === key;
};

// ── Computed ──
const pendingCount = computed(
  () =>
    requests.value.filter(
      (r) => r.status !== "published" && r.status !== "rejected",
    ).length,
);
const publishedCount = computed(
  () => requests.value.filter((r) => r.status === "published").length,
);

// ── Formatters ──
const formatPrice = (p) => new Intl.NumberFormat("fr-FR").format(p || 0);
const formatDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
    })
    : "—";
const formatDateFull = (d) =>
  d
    ? new Date(d).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    : "—";

// ── Status helpers ──
const getStatusClass = (status) => {
  const map = {
    pending: "bg-orange-50 text-orange-600 border border-orange-100",
    assigned: "bg-blue-50 text-blue-600 border border-blue-100",
    visited: "bg-purple-50 text-purple-600 border border-purple-100",
    published: "bg-green-50 text-green-600 border border-green-100",
    rejected: "bg-red-50 text-red-600 border border-red-100",
  };
  return map[status] ?? "bg-gray-50 text-gray-600";
};

const getStatusBarColor = (status) => {
  const map = {
    pending: "bg-orange-400",
    assigned: "bg-blue-400",
    visited: "bg-purple-400",
    published: "bg-green-400",
    rejected: "bg-red-400",
  };
  return map[status] ?? "bg-gray-300";
};

const getStatusLabel = (status) => {
  const labels = {
    pending: "En attente",
    assigned: "Agent affecté",
    visited: "Audit effectué",
    published: "Publié",
    rejected: "Rejeté",
  };
  return labels[status] || status;
};

const getCategoryIcon = (cat) => {
  if (!cat) return "fas fa-building";
  const c = cat.toLowerCase();
  if (c.includes("villa")) return "fas fa-home";
  if (c.includes("studio")) return "fas fa-door-open";
  if (c.includes("terrain")) return "fas fa-mountain";
  return "fas fa-building";
};

onMounted(fetchData);
</script>

<style scoped>
@keyframes modalIn {
  from {
    opacity: 0;
    transform: translateY(24px) scale(0.97);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.animate-modal {
  animation: modalIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
