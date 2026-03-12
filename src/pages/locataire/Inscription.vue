<template>
  <div
    class="min-h-screen bg-background flex items-center justify-center p-4 font-sans"
  >
    <div class="max-w-md w-full space-y-8 bg-card p-8 rounded-xl shadow-lg border border-border">
      <!-- Header -->
      <div>
        <RouterLink
          :to="{ name: 'ClientDashboard' }"
          class="text-muted-foreground hover:text-foreground text-sm mb-4 inline-flex items-center gap-2 transition-colors"
        >
          <i class="fas fa-arrow-left"></i> Annuler
        </RouterLink>
        <h2 class="mt-2 text-center text-3xl font-extrabold text-foreground">
          Espace Locataire
        </h2>
        <p class="mt-2 text-center text-sm text-muted-foreground">
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
                class="appearance-none rounded-none rounded-t-md relative block w-full px-3 py-3 border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm transition-all"
              >
                <option value="" disabled class="bg-card">Votre situation...</option>
                <option value="cdi" class="bg-card">CDI</option>
                <option value="cdd" class="bg-card">CDD</option>
                <option value="etudiant" class="bg-card">Étudiant</option>
                <option value="independant" class="bg-card">Indépendant</option>
                <option value="retraite" class="bg-card">Retraité</option>
              </select>
              <div
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-muted-foreground"
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
              class="appearance-none rounded-none relative block w-full px-3 py-3 border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm transition-all"
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
                class="appearance-none rounded-none rounded-b-md relative block w-full px-3 py-3 border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm transition-all"
              >
                <option value="" disabled class="bg-card">Avez-vous un garant ?</option>
                <option value="non" class="bg-card">Non</option>
                <option value="oui" class="bg-card">Oui</option>
              </select>
              <div
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-muted-foreground"
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
            class="h-4 w-4 text-secondary focus:ring-secondary border-border rounded cursor-pointer bg-background"
          />
          <label
            for="assurance"
            class="ml-2 block text-sm text-foreground cursor-pointer"
          >
            Je souhaite être contacté pour une assurance habitation
          </label>
        </div>

        <!-- Submit Button -->
        <div>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold uppercase tracking-wide rounded-lg text-secondary-foreground bg-secondary hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <i
                v-if="!isSubmitting"
                class="fas fa-key text-secondary-foreground/70 group-hover:text-secondary-foreground transition-colors"
              ></i>
              <i v-else class="fas fa-spinner fa-spin text-secondary-foreground"></i>
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