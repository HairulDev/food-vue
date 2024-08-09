<template>
  <div id="app">
    <Navbar />
    <main class="container mx-auto p-4 mt-20">
      <div class="flex justify-end mb-4">
        <button @click="openModal" class="bg-[#915EFF] hover:bg-[#915EFF]-700 text-white font-bold py-2 px-4 rounded">
          Add Item
        </button>
      </div>
      <CategoryList />
    </main>
    <AddItemModal :isOpen="isModalOpen" @close="closeModal" />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import CategoryList from './components/CategoryList.vue';
import AddItemModal from './components/AddItemModal.vue';

export default {
  components: {
    Navbar,
    CategoryList,
    AddItemModal,
  },
  data() {
    return {
      isModalOpen: false,
    };
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
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
