<template>
  <Transition name="modal">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex justify-center items-center p-4 sm:p-6" @click.self="closeModal">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <!-- Modal Content -->
      <div class="relative bg-card w-full max-w-4xl rounded-3xl shadow-2xl flex flex-col max-h-full overflow-hidden animate-slideUp">
        
        <!-- Header -->
        <div class="px-6 py-5 border-b border-border flex justify-between items-center bg-muted/10">
          <div>
            <h2 class="text-xl font-black text-foreground">
              {{ selectedAgent ? "Agenda de l'agent" : "Assigner un Agent" }}
            </h2>
            <p class="text-xs text-muted-foreground mt-1">
              {{ selectedAgent ? selectedAgent.name : "Sélectionnez l'agent idéal pour cette mission en fonction de sa charge de travail." }}
            </p>
          </div>
          <button @click="closeModal" class="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <!-- Body -->
        <div class="flex-1 overflow-y-auto p-6 min-h-[400px]">
          
          <!-- Loading State (List) -->
          <div v-if="isLoadingAgents" class="flex flex-col items-center justify-center h-full text-secondary">
            <i class="fas fa-circle-notch fa-spin text-4xl mb-4"></i>
            <p class="text-sm font-bold uppercase tracking-widest text-muted-foreground">Chargement des agents...</p>
          </div>

          <!-- AGENDA VIEW (Agent Selected) -->
          <div v-else-if="selectedAgent">
            <button @click="selectedAgent = null" class="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition flex items-center gap-2">
              <i class="fas fa-arrow-left"></i> Retour à la liste
            </button>

            <!-- Stats rapides de l'agent -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div class="bg-muted/20 rounded-2xl p-4 text-center border border-border">
                <p class="text-2xl font-black text-foreground">{{ agentAgendaData?.stats?.active_properties || 0 }}</p>
                <p class="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Biens en cours</p>
              </div>
              <div class="bg-muted/20 rounded-2xl p-4 text-center border border-border">
                <p class="text-2xl font-black text-foreground">{{ agentAgendaData?.stats?.total_properties || 0 }}</p>
                <p class="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Total Biens</p>
              </div>
              <div class="bg-muted/20 rounded-2xl p-4 text-center border border-border">
                <p class="text-2xl font-black text-secondary">{{ agentAgendaData?.stats?.upcoming_visits || 0 }}</p>
                <p class="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Visites à venir</p>
              </div>
              <div class="bg-muted/20 rounded-2xl p-4 text-center border border-border">
                <p class="text-2xl font-black text-foreground">{{ agentAgendaData?.stats?.total_visits || 0 }}</p>
                <p class="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Total Visites</p>
              </div>
            </div>

            <!-- Visualisation Planning -->
            <div class="bg-card border border-border rounded-2xl p-5 mb-6">
              <h3 class="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                <i class="fas fa-calendar-alt text-secondary"></i> Planning des 30 prochains jours
              </h3>

              <div v-if="isLoadingAgenda" class="text-center py-6">
                <i class="fas fa-circle-notch fa-spin text-secondary"></i>
              </div>
              <div v-else-if="!agentAgendaData?.agenda?.length" class="text-center py-6 text-sm text-muted-foreground bg-muted/10 rounded-xl">
                L'agenda de cet agent est vide pour le moment.
              </div>
              <div v-else class="space-y-3">
                <div v-for="visit in agentAgendaData.agenda" :key="visit.id" class="flex gap-4 p-3 bg-muted/10 rounded-xl border border-border">
                  <div class="w-16 h-16 rounded-xl bg-card border border-border flex flex-col items-center justify-center shrink-0 shadow-sm">
                    <span class="text-xs font-bold text-muted-foreground uppercase">{{ getMonth(visit.scheduled_at) }}</span>
                    <span class="text-xl font-black text-secondary">{{ getDay(visit.scheduled_at) }}</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-bold text-foreground truncate">{{ visit.property?.title }}</p>
                    <p class="text-xs text-muted-foreground mt-1">
                      <i class="fas fa-clock mr-1"></i> {{ getTime(visit.scheduled_at) }} • 
                      <i class="fas fa-user ml-2 mr-1"></i> Client: {{ visit.visitor?.name || 'Inconnu' }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer d'assignation -->
            <div class="pt-4 border-t border-border flex justify-end">
              <button @click="confirmAssign(selectedAgent.id)" :disabled="isSubmitting" class="px-6 py-3 bg-secondary text-secondary-foreground font-bold rounded-xl hover:bg-secondary/90 shadow-md transition-all flex items-center gap-2">
                <i v-if="isSubmitting" class="fas fa-circle-notch fa-spin"></i>
                <i v-else class="fas fa-check"></i>
                Assigner à {{ selectedAgent.name }}
              </button>
            </div>
          </div>

          <!-- LIST OF AGENTS -->
          <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-if="agents.length === 0" class="col-span-full py-8 text-center text-muted-foreground">
              Aucun agent trouvé dans le système.
            </div>

            <div v-for="agent in agents" :key="agent.id" class="bg-card border border-border rounded-2xl p-5 hover:border-secondary transition-colors group">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center font-bold text-xl shrink-0">
                  {{ agent.name.charAt(0).toUpperCase() }}
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="text-lg font-bold text-foreground truncate">{{ agent.name }}</h3>
                  <p class="text-xs text-muted-foreground truncate">{{ agent.email }} • {{ agent.phone || 'Pas de numéro' }}</p>
                </div>
              </div>

              <!-- Charge de travail actuelle -->
              <div class="mt-4 p-3 bg-muted/20 rounded-xl border border-border">
                <p class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Charge de travail</p>
                <div class="flex gap-4">
                  <div>
                    <span class="text-sm font-black text-foreground mr-1">{{ agent.active_properties || 0 }}</span>
                    <span class="text-xs text-muted-foreground">biens</span>
                  </div>
                  <div>
                    <span class="text-sm font-black text-secondary mr-1">{{ agent.upcoming_visits || 0 }}</span>
                    <span class="text-xs text-muted-foreground">visites prévues</span>
                  </div>
                </div>
              </div>

              <div class="mt-4 flex gap-2">
                <button @click="viewAgenda(agent)" class="flex-1 px-3 py-2 bg-card border border-border text-foreground hover:bg-muted/20 text-xs font-bold rounded-xl transition">
                  <i class="fas fa-calendar-alt mr-1"></i> Agenda complet
                </button>
                <button @click="confirmAssign(agent.id)" :disabled="isSubmitting" class="px-4 py-2 bg-secondary text-secondary-foreground text-xs font-bold rounded-xl shadow-sm hover:shadow-md transition">
                  Assigner
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import axios from '../../axios';

const props = defineProps({
  isOpen: Boolean,
  targetId: [Number, String], // The ID of the property or the request
  targetType: String, // 'property' or 'request'
});

const emit = defineEmits(['close', 'assigned']);

const agents = ref([]);
const isLoadingAgents = ref(false);

const selectedAgent = ref(null);
const agentAgendaData = ref(null);
const isLoadingAgenda = ref(false);

const isSubmitting = ref(false);

// Formatting helpers
const getMonth = (dateStr) => {
  return new Date(dateStr).toLocaleString('fr-FR', { month: 'short' });
}
const getDay = (dateStr) => {
  return new Date(dateStr).getDate();
}
const getTime = (dateStr) => {
  return new Date(dateStr).toLocaleTimeString('fr-FR', { hour: '2-digit', minute:'2-digit' });
}

// Fetch Agents
const fetchAgents = async () => {
  isLoadingAgents.value = true;
  try {
    const { data } = await axios.get('/api/admin/agents');
    if (data.success) {
      agents.value = data.data;
    }
  } catch (e) {
    console.error("Error fetching agents:", e);
  } finally {
    isLoadingAgents.value = false;
  }
};

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    selectedAgent.value = null;
    fetchAgents();
  }
});

