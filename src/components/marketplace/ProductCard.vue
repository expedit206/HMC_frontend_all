<template>
  <div @click="emit('viewDetails', product)"
    class="group relative bg-white border border-border rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
    <!-- Image -->
    <div class="relative aspect-[4/3] overflow-hidden rounded-t-2xl bg-gray-100 flex items-center justify-center">
      <div v-if="
        product.image &&
        (product.image.startsWith('fas ') || product.image.startsWith('fab '))
      " class="text-6xl text-primary/30 transform group-hover:scale-110 transition-transform duration-500">
        <i :class="product.image"></i>
      </div>
      <img v-else :src="product.image || 'https://placehold.co/400x300?text=Produit'" :alt="product.name"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />

      <!-- Badges -->
      <div class="absolute top-3 left-3 flex gap-2">
        <span v-if="product.isNew" class="px-2.5 py-1 text-xs font-bold text-white bg-secondary rounded-full shadow-sm">
          Nouveau
        </span>
        <span v-if="product.discount"
          class="px-2.5 py-1 text-xs font-bold text-white bg-red-500 rounded-full shadow-sm">
          -{{ product.discount }}%
        </span>
      </div>

      <!-- Actions Overlay (Desktop) -->
      <div
        class="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center gap-3 pb-6 bg-gradient-to-t from-black/50 to-transparent">
        <button @click.stop="emit('addToCart', product)"
          class="bg-white text-gray-800 p-2.5 rounded-full shadow-lg hover:bg-primary hover:text-white transition-colors transform hover:scale-110"
          title="Ajouter au panier">
          <i class="fas fa-shopping-cart"></i>
        </button>
        <button @click.stop="emit('toggleClientFavorite', product)"
          class="bg-white text-gray-800 p-2.5 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-colors transform hover:scale-110"
          :class="{ 'text-red-500': product.isFavorite }" title="Favoris">
          <i :class="product.isFavorite ? 'fas fa-heart' : 'far fa-heart'"></i>
        </button>
        <button @click.stop="emit('viewDetails', product)"
          class="bg-white text-gray-800 p-2.5 rounded-full shadow-lg hover:bg-secondary hover:text-white transition-colors transform hover:scale-110"
          title="Voir plus">
          <i class="fas fa-eye"></i>
        </button>
      </div>
    </div>

    <!-- Content -->
    <div class="p-4">
      <!-- Category -->
      <div class="flex justify-between items-start mb-2">
        <span class="text-xs font-medium text-primary uppercase tracking-wider bg-primary/10 px-2 py-1 rounded">
          {{ product.category }}
        </span>
        <div class="flex items-center gap-1 text-yellow-500 text-xs">
          <i class="fas fa-star"></i>
          <span class="font-bold text-gray-700">{{ product.rating }}</span>
          <span class="text-gray-400">({{ product.reviews }})</span>
        </div>
      </div>

      <!-- Title -->
      <h3 class="font-bold text-gray-800 text-lg mb-1 line-clamp-1 group-hover:text-primary transition-colors">
        {{ product.name }}
      </h3>

      <!-- Location/Seller -->
      <div class="flex items-center gap-1 text-gray-500 text-xs mb-3">
        <i class="fas fa-map-marker-alt"></i>
        <span class="truncate">{{ product.location }}</span>
      </div>

      <!-- Price & Button -->
      <div class="flex items-center justify-between pt-3 border-t border-border mt-auto">
        <div class="flex flex-col">
          <span v-if="product.oldPrice" class="text-xs text-gray-400 line-through decoration-red-500">
            {{ formatPrice(product.oldPrice) }}
          </span>
          <span class="text-xl font-bold text-primary">
            {{ formatPrice(product.price) }}
          </span>
        </div>

        <!-- Mobile Action Button -->
        <button @click.stop="emit('addToCart', product)"
          class="lg:hidden bg-primary/10 text-primary p-2 rounded-full hover:bg-primary hover:text-white transition-colors">
          <i class="fas fa-plus"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["addToCart", "toggleClientFavorite", "viewDetails"]);

const formatPrice = (price) => {
  return new Intl.NumberFormat("fr-CM", {
    style: "currency",
    currency: "XAF",
    maximumFractionDigits: 0,
  }).format(price);
};
</script>

<style scoped>
/* Optional: specific styles if needed */
</style>
