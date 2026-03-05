<template>
  <DashboardLayout>

      <div class="max-w-7xl mx-auto h-full">
  

        <!-- HEADER SECTION -->
        <div
          class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 animate-fadeIn"
        >
          <div>
            <h1 class="text-2xl font-bold text-[#1B0B38]">
              Gestion des Contrats
            </h1>
            <p class="text-gray-500">
              Créez, signez et archivez vos documents légaux
            </p>
          </div>
          <button
            class="bg-[#E54801] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#913327] transition flex items-center gap-2 shadow-lg"
          >
            <i class="fas fa-file-contract"></i>
            <span>Nouveau Contrat</span>
          </button>
        </div>

        <!-- STATS SUMMARY -->
        <div
          class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 animate-slide-up"
        >
          <div
            class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between"
          >
            <div>
              <p class="text-gray-500 text-sm font-medium">Contrats actifs</p>
              <h3 class="text-3xl font-bold text-[#1B0B38]">8</h3>
            </div>
            <div
              class="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-xl"
            >
              <i class="fas fa-file-signature"></i>
            </div>
          </div>
          <div
            class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between"
          >
            <div>
              <p class="text-gray-500 text-sm font-medium">
                En attente de signature
              </p>
              <h3 class="text-3xl font-bold text-[#1B0B38]">3</h3>
            </div>
            <div
              class="w-12 h-12 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center text-xl"
            >
              <i class="fas fa-pen-fancy"></i>
            </div>
          </div>
          <div
            class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between"
          >
            <div>
              <p class="text-gray-500 text-sm font-medium">Expirant bientôt</p>
              <h3 class="text-3xl font-bold text-[#1B0B38]">2</h3>
            </div>
            <div
              class="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center text-xl"
            >
              <i class="fas fa-clock"></i>
            </div>
          </div>
        </div>

        <!-- TABS & FILTERS -->
        <div
          class="flex items-center justify-between border-b border-gray-200 mb-6 animate-slide-up"
          style="animation-delay: 0.1s"
        >
          <div class="flex gap-6">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'pb-3 font-medium text-sm transition-colors border-b-2',
                activeTab === tab.id
                  ? 'border-[#E54801] text-[#E54801]'
                  : 'border-transparent text-gray-500 hover:text-gray-700',
              ]"
            >
              {{ tab.label }}
            </button>
          </div>
          <div class="flex gap-2 pb-2">
            <button
              class="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
            >
              <i class="fas fa-filter"></i>
            </button>
            <button
              class="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
            >
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div>

        <!-- CONTRACTS LIST -->
        <div
          class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-slide-up"
          style="animation-delay: 0.2s"
        >
          <table class="w-full text-left border-collapse">
            <thead>
              <tr
                class="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold tracking-wider"
              >
                <th class="px-6 py-4">Document</th>
                <th class="px-6 py-4">Parties</th>
                <th class="px-6 py-4">Date de Création</th>
                <th class="px-6 py-4">Statut</th>
                <th class="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr
                v-for="contract in filteredContracts"
                :key="contract.id"
                class="hover:bg-gray-50 transition-colors group"
              >
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-10 h-10 rounded-lg bg-red-50 text-red-500 flex items-center justify-center text-lg"
                    >
                      <i class="fas fa-file-pdf"></i>
                    </div>
                    <div>
                      <p class="font-bold text-[#1B0B38] text-sm">
                        {{ contract.title }}
                      </p>
                      <p class="text-xs text-gray-500">
                        Ref: {{ contract.ref }}
                      </p>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center -space-x-2">
                    <div
                      class="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-600"
                      title="Agent"
                    >
                      Moi
                    </div>
                    <div
                      class="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-xs font-bold text-blue-600"
                      :title="contract.client"
                    >
                      {{ contract.clientInitials }}
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 text-sm text-gray-600">
                  {{ contract.date }}
                </td>
                <td class="px-6 py-4">
                  <span
                    :class="[
                      'px-3 py-1 rounded-full text-xs font-medium border',
                      contract.status === 'Signé'
                        ? 'bg-green-50 text-green-600 border-green-200'
                        : contract.status === 'En attente'
                          ? 'bg-orange-50 text-orange-600 border-orange-200'
                          : 'bg-gray-50 text-gray-600 border-gray-200',
                    ]"
                  >
                    {{ contract.status }}
                  </span>
                </td>
                <td class="px-6 py-4 text-right">
                  <div
                    class="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <button
                      class="p-2 text-gray-400 hover:text-[#E54801] transition-colors"
                      title="Télécharger"
                    >
                      <i class="fas fa-download"></i>
                    </button>
                    <button
                      class="p-2 text-gray-400 hover:text-[#E54801] transition-colors"
                      title="Imprimer"
                    >
                      <i class="fas fa-print"></i>
                    </button>
                    <button
                      class="p-2 text-gray-400 hover:text-[#E54801] transition-colors"
                      title="Plus d'options"
                    >
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    

  </DashboardLayout>
</template>

<script setup>
import { ref, computed, reactive } from "vue";
import DashboardLayout from "../../layouts/DashboardLayout.vue";
const activeTab = ref("all");

const tabs = [
  { id: "all", label: "Tous les contrats" },
  { id: "signed", label: "Signés" },
  { id: "pending", label: "En attente" },
  { id: "archived", label: "Archivés" },
];

const contracts = reactive([
  {
    id: 1,
    title: "Contrat de location - Apt T3",
    ref: "LOC-2025-001",
    client: "Sophie Mbarga",
    clientInitials: "SM",
    date: "14 Fév 2025",
    status: "En attente",
    category: "pending",
  },
  {
    id: 2,
    title: "Mandat de vente exclusif - Villa",
    ref: "VEN-2025-042",
    client: "Jean-Pierre Nkomo",
    clientInitials: "JP",
    date: "10 Fév 2025",
    status: "Signé",
    category: "signed",
  },
  {
    id: 3,
    title: "Contrat de bail commercial",
    ref: "COM-2025-012",
    client: "Marc Atangana",
    clientInitials: "MA",
    date: "05 Fév 2025",
    status: "Signé",
    category: "signed",
  },
  {
    id: 4,
    title: "Avenant au bail - Renouvellement",
    ref: "LOC-2024-089-A",
    client: "Alice Fofana",
    clientInitials: "AF",
    date: "01 Fév 2025",
    status: "Archivé",
    category: "archived",
  },
  {
    id: 5,
    title: "Offre d'achat contresignée",
    ref: "OFF-2025-003",
    client: "Paul Biya (Investisseur)",
    clientInitials: "PB",
    date: "28 Jan 2025",
    status: "Signé",
    category: "signed",
  },
]);

const filteredContracts = computed(() => {
  if (activeTab.value === "all") return contracts;
  return contracts.filter((c) => c.category === activeTab.value);
});
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
</style>

