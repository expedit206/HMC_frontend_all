<template>
  <DashboardLayout title="Espace Résident HMC">
    <div class="max-w-6xl">
      <!-- Header -->
      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
      >
        <div>
          <h1 class="text-2xl font-bold text-gray-900">
            Bonjour,
            <span class="text-[#E54801]">{{ authStore.user?.name }}</span> 👋
          </h1>
          <p class="text-gray-500 text-sm mt-1 font-medium">
            Heureux de vous revoir dans votre espace personnel.
          </p>
        </div>
        <RouterLink
          :to="{ name: 'Annonces' }"
          class="px-5 py-2.5 bg-[#1B0B38] text-white rounded-xl text-xs font-bold hover:scale-105 transition-all shadow-md uppercase tracking-wider flex items-center gap-2"
        >
          <i class="fas fa-search"></i> Nouvel appartement
        </RouterLink>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p
            class="text-[10px] text-gray-400 font-bold uppercase mb-1 tracking-widest"
          >
            Total Payé
          </p>
          <div class="flex items-end gap-1">
            <p class="text-2xl font-bold text-gray-900">
              {{ formatPrice(dashboardData?.stats?.total_spent) }}
            </p>
            <span class="text-[10px] font-bold text-gray-400 mb-1">XAF</span>
          </div>
        </div>
        <div class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p
            class="text-[10px] text-gray-400 font-bold uppercase mb-1 tracking-widest"
          >
            Locations Actives
          </p>
          <p class="text-2xl font-bold text-[#1B0B38]">
            {{ dashboardData.stats.active_rentals_count }}
          </p>
        </div>
        <div class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p
            class="text-[10px] text-gray-400 font-bold uppercase mb-1 tracking-widest"
          >
            Interventions
          </p>
          <p class="text-2xl font-bold text-gray-900">
            {{ dashboardData.stats.pending_interventions_count }}
            <span class="text-sm font-medium text-orange-500">en attente</span>
          </p>
        </div>
        <div
          class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 border-b-4 border-b-[#E54801]"
        >
          <p
            class="text-[10px] text-[#E54801] font-bold uppercase mb-1 tracking-widest"
          >
            Mes Favoris
          </p>
          <p class="text-2xl font-bold text-[#E54801]">
            {{ dashboardData.stats.favorites_count }}
          </p>
        </div>
      </div>

      <!-- Grille -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-6">
          <div
            v-if="dashboardData.active_rental"
            class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden group"
          >
            <div class="relative h-64 overflow-hidden">
              <img
                :src="
                  dashboardData.active_rental.property?.primary_image?.path ||
                  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'
                "
                alt="Logement"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div class="absolute top-4 left-4">
                <span
                  class="px-3 py-1 bg-green-500 text-white text-[10px] font-bold rounded-lg uppercase tracking-widest"
                  >Contrat Actif</span
                >
              </div>
            </div>
            <div class="p-6">
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h3 class="text-lg font-bold text-[#1B0B38]">
                    {{ dashboardData.active_rental.property?.title }}
                  </h3>
                  <p class="text-xs text-gray-500 font-medium">
                    <i class="fas fa-map-marker-alt mr-1"></i>
                    {{ dashboardData.active_rental.property?.location }}
                  </p>
                </div>
                <div class="text-right">
                  <p class="text-xl font-black text-[#E54801]">
                    {{ formatPrice(dashboardData.active_rental.price) }}
                    <span class="text-[10px] uppercase">XAF</span>
                  </p>
                  <p class="text-[9px] text-gray-400 font-bold">PAR MOIS</p>
                </div>
              </div>
              <div
                class="grid grid-cols-3 gap-4 py-4 border-y border-gray-50 mb-6"
              >
                <div class="text-center border-r border-gray-50">
                  <p
                    class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1"
                  >
                    Surface
                  </p>
                  <p class="text-sm font-black text-[#1B0B38]">
                    {{ dashboardData.active_rental.property?.area }}m²
                  </p>
                </div>
                <div class="text-center border-r border-gray-50">
                  <p
                    class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1"
                  >
                    Pièces
                  </p>
                  <p class="text-sm font-black text-[#1B0B38]">
                    {{ dashboardData.active_rental.property?.bedrooms }}
                  </p>
                </div>
                <div class="text-center">
                  <p
                    class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1"
                  >
                    Début
                  </p>
                  <p class="text-sm font-black text-[#1B0B38]">
                    {{
                      new Date(
                        dashboardData.active_rental.start_date,
                      ).toLocaleDateString()
                    }}
                  </p>
                </div>
              </div>
              <div class="flex gap-4">
                <RouterLink
                  :to="{ name: 'LocataireMesLocations' }"
                  class="flex-1 py-3 bg-[#1B0B38] text-white rounded-xl text-xs font-bold text-center hover:bg-[#E54801] transition-all uppercase tracking-widest"
                  >Détails Logement</RouterLink
                >
                <RouterLink
                  :to="{ name: 'LocataireMesPaiements' }"
                  class="flex-1 py-3 bg-[#E54801]/10 text-[#E54801] rounded-xl text-xs font-bold text-center hover:bg-[#E54801] hover:text-white transition-all uppercase tracking-widest"
                  >Payer Loyer</RouterLink
                >
              </div>
            </div>
          </div>
          <div
            v-else
            class="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-200"
          >
            <div
              class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 text-2xl mx-auto mb-4"
            >
              <i class="fas fa-home"></i>
            </div>
            <h3
              class="text-lg font-bold text-gray-400 uppercase tracking-tight"
            >
              Aucun logement occupé
            </h3>
            <p class="text-sm text-gray-400 mt-2">
              Vous n'avez pas encore de contrat de location actif.
            </p>
            <RouterLink
              :to="{ name: 'Annonces' }"
              class="inline-block mt-6 px-8 py-3 bg-[#E54801] text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg"
              >Chercher un bien</RouterLink
            >
          </div>

          <!-- Marketplace Promo -->
          <div
            class="bg-[#1B0B38] rounded-3xl p-8 text-white relative overflow-hidden"
          >
            <div class="relative z-10 w-2/3">
              <span
                class="text-[10px] font-black uppercase tracking-[0.2em] text-[#E54801] mb-2 block"
                >Nouveau !</span
              >
              <h3 class="text-2xl font-bold mb-4">
                Besoin de meubles ou d'électroménager ?
              </h3>
              <p class="text-sm text-gray-300 mb-6">
                Accédez à notre Marketplace pour équiper votre appartement à
                prix réduits.
              </p>
              <a
                href="#"
                class="inline-block px-6 py-3 bg-[#E54801] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg"
                >Visiter la marketplace</a
              >
            </div>
            <i
              class="fas fa-shopping-basket absolute -right-6 -bottom-6 text-9xl text-white/5 transform -rotate-12"
            ></i>
          </div>
        </div>

        <!-- Sidebar droite -->
        <div class="space-y-6">
          <!-- Actions rapides -->
          <div
            class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
          >
            <h3
              class="text-xs font-black text-[#1B0B38] uppercase tracking-[0.2em] mb-6"
            >
              Actions Rapides
            </h3>
            <div class="grid grid-cols-2 gap-3">
              <RouterLink
                :to="{ name: 'LocataireInterventions' }"
                class="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-2xl hover:bg-[#E54801]/5 transition-all group"
              >
                <i
                  class="fas fa-wrench text-[#E54801] mb-2 group-hover:scale-110 transition-transform"
                ></i>
                <span
                  class="text-[10px] font-bold text-[#1B0B38] uppercase text-center"
                  >Réparation</span
                >
              </RouterLink>
              <RouterLink
                :to="{ name: 'LocataireAssistance' }"
                class="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-2xl hover:bg-[#E54801]/5 transition-all group"
              >
                <i
                  class="fas fa-headset text-[#E54801] mb-2 group-hover:scale-110 transition-transform"
                ></i>
                <span
                  class="text-[10px] font-bold text-[#1B0B38] uppercase text-center"
                  >Support</span
                >
              </RouterLink>
              <RouterLink
                :to="{ name: 'LocataireMesPaiements' }"
                class="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-2xl hover:bg-[#E54801]/5 transition-all group"
              >
                <i
                  class="fas fa-file-invoice-dollar text-[#E54801] mb-2 group-hover:scale-110 transition-transform"
                ></i>
                <span
                  class="text-[10px] font-bold text-[#1B0B38] uppercase text-center"
                  >Quittances</span
                >
              </RouterLink>
              <RouterLink
                :to="{ name: 'Annonces' }"
                class="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-2xl hover:bg-[#E54801]/5 transition-all group"
              >
                <i
                  class="fas fa-search-plus text-[#E54801] mb-2 group-hover:scale-110 transition-transform"
                ></i>
                <span
                  class="text-[10px] font-bold text-[#1B0B38] uppercase text-center"
                  >Chercher</span
                >
              </RouterLink>
            </div>
          </div>

          <!-- Notifications -->
          <div
            class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
          >
            <div class="flex justify-between items-center mb-6">
              <h3
                class="text-xs font-black text-[#1B0B38] uppercase tracking-[0.2em]"
              >
                Notifications
              </h3>
              <div
                class="w-2 h-2 bg-[#E54801] rounded-full animate-pulse"
              ></div>
            </div>
            <div class="space-y-4">
              <div
                v-if="dashboardData.recent_transactions.length === 0"
                class="text-center py-4 text-gray-400 text-xs font-medium uppercase tracking-wider"
              >
                Aucune activité récente
              </div>
              <div
                v-for="item in dashboardData.recent_transactions"
                :key="item.id"
                class="flex gap-4 p-3 hover:bg-gray-50 rounded-xl transition-all cursor-pointer border-b border-gray-50 last:border-0"
              >
                <div
                  class="w-8 h-8 rounded-lg bg-orange-50 text-[#E54801] flex items-center justify-center shrink-0"
                >
                  <i class="fas fa-file-invoice-dollar text-xs"></i>
                </div>
                <div>
                  <p class="text-xs font-bold text-[#1B0B38]">
                    Loyer {{ item.metadata?.month || "Paiement" }}
                  </p>
                  <p class="text-[10px] text-gray-400">
                    {{ formatPrice(item.amount) }} XAF •
                    {{ item.status === "successful" ? "Payé" : "En attente" }}
                  </p>
                </div>
              </div>

              <div
                v-for="item in dashboardData.recent_interventions"
                :key="item.id"
                class="flex gap-4 p-3 hover:bg-gray-50 rounded-xl transition-all cursor-pointer border-b border-gray-50 last:border-0"
              >
                <div
                  class="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center shrink-0"
                >
                  <i class="fas fa-tools text-xs"></i>
                </div>
                <div>
                  <p class="text-xs font-bold text-[#1B0B38]">
                    {{ item.service?.title }}
                  </p>
                  <p class="text-[10px] text-gray-400">
                    Statut: {{ item.status }} •
                    {{ new Date(item.scheduled_at).toLocaleDateString() }}
                  </p>
                </div>
              </div>

              <!-- Visites récentes -->
              <div
                v-for="item in dashboardData.recent_visits"
                :key="'v' + item.id"
                class="flex gap-4 p-3 hover:bg-gray-50 rounded-xl transition-all cursor-pointer border-b border-gray-50 last:border-0"
              >
                <div
                  class="w-8 h-8 rounded-lg bg-green-50 text-green-500 flex items-center justify-center shrink-0"
                >
                  <i class="fas fa-calendar-check text-xs"></i>
                </div>
                <div>
                  <p class="text-xs font-bold text-[#1B0B38]">
                    Visite: {{ item.property?.title }}
                  </p>
                  <p class="text-[10px] text-gray-400">
                    Le
                    {{ new Date(item.scheduled_at).toLocaleDateString() }} à
                    {{ new Date(item.scheduled_at).getHours() }}h
                  </p>
                </div>
              </div>
            </div>
            <button
              class="w-full mt-6 py-2 text-[10px] font-black text-[#E54801] uppercase tracking-widest hover:underline"
            >
              Voir tout
            </button>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import axios from "../../axios";
import DashboardLayout from "../../layouts/DashboardLayout.vue";

const router = useRouter();
const authStore = useAuthStore();
const isLoading = ref(true);

const dashboardData = ref({
  stats: {
    active_rentals_count: 0,
    total_spent: 0,
    pending_interventions_count: 0,
    favorites_count: 0,
  },
  active_rental: null,
  recent_transactions: [],
  recent_interventions: [],
  recent_visits: [],
});

const fetchDashboardData = async () => {
  try {
    const { data } = await axios.get("/api/tenant/dashboard");
    if (data.success) {
      dashboardData.value = data.data;
    }
  } catch (err) {
    console.error("Erreur chargement dashboard locataire:", err);
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchDashboardData);

const formatPrice = (price) => new Intl.NumberFormat("fr-FR").format(price);
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
