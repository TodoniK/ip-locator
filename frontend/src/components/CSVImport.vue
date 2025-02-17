<template>
  <div>
    <input type="file" @change="handleFileUpload" accept=".csv" />
    <button @click="importFile">Import CSV</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      csvData: null
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.csvData = file;
    },
    importFile() {
      this.$emit('import-started', this.csvData);
    }
  }
};
</script>

<style scoped>
div {
  position: absolute;
  left: 30px;
  bottom: 30px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  border-radius: 0.5rem;
  padding: 0.5rem;
}

input {
  font-size: 1.1em;
}

input:focus {
  outline: none;
  border-color: #888;
}

input:hover {
  border-color: #888;
  transition: border-color .3s;
}

button {
  margin-top: 10px;
}

@media (max-width: 768px) {
  div {
    position: static;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  input[type="file"] {
    text-align: left;
    margin-left: 1rem;
  }

  button {
    margin-left: 1rem;
    width: 66.66%;
  }
}
</style>
