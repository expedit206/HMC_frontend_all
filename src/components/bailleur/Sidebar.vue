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
      class="h-full flex flex-col py-6 px-4 overflow-y-auto custom-scrollbar"
    >
      <!-- Toggle Sidebar (Desktop) -->
      <button
        @click="$emit('toggle-expand')"
        class="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 hover:bg-orange-50 text-gray-400 hover:text-[#E54801] transition mb-6 ml-auto"
      >
        <i :class="`fas fa-chevron-${expanded ? 'left' : 'right'} text-xs`"></i>
      </button>

      <!-- Navigation Links -->
      <div class="space-y-2">
        <RouterLink
          :to="{ name: 'BailleurDashboard' }"
          class="sidebar-link flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-medium text-gray-400 hover:bg-gray-50 hover:text-[#E54801] transition-all group"
          active-class="bg-[#E54801] text-white shadow-md hover:bg-[#E54801] hover:text-white"
        >
          <i
            class="fas fa-chart-pie w-5 text-center group-hover:scale-110 transition-transform"
          ></i>
          <span v-if="expanded">Tableau de bord</span>
        </RouterLink>

        <RouterLink
          :to="{ name: 'BailleurMesBiens' }"
          class="sidebar-link flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-medium text-gray-400 hover:bg-gray-50 hover:text-[#E54801] transition-all group"
          active-class="bg-[#E54801] text-white shadow-md hover:bg-[#E54801] hover:text-white"
        >
          <i
            class="fas fa-building w-5 text-center group-hover:scale-110 transition-transform"
          ></i>
          <span v-if="expanded">Mes Biens</span>
        </RouterLink>

        <RouterLink
          :to="{ name: 'PublicationRequests' }"
          class="sidebar-link flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-medium text-gray-400 hover:bg-gray-50 hover:text-[#E54801] transition-all group"
          active-class="bg-[#E54801] text-white shadow-md hover:bg-[#E54801] hover:text-white"
        >
          <i
            class="fas fa-file-invoice w-5 text-center group-hover:scale-110 transition-transform"
          ></i>
          <span v-if="expanded">Mes Demandes</span>
        </RouterLink>

        <RouterLink
          :to="{ name: 'BailleurVisites' }"
          class="sidebar-link flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-medium text-gray-400 hover:bg-gray-50 hover:text-[#E54801] transition-all group"
          active-class="bg-[#E54801] text-white shadow-md hover:bg-[#E54801] hover:text-white"
        >
          <i
            class="fas fa-calendar-alt w-5 text-center group-hover:scale-110 transition-transform"
          ></i>
          <span v-if="expanded">Gérer les Visites</span>
        </RouterLink>

        <RouterLink
          :to="{ name: 'BailleurMesLocataires' }"
          class="sidebar-link flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-medium text-gray-400 hover:bg-gray-50 hover:text-[#E54801] transition-all group"
          active-class="bg-[#E54801] text-white shadow-md hover:bg-[#E54801] hover:text-white"
        >
          <i
            class="fas fa-users w-5 text-center group-hover:scale-110 transition-transform"
          ></i>
          <span v-if="expanded">Locataires</span>
        </RouterLink>

        <RouterLink
          :to="{ name: 'BailleurFinances' }"
          class="sidebar-link flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-medium text-gray-400 hover:bg-gray-50 hover:text-[#E54801] transition-all group"
          active-class="bg-[#E54801] text-white shadow-md hover:bg-[#E54801] hover:text-white"
        >
          <i
            class="fas fa-wallet w-5 text-center group-hover:scale-110 transition-transform"
          ></i>
          <span v-if="expanded">Finances</span>
        </RouterLink>

        <RouterLink
          :to="{ name: 'BailleurInterventions' }"
          class="sidebar-link flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-medium text-gray-400 hover:bg-gray-50 hover:text-[#E54801] transition-all group"
          active-class="bg-[#E54801] text-white shadow-md hover:bg-[#E54801] hover:text-white"
        >
          <i
            class="fas fa-tools w-5 text-center group-hover:scale-110 transition-transform"
          ></i>
          <span v-if="expanded">Interventions</span>
        </RouterLink>

        <RouterLink
          :to="{ name: 'BailleurAssistance' }"
          class="sidebar-link flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-medium text-gray-400 hover:bg-gray-50 hover:text-[#E54801] transition-all group"
          active-class="bg-[#E54801] text-white shadow-md hover:bg-[#E54801] hover:text-white"
        >
          <i
            class="fas fa-handshake-angle w-5 text-center group-hover:scale-110 transition-transform"
          ></i>
          <span v-if="expanded">Assistance</span>
        </RouterLink>
      </div>

      <!-- Settings Group -->
      <div
        v-if="expanded"
        class="mt-8 pt-8 border-t border-gray-100 sidebar-text-group"
      >
        <p
          class="px-4 text-[10px] font-black text-gray-300 uppercase tracking-widest mb-4"
        >
          Paramètres
        </p>
        <div class="space-y-1">
          <RouterLink
            :to="{ name: 'Parametres' }"
            :class="[
              'sidebar-link flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-medium text-gray-400 hover:bg-gray-50 hover:text-[#E54801] transition-all group',
            ]"
            active-class="bg-[#E54801] text-white shadow-md hover:bg-[#E54801] hover:text-white"
          >
            <i
              class="fas fa-user-circle w-5 text-center group-hover:scale-110 transition-transform"
            ></i>
            <span>Mon Profil</span>
          </RouterLink>
          <RouterLink
            :to="{ name: 'BailleurDevenirPrestataire' }"
            class="sidebar-link flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-medium text-gray-400 hover:bg-gray-50 hover:text-[#E54801] transition-all group"
            active-class="bg-[#E54801] text-white shadow-md hover:bg-[#E54801] hover:text-white"
          >
            <i
              class="fas fa-user-plus w-5 text-center group-hover:scale-110 transition-transform"
            ></i>
            <span>Profil Pro</span>
          </RouterLink>
        </div>
      </div>

      <!-- Logout -->
      <div class="mt-auto pt-8">
        <button
          @click="$router.push({ name: 'Connexion' })"
          class="w-full text-xs font-black text-red-500 hover:bg-red-50 py-4 rounded-2xl transition-all uppercase tracking-widest flex items-center justify-center gap-4 group"
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
defineProps({
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
</style>
