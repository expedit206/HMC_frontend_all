<template>
  <DashboardLayout>

      <div class="max-w-6xl mx-auto">
        <div
          class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
        >
          <div>
            <h1 class="text-2xl font-bold text-gray-900 leading-tight">
              Mes Paiements
            </h1>
            <p class="text-gray-500 text-sm mt-1 font-medium tracking-wide">
              Suivi de vos loyers, charges et téléchargement de vos quittances.
            </p>
          </div>
        </div>

        <!-- Stats Financières Locataire -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div
            class="bg-[#1B0B38] p-8 rounded-3xl text-white shadow-xl flex flex-col justify-center"
          >
            <p
              class="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mb-2"
            >
              Prochain Paiement
            </p>
            <h3 class="text-3xl font-black">
              {{ formatPrice(stats.next_payment) }}
              <span class="text-xs">XAF</span>
            </h3>
            <p class="text-[10px] text-orange-400 font-bold mt-2 uppercase">
              Échéance : {{ stats.next_date }}
            </p>
          </div>
          <div
            class="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-center"
          >
            <p
              class="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mb-2"
            >
              Total Payé (Historique)
            </p>
            <h3 class="text-3xl font-black text-[#1B0B38]">
              {{ formatPrice(stats.total_spent) }}
              <span class="text-xs">XAF</span>
            </h3>
            <p class="text-[10px] text-green-500 font-bold mt-2 uppercase">
              {{ transactions.length }} Transactions
            </p>
          </div>
          <div
            class="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-center"
          >
            <p
              class="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mb-2"
            >
              Caution Sécurisée
            </p>
            <h3 class="text-3xl font-black text-[#E54801]">
              {{ formatPrice(stats.caution) }}
              <span class="text-xs font-bold uppercase">XAF</span>
            </h3>
            <p
              class="text-[10px] text-gray-400 font-bold mt-2 uppercase tracking-widest"
            >
              Compte Escrow HMC
            </p>
          </div>
        </div>

        <!-- Transaction History -->
        <div
          class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
        >
          <div
            class="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/20"
          >
            <h4
              class="text-xs font-black text-[#1B0B38] uppercase tracking-widest"
            >
              Historique des Transactions
            </h4>
            <div class="flex gap-2">
              <button
                class="px-4 py-2 bg-white border border-gray-200 text-[10px] font-black uppercase tracking-widest text-gray-500 rounded-xl hover:bg-gray-50 transition-all"
              >
                Filtrer
              </button>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead
                class="text-[10px] font-black uppercase text-gray-400 border-b border-gray-50 bg-gray-50/50"
              >
                <tr>
                  <th class="px-6 py-5 tracking-widest">Date</th>
                  <th class="px-6 py-5 tracking-widest">Description</th>
                  <th class="px-6 py-5 tracking-widest text-center">Méthode</th>
                  <th class="px-6 py-5 tracking-widest text-right">Montant</th>
                  <th class="px-6 py-5 tracking-widest text-center">Status</th>
                  <th class="px-6 py-5 tracking-widest text-right">
                    Quittance
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50">
                <tr v-if="isLoading">
                  <td
                    colspan="6"
                    class="px-6 py-10 text-center text-gray-400 italic"
                  >
                    <i class="fas fa-circle-notch fa-spin mr-2"></i>
                    Chargement...
                  </td>
                </tr>
                <tr v-else-if="transactions.length === 0">
                  <td
                    colspan="6"
                    class="px-6 py-10 text-center text-gray-400 italic"
                  >
                    Aucune transaction trouvée.
                  </td>
                </tr>
                <tr
                  v-else
                  v-for="tx in transactions"
                  :key="tx.id"
                  class="hover:bg-gray-50/50 transition-all"
                >
                  <td class="px-6 py-5 text-xs font-bold text-gray-600">
                    {{ formatDate(tx.created_at) }}
                  </td>
                  <td class="px-6 py-5 text-xs font-black text-[#1B0B38]">
                    {{
                      tx.type === "payment"
                        ? "Loyer " + (tx.metadata?.month || "")
                        : "Transaction"
                    }}
                  </td>
                  <td class="px-6 py-5 text-center">
                    <span
                      class="px-3 py-1 text-[9px] font-black uppercase rounded-lg"
                      :class="
                        tx.payment_method === 'om'
                          ? 'bg-orange-50 text-orange-600'
                          : 'bg-blue-50 text-blue-600'
                      "
                      >{{
                        tx.payment_method === "om" ? "Orange Money" : "MoMo"
                      }}</span
                    >
                  </td>
                  <td
                    class="px-6 py-5 text-right font-black text-sm text-[#1B0B38]"
                  >
                    {{ formatPrice(tx.amount) }}
                  </td>
                  <td class="px-6 py-5 text-center">
                    <span
                      class="text-[10px] font-black uppercase"
                      :class="
                        tx.status === 'successful'
                          ? 'text-green-600'
                          : 'text-orange-500'
                      "
                      >{{
                        tx.status === "successful" ? "Réussi" : "En attente"
                      }}</span
                    >
                  </td>
                  <td class="px-6 py-5 text-right">
                    <button
                      v-if="tx.status === 'successful'"
                      class="text-[#E54801] hover:scale-110 transition-transform"
                    >
                      <i class="fas fa-file-download"></i>
                    </button>
                    <span v-else class="text-gray-300">-</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div
          class="mt-8 bg-blue-50 rounded-2xl p-6 border border-blue-100 flex items-center gap-6"
        >
          <div
            class="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 text-xl shadow-sm shrink-0"
          >
            <i class="fas fa-shield-check"></i>
          </div>
          <div>
            <h4
              class="text-sm font-black text-blue-900 uppercase tracking-tight"
            >
              Paiement Sécurisé HMC
            </h4>
            <p class="text-xs text-blue-700/80 mt-1">
              Tous vos paiements sont protégés par notre technologie de
              séquestre. Le bailleur ne reçoit l'argent que si le logement
              respecte les termes du contrat.
            </p>
          </div>
        </div>
      </div>
    

  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import DashboardLayout from "../../layouts/DashboardLayout.vue";
import { RouterLink, useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import axios from "../../axios";

const router = useRouter();
const authStore = useAuthStore();
const isLoading = ref(true);
const transactions = ref([]);
const stats = ref({
  total_spent: 0,
  caution: 300000, // Hardcoded for demo if not in DB
  next_payment: 150000,
  next_date: "05 Mars 2024",
});

const fetchPayments = async () => {
  try {
    const { data } = await axios.get("/api/tenant/payments");
    if (data.success) {
      transactions.value = data.data;

      // Calcul simple du total successful
      stats.value.total_spent = transactions.value
        .filter((t) => t.status === "successful" && t.type === "payment")
        .reduce((acc, t) => acc + parseFloat(t.amount), 0);
    }
  } catch (err) {
    console.error("Erreur chargement paiements:", err);
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchPayments);

const formatPrice = (price) => new Intl.NumberFormat("fr-FR").format(price);
const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Indéfini";

const logout = async () => {
  await authStore.logout();
  router.push("/auth/connexion");
};
</script>

<style scoped>
.sidebar-link.active {
  background-color: #e54801;
  color: white;
  box-shadow: 0 4px 12px rgba(229, 72, 1, 0.2);
}
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e54801;
  border-radius: 10px;
}
</style>

