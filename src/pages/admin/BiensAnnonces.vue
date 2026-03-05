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
            Analyse du parc immobilier...
          </p>
        </div>

        <div v-else class="max-w-7xl mx-auto">
          <!-- STATS -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div
              class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100"
            >
              <p
                class="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1"
              >
                Total Biens
              </p>
              <h3 class="text-2xl font-black text-[#1B0B38]">
                {{ totalProperties }}
              </h3>
            </div>
            <div
              class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100"
            >
              <p
                class="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1"
              >
                En attente Modération
              </p>
              <h3 class="text-2xl font-black text-orange-500">
                {{ pendingCount }}
              </h3>
            </div>
            <div
              class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100"
            >
              <p
                class="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1"
              >
                Actifs
              </p>
              <h3 class="text-2xl font-black text-green-500">
                {{ activeCount }}
              </h3>
            </div>
          </div>

          <!-- TABLE -->
          <div
            class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
          >
            <div
              class="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center bg-gray-50/20 gap-4"
            >
              <h4
                class="text-xs font-black text-[#1B0B38] uppercase tracking-widest"
              >
                Liste des Propriétés
              </h4>
              <div class="flex gap-2">
                <select
                  v-model="statusFilter"
                  @change="fetchProperties"
                  class="text-[10px] font-black uppercase tracking-widest border border-gray-100 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E54801]/20"
                >
                  <option value="">Tous les statuts</option>
                  <option value="pending">En attente</option>
                  <option value="active">Actif</option>
                  <option value="rejected">Rejeté</option>
                  <option value="rented">Loué</option>
                </select>
              </div>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead
                  class="text-[10px] font-black uppercase text-gray-400 border-b border-gray-100 bg-gray-50/50"
                >
                  <tr>
                    <th class="px-6 py-5 tracking-widest">Bien</th>
                    <th class="px-6 py-5 tracking-widest">Propriétaire</th>
                    <th class="px-6 py-5 tracking-widest">Prix (XAF)</th>
                    <th class="px-6 py-5 tracking-widest">Status</th>
                    <th class="px-6 py-5 tracking-widest text-right">
                      Agent Responsable
                    </th>
                    <th class="px-6 py-5 tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-50">
                  <tr
                    v-for="prop in properties"
                    :key="prop.id"
                    class="hover:bg-gray-50/50 transition-all group"
                  >
                    <td class="px-6 py-5">
                      <div class="flex items-center gap-4">
                        <div
                          class="w-12 h-10 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center"
                        >
                          <img
                            v-if="prop.images && prop.images.length > 0"
                            :src="`/storage/${prop.images[0].path}`"
                            class="w-full h-full object-cover"
                            alt="Bien"
                          />
                          <i v-else class="fas fa-image text-gray-300"></i>
                        </div>
                        <div class="flex flex-col">
                          <span class="text-sm font-black text-[#1B0B38]">{{
                            prop.title
                          }}</span>
                          <span class="text-[10px] text-gray-400 font-medium">{{
                            prop.city
                          }}</span>
                        </div>
                      </div>
                    </td>
                    <td
                      class="px-6 py-5 text-xs text-gray-500 font-bold capitalize"
                    >
                      {{ prop.owner?.name || "Inconnu" }}
                    </td>
                    <td class="px-6 py-5 text-sm font-black text-[#1B0B38]">
                      {{ formatPrice(prop.price) }}
                    </td>
                    <td class="px-6 py-5">
                      <select
                        @change="updateStatus(prop, $event.target.value)"
                        :class="[
                          'px-2 py-1 text-[9px] font-black uppercase rounded border-none cursor-pointer',
                          getStatusClass(prop.status),
                        ]"
                      >
                        <option
                          value="pending"
                          :selected="prop.status === 'pending'"
                        >
                          En Attente
                        </option>
                        <option
                          value="active"
                          :selected="prop.status === 'active'"
                        >
                          Approuver
                        </option>
                        <option
                          value="rejected"
                          :selected="prop.status === 'rejected'"
                        >
                          Rejeter
                        </option>
                        <option
                          value="rented"
                          :selected="prop.status === 'rented'"
                        >
                          Loué
                        </option>
                      </select>
                    </td>
                    <td class="px-6 py-5 text-right">
                      <select
                        @change="assignAgent(prop, $event.target.value)"
                        :class="[
                          'text-[10px] font-black uppercase tracking-widest border border-gray-100 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#E54801]/20',
                          prop.agent_id
                            ? 'bg-orange-50 text-[#E54801]'
                            : 'bg-gray-50 text-gray-400',
                        ]"
                      >
                        <option value="">Aucun Agent</option>
                        <option
                          v-for="agent in agents"
                          :key="agent.id"
                          :value="agent.id"
                          :selected="prop.agent_id === agent.id"
                        >
                          {{ agent.name }}
                        </option>
                      </select>
                    </td>
                    <td class="px-6 py-5 text-right">
                      <div
                        class="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <RouterLink
                          :to="`/annonces/${prop.id}`"
                          class="w-8 h-8 rounded-lg bg-gray-50 text-[#1B0B38] hover:bg-orange-50 flex items-center justify-center transition-all"
                        >
                          <i class="fas fa-eye text-xs"></i>
                        </RouterLink>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="properties.length === 0">
                    <td
                      colspan="5"
                      class="px-6 py-12 text-center text-gray-400 font-bold text-xs uppercase tracking-widest"
                    >
                      Aucune propriété trouvée
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div
              class="p-6 border-t border-gray-50 bg-gray-50/10 flex justify-between items-center"
            >
              <span class="text-[10px] text-gray-400 font-black uppercase"
                >Page {{ currentPage }} / {{ lastPage }}</span
              >
              <div class="flex gap-2">
                <button
                  @click="prevPage"
                  :disabled="currentPage === 1"
                  class="px-3 py-1 bg-white border border-gray-100 rounded-lg text-xs disabled:opacity-30"
                >
                  Précédent
                </button>
                <button
                  @click="nextPage"
                  :disabled="currentPage >= lastPage"
                  class="px-3 py-1 bg-white border border-gray-100 rounded-lg text-xs disabled:opacity-30"
                >
                  Suivant
                </button>
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
const properties = ref([]);
const totalProperties = ref(0);
const pendingCount = ref(0);
const activeCount = ref(0);
const currentPage = ref(1);
const lastPage = ref(1);
const statusFilter = ref("");
const agents = ref([]);

