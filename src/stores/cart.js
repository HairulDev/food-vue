import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
    state: () => ({
        cartItems: [],
    }),
    actions: {
        addToCart(item) {
            // Periksa apakah item sudah ada di dalam keranjang
            const existingItem = this.cartItems.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                // Jika sudah ada, perbarui item tersebut
                this.cartItems = this.cartItems.map(cartItem =>
                    cartItem.id === item.id ? { ...cartItem, ...item } : cartItem
                );
            } else {
                // Jika belum ada, tambahkan item baru ke dalam keranjang
                this.cartItems.push(item);
            }
        },
        updateCart(item) {
            // Perbarui item yang sudah ada di dalam keranjang
            this.cartItems = this.cartItems.map(cartItem =>
                cartItem.id === item.id ? { ...cartItem, ...item } : cartItem
            );
        },
        removeFromCart(itemId) {
            // Hapus item dari keranjang berdasarkan ID
            this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== itemId);
        },
        clearCart() {
            // Kosongkan keranjang
            this.cartItems = [];
        },
        clearPersistedState() {
            // Kembalikan state ke nilai awal
            this.cartItems = [];
        },
    },
});
