<template>
  <div class="dashboard-page-content">
    <div class="max-w-7xl mx-auto h-full">
      <!-- HEADER SECTION -->
      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 animate-fadeIn"
      >
        <div>
          <h1 class="text-2xl font-bold text-foreground">Mes Clients</h1>
          <p class="text-muted-foreground">Gérez votre portefeuille de contacts</p>
        </div>
        <div class="flex gap-3">
          <div class="relative">
            <input
              type="text"
              placeholder="Rechercher un client..."
              class="pl-10 pr-4 py-2 border border-border bg-background text-foreground placeholder:text-muted-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary w-full md:w-64"
            />
            <i class="fas fa-search absolute left-3 top-3 text-muted-foreground"></i>
          </div>
          <button
            class="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg font-medium hover:bg-secondary/90 transition flex items-center gap-2 shadow-lg"
          >
            <i class="fas fa-user-plus"></i>
            <span class="hidden sm:inline">Nouveau Client</span>
          </button>
        </div>
      </div>

      <!-- FIL TABS -->
      <div
        class="flex border-b border-border mb-6 animate-fadeIn"
        style="animation-delay: 0.1s"
      >
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'px-6 py-3 font-medium text-sm transition-colors border-b-2',
            activeTab === tab.id
              ? 'border-secondary text-secondary'
              : 'border-transparent text-muted-foreground hover:text-foreground',
          ]"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- CLIENTS GRID -->
      <div v-if="isLoading" class="py-20 text-center text-muted-foreground">
        <i
          class="fas fa-circle-notch fa-spin text-3xl mb-4 text-secondary"
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
          class="bg-card rounded-2xl shadow-sm border border-border p-6 hover:-translate-y-1 transition-transform duration-300"
        >
          <div class="flex justify-between items-start mb-4">
            <div class="flex items-center gap-3">
              <div
                class="w-12 h-12 rounded-full bg-muted/20 flex items-center justify-center text-muted-foreground text-xl font-bold overflow-hidden"
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
                <h3 class="font-bold text-foreground">{{ client.name }}</h3>
                <p class="text-xs text-muted-foreground">{{ client.role }}</p>
              </div>
            </div>
            <button class="text-muted-foreground hover:text-secondary">
              <i class="fas fa-ellipsis-v"></i>
            </button>
          </div>

          <div class="space-y-3 mb-6">
            <div class="flex items-center gap-3 text-sm text-muted-foreground">
              <i class="fas fa-phone text-muted-foreground/50 w-5"></i>
              <span>{{ client.phone || "Non renseigné" }}</span>
            </div>
            <div class="flex items-center gap-3 text-sm text-muted-foreground">
              <i class="fas fa-envelope text-muted-foreground/50 w-5"></i>
              <span>{{ client.email }}</span>
            </div>
            <div class="flex items-center gap-3 text-sm text-muted-foreground">
              <i class="fas fa-map-marker-alt text-muted-foreground/50 w-5"></i>
              <span>{{ client.location }}</span>
            </div>
          </div>

          <div
            class="flex items-center justify-between pt-4 border-t border-border"
          >
            <span
              :class="[
                'px-3 py-1 rounded-full text-xs font-medium',
                client.status === 'Actif'
                  ? 'bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400'
                  : 'bg-muted/20 text-muted-foreground',
              ]"
            >
              {{ client.status }}
            </span>
            <button
              class="text-secondary text-sm font-medium hover:underline"
            >
              Voir le dossier
            </button>
          </div>
        </div>

        <!-- Add New Card (Empty State) -->
        <div
          class="border-2 border-dashed border-border rounded-2xl p-6 flex flex-col items-center justify-center text-muted-foreground hover:border-secondary hover:text-secondary hover:bg-secondary/5 transition-colors cursor-pointer min-h-[250px]"
        >
          <div
            class="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center mb-4 group-hover:bg-background transition-colors"
          >
            <i class="fas fa-plus text-2xl"></i>
          </div>
          <p class="font-medium">Ajouter un nouveau client</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
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