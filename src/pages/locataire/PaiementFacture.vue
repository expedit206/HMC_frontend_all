<template>
  <DashboardLayout>

      <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Section Paiement -->
        <div class="space-y-6">
          <!-- Titre section -->
          <div class="flex items-center gap-3">
            <i class="fas fa-bolt text-[#E54801] text-xl"></i>
            <h2 class="text-xl font-semibold text-[#1B0B38]">
              Service à payer
            </h2>
          </div>

          <!-- Cartes de service -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Carte ENEO -->
            <div
              @click="setService('ENEO')"
              :class="[
                'bg-white rounded-xl shadow-hc p-5 border-2 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg relative overflow-hidden group',
                selectedService === 'ENEO'
                  ? 'border-[#E54801] active'
                  : 'border-transparent',
              ]"
            >
              <div
                v-if="selectedService === 'ENEO'"
                class="absolute top-0 left-0 w-2 h-full bg-[#E54801]"
              ></div>
              <div class="flex items-start gap-4 mb-4">
                <div
                  class="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-[#E54801] flex items-center justify-center text-white text-2xl"
                >
                  <i class="fas fa-bolt"></i>
                </div>
                <div>
                  <h3 class="font-bold text-[#1B0B38] text-lg">ENEO</h3>
                  <p class="text-gray-500 text-sm">Électricité</p>
                </div>
              </div>
              <p class="text-gray-500 text-sm">
                Paiement de votre facture d'électricité.
              </p>
            </div>

            <!-- Carte Camwater -->
            <div
              @click="setService('Camwater')"
              :class="[
                'bg-white rounded-xl shadow-hc p-5 border-2 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg relative overflow-hidden group',
                selectedService === 'Camwater'
                  ? 'border-[#E54801] active'
                  : 'border-transparent',
              ]"
            >
              <div
                v-if="selectedService === 'Camwater'"
                class="absolute top-0 left-0 w-2 h-full bg-[#E54801]"
              ></div>
              <div class="flex items-start gap-4 mb-4">
                <div
                  class="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-800 flex items-center justify-center text-white text-2xl"
                >
                  <i class="fas fa-tint"></i>
                </div>
                <div>
                  <h3 class="font-bold text-[#1B0B38] text-lg">Camwater</h3>
                  <p class="text-gray-500 text-sm">Eau Potable</p>
                </div>
              </div>
              <p class="text-gray-500 text-sm">
                Paiement de votre facture d'eau.
              </p>
            </div>
          </div>

          <!-- Formulaire de paiement -->
          <form
            @submit.prevent="handlePayment"
            class="bg-white rounded-xl shadow-hc p-6 space-y-6"
          >
            <!-- Numéro de compte -->
            <div>
              <label class="block text-[#1B0B38] font-semibold mb-2">
                {{
                  selectedService === "ENEO"
                    ? "Numéro de compteur ENEO"
                    : "Numéro de compte Camwater"
                }}
              </label>
              <div class="relative">
                <i
                  class="fas fa-hashtag absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                ></i>
                <input
                  type="text"
                  v-model="accountNumber"
                  class="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#E54801] focus:ring-3 focus:ring-[#E54801]/10 outline-none transition-all duration-300"
                  :placeholder="
                    selectedService === 'ENEO'
                      ? 'Ex: 123456789'
                      : 'Ex: CW789456'
                  "
                  required
                />
              </div>
            </div>

            <!-- Montant -->
            <div>
              <label class="block text-[#1B0B38] font-semibold mb-2"
                >Montant à payer (FCFA)</label
              >
              <div class="relative">
                <i
                  class="fas fa-money-bill-wave absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                ></i>
                <input
                  type="number"
                  v-model.number="amount"
                  class="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#E54801] focus:ring-3 focus:ring-[#E54801]/10 outline-none transition-all duration-300"
                  placeholder="Ex: 15000"
                  min="1000"
                  step="100"
                  required
                />
              </div>
            </div>

            <!-- Total à payer -->
            <div
              class="bg-gradient-to-r from-[#1B0B38]/5 to-[#E54801]/5 rounded-xl p-5 border-l-4 border-[#E54801]"
            >
              <div class="flex justify-between items-center mb-4">
                <div class="text-[#1B0B38] font-semibold">Total à payer</div>
                <div class="text-gray-500 text-sm">Frais: 100 FCFA</div>
              </div>
              <div class="text-3xl font-bold text-[#1B0B38] text-center mb-3">
                {{ totalAmount }} FCFA
              </div>
              <div
                class="flex justify-between border-t border-dashed border-gray-300 pt-3 text-gray-500 text-sm"
              >
                <span>Montant facture:</span>
                <span>{{ formattedAmount }} FCFA</span>
              </div>
            </div>

            <!-- Méthodes de paiement -->
            <div>
              <div class="flex items-center gap-3 mb-4">
                <i class="fas fa-credit-card text-[#E54801] text-xl"></i>
                <h2 class="text-xl font-semibold text-[#1B0B38]">
                  Méthode de paiement
                </h2>
              </div>

              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div
                  @click="paymentMethod = 'mobile'"
                  :class="[
                    'payment-method-card bg-white border-2 rounded-xl p-4 text-center cursor-pointer transition-all duration-300 hover:border-[#E54801]',
                    paymentMethod === 'mobile'
                      ? 'border-[#E54801] active'
                      : 'border-gray-200',
                  ]"
                >
                  <div class="text-[#1B0B38] text-2xl mb-2">
                    <i class="fas fa-mobile-alt"></i>
                  </div>
                  <div class="font-semibold text-[#1B0B38] text-sm">Mobile</div>
                </div>
                <div
                  @click="paymentMethod = 'card'"
                  :class="[
                    'payment-method-card bg-white border-2 rounded-xl p-4 text-center cursor-pointer transition-all duration-300 hover:border-[#E54801]',
                    paymentMethod === 'card'
                      ? 'border-[#E54801] active'
                      : 'border-gray-200',
                  ]"
                >
                  <div class="text-[#1B0B38] text-2xl mb-2">
                    <i class="fas fa-credit-card"></i>
                  </div>
                  <div class="font-semibold text-[#1B0B38] text-sm">Carte</div>
                </div>
                <div
                  @click="paymentMethod = 'bank'"
                  :class="[
                    'payment-method-card bg-white border-2 rounded-xl p-4 text-center cursor-pointer transition-all duration-300 hover:border-[#E54801]',
                    paymentMethod === 'bank'
                      ? 'border-[#E54801] active'
                      : 'border-gray-200',
                  ]"
                >
                  <div class="text-[#1B0B38] text-2xl mb-2">
                    <i class="fas fa-university"></i>
                  </div>
                  <div class="font-semibold text-[#1B0B38] text-sm">
                    Virement
                  </div>
                </div>
                <div
                  @click="paymentMethod = 'wallet'"
                  :class="[
                    'payment-method-card bg-white border-2 rounded-xl p-4 text-center cursor-pointer transition-all duration-300 hover:border-[#E54801]',
                    paymentMethod === 'wallet'
                      ? 'border-[#E54801] active'
                      : 'border-gray-200',
                  ]"
                >
                  <div class="text-[#1B0B38] text-2xl mb-2">
                    <i class="fas fa-wallet"></i>
                  </div>
                  <div class="font-semibold text-[#1B0B38] text-sm">Wallet</div>
                </div>
              </div>
            </div>

            <!-- Bouton de paiement -->
            <button
              type="submit"
              :disabled="isProcessing"
              class="w-full bg-gradient-to-r from-[#E54801] to-[#913327] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <i
                :class="isProcessing ? 'fas fa-spinner fa-spin' : 'fas fa-lock'"
              ></i>
              {{ isProcessing ? "Traitement en cours..." : "Payer maintenant" }}
            </button>

            <p class="text-center text-gray-500 text-sm">
              <i class="fas fa-shield-alt text-[#E54801] mr-2"></i>
              Paiement 100% sécurisé avec chiffrement SSL
            </p>
          </form>
        </div>

        <!-- Historique des paiements -->
        <div>
          <div class="bg-white rounded-xl shadow-hc p-6">
            <div class="flex items-center gap-3 mb-6">
              <i class="fas fa-history text-[#E54801] text-xl"></i>
              <h2 class="text-xl font-semibold text-[#1B0B38]">
                Historique récent
              </h2>
            </div>

            <div class="space-y-4">
              <div
                v-for="(history, index) in paymentHistory"
                :key="index"
                :class="`flex items-center p-4 rounded-xl bg-gray-50 border-l-4 ${history.status === 'paid' ? 'border-green-500' : 'border-yellow-500'}`"
              >
                <div
                  :class="`w-12 h-12 rounded-xl bg-gradient-to-br ${history.service === 'ENEO' ? 'from-orange-500 to-[#E54801]' : 'from-blue-500 to-blue-800'} flex items-center justify-center text-white text-xl mr-4`"
                >
                  <i
                    :class="`fas ${history.service === 'ENEO' ? 'fa-bolt' : 'fa-tint'}`"
                  ></i>
                </div>
                <div class="flex-1">
                  <div class="font-semibold text-[#1B0B38]">
                    Facture {{ history.service }}
                  </div>
                  <div class="text-gray-500 text-sm">
                    {{ history.date }} •
                    {{ history.service === "ENEO" ? "Compteur" : "Compte" }}:
                    {{ history.ref }}
                  </div>
                  <div class="font-bold text-[#1B0B38] mt-1">
                    {{ history.amount }}
                  </div>
                </div>
                <div
                  :class="`text-xs font-semibold px-3 py-1 rounded-full ${history.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`"
                >
                  {{ history.status === "paid" ? "Payé" : "En attente" }}
                </div>
              </div>
            </div>

            <RouterLink
              to="/locataire/recapitulatif-paiement"
              class="block w-full mt-6 py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-semibold text-center hover:border-[#E54801] hover:text-[#E54801] transition-all duration-300"
            >
              <i class="fas fa-list mr-2"></i>
              Voir tout l'historique
            </RouterLink>
          </div>
        </div>
      </div>
    

  </DashboardLayout>
