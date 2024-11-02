<template>
  <div id="app">
    <Navbar @search="handleSearch" />
    <router-view />
    <Stars />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Stars from '@/components/Stars.vue';


export default {
  components: {
    Navbar,
    Stars,
  },
};
</script>

<style>
#app {
  display: block;
  min-height: 100vh; 
}
</style>
