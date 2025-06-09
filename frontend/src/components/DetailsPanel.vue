<template>
  <div class="details-panel glass fade-in">
    <div class="details-inner">
      <div class="panel-header">
        <div class="header-content">
          <div class="marker-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z" 
                    stroke="currentColor" 
                    stroke-width="2" 
                    stroke-linecap="round" 
                    stroke-linejoin="round"/>
              <circle cx="12" cy="10" r="3" 
                      stroke="currentColor" 
                      stroke-width="2"/>
            </svg>
          </div>
          <h2>{{ currentIp.nom ?? 'Marqueur sans nom' }}</h2>
        </div>
        <button @click="$emit('close-panel')" class="close-button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="18 6L6 18M6 6L18 18" 
                  stroke="currentColor" 
                  stroke-width="2" 
                  stroke-linecap="round" 
                  stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <div class="details-content">
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">Adresse IP</div>
            <div class="info-value ip-address">{{ currentIp.query }}</div>
          </div>
          
          <div class="info-item">
            <div class="info-label">Pays</div>
            <div class="info-value">
              <span class="country-flag">{{ getCountryFlag(currentIp.countryCode) }}</span>
              {{ currentIp.country }} ({{ currentIp.countryCode }})
            </div>
          </div>
          
          <div class="info-item">
            <div class="info-label">Région</div>
            <div class="info-value">{{ currentIp.regionName }}, {{ currentIp.region }}</div>
          </div>
          
          <div class="info-item">
            <div class="info-label">Ville</div>
            <div class="info-value">{{ currentIp.city }} {{ currentIp.zip }}</div>
          </div>

          <div class="info-item">
            <div class="info-label">Coordonnées</div>
            <div class="info-value coordinates">
              <span>{{ currentIp.lat?.toFixed(4) }}°N</span>
              <span>{{ currentIp.lon?.toFixed(4) }}°E</span>
            </div>
          </div>

          <div class="info-item">
            <div class="info-label">Fuseau horaire</div>
            <div class="info-value">{{ currentIp.timezone }}</div>
          </div>

          <div class="info-item">
            <div class="info-label">Fournisseur</div>
            <div class="info-value">{{ currentIp.isp }}</div>
          </div>
        </div>
      </div>

      <div class="details-actions">
        <template v-if="!editing">
          <button class="button-success" @click="editing = true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 3C17.2626 2.73735 17.5744 2.52901 17.9176 2.38687C18.2608 2.24473 18.6286 2.17157 19 2.17157C19.3714 2.17157 19.7392 2.24473 20.0824 2.38687C20.4256 2.52901 20.7374 2.73735 21 3C21.2626 3.26264 21.471 3.57444 21.6131 3.9176C21.7553 4.26077 21.8284 4.62856 21.8284 5C21.8284 5.37143 21.7553 5.73923 21.6131 6.08239C21.471 6.42555 21.2626 6.73735 21 7L7.5 20.5L2 22L3.5 16.5L17 3Z" 
                    stroke="currentColor" 
                    stroke-width="2" 
                    stroke-linecap="round" 
                    stroke-linejoin="round"/>
            </svg>
            Sauvegarder
          </button>
        </template>
        <template v-else>
          <div class="edit-container">
            <input 
              type="text" 
              v-model="newName" 
              @keyup.enter="saveIp" 
              @keyup.esc="cancelEdit"
              placeholder="Nom du marqueur..."
              class="name-input"
              ref="nameInput"
            />
            <div class="edit-buttons">
              <button @click="saveIp" class="button-success save-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polyline points="20,6 9,17 4,12" 
                            stroke="currentColor" 
                            stroke-width="2" 
                            stroke-linecap="round" 
                            stroke-linejoin="round"/>
                </svg>
              </button>
              <button @click="cancelEdit" class="cancel-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="18" y1="6" x2="6" y2="18" 
                        stroke="currentColor" 
                        stroke-width="2" 
                        stroke-linecap="round" 
                        stroke-linejoin="round"/>
                  <line x1="6" y1="6" x2="18" y2="18" 
                        stroke="currentColor" 
                        stroke-width="2" 
                        stroke-linecap="round" 
                        stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </template>
        
        <button class="button-danger" @click="deleteIp">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polyline points="3,6 5,6 21,6" 
                      stroke="currentColor" 
                      stroke-width="2" 
                      stroke-linecap="round" 
                      stroke-linejoin="round"/>
            <path d="M19 6V20C19 21 18 22 17 22H7C6 22 5 21 5 20V6M8 6V4C8 3 9 2 10 2H14C15 2 16 3 16 4V6" 
                  stroke="currentColor" 
                  stroke-width="2" 
                  stroke-linecap="round" 
                  stroke-linejoin="round"/>
          </svg>
          Supprimer
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/service/Api';

