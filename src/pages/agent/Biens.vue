<template>
  <DashboardLayout>

    <div class="max-w-7xl mx-auto">

      <!-- HEADER -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 animate-fadeIn">
        <div>
          <h1 class="text-2xl font-bold text-[#1B0B38]">
            Mes Biens Immobiliers
          </h1>
          <p class="text-gray-500 text-sm mt-1">
            Tous les biens que vous gérez et vos audits en cours
          </p>
        </div>
        <button @click="fetchAll"
          class="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg hover:text-[#E54801] transition-colors text-sm font-bold flex items-center gap-2">
          <i class="fas fa-sync-alt" :class="{ 'fa-spin': isLoading }"></i>
          Actualiser
        </button>
      </div>

      <!-- LOADING -->
      <div v-if="isLoading" class="py-20 text-center">
        <div class="w-12 h-12 border-4 border-[#E54801]/20 border-t-[#E54801] rounded-full animate-spin mx-auto mb-4">
        </div>
        <p class="text-gray-500 text-sm font-bold uppercase tracking-widest">
          Chargement...
        </p>
      </div>

      <template v-else>
        <!-- ── STATS ── -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-slide-up">
          <div class="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-orange-50 text-[#E54801] flex items-center justify-center">
              <i class="fas fa-building"></i>
            </div>
            <div>
              <p class="text-[10px] text-gray-400 uppercase font-black tracking-widest">
                Total biens
              </p>
              <p class="text-2xl font-black text-[#1B0B38]">
                {{ properties.length }}
              </p>
            </div>
          </div>
          <div class="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
              <i class="fas fa-check-circle"></i>
            </div>
            <div>
              <p class="text-[10px] text-gray-400 uppercase font-black tracking-widest">
                Disponibles
              </p>
              <p class="text-2xl font-black text-[#1B0B38]">
                {{properties.filter((p) => p.status === "active").length}}
              </p>
            </div>
          </div>
          <div class="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
              <i class="fas fa-lock"></i>
            </div>
            <div>
              <p class="text-[10px] text-gray-400 uppercase font-black tracking-widest">
                Loués/Vendus
              </p>
              <p class="text-2xl font-black text-[#1B0B38]">
                {{
                  properties.filter(
                    (p) => p.status === "rented" || p.status === "sold",
                  ).length
                }}
              </p>
            </div>
          </div>
          <div class="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <i class="fas fa-camera-retro"></i>
            </div>
            <div>
              <p class="text-[10px] text-gray-400 uppercase font-black tracking-widest">
                Audits en cours
              </p>
              <p class="text-2xl font-black text-[#1B0B38]">
                {{ auditMissions.length }}
              </p>
            </div>
          </div>
        </div>

        <!-- ── SECTION 1 : AUDITS EN COURS ── -->
        <div v-if="auditMissions.length > 0" class="mb-10 animate-fadeIn">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-black text-[#1B0B38] flex items-center gap-2">
              <span class="w-2 h-5 bg-purple-600 rounded-full inline-block"></span>
              Missions d'audit terrain en cours
            </h2>
            <router-link :to="{ name: 'AgentMissions' }"
              class="text-xs text-purple-600 font-bold hover:underline flex items-center gap-1">
              Voir toutes les missions <i class="fas fa-arrow-right"></i>
            </router-link>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <div v-for="m in auditMissions" :key="m.id"
              class="bg-white rounded-2xl border border-purple-100 shadow-sm overflow-hidden hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              <!-- Header violet -->
              <div class="bg-gradient-to-r from-purple-600 to-purple-500 p-4 text-white">
                <div class="flex items-start justify-between">
                  <div>
                    <p class="text-[10px] font-black uppercase tracking-widest opacity-75 mb-0.5">
                      Mission #{{ m.id }}
                    </p>
                    <h3 class="font-black text-sm leading-tight">
                      {{ m.title }}
                    </h3>
                  </div>
                  <span class="text-[10px] font-black bg-white/20 px-2 py-0.5 rounded-full whitespace-nowrap">
                    {{
                      m.status === "assigned"
                        ? "À visiter"
                        : m.status === "visited"
                          ? "Visité"
                          : m.status
                    }}
                  </span>
                </div>
              </div>

              <div class="p-4">
                <p class="text-xs text-gray-500 mb-3 flex items-center gap-1">
                  <i class="fas fa-user text-purple-400"></i>
                  Bailleur :
                  <strong class="text-gray-700 ml-1">{{
                    m.bailleur?.name || "—"
                  }}</strong>
                </p>
                <div class="grid grid-cols-2 gap-2 mb-3">
                  <div class="bg-gray-50 rounded-lg p-2">
                    <p class="text-[9px] uppercase text-gray-400 font-bold">
                      Ville
                    </p>
                    <p class="text-xs font-bold text-gray-800 truncate">
                      {{ m.city }}
                    </p>
                  </div>
                  <div class="bg-gray-50 rounded-lg p-2">
                    <p class="text-[9px] uppercase text-gray-400 font-bold">
                      Catégorie
                    </p>
                    <p class="text-xs font-bold text-gray-800 capitalize">
                      {{ m.category }}
                    </p>
                  </div>
                </div>
                <p v-if="m.price_estimate" class="text-xs font-bold text-purple-700 mb-3">
                  <i class="fas fa-tag mr-1"></i>
                  Prix estimé : {{ formatPrice(m.price_estimate) }} FCFA
                </p>
                <router-link :to="{ name: 'AgentPublierBien', params: { id: m.id } }"
                  class="w-full py-2 bg-purple-600 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-purple-700 transition-colors shadow-sm">
                  <i class="fas fa-eye"></i> Voir les détails &amp; Publier
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- ── SECTION 2 : BIENS GÉRÉS ── -->
        <div class="animate-fadeIn">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-black text-[#1B0B38] flex items-center gap-2">
              <span class="w-2 h-5 bg-[#E54801] rounded-full inline-block"></span>
              Biens publiés &amp; gérés
            </h2>

            <!-- Filtres onglets -->
            <div class="flex gap-1 bg-gray-100 rounded-xl p-1">
              <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :class="[
                'px-3 py-1.5 text-xs font-bold rounded-lg transition-colors',
                activeTab === tab.id
                  ? 'bg-white text-[#E54801] shadow-sm'
                  : 'text-gray-500 hover:text-gray-700',
              ]">
                {{ tab.label }}
              </button>
            </div>
          </div>

          <!-- Empty state -->
          <div v-if="filteredProperties.length === 0"
            class="py-16 text-center bg-white rounded-2xl border border-gray-100">
            <div
              class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3 text-gray-200 text-3xl">
              <i class="fas fa-building"></i>
            </div>
            <p class="text-gray-500 font-bold">
              Aucun bien trouvé dans cette catégorie.
            </p>
            <p class="text-xs text-gray-400 mt-1">
              Les biens apparaissent ici après publication d'un audit.
            </p>
          </div>

          <!-- Grille de biens -->
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            <div v-for="property in filteredProperties" :key="property.id"
              class="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <!-- Image -->
              <div class="relative h-44 bg-gray-100">
                <img :src="imgUrl(property)" :alt="property.title"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <!-- Badge statut -->
                <span :class="[
                  'absolute top-3 left-3 px-2.5 py-1 text-[10px] font-black rounded-full text-white shadow-sm uppercase tracking-wider',
                  property.status === 'active'
                    ? 'bg-green-500'
                    : property.status === 'rented'
                      ? 'bg-orange-500'
                      : property.status === 'sold'
                        ? 'bg-red-500'
                        : 'bg-gray-400',
                ]">
                  {{ statusLabel(property.status) }}
                </span>
                <!-- Badge type -->
                <span
                  class="absolute top-3 right-3 px-2 py-0.5 text-[10px] font-black bg-white/90 text-[#1B0B38] rounded-full shadow-sm">
                  {{ property.type === "rent" ? "Location" : "Vente" }}
                </span>
              </div>

              <!-- Contenu -->
              <div class="p-4">
                <div class="flex justify-between items-start mb-1">
                  <span class="text-[10px] font-black text-[#E54801] uppercase tracking-wider">{{ property.category
                  }}</span>
                  <span class="text-sm font-black text-[#1B0B38]">{{ formatPrice(property.price) }} F</span>
                </div>
                <h3 class="font-bold text-gray-900 mb-1 truncate text-sm">
                  {{ property.title }}
                </h3>
                <p class="text-xs text-gray-500 mb-3 flex items-center gap-1">
                  <i class="fas fa-map-marker-alt text-gray-400 text-[10px]"></i>
                  {{ property.city || "Cameroun" }}
                </p>

                <!-- Stats -->
                <div class="flex items-center gap-3 text-xs text-gray-400 border-t border-gray-50 pt-3">
                  <span class="flex items-center gap-1"><i class="fas fa-bed"></i>
                    {{ property.bedrooms ?? "—" }}</span>
                  <span class="flex items-center gap-1"><i class="fas fa-bath"></i>
                    {{ property.bathrooms ?? "—" }}</span>
                  <span class="flex items-center gap-1"><i class="fas fa-ruler-combined"></i>
                    {{ property.area ?? "—" }} m²</span>
                  <span class="ml-auto flex items-center gap-1 text-[#E54801]">
                    <i class="fas fa-eye text-[10px]"></i>
                    <span class="font-bold">{{
                      property.visits_count ?? 0
                    }}</span>
                  </span>
                </div>
              </div>

              <!-- Actions -->
              <div class="px-4 pb-4 flex gap-2">
                <router-link :to="{ name: 'DetailAnnonce', params: { slug: property.slug } }"
                  class="flex-1 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-bold rounded-lg transition-colors border border-gray-200 text-center">
                  <i class="fas fa-external-link-alt mr-1"></i> Voir l'annonce
                </router-link>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div v-if="pagination.last_page > 1" class="mt-6 flex justify-center gap-2">
            <button v-for="page in pagination.last_page" :key="page" @click="fetchProperties(page)" :class="[
              'w-9 h-9 rounded-full text-sm font-bold transition-colors',
              page === pagination.current_page
                ? 'bg-[#E54801] text-white shadow-md'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-[#E54801] hover:text-[#E54801]',
            ]">
              {{ page }}
            </button>
          </div>
        </div>
      </template>
    </div>


  </DashboardLayout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import DashboardLayout from "../../layouts/DashboardLayout.vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { usePropertyStore } from "../../stores/properties";
