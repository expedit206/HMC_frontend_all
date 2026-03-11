<template>
  <DashboardLayout>
    <div
      v-if="isLoading"
      class="flex flex-col items-center justify-center h-full min-h-[60vh]"
    >
      <div
        class="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full animate-spin mb-4"
      ></div>
      <p class="text-muted-foreground font-bold uppercase tracking-widest text-xs">
        Chargement de vos finances...
      </p>
    </div>

    <div v-else class="max-w-5xl mx-auto">
      <!-- Page Header -->
      <div class="flex justify-between items-center mb-8 animate-fadeIn">
        <div>
          <h1 class="text-2xl font-bold text-foreground leading-tight">
            Mes Revenus 📈
          </h1>
          <p class="text-muted-foreground text-sm mt-1">
            Suivez votre chiffre d'affaires et vos paiements.
          </p>
        </div>
      </div>

      <!-- Stats Revenus -->
      <div
        class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fadeIn"
        style="animation-delay: 0.1s"
      >
        <div
          class="bg-primary p-6 rounded-3xl text-primary-foreground shadow-lg transform hover:-translate-y-1 transition-transform duration-300"
        >
          <p
            class="text-[10px] text-primary-foreground/60 font-bold uppercase mb-2 tracking-widest"
          >
            Solde Disponible
          </p>
          <div class="flex items-end gap-1">
            <p class="text-3xl font-black">
              {{ formatPrice(stats.balance) }}
            </p>
            <span class="text-xs font-bold text-primary-foreground/60 mb-1">XAF</span>
          </div>
          <button
            class="w-full mt-6 py-3 bg-secondary text-secondary-foreground text-[10px] font-black uppercase tracking-widest rounded-xl shadow-md hover:scale-105 transition-all"
          >
            Demander Retrait
          </button>
        </div>

        <div
          class="bg-card p-6 rounded-3xl border border-border shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <p
            class="text-[10px] text-muted-foreground font-bold uppercase mb-2 tracking-widest"
          >
            En attente
          </p>
          <div class="flex items-end gap-1">
            <p class="text-3xl font-black text-foreground">
              {{ formatPrice(stats.pending) }}
            </p>
            <span class="text-xs font-bold text-muted-foreground mb-1">XAF</span>
          </div>
          <p class="text-[9px] text-muted-foreground mt-4 leading-tight">
            Fonds sécurisés sur Escrow jusqu'à validation de fin de mission
            par le client.
          </p>
        </div>

        <div
          class="bg-card p-6 rounded-3xl border border-border shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <p
            class="text-[10px] text-muted-foreground font-bold uppercase mb-2 tracking-widest"
          >
            Moyenne / Mission
          </p>
          <div class="flex items-end gap-1">
            <p class="text-3xl font-black text-foreground">
              {{ formatPrice(stats.average) }}
            </p>
            <span class="text-xs font-bold text-muted-foreground mb-1">XAF</span>
          </div>
          <p class="text-[9px] text-green-600 dark:text-green-400 font-bold uppercase mt-4">
            +0% par rapport au mois dernier
          </p>
        </div>
      </div>

      <!-- Transactions -->
      <div
        class="bg-card rounded-3xl shadow-sm border border-border overflow-hidden animate-fadeIn"
        style="animation-delay: 0.2s"
      >
        <div class="p-6 border-b border-border bg-muted/10">
          <h3
            class="text-sm font-black text-foreground uppercase tracking-widest"
          >
            Historique des Paiements
          </h3>
        </div>
        <div
          v-if="transactions.length === 0"
          class="p-20 text-center text-muted-foreground"
        >
          <i class="fas fa-receipt text-5xl mb-4 opacity-10"></i>
          <p class="text-xs font-bold uppercase tracking-widest">
            Aucune transaction trouvée
          </p>
        </div>
        <div v-else class="overflow-x-auto">
          <table class="w-full text-left">
            <thead
              class="text-[10px] font-black uppercase text-muted-foreground border-b border-border bg-muted/10"
            >
              <tr>
                <th class="px-6 py-4 tracking-widest">Date</th>
                <th class="px-6 py-4 tracking-widest">Description</th>
                <th class="px-6 py-4 tracking-widest">Type</th>
                <th class="px-6 py-4 tracking-widest">Montant</th>
                <th class="px-6 py-4 tracking-widest">Statut</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border">
              <tr
                v-for="tx in transactions"
                :key="tx.id"
                class="hover:bg-muted/10 transition-colors"
              >
                <td
                  class="px-6 py-5 text-xs font-medium text-muted-foreground tracking-tight"
                >
                  {{ formatDate(tx.created_at) }}
                </td>
                <td
                  class="px-6 py-5 text-sm font-bold text-foreground uppercase tracking-tighter"
                >
                  {{ tx.description }}
                </td>
                <td
                  class="px-6 py-5 text-xs text-muted-foreground uppercase font-black"
                >
                  {{ tx.type }}
                </td>
                <td
                  :class="[
                    'px-6 py-5 text-sm font-black',
                    tx.type === 'credit' ? 'text-green-600 dark:text-green-400' : 'text-destructive',
                  ]"
                >
                  {{ tx.type === "credit" ? "+" : "-" }}
                  {{ formatPrice(tx.amount) }}
                </td>
                <td class="px-6 py-5">
                  <span
                    :class="[
                      'px-2 py-1 text-[9px] font-black uppercase rounded',
                      tx.status === 'completed'
                        ? 'bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400'
                        : 'bg-orange-100 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400',
                    ]"
                  >
                    {{ tx.status || "Terminé" }}
                  </span>
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
const transactions = ref([]);
const stats = ref({
  balance: 0,
  pending: 0,
  average: 0,
});

const fetchFinances = async () => {
  isLoading.value = true;
  try {
    const [dashRes, finRes] = await Promise.all([
      axios.get("/api/prestataire/dashboard"),
      axios.get("/api/prestataire/finances"),
    ]);

    if (dashRes.data.success) {
      stats.value.balance = dashRes.data.data.stats.earnings;
    }

    if (finRes.data.success) {
      transactions.value = finRes.data.data.data;
    }
  } catch (err) {
    console.error("Erreur chargement finances prestataire:", err);
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchFinances);

const formatPrice = (p) => new Intl.NumberFormat("fr-FR").format(p || 0);

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
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