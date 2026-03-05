<template>
  <div class="layout flex flex-col bg-background" :class="hasSidebar ? 'h-screen overflow-hidden' : 'min-h-screen'">
    <Header />
    <CartDrawer />
    <main class="mx-auto w-full" :class="hasSidebar ? 'flex-1 overflow-hidden flex flex-col' : 'flex-1'">
      <RouterView />
    </main>
    <Footer v-if="!hasSidebar" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, RouterView } from "vue-router";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import CartDrawer from "../components/marketplace/CartDrawer.vue";

const route = useRoute();

const hasSidebar = computed(() => {
  return route.matched.some(r => r.meta?.hasSidebar);
});
</script>
