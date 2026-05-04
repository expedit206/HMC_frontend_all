<template>
  <aside class="w-80 bg-card border-l border-border h-[calc(100vh-80px)] sticky top-[80px] overflow-y-auto custom-scrollbar flex flex-col p-4 hidden lg:flex space-y-6">
    
    <!-- Widget Notifications Rapides -->
    <div class="bg-muted/30 rounded-xl p-4 border border-border">
      <h3 class="font-bold text-foreground mb-3 flex items-center gap-2">
        <i class="fas fa-bell text-primary"></i> Récent
      </h3>
      <ul class="space-y-3">
        <li class="flex items-start gap-3 p-2 hover:bg-card rounded-lg cursor-pointer transition-colors border border-transparent hover:border-border">
          <div class="w-8 h-8 rounded-full bg-secondary/10 text-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
            <i class="fas fa-bullhorn text-sm"></i>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-xs text-foreground leading-snug"><b>Nouveau bien</b> ajouté dans votre secteur géographique favori.</p>
            <p class="text-[10px] text-muted-foreground mt-1">Il y a 2h</p>
          </div>
        </li>
        <li class="flex items-start gap-3 p-2 hover:bg-card rounded-lg cursor-pointer transition-colors border border-transparent hover:border-border">
          <div class="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
            <i class="fas fa-percentage text-sm"></i>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-xs text-foreground leading-snug"><b>Promotion</b> sur les services de plomberie cette semaine.</p>
            <p class="text-[10px] text-muted-foreground mt-1">Hier</p>
          </div>
        </li>
      </ul>
      <RouterLink to="/notifications" class="block text-center text-xs font-semibold text-primary mt-3 hover:underline">Voir toutes les notifications</RouterLink>
    </div>

    <!-- Widget Stats Plateforme -->
    <div v-if="stats" class="bg-gradient-to-br from-primary to-secondary rounded-xl p-4 text-white shadow-md relative overflow-hidden group">
      <div class="absolute -right-4 -top-4 opacity-10 transform group-hover:scale-110 transition-transform duration-700">
        <i class="fas fa-chart-line text-9xl"></i>
      </div>
      <h3 class="font-bold mb-4 relative z-10 flex items-center gap-2 text-sm">
        <i class="fas fa-globe-africa"></i> Sur HomeCameroon
      </h3>
      <div class="grid grid-cols-2 gap-3 relative z-10">
        <div class="bg-black/20 rounded-lg p-2 text-center backdrop-blur-sm">
          <div class="text-lg font-black">{{ formatNumber(stats.total_properties) }}</div>
          <div class="text-[10px] uppercase tracking-wider opacity-80">Biens</div>
        </div>
        <div class="bg-black/20 rounded-lg p-2 text-center backdrop-blur-sm">
          <div class="text-lg font-black">{{ formatNumber(stats.active_providers) }}</div>
          <div class="text-[10px] uppercase tracking-wider opacity-80">Pros</div>
        </div>
        <div class="bg-black/20 rounded-lg p-2 text-center backdrop-blur-sm col-span-2 flex justify-between items-center px-4">
          <span class="text-[10px] uppercase tracking-wider opacity-80">Marketplace</span>
          <span class="font-bold">{{ formatNumber(stats.total_products) }} offres</span>
        </div>
      </div>
    </div>

    <!-- Widget Tendances -->
    <div>
      <h3 class="font-bold text-foreground mb-3 flex items-center gap-2">
        <i class="fas fa-fire text-secondary"></i> Tendances
      </h3>
      <div class="flex flex-wrap gap-2">
        <RouterLink to="/annonces?category=Appartement" class="px-3 py-1.5 bg-muted hover:bg-primary hover:text-white transition-colors rounded-full text-xs font-semibold text-muted-foreground border border-border">
          #AppartementYaoundé
        </RouterLink>
        <RouterLink to="/services/prestataires" class="px-3 py-1.5 bg-muted hover:bg-secondary hover:text-white transition-colors rounded-full text-xs font-semibold text-muted-foreground border border-border">
          #PlombierDouala
        </RouterLink>
        <RouterLink to="/marketplace?category=meubles" class="px-3 py-1.5 bg-muted hover:bg-primary hover:text-white transition-colors rounded-full text-xs font-semibold text-muted-foreground border border-border">
          #MeublesDesign
        </RouterLink>
        <RouterLink to="/annonces" class="px-3 py-1.5 bg-muted hover:bg-primary hover:text-white transition-colors rounded-full text-xs font-semibold text-muted-foreground border border-border">
          #Investissement
        </RouterLink>
      </div>
    </div>

    <!-- Mini Footer -->
    <div class="mt-auto pt-6 text-[10px] text-muted-foreground/60 flex flex-wrap gap-x-3 gap-y-1 justify-center">
      <RouterLink to="/politique-confidentialite" class="hover:text-foreground">Confidentialité</RouterLink>
      <RouterLink to="/assistance" class="hover:text-foreground">Assistance</RouterLink>
      <span>&copy; {{ new Date().getFullYear() }} HomeCameroon</span>
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

function formatNumber(num) {
  if (!num) return '0'
  return new Intl.NumberFormat('fr-FR').format(num)
}
</script>
