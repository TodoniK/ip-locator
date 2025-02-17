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

@media (max-width: 768px) {
  .search-bar {
    position: static !important;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    margin-top: 0.5rem;
    bottom: auto;
    left: auto;
    transform: none;
    max-width: 100%;
    box-sizing: border-box;
  }

  .search-bar input {
    width: 100%;
    margin-bottom: 0.5rem;
  }

  .search-bar button {
    width: 100%;
  }
}
</style>
