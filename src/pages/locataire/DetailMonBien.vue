<template>
  <DashboardLayout>
    <div class="max-w-7xl mx-auto">
      <div v-if="isLoading" class="py-20 text-center">
        <i
          class="fas fa-circle-notch fa-spin text-4xl text-secondary mb-4"
        ></i>
        <p class="text-muted-foreground font-medium">
          Récupération de vos informations locatives...
        </p>
      </div>

      <div v-else-if="!rental" class="py-20 text-center animate-fadeInUp">
        <div
          class="w-24 h-24 bg-muted/20 rounded-full flex items-center justify-center text-muted-foreground/50 text-4xl mx-auto mb-6"
        >
          <i class="fas fa-home"></i>
        </div>
        <h1 class="text-2xl font-bold text-foreground mb-4">
          Aucune location active
        </h1>
        <p class="text-muted-foreground mb-8 max-w-md mx-auto">
          Vous n'avez pas de contrat de location actif en ce moment. Parcourez
          nos annonces pour trouver votre futur chez-vous.
        </p>
        <RouterLink
          :to="{ name: 'Annonces' }"
          class="px-8 py-4 bg-secondary text-secondary-foreground font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
        >
          Voir les annonces
        </RouterLink>
      </div>

      <!-- Titre et infos principales -->
      <div v-else class="mb-8 animate-fadeInUp">
        <h1
          class="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3"
        >
          {{ rental.property.title }}
        </h1>
        <p class="text-muted-foreground mb-5">
          {{ rental.property.type === "rent" ? "Location" : "Vente" }} • En
          location depuis le {{ formatDate(rental.start_date) }}
        </p>

        <div
          class="flex items-center gap-3 text-muted-foreground mb-6 pb-6 border-b border-border"
        >
          <i class="fas fa-map-marker-alt"></i>
          <span>{{ rental.property.location }}</span>
        </div>

        <div class="flex flex-wrap gap-3 mb-8">
          <span
            class="px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-semibold"
            >En cours de location</span
          >
          <span
            class="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold"
            >Contrat :
            {{ rental.property.price > 0 ? "Actif" : "Gratuit" }}</span
          >
          <span
            class="px-4 py-2 rounded-full bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400 text-sm font-semibold"
            >Statut : À jour</span
          >
        </div>
      </div>

      <div class="mb-8 animate-fadeInUp" v-if="rental">
        <div
          class="w-full h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden mb-4 bg-muted/20"
        >
          <img
            :src="currentImage"
            alt="Vue principale"
            class="w-full h-full object-cover transition-all duration-500"
          />
        </div>

        <div
          class="grid grid-cols-2 sm:grid-cols-4 gap-3"
          v-if="rental.property.images?.length > 1"
        >
          <div
            v-for="(img, index) in rental.property.images"
            :key="index"
            class="h-20 sm:h-24 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 border-2"
            :class="currentImage === img.path ? 'border-secondary' : 'border-transparent'"
            @click="currentImage = img.path"
          >
            <img
              :src="img.path"
              :alt="'Vue ' + (index + 1)"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Section principale (2 colonnes sur desktop) -->
        <div class="lg:col-span-2 space-y-8">
          <div
            v-if="rental"
            class="bg-card rounded-2xl shadow-[0_4px_12px_hsl(var(--primary)/0.1)] p-6 border-l-4 border-secondary animate-fadeInUp"
          >
            <div class="flex items-center gap-3 mb-6">
              <i class="fas fa-home text-secondary text-xl"></i>
              <h2 class="text-xl font-semibold text-foreground">
                Caractéristiques du bien
              </h2>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
              <div class="flex items-center gap-4">
                <div
                  class="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center"
                >
                  <i class="fas fa-ruler-combined text-secondary"></i>
                </div>
                <div>
                  <div class="text-sm text-muted-foreground">Superficie</div>
                  <div class="font-semibold text-foreground">
                    {{ rental.property.area }} m²
                  </div>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <div
                  class="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center"
                >
                  <i class="fas fa-bed text-secondary"></i>
                </div>
                <div>
                  <div class="text-sm text-muted-foreground">Chambres</div>
                  <div class="font-semibold text-foreground">
                    {{ rental.property.bedrooms }}
                  </div>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <div
                  class="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center"
                >
                  <i class="fas fa-bath text-secondary"></i>
                </div>
                <div>
                  <div class="text-sm text-muted-foreground">Salles de bain</div>
                  <div class="font-semibold text-foreground">
                    {{ rental.property.bathrooms }}
                  </div>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <div
                  class="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center"
                >
                  <i class="fas fa-check-circle text-secondary"></i>
                </div>
                <div>
                  <div class="text-sm text-muted-foreground">État</div>
                  <div class="font-semibold text-foreground">Excellent</div>
                </div>
              </div>
            </div>

            <h3 class="text-foreground mb-3 font-semibold">Description</h3>
            <p class="text-muted-foreground leading-relaxed">
              {{ rental.property.description }}
            </p>
          </div>

          <!-- Équipements et services -->
          <div
            class="bg-card rounded-2xl shadow-[0_4px_12px_hsl(var(--primary)/0.1)] p-6 border-l-4 border-secondary animate-fadeInUp"
          >
            <div class="flex items-center gap-3 mb-6">
              <i class="fas fa-bolt text-secondary text-xl"></i>
              <h2 class="text-xl font-semibold text-foreground">
                Équipements & Services inclus
              </h2>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div
                v-for="equip in equipments"
                :key="equip"
                class="flex items-center gap-3"
              >
                <i class="fas fa-check text-secondary"></i>
                <span class="text-muted-foreground">{{ equip }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar (droite sur desktop) -->
        <div class="space-y-8">
          <div
            v-if="rental"
            class="bg-card rounded-2xl shadow-[0_4px_12px_hsl(var(--primary)/0.1)] p-6 border-l-4 border-secondary animate-fadeInUp"
          >
            <div class="flex items-center gap-3 mb-6">
              <i class="fas fa-file-contract text-secondary text-xl"></i>
              <h2 class="text-xl font-semibold text-foreground">
                Informations de location
              </h2>
            </div>

            <div class="grid grid-cols-2 gap-5">
              <div>
                <div class="text-sm text-muted-foreground mb-1">Loyer mensuel</div>
                <div class="text-lg font-bold text-foreground">
                  {{ formatPrice(rental.price) }} FCFA
                </div>
              </div>

              <div>
                <div class="text-sm text-muted-foreground mb-1">Caution</div>
                <div class="text-lg font-bold text-foreground">
                  {{ formatPrice(rental.price * 2) }} FCFA
                </div>
              </div>

              <div>
                <div class="text-sm text-muted-foreground mb-1">
                  Début du contrat
                </div>
                <div class="font-semibold text-foreground">
                  {{ formatDate(rental.start_date) }}
                </div>
              </div>

              <div>
                <div class="text-sm text-muted-foreground mb-1">Fin du contrat</div>
                <div class="font-semibold text-foreground">
                  {{ formatDate(rental.end_date) }}
                </div>
              </div>

              <div>
                <div class="text-sm text-muted-foreground mb-1">
                  Prochaine échéance
                </div>
                <div class="font-semibold text-foreground">
                  01/{{ new Date().getMonth() + 2 }}/{{
                    new Date().getFullYear()
                  }}
                </div>
              </div>

              <div>
                <div class="text-sm text-muted-foreground mb-1">
                  Mode de paiement
                </div>
                <div class="font-semibold text-foreground">Mobile Money</div>
              </div>
            </div>
          </div>

          <!-- Propriétaire -->
          <div
            class="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-6 animate-fadeInUp"
          >
            <div class="flex items-center gap-4 mb-6">
              <div
                class="w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center text-secondary-foreground font-bold text-2xl"
              >
                PM
              </div>
              <div>
                <h3 class="font-semibold text-foreground text-lg">
                  {{ rental.property.owner?.name || "Administrateur" }}
                </h3>
                <p class="text-muted-foreground">Propriétaire</p>
              </div>
            </div>

            <div class="space-y-3">
              <a
                :href="`tel:${rental.property.owner?.phone}`"
                class="flex items-center gap-3 p-3 bg-card rounded-xl hover:bg-secondary/5 transition-all duration-300 group"
              >
                <i class="fas fa-phone text-secondary"></i>
                <span class="text-foreground group-hover:text-secondary"
                  >+237 6 99 99 99</span
                >
              </a>
              <a
                :href="`mailto:${rental.property.owner?.email}`"
                class="flex items-center gap-3 p-3 bg-card rounded-xl hover:bg-secondary/5 transition-all duration-300 group"
              >
                <i class="fas fa-envelope text-secondary"></i>
                <span class="text-foreground group-hover:text-secondary"
                  >Envoyer un email</span
                >
              </a>
              <a
                :href="`https://wa.me/${rental.property.owner?.phone}`"
                class="flex items-center gap-3 p-3 bg-card rounded-xl hover:bg-secondary/5 transition-all duration-300 group"
              >
                <i class="fab fa-whatsapp text-secondary"></i>
                <span class="text-foreground group-hover:text-secondary"
                  >WhatsApp</span
                >
              </a>
            </div>
          </div>

          <!-- Documents -->
          <div
            class="bg-card rounded-2xl shadow-[0_4px_12px_hsl(var(--primary)/0.1)] p-6 border-l-4 border-secondary animate-fadeInUp"
          >
            <div class="flex items-center gap-3 mb-6">
              <i class="fas fa-folder text-secondary text-xl"></i>
              <h2 class="text-xl font-semibold text-foreground">
                Documents associés
              </h2>
            </div>

            <div class="space-y-3">
              <a
                href="#"
                class="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/20 transition-all duration-300 group"
              >
                <i class="fas fa-file-pdf text-red-500"></i>
                <span class="text-foreground group-hover:text-secondary"
                  >Contrat de location</span
                >
              </a>
              <a
                href="#"
                class="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/20 transition-all duration-300 group"
              >
                <i class="fas fa-file-pdf text-red-500"></i>
                <span class="text-foreground group-hover:text-secondary"
                  >État des lieux d'entrée</span
                >
              </a>
              <a
                href="#"
                class="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/20 transition-all duration-300 group"
              >
                <i class="fas fa-file-pdf text-red-500"></i>
                <span class="text-foreground group-hover:text-secondary"
                  >Règlement intérieur</span
                >
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Boutons d'action -->
      <div
        class="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fadeInUp"
      >
        <RouterLink
          :to="{ name: 'LocatairePaiementFacture' }"
          class="bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
        >
          <i class="fas fa-file-invoice-dollar"></i>
          Payer mon loyer
        </RouterLink>
        <RouterLink
          :to="{ name: 'LocataireInterventions' }"
          class="bg-card border-2 border-secondary text-secondary font-bold py-4 px-6 rounded-xl hover:bg-secondary/10 transition-all duration-300 flex items-center justify-center gap-3"
        >
          <i class="fas fa-exclamation-triangle"></i>
          Déclarer un problème
        </RouterLink>
        <RouterLink
          :to="{ name: 'LocataireDashboard' }"
          class="bg-card border-2 border-secondary text-secondary font-bold py-4 px-6 rounded-xl hover:bg-secondary/10 transition-all duration-300 flex items-center justify-center gap-3"
        >
          <i class="fas fa-sync-alt"></i>
          Demander un renouvellement
        </RouterLink>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import DashboardLayout from "../../layouts/DashboardLayout.vue";
import { RouterLink } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import axios from "../../axios";

const authStore = useAuthStore();
const isLoading = ref(true);
const rental = ref(null);
const currentImage = ref("");

const fetchActiveRental = async () => {
  try {
    const { data } = await axios.get("/api/tenant/dashboard");
    if (data.success && data.data.active_rental) {
      rental.value = data.data.active_rental;
      if (rental.value.property?.images?.length > 0) {
        currentImage.value = rental.value.property.images[0].path;
      } else if (rental.value.property?.primary_image) {
        currentImage.value = rental.value.property.primary_image.path;
      } else {
        currentImage.value =
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80";
      }
    }
  } catch (err) {
    console.error("Erreur chargement bien:", err);
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchActiveRental);

const formatPrice = (price) => new Intl.NumberFormat("fr-FR").format(price);
const formatDate = (date) => new Date(date).toLocaleDateString("fr-FR");

const equipments = [
  "Climatisation",
  "Groupe électrogène",
  "Réseau Wi-Fi",
  "Sécurité 24/7",
  "Parking privé",
  "Forage d'eau",
];
</script>

<style scoped>
.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>