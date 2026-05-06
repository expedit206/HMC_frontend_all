<template>
  <div class="dashboard-page-content p-6">
    <div class="max-w-6xl mx-auto">
      
      <!-- Header with Tabs -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 class="text-3xl font-black text-foreground leading-tight uppercase relative">
            Marketplace
            <span class="absolute -bottom-2 left-0 w-20 h-1 bg-primary"></span>
          </h1>
          <p class="text-muted-foreground font-bold uppercase tracking-[0.2em] text-[11px] mt-4 italic">
            Gérez vos achats et vos ventes en toute sécurité
          </p>
        </div>

        <div class="flex bg-muted/30 p-1 rounded-xl border border-border">
          <button 
            @click="activeTab = 'purchases'"
            class="px-6 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all"
            :class="activeTab === 'purchases' ? 'bg-primary text-primary-foreground shadow-lg' : 'text-muted-foreground hover:text-foreground'"
          >
            Mes Achats
          </button>
          <button 
            @click="activeTab = 'sales'"
            class="px-6 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all"
            :class="activeTab === 'sales' ? 'bg-primary text-primary-foreground shadow-lg' : 'text-muted-foreground hover:text-foreground'"
          >
            Mes Ventes
          </button>
        </div>
      </div>

      <!-- Filters & Stats (Summary) -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div class="bg-card p-5 rounded-2xl border border-border shadow-sm">
          <p class="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Total Commandes</p>
          <p class="text-2xl font-black text-foreground">{{ orders.length }}</p>
        </div>
        <div class="bg-card p-5 rounded-2xl border border-border shadow-sm">
          <p class="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">En attente / Séquestre</p>
          <p class="text-2xl font-black text-amber-500">{{ pendingOrdersCount }}</p>
        </div>
        <div class="bg-card p-5 rounded-2xl border border-border shadow-sm">
          <p class="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Livré / Terminé</p>
          <p class="text-2xl font-black text-green-500">{{ completedOrdersCount }}</p>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
        <div class="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
        <p class="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Chargement des données...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="orders.length === 0" class="bg-card rounded-3xl border border-border border-dashed p-20 text-center">
        <div class="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
          <i class="fas fa-shopping-bag text-3xl text-muted-foreground/30"></i>
        </div>
        <h3 class="text-xl font-black text-foreground uppercase tracking-tight">Aucune commande</h3>
        <p class="text-muted-foreground font-medium mt-2 max-w-xs mx-auto">
          {{ activeTab === 'purchases' 
             ? "Vous n'avez pas encore effectué d'achats sur la marketplace." 
             : "Vous n'avez pas encore réalisé de ventes." }}
        </p>
        <router-link 
          v-if="activeTab === 'purchases'"
          :to="{ name: 'MarketplaceIndex' }" 
          class="inline-flex mt-8 px-8 py-3 bg-primary text-primary-foreground rounded-full text-[10px] font-black uppercase tracking-widest hover:shadow-xl hover:shadow-primary/20 transition-all"
        >
          Découvrir les produits
        </router-link>
      </div>

      <!-- Orders List -->
      <div v-else class="space-y-4">
        <div 
          v-for="order in orders" 
          :key="order.id" 
          class="bg-card rounded-3xl border border-border overflow-hidden hover:shadow-xl hover:shadow-black/5 transition-all group"
        >
          <div class="flex flex-col md:flex-row">
            <!-- Product Info -->
            <div class="p-6 md:w-1/3 flex gap-4 border-b md:border-b-0 md:border-r border-border">
              <div class="w-20 h-20 rounded-2xl bg-muted overflow-hidden shrink-0 border border-border">
                <img :src="order.product?.image || '/placeholder.jpg'" class="w-full h-full object-cover" />
              </div>
              <div class="min-w-0">
                <p class="text-[9px] font-black text-primary uppercase tracking-widest mb-1">{{ order.product?.category }}</p>
                <h4 class="text-sm font-black text-foreground truncate uppercase leading-tight group-hover:text-primary transition-colors">
                  {{ order.product?.name }}
                </h4>
                <p class="text-xs font-bold text-muted-foreground mt-1">Qté: {{ order.quantity }}</p>
                <p class="text-[10px] font-black text-foreground mt-2">REF: {{ order.transaction_reference }}</p>
              </div>
            </div>

            <!-- Status & Amount -->
            <div class="p-6 flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <p class="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-2">Statut de la commande</p>
                <span 
                  class="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-2"
                  :class="getStatusClass(order.status)"
                >
                  <i class="fas" :class="getStatusIcon(order.status)"></i>
                  {{ getStatusLabel(order.status) }}
                </span>
                <p v-if="order.status === 'paid_escrow'" class="text-[9px] text-amber-600 font-bold mt-2 flex items-center gap-1.5 px-1">
                  <i class="fas fa-shield-alt"></i> Fonds sécurisés en séquestre par Home Cameroon
                </p>
              </div>

              <div class="text-right">
                <p class="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1">Montant payé</p>
                <p class="text-xl font-black text-foreground">{{ formatPrice(order.amount) }}</p>
                <p class="text-[9px] text-muted-foreground italic">Incluant {{ formatPrice(order.delivery_fee) }} de livraison</p>
              </div>
            </div>

            <!-- Actions -->
            <div class="p-6 bg-muted/10 border-t md:border-t-0 md:border-l border-border flex items-center justify-center min-w-[200px]">
              <!-- Buyer Actions -->
              <template v-if="activeTab === 'purchases'">
                <button 
                  v-if="order.status === 'paid_escrow' || order.status === 'shipped'"
                  @click="confirmReceipt(order)"
                  :disabled="processingId === order.id"
                  class="w-full px-6 py-3 bg-primary text-primary-foreground rounded-2xl text-[10px] font-black uppercase tracking-widest hover:shadow-xl hover:shadow-primary/20 transition-all active:scale-95 disabled:opacity-50"
                >
                  <i v-if="processingId === order.id" class="fas fa-circle-notch fa-spin mr-2"></i>
                  Confirmer Réception
                </button>
                <p v-else-if="order.status === 'delivered' || order.status === 'completed'" class="text-[10px] font-black text-green-600 uppercase tracking-widest flex items-center gap-2">
                  <i class="fas fa-check-circle"></i> Terminé
                </p>
                <button v-else-if="order.status === 'pending'" @click="payOrder(order)" class="w-full px-6 py-3 bg-[#1B0B38] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all">
                  Payer Maintenant
                </button>
              </template>

              <!-- Seller Actions -->
              <template v-else>
                <div v-if="order.status === 'paid_escrow'" class="text-center">
                   <p class="text-[10px] font-black text-foreground mb-3">À EXPÉDIER</p>
                   <button @click="markAsShipped(order)" class="px-6 py-3 bg-secondary text-secondary-foreground rounded-2xl text-[10px] font-black uppercase tracking-widest hover:shadow-lg transition-all">
                      Marquer Expédié
                   </button>
                </div>
                <div v-else-if="order.status === 'delivered' || order.status === 'completed'" class="text-center">
                   <p class="text-[10px] font-black text-green-600 uppercase tracking-widest flex items-center justify-center gap-2">
                     <i class="fas fa-check-double"></i> Fonds Débloqués
                   </p>
                   <p class="text-[9px] text-muted-foreground font-bold mt-1 uppercase">HC va vous payer</p>
                </div>
                <div v-else class="text-center text-[10px] font-bold text-muted-foreground italic">
                   Attente paiement client...
                </div>
              </template>
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

