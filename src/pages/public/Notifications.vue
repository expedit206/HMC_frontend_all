<template>
  <DashboardLayout>

  <div class="bg-background min-h-screen py-8">
    <div class="max-w-3xl mx-auto px-4">
      <!-- En-tête -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-2xl font-bold text-foreground flex items-center gap-3">
            <i class="fas fa-bell text-secondary"></i>
            Notifications
            <span
              v-if="notifStore.unreadCount > 0"
              class="px-2.5 py-0.5 bg-secondary text-white text-sm font-bold rounded-full animate-pulse"
            >
              {{ notifStore.unreadCount }}
            </span>
          </h1>
          <p class="text-muted-foreground text-sm mt-1">
            Restez informé de toute l'activité sur votre compte
          </p>
        </div>
        <div class="flex items-center gap-3">
          <button
            v-if="notifStore.unreadCount > 0"
            @click="notifStore.markAllRead()"
            class="text-sm text-secondary hover:text-primary font-medium flex items-center gap-2 transition-colors"
          >
            <i class="fas fa-check-double"></i>
            Tout marquer comme lu
          </button>
          <button
            v-if="notifStore.notifications.length > 0"
            @click="confirmClearAll"
            class="text-sm text-muted-foreground hover:text-destructive font-medium flex items-center gap-2 transition-colors"
          >
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>

      <!-- Filtres -->
      <div class="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button
          v-for="filter in filters"
          :key="filter.value"
          @click="notifStore.setFilter(filter.value)"
          :class="[
            'flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all',
            notifStore.activeFilter === filter.value
              ? 'bg-secondary text-white shadow-md'
              : 'bg-card border border-border text-foreground/70 hover:border-secondary hover:text-secondary',
          ]"
        >
          <i :class="`fas fa-${filter.icon} mr-2`"></i>
          {{ filter.label }}
          <span
            v-if="filter.unreadCount > 0"
            class="ml-1.5 px-1.5 py-0.5 bg-white/20 rounded-full text-xs font-bold"
          >
            {{ filter.unreadCount }}
          </span>
        </button>
      </div>

      <!-- Skeleton chargement -->
      <div v-if="notifStore.isLoading && notifStore.notifications.length === 0" class="space-y-3">
        <div
          v-for="i in 4"
          :key="i"
          class="bg-card rounded-2xl p-5 border border-border animate-pulse"
        >
          <div class="flex items-start gap-4">
            <div class="w-11 h-11 bg-muted/30 rounded-2xl flex-shrink-0"></div>
            <div class="flex-1 space-y-2">
              <div class="h-4 bg-muted/30 rounded w-3/4"></div>
              <div class="h-3 bg-muted/20 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Liste des notifications -->
      <div v-else-if="notifStore.notifications.length > 0" class="space-y-3">
        <TransitionGroup name="notif-list">
          <div
            v-for="notif in notifStore.notifications"
            :key="notif.id"
            @click="handleNotifClick(notif)"
            :class="[
              'bg-card rounded-2xl p-5 border shadow-sm cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5 group',
              notif.is_read ? 'border-border' : 'border-secondary/30 bg-secondary/5',
            ]"
          >
            <div class="flex items-start gap-4">
              <!-- Icône -->
              <div
                :class="`w-11 h-11 ${notif.icon_bg} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`"
              >
                <i :class="`fas fa-${notif.icon} ${notif.icon_color} text-lg`"></i>
              </div>

              <!-- Contenu -->
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between gap-2">
                  <div class="flex-1">
                    <p
                      :class="[
                        'text-xs font-black uppercase tracking-wider mb-1',
                        notif.is_read ? 'text-muted-foreground' : 'text-secondary',
                      ]"
                    >
                      {{ notif.title }}
                    </p>
                    <p
                      :class="[
                        'text-sm font-medium leading-snug',
                        notif.is_read ? 'text-foreground/80' : 'text-foreground',
                      ]"
                    >
                      {{ notif.message }}
                    </p>
                  </div>
                  <div class="flex items-center gap-2 flex-shrink-0">
                    <span
                      v-if="!notif.is_read"
                      class="w-2 h-2 bg-secondary rounded-full"
                    ></span>
                    <span class="text-xs text-muted-foreground whitespace-nowrap">
                      {{ timeAgo(notif.created_at) }}
                    </span>
                    <!-- Bouton supprimer -->
                    <button
                      @click.stop="notifStore.deleteNotification(notif.id)"
                      class="opacity-0 group-hover:opacity-100 w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-destructive transition-all rounded-full hover:bg-destructive/10 ml-1"
                    >
                      <i class="fas fa-times text-xs"></i>
                    </button>
                  </div>
                </div>
                <p v-if="notif.detail" class="text-xs text-muted-foreground mt-1">
                  {{ notif.detail }}
                </p>
                <div class="flex items-center gap-3 mt-3" v-if="notif.action_link">
                  <RouterLink
                    :to="notif.action_link"
                    class="text-xs font-semibold text-secondary hover:text-primary transition-colors flex items-center gap-1"
                    @click.stop
                  >
                    {{ notif.action_label || 'Voir' }}
                    <i class="fas fa-arrow-right text-xs"></i>
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </TransitionGroup>

        <!-- Charger plus -->
        <div v-if="notifStore.currentPage < notifStore.lastPage" class="text-center mt-4">
          <button
            @click="loadMore"
            :disabled="notifStore.isLoading"
            class="px-6 py-2.5 bg-card border border-border rounded-xl text-sm font-medium text-foreground hover:border-secondary hover:text-secondary transition-all"
          >
            <i class="fas fa-chevron-down mr-2" :class="{ 'fa-spin fa-circle-notch': notifStore.isLoading }"></i>
            Charger plus
          </button>
        </div>
      </div>

      <!-- État vide -->
      <div
        v-else
        class="bg-card rounded-2xl p-16 border border-border shadow-sm text-center"
      >
        <div
          class="w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-5"
        >
          <i class="fas fa-bell-slash text-3xl text-muted-foreground"></i>
        </div>
        <h3 class="text-lg font-bold text-foreground mb-2">
          Aucune notification
        </h3>
        <p class="text-muted-foreground text-sm max-w-xs mx-auto">
          Vous n'avez pas de notifications
          {{ notifStore.activeFilter !== 'all' ? 'dans cette catégorie' : '' }}
          pour le moment.
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
        <h2 class="font-bold text-foreground mb-4 flex items-center gap-2">
          <i class="fas fa-cog text-secondary"></i>
          Préférences de notifications
        </h2>
        <div class="space-y-4">
          <div
            v-for="pref in preferences"
            :key="pref.key"
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

    <!-- Toast de confirmation suppression -->
    <Transition name="toast">
      <div
        v-if="showClearConfirm"
        class="fixed bottom-6 left-1/2 -translate-x-1/2 bg-card border border-border rounded-2xl shadow-xl p-4 flex items-center gap-4 z-50"
      >
        <p class="text-sm font-medium text-foreground">Supprimer toutes les notifications ?</p>
        <button
          @click="executeClearAll"
          class="px-4 py-2 bg-destructive text-white rounded-xl text-sm font-bold hover:bg-destructive/90 transition"
        >
          Supprimer
        </button>
        <button
          @click="showClearConfirm = false"
          class="px-4 py-2 bg-muted/30 text-foreground rounded-xl text-sm font-bold transition"
        >
          Annuler
        </button>
      </div>
    </Transition>
  </div>
