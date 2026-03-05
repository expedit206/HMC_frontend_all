<template>
  <DashboardLayout>

      <div
        v-if="isLoading"
        class="flex flex-col items-center justify-center h-full min-h-[60vh]"
      >
        <div
          class="w-16 h-16 border-4 border-[#E54801] border-t-transparent rounded-full animate-spin mb-4"
        ></div>
        <p class="text-gray-500 font-bold uppercase tracking-widest text-xs">
          Accès au portail académique...
        </p>
      </div>

      <div v-else-if="currentFormation" class="max-w-5xl mx-auto h-full">
     

        <!-- HERO SECTION -->
        <div class="text-center mb-12 animate-fadeIn">
          <div
            class="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#E54801] to-[#913327] mb-6 shadow-lg"
          >
            <i class="fas fa-graduation-cap text-4xl text-white"></i>
          </div>
          <h1 class="text-3xl sm:text-4xl font-bold text-[#1B0B38] mb-3">
            {{ currentFormation.title }}
          </h1>
          <p class="text-gray-600 max-w-2xl mx-auto">
            {{ currentFormation.description }}
          </p>
        </div>

        <!-- OVERALL PROGRESS -->
        <div
          class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8 animate-slide-up"
        >
          <div
            class="flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div>
              <p class="text-sm text-gray-600 mb-2">Votre progression</p>
              <h2 class="text-2xl font-bold text-[#1B0B38]">
                {{
                  isPurchased
                    ? progress < 100
                      ? "Formation en cours"
                      : "Formation complétée"
                    : "Étape 1 : Paiement et Accès"
                }}
              </h2>
              <p class="text-gray-600 mt-1">
                {{
                  isPurchased
                    ? "Continuez votre apprentissage pour obtenir votre certification"
                    : "Déverrouillez la formation avec un paiement unique"
                }}
              </p>
            </div>
            <div class="relative w-24 h-24">
              <svg class="w-24 h-24 transform -rotate-90 origin-center">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="#E5E7EB"
                  stroke-width="3"
                  fill="none"
                />
                <circle
                  class="transition-all duration-700 ease-out"
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="url(#gradient)"
                  stroke-width="3"
                  fill="none"
                  stroke-dasharray="251.2"
                  :stroke-dashoffset="251.2 - (251.2 * progress) / 100"
                  stroke-linecap="round"
                />
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      style="stop-color: #e54801; stop-opacity: 1"
                    />
                    <stop
                      offset="100%"
                      style="stop-color: #913327; stop-opacity: 1"
                    />
                  </linearGradient>
                </defs>
              </svg>
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-lg font-bold text-[#E54801]"
                  >{{ progress }}%</span
                >
              </div>
            </div>
          </div>
        </div>

        <!-- PRICING & PAYMENT SECTION -->
        <div
          v-if="!isPurchased"
          class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 animate-slide-up"
          style="animation-delay: 0.1s"
        >
          <!-- LEFT: DETAILS -->
          <div>
            <h3 class="text-lg font-bold text-[#1B0B38] mb-6">
              Ce qui vous attend
            </h3>

            <div class="space-y-4 mb-8">
              <div class="flex gap-4">
                <div
                  class="flex-shrink-0 w-12 h-12 rounded-xl bg-[#E54801]/10 flex items-center justify-center"
                >
                  <i class="fas fa-video text-[#E54801]"></i>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900">
                    Contenu multimédia
                  </h4>
                  <p class="text-sm text-gray-600">
                    Vidéos et modules engageants
                  </p>
                </div>
              </div>

              <div class="flex gap-4">
                <div
                  class="flex-shrink-0 w-12 h-12 rounded-xl bg-[#E54801]/10 flex items-center justify-center"
                >
                  <i class="fas fa-book text-[#E54801]"></i>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900">
                    {{ currentFormation.modules?.length || 0 }} modules
                    interactifs
                  </h4>
                  <p class="text-sm text-gray-600">Théorie + cas pratiques</p>
                </div>
              </div>

              <div class="flex gap-4">
                <div
                  class="flex-shrink-0 w-12 h-12 rounded-xl bg-[#E54801]/10 flex items-center justify-center"
                >
                  <i class="fas fa-file-contract text-[#E54801]"></i>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900">
                    Examen de certification
                  </h4>
                  <p class="text-sm text-gray-600">
                    Reconnaissance professionnelle
                  </p>
                </div>
              </div>
            </div>

            <div class="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p class="text-sm text-blue-900">
                <i class="fas fa-info-circle text-blue-600 mr-2"></i>
                <strong>Accès illimité:</strong> Une fois acheté, accédez au
                contenu sans limite de temps
              </p>
            </div>
          </div>

          <!-- RIGHT: PAYMENT CARD -->
          <div
            class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 h-fit"
          >
            <div class="text-center mb-8">
              <p class="text-sm text-gray-600 mb-2">
                Prix unique de la formation
              </p>
              <div class="mb-4">
                <span class="text-5xl font-bold text-[#E54801]">{{
                  formatPrice(currentFormation.price).split(" ")[0]
                }}</span>
                <p class="text-lg text-gray-600 mt-1">FCFA</p>
              </div>
              <p class="text-xs text-gray-500">Paiement unique, accès à vie</p>
            </div>

            <div
              class="bg-gradient-to-r from-[#E54801]/5 to-[#913327]/5 rounded-xl p-4 mb-6 border border-[#E54801]/20"
            >
              <ul class="space-y-2 text-sm">
                <li class="flex items-center gap-2">
                  <i class="fas fa-check text-green-500"></i>
                  <span>Accès immédiat</span>
                </li>
                <li class="flex items-center gap-2">
                  <i class="fas fa-check text-green-500"></i>
                  <span>{{ currentFormation.badge }}</span>
                </li>
                <li class="flex items-center gap-2">
                  <i class="fas fa-check text-green-500"></i>
                  <span>Satisfaction garantie</span>
                </li>
              </ul>
            </div>

            <button
              @click="handlePurchase"
              :disabled="isProcessing"
              class="w-full py-4 bg-gradient-to-r from-[#E54801] to-[#913327] text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition mb-3 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <i v-if="isProcessing" class="fas fa-spinner fa-spin"></i>
              <i v-else class="fas fa-credit-card"></i>
              Procéder au Paiement
            </button>

            <p class="text-xs text-gray-500 text-center">
              Paiement sécurisé via NotchPay
            </p>
          </div>
        </div>

        <!-- MODULES TIMELINE -->
        <div class="mb-12 animate-slide-up" style="animation-delay: 0.2s">
          <h3 class="text-2xl font-bold text-[#1B0B38] mb-8">
            Programme de formation
          </h3>

          <div class="space-y-6 relative pl-4 sm:pl-0">
            <div
              v-for="(module, index) in currentFormation.modules"
              :key="index"
              class="relative pl-8 sm:pl-10 pb-8 border-l-2"
              :class="index === 0 ? 'border-[#E54801]' : 'border-gray-200'"
            >
              <div
                class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4"
                :class="index === 0 ? 'border-[#E54801]' : 'border-gray-200'"
              ></div>
              <div
                class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 transition-all"
                :class="
                  !isPurchased && index > 0
                    ? 'opacity-75 grayscale-[0.5]'
                    : 'hover:-translate-y-1'
                "
              >
                <div
                  class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4"
                >
                  <div>
                    <div class="flex items-center gap-3 mb-2">
                      <span
                        v-if="isPurchased || index === 0"
                        class="text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-br from-[#E54801] to-[#913327] text-white"
                        >ACCESSIBLE</span
                      >
                      <span
                        v-else
                        class="text-xs font-bold px-3 py-1 rounded-full bg-gray-100 text-gray-500"
                        >VERROUILLÉ</span
                      >
                      <span class="text-xs font-medium text-gray-600"
                        >Durée: {{ module.duration }}</span
                      >
                    </div>
                    <h4 class="text-xl font-bold text-[#1B0B38]">
                      {{ module.title }}
                    </h4>
                  </div>
                  <i
                    v-if="isPurchased || index === 0"
                    class="fas fa-play-circle text-4xl text-[#E54801]"
                  ></i>
                  <i v-else class="fas fa-lock text-4xl text-gray-300"></i>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  <div
                    v-for="(lesson, lIdx) in module.lessons"
                    :key="lIdx"
                    class="text-sm text-gray-700 flex items-center gap-2"
                  >
                    <i
                      :class="
                        isPurchased || index === 0
                          ? 'fas fa-check text-green-500'
                          : 'fas fa-lock text-gray-300'
                      "
                    ></i>
                    {{ lesson }}
                  </div>
                </div>

                <button
                  v-if="isPurchased || index === 0"
                  class="w-full px-4 py-3 bg-[#E54801] text-white rounded-lg font-semibold hover:bg-[#913327] transition"
                >
                  <i class="fas fa-play mr-2"></i>
                  {{
                    progress > index * 30 ? "Continuer" : "Commencer ce module"
                  }}
                </button>
                <button
                  v-else
                  disabled
                  class="w-full px-4 py-3 bg-gray-100 text-gray-400 rounded-lg font-semibold cursor-not-allowed"
                >
                  <i class="fas fa-lock mr-2"></i> Verrouillé
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- FAQ SECTION -->
        <div class="mb-12 animate-slide-up" style="animation-delay: 0.3s">
          <h3 class="text-2xl font-bold text-[#1B0B38] mb-6">
            Questions fréquentes
          </h3>

          <div class="space-y-3">
            <details
              class="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition cursor-pointer"
            >
              <summary
                class="flex items-center justify-between w-full px-6 py-4"
              >
                <h4 class="font-semibold text-gray-900">
                  Le certificat est-il valable partout ?
                </h4>
                <i
                  class="fas fa-chevron-down text-[#E54801] group-open:rotate-180 transition"
                ></i>
              </summary>
              <p class="px-6 pb-4 text-gray-600 text-sm">
                Oui, notre certification est reconnue dans toute l'Afrique et
                acceptée par tous les organismes immobiliers professionnels au
                Cameroun.
              </p>
            </details>
          </div>
        </div>
      </div>

      <div v-else class="text-center p-20">
        <p class="text-gray-400">Aucune formation disponible pour le moment.</p>
      </div>
    

  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import DashboardLayout from "../../layouts/DashboardLayout.vue";
import axios from "../../axios";
const isLoading = ref(true);
const isProcessing = ref(false);

const currentFormation = ref(null);
const isPurchased = ref(false);
const progress = ref(0);

const fetchData = async () => {
  isLoading.value = true;
  try {
    const [allFormRes, myFormRes] = await Promise.all([
      axios.get("/api/formations"),
      axios.get("/api/agent/formations"),
    ]);

    if (allFormRes.data.success && allFormRes.data.data.length > 0) {
      currentFormation.value = allFormRes.data.data[0];
    }

    if (myFormRes.data.success && myFormRes.data.data.length > 0) {
      const myForm = myFormRes.data.data.find(
        (f) => f.id === currentFormation.value?.id,
      );
      if (myForm) {
        isPurchased.value = true;
        progress.value = myForm.pivot?.progress || 0;
      }
    }
  } catch (err) {
    console.error("Erreur chargement formation:", err);
  } finally {
    isLoading.value = false;
  }
};

const handlePurchase = async () => {
  if (!currentFormation.value) return;

  if (
    confirm(
      `Confirmer l'achat de la formation "${currentFormation.value.title}" pour ${formatPrice(currentFormation.value.price)} ?`,
    )
  ) {
    isProcessing.value = true;
    try {
      const { data } = await axios.post(
        `/api/formations/${currentFormation.value.id}/purchase`,
      );
      if (data.success) {
        isPurchased.value = true;
        alert(
          "✓ Paiement réussi ! Vous avez maintenant accès à la formation complète.",
        );
        fetchData();
      }
    } catch (err) {
      alert("Erreur lors de la transaction. Veuillez réessayer.");
    } finally {
      isProcessing.value = false;
    }
  }
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("fr-CM", {
    style: "currency",
    currency: "XAF",
    maximumFractionDigits: 0,
  }).format(price || 0);
};

onMounted(fetchData);
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

