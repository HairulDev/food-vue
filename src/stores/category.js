import { defineStore } from 'pinia';
import axios from 'axios';

export const useCategoryStore = defineStore('category', {
    state: () => ({
        categories: [],
    }),
    actions: {
        async fetchCategories() {
            try {
                const response = await axios.get(`https://food-express-supabase.vercel.app/v1/customer/landing-page`);
                this.categories = response.data.category;
                console.log("Categories updated: ", this.categories);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        },
    },
});
