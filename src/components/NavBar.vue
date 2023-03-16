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
              <li class="nav-item" >
                <a class="nav-link" aria-current="page" href="#" data-bs-dismiss="offcanvas" @click="displayMap">Map View</a>
              </li>
  
              <li class="nav-item" >
                <a class="nav-link" href="#" data-bs-dismiss="offcanvas" @click="displayPropertyForm" >Listing Submission</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" data-bs-dismiss="offcanvas" @click="displayEditListing">Edit Listing</a>
              </li>
              
              
            </ul>
            
          </div>
        </div>
      </div>
    </nav>

    </div>

</template>

<script>
export default {

    methods: {

        displayMap : function (){
            this.$emit("showNavBarMap", true)
            console.log("test", true)
            
        },

        displayPropertyForm : function(){
            this.$emit("showNavBarPropertyForm", true)

        },

        displayEditListing : function(){
            this.$emit("showNavBarEditListing", true)
        }
    }
}

</script>


<style scoped>

</style>