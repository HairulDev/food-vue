<template>
  <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50">
    <div class="glassmorphism-blur p-6 rounded-lg shadow-lg w-[400px] relative">
      <button @click="closeModal" class="absolute top-2 right-2 text-gray-400 hover:text-gray-600 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <h2 class="text-2xl orange-text-gradient font-bold mb-4">
        {{ title ? 'Edit Item' : 'Add New Item' }}
      </h2>      
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label class="block text-sm font-bold text-white mb-2" for="title">Title</label>
          <input v-model="title" class="w-full px-3 py-2 border rounded white-text-gradient" id="title" type="text" required />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-bold text-white mb-2" for="price">Price</label>
          <input v-model="price" class="w-full px-3 py-2 border rounded white-text-gradient" id="price" type="number" required />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-bold text-white mb-2" for="category">Category</label>
          <select v-model="selectedCategory" class="w-full px-3 py-2 border rounded white-text-gradient" id="category" required>
            <option value="" disabled selected>Select a category</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-bold text-white mb-2" for="file">Image</label>
          <input @change="handleFileUpload" class="w-full px-3 py-2 border rounded" id="file" type="file" required />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-bold text-white mb-2" for="description">Description</label>
          <textarea v-model="description" class="w-full px-3 py-2 border rounded white-text-gradient" id="description" rows="4" required></textarea>
        </div>
        <div class="flex justify-end">
          <button type="button" @click="closeModal" class="bg-[#b5179e] hover:bg-[#b5179e] text-white font-bold py-2 px-4 rounded mr-2">Cancel</button>
          <button type="button" @click="deleteItem" v-if="title" class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2">
            Delete
          </button>
          <button type="submit"  :disabled="isSubmitting" class="bg-[#915EFF] hover:bg-[#915EFF] text-white font-bold py-2 px-4 rounded">Add Item</button>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import { useCategoryStore } from '../stores/category';

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
      categories: [],
      selectedCategory: '',
      isSubmitting: false,
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    async deleteItem() {
      try {
        const response = await axios.delete(`https://food-express-supabase.vercel.app/admin/item/${this.itemId}/delete`);
        if (response.data.success) {
          alert('Item deleted successfully');
          const categoryStore = useCategoryStore();
          await categoryStore.fetchCategories();
          this.closeModal();
        } else {
          alert('Failed to delete item. Please try again.');
        }
      } catch (error) {
        console.error('Failed to delete item:', error);
        alert('An error occurred. Please try again.');
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

      try {
        const url = this.itemId
          ? `https://food-express-supabase.vercel.app/admin/item/${this.itemId}`
          : `https://food-express-supabase.vercel.app/admin/item`;
        const method = this.itemId ? 'put' : 'post';

        const response = await axios[method](url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.data.success) {
          alert(response.data.message);
          const categoryStore = useCategoryStore();
          await categoryStore.fetchCategories();
        } else {
          alert('Failed to process item. Please try again.');
        }
        this.closeModal();
      } catch (error) {
        console.error('Error processing item:', error);
        alert('An error occurred. Please try again.');
      } finally {
        this.isSubmitting = false;
      }
    },
    async getItemById() {
      if (!this.itemId) return;

      try {
        const response = await axios.get(`https://food-express-supabase.vercel.app/admin/itemById/${this.itemId}`);
        const item = response.data.item;
        this.title = item.title;
        this.price = item.price;
        this.description = item.description;
        this.selectedCategory = item.categoryId;
      } catch (error) {
        console.error('Error fetching item details:', error);
      }
    },
    async getCategory() {
      try {
        const response = await axios.get(`https://food-express-supabase.vercel.app/admin/category`);
        this.categories = response.data.category;
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        this.getCategory();
        this.getItemById();
      }
    },
  },
};
</script>

<style scoped>
</style>