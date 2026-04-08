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
        Analyse des flux financiers...
      </p>
    </div>

    <div v-else class="max-w-7xl mx-auto">
      <!-- Revenue Recap -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div
          class="bg-primary p-8 rounded-3xl text-primary-foreground shadow-xl relative overflow-hidden"
        >
          <div class="relative z-10">
            <p
              class="text-[10px] text-primary-foreground/70 font-black uppercase tracking-[0.2em] mb-2"
            >
              Volume Total Géré
            </p>
            <h3 class="text-3xl font-black">
              {{ formatPrice(financialData.total_revenue) }}
            </h3>
          </div>
          <div
            class="absolute -right-4 -bottom-4 opacity-10 text-8xl shrink-0"
          >
            <i class="fas fa-coins text-primary-foreground"></i>
          </div>
        </div>
        <div
          class="bg-card p-8 rounded-3xl border border-border shadow-sm"
        >
          <p
            class="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] mb-2"
          >
            Commissions (Est. 10%)
          </p>
          <h3 class="text-3xl font-black text-secondary">
            {{ formatPrice(financialData.total_revenue * 0.1) }}
          </h3>
        </div>
        <div
          class="bg-card p-8 rounded-3xl border border-border shadow-sm"
        >
          <p
            class="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] mb-2"
          >
            Transactions Réussies
          </p>
          <h3 class="text-3xl font-black text-green-600 dark:text-green-400">100%</h3>
        </div>
      </div>

      <!-- Transactions Table -->
      <div
        class="bg-card rounded-3xl border border-border shadow-sm overflow-hidden"
      >
        <div
          class="p-6 border-b border-border flex justify-between items-center bg-muted/20"
        >
          <h4
            class="text-xs font-black text-foreground uppercase tracking-widest"
          >
            Flux Historiques
          </h4>
          <button
            class="text-[10px] font-black uppercase tracking-widest text-secondary hover:text-primary transition-colors"
          >
            Exporter (.XLS)
          </button>
        </div>
        <div
          v-if="financialData.transactions.data.length === 0"
          class="p-20 text-center text-muted-foreground"
        >
          Aucune transaction enregistrée
        </div>
        <div v-else class="overflow-x-auto">
          <table class="w-full text-left">
            <thead
              class="text-[10px] font-black uppercase text-muted-foreground border-b border-border bg-muted/20"
            >
              <tr>
                <th class="px-6 py-5 tracking-widest">Date / Réf</th>
                <th class="px-6 py-5 tracking-widest">Utilisateur</th>
                <th class="px-6 py-5 tracking-widest text-center">Type</th>
                <th class="px-6 py-5 tracking-widest text-right">
                  Montant
                </th>
                <th class="px-6 py-5 tracking-widest text-center">
                  Status
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border">
              <tr
                v-for="tx in financialData.transactions.data"
                :key="tx.id"
                class="hover:bg-muted/5 transition-all"
              >
                <td class="px-6 py-5">
                  <p class="text-xs font-black text-foreground">
                    TX-{{ tx.id.toString().padStart(4, "0") }}
                  </p>
                  <p class="text-[10px] text-muted-foreground font-medium">
                    {{ formatDate(tx.created_at) }}
                  </p>
                </td>
                <td class="px-6 py-5">
                  <p class="text-xs font-bold text-foreground">
                    {{ tx.user?.name || "Inconnu" }}
                  </p>
                  <p
                    class="text-[9px] text-muted-foreground uppercase font-black truncate max-w-[200px]"
                  >
                    {{ tx.description || "Paiement de service" }}
                  </p>
                </td>
                <td class="px-6 py-5 text-center">
                  <span
                    :class="[
                      'px-3 py-1 text-[9px] font-black uppercase rounded-lg border',
                      tx.type === 'credit'
                        ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-100 dark:border-green-800'
                        : 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border-red-100 dark:border-red-800',
                    ]"
                  >
                    {{ tx.type }}
                  </span>
                </td>
                <td
                  class="px-6 py-5 text-right font-black text-sm text-foreground"
                >
                  {{ formatPrice(tx.amount) }}
                </td>
                <td class="px-6 py-5 text-center">
                  <div class="flex items-center justify-center gap-1">
                    <span
                      v-if="tx.status === 'completed' || !tx.status"
                      class="inline-block w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"
                    ></span>
                    <span
                      v-else
                      class="inline-block w-2 h-2 rounded-full bg-orange-500 animate-pulse"
                    ></span>
                    <span
                      :class="[
                        'text-[9px] font-black uppercase',
                        tx.status === 'completed' || !tx.status
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-orange-600 dark:text-orange-400',
                      ]"
                    >
                      {{
                        tx.status === "completed" || !tx.status
                          ? "Complété"
                          : "En attente"
                      }}
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          class="p-6 border-t border-border bg-muted/10 flex justify-between items-center"
        >
          <span class="text-[10px] text-muted-foreground font-black uppercase"
            >Pagination disponible</span
          >
