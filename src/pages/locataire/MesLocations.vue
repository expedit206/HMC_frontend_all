<template>
  <DashboardLayout>
    <div class="max-w-6xl mx-auto">
      <div class="mb-8">
        <h1 class="text-xl font-bold text-foreground leading-tight">
          Mes Locations
        </h1>
        <p class="text-muted-foreground text-xs mt-1 font-medium tracking-wide">
          Gérez vos baux actifs, dossiers de location et documents officiels.
        </p>
      </div>

      <!-- Locations List -->
      <div class="space-y-8">
        <div
          v-if="isLoading"
          class="flex flex-col items-center justify-center py-20 bg-card rounded-3xl border border-border italic text-muted-foreground"
        >
          <i
            class="fas fa-circle-notch fa-spin text-2xl mb-2 text-secondary"
          ></i>
          Chargement de vos contrats...
        </div>

        <template v-else-if="rentals.length > 0">
          <div
            v-for="rental in rentals"
            :key="rental.id"
            class="bg-card rounded-3xl shadow-sm border border-border overflow-hidden flex flex-col md:flex-row transition-all hover:shadow-md"
            :class="{ 'opacity-80': rental.status !== 'active' }"
          >
            <div class="md:w-72 h-56 md:h-auto overflow-hidden relative">
              <img
                :src="
                  rental.property?.primary_image?.path ||
                  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
                "
                class="w-full h-full object-cover"
                :class="{ 'grayscale opacity-70': rental.status !== 'active' }"
              />
              <div
                v-if="rental.status !== 'active'"
                class="absolute inset-0 bg-black/20 flex items-center justify-center"
              >
                <span
                  class="bg-black/60 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full border border-white/20"
                  >Terminée</span
                >
              </div>
            </div>
            <div class="flex-1 p-6 md:p-8">
              <div
                class="flex flex-col md:flex-row justify-between gap-4 mb-6"
              >
                <div>
                  <div class="flex items-center gap-2 mb-2">
                    <span
                      v-if="rental.status === 'active'"
                      class="px-2.5 py-1 bg-green-100 dark:bg-green-950/30 text-green-600 dark:text-green-400 text-[10px] font-bold rounded-lg uppercase tracking-wide"
                      >En cours</span
                    >
                    <span
                      class="text-[10px] text-muted-foreground font-bold uppercase tracking-widest"
                      >Contrat #LOC-{{
                        String(rental.id).padStart(4, "0")
                      }}</span
                    >
                  </div>
                  <h2
                    class="text-xl font-bold"
                    :class="
                      rental.status === 'active'
                        ? 'text-foreground'
                        : 'text-muted-foreground'
                    "
                  >
                    {{ rental.property?.title }}
                  </h2>
                  <p
                    class="text-xs mt-1"
                    :class="
                      rental.status === 'active'
                        ? 'text-muted-foreground'
                        : 'text-muted-foreground/70'
                    "
                  >
                    <i class="fas fa-map-marker-alt mr-1"></i>
                    {{ rental.property?.location }}
                  </p>
                </div>
                <div class="text-left md:text-right">
                  <p
                    class="text-xl font-black"
                    :class="
                      rental.status === 'active'
                        ? 'text-secondary'
                        : 'text-muted-foreground/50'
                    "
                  >
                    {{ formatPrice(rental.price) }}
                    <span class="text-xs">XAF/mois</span>
                  </p>
                  <p
                    class="text-[10px] font-bold uppercase mt-1"
                    :class="
                      rental.status === 'active'
                        ? 'text-muted-foreground'
                        : 'text-muted-foreground/50'
                    "
                  >
                    Loyer HT
                  </p>
                </div>
              </div>

              <div
                class="grid grid-cols-2 lg:grid-cols-4 gap-6 p-5 bg-muted/20 rounded-2xl mb-8"
              >
                <div>
                  <p
                    class="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1 leading-none"
                  >
                    Début
                  </p>
                  <p
                    class="text-xs font-bold"
                    :class="
                      rental.status === 'active'
                        ? 'text-foreground'
                        : 'text-muted-foreground'
                    "
                  >
                    {{ formatDate(rental.start_date) }}
                  </p>
                </div>
                <div>
                  <p
                    class="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1 leading-none"
                  >
                    Fin prévue
                  </p>
                  <p
                    class="text-xs font-bold"
                    :class="
                      rental.status === 'active'
                        ? 'text-foreground'
                        : 'text-muted-foreground'
                    "
                  >
                    {{ formatDate(rental.end_date) }}
                  </p>
                </div>
                <div>
                  <p
                    class="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1 leading-none"
                  >
                    Bailleur
                  </p>
                  <p
                    class="text-xs font-bold"
                    :class="
                      rental.status === 'active'
                        ? 'text-foreground'
                        : 'text-muted-foreground'
                    "
                  >
                    {{ rental.property?.owner?.name || "Inconnu" }}
                  </p>
                </div>
                <div>
                  <p
                    class="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1 leading-none"
                  >
                    Statut
                  </p>
                  <p
                    class="text-xs font-bold"
                    :class="
                      rental.status === 'active'
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-muted-foreground'
                    "
                  >
                    {{ rental.status === "active" ? "À jour" : "Archivé" }}
                  </p>
                </div>
              </div>

              <div
                class="flex flex-wrap gap-3"
                v-if="rental.status === 'active'"
              >
                <RouterLink
                  v-if="rental.status === 'active'"
                  to="/locataire/detail-mon-bien"
                  class="px-6 py-3 bg-primary text-primary-foreground rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-secondary hover:text-secondary-foreground transition-all flex items-center gap-2"
                >
                  <i class="fas fa-eye"></i> Voir détails
                </RouterLink>
                <button
                  v-if="rental.status === 'active'"
                  class="px-6 py-3 bg-card border border-border text-muted-foreground rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-muted/20 transition-all flex items-center gap-2"
                >
                  <i class="fas fa-file-contract"></i> Télécharger le bail
                </button>
                <button
                  class="px-6 py-3 bg-card border border-border text-muted-foreground rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-muted/20 transition-all flex items-center gap-2"
                >
                  <i class="fas fa-receipt"></i> État des lieux
                </button>
                <button
                  class="px-6 py-3 bg-card border border-border text-muted-foreground rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-muted/20 transition-all flex items-center gap-2"
                >
                  <i class="fas fa-comment-dots"></i> Contacter Bailleur
                </button>
              </div>
              <div class="flex flex-wrap gap-3" v-else>
                <button
                  class="px-6 py-3 bg-muted/20 text-muted-foreground/50 rounded-xl text-xs font-bold uppercase tracking-widest cursor-not-allowed flex items-center gap-2"
                >
                  <i class="fas fa-archive"></i> Contrat archivé
                </button>
                <button
                  class="px-6 py-3 bg-card border border-border text-muted-foreground rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-muted/20 transition-all flex items-center gap-2"
                >
                  <i class="fas fa-file-pdf"></i> Quittances archivées
                </button>
              </div>
            </div>
          </div>
        </template>

        <!-- Empty State -->
        <div
          v-else
          class="bg-muted/10 border-2 border-dashed border-border rounded-3xl p-16 text-center"
        >
          <div
            class="w-20 h-20 bg-card rounded-full flex items-center justify-center text-muted-foreground/50 text-2xl mx-auto mb-6 shadow-sm"
          >
            <i class="fas fa-folder-open"></i>
          </div>
          <h3
            class="text-xl font-bold text-muted-foreground uppercase tracking-tight"
          >
            Aucun contrat de location
          </h3>
          <p class="text-sm text-muted-foreground mt-2 max-w-sm mx-auto">
            Vous n'avez pas encore de contrat de location actif ou passé
            enregistré sur votre compte.
          </p>
          <RouterLink
            to="/annonces"
            class="inline-block mt-8 px-10 py-4 bg-secondary text-secondary-foreground rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg"
          >
            Chercher un logement
          </RouterLink>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import DashboardLayout from "../../layouts/DashboardLayout.vue";
import { RouterLink, useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import axios from "../../axios";

const router = useRouter();
const authStore = useAuthStore();
const isLoading = ref(true);
const rentals = ref([]);

const fetchRentals = async () => {
  try {
    const { data } = await axios.get("/api/tenant/rentals");
    if (data.success) {
      rentals.value = data.data;
    }
  } catch (err) {
    console.error("Erreur chargement locations:", err);
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchRentals);

const formatPrice = (price) => new Intl.NumberFormat("fr-FR").format(price);
const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Indéfini";

const logout = async () => {
  await authStore.logout();
  router.push("/auth/connexion");
};
</script>

<style scoped>
.sidebar-link.active {
  background-color: hsl(var(--secondary));
  color: hsl(var(--secondary-foreground));
  box-shadow: 0 4px 12px hsl(var(--secondary) / 0.2);
}
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: hsl(var(--muted));
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: hsl(var(--secondary));
  border-radius: 10px;
}
</style>