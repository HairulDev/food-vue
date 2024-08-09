<template>
  <nav class="bg-blue-500 p-4 fixed w-full top-0 left-0 z-10">
    <div class="container mx-auto flex items-center justify-between">
      <div class="text-white text-xl font-bold">My Store</div>
      <div class="relative">
        <button @click="navigateToCart" class="text-white">
          <i class="fas fa-shopping-cart"></i> 
          <span v-if="cartCount > 0" class="absolute -top-1 -right-1 bg-red-600 text-white rounded-full px-2 text-xs">
            {{ cartCount }}
          </span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue';
import { useCartStore } from '../stores/cart';

export default {
  setup() {
    const cartStore = useCartStore();
    const cartCount = computed(() => cartStore.cartItems.length);

    const navigateToCart = () => {
      console.log("Navigate to cart");
    };

    return { cartCount, navigateToCart };
  },
};
</script>
