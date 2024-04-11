<template>
  <div>
    <CustomMap :center="mapCenter" :showMarker="showMarker" :ipDetails="ipDetails" />
    <SearchBar @search-ip="handleSearch" />
    <DetailsPanel :showPanel="showDetailsPanel" :ipDetails="ipDetails" @close-panel="closeDetailsPanel" />
  </div>
</template>

<script>
import CustomMap from './CustomMap.vue';
import SearchBar from './SearchBar.vue';
import DetailsPanel from './DetailsPanel.vue';

export default {
  components: {
    CustomMap,
    SearchBar,
    DetailsPanel
  },
  data() {
    return {
      mapCenter: [47.41322, -1.219482],
      markerPosition: [44.8333, -0.5667],
      showDetailsPanel: false,
      showMarker: false,
      ipDetails: {
        query: "",
        nom: "",
        country: "",
        countryCode: "",
        region: "",
        regionName: "",
        city: "",
        zip: "",
        lat: 0,
        lon: 0,
        timezone: "",
        isp: "",
        org: "",
        as: ""
      }
    };
  },
  methods: {
    handleSearch(ip) {
      console.log(`Recherche de l'IP: ${ip}`);
      this.showMarker = true;
      this.showDetailsPanel = true;
      this.ipDetails = {
        query: "192.168.1.1",
        nom: "MonNom",
        country: "France",
        countryCode: "FR",
        region: "IDF",
        regionName: "Île-de-France",
        city: "Paris",
        zip: "75000",
        lat: 48.8566,
        lon: 2.3522,
        timezone: "Europe/Paris",
        isp: "MonFournisseurInternet",
        org: "MonOrganisation",
        as: "AS12345 MonAutonomousSystem"
      };
    },
    closeDetailsPanel() {
      this.showDetailsPanel = false;
    },
  }
};
</script>

<style></style>