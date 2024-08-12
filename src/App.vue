<template>
  <div id="app">
    <Navbar @search="handleSearch" />
    <main class="container mx-auto p-4 mt-20">
      <ChartItem />
      <div class="flex justify-end mb-4 mt-10">
        <button @click="openModal" class="bg-[#915EFF] hover:bg-[#915EFF]-700 text-white font-bold py-2 px-4 rounded">
          Add Item
        </button>
      </div>
      <CategoryList :searchQuery="searchQuery" />
    </main>
    <AddItemModal :isOpen="isModalOpen" @close="closeModal" />
    <Stars />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import CategoryList from './components/CategoryList.vue';
import AddItemModal from './components/AddItemModal.vue';
import ChartItem from './components/ChartItem.vue';
import Stars from './components/Stars.vue';

export default {
  components: {
    Navbar,
    CategoryList,
    AddItemModal,
    ChartItem,
    Stars,
  },
  data() {
    return {
      isModalOpen: false,
      searchQuery: ''
    };
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    handleSearch(query) {
      this.searchQuery = query;
    }
  },
};
</script>

<style>
#app {
  display: block;
  min-height: 100vh; 
}
main {
  padding-top: 60px; 
}
</style>
