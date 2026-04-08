<template>
  <div class="provider-card p-5 bg-card border border-border rounded-2xl transition-all duration-300 hover:shadow-xl hover:border-primary/20 group relative overflow-hidden">
    <!-- Subtle background accent -->
    <div class="absolute -right-4 -top-4 w-20 h-20 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>

    <div class="flex flex-col h-full">
      <!-- Header: Unified Info -->
      <div class="flex items-start gap-4 mb-5">
        <!-- Avatar: Smarter size -->
        <div class="relative shrink-0">
          <div class="w-16 h-16 rounded-xl overflow-hidden border border-border group-hover:border-primary/50 transition-all duration-500 bg-muted">
            <img :src="provider.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + provider.name" 
              class="w-full h-full object-cover transform group-hover:scale-105 transition-transform" />
          </div>
          <div v-if="provider.is_verified || true" class="absolute -bottom-1 -right-1 w-5 h-5 bg-primary text-primary-foreground rounded-lg flex items-center justify-center text-[8px] shadow-lg border border-card">
            <i class="fas fa-check"></i>
          </div>
        </div>

        <div class="flex-1 min-w-0 pt-1">
          <h3 class="text-base font-bold text-foreground leading-tight truncate group-hover:text-primary transition-colors">
            {{ provider.name }}
          </h3>
          <p class="text-[11px] font-bold text-primary mt-1 uppercase tracking-wider">
            {{ mainSpecialty }}
          </p>
          <div class="flex items-center gap-1 mt-1 text-xs text-yellow-500 font-black">
            <i class="fas fa-star text-[10px]"></i>
            <span>4.9</span>
          </div>
        </div>
      </div>

      <!-- Bio / Description : The core of the request -->
      <div class="mb-5">
        <p class="text-xs text-muted-foreground leading-relaxed line-clamp-2 italic">
          "{{ provider.bio || 'Professionnel dévoué au service de vos projets avec expertise et ponctualité.' }}"
        </p>
      </div>

      <!-- Stats : More minimalist -->
      <div class="flex items-center gap-4 py-3 border-t border-border/50 mt-auto text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
         <div class="flex items-center gap-1.5 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
           <i class="fas fa-map-marker-alt text-secondary"></i>
           <span>{{ provider.city || 'Cameroun' }}</span>
         </div>
         <div class="w-1 h-1 bg-border rounded-full"></div>
         <div class="flex items-center gap-1.5 opacity-70">
           <i class="fas fa-briefcase text-secondary"></i>
           <span>12 Missions</span>
         </div>
      </div>

      <!-- Action Button -->
      <button @click="openContactModal" class="mt-4 w-full py-2.5 bg-muted/30 hover:bg-primary hover:text-primary-foreground text-foreground text-xs font-bold rounded-xl transition-all border border-border group-hover:border-primary/20">
        Contacter
      </button>
    </div>
    
    <ContactProviderModal
      :is-open="isModalOpen"
      :provider="provider"
      @close="isModalOpen = false"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import ContactProviderModal from './ContactProviderModal.vue';

const props = defineProps({
  provider: {
    type: Object,
    required: true
  }
});

const isModalOpen = ref(false);

const openContactModal = () => {
  isModalOpen.value = true;
};

const mainSpecialty = computed(() => {
  if (props.provider.services && props.provider.services.length > 0) {
    return props.provider.services[0].category?.name || 'Technicien';
  }
  return 'Expert Pro';
});
</script>

<style scoped>
/* No extra styles needed, everything is standard Tailwind from Design System tokens */
</style>
