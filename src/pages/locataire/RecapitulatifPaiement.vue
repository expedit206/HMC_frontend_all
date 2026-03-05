<template>
  <DashboardLayout>

      <div class="max-w-7xl mx-auto">
        <!-- Page Header -->
        <div
          class="bg-gradient-to-r from-[#E54801]/5 to-[#1B0B38]/5 rounded-2xl p-6 lg:p-8 mb-8 border border-[#E54801]/10"
        >
          <h1
            class="text-2xl lg:text-3xl xl:text-4xl font-bold text-[#1B0B38] mb-3"
          >
            Récapitulatif des Paiements
          </h1>
          <p class="text-gray-500 mb-6 lg:mb-8">
            Consultez l'historique complet de tous vos paiements
          </p>

          <!-- Stats Grid -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              class="bg-white rounded-xl shadow-hc p-5 border-l-4 border-[#E54801]"
            >
              <div class="text-2xl lg:text-3xl font-bold text-[#1B0B38] mb-1">
                328 450 FCFA
              </div>
              <div class="text-sm text-gray-500">Total ce mois</div>
            </div>
            <div
              class="bg-white rounded-xl shadow-hc p-5 border-l-4 border-[#E54801]"
            >
              <div class="text-2xl lg:text-3xl font-bold text-[#1B0B38] mb-1">
                42
              </div>
              <div class="text-sm text-gray-500">Paiements effectués</div>
            </div>
            <div
              class="bg-white rounded-xl shadow-hc p-5 border-l-4 border-[#E54801]"
            >
              <div class="text-2xl lg:text-3xl font-bold text-[#1B0B38] mb-1">
                38
              </div>
              <div class="text-sm text-gray-500">Paiements réussis</div>
            </div>
            <div
              class="bg-white rounded-xl shadow-hc p-5 border-l-4 border-[#E54801]"
            >
              <div class="text-2xl lg:text-3xl font-bold text-[#1B0B38] mb-1">
                4
              </div>
              <div class="text-sm text-gray-500">En attente</div>
            </div>
          </div>
        </div>

        <!-- Filter Section -->
        <div class="bg-white rounded-2xl shadow-hc p-6 mb-8">
          <!-- Search -->
          <div class="relative mb-6">
            <i
              class="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            ></i>
            <input
              type="text"
              v-model="searchQuery"
              class="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#E54801] focus:ring-3 focus:ring-[#E54801]/10 outline-none transition-all duration-300"
              placeholder="Rechercher un paiement..."
            />
          </div>

          <!-- Filter Tags -->
          <div class="flex flex-wrap gap-3 mb-6">
            <button
              v-for="filter in filters"
              :key="filter.value"
              @click="activeFilter = filter.value"
              :class="[
                'px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 transition-all duration-300',
                activeFilter === filter.value
                  ? 'bg-[#E54801] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-[#E54801]/10 hover:text-[#E54801]',
              ]"
            >
              <i :class="filter.icon"></i>
              {{ filter.label }}
            </button>
          </div>

          <!-- Date Filter -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label class="block text-[#1B0B38] font-semibold text-sm mb-2"
                >Période :</label
              >
              <div class="grid grid-cols-2 gap-3">
                <input
                  type="date"
                  v-model="startDate"
                  class="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#E54801] focus:ring-2 focus:ring-[#E54801]/10 outline-none transition-all duration-300"
                />
                <input
                  type="date"
                  v-model="endDate"
                  class="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-[#E54801] focus:ring-2 focus:ring-[#E54801]/10 outline-none transition-all duration-300"
                />
              </div>
            </div>
            <button
              class="px-4 py-3 bg-[#E54801] text-white font-semibold rounded-lg hover:bg-[#913327] transition-all duration-300 flex items-center justify-center gap-2"
            >
              <i class="fas fa-filter"></i>
              Appliquer
            </button>
          </div>
        </div>

        <!-- Payments List -->
        <div class="space-y-6 mb-8">
          <div
            v-if="filteredPayments.length === 0"
            class="bg-white rounded-xl shadow-hc p-12 text-center"
          >
            <i class="fas fa-search text-4xl text-gray-300 mb-4 opacity-50"></i>
            <h3 class="text-xl font-semibold text-[#1B0B38] mb-2">
              Aucun paiement trouvé
            </h3>
            <p class="text-gray-500">
              Essayez de modifier vos filtres de recherche.
            </p>
          </div>
          <div
            v-else
            v-for="payment in filteredPayments"
            :key="payment.id"
            class="bg-white rounded-xl shadow-hc p-6 border-l-4 border-[#E54801]"
          >
            <div
              class="flex flex-col md:flex-row md:items-center md:justify-between mb-6"
            >
              <div class="flex items-start gap-4 mb-4 md:mb-0">
                <div
                  :class="`w-14 h-14 rounded-xl bg-gradient-to-br ${getServiceColor(payment.type)} flex items-center justify-center text-white text-xl`"
                >
                  <i :class="`fas ${getServiceIcon(payment.type)}`"></i>
                </div>
                <div>
                  <h3 class="font-bold text-[#1B0B38] text-lg">
                    {{ payment.label }}
                  </h3>
                  <p class="text-gray-500 text-sm">{{ payment.date }}</p>
                </div>
              </div>
              <div
                :class="`px-3 py-1 text-sm font-semibold rounded-full inline-block w-fit ${getStatusClass(payment.status)}`"
              >
                {{ getStatusText(payment.status) }}
              </div>
            </div>

            <div
              class="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-100"
            >
              <div>
                <div class="text-xs text-gray-400 mb-1">Montant</div>
                <div class="font-bold text-[#1B0B38]">{{ payment.amount }}</div>
              </div>
              <div>
                <div class="text-xs text-gray-400 mb-1">Méthode</div>
                <div class="font-semibold text-[#1B0B38]">
                  {{ payment.method }}
                </div>
              </div>
              <div>
                <div class="text-xs text-gray-400 mb-1">Référence</div>
                <div class="font-semibold text-[#1B0B38]">
                  {{ payment.reference }}
                </div>
              </div>
              <div>
                <div class="text-xs text-gray-400 mb-1">Description</div>
                <div class="text-sm text-[#1B0B38]">
                  {{ payment.description }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div class="flex justify-center items-center gap-2 mb-8">
          <button
            class="w-10 h-10 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-[#E54801] hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled
          >
            <i class="fas fa-chevron-left"></i>
          </button>
          <button
            class="w-10 h-10 rounded-lg bg-[#E54801] text-white font-semibold"
          >
            1
          </button>
          <button
            class="w-10 h-10 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-[#E54801] hover:text-white transition-all duration-300"
          >
            2
          </button>
          <button
            class="w-10 h-10 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-[#E54801] hover:text-white transition-all duration-300"
          >
            3
          </button>
          <span class="px-2 text-gray-500">...</span>
          <button
            class="w-10 h-10 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-[#E54801] hover:text-white transition-all duration-300"
          >
            8
          </button>
          <button
            class="w-10 h-10 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center hover:bg-[#E54801] hover:text-white transition-all duration-300"
          >
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>

        <!-- Action Buttons -->
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:flex lg:justify-end gap-4"
        >
          <button
            class="px-6 py-4 bg-white border-2 border-[#E54801] text-[#E54801] font-bold rounded-xl hover:bg-[#E54801]/5 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <i class="fas fa-file-export"></i>
            Exporter en PDF
          </button>
          <button
            class="px-6 py-4 bg-[#1B0B38] text-white font-bold rounded-xl hover:bg-[#1B0B38]/90 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <i class="fas fa-print"></i>
            Imprimer
          </button>
        </div>
      </div>
    

  </DashboardLayout>
</template>

<script setup>
import { ref, computed } from "vue";
import DashboardLayout from "../../layouts/DashboardLayout.vue";
import { RouterLink, useRouter } from "vue-router";

const router = useRouter();
const searchQuery = ref("");
const activeFilter = ref("all");
const startDate = ref("2025-01-01");
const endDate = ref("2025-03-15");

const logout = () => router.push("/auth/connexion");

const filters = [
  { value: "all", label: "Tous", icon: "fas fa-list" },
  { value: "loyer", label: "Loyer", icon: "fas fa-home" },
  { value: "eneo", label: "Électricité", icon: "fas fa-bolt" },
  { value: "camwater", label: "Eau", icon: "fas fa-tint" },
  { value: "divers", label: "Autres", icon: "fas fa-ellipsis-h" },
];

const paymentsData = [
  {
    id: 1,
    type: "loyer",
    label: "Loyer Mensuel",
    amount: "75 000 FCFA",
    date: "15 Mars 2025",
    status: "paid",
    method: "Mobile Money",
    reference: "HMC-LOY-0325-001",
    description: "Loyer du mois de Mars 2025 - Appartement B3",
  },
  {
    id: 2,
    type: "eneo",
    label: "Facture ENEO",
    amount: "23 500 FCFA",
    date: "14 Mars 2025",
    status: "paid",
    method: "Carte Bancaire",
    reference: "EN-789456123",
    description: "Consommation Février 2025 - Compteur: 789456123",
  },
  {
    id: 3,
    type: "camwater",
    label: "Facture Camwater",
    amount: "18 200 FCFA",
    date: "10 Mars 2025",
    status: "paid",
    method: "Mobile Money",
    reference: "CW-456789",
    description: "Facture d'eau Mars 2025",
  },
  {
    id: 4,
    type: "gaz",
    label: "Recharge Gaz",
    amount: "12 000 FCFA",
    date: "05 Mars 2025",
    status: "pending",
    method: "Mobile Money",
    reference: "GAZ-0325-001",
    description: "Bouteille de gaz 12kg",
  },
  {
    id: 5,
    type: "condominium",
    label: "Frais Condominium",
    amount: "15 000 FCFA",
    date: "01 Mars 2025",
    status: "paid",
    method: "Virement",
    reference: "CONDO-0325",
    description: "Frais de gestion commune Mars 2025",
  },
  {
    id: 6,
    type: "divers",
    label: "Taxe d'Habitation",
    amount: "5 000 FCFA",
    date: "28 Février 2025",
    status: "paid",
    method: "Portefeuille",
    reference: "TAXE-0225",
    description: "Taxe annuelle d'habitation 2025",
  },
];

const filteredPayments = computed(() => {
  return paymentsData.filter((payment) => {
    const matchesFilter =
      activeFilter.value === "all" ||
      payment.type === activeFilter.value ||
      (activeFilter.value === "divers" &&
        !["loyer", "eneo", "camwater"].includes(payment.type));
    const matchesSearch =
      payment.label.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchesFilter && matchesSearch;
  });
});

const getServiceColor = (type) => {
  const config = {
    loyer: "from-[#E54801] to-[#913327]",
    eneo: "from-orange-500 to-orange-700",
    camwater: "from-blue-500 to-blue-700",
    gaz: "from-yellow-500 to-yellow-700",
    condominium: "from-purple-500 to-purple-700",
    divers: "from-gray-500 to-gray-700",
  };
  return config[type] || config.divers;
};

const getServiceIcon = (type) => {
  const config = {
    loyer: "fa-home",
    eneo: "fa-bolt",
    camwater: "fa-tint",
    gaz: "fa-fire",
    condominium: "fa-building",
    divers: "fa-ellipsis-h",
  };
  return config[type] || config.divers;
};

const getStatusText = (status) =>
  status === "paid" ? "Payé" : status === "pending" ? "En attente" : "Échoué";
const getStatusClass = (status) =>
  status === "paid"
    ? "bg-green-100 text-green-800"
    : status === "pending"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-red-100 text-red-800";
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

.shadow-hc {
  box-shadow: 0 4px 12px rgba(27, 11, 56, 0.1);
}
</style>

