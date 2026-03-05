<template>
  <DashboardLayout>

      <div
        v-if="isLoading"
        class="flex flex-col items-center justify-center h-full min-h-[60vh]"
      >
        <div
          class="w-16 h-16 border-4 border-[#E54801] border-t-transparent rounded-full animate-spin mb-4"
        ></div>
        <p class="text-gray-500 font-bold uppercase tracking-widest text-xs">
          Chargement de votre agenda...
        </p>
      </div>

      <div v-else class="max-w-6xl mx-auto">
   

        <div
          class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 animate-fadeIn"
        >
          <div>
            <h1 class="text-2xl font-bold text-gray-900 leading-tight">
              Mon Agenda Pro 📅
            </h1>
            <p class="text-gray-500 text-sm mt-1">
              Gérez vos disponibilités et vos missions planifiées.
            </p>
          </div>
          <div class="flex gap-2">
            <button
              class="px-5 py-2.5 bg-[#1B0B38] text-white rounded-xl text-xs font-bold hover:scale-105 transition-all shadow-md uppercase tracking-wider"
            >
              Ajouter Indisponibilité
            </button>
          </div>
        </div>

        <div
          class="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn"
          style="animation-delay: 0.1s"
        >
          <!-- Calendrier Miniature & Filtres -->
          <div class="lg:col-span-4 space-y-6">
            <div
              class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
            >
              <div class="flex items-center justify-between mb-6">
                <h3
                  class="text-xs font-black text-[#1B0B38] uppercase tracking-widest"
                >
                  Février 2026
                </h3>
                <div class="flex gap-2">
                  <button
                    class="w-7 h-7 bg-gray-50 rounded-lg flex items-center justify-center text-[10px] text-gray-400 hover:text-[#E54801]"
                  >
                    <i class="fas fa-chevron-left"></i>
                  </button>
                  <button
                    class="w-7 h-7 bg-gray-50 rounded-lg flex items-center justify-center text-[10px] text-gray-400 hover:text-[#E54801]"
                  >
                    <i class="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
              <div class="grid grid-cols-7 gap-1 text-center mb-2">
                <span
                  v-for="day in ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di']"
                  :key="day"
                  class="text-[9px] font-black text-gray-400 uppercase"
                  :class="{ 'text-[#E54801]': day === 'Sa' || day === 'Di' }"
                  >{{ day }}</span
                >
              </div>
              <div class="grid grid-cols-7 gap-1 text-center">
                <span
                  v-for="d in calendarDays"
                  :key="d.day"
                  :class="[
                    'p-2 text-xs',
                    d.isCurrentMonth
                      ? 'font-bold text-[#1B0B38] cursor-pointer hover:bg-orange-50 rounded-xl'
                      : 'text-gray-300',
                    d.isActive ? 'day-active' : '',
                    d.hasEvent ? 'relative' : '',
                  ]"
                >
                  {{ d.day }}
                  <div
                    v-if="d.hasEvent"
                    class="w-1 h-1 bg-[#E54801] rounded-full absolute bottom-1 left-1/2 -translate-x-1/2"
                  ></div>
                </span>
              </div>
            </div>

            <div
              class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
            >
              <h3
                class="text-xs font-black text-[#1B0B38] uppercase tracking-widest mb-6"
              >
                Légende
              </h3>
              <div class="space-y-4">
                <div class="flex items-center gap-3">
                  <div class="w-3 h-3 rounded-full bg-[#E54801]"></div>
                  <span
                    class="text-[10px] font-bold text-gray-500 uppercase tracking-widest"
                    >Missions à venir</span
                  >
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span
                    class="text-[10px] font-bold text-gray-500 uppercase tracking-widest"
                    >Missions Planifiées</span
                  >
                </div>
              </div>
            </div>
          </div>

          <!-- Planning Détaillé -->
          <div class="lg:col-span-8 space-y-6">
            <div
              class="bg-white rounded-3xl shadow-sm border border-gray-100 p-8"
            >
              <div
                class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-gray-50 pb-6"
              >
                <div class="flex items-center gap-4">
                  <div
                    class="w-14 h-14 rounded-2xl bg-[#E54801] text-white flex flex-col items-center justify-center leading-none"
                  >
                    <span class="text-xl font-black">{{
                      new Date().getDate()
                    }}</span>
                    <span
                      class="text-[8px] font-black uppercase tracking-widest mt-1"
                      >Févr</span
                    >
                  </div>
                  <div>
                    <h2
                      class="text-xl font-black text-[#1B0B38] uppercase tracking-tight"
                    >
                      Aujourd'hui
                    </h2>
                    <p
                      class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1"
                    >
                      {{ agenda.length }} Événements prévus
                    </p>
                  </div>
                </div>
                <button
                  class="px-5 py-2.5 bg-gray-50 text-[#1B0B38] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition-all"
                >
                  Suivant >
                </button>
              </div>

              <div
                v-if="agenda.length === 0"
                class="py-20 text-center text-gray-400"
              >
                <i class="far fa-calendar-times text-5xl mb-4 opacity-20"></i>
                <p class="text-xs font-bold uppercase tracking-widest">
                  Votre agenda est vide pour le moment
                </p>
              </div>

              <div
                v-else
                class="relative pl-8 space-y-8 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100"
              >
                <!-- Missions from API -->
                <div
                  v-for="(item, idx) in agenda"
                  :key="item.id"
                  class="relative group animate-slide-up"
                  :style="`animation-delay: ${0.1 * (idx + 1)}s`"
                >
                  <div
                    :class="[
                      'absolute -left-[27px] top-1.5 w-4 h-4 rounded-full bg-white border-4 z-10',
                      item.status === 'accepted'
                        ? 'border-blue-500'
                        : 'border-[#E54801]',
                    ]"
                  ></div>
                  <div
                    :class="[
                      'flex flex-col md:flex-row gap-4 items-start md:items-center justify-between p-6 rounded-2xl border transition-all',
                      item.status === 'accepted'
                        ? 'bg-blue-50/20 border-blue-100 group-hover:bg-blue-50'
                        : 'bg-orange-50/30 border-orange-100 group-hover:bg-orange-50',
                    ]"
                  >
                    <div>
                      <div class="flex items-center gap-4 mb-1">
                        <span
                          :class="[
                            'text-xs font-black',
                            item.status === 'accepted'
                              ? 'text-blue-500'
                              : 'text-[#E54801]',
                          ]"
                        >
                          {{ formatTime(item.scheduled_at) }}
                        </span>
                        <span
                          :class="[
                            'px-2 py-0.5 text-white text-[8px] font-black uppercase rounded',
                            item.status === 'accepted'
                              ? 'bg-blue-500'
                              : 'bg-[#E54801]',
                          ]"
                        >
                          {{ item.status }}
                        </span>
                      </div>
                      <h4
                        class="text-sm font-black text-[#1B0B38] uppercase italic tracking-tight"
                      >
                        {{ item.service?.title }}
                      </h4>
                      <p class="text-[10px] text-gray-500 mt-1">
                        <i class="fas fa-map-marker-alt mr-1"></i>
                        {{ item.property?.city || "Cameroun" }} •
                        {{ item.requester?.name }}
                      </p>
                    </div>
                    <div class="flex gap-2 w-full md:w-auto">
                      <button
                        class="flex-1 md:flex-none p-2 bg-white text-[#1B0B38] rounded-lg border border-gray-100 hover:text-[#E54801] transition-colors"
                      >
                        <i class="fas fa-edit text-xs"></i>
                      </button>
                      <button
                        class="flex-1 md:flex-none p-2 bg-white text-[#1B0B38] rounded-lg border border-gray-100 hover:text-[#E54801] transition-colors"
                      >
                        <i class="fas fa-check text-xs"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <button
                class="w-full mt-12 py-4 border-2 border-dashed border-gray-100 rounded-3xl text-gray-400 text-xs font-black uppercase tracking-[0.2em] hover:border-[#E54801] hover:text-[#E54801] hover:bg-orange-50/30 transition-all flex items-center justify-center gap-4"
              >
                <i class="fas fa-plus"></i> Ajouter une indisponibilité
              </button>
            </div>
          </div>
        </div>
      </div>
    

  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import DashboardLayout from "../../layouts/DashboardLayout.vue";
