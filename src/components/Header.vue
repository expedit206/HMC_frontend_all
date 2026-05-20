<template>
  <header class="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
    <!-- BARRE PRINCIPALE -->
    <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16 sm:h-20 gap-4">
      <!-- GAUCHE : Logo & Marque -->
      <div class="flex items-center gap-1 shrink-0">
        <RouterLink to="/">
          <AppLogo withText />
        </RouterLink>
      </div>

      <!-- CENTRE : Navigation Desktop & Recherche -->
      <div class="hidden lg:flex items-center flex-1 justify-center gap-6 px-2">
        <!-- Navigation Links -->
        <nav class="flex items-center gap-6 font-medium text-sm text-muted-foreground">
          <template v-for="link in navLinks" :key="link.label">
            <!-- Simple Link -->
            <RouterLink v-if="!link.children" :to="link.to"
              class="flex flex-col lg:flex-row items-center gap-2 hover:text-primary transition-colors whitespace-nowrap"
              :class="isLinkActive(link.to) ? 'text-secondary font-bold' : ''">
              <i :class="link.icon" class="text-xs"></i> {{ link.label }}
            </RouterLink>

            <!-- Dropdown Link -->
            <div v-else class="relative group h-full flex items-center">
              <button class="flex items-center gap-2 hover:text-primary transition-colors whitespace-nowrap py-4">
                <i :class="link.icon" class="text-xs"></i> {{ link.label }}
                <i class="fas fa-chevron-down text-[10px] opacity-50 group-hover:rotate-180 transition-transform"></i>
              </button>

              <!-- Dropdown Content -->
              <div
                class="absolute top-full left-0 w-56 bg-card border border-border rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top -translate-y-2 group-hover:translate-y-0 z-50 overflow-hidden">
                <div class="p-2 space-y-1">
                  <RouterLink v-for="sub in link.children" :key="sub.to" :to="sub.to"
                    class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 hover:text-primary transition-all text-foreground font-medium">
                    <div class="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                      <i :class="sub.icon"></i>
                    </div>
                    <span>{{ sub.label }}</span>
                  </RouterLink>
                </div>
              </div>
            </div>
          </template>
        </nav>

        <!-- Search Bar Trigger -->
        <div class="relative flex items-center">
          <button @click="isSearchOpen = true" 
            class="flex items-center gap-3 px-2 py-2 rounded-full border border-border hover:border-primary/30 transition-all text-muted-foreground group"
            title="Rechercher ">
            <i class="fas fa-search text-xs group-h eover:text-primary transition-colors"></i>
          </button> 
        </div>
      </div>

      <!-- DROITE : Actions & Menu Mobile -->
      <div class="flex items-center  sm:gap-4 shrink-0">
        <!-- Mobile Search Toggle -->
        <button @click="toggleSearch" class="lg:hidden text-muted-foreground hover:text-primary p-2">
          <i class="fas fa-search text-lg"></i>
        </button>

        <!-- Mobile Notifications (Visible < lg) -->
        <!-- <RouterLink to="/notifications" v-if="authStore.isAuthenticated"
          class="lg:hidden text-muted-foreground hover:text-primary py-2 px-1 relative">
          <i class="far fa-bell text-lg"></i>
          <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full border border-card"></span>
        </RouterLink> -->

        <!-- Mobile Marketplace (Remplace Assistance) -->
        <RouterLink to="/marketplace" class="lg:hidden text-muted-foreground hover:text-primary p-2">
          <i class="fas fa-store text-lg"></i>
        </RouterLink>

        <!-- Desktop User Actions -->
        <div class="hidden lg:flex items-center gap-4">
          <!-- Theme Toggle -->
          <ThemeToggle />

          <!-- Notifications (Connecté) -->
          <RouterLink v-if="authStore.isAuthenticated" to="/notifications"
            class="text-muted-foreground hover:text-primary transition-colors p-1 relative" title="Notifications">
            <i class="far fa-bell text-xl"></i>
            <span class="absolute top-0 right-0 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-card"></span>
          </RouterLink>

          <!-- Séparateur -->
          <div class="h-6 w-px bg-border"></div>

          <!-- CTA: Publier une annonce (Visible sur Tablette+) -->
          <RouterLink to="/publier-bien"
            class="flex items-center gap-2 font-semibold text-secondary hover:text-secondary/80">
            <i class="fas fa-plus-circle text-xl"></i>
            <span class="hidden md:inline">Publier</span>
          </RouterLink>
        </div>

        <!-- CONNECTÉ : Menu Utilisateur (Style Facebook) pour Desktop & Mobile -->
        <div v-if="authStore.isAuthenticated" class="relative">
          <button
            @click.stop="showUserMenu = !showUserMenu"
            class="flex items-center gap-1.5 p-1 rounded-full cursor-pointer transition focus:outline-none relative">
            <UserAvatar :user="authStore.user" size="sm" />
            <div
              class="w-4 h-4 flex items-center justify-center rounded-full bg-primary/10 top-5 mr-1 transition-colors absolute -right-1"
              :class="showUserMenu ? 'bg-primary/20 text-primary' : ''">
              <i class="fas fa-chevron-down text-[10px]" :class="showUserMenu ? 'rotate-180' : ''"></i>
            </div>
          </button>

          <!-- Dropdown Menu (Facebook Style Switcher) -->
          <div v-if="showUserMenu"
            v-click-outside="() => showUserMenu = false"
            class="absolute right-0 mt-2 w-[calc(100vw-2rem)] sm:w-80 max-w-[320px] bg-card border border-border rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-[100] p-3 animate-fade-in-up">
            <!-- Profil Principal -->
            <div
              class="p-2 mb-3 bg-card border border-border rounded-xl shadow-sm flex flex-col gap-2 relative overflow-hidden">
              <div class="absolute inset-0 bg-primary/5"></div>
              <div class="relative flex items-center gap-3 p-2 rounded-lg">
                <UserAvatar :user="authStore.user" size="md" />
                <div class="flex-1 min-w-0">
                  <div class="font-black text-sm text-foreground leading-tight truncate">{{ authStore.user?.name ||
                    'Utilisateur' }}</div>
                  <div
                    class="text-[9px] uppercase font-black text-muted-foreground tracking-widest flex items-center gap-1 mt-0.5">
                    Actif : <span class="text-primary truncate">{{ authStore.userActiveRole }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Switcher des autres Profils -->
            <div v-if="authStore.availableRoles && authStore.availableRoles.length > 1" class="mb-2">
              <div class="px-2 py-1.5 text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1">
                Vos autres profils
              </div>
              <div class="space-y-1 max-h-[40vh] overflow-y-auto custom-scrollbar">
                <button v-for="role in authStore.availableRoles" :key="role" v-show="role !== authStore.userActiveRole"
                  @click="handleRoleSwitch(role)"
                  class="w-full flex items-center gap-3 p-2 rounded-xl border border-transparent hover:border-border hover:bg-muted/40 transition-all text-left group/btn">
                  <div
                    class="w-10 h-10 rounded-full border border-border flex flex-shrink-0 items-center justify-center text-muted-foreground group-hover/btn:bg-primary/5 group-hover/btn:text-primary group-hover/btn:border-primary/20 transition-all shadow-[inset_0_1px_3px_rgb(0,0,0,0.05)]">
                    <i class="fas fa-exchange-alt font-black"></i>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="font-bold text-sm text-foreground capitalize truncate">Espace {{ role }}</div>
                    <div class="text-[10px] text-muted-foreground/80 font-medium tracking-wide truncate">Basculer le
                      compte
                    </div>
                  </div>
                </button>
              </div>
            </div>

            <div class="border-t border-border my-2"></div>

            <!-- Tools & Logout -->
            <div class="space-y-1">
              <RouterLink to="/mes-favoris"
                class="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-muted transition-colors font-semibold text-sm text-foreground">
                <div class="w-8 h-8 rounded-full bg-muted flex flex-shrink-0 items-center justify-center"><i
                    class="fas fa-heart text-xs opacity-70 mt-0.5"></i></div>
                Mes Favoris
              </RouterLink>
              <button @click="handleLogout"
                class="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-destructive/10 transition-colors font-semibold text-sm text-destructive">
                <div class="w-8 h-8 rounded-full bg-destructive/10 flex flex-shrink-0 items-center justify-center"><i
                    class="fas fa-sign-out-alt text-xs mt-0.5"></i></div>
                Déconnexion
              </button>
            </div>
          </div>
        </div>

        <!-- NON CONNECTÉ : Connexion / Inscription (Visible Mobile & Desktop) -->
        <div v-else class="flex items-center gap-2">
          <RouterLink to="/auth/connexion" class="lg:hidden text-primary p-2">
            <i class="far fa-user-circle text-2xl"></i>
          </RouterLink>
          <RouterLink to="/auth/connexion"
            class="hidden lg:block text-primary text-sm px-5 py-2.5 rounded-full font-bold shadow-lg hover:bg-primary/90 hover:shadow-lg hover:text-primary-foreground transition-all transform hover:-translate-y-0.5">
            Se connecter
          </RouterLink>
        </div>

        <!-- Burger Button (Mobile) -->
        <button @click="sidebarStore.toggleMobile()"
          class="lg:hidden p-2 text-foreground hover:text-primary focus:outline-none transition-transform active:scale-95">
          <i class="fas fa-bars text-2xl" v-if="!sidebarStore.isMobileOpen"></i>
          <i class="fas fa-times text-2xl" v-else></i>
        </button>
      </div>
    </div>

    <nav
      class="lg:hidden bg-card border-t border-border flex justify-between px-2 py-2 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] overflow-x-auto scrollbar-hide sticky bottom-0 z-50">
      <RouterLink v-for="link in mobileBottomLinks" :key="link.to" :to="link.to" custom v-slot="{ navigate }">
        <div @click="navigate" role="button"
          class="flex flex-col items-center gap-1 min-w-15 transition py-1 cursor-pointer"
          :class="[isLinkActive(link.to) ? 'text-secondary scale-110' : 'text-muted-foreground hover:-translate-y-1 hover:text-primary']">
          <i :class="isLinkActive(link.to) ? link.icon.replace('far ', 'fas ') : link.icon" class="text-xl"></i>
          <span class="text-[10px] font-bold">{{ link.label }}</span>
        </div>
      </RouterLink>
    </nav>
  </header>

  <!-- MOBILE SEARCH BAR REMOVED because it's in GlobalSearchOverlay -->
  
  <!-- GLOBAL SEARCH OVERLAY -->
  <GlobalSearchOverlay :is-open="isSearchOpen" @close="isSearchOpen = false" />

  <!-- SMART AI ASSISTANT -->
  <AIAssistant />
</template>

<script setup>
import { ref, watch, computed, onMounted, onUnmounted } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { useCartStore } from "../stores/cart";
import { useSidebarStore } from "../stores/sidebar";
import UserAvatar from "./common/UserAvatar.vue";
import ThemeToggle from "./ThemeToggle.vue";
import AppLogo from "./common/AppLogo.vue";
import AIAssistant from "./common/AIAssistant.vue";
import GlobalSearchOverlay from "./search/GlobalSearchOverlay.vue";

const isSearchOpen = ref(false);
const showUserMenu = ref(false);
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const cartStore = useCartStore();
const sidebarStore = useSidebarStore();

const toggleSearch = () => {
  isSearchOpen.value = true;
};



// Click outside directive (simulated)
const vClickOutside = {
  mounted(el, binding) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event);
      }
    };
    document.addEventListener("click", el.clickOutsideEvent);
  },
  unmounted(el) {
    document.removeEventListener("click", el.clickOutsideEvent);
  },
};

