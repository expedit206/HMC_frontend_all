<template>
  <div class="min-h-screen bg-gray-50/50">

    <!-- ═══════════════════════════════════════════════
         BARRE DE FILTRES
    ════════════════════════════════════════════════ -->
    <header class="bg-white border-b border-border sticky top-0 z-30">
      <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div class="flex items-center gap-3">

        
          <!-- Filtres Desktop -->
          <div class="hidden md:flex items-center gap-2">

            <!-- Séparateur -->
            <div class="w-px h-6 bg-gray-200"></div>

            <!-- Filtre Catégorie -->
            <div class="relative">
              <i class="fas fa-th-large absolute left-3 top-1/2 -translate-y-1/2 text-primary text-xs pointer-events-none"></i>
              <select
                v-model="activeCategory"
                @change="fetchJobs()"
                class="pl-8 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all appearance-none cursor-pointer min-w-[140px]"
              >
                <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
              </select>
              <i class="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-[9px] pointer-events-none"></i>
            </div>

            <!-- Filtre Ville -->
            <div class="relative">
              <i class="fas fa-map-marker-alt absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-xs pointer-events-none"></i>
              <select
                v-model="activeCity"
                @change="onCityChange"
                class="pl-8 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 focus:ring-2 focus:ring-secondary/20 focus:border-secondary/40 transition-all appearance-none cursor-pointer min-w-[140px]"
              >
                <option value="Tout le pays">Tout le pays</option>
                <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
              </select>
              <i class="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-[9px] pointer-events-none"></i>
            </div>

            <!-- Filtre Quartier (toujours affiché, désactivé si pas de ville) -->
            <div class="relative">
              <i class="fas fa-location-dot absolute left-3 top-1/2 -translate-y-1/2 text-xs pointer-events-none"
                :class="activeCity !== 'Tout le pays' ? 'text-secondary' : 'text-gray-300'"
              ></i>
              <select
                v-model="activeNeighborhood"
                :disabled="activeCity === 'Tout le pays'"
                class="pl-8 pr-8 py-2.5 border rounded-xl text-xs font-bold focus:ring-2 focus:ring-secondary/20 focus:border-secondary/40 transition-all appearance-none min-w-[150px]"
                :class="activeCity !== 'Tout le pays'
                  ? 'bg-gray-50 border-gray-200 text-gray-700 cursor-pointer'
                  : 'bg-gray-100/60 border-gray-100 text-gray-300 cursor-not-allowed'"
              >
                <option value="">Choisir un quartier</option>
                <option v-for="q in neighborhoodsForCity" :key="q" :value="q">{{ q }}</option>
              </select>
              <i class="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-[9px] pointer-events-none"
                :class="activeCity !== 'Tout le pays' ? 'text-gray-400' : 'text-gray-300'"
              ></i>
            </div>
          </div>


            <!-- Recherche (toujours visible) -->
          <div class="relative flex-1  w-full">
            <i class="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
            <input
              v-model="searchQuery"
              @keyup.enter="handleSearch"
              type="text"
              placeholder="Plomberie, peinture, électricité..."
              class="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-white focus:border-primary/40 transition-all text-sm font-medium"
            />
          </div>

          <!-- Spacer -->
          <div class="flex-1 hidden md:block"></div>

          <!-- Bouton Publier un besoin (Desktop) -->
          <button
            class="hidden md:flex items-center gap-2 px-3 py-2.5 bg-primary text-white text-xs font-black rounded-xl hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 transition-all shrink-0"
          >
            <i class="fas fa-plus"></i>
            Publier un besoin
          </button>

          <!-- Bouton menu Mobile -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all shrink-0"
          >
            <i class="fas text-gray-600" :class="mobileMenuOpen ? 'fa-times' : 'fa-sliders-h'"></i>
          </button>
        </div>

        <!-- ─── Menu Mobile déroulant ─── -->
        <transition name="menu-drop">
          <div v-if="mobileMenuOpen" class="md:hidden mt-3 pb-3 border-t border-gray-100 pt-3 space-y-3">

            <!-- Filtre Catégorie Mobile -->
            <div>
              <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 block">
                <i class="fas fa-th-large mr-1 text-primary"></i>Catégorie
              </label>
              <select
                v-model="activeCategory"
                @change="fetchJobs(); mobileMenuOpen = false"
                class="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:ring-2 focus:ring-primary/20 transition-all"
              >
                <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
              </select>
            </div>

            <!-- Filtre Ville Mobile -->
            <div>
              <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 block">
                <i class="fas fa-map-marker-alt mr-1 text-secondary"></i>Ville
              </label>
              <select
                v-model="activeCity"
                @change="onCityChange"
                class="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:ring-2 focus:ring-secondary/20 transition-all"
              >
                <option value="Tout le pays">Tout le pays</option>
                <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
              </select>
            </div>

            <!-- Filtre Quartier Mobile -->
            <div v-if="activeCity !== 'Tout le pays'">
              <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 block">
                <i class="fas fa-location-dot mr-1 text-secondary"></i>Quartier
              </label>
              <select
                v-model="activeNeighborhood"
                class="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:ring-2 focus:ring-secondary/20 transition-all"
              >
                <option value="">Tous les quartiers</option>
                <option v-for="q in neighborhoodsForCity" :key="q" :value="q">{{ q }}</option>
              </select>
            </div>

            <!-- Bouton Publier Mobile -->
            <button
              @click="mobileMenuOpen = false"
              class="flex items-center justify-center gap-2 w-full px-5 py-3 bg-primary text-white text-sm font-black rounded-xl hover:bg-primary/90 transition-all"
            >
              <i class="fas fa-plus"></i>
              Publier un besoin
            </button>
          </div>
        </transition>
      </div>
    </header>

    <!-- ═══════════════════════════════════════════════
         MAIN CONTENT
    ════════════════════════════════════════════════ -->
    <main class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <!-- Titre + Tags filtres actifs -->
      <div class="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h2 class="text-xl font-black text-gray-900">Missions Disponibles</h2>
          <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
            <span v-if="activeCity === 'Tout le pays'">Toutes les catégories · Tout le pays</span>
            <span v-else-if="activeNeighborhood">{{ activeNeighborhood }}, {{ activeCity }}</span>
            <span v-else>Disponibles à {{ activeCity }}</span>
          </p>
        </div>

        <!-- Tags filtres actifs -->
        <div class="flex items-center gap-2 flex-wrap">
          <span
            v-if="activeCategory !== 'all'"
            class="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-full uppercase tracking-wide"
          >
            <i class="fas fa-tag text-[9px]"></i>
            {{ categories.find(c => c.id === activeCategory)?.name }}
            <button @click="activeCategory = 'all'; fetchJobs()" class="hover:text-red-500 transition-colors ml-0.5">
              <i class="fas fa-times text-[9px]"></i>
            </button>
          </span>
          <span
            v-if="activeCity !== 'Tout le pays'"
            class="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-black rounded-full uppercase tracking-wide"
          >
            <i class="fas fa-map-marker-alt text-[9px]"></i>{{ activeCity }}
            <button @click="activeCity = 'Tout le pays'; activeNeighborhood = ''" class="hover:text-red-500 transition-colors ml-0.5">
              <i class="fas fa-times text-[9px]"></i>
            </button>
          </span>
          <span
            v-if="activeNeighborhood"
            class="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black rounded-full uppercase tracking-wide"
          >
            <i class="fas fa-location-dot text-[9px]"></i>{{ activeNeighborhood }}
            <button @click="activeNeighborhood = ''" class="hover:text-red-500 transition-colors ml-0.5">
              <i class="fas fa-times text-[9px]"></i>
            </button>
          </span>
        </div>
      </div>

      <!-- LOADING STATE -->
      <div v-if="isLoading && jobs.length === 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="n in 6" :key="n" class="h-48 bg-white rounded-3xl border border-border animate-pulse shadow-sm"></div>
      </div>

      <!-- GRID -->
      <div v-else-if="jobs.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ServiceJobCard v-for="job in jobs" :key="job.id" :job="job" />
      </div>

      <!-- EMPTY STATE -->
      <div v-else-if="!isLoading" class="flex flex-col items-center justify-center py-32 text-center">
        <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <i class="fas fa-clipboard-check text-3xl text-gray-300"></i>
        </div>
        <h3 class="text-lg font-bold text-gray-900">Aucune mission trouvée</h3>
        <p class="text-gray-500 mt-2 text-sm max-w-xs mx-auto">Il n'y a pas de demande correspondant à vos critères pour le moment.</p>
        <button @click="resetFilters" class="mt-6 text-primary text-xs font-black uppercase hover:underline">
          Voir toutes les missions
        </button>
      </div>

      <!-- INFINITE SCROLL TARGET -->
      <div ref="scrollTarget" class="py-12 flex justify-center">
        <div v-if="isLoading && jobs.length > 0" class="flex items-center gap-3">
          <div class="w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <span class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Recherche de missions...</span>
        </div>
        <div v-else-if="!hasMorePages && jobs.length > 0" class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 italic">
          Toutes les missions ont été chargées
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import axios from '../../axios';
import ServiceJobCard from '../../components/services/ServiceJobCard.vue';

