<template>
  <nav class="p-4 fixed w-full top-0 left-0 z-10 bg-transparent">
    <div class="container mx-auto flex items-center justify-between">
      <div class="text-white font-bold flex space-x-4"> 
        <router-link 
          v-for="(link, index) in navLinks" 
          :key="index" 
          :to="link.path" 
          class="font-bold blue-text-gradient">
          {{ link.name }}
        </router-link>
      </div>
      <div class="relative flex items-center">
        <div class="relative">
          <input 
            type="text" 
            v-model="searchQuery" 
            @input="search"
            :class="[
              'px-4 py-1 rounded-lg text-[#2f80ed] min-w-[160px] pr-10 border',
              isScrolled ? 'bg-transparent border-gray-500' : 'bg-gray-200 border-gray-400'
            ]"
            placeholder="Search for products..."
          />
          <button 
            v-if="searchQuery" 
            @click="clearSearch" 
            class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 8.586l3.95-3.95a1 1 0 111.415 1.415L11.415 10l3.95 3.95a1 1 0 01-1.415 1.415L10 11.415l-3.95 3.95a1 1 0 01-1.415-1.415L8.586 10 4.636 6.05a1 1 0 011.415-1.415L10 8.586z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        <button @click="navigateToCart" class="ml-4 relative">
          <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"/>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
            <g id="SVGRepo_iconCarrier"> 
              <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" 
                stroke="#ffffff" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round"/> 
            </g>
          </svg>
          <span 
            v-if="cartCount > 0" 
            :class="{'animate-pulse': pulseActive}" 
            class="absolute -top-2 -right-1 bg-red-600 text-white rounded-full px-2 text-xs"
          >
            {{ cartCount }}
          </span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { computed, ref, watch, onMounted, onUnmounted } from 'vue';
import { useItemStore } from '../stores/item';
import { useCartStore } from '../stores/cart';
import { navLinks } from '@/constans/navLinks';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const cartStore = useCartStore();
    const cartCount = computed(() => cartStore.cartItems.length);
    const pulseActive = ref(false);
    const itemStore = useItemStore();
    const searchQuery = ref('');
    const router = useRouter();
    const isScrolled = ref(false);

    const navigateToCart = () => {
      router.push('/cart');
    };

    const search = () => {
      itemStore.searchProducts(searchQuery.value);
    };

    const clearSearch = () => {
      searchQuery.value = '';
      itemStore.getProducts();
    };

    const handleScroll = () => {
      isScrolled.value = window.scrollY > 50; 
    };

    watch(cartCount, (newVal, oldVal) => {
    console.log("cartStore.cartItems===>>",cartStore.cartItems)
      if (newVal !== oldVal) {
        pulseActive.value = true;
        setTimeout(() => {
          pulseActive.value = false;
        }, 500);
      }
    });

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return { navLinks, searchQuery, search, clearSearch, cartCount, navigateToCart, isScrolled, pulseActive };
  }
};
</script>

<style scoped>
@keyframes pulseAnimation {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.animate-pulse {
  animation: pulseAnimation 0.5s ease-in-out;
}
</style>
