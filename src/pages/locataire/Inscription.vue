<template>
  <div
    class="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans"
  >
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
      <!-- Header -->
      <div>
        <RouterLink
          :to="{ name: 'ClientDashboard' }"
          class="text-gray-500 hover:text-gray-900 text-sm mb-4 inline-flex items-center gap-2 transition-colors"
        >
          <i class="fas fa-arrow-left"></i> Annuler
        </RouterLink>
        <h2 class="mt-2 text-center text-3xl font-extrabold text-[#1B0B38]">
          Espace Locataire
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Complétez votre profil pour faciliter vos locations.
        </p>
      </div>

      <!-- Form -->
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="rounded-md shadow-sm -space-y-px">
          <!-- Situation -->
          <div>
            <label for="situation" class="sr-only"
              >Situation Professionnelle</label
            >
            <div class="relative">
              <select
                id="situation"
                v-model="form.situation"
                required
                class="appearance-none rounded-none rounded-t-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#E54801] focus:border-[#E54801] focus:z-10 sm:text-sm transition-all"
              >
                <option value="" disabled>Votre situation...</option>
                <option value="cdi">CDI</option>
                <option value="cdd">CDD</option>
                <option value="etudiant">Étudiant</option>
                <option value="independant">Indépendant</option>
                <option value="retraite">Retraité</option>
              </select>
              <div
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
              >
                <i class="fas fa-chevron-down text-xs"></i>
              </div>
            </div>
          </div>

          <!-- Revenus -->
          <div>
            <label for="revenus" class="sr-only">Revenus Mensuels (FCFA)</label>
            <input
              id="revenus"
              v-model="form.revenus"
              type="number"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#E54801] focus:border-[#E54801] focus:z-10 sm:text-sm transition-all"
              placeholder="Revenus Mensuels (FCFA)"
            />
          </div>

          <!-- Garants -->
          <div>
            <label for="garants" class="sr-only">Avez-vous un garant ?</label>
            <div class="relative">
              <select
                id="garants"
                v-model="form.garant"
                class="appearance-none rounded-none rounded-b-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#E54801] focus:border-[#E54801] focus:z-10 sm:text-sm transition-all"
              >
                <option value="" disabled>Avez-vous un garant ?</option>
                <option value="non">Non</option>
                <option value="oui">Oui</option>
              </select>
              <div
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
              >
                <i class="fas fa-chevron-down text-xs"></i>
              </div>
            </div>
          </div>
        </div>

        <!-- Assurance -->
        <div class="flex items-center">
          <input
            id="assurance"
            v-model="form.wantsInsurance"
            type="checkbox"
            class="h-4 w-4 text-[#E54801] focus:ring-[#E54801] border-gray-300 rounded cursor-pointer"
          />
          <label
            for="assurance"
            class="ml-2 block text-sm text-gray-900 cursor-pointer"
          >
            Je souhaite être contacté pour une assurance habitation
          </label>
        </div>

        <!-- Submit Button -->
        <div>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold uppercase tracking-wide rounded-lg text-white bg-[#E54801] hover:bg-[#913327] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E54801] transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <i
                v-if="!isSubmitting"
                class="fas fa-key text-[#913327] group-hover:text-white transition-colors"
              ></i>
              <i v-else class="fas fa-spinner fa-spin text-white"></i>
            </span>
            {{
              isSubmitting ? "Activation..." : "Activer mon espace Locataire"
            }}
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
const isSubmitting = ref(false);

const form = reactive({
  situation: "",
  revenus: "",
  garant: "non",
  wantsInsurance: false,
});

const handleSubmit = () => {
  isSubmitting.value = true;

  // Simulate API call
  setTimeout(() => {
    isSubmitting.value = false;
    // Logic to update user role would go here
    // const user = authStore.user...

    alert("Félicitations ! Votre espace locataire est activé.");
    router.push({ name: "LocataireDashboard" });
  }, 1500);
};
</script>

<style scoped>
/* Custom overrides if needed */
</style>
