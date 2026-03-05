<template>
  <div class="bg-background min-h-screen py-8">
    <div class="max-w-6xl mx-auto px-4">
      <!-- En-tête propriété -->
      <div class="bg-card rounded-2xl p-6 md:p-8 shadow-sm border border-border mb-8 text-center">
        <h1 class="text-2xl md:text-3xl font-bold text-primary mb-3">
          Programmer votre visite
        </h1>
        <div class="inline-block">
          <h2 class="text-xl md:text-2xl font-bold text-foreground">
            {{ property.title }}
          </h2>
          <p class="text-foreground/60 mt-1">
            <i class="fas fa-map-marker-alt text-secondary mr-2"></i>
            {{ property.location }}
          </p>
          <p class="text-2xl md:text-3xl font-bold text-secondary mt-3">
            {{ formatPrice(property.price) }} FCFA
          </p>
        </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- ===================== FORMULAIRE ===================== -->
        <div class="lg:w-2/3">
          <div class="bg-card rounded-2xl p-6 md:p-8 shadow-sm border border-border">
            <form @submit.prevent="submitForm" class="space-y-8">
              <!-- Vos informations -->
              <div>
                <h3 class="text-xl md:text-2xl font-semibold text-primary mb-5 flex items-center gap-2">
                  <i class="fas fa-user text-secondary"></i>
                  Vos informations
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-foreground/80 font-medium mb-2">
                      Nom <span class="text-secondary">*</span>
                    </label>
                    <input v-model="form.lastName" type="text" required placeholder="Votre nom"
                      class="w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all" />
                  </div>
                  <div>
                    <label class="block text-foreground/80 font-medium mb-2">
                      Prénom <span class="text-secondary">*</span>
                    </label>
                    <input v-model="form.firstName" type="text" required placeholder="Votre prénom"
                      class="w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all" />
                  </div>
                  <div class="md:col-span-2">
                    <label class="block text-foreground/80 font-medium mb-2">
                      Numéro de paiement Mobile Money
                      <span class="text-secondary">*</span>
                    </label>
                    <input v-model="form.phone" type="tel" required placeholder="6XX XXX XXX"
                      class="w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all" />
                  </div>
                </div>
              </div>

              <!-- Quand souhaitez-vous visiter ? -->
              <div>
                <h3 class="text-xl md:text-2xl font-semibold text-primary mb-5 flex items-center gap-2">
                  <i class="fas fa-calendar-alt text-secondary"></i>
                  Quand souhaitez-vous visiter ?
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-foreground/80 font-medium mb-2">
                      Date <span class="text-secondary">*</span>
                    </label>
                    <input v-model="form.date" type="date" required :min="minDate"
                      class="w-full px-4 py-3 border border-border rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all" />
                  </div>
                  <div>
                    <label class="block text-foreground/80 font-medium mb-2">
                      Créneau <span class="text-secondary">*</span>
                    </label>
                    <div class="grid grid-cols-2 gap-3">
                      <button v-for="slot in timeSlots" :key="slot.value" type="button" @click="form.time = slot.value"
                        :class="[
                          'py-3 text-center border rounded-xl cursor-pointer transition-all text-sm font-medium',
                          form.time === slot.value
                            ? 'bg-secondary text-white border-secondary shadow-md'
                            : 'bg-muted/50 border-border hover:border-secondary hover:text-secondary text-foreground/70',
                        ]">
                        {{ slot.label }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Paiement des frais de visite -->
              <div class="bg-muted/40 rounded-2xl p-6 border border-border">
                <h3 class="text-xl md:text-2xl font-bold text-primary mb-5 flex items-center gap-2">
                  <i class="fas fa-credit-card text-secondary"></i>
                  Paiement des frais de visite
                </h3>

                <!-- Récapitulatif -->
                <div class="space-y-3 mb-6">
                  <div class="flex justify-between text-foreground/80">
                    <span>Frais accompagnement & carburant</span>
                    <span class="font-bold">10 FCFA</span>
                  </div>
                  <hr class="border-border" />
                  <div class="flex justify-between text-lg font-bold text-secondary">
                    <span>Total</span>
                    <span>10 FCFA</span>
                  </div>
                </div>

                <!-- Mode de paiement -->
                <div class="mb-6">
                  <label class="block text-foreground/80 font-medium mb-3">Mode de paiement</label>
                  <div class="grid grid-cols-2 gap-4">
                    <button type="button" @click="form.paymentMethod = 'orange'" :class="[
                      'border-2 rounded-2xl py-5 flex flex-col items-center transition-all',
                      form.paymentMethod === 'orange'
                        ? 'border-secondary bg-secondary/10 shadow-md'
                        : 'border-border hover:border-secondary/50 bg-card',
                    ]">
                      <div class="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center mb-2">
                        <i class="fas fa-mobile-alt text-white text-lg"></i>
                      </div>
                      <span class="font-semibold text-foreground">Orange Money</span>
                    </button>
                    <button type="button" @click="form.paymentMethod = 'mtn'" :class="[
                      'border-2 rounded-2xl py-5 flex flex-col items-center transition-all',
                      form.paymentMethod === 'mtn'
                        ? 'border-secondary bg-secondary/10 shadow-md'
                        : 'border-border hover:border-secondary/50 bg-card',
                    ]">
                      <div class="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center mb-2">
                        <i class="fas fa-mobile-alt text-yellow-900 text-lg"></i>
                      </div>
                      <span class="font-semibold text-foreground">MTN MoMo</span>
                    </button>
                  </div>
                </div>

                <!-- Confirmation SMS + Checkbox -->
                <div class="text-sm text-foreground/70 mb-6">
                  <p class="mb-3">
                    <i class="fas fa-sms text-secondary mr-2"></i>
                    Confirmation par <strong>SMS</strong> après paiement
                  </p>
                  <label class="flex items-start gap-3 cursor-pointer">
                    <input v-model="form.agree" type="checkbox" required
                      class="mt-1 h-5 w-5 rounded border-border text-secondary focus:ring-secondary" />
                    <span>
                      J'accepte payer <strong>10 FCFA</strong> immédiatement
                      (non remboursable sauf annulation 48h avant)
                    </span>
                  </label>
                </div>

                <!-- Messages -->
                <div v-if="error" class="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
                  <i class="fas fa-exclamation-circle mr-2"></i>{{ error }}
                </div>
                <div v-if="success"
                  class="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm">
                  <i class="fas fa-check-circle mr-2"></i>{{ success }}
                </div>

                <!-- Bouton soumettre -->
                <button type="submit" :disabled="isLoading"
                  class="w-full bg-secondary hover:bg-primary text-white font-bold py-5 rounded-2xl text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed px-2">
                  <span v-if="!isLoading">
                    <i class="fas fa-lock mr-3"></i>
                    PAYER 10 FCFA ET RÉSERVER
                  </span>
                  <span v-else class="flex items-center gap-3">
                    <i class="fas fa-spinner animate-spin"></i>
                    Traitement en cours...
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- ===================== SIDEBAR ===================== -->
        <div class="lg:w-1/3 space-y-6">
          <!-- Informations importantes (desktop) -->
          <div class="hidden lg:block bg-card rounded-2xl p-6 shadow-sm border border-border">
            <h3 class="text-lg font-bold text-primary mb-4 flex items-center gap-2">
              <i class="fas fa-info-circle text-secondary"></i>
              Informations importantes
            </h3>
            <ul class="space-y-4 text-foreground/70 text-sm">
              <li class="flex items-start gap-3">
                <i class="fas fa-clock text-secondary mt-0.5"></i>
                <span>Lun-Ven : 8h-18h, Sam : 9h-13h</span>
              </li>
              <li class="flex items-start gap-3">
                <i class="fas fa-map-marker-alt text-secondary mt-0.5"></i>
                <span>Rue 1.234, Quartier Bastos, Yaoundé</span>
              </li>
              <li class="flex items-start gap-3">
                <i class="fas fa-phone-alt text-secondary mt-0.5"></i>
                <span>+237 6XX XX XX XX</span>
              </li>
            </ul>
          </div>

          <!-- Infos importantes (mobile) -->
          <div class="lg:hidden bg-card rounded-2xl p-5 shadow-sm border border-border">
            <h3 class="text-base font-semibold text-primary mb-1 flex justify-between items-center">
              Infos importantes
              <i class="fas fa-chevron-down text-secondary"></i>
            </h3>
            <p class="text-sm text-foreground/60">
              Horaires 8h-18h • Bastos • Paiement sécurisé
            </p>
          </div>

          <!-- Déroulement -->
          <div class="hidden lg:block bg-card rounded-2xl p-6 shadow-sm border border-border">
            <h3 class="text-lg font-bold text-primary mb-4 flex items-center gap-2">
              <i class="fas fa-list-ol text-secondary"></i>
              Déroulement
            </h3>
            <ol class="space-y-4 text-foreground/70 text-sm">
              <li class="flex items-start gap-3">
                <div
                  class="w-7 h-7 bg-secondary/10 text-secondary rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0">
                  1
                </div>
                <span>Paiement & soumission du formulaire</span>
              </li>
              <li class="flex items-start gap-3">
                <div
                  class="w-7 h-7 bg-secondary/10 text-secondary rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0">
                  2
                </div>
                <span>Confirmation par SMS dans les 2h</span>
              </li>
              <li class="flex items-start gap-3">
                <div
                  class="w-7 h-7 bg-secondary/10 text-secondary rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0">
                  3
                </div>
                <span>Visite sur place avec notre agent</span>
              </li>
            </ol>
          </div>

          <!-- À noter -->
          <div class="hidden lg:block bg-primary rounded-2xl p-6 shadow-sm text-white">
            <h3 class="text-lg font-bold mb-4 flex items-center gap-2">
              <i class="fas fa-exclamation-circle"></i>
              À noter
            </h3>
            <ul class="space-y-3 text-sm text-white/90">
              <li class="flex items-start gap-3">
                <i class="fas fa-check text-white/70 mt-0.5"></i>
                <span>Arrivez 10 min avant l'heure prévue</span>
              </li>
              <li class="flex items-start gap-3">
                <i class="fas fa-check text-white/70 mt-0.5"></i>
                <span>Pièce d'identité obligatoire</span>
              </li>
              <li class="flex items-start gap-3">
                <i class="fas fa-check text-white/70 mt-0.5"></i>
                <span>Non remboursable sauf annulation 48h avant</span>
              </li>
            </ul>
          </div>

          <!-- Garanties -->
          <div class="bg-card rounded-2xl p-6 shadow-sm border border-border">
            <div class="grid grid-cols-3 gap-4 text-center">
              <div>
                <i class="fas fa-shield-alt text-secondary text-2xl mb-2 block"></i>
                <p class="text-xs text-foreground/70 font-medium">
                  Paiement sécurisé
                </p>
              </div>
              <div>
                <i class="fas fa-sms text-secondary text-2xl mb-2 block"></i>
                <p class="text-xs text-foreground/70 font-medium">
                  Confirmation SMS
                </p>
              </div>
              <div>
                <i class="fas fa-headset text-secondary text-2xl mb-2 block"></i>
                <p class="text-xs text-foreground/70 font-medium">
                  Support 24/7
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth";
import axios from "../../axios";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const isLoading = ref(false);
const isLoadingProperty = ref(true);
const error = ref("");
const success = ref("");

