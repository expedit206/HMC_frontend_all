<template>
  <div class="bg-background min-h-screen pb-20">
    <div v-if="isLoading" class="flex flex-col items-center justify-center py-40">
      <div class="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
      <p class="text-muted-foreground font-black uppercase tracking-widest text-[10px]">
        Chargement du produit...
      </p>
    </div>

    <div v-else-if="item" class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-2 mb-8 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
        <router-link :to="{ name: 'MarketplaceIndex' }"
          class="hover:text-primary transition-colors flex items-center gap-1.5">
          <i class="fas fa-home"></i> Marketplace
        </router-link>
        <span class="text-border">/</span>
        <span class="text-foreground line-clamp-1">{{ item.category }}</span>
      </nav>

      <div class="bg-card rounded-2xl shadow-xl shadow-black/5 border border-border overflow-hidden">
        <div class="flex flex-col lg:flex-row">

          <!-- ─── GAUCHE: IMAGE(S) ───────────────────────────────────────────────────────── -->
          <div class="lg:w-1/2 p-6 lg:p-10 border-b lg:border-b-0 lg:border-r border-border/50 bg-muted/10 relative">
            <div
              class="aspect-squarerounded-xl overflow-hidden bg-muted/30 flex items-center justify-center relative group">
              <!-- Default Image fallback logic -->
              <div v-if="item.image && (item.image.startsWith('fas ') || item.image.startsWith('fab '))"
                class="text-9xl text-primary/20 group-hover:scale-105 transition-transform duration-500">
                <i :class="item.image"></i>
              </div>
              <img v-else :src="item.image || '/placeholder-product.jpg'" :alt="item.name"
                class="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105 p-8"
                @error="onImageError" />

              <!-- Tag "Nouveau" -->
              <div v-if="item.isNew"
                class="absolute top-6 left-6 px-3 py-1 bg-secondary text-secondary-foreground text-[10px] font-black uppercase tracking-widest rounded shadow-sm">
                Nouveau
              </div>
            </div>

            <!-- Miniatures (Simulées si pas de tableau d'images, mais prévues pour UI) -->
            <div class="grid grid-cols-4 gap-3 mt-4">
              <div
                class="aspect-square rounded-lg bg-card border-2 border-primary cursor-pointer overflow-hidden opacity-100 p-2">
                <img v-if="item.image && !item.image.startsWith('fas ')" :src="item.image"
                  class="w-full h-full object-contain mix-blend-multiply" @error="onImageError" />
                <i v-else :class="item.image || 'fas fa-box'"
                  class="w-full h-full flex items-center justify-center text-primary/30 text-2xl"></i>
              </div>
              <div v-for="i in 3" :key="i"
                class="aspect-square rounded-lg bg-muted/30 border-2 border-transparent hover:border-primary/30 cursor-pointer transition-all overflow-hidden opacity-60 hover:opacity-100 flex items-center justify-center">
                <i class="fas fa-image text-muted-foreground/30 text-xl"></i>
              </div>
            </div>
          </div>

          <!-- ─── DROITE: INFOS DU PRODUIT ─────────────────────────────────────────────── -->
          <div class="lg:w-1/2 p-6 lg:p-10 flex flex-col">

            <!-- Entête -->
            <div class="mb-6">
              <div class="flex items-center justify-between mb-3">
                <span
                  class="inline-flex px-2.5 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded">
                  {{ item.category }}
                </span>
                <div
                  class="flex items-center gap-1.5 text-xs text-yellow-500 font-bold bg-yellow-500/10 px-2 py-1 rounded">
                  <i class="fas fa-star"></i>
                  <span>{{ item.rating || '4.8' }}</span>
                  <span class="text-muted-foreground/60">({{ item.reviews || 12 }} avis)</span>
                </div>
              </div>

              <h1 class="text-2xl lg:text-3xl font-black text-foreground mb-4 leading-tight">
                {{ item.name }}
              </h1>

              <div
                class="flex items-center gap-2 text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
                <i class="fas fa-map-marker-alt text-secondary"></i> {{ item.location || 'Cameroun' }}
              </div>
            </div>

            <!-- Bloc Prix & Stock -->
            <div class="mb-8 p-6 bg-muted/20 rounded-xl border border-border/50 relative overflow-hidden">
              <div
                class="absolute right-0 top-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2">
              </div>

              <div class="relative z-10">
                <div v-if="item.oldPrice" class="text-muted-foreground line-through text-sm font-bold mb-1 opacity-60">
                  {{ formatPrice(item.oldPrice) }}
                </div>
                <div class="text-3xl font-black text-primary flex items-baseline gap-2">
                  {{ formatPrice(item.price) }}
                  <span v-if="item.discount"
                    class="text-xs font-bold text-white bg-red-500 px-2 py-0.5 rounded-md align-middle shadow-sm">
                    -{{ item.discount }}%
                  </span>
                </div>

                <div class="mt-4 flex items-center gap-2 text-xs font-bold"
                  :class="item.stock === 0 ? 'text-red-500' : 'text-green-600'">
                  <i class="fas" :class="item.stock === 0 ? 'fa-times-circle' : 'fa-check-circle'"></i>
                  {{ item.stock === 0 ? 'Rupture de stock' : 'En stock et prêt à expédier' }}
                </div>
              </div>
            </div>

            <!-- Description -->
            <div class="mb-8 flex-1">
              <h3 class="text-[10px] font-black text-foreground uppercase tracking-[0.2em] mb-3">À propos de cet article
              </h3>
              <p class="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {{ item.description || "Aucune description de l'article." }}
              </p>
            </div>

            <!-- Actions Fixes (Panier & Favoris) -->
            <div class="mt-auto space-y-3 pt-6 border-t border-border">
              <!-- Quantité + Ajout -->
              <div class="flex gap-3 h-12">
                <div class="flex items-center border border-border bg-card rounded-lg overflow-hidden w-28 shrink-0">
                  <button @click="quantity = Math.max(1, quantity - 1)"
                    class="w-10 h-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex items-center justify-center">
                    <i class="fas fa-minus text-xs"></i>
                  </button>
                  <input type="number" v-model="quantity"
                    class="flex-1 w-full text-center text-sm font-black border-none focus:ring-0 p-0" min="1" />
                  <button @click="quantity++"
                    class="w-10 h-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex items-center justify-center">
                    <i class="fas fa-plus text-xs"></i>
                  </button>
                </div>

                <button @click="buyNow" :disabled="item.stock === 0 || isProcessing"
                  class="flex-1 bg-[#1B0B38] text-white font-black text-xs uppercase tracking-widest rounded-lg shadow-md hover:bg-primary hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                  <i v-if="isProcessing" class="fas fa-circle-notch fa-spin"></i>
                  <i v-else class="fas fa-bolt"></i>
                  <span class="hidden sm:inline">Acheter maintenant</span><span class="sm:hidden">Acheter</span>
                </button>
              </div>

              <!-- Favoris / Panier Standard -->
              <div class="flex gap-3">
                <button @click="addToCart" :disabled="item.stock === 0"
                  class="flex-1 h-12 border border-border bg-card text-foreground font-bold text-[10px] uppercase tracking-widest rounded-lg hover:border-primary/50 transition-all flex items-center justify-center gap-2 group">
                  <i class="fas fa-cart-plus text-primary"></i>
                  Ajouter au panier
                </button>
                <button
                  class="w-12 h-12 border border-border bg-card text-foreground rounded-lg hover:border-red-500/50 hover:bg-red-500/5 transition-all flex items-center justify-center group">
                  <i class="far fa-heart text-muted-foreground group-hover:text-red-500 transition-colors"></i>
                </button>
              </div>
            </div>

          </div>
        </div>

        <!-- ─── BOUTIQUE / VENDEUR (Bas) ────────────────────────────────────────────────── -->
        <div
          class="bg-muted/30 border-t border-border/50 p-6 lg:px-10 flex flex-col sm:flex-row items-center gap-5 justify-between">
          <div class="flex items-center gap-4">
            <div
              class="w-14 h-14 rounded-full bg-card border border-border shadow-sm flex items-center justify-center overflow-hidden shrink-0 text-primary">
              <img v-if="item.seller?.avatar" :src="item.seller.avatar" class="w-full h-full object-cover"
                @error="e => e.target.style.display = 'none'" />
              <i v-else class="fas fa-store text-xl"></i>
            </div>
            <div>
              <p class="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1">Vendu et expédié par
              </p>
              <p class="text-sm font-bold text-foreground">{{ item.seller?.name || 'Vendeur Indépendant' }}</p>
              <div class="flex items-center gap-1.5 mt-1 text-[10px] text-muted-foreground font-medium">
                <i class="fas fa-shield-alt text-green-500"></i> Vendeur de confiance
              </div>
            </div>
          </div>

          <router-link :to="{ name: 'VendeurBoutique', params: { id: item.seller?.id || 1 } }"
            class="w-full sm:w-auto px-6 py-2.5 bg-card border border-border rounded-md text-xs font-bold text-foreground hover:bg-muted transition-colors flex items-center justify-center">
            Voir la boutique
          </router-link>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "../axios";
import { useCartStore } from "../stores/cart";

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();

const item = ref(null);
const isLoading = ref(true);
const isProcessing = ref(false);
const quantity = ref(1);

const buyNow = async () => {
  if (!item.value) return;

  isProcessing.value = true;
  try {
    const { data } = await axios.post('/api/marketplace/checkout', {
      product_id: item.value.id,
      quantity: quantity.value,
      delivery_fee: 0, // Idéalement calculé
    });

    if (data.success && data.data.payment_url) {
      // Redirection vers NotchPay
      window.location.href = data.data.payment_url;
    }
  } catch (err) {
    console.error("Erreur initiation achat:", err);
    alert(err.response?.data?.message || "Une erreur est survenue lors de l'initiation du paiement.");
  } finally {
    isProcessing.value = false;
  }
};

const fetchItem = async () => {
  isLoading.value = true;
  try {
    const { id } = route.params;
    const type = route.query.type || "product";
    const { data } = await axios.get(`/api/marketplace/items/${id}`, { params: { type } });
    if (data.success) {
      item.value = data.data;
    }
  } catch (err) {
    console.error("Erreur chargement article:", err);
    router.push({ name: 'MarketplaceIndex' });
  } finally {
    isLoading.value = false;
  }
};

const formatPrice = (price) => {
  if (!price && price !== 0) return '—';
  return new Intl.NumberFormat("fr-CM", {
    style: "currency",
    currency: "XAF",
    maximumFractionDigits: 0,
  }).format(price);
};

const addToCart = () => {
  if (!item.value) return;
  cartStore.addItem(item.value, quantity.value);
};

const onImageError = (e) => {
  e.target.src = 'https://placehold.co/600x600/f5f0ff/6b21a8?text=Produit';
};

onMounted(fetchItem);
</script>

<style scoped>
/* Suppression des flèches natives pour input number */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>
