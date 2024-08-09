div<template>
    <div>
      <div v-if="categoryStore.categories.lenght === 0 " class="flex justify-center items-center h-screen">
        <div class="loader"></div>
    </div>
    <div v-else> <div v-for="category in categoryStore.categories" :key="category.id" class="mb-8">
            <h2 class="text-2xl font-bold mb-4">{{ category.name }}</h2>
            <div class="flex gap-4">
              <ProductCard
                v-for="item in category.items"
                :key="item.id"
                :title="item.title"
                :price="item.price"
                :imageUrl="item.images.image_url"
              />
            </div>
          </div>
      </div>
    </div>
  </template>
  
  <script>
  import { onMounted, watch } from 'vue';
  import { useCategoryStore } from '../stores/category';
  import ProductCard from './ProductCard.vue';
  
  export default {
    components: {
      ProductCard,
    },
    setup() {
      const categoryStore = useCategoryStore();
      const { categories, fetchCategories } = categoryStore;
  
      onMounted(() => {
        console.log("Mounted and fetching categories...");
        fetchCategories();
      });
  
      watch(
        () => categoryStore.categories,
        (newCategories) => {
          console.log("categoryStore.categories.lenght: ", categoryStore.categories.length);
        },
        { deep: true } 
      );
  
      return { categories,  categoryStore };
    },
  };
  </script>
  
  <style>
  .loader {
    border: 4px solid rgba(0,0,0,0.1);
    border-radius: 50%;
    border-top: 4px solid #3498db;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>
  