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
              <!-- Audit programmé et confirmation -->
              <div v-if="req.scheduled_at && !req.visited_at"
                class="bg-blue-50/70 border border-blue-100 p-4 rounded-2xl mb-2 w-full max-w-[280px] shadow-sm">
                <p class="text-[9px] font-black text-blue-500 uppercase tracking-widest leading-none mb-2 text-right">
                  📅 RDV Audit Terrain
                </p>
                <p class="text-xs font-black text-blue-800 text-right mb-1 uppercase">
                  {{ formatDate(req.scheduled_at) }}
                </p>

                <!-- Status de confirmation -->
                <div class="flex justify-end mb-2">
                  <span v-if="req.bailleur_confirmed_at"
                    class="text-[8px] font-black text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-200 uppercase">
                    <i class="fas fa-check-circle mr-1"></i> Vous avez confirmé
                  </span>
                  <span v-else-if="req.bailleur_declined_at"
                    class="text-[8px] font-black text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200 uppercase flex flex-col gap-1">
                    <span><i class="fas fa-history mr-1"></i> Report demandé</span>
                    <span v-if="req.bailleur_suggested_at" class="font-bold text-[7px] lowercase italic opacity-80">
                      (Proposition : {{ formatDate(req.bailleur_suggested_at) }} GMT+1)
                    </span>
                  </span>
                  <span v-else
                    class="text-[8px] font-black text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-200 animate-pulse uppercase">
                    <i class="fas fa-clock mr-1"></i> Confirmation attendue
                  </span>
                </div>

                <!-- Boutons d'action si pas encore confirmé/décliné -->
                <div v-if="!req.bailleur_confirmed_at && !req.bailleur_declined_at"
                  class="mt-3 border-t border-blue-100 pt-3">

                  <div v-if="rescheduleMissionId === req.id" class="animate-fadeIn">
                    <label class="block text-[8px] font-black text-gray-400 uppercase mb-1">Nouvelle date suggérée
                      *</label>
                    <input v-model="rescheduleForm.suggested_at" type="datetime-local"
                      class="w-full text-[10px] p-2 rounded-lg border border-red-100 mb-2 focus:ring-1 focus:ring-red-400 outline-none" />
                    <textarea v-model="rescheduleForm.notes" placeholder="Message pour l'agent..."
                      class="w-full text-[10px] p-2 rounded-lg border border-red-100 mb-2 focus:ring-1 focus:ring-red-400 outline-none"
                      rows="2"></textarea>

                    <div class="flex gap-2 justify-end">
                      <button @click="rescheduleMissionId = null"
                        class="px-2 py-1 bg-gray-100 text-gray-500 rounded text-[8px] font-black uppercase">Annuler</button>
                      <button @click="submitReschedule(req)"
                        :disabled="!rescheduleForm.suggested_at || isProcessingAudit"
                        class="px-3 py-1 bg-red-600 text-white rounded text-[8px] font-black uppercase disabled:opacity-50">Envoyer</button>
                    </div>
                  </div>

                  <div v-else class="flex gap-2 justify-end">
                    <button @click="rescheduleMissionId = req.id"
                      class="px-2 py-1.5 bg-white text-red-600 border border-red-200 rounded-lg text-[8px] font-black uppercase hover:bg-red-50 transition-all flex items-center gap-1">
                      <i class="fas fa-times"></i> Reporter
                    </button>
                    <button @click="handleConfirmAudit(req)"
                      class="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-[8px] font-black uppercase hover:bg-blue-700 transition-all flex items-center gap-1">
                      <i class="fas fa-check"></i> Confirmer
                    </button>
                  </div>
                </div>

                <p v-if="req.agent_notes"
                  class="text-[9px] text-blue-600 italic text-right mt-2 border-t border-blue-50 pt-1">
                  <i class="fas fa-quote-left mr-1 opacity-50"></i>{{ req.agent_notes }}
                </p>
              </div>
              <div class="flex gap-2">
                <button @click="openDetail(req)"
                  class="px-4 py-2 bg-[#1B0B38] text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#E54801] transition-all flex items-center justify-center gap-2">
                  <i class="fas fa-eye"></i> Détails
                </button>
                <button v-if="['pending', 'assigned'].includes(req.status)" @click="handleEdit(req)"
                  class="w-9 h-9 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center"
                  title="Modifier">
                  <i class="fas fa-pen text-xs"></i>
                </button>
                <button v-if="['pending', 'assigned'].includes(req.status)" @click="confirmDelete(req)"
                  class="w-9 h-9 bg-red-100 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all flex items-center justify-center"
                  title="Supprimer">
                  <i class="fas fa-trash text-xs"></i>
                </button>
              </div>
              <span v-if="req.visited_at"
                class="text-[9px] font-bold text-green-600 text-center uppercase tracking-widest">
                Audit Réalisé le {{ formatDate(req.visited_at) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- MODAL DÉTAILS -->
      <div v-if="selectedRequest"
        class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#1B0B38]/60 backdrop-blur-sm">
        <div class="bg-white w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl animate-modal relative">
          <!-- Close Button -->
          <button @click="closeDetail"
            class="absolute top-6 right-6 w-10 h-10 bg-gray-50 text-gray-400 hover:text-[#1B0B38] rounded-full flex items-center justify-center transition-all z-10">
            <i class="fas fa-times"></i>
          </button>

          <!-- Top Section: Image & Header -->
          <div class="p-8 pb-4">
            <div class="flex items-start gap-6">
              <div
                class="w-20 h-20 rounded-3xl bg-orange-50 text-[#E54801] flex items-center justify-center text-3xl shrink-0">
                <i :class="getCategoryIcon(selectedRequest.category)"></i>
              </div>
              <div>
                <span :class="[
                  'px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest inline-block mb-3',
                  getStatusClass(selectedRequest.status),
                ]">
                  {{ getStatusLabel(selectedRequest.status) }}
                </span>
                <h2 class="text-2xl font-black text-[#1B0B38] mb-1">
                  {{ selectedRequest.title }}
                </h2>
                <p class="text-xs text-gray-500 font-bold uppercase tracking-widest">
                  Estimation : <span class="text-[#E54801]">{{ formatPrice(selectedRequest.price_estimate) }}
                    FCFA</span>
                </p>
              </div>
            </div>
          </div>

          <!-- Content Scrollable -->
          <div class="p-8 pt-4 overflow-y-auto max-h-[60vh] custom-scrollbar">
            <!-- Timeline -->
            <div class="mb-10">
              <h4 class="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-6">
                Progression de l'audit
              </h4>
              <div class="flex items-center justify-between relative">
                <div class="absolute top-5 left-8 right-8 h-1 bg-gray-100 rounded-full"></div>
                <div v-for="step in statusSteps" :key="step.key" class="relative z-10 flex flex-col items-center gap-2">
                  <div :class="[
                    'w-10 h-10 rounded-xl flex items-center justify-center text-sm border-2 transition-all',
                    isStepDone(step.key) ? 'bg-green-500 border-green-500 text-white' :
                      isCurrentStep(step.key) ? 'bg-[#E54801] border-[#E54801] text-white' : 'bg-white border-gray-100 text-gray-300'
                  ]">
                    <i :class="isStepDone(step.key) ? 'fas fa-check' : step.icon"></i>
                  </div>
                  <span
                    :class="['text-[9px] font-black uppercase tracking-tighter', isCurrentStep(step.key) ? 'text-[#E54801]' : 'text-gray-400']">
                    {{ step.label }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Details Grid -->
            <div class="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h4 class="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-4">
                  Emplacement
                </h4>
                <div class="space-y-3">
                  <div class="flex items-center gap-3">
                    <i class="fas fa-city text-[#1B0B38] opacity-20 w-4"></i>
                    <p class="text-sm font-bold text-[#1B0B38]">Ville: <span class="text-gray-500">{{
                      selectedRequest.city }}</span></p>
                  </div>
                  <div class="flex items-center gap-3">
                    <i class="fas fa-map-location-dot text-[#1B0B38] opacity-20 w-4"></i>
                    <p class="text-sm font-bold text-[#1B0B38]">Quartier: <span class="text-gray-500">{{
                      selectedRequest.location }}</span></p>
                  </div>
                </div>
              </div>
              <div>
                <h4 class="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-4">
                  Caractéristiques
                </h4>
                <div class="space-y-3">
                  <div class="flex items-center gap-3">
                    <i class="fas fa-vector-square text-[#1B0B38] opacity-20 w-4"></i>
                    <p class="text-sm font-bold text-[#1B0B38]">Surface: <span class="text-gray-500">{{
                      selectedRequest.area || '—' }} m²</span></p>
                  </div>
                  <div class="flex items-center gap-3">
                    <i class="fas fa-bed text-[#1B0B38] opacity-20 w-4"></i>
                    <p class="text-sm font-bold text-[#1B0B38]">Chambres: <span class="text-gray-500">{{
                      selectedRequest.bedrooms || '—' }}</span></p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Description -->
            <div class="mb-8">
              <h4 class="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-4">
                Description du bien
              </h4>
              <p class="text-sm text-gray-600 leading-relaxed bg-gray-50 p-5 rounded-2xl border border-gray-100">
                {{ selectedRequest.description || 'Aucune description fournie.' }}
              </p>
            </div>

            <!-- Media/Docs -->
            <div v-if="selectedRequest.documents && selectedRequest.documents.length">
              <h4 class="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-4">
                Documents & Photos
              </h4>
              <div class="grid grid-cols-4 gap-4">
                <div v-for="(doc, i) in selectedRequest.documents" :key="i"
                  class="aspect-square rounded-xl bg-gray-100 overflow-hidden relative group">
                  <img :src="getFileUrl(doc)" class="w-full h-full object-cover" />
                  <div
                    class="absolute inset-0 bg-[#1B0B38]/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                    <a :href="getFileUrl(doc)" target="_blank"
                      class="w-8 h-8 rounded-full bg-white text-[#1B0B38] flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                      <i class="fas fa-external-link-alt text-[10px]"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom Actions -->
          <div class="p-8 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <div v-if="selectedRequest.agent" class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-full bg-orange-400 flex items-center justify-center text-white font-black text-sm">
                {{ selectedRequest.agent.name.charAt(0) }}
              </div>
              <div>
                <p class="text-[9px] font-black text-gray-400 uppercase tracking-widest">Agent Assigné</p>
                <p class="text-xs font-black text-[#1B0B38]">{{ selectedRequest.agent.name }}</p>
              </div>
            </div>
            <div v-else class="text-gray-400 text-[10px] font-bold uppercase italic">
              En attente d'affectation d'agent
            </div>

            <div class="flex gap-3">
              <button v-if="['pending', 'assigned'].includes(selectedRequest.status)"
                @click="confirmDelete(selectedRequest)"
                class="px-5 py-3 bg-red-50 text-red-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">
                Supprimer
              </button>
              <button v-if="['pending', 'assigned'].includes(selectedRequest.status)"
                @click="handleEdit(selectedRequest)"
                class="px-5 py-3 bg-[#1B0B38] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#E54801] transition-all">
                Modifier la demande
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import DashboardLayout from "../../layouts/DashboardLayout.vue";
import { RouterLink, useRouter } from "vue-router";
import axios from "../../axios";
const router = useRouter();
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
}
const getFileUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const baseUrl = axios.defaults.baseURL?.replace(/\/$/, "") || "http://localhost:8000";
  return `${baseUrl}/storage/${path.replace(/^\//, "").replace(/^storage\//, "")}`;
};

