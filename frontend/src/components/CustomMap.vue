<template>
  <div style="height:100vh; width:100vw">
    <l-map ref="map" :zoom="3"
      :center="currentMarker.lat && currentMarker.lon ? [currentMarker.lat, currentMarker.lon] : [47.41322, -1.219482]">
      <l-tile-layer url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png" layer-type="base"
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
import L from "leaflet";

// Fix pour les icônes Leaflet avec webpack/vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

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
