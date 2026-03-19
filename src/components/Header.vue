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
          <RouterLink v-for="link in navLinks" :key="link.to" :to="link.to" active-class="text-secondary font-bold"
            class="flex flex-col lg:flex-row  items-center gap-2 hover:text-primary transition-colors whitespace-nowrap">
            <i :class="link.icon" class="text-xs"></i> {{ link.label }}
          </RouterLink>
        </nav>

        <!-- Search Bar -->
        <div class="relative flex items-center">
          <div class="flex items-center transition-all duration-500 ease-in-out"
            :class="searchExpanded ? 'w-[280px] lg:w-[350px] xl:w-[450px]' : 'w-10'">
            <button @click="toggleSearch"
              class="absolute left-0 w-10 h-10 flex items-center justify-center rounded-full text-muted-foreground hover:text-primary transition-all z-10"
              :class="{ 'text-primary': searchExpanded }" :title="searchExpanded ? 'Fermer' : 'Rechercher'">
              <i class="fas" :class="searchExpanded ? 'fa-times' : 'fa-search'"></i>
            </button>
            <input ref="searchInput" v-model="searchQuery" type="text" placeholder="Rechercher un logement..."
              class="w-full h-10 rounded-full border border-border  pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-card outline-none transition-all"
              :class="searchExpanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'"
              @blur="handleBlur" @keyup.enter="handleSearch" />
          </div>
        </div>
      </div>

      <!-- DROITE : Actions & Menu Mobile -->
      <div class="flex items-center gap-1 sm:gap-4 shrink-0">
        <!-- Mobile Search Toggle -->
        <button @click="toggleSearch" class="lg:hidden text-muted-foreground hover:text-primary p-2">
          <i class="fas fa-search text-lg"></i>
        </button>

        <!-- Mobile Notifications (Visible < lg) -->
        <RouterLink to="/notifications" v-if="authStore.isAuthenticated"
          class="lg:hidden text-muted-foreground hover:text-primary p-2 relative">
          <i class="far fa-bell text-lg"></i>
          <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full border border-card"></span>
        </RouterLink>

        <!-- Mobile Assistance (Visible < lg) -->
        <RouterLink to="/assistance" class="text-muted-foreground hover:text-primary p-2 ">
          <i class="far fa-comments text-lg"></i>
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

          <!-- CONNECTÉ : Menu Utilisateur -->
          <div v-if="authStore.isAuthenticated" class="relative group">
            <button
              class="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary focus:outline-none">
              <UserAvatar :user="authStore.user" size="sm" />
              <!-- <span class="max-w-25 truncate hidden xl:block">{{ authStore.user?.name }}</span> -->
          
            </button>

            <!-- Dropdown Menu -->
            <div
              class="absolute right-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
              <div class="py-1">
                <RouterLink :to="getDashboardLink()"
                  class="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary">
                  <i class="fas fa-tachometer-alt mr-2 w-4"></i> Tableau de bord
                </RouterLink>
                <RouterLink :to="getProfileLink()" @click="mobileMenuOpen = true"
                  class="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary">
                  <i class="fas fa-id-card mr-2 w-4"></i> Mon Profil
                </RouterLink>
                <RouterLink to="/locataire/mes-favoris"
                  class="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-destructive">
                  <i class="far fa-heart mr-2 w-4"></i> Mes Favoris
                </RouterLink>

                <!-- SWITCH ROLES SECTION -->
                <div v-if="authStore.availableRoles && authStore.availableRoles.length > 1">
                  <div class="border-t border-border my-1"></div>
                  <div class="px-4 py-2 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Changer de profil
                  </div>
                  <template v-for="role in authStore.availableRoles" :key="role">
                    <button v-if="role !== authStore.userActiveRole" @click="handleRoleSwitch(role)"
                      class="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-primary/5 hover:text-primary transition-colors capitalize">
                      <i class="fas fa-exchange-alt mr-2 w-4 text-muted-foreground"></i>
                      {{ role }}
                    </button>
                  </template>
                </div>

                <div class="border-t border-border my-1"></div>
                <button @click="handleLogout"
                  class="block w-full text-left px-4 py-2 text-sm text-destructive hover:bg-destructive/10">
                  <i class="fas fa-sign-out-alt mr-2 w-4"></i> Déconnexion
                </button>
              </div>
            </div>
          </div>

          <!-- NON CONNECTÉ : Connexion / Inscription -->
          <div v-else class="flex items-center gap-3">
            <RouterLink to="/auth/connexion"
              class="hidden xl:block text-primary text-sm px-5 py-2.5 rounded-full font-bold shadow-lg hover:bg-primary/90 hover:shadow-lg hover:text-primary-foreground transition-all transform hover:-translate-y-0.5">
              Se connecter
            </RouterLink>
          </div>
        </div>

   
        <!-- Burger Button (Mobile) -->
        <button @click="mobileMenuOpen = !mobileMenuOpen"
          class="lg:hidden p-2 text-foreground hover:text-primary focus:outline-none">
          <i class="fas fa-bars text-xl" v-if="!mobileMenuOpen"></i>
          <i class="fas fa-times text-xl" v-else></i>
        </button>
      </div>
    </div>

    <!-- Barre de navigation mobile du bas -->
    <nav
      class="lg:hidden bg-card border-t border-border flex justify-between px-6 py-2 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] overflow-x-auto scrollbar-hide sticky bottom-0 z-50">
      <RouterLink v-for="link in mobileBottomLinks" :key="link.to" :to="link.to" custom v-slot="{ navigate, isActive }">
        <div @click="navigate" role="button" class="flex flex-col items-center gap-1 min-w-15 transition cursor-pointer"
          :class="[isActive ? 'text-secondary scale-110' : 'text-muted-foreground hover:text-primary']">
          <i :class="isActive ? link.icon.replace('far ', 'fas ') : link.icon" class="text-lg"></i>
          <span class="text-[10px] font-bold">{{ link.label }}</span>
        </div>
      </RouterLink>
    </nav>

    <!-- OVERLAY POUR MENU MOBILE -->
    <div v-if="mobileMenuOpen" @click="mobileMenuOpen = false"
      class="lg:hidden fixed inset-0 top-[64px] sm:top-[80px] bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"></div>

    <!-- MENU MOBILE ÉTENDU (Overlay) -->
    <div v-show="mobileMenuOpen"
      class="lg:hidden absolute top-12 left-0 w-full bg-card border-b border-border shadow-2xl p-4 flex flex-col gap-4 animate-in slide-in-from-top-2 z-50">

      <!-- En-tête du menu mobile avec ThemeToggle -->
      <div class="flex items-center justify-between border-b border-border pb-2">
        <h3 class="text-sm font-bold text-foreground">Menu</h3>
        <ThemeToggle />
      </div>

      <div v-if="!authStore.isAuthenticated" class="grid grid-cols-2 gap-3">
        <RouterLink to="/publier-bien"
          class="col-span-2 flex items-center justify-center gap-2 bg-secondary text-secondary-foreground py-3 rounded-xl font-bold hover:opacity-90 transition">
          <i class="fas fa-plus-circle"></i> Publier une annonce
        </RouterLink>

        <RouterLink to="/auth/connexion"
          class="flex items-center justify-center gap-2 border border-border  text-foreground py-2.5 rounded-lg font-medium hover:bg-muted transition">
          Se connecter
        </RouterLink>
      </div>

      <div v-else class="flex flex-col gap-3">
        <div class="flex items-center gap-3 p-3 bg-primary/5 rounded-xl">
          <UserAvatar :user="authStore.user" size="lg" />
          <div>
            <div class="font-bold text-foreground">{{ authStore.user?.name }}</div>
            <div class="text-xs text-muted-foreground capitalize flex items-center gap-1">
              <span class="inline-block w-2 h-2 rounded-full bg-green-500"></span>
              {{ authStore.userActiveRole }}
            </div>
          </div>
        </div>

        <!-- Role Switching Mobile -->
        <div v-if="authStore.availableRoles && authStore.availableRoles.length > 1" class="flex flex-wrap gap-2 px-1">
          <template v-for="role in authStore.availableRoles" :key="role">
            <button v-if="role !== authStore.userActiveRole" @click="handleRoleSwitch(role)"
              class="flex-1 py-2 px-3 rounded-lg border border-primary/20 bg-primary/5 text-primary text-xs font-bold capitalize active:scale-95 transition-all">
              Mode {{ role }}
            </button>
          </template>
        </div>

        <RouterLink :to="getDashboardLink()"
          class="flex items-center gap-3 p-3 text-foreground hover:bg-muted rounded-lg">
          <i class="fas fa-tachometer-alt text-primary"></i> Mon Tableau de bord
        </RouterLink>

        <button @click="handleLogout"
          class="flex items-center gap-3 p-3 text-destructive hover:bg-destructive/10 rounded-lg w-full text-left">
          <i class="fas fa-sign-out-alt"></i> Se déconnecter
        </button>
      </div>

      <div class=" rounded-xl p-3">
        <h3 class="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
          Navigation
        </h3>
        <ul class="space-y-2">
          <li v-for="link in navLinks" :key="'mobile-' + link.to">
            <RouterLink :to="link.to"
              class="flex items-center gap-2 text-sm text-foreground/80 hover:text-primary py-1">
              <i :class="link.icon" class="w-5"></i> {{ link.label }}
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/assistance"
              class="flex items-center gap-2 text-sm text-foreground/80 hover:text-primary py-1">
              <i class="far fa-comments w-5"></i> Assistance / Messagerie
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </header>

  <!-- MOBILE SEARCH BAR (FULL WIDTH) -->
  <div v-show="searchExpanded" class="lg:hidden bg-card border-t border-border px-4 py-3 shadow-sm">
    <div class="relative max-w-7xl mx-auto">
      <input v-model="searchQuery" type="text" placeholder="Rechercher un logement..."
        class="w-full h-11 rounded-full border border-border  pl-4 pr-12 text-sm placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-card outline-none"
        @keyup.enter="handleSearch" />
      <button @click="handleSearch" class="absolute right-3 top-1/2 -translate-y-1/2 text-primary">
        <i class="fas fa-search"></i>
      </button>
    </div>
  </div>

  <!-- FIXED ASSISTANCE BUTTON -->
  <RouterLink to="/assistance"
    class="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 hover:scale-110 transition-all border-2 border-card animate-fade-in-up"
    title="Assistance / Chat">
    <i class="fas fa-comments text-2xl"></i>
    <span class="absolute top-0 right-0 w-3.5 h-3.5 bg-destructive rounded-full border-2 border-card"></span>
  </RouterLink>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { useCartStore } from "../stores/cart";
