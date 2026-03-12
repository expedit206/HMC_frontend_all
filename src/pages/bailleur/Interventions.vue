<template>
  <DashboardLayout>
    <div class="max-w-5xl mx-auto">
      <!-- Header -->
      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 animate-fadeIn"
      >
        <div>
          <h1 class="text-3xl font-black text-foreground leading-tight">
            Gestion des <span class="text-secondary">Interventions</span>
          </h1>
          <p
            class="text-muted-foreground font-medium font-bold uppercase text-[10px] tracking-widest mt-1"
          >
            Maintenance et Réparations en cours
          </p>
        </div>
        <div class="flex items-center gap-3">
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="lg:hidden p-2 text-muted-foreground hover:text-secondary transition-colors"
          >
            <i class="fas fa-bars text-xl"></i>
          </button>
          <button
            class="px-6 py-3 bg-secondary text-secondary-foreground text-xs font-black uppercase tracking-widest rounded-xl hover:shadow-lg transition-all shadow-md flex items-center gap-2"
          >
            <i class="fas fa-plus"></i> Nouvelle demande
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
            Récupération des interventions...
          </p>
        </div>

        <!-- Empty State -->
        <div
          v-else-if="interventions.length === 0"
          class="py-20 text-center bg-card rounded-[2rem] border border-border shadow-sm"
        >
          <i class="fas fa-tools text-5xl mb-4 text-muted-foreground/30"></i>
          <p class="text-muted-foreground font-bold">
            Aucune intervention signalée pour le moment.
          </p>
        </div>

        <!-- Interventions List -->
        <template v-else>
          <div
            v-for="intervention in interventions"
            :key="intervention.id"
            class="bg-card p-6 md:p-8 rounded-[2rem] shadow-sm border border-border flex flex-col md:flex-row gap-6 md:gap-8 relative overflow-hidden group hover:shadow-lg transition-all"
            :class="{
              'border-l-[6px] border-secondary': intervention.status === 'pending',
            }"
          >
            <div
              class="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform"
              :class="getStatusClass(intervention.status)"
            >
              <i :class="intervention.service?.icon || 'fas fa-wrench'"></i>
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2 flex-wrap">
                <h3 class="text-lg font-black text-foreground">
                  {{ intervention.service?.name || "Intervention Générale" }}
                </h3>
                <span
                  class="px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full"
                  :class="getStatusClass(intervention.status)"
                >
                  {{ getStatusLabel(intervention.status) }}
                </span>
              </div>
              <p
                class="text-xs text-muted-foreground mb-4 font-medium flex items-center gap-1"
              >
                <i class="fas fa-map-marker-alt"></i>
                {{ intervention.property?.title }} •
                {{ formatDate(intervention.created_at) }}
              </p>
              <p
                class="text-sm text-muted-foreground mb-6 italic line-clamp-2"
                v-if="intervention.notes"
              >
                "{{ intervention.notes }}"
              </p>

              <div class="flex items-center gap-2">
                <div
                  class="w-8 h-8 rounded-full bg-muted/20 flex items-center justify-center text-[10px] font-black text-foreground"
                >
                  {{ intervention.requester?.name?.[0] || "?" }}
                </div>
                <span
                  class="text-[10px] text-foreground font-black uppercase tracking-tight"
                >
                  Par: {{ intervention.requester?.name || "Locataire" }}
                </span>
              </div>
            </div>

            <div
              class="flex flex-col justify-end items-end gap-3 min-w-[180px] w-full md:w-auto"
            >
              <!-- Actions Status -->
              <div
                class="flex flex-col gap-2 w-full"
                v-if="
                  intervention.status !== 'completed' &&
                  intervention.status !== 'cancelled'
                "
              >
                <button
                  v-if="intervention.status === 'pending'"
                  @click="handleStatusUpdate(intervention.id, 'in_progress')"
                  class="w-full py-2.5 bg-primary text-primary-foreground text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-secondary hover:text-secondary-foreground transition-all"
                >
                  Marquer en cours
                </button>
                <button
                  v-if="intervention.status === 'in_progress'"
                  @click="handleStatusUpdate(intervention.id, 'completed')"
                  class="w-full py-2.5 bg-green-600 text-white text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-green-700 transition-all"
                >
                  Marquer terminé
                </button>
                <button
                  @click="handleStatusUpdate(intervention.id, 'cancelled')"
                  class="w-full py-2.5 border border-border text-muted-foreground text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-muted/20 transition-all"
                >
                  Annuler
                </button>
              </div>
              <button
                v-else
                class="w-full py-2.5 border border-border text-muted-foreground text-[9px] font-black uppercase tracking-widest rounded-xl cursor-not-allowed bg-muted/10"
              >
                {{
                  intervention.status === "completed" ? "Traitée" : "Annulée"
                }}
              </button>
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
const interventions = ref([]);
const isLoading = ref(true);

const fetchInterventions = async () => {
  isLoading.value = true;
  try {
    const { data } = await axios.get("/api/bailleur/interventions");
    if (data.success) {
      interventions.value = data.data;
    }
  } catch (err) {
    console.error("Erreur chargement interventions:", err);
  } finally {
    isLoading.value = false;
  }
};

const handleStatusUpdate = async (id, status) => {
  try {
    const { data } = await axios.post(
      `/api/bailleur/interventions/${id}/status`,
      {
        status,
      }
    );

    if (data.success) {
      await fetchInterventions();
    }
  } catch (err) {
    console.error("Erreur status intervention:", err);
    alert("Une erreur est survenue lors de la mise à jour du statut.");
  }
};

onMounted(fetchInterventions);

const getStatusLabel = (s) => {
  const map = {
    pending: "En attente",
    in_progress: "En cours",
    completed: "Terminé",
    cancelled: "Annulé",
  };
  return map[s] || s;
};

const getStatusClass = (s) => {
  const map = {
    pending: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
    in_progress: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    completed: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    cancelled: "bg-muted/20 text-muted-foreground",
  };
  return map[s] || "bg-muted/20 text-muted-foreground";
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
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