<template>
  <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50">
    <div class="glassmorphism-blur p-6 rounded-lg shadow-lg w-[400px] relative">
      <button @click="closeModal" class="absolute top-2 right-2 text-gray-400 hover:text-gray-600 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <h2 class="text-2xl orange-text-gradient font-bold mb-4">Add New Item</h2>
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
          <button type="submit" class="bg-[#915EFF] hover:bg-[#915EFF] text-white font-bold py-2 px-4 rounded">Add Item</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      title: '',
      price: '',
      file: null,
      description: '',
      categories: [], // Menyimpan daftar kategori
      selectedCategory: '', // Menyimpan kategori yang dipilih
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    async submitForm() {
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('price', this.price);
      formData.append('file', this.file);
      formData.append('description', this.description);
      formData.append('categoryId', this.selectedCategory); // Menyertakan kategori yang dipilih

      try {
        console.log("formData===>>",formData)
        const response = await axios.post('http://localhost:5200/admin/item', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.data.success) {
        alert(response.data.message); // Menampilkan pesan sukses dalam alert
      } else {
        alert('Failed to create item. Please try again.');
      }
        console.log('Item added successfully:', response.data);
        this.closeModal();
      } catch (error) {
        console.error('Error adding item:', error);
      }
    },
    async getCategory() {
      try {
        const response = await axios.get('http://localhost:5200/admin/category');
        this.categories = response.data.category; // Simpan data kategori ke dalam `categories`
        console.log("this.categories ====>>>", this.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        this.getCategory();
      }
    },
  },
};
</script>


<style scoped>
/* Additional styles if necessary */
</style>
