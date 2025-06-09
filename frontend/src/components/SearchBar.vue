<template>
  <div class="search-bar glass">
    <div class="search-input-container">
      <div class="search-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round"/>
        </svg>
      </div>
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Rechercher une adresse IP..." 
        v-on:keypress="isLetter($event)"
        @keyup.enter="search"
        class="search-input"
      />
      <button @click="search" class="search-button" :disabled="!searchQuery.trim()">
        <span v-if="!isLoading">Rechercher</span>
        <div v-else class="spinner"></div>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      isLoading: false
    };
  },
  methods: {
    async search() {
      if (!this.searchQuery.trim()) return;
      
      this.isLoading = true;
      try {
        this.$emit('search-ip', this.searchQuery.trim());
      } finally {
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
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
  bottom: var(--spacing-xl);
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-md);
  min-width: 400px;
  animation: slideUp 0.5s ease-out;
}

.search-input-container {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  width: 100%;
}

.search-icon {
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  color: var(--text-primary);
  font-size: 1rem;
  padding: var(--spacing-sm) 0;
  margin: 0;
  width: auto;
}

.search-input:focus {
  outline: none;
  box-shadow: none;
  border: none;
}

.search-input::placeholder {
  color: var(--text-muted);
  font-weight: 400;
}

.search-button {
  flex-shrink: 0;
  padding: var(--spacing-sm) var(--spacing-lg);
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  min-width: 120px;
  height: 40px;
}

.search-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .search-bar {
    position: static !important;
    width: 100%;
    min-width: auto;
    margin-top: var(--spacing-sm);
    bottom: auto;
    left: auto;
    transform: none;
    padding: var(--spacing-sm);
    border-radius: var(--border-radius);
  }

  .search-input-container {
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .search-input {
    width: 100%;
    padding: var(--spacing-sm) var(--spacing-md);
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius);
    background: var(--bg-primary);
  }

  .search-input:focus {
    border-color: var(--border-focus);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }

  .search-button {
    width: 100%;
    min-width: auto;
  }
}
</style>
