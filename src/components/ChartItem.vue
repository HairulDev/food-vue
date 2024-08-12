<template>
  <div>
    <PolarAreaChart v-if="selectedChartType === 'PolarArea'" :data="chartData" :options="chartOptions" />
    <PieChart v-if="selectedChartType === 'Pie'" :data="chartData" :options="chartOptions" />
    <BarChart v-if="selectedChartType === 'Bar'" :data="chartData" :options="chartOptions" />
  </div>
    <select v-model="selectedChartType" class="mt-6 p-2 rounded-lg white-text-gradient">
      <option value="PolarArea" selected>Polar Area</option>
      <option value="Pie">Pie</option>
      <option value="Bar">Bar</option>
    </select>
</template>

<script>
import { ref } from 'vue'; // Menggunakan ref dari Vue
import { PolarArea, Pie, Bar } from 'vue-chartjs';
import { useItemStore } from '../stores/item';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  BarElement
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  BarElement
);

export default {
  components: {
    PolarAreaChart: PolarArea,
    PieChart: Pie,
    BarChart: Bar
  },
  setup() {
    const itemStore = useItemStore();
    const selectedChartType = ref('PolarArea');

    // Memuat produk saat komponen di-mount
    itemStore.getProducts();

    return { itemStore, selectedChartType };
  },
  computed: {
    categoryItemCount() {
      // Menghitung jumlah item dalam setiap kategori
      return this.itemStore.categories.map(category => ({
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
  }
};
</script>

<style>
/* Tambahkan gaya khusus jika diperlukan */
</style>
