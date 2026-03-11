<template>
  <SharedParametresLayout title="Paramètres de la Plateforme" subtitle="Configuration globale du système Home Cameroon"
    :tabs="tabs" defaultTab="site">
    <!-- SITE SETTINGS -->
    <template #site>
      <div class="space-y-6">
        <section class="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-50">
          <h3 class="text-xs font-black text-[#1B0B38] uppercase tracking-widest mb-8">
            Informations de la Plateforme
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2">Nom du
                Site</label>
              <input type="text" v-model="settings.siteName"
                class="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#E54801]/20 focus:outline-none transition-all" />
            </div>
            <div>
              <label class="block text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2">Contact
                Support</label>
              <input type="email" v-model="settings.supportEmail"
                class="w-full px-5 py-3 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#E54801]/20 focus:outline-none transition-all" />
            </div>
          </div>
        </section>

        <!-- Maintenance Mode -->
        <section class="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-50 border-l-8 border-[#E54801]">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-black text-[#1B0B38] uppercase tracking-tight">Mode Maintenance</h3>
              <p class="text-xs text-gray-400 font-medium mt-1">Rendre le site inaccessible pendant les mises à jour</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="settings.maintenanceMode" class="sr-only peer" />
              <div
                class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E54801]">
              </div>
            </label>
          </div>
        </section>
      </div>
    </template>

    <!-- PAYMENT SETTINGS -->
    <template #payment>
      <div class="space-y-6">
        <section class="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-50">
          <h3 class="text-xs font-black text-[#1B0B38] uppercase tracking-widest mb-8">
            Passerelle de Paiement (MoMo/OM)
          </h3>
          <div class="space-y-6">
            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div>
                <p class="text-sm font-black text-[#1B0B38]">Taux de commission plateforme (%)</p>
                <p class="text-[10px] text-gray-400 font-medium">Appliqué sur toutes les transactions immobilières</p>
              </div>
              <input type="number" v-model="settings.commissionRate"
                class="w-20 px-4 py-2 bg-white border border-gray-100 rounded-xl text-center font-black focus:outline-none focus:ring-2 focus:ring-[#E54801]/20" />
            </div>

            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div>
                <p class="text-sm font-black text-[#1B0B38]">Frais d'inscription Agent (CFA)</p>
                <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest opacity-60">Paiement unique pour
                  certification</p>
              </div>
              <input type="text" v-model="settings.agentFee"
                class="w-32 px-4 py-2 bg-white border border-gray-100 rounded-xl text-center font-black focus:outline-none focus:ring-2 focus:ring-[#E54801]/20" />
            </div>
          </div>
          <div class="pt-6 flex justify-end">
            <button
              class="px-6 py-3 bg-[#E54801] text-white font-bold rounded-xl hover:bg-[#913327] transition shadow-md">Sauvegarder
              les paiements</button>
          </div>
        </section>
      </div>
    </template>
  </SharedParametresLayout>
</template>

<script setup>
import { reactive } from "vue";
import SharedParametresLayout from "../../components/settings/SharedParametresLayout.vue";

const tabs = [
  { id: "site", label: "Système" },
  { id: "payment", label: "Paiements" },
  { id: "security", label: "Sécurité Admin" }
];

const settings = reactive({
  siteName: "Home Cameroon",
  supportEmail: "support@homecameroon.cm",
  commissionRate: 10,
  agentFee: "25,000",
  maintenanceMode: false,
});
</script>
