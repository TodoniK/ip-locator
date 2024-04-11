<template>
  <div class="details-panel" v-if="showPanel">
    <div class="details-inner">
      <div class="flex">
        <h2>Details "{{ ipDetails.nom }}"</h2>
        <button @click="$emit('close-panel')">x</button>
      </div>
      <p>IP Address: {{ ipDetails.query }}</p>
      <p>Country: {{ ipDetails.country }}, {{ ipDetails.countryCode }}</p>
      <p>Region: {{ ipDetails.region }}, {{ ipDetails.regionName }}</p>
      <p>City: {{ ipDetails.city }}, {{ ipDetails.zip }}</p>
      <p>Latitude: {{ ipDetails.lat }}, Longitude: {{ ipDetails.lon }}</p>
      <p>Timezone: {{ ipDetails.timezone }}</p>
      <p>ISP: {{ ipDetails.isp }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showPanel: {
      type: Boolean,
      required: true
    },
    ipDetails: {
      type: Object,
      required: true
    }
  },
};

</script>

<style scoped>
.details-panel {
  position: absolute;
  height: 100%;
  top: 0;
  right: 0;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
}

.details-inner {
  padding: 1.5rem 2rem;
}

.details-panel h2 {
  margin: 0;
  font-size: 1.5em;
}

.details-panel p {
  font-size: 1.1em;
  margin-bottom: .5rem;
}

.details-panel p:last-child {
  margin-bottom: 0;
}

.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  font-size: 1.1em;
  padding: .3rem .5rem;
  border: 2px solid #bbb;
}

button:hover {
  border-color: #888;
  transition: border-color .3s;
  cursor: pointer;
}
</style>