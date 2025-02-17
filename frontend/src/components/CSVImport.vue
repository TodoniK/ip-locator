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
  /* Suppression du positionnement fixe individuel */
  div {
    position: static;
    width: 35%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  div input {
    font-size: 0.8em;
    width: 100%;
  }
  div button {
    font-size: 0.8em;
    width: 100%;
    margin-top: 5px;
  }
}
</style>
