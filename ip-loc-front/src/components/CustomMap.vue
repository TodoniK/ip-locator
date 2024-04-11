<template>
  <div style="height:100vh; width:100vw">
    <l-map ref="map" :zoom="3" :center="markerPosition ?? [47.41322, -1.219482]">
      <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base"
        name="OpenStreetMap"></l-tile-layer>
      <l-marker :lat-lng="[ipDetails.lat, ipDetails.lon]" v-if="showMarker">
        <l-popup>IP Address: {{ ipDetails.query }}</l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  },
  props: {
    markerPosition: {
      type: Array,
      required: true
    },
    showMarker: {
      type: Boolean,
      default: false
    },
    ipDetails: {
      type: Object,
      required: true
    }
  },
};
</script>

<style scoped>

</style>
