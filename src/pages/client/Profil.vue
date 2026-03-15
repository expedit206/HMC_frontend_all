<template>
  <DashboardLayout>
    <!-- Mobile Header Toggle -->
    <div class="lg:hidden flex items-center justify-between mb-6">
      <h1 class="text-xl font-bold text-foreground">Mon Espace</h1>
      <button
        @click="sidebarOpen = !sidebarOpen"
        class="p-2 text-muted-foreground hover:text-secondary"
      >
        <i class="fas fa-bars text-xl"></i>
      </button>
    </div>

    <!-- Onglets de navigation -->
    <div class="flex mb-8 border-b border-border">
      <button
        @click="activeTab = 'profile'"
        :class="[
          'px-6 py-4 text-lg font-bold border-b-2 transition-colors flex items-center gap-2',
          activeTab === 'profile'
            ? 'border-secondary text-secondary'
            : 'border-transparent text-muted-foreground hover:text-foreground',
        ]"
      >
        <i class="fas fa-user-circle"></i> Mon Profil
      </button>
      <button
        @click="activeTab = 'favorites'"
        :class="[
          'px-6 py-4 text-lg font-bold border-b-2 transition-colors flex items-center gap-2',
          activeTab === 'favorites'
            ? 'border-secondary text-secondary'
            : 'border-transparent text-muted-foreground hover:text-foreground',
        ]"
      >
        <i class="fas fa-heart"></i> Mes Favoris
      </button>
    </div>

    <!-- PROFILE CONTENT -->
    <div v-if="activeTab === 'profile'" class="animate-fadeIn">
      <div
        class="bg-card rounded-[2.5rem] shadow-sm border border-border p-8 mb-8"
      >
        <div class="flex flex-col md:flex-row items-start gap-8">
          <!-- Avatar et info de base -->
          <div class="md:w-1/3 text-center md:text-left w-full">
            <div
              class="w-32 h-32 md:w-48 md:h-48 rounded-3xl bg-primary mx-auto md:mx-0 mb-6 flex items-center justify-center text-primary-foreground text-4xl md:text-6xl font-black"
            >
              JD
            </div>
            <h2 class="text-2xl md:text-3xl font-black text-foreground">
              Jean Dupont
            </h2>
            <p class="text-muted-foreground mt-2">
              Membre depuis <span class="font-bold">Janvier 2023</span>
            </p>
            <button
              class="mt-6 px-8 py-3 bg-secondary text-secondary-foreground rounded-xl font-bold hover:bg-secondary/90 transition shadow-lg w-full md:w-auto"
            >
              <i class="fas fa-edit mr-2"></i>Modifier le profil
            </button>
          </div>

          <!-- Informations détaillées -->
          <div class="md:w-2/3 w-full">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-xl md:text-2xl font-black text-foreground">
                Informations Personnelles
              </h3>
              <button
                class="px-4 py-2 border border-foreground text-foreground rounded-xl hover:bg-foreground hover:text-background transition hidden md:block"
              >
                <i class="fas fa-pencil-alt mr-2"></i>Éditer
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <p
                  class="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1"
                >
                  Nom complet
                </p>
                <p class="text-lg font-bold text-foreground">Jean Dupont</p>
              </div>
              <div>
                <p
                  class="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1"
                >
                  Email
                </p>
                <p class="text-lg font-bold text-foreground">
                  jean.dupont@email.com
                </p>
              </div>
              <div>
                <p
                  class="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1"
                >
                  Téléphone
                </p>
                <p class="text-lg font-bold text-foreground">
                  +237 6XX XX XX XX
                </p>
              </div>
              <div>
                <p
                  class="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1"
                >
                  Ville
                </p>
                <p class="text-lg font-bold text-foreground">Yaoundé</p>
              </div>
            </div>

            <h4 class="text-xl font-black text-foreground mb-4">
              Mes Préférences
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="bg-muted/20 p-4 rounded-2xl border border-border">
                <p
                  class="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1"
                >
                  Type de bien recherché
                </p>
                <p class="font-bold text-foreground">Appartement, Villa</p>
              </div>
              <div class="bg-muted/20 p-4 rounded-2xl border border-border">
                <p
                  class="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1"
                >
                  Villes préférées
                </p>
                <p class="font-bold text-foreground">Yaoundé, Douala</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Statistiques -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div
          class="bg-card rounded-[2rem] shadow-sm border border-border p-6 text-center"
        >
          <div
            class="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-3 text-secondary"
          >
            <i class="fas fa-eye text-xl"></i>
          </div>
          <p
            class="text-xs text-muted-foreground font-bold uppercase tracking-wider"
          >
            Biens vus
          </p>
          <p class="text-2xl font-black text-foreground">24</p>
        </div>
        <div
          class="bg-card rounded-[2rem] shadow-sm border border-border p-6 text-center"
        >
          <div
            class="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center mx-auto mb-3 text-destructive"
          >
            <i class="fas fa-heart text-xl"></i>
          </div>
          <p
            class="text-xs text-muted-foreground font-bold uppercase tracking-wider"
          >
            Favoris
          </p>
          <p class="text-2xl font-black text-foreground">
            {{ favorites.length }}
          </p>
        </div>
        <div
          class="bg-card rounded-[2rem] shadow-sm border border-border p-6 text-center"
        >
          <div
            class="w-12 h-12 bg-blue-100 dark:bg-blue-950/30 rounded-xl flex items-center justify-center mx-auto mb-3 text-blue-600 dark:text-blue-400"
          >
            <i class="fas fa-calendar-check text-xl"></i>
          </div>
          <p
            class="text-xs text-muted-foreground font-bold uppercase tracking-wider"
          >
            Visites
          </p>
          <p class="text-2xl font-black text-foreground">3</p>
        </div>
        <div
          class="bg-card rounded-[2rem] shadow-sm border border-border p-6 text-center"
        >
          <div
            class="w-12 h-12 bg-green-100 dark:bg-green-950/30 rounded-xl flex items-center justify-center mx-auto mb-3 text-green-600 dark:text-green-400"
          >
            <i class="fas fa-clock text-xl"></i>
          </div>
          <p
            class="text-xs text-muted-foreground font-bold uppercase tracking-wider"
          >
            Connexion
          </p>
          <p class="text-base font-bold text-foreground">10:24</p>
        </div>
      </div>
    </div>

    <!-- FAVORITES CONTENT -->
    <div v-if="activeTab === 'favorites'" class="animate-slide-up">
      <div class="mb-8">
        <h2 class="text-2xl font-black text-foreground mb-2">
          Mes Biens Favoris
        </h2>
        <p class="text-muted-foreground">
          Vous avez
          <span class="font-bold text-secondary"
            >{{ favorites.length }} biens</span
          >
          enregistrés.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="fav in favorites"
          :key="fav.id"
          class="bg-card rounded-[2.5rem] shadow-sm border border-border overflow-hidden hover:shadow-lg transition group"
        >
          <div class="relative h-64 bg-muted overflow-hidden">
            <img
              :src="fav.image"
              :alt="fav.title"
              class="w-full h-full object-cover group-hover:scale-110 transition duration-700"
            />
            <div
              v-if="fav.badge"
              class="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground rounded-full text-xs font-bold shadow-md"
            >
              {{ fav.badge }}
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-lg font-black text-foreground mb-1">
              {{ fav.title }}
            </h3>
            <div
              class="flex items-center text-secondary font-bold text-xs mb-4 uppercase tracking-wide"
            >
              <i class="fas fa-map-marker-alt mr-2"></i>
              <span>{{ fav.location }}</span>
            </div>
            <p class="text-xl font-black text-secondary mb-6">
              {{ fav.price }}
            </p>

            <div
              class="flex justify-between text-muted-foreground text-xs mb-6 border-t border-border pt-4"
            >
              <div class="text-center">
                <i class="fas fa-bed text-base mb-1 block"></i>
                <span class="font-bold">{{ fav.beds }} ch.</span>
              </div>
              <div class="text-center">
                <i class="fas fa-bath text-base mb-1 block"></i>
                <span class="font-bold">{{ fav.baths }} sdb</span>
              </div>
              <div class="text-center">
                <i class="fas fa-ruler-combined text-base mb-1 block"></i>
                <span class="font-bold">{{ fav.area }} m²</span>
              </div>
            </div>

            <div class="flex gap-3">
              <RouterLink
                :to="`/annonces/${fav.id}`"
                class="flex-1 px-4 py-3 border border-foreground text-foreground rounded-xl font-bold hover:bg-foreground hover:text-background transition text-center text-sm"
              >
                Voir
              </RouterLink>
              <button
                class="flex-1 px-4 py-3 bg-secondary text-secondary-foreground rounded-xl font-bold hover:bg-secondary/90 transition text-sm"
              >
                Contacter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, reactive } from "vue";
import DashboardLayout from "../../layouts/DashboardLayout.vue";

const sidebarOpen = ref(false);
const activeTab = ref("profile");

const authStore = useAuthStore();
const form = ref({
  name: authStore.user?.name || "",
  email: authStore.user?.email || "",
  phone: authStore.user?.phone || "",
  city: authStore.user?.city || "",
});

const isSaving = ref(false);
const saveMessage = ref("");

const updateProfile = async () => {
  if (!form.value.name) return;

  isSaving.value = true;
  saveMessage.value = "";
  try {
    // Adapter selon le endpoint de modification de profil client si vous en avez un différent
    const { data } = await axios.put("/api/client/profile", form.value);
    if (data.success) {
      authStore.user = data.data;
      saveMessage.value = "Profil mis à jour avec succès !";
      setTimeout(() => (saveMessage.value = ""), 3000);
    }
  } catch (err) {
    console.warn("Mise à jour (Mode démo si api absente): ", form.value, err);
    saveMessage.value = "Modifications enregistrées (mode démo)";
    setTimeout(() => (saveMessage.value = ""), 3000);
  } finally {
    isSaving.value = false;
  }
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
