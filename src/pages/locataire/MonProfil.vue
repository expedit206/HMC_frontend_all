<template>
  <DashboardLayout>
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="mb-10">
        <div class="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <RouterLink
            to="/locataire/dashboard"
            class="hover:text-secondary transition-colors"
            >Tableau de bord</RouterLink
          >
          <i class="fas fa-chevron-right text-xs"></i>
          <span class="font-semibold text-foreground">Mon Profil</span>
        </div>
        <div
          class="flex flex-col lg:flex-row lg:items-center justify-between gap-4"
        >
          <div>
            <h1 class="text-3xl lg:text-4xl font-black text-foreground mb-2">
              Mon Profil Personnel
            </h1>
            <p class="text-muted-foreground text-sm font-medium">
              Gérez vos informations, votre sécurité et votre dossier locatif
            </p>
          </div>
          <div class="flex items-center gap-3">
            <span
              class="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-bold uppercase"
              ><i class="fas fa-shield-alt mr-1"></i> Sécurisé</span
            >
            <span
              class="px-3 py-1 bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400 rounded-full text-xs font-bold uppercase"
              ><i class="fas fa-check-circle mr-1"></i> Vérifié</span
            >
          </div>
        </div>
      </div>

      <!-- Grid Principale -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Colonne Gauche -->
        <div class="space-y-8">
          <!-- Carte Photo -->
          <div
            class="bg-card rounded-3xl p-8 shadow-sm border border-border"
          >
            <div class="relative mb-6">
              <div
                class="w-48 h-48 mx-auto rounded-3xl bg-secondary flex items-center justify-center text-secondary-foreground text-6xl font-bold"
              >
                {{
                  authStore.user?.name
                    ? authStore.user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)
                    : "JD"
                }}
              </div>
              <button
                class="absolute bottom-4 right-4 w-12 h-12 bg-card rounded-2xl flex items-center justify-center shadow-md hover:shadow-lg hover:bg-muted/20 transition-all border border-border"
              >
                <i class="fas fa-camera text-secondary"></i>
              </button>
            </div>

            <div class="text-center">
              <h2 class="text-2xl font-black text-foreground mb-1">
                {{ authStore.user?.name }}
              </h2>
              <div class="flex items-center justify-center gap-2 mb-4">
                <span class="text-sm font-semibold text-secondary"
                  >Locataire Premium</span
                >
                <i class="fas fa-crown text-secondary/80"></i>
              </div>
              <p class="text-muted-foreground text-sm mb-6">
                Membre depuis <span class="font-bold">Janvier 2023</span>
              </p>

              <button
                class="w-full py-4 bg-secondary text-secondary-foreground font-bold rounded-2xl hover:bg-secondary/90 transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-3"
              >
                <i class="fas fa-edit"></i> Modifier le profil
              </button>
            </div>
          </div>

          <!-- Carte Score -->
          <div
            class="bg-card rounded-3xl p-8 shadow-sm border border-border"
          >
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-bold text-foreground">
                Score Locatif HMC
              </h3>
              <i class="fas fa-chart-line text-secondary text-xl"></i>
            </div>

            <div class="relative w-40 h-40 mx-auto mb-6">
              <svg class="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="hsl(var(--muted))"
                  stroke-width="8"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="hsl(var(--secondary))"
                  stroke-width="8"
                  fill="transparent"
                  stroke-dasharray="283"
                  stroke-dashoffset="56"
                  stroke-linecap="round"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div
                class="absolute inset-0 flex flex-col items-center justify-center"
              >
                <span class="text-5xl font-black text-secondary">8.5</span>
                <span class="text-xs font-bold text-muted-foreground">/10</span>
              </div>
            </div>

            <div class="text-center">
              <p class="text-sm text-muted-foreground mb-4">
                Votre score vous place dans le
                <span class="font-bold text-secondary">top 15%</span> des
                locataires
              </p>
              <button
                class="w-full py-4 bg-primary text-primary-foreground font-bold rounded-2xl hover:bg-secondary hover:text-secondary-foreground transition-colors shadow-md"
              >
                Améliorer mon score
              </button>
            </div>
          </div>
        </div>

        <!-- Colonne Centre et Droite -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Informations Personnelles -->
          <div
            class="bg-card rounded-3xl p-8 shadow-sm border border-border"
          >
            <div class="flex items-center justify-between mb-8">
              <div>
                <h3 class="text-xl font-bold text-foreground mb-2">
                  Informations Personnelles
                </h3>
                <p class="text-muted-foreground text-sm">
                  Mettez à jour vos coordonnées et préférences
                </p>
              </div>
              <span
                class="px-3 py-1 bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-bold uppercase"
                ><i class="fas fa-sync-alt mr-1"></i> MAJ : Aujourd'hui</span
              >
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div class="md:col-span-2">
                <label
                  class="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3"
                  >Nom complet</label
                >
                <input
                  type="text"
                  v-model="form.name"
                  class="w-full px-5 py-4 bg-muted/20 border border-border rounded-2xl text-sm font-medium text-foreground focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
                />
              </div>
              <div class="md:col-span-2">
                <label
                  class="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3"
                  >Adresse Email</label
                >
                <div class="relative">
                  <input
                    type="email"
                    v-model="form.email"
                    class="w-full px-5 py-4 bg-muted/20 border border-border rounded-2xl text-sm font-medium text-foreground focus:outline-none focus:border-secondary pr-20"
                    readonly
                  />
                  <span
                    class="absolute right-4 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400 rounded-lg text-xs font-bold uppercase"
                    >Vérifié</span
                  >
                </div>
              </div>
              <div>
                <label
                  class="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3"
                  >Téléphone</label
                >
                <input
                  type="tel"
                  v-model="form.phone"
                  class="w-full px-5 py-4 bg-muted/20 border border-border rounded-2xl text-sm font-medium text-foreground focus:outline-none focus:border-secondary"
                />
              </div>
              <div>
                <label
                  class="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3"
                  >Ville</label
                >
                <input
                  type="text"
                  v-model="form.city"
                  class="w-full px-5 py-4 bg-muted/20 border border-border rounded-2xl text-sm font-medium text-foreground focus:outline-none focus:border-secondary"
                />
              </div>
            </div>

            <div class="flex items-center justify-end gap-4">
              <span
                v-if="saveMessage"
                class="text-sm font-bold text-green-600 dark:text-green-400 animate-bounce"
              >
                <i class="fas fa-check-circle mr-1"></i> {{ saveMessage }}
              </span>
              <button
                @click="updateProfile"
                :disabled="isSaving"
                class="px-8 py-4 bg-secondary text-secondary-foreground font-bold rounded-2xl hover:bg-secondary/90 transition-colors shadow-md hover:shadow-lg flex items-center gap-3 disabled:opacity-50"
              >
                <i v-if="isSaving" class="fas fa-circle-notch fa-spin"></i>
                <i v-else class="fas fa-save"></i>
                {{
                  isSaving ? "Sauvegarde..." : "Enregistrer les modifications"
                }}
              </button>
            </div>
          </div>

          <!-- Gestion des Rôles / Multi-Comptes -->
          <div
            class="bg-card rounded-3xl p-8 shadow-sm border border-border"
          >
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-xl font-bold text-foreground">
                Gestion des Rôles & Multi-comptes
              </h3>
              <i class="fas fa-users-cog text-secondary text-xl"></i>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Rôle Bailleur -->
              <div
                :class="[
                  'p-5 rounded-2xl border transition-all flex items-center justify-between gap-3',
                  authStore.availableRoles.includes('bailleur')
                    ? 'bg-green-50 dark:bg-green-950/30 border-green-100 dark:border-green-800'
                    : 'bg-muted/10 border-border',
                ]"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 rounded-xl bg-card flex items-center justify-center shadow-sm"
                  >
                    <i class="fas fa-hand-holding-heart text-secondary"></i>
                  </div>
                  <div>
                    <p class="font-bold text-sm text-foreground">
                      Compte Bailleur
                    </p>
                    <p class="text-[10px] text-muted-foreground">
                      Pour louer vos biens
                    </p>
                  </div>
                </div>
                <div
                  v-if="authStore.availableRoles.includes('bailleur')"
                  class="text-green-600 dark:text-green-400"
                >
                  <i class="fas fa-check-circle"></i>
                </div>
                <button
                  v-else
                  @click="handleAcquireRole('bailleur')"
                  class="px-3 py-1.5 bg-secondary text-secondary-foreground text-[10px] font-bold rounded-lg hover:bg-secondary/90 transition-all"
                >
                  Activer
                </button>
              </div>

              <!-- Rôle Prestataire -->
              <div
                :class="[
                  'p-5 rounded-2xl border transition-all flex items-center justify-between gap-3',
                  authStore.availableRoles.includes('prestataire')
                    ? 'bg-green-50 dark:bg-green-950/30 border-green-100 dark:border-green-800'
                    : 'bg-muted/10 border-border',
                ]"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 rounded-xl bg-card flex items-center justify-center shadow-sm"
                  >
                    <i class="fas fa-tools text-secondary"></i>
                  </div>
                  <div>
                    <p class="font-bold text-sm text-foreground">
                      Compte Prestataire
                    </p>
                    <p class="text-[10px] text-muted-foreground">
                      Pour proposer vos services
                    </p>
                  </div>
                </div>
                <div
                  v-if="authStore.availableRoles.includes('prestataire')"
                  class="text-green-600 dark:text-green-400"
                >
                  <i class="fas fa-check-circle"></i>
                </div>
                <button
                  v-else
                  @click="handleAcquireRole('prestataire')"
                  class="px-3 py-1.5 bg-secondary text-secondary-foreground text-[10px] font-bold rounded-lg hover:bg-secondary/90 transition-all"
                >
                  Activer
                </button>
              </div>

              <!-- Rôle Agent -->
              <div
                :class="[
                  'p-5 rounded-2xl border transition-all flex items-center justify-between gap-3',
                  authStore.availableRoles.includes('agent')
                    ? 'bg-green-50 dark:bg-green-950/30 border-green-100 dark:border-green-800'
                    : 'bg-muted/10 border-border',
                ]"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 rounded-xl bg-card flex items-center justify-center shadow-sm"
                  >
                    <i class="fas fa-user-tie text-secondary"></i>
                  </div>
                  <div>
                    <p class="font-bold text-sm text-foreground">
                      Compte Agent
                    </p>
                    <p class="text-[10px] text-muted-foreground">
                      Pour gérer des biens
                    </p>
                  </div>
                </div>
                <div
                  v-if="authStore.availableRoles.includes('agent')"
                  class="text-green-600 dark:text-green-400"
                >
                  <i class="fas fa-check-circle"></i>
                </div>
                <button
                  v-else
                  @click="handleAcquireRole('agent')"
                  class="px-3 py-1.5 bg-secondary text-secondary-foreground text-[10px] font-bold rounded-lg hover:bg-secondary/90 transition-all"
                >
                  Activer
                </button>
              </div>
            </div>
          </div>

          <!-- Mes Préférences -->
          <div
            class="bg-card rounded-3xl p-8 shadow-sm border border-border"
          >
            <h3 class="text-xl font-bold text-foreground mb-6">
              Mes Préférences
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                class="p-5 bg-secondary/10 rounded-2xl border border-secondary/20 flex items-start gap-3"
              >
                <div
                  class="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center flex-shrink-0"
                >
                  <i class="fas fa-home text-secondary-foreground text-xl"></i>
                </div>
                <div>
                  <h4 class="font-bold text-foreground mb-1">
                    Type de logement
                  </h4>
                  <p class="text-sm text-muted-foreground">Appartement, Villa</p>
                </div>
              </div>
              <div
                class="p-5 bg-primary/10 rounded-2xl border border-primary/20 flex items-start gap-3"
              >
                <div
                  class="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center flex-shrink-0"
                >
                  <i class="fas fa-city text-primary-foreground text-xl"></i>
                </div>
                <div>
                  <h4 class="font-bold text-foreground mb-1">
                    Villes préférées
                  </h4>
                  <p class="text-sm text-muted-foreground">Yaoundé, Douala</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div
              class="bg-card p-4 rounded-2xl text-center shadow-sm border border-border"
            >
              <p class="text-2xl font-black text-foreground">24</p>
              <p class="text-[10px] font-bold text-muted-foreground uppercase">
                Visites
              </p>
            </div>
            <div
              class="bg-card p-4 rounded-2xl text-center shadow-sm border border-border"
            >
              <p class="text-2xl font-black text-foreground">8</p>
              <p class="text-[10px] font-bold text-muted-foreground uppercase">
                Favoris
              </p>
            </div>
            <div
              class="bg-card p-4 rounded-2xl text-center shadow-sm border border-border"
            >
              <p class="text-2xl font-black text-foreground">3</p>
              <p class="text-[10px] font-bold text-muted-foreground uppercase">
                Demandes
              </p>
            </div>
            <div
              class="bg-card p-4 rounded-2xl text-center shadow-sm border border-border"
            >
              <p class="text-2xl font-black text-green-600 dark:text-green-400">Top</p>
              <p class="text-[10px] font-bold text-muted-foreground uppercase">
                Statut
              </p>
            </div>
          </div>
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
const form = ref({
  name: authStore.user?.name || "",
  email: authStore.user?.email || "",
  phone: authStore.user?.phone || "",
  city: authStore.user?.city || "Yaoundé",
});

const isSaving = ref(false);
const saveMessage = ref("");

const updateProfile = async () => {
  if (!form.value.name) return;

  isSaving.value = true;
  saveMessage.value = "";
  try {
    const { data } = await axios.put("/api/tenant/profile", form.value);
    if (data.success) {
      // Update store user
      authStore.user = data.data;
      saveMessage.value = "Profil mis à jour avec succès !";
      setTimeout(() => (saveMessage.value = ""), 3000);
    }
  } catch (err) {
    console.error("Erreur mise à jour profil:", err);
    alert(err.response?.data?.message || "Une erreur est survenue.");
  } finally {
    isSaving.value = false;
  }
};

const handleAcquireRole = async (role) => {
  if (
    confirm(`Voulez-vous vraiment activer le rôle ${role} sur votre compte ?`)
  ) {
    isSaving.value = true;
    try {
      const success = await authStore.acquireRole(role);
      if (success) {
        saveMessage.value = `Félicitations ! Le rôle ${role} est activé.`;
        setTimeout(() => (saveMessage.value = ""), 5000);
      }
    } catch (err) {
      console.error("Erreur acquisition rôle:", err);
    } finally {
      isSaving.value = false;
    }
  }
};

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