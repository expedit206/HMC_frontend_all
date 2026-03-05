<template>
  <div class="py-8 sm:py-12 px-4 sm:px-6 bg-[#FAF9F5]">
    <div class="max-w-2xl mx-auto">
      <!-- HERO SECTION -->
      <div class="mb-12 text-center animate-fadeIn">
        <div
          class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E54801] to-[#913327] mb-6 shadow-lg"
        >
          <i class="fas fa-user-tie text-3xl text-white"></i>
        </div>
        <h1 class="text-3xl sm:text-4xl font-bold text-[#1B0B38] mb-3">
          Devenir Agent Immobilier
        </h1>
        <p class="text-gray-600 text-base sm:text-lg">
          Rejoignez le réseau Home Cameroon et lancez votre carrière immobilière
        </p>
      </div>

      <!-- PROGRESS INDICATOR -->
      <div
        class="mb-12 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-slide-up"
      >
        <div class="flex justify-between mb-4 relative">
          <!-- Step 1 -->
          <div class="text-center flex-1 z-10 relative">
            <div
              class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-2 bg-gradient-to-br from-[#E54801] to-[#913327] shadow-md"
            >
              <i class="fas fa-check text-lg"></i>
            </div>
            <p class="text-xs font-medium text-gray-600">Étape 1</p>
            <p class="text-xs text-gray-500">Candidature</p>
          </div>

          <!-- Connector 1-2 -->
          <div
            class="flex-1 flex items-center justify-center px-2 absolute left-[16%] top-5 w-[34%] -z-0"
          >
            <div class="h-1 w-full bg-gray-200 rounded-full"></div>
          </div>

          <!-- Step 2 -->
          <div class="text-center flex-1 z-10 relative">
            <div
              class="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 font-bold mx-auto mb-2 bg-gray-200"
            >
              2
            </div>
            <p class="text-xs font-medium text-gray-600">Étape 2</p>
            <p class="text-xs text-gray-500">Formation</p>
          </div>

          <!-- Connector 2-3 -->
          <div
            class="flex-1 flex items-center justify-center px-2 absolute right-[16%] top-5 w-[34%] -z-0"
          >
            <div class="h-1 w-full bg-gray-200 rounded-full"></div>
          </div>

          <!-- Step 3 -->
          <div class="text-center flex-1 z-10 relative">
            <div
              class="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 font-bold mx-auto mb-2 bg-gray-200"
            >
              3
            </div>
            <p class="text-xs font-medium text-gray-600">Étape 3</p>
            <p class="text-xs text-gray-500">Accepté</p>
          </div>
        </div>
      </div>

      <!-- INFO BOX -->
      <div
        class="mb-10 bg-[#E54801]/5 border border-[#E54801]/20 rounded-2xl p-6 animate-slide-up"
        style="animation-delay: 0.1s"
      >
        <div class="flex gap-4">
          <div class="flex-shrink-0">
            <i class="fas fa-info-circle text-[#E54801] text-xl mt-0.5"></i>
          </div>
          <div>
            <h3 class="font-semibold text-[#1B0B38] mb-1">
              Ce que vous devez savoir
            </h3>
            <ul class="text-sm text-gray-700 space-y-1">
              <li>
                <i class="fas fa-check text-green-500 mr-2"></i> Formation
                obligatoire et payante (50 000 FCFA)
              </li>
              <li>
                <i class="fas fa-check text-green-500 mr-2"></i> Accès immédiat
                après paiement
              </li>
              <li>
                <i class="fas fa-check text-green-500 mr-2"></i> Certification
                reconnue dans toute l'Afrique
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- REGISTRATION FORM -->
      <form
        @submit.prevent="handleSubmit"
        class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 space-y-8 animate-slide-up"
        style="animation-delay: 0.2s"
      >
        <!-- SECTION 1: INFORMATIONS PERSONNELLES -->
        <div>
          <h2
            class="text-lg sm:text-xl font-bold text-[#1B0B38] mb-6 flex items-center gap-2"
          >
            <i class="fas fa-user-circle text-[#E54801] text-2xl"></i>
            Informations Personnelles
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Prénom</label
              >
              <input
                v-model="form.firstName"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E54801] focus:border-transparent outline-none transition-all"
                placeholder="Jean"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Nom de famille</label
              >
              <input
                v-model="form.lastName"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E54801] focus:border-transparent outline-none transition-all"
                placeholder="Dupont"
              />
            </div>
          </div>

          <div class="mt-4">
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Email</label
            >
            <input
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E54801] focus:border-transparent outline-none transition-all"
              placeholder="jean@example.com"
            />
          </div>

          <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Téléphone</label
              >
              <input
                v-model="form.phone"
                type="tel"
                required
                class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E54801] focus:border-transparent outline-none transition-all"
                placeholder="+237 6 XX XX XX XX"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Date de naissance</label
              >
              <input
                v-model="form.birthDate"
                type="date"
                required
                class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E54801] focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <hr class="border-gray-100" />

        <!-- SECTION 2: EXPÉRIENCE PROFESSIONNELLE -->
        <div>
          <h2
            class="text-lg sm:text-xl font-bold text-[#1B0B38] mb-6 flex items-center gap-2"
          >
            <i class="fas fa-briefcase text-[#E54801] text-2xl"></i>
            Expérience Professionnelle
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Années d'expérience</label
              >
              <select
                v-model="form.experience"
                required
                class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E54801] focus:border-transparent outline-none transition-all bg-white"
              >
                <option value="">Sélectionner</option>
                <option value="0-1">Moins d'1 an</option>
                <option value="1-3">1 à 3 ans</option>
                <option value="3-5">3 à 5 ans</option>
                <option value="5-10">5 à 10 ans</option>
                <option value="10+">Plus de 10 ans</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Secteur d'activité</label
              >
              <select
                v-model="form.sector"
                required
                class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E54801] focus:border-transparent outline-none transition-all bg-white"
              >
                <option value="">Sélectionner</option>
                <option value="immobilier">Immobilier</option>
                <option value="ventes">Ventes</option>
                <option value="service">Services</option>
                <option value="autre">Autre</option>
              </select>
            </div>
          </div>

          <div class="mt-4">
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Principale région d'activité</label
            >
            <select
              v-model="form.city"
              required
              class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E54801] focus:border-transparent outline-none transition-all bg-white"
            >
              <option value="">Sélectionner une région</option>
              <option value="douala">Douala</option>
              <option value="yaounde">Yaoundé</option>
              <option value="buea">Buea</option>
              <option value="bamenda">Bamenda</option>
              <option value="limbe">Limbe</option>
              <option value="autre">Autre région</option>
            </select>
          </div>

          <div class="mt-4">
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Certificat de travail (optionnel)</label
            >
            <div
              class="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-[#E54801] hover:bg-orange-50 transition-colors group"
              @click="triggerFileUpload"
            >
              <div v-if="!uploadedFileName">
                <i
                  class="fas fa-cloud-upload-alt text-3xl text-[#E54801] mb-2 group-hover:scale-110 transition-transform"
                ></i>
                <p class="text-sm font-medium text-gray-700">
                  Cliquez pour télécharger un fichier
                </p>
                <p class="text-xs text-gray-500">PDF, DOC (max 5MB)</p>
              </div>
              <div v-else>
                <i class="fas fa-check-circle text-3xl text-green-500 mb-2"></i>
                <p class="text-sm font-medium text-green-700">
                  {{ uploadedFileName }}
                </p>
                <p class="text-xs text-green-600">Fichier chargé avec succès</p>
              </div>
              <input
                type="file"
                ref="fileInput"
                class="hidden"
                accept=".pdf,.doc,.docx"
                @change="handleFileUpload"
              />
            </div>
          </div>
        </div>

        <hr class="border-gray-100" />

        <!-- SECTION 3: MOTIVATION ET OBJECTIFS -->
        <div>
          <h2
            class="text-lg sm:text-xl font-bold text-[#1B0B38] mb-6 flex items-center gap-2"
          >
            <i class="fas fa-star text-[#E54801] text-2xl"></i>
            Motivation et Objectifs
          </h2>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Pourquoi souhaitez-vous rejoindre Home Cameroon ?</label
            >
            <textarea
              v-model="form.motivation"
              rows="4"
              required
              class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E54801] focus:border-transparent outline-none transition-all resize-none"
              placeholder="Décrivez vos motivations..."
            ></textarea>
            <p class="text-xs text-gray-500 mt-1">Minimum 50 caractères</p>
          </div>

          <div class="mt-6">
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Votre objectif de revenus annuels</label
            >
            <select
              v-model="form.revenue"
              required
              class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E54801] focus:border-transparent outline-none transition-all bg-white"
            >
              <option value="">Sélectionner</option>
              <option value="2-5">2 à 5 millions FCFA</option>
              <option value="5-10">5 à 10 millions FCFA</option>
              <option value="10-20">10 à 20 millions FCFA</option>
              <option value="20+">Plus de 20 millions FCFA</option>
            </select>
          </div>

          <div class="mt-6">
            <label class="block text-sm font-medium text-gray-700 mb-3"
              >Connaissances des technologies</label
            >
            <div class="space-y-2">
              <label
                class="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
              >
                <input
                  type="checkbox"
                  v-model="form.tech"
                  value="crm"
                  class="w-4 h-4 text-[#E54801] rounded border-gray-300 focus:ring-[#E54801]"
                />
                <span class="ml-3 text-sm text-gray-700"
                  >CRM (Gestion de clients)</span
                >
              </label>
              <label
                class="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
              >
                <input
                  type="checkbox"
                  v-model="form.tech"
                  value="marketing"
                  class="w-4 h-4 text-[#E54801] rounded border-gray-300 focus:ring-[#E54801]"
                />
                <span class="ml-3 text-sm text-gray-700"
                  >Marketing digital</span
                >
              </label>
              <label
                class="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
              >
                <input
                  type="checkbox"
                  v-model="form.tech"
                  value="video"
                  class="w-4 h-4 text-[#E54801] rounded border-gray-300 focus:ring-[#E54801]"
                />
                <span class="ml-3 text-sm text-gray-700">Production vidéo</span>
              </label>
            </div>
          </div>
        </div>

        <hr class="border-gray-100" />

        <!-- SECTION 4: CONDITIONS -->
        <div>
          <h2
            class="text-lg sm:text-xl font-bold text-[#1B0B38] mb-6 flex items-center gap-2"
          >
            <i class="fas fa-check-circle text-[#E54801] text-2xl"></i>
            Conditions d'Adhésion
          </h2>

          <div class="space-y-4">
            <label
              class="flex items-start cursor-pointer p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition hover:border-[#E54801]"
            >
              <input
                type="checkbox"
                v-model="form.acceptTerms"
                required
                class="w-5 h-5 text-[#E54801] rounded mt-0.5 border-gray-300 focus:ring-[#E54801]"
              />
              <span class="ml-3">
                <span class="block text-sm font-medium text-gray-900"
                  >J'accepte les conditions d'adhésion</span
                >
                <span class="text-xs text-gray-600"
                  >Veuillez accepter nos conditions pour continuer</span
                >
              </span>
            </label>

            <label
              class="flex items-start cursor-pointer p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition hover:border-[#E54801]"
            >
              <input
                type="checkbox"
                v-model="form.acceptTraining"
                required
                class="w-5 h-5 text-[#E54801] rounded mt-0.5 border-gray-300 focus:ring-[#E54801]"
              />
              <span class="ml-3">
                <span class="block text-sm font-medium text-gray-900"
                  >Je m'engage à suivre la formation payante (50 000 FCFA)</span
                >
                <span class="text-xs text-gray-600"
                  >Formation obligatoire et paiement non remboursable</span
                >
              </span>
            </label>

            <label
              class="flex items-start cursor-pointer p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition hover:border-[#E54801]"
            >
              <input
                type="checkbox"
                v-model="form.acceptDataPolicy"
                required
                class="w-5 h-5 text-[#E54801] rounded mt-0.5 border-gray-300 focus:ring-[#E54801]"
              />
              <span class="ml-3">
                <span class="block text-sm font-medium text-gray-900"
                  >J'accepte la politique de confidentialité</span
                >
                <span class="text-xs text-gray-600"
                  >Vos données seront traitées en toute confidentialité</span
                >
              </span>
            </label>
          </div>
        </div>

        <!-- ACTION BUTTONS -->
        <div class="flex flex-col sm:flex-row gap-3 pt-6">
          <RouterLink
            :to="{ name: 'ClientDashboard' }"
            class="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition text-center flex items-center justify-center"
          >
            Annuler
          </RouterLink>
          <button
            type="submit"
            :disabled="loading"
            class="flex-1 px-6 py-3 bg-gradient-to-r from-[#E54801] to-[#913327] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <span v-if="loading"
              ><i class="fas fa-spinner fa-spin"></i> Traitement...</span
            >
            <span v-else
              ><i class="fas fa-paper-plane mr-2"></i> Soumettre ma
              candidature</span
            >
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter, RouterLink } from "vue-router";

const router = useRouter();
const loading = ref(false);
const fileInput = ref(null);
const uploadedFileName = ref("");

const form = reactive({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: "",
  experience: "",
  sector: "",
  city: "",
  motivation: "",
  revenue: "",
  tech: [],
  acceptTerms: false,
  acceptTraining: false,
  acceptDataPolicy: false,
});

const triggerFileUpload = () => {
  fileInput.value.click();
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    uploadedFileName.value = file.name;
  }
};

const handleSubmit = async () => {
  if (form.motivation.length < 50) {
    alert("Veuillez écrire au moins 50 caractères pour votre motivation");
    return;
  }

  loading.value = true;

  // Simulate API call
  setTimeout(() => {
    loading.value = false;
    alert(
      "✓ Votre dossier a été soumis avec succès !\n\nVous serez contacté sous 48h pour la formation obligatoire.",
    );
    router.push({ name: 'ClientDashboard' });
  }, 1500);
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
