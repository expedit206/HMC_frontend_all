<template>
  <div class="min-h-screen bg-[#FAF9F5] flex items-center justify-center p-4">
    <div class="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center animate-fadeIn">
      <!-- Success State -->
      <div v-if="status === 'success'" class="space-y-6">
        <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-check text-4xl text-green-600"></i>
        </div>
        <h1 class="text-2xl font-black text-[#1B0B38]">Paiement réussi !</h1>
        <p class="text-gray-500">
          Votre transaction a été validée avec succès. Résférénce :
          <span class="font-mono font-bold">{{ reference }}</span>
        </p>
        <div class="pt-4">
          <button @click="goToSuivi"
            class="w-full py-4 bg-[#E54801] text-white rounded-2xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
            Retourner au suivi
          </button>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="status === 'failed' || status === 'error'" class="space-y-6">
        <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-times text-4xl text-red-600"></i>
        </div>
        <h1 class="text-2xl font-black text-[#1B0B38]">Échec du paiement</h1>
        <p class="text-gray-500">
          Nous n'avons pas pu valider votre paiement. {{ errorMessage }}
        </p>
        <div class="pt-4 flex flex-col gap-3">
          <button @click="goToSuivi"
            class="w-full py-4 bg-gray-100 text-gray-700 rounded-2xl font-bold hover:bg-gray-200 transition-all">
            Réessayer plus tard
          </button>
          <router-link to="/assistance" class="text-[#E54801] font-bold hover:underline">
            Contacter le support
          </router-link>
        </div>
      </div>

      <!-- Loading/Processing State -->
      <div v-else class="space-y-6">
        <div class="w-16 h-16 border-4 border-[#E54801] border-t-transparent rounded-full animate-spin mx-auto mb-4">
        </div>
        <h1 class="text-xl font-bold text-[#1B0B38]">
          Vérification du paiement...
        </h1>
        <p class="text-gray-500">
          Nous attendons le signal de NotchPay. Cela peut prendre quelques instants.
        </p>

        <!-- Nouveau : bouton de sortie si c'est trop long -->
        <div v-if="showLeaveButton" class="pt-6 animate-fadeIn">
          <div class="p-4 bg-blue-50 border border-blue-100 rounded-2xl mb-4">
            <p class="text-[11px] text-blue-600 leading-relaxed">
              <i class="fas fa-info-circle mr-1"></i>
              Le paiement est en cours sur le réseau. Vous pouvez quitter cette page en toute sécurité, votre espace
              sera mis à jour dès confirmation (généralement sous 3 à 5 min).
            </p>
          </div>
          <button @click="goToSuivi"
            class="w-full py-4 border-2 border-[#1B0B38] text-[#1B0B38] rounded-2xl font-bold hover:bg-[#1B0B38] hover:text-white transition-all">
            Gérer en arrière-plan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "../../axios";

const route = useRoute();
const router = useRouter();

const status = ref(route.query.status || 'processing');
const reference = ref(route.query.reference);
const errorMessage = ref("");
const showLeaveButton = ref(false);
let checkInterval = null;

const checkStatus = async () => {
  if (!reference.value) return;

  try {
    const { data } = await axios.get(`/api/transactions/${reference.value}/status`);

    if (data.success) {
      if (data.status === 'successful') {
        status.value = 'success';
        clearInterval(checkInterval);
      } else if (data.status === 'failed') {
        status.value = 'failed';
        clearInterval(checkInterval);
      }
    }
  } catch (error) {
    console.error("Erreur lors de la vérification du statut:", error);
  }
};

onMounted(() => {
  if (route.query.message === "reference_missing") {
    errorMessage.value = "Référence de transaction manquante.";
    status.value = 'error';
  } else if (route.query.message === "transaction_not_found") {
    errorMessage.value = "Transaction introuvable dans notre système.";
    status.value = 'error';
  } else if (route.query.message === "processing_error") {
    errorMessage.value = "Une erreur est survenue lors du traitement.";
    status.value = 'error';
  }

  // Si on est en attente ou en cours, on lance un polling
  if (status.value !== 'success' && status.value !== 'failed' && status.value !== 'error') {
    // Vérifier immédiatement une fois
    checkStatus();
    // Puis toutes le 5 secondes
    checkInterval = setInterval(checkStatus, 5000);

    // Nouveau : Afficher le bouton de sortie après 10 secondes
    setTimeout(() => {
      if (status.value === 'processing' || status.value === 'pending') {
        showLeaveButton.value = true;
      }
    }, 10000);

    // Arrêt automatique après 5 minutes pour éviter le polling infini
    setTimeout(() => {
      if (checkInterval) {
        clearInterval(checkInterval);
        if (status.value === 'processing' || status.value === 'pending') {
          // Au lieu d'une erreur bloquante, on l'encourage à aller voir son dashboard
          errorMessage.value = "La vérification prend plus de temps que prévu. Retrouvez le statut dans votre espace.";
          status.value = 'error';
        }
      }
    }, 300000);
  }
});

onUnmounted(() => {
  if (checkInterval) clearInterval(checkInterval);
});

const goToSuivi = () => {
  router.push("/mon-suivi");
};
</script>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
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
