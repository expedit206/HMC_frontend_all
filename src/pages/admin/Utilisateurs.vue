<template>
  <div class="dashboard-page-content">
    <div
      v-if="isLoading"
      class="flex flex-col items-center justify-center h-full min-h-[60vh]"
    >
      <div
        class="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"
      ></div>
      <p class="text-muted-foreground font-bold uppercase tracking-widest text-xs">
        Chargement de la base de données...
      </p>
    </div>

    <div v-else class="max-w-7xl mx-auto">
      <!-- Filters & Search -->
      <div class="flex flex-col md:flex-row justify-between gap-4 mb-8">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="filter in filters"
            :key="filter.value"
            @click="changeFilter(filter.value)"
            :class="[
              'px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all',
              currentFilter === filter.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-card text-muted-foreground border border-border hover:border-border/80',
            ]"
          >
            {{ filter.label }}
          </button>
        </div>
        <div class="relative">
          <i
            class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          ></i>
          <input
            v-model="searchQuery"
            @input="debounceSearch"
            type="text"
            placeholder="Rechercher par nom, email..."
            class="pl-12 pr-6 py-3 bg-card border border-border rounded-xl text-sm w-full md:w-80 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/10 focus:outline-none transition-all"
          />
        </div>
      </div>

      <!-- Users Table -->
      <div
        class="bg-card rounded-3xl border border-border shadow-sm overflow-hidden min-h-[400px]"
      >
        <table class="w-full text-left">
          <thead
            class="bg-muted/20 text-[10px] font-black uppercase text-muted-foreground border-b border-border"
          >
            <tr>
              <th class="px-6 py-5 tracking-widest">Utilisateur</th>
              <th class="px-6 py-5 tracking-widest">Rôle principal</th>
              <th class="px-6 py-5 tracking-widest text-center">Statut</th>
              <th class="px-6 py-5 tracking-widest">Inscrit le</th>
              <th class="px-6 py-5 tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border">
            <tr
              v-for="user in users"
              :key="user.id"
              class="hover:bg-muted/5 transition-all group"
            >
              <td class="px-6 py-5">
                <div class="flex items-center gap-4">
                  <div
                    class="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-black text-xs shadow-md"
                  >
                    {{ user.name.charAt(0).toUpperCase() }}
                  </div>
                  <div class="flex flex-col">
                    <span class="text-sm font-black text-foreground">{{
                      user.name
                    }}</span>
                    <span
                      class="text-[10px] text-muted-foreground font-bold tracking-tight"
                      >{{ user.email }}</span
                    >
                  </div>
                </div>
              </td>
              <td class="px-6 py-5">
                <span
                  :class="[
                    'px-2 py-0.5 text-[8px] font-black uppercase rounded-md',
                    user.role === 'admin'
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                      : user.role === 'bailleur'
                        ? 'bg-orange-100 dark:bg-orange-900/30 text-secondary'
                        : user.role === 'agent'
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                          : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
                  ]"
                >
                  {{ user.role }}
                </span>
              </td>
              <td class="px-6 py-5">
                <div class="flex items-center justify-center gap-2">
                  <select
                    @change="updateStatus(user, $event.target.value)"
                    :class="[
                      'text-[10px] font-bold border-none bg-transparent focus:ring-0 cursor-pointer outline-none',
                      user.status === 'inactive'
                        ? 'text-destructive'
                        : user.status === 'active'
                          ? 'text-green-500'
                          : 'text-orange-500',
                    ]"
                  >
                    <option value="active" :selected="user.status === 'active'" class="bg-card">
                      Actif
                    </option>
                    <option
                      value="inactive"
                      :selected="user.status === 'inactive'"
                      class="bg-card"
                    >
                      Inactif
                    </option>
                    <option
                      value="pending"
                      :selected="user.status === 'pending'"
                      class="bg-card"
                    >
                      En attente
                    </option>
                  </select>
                </div>
              </td>
              <td class="px-6 py-5 text-xs text-muted-foreground font-medium">
                {{ formatDate(user.created_at) }}
              </td>
              <td class="px-6 py-5 text-right">
                <div
                  class="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <button
                    class="w-9 h-9 rounded-xl bg-muted/20 text-muted-foreground hover:text-secondary hover:bg-card border border-transparent hover:border-border transition-all"
                  >
                    <i class="fas fa-eye text-xs"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div
          v-if="users.length === 0"
          class="p-20 text-center flex flex-col items-center gap-4"
        >
          <div
            class="w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center text-muted-foreground/30 text-3xl"
          >
            <i class="fas fa-user-slash"></i>
          </div>
          <p class="text-muted-foreground font-bold uppercase tracking-widest text-sm">
            Aucun utilisateur trouvé
          </p>
        </div>
      </div>

      <!-- Pagination simple -->
      <div
        class="mt-8 flex justify-between items-center bg-card p-4 rounded-2xl border border-border"
      >
        <span class="text-xs text-muted-foreground font-bold"
          >Total: {{ totalUsers }} utilisateurs</span
        >
        <div class="flex gap-2">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            :class="[
              'w-8 h-8 rounded-lg flex items-center justify-center transition-all',
              currentPage === 1
                ? 'text-muted-foreground/30'
                : 'hover:bg-secondary/10 text-secondary',
            ]"
          >
            <i class="fas fa-chevron-left text-xs"></i>
          </button>
          <span
            class="w-8 h-8 flex items-center justify-center text-xs font-black text-foreground"
          >
            {{ currentPage }}
          </span>
          <button
            @click="nextPage"
            :disabled="currentPage >= lastPage"
            :class="[
              'w-8 h-8 rounded-lg flex items-center justify-center transition-all',
              currentPage >= lastPage
                ? 'text-muted-foreground/30'
                : 'hover:bg-secondary/10 text-secondary',
            ]"
          >
            <i class="fas fa-chevron-right text-xs"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "../../axios";