</DashboardLayout>

</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useNotificationStore } from "../../stores/notifications";
import DashboardLayout from "../../layouts/DashboardLayout.vue";

const notifStore = useNotificationStore();
const router = useRouter();
const showClearConfirm = ref(false);

// ── Filtres ──────────────────────────────────────────────────────────────────
const filters = computed(() => [
  {
    value: "all",
    label: "Toutes",
    icon: "bell",
    unreadCount: notifStore.unreadCount,
  },
  {
    value: "visit",
    label: "Visites",
    icon: "calendar",
    unreadCount: notifStore.notifications.filter(
      (n) => n.type === "visit" && !n.is_read
    ).length,
  },
  {
    value: "application",
    label: "Dossiers",
    icon: "file-invoice",
    unreadCount: notifStore.notifications.filter(
      (n) => n.type === "application" && !n.is_read
    ).length,
  },
  {
    value: "payment",
    label: "Paiements",
    icon: "credit-card",
    unreadCount: notifStore.notifications.filter(
      (n) => n.type === "payment" && !n.is_read
    ).length,
  },
  {
    value: "rental",
    label: "Locations",
    icon: "key",
    unreadCount: notifStore.notifications.filter(
      (n) => n.type === "rental" && !n.is_read
    ).length,
  },
  {
    value: "system",
    label: "Système",
    icon: "cog",
    unreadCount: 0,
  },
]);

// ── Lifecycle ────────────────────────────────────────────────────────────────
onMounted(() => {
  notifStore.fetchNotifications();
  notifStore.startPolling();
});

onUnmounted(() => {
  notifStore.stopPolling();
});

// ── Actions ──────────────────────────────────────────────────────────────────
const handleNotifClick = async (notif) => {
  if (!notif.is_read) {
    await notifStore.markRead(notif.id);
  }
  if (notif.action_link) {
    router.push(notif.action_link);
  }
};

const loadMore = () => {
  notifStore.fetchNotifications(notifStore.currentPage + 1, notifStore.activeFilter);
};

const confirmClearAll = () => {
  showClearConfirm.value = true;
};

const executeClearAll = async () => {
  await notifStore.clearAll();
  showClearConfirm.value = false;
};

// ── Date relative ─────────────────────────────────────────────────────────
const timeAgo = (dateStr) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now - date;
  const diffMin = Math.floor(diffMs / 60_000);
  const diffH = Math.floor(diffMin / 60);
  const diffD = Math.floor(diffH / 24);

  if (diffMin < 1) return "À l'instant";
  if (diffMin < 60) return `Il y a ${diffMin} min`;
  if (diffH < 24) return `Il y a ${diffH}h`;
  if (diffD === 1) return "Hier";
  if (diffD < 7) return `Il y a ${diffD} jours`;
  return date.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
};

// ── Préférences locales (UI seulement pour l'instant) ─────────────────────
const preferences = ref([
  {
    key: "new_properties",
    label: "Nouvelles annonces",
    description: "Recevoir des alertes pour les biens correspondant à vos critères",
    enabled: true,
  },
  {
    key: "visit_confirmation",
    label: "Confirmations de visite",
    description: "Notifications pour vos visites programmées",
    enabled: true,
  },
  {
    key: "application_updates",
    label: "Mises à jour dossier",
    description: "Alertes quand votre dossier est traité",
    enabled: true,
  },
  {
    key: "price_drops",
    label: "Baisses de prix",
    description: "Alertes quand un favori baisse de prix",
    enabled: false,
  },
  {
    key: "newsletter",
    label: "Newsletter",
    description: "Actualités et conseils immobiliers",
    enabled: false,
  },
]);
</script>

<style scoped>
/* Transitions liste */
.notif-list-enter-active,
.notif-list-leave-active {
  transition: all 0.3s ease;
}
.notif-list-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}
.notif-list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

/* Toast */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}
</style>
