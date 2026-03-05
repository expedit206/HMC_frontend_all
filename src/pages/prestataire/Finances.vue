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
          Chargement de vos finances...
        </p>
      </div>

      <div v-else class="max-w-5xl mx-auto">
 
        <!-- Page Header -->
        <div class="flex justify-between items-center mb-8 animate-fadeIn">
          <div>
            <h1 class="text-2xl font-bold text-gray-900 leading-tight">
              Mes Revenus 📈
            </h1>
            <p class="text-gray-500 text-sm mt-1">
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
            class="bg-[#1B0B38] p-6 rounded-3xl text-white shadow-lg transform hover:-translate-y-1 transition-transform duration-300"
          >
            <p
              class="text-[10px] text-gray-400 font-bold uppercase mb-2 tracking-widest"
            >
              Solde Disponible
            </p>
            <div class="flex items-end gap-1">
              <p class="text-3xl font-black">
                {{ formatPrice(stats.balance) }}
              </p>
              <span class="text-xs font-bold text-gray-400 mb-1">XAF</span>
            </div>
            <button
              class="w-full mt-6 py-3 bg-[#E54801] text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-md hover:scale-105 transition-all"
            >
              Demander Retrait
            </button>
          </div>

          <div
            class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <p
              class="text-[10px] text-gray-400 font-bold uppercase mb-2 tracking-widest"
            >
              En attente
            </p>
            <div class="flex items-end gap-1">
              <p class="text-3xl font-black text-[#1B0B38]">
                {{ formatPrice(stats.pending) }}
              </p>
              <span class="text-xs font-bold text-gray-400 mb-1">XAF</span>
            </div>
            <p class="text-[9px] text-gray-400 mt-4 leading-tight">
              Fonds sécurisés sur Escrow jusqu'à validation de fin de mission
              par le client.
            </p>
          </div>

          <div
            class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <p
              class="text-[10px] text-gray-400 font-bold uppercase mb-2 tracking-widest"
            >
              Moyenne / Mission
            </p>
            <div class="flex items-end gap-1">
              <p class="text-3xl font-black text-[#1B0B38]">
                {{ formatPrice(stats.average) }}
              </p>
              <span class="text-xs font-bold text-gray-400 mb-1">XAF</span>
            </div>
            <p class="text-[9px] text-green-500 font-bold uppercase mt-4">
              +0% par rapport au mois dernier
            </p>
          </div>
        </div>

        <!-- Transactions -->
        <div
          class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden animate-fadeIn"
          style="animation-delay: 0.2s"
        >
          <div class="p-6 border-b border-gray-50 bg-gray-50/20">
            <h3
              class="text-sm font-black text-[#1B0B38] uppercase tracking-widest"
            >
              Historique des Paiements
            </h3>
          </div>
          <div
            v-if="transactions.length === 0"
            class="p-20 text-center text-gray-400"
          >
            <i class="fas fa-receipt text-5xl mb-4 opacity-10"></i>
            <p class="text-xs font-bold uppercase tracking-widest">
              Aucune transaction trouvée
            </p>
          </div>
          <div v-else class="overflow-x-auto">
            <table class="w-full text-left">
              <thead
                class="text-[10px] font-black uppercase text-gray-400 border-b border-gray-50 bg-gray-50/50"
              >
                <tr>
                  <th class="px-6 py-4 tracking-widest">Date</th>
                  <th class="px-6 py-4 tracking-widest">Description</th>
                  <th class="px-6 py-4 tracking-widest">Type</th>
                  <th class="px-6 py-4 tracking-widest">Montant</th>
                  <th class="px-6 py-4 tracking-widest">Statut</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50">
                <tr
                  v-for="tx in transactions"
                  :key="tx.id"
                  class="hover:bg-gray-50 transition-colors"
                >
                  <td
                    class="px-6 py-5 text-xs font-medium text-gray-500 tracking-tight"
                  >
                    {{ formatDate(tx.created_at) }}
                  </td>
                  <td
                    class="px-6 py-5 text-sm font-bold text-[#1B0B38] uppercase tracking-tighter"
                  >
                    {{ tx.description }}
                  </td>
                  <td
                    class="px-6 py-5 text-xs text-gray-500 uppercase font-black"
                  >
                    {{ tx.type }}
                  </td>
                  <td
                    :class="[
                      'px-6 py-5 text-sm font-black',
                      tx.type === 'credit' ? 'text-green-600' : 'text-red-500',
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
                          ? 'bg-green-50 text-green-600'
                          : 'bg-orange-50 text-orange-600',
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