<<<<<<< HEAD
<<<<<<< HEAD
=======
            <div
              class="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/20"
            >
              <h4
                class="text-xs font-black text-[#1B0B38] uppercase tracking-widest"
              >
                Flux Historiques
              </h4>
              <button
                class="text-[10px] font-black uppercase tracking-widest text-[#E54801] hover:underline"
              >
                Exporter (.XLS)
              </button>
            </div>
            <div
              v-if="financialData.transactions.data.length === 0"
              class="p-20 text-center text-gray-400"
            >
              Aucune transaction enregistrée
            </div>
            <div v-else class="overflow-x-auto">
              <table class="w-full text-left">
                <thead
                  class="text-[10px] font-black uppercase text-gray-400 border-b border-gray-50 bg-gray-50/50"
                >
                  <tr>
                    <th class="px-6 py-5 tracking-widest">Date / Réf</th>
                    <th class="px-6 py-5 tracking-widest">Utilisateur</th>
                    <th class="px-6 py-5 tracking-widest text-center">Type</th>
                    <th class="px-6 py-5 tracking-widest text-right">
                      Montant
                    </th>
                    <th class="px-6 py-5 tracking-widest text-center">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-50">
                  <tr
                    v-for="tx in financialData.transactions.data"
                    :key="tx.id"
                    class="hover:bg-gray-50/50 transition-all"
                  >
                    <td class="px-6 py-5">
                      <p class="text-xs font-black text-[#1B0B38]">
                        TX-{{ tx.id.toString().padStart(4, "0") }}
                      </p>
                      <p class="text-[10px] text-gray-400 font-medium">
                        {{ formatDate(tx.created_at) }}
                      </p>
                    </td>
                    <td class="px-6 py-5">
                      <p class="text-xs font-bold text-gray-600">
                        {{ tx.user?.name || "Inconnu" }}
                      </p>
                      <p
                        class="text-[9px] text-gray-400 uppercase font-black truncate max-w-[200px]"
                      >
                        {{ tx.description || "Paiement de service" }}
                      </p>
                    </td>
                    <td class="px-6 py-5 text-center">
                      <span
                        :class="[
                          'px-3 py-1 text-[9px] font-black uppercase rounded-lg border',
                          tx.type === 'credit'
                            ? 'bg-green-50 text-green-600 border-green-100'
                            : 'bg-red-50 text-red-600 border-red-100',
                        ]"
                      >
                        {{ tx.type }}
                      </span>
                    </td>
                    <td
                      class="px-6 py-5 text-right font-black text-sm text-[#1B0B38]"
                    >
                      {{ formatPrice(tx.amount) }}
                    </td>
                    <td class="px-6 py-5 text-center">
                      <span
                        v-if="tx.status === 'completed' || !tx.status"
                        class="inline-block w-2 h-2 rounded-full bg-green-500 mr-1 shadow-[0_0_8px_rgba(34,197,94,0.5)]"
                      ></span>
                      <span
                        v-else
                        class="inline-block w-2 h-2 rounded-full bg-orange-500 mr-1 animate-pulse"
                      ></span>
                      <span
                        :class="[
                          'text-[9px] font-black uppercase',
                          tx.status === 'completed' || !tx.status
                            ? 'text-green-600'
                            : 'text-orange-600',
                        ]"
                      >
                        {{
                          tx.status === "completed" || !tx.status
                            ? "Complété"
                            : "En attente"
                        }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

         
          </div>
>>>>>>> 5a2a46c7f02e0d67ceec2d1b8986a306eabf911a
=======
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
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
const financialData = ref({
  transactions: { data: [] },
  total_revenue: 0,
  monthly_breakdown: [],
});

const fetchFinances = async () => {
  isLoading.value = true;
  try {
    const { data } = await axios.get("/api/admin/finances");
    if (data.success) {
      financialData.value = data.data;
    }
  } catch (err) {
    console.error("Erreur chargement finances admin:", err);
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchFinances);

const formatPrice = (price) => {
  return new Intl.NumberFormat("fr-CM").format(price) + " XAF";
};

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>

<style scoped>
/* Scoped styles */
</style>