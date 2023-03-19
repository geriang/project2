<!-- npm run serve -->
<!-- Passing values to parent via props and emit -->
<!-- https://learnvue.co/tutorials/v-model-guide#using-vue-v-model-in-custom-components -->
<!-- https://www.youtube.com/watch?v=xtmZVV9QpaA -->
<!-- https://vuejs.org/guide/essentials/watchers.html#basic-example -->
<!-- https://stackoverflow.com/questions/68992586/how-to-search-through-the-keys-of-an-object-and-get-the-values-of-matching-keys -->
<!-- https://www.w3schools.com/jsref/jsref_substring.asp -->
<!-- https://vue2-leaflet.netlify.app/quickstart/#hello-map -->
<!-- <a href="https://www.flaticon.com/free-icons/park" title="park icons">Park icons created by ono_tono - Flaticon</a> -->
<!-- https://stackoverflow.com/questions/41518609/clearing-input-in-vuejs-form -->
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
