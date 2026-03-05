<template>
  <div class="bg-background min-h-screen py-8">
    <div class="max-w-3xl mx-auto px-4">
      <!-- En-tête -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-2xl font-bold text-primary flex items-center gap-3">
            <i class="fas fa-bell text-secondary"></i>
            Notifications
            <span
              v-if="unreadCount > 0"
              class="px-2.5 py-0.5 bg-secondary text-white text-sm font-bold rounded-full"
            >
              {{ unreadCount }}
            </span>
          </h1>
          <p class="text-foreground/60 text-sm mt-1">
            Restez informé de toute l'activité sur votre compte
          </p>
        </div>
        <button
          v-if="unreadCount > 0"
          @click="markAllRead"
          class="text-sm text-secondary hover:text-primary font-medium flex items-center gap-2 transition-colors"
        >
          <i class="fas fa-check-double"></i>
          Tout marquer comme lu
        </button>
      </div>

      <!-- Filtres -->
      <div class="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button
          v-for="filter in filters"
          :key="filter.value"
          @click="activeFilter = filter.value"
          :class="[
            'flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all',
            activeFilter === filter.value
              ? 'bg-secondary text-white shadow-md'
              : 'bg-card border border-border text-foreground/70 hover:border-secondary hover:text-secondary',
          ]"
        >
          <i :class="`fas fa-${filter.icon} mr-2`"></i>
          {{ filter.label }}
          <span
            v-if="filter.count > 0"
            class="ml-1.5 px-1.5 py-0.5 bg-white/20 rounded-full text-xs"
          >
            {{ filter.count }}
          </span>
        </button>
      </div>

      <!-- Liste des notifications -->
      <div v-if="filteredNotifications.length > 0" class="space-y-3">
        <div
          v-for="notif in filteredNotifications"
          :key="notif.id"
          @click="markRead(notif)"
          :class="[
            'bg-card rounded-2xl p-5 border shadow-sm cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5 group',
            notif.read ? 'border-border' : 'border-secondary/30 bg-secondary/5',
          ]"
        >
          <div class="flex items-start gap-4">
            <!-- Icône -->
            <div
              :class="`w-11 h-11 ${notif.iconBg} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`"
            >
              <i :class="`fas fa-${notif.icon} ${notif.iconColor} text-lg`"></i>
            </div>

            <!-- Contenu -->
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between gap-2">
                <p
                  :class="[
                    'text-sm font-medium leading-snug',
                    notif.read ? 'text-foreground/80' : 'text-foreground',
                  ]"
                >
                  {{ notif.message }}
                </p>
                <div class="flex items-center gap-2 flex-shrink-0">
                  <span
                    v-if="!notif.read"
                    class="w-2 h-2 bg-secondary rounded-full"
                  ></span>
                  <span
                    class="text-xs text-muted-foreground whitespace-nowrap"
                    >{{ notif.time }}</span
                  >
                </div>
              </div>
              <p v-if="notif.detail" class="text-xs text-muted-foreground mt-1">
                {{ notif.detail }}
              </p>
              <div class="flex items-center gap-3 mt-3" v-if="notif.action">
                <RouterLink
                  :to="notif.action.link"
                  class="text-xs font-semibold text-secondary hover:text-primary transition-colors flex items-center gap-1"
                >
                  {{ notif.action.label }}
                  <i class="fas fa-arrow-right text-xs"></i>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- État vide -->
      <div
        v-else
        class="bg-card rounded-2xl p-16 border border-border shadow-sm text-center"
      >
        <div
          class="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-5"
        >
          <i class="fas fa-bell-slash text-3xl text-muted-foreground"></i>
        </div>
        <h3 class="text-lg font-bold text-foreground mb-2">
          Aucune notification
        </h3>
        <p class="text-foreground/60 text-sm max-w-xs mx-auto">
          Vous n'avez pas de notifications dans cette catégorie pour le moment.
        </p>
        <RouterLink
          :to="{ name: 'Annonces' }"
          class="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-secondary text-white rounded-xl font-medium hover:bg-primary transition-all text-sm"
        >
          <i class="fas fa-search"></i>
          Explorer les annonces
        </RouterLink>
      </div>

      <!-- Paramètres de notification -->
      <div class="mt-8 bg-card rounded-2xl p-6 border border-border shadow-sm">
        <h2 class="font-bold text-primary mb-4 flex items-center gap-2">
          <i class="fas fa-cog text-secondary"></i>
          Préférences de notifications
        </h2>
        <div class="space-y-4">
          <div
            v-for="pref in preferences"
            :key="pref.label"
            class="flex items-center justify-between py-3 border-b border-border last:border-0"
          >
            <div>
              <p class="text-sm font-medium text-foreground">
                {{ pref.label }}
              </p>
              <p class="text-xs text-muted-foreground">
                {{ pref.description }}
              </p>
            </div>
            <button
              @click="pref.enabled = !pref.enabled"
              :class="[
                'relative w-12 h-6 rounded-full transition-all duration-300 flex-shrink-0',
                pref.enabled ? 'bg-secondary' : 'bg-muted',
              ]"
            >
              <span
                :class="[
                  'absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300',
                  pref.enabled ? 'left-6' : 'left-0.5',
                ]"
              ></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from "vue";
