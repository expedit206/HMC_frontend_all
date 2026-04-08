<template>
  <DashboardLayout>
    <div class="max-w-7xl mx-auto">
      <!-- HEADER -->
      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 animate-fadeIn"
      >
        <div>
          <h1 class="text-2xl font-bold text-foreground">
            Mes Biens Immobiliers
          </h1>
          <p class="text-muted-foreground text-sm mt-1">
            Tous les biens que vous gérez et vos audits en cours
          </p>
        </div>
        <button
          @click="fetchAll"
          class="px-4 py-2 bg-card border border-border text-muted-foreground rounded-lg hover:text-secondary transition-colors text-sm font-bold flex items-center gap-2"
        >
          <i class="fas fa-sync-alt" :class="{ 'fa-spin': isLoading }"></i>
          Actualiser
        </button>
      </div>

      <!-- LOADING -->
      <div v-if="isLoading" class="py-20 text-center">
        <div
          class="w-12 h-12 border-4 border-secondary/20 border-t-secondary rounded-full animate-spin mx-auto mb-4"
        ></div>
        <p class="text-muted-foreground text-sm font-bold uppercase tracking-widest">
          Chargement...
        </p>
      </div>

      <template v-else>
        <!-- ── STATS ── -->
        <div
          class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-slide-up"
        >
          <div
            class="bg-card p-4 rounded-2xl border border-border shadow-sm flex items-center gap-3"
          >
            <div
              class="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center"
            >
              <i class="fas fa-building"></i>
            </div>
            <div>
              <p
                class="text-[10px] text-muted-foreground uppercase font-black tracking-widest"
              >
                Total biens
              </p>
              <p class="text-2xl font-black text-foreground">
                {{ properties.length }}
              </p>
            </div>
          </div>
          <div
            class="bg-card p-4 rounded-2xl border border-border shadow-sm flex items-center gap-3"
          >
            <div
              class="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 flex items-center justify-center"
            >
              <i class="fas fa-check-circle"></i>
            </div>
            <div>
              <p
                class="text-[10px] text-muted-foreground uppercase font-black tracking-widest"
              >
                Disponibles
              </p>
              <p class="text-2xl font-black text-foreground">
                {{ properties.filter((p) => p.status === "active").length }}
              </p>
            </div>
          </div>
          <div
            class="bg-card p-4 rounded-2xl border border-border shadow-sm flex items-center gap-3"
          >
            <div
              class="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/30 text-red-500 dark:text-red-400 flex items-center justify-center"
            >
              <i class="fas fa-lock"></i>
            </div>
            <div>
              <p
                class="text-[10px] text-muted-foreground uppercase font-black tracking-widest"
              >
                Loués/Vendus
              </p>
              <p class="text-2xl font-black text-foreground">
                {{
                  properties.filter(
                    (p) => p.status === "rented" || p.status === "sold",
                  ).length
                }}
              </p>
            </div>
          </div>
          <div
            class="bg-card p-4 rounded-2xl border border-border shadow-sm flex items-center gap-3"
          >
            <div
              class="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 flex items-center justify-center"
            >
              <i class="fas fa-camera-retro"></i>
            </div>
            <div>
              <p
                class="text-[10px] text-muted-foreground uppercase font-black tracking-widest"
              >
                Audits en cours
              </p>
              <p class="text-2xl font-black text-foreground">
                {{ auditMissions.length }}
              </p>
            </div>
          </div>
        </div>

        <!-- ── SECTION 1 : AUDITS EN COURS ── -->
        <div v-if="auditMissions.length > 0" class="mb-10 animate-fadeIn">
          <div class="flex items-center justify-between mb-4">
            <h2
              class="text-lg font-black text-foreground flex items-center gap-2"
            >
              <span
                class="w-2 h-5 bg-purple-600 rounded-full inline-block"
              ></span>
              Missions d'audit terrain en cours
            </h2>
            <router-link
              :to="{ name: 'AgentMissions' }"
              class="text-xs text-purple-600 dark:text-purple-400 font-bold hover:underline flex items-center gap-1"
            >
              Voir toutes les missions <i class="fas fa-arrow-right"></i>
            </router-link>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <div
              v-for="m in auditMissions"
              :key="m.id"
              class="bg-card rounded-2xl border border-purple-200 dark:border-purple-800 shadow-sm overflow-hidden hover:-translate-y-1 hover:shadow-md transition-all duration-300"
            >
              <!-- Header violet -->
              <div
                class="bg-gradient-to-r from-purple-600 to-purple-500 p-4 text-white"
              >
                <div class="flex items-start justify-between">
                  <div>
                    <p
                      class="text-[10px] font-black uppercase tracking-widest opacity-75 mb-0.5"
                    >
                      Mission #{{ m.id }}
                    </p>
                    <h3 class="font-black text-sm leading-tight">
                      {{ m.title }}
                    </h3>
                  </div>