// ── State ──────────────────────────────────────────
const jobs = ref([]);
const isLoading = ref(false);
const searchQuery = ref('');
const activeCategory = ref('all');
const activeCity = ref('Tout le pays');
const activeNeighborhood = ref('');
const mobileMenuOpen = ref(false);

// ── Data ───────────────────────────────────────────
const categories = ref([
  { id: 'all', name: 'Toutes' },
  { id: 1, name: 'Plomberie' },
  { id: 2, name: 'Électricité' },
  { id: 3, name: 'Peinture' },
  { id: 4, name: 'Climatisation' },
  { id: 5, name: 'Menuiserie' },
  { id: 6, name: 'Maçonnerie' },
  { id: 7, name: 'Jardinage' },
  { id: 8, name: 'Déménagement' },
]);

const cities = ref(['Douala', 'Yaoundé', 'Bafoussam', 'Garoua', 'Kribi', 'Limbe', 'Buea', 'Ngaoundéré']);

const neighborhoods = ref({
  'Douala': ['Akwa', 'Bonanjo', 'Deido', 'Bonapriso', 'Bali', 'Makepe', 'Logbessou', 'Kotto', 'Ndokotti', 'PK10', 'Nyalla'],
  'Yaoundé': ['Bastos', 'Centre-ville', 'Biyem-Assi', 'Melen', 'Ekounou', 'Mvog-Ada', 'Ngousso', 'Essos', 'Mfandena', 'Odza'],
  'Bafoussam': ['Centre', 'Banengo', 'Kouoptamo', 'Tamdja', 'Djeleng'],
  'Garoua': ['Centre', 'Marché', 'Poumpoumré', 'Foulbéré'],
  'Kribi': ['Centre', 'Dombé', 'Grand Batanga'],
  'Limbe': ['Town', 'Mile 4', 'Molyko', 'Bota'],
  'Buea': ['Molyko', 'Bonduma', 'Gbonea', 'Small Soppo'],
  'Ngaoundéré': ['Centre', 'Dang', 'Burkina'],
});

