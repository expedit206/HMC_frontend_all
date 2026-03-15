<template>
  <div class="bg-[#FAF9F5] min-h-screen py-8 px-4">
    <div class="max-w-2xl mx-auto">
      <!-- En-tête -->
      <div class="mb-6">
        <router-link
          :to="backLink"
          class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#E54801] transition-colors mb-4"
        >
          <i class="fas fa-arrow-left"></i> Retour au suivi
        </router-link>
        <h1 class="text-2xl font-black text-[#1B0B38]">
          Soumettre mon dossier
        </h1>
        <p class="text-sm text-gray-500 mt-1">
          Complétez votre dossier pour finaliser votre demande de location
        </p>
      </div>

      <!-- Page de succès -->
      <Transition name="fade">
        <div
          v-if="submitted"
          class="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center"
        >
          <div
            class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-once"
          >
            <i class="fas fa-check-circle text-4xl text-green-500"></i>
          </div>
          <h2 class="text-2xl font-black text-[#1B0B38] mb-2">
            Dossier soumis !
          </h2>
          <p class="text-gray-500 mb-2">
            Votre dossier est en cours d'examen par l'agent HomeCameroon.
          </p>
          <p
            class="text-sm text-blue-600 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mb-8 max-w-sm mx-auto"
          >
            <i class="fas fa-info-circle mr-2"></i>
            Vous serez notifié par SMS dès que votre dossier sera traité.
          </p>
          <router-link
            :to="backLink"
            class="inline-flex items-center gap-2 px-6 py-3 bg-[#E54801] text-white font-bold rounded-xl hover:bg-[#c73d01] transition-colors"
          >
            <i class="fas fa-eye"></i> Suivre mon dossier
          </router-link>
        </div>
      </Transition>

      <!-- Formulaire -->
      <div v-if="!submitted" class="space-y-5">
        <!-- Bien concerné -->
        <div
          v-if="property"
          class="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-center gap-3"
        >
          <div
            class="w-12 h-12 bg-[#E54801]/10 rounded-xl flex items-center justify-center flex-shrink-0"
          >
            <i class="fas fa-home text-xl text-[#E54801]"></i>
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-black text-[#1B0B38] truncate text-sm">
              {{ property.title }}
            </p>
            <p class="text-xs text-gray-500">{{ property.location }}</p>
          </div>
          <p class="font-black text-[#E54801] text-sm flex-shrink-0">
            {{ formatPrice(property.price) }} FCFA/mois
          </p>
        </div>

        <!-- Situation professionnelle -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2
            class="text-sm font-black text-[#1B0B38] uppercase tracking-widest mb-4 flex items-center gap-2"
          >
            <span
              class="w-6 h-6 bg-[#E54801] text-white text-xs rounded-full flex items-center justify-center font-black"
              >1</span
            >
            Situation professionnelle
          </h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2"
                >Type de situation <span class="text-[#E54801]">*</span></label
              >
              <select
                v-model="form.situation_professionnelle"
                class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E54801]/30 focus:border-[#E54801]"
              >
                <option value="">Sélectionnez...</option>
                <option value="cdi">CDI (Contrat à Durée Indéterminée)</option>
                <option value="cdd">CDD (Contrat à Durée Déterminée)</option>
                <option value="independant">
                  Travailleur Indépendant / Freelance
                </option>
                <option value="fonctionnaire">Fonctionnaire</option>
                <option value="etudiant">Étudiant</option>
                <option value="retraite">Retraité</option>
                <option value="autre">Autre</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-2"
                >Revenus mensuels estimés (FCFA)</label
              >
              <input
                v-model="form.revenus_mensuels"
                type="number"
                min="0"
                placeholder="ex: 150000"
                class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E54801]/30 focus:border-[#E54801]"
              />
            </div>
            <div class="flex items-center gap-3">
              <input
                v-model="form.has_garant"
                id="has_garant"
                type="checkbox"
                class="w-4 h-4 accent-[#E54801]"
              />
              <label
                for="has_garant"
                class="text-sm text-gray-700 cursor-pointer"
                >J'ai un garant (personne qui se porte caution)</label
              >
            </div>
          </div>
        </div>

        <!-- Documents à fournir -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2
            class="text-sm font-black text-[#1B0B38] uppercase tracking-widest mb-4 flex items-center gap-2"
          >
            <span
              class="w-6 h-6 bg-[#E54801] text-white text-xs rounded-full flex items-center justify-center font-black"
              >2</span
            >
            Documents requis
          </h2>

          <div class="space-y-3">
            <div
              v-for="doc in documents"
              :key="doc.id"
              class="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100"
            >
              <div class="flex items-center gap-3">
                <div
                  :class="[
                    'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0',
                    doc.file
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-200 text-gray-400',
                  ]"
                >
                  <i
                    :class="doc.file ? 'fas fa-check' : 'fas fa-file-upload'"
                  ></i>
                </div>
                <div>
                  <p class="text-sm font-bold text-[#1B0B38]">
                    {{ doc.label }}
                    <span v-if="doc.required" class="text-[#E54801]">*</span>
                  </p>
                  <p class="text-xs text-gray-400">
                    {{ doc.fileName || doc.description }}
                  </p>
                </div>
              </div>
              <label :for="`doc-${doc.id}`" class="cursor-pointer">
                <span
                  class="text-xs font-bold text-[#E54801] border border-[#E54801] px-3 py-1.5 rounded-lg hover:bg-[#E54801]/10 transition-colors"
                >
                  {{ doc.file ? "Modifier" : "Ajouter" }}
                </span>
                <input
                  :id="`doc-${doc.id}`"
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  class="hidden"
                  @change="handleFileUpload($event, doc.id)"
                />
              </label>
            </div>
          </div>

          <p class="text-xs text-gray-400 mt-3 flex items-center gap-1">
            <i class="fas fa-info-circle"></i>
            Formats acceptés : JPG, PNG, PDF — Max 5 Mo par fichier
          </p>
        </div>

        <!-- Notes supplémentaires -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2
            class="text-sm font-black text-[#1B0B38] uppercase tracking-widest mb-4 flex items-center gap-2"
          >
            <span
              class="w-6 h-6 bg-[#E54801] text-white text-xs rounded-full flex items-center justify-center font-black"
              >3</span
            >
            Notes complémentaires
          </h2>
          <textarea
            v-model="form.notes"
            rows="3"
            placeholder="Informations supplémentaires que vous souhaitez communiquer à l'agent..."
            class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E54801]/30 focus:border-[#E54801] resize-none"
          ></textarea>
        </div>

        <!-- Erreur API -->
        <div
          v-if="apiError"
          class="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3"
        >
          <i class="fas fa-times-circle text-red-500"></i>
          <p class="text-sm text-red-700 font-medium">{{ apiError }}</p>
        </div>

        <!-- Bouton soumettre -->
        <button
          @click="submitDossier"
          :disabled="isSubmitting || !isFormValid"
          class="w-full py-4 bg-[#E54801] text-white font-black rounded-xl hover:bg-[#c73d01] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg"
        >
          <i v-if="isSubmitting" class="fas fa-spinner animate-spin"></i>
          <i v-else class="fas fa-paper-plane"></i>
          {{ isSubmitting ? "Envoi en cours..." : "Envoyer mon dossier" }}
        </button>

        <p class="text-xs text-center text-gray-400">
          <i class="fas fa-lock mr-1"></i>
          Vos données sont traitées de façon sécurisée et confidentielle.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useRentalStore } from "../../stores/rental";
