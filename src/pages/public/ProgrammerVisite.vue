<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête propriété (inchangé) -->
      <div class="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-8 border border-gray-100">
        <div class="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div v-if="property.image" class="w-full md:w-48 h-32 rounded-2xl overflow-hidden shadow-md flex-shrink-0">
            <img :src="property.image" :alt="property.title" class="w-full h-full object-cover">
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2 flex-wrap">
              <span :class="[
                'text-xs font-semibold px-3 py-1 rounded-full',
                property.type === 'rent' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
              ]">
                {{ property.type === 'rent' ? 'À louer' : 'À vendre' }}
              </span>
              <span v-if="property.category" class="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                {{ property.category }}
              </span>
              <span v-if="property.etat" class="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                {{ property.etat }}
              </span>
              <span class="text-gray-400 text-xs">Réf: {{ property.slug?.substring(0, 8) || 'N/A' }}</span>
            </div>
            <h1 class="text-3xl md:text-4xl font-light text-gray-900 mb-2">{{ property.title }}</h1>
            <div class="flex items-center text-gray-500 mb-3">
              <i class="fas fa-map-marker-alt text-amber-600 mr-2"></i>
              <span>{{ property.location }} · {{ property.city }}, {{ property.region }}</span>
            </div>
            <div class="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
              <span v-if="property.bedrooms"><i class="fas fa-bed mr-1"></i>{{ property.bedrooms }} chambres</span>
              <span v-if="property.bathrooms"><i class="fas fa-bath mr-1"></i>{{ property.bathrooms }} sdb</span>
              <span v-if="property.area"><i class="fas fa-vector-square mr-1"></i>{{ property.area }} m²</span>
            </div>
            <div class="text-3xl md:text-4xl font-bold text-amber-700">
              {{ formatPrice(property.price) }} FCFA
            </div>
          </div>
          <div class="md:text-right">
            <p class="text-sm text-gray-400">Programmez votre visite</p>
            <p class="text-xs text-gray-300">Frais de visite : 10 FCFA</p>
          </div>
        </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- ========== FORMULAIRE SIMPLIFIÉ ========== -->
        <div class="lg:w-2/3">
          <div class="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-gray-100">
            <form @submit.prevent="submitForm" class="space-y-8">
              <!-- Section unique : Choix de la date et créneau -->
              <div>
                <h3 class="text-xl font-light text-gray-700 mb-6 flex items-center gap-3 border-b border-gray-100 pb-3">
                  <span class="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 text-sm">1</span>
                  <span class="font-medium">Quand souhaitez-vous visiter ?</span>
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">
                      Date <span class="text-amber-600">*</span>
                    </label>
                    <input v-model="form.date" type="date" required :min="minDate"
                      class="w-full px-5 py-3 border border-gray-200 rounded-xl bg-gray-50/50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent transition-all" />
                  </div>
                  <div>
                    <label class="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">
                      Créneau <span class="text-amber-600">*</span>
                    </label>
                    <div class="grid grid-cols-2 gap-3">
                      <button v-for="slot in timeSlots" :key="slot.value" type="button" @click="form.time = slot.value"
                        :class="[
                          'py-3 px-2 text-sm border rounded-xl transition-all duration-200',
                          form.time === slot.value
                            ? 'bg-amber-600 text-white border-amber-600 shadow-md'
                            : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-amber-300 hover:bg-amber-50',
                        ]">
                        {{ slot.label }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Section Paiement (simplifiée, sans choix opérateur) -->
              <div class="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
                <h3 class="text-xl font-light text-gray-700 mb-6 flex items-center gap-3">
                  <span class="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center text-white text-sm">2</span>
                  <span class="font-medium">Paiement sécurisé</span>
                </h3>

                <!-- Récapitulatif frais -->
                <div class="bg-white/80 rounded-xl p-5 mb-6 shadow-sm">
                  <div class="flex justify-between items-center text-gray-600 mb-2">
                    <span>Frais d'accompagnement et carburant</span>
                    <span class="font-semibold">10 FCFA</span>
                  </div>
                  <hr class="border-amber-100 my-3" />
                  <div class="flex justify-between items-center text-lg font-bold text-amber-800">
                    <span>Total à payer</span>
                    <span>10 FCFA</span>
                  </div>
                </div>

                <!-- Confirmation et conditions -->
                <div class="text-sm text-gray-500 mb-6">
                  <p class="mb-3 flex items-center gap-2">
                    <i class="fas fa-sms text-amber-600"></i>
                    Confirmation par SMS immédiate après paiement
                  </p>
                  <label class="flex items-start gap-3 cursor-pointer">
                    <input v-model="form.agree" type="checkbox" required
                      class="mt-1 h-5 w-5 rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
                    <span class="text-gray-600">
                      J'accepte de payer <strong class="text-amber-700">10 FCFA</strong> (frais non remboursables sauf annulation 48h avant)
                    </span>
                  </label>
                </div>

                <!-- Messages d'état -->
                <div v-if="error" class="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm flex items-center gap-2">
                  <i class="fas fa-exclamation-circle"></i>{{ error }}
                </div>
                <div v-if="success" class="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm flex items-center gap-2">
                  <i class="fas fa-check-circle"></i>{{ success }}
                </div>

                <!-- Bouton de paiement -->
                <button type="submit" :disabled="isLoading"
                  class="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold py-5 rounded-2xl text-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group">
                  <span v-if="!isLoading">
                    <i class="fas fa-lock mr-3"></i>
                    Payer 10 FCFA et réserver
                  </span>
                  <span v-else class="flex items-center gap-3">
                    <i class="fas fa-spinner animate-spin"></i>
                    Traitement...
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- ========== SIDEBAR AVEC DONNÉES RÉELLES ========== -->
        <div class="lg:w-1/3 space-y-6">
          <!-- Bloc contact propriétaire/agent -->
          <div v-if="property.owner" class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <i class="fas fa-user-circle text-amber-600"></i>
              Votre contact
            </h3>
            <div class="flex items-center gap-4 mb-4">
              <div class="w-12 h-12 rounded-full overflow-hidden bg-amber-100">
                <img :src="property.owner.avatar_url || property.owner.avatar" :alt="property.owner.name" class="w-full h-full object-cover">
              </div>
              <div>
                <p class="font-medium text-gray-800">{{ property.owner.name }}</p>
                <p class="text-xs text-gray-400">Propriétaire / Agent</p>
              </div>
            </div>
            <a :href="'tel:' + property.owner.phone" class="block w-full bg-amber-50 hover:bg-amber-100 text-amber-800 font-medium py-3 rounded-xl text-center transition">
              <i class="fas fa-phone mr-2"></i> {{ property.owner.phone || '+237 6XX XXX XXX' }}
            </a>
          </div>

   

          <!-- Déroulement -->
          <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <i class="fas fa-list-ol text-amber-600"></i>
              Déroulement
            </h3>
            <ol class="space-y-4">
              <li class="flex items-start gap-3">
                <div class="w-7 h-7 bg-amber-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                <div>
                  <p class="font-medium text-gray-800">Paiement sécurisé</p>
                  <p class="text-xs text-gray-400">10 FCFA par Mobile Money</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-7 h-7 bg-amber-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                <div>
                  <p class="font-medium text-gray-800">Confirmation SMS</p>
                  <p class="text-xs text-gray-400">Sous 2h, votre créneau est réservé</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <div class="w-7 h-7 bg-amber-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                <div>
                  <p class="font-medium text-gray-800">Visite sur place</p>
                  <p class="text-xs text-gray-400">Un agent vous accueille</p>
                </div>
              </li>
            </ol>
          </div>

          <!-- À noter -->
          <div class="bg-gradient-to-br from-amber-600 to-amber-700 rounded-2xl shadow-lg p-6 text-white">
            <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
              <i class="fas fa-exclamation-circle"></i>
              À noter
            </h3>
            <ul class="space-y-3 text-sm text-white/90">
              <li class="flex items-start gap-3">
                <i class="fas fa-check text-white/70 mt-0.5"></i>
                <span>Arrivez 10 minutes avant</span>
              </li>
              <li class="flex items-start gap-3">
                <i class="fas fa-check text-white/70 mt-0.5"></i>
                <span>Pièce d'identité obligatoire</span>
              </li>
              <li class="flex items-start gap-3">
                <i class="fas fa-check text-white/70 mt-0.5"></i>
                <span>Annulation gratuite 48h avant</span>
              </li>
            </ul>
          </div>

          <!-- Garanties -->
          <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div class="grid grid-cols-3 gap-4 text-center">
              <div>
                <div class="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 mx-auto mb-2">
                  <i class="fas fa-shield-alt text-xl"></i>
                </div>
                <p class="text-xs text-gray-600 font-medium">Paiement sécurisé</p>
              </div>
              <div>
                <div class="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 mx-auto mb-2">
                  <i class="fas fa-sms text-xl"></i>
                </div>
                <p class="text-xs text-gray-600 font-medium">Confirmation SMS</p>
              </div>
              <div>
                <div class="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 mx-auto mb-2">
                  <i class="fas fa-headset text-xl"></i>
                </div>
                <p class="text-xs text-gray-600 font-medium">Support 24/7</p>
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
  type: "rent",
  category: "",
  etat: "",
  bedrooms: null,
  bathrooms: null,
  area: null,
  image: null,
  slug: "",
  city: "",
  region: "",
  features: [],
  owner: null,
});

