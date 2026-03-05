<template>
  <div class="bg-[#FAF9F5] min-h-screen flex flex-col lg:flex-row">
    <!-- Left Section: Image & Steps -->
    <section
      class="lg:w-1/2 bg-gradient-to-b from-[#1B0B38] to-[#913327] text-white relative overflow-hidden min-h-[400px] lg:min-h-auto flex flex-col justify-center p-8 lg:p-16"
    >
      <div
        class="absolute inset-0 bg-black/30 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center mix-blend-overlay opacity-40"
      ></div>

      <div class="relative z-10 animate-fadeInLeft">
        <h1 class="text-3xl lg:text-4xl font-bold mb-8 leading-tight">
          Vérification de compte <span class="text-[#E54801]">Bailleur</span>
        </h1>

        <div class="space-y-6">
          <!-- Step 1 Indicator -->
          <div
            class="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 transition-all duration-300"
            :class="{ 'bg-white/20 scale-105 shadow-xl': currentStep === 1 }"
          >
            <div class="flex items-start gap-4">
              <div
                class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shrink-0 transition-colors"
                :class="
                  currentStep >= 1
                    ? 'bg-[#E54801] text-white'
                    : 'bg-white/20 text-white/50'
                "
              >
                1
              </div>
              <div>
                <strong class="block text-lg mb-1"
                  >Informations personnelles</strong
                >
                <p class="text-white/80 text-sm">
                  Remplissez vos informations personnelles pour nous aider à
                  vous identifier.
                </p>
              </div>
            </div>
          </div>

          <!-- Step 2 Indicator -->
          <div
            class="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 transition-all duration-300"
            :class="{ 'bg-white/20 scale-105 shadow-xl': currentStep === 2 }"
          >
            <div class="flex items-start gap-4">
              <div
                class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shrink-0 transition-colors"
                :class="
                  currentStep >= 2
                    ? 'bg-[#E54801] text-white'
                    : 'bg-white/20 text-white/50'
                "
              >
                2
              </div>
              <div>
                <strong class="block text-lg mb-1">Documents d'identité</strong>
                <p class="text-white/80 text-sm">
                  Téléchargez les copies de votre CNI pour vérification.
                </p>
              </div>
            </div>
          </div>

          <!-- Step 3 Indicator -->
          <div
            class="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 transition-all duration-300"
            :class="{ 'bg-white/20 scale-105 shadow-xl': currentStep === 3 }"
          >
            <div class="flex items-start gap-4">
              <div
                class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shrink-0 transition-colors"
                :class="
                  currentStep >= 3
                    ? 'bg-[#E54801] text-white'
                    : 'bg-white/20 text-white/50'
                "
              >
                3
              </div>
              <div>
                <strong class="block text-lg mb-1">Validation du compte</strong>
                <p class="text-white/80 text-sm">
                  Une fois vérifié, votre compte sera activé pour toutes les
                  fonctionnalités.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Right Section: Form -->
    <section
      class="lg:w-1/2 p-6 md:p-12 lg:p-16 flex items-center bg-[#FAF9F5]"
    >
      <div class="w-full max-w-xl mx-auto animate-fadeInRight">
        <h2 class="text-2xl font-bold text-[#1B0B38] mb-2">
          Informations du bailleur
        </h2>
        <p class="text-[#913327] text-sm mb-8 pb-4 border-b-2 border-[#E54801]">
          Veuillez compléter toutes les informations pour vérifier votre compte
        </p>

        <form @submit.prevent="submitForm">
          <!-- STEP 1 -->
          <div v-if="currentStep === 1" class="space-y-6 animate-fadeIn">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label
                  class="block text-xs font-bold uppercase text-gray-500 tracking-wider"
                  >Nom</label
                >
                <input
                  type="text"
                  class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-[#E54801] focus:ring-2 focus:ring-[#E54801]/10 outline-none transition-all font-medium"
                  placeholder="Votre nom"
                />
              </div>
              <div class="space-y-2">
                <label
                  class="block text-xs font-bold uppercase text-gray-500 tracking-wider"
                  >Prénom</label
                >
                <input
                  type="text"
                  class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-[#E54801] focus:ring-2 focus:ring-[#E54801]/10 outline-none transition-all font-medium"
                  placeholder="Votre prénom"
                />
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label
                  class="block text-xs font-bold uppercase text-gray-500 tracking-wider"
                  >Date Naissance</label
                >
                <input
                  type="date"
                  class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-[#E54801] focus:ring-2 focus:ring-[#E54801]/10 outline-none transition-all font-medium text-gray-400"
                />
              </div>
              <div class="space-y-2">
                <label
                  class="block text-xs font-bold uppercase text-gray-500 tracking-wider"
                  >Numéro CNI</label
                >
                <input
                  type="text"
                  class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-[#E54801] focus:ring-2 focus:ring-[#E54801]/10 outline-none transition-all font-medium"
                  placeholder="Ex: 1029384756"
                />
              </div>
            </div>
            <div class="space-y-2">
              <label
                class="block text-xs font-bold uppercase text-gray-500 tracking-wider"
                >Adresse Complète</label
              >
              <input
                type="text"
                class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-[#E54801] focus:ring-2 focus:ring-[#E54801]/10 outline-none transition-all font-medium"
                placeholder="Quartier, Ville, Rue..."
              />
            </div>

            <button
              type="button"
              @click="currentStep = 2"
              class="w-full py-4 bg-[#E54801] text-white font-bold uppercase tracking-widest rounded-xl hover:bg-[#913327] transition-all shadow-lg hover:shadow-xl mt-4 flex justify-center items-center gap-2"
            >
              Suivant <i class="fas fa-arrow-right"></i>
            </button>
          </div>

          <!-- STEP 2 -->
          <div v-if="currentStep === 2" class="space-y-8 animate-fadeIn">
            <div class="space-y-4">
              <label class="block text-sm font-bold text-[#1B0B38]"
                >Recto de la CNI</label
              >
              <div
                class="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center bg-gray-50 hover:bg-[#E54801]/5 hover:border-[#E54801] transition-all cursor-pointer group"
              >
                <div
                  class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-sm"
                >
                  <i
                    class="fas fa-id-card text-2xl text-gray-400 group-hover:text-[#E54801]"
                  ></i>
                </div>
                <p
                  class="text-xs font-bold text-gray-500 uppercase tracking-widest group-hover:text-[#E54801]"
                >
                  Cliquez pour ajouter
                </p>
              </div>
            </div>

            <div class="space-y-4">
              <label class="block text-sm font-bold text-[#1B0B38]"
                >Verso de la CNI</label
              >
              <div
                class="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center bg-gray-50 hover:bg-[#E54801]/5 hover:border-[#E54801] transition-all cursor-pointer group"
              >
                <div
                  class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-sm"
                >
                  <i
                    class="fas fa-id-card text-2xl text-gray-400 group-hover:text-[#E54801]"
                  ></i>
                </div>
                <p
                  class="text-xs font-bold text-gray-500 uppercase tracking-widest group-hover:text-[#E54801]"
                >
                  Cliquez pour ajouter
                </p>
              </div>
            </div>

            <div class="flex gap-4 pt-4">
              <button
                type="button"
                @click="currentStep = 1"
                class="flex-1 py-4 bg-gray-100 text-gray-500 font-bold uppercase tracking-widest rounded-xl hover:bg-gray-200 transition-all"
              >
                Vérifier
              </button>
              <button
                type="button"
                @click="currentStep = 3"
                class="flex-[2] py-4 bg-[#E54801] text-white font-bold uppercase tracking-widest rounded-xl hover:bg-[#913327] transition-all shadow-lg hover:shadow-xl"
              >
                Continuer
              </button>
            </div>
          </div>

          <!-- STEP 3 (Validation Preview) -->
          <div v-if="currentStep === 3" class="space-y-6 animate-fadeIn">
            <div
              class="bg-green-50 rounded-2xl p-6 border border-green-100 text-center"
            >
              <div
                class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 text-3xl animate-bounce"
              >
                <i class="fas fa-check"></i>
              </div>
              <h3 class="text-xl font-bold text-green-800 mb-2">
                Tout semble correct !
              </h3>
              <p class="text-green-700 text-sm">
                Veuillez confirmer l'envoi de votre dossier. La vérification
                prend généralement 24h.
              </p>
            </div>

            <div class="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
              <input
                type="checkbox"
                id="confirm"
                class="mt-1 w-5 h-5 text-[#E54801] rounded focus:ring-[#E54801]"
              />
              <label
                for="confirm"
                class="text-xs text-gray-500 font-medium leading-relaxed"
              >
                Je certifie sur l'honneur l'exactitude des informations fournies
                et autorise Home Cameroon à vérifier leur authenticité.
              </label>
            </div>

            <div class="flex gap-4 pt-4">
              <button
                type="button"
                @click="currentStep = 2"
                class="flex-1 py-4 bg-gray-100 text-gray-500 font-bold uppercase tracking-widest rounded-xl hover:bg-gray-200 transition-all"
              >
                Retour
              </button>
              <button
                type="submit"
                class="flex-[2] py-4 bg-[#1B0B38] text-white font-bold uppercase tracking-widest rounded-xl hover:bg-[#E54801] transition-all shadow-lg hover:shadow-xl flex justify-center items-center gap-2"
              >
                <i class="fas fa-paper-plane"></i> Soumettre
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const currentStep = ref(1);

const submitForm = () => {
  // Add submission logic
  console.log("Submitting Bailleur Form");
  // Navigate to dashboard after success
  router.push({ name: 'BailleurDashboard' });
};
</script>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.5s ease-out forwards;
}

.animate-fadeInLeft {
  animation: fadeInLeft 0.8s ease-out forwards;
}

.animate-fadeInRight {
  animation: fadeInRight 0.8s ease-out forwards;
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

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
