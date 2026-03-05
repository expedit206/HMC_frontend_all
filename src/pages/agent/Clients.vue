<template>
  <DashboardLayout>

      <div class="max-w-7xl mx-auto h-full">
  

        <!-- HEADER SECTION -->
        <div
          class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 animate-fadeIn"
        >
          <div>
            <h1 class="text-2xl font-bold text-[#1B0B38]">Mes Clients</h1>
            <p class="text-gray-500">Gérez votre portefeuille de contacts</p>
          </div>
          <div class="flex gap-3">
            <div class="relative">
              <input
                type="text"
                placeholder="Rechercher un client..."
                class="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E54801] w-full md:w-64"
              />
              <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
            </div>
            <button
              class="bg-[#E54801] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#913327] transition flex items-center gap-2 shadow-lg"
            >
              <i class="fas fa-user-plus"></i>
              <span class="hidden sm:inline">Nouveau Client</span>
            </button>
          </div>
        </div>

        <!-- FIL TABS -->
        <div
          class="flex border-b border-gray-200 mb-6 animate-fadeIn"
          style="animation-delay: 0.1s"
        >
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'px-6 py-3 font-medium text-sm transition-colors border-b-2',
              activeTab === tab.id
                ? 'border-[#E54801] text-[#E54801]'
                : 'border-transparent text-gray-500 hover:text-gray-700',
            ]"
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- CLIENTS GRID -->
        <div v-if="isLoading" class="py-20 text-center text-gray-400">
          <i
            class="fas fa-circle-notch fa-spin text-3xl mb-4 text-[#E54801]"
          ></i>
          <p class="font-bold uppercase text-[10px] tracking-widest">
            Chargement de vos clients...
          </p>
        </div>
        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-slide-up"
          style="animation-delay: 0.2s"
        >
          <div
            v-for="client in filteredClients"
            :key="client.id"
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:-translate-y-1 transition-transform duration-300"
          >
            <div class="flex justify-between items-start mb-4">
              <div class="flex items-center gap-3">
                <div
                  class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-xl font-bold overflow-hidden"
                >
                  <img
                    v-if="client.avatar"
                    :src="
                      client.avatar.startsWith('http')
                        ? client.avatar
                        : `/storage/${client.avatar}`
                    "
                    alt="Avatar"
                    class="w-full h-full object-cover"
                  />
                  <span v-else>{{ client.initials }}</span>
                </div>
                <div>
                  <h3 class="font-bold text-[#1B0B38]">{{ client.name }}</h3>
                  <p class="text-xs text-gray-500">{{ client.role }}</p>
                </div>
              </div>
              <button class="text-gray-400 hover:text-[#E54801]">
                <i class="fas fa-ellipsis-v"></i>
              </button>
            </div>

            <div class="space-y-3 mb-6">
              <div class="flex items-center gap-3 text-sm text-gray-600">
                <i class="fas fa-phone text-gray-400 w-5"></i>
                <span>{{ client.phone || "Non renseigné" }}</span>
              </div>
              <div class="flex items-center gap-3 text-sm text-gray-600">
                <i class="fas fa-envelope text-gray-400 w-5"></i>
                <span>{{ client.email }}</span>
              </div>
              <div class="flex items-center gap-3 text-sm text-gray-600">
                <i class="fas fa-map-marker-alt text-gray-400 w-5"></i>
                <span>{{ client.location }}</span>
              </div>
            </div>

            <div
              class="flex items-center justify-between pt-4 border-t border-gray-100"
            >
              <span
                :class="[
                  'px-3 py-1 rounded-full text-xs font-medium',
                  client.status === 'Actif'
                    ? 'bg-green-50 text-green-600'
                    : 'bg-gray-100 text-gray-600',
                ]"
              >
                {{ client.status }}
              </span>
              <button
                class="text-[#E54801] text-sm font-medium hover:underline"
              >
                Voir le dossier
              </button>
            </div>
          </div>

          <!-- Add New Card (Empty State) -->
          <div
            class="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center text-gray-400 hover:border-[#E54801] hover:text-[#E54801] hover:bg-orange-50 transition-colors cursor-pointer min-h-[250px]"
          >
            <div
              class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4 group-hover:bg-white transition-colors"
            >
              <i class="fas fa-plus text-2xl"></i>
            </div>
            <p class="font-medium">Ajouter un nouveau client</p>
          </div>
        </div>
      </div>
    

  </DashboardLayout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import DashboardLayout from "../../layouts/DashboardLayout.vue";
import axios from "../../axios";
const activeTab = ref("all");
const isLoading = ref(true);
const clients = ref([]);

const tabs = [
  { id: "all", label: "Tous" },
  { id: "tenants", label: "Locataires" },
];

const fetchClients = async () => {
  isLoading.value = true;
  try {
    const { data } = await axios.get("/api/agent/clients");
    if (data.success) {
      clients.value = data.data.map((c) => ({
        ...c,
        initials: c.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase(),
        role: "Locataire", // For now we fetch users with active rentals
        location: c.city || "Cameroun",
        status: "Actif",
        type: "tenants",
      }));
    }
  } catch (err) {
    console.error("Erreur chargement clients agent:", err);
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchClients);

const filteredClients = computed(() => {
  if (activeTab.value === "all") return clients.value;
  return clients.value.filter((c) => c.type === activeTab.value);
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

