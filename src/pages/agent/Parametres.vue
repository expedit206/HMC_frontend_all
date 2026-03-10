<template>
  <DashboardLayout>
    <div class="max-w-4xl mx-auto h-full">
      <!-- HEADER -->
      <div class="mb-8 animate-fadeIn">
        <h1 class="text-2xl font-bold text-foreground">
          Paramètres du compte
        </h1>
        <p class="text-muted-foreground">
          Gérez vos informations personnelles et préférences
        </p>
      </div>

      <!-- TABS -->
      <div
        class="flex flex-wrap gap-2 mb-6 border-b border-border animate-slide-up"
      >
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'px-4 py-3 text-sm font-medium rounded-t-lg transition-colors',
            activeTab === tab.id
              ? 'bg-card border-x border-t border-border text-secondary relative -mb-px'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/20',
          ]"
        >
          <i :class="tab.icon" class="mr-2"></i>
          {{ tab.label }}
        </button>
      </div>

      <!-- CONTENT -->
      <div
        class="bg-card rounded-b-2xl rounded-tr-2xl shadow-sm border border-border p-6 sm:p-8 animate-slide-up"
        style="animation-delay: 0.1s"
      >
        <!-- PROFILE TAB -->
        <div v-if="activeTab === 'profile'" class="space-y-6">
          <div class="flex items-center gap-6">
            <div class="relative">
              <div
                class="w-24 h-24 rounded-full bg-muted/20 overflow-hidden border-4 border-card shadow-md"
              >
                <img
                  src="https://ui-avatars.com/api/?name=John+Doe&background=E54801&color=fff"
                  alt="Avatar"
                  class="w-full h-full object-cover"
                />
              </div>
              <button
                class="absolute bottom-0 right-0 w-8 h-8 bg-card rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-secondary shadow-sm"
              >
                <i class="fas fa-camera text-xs"></i>
              </button>
            </div>
            <div>
              <h3 class="font-bold text-foreground text-lg">Photo de profil</h3>
              <p class="text-sm text-muted-foreground mb-2">
                JPG, PNG ou GIF. Max 2MB.
              </p>
              <div class="flex gap-2">
                <button
                  class="px-3 py-1.5 bg-muted/20 hover:bg-muted/30 text-foreground text-xs font-medium rounded transition-colors"
                >
                  Changer
                </button>
                <button
                  class="px-3 py-1.5 text-destructive hover:bg-destructive/10 text-xs font-medium rounded transition-colors"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>

          <hr class="border-border" />

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-muted-foreground mb-2"
                >Prénom</label
              >
              <input
                type="text"
                value="John"
                class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-foreground"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-muted-foreground mb-2"
                >Nom</label
              >
              <input
                type="text"
                value="Doe"
                class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-foreground"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-muted-foreground mb-2"
                >Email</label
              >
              <input
                type="email"
                value="john.doe@example.com"
                class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-foreground"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-muted-foreground mb-2"
                >Téléphone</label
              >
              <input
                type="tel"
                value="+237 6 99 99 99 99"
                class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-foreground"
              />
            </div>
            <div class="sm:col-span-2">
              <label class="block text-sm font-medium text-muted-foreground mb-2"
                >Bio / Description</label
              >
              <textarea
                rows="3"
                class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-foreground resize-none"
              >Agent immobilier passionné avec 5 ans d'expérience sur le marché de Douala et Yaoundé.</textarea>
            </div>
          </div>

          <div class="flex justify-end pt-4">
            <button
              class="px-6 py-2 bg-secondary text-secondary-foreground font-medium rounded-lg hover:bg-secondary/90 transition shadow-md"
            >
              Enregistrer les modifications
            </button>
          </div>
        </div>

        <!-- SECURITY TAB -->
        <div v-if="activeTab === 'security'" class="space-y-6">
          <div>
            <h3 class="font-bold text-foreground mb-4">
              Changer le mot du passe
            </h3>
            <div class="space-y-4 max-w-md">
              <div>
                <label class="block text-sm font-medium text-muted-foreground mb-2"
                  >Mot de passe actuel</label
                >
                <input
                  type="password"
                  class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-foreground"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-muted-foreground mb-2"
                  >Nouveau mot de passe</label
                >
                <input
                  type="password"
                  class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-foreground"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-muted-foreground mb-2"
                  >Confirmer le nouveau mot de passe</label
                >
                <input
                  type="password"
                  class="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-foreground"
                />
              </div>
            </div>
          </div>

          <hr class="border-border" />

          <div>
            <h3 class="font-bold text-foreground mb-4">
              Double authentification (2FA)
            </h3>
            <div
              class="flex items-center justify-between p-4 bg-muted/20 rounded-xl border border-border"
            >
              <div>
                <p class="font-medium text-foreground">SMS / Email</p>
                <p class="text-sm text-muted-foreground">
                  Recevez un code de sécurité lors de la connexion.
                </p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" class="sr-only peer" />
                <div
                  class="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-secondary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-card after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"
                ></div>
              </label>
            </div>
          </div>

          <div class="flex justify-end pt-4">
            <button
              class="px-6 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition shadow-md"
            >
              Mettre à jour la sécurité
            </button>
          </div>
        </div>

        <!-- NOTIFICATIONS TAB -->
        <div v-if="activeTab === 'notifications'" class="space-y-6">
          <div>
            <h3 class="font-bold text-foreground mb-4">
              Préférences de notification
            </h3>
            <div class="space-y-4">
              <label
                class="flex items-center justify-between p-3 rounded-lg hover:bg-muted/20 cursor-pointer transition-colors"
              >
                <span class="text-foreground font-medium"
                  >Nouvelles missions</span
                >
                <input
                  type="checkbox"
                  checked
                  class="w-5 h-5 text-secondary rounded border-border bg-background focus:ring-secondary"
                />
              </label>
              <label
                class="flex items-center justify-between p-3 rounded-lg hover:bg-muted/20 cursor-pointer transition-colors"
              >
                <span class="text-foreground font-medium"
                  >Rappels de rendez-vous</span
                >
                <input
                  type="checkbox"
                  checked
                  class="w-5 h-5 text-secondary rounded border-border bg-background focus:ring-secondary"
                />
              </label>
              <label
                class="flex items-center justify-between p-3 rounded-lg hover:bg-muted/20 cursor-pointer transition-colors"
              >
                <span class="text-foreground font-medium"
                  >Nouveaux messages clients</span
                >
                <input
                  type="checkbox"
                  checked
                  class="w-5 h-5 text-secondary rounded border-border bg-background focus:ring-secondary"
                />
              </label>
              <label
                class="flex items-center justify-between p-3 rounded-lg hover:bg-muted/20 cursor-pointer transition-colors"
              >
                <span class="text-foreground font-medium"
                  >Actualités de la plateforme</span
                >
                <input
                  type="checkbox"
                  class="w-5 h-5 text-secondary rounded border-border bg-background focus:ring-secondary"
                />
              </label>
            </div>
          </div>
        </div>

        <!-- BILLING TAB -->
        <div v-if="activeTab === 'billing'" class="space-y-6">
          <div>
            <h3 class="font-bold text-foreground mb-4">Abonnement actuel</h3>
            <div class="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-6 rounded-xl">
              <div class="flex justify-between items-start">
                <div>
                  <p class="text-sm font-medium text-primary-foreground/80">Plan Pro Agent</p>
                  <p class="text-3xl font-bold mt-2">15 000 FCFA<span class="text-sm font-normal ml-1">/mois</span></p>
                </div>
                <span class="px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full">Actif</span>
              </div>
              <div class="mt-4 pt-4 border-t border-white/20">
                <p class="text-sm text-primary-foreground/90">
                  <i class="fas fa-check-circle mr-2"></i> Accès illimité aux missions
                </p>
                <p class="text-sm text-primary-foreground/90 mt-2">
                  <i class="fas fa-check-circle mr-2"></i> Support prioritaire 24/7
                </p>
                <p class="text-sm text-primary-foreground/90 mt-2">
                  <i class="fas fa-check-circle mr-2"></i> Formation incluse
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 class="font-bold text-foreground mb-4">Historique des paiements</h3>
            <div class="space-y-2">
              <div class="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                <span class="text-sm text-foreground">Mars 2026</span>
                <span class="text-sm font-bold text-foreground">15 000 FCFA</span>
                <span class="text-xs text-green-600 dark:text-green-400">Payé</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                <span class="text-sm text-foreground">Février 2026</span>
                <span class="text-sm font-bold text-foreground">15 000 FCFA</span>
                <span class="text-xs text-green-600 dark:text-green-400">Payé</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                <span class="text-sm text-foreground">Janvier 2026</span>
                <span class="text-sm font-bold text-foreground">15 000 FCFA</span>
                <span class="text-xs text-green-600 dark:text-green-400">Payé</span>
              </div>
            </div>
          </div>

          <div class="flex justify-end pt-4">
            <button
              class="px-6 py-2 bg-secondary text-secondary-foreground font-medium rounded-lg hover:bg-secondary/90 transition shadow-md"
            >
              Gérer mon abonnement
            </button>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref } from "vue";
import DashboardLayout from "../../layouts/DashboardLayout.vue";

const activeTab = ref("profile");

const tabs = [
  { id: "profile", label: "Profil", icon: "fas fa-user" },
  { id: "security", label: "Sécurité", icon: "fas fa-shield-alt" },
  { id: "notifications", label: "Notifications", icon: "fas fa-bell" },
  { id: "billing", label: "Abonnement", icon: "fas fa-credit-card" },
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