const property = ref({
  title: "Chargement...",
  location: "...",
  price: 0,
});

const form = ref({
  property_id: route.query.property_id || null,
  lastName: authStore.user?.name?.split(" ").slice(1).join(" ") || "",
  firstName: authStore.user?.name?.split(" ")[0] || "",
  phone: authStore.user?.phone || "",
  date: "",
  time: "09:00",
  paymentMethod: "orange",
  agree: false,
});

const fetchProperty = async () => {
  if (!form.value.property_id) {
    error.value = "Aucun bien sélectionné.";
    isLoadingProperty.value = false;
    return;
  }
  try {
    const { data } = await axios.get(
      `/api/properties/${form.value.property_id}`,
    );
    if (data.success) {
      property.value = data.data;
    }
  } catch (err) {
    console.error("Erreur chargement propriété:", err);
    error.value = "Impossible de charger les détails du bien.";
  } finally {
    isLoadingProperty.value = false;
  }
};

onMounted(fetchProperty);

const timeSlots = [
  { value: "09:00", label: "09:00 - 10:00" },
  { value: "10:30", label: "10:30 - 11:30" },
  { value: "14:00", label: "14:00 - 15:00" },
  { value: "15:30", label: "15:30 - 16:30" },
];

const minDate = computed(() => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
});

