<template>
  <div style="height:100vh; width:100vw">
    <l-map ref="map" :zoom="3"
      :center="currentMarker.lat && currentMarker.lon ? [currentMarker.lat, currentMarker.lon] : [47.41322, -1.219482]">
      <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base"
        name="OpenStreetMap"></l-tile-layer>

      <l-marker v-for="(marker) in markers" :key="marker.nom" :lat-lng="[marker.lat, marker.lon]"
        @click="onMarkerClick(marker.nom)">
        <l-popup>{{ marker.nom }}</l-popup>
      </l-marker>

      <l-marker v-if="currentMarker.lat && currentMarker.lon" :lat-lng="currentMarker">
        <l-popup>{{ currentMarker.nom }}</l-popup>
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
    currentMarker: {
      type: Object,
      required: true
    },
    markers: {
      type: Array,
      required: true
    }
  },
  methods: {
    onMarkerClick(name) {
      this.$emit('marker-clicked', name);
    }
  }
};
</script>

<style scoped></style>
