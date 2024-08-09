<template>
  <div>
    <div v-if="categoryStore.categories.length === 0" class="flex justify-center items-center h-screen">
      <div class="loader"></div>
    </div>
    <div v-else>
      <div v-for="category in categoryStore.categories" :key="category.id" class="mb-8">
        <h2 class="text-xl text-[#915EFF] font-bold mb-4">{{ category.name }}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <ProductCard
            v-for="item in category.items"
            :key="item.id"
            :id="item.id"
            :title="item.title"
            :price="item.price"
            :imageUrl="item.images.image_url"
            @open-detail-modal="openDetailModal"
          />
        </div>
      </div>
    </div>
    <AddItemModal
      :isOpen="isModalOpen"
      :itemId="selectedItemId"
      @close="isModalOpen = false"
    />
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useCategoryStore } from '../stores/category';
import ProductCard from './ProductCard.vue';
import AddItemModal from './AddItemModal.vue';

export default {
  components: {
    ProductCard,
    AddItemModal,
  },
  setup() {
    const categoryStore = useCategoryStore();
    const { fetchCategories } = categoryStore;
    const isModalOpen = ref(false);
    const selectedItemId = ref(null);

    const openDetailModal = (id) => {
      selectedItemId.value = id;
      isModalOpen.value = true;
    };

    onMounted(() => {
      fetchCategories();
    });

    return { categoryStore, isModalOpen, selectedItemId, openDetailModal };
  },
};
</script>

<style scoped>
/* Your styles here */
</style>
