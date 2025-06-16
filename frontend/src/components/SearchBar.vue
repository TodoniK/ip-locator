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
      <button @click="toggleCSVImport" class="csv-button" :class="{ 'active': showCsvImport }" title="Import CSV">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round"/>
          <polyline points="14,2 14,8 20,8" 
                    stroke="currentColor" 
                    stroke-width="2" 
                    stroke-linecap="round" 
                    stroke-linejoin="round"/>
        </svg>
      </button>
      <button @click="search" class="search-button" :disabled="!searchQuery.trim()">
        <span v-if="!isLoading">Rechercher</span>
        <div v-else class="spinner"></div>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showCsvImport: {
      type: Boolean,
      default: false
    }
  },
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
    toggleCSVImport() {
      this.$emit('toggle-csv-import');
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

.csv-button {
  flex-shrink: 0;
  padding: var(--spacing-sm);
  min-width: auto;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--text-secondary);
  transition: all var(--transition-normal);
}

.csv-button:hover {
  background: rgba(255, 255, 255, 0.2);
  color: var(--text-primary);
  transform: scale(1.05);
}

.csv-button.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
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
    flex-direction: row;
    gap: var(--spacing-xs);
    align-items: center;
  }

  .search-input {
    flex: 1;
    padding: var(--spacing-sm) var(--spacing-md);
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius);
    background: var(--bg-primary);
    min-width: 0; /* Permet au flex de rétrécir l'input */
  }

  .search-button {
    min-width: 80px;
    font-size: 0.75rem;
    padding: var(--spacing-sm) var(--spacing-md);
    flex-shrink: 0;
  }

  .csv-button {
    width: 36px;
    height: 36px;
    flex-shrink: 0;
  }

  .search-input:focus {
    border-color: var(--border-focus);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
}
</style>
