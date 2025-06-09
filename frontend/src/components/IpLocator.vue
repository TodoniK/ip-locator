<template>
  <div id="map">
    <CustomMap :markers="markers" :current-marker="currentIp" @marker-clicked="handleMarkerClick" />
    <div id="mobile-footer">
      <CSVImport @import-started="importFile" />
      <SearchBar @search-ip="handleSearch" />
    </div>
    <DetailsPanel v-if="Object.keys(currentIp).length !== 0" :current-ip="currentIp" @close-panel="currentIp = {}"
      @update-ip="updateIp" @delete-ip="deleteIp" @error="displayError" />
    <CustomModal :error="error" :isError="isError" @reset-error="error = null" />
  </div>
</template>

<script>
import CustomMap from './CustomMap.vue';
import SearchBar from './SearchBar.vue';
import DetailsPanel from './DetailsPanel.vue';
import Api from '@/service/Api';
import CustomModal from './CustomModal.vue';
import CSVImport from './CSVImport.vue';

export default {
  components: { CustomMap, SearchBar, DetailsPanel, CustomModal, CSVImport },
  data() {
    return {
      markers: [],
      currentIp: {},
      error: null,
      isError: true,
    };
  },
  methods: {
    async handleSearch(ip) {
      try {
        Api.searchIp(ip)
          .then(response => {
            this.currentIp = response;
            this.isError = false;
            this.error = "Données récupérées avec succès";
          })
          .catch(error => {
            this.isError = true;
            this.error = error.response.data.message;
          });
      } catch (error) {
        this.isError = true;
        this.error = error.response.data.message;
      }
    },
    async handleMarkerClick(name) {
      try {
        Api.getIpByName(name)
          .then(response => {
            this.currentIp = response;
            this.error = null;
          })
          .catch(error => {
            this.isError = true;
            this.error = error.response.data.message;
          });
      } catch (error) {
        this.isError = true;
        this.error = error.response.data.message;
      }
    },
    updateIp(updateObj) {
      this.currentIp = updateObj.newObj ? updateObj.newObj : {};
      this.markers = this.markers.filter(marker => marker.nom !== updateObj.previousName);
      if (updateObj.newObj)
        this.markers.push(this.currentIp);
    },
    async deleteIp() {
      Api.deleteIp(this.currentIp.nom)
        .then(() => {
          this.markers = this.markers.filter(marker => marker.nom !== this.currentIp.nom);
          this.currentIp = {};
          this.error = null;
        })
        .catch(error => {
          this.error = error.response.data.message;
        });
    },
    async importFile(file) {
      Api.importCSV(file)
        .then(response => {
          this.isError = false;
          this.error = response.message;
        })
        .catch(error => {
          let errorMessage = error.response.data.message + '. ';
          if (error.response.data.errors) {
            errorMessage += error.response.data.errors[0].error;
            error.response.data.errors.forEach(err => {
              errorMessage += " - " + "(" + err.query + ")";
            });
          }
          this.displayError(errorMessage);
        })
        .finally(() => {
          Api.getIps().then(response => {
            this.markers = response;
          });
        });
    },
    displayError(error) {
      this.isError = true;
      this.error = error;
    },
  },
  mounted() {
    Api.getIps().then(response => {
      this.markers = response;
    });
  },
};
</script>

<style>
#map {
  height: calc(100vh - 120px);
  position: relative;
  overflow: hidden;
}

@media (max-width: 768px) {
  #map {
    height: calc(100vh - 100px);
  }

  #mobile-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: var(--spacing-md);
    box-sizing: border-box;
    z-index: 2000;
    background: linear-gradient(to top, rgba(0,0,0,0.1) 0%, transparent 100%);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }
}
</style>