const isLoading = ref(true);
const users = ref([]);
const totalUsers = ref(0);
const currentPage = ref(1);
const lastPage = ref(1);
const searchQuery = ref("");
const currentFilter = ref("all");
let searchTimeout = null;

const filters = [
  { label: "Tous", value: "all" },
  { label: "Bailleurs", value: "bailleur" },
  { label: "Locataires", value: "locataire" },
  { label: "Prestataires", value: "prestataire" },
  { label: "Agents", value: "agent" },
  { label: "Admins", value: "admin" },
];

const fetchUsers = async () => {
  isLoading.value = true;
  try {
    const params = {
      page: currentPage.value,
      search: searchQuery.value,
    };
    if (currentFilter.value !== "all") {
      params.role = currentFilter.value;
    }

    const { data } = await axios.get("/api/admin/users", { params });
    if (data.success) {
      users.value = data.data.data;
      totalUsers.value = data.data.total;
      lastPage.value = data.data.last_page;
    }
  } catch (err) {
    console.error("Erreur chargement utilisateurs:", err);
  } finally {
    isLoading.value = false;
  }
};

const debounceSearch = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    currentPage.value = 1;
    fetchUsers();
  }, 500);
};

const changeFilter = (val) => {
  currentFilter.value = val;
  currentPage.value = 1;
  fetchUsers();
};

const updateStatus = async (user, status) => {
  try {
    const { data } = await axios.put(`/api/admin/users/${user.id}`, { status });
    if (data.success) {
      user.status = status;
    }
  } catch (err) {
    console.error("Erreur mise à jour statut:", err);
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchUsers();
  }
};

const nextPage = () => {
  if (currentPage.value < lastPage.value) {
    currentPage.value++;
    fetchUsers();
  }
};

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

onMounted(fetchUsers);
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: hsl(var(--muted-foreground) / 0.3);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--muted-foreground) / 0.5);
}
</style>