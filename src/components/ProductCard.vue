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
  <div class="w-[200px] rounded overflow-hidden shadow-lg bg-white">
    <img 
      :src="`https://wnpukijoybwfgrpearge.supabase.co/storage/v1/object/public/food/item/${imageUrl}`" 
      alt="Product image" 
      class="w-full h-[140px]">
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">{{ title }}</div>
      <p class="text-gray-700 text-base">
        {{ formatPrice(price) }}
      </p>
    </div>
    <div class="px-6 py-4 flex items-center justify-between">
      <button @click="decrement" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        -
      </button>
      <span class="text-lg font-bold">{{ quantity }}</span>
      <button @click="increment" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        +
      </button>
    </div>
    <div class="px-6 py-4 flex items-center justify-center">
      <button @click="addToCart" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
        Add to Cart
      </button>
    </div>
  </div>
</template>