const fetchOrders = async () => {
    isLoading.value = true;
    try {
        const endpoint = activeTab.value === 'purchases' ? '/api/marketplace/orders' : '/api/marketplace/sales';
        const { data } = await axios.get(endpoint);
        if (data.success) {
            orders.value = data.data.data;
        }
    } catch (err) {
        console.error('Erreur chargement commandes:', err);
    } finally {
        isLoading.value = false;
    }
};

const formatPrice = (price) => 
  new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';

const getStatusClass = (status) => {
    const map = {
        'pending': 'bg-gray-100 text-gray-500',
        'paid_escrow': 'bg-amber-100 text-amber-600',
        'shipped': 'bg-blue-100 text-blue-600',
        'delivered': 'bg-green-100 text-green-600',
        'completed': 'bg-green-100 text-green-600',
        'cancelled': 'bg-red-100 text-red-600',
        'refunded': 'bg-purple-100 text-purple-600',
    };
    return map[status] || 'bg-gray-100';
};

const getStatusIcon = (status) => {
    const map = {
        'pending': 'fa-clock',
        'paid_escrow': 'fa-shield-alt',
        'shipped': 'fa-truck-loading',
        'delivered': 'fa-check-circle',
        'completed': 'fa-check-double',
        'cancelled': 'fa-times-circle',
        'refunded': 'fa-history',
    };
    return map[status] || 'fa-info-circle';
};

const getStatusLabel = (status) => {
    const map = {
        'pending': 'En attente',
        'paid_escrow': 'Payé (Séquestre)',
        'shipped': 'En cours d\'envoi',
        'delivered': 'Livré / Reçu',
        'completed': 'Terminé',
        'cancelled': 'Annulé',
        'refunded': 'Remboursé',
    };
    return map[status] || status;
};

const pendingOrdersCount = computed(() => orders.value.filter(o => ['pending', 'paid_escrow', 'shipped'].includes(o.status)).length);
const completedOrdersCount = computed(() => orders.value.filter(o => ['delivered', 'completed'].includes(o.status)).length);

const confirmReceipt = async (order) => {
    if (!confirm("Avez-vous bien reçu le produit conformément à votre commande ? En confirmant, vous autorisez Home Cameroon à libérer les fonds au vendeur.")) return;
    
    processingId.value = order.id;
    try {
        const { data } = await axios.post(`/api/marketplace/orders/${order.id}/confirm-delivery`);
        if (data.success) {
            alert("Réception confirmée ! Merci d'avoir utilisé notre service de séquestre.");
            fetchOrders();
        }
    } catch (err) {
        alert(err.response?.data?.message || "Une erreur est survenue.");
    } finally {
        processingId.value = null;
    }
};

const payOrder = async (order) => {
    // Si la commande est en pending, on peut relancer NotchPay (en récupérant l'URL si on l'a ou en relançant le checkout)
    // Pour simplifier, on redirige vers le détail produit ou on affiche un message
    alert("Veuillez ré-initier le paiement depuis la page du produit.");
};

const markAsShipped = (order) => {
    // Dans une version complète, on aurait une route pour ça
    alert("Cette fonctionnalité (Marquer comme expédié) sera disponible prochainement dans votre interface vendeur.");
};

watch(activeTab, () => {
    fetchOrders();
});

onMounted(fetchOrders);
</script>