import axios from "../../axios";
const isLoading = ref(true);
const agenda = ref([]);

const fetchAgenda = async () => {
  isLoading.value = true;
  try {
    const { data } = await axios.get("/api/prestataire/agenda");
    if (data.success) {
      agenda.value = data.data;
    }
  } catch (err) {
    console.error("Erreur chargement agenda prestataire:", err);
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchAgenda);

const calendarDays = [
  { day: 30, isCurrentMonth: false },
  { day: 31, isCurrentMonth: false },
  { day: 1, isCurrentMonth: true },
  { day: 2, isCurrentMonth: true },
  { day: 3, isCurrentMonth: true },
  { day: 4, isCurrentMonth: true },
  { day: 5, isCurrentMonth: true },
  { day: 6, isCurrentMonth: true },
  { day: 7, isCurrentMonth: true },
  { day: 8, isCurrentMonth: true },
  { day: 9, isCurrentMonth: true },
  { day: 10, isCurrentMonth: true },
  { day: 11, isCurrentMonth: true },
  { day: 12, isCurrentMonth: true },
  { day: 13, isCurrentMonth: true },
  { day: 14, isCurrentMonth: true },
  { day: 15, isCurrentMonth: true },
  { day: 16, isCurrentMonth: true },
  { day: 17, isCurrentMonth: true, isActive: true },
  { day: 18, isCurrentMonth: true },
  { day: 19, isCurrentMonth: true },
  { day: 20, isCurrentMonth: true },
  { day: 21, isCurrentMonth: true },
  { day: 22, isCurrentMonth: true, hasEvent: true },
  { day: 23, isCurrentMonth: true },
  { day: 24, isCurrentMonth: true },
  { day: 25, isCurrentMonth: true },
  { day: 26, isCurrentMonth: true },
];

const formatTime = (dateStr) => {
  const d = new Date(dateStr);
  return `${d.getHours()}:${d.getMinutes().toString().padStart(2, "0")}`;
};
</script>

<style scoped>
.day-active {
  background-color: #e54801;
  color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(229, 72, 1, 0.15);
}
.animate-fadeIn {
  animation: fadeIn 0.5s ease-out forwards;
  opacity: 0;
}
.animate-slide-up {
  animation: slideUp 0.4s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
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

