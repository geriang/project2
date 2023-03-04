<template>
    <div>


        <div id="map">

            <MapModal/>

            <!-- <MapModal :district="this.propertyData.district" :address="this.propertyData.address.streetName"/> -->

            <!-- Modal -->
            <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                aria-labelledby="staticBackdropLabel" aria-hidden="true" ref="propertyModal">
                <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Listing Details</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="row">

                                    <div class="col-md-4">District {{ this.selectedDistrict }}</div>


                                    <div class="col-md-4">Address {{ this.selectedAddress }}</div>
                                </div>
                                <div class="row">
                                    <div class="col-md-3 ms-auto">.col-md-3 .ms-auto</div>
                                    <div class="col-md-2 ms-auto">.col-md-2 .ms-auto</div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6 ms-auto">.col-md-6 .ms-auto</div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-9">
                                        Level 1: .col-sm-9
                                        <div class="row">
                                            <div class="col-8 col-sm-6">
                                                Level 2: .col-8 .col-sm-6
                                            </div>
                                            <div class="col-4 col-sm-6">
                                                Level 2: .col-4 .col-sm-6
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Understood</button> -->
                        </div>
                    </div>
                </div>
            </div>


        </div>


    </div>
</template>

<script>
import L from "leaflet";
import 'leaflet.markercluster';
import HomeMarker from "@/assets/HomeMarker.png"
import axios from "axios";
import * as bootstrap from 'bootstrap';
import MapModal from "@/components/MapModal.vue";




const getDataApiUrl = "http://localhost:5000/property_details"


export default {
    components: {MapModal},

    data: function () {
        return {
            map: null,
            propertyData: {},
            selectedAddress: null,
            selectedDistrict: null,
    
          
        }
    },
    async created() {

        // let coordinates = []
        let propertyDetails = []
        let response = await axios.get(getDataApiUrl)
        let data = response.data
        for (let d of data) {
            // let propertyCoordinates = d.coordinates
            // coordinates.push(propertyCoordinates)

            let propertyDetail = d
            propertyDetails.push(propertyDetail)
        }
        // this.coordinatesData = coordinates
        this.propertyData = propertyDetails


        await this.createMap()
        await this.createMarkers()

    },

    methods: {

        createMap: function () {
            this.map = L.map('map', { zoomControl: false }).setView([1.3521, 103.8198], 11.5);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
                maxZoom: 18,
            }).addTo(this.map);

        },

        createMarkers: function () {


            const markerClusterGroup = L.markerClusterGroup()
            const markerIcon = L.icon({
                iconUrl: HomeMarker,
                iconSize: [40, 40],
                iconAnchor: [20, 40],
            });



            this.propertyData.forEach((propData) => {
                let coordinate = propData.coordinates
                let address = propData.address.streetName
                let district = propData.district
                console.log(address)
                L.marker(coordinate, { icon: markerIcon })
                    .bindPopup(() => { this.onModal(address, district) }).addTo(markerClusterGroup)
            })

            // onEachFeature: (feature, layer) => {
            // layer.on('click', () => {
            //     this.selectedFeature = feature.properties
                
            // })
        



            markerClusterGroup.addTo(this.map)



        },

     



        onModal: function (address, district) {


            this.selectedAddress = address
            this.selectedDistrict = district

            new bootstrap.Modal(this.modal,(address,district)).show();
            console.log(address)
            console.log(district)
           
        },



    },

    mounted() {
        this.modal = this.$refs.propertyModal;

    }





}

</script>


<style scoped>
#map {
    height: 100vh;
}

#modalPop {
    z-index: 1500;


}

#button {
    z-index: 50000;
}
</style>