const isLinkActive = (to) => {
  if (to === '/') return route.path === '/';
  return route.path.startsWith(to);
};



// Close menu when route changes
watch(
  () => route.path,
  () => {
    sidebarStore.isMobileOpen = false;
    isSearchOpen.value = false;
    showUserMenu.value = false;
  },
);

const getDashboardLink = () => {
  const role = authStore.user?.role;
  switch (role) {
    case "admin":
      return "/admin/dashboard";
    case "bailleur":
      return "/bailleur/dashboard";
    case "locataire":
      return "/locataire/dashboard";
    case "prestataire":
      return "/prestataire/dashboard";
    case "agent":
      return "/agent/dashboard";
    case "client":
      return "/client/dashboard";
    default:
      return "/client/dashboard";
  }
};

const navLinks = computed(() => {
  const isAuthenticated = authStore.isAuthenticated;

  const baseLinks = [
    { to: "/", label: "Accueil", icon: "fas fa-home" },
    { to: "/annonces", label: "Immobilier", icon: "fas fa-building" },
    { to: "/services/prestataires", label: "Prestataires", icon: "fas fa-users" }, // Changé: fa-hard-hat -> fa-users
    { to: "/services/demandes", label: "Missions", icon: "fas fa-tasks" }, // Changé: fa-briefcase -> fa-tasks
  ];

  const dashLink = {
    to: getDashboardLink(),
    label: "Dashboard",
    icon: "fas fa-chart-line" // Changé: fa-tachometer-alt -> fa-chart-line
  };

  return [
    ...baseLinks,
    dashLink,
    { to: "/marketplace", label: "Marketplace", icon: "fas fa-shopping-cart" }, // Changé: fa-store -> fa-shopping-cart
  ];
});
const mobileBottomLinks = computed(() => {
  // Retire Marketplace de la barre du bas pour économiser de l'espace sur mobile (il est en haut)
  return navLinks.value.filter(link => link.to !== '/marketplace');
});

const getProfileLink = () => {
  return "/parametres";
};

const handleRoleSwitch = async (newRole) => {
  const success = await authStore.switchRole(newRole);
  if (success) {
    router.push(getDashboardLink());
    mobileMenuOpen.value = false;
  }
};

const handleLogout = async () => {
  await authStore.logout();
  router.push("/auth/connexion");
};
</script>

<style scoped>
@import '@fortawesome/fontawesome-free/css/all.min.css';

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out forwards;
}
</style>