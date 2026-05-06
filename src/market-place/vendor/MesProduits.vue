<template>
    <div class="p-6 lg:p-10 space-y-8 max-w-7xl mx-auto animate-in fade-in duration-500">

        <!-- ═══════════════ HEADER ═══════════════ -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border pb-8">
            <div>
                <h1 class="text-3xl font-bold text-foreground tracking-tight">
                    Gestion de l'<span class="text-primary font-normal italic">inventaire</span>
                </h1>
                <p class="text-muted-foreground text-sm mt-1">Gérez vos annonces et mettez à jour votre stock en
                    quelques clics.</p>
            </div>

            <router-link :to="{ name: 'MarketplacePublish' }"
                class="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm">
                <i class="fas fa-plus text-xs"></i>
                <span>Nouveau produit</span>
            </router-link>
        </div>

        <!-- ═══════════════ FILTRES & TABS ═══════════════ -->
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
            <div class="flex items-center gap-1 bg-muted/30 border border-border/50 p-1 rounded-xl">
                <button v-for="tab in tabs" :key="tab.value" @click="activeTab = tab.value; fetchProducts()"
                    class="px-5 py-2 rounded-lg text-xs font-semibold transition-all" :class="activeTab === tab.value
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'">
                    {{ tab.label }}
                </button>
            </div>

            <div class="relative w-full md:w-64">
                <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-xs"></i>
                <input v-model="searchQuery" type="text" placeholder="Rechercher..."
                    class="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm font-medium focus:border-primary/20 focus:outline-none transition-all" />
            </div>
        </div>

        <!-- ═══════════════ PRODUCT GRID ═══════════════ -->
        <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div v-for="n in 8" :key="n"
                class="h-80 bg-muted/20 border border-border border-dashed rounded-2xl animate-pulse"></div>
        </div>

        <div v-else-if="products.length > 0"
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div v-for="product in products" :key="product.id"
                class="group bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col">

                <!-- Image & Actions -->
                <div class="relative aspect-square overflow-hidden bg-muted/30">
                    <img :src="product.image"
                        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />

                    <div class="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase border backdrop-blur-md"
                        :class="product.status === 'active' ? 'bg-green-500/10 text-green-600 border-green-500/20' : 'bg-orange-500/10 text-orange-600 border-orange-500/20'">
                        {{ product.status === 'active' ? 'En ligne' : 'Inactif' }}
                    </div>

                    <div
                        class="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <router-link :to="{ name: 'VendeurEditerProduit', params: { id: product.id } }"
                            class="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center hover:scale-105 transition-transform shadow-lg">
                            <i class="fas fa-edit"></i>
                        </router-link>
                        <button @click="confirmDelete(product)"
                            class="w-10 h-10 rounded-xl bg-white text-red-500 flex items-center justify-center hover:scale-105 transition-transform shadow-lg border border-red-100">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>

                <!-- Content -->
                <div class="p-5 space-y-3 flex-grow flex flex-col">
                    <div class="flex-grow">
                        <p class="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">{{ product.category
                            }}</p>
                        <h3 class="text-sm font-semibold text-foreground line-clamp-1 truncate">{{ product.name }}</h3>
                    </div>

                    <div class="flex items-center justify-between pt-3 border-t border-border/50">
                        <div>
                            <p class="text-[10px] text-muted-foreground mb-0.5">Prix</p>
                            <p class="text-xs font-bold text-foreground">{{ formatPrice(product.price) }}</p>
                        </div>
                        <div class="text-right">
                            <p class="text-[10px] text-muted-foreground mb-0.5">Stock</p>
                            <p class="text-xs font-bold"
                                :class="product.stock < 5 ? 'text-red-500' : 'text-foreground'">{{ product.stock }}
                                unités</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ═══════════════ EMPTY STATE ═══════════════ -->
        <div v-else
            class="flex flex-col items-center justify-center py-24 text-center bg-muted/10 border border-border border-dashed rounded-3xl opacity-60">
            <div class="w-20 h-20 bg-muted rounded-2xl flex items-center justify-center mb-6">
                <i class="fas fa-box-open text-3xl text-muted-foreground/30"></i>
            </div>
            <h3 class="text-lg font-bold text-foreground">Aucun produit trouvé</h3>
            <p class="text-muted-foreground text-sm mt-2 max-w-sm mx-auto">Vous n'avez pas encore d'articles
                correspondant à ce filtre dans votre boutique.</p>
            <router-link :to="{ name: 'MarketplacePublish' }"
                class="mt-8 px-8 py-3 bg-primary text-primary-foreground text-xs font-bold rounded-xl shadow-md hover:translate-y-[-2px] transition-all flex items-center gap-2">
                <i class="fas fa-plus"></i>
                <span>Publier un premier article</span>
            </router-link>
        </div>

        <!-- ═══════════════ MODAL DELETE ═══════════════ -->
        <Teleport to="body">
            <div v-if="productToDelete" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <div class="absolute inset-0 bg-background/80 backdrop-blur-sm" @click="productToDelete = null"></div>
                <div
                    class="relative w-full max-w-md bg-card border border-border rounded-2xl overflow-hidden shadow-xl p-8 space-y-6">
                    <div class="text-center">
                        <h3 class="text-xl font-bold text-foreground">Supprimer le produit ?</h3>
                        <p class="text-muted-foreground text-sm mt-2">
                            L'article <b>{{ productToDelete.name }}</b> sera masqué de la boutique. Cette action est
                            irréversible.
                        </p>
                    </div>
                    <div class="flex gap-3 pt-4">
                        <button @click="productToDelete = null"
                            class="flex-1 px-6 py-3 rounded-xl border border-border text-xs font-semibold hover:bg-muted transition-all">
                            Annuler
                        </button>
                        <button @click="handleDelete"
                            class="flex-1 px-6 py-3 rounded-xl bg-red-500 text-white text-xs font-bold hover:bg-red-600 shadow-lg shadow-red-500/10 transition-all">
                            Supprimer
                        </button>
                    </div>
                </div>
            </div>
        </Teleport>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from '@/../axios';

const products = ref([]);
const isLoading = ref(true);
const activeTab = ref('all');
const searchQuery = ref('');
const productToDelete = ref(null);

const tabs = [
    { label: 'Tous', value: 'all' },
    { label: 'En ligne', value: 'active' },
    { label: 'Indisponibles', value: 'inactive' }
];

const fetchProducts = async () => {
    isLoading.value = true;
    try {
        const params = {};
        if (activeTab.value !== 'all') params.statut = activeTab.value;

        const res = await axios.get('/api/marketplace/vendor/my-products', { params });
        if (res.data.success) {
            products.value = res.data.data.data;
        }
    } catch (err) {
        console.error(err);
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

const confirmDelete = (product) => {
    productToDelete.value = product;
};

const handleDelete = async () => {
    if (!productToDelete.value) return;
    try {
        const res = await axios.delete(`/api/marketplace/items/${productToDelete.value.id}`);
        if (res.data.success) {
            products.value = products.value.filter(p => p.id !== productToDelete.value.id);
            productToDelete.value = null;
        }
    } catch (err) {
        console.error(err);
    }
};

onMounted(fetchProducts);
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
