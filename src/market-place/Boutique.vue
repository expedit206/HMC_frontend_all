<template>
    <div class="bg-background min-h-screen animate-in fade-in duration-700">

        <!-- ═══════════════ VENDOR COVER & PROFILE ═══════════════ -->
        <div class="relative h-64 lg:h-80 bg-primary/10 overflow-hidden">
            <!-- Motif de fond premium -->
            <div
                class="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#1B0B38_1px,transparent_0)] [background-size:20px_20px]">
            </div>
            <div class="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>

            <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-8">
                <div class="flex flex-col md:flex-row items-center md:items-end gap-6 w-full">
                    <!-- Avatar -->
                    <div class="relative group">
                        <div
                            class="w-32 h-32 lg:w-40 lg:h-40 rounded-[32px] bg-card border-4 border-background shadow-2xl p-1 overflow-hidden transition-transform duration-500 group-hover:scale-105">
                            <img :src="seller.avatar || 'https://ui-avatars.com/api/?name=' + seller.name"
                                class="w-full h-full object-cover rounded-[28px]" />
                        </div>
                        <div
                            class="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-background flex items-center justify-center text-white text-[10px]">
                            <i class="fas fa-check"></i>
                        </div>
                    </div>

                    <!-- Info -->
                    <div class="flex-1 text-center md:text-left space-y-2">
                        <div class="flex items-center justify-center md:justify-start gap-4">
                            <h1 class="text-3xl lg:text-5xl font-black text-foreground italic tracking-tight">{{
                                seller.name }}</h1>
                            <span
                                class="hidden md:flex px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">Vendeur
                                vérifié</span>
                        </div>
                        <div
                            class="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                            <span class="flex items-center gap-2"><i class="fas fa-map-marker-alt text-primary/50"></i>
                                {{ seller.city || 'Cameroun' }}</span>
                            <span class="flex items-center gap-2"><i class="fas fa-calendar-alt text-primary/50"></i>
                                Membre depuis {{ seller.since }}</span>
                        </div>
                    </div>

                    <!-- Quick Stats -->
                    <div class="flex items-center gap-4">
                        <div
                            class="bg-card/50 backdrop-blur-md border border-border px-6 py-4 rounded-[24px] text-center shadow-xl shadow-black/5">
                            <p class="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">
                                Ventes</p>
                            <p class="text-xl font-black text-foreground">{{ stats.ventes }}</p>
                        </div>
                        <div
                            class="bg-card/50 backdrop-blur-md border border-border px-6 py-4 rounded-[24px] text-center shadow-xl shadow-black/5">
                            <p class="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">
                                Produits</p>
                            <p class="text-xl font-black text-foreground">{{ stats.produits_actifs }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ═══════════════ MAIN CONTENT ═══════════════ -->
        <main class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">

            <div class="flex items-center justify-between mb-10">
                <h2
                    class="text-2xl font-black text-foreground flex items-center gap-4 italic uppercase tracking-tighter">
                    Tous les articles
                    <span class="h-1 w-12 bg-primary rounded-full"></span>
                </h2>

                <div class="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                    {{ products.length }} trésors disponibles
                </div>
            </div>

            <!-- Grid -->
            <div v-if="isLoading"
                class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-8">
                <div v-for="n in 12" :key="n" class="h-64 bg-muted animate-pulse rounded-3xl"></div>
            </div>

            <div v-else-if="products.length > 0"
                class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10">
                <div v-for="product in products" :key="product.id" @click="goToDetail(product.id)"
                    class="group cursor-pointer space-y-3">
                    <div
                        class="relative aspect-square rounded-[28px] overflow-hidden bg-muted border border-border group-hover:shadow-2xl group-hover:shadow-primary/20 transition-all duration-500">
                        <img :src="product.image"
                            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div
                            class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        </div>
                        <div
                            class="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all flex justify-between items-center text-white">
                            <span class="text-[10px] font-black uppercase tracking-widest">{{ product.condition
                                }}</span>
                            <i class="fas fa-arrow-right-long"></i>
                        </div>
                    </div>
                    <div class="px-1 space-y-1">
                        <p class="text-[9px] font-black text-primary uppercase tracking-widest">{{ product.category }}
                        </p>
                        <h3
                            class="text-sm font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                            {{ product.name }}</h3>
                        <div class="flex items-center gap-2">
                            <span class="text-sm font-black text-foreground">{{ formatPrice(product.price) }}</span>
                            <span v-if="product.old_price"
                                class="text-[10px] text-muted-foreground line-through decoration-primary/50">{{
                                formatPrice(product.old_price) }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Empty -->
            <div v-else class="flex flex-col items-center justify-center py-32 text-center opacity-40">
                <i class="fas fa-box-open text-6xl mb-6"></i>
                <h3 class="text-xl font-black uppercase tracking-widest">Boutique vide</h3>
                <p class="text-sm mt-2">Ce vendeur n'a aucun article en ligne pour le moment.</p>
            </div>

        </main>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from '@/../axios';

const route = useRoute();
const router = useRouter();

const seller = ref({});
const stats = ref({});
const products = ref([]);
const isLoading = ref(true);

const fetchBoutiqueData = async () => {
    try {
        const { data } = await axios.get(`/api/marketplace/vendors/${route.params.id}`);
        if (data.success) {
            seller.value = data.data.seller;
            stats.value = data.data.stats;
            products.value = data.data.products;
        }
    } catch (err) {
        console.error(err);
        router.push({ name: 'MarketplaceIndex' });
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

const goToDetail = (id) => {
    router.push({ name: 'MarketplaceDetail', params: { id } });
};

onMounted(fetchBoutiqueData);
</script>

<style scoped>
.animate-in {
    animation: slideIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(40px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
