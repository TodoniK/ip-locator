<template>
  <div class="details-panel">
    <div class="details-inner">
      <div class="flex">
        <h2>{{ currentIp.nom ?? 'Unnamed Marker' }}</h2>
        <button @click="$emit('close-panel')">x</button>
      </div>
      <p>IP Address: {{ currentIp.query }}</p>
      <p>Country: {{ currentIp.country }}, {{ currentIp.countryCode }}</p>
      <p>Region: {{ currentIp.region }}, {{ currentIp.regionName }}</p>
      <p>City: {{ currentIp.city }}, {{ currentIp.zip }}</p>
      <p>Latitude: {{ currentIp.lat }}, Longitude: {{ currentIp.lon }}</p>
      <p>Timezone: {{ currentIp.timezone }}</p>
      <p>ISP: {{ currentIp.isp }}</p>
      <div class="details-actions">
        <button class="delete-btn" @click="deleteIp">Delete</button>
        <template v-if="!editing">
          <button class="save-btn" @click="editing = true">Save</button>
        </template>
        <template v-else>
          <input type="text" v-model="newName" @keyup.enter="saveIp" placeholder="Marker name...">
        </template>
      </div>

    </div>
  </div>
</template>

<script>
import Api from '@/service/Api';


export default {
  props: {
    currentIp: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editing: false,
      newName: ''
    };
  },
  methods: {
    async saveIp() {
      try {
        Api.postIp({
          nom: this.newName,
          query: this.currentIp.query
        }).then((res) => {
          this.$emit('update-ip', {
            previousName: this.currentIp.nom,
            newObj: res
          });
          this.editing = false;
          this.newName = '';
        })
          .catch(error => {
            this.$emit('error', error.response.data.message);
            this.editing = false;
            this.newName = '';
          });
        if (this.currentIp.nom !== 'unnamed') {
          await Api.deleteIp(this.currentIp.nom);
        }
      } catch (error) {
        console.error(error);
      }
    },
    async deleteIp() {
      this.$emit('delete-ip');
    },
    beforeMount() {
      this.newName = '';
    }
  }
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
  max-width: 33%;
}

.details-inner {
  padding: 1.5rem 2rem;
}

.details-panel h2 {
  margin: 0;
  font-size: 1.5em;
  margin-right: 2rem;
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

.delete-btn {
  background-color: #ee5253;
  border-color: #ee5253;
  color: white;
}

.delete-btn:hover {
  background-color: #ff6b6b;
  border-color: #ff6b6b;
  transition: none;
}

.edit-btn {
  background-color: #feca57;
  border-color: #feca57;
  color: white;
}

.edit-btn:hover {
  background-color: #ffed4a;
  border-color: #ffed4a;
  transition: none;
}

.save-btn {
  background-color: #10ac84;
  border-color: #10ac84;
  color: white;
}

.save-btn:hover {
  background-color: #26bc8a;
  border-color: #26bc8a;
  transition: none;
}

.details-actions {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

input {
  font-size: 1.1em;
  padding: .3rem .5rem;
  border: 2px solid #bbb;
}
</style>