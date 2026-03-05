<template>
  <aside
    :class="[
      'z-[60] w-72 bg-white border-r border-gray-50 fixed inset-y-0 left-0 transition-transform lg:translate-x-0 lg:static flex flex-col p-6 h-screen lg:h-auto overflow-y-auto custom-scrollbar',
      isOpen ? 'translate-x-0' : '-translate-x-full',
    ]"
  >
    <div class="flex-1 space-y-8">
      <!-- Main Menu -->
      <div>
        <p
          class="text-[11px] uppercase font-black text-gray-300 px-4 mb-4 tracking-[0.2em]"
        >
          Menu Principal
        </p>
        <div class="space-y-1">
          <RouterLink
            to="/client/dashboard"
            class="sidebar-link flex items-center gap-3 px-4 py-3.5 rounded-2xl transition group text-gray-500 hover:bg-gray-50"
            active-class="active"
          >
            <i class="fas fa-th-large text-lg"></i>
            <span class="font-bold">Vue d'ensemble</span>
          </RouterLink>
          <RouterLink
            to="/client/profil"
            class="sidebar-link flex items-center gap-3 px-4 py-3.5 text-gray-500 hover:bg-gray-50 rounded-2xl transition group"
            active-class="active"
          >
            <i class="fas fa-user-circle text-lg"></i>
            <span class="font-bold">Mon Profil</span>
          </RouterLink>
          <RouterLink
            to="/client/parametres"
            class="sidebar-link flex items-center gap-3 px-4 py-3.5 text-gray-500 hover:bg-gray-50 rounded-2xl transition group"
            active-class="active"
          >
            <i class="fas fa-shield-halved text-lg"></i>
            <span class="font-bold">Sécurité & Privé</span>
          </RouterLink>
          <RouterLink
            to="/client/assistance"
            class="sidebar-link flex items-center gap-3 px-4 py-3.5 text-gray-500 hover:bg-gray-50 rounded-2xl transition group"
            active-class="active"
          >
            <i class="fas fa-handshake-angle text-lg"></i>
            <span class="font-bold">Assistance</span>
          </RouterLink>
        </div>
      </div>

      <!-- Procédures Locatives -->
      <div>
        <p
          class="text-[11px] uppercase font-black text-gray-300 px-4 mb-4 tracking-[0.2em]"
        >
          Location
        </p>
        <div class="space-y-1">
          <RouterLink
            to="/mon-suivi"
            class="sidebar-link flex items-center gap-3 px-4 py-3.5 text-gray-500 hover:bg-gray-50 rounded-2xl transition group"
            active-class="active"
          >
            <i class="fas fa-route text-lg"></i>
            <span class="font-bold flex-1">Mes Procédures</span>
            <!-- Dot animé pour indiquer des procédures actives -->
            <span class="relative flex h-2 w-2">
              <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E54801] opacity-75"
              ></span>
              <span
                class="relative inline-flex rounded-full h-2 w-2 bg-[#E54801]"
              ></span>
            </span>
          </RouterLink>
          <RouterLink
            to="/annonces"
            class="sidebar-link flex items-center gap-3 px-4 py-3.5 text-gray-500 hover:bg-gray-50 rounded-2xl transition group"
            active-class="active"
          >
            <i class="fas fa-search text-lg"></i>
            <span class="font-bold">Parcourir les annonces</span>
          </RouterLink>
        </div>
      </div>

      <!-- Rejoindre la communauté -->
      <div>
        <p
          class="text-[11px] uppercase font-black text-gray-300 px-4 mb-4 tracking-[0.2em]"
        >
          Rejoindre la communauté
        </p>
        <div class="space-y-2">
          <RouterLink
            to="/locataire/inscription"
            class="flex items-center gap-3 px-4 py-3 text-sm font-bold text-blue-600 hover:bg-blue-50 rounded-2xl transition"
          >
            <i class="fas fa-key"></i><span>Devenir Locataire</span>
          </RouterLink>
          <RouterLink
            to="/bailleur/formulaire"
            class="flex items-center gap-3 px-4 py-3 text-sm font-bold text-[#E54801] hover:bg-orange-50 rounded-2xl transition"
          >
            <i class="fas fa-building"></i><span>Devenir Bailleur</span>
          </RouterLink>
          <RouterLink
            to="/prestataire/inscription"
            class="flex items-center gap-3 px-4 py-3 text-sm font-bold text-purple-600 hover:bg-purple-50 rounded-2xl transition"
          >
            <i class="fas fa-tools"></i><span>Devenir Prestataire</span>
          </RouterLink>
          <RouterLink
            to="/agent/inscription"
            class="flex items-center gap-3 px-4 py-3 text-sm font-bold text-green-600 hover:bg-green-50 rounded-2xl transition"
          >
            <i class="fas fa-user-tie"></i><span>Devenir Agent</span>
          </RouterLink>
        </div>
      </div>
    </div>

    <div class="mt-10 pt-6 border-t border-gray-100">
      <button
        @click="logout"
        class="w-full flex items-center gap-3 px-4 py-4 text-red-500 hover:bg-red-50 rounded-2xl transition font-black uppercase text-xs tracking-widest"
      >
        <i class="fas fa-power-off"></i>
        <span>Se déconnecter</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { RouterLink, useRouter } from "vue-router";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const router = useRouter();

const logout = () => {
  // Logic needed to clear auth state if applicable
  router.push("/auth/connexion");
};
</script>

<style scoped>
.sidebar-link.active {
  background-color: #1b0b38;
  color: white;
  box-shadow: 0 4px 15px rgba(27, 11, 56, 0.2);
}
.sidebar-link.active i {
  color: white;
}
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