</template>

<script setup>
import { ref, computed } from "vue";
import DashboardLayout from "../../layouts/DashboardLayout.vue";
import { RouterLink, useRouter } from "vue-router";

const router = useRouter();
const selectedService = ref("ENEO");
const accountNumber = ref("");
const amount = ref(null);
const paymentMethod = ref("mobile");
const isProcessing = ref(false);

const paymentHistory = ref([
  {
    service: "ENEO",
    date: "15 Mars 2025",
    ref: "789456123",
    amount: "23 500 FCFA",
    status: "paid",
  },
  {
    service: "Camwater",
    date: "10 Mars 2025",
    ref: "CW456789",
    amount: "18 200 FCFA",
    status: "paid",
  },
  {
    service: "ENEO",
    date: "5 Mars 2025",
    ref: "789456123",
    amount: "21 750 FCFA",
    status: "pending",
  },
]);

const totalAmount = computed(() => {
  return ((amount.value || 0) + 100).toLocaleString("fr-FR");
});

const formattedAmount = computed(() => {
  return (amount.value || 0).toLocaleString("fr-FR");
});

const setService = (service) => {
  selectedService.value = service;
  accountNumber.value = "";
};

const handlePayment = () => {
  if (!accountNumber.value || !amount.value || amount.value < 1000) return;
  isProcessing.value = true;
  setTimeout(() => {
    isProcessing.value = false;
    // Mock logic for success
    paymentHistory.value.unshift({
      service: selectedService.value,
      date: new Date().toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      ref: accountNumber.value,
      amount: amount.value.toLocaleString("fr-FR") + " FCFA",
      status: "paid",
    });
    accountNumber.value = "";
    amount.value = null;
    alert("Paiement effectué avec succès!");
  }, 2000);
};

const logout = () => router.push("/auth/connexion");
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

