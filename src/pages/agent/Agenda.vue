<template>
  <DashboardLayout>
    <div class="max-w-7xl mx-auto h-full">
      <!-- HERO SECTION -->
      <div class="text-center mb-10 animate-fadeIn">
        <div
          class="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-secondary to-secondary/80 mb-6 shadow-lg"
        >
          <i class="fas fa-calendar-alt text-4xl text-primary-foreground"></i>
        </div>
        <h1 class="text-3xl sm:text-4xl font-bold text-foreground mb-3">
          Votre Agenda Professionnel
        </h1>
        <p class="text-muted-foreground max-w-2xl mx-auto">
          Gérez votre emploi du temps, vos visites clients et vos périodes de
          disponibilité pour optimiser votre activité immobilière.
        </p>
      </div>

      <!-- STATS OVERVIEW -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 animate-slide-up"
      >
        <div class="bg-card rounded-xl shadow-sm border border-border p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-muted-foreground mb-1">
                Rendez-vous à venir
              </p>
              <p class="text-3xl font-bold text-secondary">{{ upcomingVisitsCount }}</p>
            </div>
            <i class="fas fa-calendar-check text-4xl text-secondary/20"></i>
          </div>
        </div>

        <div class="bg-card rounded-xl shadow-sm border border-border p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-muted-foreground mb-1">
                Visites Réalisées
              </p>
              <p class="text-3xl font-bold text-green-500 dark:text-green-400">{{ completedVisitsCount }}</p>
            </div>
            <i class="fas fa-check-double text-4xl text-green-500/20"></i>
          </div>
        </div>

        <div class="bg-card rounded-xl shadow-sm border border-border p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-muted-foreground mb-1">Total Confirmées</p>
              <p class="text-3xl font-bold text-blue-500 dark:text-blue-400">{{ confirmedVisitsCount }}</p>
            </div>
            <i class="fas fa-map-marker-alt text-4xl text-blue-500/20"></i>
          </div>
        </div>

        <div class="bg-card rounded-xl shadow-sm border border-border p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-muted-foreground mb-1">En attente / planifiées</p>
              <p class="text-3xl font-bold text-orange-500 dark:text-orange-400">{{ pendingVisitsCount }}</p>
            </div>
            <i class="fas fa-clock text-4xl text-orange-500/20"></i>
          </div>
        </div>
      </div>

      <!-- MAIN CALENDAR & SIDEBAR -->
      <div
        class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10 animate-slide-up"
        style="animation-delay: 0.1s"
      >
        <!-- CALENDAR -->
        <div class="lg:col-span-2">
          <div
            class="bg-card rounded-2xl shadow-sm border border-border p-6"
          >
            <!-- CALENDAR HEADER -->
            <div class="flex items-center justify-between mb-6">
              <div>
                <h2 class="text-2xl font-bold text-foreground">
                  {{ currentMonthName }} {{ currentYear }}
                </h2>
              </div>
              <div class="flex gap-2">
                <button
                  @click="changeMonth(-1)"
                  class="p-2 hover:bg-muted/20 rounded-lg transition text-secondary"
                >
                  <i class="fas fa-chevron-left"></i>
                </button>
                <button
                  @click="resetToToday"
                  class="px-4 py-2 text-sm font-medium text-secondary hover:bg-muted/20 rounded-lg transition"
                >
                  Aujourd'hui
                </button>
                <button
                  @click="changeMonth(1)"
                  class="p-2 hover:bg-muted/20 rounded-lg transition text-secondary"
                >
                  <i class="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>

            <!-- CALENDAR GRID -->
            <div class="mb-6">
              <!-- WEEKDAYS -->
              <div class="grid grid-cols-7 gap-1 mb-2">
                <div
                  v-for="day in weekDays"
                  :key="day"
                  class="text-center text-sm font-semibold text-muted-foreground py-2"
                >
                  {{ day }}
                </div>
              </div>

              <!-- DATES -->
              <div class="grid grid-cols-7 gap-1">
                <div
                  v-for="(day, index) in calendarDays"
                  :key="index"
                  :class="[
                    'calendar-cell rounded-lg p-2 text-center cursor-pointer border border-transparent hover:border-border min-h-[80px] flex flex-col items-center justify-start transition-colors',
                    day.isOtherMonth ? 'opacity-30' : '',
                    day.isToday ? 'border-2 border-secondary font-bold' : '',
                    selectedDate &&
                    day.date.toDateString() === selectedDate.toDateString()
                      ? 'bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground shadow-md'
                      : 'hover:bg-muted/20 text-foreground',
                  ]"
                  @click="selectDate(day.date)"
                >
                  <span class="mb-1">{{ day.dayNumber }}</span>
                  <!-- Event Indicators -->
                  <div
                    v-if="getEventsForDate(day.date).length > 0"
                    class="flex flex-col gap-1 w-full px-1"
                  >
                    <div
                      v-for="event in getEventsForDate(day.date).slice(0, 2)"
                      :key="event.id"
                      :class="`text-[8px] truncate w-full rounded px-1 py-0.5 ${getEventClass(event.type)}`"
                    >
                      {{ event.label }}
                    </div>
                    <div
                      v-if="getEventsForDate(day.date).length > 2"
                      class="text-[8px] text-muted-foreground"
                    >
                      +{{ getEventsForDate(day.date).length - 2 }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- LEGEND -->
            <div class="border-t border-border pt-4">
              <p class="text-xs font-semibold text-muted-foreground mb-3">LÉGENDE</p>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                <div class="flex items-center gap-2">
                  <div class="w-4 h-4 rounded bg-orange-100 dark:bg-orange-900/30 border border-orange-300 dark:border-orange-700"></div>
                  <span class="text-foreground/80">En attente</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-4 h-4 rounded bg-gradient-to-br from-secondary to-secondary/80 border border-secondary/50"></div>
                  <span class="text-foreground/80">Confirmé</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-4 h-4 rounded bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700"></div>
                  <span class="text-foreground/80">Terminée</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- SIDEBAR: UPCOMING EVENTS -->
        <div>
          <div
            class="bg-card rounded-2xl shadow-sm border border-border p-6"
          >
            <h3 class="text-xl font-bold text-foreground mb-6">
              Événements à venir
            </h3>

            <div v-if="isLoading" class="text-center py-10">
              <i class="fas fa-circle-notch fa-spin text-secondary"></i>
            </div>
            <div
              v-else-if="agendaEvents.length === 0"
              class="text-center py-10 text-muted-foreground text-sm"
            >
              Aucun événement prévu.
            </div>
            <div v-else class="space-y-4">
              <div
                v-for="event in agendaEvents.slice(0, 5)"
                :key="event.id"
                class="border-l-4 border-secondary pl-4 py-2 hover:bg-secondary/5 transition-colors rounded-r-lg"
              >
                <p class="text-sm font-bold text-foreground">
                  {{ event.label }}: {{ event.property?.title }}
                </p>
                <p class="text-xs text-muted-foreground mt-1">
                  <i class="fas fa-calendar text-secondary mr-2"></i>
                  {{ formatDate(event.date) }} à
                  {{
                    event.date.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  }}
                </p>
                <p class="text-xs text-muted-foreground mt-1">
                  <i class="fas fa-user text-secondary mr-2"></i>
                  Client: {{ event.visitor?.name || 'Non assigné' }}
                </p>
                <div class="mt-3">
                  <span
                    :class="[
                      'inline-block px-2 py-1 rounded text-[10px] font-bold border',
                      getEventClass(event.type)
                    ]"
                  >{{ event.status }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- AVAILABILITY SETTINGS -->
      <div
        class="bg-card rounded-2xl shadow-sm border border-border p-6 animate-slide-up mb-10"
        style="animation-delay: 0.2s"
      >
        <div class="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 border-b border-border pb-4">
          <h3 class="text-xl font-bold text-foreground flex items-center gap-2">
            <i class="fas fa-clock text-secondary"></i> Horaires de travail réguliers
          </h3>
          <button
            @click="saveAvailabilities"
            :disabled="isSaving"
            class="px-5 py-2.5 bg-secondary text-secondary-foreground rounded-xl font-bold hover:shadow-lg hover:bg-secondary/90 transition-all flex items-center gap-2 text-sm"
          >
            <i v-if="isSaving" class="fas fa-circle-notch fa-spin"></i>
            <i v-else class="fas fa-save"></i> 
            {{ isSaving ? 'Sauvegarde...' : 'Enregistrer les horaires' }}
          </button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- LEFT: 7 DAYS -->
          <div class="lg:col-span-2 space-y-3">
            <div
              v-for="day in daysConfig"
              :key="day.key"
              class="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-muted/10 border border-border rounded-xl transition-all"
              :class="availabilities[day.key].off ? 'opacity-60 grayscale' : 'hover:border-secondary/30 bg-muted/20'"
            >
              <!-- Day Toggle -->
              <div class="flex items-center gap-3 w-40 shrink-0 mb-3 sm:mb-0">
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    :checked="!availabilities[day.key].off"
                    @change="availabilities[day.key].off = !$event.target.checked"
                    class="sr-only peer"
                  >
                  <div class="w-9 h-5 bg-muted-foreground/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-secondary"></div>
                </label>
                <span class="font-bold text-foreground capitalize">{{ day.label }}</span>
              </div>
              
              <!-- Time Inputs -->
              <div v-if="!availabilities[day.key].off" class="flex items-center gap-3 flex-1 sm:justify-end">
                <div class="flex items-center bg-background border border-border rounded-lg px-2 overflow-hidden focus-within:border-secondary transition-colors">
                  <span class="text-[10px] font-black uppercase text-muted-foreground pr-1">De</span>
                  <input
                    v-model="availabilities[day.key].start"
                    type="time"
                    class="py-1.5 bg-transparent text-foreground text-sm font-bold outline-none border-none w-24"
                  />
                </div>
                <!-- <span class="text-muted-foreground text-xs uppercase font-bold px-1">—</span> -->
                <div class="flex items-center bg-background border border-border rounded-lg px-2 overflow-hidden focus-within:border-secondary transition-colors">
                  <span class="text-[10px] font-black uppercase text-muted-foreground pr-1">À</span>
                  <input
                    v-model="availabilities[day.key].end"
                    type="time"
                    class="py-1.5 bg-transparent text-foreground text-sm font-bold outline-none border-none w-24"
                  />
                </div>
              </div>
              
              <!-- Closed State Text -->
              <div v-else class="flex-1 sm:text-right text-xs font-bold text-muted-foreground uppercase tracking-widest py-1.5 flex items-center sm:justify-end gap-2">
                <i class="fas fa-bed"></i> Repos
              </div>
            </div>
          </div>

          <!-- RIGHT: QUICK ACTIONS -->
          <div class="space-y-4">
             <div class="bg-muted/10 border border-border rounded-xl p-5 sticky top-24">
               <h4 class="font-black text-foreground mb-4 text-sm uppercase tracking-wider">
                 Actions rapides
               </h4>
               <div class="space-y-2">
                  <button
                    @click="setWeekdaysOpen"
                    class="w-full flex items-center justify-between p-3.5 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/40 transition group"
                  >
                    <span class="font-medium text-green-700 dark:text-green-400 text-left text-sm">
                      <i class="fas fa-briefcase mr-2"></i> Lundi - Vendredi
                    </span>
                    <i class="fas fa-arrow-right text-green-600 dark:text-green-400 group-hover:translate-x-1 transition-transform text-xs"></i>
                  </button>

                  <button
                    @click="setAllClosed"
                    class="w-full flex items-center justify-between p-3.5 bg-muted/20 border border-border rounded-lg hover:bg-muted/30 transition group"
                  >
                    <span class="font-medium text-foreground text-left text-sm">
                      <i class="fas fa-lock mr-2"></i> Marquer tout fermé
                    </span>
                    <i class="fas fa-arrow-right text-muted-foreground group-hover:translate-x-1 transition-transform text-xs"></i>
                  </button>

                  <button
                    @click="setAllDaysOpen"
                    class="w-full flex items-center justify-between p-3.5 bg-secondary/10 border border-secondary/20 rounded-lg hover:bg-secondary/20 transition group"
                  >
                    <span class="font-medium text-secondary text-left text-sm">
                      <i class="fas fa-calendar-check mr-2"></i> Tous les jours
                    </span>
                    <i class="fas fa-arrow-right text-secondary group-hover:translate-x-1 transition-transform text-xs"></i>
                  </button>
               </div>
               <p class="text-xs text-muted-foreground mt-4 leading-relaxed">
                 Configurez vos heures de travail. Les clients ne pourront réserver des visites qu'en fonction de ces créneaux à l'avenir. 
               </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import DashboardLayout from "../../layouts/DashboardLayout.vue";
import axios from "../../axios";

const selectedDate = ref(null);
const isLoading = ref(true);
const isSaving = ref(false);
const agendaEvents = ref([]);

const daysConfig = [
  { key: 'monday', label: 'Lundi' },
  { key: 'tuesday', label: 'Mardi' },
  { key: 'wednesday', label: 'Mercredi' },
  { key: 'thursday', label: 'Jeudi' },
  { key: 'friday', label: 'Vendredi' },
  { key: 'saturday', label: 'Samedi' },
  { key: 'sunday', label: 'Dimanche' }
];

const availabilities = ref({
  monday:    { off: false, start: '08:00', end: '18:00' },
  tuesday:   { off: false, start: '08:00', end: '18:00' },
  wednesday: { off: false, start: '08:00', end: '18:00' },
  thursday:  { off: false, start: '08:00', end: '18:00' },
  friday:    { off: false, start: '08:00', end: '18:00' },
  saturday:  { off: false, start: '09:00', end: '14:00' },
  sunday:    { off: true,  start: '', end: '' }
});

// Constantes globales
const todayObj = new Date();
todayObj.setHours(0, 0, 0, 0);

// Statistiques dynamiques
const upcomingVisitsCount = computed(() => agendaEvents.value.filter(v => v.date >= todayObj).length);
const completedVisitsCount = computed(() => agendaEvents.value.filter(v => v.status === 'completed').length);
const confirmedVisitsCount = computed(() => agendaEvents.value.filter(v => v.status === 'confirmed').length);
const pendingVisitsCount = computed(() => agendaEvents.value.filter(v => v.status === 'pending').length);

const currentDate = ref(new Date());
const weekDays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

const currentMonthName = computed(() => {
  return currentDate.value.toLocaleString("fr-FR", { month: "long" });
});

const currentYear = computed(() => {
  return currentDate.value.getFullYear();
});

const fetchAgenda = async () => {
  isLoading.value = true;
  try {
    const { data } = await axios.get("/api/agent/agenda");
    if (data.success) {
      agendaEvents.value = data.data.map((v) => {
        let type = "booked";
        if (v.status === 'confirmed') type = "booked";
        if (v.status === 'completed') type = "busy";
        if (v.status === 'pending') type = "available";

        return {
          ...v,
          type,
          label: "Visite",
          date: new Date(v.scheduled_at),
        }
      });
    }

    // Récupérer les disponibilités de l'agent depuis l'utilisateur connecté
    const userRes = await axios.get("/api/user");
    if (userRes.data && userRes.data.availabilities) {
      // S'assurer de rétro-compatibilité si c'était l'ancien format
      if(userRes.data.availabilities.monday) {
        availabilities.value = userRes.data.availabilities;
      }
    }

  } catch (err) {
    console.error("Erreur chargement agenda agent:", err);
  } finally {
    isLoading.value = false;
  }
};

const saveAvailabilities = async () => {
  isSaving.value = true;
  try {
    const { data } = await axios.post('/api/agent/agenda/availabilities', {
      availabilities: availabilities.value
    });
    if (data.success) {
      alert("Disponibilités mises à jour avec succès !");
    }
  } catch (err) {
    console.error("Erreur sauvegarde disponibilités:", err);
    alert("Une erreur est survenue lors de la sauvegarde.");
  } finally {
    isSaving.value = false;
  }
};

const setWeekdaysOpen = () => {
  ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].forEach(day => {
    availabilities.value[day].off = false;
    if(!availabilities.value[day].start) availabilities.value[day].start = '08:00';
    if(!availabilities.value[day].end) availabilities.value[day].end = '18:00';
  });
  ['saturday', 'sunday'].forEach(day => {
    availabilities.value[day].off = true;
  });
};

