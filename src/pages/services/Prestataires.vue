<template>
  <div class="min-h-screen bg-gray-50/50">

    <!-- ═══════════════════════════════════════════════
         BARRE DE FILTRES (Desktop)
    ════════════════════════════════════════════════ -->
    <header class="bg-white border-b border-border sticky top-0 z-30">
      <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div class="flex items-center gap-3">

        

          <!-- Filtres Desktop (cachés sur mobile) -->
          <div class="hidden md:flex items-center gap-2">

            <!-- Séparateur visuel -->
            <div class="w-px h-6 bg-gray-200"></div>

            <!-- Filtre Ville -->
            <div class="relative">
              <i class="fas fa-map-marker-alt absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-xs pointer-events-none"></i>
              <select
                v-model="activeCity"
                @change="onCityChange"
                class="pl-8 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 focus:ring-2 focus:ring-secondary/20 focus:border-secondary/40 transition-all appearance-none cursor-pointer min-w-[140px]"
              >
                <option value="Tout le pays"> Toutes les villes</option>
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
                <option value="">{{ activeCity === 'Tout le pays' ? 'Choisir une ville d\'abord' : 'Tous les quartiers' }}</option>
                <option v-for="q in neighborhoodsForCity" :key="q" :value="q">{{ q }}</option>
              </select>
              <i class="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-[9px] pointer-events-none"
                :class="activeCity !== 'Tout le pays' ? 'text-gray-400' : 'text-gray-300'"
              ></i>
            </div>
          </div>

            <!-- Recherche (toujours visible) -->
          <div class="relative flex-1 min-w-0 ">
            <i class="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
            <input
              v-model="searchQuery"
              @keyup.enter="handleSearch"
              type="text"
              placeholder="Plombier, électricien..."
              class="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary/20 focus:bg-white focus:border-secondary/40 transition-all text-sm font-medium"
            />
          </div>
          <!-- Spacer -->
          <div class="flex-1 hidden md:block"></div>

          <!-- Bouton Devenir Prestataire (Desktop) -->
          <router-link
            to="/prestataire/inscription"
            class="hidden md:flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-xs font-black rounded-xl hover:bg-secondary hover:shadow-lg hover:shadow-secondary/25 transition-all shrink-0"
          >
            <i class="fas fa-user-plus"></i>
            Devenir Prestataire
          </router-link>

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

            <!-- Filtre Ville -->
            <div>
              <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 block">
                <i class="fas fa-map-marker-alt mr-1 text-secondary"></i>Ville
              </label>
              <select
                v-model="activeCity"
                @change="onCityChange"
                class="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:ring-2 focus:ring-secondary/20 focus:border-secondary/40 transition-all"
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
                class="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 focus:ring-2 focus:ring-secondary/20 focus:border-secondary/40 transition-all"
              >
                <option value="">Tous les quartiers</option>
                <option v-for="q in neighborhoodsForCity" :key="q" :value="q">{{ q }}</option>
              </select>
            </div>

            <!-- Lien Devenir Prestataire Mobile -->
            <router-link
              to="/prestataire/inscription"
              @click="mobileMenuOpen = false"
              class="flex items-center justify-center gap-2 w-full px-5 py-3 bg-gray-900 text-white text-sm font-black rounded-xl hover:bg-secondary transition-all"
            >
              <i class="fas fa-user-plus"></i>
              Devenir Prestataire
            </router-link>
          </div>
        </transition>
      </div>
    </header>

    <!-- ═══════════════════════════════════════════════
         MAIN CONTENT
    ════════════════════════════════════════════════ -->
    <main class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <!-- Titre + compteur -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-xl font-black text-gray-900">Annuaire des Pros</h2>
          <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
            <span v-if="activeCity === 'Tout le pays'">Disponibles dans tout le pays</span>
            <span v-else-if="activeNeighborhood">{{ activeNeighborhood }}, {{ activeCity }}</span>
            <span v-else>Disponibles à {{ activeCity }}</span>
          </p>
        </div>
        <!-- Tags filtres actifs -->
        <div class="flex items-center gap-2 flex-wrap justify-end">
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
      <div v-if="isLoading && providers.length === 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="n in 8" :key="n" class="h-64 bg-white rounded-3xl border border-border animate-pulse shadow-sm"></div>
      </div>

      <!-- GRID -->
      <div v-else-if="providers.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ProviderCard v-for="pro in providers" :key="pro.id" :provider="pro" />
      </div>

      <!-- EMPTY STATE -->
      <div v-else-if="!isLoading" class="flex flex-col items-center justify-center py-32 text-center">
        <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <i class="fas fa-search-minus text-3xl text-gray-300"></i>
        </div>
        <h3 class="text-lg font-bold text-gray-900">Aucun expert trouvé</h3>
        <p class="text-gray-500 mt-2 text-sm max-w-xs mx-auto">Nous n'avons pas encore de prestataire pour cette recherche ou dans cette zone.</p>
        <button @click="resetSearch" class="mt-6 text-secondary text-xs font-black uppercase hover:underline">
          Réinitialiser les filtres
        </button>
      </div>

      <!-- INFINITE SCROLL TARGET -->
      <div ref="scrollTarget" class="py-12 flex justify-center">
        <div v-if="isLoading && providers.length > 0" class="flex items-center gap-3">
          <div class="w-6 h-6 border-2 border-secondary/20 border-t-secondary rounded-full animate-spin"></div>
          <span class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Chargement des experts...</span>
        </div>
        <div v-else-if="!hasMorePages && providers.length > 0" class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 italic">
          Fin de l'annuaire
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import axios from '../../axios';
import ProviderCard from '../../components/services/ProviderCard.vue';

