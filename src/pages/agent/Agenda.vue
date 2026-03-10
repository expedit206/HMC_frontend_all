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
                Rendez-vous cette semaine
              </p>
              <p class="text-3xl font-bold text-secondary">5</p>
            </div>
            <i class="fas fa-calendar-check text-4xl text-secondary/20"></i>
          </div>
        </div>

        <div class="bg-card rounded-xl shadow-sm border border-border p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-muted-foreground mb-1">
                Heures libres cette semaine
              </p>
              <p class="text-3xl font-bold text-green-500 dark:text-green-400">12h30</p>
            </div>
            <i class="fas fa-hourglass-half text-4xl text-green-500/20"></i>
          </div>
        </div>

        <div class="bg-card rounded-xl shadow-sm border border-border p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-muted-foreground mb-1">Visites programmées</p>
              <p class="text-3xl font-bold text-blue-500 dark:text-blue-400">8</p>
            </div>
            <i class="fas fa-map-marker-alt text-4xl text-blue-500/20"></i>
          </div>
        </div>

        <div class="bg-card rounded-xl shadow-sm border border-border p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-muted-foreground mb-1">Taux d'occupation</p>
              <p class="text-3xl font-bold text-purple-500 dark:text-purple-400">65%</p>
            </div>
            <i class="fas fa-chart-pie text-4xl text-purple-500/20"></i>
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
                  <div
                    class="w-4 h-4 rounded bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700"
                  ></div>
                  <span class="text-foreground/80">Disponible</span>
                </div>
                <div class="flex items-center gap-2">
                  <div
                    class="w-4 h-4 rounded bg-gradient-to-br from-secondary to-secondary/80"
                  ></div>
                  <span class="text-foreground/80">Réservé</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-4 h-4 rounded bg-muted"></div>
                  <span class="text-foreground/80">Occupé</span>
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
                <p class="text-xs text-muted-foreground">
                  <i class="fas fa-user text-secondary mr-2"></i>
                  {{ event.visitor?.name }}
                </p>
                <div class="mt-3">
                  <span
                    class="inline-block px-2 py-1 rounded text-[10px] font-bold bg-secondary/10 text-secondary border border-secondary/20"
                  >{{ event.status }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- AVAILABILITY SETTINGS -->
      <div
        class="bg-card rounded-2xl shadow-sm border border-border p-6 animate-slide-up"
        style="animation-delay: 0.2s"
      >
        <h3 class="text-2xl font-bold text-foreground mb-6">
          Gérer vos disponibilités
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- LEFT: WORKING HOURS -->
          <div>
            <h4 class="font-bold text-foreground mb-4">
              Vos heures de travail habituelles
            </h4>

            <div class="space-y-4">
              <div
                class="flex items-center justify-between p-4 bg-muted/20 rounded-lg"
              >
                <span class="font-medium text-foreground/80"
                  >Lundi - Vendredi</span
                >
                <div class="flex items-center gap-2">
                  <input
                    type="time"
                    value="08:00"
                    class="px-2 py-1 border border-border bg-background text-foreground rounded text-sm outline-none focus:border-secondary"
                  />
                  <span class="text-muted-foreground">à</span>
                  <input
                    type="time"
                    value="18:00"
                    class="px-2 py-1 border border-border bg-background text-foreground rounded text-sm outline-none focus:border-secondary"
                  />
                </div>
              </div>

              <div
                class="flex items-center justify-between p-4 bg-muted/20 rounded-lg"
              >
                <span class="font-medium text-foreground/80">Samedi</span>
                <div class="flex items-center gap-2">
                  <input
                    type="time"
                    value="09:00"
                    class="px-2 py-1 border border-border bg-background text-foreground rounded text-sm outline-none focus:border-secondary"
                  />
                  <span class="text-muted-foreground">à</span>
                  <input
                    type="time"
                    value="16:00"
                    class="px-2 py-1 border border-border bg-background text-foreground rounded text-sm outline-none focus:border-secondary"
                  />
                </div>
              </div>

              <div
                class="flex items-center justify-between p-4 bg-muted/20 rounded-lg"
              >
                <span class="font-medium text-foreground/80">Dimanche</span>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked
                    class="w-4 h-4 text-secondary focus:ring-secondary rounded border-border bg-background"
                  />
                  <span class="text-sm text-muted-foreground">Fermé</span>
                </label>
              </div>
            </div>
          </div>

          <!-- RIGHT: QUICK ACTIONS -->
          <div>
            <h4 class="font-bold text-foreground mb-4">Actions rapides</h4>

            <div class="space-y-3">
              <button
                class="w-full flex items-center justify-between p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/40 transition group"
              >
                <span class="font-medium text-green-900 dark:text-green-400">
                  <i class="fas fa-check-circle mr-2"></i> Marquer comme
                  disponible (semaine)
                </span>
                <i
                  class="fas fa-arrow-right text-green-600 dark:text-green-400 group-hover:translate-x-1 transition-transform"
                ></i>
              </button>

              <button
                class="w-full flex items-center justify-between p-4 bg-muted/20 border border-border rounded-lg hover:bg-muted/30 transition group"
              >
                <span class="font-medium text-foreground">
                  <i class="fas fa-lock mr-2"></i> Fermer mon agenda (congés)
                </span>
                <i
                  class="fas fa-arrow-right text-muted-foreground group-hover:translate-x-1 transition-transform"
                ></i>
              </button>

              <button
                class="w-full flex items-center justify-between p-4 bg-secondary/10 border border-secondary/20 rounded-lg hover:bg-secondary/20 transition group"
              >
                <span class="font-medium text-secondary">
                  <i class="fas fa-calendar-plus mr-2"></i> Ajouter une
                  période
                </span>
                <i
                  class="fas fa-arrow-right text-secondary group-hover:translate-x-1 transition-transform"
                ></i>
              </button>
            </div>
          </div>
        </div>

        <div class="mt-6 pt-6 border-t border-border">
          <button
            class="w-full px-6 py-3 bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground rounded-lg font-semibold hover:shadow-lg transition"
          >
            <i class="fas fa-save mr-2"></i> Enregistrer les modifications
          </button>
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
const agendaEvents = ref([]);

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
      agendaEvents.value = data.data.map((v) => ({
        ...v,
        type: "booked",
        label: "Visite",
        date: new Date(v.scheduled_at),
      }));
    }
  } catch (err) {
    console.error("Erreur chargement agenda agent:", err);
  } finally {
    isLoading.value = false;
  }
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
      return "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800";
    case "booked":
      return "bg-secondary/10 text-secondary border border-secondary/20";
    case "busy":
      return "bg-muted/20 text-muted-foreground border border-border";
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