const setAllClosed = () => {
  Object.keys(availabilities.value).forEach(day => {
    availabilities.value[day].off = true;
  });
};

const setAllDaysOpen = () => {
  Object.keys(availabilities.value).forEach(day => {
    availabilities.value[day].off = false;
    if(!availabilities.value[day].start) availabilities.value[day].start = '09:00';
    if(!availabilities.value[day].end) availabilities.value[day].end = '16:00';
  });
};

onMounted(fetchAgenda);

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();

  let startingDayOfWeek = firstDay.getDay() - 1;
  if (startingDayOfWeek === -1) startingDayOfWeek = 6;

  const days = [];
  const prevMonthLastDate = new Date(year, month, 0).getDate();
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    days.push({
      dayNumber: prevMonthLastDate - i,
      isOtherMonth: true,
      date: new Date(year, month - 1, prevMonthLastDate - i),
    });
  }

  const today = new Date();
  for (let i = 1; i <= daysInMonth; i++) {
    const d = new Date(year, month, i);
    days.push({
      dayNumber: i,
      isOtherMonth: false,
      isToday: d.toDateString() === today.toDateString(),
      date: d,
    });
  }

  const remainingCells = 42 - days.length;
  for (let i = 1; i <= remainingCells; i++) {
    days.push({
      dayNumber: i,
      isOtherMonth: true,
      date: new Date(year, month + 1, i),
    });
  }

  return days;
});

const changeMonth = (offset) => {
  const newDate = new Date(currentDate.value);
  newDate.setMonth(newDate.getMonth() + offset);
  currentDate.value = newDate;
};

const resetToToday = () => {
  currentDate.value = new Date();
};

const selectDate = (date) => {
  selectedDate.value = date;
};

const getEventsForDate = (date) => {
  return agendaEvents.value.filter(
    (e) =>
      e.date.getDate() === date.getDate() &&
      e.date.getMonth() === date.getMonth() &&
      e.date.getFullYear() === date.getFullYear(),
  );
};

const getEventClass = (type) => {
  switch (type) {
    case "available":
      return "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800";
    case "booked":
      return "bg-secondary/10 text-secondary border-secondary/20";
    case "busy":
      return "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800";
    default:
      return "bg-muted/20 text-muted-foreground";
  }
};

const formatDate = (date) => {
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
</script>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.5s ease-out backwards;
}
.animate-slide-up {
  animation: slideUp 0.5s ease-out backwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>