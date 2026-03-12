<template>
  <DashboardLayout>
    <div class="max-w-7xl mx-auto h-full">
      <!-- HEADER SECTION -->
      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 animate-fadeIn"
      >
        <div>
          <h1 class="text-2xl font-bold text-foreground">Performances</h1>
          <p class="text-muted-foreground">Analysez vos résultats et progressez</p>
        </div>
        <div class="flex gap-2">
          <select
            class="bg-card border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary text-foreground"
          >
            <option class="bg-card">Ce mois</option>
            <option class="bg-card">Cette année</option>
            <option class="bg-card">Tout le temps</option>
          </select>
          <button
            class="bg-card text-muted-foreground px-4 py-2 rounded-lg border border-border hover:bg-muted/20 transition shadow-sm"
          >
            <i class="fas fa-download"></i> Export
          </button>
        </div>
      </div>

      <!-- KPIS CARDS -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-slide-up"
      >
        <div
          class="bg-card p-6 rounded-2xl shadow-sm border border-border relative overflow-hidden"
        >
          <div class="relative z-10">
            <p class="text-muted-foreground text-xs uppercase font-medium mb-1">
              Revenu Total
            </p>
            <p class="text-3xl font-bold text-foreground">12.5M</p>
            <p class="text-green-600 dark:text-green-400 text-sm mt-2 flex items-center gap-1">
              <i class="fas fa-arrow-up"></i> 15% vs mois dernier
            </p>
          </div>
          <i
            class="fas fa-wallet absolute -bottom-4 -right-4 text-8xl text-muted-foreground/10"
          ></i>
        </div>

        <div
          class="bg-card p-6 rounded-2xl shadow-sm border border-border relative overflow-hidden"
        >
          <div class="relative z-10">
            <p class="text-muted-foreground text-xs uppercase font-medium mb-1">
              Ventes / Locations
            </p>
            <p class="text-3xl font-bold text-foreground">14</p>
            <p class="text-green-600 dark:text-green-400 text-sm mt-2 flex items-center gap-1">
              <i class="fas fa-arrow-up"></i> 2 de plus
            </p>
          </div>
          <i
            class="fas fa-handshake absolute -bottom-4 -right-4 text-8xl text-muted-foreground/10"
          ></i>
        </div>

        <div
          class="bg-card p-6 rounded-2xl shadow-sm border border-border relative overflow-hidden"
        >
          <div class="relative z-10">
            <p class="text-muted-foreground text-xs uppercase font-medium mb-1">
              Taux de Conversion
            </p>
            <p class="text-3xl font-bold text-foreground">32%</p>
            <p class="text-red-500 dark:text-red-400 text-sm mt-2 flex items-center gap-1">
              <i class="fas fa-arrow-down"></i> 1.2%
            </p>
          </div>
          <i
            class="fas fa-chart-pie absolute -bottom-4 -right-4 text-8xl text-muted-foreground/10"
          ></i>
        </div>

        <div
          class="bg-card p-6 rounded-2xl shadow-sm border border-border relative overflow-hidden"
        >
          <div class="relative z-10">
            <p class="text-muted-foreground text-xs uppercase font-medium mb-1">
              Nouveaux Leads
            </p>
            <p class="text-3xl font-bold text-foreground">45</p>
            <p class="text-green-600 dark:text-green-400 text-sm mt-2 flex items-center gap-1">
              <i class="fas fa-arrow-up"></i> 8 actus
            </p>
          </div>
          <i
            class="fas fa-users absolute -bottom-4 -right-4 text-8xl text-muted-foreground/10"
          ></i>
        </div>
      </div>

      <!-- CHARTS GRID -->
      <div
        class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 animate-slide-up"
        style="animation-delay: 0.1s"
      >
        <!-- REVENUE CHART -->
        <div
          class="bg-card p-6 rounded-2xl shadow-sm border border-border"
        >
          <h3 class="font-bold text-foreground mb-6">Évolution des Revenus</h3>
          <div class="h-64 flex items-end justify-between gap-2">
            <!-- Simple Bar Chart using CSS heights -->
            <div
              v-for="(val, index) in monthlyRevenue"
              :key="index"
              class="w-full bg-secondary/10 rounded-t-lg relative group h-full flex flex-col justify-end"
            >
              <div
                :style="`height: ${val.percentage}%`"
                class="bg-gradient-to-t from-secondary to-secondary/80 rounded-t-lg w-full transition-all duration-500 relative"
              >
                <div
                  class="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 transform -translate-x-1/2 bg-foreground text-background text-xs py-1 px-2 rounded pointer-events-none transition-opacity shadow-lg"
                >
                  {{ val.amount }}M
                </div>
              </div>
              <p class="text-xs text-muted-foreground text-center mt-2">
                {{ val.month }}
              </p>
            </div>
          </div>
        </div>

        <!-- SOURCES CHART -->
        <div
          class="bg-card p-6 rounded-2xl shadow-sm border border-border"
        >
          <h3 class="font-bold text-foreground mb-6">Sources des Leads</h3>
          <div class="flex items-center justify-center h-64">
            <!-- Simple Pie Chart Representation -->
            <div
              class="relative w-48 h-48 rounded-full bg-secondary/10 border-8 border-card shadow-inner flex items-center justify-center"
            >
              <div
                class="absolute inset-0 rounded-full border-8 border-secondary clip-half"
              ></div>
              <div class="text-center">
                <p class="text-3xl font-bold text-foreground">65%</p>
                <p class="text-xs text-muted-foreground">Réseaux Sociaux</p>
              </div>
            </div>
          </div>
          <div class="flex justify-center gap-6 mt-4">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-secondary"></span>
              <span class="text-sm text-muted-foreground">Facebook/Instagram</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-blue-500"></span>
              <span class="text-sm text-muted-foreground">Site Web</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-muted-foreground/30"></span>
              <span class="text-sm text-muted-foreground">Bouche à oreille</span>
            </div>
          </div>
        </div>
      </div>

      <!-- RECENT ACTIVITY TABLE -->
      <div
        class="bg-card rounded-2xl shadow-sm border border-border overflow-hidden animate-slide-up"
        style="animation-delay: 0.2s"
      >
        <div class="p-6 border-b border-border">
          <h3 class="font-bold text-foreground">Activités Récentes</h3>
        </div>
        <table class="w-full text-left">
          <tbody class="divide-y divide-border">
            <tr
              v-for="(activity, index) in activities"
              :key="index"
              class="hover:bg-muted/5 transition-colors"
            >
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div
                    :class="`w-8 h-8 rounded-full flex items-center justify-center text-white ${activity.color}`"
                  >
                    <i :class="activity.icon"></i>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-foreground">
                      {{ activity.title }}
                    </p>
                    <p class="text-xs text-muted-foreground">{{ activity.time }}</p>
                  </div>
                </div>
              </td>
              <td
                class="px-6 py-4 text-right text-sm font-bold text-foreground"
              >
                {{ activity.value }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, reactive } from "vue";
