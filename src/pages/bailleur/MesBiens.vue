<template>
  <DashboardLayout>

    <div class="max-w-6xl mx-auto">
      <!-- Header Section -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 animate-fadeIn">
        <div>
          <h1 class="text-2xl font-bold text-[#1B0B38] leading-tight">Mes Biens Immobiliers</h1>
          <p class="text-gray-500 text-sm mt-1">
            Gérez vos propriétés et observez l'avancement du processus locatif.
          </p>
        </div>
        <div class="flex items-center gap-3">
          <button @click="mobileMenuOpen = !mobileMenuOpen"
            class="lg:hidden p-2 text-gray-500 hover:text-[#E54801] transition-colors">
            <i class="fas fa-bars text-xl"></i>
          </button>
          <RouterLink :to="{ name: 'BailleurPublierBien' }"
            class="px-6 py-3 bg-[#E54801] text-white rounded-xl text-sm font-bold hover:shadow-lg transition-all flex items-center gap-2">
            <i class="fas fa-plus"></i>
            <span class="hidden sm:inline">Ajouter un Bien</span>
          </RouterLink>
        </div>
      </div>

      <!-- Property Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn" style="animation-delay: 0.2s">
        <!-- Loading State -->
        <template v-if="isLoading">
          <div v-for="i in 3" :key="i" class="bg-gray-100 rounded-2xl h-80 animate-pulse"></div>
        </template>

        <template v-else>
          <div v-if="properties.length === 0"
            class="col-span-full py-20 text-center bg-white rounded-2xl border border-gray-100 shadow-sm">
            <i class="fas fa-building text-5xl mb-4 text-gray-200"></i>
            <p class="text-gray-500 font-bold">Vous n'avez pas encore publié de bien.</p>
            <RouterLink :to="{ name: 'BailleurPublierBien' }"
              class="text-[#E54801] font-bold mt-2 inline-block hover:underline">
              Publier mon premier bien
            </RouterLink>
          </div>

          <!-- Property Card (Loop) -->
          <div v-for="property in properties" :key="property.id"
            class="bg-white rounded-xl border border-gray-100 hover:shadow-sm transition-all group flex flex-col">
            <!-- IMAGE -->
            <div class="relative h-36 overflow-hidden rounded-t-xl">
              <img :src="property.image" :alt="property.title" class="w-full h-full object-cover" />

              <span class="absolute top-2 left-2 px-2 py-0.5 text-[9px] font-bold rounded text-white"
                :class="property.status === 'vacant' ? 'bg-[#E54801]' : 'bg-green-500'">
                {{ property.status === "vacant" ? "Vacant" : "Loué" }}
              </span>
            </div>

            <!-- CONTENT -->
            <div class="p-3 flex flex-col gap-2 flex-1">

              <div class="flex justify-between items-start">
                <h3 class="font-semibold text-sm text-[#1B0B38] line-clamp-1">
                  {{ property.title }}
                </h3>

                <button @click="goToEdit(property.id)" class="text-gray-400 hover:text-[#E54801] text-xs">
                  <i class="fas fa-pen"></i>
                </button>
              </div>

              <p class="text-[11px] text-gray-400 line-clamp-1">
                {{ property.location }}
              </p>

              <!-- INFOS EN LIGNE -->
              <div class="flex justify-between text-[11px] font-medium text-gray-600 border-t pt-2">

                <span>{{ formatPrice(property.monthly_rent || property.price) }}</span>

                <span :class="property.tenant ? 'text-[#1B0B38]' : 'text-gray-400 italic'">
                  {{ property.tenant || "Aucun locataire" }}
                </span>

                <span class="font-bold text-[#1B0B38]">
                  {{ property.visits }} vues
                </span>
              </div>

              <!-- ACTIONS -->
              <div class="flex gap-2 mt-2">

                <button @click="property.status !== 'vacant' && openProcessStatus(property.id)"
                  :disabled="property.status === 'vacant'"
                  class="flex-1 py-2 text-[11px] rounded-lg font-semibold transition-all" :class="property.status === 'vacant'
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-50 text-blue-700 hover:bg-blue-100'">
                  Suivi
                </button>

                <button @click="handleDelete(property.id)"
                  class="w-9 h-9 flex items-center justify-center rounded-lg border border-red-100 text-red-400 hover:bg-red-500 hover:text-white transition-all">
                  <i class="fas fa-trash text-xs"></i>
                </button>

              </div>
            </div>
          </div>
        </template>
      </div>
    </div>


  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import DashboardLayout from "../../layouts/DashboardLayout.vue";
import { RouterLink, useRouter } from "vue-router";
import axios from "../../axios";

const router = useRouter();

const properties = ref([]);
const isLoading = ref(true);

// ── Variables du Modal Tracking ──
const trackingModal = ref(false);
const isTrackingLoading = ref(false);
const trackingData = ref(null);

const fetchProperties = async () => {
  isLoading.value = true;
  try {
    const { data } = await axios.get("/api/bailleur/properties");
    if (data.success) {
      properties.value = data.data.data.map((p) => {
        let imageUrl = "/images/placeholder-property.jpg";
        if (p.primary_image) {
          imageUrl = p.primary_image.path.startsWith("http")
            ? p.primary_image.path
            : `/storage/${p.primary_image.path}`;
        }
        return {
          ...p,
          image: imageUrl,
          status: p.rental_status === "available" ? "vacant" : "occupied",
          tenant: p.tenant?.name || null,
          visits: p.visits_count || 0,
        };
      });
    }
  } catch (err) {
    console.error("Erreur chargement biens bailleur:", err);
  } finally {
    isLoading.value = false;
  }
};

const handleDelete = async (id) => {
  if (!confirm("Êtes-vous sûr de vouloir supprimer ce bien ? Cette action est irréversible.")) return;
  try {
    const { data } = await axios.delete(`/api/properties/${id}`);
    if (data.success) {
      alert("Bien supprimé avec succès.");
      await fetchProperties();
    }
  } catch (err) {
    console.error("Erreur suppression bien:", err);
    alert("Une erreur est survenue lors de la suppression.");
  }
};

const goToEdit = (id) => {
  router.push({ name: 'BailleurEditerBien', params: { id } });
};

// ── Ouverture Modal de Tracking (Lecture Seule) ──
const openProcessStatus = async (propertyId) => {
  trackingModal.value = true;
  isTrackingLoading.value = true;
  trackingData.value = null;
  try {
    const { data } = await axios.get(`/api/bailleur/properties/${propertyId}/rental-status`);
    if (data.success) {
      trackingData.value = data.data;
    }
    console.log(trackingData.value);

  } catch (err) {
    console.error(err);
    alert("Impossible de charger les statuts pour le moment.");
    trackingModal.value = false;
  } finally {
    isTrackingLoading.value = false;
  }
};

onMounted(fetchProperties);

const formatPrice = (p) => new Intl.NumberFormat("fr-FR").format(p || 0) + ' FCFA';
const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
};
</script>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.5s ease-out forwards;
  opacity: 0;
}

.animate-slide-up {
  animation: slideUp 0.3s ease-out forwards;
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
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
</style>
