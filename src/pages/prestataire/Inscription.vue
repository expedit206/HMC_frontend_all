<template>
  <div
    class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background"
  >
    <div class="max-w-md w-full space-y-8 bg-card p-8 rounded-xl shadow-lg border border-border">
      <div>
        <RouterLink
          :to="{ name: 'ClientDashboard' }"
          class="text-muted-foreground hover:text-foreground text-sm mb-4 block transition-colors"
        >
          <i class="fas fa-arrow-left mr-2"></i> Annuler
        </RouterLink>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-foreground">
          Espace Prestataire
        </h2>
        <p class="mt-2 text-center text-sm text-muted-foreground">
          Proposez vos services à notre communauté.
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="metier" class="sr-only">Métier / Spécialité</label>
            <select
              id="metier"
              v-model="form.metier"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-border bg-background text-foreground placeholder-muted-foreground rounded-t-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm"
            >
              <option value="" class="bg-card">Votre métier...</option>
              <option value="plomberie" class="bg-card">Plombier</option>
              <option value="electricite" class="bg-card">Électricien</option>
              <option value="peinture" class="bg-card">Peintre</option>
              <option value="menage" class="bg-card">Ménage / Entretien</option>
              <option value="jardinage" class="bg-card">Jardinage</option>
              <option value="autre" class="bg-card">Autre</option>
            </select>
          </div>
          <div>
            <label for="experience" class="sr-only">Années d'expérience</label>
            <input
              id="experience"
              v-model="form.experience"
              type="number"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm"
              placeholder="Années d'expérience"
            />
          </div>
          <div>
            <label for="ville" class="sr-only"
              >Zone d'intervention (Ville)</label
            >
            <input
              id="ville"
              v-model="form.ville"
              type="text"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-border bg-background text-foreground placeholder-muted-foreground rounded-b-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm"
              placeholder="Ville principale"
            />
          </div>
        </div>

        <div class="flex items-center">
          <input
            id="dispo"
            v-model="form.disponible"
            type="checkbox"
            class="h-4 w-4 text-secondary focus:ring-secondary border-border rounded bg-background"
          />
          <label for="dispo" class="ml-2 block text-sm text-foreground">
            Disponible immédiatement pour des interventions
          </label>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-secondary-foreground bg-secondary hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span
              v-if="loading"
              class="absolute left-0 inset-y-0 flex items-center pl-3"
            >
              <i class="fas fa-spinner fa-spin text-secondary-foreground"></i>
            </span>
            {{ loading ? "Création en cours..." : "Créer mon profil Pro" }}
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

const form = reactive({
  metier: "",
  experience: "",
  ville: "",
  disponible: true,
});

const handleSubmit = async () => {
  loading.value = true;

  // Simulate API call
  setTimeout(() => {
    loading.value = false;
    // In a real app, you would call authManager or an API store here
    alert("Bienvenue ! Votre profil prestataire est actif.");
    router.push({ name: 'PrestataireDashboard' });
  }, 1500);
};
</script>