<template>
  <div class="container mx-auto py-40">
    <h1 class="text-2xl mb-6 orange-text-gradient">Keranjang Belanja</h1>
    <div v-if="cartItems.length > 0">
      <table class="w-full text-left border glassmorphism">
        <thead>
          <tr class="text-center green-text-gradient">
            <th class="border-b-2 py-5 px-10">Produk</th>
            <th class="border-b-2 py-5 px-10">Harga</th>
            <th class="border-b-2 py-5 px-10">Qty</th>
            <th class="border-b-2 py-5 px-10">Subtotal</th>
            <th class="border-b-2 py-5 px-10">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cartItems" :key="item.id" class="green-text-gradient">
            <td class="py-5 px-10">{{ item.title }}</td>
            <td class="py-5 px-10 text-right">{{ formatPrice(item.price) }}</td>
            <td class="py-5 px-10 text-center">
              <input 
                v-model.number="item.quantity" 
                @change="updateItemQuantity(item)" 
                class="w-[80px] px-3 py-2 border rounded white-text-gradient" 
                type="number" 
                min="1"
              />
            </td>
            <td class="py-5 px-10 text-right">{{ formatPrice(item.price * item.quantity) }}</td>
            <td class="py-5 px-10 text-center">
              <button @click="removeItem(item.id)" class="bg-transparent text-white font-bold py-2 px-4 rounded">
                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                  <g id="SVGRepo_iconCarrier"> 
                    <path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" stroke="#d34545" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> 
                  </g>
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="mt-6 text-right green-text-gradient">
        <span class="text-xl">Total: {{ formatPrice(totalPrice) }}</span>
      </div>
    </div>
    <div v-else>
      <p class="text-center green-text-gradient">Keranjang belanja Anda kosong.</p>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useCartStore } from '../stores/cart';
import { convertToRupiah } from '../utils/convertToRupiah';

export default {
  setup() {
    const cartStore = useCartStore();

    const cartItems = computed(() => cartStore.cartItems);
    const totalPrice = computed(() =>
      cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0)
    );

    const formatPrice = (value) => {
      return convertToRupiah(value);
    };

    const removeItem = (itemId) => {
      cartStore.removeFromCart(itemId);
    };

    const updateItemQuantity = (item) => {
      if (item.quantity < 1) {
        item.quantity = 1;
      }
      cartStore.updateCart(item);
    };

    return { cartItems, totalPrice, formatPrice, removeItem, updateItemQuantity };
  }
};
</script>

<style scoped>
/* Gaya tambahan jika diperlukan */
</style>
