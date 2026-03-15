<template>
  <DashboardLayout>
    <div class="max-w-6xl mx-auto">
      <!-- Header Section -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 animate-fadeIn">
        <div>
          <h1 class="text-2xl font-bold text-foreground leading-tight">Mes Biens Immobiliers</h1>
          <p class="text-muted-foreground text-sm mt-1">
            Gérez vos propriétés et observez l'avancement du processus locatif.
          </p>
        </div>
        <div class="flex items-center gap-3">
          <button @click="mobileMenuOpen = !mobileMenuOpen"
            class="lg:hidden p-2 text-muted-foreground hover:text-secondary transition-colors">
            <i class="fas fa-bars text-xl"></i>
          </button>
          <RouterLink :to="{ name: 'PublierBien' }"
            class="px-6 py-3 bg-secondary text-secondary-foreground rounded-xl text-sm font-bold hover:shadow-lg transition-all flex items-center gap-2">

            <i class="fas fa-plus"></i>
            <span class="hidden sm:inline">Ajouter un Bien</span>
          </RouterLink>
        </div>
      </div>

      <!-- Property Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn" style="animation-delay: 0.2s">
        <!-- Loading State -->
        <template v-if="isLoading">
          <div v-for="i in 3" :key="i" class="bg-muted/20 rounded-2xl h-80 animate-pulse"></div>
        </template>

        <template v-else>
          <div v-if="properties.length === 0"
            class="col-span-full py-20 text-center bg-card rounded-2xl border border-border shadow-sm">
            <i class="fas fa-building text-5xl mb-4 text-muted-foreground/30"></i>
            <p class="text-muted-foreground font-bold">Vous n'avez pas encore publié de bien.</p>
            <RouterLink :to="{ name: 'PublierBien' }"
              class="text-secondary font-bold mt-2 inline-block hover:underline">

              Publier mon premier bien
            </RouterLink>
          </div>

          <!-- Property Card (Loop) -->
          <div v-for="property in properties" :key="property.id"
            class="bg-card rounded-xl border border-border hover:shadow-sm transition-all group flex flex-col">
            <!-- IMAGE -->
            <div class="relative h-36 overflow-hidden rounded-t-xl">
              <img :src="property.image" :alt="property.title" class="w-full h-full object-cover" />

              <span class="absolute top-2 left-2 px-2 py-0.5 text-[9px] font-bold rounded text-white"
                :class="property.status === 'vacant' ? 'bg-secondary' : 'bg-green-500'">
                {{ property.status === "vacant" ? "Vacant" : "Loué" }}
              </span>
            </div>

            <!-- CONTENT -->
            <div class="p-3 flex flex-col gap-2 flex-1">
              <div class="flex justify-between items-start">
                <h3 class="font-semibold text-sm text-foreground line-clamp-1">
                  {{ property.title }}
                </h3>

                <button @click="goToEdit(property.id)" class="text-muted-foreground hover:text-secondary text-xs">
                  <i class="fas fa-pen"></i>
                </button>
              </div>

              <p class="text-[11px] text-muted-foreground line-clamp-1">
                {{ property.location }}
              </p>

              <!-- INFOS EN LIGNE -->
              <div
                class="flex justify-between text-[11px] font-medium text-muted-foreground border-t border-border pt-2">
                <span>{{ formatPrice(property.monthly_rent || property.price) }}</span>

                <span :class="property.tenant ? 'text-foreground' : 'text-muted-foreground italic'">
                  {{ property.tenant || "Aucun locataire" }}
                </span>

                <span class="font-bold text-foreground">
                  {{ property.visits }} vues
                </span>
              </div>

              <!-- ACTIONS -->
              <div class="flex gap-2 mt-2">
                <button @click="property.status !== 'vacant' && openProcessStatus(property.id)"
                  :disabled="property.status === 'vacant'"
                  class="flex-1 py-2 text-[11px] rounded-lg font-semibold transition-all" :class="property.status === 'vacant'
                      ? 'bg-muted/20 text-muted-foreground cursor-not-allowed'
                      : 'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40'
                    ">
                  Suivi
                </button>

                <button @click="handleDelete(property.id)"
                  class="w-9 h-9 flex items-center justify-center rounded-lg border border-destructive/20 text-destructive/70 hover:bg-destructive hover:text-destructive-foreground transition-all">
                  <i class="fas fa-trash text-xs"></i>
                </button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- Tracking Modal -->
    <Teleport to="body">
      <div v-if="trackingModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="trackingModal = false"></div>

        <!-- Modal Content -->
        <div class="relative bg-card rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-slide-up">
          <div class="px-6 py-4 border-b border-border flex items-center justify-between bg-card">
            <h3 class="font-black text-foreground text-lg flex items-center gap-2">
              <i class="fas fa-chart-timeline text-secondary"></i>
              État d'avancement du dossier
            </h3>
            <button @click="trackingModal = false"
              class="w-8 h-8 rounded-full bg-muted/20 text-muted-foreground hover:bg-muted/30 hover:text-destructive flex items-center justify-center transition-colors">
              <i class="fas fa-times"></i>
            </button>
          </div>

          <div class="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
            <div v-if="isTrackingLoading" class="py-12 text-center">
              <i class="fas fa-circle-notch fa-spin text-3xl text-secondary"></i>
              <p class="text-sm text-muted-foreground mt-3">Chargement des informations...</p>
            </div>

            <div v-else-if="trackingData" class="space-y-6">
              <!-- Résumé -->
              <div class="bg-muted/20 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p class="text-xs text-muted-foreground uppercase font-bold mb-1">
                    Bien concerné
                  </p>
                  <p class="font-bold text-foreground">{{ trackingData.property?.title }}</p>
                </div>
                <div class="text-right">
                  <p class="text-xs text-muted-foreground uppercase font-bold mb-1">
                    Locataire
                  </p>
                  <p class="font-bold text-foreground">
                    {{ trackingData.tenant?.name || "—" }}
                  </p>
                </div>
              </div>

              <!-- Détails -->
              <div>
                <h4 class="text-xs font-black text-foreground uppercase tracking-widest mb-3">
                  Processus Locatif
                </h4>
                <div class="grid grid-cols-2 gap-4">
                  <div class="bg-muted/20 rounded-xl p-3">
                    <p class="text-xs text-muted-foreground">Loyer</p>
                    <p class="text-base font-bold text-secondary">
                      {{ formatPrice(trackingData.rental?.monthly_rent) }}
                    </p>
                  </div>
                  <div class="bg-muted/20 rounded-xl p-3">
                    <p class="text-xs text-muted-foreground">Avance + Caution</p>
                    <p class="text-sm font-bold text-foreground">
                      {{
                        (trackingData.rental?.advance_amount || 0) +
                        (trackingData.rental?.caution_amount || 0)
                      }}
                      FCFA
                    </p>
                  </div>
                </div>

                <div class="mt-4 space-y-3">
                  <div class="flex justify-between items-center p-3 bg-muted/20 rounded-xl">
                    <span class="text-sm font-medium text-foreground">Dossier locataire</span>
                    <span class="px-2 py-1 text-[10px] font-bold rounded-full" :class="trackingData.application?.status === 'validated'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                        : trackingData.application?.status === 'rejected'
                          ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                          : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
                      ">
                      {{ getStatusLabel(trackingData.application?.status) }}
                    </span>
                  </div>

                  <div class="flex justify-between items-center p-3 bg-muted/20 rounded-xl">
                    <span class="text-sm font-medium text-foreground">Paiement initial</span>
                    <span class="px-2 py-1 text-[10px] font-bold rounded-full" :class="trackingData.rental?.payment_phase_status === 'paid'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                        : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
                      ">
                      {{ getPaymentStatusLabel(trackingData.rental?.payment_phase_status) }}
                    </span>
                  </div>

                  <div class="flex justify-between items-center p-3 bg-muted/20 rounded-xl">
                    <span class="text-sm font-medium text-foreground">Date de début</span>
                    <span class="text-sm font-bold text-foreground">
                      {{ formatDate(trackingData.rental?.start_date) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import DashboardLayout from "../../layouts/DashboardLayout.vue";
import { RouterLink, useRouter } from "vue-router";
import axios from "../../axios";

const router = useRouter();
const mobileMenuOpen = ref(false);
const properties = ref([]);
const isLoading = ref(true);

// ── Variables du Modal Tracking ──
const trackingModal = ref(false);
const isTrackingLoading = ref(false);
const trackingData = ref(null);

const fetchProperties = async () => {
  isLoading.value = true;
  try {
    const { data } = await axios.get("/api/bailleur/properties");
    if (data.success) {
      properties.value = data.data.data.map((p) => {
        let imageUrl = "/images/placeholder-property.jpg";
        if (p.primary_image) {
          imageUrl = p.primary_image.path.startsWith("http")
            ? p.primary_image.path
            : `/storage/${p.primary_image.path}`;
        }
        return {
          ...p,
          image: imageUrl,
          status: p.rental_status === "available" ? "vacant" : "occupied",
          tenant: p.tenant?.name || null,
          visits: p.visits_count || 0,
        };
      });
    }
  } catch (err) {
    console.error("Erreur chargement biens bailleur:", err);
  } finally {
    isLoading.value = false;
  }
};

const handleDelete = async (id) => {
  if (!confirm("Êtes-vous sûr de vouloir supprimer ce bien ? Cette action est irréversible.")) return;
  try {
    const { data } = await axios.delete(`/api/properties/${id}`);
    if (data.success) {
      alert("Bien supprimé avec succès.");
      await fetchProperties();
    }
  } catch (err) {
    console.error("Erreur suppression bien:", err);
    alert("Une erreur est survenue lors de la suppression.");
  }
};

const goToEdit = (id) => {
  router.push({ name: "BailleurEditerBien", params: { id } });
};

// ── Ouverture Modal de Tracking (Lecture Seule) ──
const openProcessStatus = async (propertyId) => {
  trackingModal.value = true;
  isTrackingLoading.value = true;
  trackingData.value = null;
  try {
    const { data } = await axios.get(`/api/bailleur/properties/${propertyId}/rental-status`);
    if (data.success) {
      trackingData.value = data.data;
    }
    console.log(trackingData.value);
  } catch (err) {
    console.error(err);
    alert("Impossible de charger les statuts pour le moment.");
    trackingModal.value = false;
  } finally {
    isTrackingLoading.value = false;
  }
};

onMounted(fetchProperties);

const formatPrice = (p) => new Intl.NumberFormat("fr-FR").format(p || 0) + " FCFA";
const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getStatusLabel = (s) => {
  const map = {
    pending: "En attente",
    validated: "Validé",
    rejected: "Rejeté",
  };
  return map[s] || s;
};

const getPaymentStatusLabel = (s) => {
  const map = {
    pending: "En attente",
    paid: "Payé",
  };
  return map[s] || s;
};
</script>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.5s ease-out forwards;
  opacity: 0;
}

.animate-slide-up {
  animation: slideUp 0.3s ease-out forwards;
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
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: hsl(var(--muted-foreground) / 0.3);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--muted-foreground) / 0.5);
}
</style>