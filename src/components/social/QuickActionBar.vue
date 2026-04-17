<template>
  <div class="bg-card border border-border rounded-xl shadow-sm mx-4 my-2 p-4">
    <div class="flex gap-3 items-center mb-4">
      <div class="w-10 h-10 rounded-full border border-border bg-muted overflow-hidden flex-shrink-0">
        <img v-if="userAvatar" :src="userAvatar" alt="Avatar" class="w-full h-full object-cover">
        <div v-else class="w-full h-full flex items-center justify-center bg-primary text-white font-bold">
          {{ userInitials }}
        </div>
      </div>
      <div 
        class="flex-1 bg-muted hover:bg-muted/80 transition-colors border border-border rounded-full px-4 py-2.5 text-sm text-muted-foreground cursor-text"
        @click="focusAction"
      >
        Que souhaitez-vous faire, {{ firstName }} ?
      </div>
    </div>
    
    <div class="flex items-center justify-between border-t border-border pt-3">
      <div class="flex items-center flex-wrap gap-1 sm:gap-2 w-full justify-between sm:justify-start">
        <RouterLink to="/publier-bien" class="flex items-center gap-2 text-primary hover:bg-primary/10 px-2 sm:px-3 py-1.5 rounded transition-colors group">
          <i class="fas fa-home group-hover:scale-110 transition-transform"></i>
          <span class="text-xs sm:text-sm font-medium">Louer un bien</span>
        </RouterLink>
        <RouterLink to="/marketplace/demandes" class="flex items-center gap-2 text-secondary hover:bg-secondary/10 px-2 sm:px-3 py-1.5 rounded transition-colors group">
          <i class="fas fa-tools group-hover:scale-110 transition-transform"></i>
          <span class="text-xs sm:text-sm font-medium">Chercher un pro</span>
        </RouterLink>
        <RouterLink to="/marketplace" class="flex items-center gap-2 text-green-600 hover:bg-green-600/10 px-2 sm:px-3 py-1.5 rounded transition-colors group">
          <i class="fas fa-shopping-bag group-hover:scale-110 transition-transform"></i>
          <span class="text-xs sm:text-sm font-medium hidden sm:inline">Marketplace</span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()

const firstName = computed(() => {
  const name = authStore.user?.name || ''
  return name.split(' ')[0] || 'Ami'
})

const userInitials = computed(() => {
  const name = authStore.user?.name || '?'
  return name.substring(0, 2).toUpperCase()
})

const userAvatar = computed(() => {
  const img = authStore.user?.avatar
  if (!img) return null
  if (img.startsWith('http')) return img
  return `${import.meta.env.VITE_API_BASE_URL?.replace('/api', '') ?? ''}/storage/${img}`
})

function focusAction() {
  // Vous pouvez ouvrir une modal ici pour choisir l'action "Publier"
  // ou rediriger vers une page appropriée.
}
</script>
