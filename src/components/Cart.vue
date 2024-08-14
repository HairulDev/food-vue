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
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartItems" :key="item.id" class="green-text-gradient" >
              <td class="py-5 px-10">{{ item.title }}</td>
              <td class="py-5 px-10 text-right">{{ item.price }}</td>
              <td class="py-5 px-10 text-center">{{ item.quantity }}</td>
              <td class="py-5 px-10 text-right">{{ item.price * item.quantity }}</td>
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
  
      return { cartItems, totalPrice, formatPrice };
    }
  };
  </script>
  
  <style scoped>
  /* Gaya tambahan jika diperlukan */
  </style>
  