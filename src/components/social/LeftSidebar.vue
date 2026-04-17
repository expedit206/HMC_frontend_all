<template>
  <aside class="w-72 bg-card border-r border-border h-[calc(100vh-80px)] sticky top-[80px] overflow-y-auto custom-scrollbar flex flex-col py-4 hidden md:flex">
    
    <!-- Profil rapide & Switcher -->
    <div class="px-3 mb-6 relative">
      <template v-if="authStore.isAuthenticated">
        <div class="flex items-center gap-3 p-2 rounded-xl hover:bg-muted/50 transition-colors group">
          <RouterLink to="/parametres" class="flex items-center gap-3 flex-1 min-w-0">
            <div class="w-12 h-12 rounded-full border border-border bg-muted overflow-hidden flex-shrink-0 shadow-sm group-hover:border-primary transition-colors">
              <img v-if="userAvatar" :src="userAvatar" alt="Avatar" class="w-full h-full object-cover">
              <div v-else class="w-full h-full flex items-center justify-center bg-primary text-white font-bold text-sm">
                {{ userInitials }}
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="font-bold text-sm text-foreground truncate group-hover:text-primary transition-colors">{{ userName }}</h3>
              <p class="text-[10px] text-muted-foreground uppercase tracking-widest font-black truncate">{{ activeRoleDisplay }}</p>
            </div>
          </RouterLink>
          
          <!-- Role Switcher Toggle -->
          <button v-if="allRoles.length > 1" @click="showRoleSwitcher = !showRoleSwitcher"
            class="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all shrink-0"
            :class="{ 'rotate-180 bg-primary/10 text-primary': showRoleSwitcher }"
          >
            <i class="fas fa-chevron-down text-xs"></i>
          </button>
        </div>
      </template>

      <!-- État invité -->
      <template v-else>
        <div class="p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
          <h3 class="text-sm font-bold text-foreground mb-1">Bienvenue !</h3>
          <p class="text-[11px] text-muted-foreground mb-4">Connectez-vous pour accéder à toutes les fonctionnalités.</p>
          <RouterLink to="/auth/connexion" class="w-full py-2 px-4 bg-primary text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
            <i class="fas fa-sign-in-alt"></i>
            Se connecter
          </RouterLink>
        </div>
      </template>

      <!-- Dropdown des rôles -->
      <Transition name="fade-slide">
        <div v-if="showRoleSwitcher" class="absolute top-[calc(100%+4px)] left-3 right-3 bg-card rounded-xl shadow-xl border border-border p-2 z-50 overflow-hidden">
          <p class="text-[9px] font-black text-muted-foreground uppercase tracking-widest pl-2 mb-2">Changer d'espace</p>
          <button v-for="r in allRoles" :key="r" @click="handleSwitchRole(r)"
            class="w-full text-left px-3 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-3"
            :class="r === activeRole ? 'bg-primary text-white shadow-md' : 'text-foreground hover:bg-muted'"
          >
            <div class="w-6 h-6 rounded-md flex items-center justify-center" :class="r === activeRole ? 'bg-white/20' : 'bg-muted'">
              <i :class="getRoleIcon(r)" class="text-[10px]"></i>
            </div>
            <span class="capitalize">{{ getRoleName(r) }}</span>
            <i v-if="r === activeRole" class="fas fa-check ml-auto text-[10px]"></i>
          </button>
        </div>
      </Transition>
    </div>

    <!-- Navigation Principale -->
    <nav class="flex-1 px-3 space-y-1">
      <!-- Lien Feed (Toujours visible si connecté) -->
      <RouterLink to="/feed" class="flex items-center gap-3 px-3 py-2.5 rounded-lg font-semibold transition-colors nav-link" exact-active-class="active">
        <div class="w-8 flex justify-center"><i class="fas fa-home text-lg"></i></div>
        <span>Fil d'actualité</span>
      </RouterLink>

      <!-- Liens Dynamiques par Rôle -->
      <template v-for="(link, index) in filteredLinks" :key="index">
        <!-- Label de Section -->
        <p v-if="link.isLabel" class="px-4 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-6 mb-2">
          {{ link.name }}
        </p>

        <!-- Lien Normal -->
        <RouterLink v-else :to="link.to" class="flex items-center gap-3 px-3 py-2.5 rounded-lg font-semibold transition-colors nav-link" active-class="active">
          <div class="w-8 flex justify-center relative">
            <i :class="[link.icon, 'text-lg']"></i>
            <span v-if="link.badge" class="absolute -top-1 -right-1 bg-secondary text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-card min-w-[18px] text-center">
              {{ link.badge }}
            </span>
          </div>
          <span>{{ link.name }}</span>
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
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { useSidebarStore } from '../../stores/sidebar'
import { useNotificationStore } from '../../stores/notifications'

