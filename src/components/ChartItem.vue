<template>
    <div>
      <PolarAreaChart :data="chartData" :options="chartOptions" />
    </div>
  </template>
  
  <script>
  import { PolarArea } from 'vue-chartjs';
  import axios from 'axios';
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    RadialLinearScale,
    ArcElement
  } from 'chart.js';
  
  ChartJS.register(Title, Tooltip, Legend, RadialLinearScale, ArcElement);
  
  export default {
    components: {
      PolarAreaChart: PolarArea
    },
    data() {
      return {
        categories: [] // Data kategori akan di-load dari API
      };
    },
    computed: {
      categoryItemCount() {
        // Menghitung jumlah item dalam setiap kategori
        return this.categories.map(category => ({
          name: category.name,
          itemCount: category.items.length
        }));
      },
      chartData() {
        // Data untuk chart
        return {
          labels: this.categoryItemCount.map(category => category.name),
          datasets: [
            {
              label: 'Total Items',
              backgroundColor: [
                '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
              ],
              data: this.categoryItemCount.map(category => category.itemCount)
            }
          ]
        };
      },
      chartOptions() {
        // Opsi untuk chart
        return {
          responsive: true,
          maintainAspectRatio: false
        };
      }
    },
    mounted() {
      // Mengambil data kategori saat komponen dimuat
      this.getProducts();
    },
    methods: {
      getProducts() {
        // Mengambil data dari API dan mengisi array categories
        axios.get('https://food-express-supabase.vercel.app/v1/customer/landing-page')
          .then(response => {
            this.categories = response.data.category;
            console.log("this.categories ====>>", this.categories);
          })
          .catch(error => {
            console.error('Error fetching categories:', error);
          });
        }
      }
  };
  </script>
  
  <style>
  /* Tambahkan gaya khusus jika diperlukan */
  </style>
  