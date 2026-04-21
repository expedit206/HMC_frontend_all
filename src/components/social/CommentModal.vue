<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex justify-end bg-background/80 backdrop-blur-sm sm:items-center sm:justify-center">
      
      <!-- Fond assombri mobile -->
      <div class="absolute inset-0 z-0" @click="close"></div>

      <!-- Conteneur Modal (Style "BottomSheet" sur mobile, Modal au centre sur Desktop) -->
      <div 
        class="relative z-10 w-full h-[85vh] sm:h-[80vh] sm:max-h-[600px] sm:w-[500px] sm:rounded-2xl bg-card border-t sm:border border-border shadow-2xl flex flex-col animate-in slide-in-from-bottom sm:slide-in-from-bottom-5 duration-300 mt-auto sm:mt-0"
      >
        <!-- Header -->
        <div class="flex items-center justify-between p-4 border-b border-border shrink-0">
          <div class="flex items-center gap-3">
            <h2 class="font-bold text-foreground text-lg flex items-center gap-2">
               <i class="fas fa-star text-amber-500"></i>
               Avis
            </h2>
            <span class="px-2 py-0.5 bg-muted text-muted-foreground rounded-full text-xs font-bold">{{ reviewStats?.total || 0 }}</span>
          </div>
          <button @click="close" class="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <!-- Body: Liste des commentaires -->
        <div class="flex-1 overflow-y-auto p-4 space-y-5 bg-background">
          <!-- Loading state -->
           <div v-if="reviewsLoading" class="space-y-4">
              <div v-for="n in 3" :key="n" class="animate-pulse flex gap-3">
                  <div class="w-10 h-10 bg-muted rounded-full"></div>
                  <div class="flex-1 space-y-2">
                    <div class="h-3 w-28 bg-muted rounded"></div>
                    <div class="h-3 w-full bg-muted rounded"></div>
                  </div>
              </div>
            </div>

            <!-- Empty state -->
            <div v-else-if="reviews.length === 0" class="py-10 text-center">
              <i class="far fa-star text-4xl text-muted-foreground/30 mb-3"></i>
              <p class="text-sm text-muted-foreground">Aucun avis pour le moment.</p>
              <p class="text-xs text-muted-foreground mt-1">Soyez le premier à partager votre expérience !</p>
            </div>

            <!-- Liste des avis -->
            <div v-else class="space-y-5">
              <div v-for="r in reviews" :key="r.id" class="border-b border-border pb-4 last:border-0 last:pb-0">
                <div class="flex items-start justify-between mb-2">
                  <div class="flex items-center gap-3">
                    <div v-if="r.user?.avatar" class="w-8 h-8 rounded-full overflow-hidden shrink-0">
                       <UserAvatar :user="r.user" size="sm" />
                    </div>
                    <div v-else class="w-8 h-8 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xs shrink-0">
                      {{ r.user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2) }}
                    </div>
                    <div>
                      <h4 class="font-semibold text-foreground text-sm leading-none">{{ r.user?.name }}</h4>
                      <div class="flex items-center gap-0.5 mt-1">
                        <i v-for="s in 5" :key="s" :class="s <= r.rating ? 'fas fa-star' : 'far fa-star'" class="text-amber-400 text-[10px]"></i>
                      </div>
                    </div>
                  </div>
                  <span class="text-[10px] text-muted-foreground">{{ new Date(r.created_at).toLocaleDateString('fr-FR') }}</span>
                </div>
                <p class="text-foreground/80 text-sm leading-relaxed pl-11">{{ r.comment }}</p>
              </div>

              <!-- Pagination -->
              <div v-if="reviewPagination.last_page > 1" class="flex justify-center gap-2 pt-2">
                <button v-for="p in reviewPagination.last_page" :key="p"
                  @click="fetchReviews(p)"
                  :class="p === reviewPagination.current_page ? 'bg-secondary text-secondary-foreground' : 'bg-muted/20 text-muted-foreground hover:bg-muted/40'"
                  class="w-7 h-7 rounded-md text-xs font-bold transition-colors">{{ p }}</button>
              </div>
            </div>
        </div>

        <!-- Footer: Zone de saisie -->
        <div class="p-4 border-t border-border bg-card shrink-0">
          <div v-if="!authStore.user" class="text-center py-2 text-sm text-muted-foreground">
             Veuillez vous <RouterLink :to="{ name: 'Connexion' }" class="text-primary font-bold hover:underline">connecter</RouterLink> pour laisser un avis.
          </div>
          <div v-else>
             <!-- Sélection des étoiles -->
             <div class="flex items-center gap-1 mb-2">
                <button v-for="s in 5" :key="s" @click="newReview.rating = s" @mouseover="reviewHover = s" @mouseleave="reviewHover = 0"
                  class="text-lg transition-transform hover:scale-110 focus:outline-none">
                  <i :class="s <= (reviewHover || newReview.rating) ? 'fas fa-star text-amber-400' : 'far fa-star text-muted-foreground'"></i>
                </button>
             </div>
             
             <!-- Input txt -->
             <div class="flex gap-2 relative">
                <textarea v-model="newReview.comment" :disabled="isSubmittingReview"
                   placeholder="Rédigez votre avis..." rows="1"
                   class="flex-1 resize-none bg-muted/30 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
                ></textarea>
                <button @click="submitReview" :disabled="isSubmittingReview || !newReview.comment.trim() || !newReview.rating"
                  class="w-11 h-11 shrink-0 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50">
                  <i v-if="isSubmittingReview" class="fas fa-spinner fa-spin"></i>
                  <i v-else class="fas fa-paper-plane"></i>
                </button>
             </div>
             <p v-if="reviewError" class="text-red-500 text-[10px] mt-1">{{ reviewError }}</p>
          </div>
        </div>

      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import axios from '../../axios'
