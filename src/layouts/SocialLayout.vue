<template>
  <div class="min-h-screen bg-background flex flex-col">
    <!-- Header Global -->
    <Header />
    <CartDrawer />

    <div class="flex flex-1 w-full mx-auto max-w-[1600px] overflow-hidden">
      <!-- Colonne Gauche -->
      <component :is="sidebarComponent" v-if="hasSidebar" />

      <!-- Colonne Centrale -->
      <main class="flex-1 w-full min-w-0 bg-background scroll-smooth relative"
        :class="noMainScroll ? 'h-[calc(100vh-64px)] overflow-hidden' : 'h-[calc(100vh-80px)] overflow-y-auto custom-scrollbar'"
        ref="mainScroll">
        <!-- Marketplace Sub-Header (Mobile Only) -->
        <div v-if="isMarketplace && hasSidebar"
          class="md:hidden sticky top-0 z-40 bg-card border-b border-border px-4 py-3 flex items-center justify-between">
          <button @click="sidebarStore.toggleMobile()" class="flex items-center gap-2 text-primary">
            <i class="fas fa-bars"></i>
            <!-- <span class="text-[10px] font-bold uppercase tracking-widest">Navigation Marketplace</span> -->
          </button>
        </div>

        <div :class="[
          isFullWidth ? 'w-full ' : (showRightSidebar ? 'mx-auto ' : 'max-w-7xl mx-auto'),
          isFullWidth ? '' :(route.name !== 'SocialFeed'? 'px-4':'px-0'),  ' pt-0 sm:px-',
          (hideFooter || noMainScroll) ? '' : 'pb-20',
          'transition-all duration-300 h-full pb-20'
        ]">
          <RouterView />
        </div>

        <!-- Pied de page -->

        <!-- Bouton remonter -->
        <!-- <button v-show="showScrollTop" @click="scrollToTop"
          class="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-primary text-white shadow-lg flex items-center justify-center hover:bg-primary/90 transition-all z-50 hover:scale-110">
          <i class="fas fa-arrow-up"></i>
        </button> -->
      </main>

      <!-- Colonne Droite (Conditionnelle) -->
      <RightSidebar v-if="showRightSidebar" :stats="feedStore.stats" />
    </div>

    <Footer v-if="!showRightSidebar && !hideFooter" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute, RouterView } from 'vue-router'
import Header from '@/Header.vue'
import CartDrawer from '@/marketplace/CartDrawer.vue'
import LeftSidebar from '@/social/LeftSidebar.vue'
import MarketplaceSidebar from '@/marketplace/MarketplaceSidebar.vue'
import RightSidebar from '@/social/RightSidebar.vue'
import Footer from '@/Footer.vue'
import { useFeedStore } from '../stores/feed'
import { useSidebarStore } from '../stores/sidebar'

const route = useRoute()
const feedStore = useFeedStore()
const sidebarStore = useSidebarStore()
const mainScroll = ref(null)
const showScrollTop = ref(false)

const isMarketplace = computed(() => route.path.startsWith('/marketplace'))
const sidebarComponent = computed(() => isMarketplace.value ? MarketplaceSidebar : LeftSidebar)

const hasSidebar = computed(() => route.meta?.hasSidebar !== false)
const showRightSidebar = computed(() => route.meta?.showRightSidebar === true)
const isFullWidth = computed(() => route.meta?.isFullWidth === true)
const hideFooter = computed(() => route.meta?.hideFooter === true)
const noMainScroll = computed(() => route.meta?.noMainScroll === true)

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
