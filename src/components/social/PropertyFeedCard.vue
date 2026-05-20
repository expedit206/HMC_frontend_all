<template>
  <article
    class="bg-card border border-border md:rounded-lg overflow-hidden shadow-sm hover:shadow-sm transition-all duration-300 group  my-2">
    <!-- Image -->
    <RouterLink :to="`/annonces/${item.slug}`" class="block relative overflow-hidden">
      <div class="relative h-[12rem] md:h-[16rem] bg-gradient-to-br from-muted/60 via-muted to-muted/70">
        <img v-if="item.image" :src="imageUrl" :alt="item.title"
          class="w-full h-full object-cover transition-transform duration-500" loading="lazy" @error="onImgError" />
        <div v-else
          class="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
          <i class="fas fa-home text-4xl text-primary/30"></i>
        </div>

        <!-- Overlay Badges -->
        <div class="absolute top-3 left-3 flex gap-2 flex-wrap"></div>
        <div v-if="item.area > 0" class="absolute top-3 right-3">
          <span class="px-2 py-1 text-[10px] font-bold rounded-lg bg-black/40 backdrop-blur-md text-white shadow-sm border border-white/10 flex items-center gap-1.5">
            <i class="fas fa-vector-square text-[9px]"></i>
            {{ item.area }}m²
          </span>
        </div>

        <!-- Prix badge (REMOVED from here) -->
      </div>
    </RouterLink>

    <!-- Contenu -->
    <div class="px-4 py-2 flex flex-col justify-between h-full">


      <div v-if="item.category" class="mb-1.5">
        <span class="text-[10px] font-bold uppercase tracking-wider text-secondary bg-secondary/10 px-2 py-0.5 rounded">
          {{ item.category }}
        </span>
      </div>
      <RouterLink :to="`/annonces/${item.slug}`" class="flex items-start justify-between gap-2">
        <h3
          class="font-bold text-foreground text-base leading-tight line-clamp-2 group-hover:text-primary transition-colors flex-1">
          {{ item.title }}
        </h3>

      </RouterLink>

      <div class="flex items-center justify-between gap-1 text-muted-foreground text-sm mb-0 mt-1">
        <div>
          <i class="fas fa-map-marker-alt text-secondary text-xs"></i>
          <span>
            <span v-if="item.location"> {{ item.location }}</span>
          </span>

        </div>

        <div class="text-right shrink-0">
          <span class="text-base font-black text-secondary leading-tight">
            {{ formatPrice(item.price) }}
          </span>
        </div>

      </div>

      <!-- Caractéristiques -->
      <div class="flex items-center gap-4 text-sm text-muted-foreground mb-4">
      </div>

      <!-- Actions -->
      <div class="flex items-center justify-between border-t border-border pt-3">
        <div class="flex items-center gap-4 text-muted-foreground text-sm">
          <button @click.prevent="toggleFav"
            class="flex items-center gap-1.5 hover:text-red-500 transition-colors group/btn"
            :class="isFaved ? 'text-red-500' : ''">
            <i :class="`${isFaved ? 'fas' : 'far'} fa-heart text-base transition-transform`"></i>
            <span class="font-medium">{{ localFavsCount }}</span>
          </button>

          <button class="cursor-pointer flex items-center gap-1 hover:text-secondary transition-colors group/btn">
            <i
              class="far fa-comment-dots text-base text-muted-foreground group-hover/btn:text-secondary transition-transform"></i>
            <span class="font-bold text-muted-foreground group-hover/btn:text-secondary text-sm">
              {{ item.comment_count || 0 }}
            </span>
          </button>
          <!-- Three-dot menu -->
          <div class="relative feed-card-menu-container">
            <button @click.prevent="toggleMenu"
              class="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              <i class="fas fa-ellipsis-h"></i>
            </button>

            <!-- Dropdown -->
            <transition name="fade">
              <div v-if="isMenuOpen"
                class="absolute left-5 bottom-full mb-1 w-48 bg-card border border-border rounded-lg shadow-lg z-[100] py-1 overflow-hidden">
                <!-- Close button for mobile -->


                <button @click.stop="findSimilar"
                  class="w-full text-left px-4 py-2.5 text-sm hover:bg-muted/50 flex items-center gap-3 transition-colors text-foreground">
                  <i class="fas fa-search text-muted-foreground w-4 text-center"></i> Biens similaires
                </button>
                <div class="h-px bg-border/50 my-0.5"></div>
                <button @click.stop="hidePost"
                  class="w-full text-left px-4 py-2.5 text-sm hover:bg-muted/50 flex items-center gap-3 transition-colors text-foreground group/action">
                  <i
                    class="far fa-eye-slash text-muted-foreground group-hover/action:text-foreground w-4 text-center transition-colors"></i>
                  Masquer
                </button>
                <button @click.stop="reportPost"
                  class="w-full text-left px-4 py-2.5 text-sm hover:bg-muted/50 flex items-center gap-3 transition-colors text-destructive group/report">
                  <i class="far fa-flag group-hover/report:text-destructive w-4 text-center transition-colors"></i>
                  Signaler
                </button>
              </div>
            </transition>
          </div>
        </div>

        <div class="flex items-center gap-1 sm:gap-2">
          <!-- Share button (icon only on small viewports) -->
          <button @click.prevent="shareItem"
            class="px-2 sm:px-3 py-1.5 text-sm font-semibold rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex items-center justify-center">
            <i class="fas fa-share-alt"></i>
          </button>

          <RouterLink :to="`/annonces/${item.slug}`"
            class="px-3 sm:px-4 py-1.5 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors whitespace-nowrap">
            Voir le bien
          </RouterLink>


        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import axios from '../../axios'

const props = defineProps({
  item: { type: Object, required: true },
})

const emit = defineEmits(['open-comments', 'hide-item'])
const router = useRouter()

const isFaved = ref(false)
const localFavsCount = ref(props.item.favorites_count ?? 0)
const imgError = ref(false)

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

// ─── Actions secondaires (Menu trois points) ─────────────────────────
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const hideMenuOnClickOutside = (e) => {
  if (isMenuOpen.value && !e.target.closest('.feed-card-menu-container')) {
    isMenuOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', hideMenuOnClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', hideMenuOnClickOutside)
})

const findSimilar = () => {
  isMenuOpen.value = false
  // Navigation simple basée sur la catégorie du bien
  router.push({ path: '/explore', query: { category: props.item.category } })
}

const hidePost = () => {
  isMenuOpen.value = false
  // Émettre un événement pour que le parent masque la carte
  emit('hide-item', props.item.id)
}

const reportPost = () => {
  isMenuOpen.value = false
  alert("Merci pour votre vigilance, cette annonce a été signalée à nos équipes.")
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(4px);
}
</style>
