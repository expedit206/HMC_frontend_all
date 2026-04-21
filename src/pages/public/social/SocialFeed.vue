<template>
  <div class="social-feed">
    
    <!-- Boutons Raccourcis -->
    <QuickActionBar class="mb-4" />

    <!-- Stories (Uniquement page 1) -->
    <StoriesBar v-if="feedStore.stories?.length > 0" :stories="feedStore.stories" class="mb-6" />

    <!-- Loading Initial -->
    <div v-if="feedStore.loading && feedStore.feedItems.length === 0" class="space-y-0 mx-4 md:mx-0">
      <SkeletonLoader :type="getRandomSkeleton()" v-for="i in 5" :key="'sk'+i" />
    </div>

    <!-- Feed Content Interleaved -->
    <div v-else class="flex flex-col">
      <TransitionGroup name="feed" tag="div">
        <template v-for="(item, index) in feedStore.feedItems" :key="item.feed_type + '-' + item.id + '-' + index">
          
          <PropertyFeedCard v-if="item.feed_type === 'property'" :item="item" @open-comments="openCommentModal" />
          
          <ProductFeedCard v-else-if="item.feed_type === 'product'" :item="item" />
          
          <ServiceRequestFeedCard v-else-if="item.feed_type === 'service_request'" :item="item" />
          
          <ProviderFeedCard v-else-if="item.feed_type === 'provider'" :item="item" />
          
        </template>
      </TransitionGroup>
      
      <!-- Loading More Skeletons -->
      <div v-if="feedStore.loadingMore" class="w-full mt-4 space-y-0">
        <SkeletonLoader :type="getRandomSkeleton()" v-for="i in 3" :key="'more-sk'+i" />
      </div>
      
      <!-- Infinite Scroll Sentinel -->
      <div ref="infiniteSentinel" class="h-10 mt-4 flex items-center justify-center">
        <p v-if="!feedStore.hasMore && feedStore.feedItems.length > 0 && !feedStore.loadingMore" class="text-xs text-muted-foreground italic bg-muted px-4 py-1.5 rounded-full">
          Vous avez tout vu ! 🎉
        </p>
      </div>
      
      <!-- Empty state global -->
      <div v-if="feedStore.isEmpty" class="text-center py-20">
        <i class="fas fa-satellite-dish text-6xl text-muted/50 mb-4 block"></i>
        <h3 class="text-lg font-bold text-foreground">Le feed est vide</h3>
        <p class="text-sm text-muted-foreground mt-2">Revenez plus tard pour découvrir des nouveautés.</p>
        <button @click="feedStore.refreshFeed" class="mt-4 btn-primary">Rafraîchir</button>
      </div>

    </div>

    <!-- Modale des commentaires contextuelle -->
    <CommentModal 
      :is-open="isCommentModalOpen" 
      :item="activeCommentItem" 
      @close="closeCommentModal" 
      @updated-count="updateCommentCount"
    />

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
// import { useFeedStore } from '../../stores/feed'
import { useFeedStore } from '../../../stores/feed'
// Components
import QuickActionBar from '../../../components/social/QuickActionBar.vue'
import StoriesBar from '../../../components/social/StoriesBar.vue'
import PropertyFeedCard from '../../../components/social/PropertyFeedCard.vue'
import ProductFeedCard from '../../../components/social/ProductFeedCard.vue'
import ServiceRequestFeedCard from '../../../components/social/ServiceRequestFeedCard.vue'
import ProviderFeedCard from '../../../components/social/ProviderFeedCard.vue'
import SkeletonLoader from '../../../components/SkeletonLoader.vue'
import CommentModal from '../../../components/social/CommentModal.vue'

const feedStore = useFeedStore()
const infiniteSentinel = ref(null)
let observer = null

const getRandomSkeleton = () => {
  const types = ['feed_card_large', 'feed_card_grid', 'feed_card_text'];
  return types[Math.floor(Math.random() * types.length)];
}

const isCommentModalOpen = ref(false)
const activeCommentItem = ref(null)

const openCommentModal = (item) => {
  activeCommentItem.value = item
  isCommentModalOpen.value = true
}

const closeCommentModal = () => {
  isCommentModalOpen.value = false
  setTimeout(() => activeCommentItem.value = null, 300) // delay pour éviter un saut visuel
}

const updateCommentCount = (count) => {
  if (activeCommentItem.value) {
    activeCommentItem.value.review_count = count
  }
}

onMounted(async () => {
  // Charger la data si pas encore chargée
  if (!feedStore.initialized) {
    await feedStore.loadFeed()
  }

  // Setup infinite scroll observer
  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && feedStore.hasMore && !feedStore.loadingMore) {
      feedStore.loadMore()
    }
  }, { threshold: 0.1, rootMargin: '4000px' })

  if (infiniteSentinel.value) {
    observer.observe(infiniteSentinel.value)
  }
})

// Watch if sentinel element changes (due to v-if/v-else changes)
watch(infiniteSentinel, (newVal) => {
  if (observer) observer.disconnect()
  if (newVal && observer) {
    observer.observe(newVal)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
.feed-move,
.feed-enter-active,
.feed-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.feed-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}
.feed-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
.feed-leave-active {
  position: absolute;
}
</style>
