import { defineStore } from 'pinia';
import axios from 'axios';

export const useItemStore = defineStore('item', {
    state: () => ({
        item: null,
        categories: [],
    }),
    actions: {
        async getProducts() {
            try {
                const response = await axios.get(`https://food-express-supabase.vercel.app/v1/customer/landing-page`);
                this.categories = response.data.category;
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        },
        async fetchCategories() {
            try {
                const response = await axios.get(`https://food-express-supabase.vercel.app/admin/category`);
                this.categories = response.data.category;
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        },
        async getItemById(itemId) {
            try {
                console.log("getItemById called==>>",)
                const response = await axios.get(`https://food-express-supabase.vercel.app/admin/itemById/${itemId}`);
                this.item = response.data.item;
                return this.item
            } catch (error) {
                console.error('Error fetching item details:', error);
                throw error;
            }
        },
        async deleteItem(itemId) {
            try {
                const response = await axios.delete(`https://food-express-supabase.vercel.app/admin/item/${itemId}/delete`);
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
                ? `http://localhost:5200/admin/item/${itemId}`
                : `http://localhost:5200/admin/item`;
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
        }
    },
});
