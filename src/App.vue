<template>
  <div>
  
    <div class="mb-3">
      <NavBar @showNavBarMap="displayMap" @showNavBarPropertyForm="displayPropertyForm"
        @showNavBarEditListing="displayEditListing" />
    </div>

    <div class="position-relative mt-5">

      <MapPage v-if="showMap" :key="mapComponentKey" />
      <PropertyForm v-if="showPropertyForm" />
      <EditListingForm v-if="showEditPage" />

    </div>






  </div>
</template>

<script>
import PropertyForm from "@/components/PropertyForm.vue"
import MapPage from "@/components/MapPage.vue"
import EditListingForm from "@/components/EditListingForm.vue"
import NavBar from "@/components/NavBar.vue"

export default {
  name: 'App',
  components: { PropertyForm, MapPage, EditListingForm, NavBar },
  data: function () {
    return {
      showPropertyForm: false,
      showMap: true,
      showEditPage: false,
      mapComponentKey: 0,

    }

  },

  methods: {

    displayPropertyForm: function (value) {
      this.showPropertyForm = value
      this.showEditPage = false
      this.showMap = false

    },

    displayMap: function (value) {
      this.showMap = value
      this.showPropertyForm = false
      this.showEditPage = false
      this.refreshMap()

    },

    displayEditListing: function (value) {
      this.showEditPage = value
      this.showMap = false
      this.showPropertyForm = false
    },

    refreshMap: function () {
      this.mapComponentKey += 1;
    }



  }


}
</script>

<style></style>
