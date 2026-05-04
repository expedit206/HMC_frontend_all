<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
    <div class="bg-card w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl animate-fade-in-up border border-border">
      <!-- Header -->
      <div class="px-6 py-4 border-b border-border flex items-center justify-between bg-primary/5">
        <h3 class="text-lg font-black text-foreground">Contacter {{ provider?.name }}</h3>
        <button @click="close" class="w-8 h-8 rounded-full bg-muted text-muted-foreground hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <!-- Body -->
      <div class="p-6">
        <!-- Provider Info Summary -->
        <div class="flex items-center gap-3 mb-6 p-3 bg-muted/30 rounded-2xl border border-border">
          <img :src="provider?.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + provider?.name" 
               class="w-12 h-12 rounded-full object-cover border border-border bg-muted" />
          <div>
            <p class="text-sm font-bold text-foreground">{{ provider?.name }}</p>
            <p class="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{{ provider?.city || 'Cameroun' }}</p>
          </div>
        </div>

        <form @submit.prevent="submitContact">
          <div class="space-y-4">
            <!-- Subject -->
            <div>
              <label class="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Sujet de votre demande</label>
              <input v-model="form.subject" type="text" required placeholder="Ex: Fuite d'eau, Installation électrique..."
                class="w-full px-4 py-3 bg-muted/30 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 text-sm outline-none transition-all" />
            </div>

            <!-- Message -->
            <div>
              <label class="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">Description détaillée</label>
              <textarea v-model="form.message" rows="4" required placeholder="Décrivez votre besoin en détail..."
                class="w-full px-4 py-3 bg-muted/30 border border-border rounded-xl focus:ring-2 focus:ring-primary/20 text-sm outline-none transition-all resize-none"></textarea>
            </div>
          </div>

          <!-- Actions -->
          <div class="mt-8 flex items-center justify-end gap-3">
            <button type="button" @click="close" class="px-5 py-2.5 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">
              Annuler
            </button>
            <button type="submit" :disabled="isLoading || !form.subject || !form.message"
              class="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-bold shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all flex items-center gap-2">
              <i v-if="isLoading" class="fas fa-spinner fa-spin"></i>
              <i v-else class="fas fa-paper-plane"></i>
              Envoyer le message
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
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const props = defineProps({
  isOpen: Boolean,
  provider: Object
});

const emit = defineEmits(['close']);

const form = ref({
  subject: '',
  message: ''
});

const isLoading = ref(false);

const close = () => {
  form.value = { subject: '', message: '' };
  emit('close');
};

const submitContact = async () => {
  if (!authStore.isAuthenticated) {
    // Redirect to login if user is not authenticated
    router.push({ path: '/auth/connexion', query: { redirect: '/services/prestataires' } });
    return;
  }

  isLoading.value = true;
  try {
    const { data } = await axios.post(`/api/marketplace/services/providers/${props.provider.id}/contact`, form.value);
    
    if (data.success) {
      close();
      // Redirect to the chat conversation
      router.push({ path: '/messages', query: { id: data.data.conversation_id } });
    }
  } catch (error) {
    console.error("Erreur de contact:", error);
    // You could show a toast notification here
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
