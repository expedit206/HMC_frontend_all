<template>
  <aside
    id="sidebar"
    :class="[
      'fixed inset-y-0 left-0 z-40 bg-white border-r border-gray-100 transition-all duration-300 lg:static lg:h-auto',
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      expanded ? 'w-64' : 'w-20',
    ]"
  >
    <div
      class="h-full flex flex-col py-8 px-4 overflow-y-auto custom-scrollbar"
    >
      <!-- Sidebar Header -->
      <div class="mb-8 px-2 flex items-center gap-3">
        <div
          class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E54801] to-[#913327] flex items-center justify-center shadow-lg cursor-pointer"
          @click="$emit('toggle-expand')"
        >
          <i class="fas fa-user-tie text-white"></i>
        </div>
        <div v-if="expanded" class="transition-opacity duration-300">
          <h2 class="font-bold text-[#1B0B38]">Espace Agent</h2>
          <p class="text-xs text-gray-400">Tableau de bord</p>
        </div>
      </div>

      <div class="space-y-2">
        <RouterLink
          :to="{ name: 'AgentDashboard' }"
          class="sidebar-link flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-medium text-gray-400 hover:bg-gray-50 hover:text-[#E54801] transition-all group"
          active-class="active"
        >
          <i
            class="fas fa-th-large w-5 text-center group-hover:scale-110 transition-transform"
          ></i>
          <span v-if="expanded">Vue d'ensemble</span>
        </RouterLink>
        <RouterLink
          :to="{ name: 'AgentMissions' }"
          class="sidebar-link flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-medium text-gray-400 hover:bg-gray-50 hover:text-[#E54801] transition-all group"
          active-class="active"
        >
          <i
            class="fas fa-tasks w-5 text-center group-hover:scale-110 transition-transform"
          ></i>
          <span v-if="expanded">Missions</span>
          <span
            v-if="expanded"
            class="ml-auto bg-[#E54801] text-white text-[10px] font-bold px-2 py-0.5 rounded-full"
            >4</span
          >
        </RouterLink>
        <RouterLink
          :to="{ name: 'AgentAgenda' }"
          class="sidebar-link flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-medium text-gray-400 hover:bg-gray-50 hover:text-[#E54801] transition-all group"
          active-class="active"
        >
          <i
            class="fas fa-calendar-alt w-5 text-center group-hover:scale-110 transition-transform"
          ></i>
          <span v-if="expanded">Agenda</span>
        </RouterLink>
        <!-- Using hash links or placeholders for non-existent pages -->
        <RouterLink
          :to="{ name: 'AgentFormation' }"
          class="sidebar-link flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-medium text-gray-400 hover:bg-gray-50 hover:text-[#E54801] transition-all group"
          active-class="active"
        >
          <i
            class="fas fa-graduation-cap w-5 text-center group-hover:scale-110 transition-transform"
          ></i>
          <span v-if="expanded">Formation</span>
        </RouterLink>
        <RouterLink
          :to="{ name: 'AgentAssistance' }"
          class="sidebar-link flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-medium text-gray-400 hover:bg-gray-50 hover:text-[#E54801] transition-all group"
          active-class="active"
        >
          <i
            class="fas fa-headset w-5 text-center group-hover:scale-110 transition-transform"
          ></i>
          <span v-if="expanded">Assistance</span>
        </RouterLink>
      </div>

      <div
        v-if="expanded"
        class="mt-8 pt-6 border-t border-gray-100 transition-opacity duration-300"
      >
        <p
          class="px-4 text-[10px] font-black text-gray-300 uppercase tracking-widest mb-4"
        >
          Outils
        </p>
        <div class="space-y-1">
          <RouterLink
            :to="{ name: 'AgentStatistiques' }"
            class="sidebar-link flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-medium text-gray-400 hover:bg-gray-50 hover:text-[#E54801] transition-all group"
            active-class="active"
          >
            <i
              class="fas fa-chart-line w-5 text-center group-hover:scale-110 transition-transform"
            ></i>
            <span>Statistiques</span>
          </RouterLink>
          <RouterLink
            :to="{ name: 'AgentParametres' }"
            class="sidebar-link flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-medium text-gray-400 hover:bg-gray-50 hover:text-[#E54801] transition-all group"
            active-class="active"
          >
            <i
              class="fas fa-cog w-5 text-center group-hover:scale-110 transition-transform"
            ></i>
            <span>Paramètres</span>
          </RouterLink>
        </div>
      </div>

      <div class="mt-auto pt-8">
        <button
          @click="logout"
          class="w-full text-xs font-black text-red-500 hover:bg-red-50 py-4 rounded-2xl transition-all uppercase tracking-widest flex items-center justify-center gap-4 group"
        >
          <i
            class="fas fa-sign-out-alt w-5 text-center group-hover:translate-x-1 transition-transform"
          ></i>
          <span v-if="expanded">Se déconnecter</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { RouterLink, useRouter } from "vue-router";

const props = defineProps({
  expanded: {
    type: Boolean,
    default: true,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["toggle-expand"]);

const router = useRouter();

const logout = () => {
  // Implement logout logic here or emit event
  router.push({ name: 'Connexion' });
};
</script>

<style scoped>
.sidebar-link.active {
  background-color: #e54801;
  background-image: linear-gradient(to right, #e54801, #913327);
  color: white;
  box-shadow: 0 4px 12px rgba(229, 72, 1, 0.2);
}
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e54801;
  border-radius: 10px;
}
</style>
