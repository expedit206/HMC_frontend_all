<template>
  <div class="service-job-card h-full flex flex-col bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
    <!-- Header: Category & Urgency -->
    <div class="p-5 pb-0 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          <i :class="job.category?.icon || 'fas fa-tools'"></i>
        </div>
        <span class="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{{ job.category?.name || 'Service' }}</span>
      </div>
      <span :class="urgencyClass" class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
        {{ job.urgency }}
      </span>
    </div>

    <!-- Content -->
    <div class="p-5 flex-1">
      <h3 class="text-lg font-bold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
        {{ job.title }}
      </h3>
      <p class="text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
        {{ job.description }}
      </p>

      <div class=" flex items-center gap-3">
        <div class="flex items-center gap-2 text-xs text-muted-foreground ">
          <i class="fas fa-map-marker-alt w-4 text-secondary"></i>
          <span>{{ job.city }}, {{ job.neighborhood || 'Quartier non précisé' }}</span>
        </div>
        <div class="flex items-center gap-2 text-xs text-muted-foreground ">
          <i class="fas fa-calendar-alt w-4 text-secondary"></i>
          <span>Prévu le: {{ formatDate(job.preferred_date) }}</span>
        </div>
      </div>
    </div>

    <!-- Footer: Budget & Action -->
    <div class="p-4 pt-0 mt-auto">
      <div class="pt-2 border-t border-border flex items-center justify-between">
        <div class="flex flex-col">
          <span class="text-[10px] font-bold text-muted-foreground uppercase opacity-70">Budget estimé</span>
          <span class="text-base font-black text-primary">
            {{ formatBudget(job.min_budget, job.max_budget) }}
          </span>
        </div>
        
        <router-link v-if="authStore.user?.id === job.client_id" :to="'/marketplace/demandes/' + job.id" 
                class="px-4 h-10 rounded-xl bg-orange-100 text-orange-600 font-bold text-xs flex items-center justify-center hover:scale-105 transition-all">
          Gérer
        </router-link>
        <button v-else @click="openRespondModal"
                class="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-110 active:scale-95 transition-all">
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
    
    <RespondToJobModal
      :is-open="isModalOpen"
      :job="job"
      @close="isModalOpen = false"
      @success="handleSuccess"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useRouter } from 'vue-router';
import RespondToJobModal from './RespondToJobModal.vue';

const authStore = useAuthStore();
const router = useRouter();

const props = defineProps({
  job: {
    type: Object,
    required: true
  }
});

const isModalOpen = ref(false);

const openRespondModal = () => {
  if (!authStore.isAuthenticated) {
    router.push({ path: '/auth/connexion', query: { redirect: '/marketplace/demandes' } });
    return;
  }
  
  if (authStore.userActiveRole !== 'prestataire') {
    alert("Pour postuler à une demande, vous devez avoir activé le profil Prestataire de Services.");
    return;
  }
  
  isModalOpen.value = true;
};

const handleSuccess = (msg) => {
  alert(msg);
};

const urgencyClass = computed(() => {
  const map = {
    high: 'bg-red-500/10 text-red-500',
    medium: 'bg-orange-500/10 text-orange-500',
    low: 'bg-blue-500/10 text-blue-500'
  };
  return map[props.job.urgency] || 'bg-gray-500/10 text-gray-500';
});

const formatDate = (date) => {
  if (!date) return 'Dès que possible';
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long'
  });
};

const formatBudget = (min, max) => {
  if (!min && !max) return 'À discuter';
  if (min && max) return `${Math.round(min).toLocaleString()} - ${Math.round(max).toLocaleString()} FCFA`;
  return `${Math.round(min || max).toLocaleString()} FCFA`;
};
</script>

<style scoped>
.service-job-card {
  /* No hardcoded colors, all from Design System tokens */
}
</style>
