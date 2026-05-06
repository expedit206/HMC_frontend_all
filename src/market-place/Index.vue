<template>
  <div class="bg-background min-h-screen">

    <!-- ═══════════════ HEADER ═══════════════ -->
    <header class="sticky top-0 bg-card border-b border-border z-30 shadow-sm">
      <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">

        <!-- Toggle Sidebar (Mobile Only) -->
        <button @click="sidebarStore.toggleMobile()"
          class="md:hidden w-10 h-10 flex items-center justify-center text-foreground">
          <i class="fas fa-bars text-lg"></i>
        </button>

        <!-- Recherche -->
        <div class="relative flex-1 max-w-md">
          <i
            class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-xs pointer-events-none"></i>
          <input v-model="searchQuery" @keyup.enter="handleSearch" type="text"
            placeholder="Rechercher sur la marketplace..."
            class="w-full pl-10 pr-4 py-2.5 bg-muted/50 border border-transparent rounded-xl text-sm font-medium focus:bg-card focus:border-primary/20 focus:outline-none transition-all shadow-inner" />
        </div>

        <div class="flex-1 hidden md:block"></div>

        <!-- Actions -->
        <div class="flex items-center gap-2">
          <router-link v-if="authStore.isAuthenticated" :to="{ name: 'MarketplacePublish' }"
            class="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-primary/20 transition-all">
            <i class="fas fa-plus"></i>
            <span>Vendre</span>
          </router-link>

          <button @click="cartStore.toggleCart()"
            class="relative w-10 h-10 rounded-xl border border-border text-foreground hover:bg-muted transition-all">
            <i class="fas fa-shopping-basket text-sm"></i>
            <span v-if="cartStore.totalItems > 0"
              class="absolute -top-1.5 -right-1.5 w-5 h-5 bg-secondary text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-card">
              {{ cartStore.totalItems }}
            </span>
          </button>
        </div>
      </div>

      <!-- ────── MENU CATEGORIES HORIZONTAL ────── -->
      <div class="border-t border-border bg-card">
        <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center gap-3 overflow-x-auto py-3 no-scrollbar scroll-smooth">
            <div class="shrink-0 md:hidden flex items-center gap-2 pr-2 border-r border-border mr-1">
              <span class="text-[9px] font-black uppercase text-muted-foreground vertical-text">Menu</span>
            </div>
            <button v-for="cat in categories" :key="cat.id" @click="activeCategory = cat.id; fetchItems()"
              class="flex items-center gap-2 px-5 py-2 rounded-xl whitespace-nowrap transition-all text-xs font-semibold border"
              :class="activeCategory === cat.id
                ? 'bg-primary border-primary text-primary-foreground shadow-sm'
                : 'bg-muted/30 border-transparent text-muted-foreground hover:bg-card hover:border-border'">
              <i :class="cat.icon || 'fas fa-tag'" class="text-[10px] opacity-70"></i>
              {{ cat.name }}
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- ═══════════════ MAIN CONTENT ═══════════════ -->
    <main class="max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-10">

      <!-- Toolbar (Tri + Filtres actifs) -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 class="text-xl font-black text-foreground flex items-center gap-3">
            {{ activeCategory === 'all' ? 'Tout explorer' : getCategoryName(activeCategory) }}
            <span
              class="px-2 py-0.5 rounded-md bg-primary/5 text-primary text-[10px] font-black uppercase tracking-tighter">
              {{ products.length }} articles
            </span>
          </h2>
        </div>

        <!-- Tri -->
        <div class="flex items-center gap-2 bg-card p-1 rounded-full border border-border shadow-sm">
          <button v-for="sort in sortOptions" :key="sort.value" @click="activeSort = sort.value; fetchItems()"
            class="px-4 py-1.5 rounded-full text-[10px] font-black transition-all" :class="activeSort === sort.value
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'">
            {{ sort.label }}
          </button>
        </div>
      </div>

      <!-- ── GRILLE PRODUITS (Full Width) ── -->
      <div v-if="isLoading && products.length === 0"
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
        <div v-for="n in 12" :key="n" class="animate-pulse flex flex-col gap-3">
          <div class="aspect-[4/3] bg-muted/50 rounded-2xl"></div>
          <div class="h-4 bg-muted/50 rounded-full w-3/4"></div>
          <div class="h-4 bg-muted/50 rounded-full w-1/2"></div>
        </div>
      </div>

      <div v-else-if="products.length > 0"
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10">
        <ProductCard v-for="product in products" :key="product.id + product.type" :product="product"
          @add-to-cart="handleAddToCart" @view-details="handleViewDetails" />
      </div>

      <!-- ── EMPTY STATE ── -->
      <div v-else-if="!isLoading" class="flex flex-col items-center justify-center py-32 text-center">
        <div class="w-24 h-24 bg-card rounded-3xl flex items-center justify-center mb-6 border border-border shadow-xl">
          <i class="fas fa-search text-3xl text-primary/20"></i>
        </div>
        <h3 class="text-xl font-black text-foreground">Aucun résultat trouvé</h3>
        <p class="text-muted-foreground text-sm mt-2 max-w-sm mx-auto font-medium">Nous n'avons trouvé aucun article
          correspondant à ces critères. Essayez d'ajuster votre recherche.</p>
        <button @click="resetFilters"
          class="mt-8 px-8 py-3 bg-primary text-primary-foreground text-xs font-black rounded-full hover:shadow-xl hover:shadow-primary/20 transition-all active:scale-95">
          Réinitialiser tout
        </button>
      </div>

      <!-- ── INFINITE SCROLL ── -->
      <div ref="scrollTarget" class="py-16 flex justify-center">
        <div v-if="isLoading && products.length > 0" class="flex items-center gap-3">
          <div class="w-6 h-6 border-3 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <span class="text-xs font-black uppercase tracking-widest text-muted-foreground">Recherche...</span>
        </div>
        <div v-else-if="!hasMorePages && products.length > 0"
          class="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">
          <div class="w-12 h-px bg-border"></div>
          Fin des pépites
          <div class="w-12 h-px bg-border"></div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from '../axios';
