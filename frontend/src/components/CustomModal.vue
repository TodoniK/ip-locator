<template>
  <div class="container" :class="isError ? 'bg-red' : 'bg-green'" v-if="error">
    <div>{{ error }}</div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: String,
      default: null
    },
    isError: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      showError: false
    }
  },
  watch: {
    error(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.$emit('reset-error');
        }, 5000);
      }
    }
  }
}
</script>

<style>
.container {
  color: #ffffff;
  padding: 0.5rem;
  position: fixed;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  border-radius: 5px;
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateX(-50%) scale(0.95); }
  to { opacity: 1; transform: translateX(-50%) scale(1); }
}

.bg-red {
  background-color: #ee5253;
}

.bg-green {
  background-color: #10ac84;
}
</style>