const viewAgenda = async (agent) => {
  selectedAgent.value = agent;
  isLoadingAgenda.value = true;
  agentAgendaData.value = null;
  
  try {
    const { data } = await axios.get(`/api/admin/agents/${agent.id}/agenda`);
    if (data.success) {
      agentAgendaData.value = data.data;
    }
  } catch(e) {
    console.error("Error fetching agent agenda", e);
  } finally {
    isLoadingAgenda.value = false;
  }
}

const confirmAssign = async (agentId) => {
  if(!props.targetId || !props.targetType) return;
  
  const endpoint = props.targetType === 'property' 
      ? `/api/admin/properties/${props.targetId}/assign-agent`
      : `/api/admin/publication-requests/${props.targetId}/assign`;
      
  isSubmitting.value = true;
  try {
    const { data } = await axios.post(endpoint, { agent_id: agentId });
    if(data.success) {
      emit('assigned', agentId);
      closeModal();
    }
  } catch(e) {
    console.error("Erreur assignation", e);
    alert(e.response?.data?.message || "Erreur lors de l'assignation.");
  } finally {
    isSubmitting.value = false;
  }
}

const closeModal = () => {
  emit('close');
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.animate-slideUp {
  animation: slideUp 0.3s ease-out forwards;
}

@keyframes slideUp {
  from {
    transform: translateY(20px) scale(0.95);
    opacity: 0;
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}
</style>