import ProductCard from '@/marketplace/ProductCard.vue';
import { useCartStore } from '../stores/cart';
import { useAuthStore } from '../stores/auth';
import { useSidebarStore } from '../stores/sidebar';

const router = useRouter();
const cartStore = useCartStore();
const authStore = useAuthStore();
const sidebarStore = useSidebarStore();

// ── UI State ──────────────────────────────────────
const viewMode = ref('grid');

// ── Filters ───────────────────────────────────────
const activeCategory = ref('all');
const activeSort = ref('recent');
const activeConditions = ref([]);
const maxPrice = ref(2000000);
const searchQuery = ref('');

// ── Data ──────────────────────────────────────────
const products = ref([]);
const categories = ref([{ id: 'all', name: 'Tout', icon: 'fas fa-th-large' }]);
const isLoading = ref(false);

// ── Infinite Scroll ───────────────────────────────
const currentPage = ref(1);
const hasMorePages = ref(true);
const scrollTarget = ref(null);

const sortOptions = [
  { value: 'recent', label: 'Récent' },
  { value: 'price_asc', label: 'Prix ↑' },
  { value: 'price_desc', label: 'Prix ↓' },
];

const conditions = [
  { value: 'new', label: 'Neuf' },
  { value: 'excellent', label: 'Excellent' },
  { value: 'good', label: 'Bon état' },
  { value: 'fair', label: 'Acceptable' },
];

// ── Methods ───────────────────────────────────────
const toggleCondition = (val) => {
  const idx = activeConditions.value.indexOf(val);
  if (idx === -1) activeConditions.value.push(val);
  else activeConditions.value.splice(idx, 1);
  fetchItems();
};

const fetchCategories = async () => {
  try {
    const { data } = await axios.get('/api/marketplace/categories');
    if (data.success) {
      categories.value = [
        // { id: 'all', name: 'Tout', icon: 'fas fa-th-large' },
        ...data.data,
      ];
    }
  } catch (err) {
    console.error('Erreur catégories marketplace:', err);
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
      category: activeCategory.value !== 'all' ? activeCategory.value : undefined,
      search: searchQuery.value || undefined,
      sort: activeSort.value,
      max_price: maxPrice.value < 2000000 ? maxPrice.value : undefined,
      conditions: activeConditions.value.length ? activeConditions.value.join(',') : undefined,
      page: currentPage.value,
      per_page: 12,
    };
    const { data } = await axios.get('/api/marketplace/items', { params });
    if (data.success) {
      const newItems = data.data.data;
      products.value = append ? [...products.value, ...newItems] : newItems;
      hasMorePages.value = data.data.current_page < data.data.last_page;
    }
  } catch (err) {
    console.error('Erreur articles marketplace:', err);
  } finally {
    isLoading.value = false;
  }
};

const handleSearch = () => fetchItems();
const handleAddToCart = (product) => cartStore.addItem(product);
const handleViewDetails = (product) => {
  router.push({ name: 'MarketplaceDetail', params: { id: product.id }, query: { type: product.type } });
};

const getCategoryName = (id) => {
  const cat = categories.value.find(c => c.id === id);
  return cat ? cat.name : 'Catégorie';
};

const formatPrice = (price) =>
  new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';

const resetFilters = () => {
  activeCategory.value = 'all';
  activeSort.value = 'recent';
  activeConditions.value = [];
  maxPrice.value = 2000000;
  searchQuery.value = '';
  fetchItems();
};

// ── Infinite Scroll ───────────────────────────────
let observer = null;
const setupObserver = () => {
  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && hasMorePages.value && !isLoading.value) {
      currentPage.value++;
      fetchItems(true);
    }
  }, { threshold: 0.5 });
  if (scrollTarget.value) observer.observe(scrollTarget.value);
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
.custom-scrollbar::-webkit-scrollbar {
  width: 3px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: hsl(var(--border));
  border-radius: 10px;
}

select,
input[type="range"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: hsl(var(--primary));
  cursor: pointer;
  border: 2px solid hsl(var(--card));
  box-shadow: 0 1px 4px hsl(var(--primary) / 0.3);
}

/* Vue liste */
.product-list-item {
  flex-direction: row !important;
}

.product-list-item>*:first-child {
  width: 120px !important;
  aspect-ratio: 1 !important;
  flex-shrink: 0;
}

/* Slide sidebar mobile */
@keyframes slideLeft {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(0);
  }
}

.animate-slide-left {
  animation: slideLeft 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
