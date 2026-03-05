<template>
  <aside
    id="sidebar"
    :class="[
      'fixed inset-y-0 left-0 z-40 bg-white border-r border-gray-100 transition-all duration-300 lg:static lg:h-auto',
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      expanded ? 'w-64' : 'w-20 hidden lg:block',
    ]"
  >
    <div
      class="h-full flex flex-col py-8 px-4 overflow-y-auto custom-scrollbar"
    >
      <!-- Toggle Button (Desktop) -->
      <button
        @click="$emit('toggle-expand')"
        class="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 hover:bg-orange-50 text-gray-400 hover:text-[#E54801] transition mb-6 ml-auto"
      >
        <i :class="`fas fa-chevron-${expanded ? 'left' : 'right'} text-xs`"></i>
      </button>

      <!-- Navigation Links -->
      <div class="space-y-2">
        <RouterLink
          :to="{ name: 'PrestataireDashboard' }"
          class="sidebar-link flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-medium text-gray-400 hover:bg-gray-50 hover:text-[#E54801] transition-all group"
          active-class="bg-[#E54801] text-white shadow-md hover:bg-[#E54801] hover:text-white"
        >
          <i
            class="fas fa-th-large w-5 text-center group-hover:scale-110 transition-transform"
          ></i>
          <span v-if="expanded">Tableau de bord</span>
        </RouterLink>

        <RouterLink
          :to="{ name: 'PrestataireInterventions' }"
          class="sidebar-link flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-medium text-gray-400 hover:bg-gray-50 hover:text-[#E54801] transition-all group"
          active-class="bg-[#E54801] text-white shadow-md hover:bg-[#E54801] hover:text-white"
        >
          <i
            class="fas fa-tools w-5 text-center group-hover:scale-110 transition-transform"
          ></i>
          <span v-if="expanded">Mes Interventions</span>
        </RouterLink>

        <RouterLink
          :to="{ name: 'PrestataireServices' }"
          class="sidebar-link flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-medium text-gray-400 hover:bg-gray-50 hover:text-[#E54801] transition-all group"
          active-class="bg-[#E54801] text-white shadow-md hover:bg-[#E54801] hover:text-white"
        >
          <i
            class="fas fa-concierge-bell w-5 text-center group-hover:scale-110 transition-transform"
          ></i>
          <span v-if="expanded">Mes Services</span>
        </RouterLink>

        <RouterLink
          :to="{ name: 'PrestataireAgenda' }"
          class="sidebar-link flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-medium text-gray-400 hover:bg-gray-50 hover:text-[#E54801] transition-all group"
          active-class="bg-[#E54801] text-white shadow-md hover:bg-[#E54801] hover:text-white"
        >
          <i
            class="fas fa-calendar-alt w-5 text-center group-hover:scale-110 transition-transform"
          ></i>
          <span v-if="expanded">Mon Agenda</span>
        </RouterLink>

        <RouterLink
          :to="{ name: 'PrestataireFinances' }"
          class="sidebar-link flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-medium text-gray-400 hover:bg-gray-50 hover:text-[#E54801] transition-all group"
          active-class="bg-[#E54801] text-white shadow-md hover:bg-[#E54801] hover:text-white"
        >
          <i
            class="fas fa-wallet w-5 text-center group-hover:scale-110 transition-transform"
          ></i>
          <span v-if="expanded">Revenus</span>
        </RouterLink>
      </div>

      <!-- Settings Section -->
      <div
        v-if="expanded"
        class="mt-10 pt-10 border-t border-gray-50 animate-fadeIn"
      >
        <p
          class="px-4 text-[10px] font-black text-gray-300 uppercase tracking-widest mb-4"
        >
          Paramètres Pro
        </p>
        <div class="space-y-1">
          <RouterLink
            :to="{ name: 'PrestataireDashboard' }"
            class="sidebar-link flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-medium text-gray-400 hover:bg-gray-50 hover:text-[#E54801] transition-all group"
            active-class="bg-[#E54801] text-white shadow-md hover:bg-[#E54801] hover:text-white"
          >
            <i
              class="fas fa-id-card w-5 text-center group-hover:scale-110 transition-transform"
            ></i>
            <span>Ma Fiche Pro</span>
          </RouterLink>
          <RouterLink
            :to="{ name: 'PrestataireAssistance' }"
            class="sidebar-link flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-medium text-gray-400 hover:bg-gray-50 hover:text-[#E54801] transition-all group"
            active-class="bg-[#E54801] text-white shadow-md hover:bg-[#E54801] hover:text-white"
          >
            <i
              class="fas fa-question-circle w-5 text-center group-hover:scale-110 transition-transform"
            ></i>
            <span>Assistance</span>
          </RouterLink>
        </div>
      </div>

      <!-- Logout -->
      <div class="mt-auto pt-8">
        <button
          @click="logout"
          class="w-full text-xs font-black text-red-400 hover:bg-red-50 py-4 rounded-2xl transition-all uppercase tracking-widest flex items-center justify-center gap-4 group"
        >
          <i
            class="fas fa-sign-out-alt w-5 text-center group-hover:translate-x-1 transition-transform"
          ></i>
          <span v-if="expanded">Déconnexion</span>
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

const emit = defineEmits(["toggle-expand"]);
const router = useRouter();

const logout = () => {
  // Add logout logic here (e.g., clear tokens)
  router.push({ name: "Connexion" });
};
</script>

<style scoped>
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
.animate-fadeIn {
  animation: fadeIn 0.3s ease-out forwards;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
