<template>
  <aside
    :class="[
      'fixed inset-y-0 left-0 z-50 bg-card border-r border-border transition-all duration-300 lg:static lg:h-auto shadow-2xl lg:shadow-none',
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      expanded ? 'w-72 lg:w-64' : 'w-72 lg:w-20',
    ]"
  >
    <div
      class="h-full flex flex-col py-6 px-4 overflow-y-auto custom-scrollbar"
    >
      <!-- Header Dynamique & Switcher -->
      <!-- Bouton Fermer (Mobile) -->
      <div class="lg:hidden flex items-center justify-between mb-2">
        <span class="text-xs font-black text-muted-foreground uppercase tracking-widest"
          >Menu</span
        >
        <button
          @click="$emit('close-mobile')"
          class="w-9 h-9 rounded-xl bg-muted/20 hover:bg-destructive/10 flex items-center justify-center text-muted-foreground hover:text-destructive transition-all active:scale-90"
          aria-label="Fermer le menu"
        >
          <i class="fas fa-xmark text-lg"></i>
        </button>
      </div>

      <div class="mb-4 px-2 flex items-center justify-between gap-3 relative">
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-all shrink-0"
            :class="config.headerClass"
          >
            <i :class="config.headerIcon"></i>
          </div>
          <div v-if="expanded" class="transition-opacity duration-300 min-w-0">
            <h2 class="font-bold text-foreground text-sm truncate">
              {{ config.headerTitle }}
            </h2>
            <p
              class="text-[10px] text-muted-foreground uppercase tracking-widest font-black truncate"
            >
              {{ config.headerSubtitle }}
            </p>
          </div>
        </div>

        <!-- Toggle Roles Switcher -->
        <button
          v-if="expanded && allRoles.length > 1"
          @click="showRoleSwitcher = !showRoleSwitcher"
          class="w-7 h-7 rounded-lg bg-muted/20 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-muted/30 transition-colors shrink-0 outline-none"
        >
          <i
            class="fas fa-right-left text-xs transition-transform"
            :class="{ '-rotate-90': showRoleSwitcher }"
          ></i>
        </button>

        <!-- Menu déroulant des rôles -->
        <div
          v-if="showRoleSwitcher && expanded"
          class="absolute top-12 left-2 right-2 bg-card rounded-xl shadow-xl border border-border p-2 z-50 animate-fadeIn"
        >
          <p
            class="text-[9px] font-black text-muted-foreground uppercase tracking-widest pl-2 mb-2"
          >
            Changer d'espace
          </p>
          <button
            v-for="r in allRoles"
            :key="r"
            @click="handleSwitchRole(r)"
            class="w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-2"
            :class="
              r === role
                ? 'bg-primary text-primary-foreground'
                : 'text-foreground hover:bg-muted/20 hover:text-primary'
            "
          >
            <i
              :class="[
                getRoleIcon(r),
                r === role ? 'text-primary-foreground' : 'text-muted-foreground w-4 text-center',
              ]"
            ></i>
            <span class="capitalize">{{ getRoleName(r) }}</span>
            <i
              v-if="r === role"
              class="fas fa-check ml-auto text-xs opacity-70"
            ></i>
          </button>
        </div>
      </div>

      <!-- Liens de Navigation -->
      <div class="space-y-1.5 flex-1">
        <template v-for="(link, index) in filteredLinks" :key="index">
          <!-- Label de Section -->
          <p
            v-if="link.isLabel && expanded"
            class="px-4 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mt-8 mb-3"
          >
            {{ link.name }}
          </p>

          <!-- Lien Normal -->
          <RouterLink
            v-else-if="!link.isLabel"
            @click="$emit('close-mobile')"
            :to="{ name: link.route }"
            class="sidebar-link flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-medium transition-all group"
            active-class="active"
          >
            <i
              :class="[
                link.icon,
                'w-5 text-center group-hover:scale-110 transition-transform',
              ]"
            ></i>
            <span v-if="expanded" class="truncate font-semibold">{{
              link.name
            }}</span>

            <!-- Badge -->
            <span
              v-if="expanded && link.badge"
              class="ml-auto bg-secondary text-secondary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full"
            >
              {{ link.badge }}
            </span>
          </RouterLink>
        </template>
      </div>

      <!-- Footer Sidebar / Logout -->
      <div class="mt-auto pt-6 border-t border-border">
        <button
          @click="handleLogout"
          class="w-full text-xs font-black text-destructive hover:bg-destructive/10 py-4 rounded-2xl transition-all uppercase tracking-widest flex items-center justify-center gap-4 group"
        >
          <i
            class="fas fa-power-off w-5 text-center group-hover:rotate-12 transition-transform"
          ></i>
          <span v-if="expanded">Déconnexion</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAuthStore } from "../../stores/auth";
import { useRouter } from "vue-router";

const props = defineProps({
  expanded: { type: Boolean, default: true },
  isOpen: { type: Boolean, default: false },
});

const authStore = useAuthStore();
const router = useRouter();
const role = computed(() => authStore.userRole);
const allRoles = computed(() => authStore.allRoles);

