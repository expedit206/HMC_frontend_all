<template>
  <article class="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group mx-4 my-2">
    <!-- Image -->
    <RouterLink :to="`/annonces/${item.slug}`" class="block relative overflow-hidden">
      <div class="relative h-52 bg-muted">
        <img
          v-if="item.image"
          :src="imageUrl"
          :alt="item.title"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          @error="onImgError"
        />
        <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
          <i class="fas fa-home text-4xl text-primary/30"></i>
        </div>

        <!-- Badges -->
        <div class="absolute top-3 left-3 flex gap-2 flex-wrap">
          <span class="px-2 py-0.5 text-xs font-semibold rounded-full bg-primary text-primary-foreground shadow-sm">
            À louer
          </span>
          <span v-if="item.category" class="px-2 py-0.5 text-xs font-semibold rounded-full bg-card/90 text-foreground shadow-sm backdrop-blur-sm">
            {{ item.category }}
          </span>
        </div>

        <!-- Prix badge -->
        <div class="absolute bottom-3 right-3">
          <span class="px-3 py-1 text-sm font-bold rounded-full bg-secondary text-secondary-foreground shadow-md">
            {{ formatPrice(item.price) }}
          </span>
        </div>
      </div>
    </RouterLink>

    <!-- Contenu -->
    <div class="p-4">
      <RouterLink :to="`/annonces/${item.slug}`">
        <h3 class="font-semibold text-foreground text-base leading-tight line-clamp-1 group-hover:text-primary transition-colors mb-1">
          {{ item.title }}
        </h3>
      </RouterLink>

      <div class="flex items-center gap-1 text-muted-foreground text-sm mb-3">
        <i class="fas fa-map-marker-alt text-secondary text-xs"></i>
        <span>{{ item.city }}<span v-if="item.neighborhood"> — {{ item.neighborhood }}</span></span>
      </div>

      <!-- Caractéristiques -->
      <div class="flex items-center gap-4 text-sm text-muted-foreground mb-4">
        <span v-if="item.bedrooms > 0" class="flex items-center gap-1">
          <i class="fas fa-bed text-xs text-primary/60"></i>
          {{ item.bedrooms }} ch.
        </span>
        <span v-if="item.bathrooms > 0" class="flex items-center gap-1">
          <i class="fas fa-bath text-xs text-primary/60"></i>
          {{ item.bathrooms }} sdb.
        </span>
        <span v-if="item.area > 0" class="flex items-center gap-1">
          <i class="fas fa-vector-square text-xs text-primary/60"></i>
          {{ item.area }}m²
        </span>
        <span class="flex items-center gap-1 ml-auto">
          <i class="fas fa-clock text-xs text-primary/60"></i>
          {{ item.date }}
        </span>
      </div>

      <!-- Actions -->
      <div class="flex items-center justify-between border-t border-border pt-3">
        <div class="flex items-center gap-4 text-muted-foreground text-sm">
          <button @click.prevent="toggleFav"
            class="flex items-center gap-1.5 hover:text-red-500 transition-colors group/btn"
            :class="isFaved ? 'text-red-500' : ''">
            <i :class="`${isFaved ? 'fas' : 'far'} fa-heart text-base group-hover/btn:scale-110 transition-transform`"></i>
            <span class="font-medium">{{ localFavsCount }}</span>
          </button>
          
          <button @click.prevent="$emit('open-comments', item)" 
            class="cursor-pointer flex items-center gap-1 hover:text-amber-500 transition-colors group/btn">
            <i :class="item.rating > 0 ? 'fas text-amber-400' : 'far text-muted-foreground'" class="fa-star text-base group-hover/btn:scale-110 transition-transform"></i>
            <span v-if="item.rating > 0" class="font-bold text-amber-600 dark:text-amber-400">
              {{ item.rating }}
              <span class="text-xs font-normal text-muted-foreground ml-0.5">({{ item.review_count || item.reviews_count || 0 }})</span>
            </span>
            <span v-else class="font-medium text-muted-foreground">Avis</span>
          </button>
        </div>
        
        <div class="flex items-center gap-2">
          <button @click.prevent="shareItem"
            class="px-3 py-1.5 text-sm font-semibold rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors active:scale-95 flex items-center gap-1.5">
            <i class="fas fa-share-alt"></i> Partager
          </button>
          <RouterLink :to="`/annonces/${item.slug}`"
            class="px-4 py-1.5 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors active:scale-95">
            Voir le bien
          </RouterLink>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import axios from '../../axios'

const props = defineProps({
  item: { type: Object, required: true },
})

const emit = defineEmits(['open-comments'])

const isFaved         = ref(false)
const localFavsCount  = ref(props.item.favorites_count ?? 0)
const imgError        = ref(false)

const imageUrl = computed(() => {
  if (imgError.value || !props.item.image) return null
  const img = props.item.image
  if (img.startsWith('http')) return img
  return `${import.meta.env.VITE_API_BASE_URL?.replace('/api', '') ?? ''}/storage/${img}`
})

function onImgError() {
  imgError.value = true
}

function formatPrice(price) {
  if (!price) return 'Sur demande'
  return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA/mois'
}

async function toggleFav() {
  isFaved.value = !isFaved.value
  localFavsCount.value += isFaved.value ? 1 : -1
  try {
    await axios.post('/api/tenant/favorites/toggle', { property_id: props.item.id })
  } catch {
    // rollback si erreur
    isFaved.value = !isFaved.value
    localFavsCount.value += isFaved.value ? 1 : -1
  }
}

async function shareItem() {
  const shareUrl = window.location.origin + '/annonces/' + props.item.slug
  if (navigator.share) {
    try {
      await navigator.share({
        title: props.item.title,
        text: 'Découvrez ce bien impressionnant sur Home Cameroon !',
        url: shareUrl,
      })
    } catch (err) {
      console.error('Erreur lors du partage :', err)
    }
  } else {
    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(shareUrl)
      alert('Lien copié dans le presse-papiers !')
    } catch (err) {
      console.error('Failed to copy', err)
    }
  }
}
</script>
