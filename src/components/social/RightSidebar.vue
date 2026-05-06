<template>
  <aside class="w-[350px] bg-card border-l border-border h-[calc(100vh-80px)] sticky top-[80px] overflow-y-auto custom-scrollbar flex flex-col hidden lg:flex">
    
    <!-- HEADER RECHERCHE RAPIDE (Visuel) -->
    <div class="p-6 pb-2">
      <div class="relative group">
        <input 
          type="text" 
          placeholder="Rechercher sur le feed..." 
          class="w-full bg-muted/50 border border-border rounded-2xl py-3 pl-12 pr-4 text-xs font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-hidden"
        >
        <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"></i>
      </div>
    </div>

    <div class="p-6 space-y-8">
      
      <!-- SECTION 1: À LA UNE (Spotlight) -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="font-black text-foreground text-xs uppercase tracking-[0.2em] flex items-center gap-2">
            <span class="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse"></span>
            À la une
          </h3>
          <span class="text-[10px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-md">Live</span>
        </div>

        <div class="group relative rounded-2xl overflow-hidden bg-muted aspect-4/5 shadow-lg shadow-black/5 hover:shadow-xl transition-all">
          <img 
            src="/images/categoriebien/dupp.jfif" 
            alt="Product Spotlight" 
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          >
          <div class="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent p-5 flex flex-col justify-end">
            <div class="bg-secondary text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded w-fit mb-2">Offre de la semaine</div>
            <h4 class="text-white font-black text-lg leading-tight mb-2">Villa de Luxe Moderne avec Piscine à Bastos</h4>
            <div class="flex items-center justify-between">
              <span class="text-secondary font-black text-xl">1 200 000 <small class="text-[10px]">FCFA/mois</small></span>
              <button class="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white transition-colors hover:text-black">
                <i class="fas fa-arrow-right text-xs"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- SECTION 2: STATS DYNAMIQUES -->
      <div v-if="stats" class="bg-linear-to-br from-[#1B0B38] to-[#6b21a8] rounded-3xl p-5 text-white shadow-xl relative overflow-hidden group border border-white/5">
        <div class="absolute -right-8 -top-8 opacity-10 transform group-hover:rotate-12 transition-transform duration-1000 rotate-[-15deg]">
          <i class="fas fa-chart-line text-[200px]"></i>
        </div>
        
        <div class="relative z-10 space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <i class="fas fa-rocket text-xs"></i>
              </div>
              <span class="text-[10px] font-black uppercase tracking-widest opacity-80">En temps réel</span>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1">
              <div class="text-2xl font-black">{{ formatNumber(stats.total_properties) }}</div>
              <div class="text-[9px] font-bold uppercase tracking-widest opacity-60">Biens disponibles</div>
            </div>
            <div class="space-y-1">
              <div class="text-2xl font-black">{{ formatNumber(stats.active_providers) }}</div>
              <div class="text-[9px] font-bold uppercase tracking-widest opacity-60">Prestataires certifiés</div>
            </div>
          </div>

          <div class="pt-4 border-t border-white/10 flex items-center justify-between">
            <div class="flex -space-x-2">
              <div v-for="i in 4" :key="i" class="w-7 h-7 rounded-full border-2 border-[#1B0B38] bg-muted overflow-hidden">
                <img :src="`https://i.pravatar.cc/100?u=${i}`" alt="Avatar">
              </div>
              <div class="w-7 h-7 rounded-full border-2 border-[#1B0B38] bg-secondary flex items-center justify-center text-[8px] font-black">
                +{{ stats.total_products }}
              </div>
            </div>
            <span class="text-[10px] font-bold opacity-80">Offres marketplace</span>
          </div>
        </div>
      </div>

      <!-- SECTION 3: TENDANCES (Hashtags focus) -->
      <div class="space-y-4">
        <h3 class="font-black text-foreground text-xs uppercase tracking-[0.2em] flex items-center gap-2">
          <i class="fas fa-fire-flame-curved text-orange-500"></i>
          Tendances
        </h3>
        
        <div class="space-y-1">
          <RouterLink 
            v-for="trend in trends" 
            :key="trend.tag" 
            :to="trend.to"
            class="flex items-center justify-between p-3 rounded-2xl hover:bg-muted group transition-all"
          >
            <div class="space-y-0.5">
              <div class="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{{ trend.category }}</div>
              <div class="text-sm font-black text-foreground group-hover:text-primary transition-colors">#{{ trend.tag }}</div>
            </div>
            <div class="text-right">
              <div class="text-xs font-black text-secondary">{{ trend.count }}</div>
              <div class="text-[9px] font-bold text-muted-foreground uppercase">Posts</div>
            </div>
          </RouterLink>
        </div>
      </div>

      <!-- SECTION 4: RÉCENT (Activity) -->
      <div class="space-y-4">
        <h3 class="font-black text-foreground text-xs uppercase tracking-[0.2em] flex items-center gap-2">
          <i class="fas fa-bolt text-secondary"></i>
          Activités récentes
        </h3>
        
        <div class="space-y-3">
          <div v-for="(activity, i) in activities" :key="i" class="flex gap-4 p-3 rounded-2xl border border-border bg-muted/10 hover:bg-muted/30 transition-all cursor-pointer">
            <div :class="`w-10 h-10 rounded-full ${activity.bg} flex items-center justify-center shrink-0`">
              <i :class="`${activity.icon} ${activity.color} text-xs`"></i>
            </div>
            <div class="space-y-1 min-w-0">
              <p class="text-xs text-foreground font-medium leading-tight line-clamp-2" v-html="activity.text"></p>
              <p class="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{{ activity.time }}</p>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- MINI FOOTER -->
    <div class="mt-auto p-6 pt-0">
      <div class="border-t border-border pt-4 pb-2 flex flex-wrap gap-x-4 gap-y-2 justify-center">
        <RouterLink to="/politique-confidentialite" class="text-[9px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Politique</RouterLink>
        <RouterLink to="/assistance" class="text-[9px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Assistance</RouterLink>
        <RouterLink to="/contact" class="text-[9px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Contact</RouterLink>
      </div>
      <p class="text-[9px] font-black uppercase tracking-widest text-muted-foreground/40 text-center">
        &copy; {{ new Date().getFullYear() }} HomeCameroon • Douala - Yaoundé
      </p>
    </div>

  </aside>
