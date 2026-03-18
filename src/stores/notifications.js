import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "../axios";

export const useNotificationStore = defineStore("notifications", () => {
  // ── State ──────────────────────────────────────────────────────────────────
  const notifications = ref([]);
  const unreadCount = ref(0);
  const isLoading = ref(false);
  const currentPage = ref(1);
  const lastPage = ref(1);
  const activeFilter = ref("all");

  // ── Getters ────────────────────────────────────────────────────────────────

  const hasUnread = computed(() => unreadCount.value > 0);

  const filteredNotifications = computed(() => {
    if (activeFilter.value === "all") return notifications.value;
    return notifications.value.filter((n) => n.type === activeFilter.value);
  });

  // ── Actions ────────────────────────────────────────────────────────────────

  /**
   * Récupère les notifications depuis l'API
   */
  async function fetchNotifications(page = 1, type = null) {
    isLoading.value = true;
    try {
      const params = { page };
      if (type && type !== "all") params.type = type;

      const { data } = await axios.get("/api/notifications", { params });
      if (data.success) {
        if (page === 1) {
          notifications.value = data.data.notifications;
        } else {
          // Append pour pagination infinie
          notifications.value.push(...data.data.notifications);
        }
        unreadCount.value = data.data.unread_count;
        currentPage.value = data.data.current_page;
        lastPage.value = data.data.last_page;
      }
    } catch (err) {
      console.error("Erreur chargement notifications:", err);
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Récupère uniquement le compteur non-lus (léger, pour la sidebar)
   */
  async function fetchUnreadCount() {
    try {
      const { data } = await axios.get("/api/notifications/unread-count");
      if (data.success) {
        unreadCount.value = data.count;
      }
    } catch {
      // Silencieux
    }
  }

  /**
   * Marque une notification comme lue
   */
  async function markRead(notificationId) {
    try {
      await axios.post(`/api/notifications/${notificationId}/read`);
      const notif = notifications.value.find((n) => n.id === notificationId);
      if (notif && !notif.is_read) {
        notif.is_read = true;
        unreadCount.value = Math.max(0, unreadCount.value - 1);
      }
    } catch (err) {
      console.error("Erreur markRead:", err);
    }
  }

  /**
   * Marque toutes les notifications comme lues
   */
  async function markAllRead() {
    try {
      await axios.post("/api/notifications/read-all");
      notifications.value.forEach((n) => (n.is_read = true));
      unreadCount.value = 0;
    } catch (err) {
      console.error("Erreur markAllRead:", err);
    }
  }

  /**
   * Supprime une notification
   */
  async function deleteNotification(notificationId) {
    try {
      await axios.delete(`/api/notifications/${notificationId}`);
      const idx = notifications.value.findIndex((n) => n.id === notificationId);
      if (idx !== -1) {
        if (!notifications.value[idx].is_read) {
          unreadCount.value = Math.max(0, unreadCount.value - 1);
        }
        notifications.value.splice(idx, 1);
      }
    } catch (err) {
      console.error("Erreur deleteNotification:", err);
    }
  }

  /**
   * Supprime toutes les notifications
   */
  async function clearAll() {
    try {
      await axios.delete("/api/notifications/clear-all");
      notifications.value = [];
      unreadCount.value = 0;
    } catch (err) {
      console.error("Erreur clearAll:", err);
    }
  }

  /**
   * Change le filtre actif et recharge
   */
  async function setFilter(type) {
    activeFilter.value = type;
    await fetchNotifications(1, type);
  }

  // ── Polling (refresh auto toutes les 60s) ─────────────────────────────────
  let pollingInterval = null;

  function startPolling() {
    stopPolling();
    pollingInterval = setInterval(fetchUnreadCount, 60_000);
  }

  function stopPolling() {
    if (pollingInterval) {
      clearInterval(pollingInterval);
      pollingInterval = null;
    }
  }

  return {
    // State
    notifications,
    unreadCount,
    isLoading,
    currentPage,
    lastPage,
    activeFilter,
    // Getters
    hasUnread,
    filteredNotifications,
    // Actions
    fetchNotifications,
    fetchUnreadCount,
    markRead,
    markAllRead,
    deleteNotification,
    clearAll,
    setFilter,
    startPolling,
    stopPolling,
  };
});