import DashboardLayout from "../../layouts/DashboardLayout.vue";

const monthlyRevenue = reactive([
  { month: "Sep", percentage: 40, amount: 4.5 },
  { month: "Oct", percentage: 65, amount: 7.2 },
  { month: "Nov", percentage: 55, amount: 6.1 },
  { month: "Déc", percentage: 80, amount: 9.8 },
  { month: "Jan", percentage: 45, amount: 5.0 },
  { month: "Fév", percentage: 90, amount: 12.5 },
]);

const activities = reactive([
  {
    title: "Vente Villa Bastos",
    time: "Il y a 2h",
    value: "+ 15 000 000 FCFA",
    icon: "fas fa-check",
    color: "bg-green-500",
  },
  {
    title: "Nouveau Lead (Abonné)",
    time: "Il y a 5h",
    value: "Potentiel",
    icon: "fas fa-user-plus",
    color: "bg-blue-500",
  },
  {
    title: "Commission Reçue",
    time: "Hier",
    value: "+ 750 000 FCFA",
    icon: "fas fa-coins",
    color: "bg-yellow-500",
  },
  {
    title: "Paiement Formation",
    time: "20 Fév",
    value: "- 50 000 FCFA",
    icon: "fas fa-graduation-cap",
    color: "bg-purple-500",
  },
]);
</script>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.5s ease-out backwards;
}
.animate-slide-up {
  animation: slideUp 0.5s ease-out backwards;
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

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.clip-half {
  clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%);
}
</style>