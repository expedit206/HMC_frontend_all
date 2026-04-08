<template>
  <div class="service-post-detail min-h-screen bg-background pb-20">
    <div v-if="isLoading" class="flex justify-center p-20">
      <div class="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
    
    <div v-else-if="!post" class="text-center p-20 text-muted-foreground">
      <i class="fas fa-exclamation-circle text-4xl mb-4"></i>
      <p class="text-lg font-bold">Demande introuvable</p>
    </div>

    <div v-else class="max-w-4xl mx-auto px-4 py-8">
      <!-- Back button -->
      <router-link to="/marketplace/demandes" class="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors mb-6">
        <i class="fas fa-arrow-left"></i> Retour au Job Board
      </router-link>

      <!-- Post Info Header -->
      <div class="bg-card border border-border rounded-3xl p-8 mb-8 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <i :class="post.category?.icon || 'fas fa-tools'"></i>
            </div>
            <span class="text-xs font-black uppercase tracking-widest text-muted-foreground">{{ post.category?.name || 'Service' }}</span>
          </div>
          <span :class="[
            'px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider',
            post.status === 'open' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'
          ]">
            {{ post.status === 'open' ? 'Ouvert' : 'En cours' }}
          </span>
        </div>

        <h1 class="text-3xl font-black text-foreground mb-4">{{ post.title }}</h1>
        <p class="text-base text-muted-foreground leading-relaxed mb-6">{{ post.description }}</p>

        <div class="flex flex-wrap items-center gap-6 pt-6 border-t border-border/50">
          <div class="flex items-center gap-3">
             <div class="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-secondary">
               <i class="fas fa-map-marker-alt"></i>
             </div>
             <div>
               <p class="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Localisation</p>
               <p class="text-sm font-bold text-foreground">{{ post.city }}, {{ post.neighborhood || 'Non précisé' }}</p>
             </div>
          </div>
          
          <div class="flex items-center gap-3">
             <div class="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-secondary">
               <i class="fas fa-wallet"></i>
             </div>
             <div>
               <p class="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Budget Client</p>
               <p class="text-sm font-bold text-primary">{{ formatBudget(post.min_budget, post.max_budget) }}</p>
             </div>
          </div>
        </div>
      </div>

      <!-- Responses Section (Only for post owner) -->
      <div v-if="isOwner">
        <h2 class="text-xl font-black text-foreground mb-6 flex items-center gap-3">
          <i class="fas fa-handshake text-secondary"></i>
          Offres reçues ({{ post.responses?.length || 0 }})
        </h2>

        <div v-if="!post.responses || post.responses.length === 0" class="text-center p-12 bg-card/50 border border-dashed border-border rounded-3xl">
          <i class="fas fa-hourglass-half text-3xl text-muted-foreground/50 mb-3 block"></i>
          <p class="text-sm font-medium text-muted-foreground">Aucun prestataire n'a encore répondu à votre demande.</p>
        </div>

        <div v-else class="grid gap-4">
          <div v-for="response in post.responses" :key="response.id" 
               class="bg-card border border-border p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-shadow">
            
            <div class="flex items-start gap-4 flex-1">
              <img :src="response.provider?.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + response.provider?.name" 
                   class="w-14 h-14 rounded-full border border-border object-cover bg-muted" />
              <div>
                <h3 class="text-base font-bold text-foreground">{{ response.provider?.name }}</h3>
                <div class="flex items-center gap-1 text-xs text-yellow-500 font-bold mb-2">
                  <i class="fas fa-star text-[10px]"></i> 4.9 PRO
                </div>
                <p class="text-sm text-muted-foreground italic mb-2 relative before:content-[''] before:w-1 before:h-full before:absolute before:-left-3 before:bg-secondary/30 before:rounded-full">
                  "{{ response.message }}"
                </p>
                <p class="text-lg font-black text-primary">{{ Math.round(response.proposed_price || 0).toLocaleString() }} FCFA</p>
              </div>
            </div>

            <div class="flex flex-col gap-2 shrink-0 border-t border-border pt-4 md:pt-0 md:border-none">
               <span v-if="response.status === 'accepted'" class="px-4 py-2 bg-green-500/10 text-green-600 text-xs font-bold rounded-xl text-center flex items-center justify-center gap-2">
                 <i class="fas fa-check-circle"></i> Offre acceptée
               </span>
               <span v-else-if="response.status === 'rejected'" class="px-4 py-2 bg-red-500/10 text-red-600 text-xs font-bold rounded-xl text-center">
                 Refusée
               </span>
               <button v-else-if="post.status === 'open'" @click="acceptOffer(response.id)" :disabled="isAccepting"
                 class="px-6 py-3 bg-secondary text-secondary-foreground text-sm font-bold rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2">
                 <i v-if="isAccepting" class="fas fa-spinner fa-spin"></i>
                 <i v-else class="fas fa-check"></i>
                 Accepter cette offre
               </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from '../axios';
import { useAuthStore } from '../stores/auth';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const post = ref(null);
const isLoading = ref(true);
const isAccepting = ref(false);

const isOwner = computed(() => {
  return authStore.user && post.value && authStore.user.id === post.value.client_id;
});

const formatBudget = (min, max) => {
  if (!min && !max) return 'À discuter';
  if (min && max) return `${Math.round(min).toLocaleString()} - ${Math.round(max).toLocaleString()} FCFA`;
  return `${Math.round(min || max).toLocaleString()} FCFA`;
};

const fetchPost = async () => {
  try {
    const { data } = await axios.get(`/api/marketplace/services/posts/${route.params.id}`);
    if (data.success) {
      post.value = data.data;
    }
  } catch(err) {
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

const acceptOffer = async (responseId) => {
  if (!confirm("Voulez-vous vraiment accepter cette offre ? Cela annulera les autres propositions et ouvrira une conversation avec le prestataire.")) return;
  
  isAccepting.value = true;
  try {
    const { data } = await axios.post(`/api/marketplace/services/posts/${post.value.id}/responses/${responseId}/accept`);
    if (data.success) {
      // Rediriger vers la conversation
      router.push({ path: '/messages', query: { id: data.data.conversation_id } });
    }
  } catch(err) {
    console.error(err);
    alert(err.response?.data?.message || "Erreur lors de l'acceptation.");
  } finally {
    isAccepting.value = false;
  }
};

onMounted(() => {
  if (!authStore.isAuthenticated) {
    router.push({ path: '/auth/connexion', query: { redirect: `/marketplace/demandes/${route.params.id}` } });
    return;
  }
  fetchPost();
});
</script>
