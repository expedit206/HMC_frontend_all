<template>
  <div class="dashboard-page-content">
    <div class="py-8 px-4">
      <div class="max-w-3xl mx-auto">
        <!-- En-tête -->
        <div class="mb-8">
          <router-link
            :to="{ name: 'Annonces' }"
            class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-secondary transition-colors mb-4"
          >
            <i class="fas fa-arrow-left"></i> Retour aux annonces
          </router-link>
          <h1 class="text-2xl font-black text-foreground">
            Suivi de ma demande de location
          </h1>
          <p class="text-muted-foreground text-sm mt-1">
            Suivez l'avancement de votre dossier en temps réel
          </p>
        </div>

        <!-- Loading -->
        <div v-if="isLoading" class="flex justify-center py-20">
          <div
            class="w-12 h-12 border-4 border-secondary/20 border-t-secondary rounded-full animate-spin"
          ></div>
        </div>

        <!-- ══════════ Sélecteur de procédures multiples ══════════ -->
        <div v-if="allVisits.length > 1" class="mb-6">
          <p
            class="text-xs font-black text-muted-foreground uppercase tracking-widest mb-3"
          >
            Procédures actives ({{ allVisits.length }})
          </p>
          <div class="space-y-2">
            <button
              v-for="v in allVisits"
              :key="v.id"
              @click="selectVisit(v)"
              :class="[
                'w-full text-left flex items-center gap-3 p-3 rounded-xl border-2 transition-all',
                currentVisit?.id === v.id
                  ? 'border-secondary bg-secondary/5'
                  : 'border-border bg-card hover:border-muted-foreground',
              ]"
            >
              <div
                class="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center shrink-0"
              >
                <i class="fas fa-home text-secondary"></i>
              </div>
              <div class="flex-1 min-w-0">
                <p class="font-bold text-foreground text-sm truncate">
                  {{ v.property?.title || "Bien #" + v.property_id }}
                </p>
                <p class="text-xs text-muted-foreground">
                  {{ statusLabel(v.status) }}
                </p>
              </div>
              <i
                v-if="currentVisit?.id === v.id"
                class="fas fa-check-circle text-secondary"
              ></i>
            </button>
          </div>
        </div>

        <!-- Aucune visite -->
        <div v-if="!isLoading && !currentVisit" class="text-center py-20">
          <div
            class="w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <i class="fas fa-calendar-times text-3xl text-muted-foreground/50"></i>
          </div>
          <h2 class="text-lg font-bold text-foreground mb-2">
            Aucune demande en cours
          </h2>
          <p class="text-muted-foreground text-sm mb-6">
            Vous n'avez pas encore programmé de visite pour ce bien.
          </p>
          <router-link
            :to="propertyId ? `/annonces/${propertyId}` : '/annonces'"
            class="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground font-bold rounded-xl hover:bg-secondary/90 transition-colors"
          >
            <i class="fas fa-home"></i> Voir le bien
          </router-link>
        </div>

        <!-- Processus en cours -->
        <div v-else-if="!isLoading && currentVisit" class="space-y-6">
          <!-- Bien concerné -->
          <div
            class="bg-card rounded-2xl shadow-sm border border-border p-5 flex items-center gap-4"
          >
            <div
              class="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0"
            >
              <i class="fas fa-home text-2xl text-secondary"></i>
            </div>
            <div class="flex-1 min-w-0">
              <h2 class="font-black text-foreground truncate">
                {{ currentVisit.property?.title }}
              </h2>
              <p class="text-sm text-muted-foreground">
                <i class="fas fa-map-marker-alt text-secondary mr-1"></i>
                {{ currentVisit.property?.location }}
              </p>
            </div>
            <div class="text-right flex-shrink-0">
              <p class="text-xs text-muted-foreground font-bold uppercase">
                Loyer
              </p>
              <p class="font-black text-secondary">
                {{ formatPrice(currentVisit.property?.price) }} FCFA
              </p>
            </div>
          </div>

          <!-- Barre de progression -->
          <div class="bg-card rounded-2xl shadow-sm border border-border p-6">
            <h3
              class="text-sm font-black text-foreground uppercase tracking-widest mb-6"
            >
              Étapes du processus
            </h3>
            <div class="relative">
              <!-- Ligne de connexion -->
              <div
                class="absolute left-5 top-5 bottom-5 w-0.5 bg-border"
              ></div>
              <div
                class="absolute left-5 top-5 w-0.5 bg-gradient-to-b from-secondary to-secondary/80 transition-all duration-700"
                :style="{ height: progressLineHeight }"
              ></div>

              <div class="space-y-6">
                <div
                  v-for="(step, i) in steps"
                  :key="i"
                  class="flex items-start gap-4 relative"
                >
                  <!-- Icône d'étape -->
                  <div
                    :class="[
                      'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 transition-all duration-300 border-2',
                      step.status === 'done'
                        ? 'bg-green-500 border-green-500 text-white'
                        : step.status === 'active'
                          ? 'bg-secondary border-secondary text-white animate-pulse'
                          : step.status === 'rejected'
                            ? 'bg-destructive border-destructive text-white'
                            : 'bg-card border-border text-muted-foreground',
                    ]"
                  >
                    <i
                      :class="[
                        'text-sm',
                        step.status === 'done'
                          ? 'fas fa-check'
                          : step.status === 'rejected'
                            ? 'fas fa-times'
                            : step.icon,
                      ]"
                    ></i>
                  </div>
                  <!-- Contenu -->
                  <div class="flex-1 pt-1.5 pb-4">
                    <div class="flex items-center justify-between">
                      <h4
                        :class="[
                          'font-bold text-sm',
                          step.status === 'done'
                            ? 'text-green-600 dark:text-green-400'
                            : step.status === 'active'
                              ? 'text-secondary'
                              : step.status === 'rejected'
                                ? 'text-destructive'
                                : 'text-muted-foreground',
                        ]"
                      >
                        {{ step.title }}
                      </h4>
                      <span
                        v-if="step.badge"
                        :class="[
                          'text-xs font-bold px-2 py-0.5 rounded-full',
                          step.status === 'done'
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                            : step.status === 'active'
                              ? 'bg-secondary/10 text-secondary'
                              : step.status === 'rejected'
                                ? 'bg-destructive/10 text-destructive'
                                : 'bg-muted/20 text-muted-foreground',
                        ]"
                        >{{ step.badge }}</span
                      >
                    </div>
                    <p class="text-xs text-muted-foreground mt-0.5">
                      {{ step.description }}
                    </p>

                    <!-- Action bouton si étape active -->
                    <div
                      v-if="step.action && step.status === 'active'"
                      class="mt-3"
                    >
                      <button
                        @click="step.action.handler()"
                        :disabled="step.action.loading"
                        class="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground text-xs font-bold rounded-lg hover:bg-secondary/90 transition-colors disabled:opacity-60"
                      >
                        <i
                          v-if="step.action.loading"
                          class="fas fa-spinner animate-spin"
                        ></i>
                        <i v-else :class="step.action.icon"></i>
                        {{ step.action.label }}
                      </button>
                    </div>

                    <!-- Info rejet -->
                    <div
                      v-if="
                        step.status === 'rejected' &&
                        currentApplication?.rejection_reason
                      "
                      class="mt-2 p-3 bg-destructive/10 rounded-lg text-xs text-destructive"
                    >
                      <i class="fas fa-exclamation-triangle mr-1"></i>
                      {{ currentApplication.rejection_reason }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Agent assigné -->
          <div
            v-if="currentVisit.agent"
            class="bg-card rounded-2xl shadow-sm border border-border p-5"
          >
            <h3
              class="text-sm font-black text-foreground uppercase tracking-widest mb-4"
            >
              Votre agent HomeCameroon
            </h3>
            <div class="flex items-center gap-4">
              <div
                class="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold text-lg overflow-hidden"
              >
                <img
                  v-if="currentVisit.agent?.avatar_url"
                  :src="currentVisit.agent.avatar_url"
                  class="w-full h-full object-cover"
                />
                <span v-else>{{
                  currentVisit.agent?.name?.charAt(0) || "A"
                }}</span>
              </div>
              <div>
                <p class="font-bold text-foreground">
                  {{ currentVisit.agent?.name || "Agent HomeCameroon" }}
                </p>
                <p class="text-xs text-muted-foreground">
                  Agent immobilier certifié
                </p>
                <a
                  v-if="currentVisit.agent?.phone"
                  :href="`tel:${currentVisit.agent.phone}`"
                  class="text-xs text-secondary hover:underline mt-1 block"
                >
                  <i class="fas fa-phone mr-1"></i>{{ currentVisit.agent.phone }}
                </a>
              </div>
            </div>
          </div>

          <!-- Détails de la visite -->
          <div class="bg-card rounded-2xl shadow-sm border border-border p-5">
            <h3
              class="text-sm font-black text-foreground uppercase tracking-widest mb-4"
            >
              Détails de la visite
            </h3>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p class="text-muted-foreground text-xs font-bold uppercase mb-1">
                  Date prévue
                </p>
                <p class="font-bold text-foreground">
                  {{ formatDate(currentVisit.scheduled_at) }}
                </p>
              </div>
              <div>
                <p class="text-muted-foreground text-xs font-bold uppercase mb-1">
                  Statut
                </p>
                <span
                  :class="statusBadgeClass(currentVisit.status)"
                  class="text-xs font-bold px-2 py-1 rounded-full"
                >
                  {{ statusLabel(currentVisit.status) }}
                </span>
              </div>
              <div>
                <p class="text-muted-foreground text-xs font-bold uppercase mb-1">
                  Votre confirmation
                </p>
                <p
                  :class="
                    currentVisit.confirmed_by_user
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-orange-500 dark:text-orange-400'
                  "
                  class="font-bold"
                >
                  <i
                    :class="
                      currentVisit.confirmed_by_user
                        ? 'fas fa-check-circle'
                        : 'fas fa-clock'
                    "
                    class="mr-1"
                  ></i>
                  {{
                    currentVisit.confirmed_by_user ? "Confirmée" : "En attente"
                  }}
                </p>
              </div>
              <div>
                <p class="text-muted-foreground text-xs font-bold uppercase mb-1">
                  Confirmation agent
                </p>
                <p
                  :class="
                    currentVisit.confirmed_by_agent
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-orange-500 dark:text-orange-400'
                  "
                  class="font-bold"
                >
                  <i
                    :class="
                      currentVisit.confirmed_by_agent
                        ? 'fas fa-check-circle'
                        : 'fas fa-clock'
                    "
                    class="mr-1"
                  ></i>
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
        <div
          v-if="isPaymentModalOpen"
          class="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <!-- Backdrop -->
          <div
            class="absolute inset-0 bg-black/60 backdrop-blur-sm"
            @click="closePaymentModal"
          ></div>

          <!-- Modal Content -->
          <div
            class="relative bg-card rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-fadeIn"
          >
            <div
              class="px-6 py-4 border-b border-border flex items-center justify-between bg-card z-20"
            >
              <h3
                class="font-black text-foreground text-lg flex items-center gap-2"
              >
                <i class="fas fa-money-check-alt text-secondary"></i>
                Paiement initial
              </h3>
              <button
                @click="closePaymentModal"
                class="w-8 h-8 rounded-full bg-muted/20 text-muted-foreground hover:bg-muted/30 hover:text-destructive flex items-center justify-center transition-colors"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>

            <form @submit.prevent="submitPayment" class="p-6">
              <div
                class="mb-6 bg-secondary/10 p-4 rounded-2xl flex items-center justify-between border border-secondary/20"
              >
                <span class="text-xs font-bold text-secondary uppercase tracking-wide"
                  >Total à régler</span
                >
                <span class="text-xl font-black text-secondary">
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
                  <label
                    class="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2"
                    >Méthode</label
                  >
                  <div class="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      @click="paymentForm.method = 'om'"
                      :class="[
                        'p-3 rounded-xl border flex items-center justify-center gap-2 font-bold transition-all text-sm',
                        paymentForm.method === 'om'
                          ? 'border-secondary bg-secondary/10 text-secondary'
                          : 'border-border text-muted-foreground hover:bg-muted/20',
                      ]"
                    >
                      Orange Money
                    </button>
                    <button
                      type="button"
                      @click="paymentForm.method = 'momo'"
                      :class="[
                        'p-3 rounded-xl border flex items-center justify-center gap-2 font-bold transition-all text-sm',
                        paymentForm.method === 'momo'
                          ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30 text-yellow-600 dark:text-yellow-400'
                          : 'border-border text-muted-foreground hover:bg-muted/20',
                      ]"
                    >
                      MTN MoMo
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    class="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2"
                    >Numéro</label
                  >
                  <div class="relative">
                    <i
                      class="fas fa-phone-alt absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    ></i>
                    <input
                      type="text"
                      v-model="paymentForm.phone"
                      placeholder="Ex: 6XX XX XX XX"
                      required
                      class="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl focus:bg-card focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all font-medium text-foreground"
                    />
                  </div>
                </div>
              </div>

              <div class="mt-8 flex gap-3">
                <button
                  type="button"
                  @click="closePaymentModal"
                  class="flex-1 py-3 px-4 rounded-xl border border-border text-muted-foreground font-bold hover:bg-muted/20 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  :disabled="isSubmittingPayment"
                  class="flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-md"
                >
                  <i
                    v-if="isSubmittingPayment"
                    class="fas fa-spinner animate-spin"
                  ></i>
                  <i v-else class="fas fa-lock"></i>
                  Payer
                </button>
              </div>

              <p
                class="text-[10px] text-center text-muted-foreground mt-4 leading-relaxed"
              >
                L'agent HomeCameroon sera notifié immédiatement pour vous remettre
                les clés.
              </p>
            </form>
          </div>
        </div>
      </Teleport>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import { useRentalStore } from "../../stores/rental";
import axios from "../../axios";
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
    pending: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
    confirmed: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    completed: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    cancelled: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
  })[s] || "bg-muted/20 text-muted-foreground";

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