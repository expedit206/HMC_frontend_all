<template>
  <div class="relative py-2 overflow-hidden">
    <!-- Header avec titre et navigation -->
    <div class="flex items-center justify-between mb-4 px-2">
      <h3 class="text-sm font-black text-foreground uppercase tracking-[0.2em] flex items-center gap-2">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
        </span>
        En vedette
      </h3>
      <div class="flex gap-1">
        <button @click="scroll('left')" class="w-7 h-7 rounded-full bg-card border border-border flex items-center justify-center text-xs hover:bg-muted transition-colors shadow-sm">
          <i class="fas fa-chevron-left"></i>
        </button>
        <button @click="scroll('right')" class="w-7 h-7 rounded-full bg-card border border-border flex items-center justify-center text-xs hover:bg-muted transition-colors shadow-sm">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
    
    <div class="flex gap-4 overflow-x-auto custom-scrollbar pb-4 px-2 snap-x" ref="scrollContainer">
      
      <!-- Upload Story (Bouton d'action premium) -->
      <RouterLink to="/publier-bien" class="flex-shrink-0 w-32 h-48 rounded-2xl overflow-hidden relative snap-start group cursor-pointer shadow-lg hover:shadow-xl transition-all border-2 border-dashed border-muted-foreground/20 hover:border-primary/50 bg-muted/20">
        <div class="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center">
          <div class="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <i class="fas fa-plus"></i>
          </div>
          <span class="text-[11px] font-black uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors">
            Publier<br>une exclu
          </span>
        </div>
      </RouterLink>

      <!-- Stories Items (Card Style Premium) -->
      <RouterLink 
        v-for="story in stories" 
        :key="story.id" 
        :to="`/annonces/${story.slug}`" 
        class="flex-shrink-0 w-32 h-48 rounded-2xl overflow-hidden relative snap-start group shadow-lg hover:shadow-xl transition-all"
      >
        <!-- Background Image -->
        <img 
          v-if="story.image" 
          :src="getImageUrl(story.image)" 
          :alt="story.title" 
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        >
        <div v-else class="absolute inset-0 bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
          <i class="fas fa-home text-2xl text-primary/40"></i>
        </div>

        <!-- Gradient Overlay -->
        <div class="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/30 group-hover:from-black/90 transition-all"></div>

        <!-- Badge Ville -->
        <div class="absolute top-2 left-2 z-10">
          <span class="px-1.5 py-0.5 bg-black/40 backdrop-blur-md rounded-md text-[8px] font-black uppercase text-white tracking-widest border border-white/10">
            {{ story.city }}
          </span>
        </div>

        <!-- Avatar du vendeur (Simulé ou réel) -->
        <div class="absolute top-2 right-2 z-10 ring-2 ring-secondary rounded-full overflow-hidden w-6 h-6 border-2 border-white shadow-sm">
          <img :src="`https://i.pravatar.cc/100?u=${story.id}`" class="w-full h-full object-cover">
        </div>

        <!-- Info en bas -->
        <div class="absolute bottom-0 left-0 right-0 p-3 z-10">
          <div class="text-[10px] font-black text-secondary leading-tight mb-0.5">{{ formatPrice(story.price) }}</div>
          <h4 class="text-[11px] font-bold text-white leading-tight line-clamp-2">{{ story.title }}</h4>
        </div>
        
        <!-- Hover indicator line -->
        <div class="absolute bottom-0 left-0 h-1 bg-secondary w-0 group-hover:w-full transition-all duration-300"></div>
      </RouterLink>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  stories: {
    type: Array,
    default: () => []
  }
})

const scrollContainer = ref(null)

function scroll(direction) {
  if (scrollContainer.value) {
    const scrollAmount = 300
    scrollContainer.value.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    })
  }
}

function getImageUrl(imgPath) {
  if (!imgPath) return null
  if (imgPath.startsWith('http')) return imgPath
  return `${import.meta.env.VITE_API_BASE_URL?.replace('/api', '') ?? ''}/storage/${imgPath}`
}

function formatPrice(price) {
  if (!price) return 'Sur demande'
  // Ne garder que le nombre abrévié si possible pour le petit espace
  if (price >= 1000000) return (price / 1000000).toFixed(1) + 'M'
  if (price >= 1000) return (price / 1000).toFixed(0) + 'k'
  return new Intl.NumberFormat('fr-FR').format(price)
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  height: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: hsl(var(--border));
  border-radius: 4px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: hsl(var(--muted-foreground)/0.3);
}
</style>