import { usePropertyStore } from "../../stores/properties";
import axios from "../../axios";

const route = useRoute();
const router = useRouter();
const rentalStore = useRentalStore();
const propertyStore = usePropertyStore();

const visitId = ref(route.query.visit_id || null);
const propertyId = ref(route.query.property_id || null);
const property = ref(null);
const submitted = ref(false);
const isSubmitting = ref(false);
const apiError = ref("");

const backLink = computed(() => ({
  path: "/mon-suivi",
  query: { property_id: propertyId.value },
}));

const form = ref({
  situation_professionnelle: "",
  revenus_mensuels: "",
  has_garant: false,
  notes: "",
});

const documents = ref([
  {
    id: 1,
    label: "CIN Recto",
    description: "Photo recto de votre carte d'identité",
    required: true,
    file: null,
    fileName: "",
  },
  {
    id: 2,
    label: "CIN Verso",
    description: "Photo verso de votre carte d'identité",
    required: true,
    file: null,
    fileName: "",
  },
  {
    id: 3,
    label: "Justificatif de domicile",
    description: "Facture eau, électricité ou téléphone",
    required: true,
    file: null,
    fileName: "",
  },
  {
    id: 4,
    label: "Bulletin de salaire",
    description: "3 derniers mois (recommandé)",
    required: false,
    file: null,
    fileName: "",
  },
]);

