<template>
  <transition name="notification" appear>
    <div v-if="error" class="notification glass bounce-in" :class="notificationClass">
      <div class="notification-icon">
        <svg v-if="isError" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
          <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" stroke-width="2"/>
          <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="2"/>
        </svg>
        <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.7088 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4905 2.02168 11.3363C2.16356 9.18203 2.99721 7.13214 4.39828 5.49C5.79935 3.84785 7.69279 2.69083 9.79619 2.16234C11.8996 1.63385 14.1003 1.75812 16.13 2.52" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <polyline points="22,4 12,14.01 9,11.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      
      <div class="notification-content">
        <div class="notification-title">
          {{ isError ? 'Erreur' : 'Succès' }}
        </div>
        <div class="notification-message">{{ error }}</div>
      </div>
      
      <button @click="closeNotification" class="notification-close">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      
      <div class="notification-progress" :class="{ 'error': isError }"></div>
    </div>
  </transition>
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
      timeoutId: null
    }
  },
  computed: {
    notificationClass() {
      return {
        'error': this.isError,
        'success': !this.isError
      };
    }
  },
  watch: {
    error(newVal) {
      if (newVal) {
        this.clearAutoClose();
        this.timeoutId = setTimeout(() => {
          this.closeNotification();
        }, 5000);
      }
    }
  },
  methods: {
    closeNotification() {
      this.clearAutoClose();
      this.$emit('reset-error');
    },
    clearAutoClose() {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }
    }
  },
  beforeUnmount() {
    this.clearAutoClose();
  }
}
</script>

<style scoped>
.notification {
  position: fixed;
  top: var(--spacing-xl);
  right: var(--spacing-xl);
  z-index: 2000;
  min-width: 350px;
  max-width: 500px;
  border-radius: var(--border-radius-lg);
  padding: 0;
  overflow: hidden;
  box-shadow: var(--shadow-xl);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.notification.error {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.05) 100%);
  border-color: rgba(239, 68, 68, 0.3);
}

.notification.success {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.05) 100%);
  border-color: rgba(16, 185, 129, 0.3);
}

.notification-icon {
  position: absolute;
  top: var(--spacing-lg);
  left: var(--spacing-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  flex-shrink: 0;
}

.notification.error .notification-icon {
  background: rgba(239, 68, 68, 0.2);
  color: var(--danger-color);
}

.notification.success .notification-icon {
  background: rgba(16, 185, 129, 0.2);
  color: var(--success-color);
}

.notification-content {
  margin-left: 56px;
  padding: var(--spacing-lg) var(--spacing-xl) var(--spacing-lg) var(--spacing-sm);
}

.notification-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: var(--spacing-xs);
  color: var(--text-primary);
}

.notification-message {
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--text-secondary);
}

.notification-close {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--text-muted);
  padding: var(--spacing-xs);
  min-width: auto;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notification-close:hover {
  background: rgba(255, 255, 255, 0.2);
  color: var(--text-primary);
}

.notification-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: 100%;
  background: linear-gradient(90deg, var(--success-color), var(--success-light));
  animation: progressBar 5s linear;
  transform-origin: left;
}

.notification-progress.error {
  background: linear-gradient(90deg, var(--danger-color), var(--danger-light));
}

/* Transitions */
.notification-enter-active,
.notification-leave-active {
  transition: all var(--transition-normal);
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.95);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.95);
}

@keyframes progressBar {
  from {
    transform: scaleX(1);
  }
  to {
    transform: scaleX(0);
  }
}

@media (max-width: 768px) {
  .notification {
    top: var(--spacing-md);
    right: var(--spacing-md);
    left: var(--spacing-md);
    min-width: auto;
    max-width: none;
  }

  .notification-content {
    margin-left: 48px;
    padding: var(--spacing-md) var(--spacing-lg) var(--spacing-md) var(--spacing-xs);
  }

  .notification-icon {
    width: 36px;
    height: 36px;
    top: var(--spacing-md);
    left: var(--spacing-md);
  }

  .notification-title {
    font-size: 0.9rem;
  }

  .notification-message {
    font-size: 0.8rem;
  }
}
</style>
