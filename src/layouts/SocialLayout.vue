<template>
  <div class="min-h-screen bg-background flex flex-col">
    <!-- Header Global -->
    <Header />
    <CartDrawer />

    <div class="flex flex-1 w-full mx-auto max-w-[1600px] overflow-hidden">
      <!-- Colonne Gauche -->
      <LeftSidebar v-if="hasSidebar" />

      <!-- Colonne Centrale -->
      <main 
        class="flex-1 w-full min-w-0 bg-background overflow-y-auto custom-scrollbar h-[calc(100vh-80px)] scroll-smooth relative" 
        ref="mainScroll"
      >
        <div :class="[
          isFullWidth ? 'w-full' : (showRightSidebar ? 'max-w-2xl mx-auto' : 'max-w-7xl mx-auto'),
          isFullWidth ? '' : 'px-4 pt-4',
          'pb-20 transition-all duration-300'
        ]">
          <RouterView />
        </div>
        
        <!-- Pied de page -->
        <Footer v-if="!showRightSidebar" />
        
        <!-- Bouton remonter -->
        <button 
          v-show="showScrollTop"
          @click="scrollToTop"
          class="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-primary text-white shadow-lg flex items-center justify-center hover:bg-primary/90 transition-all z-50 hover:scale-110"
        >
          <i class="fas fa-arrow-up"></i>
        </button>
      </main>

      <!-- Colonne Droite (Conditionnelle) -->
      <RightSidebar v-if="showRightSidebar" :stats="feedStore.stats" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute, RouterView } from 'vue-router'
import Header from '../components/Header.vue'
import CartDrawer from '../components/marketplace/CartDrawer.vue'
import LeftSidebar from '../components/social/LeftSidebar.vue'
import RightSidebar from '../components/social/RightSidebar.vue'
import Footer from '../components/Footer.vue'
import { useFeedStore } from '../stores/feed'

const route = useRoute()
const feedStore = useFeedStore()
const mainScroll = ref(null)
const showScrollTop = ref(false)

const hasSidebar = computed(() => route.meta?.hasSidebar !== false)
const showRightSidebar = computed(() => route.meta?.showRightSidebar === true)
const isFullWidth = computed(() => route.meta?.isFullWidth === true)

function handleScroll() {
  if (mainScroll.value) {
    showScrollTop.value = mainScroll.value.scrollTop > 500
  }
}

function scrollToTop() {
  if (mainScroll.value) {
    mainScroll.value.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

onMounted(() => {
  if (mainScroll.value) {
    mainScroll.value.addEventListener('scroll', handleScroll)
  }
})

onUnmounted(() => {
  if (mainScroll.value) {
    mainScroll.value.removeEventListener('scroll', handleScroll)
  }
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: hsl(var(--border) / 0.8);
  border-radius: 10px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: hsl(var(--primary) / 0.5);
}
</style>
