import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: JSON.parse(localStorage.getItem('cart_items')) || [],
        isOpen: false,
    }),

    getters: {
        totalItems: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
        totalAmount: (state) => state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        isEmpty: (state) => state.items.length === 0,
    },

    actions: {
        addItem(product) {
            const existingItem = this.items.find(item => item.id === product.id && item.type === product.type);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                this.items.push({
                    ...product,
                    quantity: 1
                });
            }
            
            this.saveToLocaleStorage();
            this.isOpen = true; // Open cart when item added
        },

        removeItem(product_id, type) {
            this.items = this.items.filter(item => !(item.id === product_id && item.type === type));
            this.saveToLocaleStorage();
        },

        updateQuantity(product_id, type, quantity) {
            const item = this.items.find(item => item.id === product_id && item.type === type);
            if (item) {
                item.quantity = Math.max(1, quantity);
                this.saveToLocaleStorage();
            }
        },

        clearCart() {
            this.items = [];
            this.saveToLocaleStorage();
        },

        toggleCart() {
            this.isOpen = !this.isOpen;
        },

        saveToLocaleStorage() {
            localStorage.setItem('cart_items', JSON.stringify(this.items));
        }
    }
});
