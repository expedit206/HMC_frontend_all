<template>
  <!-- Dashboard
    -->
  <DashboardLayout>


    <div class="py-8 px-4">
      <div class="max-w-3xl mx-auto">
        <!-- En-tête -->
        <div class="mb-8">
          <router-link :to="{ name: 'Annonces' }"
            class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#E54801] transition-colors mb-4">
            <i class="fas fa-arrow-left"></i> Retour aux annonces
          </router-link>
          <h1 class="text-2xl font-black text-[#1B0B38]">
            Suivi de ma demande de location
          </h1>
          <p class="text-gray-500 text-sm mt-1">
            Suivez l'avancement de votre dossier en temps réel
          </p>
        </div>

        <!-- Loading -->
        <div v-if="isLoading" class="flex justify-center py-20">
          <div class="w-12 h-12 border-4 border-[#E54801]/20 border-t-[#E54801] rounded-full animate-spin"></div>
        </div>

        <!-- ══════════ Sélecteur de procédures multiples ══════════ -->
        <div v-if="allVisits.length > 1" class="mb-6">
          <p class="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">
            Procédures actives ({{ allVisits.length }})
          </p>
          <div class="space-y-2">
            <button v-for="v in allVisits" :key="v.id" @click="selectVisit(v)" :class="[
              'w-full text-left flex items-center gap-3 p-3 rounded-xl border-2 transition-all',
              currentVisit?.id === v.id
                ? 'border-[#E54801] bg-orange-50'
                : 'border-gray-100 bg-white hover:border-gray-200',
            ]">
              <div class="w-10 h-10 bg-[#E54801]/10 rounded-lg flex items-center justify-center shrink-0">
                <i class="fas fa-home text-[#E54801]"></i>
              </div>
              <div class="flex-1 min-w-0">
                <p class="font-bold text-[#1B0B38] text-sm truncate">
                  {{ v.property?.title || "Bien #" + v.property_id }}
                </p>
                <p class="text-xs text-gray-400">{{ statusLabel(v.status) }}</p>
              </div>
              <i v-if="currentVisit?.id === v.id" class="fas fa-check-circle text-[#E54801]"></i>
            </button>
          </div>
        </div>

        <!-- Aucune visite -->
        <div v-if="!isLoading && !currentVisit" class="text-center py-20">
          <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-calendar-times text-3xl text-gray-400"></i>
          </div>
          <h2 class="text-lg font-bold text-gray-700 mb-2">
            Aucune demande en cours
          </h2>
          <p class="text-gray-500 text-sm mb-6">
            Vous n'avez pas encore programmé de visite pour ce bien.
          </p>
          <router-link :to="propertyId ? `/annonces/${propertyId}` : '/annonces'"
            class="inline-flex items-center gap-2 px-6 py-3 bg-[#E54801] text-white font-bold rounded-xl hover:bg-[#c73d01] transition-colors">
            <i class="fas fa-home"></i> Voir le bien
          </router-link>
        </div>

        <!-- Processus en cours -->
        <div v-else-if="!isLoading && currentVisit" class="space-y-6">
          <!-- Bien concerné -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
            <div class="w-14 h-14 bg-[#E54801]/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <i class="fas fa-home text-2xl text-[#E54801]"></i>
            </div>
            <div class="flex-1 min-w-0">
              <h2 class="font-black text-[#1B0B38] truncate">
                {{ currentVisit.property?.title }}
              </h2>
              <p class="text-sm text-gray-500">
                <i class="fas fa-map-marker-alt text-[#E54801] mr-1"></i>
                {{ currentVisit.property?.location }}
              </p>
            </div>
            <div class="text-right flex-shrink-0">
              <p class="text-xs text-gray-400 font-bold uppercase">Loyer</p>
              <p class="font-black text-[#E54801]">
                {{ formatPrice(currentVisit.property?.price) }} FCFA
              </p>
            </div>
          </div>

          <!-- Barre de progression -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 class="text-sm font-black text-[#1B0B38] uppercase tracking-widest mb-6">
              Étapes du processus
            </h3>
            <div class="relative">
              <!-- Ligne de connexion -->
              <div class="absolute left-5 top-5 bottom-5 w-0.5 bg-gray-100"></div>
              <div
                class="absolute left-5 top-5 w-0.5 bg-gradient-to-b from-[#E54801] to-[#913327] transition-all duration-700"
                :style="{ height: progressLineHeight }"></div>

              <div class="space-y-6">
                <div v-for="(step, i) in steps" :key="i" class="flex items-start gap-4 relative">
                  <!-- Icône d'étape -->
                  <div :class="[
                    'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 transition-all duration-300 border-2',
                    step.status === 'done'
                      ? 'bg-green-500 border-green-500 text-white'
                      : step.status === 'active'
                        ? 'bg-[#E54801] border-[#E54801] text-white animate-pulse'
                        : step.status === 'rejected'
                          ? 'bg-red-500 border-red-500 text-white'
                          : 'bg-white border-gray-200 text-gray-400',
                  ]">
                    <i :class="[
                      'text-sm',
                      step.status === 'done'
                        ? 'fas fa-check'
                        : step.status === 'rejected'
                          ? 'fas fa-times'
                          : step.icon,
                    ]"></i>
                  </div>
                  <!-- Contenu -->
                  <div class="flex-1 pt-1.5 pb-4">
                    <div class="flex items-center justify-between">
                      <h4 :class="[
                        'font-bold text-sm',
                        step.status === 'done'
                          ? 'text-green-600'
                          : step.status === 'active'
                            ? 'text-[#E54801]'
                            : step.status === 'rejected'
                              ? 'text-red-500'
                              : 'text-gray-400',
                      ]">
                        {{ step.title }}
                      </h4>
                      <span v-if="step.badge" :class="[
                        'text-xs font-bold px-2 py-0.5 rounded-full',
                        step.status === 'done'
                          ? 'bg-green-100 text-green-700'
                          : step.status === 'active'
                            ? 'bg-orange-100 text-[#E54801]'
                            : step.status === 'rejected'
                              ? 'bg-red-100 text-red-600'
                              : 'bg-gray-100 text-gray-500',
                      ]">{{ step.badge }}</span>
                    </div>
                    <p class="text-xs text-gray-500 mt-0.5">
                      {{ step.description }}
                    </p>

                    <!-- Action bouton si étape active -->
                    <div v-if="step.action && step.status === 'active'" class="mt-3">
                      <button @click="step.action.handler()" :disabled="step.action.loading"
                        class="inline-flex items-center gap-2 px-4 py-2 bg-[#E54801] text-white text-xs font-bold rounded-lg hover:bg-[#c73d01] transition-colors disabled:opacity-60">
                        <i v-if="step.action.loading" class="fas fa-spinner animate-spin"></i>
                        <i v-else :class="step.action.icon"></i>
                        {{ step.action.label }}
                      </button>
                    </div>

                    <!-- Info rejet -->
                    <div v-if="
                      step.status === 'rejected' &&
                      currentApplication?.rejection_reason
                    " class="mt-2 p-3 bg-red-50 rounded-lg text-xs text-red-700">
                      <i class="fas fa-exclamation-triangle mr-1"></i>
                      {{ currentApplication.rejection_reason }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Agent assigné -->
          <div v-if="currentVisit.agent" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 class="text-sm font-black text-[#1B0B38] uppercase tracking-widest mb-4">
              Votre agent HomeCameroon
            </h3>
            <div class="flex items-center gap-4">
              <div
                class="w-12 h-12 bg-[#1B0B38] rounded-xl flex items-center justify-center text-white font-bold text-lg overflow-hidden">
                <img v-if="currentVisit.agent?.avatar_url" :src="currentVisit.agent.avatar_url"
                  class="w-full h-full object-cover" />
                <span v-else>{{
                  currentVisit.agent?.name?.charAt(0) || "A"
                }}</span>
              </div>
              <div>
                <p class="font-bold text-[#1B0B38]">
                  {{ currentVisit.agent?.name || "Agent HomeCameroon" }}
                </p>
                <p class="text-xs text-gray-500">Agent immobilier certifié</p>
                <a v-if="currentVisit.agent?.phone" :href="`tel:${currentVisit.agent.phone}`"
                  class="text-xs text-[#E54801] hover:underline mt-1 block">
                  <i class="fas fa-phone mr-1"></i>{{ currentVisit.agent.phone }}
                </a>
              </div>
            </div>
          </div>

          <!-- Détails de la visite -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 class="text-sm font-black text-[#1B0B38] uppercase tracking-widest mb-4">
              Détails de la visite
            </h3>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p class="text-gray-400 text-xs font-bold uppercase mb-1">
                  Date prévue
                </p>
                <p class="font-bold text-[#1B0B38]">
                  {{ formatDate(currentVisit.scheduled_at) }}
                </p>
              </div>
              <div>
                <p class="text-gray-400 text-xs font-bold uppercase mb-1">
                  Statut
                </p>
                <span :class="statusBadgeClass(currentVisit.status)" class="text-xs font-bold px-2 py-1 rounded-full">
                  {{ statusLabel(currentVisit.status) }}
                </span>
              </div>
              <div>
                <p class="text-gray-400 text-xs font-bold uppercase mb-1">
                  Votre confirmation
                </p>
                <p :class="currentVisit.confirmed_by_user
                  ? 'text-green-600'
                  : 'text-orange-500'
                  " class="font-bold">
                  <i :class="currentVisit.confirmed_by_user
                    ? 'fas fa-check-circle'
                    : 'fas fa-clock'
                    " class="mr-1"></i>
                  {{
                    currentVisit.confirmed_by_user ? "Confirmée" : "En attente"
                  }}
                </p>
              </div>
              <div>
                <p class="text-gray-400 text-xs font-bold uppercase mb-1">
                  Confirmation agent
                </p>
                <p :class="currentVisit.confirmed_by_agent
                  ? 'text-green-600'
                  : 'text-orange-500'
                  " class="font-bold">
                  <i :class="currentVisit.confirmed_by_agent
                    ? 'fas fa-check-circle'
                    : 'fas fa-clock'
                    " class="mr-1"></i>
                  {{
                    currentVisit.confirmed_by_agent ? "Confirmée" : "En attente"
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Payment Modal -->
      <Teleport to="body">
        <div v-if="isPaymentModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="closePaymentModal"></div>

          <!-- Modal Content -->
          <div class="relative bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-fadeIn">
            <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white z-20">
              <h3 class="font-black text-[#1B0B38] text-lg flex items-center gap-2">
                <i class="fas fa-money-check-alt text-orange-500"></i>
                Paiement initial
              </h3>
              <button @click="closePaymentModal"
                class="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-red-500 flex items-center justify-center transition-colors">
                <i class="fas fa-times"></i>
              </button>
            </div>

            <form @submit.prevent="submitPayment" class="p-6">
              <div class="mb-6 bg-orange-50 p-4 rounded-2xl flex items-center justify-between border border-orange-100">
                <span class="text-xs font-bold text-orange-800 uppercase tracking-wide">Total à régler</span>
                <span class="text-xl font-black text-orange-600">
                  {{
                    formatPrice(
                      (parseInt(currentApplication?.rental?.advance_amount) ||
                        0) +
                      (parseInt(currentApplication?.rental?.caution_amount) ||
                        0),
                    )
                  }}
                  FCFA
                </span>
              </div>

              <div class="space-y-4">
                <div>
                  <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Méthode</label>
                  <div class="grid grid-cols-2 gap-3">
                    <button type="button" @click="paymentForm.method = 'om'" :class="[
                      'p-3 rounded-xl border flex items-center justify-center gap-2 font-bold transition-all text-sm',
                      paymentForm.method === 'om'
                        ? 'border-orange-500 bg-orange-50 text-orange-600'
                        : 'border-gray-200 text-gray-500 hover:bg-gray-50',
                    ]">
                      Orange Money
                    </button>
                    <button type="button" @click="paymentForm.method = 'momo'" :class="[
                      'p-3 rounded-xl border flex items-center justify-center gap-2 font-bold transition-all text-sm',
                      paymentForm.method === 'momo'
                        ? 'border-yellow-500 bg-yellow-50 text-yellow-600'
                        : 'border-gray-200 text-gray-500 hover:bg-gray-50',
                    ]">
                      MTN MoMo
                    </button>
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Numéro</label>
                  <div class="relative">
                    <i class="fas fa-phone-alt absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    <input type="text" v-model="paymentForm.phone" placeholder="Ex: 6XX XX XX XX" required
                      class="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium text-gray-800" />
                  </div>
                </div>
              </div>

              <div class="mt-8 flex gap-3">
                <button type="button" @click="closePaymentModal"
                  class="flex-1 py-3 px-4 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-colors">
                  Annuler
                </button>
                <button type="submit" :disabled="isSubmittingPayment"
                  class="flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed bg-orange-500 text-white hover:bg-orange-600 shadow-md">
                  <i v-if="isSubmittingPayment" class="fas fa-spinner animate-spin"></i>
                  <i v-else class="fas fa-lock"></i>
                  Payer
                </button>
              </div>

              <p class="text-[10px] text-center text-gray-400 mt-4 leading-relaxed">
                L'agent HomeCameroon sera notifié immédiatement pour vous remettre
                les clés.
              </p>
            </form>
          </div>
        </div>
      </Teleport>
    </div>
  </DashboardLayout>

</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import { useRentalStore } from "../../stores/rental";
import axios from "../../axios";
import DashboardLayout from "../../layouts/DashboardLayout.vue";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const rentalStore = useRentalStore();

const isLoading = ref(true);
const isConfirmingVisit = ref(false);
const isSubmittingApplication = ref(false);
const propertyId = ref(route.query.property_id || null);
const currentVisit = ref(null);
const currentApplication = ref(null);
const allVisits = ref([]);

// ── Chargement des données ────────────────────────────────────────────────────
const loadData = async () => {
  isLoading.value = true;
  try {
    await rentalStore.fetchVisits();
    await rentalStore.fetchApplications();

    // Toutes les visites actives (pour le sélecteur)
    allVisits.value = rentalStore.visits.filter((v) =>
      ["pending", "confirmed", "completed"].includes(v.status),
    );

    // Trouver la visite active pour ce bien
    if (propertyId.value) {
      currentVisit.value =
        rentalStore.visits.find(
          (v) =>
            v.property_id == propertyId.value &&
            ["pending", "confirmed", "completed"].includes(v.status),
        ) ||
        rentalStore.visits.find((v) => v.property_id == propertyId.value) ||
        null;

      currentApplication.value =
        rentalStore.applications.find(
          (a) => a.property_id == propertyId.value,
        ) || null;
    } else {
      // Prendre la visite la plus récente si pas de property_id
      currentVisit.value = allVisits.value[0] || null;
      if (currentVisit.value) {
        propertyId.value = currentVisit.value.property_id;
        currentApplication.value =
          rentalStore.applications.find(
            (a) => a.property_id == propertyId.value,
          ) || null;
      }
    }
  } finally {
    isLoading.value = false;
  }
};

// ── Gestion du Paiement Initial ───────────────────────────────────────────────
const isPaymentModalOpen = ref(false);

const isSubmittingPayment = ref(false);
const paymentForm = ref({
  method: "om",
  phone: "",
});

const openPaymentModal = () => {
  isPaymentModalOpen.value = true;
};

const closePaymentModal = () => {
  isPaymentModalOpen.value = false;
  paymentForm.value.phone = "";
};

const submitPayment = async () => {
  if (!currentApplication.value?.rental?.id) return;

  isSubmittingPayment.value = true;
  try {
    const { data } = await axios.post(
      `/api/prospect/rentals/${currentApplication.value.rental.id}/pay-initial`,
    );

    if (data.success && data.redirect_url) {
      window.location.href = data.redirect_url;
    } else if (data.success) {
      alert("Votre paiement a été soumis avec succès.");
      closePaymentModal();
      await loadData();
    }
  } catch (err) {
    alert(
      err.response?.data?.message ||
      "Erreur lors de l'initialisation du paiement",
    );
  } finally {
    isSubmittingPayment.value = false;
  }
};

const isProcessingVisitPayment = ref(false);
const handleVisitPayment = async () => {
  if (
    !currentVisit.value ||
    currentVisit.value.fee_payment_status !== "pending"
  )
    return;

  isProcessingVisitPayment.value = true;
  try {
    const { data } = await axios.post(
      `/api/prospect/visits/${currentVisit.value.id}/pay`,
    );
    if (data.success && data.redirect_url) {
      window.location.href = data.redirect_url;
    }
  } catch (err) {
    alert(
      err.response?.data?.message ||
      "Erreur lors de l'initialisation du paiement",
    );
  } finally {
    isProcessingVisitPayment.value = false;
  }
};

// ── Sélectionner une procédure ────────────────────────────────────────────────
const selectVisit = (visit) => {
  currentVisit.value = visit;
  propertyId.value = visit.property_id;
  currentApplication.value =
    rentalStore.applications.find((a) => a.property_id == visit.property_id) ||
    null;
};

// ── Confirmer la visite (côté user) ──────────────────────────────────────────
const confirmVisit = async () => {
  if (!currentVisit.value) return;
  isConfirmingVisit.value = true;
  try {
    const result = await rentalStore.confirmVisit(currentVisit.value.id);
    if (result?.success) {
      currentVisit.value = result.data;
      if (result.canApply) {
        // Visite terminée → proposer de soumettre un dossier
        await loadData();
      }
    }
  } finally {
    isConfirmingVisit.value = false;
  }
};

// ── Steps du processus ────────────────────────────────────────────────────────
const steps = computed(() => {
  if (!currentVisit.value) return [];

  const visit = currentVisit.value;
  const app = currentApplication.value;
  const rental = app?.rental;

  const visitDone = visit.status === "completed";
  const visitActive = ["pending", "confirmed"].includes(visit.status);
  const appDone = app?.status === "validated";
  const appRejected = app?.status === "rejected";
  const appActive = app && !appDone && !appRejected;
  const rentalActive = rental && rental.status !== "active";
  const rentalDone = rental?.status === "active";

  return [
    {
      title: "Visite programmée",
      description: `Visite le ${formatDate(visit.scheduled_at)}`,
      icon: "fas fa-calendar-check",
      badge: visitDone ? "Terminée" : visitActive ? "En cours" : null,
      status: visitDone ? "done" : visitActive ? "active" : "pending",
      action: visitActive
        ? visit.fee_payment_status === "pending"
          ? {
            label: "Régler les frais (10 FCFA)",
            icon: "fas fa-credit-card",
            loading: isProcessingVisitPayment.value,
            handler: handleVisitPayment,
          }
          : !visit.confirmed_by_user
            ? {
              label: "Confirmer ma présence",
              icon: "fas fa-check",
              loading: isConfirmingVisit.value,
              handler: confirmVisit,
            }
            : null
        : null,
    },
    {
      title: "Dossier de candidature",
      description: app
        ? appRejected
          ? "Dossier rejeté"
          : appDone
            ? "Dossier validé"
            : "Dossier en cours d'examen"
        : visitDone
          ? "Vous pouvez maintenant soumettre votre dossier"
          : "En attente de la visite",
      icon: "fas fa-folder-open",
      badge: app
        ? appDone
          ? "Validé"
          : appRejected
            ? "Rejeté"
            : "En examen"
        : null,
      status: appDone
        ? "done"
        : appRejected
          ? "rejected"
          : app
            ? "active"
            : visitDone
              ? "active"
              : "pending",
      action:
        visitDone && !app
          ? {
            label: "Soumettre mon dossier",
            icon: "fas fa-file-upload",
            loading: false,
            handler: () =>
              router.push({
                path: "/dossier-location",
                query: { visit_id: visit.id, property_id: propertyId.value },
              }),
          }
          : null,
    },
    {
      title: "Paiement initial",
      description: rental
        ? rentalDone
          ? `Location active depuis le ${formatDate(rental.start_date)}`
          : rental.payment_phase_status === "paid"
            ? "Paiement soumis, en attente de validation de l'agent"
            : `Avance + Caution : ${formatPrice((rental.advance_amount || 0) + (rental.caution_amount || 0))} FCFA`
        : "En attente de validation du dossier",
      icon: "fas fa-money-bill-wave",
      badge: rental
        ? rentalDone
          ? "Payé & confirmé"
          : rental.payment_phase_status === "paid"
            ? "En vérification"
            : "En attente"
        : null,
      status:
        rentalDone || (rental && rental.payment_phase_status === "paid")
          ? "done"
          : rentalActive
            ? "active"
            : "pending",
      action:
        rentalActive && rental.payment_phase_status === "pending"
          ? {
            label: "Effectuer le paiement",
            icon: "fas fa-credit-card",
            loading: false,
            handler: openPaymentModal,
          }
          : null,
    },
    {
      title: "Location active",
      description: rentalDone
        ? "Félicitations ! Vous êtes officiellement locataire."
        : "Confirmation de réception du paiement par l'agent",
      icon: "fas fa-key",
      badge: rentalDone ? "Actif ✓" : null,
      status: rentalDone ? "done" : "pending",
    },
  ];
});

// Hauteur de la barre de progression
const progressLineHeight = computed(() => {
  const doneCount = steps.value.filter((s) => s.status === "done").length;
  const activeIdx = steps.value.findIndex((s) => s.status === "active");
  const total = steps.value.length;
  if (doneCount === total) return "100%";
  const pct = ((doneCount + (activeIdx >= 0 ? 0.5 : 0)) / total) * 100;
  return `${pct}%`;
});

// ── Utilitaires ───────────────────────────────────────────────────────────────
const formatPrice = (p) => new Intl.NumberFormat("fr-FR").format(p || 0);

const formatDate = (d) => {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const statusLabel = (s) =>
  ({
    pending: "En attente",
    confirmed: "Confirmée",
    completed: "Terminée",
    cancelled: "Annulée",
  })[s] || s;

const statusBadgeClass = (s) =>
  ({
    pending: "bg-orange-100 text-orange-600",
    confirmed: "bg-blue-100 text-blue-600",
    completed: "bg-green-100 text-green-600",
    cancelled: "bg-red-100 text-red-600",
  })[s] || "bg-gray-100 text-gray-500";

onMounted(loadData);
</script>

<style scoped>
.animate-spin {
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
