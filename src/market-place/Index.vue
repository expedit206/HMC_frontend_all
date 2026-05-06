<template>
  <div class="h-[calc(100vh-64px)] overflow-hidden bg-background flex flex-col">

    <!-- ═══════════════ HEADER ═══════════════ -->
    <header class="shrink-0 bg-card border-b border-border z-30">
      <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center gap-3">

        <!-- Bouton filtre mobile -->
        <button @click="showMobileFilters = true"
          class="lg:hidden flex items-center justify-center w-9 h-9 rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all">
          <i class="fas fa-sliders-h text-sm"></i>
        </button>

        <!-- Recherche -->
        <div class="relative flex-1 max-w-lg">
          <i
            class="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-xs pointer-events-none"></i>
          <input v-model="searchQuery" @keyup.enter="handleSearch" type="text"
            placeholder="Rechercher un produit, une marque..."
            class="w-full pl-9 pr-4 py-2 border border-border rounded-md text-sm font-medium text-foreground placeholder:text-muted-foreground focus:bg-card focus:border-primary/40 focus:ring-2 focus:ring-primary/10 focus:outline-none transition-all" />
        </div>

        <!-- Tri rapide (Desktop) -->
        <div class="hidden sm:flex items-center gap-1rounded-md p-0.5 border border-border">
          <button v-for="sort in sortOptions" :key="sort.value" @click="activeSort = sort.value; fetchItems()"
            class="px-3 py-1.5 rounded text-xs font-bold transition-all" :class="activeSort === sort.value
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'">
            {{ sort.label }}
          </button>
        </div>

        <div class="flex-1 hidden sm:block"></div>

        <!-- Panier -->
        <button @click="cartStore.toggleCart()"
          class="relative flex items-center gap-2 px-3 py-2 rounded-md border border-border text-sm font-bold text-foreground hover:border-primary/40 hover:text-primary transition-all">
          <i class="fas fa-shopping-bag text-sm"></i>
          <span class="hidden sm:inline text-xs">Panier</span>
          <span v-if="cartStore.totalItems > 0"
            class="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-black flex items-center justify-center rounded-full border-2 border-card">
            {{ cartStore.totalItems }}
          </span>
        </button>
      </div>
    </header>

    <!-- ═══════════════ LAYOUT ═══════════════ -->
    <div class="flex flex-1 min-h-0 max-w-[1600px] w-full mx-auto">

      <!-- ────── SIDEBAR ────── -->
      <aside
        class="hidden lg:flex flex-col w-64 xl:w-72 shrink-0 border-r border-border bg-card overflow-y-auto custom-scrollbar">

        <!-- Catégories -->
        <div class="p-5">
          <p class="text-[10px] font-black text-muted-foreground uppercase tracking-[0.18em] mb-3">Catégories</p>
          <div class="relative">
            <select v-model="activeCategory" @change="fetchItems()"
              class="w-full pl-4 pr-10 py-3  border border-border rounded-lg text-sm font-bold text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary/40 appearance-none cursor-pointer outline-none transition-all">
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
            </select>
            <i
              class="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-[10px] pointer-events-none"></i>
          </div>
        </div>

        <!-- Séparateur -->
        <div class="mx-5 border-t border-border"></div>

        <!-- Filtres avancés -->
        <div class="p-5 space-y-6">
          <p class="text-[10px] font-black text-muted-foreground uppercase tracking-[0.18em]">Filtres</p>

          <!-- Budget -->
          <div>
            <div class="flex items-baseline justify-between mb-3">
              <span class="text-xs font-bold text-foreground">Budget max</span>
              <span class="text-xs font-black text-primary">{{ formatPrice(maxPrice) }}</span>
            </div>
            <input type="range" v-model="maxPrice" min="0" max="2000000" step="10000"
              class="w-full h-1 rounded-full bg-muted appearance-none cursor-pointer accent-primary"
              @change="fetchItems()" />
            <div class="flex justify-between mt-1.5">
              <span class="text-[9px] text-muted-foreground font-medium">0</span>
              <span class="text-[9px] text-muted-foreground font-medium">2M FCFA</span>
            </div>
          </div>

          <!-- État article -->
          <div>
            <span class="text-xs font-bold text-foreground block mb-3">État</span>
            <div class="space-y-2">
              <label v-for="condition in conditions" :key="condition.value"
                class="flex items-center gap-2.5 cursor-pointer group">
                <div @click="toggleCondition(condition.value)"
                  class="w-4 h-4 rounded border-2 flex items-center justify-center transition-all shrink-0" :class="activeConditions.includes(condition.value)
                    ? 'bg-primary border-primary'
                    : 'border-border group-hover:border-primary/50'">
                  <i v-if="activeConditions.includes(condition.value)"
                    class="fas fa-check text-primary-foreground text-[8px]"></i>
                </div>
                <span class="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {{ condition.label }}
                </span>
              </label>
            </div>
          </div>
        </div>

        <!-- CTA Vendre -->
        <div class="mt-auto mx-5 mb-5 p-4 rounded-lg border border-primary/20 bg-primary/5">
          <div class="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center mb-3">
            <i class="fas fa-store text-primary text-sm"></i>
          </div>
          <p class="text-xs font-black text-foreground mb-1">Vous vendez quelque chose ?</p>
          <p class="text-[10px] text-muted-foreground leading-relaxed mb-3">Publiez vos articles et touchez des
            acheteurs locaux.</p>
          <router-link
            :to="{ name: 'MarketplacePublish' }"
            class="w-full py-2 bg-primary text-primary-foreground text-xs font-black rounded-md hover:bg-primary/90 transition-all flex items-center justify-center">
            Créer une annonce
          </router-link>
        </div>
      </aside>

      <!-- ────── MAIN ────── -->
      <main class="flex-1 min-w-0 overflow-y-auto custom-scrollbar bg-background">
        <div class="p-5 md:p-7">

          <!-- Barre info + tri mobile -->
          <div class="flex items-center justify-between mb-5 gap-3 flex-wrap">
            <div>
              <h2 class="text-base font-black text-foreground">
                {{ activeCategory === 'all' ? 'Tous les produits' : getCategoryName(activeCategory) }}
              </h2>
              <p class="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">
                <span v-if="!isLoading">{{ products.length }} article{{ products.length > 1 ? 's' : '' }}</span>
                <span v-else>Chargement...</span>
              </p>
            </div>

            <!-- Tri mobile -->
            <div class="flex sm:hidden items-center gap-1 bg-muted/30 rounded-md p-0.5 border border-border">
              <button v-for="sort in sortOptions" :key="sort.value" @click="activeSort = sort.value; fetchItems()"
                class="px-2.5 py-1.5 rounded text-[10px] font-bold transition-all" :class="activeSort === sort.value
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground'">
                {{ sort.label }}
              </button>
            </div>

          </div>

          <!-- ── SKELETON ── -->
          <div v-if="isLoading && products.length === 0"
            class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            <div v-for="n in 12" :key="n" class="relative flex flex-col rounded-xl p-2 animate-pulse">
              <!-- Image skeleton -->
              <div
                class="relative aspect-[4/3] rounded-md overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 mb-2">
                <!-- Badge prix barré simulé -->

                <!-- Zone image -->
                <div class="w-full h-full bg-gray-200"></div>

                <!-- Zone localisation -->
                <div class="absolute bottom-1 right-3">
                  <div class="w-16 h-4 bg-gray-300/60 rounded-full"></div>
                </div>
              </div>

              <!-- Contenu skeleton -->
              <div class="flex flex-col flex-grow px-0.5 border-l pl-1">
                <!-- Catégorie + condition -->
                <div class="flex items-center justify-between mb-2">
                  <div class="h-2 w-12 bg-gray-200 rounded"></div>
                  <div class="h-2 w-8 bg-gray-200 rounded"></div>
                </div>

                <!-- Titre -->
                <div class="space-y-1 mb-2">
                  <div class="h-2 bg-gray-200 rounded w-full"></div>
                  <div class="h-2 bg-gray-200 rounded w-3/4"></div>
                </div>

                <!-- Prix -->
                <div class="flex items-end justify-between mt-auto">
                  <div class="flex flex-col gap-1">
                    <div class="h-2 bg-gray-200 rounded w-12"></div>
                    <div class="h-3 bg-gray-300 rounded w-16"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- ── GRILLE PRODUITS ── -->
          <div v-else-if="products.length > 0"
            class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
            <ProductCard v-for="product in products" :key="product.id + product.type" :product="product"
              @add-to-cart="handleAddToCart" @view-details="handleViewDetails" />
          </div>

          <!-- ── EMPTY STATE ── -->
          <div v-else-if="!isLoading" class="flex flex-col items-center justify-center py-32 text-center">
            <div class="w-20 h-20 bg-muted/30 rounded-full flex items-center justify-center mb-5 border border-border">
              <i class="fas fa-box-open text-3xl text-muted-foreground/40"></i>
            </div>
            <h3 class="text-base font-black text-foreground">Aucun produit trouvé</h3>
            <p class="text-muted-foreground text-sm mt-1.5 max-w-xs mx-auto">Essayez d'ajuster vos filtres ou élargissez
              votre recherche.</p>
            <button @click="resetFilters"
              class="mt-5 px-5 py-2 bg-primary text-primary-foreground text-xs font-black rounded-md hover:bg-primary/90 transition-all">
              Réinitialiser les filtres
            </button>
          </div>

          <!-- ── INFINITE SCROLL ── -->
          <div ref="scrollTarget" class="py-10 flex justify-center">
            <div v-if="isLoading && products.length > 0" class="flex items-center gap-2.5">
              <div class="w-5 h-5 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
              <span class="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Chargement...</span>
            </div>
            <div v-else-if="!hasMorePages && products.length > 0"
              class="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground/60">
              <div class="w-8 h-px bg-border"></div>
              Fin du catalogue
              <div class="w-8 h-px bg-border"></div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- ═══════════════ MOBILE FILTERS OVERLAY ═══════════════ -->
    <Teleport to="body">
      <div v-if="showMobileFilters" class="fixed inset-0 z-50 lg:hidden">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="showMobileFilters = false"></div>
        <div class="absolute inset-y-0 left-0 w-72 bg-card shadow-2xl flex flex-col overflow-hidden animate-slide-left">

          <!-- Header modal -->
          <div class="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
            <h2 class="text-sm font-black text-foreground">Filtres</h2>
            <button @click="showMobileFilters = false"
              class="w-8 h-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all">
              <i class="fas fa-times"></i>
            </button>
          </div>

          <!-- Contenu scrollable -->
          <div class="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-6">
            <!-- Catégories -->
            <div>
              <p class="text-[10px] font-black text-muted-foreground uppercase tracking-[0.18em] mb-3">Catégories</p>
              <div class="space-y-0.5">
                <button v-for="cat in categories" :key="cat.id"
                  @click="activeCategory = cat.id; fetchItems(); showMobileFilters = false"
                  class="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-bold transition-all text-left"
                  :class="activeCategory === cat.id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted/40 hover:text-foreground'">
                  <i :class="cat.icon || 'fas fa-tag'" class="text-[11px] w-4 text-center"></i>
                  {{ cat.name }}
                </button>
              </div>
            </div>

            <!-- Budget -->
            <div>
              <div class="flex items-baseline justify-between mb-3">
                <span class="text-xs font-bold text-foreground">Budget max</span>
                <span class="text-xs font-black text-primary">{{ formatPrice(maxPrice) }}</span>
              </div>
              <input type="range" v-model="maxPrice" min="0" max="2000000" step="10000"
                class="w-full h-1 rounded-full bg-muted appearance-none cursor-pointer accent-primary"
                @change="fetchItems()" />
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from '../axios';
import ProductCard from '../components/marketplace/ProductCard.vue';
import { useCartStore } from '../stores/cart';

const router = useRouter();
const cartStore = useCartStore();

// ── UI State ──────────────────────────────────────
const showMobileFilters = ref(false);
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
