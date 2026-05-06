<template>
    <div v-if="sidebarStore.isMobileOpen" @click="sidebarStore.toggleMobile()"
        class="md:hidden fixed inset-0 top-[64px] sm:top-[80px] bg-black/50 backdrop-blur-sm z-40"></div>

    <aside :class="[
        'fixed inset-y-0 left-0 top-[64px] sm:top-[80px] h-[calc(100vh-64px)] sm:h-[calc(100vh-80px)] w-72 bg-card border-r border-border transition-transform overflow-y-auto custom-scrollbar z-50',
        'md:sticky md:top-[80px] md:translate-x-0',
        sidebarStore.isMobileOpen ? 'translate-x-0' : '-translate-x-full'
    ]">
        <div class="p-6 space-y-8">

            <!-- Marketplace Intro -->
            <div>
                <h2 class="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">Marketplace</h2>
                <nav class="space-y-1">
                    <RouterLink v-for="link in mainLinks" :key="link.to" :to="link.to"
                        class="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition-all nav-link"
                        active-class="bg-primary/5 text-primary shadow-sm border border-primary/10">
                        <i :class="link.icon" class="w-5 text-center transition-transform group-hover:scale-110"></i>
                        <span>{{ link.name }}</span>
                    </RouterLink>
                </nav>
            </div>

            <!-- Mes Achats (Si connecté) -->
            <div v-if="authStore.isAuthenticated">
                <h2 class="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">Mes Achats</h2>
                <nav class="space-y-1">
                    <RouterLink to="/marketplace/orders"
                        class="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition-all nav-link"
                        active-class="bg-primary/5 text-primary shadow-sm border border-primary/10">
                        <i class="fas fa-shopping-basket w-5 text-center"></i>
                        <span>Mes Commandes</span>
                    </RouterLink>
                </nav>
            </div>

            <!-- Vendre Section -->
            <div class="pt-4 border-t border-border">
                <RouterLink v-if="authStore.isAuthenticated" :to="{ name: 'MarketplacePublish' }"
                    class="flex items-center justify-center gap-2 w-full py-3 bg-primary text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-primary/20 transition-all mb-4">
                    <i class="fas fa-plus"></i>
                    <span>Vendre un article</span>
                </RouterLink>

                <div v-if="authStore.isAuthenticated">
                    <h2 class="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">Espace
                        Vendeur</h2>
                    <nav class="space-y-1">
                        <RouterLink v-for="link in vendorLinks" :key="link.to" :to="link.to"
                            class="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition-all nav-link"
                            active-class="bg-primary/5 text-primary shadow-sm border border-primary/10">
                            <i :class="link.icon" class="w-5 text-center"></i>
                            <span>{{ link.name }}</span>
                        </RouterLink>
                    </nav>
                </div>
            </div>

            <!-- Aide & Contact -->
            <div class="pt-4 border-t border-border">
                <nav class="space-y-1">
                    <RouterLink to="/marketplace/aide"
                        class="flex items-center gap-3 px-4 py-2 rounded-xl text-[11px] font-bold text-muted-foreground hover:text-primary transition-colors">
                        <i class="fas fa-question-circle w-4"></i>
                        <span>Centre d'aide</span>
                    </RouterLink>
                    <RouterLink to="/marketplace/contact"
                        class="flex items-center gap-3 px-4 py-2 rounded-xl text-[11px] font-bold text-muted-foreground hover:text-primary transition-colors">
                        <i class="fas fa-headset w-4"></i>
                        <span>Contacter le support</span>
                    </RouterLink>
                </nav>
            </div>

        </div>
    </aside>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useAuthStore } from '../../stores/auth';
import { useSidebarStore } from '../../stores/sidebar';

const authStore = useAuthStore();
const sidebarStore = useSidebarStore();

const mainLinks = [
    { name: 'Explorer', to: '/marketplace', icon: 'fas fa-store' },
    // { name: 'Catégories', to: '/marketplace', icon: 'fas fa-th-large' },
];

const vendorLinks = [
    { name: 'Dashboard', to: '/marketplace/seller/dashboard', icon: 'fas fa-chart-pie' },
    { name: 'Mes Produits', to: '/marketplace/seller/produits', icon: 'fas fa-box' },
    { name: 'Commandes Reçues', to: '/marketplace/seller/commandes', icon: 'fas fa-truck-loading' },
];
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: hsl(var(--border));
    border-radius: 10px;
}

.nav-link.active i {
    color: hsl(var(--primary));
}
</style>
