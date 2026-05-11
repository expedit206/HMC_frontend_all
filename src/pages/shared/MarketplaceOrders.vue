<template>
  <div class="px-4 py-6 sm:px-6 lg:px-8 pb-16">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-semibold text-gray-900">Commandes</h1>
          <p class="text-sm text-gray-500 mt-1">Gérez vos achats et vos ventes</p>
        </div>

        <!-- Tabs -->
        <div class="flex gap-1 border-b border-gray-200">
          <button @click="activeTab = 'purchases'" class="px-4 py-2 text-sm font-medium transition-colors" :class="activeTab === 'purchases'
            ? 'text-gray-900 border-b-2 border-gray-900'
            : 'text-gray-500 hover:text-gray-700'">
            Achats
            <span class="ml-1.5 px-1.5 py-0.5 text-xs bg-gray-100 rounded">{{ purchasesCount }}</span>
          </button>
          <button @click="activeTab = 'sales'" class="px-4 py-2 text-sm font-medium transition-colors" :class="activeTab === 'sales'
            ? 'text-gray-900 border-b-2 border-gray-900'
            : 'text-gray-500 hover:text-gray-700'">
            Ventes
            <span class="ml-1.5 px-1.5 py-0.5 text-xs bg-gray-100 rounded">{{ salesCount }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-3 gap-4 mb-8">
      <div class="border border-gray-200 rounded-lg p-4">
        <p class="text-xs text-gray-500 uppercase tracking-wide">Total</p>
        <p class="text-2xl font-semibold text-gray-900 mt-1">{{ orders.length }}</p>
      </div>
      <div class="border border-gray-200 rounded-lg p-4">
        <p class="text-xs text-gray-500 uppercase tracking-wide">En cours</p>
        <p class="text-2xl font-semibold text-amber-600 mt-1">{{ pendingOrdersCount }}</p>
      </div>
      <div class="border border-gray-200 rounded-lg p-4">
        <p class="text-xs text-gray-500 uppercase tracking-wide">Terminés</p>
        <p class="text-2xl font-semibold text-green-600 mt-1">{{ completedOrdersCount }}</p>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="flex justify-center py-12">
      <div class="w-8 h-8 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div>
    </div>

    <!-- Empty -->
    <div v-else-if="orders.length === 0" class="border border-gray-200 rounded-lg py-16 text-center">
      <div class="text-gray-400 text-4xl mb-3">
        <i class="fas fa-shopping-bag"></i>
      </div>
      <p class="text-gray-500 text-sm">
        {{ activeTab === 'purchases' ? 'Aucun achat' : 'Aucune vente' }}
      </p>
      <router-link v-if="activeTab === 'purchases'" :to="{ name: 'MarketplaceIndex' }"
        class="inline-block mt-4 text-sm text-gray-900 underline hover:no-underline">
        Découvrir les produits
      </router-link>
    </div>

    <!-- Orders List -->
    <div v-else class="space-y-3">
      <div v-for="order in orders" :key="order.id"
        class="border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition-colors">
        <div class="p-4 sm:p-5">
          <div class="flex  sm:flex-row sm:items-start gap-4">
            <!-- Product Image -->
            <div class="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
              <img :src="order.product?.image || '/placeholder.jpg'" :alt="order.product?.name"
                class="w-full h-full object-cover" />
            </div>

            <!-- Main Info -->
            <div class="flex-1 min-w-0">
              <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div>
                  <p class="text-xs text-gray-500 mb-1">{{ order.product?.category }}</p>
                  <h3 class="text-sm font-medium text-gray-900">{{ order.product?.name }}</h3>
                  <p class="text-xs text-gray-500 mt-1">Réf: {{ order.transaction_reference }}</p>
                </div>
                <div class="text-left sm:text-right">
                  <p class="text-lg font-semibold text-gray-900">{{ formatPrice(order.amount) }}</p>
                  <p class="text-xs text-gray-500">dont {{ formatPrice(order.delivery_fee) }} livraison</p>
                </div>
              </div>



              <!-- Escrow info -->
              <div v-if="order.status === 'paid_escrow'"
                class="mt-3 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded inline-block">
                <i class="fas fa-shield-alt mr-1"></i>
                Fonds sécurisés en séquestre
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import axios from '../../axios';
import { useAuthStore } from '../../stores/auth';

const authStore = useAuthStore();
const activeTab = ref('purchases');
const orders = ref([]);
const isLoading = ref(false);
const processingId = ref(null);

const stats = ref({ purchases_count: 0, sales_count: 0 });

const purchasesCount = computed(() => stats.value.purchases_count);
const salesCount = computed(() => stats.value.sales_count);

const fetchOrders = async () => {
  isLoading.value = true;
  try {
    // 1. Fetch orders for current tab
    const endpoint = activeTab.value === 'purchases' ? '/api/marketplace/orders' : '/api/marketplace/sales';
    const { data } = await axios.get(endpoint);
    if (data.success) {
      orders.value = data.data.data;
    }

    // 2. Refresh global counts for badges
    const statsRes = await axios.get('/api/marketplace/navigation-stats');
    if (statsRes.data.success) {
      stats.value = statsRes.data.data;
    }
  } catch (err) {
    console.error('Erreur:', err);
  } finally {
    isLoading.value = false;
  }
};

const formatPrice = (price) => new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';

const getStatusClass = (status) => {
  const map = {
    pending: 'text-gray-500',
    paid_escrow: 'text-amber-600',
    shipped: 'text-blue-600',
    delivered: 'text-green-600',
    completed: 'text-green-600',
    cancelled: 'text-red-600',
    refunded: 'text-purple-600',
  };
  return map[status] || 'text-gray-500';
};

const getStatusIcon = (status) => {
  const map = {
    pending: 'fa-clock',
    paid_escrow: 'fa-shield-alt',
    shipped: 'fa-truck',
    delivered: 'fa-check-circle',
    completed: 'fa-check-double',
    cancelled: 'fa-times-circle',
    refunded: 'fa-history',
  };
  return map[status] || 'fa-info-circle';
};

const getStatusLabel = (status) => {
  const map = {
    pending: 'En attente',
    paid_escrow: 'Payé (séquestre)',
    shipped: 'Expédié',
    delivered: 'Livré',
    completed: 'Terminé',
    cancelled: 'Annulé',
    refunded: 'Remboursé',
  };
  return map[status] || status;
};

const pendingOrdersCount = computed(() => orders.value.filter(o => ['pending', 'paid_escrow', 'shipped'].includes(o.status)).length);
const completedOrdersCount = computed(() => orders.value.filter(o => ['delivered', 'completed'].includes(o.status)).length);

const confirmReceipt = async (order) => {
  if (!confirm('Confirmer la réception ? Les fonds seront libérés au vendeur.')) return;

  processingId.value = order.id;
  try {
    const { data } = await axios.post(`/api/marketplace/orders/${order.id}/confirm-delivery`);
    if (data.success) {
      alert('Réception confirmée.');
      fetchOrders();
    }
  } catch (err) {
    alert(err.response?.data?.message || 'Erreur.');
  } finally {
    processingId.value = null;
  }
};

const payOrder = async (order) => {
  alert('Redirection vers le paiement...');
};

const markAsShipped = (order) => {
  alert('Fonctionnalité à venir.');
};

watch(activeTab, fetchOrders);
onMounted(fetchOrders);
</script>