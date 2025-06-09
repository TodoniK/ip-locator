<template>
  <div id="app">
    <div class="app-header glass-dark">
      <div class="header-content">
        <div class="logo-container">
          <div class="logo-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
              <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="2"/>
              <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22" stroke="currentColor" stroke-width="2"/>
              <path d="M12 2C9.49872 4.73835 8.07725 8.29203 8 12C8.07725 15.708 9.49872 19.2616 12 22" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <h1>IP Locator</h1>
        </div>
        <div class="header-subtitle">
          Localisez et gérez vos adresses IP sur une carte interactive
        </div>
      </div>
    </div>
    <IpLocator />
  </div>
</template>

<script>
import IpLocator from './components/IpLocator.vue';

export default {
  components: {
    IpLocator
  },
  mounted() {
    document.title = 'IP Locator';
  }
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

#app {
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  position: relative;
  z-index: 100;
  padding: var(--spacing-lg) var(--spacing-xl);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  animation: slideUp 0.8s ease-out;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.logo-container {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-hover) 100%);
  border-radius: var(--border-radius);
  color: white;
  box-shadow: var(--shadow-md);
}

.logo-container h1 {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-white);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  letter-spacing: -0.025em;
}

.header-subtitle {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 400;
  margin-left: 60px;
  letter-spacing: 0.025em;
}

@media (max-width: 768px) {
  .app-header {
    padding: var(--spacing-md);
  }

  .logo-icon {
    width: 40px;
    height: 40px;
  }

  .logo-container h1 {
    font-size: 1.5rem;
  }

  .header-subtitle {
    font-size: 0.875rem;
    margin-left: 52px;
  }
}
</style>