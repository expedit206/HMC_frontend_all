<template>
  <DashboardLayout title="Gestion des Utilisateurs">
    <div
      v-if="isLoading"
      class="flex flex-col items-center justify-center h-full min-h-[60vh]"
    >
      <div
        class="w-16 h-16 border-4 border-[#E54801] border-t-transparent rounded-full animate-spin mb-4"
      ></div>
      <p class="text-gray-500 font-bold uppercase tracking-widest text-xs">
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
                ? 'bg-[#1B0B38] text-white'
                : 'bg-white text-gray-400 border border-gray-100 hover:border-gray-300',
            ]"
          >
            {{ filter.label }}
          </button>
        </div>
        <div class="relative">
          <i
            class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
          ></i>
          <input
            v-model="searchQuery"
            @input="debounceSearch"
            type="text"
            placeholder="Rechercher par nom, email..."
            class="pl-12 pr-6 py-3 bg-white border border-gray-100 rounded-xl text-sm w-full md:w-80 focus:ring-2 focus:ring-[#E54801]/10 focus:outline-none transition-all"
          />
        </div>
      </div>

      <!-- Users Table -->
      <div
        class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden min-h-[400px]"
      >
        <table class="w-full text-left">
          <thead
            class="bg-gray-50/50 text-[10px] font-black uppercase text-gray-400 border-b border-gray-50"
          >
            <tr>
              <th class="px-6 py-5 tracking-widest">Utilisateur</th>
              <th class="px-6 py-5 tracking-widest">Rôle principal</th>
              <th class="px-6 py-5 tracking-widest text-center">Statut</th>
              <th class="px-6 py-5 tracking-widest">Inscrit le</th>
              <th class="px-6 py-5 tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr
              v-for="user in users"
              :key="user.id"
              class="hover:bg-gray-50/50 transition-all group"
            >
              <td class="px-6 py-5">
                <div class="flex items-center gap-4">
                  <div
                    class="w-10 h-10 rounded-full bg-[#1B0B38] text-white flex items-center justify-center font-black text-xs shadow-md"
                  >
                    {{ user.name.charAt(0).toUpperCase() }}
                  </div>
                  <div class="flex flex-col">
                    <span class="text-sm font-black text-[#1B0B38]">{{
                      user.name
                    }}</span>
                    <span
                      class="text-[10px] text-gray-400 font-bold tracking-tight"
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
                      ? 'bg-red-100 text-red-600'
                      : user.role === 'bailleur'
                        ? 'bg-orange-100 text-[#E54801]'
                        : user.role === 'agent'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-blue-100 text-blue-600',
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
                      'text-[10px] font-bold border-none bg-transparent focus:ring-0 cursor-pointer',
                      user.status === 'inactive'
                        ? 'text-red-500'
                        : 'text-green-500',
                    ]"
                  >
                    <option value="active" :selected="user.status === 'active'">
                      Actif
                    </option>
                    <option
                      value="inactive"
                      :selected="user.status === 'inactive'"
                    >
                      Inactif
                    </option>
                    <option
                      value="pending"
                      :selected="user.status === 'pending'"
                    >
                      En attente
                    </option>
                  </select>
                </div>
              </td>
              <td class="px-6 py-5 text-xs text-gray-400 font-medium">
                {{ formatDate(user.created_at) }}
              </td>
              <td class="px-6 py-5 text-right">
                <div
                  class="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <button
                    class="w-9 h-9 rounded-xl bg-gray-50 text-gray-400 hover:text-[#E54801] hover:bg-white border border-transparent hover:border-gray-100 transition-all"
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
            class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 text-3xl"
          >
            <i class="fas fa-user-slash"></i>
          </div>
          <p class="text-gray-400 font-bold uppercase tracking-widest text-sm">
            Aucun utilisateur trouvé
          </p>
        </div>
      </div>

      <!-- Pagination simple -->
      <div
        class="mt-8 flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-100"
      >
        <span class="text-xs text-gray-400 font-bold"
          >Total: {{ totalUsers }} utilisateurs</span
        >
        <div class="flex gap-2">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            :class="[
              'w-8 h-8 rounded-lg flex items-center justify-center transition-all',
              currentPage === 1
                ? 'text-gray-200'
                : 'hover:bg-orange-50 text-[#E54801]',
            ]"
          >
            <i class="fas fa-chevron-left text-xs"></i>
          </button>
          <span
            class="w-8 h-8 flex items-center justify-center text-xs font-black text-[#1B0B38]"
          >
            {{ currentPage }}
          </span>
          <button
            @click="nextPage"
            :disabled="currentPage >= lastPage"
            :class="[
              'w-8 h-8 rounded-lg flex items-center justify-center transition-all',
              currentPage >= lastPage
                ? 'text-gray-200'
                : 'hover:bg-orange-50 text-[#E54801]',
            ]"
          >
            <i class="fas fa-chevron-right text-xs"></i>
          </button>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "../../axios";
import DashboardLayout from "../../layouts/DashboardLayout.vue";

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
  background: #e5e7eb;
  border-radius: 10px;
}
</style>
