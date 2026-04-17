<template>
  <div class="dashboard-page-content">
    <div class="max-w-6xl">
      <!-- Role Switcher -->
      <DashboardRoleSwitcher />
      <!-- Header -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 class="text-2xl font-bold text-foreground">
            Bonjour,
            <span class="text-secondary">{{ authStore.user?.name }}</span> 👋
          </h1>
          <p class="text-muted-foreground text-sm mt-1 font-medium">
            Heureux de vous revoir dans votre espace personnel.
          </p>
        </div>
        <RouterLink
          :to="{ name: 'Annonces' }"
          class="px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-xs font-bold hover:scale-105 transition-all shadow-md uppercase tracking-wider flex items-center gap-2"
        >
          <i class="fas fa-search"></i> Nouvel appartement
        </RouterLink>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div class="bg-card p-5 rounded-2xl shadow-sm border border-border">
          <p
            class="text-[10px] text-muted-foreground font-bold uppercase mb-1 tracking-widest"
          >
            Total Payé
          </p>
          <div class="flex items-end gap-1">
            <p class="text-2xl font-bold text-foreground">
              {{ formatPrice(dashboardData?.stats?.total_spent) }}
            </p>
            <span class="text-[10px] font-bold text-muted-foreground mb-1">XAF</span>
          </div>
        </div>
        <div class="bg-card p-5 rounded-2xl shadow-sm border border-border">
          <p
            class="text-[10px] text-muted-foreground font-bold uppercase mb-1 tracking-widest"
          >
            Locations Actives
          </p>
          <p class="text-2xl font-bold text-foreground">
            {{ dashboardData.stats.active_rentals_count }}
          </p>
        </div>
        <div class="bg-card p-5 rounded-2xl shadow-sm border border-border">
          <p
            class="text-[10px] text-muted-foreground font-bold uppercase mb-1 tracking-widest"
          >
            Interventions
          </p>
          <p class="text-2xl font-bold text-foreground">
            {{ dashboardData.stats.pending_interventions_count }}
            <span class="text-sm font-medium text-orange-500 dark:text-orange-400">en attente</span>
          </p>
        </div>
        <div
          class="bg-card p-5 rounded-2xl shadow-sm border border-border border-b-4 border-b-secondary"
        >
          <p
            class="text-[10px] text-secondary font-bold uppercase mb-1 tracking-widest"
          >
            Mes Favoris
          </p>
          <p class="text-2xl font-bold text-secondary">
            {{ dashboardData.stats.favorites_count }}
          </p>
        </div>
      </div>

      <!-- Grille -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-6">
          <div
            v-if="dashboardData.active_rental"
            class="bg-card rounded-3xl shadow-sm border border-border overflow-hidden group"
          >
            <div class="relative h-64 overflow-hidden">
              <img :src="dashboardData.active_rental.property?.primary_image?.path ||
                'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'
                " alt="Logement"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div class="absolute top-4 left-4">
                <span
                  class="px-3 py-1 bg-green-500 text-white text-[10px] font-bold rounded-lg uppercase tracking-widest">Contrat
                  Actif</span>
              </div>
            </div>
            <div class="p-6">
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h3 class="text-lg font-bold text-foreground">
                    {{ dashboardData.active_rental.property?.title }}
                  </h3>
                  <p class="text-xs text-muted-foreground font-medium">
                    <i class="fas fa-map-marker-alt mr-1"></i>
                    {{ dashboardData.active_rental.property?.location }}
                  </p>
                </div>
                <div class="text-right">
                  <p class="text-xl font-black text-secondary">
                    {{ formatPrice(dashboardData.active_rental.price) }}
                    <span class="text-[10px] uppercase">XAF</span>
                  </p>
                  <p class="text-[9px] text-muted-foreground font-bold">PAR MOIS</p>
                </div>
              </div>
              <div
                class="grid grid-cols-3 gap-4 py-4 border-y border-border mb-6"
              >
                <div class="text-center border-r border-border">
                  <p
                    class="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1"
                  >
                    Surface
                  </p>
                  <p class="text-sm font-black text-foreground">
                    {{ dashboardData.active_rental.property?.area }}m²
                  </p>
                </div>
                <div class="text-center border-r border-border">
                  <p
                    class="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1"
                  >
                    Pièces
                  </p>
                  <p class="text-sm font-black text-foreground">
                    {{ dashboardData.active_rental.property?.bedrooms }}
                  </p>
                </div>
                <div class="text-center">
                  <p
                    class="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1"
                  >
                    Début
                  </p>
                  <p class="text-sm font-black text-foreground">
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
                  class="flex-1 py-3 bg-primary text-primary-foreground rounded-xl text-xs font-bold text-center hover:bg-secondary hover:text-secondary-foreground transition-all uppercase tracking-widest"
                  >Détails Logement</RouterLink
                >
                <RouterLink
                  :to="{ name: 'LocataireMesPaiements' }"
                  class="flex-1 py-3 bg-secondary/10 text-secondary rounded-xl text-xs font-bold text-center hover:bg-secondary hover:text-secondary-foreground transition-all uppercase tracking-widest"
                  >Payer Loyer</RouterLink
                >
              </div>
            </div>
          </div>
          <div
            v-else
            class="bg-card rounded-3xl p-12 text-center border border-dashed border-border"
          >
            <div
              class="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center text-muted-foreground/50 text-2xl mx-auto mb-4"
            >
              <i class="fas fa-home"></i>
            </div>
            <h3
              class="text-lg font-bold text-muted-foreground uppercase tracking-tight"
            >
              Aucun logement occupé
            </h3>
            <p class="text-sm text-muted-foreground mt-2">
              Vous n'avez pas encore de contrat de location actif.
            </p>
            <RouterLink
              :to="{ name: 'Annonces' }"
              class="inline-block mt-6 px-8 py-3 bg-secondary text-secondary-foreground rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg"
              >Chercher un bien</RouterLink
            >
          </div>

          <!-- Marketplace Promo -->
          <div
            class="bg-primary rounded-3xl p-8 text-primary-foreground relative overflow-hidden"
          >
            <div class="relative z-10 w-2/3">
              <span
                class="text-[10px] font-black uppercase tracking-[0.2em] text-secondary mb-2 block"
                >Nouveau !</span
              >
              <h3 class="text-2xl font-bold mb-4">
                Besoin de meubles ou d'électroménager ?
              </h3>
              <p class="text-sm text-primary-foreground/70 mb-6">
                Accédez à notre Marketplace pour équiper votre appartement à
                prix réduits.
              </p>
              <a
                href="#"
                class="inline-block px-6 py-3 bg-secondary text-secondary-foreground rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg"
                >Visiter la marketplace</a
              >
            </div>
            <i
              class="fas fa-shopping-basket absolute -right-6 -bottom-6 text-9xl text-white/5 transform -rotate-12"></i>
          </div>
        </div>

        <!-- Sidebar droite -->
        <div class="space-y-6">
          <!-- Actions rapides -->
          <div
            class="bg-card rounded-3xl p-6 shadow-sm border border-border"
          >
            <h3
              class="text-xs font-black text-foreground uppercase tracking-[0.2em] mb-6"
            >
              Actions Rapides
            </h3>
            <div class="grid grid-cols-2 gap-3">
              <RouterLink
                :to="{ name: 'LocataireInterventions' }"
                class="flex flex-col items-center justify-center p-4 bg-muted/20 rounded-2xl hover:bg-secondary/10 transition-all group"
              >
                <i
                  class="fas fa-wrench text-secondary mb-2 group-hover:scale-110 transition-transform"
                ></i>
                <span
                  class="text-[10px] font-bold text-foreground uppercase text-center"
                  >Réparation</span
                >
              </RouterLink>
              <RouterLink
                :to="{ name: 'LocataireAssistance' }"
                class="flex flex-col items-center justify-center p-4 bg-muted/20 rounded-2xl hover:bg-secondary/10 transition-all group"
              >
                <i
                  class="fas fa-headset text-secondary mb-2 group-hover:scale-110 transition-transform"
                ></i>
                <span
                  class="text-[10px] font-bold text-foreground uppercase text-center"
                  >Support</span
                >
              </RouterLink>
              <RouterLink
                :to="{ name: 'LocataireMesPaiements' }"
                class="flex flex-col items-center justify-center p-4 bg-muted/20 rounded-2xl hover:bg-secondary/10 transition-all group"
              >
                <i
                  class="fas fa-file-invoice-dollar text-secondary mb-2 group-hover:scale-110 transition-transform"
                ></i>
                <span
                  class="text-[10px] font-bold text-foreground uppercase text-center"
                  >Quittances</span
                >
              </RouterLink>
              <RouterLink
                :to="{ name: 'Annonces' }"
                class="flex flex-col items-center justify-center p-4 bg-muted/20 rounded-2xl hover:bg-secondary/10 transition-all group"
              >
                <i
                  class="fas fa-search-plus text-secondary mb-2 group-hover:scale-110 transition-transform"
                ></i>
                <span
                  class="text-[10px] font-bold text-foreground uppercase text-center"
                  >Chercher</span
                >
              </RouterLink>
            </div>
          </div>

          <!-- Notifications -->
          <div
            class="bg-card rounded-3xl p-6 shadow-sm border border-border"
          >
            <div class="flex justify-between items-center mb-6">
              <h3
                class="text-xs font-black text-foreground uppercase tracking-[0.2em]"
              >
                Notifications
              </h3>
              <div
                class="w-2 h-2 bg-secondary rounded-full animate-pulse"
              ></div>
            </div>
            <div class="space-y-4">
              <div
                v-if="dashboardData.recent_transactions.length === 0 && dashboardData.recent_interventions.length === 0 && dashboardData.recent_visits.length === 0"
                class="text-center py-4 text-muted-foreground text-xs font-medium uppercase tracking-wider"
              >
                Aucune activité récente
              </div>
              <div
                v-for="item in dashboardData.recent_transactions"
                :key="item.id"
                class="flex gap-4 p-3 hover:bg-muted/20 rounded-xl transition-all cursor-pointer border-b border-border last:border-0"
              >
                <div
                  class="w-8 h-8 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center shrink-0"
                >
                  <i class="fas fa-file-invoice-dollar text-xs"></i>
                </div>
                <div>
                  <p class="text-xs font-bold text-foreground">
                    Loyer {{ item.metadata?.month || "Paiement" }}
                  </p>
                  <p class="text-[10px] text-muted-foreground">
                    {{ formatPrice(item.amount) }} XAF •
                    {{ item.status === "successful" ? "Payé" : "En attente" }}
                  </p>
                </div>
              </div>

              <div
                v-for="item in dashboardData.recent_interventions"
                :key="item.id"
                class="flex gap-4 p-3 hover:bg-muted/20 rounded-xl transition-all cursor-pointer border-b border-border last:border-0"
              >
                <div
                  class="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0"
                >
                  <i class="fas fa-tools text-xs"></i>
                </div>
                <div>
                  <p class="text-xs font-bold text-foreground">
                    {{ item.service?.title }}
                  </p>
                  <p class="text-[10px] text-muted-foreground">
                    Statut: {{ item.status }} •
                    {{ new Date(item.scheduled_at).toLocaleDateString() }}
                  </p>
                </div>
              </div>

              <!-- Visites récentes -->
              <div
                v-for="item in dashboardData.recent_visits"
                :key="'v' + item.id"
                class="flex gap-4 p-3 hover:bg-muted/20 rounded-xl transition-all cursor-pointer border-b border-border last:border-0"
              >
                <div
                  class="w-8 h-8 rounded-lg bg-green-500/10 text-green-600 flex items-center justify-center shrink-0"
                >
                  <i class="fas fa-calendar-check text-xs"></i>
                </div>
                <div>
                  <p class="text-xs font-bold text-foreground">
                    Visite: {{ item.property?.title }}
                  </p>
                  <p class="text-[10px] text-muted-foreground">
                    Le
                    {{ new Date(item.scheduled_at).toLocaleDateString() }} à
                    {{ new Date(item.scheduled_at).getHours() }}h
                  </p>
                </div>
              </div>
            </div>
            <button
              class="w-full mt-6 py-2 text-[10px] font-black text-secondary uppercase tracking-widest hover:underline"
            >
              Voir tout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import axios from "../../axios";
import DashboardRoleSwitcher from "../../components/common/DashboardRoleSwitcher.vue";

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
  background-color: hsl(var(--secondary));
  color: hsl(var(--secondary-foreground));
  box-shadow: 0 4px 12px hsl(var(--secondary) / 0.2);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: hsl(var(--muted));
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: hsl(var(--secondary));
  border-radius: 10px;
}
</style>