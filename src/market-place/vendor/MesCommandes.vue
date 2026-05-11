<template>
    <div class="p-4 sm:p-6 lg:p-10 space-y-6 sm:space-y-8 max-w-7xl mx-auto animate-in fade-in duration-500">

        <!-- ═══════════════ HEADER ═══════════════ -->
        <div class="flex flex-col gap-6">

            <div
                class="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border pb-6 sm:pb-8">
                <div>
                    <h1 class="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                        Suivi des <span class="text-primary font-normal italic">commandes</span>
                    </h1>
                    <p class="text-muted-foreground text-sm mt-1">Gérez vos ventes et les expéditions.</p>
                </div>

                <div class="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border">
                    <span class="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Total</span>
                    <span class="text-xs font-bold text-foreground">{{ orders.length }} Commandes</span>
                </div>
            </div>
        </div>

        <!-- ═══════════════ TABS ═══════════════ -->
        <div
            class="flex items-center gap-1 bg-muted/30 border border-border/50 p-1 rounded-xl overflow-x-auto no-scrollbar whitespace-nowrap w-fit max-w-full">
            <button v-for="tab in tabs" :key="tab.value" @click="activeTab = tab.value; fetchOrders()"
                class="px-4 sm:px-5 py-2 rounded-lg text-xs font-semibold transition-all" :class="activeTab === tab.value
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'">
                {{ tab.label }}
            </button>
        </div>

        <!-- ═══════════════ ORDERS LIST (Desktop: Table / Mobile: Cards) ═══════════════ -->
        <div v-if="isLoading" class="space-y-4">
            <div v-for="n in 5" :key="n"
                class="h-20 bg-muted/20 border border-border border-dashed rounded-2xl animate-pulse"></div>
        </div>

        <div v-else-if="orders.length > 0" class="space-y-4">

            <!-- DESKTOP VIEW -->
            <div class="hidden md:block bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                <table class="w-full text-left">
                    <thead>
                        <tr class="bg-muted/30 border-b border-border">
                            <th class="px-6 py-4 text-xs font-semibold text-muted-foreground">Articles & Client</th>
                            <th class="px-6 py-4 text-xs font-semibold text-muted-foreground">Montant</th>
                            <th class="px-6 py-4 text-xs font-semibold text-muted-foreground">Date</th>
                            <th class="px-6 py-4 text-xs font-semibold text-muted-foreground text-center">Statut</th>
                            <th class="px-6 py-4 text-xs font-semibold text-muted-foreground text-right italic">Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-border/50">
                        <tr v-for="order in orders" :key="order.id" class="hover:bg-muted/5 transition-colors">
                            <td class="px-6 py-4">
                                <div class="flex items-center gap-4">
                                    <div
                                        class="w-12 h-12 bg-muted rounded-xl overflow-hidden shrink-0 border border-border/50">
                                        <img :src="order.product?.image" class="w-full h-full object-cover" />
                                    </div>
                                    <div class="min-w-0">
                                        <h3 class="text-sm font-semibold text-foreground line-clamp-1 italic">{{
                                            order.product?.name }}</h3>
                                        <p class="text-[10px] text-muted-foreground mt-1">Client: <span
                                                class="font-bold text-primary">{{ order.buyer?.name }}</span></p>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4">
                                <span class="text-xs font-bold text-foreground">{{ formatPrice(order.amount) }}</span>
                            </td>
                            <td class="px-6 py-4">
                                <span class="text-[10px] font-semibold text-muted-foreground">{{
                                    formatDate(order.created_at) }}</span>
                            </td>
                            <td class="px-6 py-4 text-center">
                                <span
                                    class="inline-flex px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tight border"
                                    :class="getStatusClass(order.status)">
                                    {{ getStatusLabel(order.status) }}
                                </span>
                            </td>
                            <td class="px-6 py-4 text-right">
                                <button v-if="order.status === 'paid_escrow'" @click="handleExpedier(order)"
                                    class="px-4 py-2 bg-secondary text-secondary-foreground text-[10px] font-bold rounded-lg hover:shadow-lg transition-all">
                                    Expédier
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- MOBILE VIEW -->
            <div class="md:hidden space-y-4">
                <div v-for="order in orders" :key="order.id"
                    class="bg-card p-4 rounded-2xl border border-border shadow-sm space-y-4">
                    <div class="flex items-center gap-4">
                        <img :src="order.product?.image"
                            class="w-16 h-16 bg-muted rounded-xl object-cover border border-border/50" />
                        <div class="flex-1 min-w-0">
                            <span class="inline-block px-2 py-0.5 rounded-md text-[8px] font-bold uppercase border mb-1"
                                :class="getStatusClass(order.status)">
                                {{ getStatusLabel(order.status) }}
                            </span>
                            <h3 class="text-sm font-bold text-foreground truncate">{{ order.product?.name }}</h3>
                            <p class="text-[10px] text-muted-foreground italic">Par {{ order.buyer?.name }}</p>
                        </div>
                    </div>

                    <div class="flex items-center justify-between pt-4 border-t border-border/50">
                        <div>
                            <p class="text-[9px] text-muted-foreground uppercase font-bold">Montant</p>
                            <p class="text-sm font-black text-foreground">{{ formatPrice(order.amount) }}</p>
                        </div>
                        <div class="text-right">
                            <p class="text-[9px] text-muted-foreground uppercase font-bold">Le {{
                                formatDate(order.created_at) }}</p>
                            <button v-if="order.status === 'paid_escrow'" @click="handleExpedier(order)"
                                class="mt-1 px-4 py-2 bg-secondary text-secondary-foreground text-[10px] font-bold rounded-lg shadow-md active:scale-95">
                                Expédier
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ═══════════════ EMPTY STATE ═══════════════ -->
        <div v-else
            class="flex flex-col items-center justify-center py-20 text-center bg-muted/10 border border-border border-dashed rounded-3xl opacity-60">
            <div class="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-4">
                <i class="fas fa-shopping-bag text-2xl text-muted-foreground/30"></i>
            </div>
            <h3 class="text-base font-bold text-foreground">Aucune commande</h3>
            <p class="text-muted-foreground text-xs mt-2 max-w-[200px] mx-auto">Les nouvelles ventes apparaîtront ici.
            </p>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from '@/../axios';
import { useSidebarStore } from '../../stores/sidebar';
// import { useSidebarStore } from '@/stores/sidebar';

const sidebarStore = useSidebarStore();
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
        month: 'short'
    });
};

const getStatusLabel = (status) => {
    const labels = {
        'pending': 'Attente',
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

.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