// ── Résolution RDV Audit ──
const isProcessingAudit = ref(false);

const handleConfirmAudit = async (req) => {
  if (isProcessingAudit.value) return;
  isProcessingAudit.value = true;
  try {
    const { data } = await axios.post(`/api/bailleur/publication-requests/${req.id}/confirm-audit`);
    if (data.success) {
      alert(data.message);
      // Actualiser les données locales
      const idx = requests.value.findIndex(r => r.id === req.id);
      if (idx !== -1) {
        requests.value[idx] = data.data;
        if (selectedRequest.value?.id === req.id) {
          selectedRequest.value = data.data;
        }
      }
    }
  } catch (err) {
    console.error("Erreur confirmation audit:", err);
    alert("Une erreur est survenue lors de la confirmation.");
  } finally {
    isProcessingAudit.value = false;
  }
};

const rescheduleMissionId = ref(null);
const rescheduleForm = reactive({
  suggested_at: "",
  notes: ""
});

const submitReschedule = async (req) => {
  if (isProcessingAudit.value) return;
  isProcessingAudit.value = true;
  try {
    const { data } = await axios.post(`/api/bailleur/publication-requests/${req.id}/decline-audit`, {
      suggested_at: rescheduleForm.suggested_at,
      notes: rescheduleForm.notes
    });
    if (data.success) {
      alert(data.message);
      rescheduleMissionId.value = null;
      // Reset form
      rescheduleForm.suggested_at = "";
      rescheduleForm.notes = "";

      const idx = requests.value.findIndex(r => r.id === req.id);
      if (idx !== -1) {
        requests.value[idx] = data.data;
      }
    }
  } catch (err) {
    console.error("Erreur report audit:", err);
    alert(err.response?.data?.message || "Une erreur est survenue.");
  } finally {
    isProcessingAudit.value = false;
  }
};

