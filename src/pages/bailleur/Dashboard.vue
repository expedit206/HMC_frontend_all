<template>
  <DashboardLayout title="Tableau de Bord Bailleur">
    <div class="max-w-6xl mx-auto">
      <!-- ═══ SKELETON ════════════════════════════════════════ -->
      <div v-if="isLoading">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div
            v-for="i in 4"
            :key="i"
            class="bg-white rounded-2xl p-6 border border-gray-100 sk h-32 shadow-sm"
          ></div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2 sk rounded-3xl h-72 shadow-sm"></div>
          <div class="sk rounded-3xl h-72 shadow-sm"></div>
        </div>
      </div>

        <!-- ═══ DONNÉES ══════════════════════════════════════════ -->
        <div v-else>
          <!-- Stats Cards -->
          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <!-- Revenus -->
            <div
              class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-[#E54801]/30 transition-all group"
            >
              <div class="flex justify-between items-start mb-4">
                <div
                  class="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-[#E54801]"
                >
                  <i class="fas fa-wallet text-xl"></i>
                </div>
                <span
                  class="px-2 py-1 rounded-lg bg-green-50 text-green-600 text-[10px] font-bold"
                  >Actif</span
                >
              </div>
              <p class="text-sm font-medium text-gray-500">Revenus Mensuels</p>
              <h3 class="text-xl font-bold text-gray-900 mt-1">
                {{ formatPrice(stats.monthly_revenue) }}
                <span class="text-xs font-normal text-gray-400 ml-1">FCFA</span>
              </h3>
            </div>

            <!-- Taux d'occupation -->
            <div
              class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-[#E54801]/30 transition-all"
            >
              <div class="flex justify-between items-start mb-4">
                <div
                  class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600"
                >
                  <i class="fas fa-home text-xl"></i>
                </div>
                <span
                  class="px-2 py-1 rounded-lg bg-blue-50 text-blue-600 text-[10px] font-bold"
                  >{{ stats.occupancy_rate }}%</span
                >
              </div>
              <p class="text-sm font-medium text-gray-500">Taux d'occupation</p>
              <h3 class="text-2xl font-bold text-gray-900 mt-1">
                {{ stats.occupied_count }}/{{ stats.total_properties }}
              </h3>
              <div
                class="w-full h-1.5 bg-gray-100 rounded-full mt-3 overflow-hidden"
              >
                <div
                  class="h-full bg-blue-500 rounded-full transition-all duration-700"
                  :style="{ width: stats.occupancy_rate + '%' }"
                ></div>
              </div>
            </div>

            <!-- Loyers impayés -->
            <div
              class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-red-200 transition-all"
            >
              <div class="flex justify-between items-start mb-4">
                <div
                  class="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-500"
                >
                  <i class="fas fa-user-clock text-xl"></i>
                </div>
                <span
                  v-if="stats.unpaid_count > 0"
                  class="px-2 py-1 rounded-lg bg-red-50 text-red-600 text-[10px] font-bold"
                >
                  {{ stats.unpaid_count }} retard{{
                    stats.unpaid_count > 1 ? "s" : ""
                  }}
                </span>
                <span
                  v-else
                  class="px-2 py-1 rounded-lg bg-green-50 text-green-600 text-[10px] font-bold"
                  >OK</span
                >
              </div>
              <p class="text-sm font-medium text-gray-500">Loyers Impayés</p>
              <h3 class="text-xl font-bold text-gray-900 mt-1">
                {{
                  stats.unpaid_count > 0
                    ? formatPrice(stats.unpaid_amount)
                    : "—"
                }}
                <span
                  v-if="stats.unpaid_count > 0"
                  class="text-xs font-normal text-gray-400 ml-1"
                  >FCFA</span
                >
              </h3>
            </div>

            <!-- Interventions -->
            <div
              class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-purple-200 transition-all"
            >
              <div class="flex justify-between items-start mb-4">
                <div
                  class="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600"
                >
                  <i class="fas fa-tools text-xl"></i>
                </div>
                <span
                  v-if="stats.interventions > 0"
                  class="px-2 py-1 rounded-lg bg-purple-50 text-purple-600 text-[10px] font-bold"
                >
                  {{ stats.interventions }} active{{
                    stats.interventions > 1 ? "s" : ""
                  }}
                </span>
              </div>
              <p class="text-sm font-medium text-gray-500">Interventions</p>
              <h3 class="text-2xl font-bold text-gray-900 mt-1">
                {{ stats.interventions }}
              </h3>
            </div>
          </div>

          <!-- Grille principale -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- ── Liste biens ── -->
            <div class="lg:col-span-2">
              <div
                class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <div
                  class="p-6 border-b border-gray-50 flex justify-between items-center"
                >
                  <div>
                    <h2 class="text-lg font-bold text-gray-900">Mes Biens</h2>
                    <p class="text-sm text-gray-500 mt-0.5">
                      {{ stats.occupied_count }} occupé{{
                        stats.occupied_count > 1 ? "s" : ""
                      }}
                      · {{ stats.available_count }} disponible{{
                        stats.available_count > 1 ? "s" : ""
                      }}
                    </p>
                  </div>
                  <RouterLink
                    to="/bailleur/mes-biens"
                    class="text-sm font-semibold text-[#E54801] hover:underline flex items-center gap-2"
                  >
                    Voir tout <i class="fas fa-arrow-right text-xs"></i>
                  </RouterLink>
                </div>

                <!-- Liste vide -->
                <div
                  v-if="!featuredProperties.length"
                  class="p-12 text-center text-gray-400"
                >
                  <i class="fas fa-building text-4xl mb-4 opacity-30"></i>
                  <p class="font-medium">Aucun bien publié pour l'instant</p>
                  <RouterLink
                    :to="{ name: 'BailleurPublierBien' }"
                    class="mt-4 inline-flex items-center gap-2 text-sm text-[#E54801] font-bold hover:underline"
                  >
                    <i class="fas fa-plus"></i> Publier mon premier bien
                  </RouterLink>
                </div>

                <div v-else class="divide-y divide-gray-50">
                  <div
                    v-for="p in featuredProperties"
                    :key="p.id"
                    class="p-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors group"
                  >
                    <div class="flex items-center gap-4">
                      <div class="relative shrink-0">
                        <img
                          :src="p.image"
                          :alt="p.title"
                          class="w-14 h-14 rounded-xl object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div
                          :class="[
                            'absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center',
                            p.status === 'occupied'
                              ? 'bg-green-500'
                              : 'bg-blue-500',
                          ]"
                        >
                          <i
                            :class="[
                              'text-white text-[8px] fas',
                              p.status === 'occupied' ? 'fa-check' : 'fa-bolt',
                            ]"
                          ></i>
                        </div>
                      </div>
                      <div>
                        <h4
                          class="text-sm font-bold text-gray-900 group-hover:text-[#E54801] transition-colors line-clamp-1"
                        >
                          {{ p.title }}
                        </h4>
                        <p
                          class="text-xs text-gray-400 mt-0.5 flex items-center gap-1"
                        >
                          <i class="fas fa-map-marker-alt"></i> {{ p.location }}
                        </p>
                        <p v-if="p.tenant" class="text-xs text-gray-500 mt-0.5">
                          <i class="fas fa-user mr-1"></i> {{ p.tenant }}
                        </p>
                      </div>
                    </div>
                    <div class="text-right shrink-0">
                      <p class="text-sm font-bold text-gray-900">
                        {{ formatPrice(p.price) }}
                        <span class="text-[10px] text-gray-400">FCFA/m</span>
                      </p>
                      <span
                        :class="[
                          'inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase',
                          p.status === 'occupied'
                            ? p.payment_status === 'unpaid'
                              ? 'bg-red-50 text-red-600'
                              : 'bg-green-50 text-green-600'
                            : 'bg-blue-50 text-blue-600',
                        ]"
                      >
                        {{
                          p.status === "occupied"
                            ? p.payment_status === "unpaid"
                              ? "Impayé"
                              : "Occupé"
                            : "Disponible"
                        }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Actions bas -->
                <div class="p-4 bg-gray-50 border-t border-gray-100">
                  <RouterLink
                    :to="{ name: 'BailleurPublierBien' }"
                    class="w-full py-2.5 bg-[#E54801] text-white text-sm font-bold rounded-xl hover:bg-[#c43d01] transition text-center flex items-center justify-center gap-2"
                  >
                    <i class="fas fa-plus"></i> Ajouter un bien
                  </RouterLink>
                </div>
              </div>
            </div>

            <!-- ── Colonne notifications ── -->
            <div class="space-y-6">
              <!-- Stats rapides -->
              <div
                class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
              >
                <h3
                  class="text-xs font-black text-[#1B0B38] uppercase tracking-widest mb-4"
                >
                  Résumé rapide
                </h3>
                <div class="space-y-3">
                  <div
                    class="flex items-center justify-between py-2 border-b border-gray-50"
                  >
                    <span class="text-sm text-gray-600 flex items-center gap-2"
                      ><i class="fas fa-building text-[#E54801] w-4"></i> Total
                      biens</span
                    >
                    <span class="font-bold text-[#1B0B38]">{{
                      stats.total_properties
                    }}</span>
                  </div>
                  <div
                    class="flex items-center justify-between py-2 border-b border-gray-50"
                  >
                    <span class="text-sm text-gray-600 flex items-center gap-2"
                      ><i class="fas fa-key text-green-500 w-4"></i>
                      Occupés</span
                    >
                    <span class="font-bold text-green-600">{{
                      stats.occupied_count
                    }}</span>
                  </div>
                  <div
                    class="flex items-center justify-between py-2 border-b border-gray-50"
                  >
                    <span class="text-sm text-gray-600 flex items-center gap-2"
                      ><i class="fas fa-circle-dot text-blue-500 w-4"></i>
                      Disponibles</span
                    >
                    <span class="font-bold text-blue-600">{{
                      stats.available_count
                    }}</span>
                  </div>
                  <div
                    v-if="stats.unpaid_count > 0"
                    class="flex items-center justify-between py-2"
                  >
                    <span class="text-sm text-gray-600 flex items-center gap-2"
                      ><i
                        class="fas fa-exclamation-triangle text-red-500 w-4"
                      ></i>
                      Impayés</span
                    >
                    <span class="font-bold text-red-600">{{
                      stats.unpaid_count
                    }}</span>
                  </div>
                </div>
              </div>

              <!-- CTA Publier -->
              <div
                class="bg-gradient-to-br from-[#1B0B38] to-[#2d1463] rounded-2xl p-6 text-white overflow-hidden relative"
              >
                <div class="relative z-10">
                  <span
                    class="text-[10px] font-black uppercase tracking-widest text-[#E54801] mb-2 block"
                    >Boostez vos revenus</span
                  >
                  <h3 class="text-lg font-bold mb-3">
                    Vous avez un bien disponible ?
                  </h3>
                  <p class="text-xs text-gray-300 mb-5 leading-relaxed">
                    Publiez-le maintenant et trouvez un locataire en quelques
                    jours.
                  </p>
                  <RouterLink
                    :to="{ name: 'BailleurPublierBien' }"
                    class="inline-flex items-center gap-2 px-4 py-2.5 bg-[#E54801] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg"
                  >
                    <i class="fas fa-plus"></i> Publier maintenant
                  </RouterLink>
                </div>
                <i
                  class="fas fa-home absolute -right-4 -bottom-4 text-8xl text-white/5"
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import axios from "../../axios";
import DashboardLayout from "../../layouts/DashboardLayout.vue";

const router = useRouter();
const authStore = useAuthStore();

const isLoading = ref(true);
const stats = ref({
  monthly_revenue: 0,
  total_properties: 0,
  occupied_count: 0,
  available_count: 0,
  occupancy_rate: 0,
  unpaid_count: 0,
  unpaid_amount: 0,
  interventions: 0,
});
const featuredProperties = ref([]);

// ── Infos utilisateur ────────────────────────────────────────────
const firstName = computed(() => {
  const name = authStore.user?.name ?? "";
  return name.split(" ")[0] || "Bailleur";
});

// ── Date lisible ──────────────────────────────────────────────────
const today = computed(() => {
  return new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

// ── Fetch dashboard ───────────────────────────────────────────────
const fetchDashboard = async () => {
  isLoading.value = true;
  try {
    const { data } = await axios.get("/api/bailleur/dashboard");
    if (data.success) {
      stats.value = data.data.stats;
      featuredProperties.value = data.data.properties;
    }
  } catch (err) {
    console.error("Erreur dashboard bailleur:", err);
    // Si 401 → rediriger vers connexion
    if (err.response?.status === 401) router.push("/auth/connexion");
  } finally {
    isLoading.value = false;
  }
};

const formatPrice = (v) => new Intl.NumberFormat("fr-FR").format(v || 0);

onMounted(() => fetchDashboard());
</script>

<style scoped>
.sidebar-link.active {
  background-color: #e54801;
  color: white;
  box-shadow: 0 4px 12px rgba(229, 72, 1, 0.2);
}
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e54801;
  border-radius: 10px;
}

/* Skeleton shimmer */
.sk {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.6s ease-in-out infinite;
}
@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
