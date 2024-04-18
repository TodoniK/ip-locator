<template>
  <div id="app">
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
  font-family: 'Nunito Sans', sans-serif;
}

#app {
  position: relative;
}
</style>