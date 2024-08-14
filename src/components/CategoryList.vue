
<template>
  <div>
    <div v-if="itemStore.categories.length === 0" class="flex justify-center items-center h-screen">
      <div class="loader"></div>
    </div>
    <div v-else>
      <!-- Iterasi untuk setiap kategori -->
      <div v-for="category in itemStore.filteredCategories" :key="category.id" class="mb-8">
        <h2 class="text-xl text-[#915EFF] font-bold mb-4">{{ category.name }}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <!-- Iterasi untuk setiap item dalam kategori -->
          <!-- :key adalah binding untuk properti key : adalah shorthand untuk v-bind. -->
          <!-- @ adalah shorthand untuk v-on, yang digunakan untuk mendengarkan event. -->
          <ProductCard
          v-for="item in category.items"
          :key="item.id"
            :id="item.id"
            :title="item.title"
            :price="item.price"
            :unit="item.unit"
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


<script>
import { onMounted, ref, watch } from 'vue';
import { useItemStore } from '../stores/item';
import ProductCard from './ProductCard.vue';
import AddItemModal from './AddItemModal.vue';

// components adalah properti di dalam objek komponen Vue yang digunakan untuk mendeklarasikan komponen lain yang akan digunakan di dalam template komponen ini.

// setup adalah fungsi khusus di Vue 3 yang digunakan dalam komponen yang memanfaatkan Composition API.
// Fungsi setup dieksekusi saat komponen diinisialisasi, sebelum lifecycle hooks lain seperti created, mounted, dll.
// Di dalam fungsi setup, kita bisa mendeklarasikan variabel, fungsi, dan mengakses store yang kemudian akan digunakan dalam template komponen.

// onMounted adalah lifecycle hook di Composition API yang setara dengan mounted di Options API.

export default {
  components: {
    ProductCard,
    AddItemModal,
  },
  props: {
    searchQuery: {
      type: String,
      default: '',
    }
  },
  setup(props) {
    const itemStore = useItemStore();
    const { getProducts } = itemStore;
    const isModalOpen = ref(false);
    const selectedItemId = ref(null);

    watch(() => props.searchQuery, (newQuery) => {
      itemStore.searchProducts(newQuery);
    });

    const openDetailModal = (id) => {
      selectedItemId.value = id;
      isModalOpen.value = true;
    };

    onMounted(() => {
      getProducts();
    });

    return { itemStore, isModalOpen, selectedItemId, openDetailModal, };
  },
};

</script>

<style scoped>
/* Your styles here */
</style>
