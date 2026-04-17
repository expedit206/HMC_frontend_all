<template>
  <aside class="w-72 bg-card border-r border-border h-[calc(100vh-80px)] sticky top-[80px] overflow-y-auto custom-scrollbar flex flex-col py-4 hidden md:flex">
    
    <!-- Profil rapide -->
    <div class="px-4 mb-6">
      <RouterLink to="/parametres" class="flex items-center gap-3 p-2 rounded-xl hover:bg-muted transition-colors group">
        <div class="w-12 h-12 rounded-full border border-border bg-muted overflow-hidden flex-shrink-0">
          <img v-if="userAvatar" :src="userAvatar" alt="Avatar" class="w-full h-full object-cover">
          <div v-else class="w-full h-full flex items-center justify-center bg-primary text-white font-bold text-sm">
            {{ userInitials }}
          </div>
        </div>
        <div class="flex-1 min-w-0">
          <h3 class="font-bold text-sm text-foreground truncate group-hover:text-primary transition-colors">{{ userName }}</h3>
          <p class="text-xs text-muted-foreground capitalize">{{ activeRoleDisplay }}</p>
        </div>
      </RouterLink>
    </div>

    <!-- Navigation Principale -->
    <nav class="flex-1 px-3 space-y-1">
      <RouterLink to="/feed" class="flex items-center gap-3 px-3 py-2.5 rounded-lg font-semibold transition-colors nav-link" exact-active-class="active">
        <div class="w-8 flex justify-center"><i class="fas fa-home text-lg"></i></div>
        <span>Fil d'actualité</span>
      </RouterLink>
      
      <RouterLink :to="dashboardLink" class="flex items-center gap-3 px-3 py-2.5 rounded-lg font-semibold transition-colors nav-link" active-class="active">
        <div class="w-8 flex justify-center"><i class="fas fa-chart-pie text-lg"></i></div>
        <span>Mon Tableau de bord</span>
      </RouterLink>

      <RouterLink to="/annonces" class="flex items-center gap-3 px-3 py-2.5 rounded-lg font-semibold transition-colors nav-link" active-class="active">
        <div class="w-8 flex justify-center"><i class="fas fa-search-location text-lg"></i></div>
        <span>Rechercher un bien</span>
      </RouterLink>

      <RouterLink to="/marketplace" class="flex items-center gap-3 px-3 py-2.5 rounded-lg font-semibold transition-colors nav-link" active-class="active">
        <div class="w-8 flex justify-center"><i class="fas fa-store text-lg"></i></div>
        <span>Marketplace</span>
      </RouterLink>

      <!-- Raccourcis Locataire -->
      <template v-if="['locataire', 'client'].includes(activeRole)">
        <RouterLink to="/mon-suivi" class="flex items-center gap-3 px-3 py-2.5 rounded-lg font-semibold transition-colors nav-link mt-2" active-class="active">
          <div class="w-8 flex justify-center"><i class="fas fa-clipboard-list text-lg"></i></div>
          <span>Mon Suivi Dossier</span>
        </RouterLink>
        <RouterLink to="/mes-favoris" class="flex items-center gap-3 px-3 py-2.5 rounded-lg font-semibold transition-colors nav-link" active-class="active">
          <div class="w-8 flex justify-center"><i class="fas fa-heart text-lg text-secondary"></i></div>
          <span>Mes favoris</span>
        </RouterLink>
      </template>

      <!-- Raccourcis Bailleur -->
      <template v-if="activeRole === 'bailleur'">
        <RouterLink to="/bailleur/mes-biens" class="flex items-center gap-3 px-3 py-2.5 rounded-lg font-semibold transition-colors nav-link mt-2" active-class="active">
          <div class="w-8 flex justify-center"><i class="fas fa-building text-lg"></i></div>
          <span>Mes Biens</span>
        </RouterLink>
        <RouterLink to="/publier-bien" class="flex items-center gap-3 px-3 py-2.5 rounded-lg font-semibold transition-colors nav-link" active-class="active">
          <div class="w-8 flex justify-center"><i class="fas fa-plus-circle text-lg"></i></div>
          <span>Publier un bien</span>
        </RouterLink>
      </template>

      <!-- Raccourcis Prestataire -->
      <template v-if="activeRole === 'prestataire'">
        <RouterLink to="/marketplace/demandes" class="flex items-center gap-3 px-3 py-2.5 rounded-lg font-semibold transition-colors nav-link mt-2" active-class="active">
          <div class="w-8 flex justify-center"><i class="fas fa-clipboard-check text-lg"></i></div>
          <span>Offres de mission</span>
        </RouterLink>
      </template>
    </nav>

    <!-- Raccourcis bas -->
    <div class="mt-auto px-3 border-t border-border pt-4 pb-2">
      <RouterLink to="/messages" class="flex items-center gap-3 px-3 py-2.5 rounded-lg font-semibold transition-colors nav-link" active-class="active">
        <div class="w-8 flex justify-center relative">
          <i class="fas fa-envelope text-lg"></i>
          <span class="absolute -top-1 -right-1 w-2.5 h-2.5 bg-secondary rounded-full border border-card"></span>
        </div>
        <span>Messages</span>
      </RouterLink>
      <RouterLink to="/parametres" class="flex items-center gap-3 px-3 py-2.5 rounded-lg font-semibold transition-colors nav-link" active-class="active">
        <div class="w-8 flex justify-center"><i class="fas fa-cog text-lg"></i></div>
        <span>Paramètres</span>
      </RouterLink>
      <button @click="logout" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-semibold transition-colors text-red-500 hover:bg-red-500/10">
        <div class="w-8 flex justify-center"><i class="fas fa-sign-out-alt text-lg"></i></div>
        <span>Déconnexion</span>
      </button>
    </div>

  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const userName = computed(() => authStore.user?.name || '')
const userInitials = computed(() => {
  const name = authStore.user?.name || '?'
  return name.substring(0, 2).toUpperCase()
})
const userAvatar = computed(() => {
  const img = authStore.user?.avatar
  if (!img) return null
  if (img.startsWith('http')) return img
  return `${import.meta.env.VITE_API_BASE_URL?.replace('/api', '') ?? ''}/storage/${img}`
})

const activeRole = computed(() => authStore.userActiveRole)

const activeRoleDisplay = computed(() => {
  if (activeRole.value === 'bailleur') return 'Propriétaire'
  if (activeRole.value === 'client') return 'Prospect'
  return activeRole.value
})

const dashboardLink = computed(() => {
  if (activeRole.value === 'admin') return '/admin/dashboard'
  if (activeRole.value === 'agent') return '/agent/dashboard'
  return `/${activeRole.value}/dashboard`
})

async function logout() {
  await authStore.logout()
  router.push('/')
}
</script>

<style scoped>
.nav-link {
  color: hsl(var(--muted-foreground));
}
.nav-link:hover {
  background-color: hsl(var(--muted));
  color: hsl(var(--foreground));
}
.nav-link.active {
  background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%);
  color: white;
}
.nav-link.active i {
  color: white;
}
</style>
