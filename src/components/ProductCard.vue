<script>
import { ref } from 'vue';
import { convertToRupiah } from '../utils/convertToRupiah';
import { useCartStore } from '../stores/cart';

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const quantity = ref(1);
    const cartStore = useCartStore();

    const increment = () => {
      quantity.value++;
    };

    const decrement = () => {
      if (quantity.value > 1) {
        quantity.value--;
      }
    };

    const formatPrice = (value) => {
      return convertToRupiah(value);
    };

    const addToCart = () => {
      cartStore.addToCart({
        id: props.id,
        title: props.title,
        price: props.price,
        quantity: quantity.value,
        imageUrl: props.imageUrl
      });
    };

    return { quantity, increment, decrement, formatPrice, addToCart };
  },
};
</script>

<template>
  <div
  class="glassmorphism w-[230px] rounded overflow-hidden shadow-lg ">
    <img 
      :src="`https://wnpukijoybwfgrpearge.supabase.co/storage/v1/object/public/food/item/${imageUrl}`" 
      alt="Product image" 
      class="w-full h-[140px]">
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2 orange-text-gradient ">{{ title }}</div>
      <p class="text-gray-200 text-base font-bold">
        {{ formatPrice(price) }}
      </p>
    </div>
  <div class="px-6 py-4">
    <div class="flex items-center">
      <div class="inline-flex w-full items-center border border-gray-500 rounded-lg">
        <button @click="decrement" class="text-gray-100 hover:text-gray-200 px-3 py-2">
          -
        </button>
        <span class="text-lg font-semibold text-gray-300 px-6 text-center w-full">
          {{ quantity }}
        </span>
        <button @click="increment" class="text-gray-100 hover:text-gray-200 px-3 py-2">
          +
        </button>
      </div>
    </div>
  </div>
    <div class="px-6 py-4 flex items-center justify-center">
      <button @click="addToCart" class="bg-[#915EFF]  text-white font-bold py-2 px-4 rounded">
        Add to Cart
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>