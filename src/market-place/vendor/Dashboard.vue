<template>
    <div class="p-6 lg:p-10 space-y-8 max-w-7xl mx-auto animate-in fade-in duration-500">

        <!-- ═══════════════ WELCOME & HEADER ═══════════════ -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border pb-8">
            <div>
                <h1 class="text-3xl font-bold text-foreground tracking-tight">
                    Tableau de bord <span class="text-primary font-normal italic">vendeur</span>
                </h1>
                <p class="text-muted-foreground text-sm mt-1">Suivi de vos ventes et de votre inventaire marketplace.
                </p>
            </div>

            <router-link :to="{ name: 'MarketplacePublish' }"
                class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm">
                <i class="fas fa-plus text-xs"></i>
                <span>Publier un article</span>
            </router-link>
        </div>

        <!-- ═══════════════ KPI CARDS ═══════════════ -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            <!-- Revenus -->
            <div class="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all">
                <div class="flex items-center gap-4">
                    <div class="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center">
                        <i class="fas fa-wallet text-sm"></i>
                    </div>
                    <div>
                        <p class="text-xs font-medium text-muted-foreground">Revenus totaux</p>
                        <h3 class="text-xl font-bold text-foreground">{{ formatPrice(stats.revenus_totaux) }}</h3>
                    </div>
                </div>
            </div>

            <!-- Ventes -->
            <div class="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all">
                <div class="flex items-center gap-4">
                    <div class="w-10 h-10 rounded-xl bg-secondary/5 text-secondary flex items-center justify-center">
                        <i class="fas fa-shopping-bag text-sm"></i>
                    </div>
                    <div>
                        <p class="text-xs font-medium text-muted-foreground">Ventes réalisées</p>
                        <h3 class="text-xl font-bold text-foreground">{{ stats.total_ventes }}</h3>
                    </div>
                </div>
            </div>

            <!-- Produits Actifs -->
            <div class="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all">
                <div class="flex items-center gap-4">
                    <div class="w-10 h-10 rounded-xl bg-blue-500/5 text-blue-500 flex items-center justify-center">
                        <i class="fas fa-box-open text-sm"></i>
                    </div>
                    <div>
                        <p class="text-xs font-medium text-muted-foreground">Produits en ligne</p>
                        <h3 class="text-xl font-bold text-foreground">{{ stats.produits_actifs }}</h3>
                    </div>
                </div>
            </div>

            <!-- Commandes Attente -->
            <div class="bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all">
                <div class="flex items-center gap-4">
                    <div class="w-10 h-10 rounded-xl bg-orange-500/5 text-orange-500 flex items-center justify-center">
                        <i class="fas fa-clock text-sm"></i>
                    </div>
                    <div>
                        <p class="text-xs font-medium text-muted-foreground">Commandes à traiter</p>
                        <h3 class="text-xl font-bold text-foreground">{{ stats.commandes_attente }}</h3>
                    </div>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

            <!-- ═══════════════ DERNIÈRES COMMANDES ═══════════════ -->
            <div class="lg:col-span-2 space-y-4">
                <div class="flex items-center justify-between px-2">
                    <h2 class="text-lg font-bold text-foreground">Commandes récentes</h2>
                    <router-link :to="{ name: 'VendeurCommandes' }"
                        class="text-xs font-semibold text-primary hover:underline">Gérer tout</router-link>
                </div>

                <div class="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                    <div v-if="isLoading" class="p-8 space-y-4">
                        <div v-for="n in 3" :key="n" class="h-12 bg-muted/50 animate-pulse rounded-lg"></div>
                    </div>
                    <div v-else-if="recentOrders.length > 0" class="overflow-x-auto">
                        <table class="w-full text-left">
                            <thead>
                                <tr class="bg-muted/30 border-b border-border">
                                    <th class="px-6 py-4 text-xs font-semibold text-muted-foreground">Client</th>
                                    <th class="px-6 py-4 text-xs font-semibold text-muted-foreground">Produit</th>
                                    <th class="px-6 py-4 text-xs font-semibold text-muted-foreground text-right">Montant
                                    </th>
                                    <th class="px-6 py-4 text-xs font-semibold text-muted-foreground text-center">Statut
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-border/50">
                                <tr v-for="order in recentOrders" :key="order.id"
                                    class="hover:bg-muted/5 transition-colors">
                                    <td class="px-6 py-4">
                                        <span class="text-xs font-medium text-foreground">{{ order.buyer?.name ||
                                            'Client' }}</span>
                                    </td>
                                    <td class="px-6 py-4">
                                        <span class="text-xs text-muted-foreground line-clamp-1 italic">{{
                                            order.product?.name }}</span>
                                    </td>
                                    <td class="px-6 py-4 text-right">
                                        <span class="text-xs font-bold text-foreground">{{ formatPrice(order.amount)
                                        }}</span>
                                    </td>
                                    <td class="px-6 py-4 text-center">
                                        <span
                                            class="inline-flex px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tight border"
                                            :class="getStatusClass(order.status)">
                                            {{ getStatusLabel(order.status) }}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-else class="p-16 flex flex-col items-center justify-center text-center opacity-40">
                        <i class="fas fa-inbox text-3xl mb-3"></i>
                        <p class="text-xs font-medium">Aucune commande récente</p>
                    </div>
                </div>
            </div>

            <!-- ═══════════════ STOCK CRITIQUE ═══════════════ -->
            <div class="space-y-4">
                <div class="flex items-center justify-between px-2">
                    <h2 class="text-lg font-bold text-foreground">Stock critique</h2>
                    <router-link :to="{ name: 'VendeurProduits' }"
                        class="text-xs font-semibold text-primary hover:underline">Inventaire</router-link>
                </div>

                <div class="space-y-3">
                    <div v-for="product in lowStockProducts" :key="product.id"
                        class="bg-card p-4 rounded-2xl border border-border flex items-center gap-4 hover:border-primary/20 transition-all">
                        <div class="w-12 h-12 bg-muted rounded-xl overflow-hidden shrink-0 border border-border/50">
                            <img :src="product.image" class="w-full h-full object-cover" />
                        </div>
                        <div class="min-w-0 flex-1">
                            <h4 class="text-xs font-semibold text-foreground truncate">{{ product.name }}</h4>
                            <p class="text-[10px] font-bold"
                                :class="product.stock === 0 ? 'text-red-500' : 'text-orange-500'">
                                {{ product.stock === 0 ? 'Rupture de stock' : 'Attention : ' + product.stock + '
                                restants' }}
                            </p>
                        </div>
                        <router-link :to="{ name: 'VendeurEditerProduit', params: { id: product.id } }"
                            class="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all">
                            <i class="fas fa-edit text-[10px]"></i>
                        </router-link>
                    </div>

                    <div v-if="lowStockProducts.length === 0"
                        class="p-12 rounded-2xl border border-dashed border-border flex flex-col items-center text-center opacity-40">
                        <i class="fas fa-check-circle text-green-500 text-2xl mb-3"></i>
                        <p class="text-xs font-medium">Tout est en stock</p>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from '@/../axios';

const stats = ref({
    produits_actifs: 0,
    revenus_totaux: 0,
    total_ventes: 0,
    commandes_attente: 0
});

const recentOrders = ref([]);
const lowStockProducts = ref([]);
const isLoading = ref(true);

const fetchDashboardData = async () => {
    try {
        const statsRes = await axios.get('/api/marketplace/vendor/stats');
        if (statsRes.data.success) {
            stats.value = statsRes.data.data;
        }

        const salesRes = await axios.get('/api/marketplace/sales');
        if (salesRes.data.success) {
            recentOrders.value = salesRes.data.data.data.slice(0, 5);
        }

        const productsRes = await axios.get('/api/marketplace/vendor/my-products');
        if (productsRes.data.success) {
            lowStockProducts.value = productsRes.data.data.data
                .filter(p => p.stock < 5)
                .slice(0, 5);
        }
    } catch (err) {
        console.error('Erreur dashboard vendeur:', err);
    } finally {
        isLoading.value = false;
    }
};

const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-CM', {
        style: 'currency',
        currency: 'XAF',
        maximumFractionDigits: 0
    }).format(price);
};

const getStatusLabel = (status) => {
    const labels = {
        'pending': 'En attente',
        'paid_escrow': 'Payé',
        'shipped': 'Expédié',
        'delivered': 'Livré',
        'cancelled': 'Annulé'
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

onMounted(fetchDashboardData);
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
