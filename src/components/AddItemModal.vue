<template>
  <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50">
    <!-- Modal -->
    <div class="glassmorphism-blur p-6 rounded-lg shadow-lg w-[400px] relative">
      <!-- Tombol untuk menutup modal -->
      <button @click="closeModal" class="absolute top-2 right-2 text-gray-400 hover:text-gray-600 focus:outline-none">
        <!-- Icon close -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Judul modal, bergantung pada apakah sedang mengedit atau menambah item -->
      <h2 class="text-2xl orange-text-gradient font-bold mb-4">
        {{ title ? 'Edit Item (OnProgress)' : 'Add New Item' }}
      </h2>
      
      <!-- Form untuk menambah atau mengedit item -->
      <form @submit.prevent="submitForm">
        <!-- Input untuk judul item -->
        <div class="mb-4">
          <label class="block text-sm font-bold text-white mb-2" for="title">Title</label>
          <input v-model="title" class="w-full px-3 py-2 border rounded white-text-gradient" id="title" type="text" required />
        </div>

        <!-- Input untuk harga item -->
        <div class="mb-4">
          <label class="block text-sm font-bold text-white mb-2" for="price">Price</label>
          <input v-model="price" class="w-full px-3 py-2 border rounded white-text-gradient" id="price" type="number" required />
        </div>

        <!-- Dropdown untuk memilih kategori -->
        <div class="mb-4">
          <label class="block text-sm font-bold text-white mb-2" for="category">Category</label>
          <select v-model="selectedCategory" class="w-full px-3 py-2 border rounded white-text-gradient" id="category" required>
            <option value="" disabled selected>Select a category</option>
            <!-- Menampilkan kategori yang ada -->
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>

        <!-- Input untuk upload gambar item -->
        <div class="mb-4">
          <label class="block text-sm font-bold text-white mb-2" for="file">Image</label>
          <input @change="handleFileUpload" class="w-full px-3 py-2 border rounded" id="file" type="file" required />
        </div>

        <!-- Input untuk deskripsi item -->
        <div class="mb-4">
          <label class="block text-sm font-bold text-white mb-2" for="description">Description</label>
          <textarea v-model="description" class="w-full px-3 py-2 border rounded white-text-gradient" id="description" rows="4" required></textarea>
        </div>

        <!-- Tombol aksi: Cancel, Delete, dan Add/Update item -->
        <div class="flex justify-end">
          <button type="button" @click="closeModal" class="bg-[#b5179e] hover:bg-[#b5179e] text-white font-bold py-2 px-4 rounded mr-2">Cancel</button>
          <button type="button" @click="deleteItem" v-if="title" class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2">
            Delete
          </button>
          <button type="submit"  :disabled="isSubmitting" class="bg-[#915EFF] hover:bg-[#915EFF] text-white font-bold py-2 px-4 rounded">
            {{ title ? 'Edit Item' : 'Add Item' }}
            </button>
        </div>
      </form>
    </div>
  </div>
</template>



<script>
import { useItemStore } from '../stores/item';

export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    itemId: {
      type: Number,
      required: false,
    },
  },
  data() {
    return {
      title: '',
      price: '',
      file: null,
      description: '',
      selectedCategory: '',
      isSubmitting: false,
    };
  },
  computed: {
    categories() {
      const itemStore = useItemStore();
      return itemStore.categories;
    },
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    async deleteItem() {
      const itemStore = useItemStore();
      const success = await itemStore.deleteItem(this.itemId);
      if (success) {
        const itemStore = useItemStore();
        await itemStore.getProducts();
        this.closeModal();
      }
    },
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    async submitForm() {
      this.isSubmitting = true;
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('price', this.price);
      formData.append('file', this.file);
      formData.append('description', this.description);
      formData.append('categoryId', this.selectedCategory);

      const itemStore = useItemStore();
      const success = await itemStore.submitForm(this.itemId, formData);
      if (success) {
        const itemStore = useItemStore();
        await itemStore.getProducts();
        this.closeModal();
      }
      this.isSubmitting = false;
    },
    async loadItem() {
      if (this.itemId) {
        const itemStore = useItemStore();
        const item = await itemStore.getItemById(this.itemId);
        this.title = item.title;
        this.price = item.price;
        this.description = item.description;
        this.selectedCategory = item.categoryId;
      }
    }
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        this.loadItem();
        const itemStore = useItemStore();
        itemStore.getProducts();
      }
    },
  },
};

</script>

<style scoped>
</style>