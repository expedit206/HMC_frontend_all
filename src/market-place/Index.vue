<template>
  <div class="h-[calc(100vh-64px)] overflow-hidden bg-background">
    <!-- BARRE DE RECHERCHE HORIZONTALE (Fixée en haut) -->
    <header class="bg-white border-b border-border z-30 relative">
      <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
        <div class="flex-1 flex items-center gap-4">
          <button @click="showMobileFilters = true" class="lg:hidden p-2.5 bg-gray-50 text-gray-500 rounded-xl hover:text-primary transition-all">
            <i class="fas fa-filter"></i>
          </button>
          
          <div class="relative flex-1 max-w-2xl">
            <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input 
              v-model="searchQuery" 
              @keyup.enter="handleSearch"
              type="text" 
              placeholder="Que recherchez-vous aujourd'hui ?" 
              class="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-sm font-medium"
            />
          </div>
        </div>

        <div class="flex items-center gap-3">
          <button @click="cartStore.toggleCart()" 
            class="p-3 bg-gray-50 text-gray-600 rounded-2xl hover:text-primary hover:bg-orange-50 transition-all relative group"
          >
            <i class="fas fa-shopping-cart text-lg group-hover:scale-110 transition-transform"></i>
            <span v-if="cartStore.totalItems > 0" 
              class="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white font-black animate-bounce-subtle"
            >
              {{ cartStore.totalItems }}
            </span>
          </button>
        </div>
      </div>
    </header>

    <!-- CONTENT LAYOUT -->
    <div class="flex h-[calc(100vh-130px)] max-w-[1600px] mx-auto overflow-hidden">
      <!-- SIDEBAR FILTERS (Statique Desktop) -->
      <aside class="hidden lg:flex flex-col w-72 h-full border-r border-border bg-white overflow-y-auto custom-scrollbar p-6 space-y-8">
        <div>
          <h3 class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Catégories</h3>
          <div class="space-y-1">
            <button 
              v-for="cat in categories" 
              :key="cat.id"
              @click="activeCategory = cat.id"
              class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all text-left"
              :class="activeCategory === cat.id ? 'bg-primary text-white shadow-lg shadow-orange-500/20' : 'text-gray-500 hover:bg-gray-50 hover:text-primary'"
            >
              <i :class="cat.icon" class="w-5 text-center"></i>
              <span>{{ cat.name }}</span>
            </button>
          </div>
        </div>

        <div class="pt-8 border-t border-gray-100">
          <h3 class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Filtres Avancés</h3>
          
          <!-- Price -->
          <div class="mb-8">
            <div class="flex justify-between items-center mb-4">
              <span class="text-sm font-bold text-gray-700">Budget Max</span>
              <span class="text-xs font-black text-primary">{{ formatPrice(maxPrice) }}</span>
            </div>
            <input type="range" v-model="maxPrice" min="0" max="2000000" step="10000" class="w-full accent-primary h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer" />
          </div>

          <!-- Condition -->
          <div>
            <span class="text-sm font-bold text-gray-700 block mb-4">État de l'article</span>
            <div class="space-y-3">
              <label v-for="c in ['Neuf', 'Excellent', 'Bon état']" :key="c" class="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" class="w-5 h-5 border-2 border-gray-200 rounded-lg text-primary focus:ring-primary transition-all cursor-pointer" />
                <span class="text-sm font-medium text-gray-500 group-hover:text-gray-900 transition-colors">{{ c }}</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="mt-auto p-6 bg-orange-50 rounded-3xl border border-orange-100">
          <p class="text-xs font-bold text-orange-600 uppercase tracking-wider mb-2">Vendre un article</p>
          <p class="text-xs text-gray-500 mb-4 leading-relaxed">Gagnez de l'argent en vendant vos meubles inutilisés.</p>
          <button class="w-full py-2.5 bg-primary text-white rounded-xl text-xs font-black shadow-lg hover:scale-105 transition-all">Créer une boutique</button>
        </div>
      </aside>

      <!-- MAIN FEED (Scrolling) -->
      <main class="flex-1 h-full overflow-y-auto custom-scrollbar bg-gray-50/30 p-4 md:p-8">
        <!-- TOP INFO -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div v-if="!isLoading || products.length > 0">
            <h2 class="text-xl font-black text-gray-900">
              {{ activeCategory === 'all' ? 'Tous les produits' : getCategoryName(activeCategory) }}
            </h2>
            <p class="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">{{ products.length }} articles trouvés</p>
          </div>
          
          <div class="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-gray-100 shadow-sm">
            <button class="p-2 bg-gray-900 text-white rounded-lg text-xs"><i class="fas fa-th-large"></i></button>
            <button class="p-2 text-gray-400 rounded-lg text-xs hover:bg-gray-50"><i class="fas fa-list"></i></button>
          </div>
        </div>

        <!-- GRID -->
        <div 
          v-if="products.length > 0" 
          class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6"
        >
          <ProductCard
            v-for="product in products"
            :key="product.id + product.type"
            :product="product"
            @add-to-cart="handleAddToCart"
            @view-details="handleViewDetails"
          />
        </div>

        <!-- EMPTY STATE -->
        <div v-else-if="!isLoading" class="flex flex-col items-center justify-center py-32 text-center">
          <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <i class="fas fa-box-open text-4xl text-gray-300"></i>
          </div>
          <h3 class="text-xl font-bold text-gray-900">Aucun produit trouvé</h3>
          <p class="text-gray-500 mt-2 max-w-xs mx-auto">Essayez d'ajuster vos filtres ou votre recherche pour trouver ce que vous cherchez.</p>
        </div>

        <!-- LOADING / INFINITE SCROLL TARGET -->
        <div ref="scrollTarget" class="py-12 flex justify-center">
          <div v-if="isLoading" class="flex items-center gap-3">
            <div class="w-6 h-6 border-3 border-orange-100 border-t-primary rounded-full animate-spin"></div>
            <span class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Chargement...</span>
          </div>
          <div v-else-if="!hasMorePages && products.length > 0" class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">
            Vous avez atteint la fin du catalogue
          </div>
        </div>
      </main>
    </div>

    <!-- MOBILE FILTERS OVERLAY -->
    <div v-if="showMobileFilters" class="fixed inset-0 z-50 lg:hidden overflow-hidden">
      <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="showMobileFilters = false"></div>
      <div class="absolute inset-y-0 left-0 w-80 bg-white shadow-2xl flex flex-col p-6 animate-fade-in-right">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-xl font-black italic">Filtres</h2>
          <button @click="showMobileFilters = false" class="p-2 text-gray-400 hover:text-gray-900"><i class="fas fa-times"></i></button>
        </div>
        <!-- Same filters as above but mobile -->
        <div class="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-8">
          <!-- Categories -->
          <div>
            <h3 class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Parcourir</h3>
            <div class="grid grid-cols-1 gap-2">
              <button 
                v-for="cat in categories" 
                :key="cat.id"
                @click="activeCategory = cat.id; showMobileFilters = false"
                class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-left"
                :class="activeCategory === cat.id ? 'bg-primary text-white' : 'text-gray-500 bg-gray-50'"
              >
                <i :class="cat.icon"></i>
                {{ cat.name }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useRouter } from "vue-router";