const emit = defineEmits(["close-mobile", "toggle-expand"]);
const showRoleSwitcher = ref(false);

const getRoleIcon = (r) => {
  const icons = {
    admin: "fas fa-shield-halved",
    agent: "fas fa-user-tie",
    bailleur: "fas fa-house-chimney-user",
    prestataire: "fas fa-tools",
    client: "fas fa-search",
    locataire: "fas fa-key",
  };
  return icons[r] || "fas fa-user-circle";
};

const getRoleName = (r) => {
  const names = {
    admin: "Plateforme (Admin)",
    agent: "Agent Terrain",
    bailleur: "Propriétaire",
    prestataire: "Professionnel",
    client: "Locataire",
    locataire: "Locataire & Engagé",
  };
  return names[r] || r;
};

const handleSwitchRole = async (newRole) => {
  if (newRole === role.value) {
    showRoleSwitcher.value = false;
    return;
  }

  const res = await authStore.switchRole(newRole);
  if (res.success) {
    showRoleSwitcher.value = false;
    // Redirection automatique vers le bon dashboard
    const dashboards = {
      admin: "AdminDashboard",
      agent: "AgentDashboard",
      bailleur: "BailleurDashboard",
      prestataire: "PrestataireDashboard",
      client: "ClientDashboard",
      locataire: "LocataireDashboard",
    };
    if (dashboards[newRole]) {
      router.push({ name: dashboards[newRole] });
    } else {
      router.push({ name: "Home" });
    }
  } else {
    alert(res.message);
  }
};

const config = computed(() => {
  const roles = {
    admin: {
      headerTitle: "Administration",
      headerSubtitle: "HMC Control",
      headerIcon: "fas fa-shield-halved text-primary-foreground",
      headerClass: "bg-primary",
    },
    agent: {
      headerTitle: "Espace Agent",
      headerSubtitle: "Audit Terrain",
      headerIcon: "fas fa-user-tie text-primary-foreground",
      headerClass: "bg-gradient-to-br from-secondary to-secondary/80",
    },
    bailleur: {
      headerTitle: "Propriétaire",
      headerSubtitle: "Bailleur HMC",
      headerIcon: "fas fa-house-chimney-user text-primary-foreground",
      headerClass: "bg-secondary",
    },
    prestataire: {
      headerTitle: "Prestataire",
      headerSubtitle: "Services Pro",
      headerIcon: "fas fa-tools text-primary-foreground",
      headerClass: "bg-indigo-600",
    },
    client: {
      headerTitle: "Espace Client",
      headerSubtitle: "HMC Immobilier",
      headerIcon: "fas fa-search text-primary-foreground",
      headerClass: "bg-green-600",
    },
    locataire: {
      headerTitle: "Locataire",
      headerSubtitle: "HMC Résident",
      headerIcon: "fas fa-key text-primary-foreground",
      headerClass: "bg-blue-600",
    },
  };
  return (
    roles[role.value] || {
      headerTitle: "Home Cameroon",
      headerSubtitle: "Mon Espace",
      headerIcon: "fas fa-user-circle text-primary-foreground",
      headerClass: "bg-primary",
    }
  );
});

