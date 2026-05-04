<template>
  <div @click="emit('viewDetails', product)"
    class="group relative flex flex-col  rounded-xl p-2 transition-all active:scale-[0.97]   cursor-pointer">
    
    <div class="relative aspect-[4/3] rounded-md overflow-hidden bg-[#F8F9FA] mb-2">
      <span v-if="product.oldPrice"
        class="absolute top-1.5 left-1.5 z-10 bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow-sm">
        -{{ Math.round((1 - product.price / product.oldPrice) * 100) }}%
      </span>


      <img :src="product.image || '/placeholder-product.jpg'"
        class="w-full h-full object-cover duration-500 group-hover:scale-110"
        @error="onImageError" />

      <div v-if="product.stock === 0"
        class="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center z-20">
        <span class="bg-black/80 text-white text-[9px] px-2 py-1 rounded font-bold uppercase">Épuisé</span>
      </div>

      <div class="absolute bottom-1 right-3 flex gap-2 flex-wrap">

          <div v-if="product.location"
            class="flex items-center  text-foreground/80 text-white text-[9px] font-semibold italic p-2 py-1 border rounded-full drop-shadow-[1px_0px_2px_rgba(0,0,0,1)] ">
            <i class="fas fa-map-marker-alt drop-shadow-[1px_0px_1px_rgba(0,0,0,1)]  "></i>
            <span class="drop-shadow-[1px_0px_1px_rgba(0,0,0,1)]">{{ product.location }}</span>
          </div>
        </div>
     

    </div>

    <div class="flex flex-col flex-grow px-0.5 border-l pl-1">
      <div class="flex items-center justify-between mb-1">
        <span class="text-[9px] font-bold text-primary uppercase tracking-[0.05em]">
          {{ product.category || 'Général' }}
        </span>
        <span class="text-[8px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 font-bold uppercase tracking-wider">
          {{ product.condition || 'Neuf' }}
        </span>
      </div>

      

      <h3 class="text-[10px]  italic  text-gray-800 leading-tight line-clamp-2 min-h-[2.4em] mb-1">
        {{ product.name }}
      </h3>

      <div class="flex items-end justify-between mt-auto gap-1">
        <div class="flex flex-col min-w-0">
          <span v-if="product.oldPrice" class="text-[10px] text-gray-400 line-through leading-none mb-0.5">
            {{ formatPrice(product.oldPrice) }}
          </span>
          <span class="text-[13px] font-semibold italic text-gray-900 tracking-tight leading-none">
            {{ formatPrice(product.price) }}
          </span>
        </div>

        <!-- <button @click.stop="emit('addToCart', product)" 
          :disabled="product.stock === 0"
          class="shrink-0 w-8 h-8 bg-gray-900 text-white rounded-lg flex items-center justify-center active:bg-primary transition-colors disabled:bg-gray-200">
          <i class="fas fa-plus text-[10px]"></i>
        </button> -->
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

const emit = defineEmits(['addToCart', 'toggleClientFavorite', 'viewDetails']);

const formatPrice = (price) => {
  if (!price && price !== 0) return '—';
  return new Intl.NumberFormat('fr-CM', {
    style: 'currency',
    currency: 'XAF',
    maximumFractionDigits: 0,
  }).format(price);
};

const onImageError = (e) => {
  e.target.src = 'https://placehold.co/400x400/F8F9FA/a1a1aa?text=Produit';
};
</script>