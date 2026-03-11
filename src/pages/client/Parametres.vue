<template>
  <DashboardLayout title="Paramètres du compte">
    <div class="max-w-3xl mx-auto">
      <div class="mb-8 animate-fadeIn">
        <h1 class="text-2xl font-black text-foreground mb-2">
          Paramètres du compte
        </h1>
        <p class="text-muted-foreground">
          Gérez vos préférences et sécurisez votre accès.
        </p>
      </div>

      <!-- Tabs -->
      <div class="flex border-b border-border mb-8 animate-slide-up">
        <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :class="[
          'px-6 py-4 font-bold text-sm transition-colors relative',
          activeTab === tab.id
            ? 'text-secondary'
            : 'text-muted-foreground hover:text-foreground',
        ]">
          {{ tab.label }}
          <div v-if="activeTab === tab.id" class="absolute bottom-0 left-0 w-full h-0.5 bg-secondary"></div>
        </button>
      </div>

      <!-- SECURITY TAB -->
      <div v-if="activeTab === 'security'" class="space-y-6 animate-slide-up" style="animation-delay: 0.1s">
        <div class="bg-card rounded-[2rem] p-8 shadow-sm border border-border">
          <h2 class="text-lg font-bold text-foreground mb-6 flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
              <i class="fas fa-lock"></i>
            </div>
            Mot de passe
          </h2>
          <form @submit.prevent class="space-y-4">
            <div>
              <label class="block text-sm font-bold text-foreground mb-2">Mot de passe actuel</label>
              <input type="password"
                class="w-full px-4 py-3 bg-muted/20 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary transition text-foreground placeholder:text-muted-foreground" />
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-bold text-foreground mb-2">Nouveau mot de passe</label>
                <input type="password"
                  class="w-full px-4 py-3 bg-muted/20 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary transition text-foreground placeholder:text-muted-foreground" />
              </div>
              <div>
                <label class="block text-sm font-bold text-foreground mb-2">Confirmer</label>
                <input type="password"
                  class="w-full px-4 py-3 bg-muted/20 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary transition text-foreground placeholder:text-muted-foreground" />
              </div>
            </div>
            <div class="pt-4 flex justify-end">
              <button
                class="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition shadow-lg">
                Mettre à jour
              </button>
            </div>
          </form>
        </div>

        <div class="bg-card rounded-[2rem] p-8 shadow-sm border border-border">
          <h2 class="text-lg font-bold text-foreground mb-6 flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center">
              <i class="fas fa-user-slash"></i>
            </div>
            Zone de danger
          </h2>
          <div class="flex items-center justify-between">
            <div>
              <p class="font-bold text-foreground">Supprimer mon compte</p>
              <p class="text-sm text-muted-foreground">
                Cette action est irréversible.
              </p>
            </div>
            <button
              class="px-4 py-2 border border-destructive/20 text-destructive font-bold rounded-xl hover:bg-destructive/10 transition">
              Supprimer
            </button>
          </div>
        </div>
      </div>

      <!-- NOTIFICATIONS TAB -->
      <div v-if="activeTab === 'notifications'"
        class="bg-card rounded-[2rem] p-8 shadow-sm border border-border animate-slide-up"
        style="animation-delay: 0.1s">
        <h2 class="text-lg font-bold text-foreground mb-6 flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <i class="fas fa-bell"></i>
          </div>
          Préférences email
        </h2>
        <div class="space-y-4">
          <label
            class="flex items-center justify-between p-4 bg-muted/20 rounded-2xl cursor-pointer hover:bg-muted/30 transition border border-border">
            <div class="flex items-center gap-4">
              <input type="checkbox" checked
                class="w-5 h-5 text-secondary rounded border-border focus:ring-secondary bg-background" />
              <div>
                <p class="font-bold text-foreground">Nouvelles annonces</p>
                <p class="text-xs text-muted-foreground">
                  Recevoir des alertes pour les biens correspondants
                </p>
              </div>
            </div>
          </label>
          <label
            class="flex items-center justify-between p-4 bg-muted/20 rounded-2xl cursor-pointer hover:bg-muted/30 transition border border-border">
            <div class="flex items-center gap-4">
              <input type="checkbox" checked
                class="w-5 h-5 text-secondary rounded border-border focus:ring-secondary bg-background" />
              <div>
                <p class="font-bold text-foreground">Newsletter HMC</p>
                <p class="text-xs text-muted-foreground">
                  Actualités du marché et conseils immo
                </p>
              </div>
            </div>
          </label>
          <label
            class="flex items-center justify-between p-4 bg-muted/20 rounded-2xl cursor-pointer hover:bg-muted/30 transition border border-border">
            <div class="flex items-center gap-4">
              <input type="checkbox"
                class="w-5 h-5 text-secondary rounded border-border focus:ring-secondary bg-background" />
              <div>
                <p class="font-bold text-foreground">Offres partenaires</p>
                <p class="text-xs text-muted-foreground">
                  Promotions exclusives de nos partenaires
                </p>
              </div>
            </div>
          </label>
        </div>
        <div class="pt-6 flex justify-end">
          <button
            class="px-6 py-3 bg-secondary text-secondary-foreground font-bold rounded-xl hover:bg-secondary/90 transition shadow-lg">
            Enregistrer les préférences
          </button>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref } from "vue";
import DashboardLayout from "../../layouts/DashboardLayout.vue";

const activeTab = ref("security");

const tabs = [
  { id: "security", label: "Sécurité" },
  { id: "notifications", label: "Notifications" },
];
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