const allLinks = [
  // --- ADMIN ---
  {
    name: "Dashboard",
    route: "AdminDashboard",
    icon: "fas fa-chart-pie",
    roles: ["admin"],
  },
  {
    name: "Utilisateurs",
    route: "AdminUtilisateurs",
    icon: "fas fa-users",
    roles: ["admin"],
  },
  {
    name: "Immobilier",
    route: "AdminBiensAnnonces",
    icon: "fas fa-building",
    roles: ["admin"],
  },
  {
    name: "Missions Audit",
    route: "AdminDemandesPublication",
    icon: "fas fa-tasks",
    roles: ["admin"],
  },
  {
    name: "Finances",
    route: "AdminFinances",
    icon: "fas fa-wallet",
    roles: ["admin"],
  },
  {
    name: "Services",
    route: "AdminServices",
    icon: "fas fa-tools-wrench",
    roles: ["admin"],
  },

  // --- AGENT ---
  {
    name: "Dashboard",
    route: "AgentDashboard",
    icon: "fas fa-th-large",
    roles: ["agent"],
  },
  {
    name: "Missions Location",
    route: "AgentMissions",
    icon: "fas fa-briefcase",
    roles: ["agent"],
  },
  {
    name: "Mes Biens",
    route: "AgentBiens",
    icon: "fas fa-city",
    roles: ["agent"],
  },
  {
    name: "Agenda",
    route: "AgentAgenda",
    icon: "fas fa-calendar-check",
    roles: ["agent"],
  },

  // --- BAILLEUR ---
  {
    name: "Dashboard",
    route: "BailleurDashboard",
    icon: "fas fa-chart-line",
    roles: ["bailleur"],
  },
  {
    name: "Mes Biens",
    route: "BailleurMesBiens",
    icon: "fas fa-city",
    roles: ["bailleur"],
  },
  {
    name: "Mes Demandes",
    route: "BailleurMesDemandes",
    icon: "fas fa-file-contract",
    roles: ["bailleur", "client"],
  },
  {
    name: "Publier (Audit)",
    route: "BailleurPublierBien",
    icon: "fas fa-plus-circle",
    roles: ["bailleur"],
  },
  {
    name: "Mes Locataires",
    route: "BailleurMesLocataires",
    icon: "fas fa-user-group",
    roles: ["bailleur"],
  },

  // --- PRESTATAIRE ---
  {
    name: "Tableau de bord",
    route: "PrestataireDashboard",
    icon: "fas fa-columns",
    roles: ["prestataire"],
  },
  {
    name: "Mes Services",
    route: "PrestataireServices",
    icon: "fas fa-briefcase",
    roles: ["prestataire"],
  },
  {
    name: "Interventions",
    route: "PrestataireInterventions",
    icon: "fas fa-hammer",
    roles: ["prestataire"],
  },

  // --- CLIENT / PROSPECT ---
  {
    name: "Dashboard",
    route: "ClientDashboard",
    icon: "fas fa-gauge",
    roles: ["client"],
  },
  {
    name: "Suivi Location",
    route: "MonSuivi",
    icon: "fas fa-route",
    roles: ["client", "locataire", "bailleur", "agent", "prestataire", "admin"],
  },
  {
    name: "Mes Favoris",
    route: "LocataireMesFavoris",
    icon: "fas fa-heart",
    roles: ["client", "locataire"],
  },

  // --- LOCATAIRE ---
  {
    name: "Dashboard",
    route: "LocataireDashboard",
    icon: "fas fa-house-user",
    roles: ["locataire"],
  },
  {
    name: "Mes Locations",
    route: "LocataireMesLocations",
    icon: "fas fa-file-contract",
    roles: ["locataire"],
  },
  {
    name: "Paiements",
    route: "LocataireMesPaiements",
    icon: "fas fa-receipt",
    roles: ["locataire"],
  },
  {
    name: "Interventions",
    route: "LocataireInterventions",
    icon: "fas fa-helmet-safety",
    roles: ["locataire"],
  },

  // --- SHARED TOOLS ---
  {
    name: "Gestion & Support",
    isLabel: true,
    roles: ["admin", "agent", "bailleur", "prestataire", "client", "locataire"],
  },
  {
    name: "Finances",
    route: "BailleurFinances",
    icon: "fas fa-wallet",
    roles: ["bailleur"],
  },
  {
    name: "Finances",
    route: "PrestataireFinances",
    icon: "fas fa-wallet",
    roles: ["prestataire"],
  },
  {
    name: "Statistiques",
    route: "AgentStatistiques",
    icon: "fas fa-chart-bar",
    roles: ["agent"],
  },
  {
    name: "Mon Profil",
    route: "BailleurMonProfil",
    icon: "fas fa-user-gear",
    roles: ["bailleur"],
  },
  {
    name: "Mon Profil",
    route: "LocataireMonProfil",
    icon: "fas fa-user-gear",
    roles: ["locataire"],
  },
  {
    name: "Mon Profil",
    route: "ClientProfil",
    icon: "fas fa-user-gear",
    roles: ["client"],
  },
  {
    name: "Paramètres",
    route: "AdminParametres",
    icon: "fas fa-sliders",
    roles: ["admin"],
  },
  {
    name: "Paramètres",
    route: "AgentParametres",
    icon: "fas fa-sliders",
    roles: ["agent"],
  },
  {
    name: "Paramètres",
    route: "ClientParametres",
    icon: "fas fa-sliders",
    roles: ["client"],
  },
  {
    name: "Assistance",
    route: "BailleurAssistance",
    icon: "fas fa-circle-question",
    roles: ["bailleur", "agent", "admin", "prestataire"],
  },
  {
    name: "Assistance",
    route: "ClientAssistance",
    icon: "fas fa-circle-question",
    roles: ["client"],
  },
  {
    name: "Assistance",
    route: "LocataireAssistance",
    icon: "fas fa-circle-question",
    roles: ["locataire"],
  },
];

const filteredLinks = computed(() => {
  return allLinks.filter((l) => l.roles.includes(role.value));
});

const handleLogout = async () => {
  await authStore.logout();
  router.push({ name: "Connexion" });
};
</script>

<style scoped>
.sidebar-link {
  color: hsl(var(--muted-foreground));
}
.sidebar-link.active {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  box-shadow: 0 10px 15px -3px hsl(var(--primary) / 0.2);
}
.sidebar-link.active i {
  color: hsl(var(--primary-foreground));
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: hsl(var(--muted) / 0.2);
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: hsl(var(--muted-foreground) / 0.3);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--muted-foreground) / 0.5);
}

.sidebar-link:hover:not(.active) {
  background-color: hsl(var(--muted) / 0.2);
  color: hsl(var(--secondary));
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fadeIn {
  animation: fadeIn 0.2s ease-out forwards;
}
</style>