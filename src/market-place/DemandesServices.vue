<template>
  <div class="job-board-page bg-background min-h-screen pb-20">
    <!-- ── MINIMALIST HERO ── -->
    <section class="relative bg-primary pt-16 pb-12 overflow-hidden">
      <div class="absolute inset-0 z-0 opacity-10" style="background-image: radial-gradient(#ffffff 0.5px, transparent 0.5px); background-size: 15px 15px;"></div>
      
      <!-- Subtle glow -->
      <div class="absolute -top-12 -left-12 w-64 h-64 bg-secondary/10 rounded-full blur-[80px]"></div>

      <div class=" mx-auto px-4 relative z-10 pt-4">
        <div class="w-full flex  justify-center items-center gap-8 ">
          <div class="flex-1 text-center  text-white space-y-4">
            <div class="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-[10px] font-black uppercase tracking-[0.2em]">
              <span class="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
              Job Board HMC
            </div>
            <h1 class="text-3xl md:text-5xl font-black leading-tight tracking-tight">
              Demandes de <span class="text-secondary">Services</span>
            </h1>
            <p class="text-base text-white/70 leading-relaxed">
              Consultez les besoins de nos utilisateurs et proposez vos services en quelques clics.
            </p>
            <div class="flex flex-wrap gap-4 justify-center  pt-2">
              <button class="px-6 py-3 bg-secondary text-secondary-foreground rounded-xl font-bold text-sm shadow-lg shadow-secondary/10 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                <i class="fas fa-plus"></i> Poster une demande
              </button>
            </div>
          </div>
          
          <!-- Stats Card : More compact -->
          <div class="hidden lg:grid grid-cols-1 gap-3 w-64 p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl">
             <div v-for="s in stats" :key="s.label" class="flex items-center gap-3">
               <div class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-secondary text-lg">
                 <i :class="s.icon"></i>
               </div>
               <div>
                 <p class="text-lg font-black text-white leading-none">{{ s.value }}</p>
                 <p class="text-[9px] font-bold text-white/40 uppercase tracking-widest">{{ s.label }}</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── SEARCH BAR (Sticky) ── -->
    <div class="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border py-3 transition-all duration-300">
      <div class=" mx-auto px-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div class="relative w-full md:max-w-sm">
          <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm"></i>
          <input v-model="searchQuery" type="text" placeholder="Ville, quartier, titre..."
            class="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all outline-none text-foreground text-sm font-medium"
            @keyup.enter="fetchJobs" />
        </div>
        
        <div class="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          <button v-for="cat in categories" :key="cat.id" 
            @click="activeCategory = cat.id"
            :class="[activeCategory === cat.id ? 'bg-primary text-primary-foreground border-primary' : 'bg-card border-border text-muted-foreground hover:bg-muted']"
            class="whitespace-nowrap px-4 py-2 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all shadow-sm">
            {{ cat.name }}
          </button>
        </div>
      </div>
    </div>

    <!-- ── MAIN CONTENT ── -->
    <main class=" mx-auto px-4 py-10">
      <!-- Loading State -->
      <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="n in 6" :key="n" class="h-64 bg-card/50 rounded-2xl animate-pulse"></div>
      </div>

      <!-- Empty State -->
      <div v-else-if="jobs.length === 0" class="text-center py-20 bg-card rounded-3xl border border-dashed border-border border-2">
        <div class="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <i class="fas fa-clipboard-list text-2xl text-muted-foreground"></i>
        </div>
        <h3 class="text-xl font-black text-foreground mb-2">Aucun besoin trouvé</h3>
        <p class="text-xs text-muted-foreground max-w-sm mx-auto">Il n'y a pas de demande pour le moment.</p>
        <button @click="resetFilters" class="mt-8 px-6 py-2 bg-primary/10 text-primary rounded-xl font-bold text-xs hover:bg-primary/20 transition-all">
          Réinitialiser
        </button>
      </div>

      <!-- Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ServiceJobCard v-for="job in jobs" :key="job.id" :job="job" />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from '../axios';
import ServiceJobCard from '../components/marketplace/ServiceJobCard.vue';

// State
const jobs = ref([]);
const isLoading = ref(true);
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

const fetchJobs = async () => {
  isLoading.value = true;
  try {
    const params = {
      search: searchQuery.value,
      category_id: activeCategory.value === 'all' ? null : activeCategory.value
    };
    const { data } = await axios.get('/api/marketplace/services/posts', { params });
    if (data.success) {
      jobs.value = data.data.data;
    }
  } catch (err) {
    console.error("Erreur chargement job board:", err);
  } finally {
    isLoading.value = false;
  }
};

const resetFilters = () => {
  searchQuery.value = '';
  activeCategory.value = 'all';
  fetchJobs();
};

watch(activeCategory, fetchJobs);

onMounted(fetchJobs);
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
