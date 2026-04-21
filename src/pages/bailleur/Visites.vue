<template>
  <div class="h-full flex flex-col bg-gray-50/30">
    <!-- Header Page -->
    <div class="bg-white border-b border-gray-100 px-8 py-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Gestion des Visites</h1>
          <p class="text-gray-500 mt-1">Suivez et gérez les rendez-vous de visite pour vos propriétés.</p>
        </div>
        <div class="flex items-center gap-3">
          <button 
            @click="fetchVisits"
            class="p-2.5 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all"
            :class="{ 'animate-spin': loadingVisits }"
            title="Rafraîchir"
          >
            <i class="fas fa-sync-alt"></i>
          </button>
        </div>
      </div>

      <!-- Stats Quick View -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div class="bg-orange-50/50 p-4 rounded-2xl border border-orange-100">
          <p class="text-xs font-bold text-orange-600 uppercase tracking-wider mb-1">En attente</p>
          <p class="text-2xl font-black text-gray-900">{{ stats.pending }}</p>
        </div>
        <div class="bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
          <p class="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Confirmées</p>
          <p class="text-2xl font-black text-gray-900">{{ stats.confirmed }}</p>
        </div>
        <div class="bg-green-50/50 p-4 rounded-2xl border border-green-100">
          <p class="text-xs font-bold text-green-600 uppercase tracking-wider mb-1">Terminées</p>
          <p class="text-2xl font-black text-gray-900">{{ stats.completed }}</p>
        </div>
        <div class="bg-gray-50 p-4 rounded-2xl border border-gray-100">
          <p class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Aujourd'hui</p>
          <p class="text-2xl font-black text-gray-900">{{ stats.today }}</p>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="flex-1 overflow-y-auto p-8 custom-scrollbar">
      <div v-if="loadingVisits" class="flex flex-col items-center justify-center py-20 grayscale opacity-50">
        <div class="w-12 h-12 border-4 border-orange-100 border-t-orange-600 rounded-full animate-spin mb-4"></div>
        <p class="font-medium text-gray-500">Chargement de votre agenda...</p>
      </div>

      <div v-else-if="visits.length === 0" class="bg-white rounded-3xl border border-dashed border-gray-200 p-20 text-center">
        <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <i class="fas fa-calendar-times text-3xl text-gray-300"></i>
        </div>
        <h2 class="text-xl font-bold text-gray-900 mb-2">Aucune visite programmée</h2>
        <p class="text-gray-500 max-w-sm mx-auto">
          Les futures visites de vos propriétés apparaîtront ici. Assurez-vous que vos annonces sont bien publiées.
        </p>
      </div>

      <div v-else class="space-y-6">
        <!-- Filtres Rapides -->
        <div class="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          <button 
            v-for="filter in filterOptions" 
            :key="filter.id"
            @click="activeStatusFilter = filter.id"
            class="px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all border"
            :class="activeStatusFilter === filter.id 
              ? 'bg-gray-900 text-white border-gray-900 shadow-lg scale-105' 
              : 'bg-white text-gray-500 border-gray-100 hover:border-gray-200'"
          >
            {{ filter.label }}
            <span class="ml-2 opacity-50 text-xs">{{ filter.count }}</span>
          </button>
        </div>

        <!-- Liste -->
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div 
            v-for="visit in filteredVisits" 
            :key="visit.id"
            class="bg-white rounded-3xl border border-gray-100 p-6 hover:shadow-xl hover:shadow-orange-500/5 transition-all group relative overflow-hidden"
          >
            <!-- Badge Statut -->
            <div 
              class="absolute top-0 right-0 px-6 py-2 rounded-bl-3xl text-[10px] font-black uppercase tracking-widest text-white z-10"
              :class="statusColors[visit.status]"
            >
              {{ statusLabels[visit.status] }}
            </div>

            <div class="flex gap-6">
              <!-- Date Big View -->
              <div class="hidden sm:flex flex-col items-center justify-center w-24 h-24 bg-gray-50 rounded-2xl flex-shrink-0 group-hover:bg-orange-50 transition-colors">
                <span class="text-xs font-bold text-orange-600 uppercase">{{ formatMonth(visit.visit_date) }}</span>
                <span class="text-3xl font-black text-gray-900">{{ formatDay(visit.visit_date) }}</span>
                <span class="text-xs font-bold text-gray-400">{{ formatTime(visit.visit_date) }}</span>
              </div>

              <div class="flex-1 min-w-0">
                <div class="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                  <span class="text-xs font-black text-orange-600 uppercase tracking-widest">Bien Immobilier</span>
                  <span class="hidden sm:inline text-gray-300">•</span>
                  <span class="text-xs text-gray-400">Réf: #{{ visit.id }}</span>
                </div>
                
                <h3 class="text-lg font-bold text-gray-900 truncate mb-1" :title="visit.property?.title">
                  {{ visit.property?.title || 'Chargement...' }}
                </h3>
                
                <p class="text-sm text-gray-500 flex items-center gap-2 mb-4">
                  <i class="fas fa-map-marker-alt text-[#E54801]"></i>
                  {{ visit.property?.location || 'Localisation non définie' }}
                </p>

                <!-- Infos Participant -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-50">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 overflow-hidden">
                      <img v-if="visit.user?.avatar_url" :src="visit.user.avatar_url" class="w-full h-full object-cover" />
                      <i v-else class="fas fa-user"></i>
                    </div>
                    <div>
                      <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">Client</p>
                      <p class="text-sm font-bold text-gray-900 truncate w-32">{{ visit.user?.name || 'Inconnu' }}</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-3" v-if="visit.agent">
                    <div class="w-10 h-10 rounded-full bg-[#E54801]/10 flex items-center justify-center text-[#E54801]">
                      <i class="fas fa-user-tie"></i>
                    </div>
                    <div>
                      <p class="text-xs font-bold text-[#E54801] uppercase tracking-wider">Agent HMC</p>
                      <p class="text-sm font-bold text-gray-900 truncate w-32">{{ visit.agent?.name }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="mt-6 flex items-center justify-between gap-4 pt-4 border-t border-gray-50 opacity-0 group-hover:opacity-100 transition-opacity">
              <div class="flex items-center gap-4 text-xs font-bold">
                <span class="flex items-center gap-2 text-gray-400">
                  <i class="far fa-clock"></i>
                  {{ formatVisitFullDate(visit.visit_date) }}
                </span>
              </div>
              <div class="flex gap-2">
                <button 
                  v-if="visit.status === 'pending'"
                  @click="handleConfirm(visit.id)"
                  class="px-4 py-2 bg-green-600 text-white rounded-xl text-xs font-bold hover:bg-green-700 transition"
                  :disabled="actionLoading === visit.id"
                >
                  Confirmer
                </button>
                <button 
                  v-if="['pending', 'confirmed'].includes(visit.status)"
                  @click="handleCancel(visit.id)"
                  class="px-4 py-2 border border-red-100 text-red-600 rounded-xl text-xs font-bold hover:bg-red-50 transition"
                  :disabled="actionLoading === visit.id"
                >
                  Annuler
                </button>
                <RouterLink 
                  :to="`/annonces/${visit.property?.slug}`"
                  class="p-2 bg-gray-50 text-gray-400 rounded-xl hover:bg-orange-50 hover:text-orange-600 transition"
                >
                  <i class="fas fa-eye"></i>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRentalStore } from '../../stores/rental'
