// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

import DashboardHome from '@/pages/dashboard/DashboardHome.vue';
import Cart from '@/components/Cart.vue';

const routes = [
    {
        path: '/',
        name: 'My Store',
        component: DashboardHome
    },
    {
        path: '/cart',
        name: 'Cart',
        component: Cart
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
