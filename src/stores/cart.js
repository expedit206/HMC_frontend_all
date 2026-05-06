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
        addItem(product, quantity = 1) {
            const existingItem = this.items.find(item => item.id === product.id && item.type === product.type);
            
            if (existingItem) {
                existingItem.quantity += parseInt(quantity);
            } else {
                this.items.push({
                    ...product,
                    quantity: parseInt(quantity)
                });
            }
            
            this.saveToLocaleStorage();
            this.isOpen = true; // Open cart when item added
        },

        removeItem(product_id, type = 'product') {
            this.items = this.items.filter(item => !(item.id === product_id && item.type === type));
            this.saveToLocaleStorage();
        },

        updateQuantity(product_id, type = 'product', quantity) {
            const item = this.items.find(item => item.id === product_id && item.type === type);
            if (item) {
                item.quantity = Math.max(1, quantity);
                this.saveToLocaleStorage();
            }
        },

        increaseQuantity(product_id, type = 'product') {
            const item = this.items.find(item => item.id === product_id && item.type === type);
            if (item) {
                item.quantity += 1;
                this.saveToLocaleStorage();
            }
        },

        decreaseQuantity(product_id, type = 'product') {
            const item = this.items.find(item => item.id === product_id && item.type === type);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                this.saveToLocaleStorage();
            } else if (item && item.quantity === 1) {
                this.removeItem(product_id, type);
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
