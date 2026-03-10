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
        Chargement des demandes d'audit...
      </p>
    </div>

    <div v-else class="max-w-7xl mx-auto">
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
            Audit Terrain & Vérifications
          </h4>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead
              class="text-[10px] font-black uppercase text-muted-foreground border-b border-border bg-muted/20"
            >
              <tr>
                <th class="px-6 py-5 tracking-widest">Bailleur</th>
                <th class="px-6 py-5 tracking-widest">Bien / Type</th>
                <th class="px-6 py-5 tracking-widest">Localisation</th>
                <th class="px-6 py-5 tracking-widest">Status</th>
                <th class="px-6 py-5 tracking-widest">Agent Assigné</th>
                <th class="px-6 py-5 tracking-widest text-right">
                  Documents
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border">
              <tr
                v-for="req in requests"
                :key="req.id"
                class="hover:bg-muted/5 transition-all group"
              >
                <td class="px-6 py-5">
                  <div class="flex flex-col">
                    <span class="text-sm font-black text-foreground">{{
                      req.bailleur?.name
                    }}</span>
                    <span class="text-[10px] text-muted-foreground underline">{{
                      req.bailleur?.phone
                    }}</span>
                  </div>
                </td>
                <td class="px-6 py-5">
                  <div class="flex flex-col">
                    <span class="text-xs font-bold text-foreground/90">{{
                      req.title
                    }}</span>
                    <span
                      class="text-[10px] font-black uppercase text-secondary"
                      >{{ req.category }} ({{ req.type }})</span
                    >
                  </div>
                </td>
                <td class="px-6 py-5">
                  <span class="text-xs font-medium text-muted-foreground"
                    >{{ req.city }}, {{ req.location }}</span
                  >
                </td>
                <td class="px-6 py-5">
                  <span
                    :class="[
                      'px-2 py-1 text-[9px] font-black uppercase rounded',
                      getStatusClass(req.status),
                    ]"
                  >
                    {{ req.status }}
                  </span>
                </td>
                <td class="px-6 py-5">
                  <div v-if="req.agent" class="flex items-center gap-2">
                    <div
                      class="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center text-[10px] font-black text-secondary"
                    >
                      {{ req.agent.name.charAt(0) }}
                    </div>
                    <span class="text-xs font-bold text-foreground/80">{{
                      req.agent.name
                    }}</span>
                  </div>
                  <select
                    v-else
                    @change="assignAgent(req.id, $event.target.value)"
                    class="text-[10px] font-black uppercase tracking-widest border border-border rounded-lg px-2 py-1 bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="" class="bg-card">Assigner un agent</option>
                    <option
                      v-for="agent in agents"
                      :key="agent.id"
                      :value="agent.id"
                      class="bg-card"
                    >
                      {{ agent.name }}
                    </option>
                  </select>
                </td>
                <td class="px-6 py-5 text-right">
                  <div class="flex justify-end gap-2">
                    <a
                      v-for="(doc, idx) in req.documents"
                      :key="idx"
                      :href="`/storage/${doc}`"
                      target="_blank"
                      class="w-8 h-8 rounded-lg bg-muted/20 flex items-center justify-center text-muted-foreground hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all"
                    >
                      <i class="fas fa-file-alt text-xs"></i>
                    </a>
                  </div>
                </td>
              </tr>
              <tr v-if="requests.length === 0">
                <td
                  colspan="6"
                  class="px-6 py-12 text-center text-muted-foreground font-bold text-xs uppercase tracking-widest"
                >
                  Aucune demande d'audit en attente
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
const requests = ref([]);
const agents = ref([]);

const fetchData = async () => {
  isLoading.value = true;
  try {
    const [resReq, resAgents] = await Promise.all([
      axios.get("/api/admin/publication-requests"),
      axios.get("/api/admin/agents"),
    ]);
    requests.value = resReq.data.data.data;
    agents.value = resAgents.data.data;
  } catch (err) {
    console.error("Erreur chargement données admin:", err);
  } finally {
    isLoading.value = false;
  }
};

const assignAgent = async (requestId, agentId) => {
  if (!agentId) return;
  try {
    const { data } = await axios.post(
      `/api/admin/publication-requests/${requestId}/assign`,
      {
        agent_id: agentId,
      },
    );
    if (data.success) {
      alert("Agent assigné avec succès !");
      fetchData();
    }
  } catch (err) {
    console.error("Erreur assignation agent:", err);
    alert("Erreur lors de l'assignation.");
  }
};

const getStatusClass = (status) => {
  switch (status) {
    case "pending":
      return "bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400";
    case "assigned":
      return "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400";
    case "published":
      return "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400";
    case "rejected":
      return "bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400";
    default:
      return "bg-muted/20 text-muted-foreground";
  }
};

onMounted(fetchData);
</script>

<style scoped>
/* Scoped styles */
</style>