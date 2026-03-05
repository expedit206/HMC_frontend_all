<template>
  <div class="bg-gray-50 min-h-screen pb-20">
    <div
      v-if="isLoading"
      class="flex flex-col items-center justify-center py-40"
    >
      <div
        class="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"
      ></div>
      <p class="text-gray-500 font-bold uppercase tracking-widest text-xs">
        Chargement de l'article...
      </p>
    </div>

    <div
      v-else-if="item"
      class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <!-- Breadcrumbs -->
      <nav class="flex mb-8 text-sm font-medium text-gray-500 gap-2">
        <router-link :to="{ name: 'MarketplaceIndex' }" class="hover:text-primary"
          >Marketplace</router-link
        >
        <span>/</span>
        <span class="text-gray-900 capitalize">{{ item.category }}</span>
      </nav>

      <div
        class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div class="flex flex-col lg:flex-row">
          <!-- Left: Image Section -->
          <div class="lg:w-1/2 p-8 lg:p-12 bg-gray-50/50">
            <div
              class="aspect-square rounded-2xl overflow-hidden bg-white shadow-inner flex items-center justify-center relative"
            >
              <img
                v-if="item.image && !item.image.startsWith('fas ')"
                :src="item.image"
                :alt="item.name"
                class="w-full h-full object-contain"
              />
              <div v-else class="text-9xl text-primary/20">
                <i :class="item.image || 'fas fa-box'"></i>
              </div>

              <div
                v-if="item.isNew"
                class="absolute top-6 left-6 px-4 py-1.5 bg-secondary text-white text-xs font-black uppercase rounded-full shadow-lg"
              >
                Nouveau
              </div>
            </div>

            <!-- Thumbnails (Placeholder) -->
            <div class="grid grid-cols-4 gap-4 mt-6">
              <div
                v-for="i in 4"
                :key="i"
                class="aspect-square rounded-xl bg-white border-2 border-transparent hover:border-primary cursor-pointer transition-all overflow-hidden opacity-60 hover:opacity-100"
              >
                <img
                  :src="`https://placehold.co/200x200?text=Vue+${i}`"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <!-- Right: Info Section -->
          <div class="lg:w-1/2 p-8 lg:p-12 flex flex-col">
            <div class="mb-6">
              <span
                class="inline-block px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-md mb-4"
              >
                {{ item.category }}
              </span>
              <h1 class="text-3xl lg:text-4xl font-black text-gray-900 mb-4">
                {{ item.name }}
              </h1>
              <div class="flex items-center gap-6 text-sm">
                <div class="flex items-center gap-1 text-yellow-500">
                  <i
                    v-for="i in 5"
                    :key="i"
                    :class="
                      i <= 4 ? 'fas fa-star' : 'far fa-star text-gray-300'
                    "
                  ></i>
                  <span class="ml-2 font-bold text-gray-700">4.5</span>
                </div>
                <span class="text-gray-400">|</span>
                <span class="text-gray-500 font-medium">128 avis vérifiés</span>
              </div>
            </div>

            <div class="mb-8 p-6 bg-gray-50 rounded-2xl">
              <div
                v-if="item.oldPrice"
                class="text-gray-400 line-through text-lg mb-1"
              >
                {{ formatPrice(item.oldPrice) }}
              </div>
              <div class="text-4xl font-black text-primary">
                {{ formatPrice(item.price) }}
              </div>
              <p class="text-sm text-green-600 font-bold mt-2">
                En stock — Livraison disponible en 24h
              </p>
            </div>

            <div class="mb-8">
              <h3
                class="text-sm font-black text-gray-900 uppercase tracking-widest mb-4"
              >
                Description
              </h3>
              <p class="text-gray-600 leading-relaxed">
                {{
                  item.description ||
                  "Apportez une touche de modernité et de confort à votre intérieur avec cet article de qualité supérieure. Sélectionné par nos experts pour sa durabilité et son design élégant."
                }}
              </p>
            </div>

            <div class="mt-auto space-y-4">
              <div class="flex items-center gap-4">
                <div
                  class="flex items-center border border-gray-200 rounded-xl bg-white h-14 px-4 overflow-hidden"
                >
                  <button
                    @click="quantity = Math.max(1, quantity - 1)"
                    class="w-8 h-full text-gray-400 hover:text-primary transition-colors"
                  >
                    <i class="fas fa-minus"></i>
                  </button>
                  <input
                    type="number"
                    v-model="quantity"
                    class="w-12 text-center font-black border-none focus:ring-0"
                    min="1"
                  />
                  <button
                    @click="quantity++"
                    class="w-8 h-full text-gray-400 hover:text-primary transition-colors"
                  >
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
                <button
                  @click="addToCart"
                  class="flex-1 h-14 bg-primary text-white font-black uppercase tracking-widest rounded-xl shadow-xl hover:bg-primary/90 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3"
                >
                  <i class="fas fa-shopping-cart"></i>
                  Ajouter au panier
                </button>
              </div>
              <button
                class="w-full h-14 border-2 border-gray-900 text-gray-900 font-black uppercase tracking-widest rounded-xl hover:bg-gray-900 hover:text-white transition-all flex items-center justify-center gap-3"
              >
                <i class="far fa-heart"></i>
                Ajouter aux favoris
              </button>
            </div>

            <!-- Seller Quick Info -->
            <div
              class="mt-10 pt-8 border-t border-gray-100 flex items-center gap-4"
            >
              <div
                class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400"
              >
                <i class="fas fa-store"></i>
              </div>
              <div>
                <p
                  class="text-[10px] text-gray-400 font-black uppercase tracking-widest"
                >
                  Vendeur
                </p>
                <p class="text-sm font-black text-gray-900">
                  Home Cameroon Official Store
                </p>
              </div>
              <button
                class="ml-auto text-xs font-black text-primary uppercase tracking-widest hover:underline"
              >
                Voir la boutique
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "../axios";
import { useCartStore } from "../stores/cart";

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();

const item = ref(null);
const isLoading = ref(true);
const quantity = ref(1);

const fetchItem = async () => {
  isLoading.value = true;
  try {
    const { id } = route.params;
    const type = route.query.type || "product";
    const { data } = await axios.get(`/api/marketplace/items/${id}`, {
      params: { type },
    });
    if (data.success) {
      item.value = data.data;
    }
  } catch (err) {
    console.error("Erreur chargement article:", err);
    router.push({ name: 'MarketplaceIndex' });
  } finally {
    isLoading.value = false;
  }
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("fr-CM", {
    style: "currency",
    currency: "XAF",
    maximumFractionDigits: 0,
  }).format(price || 0);
};

const addToCart = () => {
  if (!item.value) return;
  for (let i = 0; i < quantity.value; i++) {
    cartStore.addItem(item.value);
  }
};

onMounted(fetchItem);
</script>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
