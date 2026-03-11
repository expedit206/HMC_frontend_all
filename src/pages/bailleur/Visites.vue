<template>
  <DashboardLayout>
    <div class="max-w-5xl mx-auto">
      <!-- Header -->
      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 animate-fadeIn"
      >
        <div>
          <h1 class="text-3xl font-black text-foreground leading-tight">
            Gestion des <span class="text-secondary">Visites</span>
          </h1>
          <p
            class="text-muted-foreground font-bold uppercase text-[10px] tracking-widest mt-1"
          >
            Demandes de rendez-vous sur vos propriétés
          </p>
        </div>
        <div class="flex items-center gap-3">
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="lg:hidden p-2 text-muted-foreground hover:text-secondary transition-colors"
          >
            <i class="fas fa-bars text-xl"></i>
          </button>
        </div>
      </div>

      <div class="space-y-6 animate-fadeIn" style="animation-delay: 0.1s">
        <!-- Loading State -->
        <div v-if="isLoading" class="py-20 text-center text-muted-foreground">
          <i
            class="fas fa-circle-notch fa-spin text-3xl mb-4 text-secondary"
          ></i>
          <p class="font-bold uppercase text-[10px] tracking-widest">
            Récupération des visites...
          </p>
        </div>

        <!-- Empty State -->
        <div
          v-else-if="visits.length === 0"
          class="py-20 text-center bg-card rounded-[2rem] border border-border shadow-sm"
        >
          <i class="fas fa-calendar-times text-5xl mb-4 text-muted-foreground/20"></i>
          <p class="text-muted-foreground font-bold">
            Aucune demande de visite enregistrée.
          </p>
        </div>

        <!-- Visits List -->
        <template v-else>
          <div
            v-for="visit in visits"
            :key="visit.id"
            class="bg-card p-6 md:p-8 rounded-[2rem] shadow-sm border border-border flex flex-col md:flex-row gap-6 md:gap-8 relative overflow-hidden group hover:shadow-lg transition-all"
            :class="{
              'border-l-[6px] border-secondary': visit.status === 'pending',
            }"
          >
            <div
              class="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform"
              :class="getStatusClass(visit.status)"
            >
              <i class="fas fa-calendar-check"></i>
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2 flex-wrap">
                <h3 class="text-lg font-black text-foreground">
                  {{ visit.property?.title }}
                </h3>
                <span
                  class="px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full"
                  :class="getStatusClass(visit.status)"
                >
                  {{ getStatusLabel(visit.status) }}
                </span>
              </div>
              <p
                class="text-xs text-muted-foreground mb-4 font-medium flex items-center gap-2"
              >
                <i class="fas fa-clock text-secondary"></i>
                <span class="font-black text-foreground">{{
                  formatDate(visit.scheduled_at)
                }}</span>
                à {{ formatTime(visit.scheduled_at) }}
              </p>

              <div
                class="flex items-center gap-3 bg-muted/20 p-3 rounded-2xl inline-flex"
              >
                <div
                  class="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-black"
                >
                  {{ visit.visitor?.name?.[0]?.toUpperCase() || "?" }}
                </div>
                <div class="flex flex-col">
                  <span
                    class="text-[10px] text-foreground font-black uppercase tracking-tight"
                  >
                    {{ visit.visitor?.name || "Visiteur anonyme" }}
                  </span>
                  <span class="text-[9px] text-muted-foreground font-medium">{{
                    visit.visitor?.phone || "Pas de numéro"
                  }}</span>
                </div>
              </div>
            </div>

            <div
              class="flex flex-col justify-end items-end gap-3 min-w-[180px] w-full md:w-auto"
            >
              <!-- Actions Status -->
              <div
                class="flex flex-col gap-2 w-full"
                v-if="visit.status === 'pending'"
              >
                <button
                  @click="handleStatusUpdate(visit.id, 'confirmed')"
                  class="w-full py-2.5 bg-secondary text-secondary-foreground text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-secondary/90 transition-all flex items-center justify-center gap-2"
                >
                  <i class="fas fa-check"></i> Confirmer
                </button>
                <button
                  @click="handleStatusUpdate(visit.id, 'cancelled')"
                  class="w-full py-2.5 border border-border text-muted-foreground text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-muted/20 transition-all flex items-center justify-center gap-2"
                >
                  <i class="fas fa-times"></i> Rejeter
                </button>
              </div>
              <div
                v-else-if="visit.status === 'confirmed'"
                class="w-full flex flex-col gap-2"
              >
                <button
                  @click="handleStatusUpdate(visit.id, 'completed')"
                  class="w-full py-2.5 bg-green-600 text-white text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-green-700 transition-all flex items-center justify-center gap-2"
                >
                  <i class="fas fa-check-double"></i> Marquer Terminée
                </button>
                <button
                  @click="handleStatusUpdate(visit.id, 'cancelled')"
                  class="w-full py-2.5 border border-border text-muted-foreground text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-muted/20 transition-all"
                >
                  Annuler
                </button>
              </div>
              <div
                v-else
                class="text-[10px] font-black text-muted-foreground uppercase italic"
              >
                Visite
                {{ visit.status === "completed" ? "effectuée" : "annulée" }}
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import DashboardLayout from "../../layouts/DashboardLayout.vue";
import axios from "../../axios";

const mobileMenuOpen = ref(false);
const visits = ref([]);
const isLoading = ref(true);

const fetchVisits = async () => {
  isLoading.value = true;
  try {
    const { data } = await axios.get("/api/bailleur/visits");
    if (data.success) {
      visits.value = data.data;
    }
  } catch (err) {
    console.error("Erreur chargement visites:", err);
  } finally {
    isLoading.value = false;
  }
};

const handleStatusUpdate = async (id, status) => {
  try {
    const { data } = await axios.post(`/api/bailleur/visits/${id}/status`, {
      status,
    });
    if (data.success) {
      alert("Statut de la visite mis à jour !");
      await fetchVisits();
    }
  } catch (err) {
    console.error("Erreur status visite:", err);
    alert("Une erreur est survenue.");
  }
};

onMounted(fetchVisits);

const getStatusLabel = (s) => {
  const map = {
    pending: "En attente",
    confirmed: "Confirmée",
    completed: "Terminée",
    cancelled: "Annulée",
  };
  return map[s] || s;
};

const getStatusClass = (s) => {
  const map = {
    pending: "bg-orange-100 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400",
    confirmed: "bg-blue-100 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400",
    completed: "bg-green-100 dark:bg-green-950/30 text-green-600 dark:text-green-400",
    cancelled: "bg-muted text-muted-foreground",
  };
  return map[s] || "bg-muted text-muted-foreground";
};

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatTime = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.5s ease-out forwards;
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
</style>