</template>

<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  stats: {
    type: Object,
    default: null
  }
})

const trends = [
  { tag: 'AppartementYaounde', category: 'Immobilier', count: '142', to: '/annonces?city=yaoundé' },
  { tag: 'PlombierDouala', category: 'Services', count: '89', to: '/services/prestataires' },
  { tag: 'MeublesDesign', category: 'Marketplace', count: '256', to: '/marketplace' },
  { tag: 'Investissement', category: 'Conseils', count: '12', to: '/annonces' },
]

const activities = [
  { 
    icon: 'fas fa-home', 
    bg: 'bg-secondary/10', 
    color: 'text-secondary', 
    text: 'Une nouvelle <b>Villa Moderne</b> a été publiée à Kribi (Plage).', 
    time: 'Il y a 15 min' 
  },
  { 
    icon: 'fas fa-tools', 
    bg: 'bg-orange-500/10', 
    color: 'text-orange-500', 
    text: '<b>Jean D.</b> recherche un plombier certifié pour une urgence à Bonapriso.', 
    time: 'Il y a 42 min' 
  },
  { 
    icon: 'fas fa-shopping-bag', 
    bg: 'bg-primary/10', 
    color: 'text-primary', 
    text: 'Vente flash terminée: <b>12 Onduleurs</b> vendus en moins de 2h.', 
    time: 'Il y a 1h' 
  },
]

function formatNumber(num) {
  if (!num) return '0'
  return new Intl.NumberFormat('fr-FR').format(num)
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: hsl(var(--muted-foreground) / 0.1);
  border-radius: 10px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: hsl(var(--primary) / 0.3);
}

@keyframes pulse-slow {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(0.98); }
}
</style>