const neighborhoodsForCity = computed(() => neighborhoods.value[activeCity.value] || []);

// ── Infinite Scroll ────────────────────────────────
const currentPage = ref(1);
const hasMorePages = ref(true);
const scrollTarget = ref(null);

// ── Fetch ──────────────────────────────────────────
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
      search: searchQuery.value || undefined,
      category_id: activeCategory.value !== 'all' ? activeCategory.value : undefined,
      city: activeCity.value !== 'Tout le pays' ? activeCity.value : undefined,
      neighborhood: activeNeighborhood.value || undefined,
      page: currentPage.value,
    };
    const { data } = await axios.get('/api/marketplace/services/posts', { params });
    if (data.success) {
      const newJobs = data.data.data;
      jobs.value = append ? [...jobs.value, ...newJobs] : newJobs;
      hasMorePages.value = data.data.current_page < data.data.last_page;
    }
  } catch (err) {
    console.error('Erreur chargement missions:', err);
  } finally {
    isLoading.value = false;
  }
};

const handleSearch = () => fetchJobs();

const onCityChange = () => {
  activeNeighborhood.value = '';
  fetchJobs();
};

const resetFilters = () => {
  searchQuery.value = '';
  activeCategory.value = 'all';
  activeCity.value = 'Tout le pays';
  activeNeighborhood.value = '';
  fetchJobs();
};

// ── Watchers ───────────────────────────────────────
watch(activeNeighborhood, () => fetchJobs());

// ── Infinite Scroll Observer ───────────────────────
let observer = null;
const setupObserver = () => {
  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && hasMorePages.value && !isLoading.value) {
      currentPage.value++;
      fetchJobs(true);
    }
  }, { threshold: 0.5 });
  if (scrollTarget.value) observer.observe(scrollTarget.value);
};

onMounted(() => {
  fetchJobs();
  setupObserver();
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>

<style scoped>
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.menu-drop-enter-active,
.menu-drop-leave-active {
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
}
.menu-drop-enter-from,
.menu-drop-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-8px);
}
.menu-drop-enter-to,
.menu-drop-leave-from {
  opacity: 1;
  max-height: 500px;
  transform: translateY(0);
}
</style>
