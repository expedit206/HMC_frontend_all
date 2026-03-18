<template>
  <div class="marketplace-index bg-background pb-20">
    <!-- HERO SECTION -->
    <section class="relative bg-primary overflow-hidden">
      <div
        class="absolute inset-0 z-0 opacity-10"
        style="
          background-image: radial-gradient(#ffffff 2px, transparent 2px);
          background-size: 30px 30px;
        "
      ></div>
      <div
        class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 flex flex-col md:flex-row items-center gap-10"
      >
        <div class="flex-1 text-center md:text-left text-primary-foreground space-y-6">
          <span
            class="inline-block px-4 py-1 bg-white/20 backdrop-blur-md rounded-full text-sm font-semibold uppercase tracking-wider mb-2 opacity-0 animate-fade-in-up"
          >
            Nouveau sur Home Cameroon
          </span>
          <h1
            class="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight opacity-0 animate-fade-in-up delay-100"
          >
            Le Marketplace <span class="text-secondary">Premium</span>
          </h1>
          <p
            class="text-lg sm:text-xl text-primary-foreground/90 max-w-2xl opacity-0 animate-fade-in-up delay-200"
          >
            Découvrez une sélection exclusive de meubles, décorations et
            services pour aménager votre intérieur avec style.
          </p>
          <div
            class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4 opacity-0 animate-fade-in-up delay-300"
          >
            <button
              class="px-8 py-4 bg-card text-primary rounded-full font-bold shadow-xl hover:bg-muted transition-all hover:scale-105 flex items-center gap-2"
            >
              <i class="fas fa-shopping-bag"></i> Commencer vos achats
            </button>
            <button
              class="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-primary-foreground rounded-full font-bold hover:bg-white/20 transition-all flex items-center gap-2"
            >
              <i class="fas fa-tags"></i> Voir les promotions
            </button>
          </div>
        </div>
        <!-- Right Image/Illustration -->
        <div
          class="flex-1 w-full max-w-lg md:max-w-xl opacity-0 animate-fade-in-right"
        >
          <img
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80"
            alt="Marketplace Showcase"
            class="rounded-2xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 border-4 border-white/20"
          />
        </div>
      </div>
    </section>

    <!-- SEARCH & FILTERS BAR (Sticky) -->
    <div
      class="sticky top-[0px] z-40 bg-card border-b border-border shadow-sm transition-all duration-300"
      :class="{ 'shadow-md': isScrolled }"
    >
      <div
        class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4"
      >
        <!-- Categories Quick Links (Desktop) -->
        <div
          class="hidden md:flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2 md:pb-0 font-medium text-sm text-muted-foreground"
        >
          <button
            v-for="cat in categories"
            :key="cat.id"
            @click="activeCategory = cat.id"
            class="whitespace-nowrap px-4 py-2 rounded-full transition-colors border"
            :class="
              activeCategory === cat.id
                ? 'bg-primary text-primary-foreground border-primary shadow-md'
                : 'hover:bg-muted border-transparent'
            "
          >
            <i :class="cat.icon" class="mr-2"></i> {{ cat.name }}
          </button>
        </div>

        <!-- Filter Toggle & Search -->
        <div class="flex items-center gap-4 w-full md:w-auto">
          <button
            @click="showFilters = !showFilters"
            class="md:hidden p-2 text-muted-foreground border border-border rounded-lg bg-muted/20 hover:bg-card"
          >
            <i class="fas fa-filter"></i>
          </button>

          <div class="relative flex-1 md:w-80">
            <input
              v-model="searchQuery"
              @keyup.enter="handleSearch"
              type="text"
              placeholder="Rechercher un produit..."
              class="w-full pl-10 pr-4 py-2.5 rounded-full border border-border bg-muted/20 focus:bg-card focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-foreground placeholder:text-muted-foreground"
            />
            <i
              class="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            ></i>
          </div>

          <button
            @click="cartStore.toggleCart()"
            class="p-2.5 text-muted-foreground hover:text-primary transition-colors relative"
          >
            <i class="fas fa-shopping-cart text-xl"></i>
            <span
              v-if="cartStore.totalItems > 0"
              class="absolute top-0 right-0 w-5 h-5 bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center rounded-full border-2 border-card font-black"
            >
              {{ cartStore.totalItems }}
            </span>
          </button>
        </div>
      </div>

      <!-- Mobile Categories (Expandable) -->
      <div
        v-show="showFilters"
        class="md:hidden border-t border-border bg-muted/10 p-4 grid grid-cols-2 gap-2 animate-fade-in-up"
      >
        <button
          v-for="cat in categories"
          :key="cat.id"
          @click="activeCategory = cat.id"
          class="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors border bg-card"
          :class="
            activeCategory === cat.id
              ? 'border-primary text-primary ring-1 ring-primary'
              : 'border-border text-muted-foreground'
          "
        >
          <i :class="cat.icon" class=""></i> {{ cat.name }}
        </button>
      </div>
    </div>

    <!-- MAIN CONTENT GRID -->
    <div
      class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col lg:flex-row gap-8"
    >
      <!-- DESKTOP SIDEBAR FILTERS -->
      <aside class="hidden lg:block w-72 flex-shrink-0 space-y-8">
        <!-- Filter Card -->
        <div
          class="bg-card rounded-2xl border border-border p-6 shadow-sm sticky top-32"
        >
          <div class="flex items-center justify-between mb-6">
            <h3 class="font-bold text-lg text-foreground">Filtres</h3>
            <button class="text-xs text-primary font-medium hover:underline">
              Réinitialiser
            </button>
          </div>

          <!-- Price Range -->
          <div class="mb-6">
            <h4 class="font-semibold text-sm text-foreground mb-3">Prix</h4>
            <div class="space-y-2">
              <input
                type="range"
                class="w-full accent-primary"
                min="0"
                max="1000000"
                step="5000"
              />
              <div class="flex justify-between text-xs text-muted-foreground">
                <span>0 FCFA</span>
                <span>1M+ FCFA</span>
              </div>
            </div>
          </div>

          <!-- Condition -->
          <div class="mb-6">
            <h4 class="font-semibold text-sm text-foreground mb-3">État</h4>
            <div class="space-y-2">
              <label class="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  class="rounded border-border text-primary focus:ring-primary bg-background"
                  checked
                />
                <span
                  class="text-sm text-muted-foreground group-hover:text-primary transition-colors"
                  >Neuf</span
                >
              </label>
              <label class="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  class="rounded border-border text-primary focus:ring-primary bg-background"
                />
                <span
                  class="text-sm text-muted-foreground group-hover:text-primary transition-colors"
                  >Occasion</span
                >
              </label>
            </div>
          </div>
        </div>

        <!-- Promo Banner -->
        <div
          class="bg-secondary rounded-2xl p-6 text-secondary-foreground text-center relative overflow-hidden"
        >
          <div
            class="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"
          ></div>
          <h4 class="font-bold text-xl mb-2">Devenez Vendeur</h4>
          <p class="text-sm text-secondary-foreground/90 mb-4">
            Vendez vos articles sur Home Cameroon et touchez des milliers
            d'acheteurs.
          </p>
          <button
            class="w-full py-2.5 bg-card text-secondary font-bold rounded-lg shadow-lg hover:bg-muted transition-colors"
          >
            Créer une boutique
          </button>
        </div>
      </aside>

      <!-- PRODUCTS GRID -->
      <div class="flex-1">
        <!-- Sort Bar -->
        <div class="flex items-center justify-between mb-6">
          <p class="text-muted-foreground text-sm">
            Affichage de
            <span class="font-bold text-foreground">{{ products.length }}</span>
            articles trouvés
          </p>

          <div class="flex items-center gap-2">
            <span class="text-sm text-muted-foreground hidden sm:inline"
              >Trier par:</span
            >
            <select
              class="border-none bg-transparent text-sm font-bold text-foreground focus:ring-0 cursor-pointer"
            >
              <option>Pertinence</option>
              <option>Prix croissant</option>
              <option>Prix décroissant</option>
              <option>Nouveautés</option>
            </select>
          </div>
        </div>

        <!-- Grid -->
        <div v-if="isLoading" class="py-20 text-center text-muted-foreground">
          <div
            class="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"
          ></div>
          <p class="font-bold uppercase text-[10px] tracking-widest">
            Recherche en cours...
          </p>
        </div>

        <div
          v-else-if="products.length === 0"
          class="py-20 text-center bg-card rounded-2xl border border-border shadow-sm"
        >
          <i class="fas fa-box-open text-5xl mb-4 text-muted-foreground/30"></i>
          <p class="text-muted-foreground font-bold">
            Aucun produit ou service trouvé pour cette recherche.
          </p>
        </div>

        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <ProductCard
            v-for="product in products"
            :key="product.id + product.type"
            :product="product"
            @add-to-cart="handleAddToCart"
            @view-details="handleViewDetails"
          />
        </div>

        <!-- Pagination -->
        <div v-if="products.length > 0" class="mt-12 flex justify-center">
          <nav class="flex items-center gap-2">
            <button
              class="w-10 h-10 flex items-center justify-center rounded-full border border-border text-muted-foreground"
            >
              <i class="fas fa-chevron-left"></i>
            </button>
            <button
              class="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-primary-foreground font-bold shadow-md"
            >
              1
            </button>
            <button
              class="w-10 h-10 flex items-center justify-center rounded-full border border-border text-muted-foreground"
            >
              <i class="fas fa-chevron-right"></i>
            </button>
          </nav>
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
const isScrolled = ref(false);
const showFilters = ref(false);
const activeCategory = ref("all");
const products = ref([]);
const categories = ref([{ id: "all", name: "Tout", icon: "fas fa-th-large" }]);
const isLoading = ref(true);
const searchQuery = ref("");

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

const fetchItems = async () => {
  isLoading.value = true;
  try {
    const params = {
      category: activeCategory.value,
      search: searchQuery.value,
    };
    const { data } = await axios.get("/api/marketplace/items", { params });
    if (data.success) {
      products.value = data.data;
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

// Watch for category changes
watch(activeCategory, () => {
  fetchItems();
});

// Watch for search query
const handleSearch = () => {
  fetchItems();
};

// Scroll Handler
const handleScroll = () => {
  isScrolled.value = window.scrollY > 100;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  fetchCategories();
  fetchItems();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
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

/* Custom Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

.animate-fade-in-right {
  animation: fadeInRight 1s ease-out forwards;
}

.delay-100 {
  animation-delay: 0.1s;
}
.delay-200 {
  animation-delay: 0.2s;
}
.delay-300 {
  animation-delay: 0.3s;
}
</style>