import { RouterLink } from "vue-router";

const activeFilter = ref("all");

const notifications = reactive([
  {
    id: 1,
    type: "visit",
    icon: "calendar-check",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    message: 'Votre visite pour "Appartement F3 Bonapriso" est confirmée.',
    detail: "Samedi 22 février 2025 à 10h00",
    time: "Il y a 2h",
    read: false,
    action: { label: "Voir les détails", link: "/annonces/1" },
  },
  {
    id: 2,
    type: "message",
    icon: "comment-dots",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    message: "Jean Dupont vous a envoyé un message concernant votre demande.",
    detail: '"Bonjour, je suis disponible pour vous montrer le bien..."',
    time: "Il y a 5h",
    read: false,
    action: { label: "Répondre", link: "/annonces" },
  },
  {
    id: 3,
    type: "alert",
    icon: "heart",
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
    message: "Un bien de votre liste de favoris vient de baisser de prix.",
    detail: "Villa Bastos — Nouveau prix : 400 000 FCFA/mois",
    time: "Hier",
    read: false,
    action: { label: "Voir le bien", link: "/annonces/3" },
  },
  {
    id: 4,
    type: "system",
    icon: "shield-alt",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    message: "Votre compte a été vérifié avec succès.",
    detail: null,
    time: "Il y a 2 jours",
    read: true,
    action: null,
  },
  {
    id: 5,
    type: "visit",
    icon: "home",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    message: "Nouvelle annonce correspondant à vos critères de recherche.",
    detail: "Studio meublé à Akwa, Douala — 120 000 FCFA/mois",
    time: "Il y a 3 jours",
    read: true,
    action: { label: "Voir l'annonce", link: "/annonces" },
  },
]);

const filters = computed(() => [
  {
    value: "all",
    label: "Toutes",
    icon: "bell",
    count: notifications.filter((n) => !n.read).length,
  },
  {
    value: "visit",
    label: "Visites",
    icon: "calendar",
    count: notifications.filter((n) => n.type === "visit" && !n.read).length,
  },
  {
    value: "message",
    label: "Messages",
    icon: "comment",
    count: notifications.filter((n) => n.type === "message" && !n.read).length,
  },
  {
    value: "alert",
    label: "Alertes",
    icon: "heart",
    count: notifications.filter((n) => n.type === "alert" && !n.read).length,
  },
  { value: "system", label: "Système", icon: "cog", count: 0 },
]);

const filteredNotifications = computed(() => {
  if (activeFilter.value === "all") return notifications;
  return notifications.filter((n) => n.type === activeFilter.value);
});

const unreadCount = computed(() => notifications.filter((n) => !n.read).length);

const markRead = (notif) => {
  notif.read = true;
};

const markAllRead = () => {
  notifications.forEach((n) => (n.read = true));
};

const preferences = reactive([
  {
    label: "Nouvelles annonces",
    description:
      "Recevoir des alertes pour les biens correspondant à vos critères",
    enabled: true,
  },
  {
    label: "Confirmations de visite",
    description: "Notifications pour vos visites programmées",
    enabled: true,
  },
  {
    label: "Messages des propriétaires",
    description: "Alertes quand un propriétaire vous répond",
    enabled: true,
  },
  {
    label: "Baisses de prix",
    description: "Alertes quand un favori baisse de prix",
    enabled: false,
  },
  {
    label: "Newsletters",
    description: "Actualités et conseils immobiliers",
    enabled: false,
  },
]);
</script>
