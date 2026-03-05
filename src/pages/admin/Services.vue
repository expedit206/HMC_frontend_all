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
            Synchronisation des interventions...
          </p>
        </div>

        <div v-else class="max-w-7xl mx-auto">
          <!-- STATS -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            <div
              class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100"
            >
              <p
                class="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1"
              >
                Services Actifs
              </p>
              <h3 class="text-2xl font-black text-[#1B0B38]">
                {{ services.length }}
              </h3>
            </div>
            <div
              class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100"
            >
              <p
                class="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1"
              >
                Interventions récentes
              </p>
              <h3 class="text-2xl font-black text-blue-500">
                {{ recentInterventions.length }}
              </h3>
            </div>
          </div>

          <!-- TABLE -->
          <div
            class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
          >
            <div
              class="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/20"
            >
              <h4
                class="text-xs font-black text-[#1B0B38] uppercase tracking-widest"
              >
                Liste des Prestations
              </h4>
            </div>
            <div
              v-if="services.length === 0"
              class="p-20 text-center text-gray-400"
            >
              Aucun service enregistré
            </div>
            <div v-else class="overflow-x-auto">
              <table class="w-full text-left">
                <thead
                  class="text-[10px] font-black uppercase text-gray-400 border-b border-gray-50 bg-gray-50/50"
                >
                  <tr>
                    <th class="px-6 py-5 tracking-widest">Service</th>
                    <th class="px-6 py-5 tracking-widest">Prestataire</th>
                    <th class="px-6 py-5 tracking-widest">Catégorie</th>
                    <th class="px-6 py-5 tracking-widest">Prix Base</th>
                    <th class="px-6 py-5 tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-50">
                  <tr
                    v-for="service in services"
                    :key="service.id"
                    class="hover:bg-gray-50/50 transition-all"
                  >
                    <td class="px-6 py-5">
                      <p class="text-sm font-black text-[#1B0B38]">
                        {{ service.title }}
                      </p>
                    </td>
                    <td class="px-6 py-5 text-xs text-gray-500 font-bold">
                      {{ service.provider?.name || "Inconnu" }}
                    </td>
                    <td
                      class="px-6 py-5 text-xs text-gray-400 uppercase font-black"
                    >
                      {{ service.category?.name || "Général" }}
                    </td>
                    <td class="px-6 py-5 text-sm font-black text-[#1B0B38]">
                      {{ formatPrice(service.base_price) }}
                    </td>
                    <td class="px-6 py-5 text-right">
                      <button
                        class="w-8 h-8 rounded-lg bg-gray-50 text-gray-400 hover:bg-[#1B0B38] hover:text-white transition-all"
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
      

  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import DashboardLayout from "../../layouts/DashboardLayout.vue";
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

