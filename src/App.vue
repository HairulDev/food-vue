<template>
  <div id="app">
    <Navbar/>
    <main class="container mx-auto p-4 mt-20">
      <CategoryList />
    </main>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import CategoryList from './components/CategoryList.vue';

export default {
  components: {
    Navbar,
    CategoryList,
  },
};
</script>

<style>
#app {
  display: block;
  min-height: 100vh; 
}
main {
  padding-top: 60px; 
}
</style>