const authStore = useAuthStore()
const sidebarStore = useSidebarStore()
const notifStore = useNotificationStore()
const router = useRouter()

const showRoleSwitcher = ref(false)

// Profil info
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
const allRoles = computed(() => {
  const roles = authStore.allRoles || []
  const officialOrder = ["client", "locataire", "bailleur", "agent", "prestataire", "admin"]
  return [...roles].sort((a, b) => {
    const idxA = officialOrder.indexOf(a)
    const idxB = officialOrder.indexOf(b)
    return (idxA > -1 ? idxA : 99) - (idxB > -1 ? idxB : 99)
  })
})

const activeRoleDisplay = computed(() => {
  const names = {
    client: 'Prospect',
    locataire: 'Résident',
    bailleur: 'Propriétaire',
    agent: 'Agent Terrain',
    prestataire: 'Prestataire Pro',
    admin: 'Administrateur'
  }
  return names[activeRole.value] || activeRole.value
})

// Rôles Icons & Names
const getRoleIcon = (r) => {
  const icons = {
    client: "fas fa-search",
    locataire: "fas fa-key",
    bailleur: "fas fa-house-chimney-user",
    agent: "fas fa-user-tie",
    prestataire: "fas fa-tools",
    admin: "fas fa-shield-halved",
  }
  return icons[r] || "fas fa-user-circle"
}

const getRoleName = (r) => {
  const names = {
    client: "Espace Client",
    locataire: "Espace Locataire",
    agent: "Espace Agent",
    bailleur: "Espace Bailleur",
    prestataire: "Espace Prestataire",
    admin: "Espace Admin",
  }
  return names[r] || r
}

// Switching Role
const handleSwitchRole = async (newRole) => {
  if (newRole === activeRole.value) {
    showRoleSwitcher.value = false
    return
  }

  const res = await authStore.switchRole(newRole)
  if (res.success) {
    showRoleSwitcher.value = false
    sidebarStore.fetchBadges()
    
    // Redirection vers le dashboard correspondant
    const dashboards = {
      client: "ClientDashboard",
      locataire: "LocataireDashboard",
      bailleur: "BailleurDashboard",
      agent: "AgentDashboard",
      prestataire: "PrestataireDashboard",
      admin: "AdminDashboard",
    }
    if (dashboards[newRole]) router.push({ name: dashboards[newRole] })
    else router.push('/')
  }
}

// Badges & Links Logic
onMounted(() => {
  sidebarStore.fetchBadges()
  notifStore.fetchUnreadCount()
});

