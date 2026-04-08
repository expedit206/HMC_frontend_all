<template>
  <div class="provider-directory bg-background min-h-screen pb-20">
    <!-- ── MINIMALIST HERO ── -->
    <section class="relative bg-primary pt-16 pb-12 overflow-hidden text-center">
      <div class="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#ffffff_0.5px,transparent_0.5px)] bg-[size:15px_15px]"></div>
      
      <!-- Subtle Ambient light -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-secondary/10 rounded-full blur-[120px]"></div>

      <div class="max-w-4xl mx-auto px-4 relative z-10 space-y-6">
        <div class="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-[10px] font-black uppercase tracking-[0.2em] text-white/90">
          <i class="fas fa-certificate text-secondary"></i>
          Expertise Vérifiée HMC
        </div>
        <h1 class="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">
          Trouvez un <span class="text-secondary drop-shadow-sm">Prestataire</span>
        </h1>
        <p class="text-base text-white/70 max-w-xl mx-auto leading-relaxed">
          Accédez à notre réseau de techniciens qualifiés et notés pour tous vos travaux de maintenance.
        </p>

        <!-- Compact Search -->
        <div class="relative max-w-xl mx-auto translate-y-6">
          <input v-model="searchQuery" type="text" placeholder="Plomberie, Electricité..."
            class="w-full pl-12 pr-28 py-3.5 bg-card text-foreground rounded-2xl border-none focus:ring-4 focus:ring-secondary/20 transition-all outline-none text-sm font-bold shadow-xl shadow-black/10"
            @keyup.enter="fetchProviders" />
          <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"></i>
          <button @click="fetchProviders" class="absolute right-1.5 top-1/2 -translate-y-1/2 px-5 py-2 bg-primary text-primary-foreground rounded-xl font-bold text-xs hover:bg-primary/90 transition-all">
            Rechercher
          </button>
        </div>
      </div>
    </section>

    <!-- ── CONTENT ── -->
    <main class=" mx-auto px-4 mt-4 mb-12">
      <!-- Minimalist Filters -->
      <div class="flex flex-wrap items-center justify-center gap-2 mb-12">
        <button v-for="city in cities" :key="city" 
          @click="activeCity = city"
          :class="[activeCity === city ? 'bg-secondary text-secondary-foreground border-secondary font-black' : 'bg-card border-border text-muted-foreground hover:bg-muted']"
          class="px-4 py-2 rounded-xl border text-[10px] uppercase tracking-widest transition-all shadow-sm">
          {{ city }}
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="n in 8" :key="n" class="h-64 bg-card/60 backdrop-blur-sm rounded-2xl border border-border animate-pulse"></div>
      </div>

      <!-- Grid: Optimized gap -->
      <div v-else-if="providers.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProviderCard v-for="pro in providers" :key="pro.id" :provider="pro" />
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-24 bg-card/30 backdrop-blur-sm rounded-3xl border border-dashed border-border border-2">
        <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <i class="fas fa-user-slash text-2xl text-primary"></i>
        </div>
        <h2 class="text-xl font-black text-foreground mb-3">Aucun prestataire trouvé</h2>
        <p class="text-xs text-muted-foreground max-w-xs mx-auto mb-8 font-medium">
          Désolé, nous n'avons pas encore de prestataire correspondant à ces critères dans cette zone.
        </p>
        <button @click="resetSearch" class="px-6 py-2.5 bg-secondary text-secondary-foreground rounded-xl font-bold text-xs shadow-lg hover:scale-105 active:scale-95 transition-all">
          Réinitialiser
        </button>
      </div>
    </main>

    <!-- ── CALL TO ACTION : Minimalized ── -->
    <section class="max-w-[1200px] mx-auto px-4 mb-20">
      <div class="relative p-8 md:p-12 bg-card border border-border rounded-3xl overflow-hidden shadow-xl">
         <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
           <div class="space-y-2">
              <h2 class="text-2xl md:text-3xl font-black text-foreground">Vous êtes un <span class="text-primary">Professionnel ?</span></h2>
              <p class="text-muted-foreground text-sm max-w-md font-medium">Rejoignez le réseau Home Cameroon et boostez votre activité.</p>
           </div>
           <router-link to="/prestataire/inscription" class="px-8 py-3.5 bg-primary text-primary-foreground text-sm font-black rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all">
             Inscription Gratuite
           </router-link>
         </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from '../axios';
import ProviderCard from '../components/marketplace/ProviderCard.vue';

// State
const providers = ref([]);
const isLoading = ref(true);
const searchQuery = ref('');
const activeCity = ref('Tout le pays');
const cities = ref(['Tout le pays', 'Douala', 'Yaoundé', 'Bafoussam', 'Garoua', 'Kribi']);

const fetchProviders = async () => {
  isLoading.value = true;
  try {
    const params = {
      search: searchQuery.value,
      city: activeCity.value === 'Tout le pays' ? null : activeCity.value
    };
    const { data } = await axios.get('/api/marketplace/services/providers', { params });
    if (data.success) {
      providers.value = data.data.data; // Paginated data
    }
  } catch (err) {
    console.error("Erreur annuaire prestataires:", err);
  } finally {
    isLoading.value = false;
  }
};

const resetSearch = () => {
  searchQuery.value = '';
  activeCity.value = 'Tout le pays';
  fetchProviders();
};

watch(activeCity, fetchProviders);

onMounted(fetchProviders);
</script>

<style scoped>
/* Focus on simplicity */
</style>
