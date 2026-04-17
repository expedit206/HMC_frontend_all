<template>
  <div class="dashboard-page-content">
    <div class="max-w-4xl mx-auto">
      <div class="flex flex-col gap-3 justify-between mb-8 animate-fadeIn">
        <div>
          <h1 class="text-2xl font-bold text-foreground leading-tight">
            Mes Services Pro 🛠️
          </h1>
          <p class="text-muted-foreground text-sm mt-1">
            Définissez vos prestations et tarifs pour les clients.
          </p>
        </div>
        <button
          @click="openNewServiceModal"
          class="px-5 py-2.5 bg-secondary text-secondary-foreground rounded-xl text-xs font-bold hover:scale-105 transition-all shadow-md uppercase tracking-wider flex items-center gap-2 w-fit"
        >
          <i class="fas fa-plus"></i> Nouveau Service
        </button>
      </div>

      <div v-if="isLoading" class="py-20 text-center">
        <div class="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-xs font-bold uppercase tracking-widest text-muted-foreground">Chargement de vos services...</p>
      </div>

      <div
        v-else-if="services.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn"
        style="animation-delay: 0.1s"
      >
        <!-- Service Cards -->
        <div
          v-for="service in services"
          :key="service.id"
          class="bg-card rounded-3xl p-6 shadow-sm border border-border group relative overflow-hidden transition-all hover:shadow-md hover:-translate-y-1"
        >
          <div class="flex justify-between items-start mb-6">
            <div
              :class="`w-12 h-12 rounded-2xl ${service.iconBg} ${service.iconColor} flex items-center justify-center text-xl group-hover:scale-110 transition-transform`"
            >
              <i :class="`fas ${service.icon}`"></i>
            </div>
            <div class="flex gap-2">
              <button
                class="w-8 h-8 rounded-lg bg-muted/20 text-muted-foreground flex items-center justify-center hover:text-secondary transition-colors"
              >
                <i class="fas fa-edit text-xs"></i>
              </button>
              <button
                class="w-8 h-8 rounded-lg bg-muted/20 text-muted-foreground flex items-center justify-center hover:text-destructive transition-colors"
              >
                <i class="fas fa-trash text-xs"></i>
              </button>
            </div>
          </div>
          <h3
            class="text-base font-black text-foreground uppercase tracking-tight mb-2"
          >
            {{ service.title }}
          </h3>
          <p class="text-xs text-muted-foreground mb-6 leading-relaxed">
            {{ service.description }}
          </p>
          <div
            class="flex justify-between items-center py-4 border-t border-border"
          >
            <div>
              <p
                class="text-[9px] text-muted-foreground font-bold uppercase tracking-widest mb-1"
              >
                Tarif de base
              </p>
              <p class="text-sm font-black text-foreground">
                {{ formatPrice(service.price) }}
                <span v-if="service.unit" class="text-[10px]">{{
                  service.unit
                }}</span>
              </p>
            </div>
            <div class="flex items-center gap-2">
              <span
                :class="`w-2 h-2 ${service.active ? 'bg-green-500' : 'bg-muted-foreground'} rounded-full`"
              ></span>
              <span
                :class="`text-[10px] font-black ${service.active ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'} uppercase`"
                >{{ service.active ? "Actif" : "En pause" }}</span
              >
            </div>
          </div>
        </div>
      </div>

      <div v-else class="py-20 text-center bg-card rounded-3xl border border-dashed border-border">
        <i class="fas fa-tools text-5xl text-muted-foreground/20 mb-4"></i>
        <p class="text-sm font-bold text-muted-foreground uppercase tracking-widest">Vous n'avez pas encore de services répertoriés</p>
        <button @click="openNewServiceModal" class="mt-4 text-secondary font-bold text-xs uppercase hover:underline">Créer mon premier service</button>
      </div>

      <div
        class="mt-8 bg-blue-50 dark:bg-blue-950/30 rounded-3xl p-6 border border-blue-100 dark:border-blue-800/50 flex items-start gap-4 animate-slide-up"
        style="animation-delay: 0.2s"
      >
        <i class="fas fa-info-circle text-blue-600 dark:text-blue-400 mt-1"></i>
        <div>
          <h4 class="text-sm font-bold text-blue-900 dark:text-blue-300 mb-1">Conseil Pro</h4>
          <p class="text-xs text-blue-800 dark:text-blue-200 leading-relaxed">
            Pensez à bien remplir votre "Fiche Pro" pour rassurer les clients
            et augmenter vos chances d'être sélectionné pour des interventions
            de bailleurs.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "../../axios";

const isLoading = ref(true);
const services = ref([]);

const fetchServices = async () => {
  isLoading.value = true;
  try {
    const { data } = await axios.get("/api/prestataire/services");
    if (data.success) {
      services.value = data.data.map(s => ({
        id: s.id,
        title: s.title,
        description: s.description,
        price: s.base_price,
        unit: "XAF",
        icon: getServiceIcon(s.category),
        iconBg: "bg-secondary/10",
        iconColor: "text-secondary",
        active: s.status === 'active',
      }));
    }
  } catch (err) {
    console.error("Erreur chargement services prestataire:", err);
  } finally {
    isLoading.value = false;
  }
};

const getServiceIcon = (category) => {
  const map = {
    'plomberie': 'fa-faucet',
    'electricite': 'fa-bolt',
    'climatisation': 'fa-wind',
    'peinture': 'fa-brush',
  };
  return map[category?.slug] || 'fa-tools';
};

onMounted(fetchServices);

const openNewServiceModal = () => {
  alert("Fonctionnalité d'ajout de service à venir");
};

const formatPrice = (p) => new Intl.NumberFormat("fr-FR").format(p || 0);
</script>

<style scoped>
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