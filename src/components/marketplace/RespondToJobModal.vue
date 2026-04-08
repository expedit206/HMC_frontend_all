<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
    <div class="bg-card w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl animate-fade-in-up border border-border">
      <!-- Header -->
      <div class="px-6 py-4 border-b border-border flex items-center justify-between bg-secondary/5">
        <h3 class="text-lg font-black text-foreground">Proposer vos services</h3>
        <button @click="close" class="w-8 h-8 rounded-full bg-muted text-muted-foreground hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <!-- Body -->
      <div class="p-6">
        <!-- Job Ref -->
        <div class="mb-6 p-3 bg-muted/30 rounded-2xl border border-border">
          <p class="text-xs font-bold text-muted-foreground uppercase mb-1">Pour la demande :</p>
          <p class="text-sm font-bold text-foreground line-clamp-1">{{ job?.title }}</p>
        </div>

        <form @submit.prevent="submitProposal">
          <div class="space-y-4">
            <!-- Message -->
            <div>
              <label class="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Votre offre (Message pour le client)</label>
              <textarea v-model="form.message" rows="4" required placeholder="Présentez brièvement vos compétences pour ce besoin..."
                class="w-full px-4 py-3 bg-muted/30 border border-border rounded-xl focus:ring-2 focus:ring-secondary/20 text-sm outline-none transition-all resize-none"></textarea>
            </div>

            <!-- Price -->
            <div>
              <label class="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Prix proposé (FCFA)</label>
              <div class="relative">
                 <input v-model.number="form.proposed_price" type="number" required placeholder="Ex: 15000" min="0" step="100"
                   class="w-full pl-4 pr-16 py-3 bg-muted/30 border border-border rounded-xl focus:ring-2 focus:ring-secondary/20 font-bold text-lg outline-none transition-all" />
                 <span class="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground">FCFA</span>
              </div>
              <p v-if="job?.max_budget" class="text-[10px] text-muted-foreground mt-1 text-right">
                Budget client: {{ Math.round(job.min_budget) }} - {{ Math.round(job.max_budget) }} FCFA
              </p>
            </div>
          </div>

          <!-- Actions -->
          <div class="mt-8 flex items-center justify-end gap-3">
            <button type="button" @click="close" class="px-5 py-2.5 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">
              Annuler
            </button>
            <button type="submit" :disabled="isLoading || !form.message || !form.proposed_price"
              class="px-6 py-2.5 bg-secondary text-secondary-foreground rounded-xl text-sm font-bold shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all flex items-center gap-2">
              <i v-if="isLoading" class="fas fa-spinner fa-spin"></i>
              <i v-else class="fas fa-check"></i>
              Envoyer l'offre
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue';
import axios from '../../axios';

const props = defineProps({
  isOpen: Boolean,
  job: Object
});

const emit = defineEmits(['close', 'success']);

const form = ref({
  message: '',
  proposed_price: null
});

const isLoading = ref(false);

const close = () => {
  form.value = { message: '', proposed_price: null };
  emit('close');
};

const submitProposal = async () => {
  isLoading.value = true;
  try {
    const { data } = await axios.post(`/api/marketplace/services/posts/${props.job.id}/respond`, form.value);
    
    if (data.success) {
      emit('success', data.message);
      close();
    }
  } catch (error) {
    console.error("Erreur de proposition:", error);
    if(error.response?.data?.message) {
      alert(error.response.data.message);
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.3s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
