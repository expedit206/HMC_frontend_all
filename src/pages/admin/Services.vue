<template>
  <div class="dashboard-page-content">
    <div
      v-if="isLoading"
      class="flex flex-col items-center justify-center h-full min-h-[60vh]"
    >
      <div
        class="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"
      ></div>
      <p class="text-muted-foreground font-bold uppercase tracking-widest text-xs">
        Synchronisation des interventions...
      </p>
    </div>

    <div v-else class="max-w-7xl mx-auto">
      <!-- STATS -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div
          class="bg-card p-6 rounded-3xl shadow-sm border border-border"
        >
          <p
            class="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-1"
          >
            Services Actifs
          </p>
          <h3 class="text-2xl font-black text-foreground">
            {{ services.length }}
          </h3>
        </div>
        <div
          class="bg-card p-6 rounded-3xl shadow-sm border border-border"
        >
          <p
            class="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-1"
          >
            Interventions récentes
          </p>
          <h3 class="text-2xl font-black text-blue-500 dark:text-blue-400">
            {{ recentInterventions.length }}
          </h3>
        </div>
      </div>

      <!-- TABLE -->
      <div
        class="bg-card rounded-3xl border border-border shadow-sm overflow-hidden"
      >
        <div
          class="p-6 border-b border-border flex justify-between items-center bg-muted/20"
        >
          <h4
            class="text-xs font-black text-foreground uppercase tracking-widest"
          >
            Liste des Prestations
          </h4>
        </div>
        <div
          v-if="services.length === 0"
          class="p-20 text-center text-muted-foreground"
        >
          Aucun service enregistré
        </div>
        <div v-else class="overflow-x-auto">
          <table class="w-full text-left">
            <thead
              class="text-[10px] font-black uppercase text-muted-foreground border-b border-border bg-muted/20"
            >
              <tr>
                <th class="px-6 py-5 tracking-widest">Service</th>
                <th class="px-6 py-5 tracking-widest">Prestataire</th>
                <th class="px-6 py-5 tracking-widest">Catégorie</th>
                <th class="px-6 py-5 tracking-widest">Prix Base</th>
                <th class="px-6 py-5 tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border">
              <tr
                v-for="service in services"
                :key="service.id"
                class="hover:bg-muted/5 transition-all"
              >
                <td class="px-6 py-5">
                  <p class="text-sm font-black text-foreground">
                    {{ service.title }}
                  </p>
                </td>
                <td class="px-6 py-5 text-xs text-muted-foreground font-bold">
                  {{ service.provider?.name || "Inconnu" }}
                </td>
                <td
                  class="px-6 py-5 text-xs text-muted-foreground uppercase font-black"
                >
                  {{ service.category?.name || "Général" }}
                </td>
                <td class="px-6 py-5 text-sm font-black text-foreground">
                  {{ formatPrice(service.base_price) }}
                </td>
                <td class="px-6 py-5 text-right">
                  <button
                    class="w-8 h-8 rounded-lg bg-muted/20 text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <i class="fas fa-external-link-alt text-[10px]"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "../../axios";

const isLoading = ref(true);
const services = ref([]);
const recentInterventions = ref([]);

const fetchData = async () => {
  isLoading.value = true;
  try {
    const { data } = await axios.get("/api/admin/services");
    if (data.success) {
      services.value = data.data.services.data;
      recentInterventions.value = data.data.recent_interventions;
    }
  } catch (err) {
    console.error("Erreur chargement services admin:", err);
  } finally {
    isLoading.value = false;
  }
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("fr-CM").format(price) + " XAF";
};

onMounted(fetchData);
</script>

<style scoped>
/* Scoped styles */
</style>