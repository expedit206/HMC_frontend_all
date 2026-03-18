<template>
  <aside
    :class="[
      'fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-100 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static',
      isOpen ? 'translate-x-0' : '-translate-x-full',
    ]"
  >
    <div
      class="p-6 pb-4 flex items-center justify-start border-b border-gray-100"
    >
      <div class="flex items-center gap-3 group cursor-pointer">
        <div
          class="w-10 h-10 rounded-xl bg-[#913327] flex items-center justify-center"
        >
          <i class="fas fa-shield-alt text-white text-lg"></i>
        </div>
        <div class="flex flex-col">
          <span class="text-lg font-black text-[#913327] tracking-tight"
            >HMC Admin</span
          >
          <span
            class="text-[10px] text-gray-400 font-medium uppercase tracking-widest"
            >Dashboard v3.0</span
          >
        </div>
      </div>
    </div>

    <nav class="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
      <p
        class="px-3 mb-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest"
      >
        Navigation
      </p>

      <RouterLink
        :to="{ name: 'AdminDashboard' }"
        class="sidebar-link flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group hover:bg-gray-50 text-gray-600 hover:text-[#E54801]"
        active-class="active"
      >
        <i class="fas fa-th-large w-5 text-center"></i>
        <span class="font-semibold">Vue d'ensemble</span>
      </RouterLink>

      <RouterLink
        :to="{ name: 'AdminUtilisateurs' }"
        class="sidebar-link flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group hover:bg-gray-50 text-gray-600 hover:text-[#E54801]"
        active-class="active"
      >
        <i class="fas fa-users w-5 text-center"></i>
        <span class="font-semibold">Utilisateurs</span>
      </RouterLink>

      <RouterLink
        :to="{ name: 'AdminBiensAnnonces' }"
        class="sidebar-link flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group hover:bg-gray-50 text-gray-600 hover:text-[#E54801]"
        active-class="active"
      >
        <i class="fas fa-home w-5 text-center"></i>
        <span class="font-semibold">Immobilier</span>
      </RouterLink>

      <RouterLink
        :to="{ name: 'AdminDemandesPublication' }"
        class="sidebar-link flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group hover:bg-gray-50 text-gray-600 hover:text-[#E54801]"
        active-class="active"
      >
        <i class="fas fa-tasks w-5 text-center"></i>
        <span class="font-semibold">Missions Audit</span>
      </RouterLink>

      <RouterLink
        :to="{ name: 'AdminServices' }"
        class="sidebar-link flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group hover:bg-gray-50 text-gray-600 hover:text-[#E54801]"
        active-class="active"
      >
        <i class="fas fa-tools w-5 text-center"></i>
        <span class="font-semibold">Services</span>
      </RouterLink>

      <RouterLink
        :to="{ name: 'AdminFinances' }"
        class="sidebar-link flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group hover:bg-gray-50 text-gray-600 hover:text-[#E54801]"
        active-class="active"
      >
        <i class="fas fa-chart-line w-5 text-center"></i>
        <span class="font-semibold">Finance</span>
      </RouterLink>

      <p
        class="px-3 mt-8 mb-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest"
      >
        Système
      </p>

      <RouterLink
        :to="{ name: 'Parametres' }"
        class="flex items-center gap-3 text-sm px-6 py-3.5 mb-2 hover:bg-gray-100 hover:text-black border-l-[3px] border-transparent transition-all group hover:bg-gray-50 text-gray-600 hover:text-[#E54801]"
        active-class="active"
      >
        <i class="fas fa-cog w-5 text-center"></i>
        <span class="font-semibold">Configuration</span>
      </RouterLink>
    </nav>

    <div class="p-6 border-t border-gray-100">
      <div v-if="adminUser" class="flex items-center gap-3 mb-4">
        <div
          class="w-10 h-10 rounded-full bg-gradient-to-br from-[#E54801] to-[#913327] flex items-center justify-center font-bold text-white text-sm"
        >
          {{ adminUser.name.charAt(0).toUpperCase() }}
        </div>
        <div class="truncate">
          <p class="text-sm font-bold text-[#913327] truncate">
            {{ adminUser.name }}
          </p>
          <span class="text-[10px] text-green-500 font-medium"
            >● Super Admin</span
          >
        </div>
      </div>
      <button
        @click="logout"
        class="w-full py-3 bg-gray-50 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 group"
      >
        <i class="fas fa-sign-out-alt text-xs"></i>
        <span>Se déconnecter</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, RouterLink } from "vue-router";
import axios from "../../axios";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const router = useRouter();
const adminUser = ref(null);

const fetchUser = async () => {
  try {
    const { data } = await axios.get("/api/user");
    adminUser.value = data;
  } catch (err) {
    console.error("Erreur chargement user:", err);
  }
};

onMounted(fetchUser);

const logout = async () => {
  if (confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
    try {
      await axios.post("/api/logout");
    } catch (err) {}
    localStorage.removeItem("token");
    window.location.href = "/auth/connexion";
  }
};
</script>

<style scoped>
.sidebar-link.active {
  background: linear-gradient(135deg, #e54801 0%, #913327 100%);
  color: white !important;
  box-shadow: 0 4px 12px rgba(229, 72, 1, 0.2);
}
.sidebar-link.active i {
  color: white !important;
}
.sidebar-link.active .ml-auto {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
}
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e54801;
  border-radius: 10px;
}
</style>