import UserAvatar from "./common/UserAvatar.vue";
import ThemeToggle from "./ThemeToggle.vue";
import AppLogo from "./common/AppLogo.vue";

const mobileMenuOpen = ref(false);
const searchExpanded = ref(false);
const searchQuery = ref("");
const searchInput = ref(null);
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const cartStore = useCartStore();

const toggleSearch = () => {
  searchExpanded.value = !searchExpanded.value;
  if (searchExpanded.value) {
    setTimeout(() => {
      searchInput.value?.focus();
    }, 100);
  }
};

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: "/annonces",
      query: { search: searchQuery.value.trim() },
    });
    searchExpanded.value = false;
  }
};

const handleBlur = (e) => {
  if (!searchQuery.value) {
    searchExpanded.value = false;
  }
};

// Close menu when route changes
watch(
  () => route.path,
  () => {
    mobileMenuOpen.value = false;
    searchExpanded.value = false;
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
  const role = authStore.userActiveRole;
  const isAuthenticated = authStore.isAuthenticated;

  if (!isAuthenticated) {
    return [
      { to: "/", label: "Accueil", icon: "fas fa-home" },
      { to: "/annonces", label: "Annonces", icon: "fas fa-search-location" },
      { to: "/marketplace", label: "Marketplace", icon: "fas fa-store" },
    ];
  }

  switch (role) {
    case "agent":
      return [
        { to: "/", label: "Accueil", icon: "fas fa-home" },
        {
          to: "/agent/dashboard",
          label: "Dashboard",
          icon: "fas fa-tachometer-alt",
        },
        { to: "/agent/missions", label: "Missions", icon: "fas fa-tasks" },
        { to: "/agent/agenda", label: "Agenda", icon: "fas fa-calendar-alt" },
        { to: "/agent/clients", label: "Clients", icon: "fas fa-users" },
      ];
    case "bailleur":
      return [
        { to: "/", label: "Accueil", icon: "fas fa-home" },
        {
          to: "/bailleur/dashboard",
          label: "Dashboard",
          icon: "fas fa-tachometer-alt",
        },
        {
          to: "/bailleur/mes-biens",
          label: "Mes Biens",
          icon: "fas fa-building",
        },
        { to: "/bailleur/finances", label: "Revenus", icon: "fas fa-wallet" },
        { to: "/marketplace", label: "Marketplace", icon: "fas fa-store" },
      ];
    case "locataire":
      return [
        { to: "/", label: "Accueil", icon: "fas fa-home" },
        { to: "/annonces", label: "Annonces", icon: "fas fa-search-location" },
        { to: "/mon-suivi", label: "Mon Suivi", icon: "fas fa-clipboard-list" },
        { to: "/marketplace", label: "Marketplace", icon: "fas fa-store" },
      ];
    case "prestataire":
      return [
        { to: "/", label: "Accueil", icon: "fas fa-home" },
        {
          to: "/prestataire/dashboard",
          label: "Dashboard",
          icon: "fas fa-tachometer-alt",
        },
        {
          to: "/prestataire/interventions",
          label: "Interventions",
          icon: "fas fa-tools",
        },
        {
          to: "/prestataire/agenda",
          label: "Agenda",
          icon: "fas fa-calendar-alt",
        },
        { to: "/marketplace", label: "Marketplace", icon: "fas fa-store" },
      ];
    case "admin":
      return [
        { to: "/", label: "Accueil", icon: "fas fa-home" },
        { to: "/admin/dashboard", label: "Admin", icon: "fas fa-user-shield" },
        {
          to: "/admin/utilisateurs",
          label: "Utilisateurs",
          icon: "fas fa-users",
        },
        {
          to: "/admin/biens-annonces",
          label: "Gestion Biens",
          icon: "fas fa-building",
        },
      ];
    default:
      return [

        { to: "/", label: "Accueil", icon: "fas fa-home" },
        { to: "/annonces", label: "Annonces", icon: "fas fa-search-location" },
        { to: "/marketplace", label: "Marketplace", icon: "fas fa-store" },
        { to: "/client/dashboard", label: "Dashboard", icon: "fas fa-user-shield" },
      ];
  }
});

