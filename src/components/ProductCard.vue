<template>
  <div class="glassmorphism w-[200px] min-h-[330px] max-h-[400px] rounded overflow-hidden shadow-lg">
    <img
      :src="`${import.meta.env.VITE_APP_STORAGE}/storage/v1/object/public/food/item/${imageUrl}`"
      alt="Product image"
      class="w-full h-[130px]"
    />
    <div class="px-6 py-2">
      <div class="font-bold text-xl mb-2 orange-text-gradient">
        {{ title }}
      </div>
      <p class="text-gray-200 text-base font-bold">
        {{ formatPrice(price) }} / {{ unit }}
      </p>
    </div>
    <div class="px-6 py-3">
      <div class="flex items-center">
        <div class="inline-flex w-full items-center border border-gray-500 rounded-lg">
          <button @click="decrement" class="text-gray-100 hover:text-gray-200 px-3 py-2">
            -
          </button>
          <span class="text-base text-gray-300 px-6 text-center w-full">
            {{ quantity }}
          </span>
          <button @click="increment" class="text-gray-100 hover:text-gray-200 px-3 py-2">
            +
          </button>
        </div>
      </div>
    </div>
    <div class="px-4 py-2 flex items-center justify-between">
      <button @click="openDetailModal" class="green-text-gradient font-bold py-2 px-4 rounded">
        Detail
      </button>
      <button @click="addToCart" class="blue-text-gradient font-bold py-2 px-6 rounded">
        <svg width="23px" height="23px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"/>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
        <g id="SVGRepo_iconCarrier"> 
          <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" 
            stroke="#56ccf2" 
            stroke-width="2" 
            stroke-linecap="round" 
            stroke-linejoin="round"/> 
        </g>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { convertToRupiah } from '../utils/convertToRupiah';
import { useCartStore } from '../stores/cart';

export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
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
      const existingItem = cartStore.cartItems.find((item) => item.id === props.id);

      if (!existingItem) {
        if (quantity.value > 0) {
          cartStore.addToCart({
            id: props.id,
            title: props.title,
            price: props.price,
            unit: props.unit,
            quantity: quantity.value,
            imageUrl: props.imageUrl,
          });
        }
      } else {
        const updatedQuantity = existingItem.quantity + quantity.value;
        cartStore.updateCart({
          ...existingItem,
          quantity: updatedQuantity,
          subtotal: updatedQuantity * props.price,
        });
      }

      quantity.value = 1;
    };

    const openDetailModal = () => {
      emit('open-detail-modal', props.id);
    };

    return { quantity, increment, decrement, formatPrice, addToCart, openDetailModal };
  },
};
</script>

<style scoped>
/* Your styles here */
</style>
