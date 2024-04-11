<template>
  <div class="search-bar">
    <input type="text" v-model="searchName" placeholder="Enter a name..." />
    <input type="text" v-model="searchQuery" placeholder="Search an IP..." v-on:keypress="isLetter($event)" />
    <button @click="search">Ajouter</button>
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
      this.$emit('search-ip', {
        nom: this.searchName,
        query: this.searchQuery
      });
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
input {
  font-size: 1.1em;
  padding: .3rem .5rem;
  border: 2px solid #bbb;
}

input:focus,
button:hover {
  outline: none;
  border-color: #888;
}

input:hover,
button:hover {
  border-color: #888;
  transition: border-color .3s;
}

button {
  font-size: 1.1em;
  padding: .3rem .5rem;
  border: 2px solid #bbb;
  border-left: none;
}

.search-bar {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
}
</style>