// ── State ──────────────────────────────────────────
const providers = ref([]);
const isLoading = ref(false);
const searchQuery = ref('');
const activeCity = ref('Tout le pays');
const activeNeighborhood = ref('');
const mobileMenuOpen = ref(false);

// ── Data ───────────────────────────────────────────
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
      search: searchQuery.value || undefined,
      city: activeCity.value !== 'Tout le pays' ? activeCity.value : undefined,
      neighborhood: activeNeighborhood.value || undefined,
      page: currentPage.value,
    };
    const { data } = await axios.get('/api/marketplace/services/providers', { params });
    if (data.success) {
      const newProviders = data.data.data;
      providers.value = append ? [...providers.value, ...newProviders] : newProviders;
      hasMorePages.value = data.data.current_page < data.data.last_page;
    }
  } catch (err) {
    console.error('Erreur annuaire prestataires:', err);
  } finally {
    isLoading.value = false;
  }
};

const handleSearch = () => fetchProviders();

const onCityChange = () => {
  activeNeighborhood.value = '';
  fetchProviders();
};

const resetSearch = () => {
  searchQuery.value = '';
  activeCity.value = 'Tout le pays';
  activeNeighborhood.value = '';
  fetchProviders();
};

// ── Watchers ───────────────────────────────────────
watch(activeNeighborhood, () => fetchProviders());
// Fermer menu mobile si on clique en dehors
watch(mobileMenuOpen, (val) => {
  if (val) {
    document.addEventListener('click', closeMobileMenu);
  } else {
    document.removeEventListener('click', closeMobileMenu);
  }
});

const closeMobileMenu = (e) => {
  if (!e.target.closest('.mobile-menu-wrapper')) {
    mobileMenuOpen.value = false;
  }
};

// ── Infinite Scroll Observer ───────────────────────
let observer = null;
const setupObserver = () => {
  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && hasMorePages.value && !isLoading.value) {
      currentPage.value++;
      fetchProviders(true);
    }
  }, { threshold: 0.5 });
  if (scrollTarget.value) observer.observe(scrollTarget.value);
};

onMounted(() => {
  fetchProviders();
  setupObserver();
});

onUnmounted(() => {
  if (observer) observer.disconnect();
  document.removeEventListener('click', closeMobileMenu);
});
</script>

<style scoped>
/* Select arrow custom */
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

/* Animation menu dropdown mobile */
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
  max-height: 400px;
  transform: translateY(0);
}

/* Animation filtre quartier */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.2s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-6px);
}
</style>
