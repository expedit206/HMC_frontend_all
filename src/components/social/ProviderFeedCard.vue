<template>
  <article
    class="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-all duration-300  my-2 p-4 flex flex-col group relative overflow-hidden text-center sm:text-left sm:flex-row gap-4 items-center sm:items-start">

    <!-- Avatar -->


    <!-- Info Centrale -->
    <div class="flex-1 min-w-0 flex flex-col">
      <div class="flex justify-between items-center">

      <div class="flex  justify-around items-center gap-2">

        <div class="relative flex-shrink-0">
          <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-primary/20 p-0.5 bg-card">
            <div class="w-full h-full rounded-full bg-muted overflow-hidden">
              <img v-if="item.avatar" :src="avatarUrl" :alt="item.name" class="w-full h-full object-cover">
              <div v-else
                class="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-secondary text-white font-bold text-xl">
                {{ initials }}
              </div>
            </div>
          </div>
        </div>

        <div class="min-w-0">
          <h3 class="font-bold text-lg text-foreground truncate group-hover:text-primary transition-colors">
            {{ item.name }}
          </h3>
          <div class="flex items-center justify-center sm:justify-start gap-2 text-sm text-muted-foreground mt-0.5">
            <span class="flex items-center text-yellow-400">
              <i class="fas fa-star text-xs"></i>
              <span class="text-foreground ml-1 font-semibold">{{ item.rating }}</span>
            </span>
            <span class="opacity-50">•</span>
            <span class="truncate"><i class="fas fa-map-marker-alt text-xs mr-1"></i>{{ item.city }}</span>
          </div>


        </div>
      </div>
      <div>

        <RouterLink :to="`/services/prestataires/${item.id}`"
          class="hidden sm:flex px-4 py-1.5 text-xs font-bold rounded-md bg-primary text-white hover:bg-primary hover:text-white transition-colors border border-transparent whitespace-nowrap">
          Voir le profil
        </RouterLink>
      </div>
      </div>


       <p class="mt-3 text-sm text-muted-foreground line-clamp-2 italic" v-if="item.bio">
        {{ item.bio }}
      </p>

      <!-- Services badges -->
      <div class="mt-3 flex flex-wrap  gap-1.5">
        <span v-for="(service, idx) in item.services" :key="idx"
          class="px-2 py-1 bg-secondary/10 text-secondary border border-secondary/20 rounded-md text-[10px] font-medium flex items-center gap-1.5 max-w-full truncate">
          <i :class="service.icon + ' text-[8px]'"></i>
          <span class="truncate">{{ service.title }}</span>
        </span>
        <span v-if="item.services_count > 3"
          class="px-2 py-1 bg-muted text-muted-foreground rounded-md text-[10px] font-medium">
          +{{ item.services_count - 3 }} autres
        </span>
        <span v-if="!item.services || item.services.length === 0"
          class="px-2 py-1 bg-muted text-muted-foreground rounded-md text-[10px] font-medium">
          Prestataire multiservices
        </span>
      </div>

     

      <!-- Bouton Mobile -->
      <RouterLink :to="`/services/prestataires/${item.id}`"
        class="sm:hidden mt-4 w-full py-2 text-sm font-bold rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors border border-transparent">
        Voir le profil
      </RouterLink>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  item: { type: Object, required: true },
})

const initials = computed(() => {
  if (!props.item.name) return '?'
  const parts = props.item.name.split(' ')
  if (parts.length > 1) return (parts[0][0] + parts[1][0]).toUpperCase()
  return props.item.name.substring(0, 2).toUpperCase()
})

const avatarUrl = computed(() => {
  if (!props.item.avatar) return null
  const img = props.item.avatar
  if (img.startsWith('http')) return img
  return `${import.meta.env.VITE_API_BASE_URL?.replace('/api', '') ?? ''}/storage/${img}`
})
</script>
