<template>
  <DashboardLayout>
    <div
      v-if="isLoading"
      class="flex flex-col items-center justify-center h-full min-h-[60vh]"
    >
      <div
        class="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full animate-spin mb-4"
      ></div>
      <p class="text-muted-foreground font-bold uppercase tracking-widest text-xs">
        Accès au portail académique...
      </p>
    </div>

    <div v-else-if="currentFormation" class="max-w-5xl mx-auto h-full">
      <!-- HERO SECTION -->
      <div class="text-center mb-12 animate-fadeIn">
        <div
          class="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-secondary to-secondary/80 mb-6 shadow-lg"
        >
          <i class="fas fa-graduation-cap text-4xl text-primary-foreground"></i>
        </div>
        <h1 class="text-3xl sm:text-4xl font-bold text-foreground mb-3">
          {{ currentFormation.title }}
        </h1>
        <p class="text-muted-foreground max-w-2xl mx-auto">
          {{ currentFormation.description }}
        </p>
      </div>

      <!-- OVERALL PROGRESS -->
      <div
        class="bg-card rounded-2xl shadow-sm border border-border p-6 sm:p-8 mb-8 animate-slide-up"
      >
        <div
          class="flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <p class="text-sm text-muted-foreground mb-2">Votre progression</p>
            <h2 class="text-2xl font-bold text-foreground">
              {{
                isPurchased
                  ? progress < 100
                    ? "Formation en cours"
                    : "Formation complétée"
                  : "Étape 1 : Paiement et Accès"
              }}
            </h2>
            <p class="text-muted-foreground mt-1">
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
                stroke="hsl(var(--muted))"
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
                    style="stop-color: hsl(var(--secondary)); stop-opacity: 1"
                  />
                  <stop
                    offset="100%"
                    style="stop-color: hsl(var(--secondary) / 0.8); stop-opacity: 1"
                  />
                </linearGradient>
              </defs>
            </svg>
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-lg font-bold text-secondary"
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
          <h3 class="text-lg font-bold text-foreground mb-6">
            Ce qui vous attend
          </h3>

          <div class="space-y-4 mb-8">
            <div class="flex gap-4">
              <div
                class="flex-shrink-0 w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center"
              >
                <i class="fas fa-video text-secondary"></i>
              </div>
              <div>
                <h4 class="font-semibold text-foreground">
                  Contenu multimédia
                </h4>
                <p class="text-sm text-muted-foreground">
                  Vidéos et modules engageants
                </p>
              </div>
            </div>

            <div class="flex gap-4">
              <div
                class="flex-shrink-0 w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center"
              >
                <i class="fas fa-book text-secondary"></i>
              </div>
              <div>
                <h4 class="font-semibold text-foreground">
                  {{ currentFormation.modules?.length || 0 }} modules
                  interactifs
                </h4>
                <p class="text-sm text-muted-foreground">Théorie + cas pratiques</p>
              </div>
            </div>

            <div class="flex gap-4">
              <div
                class="flex-shrink-0 w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center"
              >
                <i class="fas fa-file-contract text-secondary"></i>
              </div>
              <div>
                <h4 class="font-semibold text-foreground">
                  Examen de certification
                </h4>
                <p class="text-sm text-muted-foreground">
                  Reconnaissance professionnelle
                </p>
              </div>
            </div>
          </div>

          <div class="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
            <p class="text-sm text-blue-900 dark:text-blue-300">
              <i class="fas fa-info-circle text-blue-600 dark:text-blue-400 mr-2"></i>
              <strong>Accès illimité:</strong> Une fois acheté, accédez au
              contenu sans limite de temps
            </p>
          </div>
        </div>

        <!-- RIGHT: PAYMENT CARD -->
        <div
          class="bg-card rounded-2xl shadow-lg border border-border p-6 sm:p-8 h-fit"
        >
          <div class="text-center mb-8">
            <p class="text-sm text-muted-foreground mb-2">
              Prix unique de la formation
            </p>
            <div class="mb-4">
              <span class="text-5xl font-bold text-secondary">{{
                formatPrice(currentFormation.price).split(" ")[0]
              }}</span>
              <p class="text-lg text-muted-foreground mt-1">FCFA</p>
            </div>
            <p class="text-xs text-muted-foreground">Paiement unique, accès à vie</p>
          </div>

          <div
            class="bg-gradient-to-r from-secondary/5 to-secondary/10 rounded-xl p-4 mb-6 border border-secondary/20"
          >
            <ul class="space-y-2 text-sm">
              <li class="flex items-center gap-2">
                <i class="fas fa-check text-green-500 dark:text-green-400"></i>
                <span class="text-foreground">Accès immédiat</span>
              </li>
              <li class="flex items-center gap-2">
                <i class="fas fa-check text-green-500 dark:text-green-400"></i>
                <span class="text-foreground">{{ currentFormation.badge }}</span>
              </li>
              <li class="flex items-center gap-2">
                <i class="fas fa-check text-green-500 dark:text-green-400"></i>
                <span class="text-foreground">Satisfaction garantie</span>
              </li>
            </ul>
          </div>

          <button
            @click="handlePurchase"
            :disabled="isProcessing"
            class="w-full py-4 bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition mb-3 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <i v-if="isProcessing" class="fas fa-spinner fa-spin"></i>
            <i v-else class="fas fa-credit-card"></i>
            Procéder au Paiement
          </button>

          <p class="text-xs text-muted-foreground text-center">
            Paiement sécurisé via NotchPay
          </p>
        </div>
      </div>

      <!-- MODULES TIMELINE -->
      <div class="mb-12 animate-slide-up" style="animation-delay: 0.2s">
        <h3 class="text-2xl font-bold text-foreground mb-8">
          Programme de formation
        </h3>

        <div class="space-y-6 relative pl-4 sm:pl-0">
          <div
            v-for="(module, index) in currentFormation.modules"
            :key="index"
            class="relative pl-8 sm:pl-10 pb-8 border-l-2"
            :class="index === 0 ? 'border-secondary' : 'border-border'"
          >
            <div
              class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-card border-4"
              :class="index === 0 ? 'border-secondary' : 'border-border'"
            ></div>
            <div
              class="bg-card rounded-2xl shadow-sm border border-border p-6 sm:p-8 transition-all"
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
                      class="text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground"
                      >ACCESSIBLE</span
                    >
                    <span
                      v-else
                      class="text-xs font-bold px-3 py-1 rounded-full bg-muted/20 text-muted-foreground"
                      >VERROUILLÉ</span
                    >
                    <span class="text-xs font-medium text-muted-foreground"
                      >Durée: {{ module.duration }}</span
                    >
                  </div>
                  <h4 class="text-xl font-bold text-foreground">
                    {{ module.title }}
                  </h4>
                </div>
                <i
                  v-if="isPurchased || index === 0"
                  class="fas fa-play-circle text-4xl text-secondary"
                ></i>
                <i v-else class="fas fa-lock text-4xl text-muted-foreground/30"></i>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div
                  v-for="(lesson, lIdx) in module.lessons"
                  :key="lIdx"
                  class="text-sm text-muted-foreground flex items-center gap-2"
                >
                  <i
                    :class="
                      isPurchased || index === 0
                        ? 'fas fa-check text-green-500 dark:text-green-400'
                        : 'fas fa-lock text-muted-foreground/30'
                    "
                  ></i>
                  {{ lesson }}
                </div>
              </div>

              <button
                v-if="isPurchased || index === 0"
                class="w-full px-4 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/90 transition"
              >
                <i class="fas fa-play mr-2"></i>
                {{
                  progress > index * 30 ? "Continuer" : "Commencer ce module"
                }}
              </button>
              <button
                v-else
                disabled
                class="w-full px-4 py-3 bg-muted/20 text-muted-foreground rounded-lg font-semibold cursor-not-allowed"
              >
                <i class="fas fa-lock mr-2"></i> Verrouillé
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- FAQ SECTION -->
      <div class="mb-12 animate-slide-up" style="animation-delay: 0.3s">
        <h3 class="text-2xl font-bold text-foreground mb-6">
          Questions fréquentes
        </h3>

        <div class="space-y-3">
          <details
            class="group bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition cursor-pointer"
          >
            <summary
              class="flex items-center justify-between w-full px-6 py-4"
            >
              <h4 class="font-semibold text-foreground">
                Le certificat est-il valable partout ?
              </h4>
              <i
                class="fas fa-chevron-down text-secondary group-open:rotate-180 transition"
              ></i>
            </summary>
            <p class="px-6 pb-4 text-muted-foreground text-sm">
              Oui, notre certification est reconnue dans toute l'Afrique et
              acceptée par tous les organismes immobiliers professionnels au
              Cameroun.
            </p>
          </details>
        </div>
      </div>
    </div>

    <div v-else class="text-center p-20">
      <p class="text-muted-foreground">Aucune formation disponible pour le moment.</p>
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