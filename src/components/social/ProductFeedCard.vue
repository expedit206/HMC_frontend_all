<template>
  <article class="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group flex flex-row mx-4 my-2 h-36">
    <!-- Image -->
    <RouterLink :to="`/marketplace/${item.id}`" class="block relative w-1/3 min-w-[120px] max-w-[150px] bg-muted overflow-hidden flex-shrink-0">
      <img
        v-if="item.image"
        :src="imageUrl"
        :alt="item.name"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
        @error="onImgError"
      />
      <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
        <i class="fas fa-box-open text-3xl text-primary/30"></i>
      </div>
      
      <!-- Badge New/Discount -->
      <div class="absolute top-2 left-2 flex flex-col gap-1">
        <span v-if="item.is_new" class="px-1.5 py-0.5 text-[10px] uppercase tracking-wider font-bold rounded bg-green-500 text-white shadow-sm">
          Nouveau
        </span>
        <span v-if="item.discount" class="px-1.5 py-0.5 text-[10px] font-bold rounded bg-red-500 text-white shadow-sm flex items-center gap-0.5">
          <i class="fas fa-arrow-down text-[8px]"></i>{{ item.discount }}%
        </span>
      </div>
    </RouterLink>

    <!-- Contenu -->
    <div class="p-3 flex flex-col flex-1 min-w-0">
      <div class="flex justify-between items-start gap-2 mb-1">
        <span class="text-[10px] uppercase tracking-wider font-semibold text-primary/80 bg-primary/10 px-1.5 py-0.5 rounded flex-shrink-0">
          {{ item.category || 'Marketplace' }}
        </span>
        <span class="text-xs text-muted-foreground whitespace-nowrap">{{ item.date }}</span>
      </div>

      <RouterLink :to="`/marketplace/${item.id}`" class="mb-auto min-w-0">
        <h3 class="font-semibold text-foreground text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
          {{ item.name }}
        </h3>
      </RouterLink>

      <div class="flex items-center gap-1 mt-1 mb-2">
        <div class="flex text-yellow-400 text-[10px]">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star-half-alt"></i>
        </div>
        <span class="text-[10px] text-muted-foreground border-l border-border pl-1 ml-1" v-if="item.reviews > 0">
          {{ item.reviews }} avis
        </span>
      </div>

      <div class="flex items-center justify-between mt-auto pt-2 border-t border-border">
        <div class="flex flex-col">
          <span class="font-bold text-sm text-foreground leading-none">{{ formatPrice(item.price) }}</span>
          <span v-if="item.old_price" class="text-[10px] text-muted-foreground line-through decoration-red-500/50 mt-0.5">
            {{ formatPrice(item.old_price) }}
          </span>
        </div>
        
        <button @click.prevent="addToCart" class="w-8 h-8 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer group/btn" title="Ajouter au panier">
          <i class="fas fa-shopping-cart text-xs group-hover/btn:scale-110 transition-transform"></i>
        </button>
      </div>
    </div>
  </article>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
// Si vous avez un store de panier, importez-le ici
// import { useCartStore } from '../../stores/cart'

const props = defineProps({
  item: { type: Object, required: true },
})

const imgError = ref(false)
// const cartStore = useCartStore()

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
  if (!price) return ''
  return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA'
}

function addToCart() {
  // cartStore.addItem(props.item)
  alert('Ajouté au panier: ' + props.item.name)
}
</script>
