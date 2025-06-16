<template>
  <div class="csv-import glass">
    <div class="import-header">
      <div class="header-left">
        <div class="import-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <line x1="16" y1="13" x2="8" y2="13" 
                  stroke="currentColor" 
                  stroke-width="2" 
                  stroke-linecap="round" 
                  stroke-linejoin="round"/>
            <line x1="16" y1="17" x2="8" y2="17" 
                  stroke="currentColor" 
                  stroke-width="2" 
                  stroke-linecap="round" 
                  stroke-linejoin="round"/>
            <polyline points="10,9 9,9 8,9" 
                      stroke="currentColor" 
                      stroke-width="2" 
                      stroke-linecap="round" 
                      stroke-linejoin="round"/>
          </svg>
        </div>
        <h3>Import CSV</h3>
      </div>
      <button @click="$emit('close')" class="close-button">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
    
    <div class="file-input-container" :class="{ 'drag-over': isDragOver }" 
         @dragover.prevent="handleDragOver" 
         @dragleave.prevent="handleDragLeave" 
         @drop.prevent="handleDrop">
      <input 
        type="file" 
        @change="handleFileUpload" 
        accept=".csv" 
        ref="fileInput"
        class="file-input"
        id="csv-file-input"
      />
      <label for="csv-file-input" class="file-label">
        <div class="upload-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" 
                  stroke="currentColor" 
                  stroke-width="2" 
                  stroke-linecap="round" 
                  stroke-linejoin="round"/>
            <polyline points="7,10 12,5 17,10" 
                      stroke="currentColor" 
                      stroke-width="2" 
                      stroke-linecap="round" 
                      stroke-linejoin="round"/>
            <line x1="12" y1="5" x2="12" y2="15" 
                  stroke="currentColor" 
                  stroke-width="2" 
                  stroke-linecap="round" 
                  stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="upload-text">
          <span class="primary-text">{{ fileName || 'Choisir un fichier CSV' }}</span>
          <span class="secondary-text">ou glisser-déposer ici</span>
        </div>
      </label>
    </div>
    
    <button 
      @click="importFile" 
      :disabled="!csvData || isImporting"
      class="import-button"
      :class="{ 'importing': isImporting }"
    >
      <span v-if="!isImporting">Importer</span>
      <div v-else class="importing-content">
        <div class="spinner"></div>
        <span>Import en cours...</span>
      </div>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      csvData: null,
      fileName: '',
      isDragOver: false,
      isImporting: false
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.setFile(file);
    },
    handleDrop(event) {
      this.isDragOver = false;
      const files = event.dataTransfer.files;
      if (files.length > 0 && files[0].type === 'text/csv') {
        this.setFile(files[0]);
      }
    },
    handleDragOver() {
      this.isDragOver = true;
    },
    handleDragLeave() {
      this.isDragOver = false;
    },
    setFile(file) {
      if (file && file.type === 'text/csv') {
        this.csvData = file;
        this.fileName = file.name;
      }
    },
    async importFile() {
      if (!this.csvData) return;
      
      this.isImporting = true;
      try {
        this.$emit('import-started', this.csvData);
      } finally {
        setTimeout(() => {
          this.isImporting = false;
          this.csvData = null;
          this.fileName = '';
          this.$refs.fileInput.value = '';
        }, 2000);
      }
    }
  }
};
</script>

<style scoped>
.csv-import {
  position: absolute;
  left: var(--spacing-xl);
  bottom: var(--spacing-xl);
  z-index: 1000;
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg);
  min-width: 280px;
  animation: slideUp 0.5s ease-out;
}

.import-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-lg);
}

.header-left {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.close-button {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--text-secondary);
  padding: var(--spacing-xs);
  min-width: auto;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-normal);
}

.close-button:hover {
  background: rgba(255, 255, 255, 0.2);
  color: var(--text-primary);
}

.import-icon {
  color: var(--primary-color);
  display: flex;
  align-items: center;
}

.import-header h3 {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
}

.file-input-container {
  border: 2px dashed var(--border-color);
  border-radius: var(--border-radius);
  background: rgba(255, 255, 255, 0.5);
  transition: all var(--transition-normal);
  cursor: pointer;
  margin-bottom: var(--spacing-md);
  position: relative;
}

.file-input-container:hover,
.file-input-container.drag-over {
  border-color: var(--primary-color);
  background: rgba(99, 102, 241, 0.05);
  transform: scale(1.02);
}

.file-input {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.file-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-lg);
  cursor: pointer;
  text-align: center;
}

.upload-icon {
  color: var(--text-secondary);
  transition: color var(--transition-normal);
}

.file-input-container:hover .upload-icon,
.file-input-container.drag-over .upload-icon {
  color: var(--primary-color);
}

.upload-text {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.primary-text {
  font-weight: 500;
  color: var(--text-primary);
  font-size: 0.875rem;
}

.secondary-text {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.import-button {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  font-weight: 500;
  transition: all var(--transition-normal);
}

.import-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.import-button.importing {
  background: var(--success-color);
}

.importing-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  justify-content: center;
}

@media (max-width: 768px) {
  .csv-import {
    position: static;
    width: 100%;
    min-width: auto;
    margin-bottom: var(--spacing-sm);
    padding: var(--spacing-md);
    border-radius: var(--border-radius);
  }

  .import-header {
    margin-bottom: var(--spacing-md);
  }

  .import-header h3 {
    font-size: 1rem;
  }

  .file-label {
    padding: var(--spacing-md);
  }

  .primary-text {
    font-size: 0.8rem;
  }

  .secondary-text {
    font-size: 0.7rem;
  }
}
</style>
