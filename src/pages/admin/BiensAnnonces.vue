<template>
  <DashboardLayout>
    <div
      v-if="isLoading"
      class="flex flex-col items-center justify-center h-full min-h-[60vh]"
    >
      <div
        class="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"
      ></div>
      <p class="text-muted-foreground font-bold uppercase tracking-widest text-xs">
        Analyse du parc immobilier...
      </p>
    </div>

    <div v-else class="max-w-7xl mx-auto">
      <!-- STATS -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div
          class="bg-card p-6 rounded-3xl shadow-sm border border-border"
        >
          <p
            class="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-1"
          >
            Total Biens
          </p>
          <h3 class="text-2xl font-black text-foreground">
            {{ totalProperties }}
          </h3>
        </div>
        <div
          class="bg-card p-6 rounded-3xl shadow-sm border border-border"
        >
          <p
            class="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-1"
          >
            En attente Modération
          </p>
          <h3 class="text-2xl font-black text-orange-500 dark:text-orange-400">
            {{ pendingCount }}
          </h3>
        </div>
        <div
          class="bg-card p-6 rounded-3xl shadow-sm border border-border"
        >
          <p
            class="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-1"
          >
            Actifs
          </p>
          <h3 class="text-2xl font-black text-green-500 dark:text-green-400">
            {{ activeCount }}
          </h3>
        </div>
      </div>

      <!-- TABLE -->
      <div
        class="bg-card rounded-3xl border border-border shadow-sm overflow-hidden"
      >
        <div
          class="p-6 border-b border-border flex flex-col sm:flex-row justify-between items-center bg-muted/20 gap-4"
        >
          <h4
            class="text-xs font-black text-foreground uppercase tracking-widest"
          >
            Liste des Propriétés
          </h4>
          <div class="flex gap-2">
            <select
              v-model="statusFilter"
              @change="fetchProperties"
              class="text-[10px] font-black uppercase tracking-widest border border-border rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-card text-foreground"
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
              class="text-[10px] font-black uppercase text-muted-foreground border-b border-border bg-muted/20"
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
            <tbody class="divide-y divide-border">
              <tr
                v-for="prop in properties"
                :key="prop.id"
                class="hover:bg-muted/5 transition-all group"
              >
                <td class="px-6 py-5">
                  <div class="flex items-center gap-4">
                    <div
                      class="w-12 h-10 bg-muted/20 rounded-lg overflow-hidden flex items-center justify-center border border-border"
                    >
                      <img
                        v-if="prop.images && prop.images.length > 0"
                        :src="`/storage/${prop.images[0].path}`"
                        class="w-full h-full object-cover"
                        alt="Bien"
                      />
                      <i v-else class="fas fa-image text-muted-foreground/50"></i>
                    </div>
                    <div class="flex flex-col">
                      <span class="text-sm font-black text-foreground">{{
                        prop.title
                      }}</span>
                      <span class="text-[10px] text-muted-foreground font-medium">{{
                        prop.city
                      }}</span>
                    </div>
                  </div>
                </td>
                <td
                  class="px-6 py-5 text-xs text-muted-foreground font-bold capitalize"
                >
                  {{ prop.owner?.name || "Inconnu" }}
                </td>
                <td class="px-6 py-5 text-sm font-black text-foreground">
                  {{ formatPrice(prop.price) }}
                </td>
                <td class="px-6 py-5">
                  <select
                    @change="updateStatus(prop, $event.target.value)"
                    :class="[
                      'px-2 py-1 text-[9px] font-black uppercase rounded border-none cursor-pointer outline-none',
                      getStatusClass(prop.status),
                    ]"
                  >
                    <option
                      value="pending"
                      :selected="prop.status === 'pending'"
                      class="bg-card"
                    >
                      En Attente
                    </option>
                    <option
                      value="active"
                      :selected="prop.status === 'active'"
                      class="bg-card"
                    >
                      Approuver
                    </option>
                    <option
                      value="rejected"
                      :selected="prop.status === 'rejected'"
                      class="bg-card"
                    >
                      Rejeter
                    </option>
                    <option
                      value="rented"
                      :selected="prop.status === 'rented'"
                      class="bg-card"
                    >
                      Loué
                    </option>
                  </select>
                </td>
                <td class="px-6 py-5 text-right">
                  <div v-if="prop.agent" class="flex flex-col items-end gap-1 mb-2">
                    <span class="text-xs font-bold text-foreground">{{ prop.agent.name }}</span>
                  </div>
                  <button
                    @click="openAssignModal(prop.id)"
                    class="text-[10px] font-black uppercase text-secondary hover:bg-secondary/10 px-3 py-1.5 rounded-lg border border-secondary transition-colors inline-flex items-center gap-2"
                  >
                    <i class="fas" :class="prop.agent_id ? 'fa-exchange-alt' : 'fa-user-plus'"></i> 
                    {{ prop.agent_id ? 'Changer' : 'Assigner' }}
                  </button>
                </td>
                <td class="px-6 py-5 text-right">
                  <div
                    class="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <RouterLink
                      :to="{ name: 'DetailAnnonce', params: { slug: prop.slug } }"
                      class="w-8 h-8 rounded-lg bg-muted/20 text-foreground hover:bg-secondary/10 hover:text-secondary flex items-center justify-center transition-all"
                    >
                      <i class="fas fa-eye text-xs"></i>
                    </RouterLink>
                  </div>
                </td>
              </tr>
              <tr v-if="properties.length === 0">
                <td
                  colspan="6"
                  class="px-6 py-12 text-center text-muted-foreground font-bold text-xs uppercase tracking-widest"
                >
                  Aucune propriété trouvée
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          class="p-6 border-t border-border bg-muted/10 flex justify-between items-center"
        >
          <span class="text-[10px] text-muted-foreground font-black uppercase"
            >Page {{ adminPagination.current_page }} / {{ adminPagination.last_page }}</span
          >
          <div class="flex gap-2">
            <button
              @click="prevPage"
              :disabled="adminPagination.current_page === 1"
              class="px-3 py-1 bg-card border border-border rounded-lg text-xs disabled:opacity-30 text-foreground hover:bg-muted/20 transition-colors"
            >
              Précédent
            </button>
            <button
              @click="nextPage"
              :disabled="adminPagination.current_page >= adminPagination.last_page"
              class="px-3 py-1 bg-card border border-border rounded-lg text-xs disabled:opacity-30 text-foreground hover:bg-muted/20 transition-colors"
            >
              Suivant
            </button>
          </div>
        </div>
      </div>
    </div>

    <AgentAssignModal 
      :isOpen="isAgentModalOpen" 
      :targetId="selectedPropertyId" 
      targetType="property" 
      @close="isAgentModalOpen = false" 
      @assigned="handleAssigned" 
    />
  </DashboardLayout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import DashboardLayout from "../../layouts/DashboardLayout.vue";
