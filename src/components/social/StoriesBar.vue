<template>
  <div class="bg-card border border-border rounded-xl shadow-sm mx-4 my-4 p-4 overflow-hidden relative">
    <h3 class="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
      <i class="fas fa-bolt text-yellow-500"></i> À la une
    </h3>
    
    <div class="flex gap-3 overflow-x-auto custom-scrollbar pb-2 snap-x" ref="scrollContainer">
      
      <!-- Upload Story (Bouton d'action) -->
      <RouterLink to="/publier-bien" class="flex flex-col items-center gap-1.5 flex-shrink-0 w-24 snap-start group cursor-pointer">
        <div class="w-16 h-16 rounded-full border-2 border-dashed border-primary/50 flex items-center justify-center bg-primary/5 group-hover:bg-primary/10 transition-colors">
          <i class="fas fa-plus text-primary text-xl"></i>
        </div>
        <span class="text-xs font-semibold text-center text-foreground group-hover:text-primary leading-tight">Publier<br>un bien</span>
      </RouterLink>

      <!-- Stories Items -->
      <RouterLink v-for="story in stories" :key="story.id" :to="`/annonces/${story.slug}`" class="flex flex-col items-center gap-1.5 flex-shrink-0 w-24 snap-start group">
        <div class="relative w-16 h-16 rounded-full p-0.5" style="background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%);">
          <div class="w-full h-full rounded-full border-2 border-card overflow-hidden bg-muted">
            <img v-if="story.image" :src="getImageUrl(story.image)" :alt="story.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" @error="e => e.target.style.display='none'">
            <div v-else class="w-full h-full flex items-center justify-center bg-primary/20">
              <i class="fas fa-home text-primary"></i>
            </div>
          </div>
        </div>
        <span class="text-[10px] font-medium text-center text-muted-foreground w-full truncate px-1 group-hover:text-foreground transition-colors">
          {{ formatPrice(story.price) }}
        </span>
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