const allLinks = [
  // --- LIENS PUBLICS (Visibles par tous) ---
  { name: "Accueil", to: "/", icon: "fas fa-home", roles: ["guest", "admin", "agent", "bailleur", "prestataire", "client", "locataire"] },
  { name: "Immobilier", to: "/annonces", icon: "fas fa-building", roles: ["guest", "admin", "agent", "bailleur", "prestataire", "client", "locataire"] },
  { name: "Marketplace", to: "/marketplace", icon: "fas fa-store", roles: ["guest", "admin", "agent", "bailleur", "prestataire", "client", "locataire"] },
  { name: "Prestataires", to: "/marketplace/prestataires", icon: "fas fa-tools", roles: ["guest", "admin", "agent", "bailleur", "prestataire", "client", "locataire"] },

  // --- FIL D'ACTUALITÉ ---
  { name: "Fil d'actualité", to: "/feed", icon: "fas fa-rss", roles: ["admin", "agent", "bailleur", "prestataire", "client", "locataire"] },

  // --- TABLEAUX DE BORD (Connectés) ---
  { name: "Mon Tableau de bord", isLabel: true, roles: ["admin", "agent", "bailleur", "prestataire", "client", "locataire"] },
  { name: "Dashboard", to: "/admin/dashboard", icon: "fas fa-chart-pie", roles: ["admin"] },
  { name: "Dashboard", to: "/agent/dashboard", icon: "fas fa-th-large", roles: ["agent"] },
  { name: "Dashboard", to: "/bailleur/dashboard", icon: "fas fa-chart-line", roles: ["bailleur"] },
  { name: "Dashboard", to: "/prestataire/dashboard", icon: "fas fa-columns", roles: ["prestataire"] },
  { name: "Dashboard", to: "/client/dashboard", icon: "fas fa-gauge", roles: ["client"] },
  { name: "Dashboard", to: "/locataire/dashboard", icon: "fas fa-house-user", roles: ["locataire"] },

  // --- ADMINISTRATION ---
  { name: "Administration", isLabel: true, roles: ["admin"] },
  { name: "Utilisateurs", to: "/admin/utilisateurs", icon: "fas fa-users", roles: ["admin"] },
  { name: "Immobilier Pro", to: "/admin/biens-annonces", icon: "fas fa-city", roles: ["admin"] },
  { name: "Demandes", to: "/admin/demandes-publication", icon: "fas fa-tasks", roles: ["admin"] },
  { name: "Finances", to: "/admin/finances", icon: "fas fa-wallet", roles: ["admin"] },

  // --- ACTIONS SPECIFIQUES ---
  { name: "Mes Biens", to: "/bailleur/mes-biens", icon: "fas fa-building", roles: ["bailleur"] },
  { name: "Publier", to: "/publier-bien", icon: "fas fa-plus-circle", roles: ["bailleur"] },
  
  { name: "Missions Location", to: "/agent/missions", icon: "fas fa-briefcase", roles: ["agent"] },
  { name: "Agenda", to: "/agent/agenda", icon: "fas fa-calendar-check", roles: ["agent"] },

  { name: "Mes Services", to: "/prestataire/mes-services", icon: "fas fa-briefcase", roles: ["prestataire"] },
  { name: "Offres", to: "/marketplace/demandes", icon: "fas fa-clipboard-check", roles: ["prestataire"] },

  { name: "Suivi Dossier", to: "/mon-suivi", icon: "fas fa-clipboard-list", roles: ["client", "locataire"] },
  { name: "Mes Favoris", to: "/mes-favoris", icon: "fas fa-heart", roles: ["client", "locataire"] },

  // --- SHARED TOOLS ---
  { name: "Assistance & Infos", isLabel: true, roles: ["guest", "admin", "agent", "bailleur", "prestataire", "client", "locataire"] },
  { name: "Notifications", to: "/notifications", icon: "fas fa-bell", roles: ["admin", "agent", "bailleur", "prestataire", "client", "locataire"], isNotif: true },
  { name: "Assistance", to: "/assistance", icon: "fas fa-circle-question", roles: ["guest", "admin", "agent", "bailleur", "prestataire", "client", "locataire"] },
]

const filteredLinks = computed(() => {
  const role = authStore.isAuthenticated ? activeRole.value : 'guest'
  return allLinks
    .filter(l => l.roles.includes(role))
    .map(l => {
      let badge = null
      if (l.isNotif) badge = notifStore.unreadCount > 0 ? notifStore.unreadCount : null
      return { ...l, badge }
    })
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
  box-shadow: 0 4px 12px hsl(var(--primary) / 0.2);
}
.nav-link.active i {
  color: white;
}

.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.2s ease-out;
}
.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: hsl(var(--muted-foreground) / 0.2);
  border-radius: 10px;
}
</style>

