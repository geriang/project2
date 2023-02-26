<!-- npm run serve -->
<!-- Passing values to parent via props and emit -->
<!-- https://learnvue.co/tutorials/v-model-guide#using-vue-v-model-in-custom-components -->
<!-- https://www.youtube.com/watch?v=xtmZVV9QpaA -->
<!-- https://vuejs.org/guide/essentials/watchers.html#basic-example -->
<!-- https://stackoverflow.com/questions/68992586/how-to-search-through-the-keys-of-an-object-and-get-the-values-of-matching-keys -->
<!-- https://www.w3schools.com/jsref/jsref_substring.asp -->
<template>
  <div>
    <nav class="navbar bg-light fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">SGxProperty</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" data-bs-dismiss="offcanvas" @click="displayPropertyForm">Listing Submission</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" data-bs-dismiss="offcanvas" @click="displayMap">Map</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="" role="button" data-bs-toggle="dropdown"
                  aria-expanded="false">
                  Dropdown
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li>
                    <hr class="dropdown-divider">
                  </li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
            </ul>
            <form class="d-flex mt-3" role="search">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </div>
    </nav>

    <h1>Hello World</h1>
    <MapPage v-show="showMap" />
    <PropertyForm v-show="showPropertyForm" />

  </div>
</template>

<script>
import PropertyForm from "@/components/PropertyForm.vue"
import MapPage from "@/components/MapPage.vue"

export default {
  name: 'App',
  components: { PropertyForm, MapPage },
  data: function () {
    return {
      showPropertyForm: false,
      showMap: true,

    }

  },

  methods: {

    displayPropertyForm: function(){
      this.showPropertyForm = true
      this.showMap = false
   
    },

    displayMap: function(){
      this.showMap = true
      this.showPropertyForm = false
 
    }


  }


}
</script>

<style></style>
