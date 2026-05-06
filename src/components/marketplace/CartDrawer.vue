<template>
  <Transition name="slide">
    <div v-if="isOpen" class="fixed inset-0 z-50 overflow-hidden">
      <!-- Overlay -->
      <div
        @click="cartStore.toggleCart()"
        class="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
      ></div>

      <div
        class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10"
      >
        <div
          class="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out sm:duration-700"
        >
          <div class="flex h-full flex-col bg-card shadow-2xl border-l border-border">
            <!-- Header -->
            <div
              class="flex items-center justify-between px-6 py-6 border-b border-border"
            >
              <h2
                class="text-xl font-black text-primary uppercase tracking-tight flex items-center gap-3"
              >
                <i class="fas fa-shopping-basket"></i> Mon Panier
                <span
                  class="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary"
                >
                  {{ cartStore.totalItems }}
                </span>
              </h2>
              <button
                @click="cartStore.toggleCart()"
                class="rounded-full p-2 text-muted-foreground hover:bg-muted/20 hover:text-foreground transition-all"
              >
                <i class="fas fa-times text-xl"></i>
              </button>
            </div>

            <!-- Content -->
            <div class="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar">
              <div
                v-if="cartStore.isEmpty"
                class="h-full flex flex-col items-center justify-center text-center space-y-4"
              >
                <div
                  class="w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center text-muted-foreground/30"
                >
                  <i class="fas fa-shopping-cart text-4xl"></i>
                </div>
                <p class="text-muted-foreground font-medium">Votre panier est vide</p>
                <button
                  @click="cartStore.toggleCart()"
                  class="text-primary font-bold text-sm hover:text-secondary transition-colors"
                >
                  Continuer mes achats
                </button>
              </div>

              <ul v-else class="space-y-6">
                <li
                  v-for="item in cartStore.items"
                  :key="item.id + item.type"
                  class="flex items-center gap-4 group"
                >
                  <div
                    class="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-border bg-muted/20 flex items-center justify-center"
                  >
                    <img
                      v-if="!item.image?.startsWith('fas ')"
                      :src="
                        item.image ||
                        'https://placehold.co/100x100?text=Produit'
                      "
                      :alt="item.name"
                      class="h-full w-full object-cover"
                    />
                    <i
                      v-else
                      :class="item.image"
                      class="text-3xl text-muted-foreground/30"
                    ></i>
                  </div>

                  <div class="flex flex-1 flex-col">
                    <div
                      class="flex justify-between text-base font-bold text-foreground"
                    >
                      <h3 class="line-clamp-1">{{ item.name }}</h3>
                      <p class="ml-4 whitespace-nowrap text-secondary">
                        {{ formatPrice(item.price * item.quantity) }}
                      </p>
                    </div>
                    <p
                      class="mt-1 text-xs text-muted-foreground uppercase font-black tracking-widest"
                    >
                      {{ item.category }}
                    </p>

                    <div
                      class="flex flex-1 items-end justify-between text-sm mt-3"
                    >
                      <div
                        class="flex items-center border border-border rounded-lg bg-muted/10 h-8"
                      >
                        <button
                          @click="cartStore.decreaseQuantity(item.id, item.type)"
                          class="w-8 h-full hover:bg-muted/30 text-muted-foreground transition-all flex items-center justify-center border-r border-border"
                        >
                          <i class="fas fa-minus text-[10px]"></i>
                        </button>
                        <span class="px-3 font-black text-xs min-w-[2rem] text-center text-foreground">{{
                          item.quantity
                        }}</span>
                        <button
                          @click="cartStore.increaseQuantity(item.id, item.type)"
                          class="w-8 h-full hover:bg-muted/30 text-muted-foreground transition-all flex items-center justify-center border-l border-border"
                        >
                          <i class="fas fa-plus text-[10px]"></i>
                        </button>
                      </div>

                      <button
                        @click="cartStore.removeItem(item.id, item.type)"
                        class="text-destructive/60 hover:text-destructive font-black text-[10px] uppercase tracking-widest flex items-center gap-1.5 transition-all"
                      >
                        <i class="far fa-trash-alt"></i> Supprimer
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <!-- Footer -->
            <div
              v-if="!cartStore.isEmpty"
              class="border-t border-border px-6 py-8 bg-muted/5 relative overflow-hidden"
            >
              <div class="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-black/5 to-transparent pointer-events-none"></div>

              <div
                class="flex justify-between text-base font-black text-foreground mb-1"
              >
                <p class="uppercase tracking-widest text-xs">Total de la commande</p>
                <p class="text-xl text-primary">
                  {{ formatPrice(cartStore.totalAmount) }}
                </p>
              </div>
              <p class="text-[10px] text-muted-foreground mb-8 font-bold italic">
                Frais de livraison calculés lors de la confirmation
              </p>

              <div class="space-y-4 relative z-10">
                <button
                  @click="handleCheckout"
                  :disabled="isProcessing"
                  class="w-full flex items-center justify-center rounded-2xl bg-primary px-6 py-4 text-xs font-black text-primary-foreground shadow-xl shadow-primary/20 hover:bg-primary/90 hover:shadow-2xl hover:shadow-primary/30 transition-all active:scale-95 uppercase tracking-[0.2em] disabled:opacity-50"
                >
                  <i v-if="isProcessing" class="fas fa-circle-notch fa-spin mr-3"></i>
                  <i v-else class="fas fa-credit-card mr-3"></i>
                  Passer à la caisse
                </button>
                <button
                  @click="cartStore.toggleCart()"
                  class="w-full text-center text-muted-foreground font-black text-[10px] hover:text-foreground transition-all uppercase tracking-widest"
                >
                  Ou continuer mes achats
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "../../stores/cart";
import { useAuthStore } from "../../stores/auth";
import axios from "../../axios";

const router = useRouter();
const cartStore = useCartStore();
const authStore = useAuthStore();

const isOpen = computed(() => cartStore.isOpen);
const isProcessing = ref(false);

const handleCheckout = async () => {
    if (!authStore.isAuthenticated) {
        cartStore.toggleCart();
        router.push({ name: 'Connexion', query: { redirect: router.currentRoute.value.fullPath } });
        return;
    }

    if (cartStore.isEmpty) return;

    isProcessing.value = true;
    try {
        const payload = {
            items: cartStore.items.map(item => ({
                id: item.id,
                quantity: item.quantity
            }))
        };

        const { data } = await axios.post('/api/marketplace/checkout-cart', payload);
        
        if (data.success && data.data.payment_url) {
            // Optionnel: Vider le panier peut se faire après le retour de NotchPay ou ici
            // On le garde ici pour le POC, mais idéalement on attend le webhook
            // cartStore.clearCart(); 
            window.location.href = data.data.payment_url;
        }
    } catch (err) {
        console.error("Erreur checkout panier:", err);
        alert(err.response?.data?.message || "Une erreur est survenue lors de l'initiation de la commande.");
    } finally {
        isProcessing.value = false;
    }
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("fr-CM", {
    style: "currency",
    currency: "XAF",
    maximumFractionDigits: 0,
  }).format(price);
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}

.slide-enter-from .fixed.inset-y-0.right-0,
.slide-leave-to .fixed.inset-y-0.right-0 {
  transform: translateX(100%);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: hsl(var(--secondary));
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--primary));
}
</style>