export default {
  props: {
    currentIp: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editing: false,
      newName: ''
    };
  },
  methods: {
    async saveIp() {
      if (!this.newName.trim()) return;
      
      try {
        Api.postIp({
          nom: this.newName.trim(),
          query: this.currentIp.query
        }).then((res) => {
          this.$emit('update-ip', {
            previousName: this.currentIp.nom,
            newObj: res
          });
          this.editing = false;
          this.newName = '';
        })
          .catch(error => {
            this.$emit('error', error.response.data.message);
            this.editing = false;
            this.newName = '';
          });
        if (this.currentIp.nom !== 'unnamed') {
          await Api.deleteIp(this.currentIp.nom);
        }
      } catch (error) {
        console.error(error);
      }
    },
    async deleteIp() {
      this.$emit('delete-ip');
    },
    cancelEdit() {
      this.editing = false;
      this.newName = '';
    },
    getCountryFlag(countryCode) {
      if (!countryCode) return '🌍';
      return String.fromCodePoint(
        ...[...countryCode.toUpperCase()].map(char => 
          0x1F1E6 + char.charCodeAt(0) - 'A'.charCodeAt(0)
        )
      );
    },
    beforeMount() {
      this.newName = '';
    }
  },
  watch: {
    editing(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.$refs.nameInput?.focus();
        });
      }
    }
  }
};
</script>

<style scoped>
.details-panel {
  position: absolute;
  height: 100%;
  top: 0;
  right: 0;
  z-index: 1000;
  max-width: 400px;
  min-width: 350px;
  transition: all var(--transition-normal);
  border-top-left-radius: var(--border-radius-xl);
  border-bottom-left-radius: var(--border-radius-xl);
  overflow: hidden;
}

.details-inner {
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-xl) var(--spacing-xl) var(--spacing-lg);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
}

.header-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  flex: 1;
}

.marker-icon {
  color: var(--primary-color);
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.panel-header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.2;
}

.close-button {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--text-secondary);
  padding: var(--spacing-sm);
  min-width: auto;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-button:hover {
  background: rgba(255, 255, 255, 0.2);
  color: var(--text-primary);
}

.details-content {
  flex: 1;
  padding: var(--spacing-lg) var(--spacing-xl);
  overflow-y: auto;
}

.info-grid {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.info-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.info-value {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-primary);
  line-height: 1.4;
}

.ip-address {
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
  background: rgba(99, 102, 241, 0.1);
  color: var(--primary-color);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius);
  display: inline-block;
  font-weight: 600;
}

.country-flag {
  font-size: 1.2em;
  margin-right: var(--spacing-xs);
}

.coordinates {
  display: flex;
  gap: var(--spacing-md);
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
  font-size: 0.875rem;
}

.coordinates span {
  background: rgba(16, 185, 129, 0.1);
  color: var(--success-color);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius);
  font-weight: 600;
}

.details-actions {
  padding: var(--spacing-lg) var(--spacing-xl) var(--spacing-xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
}

.edit-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.name-input {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);
  background: rgba(255, 255, 255, 0.9);
  color: var(--text-primary);
  font-size: 0.875rem;
  transition: all var(--transition-normal);
}

.name-input:focus {
  border-color: var(--border-focus);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  background: var(--bg-primary);
}

.edit-buttons {
  display: flex;
  gap: var(--spacing-sm);
}

.save-btn {
  flex: 1;
  min-width: auto;
  padding: var(--spacing-sm);
}

.cancel-btn {
  background: rgba(107, 114, 128, 0.1);
  color: var(--text-secondary);
  border: 1px solid rgba(107, 114, 128, 0.2);
  padding: var(--spacing-sm);
  min-width: auto;
  width: 44px;
}

.cancel-btn:hover {
  background: rgba(107, 114, 128, 0.2);
  color: var(--text-primary);
}

@media (max-width: 768px) {
  .details-panel {
    position: fixed;
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60vh;
    max-width: 100%;
    min-width: auto;
    border-radius: var(--border-radius-xl) var(--border-radius-xl) 0 0;
    box-shadow: var(--shadow-xl);
  }

  .panel-header {
    padding: var(--spacing-lg) var(--spacing-md);
  }

  .details-content {
    padding: var(--spacing-md);
  }

  .details-actions {
    padding: var(--spacing-md);
  }

  .info-grid {
    gap: var(--spacing-md);
  }
}
</style>