import axios from "../../axios";

const router = useRouter();
const propertyStore = usePropertyStore();

const activeTab = ref("all");
const { agentProperties: properties, agentPagination: pagination, isLoading } = storeToRefs(propertyStore);
const auditMissions = ref([]);

const tabs = [
  { id: "all", label: "Tous" },
  { id: "rent", label: "Location" },
  { id: "sale", label: "Vente" },
  { id: "active", label: "Disponibles" },
  { id: "rented", label: "Loués/Vendus" },
];

// ── Helpers ──
const formatPrice = (p) => new Intl.NumberFormat("fr-CM").format(p || 0);

const statusLabel = (s) => {
  const map = {
    active: "Disponible",
    rented: "Loué",
    sold: "Vendu",
    inactive: "Inactif",
  };
  return map[s] ?? s;
};

const imgUrl = (p) => {
  const path = p.primary_image?.path || p.image;
  if (!path) return "/images/placeholder-property.jpg";
  if (path.startsWith("http")) return path;
  return path.startsWith("/") ? path : `/storage/${path}`;
};

// ── Fetch ──
const fetchAuditMissions = async () => {
  try {
    const { data } = await axios.get("/api/agent/missions");
    if (data.success) {
      auditMissions.value = data.data.publication_missions || [];
    }
  } catch (err) {
    console.error("Erreur missions audit:", err);
  }
};

const fetchAll = async () => {
  await Promise.all([propertyStore.fetchAgentProperties(), fetchAuditMissions()]);
};

onMounted(fetchAll);

// ── Filtres ──
const filteredProperties = computed(() => {
  if (activeTab.value === "all") return properties.value;
  if (activeTab.value === "rent")
    return properties.value.filter((p) => p.type === "rent");
  if (activeTab.value === "sale")
    return properties.value.filter((p) => p.type === "sale");
  if (activeTab.value === "active")
    return properties.value.filter((p) => p.status === "active");
  if (activeTab.value === "rented")
    return properties.value.filter(
      (p) => p.status === "rented" || p.status === "sold",
    );
  return properties.value;
});
</script>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.4s ease-out backwards;
}

.animate-slide-up {
  animation: slideUp 0.4s ease-out backwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    transform: translateY(16px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
