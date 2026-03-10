<template>
  <DashboardLayout>
    <div class="max-w-4xl mx-auto space-y-8 pb-10">
      <!-- Site Info -->
      <section
        class="bg-card p-8 rounded-3xl shadow-sm border border-border"
      >
        <h3
          class="text-xs font-black text-foreground uppercase tracking-widest mb-8"
        >
          Informations de la Plateforme
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              class="block text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-2"
              >Nom du Site</label
            >
            <input
              type="text"
              v-model="settings.siteName"
              class="w-full px-5 py-3 bg-muted/20 border-none rounded-2xl text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
            />
          </div>
          <div>
            <label
              class="block text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-2"
              >Contact Support</label
            >
            <input
              type="email"
              v-model="settings.supportEmail"
              class="w-full px-5 py-3 bg-muted/20 border-none rounded-2xl text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all"
            />
          </div>
        </div>
      </section>

      <!-- Payment Settings -->
      <section
        class="bg-card p-8 rounded-3xl shadow-sm border border-border"
      >
        <h3
          class="text-xs font-black text-foreground uppercase tracking-widest mb-8"
        >
          Passerelle de Paiement (MoMo/OM)
        </h3>
        <div class="space-y-6">
          <div
            class="flex items-center justify-between p-4 bg-muted/20 rounded-2xl"
          >
            <div>
              <p class="text-sm font-black text-foreground">
                Taux de commission plateforme (%)
              </p>
              <p class="text-[10px] text-muted-foreground font-medium">
                Appliqué sur toutes les transactions immobilières
              </p>
            </div>
            <input
              type="number"
              v-model="settings.commissionRate"
              class="w-20 px-4 py-2 bg-card border border-border rounded-xl text-center font-black text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div
            class="flex items-center justify-between p-4 bg-muted/20 rounded-2xl"
          >
            <div>
              <p class="text-sm font-black text-foreground">
                Frais d'inscription Agent (CFA)
              </p>
              <p
                class="text-[10px] text-muted-foreground font-bold uppercase tracking-widest opacity-60"
              >
                Paiement unique pour certification
              </p>
            </div>
            <input
              type="text"
              v-model="settings.agentFee"
              class="w-32 px-4 py-2 bg-card border border-border rounded-xl text-center font-black text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </section>

      <!-- Maintenance Mode -->
      <section
        class="bg-card p-8 rounded-3xl shadow-sm border border-border border-l-8 border-secondary"
      >
<div class="flex items-center justify-between">
  <div>
    <h3
      class="text-sm font-black text-foreground uppercase tracking-tight"
    >
      Mode Maintenance
    </h3>
    <p class="text-xs text-muted-foreground font-medium mt-1">
      Rendre le site inaccessible pendant les mises à jour
    </p>
  </div>
  <label class="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      v-model="settings.maintenanceMode"
      class="sr-only peer"
    />
    <div
      class="w-11 h-6 bg-muted rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"
    ></div>
  </label>
</div>
      </section>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, reactive } from "vue";
import DashboardLayout from "../../layouts/DashboardLayout.vue";

const settings = reactive({
  siteName: "Home Cameroon",
  supportEmail: "support@homecameroon.cm",
  commissionRate: 10,
  agentFee: "25,000",
  maintenanceMode: false,
});
</script>

<style scoped>
/* Scoped styles */
</style>