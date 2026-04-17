<template>
  <div class="flex flex-1 w-full mx-auto max-w-[1600px] overflow-hidden">
    <!-- Colonne Gauche -->
    <LeftSidebar />

    <!-- Colonne Centrale (Feed) -->
    <main class="flex-1 w-full min-w-0 bg-background overflow-y-auto custom-scrollbar h-[calc(100vh-80px)] scroll-smooth relative" ref="mainScroll">
      <div class="max-w-2xl mx-auto pb-20 pt-4">
        <slot></slot>
      </div>
      
      <!-- Bouton remonter (optionnel) -->
      <button 
        v-show="showScrollTop"
        @click="scrollToTop"
        class="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-primary text-white shadow-lg flex items-center justify-center hover:bg-primary/90 transition-all z-50 hover:scale-110"
      >
        <i class="fas fa-arrow-up"></i>
      </button>
    </main>

    <!-- Colonne Droite -->
    <RightSidebar :stats="stats" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import LeftSidebar from './LeftSidebar.vue'
import RightSidebar from './RightSidebar.vue'

defineProps({
  stats: {
    type: Object,
    default: null
  }
})

const mainScroll = ref(null)
const showScrollTop = ref(false)

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
