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
            placeholder="Rechercher une mission, une ville, un quartier..." 
            class="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-sm font-medium shadow-sm"
          />
        </div>
        
        <div class="hidden sm:flex items-center gap-3">
          <button class="px-5 py-2.5 bg-secondary text-secondary-foreground text-xs font-black rounded-xl hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-secondary/10">
            <i class="fas fa-plus"></i> Publier un besoin
          </button>
        </div>
      </div>
    </header>

    <!-- CONTENT LAYOUT -->
    <div class="flex h-[calc(100vh-130px)] max-w-[1400px] mx-auto overflow-hidden">
      <!-- SIDEBAR CATEGORIES (Statique) -->
      <aside class="hidden lg:flex flex-col w-64 h-full border-r border-border bg-white overflow-y-auto custom-scrollbar p-6">
        <div class="mb-8">
          <h3 class="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Catégories</h3>
          <div class="space-y-1">
            <button 
              v-for="cat in categories" 
              :key="cat.id"
              @click="activeCategory = cat.id"
              class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left"
              :class="activeCategory === cat.id ? 'bg-primary text-white shadow-lg shadow-orange-500/20' : 'text-gray-500 hover:bg-gray-50 hover:text-primary'"
            >
              <i :class="cat.icon" class="w-4 text-center"></i>
              <span>{{ cat.name }}</span>
            </button>
          </div>
        </div>

        <!-- Quick Stats Overlay (Mini) -->
        <div class="mt-auto space-y-3">
          <div v-for="s in stats" :key="s.label" class="p-3 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-secondary text-sm">
              <i :class="s.icon"></i>
            </div>
            <div>
              <p class="text-sm font-black text-gray-900 leading-none">{{ s.value }}</p>
              <p class="text-[8px] font-bold text-gray-400 uppercase tracking-widest">{{ s.label }}</p>
            </div>
          </div>
        </div>
      </aside>

      <!-- MAIN FEED -->
      <main class="flex-1 h-full overflow-y-auto custom-scrollbar bg-gray-50/20 p-4 md:p-8">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="text-xl font-black text-gray-900">Missions Disponibles</h2>
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
              {{ activeCategory === 'all' ? 'Toutes les catégories' : 'Besoin de services' }}
            </p>
          </div>
        </div>

        <!-- LOADING STATE -->
        <div v-if="isLoading && jobs.length === 0" class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div v-for="n in 4" :key="n" class="h-48 bg-white/60 rounded-3xl border border-border animate-pulse shadow-sm"></div>
        </div>

        <!-- GRID -->
        <div v-else-if="jobs.length > 0" class="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-6">
          <ServiceJobCard v-for="job in jobs" :key="job.id" :job="job" />
        </div>

        <!-- EMPTY STATE -->
        <div v-else-if="!isLoading" class="flex flex-col items-center justify-center py-32 text-center">
          <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <i class="fas fa-clipboard-check text-3xl text-gray-300"></i>
          </div>
          <h3 class="text-lg font-bold text-gray-900">Aucune mission trouvée</h3>
          <p class="text-gray-500 mt-2 text-sm max-w-xs mx-auto">Il n'y a pas de demande correspondant à vos critères pour le moment.</p>
          <button @click="resetFilters" class="mt-6 text-primary text-xs font-black uppercase hover:underline">Voir toutes les missions</button>
        </div>

        <!-- INFINITE SCROLL TARGET -->
        <div ref="scrollTarget" class="py-12 flex justify-center">
          <div v-if="isLoading" class="flex items-center gap-3">
            <div class="w-6 h-6 border-3 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            <span class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Recherche de missions...</span>
          </div>
          <div v-else-if="!hasMorePages && jobs.length > 0" class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 italic">
            Toutes les missions ont été chargées
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import axios from '../axios';
import ServiceJobCard from '../components/marketplace/ServiceJobCard.vue';

// State
const jobs = ref([]);
const isLoading = ref(false);
const searchQuery = ref('');
const activeCategory = ref('all');
const stats = ref([
  { label: 'Demandes actives', value: '12', icon: 'fas fa-briefcase' },
  { label: 'Pros connectés', value: '150+', icon: 'fas fa-user-check' },
  { label: 'Projets clos', value: '450+', icon: 'fas fa-check-double' }
]);

const categories = ref([
  { id: 'all', name: 'Tout', icon: 'fas fa-th-large' },
  { id: 1, name: 'Plomberie', icon: 'fas fa-sink' },
  { id: 2, name: 'Électricité', icon: 'fas fa-bolt' },
  { id: 3, name: 'Peinture', icon: 'fas fa-paint-roller' },
  { id: 4, name: 'Climatisation', icon: 'fas fa-wind' }
]);

// Infinite Scroll
const currentPage = ref(1);
const hasMorePages = ref(true);
const scrollTarget = ref(null);

const fetchJobs = async (append = false) => {
  if (isLoading.value) return;
  isLoading.value = true;

  if (!append) {
    currentPage.value = 1;
    jobs.value = [];
    hasMorePages.value = true;
  }

  try {
    const params = {
      search: searchQuery.value,
      category_id: activeCategory.value === 'all' ? null : activeCategory.value,
      page: currentPage.value
    };
    const { data } = await axios.get('/api/marketplace/services/posts', { params });
    if (data.success) {
      const newJobs = data.data.data;
      if (append) {
        jobs.value = [...jobs.value, ...newJobs];
      } else {
        jobs.value = newJobs;
      }
      hasMorePages.value = data.data.current_page < data.data.last_page;
    }
  } catch (err) {
    console.error("Erreur chargement job board:", err);
  } finally {
    isLoading.value = false;
  }
};

const handleSearch = () => {
  fetchJobs();
};

const resetFilters = () => {
  searchQuery.value = '';
  activeCategory.value = 'all';
  fetchJobs();
};

// Intersection Observer for Infinite Scroll
let observer = null;
const setupObserver = () => {
  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && hasMorePages.value && !isLoading.value) {
      currentPage.value++;
      fetchJobs(true);
    }
  }, { threshold: 0.5 });

  if (scrollTarget.value) {
    observer.observe(scrollTarget.value);
  }
};

watch(activeCategory, () => fetchJobs());

onMounted(() => {
  fetchJobs();
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
