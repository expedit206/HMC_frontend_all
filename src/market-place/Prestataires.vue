<template>
  <div class="h-[calc(100vh-64px)] overflow-hidden bg-background">
    <!-- BARRE DE RECHERCHE HORIZONTALE -->
    <header class="bg-white border-b border-border z-30 relative">
      <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
        <div class="flex-1 max-w-2xl relative">
          <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
          <input 
            v-model="searchQuery" 
            @keyup.enter="handleSearch"
            type="text" 
            placeholder="Rechercher un plombier, électricien, peintre..." 
            class="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-secondary/20 focus:bg-white transition-all text-sm font-medium shadow-sm"
          />
        </div>
        
        <div class="hidden sm:flex items-center gap-3">
          <router-link to="/prestataire/inscription" class="px-5 py-2.5 bg-gray-900 text-white text-xs font-black rounded-xl hover:bg-gray-800 transition-all flex items-center gap-2">
            <i class="fas fa-user-plus"></i> Devenir Prestataire
          </router-link>
        </div>
      </div>
    </header>

    <!-- CONTENT LAYOUT -->
    <div class="flex h-[calc(100vh-130px)] max-w-[1400px] mx-auto overflow-hidden">
      <!-- SIDEBAR CITIES (Statique) -->
      <aside class="hidden lg:flex flex-col w-64 h-full border-r border-border bg-white overflow-y-auto custom-scrollbar p-6">
        <div class="mb-8">
          <h3 class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 text-center lg:text-left">Localisation</h3>
          <div class="space-y-1">
            <button 
              v-for="city in cities" 
              :key="city"
              @click="activeCity = city"
              class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left"
              :class="activeCity === city ? 'bg-secondary text-white shadow-lg shadow-secondary/20 scale-105' : 'text-gray-500 hover:bg-gray-50 hover:text-secondary'"
            >
              <i class="fas fa-map-marker-alt w-4 text-center"></i>
              <span>{{ city }}</span>
            </button>
          </div>
        </div>

        <!-- Pro Badge -->
        <div class="mt-auto p-5 bg-blue-50 rounded-3xl border border-blue-100 flex flex-col items-center text-center">
          <div class="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-600 mb-3">
            <i class="fas fa-shield-check text-xl"></i>
          </div>
          <p class="text-[10px] font-black text-blue-800 uppercase tracking-widest mb-1">Expertise Vérifiée</p>
          <p class="text-[10px] text-blue-600 font-medium">Tous nos partenaires sont rigoureusement audités.</p>
        </div>
      </aside>

      <!-- MAIN FEED -->
      <main class="flex-1 h-full overflow-y-auto custom-scrollbar bg-gray-50/20 p-4 md:p-8">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="text-xl font-black text-gray-900">Annuaire des Pros</h2>
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Disponibles à {{ activeCity }}</p>
          </div>
        </div>

        <!-- LOADING STATE -->
        <div v-if="isLoading && providers.length === 0" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          <div v-for="n in 6" :key="n" class="h-64 bg-white/60 rounded-3xl border border-border animate-pulse shadow-sm"></div>
        </div>

        <!-- GRID -->
        <div v-else-if="providers.length > 0" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          <ProviderCard v-for="pro in providers" :key="pro.id" :provider="pro" />
        </div>

        <!-- EMPTY STATE -->
        <div v-else-if="!isLoading" class="flex flex-col items-center justify-center py-32 text-center">
          <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <i class="fas fa-search-minus text-3xl text-gray-300"></i>
          </div>
          <h3 class="text-lg font-bold text-gray-900">Aucun expert trouvé</h3>
          <p class="text-gray-500 mt-2 text-sm max-w-xs mx-auto">Nous n'avons pas encore de prestataire pour cette recherche ou dans cette ville.</p>
          <button @click="resetSearch" class="mt-6 text-secondary text-xs font-black uppercase hover:underline">Réinitialiser les filtres</button>
        </div>

        <!-- INFINITE SCROLL TARGET -->
        <div ref="scrollTarget" class="py-12 flex justify-center">
          <div v-if="isLoading" class="flex items-center gap-3">
            <div class="w-6 h-6 border-3 border-secondary/20 border-t-secondary rounded-full animate-spin"></div>
            <span class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Chargement des experts...</span>
          </div>
          <div v-else-if="!hasMorePages && providers.length > 0" class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 italic">
            Fin de l'annuaire
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import axios from '../axios';
import ProviderCard from '../components/marketplace/ProviderCard.vue';

// State
const providers = ref([]);
const isLoading = ref(false);
const searchQuery = ref('');
const activeCity = ref('Tout le pays');
const cities = ref(['Tout le pays', 'Douala', 'Yaoundé', 'Bafoussam', 'Garoua', 'Kribi']);

// Infinite Scroll
const currentPage = ref(1);
const hasMorePages = ref(true);
const scrollTarget = ref(null);

const fetchProviders = async (append = false) => {
  if (isLoading.value) return;
  isLoading.value = true;

  if (!append) {
    currentPage.value = 1;
    providers.value = [];
    hasMorePages.value = true;
  }

  try {
    const params = {
      search: searchQuery.value,
      city: activeCity.value === 'Tout le pays' ? null : activeCity.value,
      page: currentPage.value
    };
    const { data } = await axios.get('/api/marketplace/services/providers', { params });
    if (data.success) {
      const newProviders = data.data.data;
      if (append) {
        providers.value = [...providers.value, ...newProviders];
      } else {
        providers.value = newProviders;
      }
      hasMorePages.value = data.data.current_page < data.data.last_page;
    }
  } catch (err) {
    console.error("Erreur annuaire prestataires:", err);
  } finally {
    isLoading.value = false;
  }
};

const handleSearch = () => {
  fetchProviders();
};

const resetSearch = () => {
  searchQuery.value = '';
  activeCity.value = 'Tout le pays';
  fetchProviders();
};

// Intersection Observer for Infinite Scroll
let observer = null;
const setupObserver = () => {
  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && hasMorePages.value && !isLoading.value) {
      currentPage.value++;
      fetchProviders(true);
    }
  }, { threshold: 0.5 });

  if (scrollTarget.value) {
    observer.observe(scrollTarget.value);
  }
};

watch(activeCity, () => fetchProviders());

onMounted(() => {
  fetchProviders();
  setupObserver();
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>

<style scoped>
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
</style>
