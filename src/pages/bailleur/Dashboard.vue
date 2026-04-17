<template>
  <div class="dashboard-page-content">
    <div class="max-w-6xl mx-auto">
      <!-- Role Switcher -->
      <DashboardRoleSwitcher />
      <!-- ═══ SKELETON ════════════════════════════════════════ -->
      <div v-if="isLoading">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div
            v-for="i in 4"
            :key="i"
            class="bg-card rounded-2xl p-6 border border-border sk h-32 shadow-sm"
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
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <!-- Revenus -->
          <div
            class="bg-card rounded-2xl p-6 shadow-sm border border-border hover:border-secondary/30 transition-all group"
          >
            <div class="flex justify-between items-start mb-4">
              <div
                class="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary"
              >
                <i class="fas fa-wallet text-xl"></i>
              </div>
              <span
                class="px-2 py-1 rounded-lg bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 text-[10px] font-bold"
                >Actif</span
              >
            </div>
            <p class="text-sm font-medium text-muted-foreground">Revenus Mensuels</p>
            <h3 class="text-xl font-bold text-foreground mt-1">
              {{ formatPrice(stats.monthly_revenue) }}
              <span class="text-xs font-normal text-muted-foreground ml-1">FCFA</span>
            </h3>
          </div>

          <!-- Taux d'occupation -->
          <div
            class="bg-card rounded-2xl p-6 shadow-sm border border-border hover:border-secondary/30 transition-all"
          >
            <div class="flex justify-between items-start mb-4">
              <div
                class="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center text-blue-600 dark:text-blue-400"
              >
                <i class="fas fa-home text-xl"></i>
              </div>
              <span
                class="px-2 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 text-[10px] font-bold"
                >{{ stats.occupancy_rate }}%</span
              >
            </div>
            <p class="text-sm font-medium text-muted-foreground">Taux d'occupation</p>
            <h3 class="text-2xl font-bold text-foreground mt-1">
              {{ stats.occupied_count }}/{{ stats.total_properties }}
            </h3>
            <div class="w-full h-1.5 bg-muted rounded-full mt-3 overflow-hidden">
              <div
                class="h-full bg-blue-500 rounded-full transition-all duration-700"
                :style="{ width: stats.occupancy_rate + '%' }"
              ></div>
            </div>
          </div>

          <!-- Loyers impayés -->
          <div
            class="bg-card rounded-2xl p-6 shadow-sm border border-border hover:border-destructive/30 transition-all"
          >
            <div class="flex justify-between items-start mb-4">
              <div
                class="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center text-destructive"
              >
                <i class="fas fa-user-clock text-xl"></i>
              </div>
              <span
                v-if="stats.unpaid_count > 0"
                class="px-2 py-1 rounded-lg bg-destructive/10 text-destructive text-[10px] font-bold"
              >
                {{ stats.unpaid_count }} retard{{
                  stats.unpaid_count > 1 ? "s" : ""
                }}
              </span>
              <span
                v-else
                class="px-2 py-1 rounded-lg bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 text-[10px] font-bold"
                >OK</span
              >
            </div>
            <p class="text-sm font-medium text-muted-foreground">Loyers Impayés</p>
            <h3 class="text-xl font-bold text-foreground mt-1">
              {{
                stats.unpaid_count > 0
                  ? formatPrice(stats.unpaid_amount)
                  : "—"
              }}
              <span
                v-if="stats.unpaid_count > 0"
                class="text-xs font-normal text-muted-foreground ml-1"
                >FCFA</span>
            </h3>
          </div>

          <!-- Interventions -->
          <div
            class="bg-card rounded-2xl p-6 shadow-sm border border-border hover:border-purple-200 dark:hover:border-purple-800 transition-all"
          >
            <div class="flex justify-between items-start mb-4">
              <div
                class="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/30 flex items-center justify-center text-purple-600 dark:text-purple-400"
              >
                <i class="fas fa-tools text-xl"></i>
              </div>
              <span
                v-if="stats.interventions > 0"
                class="px-2 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 text-[10px] font-bold"
              >
                {{ stats.interventions }} active{{
                  stats.interventions > 1 ? "s" : ""
                }}
              </span>
            </div>
            <p class="text-sm font-medium text-muted-foreground">Interventions</p>
            <h3 class="text-2xl font-bold text-foreground mt-1">
              {{ stats.interventions }}
            </h3>
          </div>
        </div>

        <!-- Grille principale -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- ── Liste biens ── -->
          <div class="lg:col-span-2">
            <div
              class="bg-card rounded-2xl shadow-sm border border-border overflow-hidden"
            >
              <div
                class="p-6 border-b border-border flex justify-between items-center"
              >
                <div>
                  <h2 class="text-lg font-bold text-foreground">Mes Biens</h2>
                  <p class="text-sm text-muted-foreground mt-0.5">
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
                  class="text-sm font-semibold text-secondary hover:underline flex items-center gap-2"
                >
                  Voir tout <i class="fas fa-arrow-right text-xs"></i>
                </RouterLink>
              </div>

              <!-- Liste vide -->
              <div
                v-if="!featuredProperties.length"
                class="p-12 text-center text-muted-foreground"
              >
                <i class="fas fa-building text-4xl mb-4 opacity-30"></i>
                <p class="font-medium">Aucun bien publié pour l'instant</p>
                <RouterLink
                  :to="{ name: 'PublierBien' }"
                  class="mt-4 inline-flex items-center gap-2 text-sm text-secondary font-bold hover:underline"
                >
                  <i class="fas fa-plus"></i> Publier mon premier bien
                </RouterLink>
              </div>

              <div v-else class="divide-y divide-border">
                <div
                  v-for="p in featuredProperties"
                  :key="p.id"
                  class="p-4 flex items-center justify-between hover:bg-muted/5 transition-colors group"
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
                        class="text-sm font-bold text-foreground group-hover:text-secondary transition-colors line-clamp-1"
                      >
                        {{ p.title }}
                      </h4>
                      <p
                        class="text-xs text-muted-foreground mt-0.5 flex items-center gap-1"
                      >
                        <i class="fas fa-map-marker-alt"></i> {{ p.location }}
                      </p>
                      <p v-if="p.tenant" class="text-xs text-muted-foreground mt-0.5">
                        <i class="fas fa-user mr-1"></i> {{ p.tenant }}
                      </p>
                    </div>
                  </div>
                  <div class="text-right shrink-0">
                    <p class="text-sm font-bold text-foreground">
                      {{ formatPrice(p.price) }}
                      <span class="text-[10px] text-muted-foreground">FCFA/m</span>
                    </p>
                    <span
                      :class="[
                        'inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase',
                        p.status === 'occupied'
                          ? p.payment_status === 'unpaid'
                            ? 'bg-destructive/10 text-destructive'
                            : 'bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400'
                          : 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400',
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
              <div class="p-4 bg-muted/20 border-t border-border">
                <RouterLink
                  :to="{ name: 'PublierBien' }"
                  class="w-full py-2.5 bg-secondary text-secondary-foreground text-sm font-bold rounded-xl hover:bg-secondary/90 transition text-center flex items-center justify-center gap-2"
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
              class="bg-card rounded-2xl p-5 shadow-sm border border-border"
            >
              <h3
                class="text-xs font-black text-foreground uppercase tracking-widest mb-4"
              >
                Résumé rapide
              </h3>
              <div class="space-y-3">
                <div
                  class="flex items-center justify-between py-2 border-b border-border"
                >
                  <span class="text-sm text-muted-foreground flex items-center gap-2"
                    ><i class="fas fa-building text-secondary w-4"></i> Total
                    biens</span
                  >
                  <span class="font-bold text-foreground">{{
                    stats.total_properties
                  }}</span>
                </div>
                <div
                  class="flex items-center justify-between py-2 border-b border-border"
                >
                  <span class="text-sm text-muted-foreground flex items-center gap-2"
                    ><i class="fas fa-key text-green-500 w-4"></i>
                    Occupés</span
                  >
                  <span class="font-bold text-green-600 dark:text-green-400">{{
                    stats.occupied_count
                  }}</span>
                </div>
                <div
                  class="flex items-center justify-between py-2 border-b border-border"
                >
                  <span class="text-sm text-muted-foreground flex items-center gap-2"
                    ><i class="fas fa-circle-dot text-blue-500 w-4"></i>
                    Disponibles</span
                  >
                  <span class="font-bold text-blue-600 dark:text-blue-400">{{
                    stats.available_count
                  }}</span>
                </div>
                <div
                  v-if="stats.unpaid_count > 0"
                  class="flex items-center justify-between py-2"
                >
                  <span class="text-sm text-muted-foreground flex items-center gap-2"
                    ><i
                      class="fas fa-exclamation-triangle text-destructive w-4"
                    ></i>
                    Impayés</span
                  >
                  <span class="font-bold text-destructive">{{
                    stats.unpaid_count
                  }}</span>
                </div>
              </div>
            </div>

            <!-- CTA Publier -->
            <div
              class="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 text-primary-foreground overflow-hidden relative"
            >
              <div class="relative z-10">
                <span
                  class="text-[10px] font-black uppercase tracking-widest text-secondary mb-2 block"
                  >Boostez vos revenus</span
                >
                <h3 class="text-lg font-bold mb-3">
                  Vous avez un bien disponible ?
                </h3>
                <p class="text-xs text-primary-foreground/70 mb-5 leading-relaxed">
                  Publiez-le maintenant et trouvez un locataire en quelques
                  jours.
                </p>
                <RouterLink
                  :to="{ name: 'PublierBien' }"
                  class="inline-flex items-center gap-2 px-4 py-2.5 bg-secondary text-secondary-foreground rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg"
                >
                  <i class="fas fa-plus"></i> Publier maintenant
                </RouterLink>
              </div>
              <i
                class="fas fa-home absolute -right-4 -bottom-4 text-8xl text-primary-foreground/5"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import axios from "../../axios";
import DashboardRoleSwitcher from "../../components/common/DashboardRoleSwitcher.vue";

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
    if (err.response?.status === 401) router.push("/auth/connexion");
  } finally {
    isLoading.value = false;
  }
};

const formatPrice = (v) => new Intl.NumberFormat("fr-FR").format(v || 0);

onMounted(() => fetchDashboard());
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: hsl(var(--muted) / 0.2);
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: hsl(var(--secondary));
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--secondary) / 0.8);
}

/* Skeleton shimmer */
.sk {
  background: linear-gradient(
    90deg,
    hsl(var(--muted) / 0.2) 25%,
    hsl(var(--muted) / 0.4) 50%,
    hsl(var(--muted) / 0.2) 75%
  );
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