import UserAvatar from '../common/UserAvatar.vue'

const props = defineProps({
  isOpen: { type: Boolean, required: true },
  item: { type: Object, default: null } // The feed item (property, product...)
})

const emit = defineEmits(['close', 'updated-count'])

const authStore = useAuthStore()

const reviews = ref([])
const reviewStats = ref(null)
const reviewsLoading = ref(false)
const reviewPagination = ref({ last_page: 1, current_page: 1 })

const newReview = ref({ rating: 0, comment: '' })
const isSubmittingReview = ref(false)
const reviewError = ref('')
const reviewHover = ref(0)

watch(() => props.isOpen, (newVal) => {
  if (newVal && props.item) {
    newReview.value = { rating: 0, comment: '' }
    fetchReviews()
  } else {
    // modal fermée
    reviews.value = []
  }
})

const close = () => {
  emit('close')
}

const fetchReviews = async (page = 1) => {
  if (!props.item) return
  reviewsLoading.value = true
  try {
    // Si item.feed_type === 'property', l'endpoint est /api/properties/SLUG/reviews
    // S'il y a d'autres types plus tard, il faudra dynamiser l'endpoint.
    let endpoint = `/api/properties/${props.item.slug}/reviews`
    if (props.item.feed_type === 'product') {
       endpoint = `/api/products/${props.item.slug}/reviews` // par exemple
    }

    const { data } = await axios.get(endpoint, { params: { page } })
    if (data.success) {
      reviews.value = data.data.data
      reviewStats.value = data.stats
      reviewPagination.value = { last_page: data.data.last_page, current_page: data.data.current_page }
      emit('updated-count', data.stats.total)
    }
  } catch (err) {
    console.error('Erreur chargement avis:', err)
  } finally {
    reviewsLoading.value = false
  }
}

const submitReview = async () => {
  reviewError.value = ''
  if (!newReview.value.rating) { reviewError.value = 'Sélectionnez une note.'; return; }
  
  isSubmittingReview.value = true
  try {
    let endpoint = `/api/properties/${props.item.slug}/reviews`
    const payload = { rating: newReview.value.rating, comment: newReview.value.comment, title: '' }
    
    const { data } = await axios.post(endpoint, payload)
    if (data.success) {
      newReview.value = { rating: 0, comment: '' }
      await fetchReviews()
    }
  } catch (err) {
    reviewError.value = err.response?.data?.message || 'Erreur soumission.'
  } finally {
    isSubmittingReview.value = false
  }
}
</script>