<<<<<<< HEAD
                  <span
                    class="text-[10px] font-black bg-white/20 px-2 py-0.5 rounded-full whitespace-nowrap"
                  >
=======
                  <span class="text-[10px] font-black bg-white/20 px-2 py-0.5 rounded-full whitespace-nowrap">
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
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
                <p class="text-xs text-muted-foreground mb-3 flex items-center gap-1">
                  <i class="fas fa-user text-purple-400"></i>
                  Bailleur :
                  <strong class="text-foreground ml-1">{{
                    m.bailleur?.name || "—"
                  }}</strong>
                </p>
                <div class="grid grid-cols-2 gap-2 mb-3">
                  <div class="bg-muted/20 rounded-lg p-2">
                    <p class="text-[9px] uppercase text-muted-foreground font-bold">
                      Ville
                    </p>
                    <p class="text-xs font-bold text-foreground truncate">
                      {{ m.city }}
                    </p>
                  </div>
                  <div class="bg-muted/20 rounded-lg p-2">
                    <p class="text-[9px] uppercase text-muted-foreground font-bold">
                      Catégorie
                    </p>
                    <p class="text-xs font-bold text-foreground capitalize">
                      {{ m.category }}
                    </p>
                  </div>
                </div>
<<<<<<< HEAD
                <p
                  v-if="m.price_estimate"
                  class="text-xs font-bold text-purple-700 dark:text-purple-400 mb-3"
                >
                  <i class="fas fa-tag mr-1"></i>
                  Prix estimé : {{ formatPrice(m.price_estimate) }} FCFA
                </p>
                <router-link
                  :to="{ name: 'AgentPublierBien', params: { id: m.id } }"
                  class="w-full py-2 bg-purple-600 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-purple-700 transition-colors shadow-sm"
                >
=======
                <p v-if="m.price_estimate" class="text-xs font-bold text-purple-700 dark:text-purple-400 mb-3">
                  <i class="fas fa-tag mr-1"></i>
                  Prix estimé : {{ formatPrice(m.price_estimate) }} FCFA
                </p>
                <router-link :to="{ name: 'AgentPublierBien', params: { id: m.id } }"
                  class="w-full py-2 bg-purple-600 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-purple-700 transition-colors shadow-sm">
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
                  <i class="fas fa-eye"></i> Voir les détails &amp; Publier
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- ── SECTION 2 : BIENS GÉRÉS ── -->
        <div class="animate-fadeIn">
          <div class="flex items-center justify-between mb-4">
            <h2
              class="text-lg font-black text-foreground flex items-center gap-2"
            >
              <span
                class="w-2 h-5 bg-secondary rounded-full inline-block"
              ></span>
              Biens publiés &amp; gérés
            </h2>

            <!-- Filtres onglets -->
            <div class="flex gap-1 bg-muted/20 rounded-xl p-1">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                :class="[
                  'px-3 py-1.5 text-xs font-bold rounded-lg transition-colors',
                  activeTab === tab.id
                    ? 'bg-card text-secondary shadow-sm'
                    : 'text-muted-foreground hover:text-foreground',
                ]"
              >
                {{ tab.label }}
              </button>
            </div>
          </div>

          <!-- Empty state -->
          <div
            v-if="filteredProperties.length === 0"
            class="py-16 text-center bg-card rounded-2xl border border-border"
          >
            <div
              class="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-3 text-muted-foreground/30 text-3xl"
            >
              <i class="fas fa-building"></i>
            </div>
            <p class="text-muted-foreground font-bold">
              Aucun bien trouvé dans cette catégorie.
            </p>
            <p class="text-xs text-muted-foreground/70 mt-1">
              Les biens apparaissent ici après publication d'un audit.
            </p>
          </div>

          <!-- Grille de biens -->
          <div
            v-else
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            <div
              v-for="property in filteredProperties"
              :key="property.id"
              class="group bg-card rounded-2xl shadow-sm border border-border overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              <!-- Image -->
              <div class="relative h-44 bg-muted/20">
                <img
<<<<<<< HEAD
                  :src="property.imageUrl"
