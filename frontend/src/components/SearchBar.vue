<template>
  <div class="search-bar">
    <input type="text" v-model="searchQuery" placeholder="Search an IP..." v-on:keypress="isLetter($event)" />
    <button @click="search">Rechercher</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: ''
    };
  },
  methods: {
    search() {
      this.$emit('search-ip', this.searchQuery);
    },
    isLetter(e) {
      let char = String.fromCharCode(e.keyCode);
      if (/^[0-9.]+$/.test(char)) return true;
      else e.preventDefault();
    }
  }
};
</script>

<style scoped>
.search-bar {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
}
</style>