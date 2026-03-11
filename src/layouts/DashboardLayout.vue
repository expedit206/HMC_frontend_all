<template>
  <div
    class="bg-background text-foreground antialiased flex overflow-hidden h-full w-full"
  >
    <!-- SIDEBAR UNIQUE -->
    <UnifiedSidebar
      :expanded="sidebarExpanded"
      :is-open="mobileMenuOpen"
      @toggle-expand="sidebarExpanded = !sidebarExpanded"
      @close-mobile="mobileMenuOpen = false"
    />

    <!-- OVERLAY MOBILE -->
    <div
      v-if="mobileMenuOpen"
      @click="mobileMenuOpen = false"
      class="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm lg:hidden transition-opacity duration-300"
    ></div>

    <!-- BOUTON OUVRIR SIDEBAR (Mobile) — flèche fixe bord gauche -->
    <button
      v-if="!mobileMenuOpen"
      @click="mobileMenuOpen = true"
      class="mobile-sidebar-toggle fixed left-0 top-1/2 -translate-y-1/2 z-30 lg:hidden w-6 h-14 bg-primary/80 backdrop-blur-md text-primary-foreground rounded-r-xl shadow-lg flex items-center justify-center hover:w-8 hover:bg-primary active:scale-95 transition-all duration-200"
      aria-label="Ouvrir le menu"
    >
      <i class="fas fa-chevron-right text-xs"></i>
    </button>

    <!-- ZONE PRINCIPALE -->
    <div class="flex-1 flex flex-col h-full overflow-hidden">
      <!-- CONTENU DE LA PAGE -->
      <main
        class="flex-1 overflow-y-auto p-4 pt-4 lg:p-10 bg-muted/20 scroll-smooth"
      >
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import UnifiedSidebar from "../components/common/UnifiedSidebar.vue";

defineProps({
  title: { type: String, default: "" },
});

const authStore = useAuthStore();
const sidebarExpanded = ref(true);
const mobileMenuOpen = ref(false);
</script>

<style scoped>
/* Styles supplémentaires si nécessaires */
.mobile-sidebar-toggle {
  border-top-right-radius: 9999px;
  border-bottom-right-radius: 9999px;
}

/* Pour que le contenu principal prenne bien toute la hauteur */
html, body, #app {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

/* Scrollbar personnalisée pour le main */
main::-webkit-scrollbar {
  width: 6px;
}

main::-webkit-scrollbar-track {
  background: hsl(var(--muted) / 0.2);
  border-radius: 10px;
}

main::-webkit-scrollbar-thumb {
  background: hsl(var(--primary) / 0.3);
  border-radius: 10px;
}

main::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--primary) / 0.5);
}
</style>