import { storeToRefs } from 'pinia'

const rentalStore = useRentalStore()
const { visits, loadingVisits } = storeToRefs(rentalStore)

const activeStatusFilter = ref('all')
const actionLoading = ref(null)

const stats = computed(() => {
  const now = new Date()
  const todayStr = now.toISOString().split('T')[0]
  
  return {
    pending: visits.value.filter(v => v.status === 'pending').length,
    confirmed: visits.value.filter(v => v.status === 'confirmed').length,
    completed: visits.value.filter(v => v.status === 'completed').length,
    today: visits.value.filter(v => v.visit_date.startsWith(todayStr)).length
  }
})

const filterOptions = computed(() => [
  { id: 'all', label: 'Toutes', count: visits.value.length },
  { id: 'pending', label: 'En attente', count: visits.value.filter(v => v.status === 'pending').length },
  { id: 'confirmed', label: 'Confirmées', count: visits.value.filter(v => v.status === 'confirmed').length },
  { id: 'completed', label: 'Terminées', count: visits.value.filter(v => v.status === 'completed').length },
  { id: 'cancelled', label: 'Annulées', count: visits.value.filter(v => v.status === 'cancelled').length },
])

const filteredVisits = computed(() => {
  if (activeStatusFilter.value === 'all') return visits.value
  return visits.value.filter(v => v.status === activeStatusFilter.value)
})

const statusColors = {
  pending: 'bg-orange-500',
  confirmed: 'bg-blue-600',
  completed: 'bg-green-600',
  cancelled: 'bg-gray-400',
  no_show: 'bg-red-500'
}

const statusLabels = {
  pending: 'Attente',
  confirmed: 'Confirmé',
  completed: 'Terminé',
  cancelled: 'Annulé',
  no_show: 'Absent'
}

const fetchVisits = () => rentalStore.fetchVisits()

const handleConfirm = async (id) => {
  if (!confirm('Souhaitez-vous confirmer cette visite ?')) return
  actionLoading.value = id
  await rentalStore.confirmVisit(id)
  actionLoading.value = null
}

const handleCancel = async (id) => {
  if (!confirm('Souhaitez-vous annuler cette visite ?')) return
  actionLoading.value = id
  await rentalStore.cancelVisit(id)
  actionLoading.value = null
}

const formatMonth = (dateStr) => {
  const d = new Date(dateStr)
  return d.toLocaleString('fr-FR', { month: 'short' }).replace('.', '')
}

const formatDay = (dateStr) => {
  const d = new Date(dateStr)
  return d.getDate()
}

const formatTime = (dateStr) => {
  const d = new Date(dateStr)
  return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}

const formatVisitFullDate = (dateStr) => {
  const d = new Date(dateStr)
  return d.toLocaleString('fr-FR', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

onMounted(() => {
  fetchVisits()
})
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #d1d5db;
}
</style>
