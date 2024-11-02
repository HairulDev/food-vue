import { defineStore } from 'pinia';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_APP_API_URL;

export const useItemStore = defineStore('item', {
    state: () => ({
        item: null,
        categories: [],
        filteredCategories: [], // Store filtered categories
    }),
    actions: {
        async getProducts() {
            try {
                const response = await axios.get(`${apiUrl}/v1/customer/landing-page`);
                this.categories = response.data.category;
                this.filteredCategories = this.categories; // Initialize filtered categories
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        },
        async fetchCategories() {
            try {
                const response = await axios.get(`${apiUrl}/admin/category`);
                this.categories = response.data.category;
                this.filteredCategories = this.categories; // Initialize filtered categories
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        },
        async searchProducts(searchQuery) {
            try {
                const response = await axios.get(`${apiUrl}/v1/customer/landing-page/search`, {
                    params: { searchQuery }
                });
                this.filteredCategories = response.data.category;
            } catch (error) {
                console.error('Error searching products:', error);
            }
        },
        async getItemById(itemId) {
            try {
                const response = await axios.get(`${apiUrl}/admin/itemById/${itemId}`);
                this.item = response.data.item;
                return this.item;
            } catch (error) {
                console.error('Error fetching item details:', error);
                throw error;
            }
        },
        async deleteItem(itemId) {
            try {
                const response = await axios.delete(`${apiUrl}/admin/item/${itemId}/delete`);
                if (response.data.success) {
                    alert('Item deleted successfully');
                    return true;
                } else {
                    alert('Failed to delete item. Please try again.');
                    return false;
                }
            } catch (error) {
                console.error('Failed to delete item:', error);
                alert('An error occurred. Please try again.');
                throw error;
            }
        },
        async submitForm(itemId, formData) {
            const url = itemId
                ? `${apiUrl}/admin/item/${itemId}`
                : `${apiUrl}/admin/item`;
            const method = itemId ? 'put' : 'post';

            try {
                const response = await axios[method](url, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.data.success) {
                    alert(response.data.message);
                    return true;
                } else {
                    alert('Failed to process item. Please try again.');
                    return false;
                }
            } catch (error) {
                console.error('Error processing item:', error);
                alert('An error occurred. Please try again.');
                throw error;
            }
        },
    },
});
