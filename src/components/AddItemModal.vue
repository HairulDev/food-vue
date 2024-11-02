
<template>
<transition name="fade-scale">
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
        {{ this.itemId ? 'Edit Item' : 'Add New Item' }}
      </h2>
      
      <!-- Progress bar -->
      <div class="relative mb-10">
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-full h-1 bg-gray-300">
            <div
              class="h-1 bg-[#915EFF]"
              :style="{ width: `${progressPercentage}%` }"
            ></div>
          </div>
        </div>
      </div>

      <!-- Form multi-step -->
      <form @submit.prevent="submitForm" class="flex flex-col ">
      <div v-if="activeStep === 0">
        <div class="mb-4">
              <label class="block text-sm font-bold text-white mb-1" for="title">Title</label>
              <input v-model="title" class="w-full px-3 py-2 border rounded white-text-gradient" id="title" type="text" required />
        </div>
        <div class="mb-4">
            <label class="block text-sm font-bold text-white mb-2" for="price">Price</label>
            <input v-model="price" class="w-full px-3 py-2 border rounded white-text-gradient" id="price" type="number" required />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-bold text-white mb-2" for="unit">Unit</label>
            <select v-model="selectedUnit" class="w-full px-3 py-2 border rounded white-text-gradient" id="unit" required>
              <option value="" disabled>Select a unit</option>
              <option :key="'Kg'" :value="'Kg'">Kg</option>
              <option :key="'Ikat'" :value="'Ikat'">Ikat</option>
              <option :key="'Ons'" :value="'Ons'">Ons</option>
            </select>
        </div>
      </div>

      <div v-if="activeStep === 1">
        <div class="mb-4">
            <label class="block text-sm font-bold text-white mb-2" for="category">Category</label>
            <select v-model="selectedCategory" class="w-full px-3 py-2 border rounded white-text-gradient" id="category" required>
              <option value="" disabled>Select a category</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
        </div>
          <!-- Input untuk deskripsi item -->
          <div class="mb-4">
            <label class="block text-sm font-bold text-white" for="description">Description</label>
            <textarea v-model="description" class="w-full px-3 py-2 border rounded white-text-gradient" id="description" rows="3" required></textarea>
          </div>
    </div>
      <div v-if="activeStep === 2">
          <div class="mb-4">
              <label class="block text-sm font-bold text-white" for="file">Image</label>
              <input @change="handleFileUpload" class="w-full px-3 py-2 border rounded" id="file" type="file" />
          </div>
          <div class="mb-4">
            <button type="button" @click="toggleAccordion" class="w-full px-3 py-2 border rounded white-text-gradient text-white font-bold">
              {{ isAccordionOpen ? 'Hide Image' : 'Show Image' }}
            </button>
            <transition name="fade">
              <div v-show="isAccordionOpen" class="mt-2 text-white">
                <img v-if="imageUrl" 
                  :src="imageUrl"
                  alt="Uploaded image"
                  class="w-full h-[130px] object-cover border rounded">
              </div>
            </transition>
          </div>
      </div>


      <div class="flex justify-end">
        <button v-if="activeStep > 0" type="button" @click="handleBack" class="bg-[#b5179e] text-white rounded hover:bg-[#b5179e] hover:opacity-90 py-2 px-4 mr-2">
          Back
        </button>
        <button v-if="activeStep < 2" type="button" @click="handleNext" class="bg-[#915EFF] text-white rounded hover:bg-[#915EFF] hover:opacity-90 py-2 px-4 mr-2">
          Next
        </button>
          <button type="button" @click="deleteItem" v-if="this.itemId && activeStep === 2" class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2">
            Delete
          </button>
        <button type="submit" v-if="activeStep === 2"  :disabled="isSubmitting" class="bg-[#915EFF] hover:bg-[#915EFF] text-white font-bold py-2 px-4 rounded">
          {{ this.itemId ? 'Edit Item' : 'Add Item' }}
        </button>
      </div>
      </form>
    </div>
  </div>
</transition>
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
      activeStep: 0,
      selectedUnit: '',
      selectedCategory: '',
      description: '',
      file: null,
      selectedBank: '',
      isSubmitting: false,
      isAccordionOpen: true,
      imageUrl: '', 
    };
  },
  computed: {
    categories() {
      const itemStore = useItemStore();
      return itemStore.categories;
    },
    progressPercentage() {
      const steps = [0, 1, 2];
      return (this.activeStep / (steps.length - 1)) * 100;
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
      this.resetForm();
    },
    handleNext() {
      if (this.activeStep < 3) {
        this.activeStep++;
      }
    },
    handleBack() {
      if (this.activeStep > 0) {
        this.activeStep--;
      }
    },
    async deleteItem() {
      const itemStore = useItemStore();
      const success = await itemStore.deleteItem(this.itemId);
      if (success) {
        await itemStore.getProducts();
        this.closeModal();
      }
    },
    handleFileUpload(event) {
      this.file = event.target.files[0];
      if (this.file) {
        this.imageUrl = URL.createObjectURL(this.file); 
      } else {
        this.imageUrl = '';
      }
    },
    async submitForm() {
      this.isSubmitting = true;
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('price', this.price);
      formData.append('unit', this.selectedUnit);
      formData.append('file', this.file);
      formData.append('description', this.description);
      formData.append('categoryId', this.selectedCategory);
     
      const itemStore = useItemStore();
      const success = await itemStore.submitForm(this.itemId, formData);
      if (success) {
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
        this.imageUrl = item.images.image_url ? `${import.meta.env.VITE_APP_STORAGE}/storage/v1/object/public/food/item/${item.images.image_url}` : '';
        this.selectedUnit = item.unit;
        this.selectedCategory = item.categories.id;
      }
    },
    toggleAccordion() {
      this.isAccordionOpen = !this.isAccordionOpen;
    },
    resetForm() {
      this.title = '';
      this.price = '';
      this.selectedUnit = '';
      this.selectedCategory = '';
      this.description = '';
      this.file = null,
      this.selectedBank = '';
      this.activeStep = 0;
      this.isAccordionOpen = true;
    },
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
.fade-scale-enter-active, .fade-scale-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-scale-enter, .fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

</style>