import axios from "../axios";
import ProductCard from "../components/marketplace/ProductCard.vue";
import { useCartStore } from "../stores/cart";

// State
const router = useRouter();
const cartStore = useCartStore();
const showMobileFilters = ref(false);
const activeCategory = ref("all");
const products = ref([]);
const categories = ref([{ id: "all", name: "Tout", icon: "fas fa-th-large" }]);
const isLoading = ref(false);
const searchQuery = ref("");
const maxPrice = ref(2000000);

// Infinite Scroll State
const currentPage = ref(1);
const hasMorePages = ref(true);
const scrollTarget = ref(null);

const fetchCategories = async () => {
  try {
    const { data } = await axios.get("/api/marketplace/categories");
    if (data.success) {
      categories.value = data.data;
    }
  } catch (err) {
    console.error("Erreur chargement catégories marketplace:", err);
  }
};

const fetchItems = async (append = false) => {
  if (isLoading.value) return;
  isLoading.value = true;
  
  if (!append) {
    currentPage.value = 1;
    products.value = [];
    hasMorePages.value = true;
  }

  try {
    const params = {
      category: activeCategory.value,
      search: searchQuery.value,
      page: currentPage.value,
      per_page: 12
    };
    const { data } = await axios.get("/api/marketplace/items", { params });
    if (data.success) {
      const newItems = data.data.data;
      if (append) {
        products.value = [...products.value, ...newItems];
      } else {
        products.value = newItems;
      }
      hasMorePages.value = data.data.current_page < data.data.last_page;
    }
  } catch (err) {
    console.error("Erreur chargement articles marketplace:", err);
  } finally {
    isLoading.value = false;
  }
};

const handleAddToCart = (product) => {
  cartStore.addItem(product);
};

const handleViewDetails = (product) => {
  router.push({
    name: "MarketplaceDetail",
    params: { id: product.id },
    query: { type: product.type },
  });
};

const getCategoryName = (id) => {
  const cat = categories.value.find(c => c.id === id);
  return cat ? cat.name : 'Catégorie';
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
};

// Intersection Observer for Infinite Scroll
let observer = null;
const setupObserver = () => {
  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && hasMorePages.value && !isLoading.value) {
      currentPage.value++;
      fetchItems(true);
    }
  }, { threshold: 0.5 });

  if (scrollTarget.value) {
    observer.observe(scrollTarget.value);
  }
};

// Watch for category changes
watch(activeCategory, () => {
  fetchItems();
});

// Watch for search query
const handleSearch = () => {
  fetchItems();
};

onMounted(() => {
  fetchCategories();
  fetchItems();
  setupObserver();
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #E5E7EB;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #D1D5DB;
}

.animate-bounce-subtle {
  animation: bounceSubtle 2s infinite;
}

@keyframes bounceSubtle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInRight {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}

.animate-fade-in-right {
  animation: fadeInRight 0.4s ease-out forwards;
}
</style>