import AgentAssignModal from "../../components/admin/AgentAssignModal.vue";
import { RouterLink } from "vue-router";
import axios from "../../axios";
import { usePropertyStore } from "../../stores/properties";
import { storeToRefs } from "pinia";

const propertyStore = usePropertyStore();

const { adminProperties: properties, adminPagination, isLoading } = storeToRefs(propertyStore);

const totalProperties = ref(0);
const pendingCount = ref(0);
const activeCount = ref(0);
const statusFilter = ref("");
const isAgentModalOpen = ref(false);
const selectedPropertyId = ref(null);

const fetchProperties = async () => {
  try {
    await propertyStore.fetchAdminProperties(adminPagination.value.current_page || 1, {
      status: statusFilter.value,
    });

    totalProperties.value = adminPagination.value.total;

    // Re-fetch counts for stats card if visible
    const dashRes = await axios.get("/api/admin/dashboard");
    if (dashRes.data.success) {
      pendingCount.value = dashRes.data.data.stats.pending_properties;
      activeCount.value = dashRes.data.data.stats.active_users; // Approximation or need specific property stats
      totalProperties.value = dashRes.data.data.stats.total_properties;
    }
  } catch (err) {
    console.error("Erreur chargement:", err);
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
    console.error("Erreur mise à jour:", err);
  }
};

const openAssignModal = (propertyId) => {
  selectedPropertyId.value = propertyId;
  isAgentModalOpen.value = true;
};

const handleAssigned = () => {
  alert("Agent assigné avec succès !");
  fetchProperties();
};

const prevPage = () => {
  if (adminPagination.value.current_page > 1) {
    adminPagination.value.current_page--;
    fetchProperties();
  }
};

const nextPage = () => {
  if (adminPagination.value.current_page < adminPagination.value.last_page) {
    adminPagination.value.current_page++;
    fetchProperties();
  }
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("fr-CM").format(price) + " XAF";
};

const getStatusClass = (status) => {
  switch (status) {
    case "active":
      return "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400";
    case "pending":
      return "bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400";
    case "rejected":
      return "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400";
    case "rented":
      return "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400";
    default:
      return "bg-muted/20 text-muted-foreground";
  }
};

onMounted(() => {
  fetchProperties();
});
</script>

<style scoped>
/* Scoped styles if needed */
</style>