<template>
  <ParametresLayout :extra-tabs="roleTabs">
    <!-- Contenu spécifique selon le rôle, dans le slot 'profil-extra' -->
    <template #profil-extra>
      <!-- Disponibilités pour l'agent -->
      <template v-if="role === 'agent'">
        <hr class="border-border" />
        <div>
          <h3 class="font-bold text-foreground mb-3">Mes disponibilités</h3>
          <p class="text-xs text-muted-foreground mb-4">Indiquez vos jours de disponibilité pour les visites.</p>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <label v-for="day in days" :key="day.id"
              :class="day.enabled ? 'border-secondary bg-secondary/5 text-secondary' : 'border-border text-muted-foreground'"
              class="flex items-center justify-between px-4 py-3 border-2 rounded-xl cursor-pointer transition-all hover:border-secondary/50">
              <span class="font-medium text-sm">{{ day.label }}</span>
              <input type="checkbox" v-model="day.enabled" class="hidden" />
              <i :class="day.enabled ? 'fas fa-check-circle text-secondary' : 'far fa-circle text-muted-foreground'"></i>
            </label>
          </div>
          <div class="flex justify-end mt-4">
            <button @click="saveAvailabilities"
              class="px-5 py-2 bg-secondary text-secondary-foreground rounded-xl text-sm font-bold hover:bg-primary hover:text-primary-foreground transition-all">
              Enregistrer
            </button>
          </div>
        </div>
      </template>

      <!-- Stats rapides pour le bailleur -->
      <template v-if="role === 'bailleur' && bailleurStats">
        <hr class="border-border" />
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div class="bg-muted/10 rounded-xl p-4 text-center border border-border">
            <div class="text-2xl font-bold text-secondary">{{ bailleurStats.properties_count ?? 0 }}</div>
            <div class="text-xs text-muted-foreground mt-1">Biens publiés</div>
          </div>
          <div class="bg-muted/10 rounded-xl p-4 text-center border border-border">
            <div class="text-2xl font-bold text-secondary">{{ bailleurStats.tenants_count ?? 0 }}</div>
            <div class="text-xs text-muted-foreground mt-1">Locataires</div>
          </div>
          <div class="bg-muted/10 rounded-xl p-4 text-center border border-border">
            <div class="text-2xl font-bold text-secondary">{{ bailleurStats.active_rentals ?? 0 }}</div>
            <div class="text-xs text-muted-foreground mt-1">Locations actives</div>
          </div>
        </div>
      </template>
    </template>

    <!-- Onglets additionnels selon le rôle -->
    <template #tab-content="{ activeTab }">
      <!-- Onglet Disponibilités pour l'agent (dans la sidebar) -->
      <div v-if="activeTab === 'agenda' && role === 'agent'"
        class="bg-card rounded-2xl border border-border p-6 lg:p-8 space-y-5">
        <h2 class="text-lg font-bold text-foreground flex items-center gap-2">
          <i class="fas fa-calendar-alt text-secondary"></i> Planning hebdomadaire
        </h2>
        <div class="space-y-3">
          <div v-for="day in days" :key="day.id" class="flex items-center gap-4 p-4 bg-muted/10 rounded-xl border border-border">
            <label class="flex items-center gap-3 flex-1 cursor-pointer">
              <div :class="day.enabled ? 'bg-secondary' : 'bg-muted/40'"
                class="relative w-10 h-5 rounded-full transition-colors cursor-pointer"
                @click="day.enabled = !day.enabled">
                <span :class="day.enabled ? 'translate-x-5' : 'translate-x-0.5'"
                  class="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform"></span>
              </div>
              <span class="font-medium text-foreground">{{ day.labelFull }}</span>
            </label>
            <div v-if="day.enabled" class="flex items-center gap-2 text-sm">
              <input v-model="day.start" type="time"
                class="px-3 py-1.5 bg-background border border-border rounded-lg text-foreground text-xs outline-none focus:ring-2 focus:ring-secondary/30">
              <span class="text-muted-foreground">—</span>
              <input v-model="day.end" type="time"
                class="px-3 py-1.5 bg-background border border-border rounded-lg text-foreground text-xs outline-none focus:ring-2 focus:ring-secondary/30">
            </div>
          </div>
        </div>
        <div class="flex justify-end">
          <button @click="saveAvailabilities"
            class="px-6 py-2.5 bg-secondary text-secondary-foreground rounded-xl text-sm font-bold hover:bg-primary hover:text-primary-foreground transition-all">
            Enregistrer le planning
          </button>
        </div>
      </div>

      <!-- Abonnement / Plan pour bailleur/prestataire -->
      <div v-if="activeTab === 'abonnement' && ['bailleur','prestataire'].includes(role)"
        class="bg-card rounded-2xl border border-border p-6 lg:p-8">
        <h2 class="text-lg font-bold text-foreground flex items-center gap-2 mb-6">
          <i class="fas fa-star text-secondary"></i> Mon abonnement
        </h2>
        <div class="p-5 bg-secondary/5 border-2 border-secondary/30 rounded-2xl mb-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="font-bold text-foreground">Plan Gratuit</p>
              <p class="text-sm text-muted-foreground">Accès limité aux fonctionnalités de base</p>
            </div>
            <span class="px-3 py-1 bg-secondary/10 text-secondary text-xs font-bold rounded-full uppercase">Actif</span>
          </div>
        </div>
        <p class="text-center text-muted-foreground text-sm">Des plans premium seront bientôt disponibles.</p>
      </div>
    </template>
  </ParametresLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import ParametresLayout from '../../components/settings/ParametresLayout.vue';