// Les coordonnées sont pré-remplies depuis le store, l'utilisateur ne les voit pas
// Le mode de paiement est fixé à "orange" par défaut
const form = ref({
  slug: route.query.slug || null,
  lastName: authStore.user?.name?.split(" ").slice(1).join(" ") || "",
  firstName: authStore.user?.name?.split(" ")[0] || "",
  phone: authStore.user?.phone || "",
  date: "",
  time: "09:00",
  paymentMethod: "orange",
  agree: false,
});

const fetchProperty = async () => {
  if (!form.value.slug) {
    error.value = "Aucun bien sélectionné.";
    isLoadingProperty.value = false;
    return;
  }
  try {
    const { data } = await axios.get(`/api/properties/${form.value.slug}`);
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

  // Les champs lastName, firstName, phone sont pré-remplis, mais on peut les valider
 
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
    property_id  : route.query.property_id, 
      slug: form.value.slug,
      scheduled_at: scheduled_at,
      notes: `Mode paiement: ${form.value.paymentMethod}`,
    };

    const { data: bookData } = await axios.post(
      "/api/prospect/visits",
      payload,
    );

    if (bookData.success) {
      success.value = "Visite réservée ! Redirection vers le paiement...";

      try {
        const { data: payData } = await axios.post(
          `/api/prospect/visits/${bookData.data.id}/pay`,
        );
        if (payData.success && payData.redirect_url) {
          window.location.href = payData.redirect_url;
        } else {
          router.push({
            name: "MonSuivi",
            query: { slug: form.value.slug },
          });
        }
      } catch (payErr) {
        console.error("Erreur init paiement:", payErr);
        router.push({
          name: "MonSuivi",
          query: { slug: form.value.slug },
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