const handleDeclineAudit = async (req) => {
  const notes = prompt("Veuillez indiquer pourquoi vous souhaitez reporter le rendez-vous (Optionnel) :");
  if (notes === null) return; // Annulation du prompt

  if (isProcessingAudit.value) return;
  isProcessingAudit.value = true;
  try {
    const { data } = await axios.post(`/api/bailleur/publication-requests/${req.id}/decline-audit`, { notes });
    if (data.success) {
      alert(data.message);
      const idx = requests.value.findIndex(r => r.id === req.id);
      if (idx !== -1) {
        requests.value[idx] = data.data;
        if (selectedRequest.value?.id === req.id) {
          selectedRequest.value = data.data;
        }
      }
    }
  } catch (err) {
    console.error("Erreur report audit:", err);
    alert("Une erreur est survenue.");
  } finally {
    isProcessingAudit.value = false;
  }
};

// ── Actions: Edit & Delete ──
const handleEdit = (req) => {
  router.push({
    name: "PublierBien",
    query: { edit: req.id }
  });
};

const confirmDelete = async (req) => {
  if (confirm(`Êtes-vous sûr de vouloir supprimer la demande "${req.title}" ?`)) {
    try {
      const res = await axios.delete(`/api/bailleur/publication-requests/${req.id}`);
      if (res.data.success) {
        requests.value = requests.value.filter(r => r.id !== req.id);
        if (selectedRequest.value?.id === req.id) {
          selectedRequest.value = null;
        }
        alert(res.data.message || "Demande supprimée avec succès.");
      }
    } catch (err) {
      console.error("Erreur suppression demande:", err);
      alert(err.response?.data?.message || "Une erreur est survenue lors de la suppression.");
    }
  }
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
const formatPrice = (p) => new Intl.NumberFormat("fr-CM").format(p || 0);
// const formatDate = (d) =>
//   d
//     ? new Date(d).toLocaleDateString("fr-FR", {
//       day: "numeric",
//       month: "short",
//     })
//     : "—";
// const formatDateFull = (d) =>
//   d
//     ? new Date(d).toLocaleDateString("fr-FR", {
//       day: "numeric",
//       month: "long",
//       year: "numeric",
//     })
//     : "—";

const formatDate = (d) => {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("fr-CM", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
};

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