const mobileBottomLinks = computed(() => {
  const role = authStore.userActiveRole;
  const isAuthenticated = authStore.isAuthenticated;

  // Essential links for bottom bar (max 5)
  if (!isAuthenticated) {
    return [
      { to: "/", label: "Accueil", icon: "fas fa-home" },
      { to: "/annonces", label: "Annonces", icon: "fas fa-search-location" },
      { to: "/marketplace", label: "Shop", icon: "fas fa-store" },
      { to: "/auth/connexion", label: "Profil", icon: "far fa-user-circle" },
    ];
  }

  const base = [{ to: "/", label: "Accueil", icon: "fas fa-home" }];

  switch (role) {
    case "agent":
      return [
        ...base,
        { to: "/agent/missions", label: "Missions", icon: "fas fa-tasks" },
        { to: "/agent/agenda", label: "Agenda", icon: "fas fa-calendar-alt" },
        { to: "/agent/biens", label: "Biens", icon: "fas fa-building" },
        { to: "/agent/dashboard", label: "Dashboard", icon: "far fa-user-circle" },
      ];
    case "bailleur":
      return [
        ...base,
        {
          to: "/bailleur/mes-biens",
          label: "Mes Biens",
          icon: "fas fa-building",
        },
        {
          to: "/bailleur/visites",
          label: "Visites",
          icon: "fas fa-calendar-check",
        },
        { to: "/bailleur/finances", label: "Revenus", icon: "fas fa-wallet" },
        {
          to: "/bailleur/dashboard",
          label: "Dashboard",
          icon: "far fa-user-circle",
        },
      ];
    case "locataire":
      return [
        ...base,
        { to: "/annonces", label: "Annonces", icon: "fas fa-search-location" },
        { to: "/mon-suivi", label: "Suivi", icon: "fas fa-clipboard-list" },
        {
          to: "/locataire/mes-favoris",
          label: "Favoris",
          icon: "far fa-heart",
        },
        {
          to: "/locataire/dashboard",
          label: "Dashboard",
          icon: "far fa-user-circle",
        },
      ];
    case "prestataire":
      return [
        ...base,
        {
          to: "/prestataire/interventions",
          label: "Tâches",
          icon: "fas fa-tools",
        },
        {
          to: "/prestataire/agenda",
          label: "Agenda",
          icon: "fas fa-calendar-alt",
        },
        {
          to: "/prestataire/finances",
          label: "Revenus",
          icon: "fas fa-wallet",
        },
        {
          to: "/prestataire/dashboard",
          label: "Dashboard",
          icon: "far fa-user-circle",
        },
      ];
    case "admin":
      return [
        ...base,
        { to: "/admin/dashboard", label: "Admin", icon: "fas fa-user-shield" },
        {
          to: "/admin/biens-annonces",
          label: "Biens",
          icon: "fas fa-building",
        },
        { to: "/admin/utilisateurs", label: "Users", icon: "fas fa-users" },
        { to: "/admin/dashboard", label: "Dashboard", icon: "far fa-user-circle" },
      ];
    default:
      return [
        ...base,
        { to: getDashboardLink(), label: "Dashboard", icon: "fas fa-user-shield" },

        { to: "/annonces", label: "Annonces", icon: "fas fa-search-location" },
        {
          to: "/locataire/mes-favoris",
          label: "Favoris",
          icon: "far fa-heart",
        },
        { to: getDashboardLink(), label: "Dashboard", icon: "far fa-user-circle" },
      ];
  }
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
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css");

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