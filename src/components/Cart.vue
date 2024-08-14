<template>
    <div class="container mx-auto py-8 text-white">
      <h1 class="text-2xl font-bold mb-6">Keranjang Belanja</h1>
      <div v-if="cartItems.length > 0">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr>
              <th class="border-b-2 py-2">Produk</th>
              <th class="border-b-2 py-2">Harga</th>
              <th class="border-b-2 py-2">Jumlah</th>
              <th class="border-b-2 py-2">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartItems" :key="item.id">
              <td class="border-b py-2">{{ item.title }}</td>
              <td class="border-b py-2">{{ formatPrice(item.price) }}</td>
              <td class="border-b py-2">{{ item.quantity }}</td>
              <td class="border-b py-2">{{ formatPrice(item.price * item.quantity) }}</td>
            </tr>
          </tbody>
        </table>
        <div class="mt-6 text-right">
          <span class="text-xl font-bold">Total: {{ formatPrice(totalPrice) }}</span>
        </div>
      </div>
      <div v-else>
        <p class="text-center text-gray-500">Keranjang belanja Anda kosong.</p>
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
  
      return { cartItems, totalPrice, formatPrice };
    }
  };
  </script>
  
  <style scoped>
  /* Gaya tambahan jika diperlukan */
  </style>
  