=======
                  :src="imgUrl(property)"
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
                  :alt="property.title"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <!-- Badge statut -->
                <span
                  :class="[
                    'absolute top-3 left-3 px-2.5 py-1 text-[10px] font-black rounded-full text-white shadow-sm uppercase tracking-wider',
                    property.status === 'active'
                      ? 'bg-green-500'
                      : property.status === 'rented'
                        ? 'bg-orange-500'
                        : property.status === 'sold'
                          ? 'bg-red-500'
                          : 'bg-gray-400',
                  ]"
                >
                  {{ statusLabel(property.status) }}
                </span>
                <!-- Badge type -->
                <span
                  class="absolute top-3 right-3 px-2 py-0.5 text-[10px] font-black bg-background/90 text-foreground rounded-full shadow-sm backdrop-blur-sm"
                >
                  {{ property.type === "rent" ? "Location" : "Vente" }}
                </span>
              </div>

              <!-- Contenu -->
              <div class="p-4">
                <div class="flex justify-between items-start mb-1">
                  <span
                    class="text-[10px] font-black text-secondary uppercase tracking-wider"
                    >{{ property.category }}</span
                  >
                  <span class="text-sm font-black text-foreground"
                    >{{ formatPrice(property.price) }} F</span
                  >
                </div>
                <h3 class="font-bold text-foreground mb-1 truncate text-sm">
                  {{ property.title }}
                </h3>
                <p class="text-xs text-muted-foreground mb-3 flex items-center gap-1">
                  <i
                    class="fas fa-map-marker-alt text-muted-foreground text-[10px]"
                  ></i>
                  {{ property.city || "Cameroun" }}
                </p>

                <!-- Stats -->
                <div
                  class="flex items-center gap-3 text-xs text-muted-foreground border-t border-border pt-3"
                >
                  <span class="flex items-center gap-1"
                    ><i class="fas fa-bed"></i>
                    {{ property.bedrooms ?? "—" }}</span
                  >
                  <span class="flex items-center gap-1"
                    ><i class="fas fa-bath"></i>
                    {{ property.bathrooms ?? "—" }}</span
                  >
                  <span class="flex items-center gap-1"
                    ><i class="fas fa-ruler-combined"></i>
                    {{ property.area ?? "—" }} m²</span
                  >
                  <span
                    class="ml-auto flex items-center gap-1 text-secondary"
                  >
                    <i class="fas fa-eye text-[10px]"></i>
                    <span class="font-bold">{{
                      property.visits_count ?? 0
                    }}</span>
                  </span>
                </div>
              </div>

              <!-- Actions -->
              <div class="px-4 pb-4 flex gap-2">
                <router-link
<<<<<<< HEAD
                  :to="{ name: 'DetailAnnonce', params: { id: property.id } }"
=======
                  :to="{ name: 'DetailAnnonce', params: { slug: property.slug } }"
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
                  class="flex-1 py-2 bg-muted/20 hover:bg-muted/30 text-foreground text-xs font-bold rounded-lg transition-colors border border-border text-center"
                >
                  <i class="fas fa-external-link-alt mr-1"></i> Voir l'annonce
                </router-link>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div
            v-if="pagination.last_page > 1"
            class="mt-6 flex justify-center gap-2"
          >
            <button
              v-for="page in pagination.last_page"
              :key="page"
              @click="fetchProperties(page)"
              :class="[
                'w-9 h-9 rounded-full text-sm font-bold transition-colors',
                page === pagination.current_page
                  ? 'bg-secondary text-secondary-foreground shadow-md'
                  : 'bg-card border border-border text-muted-foreground hover:border-secondary hover:text-secondary',
              ]"
            >
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
import axios from "../../axios";

const router = useRouter();
<<<<<<< HEAD
const activeTab = ref("all");
const isLoading = ref(true);
=======
const propertyStore = usePropertyStore();

const activeTab = ref("all");
const { 
  agentProperties: properties, 
  agentPagination: pagination, 
  isLoading 
} = storeToRefs(propertyStore);
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9

const properties = ref([]);
const auditMissions = ref([]);
const pagination = ref({ current_page: 1, last_page: 1 });

const tabs = [
  { id: "all", label: "Tous" },
  { id: "rent", label: "Location" },
  { id: "sale", label: "Vente" },
  { id: "active", label: "Disponibles" },
  { id: "rented", label: "Loués/Vendus" },
];

// ── Helpers ──
const formatPrice = (p) => new Intl.NumberFormat("fr-FR").format(p || 0);

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
  const path = p.primary_image?.path;
  if (!path) return "/images/placeholder-property.jpg";
  return path.startsWith("http") ? path : `/storage/${path}`;
};

// ── Fetch ──
const fetchProperties = async (page = 1) => {
  try {
    const { data } = await axios.get("/api/agent/properties", {
      params: { page },
    });
    if (data.success) {
      properties.value = (data.data.data || data.data).map((p) => ({
        ...p,
        imageUrl: imgUrl(p),
      }));
      if (data.data.current_page) {
        pagination.value = {
          current_page: data.data.current_page,
          last_page: data.data.last_page,
        };
      }
    }
  } catch (err) {
    console.error("Erreur biens agent:", err);
  }
};

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
  isLoading.value = true;
  await Promise.all([fetchProperties(), fetchAuditMissions()]);
  isLoading.value = false;
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
<<<<<<< HEAD
</style>
=======
</style>
>>>>>>> d36e67ac284d7690af04291207f0a131e32f13c9
