<template>
  <DashboardLayout>

      <div class="max-w-6xl mx-auto">
        <!-- Header -->
        <div
          class="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 animate-fadeIn"
        >
          <div>
            <h1 class="text-3xl font-black text-[#1B0B38] leading-tight">
              Gestion <span class="text-[#E54801]">Financière</span>
            </h1>
            <p
              class="text-gray-500 font-medium font-bold uppercase text-[10px] tracking-widest mt-1"
            >
              Revenus, Dépenses et Rapports financiers
            </p>
          </div>
          <div class="flex items-center gap-4">
            <!-- Mobile Menu Button -->
            <button
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="lg:hidden p-2 text-gray-500 hover:text-[#E54801] transition-colors"
            >
              <i class="fas fa-bars text-xl"></i>
            </button>

            <div
              class="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-xs font-bold border border-green-100"
            >
              <span
                class="w-2 h-2 bg-green-500 rounded-full animate-pulse"
              ></span>
              Portfolio: 1.2M
            </div>
            <button
              class="px-6 py-3 bg-[#E54801] text-white text-xs font-black uppercase tracking-widest rounded-xl hover:shadow-lg transition-all shadow-md hover:bg-[#913327]"
            >
              Retirer les fonds
            </button>
          </div>
        </div>

        <!-- Financial Stats -->
        <div
          class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 animate-fadeIn"
          style="animation-delay: 0.1s"
        >
          <div
            class="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-lg transition-all group"
          >
            <div class="flex items-center gap-4 mb-6">
              <div
                class="w-12 h-12 rounded-2xl bg-orange-50 text-[#E54801] flex items-center justify-center text-2xl group-hover:scale-110 transition-transform"
              >
                <i class="fas fa-arrow-down"></i>
              </div>
              <p
                class="text-[11px] text-gray-400 font-black uppercase tracking-widest"
              >
                Revenus Brut (Mois)
              </p>
            </div>
            <h3 class="text-3xl font-black text-[#1B0B38] leading-none">
              {{ formatPrice(stats.monthly_revenue) }}
              <span class="text-xs font-bold text-gray-400">CFA</span>
            </h3>
            <p
              class="text-[10px] text-green-500 font-black mt-4 flex items-center gap-1 uppercase tracking-tighter"
            >
              <i class="fas fa-caret-up"></i> Flux estimé
            </p>
          </div>

          <div
            class="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-lg transition-all group"
          >
            <div class="flex items-center gap-4 mb-6">
              <div
                class="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform"
              >
                <i class="fas fa-arrow-up"></i>
              </div>
              <p
                class="text-[11px] text-gray-400 font-black uppercase tracking-widest"
              >
                Charges & Imprévus
              </p>
            </div>
            <h3 class="text-3xl font-black text-[#1B0B38] leading-none">
              0 <span class="text-xs font-bold text-gray-400">CFA</span>
            </h3>
            <p
              class="text-[10px] text-gray-400 font-bold mt-4 uppercase tracking-widest"
            >
              Aucune charge enregistrée
            </p>
          </div>

          <div
            class="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 bg-gradient-to-br from-green-50 to-white hover:shadow-lg transition-all relative overflow-hidden group"
          >
            <div class="relative z-10">
              <div class="flex items-center gap-4 mb-6">
                <div
                  class="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 text-2xl group-hover:scale-110 transition-transform"
                >
                  <i class="fas fa-piggy-bank"></i>
                </div>
                <p
                  class="text-[11px] text-gray-400 font-black uppercase tracking-widest"
                >
                  Portefeuille (Solde)
                </p>
              </div>
              <h3 class="text-3xl font-black text-green-600 leading-none">
                {{ formatPrice(stats.balance) }}
                <span class="text-xs font-bold text-gray-400">CFA</span>
              </h3>
              <p
                class="text-[10px] text-gray-500 font-black mt-4 uppercase tracking-tighter"
              >
                Total collecté : {{ formatPrice(stats.total_collected) }} CFA
              </p>
            </div>
            <!-- Decorative Icon -->
            <i
              class="fas fa-wallet absolute -right-4 -bottom-4 text-[80px] text-green-100/50 pointer-events-none group-hover:scale-110 transition-transform duration-500"
            ></i>
          </div>
        </div>

        <!-- Recent Transactions -->
        <div
          class="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden animate-fadeIn"
          style="animation-delay: 0.2s"
        >
          <div
            class="p-8 border-b border-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50/30 gap-4"
          >
            <h3
              class="text-sm font-black text-[#1B0B38] uppercase tracking-widest"
            >
              Transactions Récentes
            </h3>
            <div class="flex gap-2">
              <button
                class="text-[9px] font-black uppercase tracking-widest text-[#E54801] px-4 py-2 rounded-xl bg-orange-50"
              >
                Tous
              </button>
            </div>
          </div>
          <div v-if="isLoading" class="p-12 text-center text-gray-400">
            <i
              class="fas fa-circle-notch fa-spin text-2xl mb-2 text-[#E54801]"
            ></i>
            <p class="text-xs font-bold uppercase tracking-widest">
              Chargement...
            </p>
          </div>
          <div
            v-else-if="transactions.length === 0"
            class="p-12 text-center text-gray-400"
          >
            <p class="text-sm font-medium">Aucune transaction trouvée.</p>
          </div>
          <div v-else class="divide-y divide-gray-50">
            <!-- Transaction item -->
            <div
              v-for="tx in transactions"
              :key="tx.id"
              class="flex flex-col sm:flex-row items-start sm:items-center justify-between p-8 hover:bg-gray-50/50 transition-all group gap-4"
            >
              <div class="flex items-center gap-6">
                <div
                  class="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform"
                  :class="getTransactionColor(tx.type)"
                >
                  <i :class="getTransactionIcon(tx.type)"></i>
                </div>
                <div>
                  <p
                    class="text-base font-black text-[#1B0B38] group-hover:text-[#E54801] transition-colors"
                  >
                    {{
                      tx.type === "payment"
                        ? "Paiement Loyer"
                        : tx.type.toUpperCase()
                    }}
                  </p>
                  <p
                    class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1"
                  >
                    Réf: {{ tx.reference }} • {{ formatDate(tx.created_at) }} •
                    {{ tx.payment_method?.toUpperCase() }}
                  </p>
                </div>
              </div>
              <div class="text-right w-full sm:w-auto">
                <p
                  class="text-xl font-black"
                  :class="
                    ['withdrawal', 'commission'].includes(tx.type)
                      ? 'text-red-500'
                      : 'text-green-600'
                  "
                >
                  {{ ["withdrawal", "commission"].includes(tx.type) ? "-" : "+"
                  }}{{ formatPrice(tx.amount) }} CFA
                </p>
                <span
                  class="text-[9px] font-black uppercase tracking-widest bg-gray-50 px-2 py-0.5 rounded"
                  :class="[
                    tx.status === 'successful'
                      ? 'text-green-400'
                      : 'text-orange-400',
                  ]"
                >
                  {{ tx.status === "successful" ? "Terminé" : tx.status }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="p-6 border-t border-gray-50 bg-gray-50/30 text-center">
          <button
            class="text-[10px] font-black text-[#E54801] uppercase tracking-[0.2em] hover:translate-x-1 transition-transform inline-flex items-center gap-2"
          >
            Consulter tout l'historique <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    

  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import DashboardLayout from "../../layouts/DashboardLayout.vue";
import axios from "../../axios";
const isLoading = ref(true);

const stats = ref({
  monthly_revenue: 0,
  total_collected: 0,
  balance: 0,
});

const transactions = ref([]);

const fetchData = async () => {
  isLoading.value = true;
  try {
    const { data } = await axios.get("/api/bailleur/finances");
    if (data.success) {
      stats.value = data.data.stats;
      transactions.value = data.data.transactions;
    }
  } catch (err) {
    console.error("Erreur chargement finances bailleur:", err);
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchData);

const formatPrice = (p) => new Intl.NumberFormat("fr-FR").format(p || 0);
const formatDate = (date) =>
  new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));

const getTransactionIcon = (type) => {
  switch (type) {
    case "payment":
      return "fas fa-hand-holding-usd";
    case "deposit":
      return "fas fa-plus-circle";
    case "withdrawal":
      return "fas fa-arrow-up";
    case "commission":
      return "fas fa-percent";
    default:
      return "fas fa-exchange-alt";
  }
};

const getTransactionColor = (type) => {
  switch (type) {
    case "payment":
    case "deposit":
      return "text-green-600 bg-green-50";
    case "withdrawal":
      return "text-red-500 bg-red-50";
    default:
      return "text-blue-500 bg-blue-50";
  }
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

