<template>
    <div class="p-6 lg:p-10 space-y-8 max-w-7xl mx-auto animate-in fade-in duration-500">

        <!-- ═══════════════ HEADER ═══════════════ -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border pb-8">
            <div>
                <h1 class="text-3xl font-bold text-foreground tracking-tight">
                    Suivi des <span class="text-primary font-normal italic">commandes</span>
                </h1>
                <p class="text-muted-foreground text-sm mt-1">Gérez vos ventes et mettez à jour les statuts
                    d'expédition.</p>
            </div>

            <div class="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border">
                <span class="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Total</span>
                <span class="text-xs font-bold text-foreground">{{ orders.length }} Commandes</span>
            </div>
        </div>

        <!-- ═══════════════ TABS ═══════════════ -->
        <div class="flex items-center gap-1 bg-muted/30 border border-border/50 p-1 rounded-xl w-fit">
            <button v-for="tab in tabs" :key="tab.value" @click="activeTab = tab.value; fetchOrders()"
                class="px-5 py-2 rounded-lg text-xs font-semibold transition-all" :class="activeTab === tab.value
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'">
                {{ tab.label }}
            </button>
        </div>

        <!-- ═══════════════ ORDERS LIST ═══════════════ -->
        <div v-if="isLoading" class="space-y-4">
            <div v-for="n in 5" :key="n"
                class="h-20 bg-muted/20 border border-border border-dashed rounded-2xl animate-pulse"></div>
        </div>

        <div v-else-if="orders.length > 0" class="space-y-4">
            <div v-for="order in orders" :key="order.id"
                class="group bg-card p-5 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-center gap-6">

                <!-- Produit info -->
                <div class="flex items-center gap-4 flex-1 min-w-0">
                    <div class="w-14 h-14 bg-muted rounded-xl overflow-hidden shrink-0 border border-border/50">
                        <img :src="order.product?.image" class="w-full h-full object-cover" />
                    </div>
                    <div class="min-w-0">
                        <h3 class="text-sm font-semibold text-foreground line-clamp-1 italic">{{ order.product?.name }}
                        </h3>
                        <div class="flex items-center gap-2 mt-1">
                            <span class="text-[10px] font-medium text-muted-foreground">Acheteur :</span>
                            <span class="text-[10px] font-bold text-primary">{{ order.buyer?.name }}</span>
                        </div>
                    </div>
                </div>

                <!-- Détails -->
                <div class="flex items-center gap-8 shrink-0">
                    <div class="text-center md:text-left">
                        <p class="text-[10px] text-muted-foreground mb-0.5">Montant</p>
                        <p class="text-xs font-bold text-foreground">{{ formatPrice(order.amount) }}</p>
                    </div>
                    <div class="text-center md:text-left border-x border-border/50 px-8">
                        <p class="text-[10px] text-muted-foreground mb-0.5">Date</p>
                        <p class="text-[10px] font-semibold text-foreground">{{ formatDate(order.created_at) }}</p>
                    </div>
                </div>

                <!-- Statut & Action -->
                <div class="flex items-center gap-4 shrink-0">
                    <span class="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-tight border"
                        :class="getStatusClass(order.status)">
                        {{ getStatusLabel(order.status) }}
                    </span>

                    <button v-if="order.status === 'paid_escrow'" @click="handleExpedier(order)"
                        class="px-5 py-2.5 bg-secondary text-secondary-foreground text-xs font-bold rounded-xl hover:shadow-lg hover:shadow-secondary/10 transition-all">
                        Expédier
                    </button>

                    <div v-else-if="order.status === 'shipped'" class="flex items-center gap-2 text-primary opacity-60">
                        <i class="fas fa-truck text-xs animate-bounce"></i>
                        <span class="text-[10px] font-bold uppercase tracking-widest italic">En route</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- ═══════════════ EMPTY STATE ═══════════════ -->
        <div v-else
            class="flex flex-col items-center justify-center py-24 text-center bg-muted/10 border border-border border-dashed rounded-3xl opacity-60">
            <div class="w-20 h-20 bg-muted rounded-2xl flex items-center justify-center mb-6">
                <i class="fas fa-shopping-bag text-3xl text-muted-foreground/30"></i>
            </div>
            <h3 class="text-lg font-bold text-foreground">Aucune commande</h3>
            <p class="text-muted-foreground text-sm mt-2 max-w-sm mx-auto font-medium">Les commandes à traiter
                apparaîtront ici.</p>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from '@/../axios';

const orders = ref([]);
const isLoading = ref(true);
const activeTab = ref('all');

const tabs = [
    { label: 'Tous', value: 'all' },
    { label: 'À expédier', value: 'paid_escrow' },
    { label: 'En cours', value: 'shipped' },
    { label: 'Livrées', value: 'delivered' }
];

const fetchOrders = async () => {
    isLoading.value = true;
    try {
        const res = await axios.get('/api/marketplace/sales');
        if (res.data.success) {
            const allOrders = res.data.data.data;
            if (activeTab.value === 'all') {
                orders.value = allOrders;
            } else {
                orders.value = allOrders.filter(o => o.status === activeTab.value);
            }
        }
    } catch (err) {
        console.error(err);
    } finally {
        isLoading.value = false;
    }
};

const handleExpedier = async (order) => {
    try {
        const res = await axios.post(`/api/marketplace/vendor/orders/${order.id}/expedier`);
        if (res.data.success) {
            order.status = 'shipped';
            fetchOrders();
        }
    } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || 'Erreur lors de l\'expédition.');
    }
};

const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-CM', {
        style: 'currency',
        currency: 'XAF',
        maximumFractionDigits: 0
    }).format(price);
};

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
};

const getStatusLabel = (status) => {
    const labels = {
        'pending': 'En attente',
        'paid_escrow': 'À expédier',
        'shipped': 'En cours',
        'delivered': 'Livrée',
        'cancelled': 'Annulée'
    };
    return labels[status] || status;
};

const getStatusClass = (status) => {
    const classes = {
        'pending': 'bg-orange-500/5 text-orange-600 border-orange-500/20',
        'paid_escrow': 'bg-blue-500/5 text-blue-600 border-blue-500/20',
        'shipped': 'bg-primary/5 text-primary border-primary/20',
        'delivered': 'bg-green-500/5 text-green-600 border-green-500/20',
        'cancelled': 'bg-red-500/5 text-red-600 border-red-500/20'
    };
    return classes[status] || 'bg-muted text-muted-foreground border-border';
};

onMounted(fetchOrders);
</script>

<style scoped>
.animate-in {
    animation: fadeIn 0.4s ease-out forwards;
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
</style>