const fetchAgents = async () => {
  try {
    const { data } = await axios.get("/api/admin/agents");
    if (data.success) {
      agents.value = data.data;
    }
  } catch (err) {
    console.error("Erreur chargement agents:", err);
  }
};

const fetchProperties = async () => {
  isLoading.value = true;
  try {
    const params = {
      page: currentPage.value,
      status: statusFilter.value,
    };
    const { data } = await axios.get("/api/admin/properties", { params });
    if (data.success) {
      properties.value = data.data.data;
      totalProperties.value = data.data.total;
      lastPage.value = data.data.last_page;

      // Re-fetch counts for stats card if visible
      const dashRes = await axios.get("/api/admin/dashboard");
      if (dashRes.data.success) {
        pendingCount.value = dashRes.data.data.stats.pending_properties;
        activeCount.value = dashRes.data.data.stats.active_users; // Approximation or need specific property stats
        totalProperties.value = dashRes.data.data.stats.total_properties;
      }
    }
  } catch (err) {
    console.error("Erreur chargement propriétés:", err);
  } finally {
    isLoading.value = false;
  }
};

const updateStatus = async (prop, status) => {
  try {
    const { data } = await axios.put(`/api/admin/properties/${prop.id}`, {
      status,
    });
    if (data.success) {
      prop.status = status;
      fetchProperties(); // Refresh to update counts
    }
  } catch (err) {
    console.error("Erreur mise à jour statut bien:", err);
  }
};

const assignAgent = async (prop, agentId) => {
  if (!agentId) return; // For now handle only assignment, maybe add unassign later
  try {
    const { data } = await axios.post(
      `/api/admin/properties/${prop.id}/assign-agent`,
      {
        agent_id: agentId,
      },
    );
    if (data.success) {
      prop.agent_id = agentId;
      // Show success notification or just let reactivity handle it
    }
  } catch (err) {
    console.error("Erreur assignation agent:", err);
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchProperties();
  }
};

const nextPage = () => {
  if (currentPage.value < lastPage.value) {
    currentPage.value++;
    fetchProperties();
  }
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("fr-CM").format(price) + " XAF";
};

const getStatusClass = (status) => {
  switch (status) {
    case "active":
      return "bg-green-50 text-green-600";
    case "pending":
      return "bg-orange-50 text-orange-600";
    case "rejected":
      return "bg-red-50 text-red-600";
    case "rented":
      return "bg-blue-50 text-blue-600";
    default:
      return "bg-gray-50 text-gray-600";
  }
};

onMounted(() => {
  fetchProperties();
  fetchAgents();
});
</script>

<style scoped>
/* Scoped styles */
</style>