const formatPrice = (price) => {
  return new Intl.NumberFormat("fr-FR").format(price);
};

const submitForm = async () => {
  error.value = "";
  success.value = "";

  if (!form.value.lastName || !form.value.firstName || !form.value.phone) {
    error.value = "Veuillez remplir toutes vos informations personnelles.";
    return;
  }
  if (!form.value.date) {
    error.value = "Veuillez sélectionner une date de visite.";
    return;
  }
  if (!form.value.agree) {
    error.value = "Vous devez accepter les conditions de paiement.";
    return;
  }

  isLoading.value = true;
  try {
    const scheduled_at = `${form.value.date} ${form.value.time}:00`;

    const payload = {
      property_id: form.value.property_id,
      scheduled_at: scheduled_at,
      notes: `Mode paiement: ${form.value.paymentMethod}`,
    };

    const { data: bookData } = await axios.post(
      "/api/prospect/visits",
      payload,
    );

    if (bookData.success) {
      success.value = "Visite réservée ! Redirection vers le paiement...";

      // Initier le paiement immédiatement
      try {
        const { data: payData } = await axios.post(
          `/api/prospect/visits/${bookData.data.id}/pay`,
        );
        if (payData.success && payData.redirect_url) {
          window.location.href = payData.redirect_url;
        } else {
          router.push({
            name: "MonSuivi",
            query: { property_id: form.value.property_id },
          });
        }
      } catch (payErr) {
        console.error("Erreur init paiement:", payErr);
        // Au moins la visite est réservée
        router.push({
          name: "MonSuivi",
          query: { property_id: form.value.property_id },
        });
      }
    }
  } catch (err) {
    console.error("Erreur réservation:", err);
    error.value =
      err.response?.data?.message ||
      "Une erreur est survenue lors de la réservation.";
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.animate-spin {
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
