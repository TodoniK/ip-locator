<template>
  <div>
    <CustomMap :showMarker="showMarker" :ipDetails="ipDetails" :markerPosition="markerPosition" />
    <SearchBar @search-ip="handleSearch" />
    <DetailsPanel :showPanel="showDetailsPanel" :ipDetails="ipDetails" @close-panel="closeDetailsPanel" />
    <CustomModal :error="error" :isError="isError" @reset-error="resetError" />
  </div>
</template>

<script>
import CustomMap from './CustomMap.vue';
import SearchBar from './SearchBar.vue';
import DetailsPanel from './DetailsPanel.vue';
import Api from '@/service/Api';
import CustomModal from './CustomModal.vue';

export default {
  components: {
    CustomMap,
    SearchBar,
    DetailsPanel,
    CustomModal
  },
  data() {
    return {
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
      },
      error: null,
      isError: true,
    };
  },
  methods: {
    handleSearch(ipObj) {
      Api.postIp(ipObj)
        .then(response => {
          this.ipDetails = response;
          this.markerPosition = [this.ipDetails.lat, this.ipDetails.lon];
          this.showMarker = true;
          this.showDetailsPanel = true;
          this.isError = false;
          this.error = "Données récupérées avec succès";
        })
        .catch(error => {
          this.isError = true;
          this.error = error.response.data.message;
        });
    },
    closeDetailsPanel() {
      this.showDetailsPanel = false;
    },
    resetError() {
      this.error = null;
    }
  }
};
</script>

<style></style>