const handleFileUpload = (event, docId) => {
  const file = event.target.files[0];
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) {
    alert("Fichier trop volumineux (max 5 Mo)");
    return;
  }
  const doc = documents.value.find((d) => d.id === docId);
  if (doc) {
    doc.file = file;
    doc.fileName = file.name;
  }
};

const isFormValid = computed(() => {
  if (!form.value.situation_professionnelle) return false;
  const requiredDocs = documents.value.filter((d) => d.required);
  return requiredDocs.every((d) => d.file !== null);
});

const fetchProperty = async () => {
  if (!propertyId.value) return;
  try {
    const payload = await propertyStore.fetchPropertyDetails(propertyId.value.toString());
    if (payload && payload.success) property.value = payload.data;
  } catch {}
};

const submitDossier = async () => {
  if (!visitId.value) {
    apiError.value = "Visite introuvable. Veuillez retourner à votre suivi.";
    return;
  }

  apiError.value = "";
  isSubmitting.value = true;

  try {
    const formData = new FormData();
    formData.append("property_id", propertyId.value);
    formData.append("visit_id", visitId.value);
    formData.append(
      "situation_professionnelle",
      form.value.situation_professionnelle,
    );
    if (form.value.revenus_mensuels) {
      formData.append("revenus_mensuels", form.value.revenus_mensuels);
    }
    formData.append("has_garant", form.value.has_garant ? 1 : 0);
    if (form.value.notes) {
      formData.append("notes", form.value.notes);
    }

    // Mapping pour les types de documents
    const docTypeMap = {
      1: "cni",
      2: "cni_back", // Vous pouvez aussi avoir un seul type cni avec un document multi-pages
      3: "address_proof",
      4: "payslip",
    };

    let docIndex = 0;
    documents.value.forEach((doc) => {
      if (doc.file) {
        formData.append(
          `documents[${docIndex}][type]`,
          docTypeMap[doc.id] || `other_${doc.id}`,
        );
        formData.append(`documents[${docIndex}][file]`, doc.file);
        docIndex++;
      }
    });

    const result = await rentalStore.submitApplication(formData);

    if (result?.success) {
      submitted.value = true;
    } else {
      apiError.value = result?.message || "Une erreur est survenue.";
    }
  } catch (err) {
    apiError.value = err.response?.data?.message || "Une erreur est survenue.";
  } finally {
    isSubmitting.value = false;
  }
};

const formatPrice = (p) => new Intl.NumberFormat("fr-FR").format(p || 0);

onMounted(fetchProperty);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
@keyframes bounce-once {
  0%,
  100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-16px);
  }
  60% {
    transform: translateY(-6px);
  }
}
.animate-bounce-once {
  animation: bounce-once 0.8s ease-out forwards;
}
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
