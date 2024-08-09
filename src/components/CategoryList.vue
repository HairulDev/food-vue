
<template>
  <div>
    <div v-if="itemStore.categories.length === 0" class="flex justify-center items-center h-screen">
      <div class="loader"></div>
    </div>
    <div v-else>
      <!-- Iterasi untuk setiap kategori -->
      <div v-for="category in itemStore.categories" :key="category.id" class="mb-8">
        <h2 class="text-xl text-[#915EFF] font-bold mb-4">{{ category.name }}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <!-- Iterasi untuk setiap item dalam kategori -->
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
    <!-- Komponen AddItemModal untuk menambah atau mengedit item -->
    <AddItemModal
      :isOpen="isModalOpen"
      :itemId="selectedItemId"
      @close="isModalOpen = false"
    />
  </div>
</template>


<script>import { onMounted, ref } from 'vue';
import { useItemStore } from '../stores/item';
import ProductCard from './ProductCard.vue';
import AddItemModal from './AddItemModal.vue';

export default {
  components: {
    ProductCard,
    AddItemModal,
  },
  setup() {
    const itemStore = useItemStore();
    const { getProducts } = itemStore;
    const isModalOpen = ref(false);
    const selectedItemId = ref(null);

    const openDetailModal = (id) => {
      selectedItemId.value = id;
      isModalOpen.value = true;
    };

    onMounted(() => {
      getProducts();
    });

    return { itemStore, isModalOpen, selectedItemId, openDetailModal };
  },
};

</script>

<style scoped>
/* Your styles here */
</style>