import { useAuthStore } from '../../stores/auth';
import axios from '../../axios';

const authStore = useAuthStore();
const role = computed(() => authStore.user?.role ?? '');

// ─── Onglets supplémentaires par rôle ────────────────────────────────────
const roleTabs = computed(() => {
  const tabs = [];
  if (role.value === 'agent') {
    tabs.push({ id: 'agenda', label: 'Planning', icon: 'fas fa-calendar-alt' });
  }
  if (['bailleur', 'prestataire'].includes(role.value)) {
    tabs.push({ id: 'abonnement', label: 'Abonnement', icon: 'fas fa-star' });
  }
  return tabs;
});

// ─── Disponibilités agent ────────────────────────────────────────────────
const days = ref([
  { id: 'monday',    label: 'Lun', labelFull: 'Lundi',    enabled: false, start: '08:00', end: '17:00' },
  { id: 'tuesday',   label: 'Mar', labelFull: 'Mardi',    enabled: false, start: '08:00', end: '17:00' },
  { id: 'wednesday', label: 'Mer', labelFull: 'Mercredi', enabled: false, start: '08:00', end: '17:00' },
  { id: 'thursday',  label: 'Jeu', labelFull: 'Jeudi',    enabled: false, start: '08:00', end: '17:00' },
  { id: 'friday',    label: 'Ven', labelFull: 'Vendredi', enabled: false, start: '08:00', end: '17:00' },
  { id: 'saturday',  label: 'Sam', labelFull: 'Samedi',   enabled: false, start: '08:00', end: '12:00' },
  { id: 'sunday',    label: 'Dim', labelFull: 'Dimanche', enabled: false, start: '08:00', end: '12:00' },
]);

const saveAvailabilities = async () => {
  try {
    await axios.put('/api/profile', {
      availabilities: days.value
        .filter(d => d.enabled)
        .map(d => ({ day: d.id, start: d.start, end: d.end }))
    });
  } catch (err) {
    console.error('Erreur sauvegarde disponibilités:', err);
  }
};

// ─── Stats bailleur ──────────────────────────────────────────────────────
const bailleurStats = ref(null);

onMounted(async () => {
  // Charger disponibilités agent depuis le profil
  const u = authStore.user;
  if (u?.availabilities && role.value === 'agent') {
    u.availabilities.forEach(av => {
      const day = days.value.find(d => d.id === av.day);
      if (day) { day.enabled = true; day.start = av.start ?? '08:00'; day.end = av.end ?? '17:00'; }
    });
  }

  // Stats bailleur
  if (role.value === 'bailleur') {
    try {
      const { data } = await axios.get('/api/user/sidebar-stats');
      if (data) bailleurStats.value = data;
    } catch { /* silent */ }
  }
});
</script>
