<template>
    <div>

        <div id="map"></div>

            <!-- Modal -->
            <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                aria-labelledby="staticBackdropLabel" aria-hidden="true" ref="propertyModal">
                <div class="modal-dialog modal-dialog-scrollable modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Listing Details</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">

                                <div class="row">
                                    <div class="col-sm-12">
                                        <h5>
                                            District {{ selectedDistrict }}</h5>
                                        <div class="col-sm-12">
                                            <h6>
                                                {{ selectedAddress }}</h6>

                                            <div class="row justify-content-center">

                                                <img class="photo" v-for="i in image" :key="i" :src=i alt="Image">

                                            </div>

                                        </div>

                                    </div>
                                </div>

                                <div class="row">

                                    <div class="col-sm-6">
                                        <h1>wagweaogeramhpoearkhopkoijuinknaekmrgooaepr<br>
                                            oapmpohaerhkopaer<br>
                                            oaekgopeakearh<br>
                                            aeophraepohaeraerh<br>
                                        </h1>

                                    </div>
                                    <div class="col-sm-6">

                                    </div>
                                </div>



                            </div>
                        </div>
                        <!-- <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Understood</button>
                        </div> -->
                    </div>
                </div>
            </div>


        


    </div>
</template>

<script>
import L from "leaflet";
import 'leaflet.markercluster';
import resiMarker from "@/assets/resiMarker.png"
import commMarker from "@/assets/commMarker.png"
import indMarker from "@/assets/indMarker.png"
import axios from "axios";
import * as bootstrap from 'bootstrap';


const getDataApiUrl = "http://localhost:5000/property_details"


export default {
    components: {},

    data: function () {
        return {
            map: null,
            propertyData: {},
            selectedAddress: null,
            selectedDistrict: null,
            image: ["https://sgp.sg/wp-content/uploads/2022/12/IMG_20221216_120530_594.jpg", "https://sgp.sg/wp-content/uploads/2022/10/Screenshot_20221006_170423_edit_14248157671783.jpg", "https://sgp.sg/wp-content/uploads/2022/10/Screenshot_20221006_170646_edit_14217361546267.jpg", "https://sgp.sg/wp-content/uploads/2022/09/IMG20220929183423-1.jpg"]


        }
    },
    async created() {

        let propertyDetails = []
        let response = await axios.get(getDataApiUrl)
        let data = response.data
        for (let d of data) {

            let propertyDetail = d
            propertyDetails.push(propertyDetail)
        }

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
            const resiIcon = L.icon({
                iconUrl: resiMarker,
                iconSize: [40, 40],
                iconAnchor: [20, 40],

            
            });
            const commIcon = L.icon({
                iconUrl: commMarker,
                iconSize: [40, 40],
                iconAnchor: [20, 40],

            
            });
            const indIcon = L.icon({
                iconUrl: indMarker,
                iconSize: [40, 40],
                iconAnchor: [20, 40],

            
            });


            this.propertyData.forEach((propData) => {
                let coordinate = propData.coordinates
                let address = propData.address.streetName
                let district = propData.district
                let propertyType = propData.propertyType.type

                if (propertyType === "HDB" || propertyType === "Condo" || propertyType === "Landed"){
                L.marker(coordinate, { icon: resiIcon })
                    .bindPopup(() => { this.onModal(address, district) }).addTo(markerClusterGroup)
                }else if(propertyType ==="Office" || propertyType === "Retail"|| propertyType ==="Land"){
                    L.marker(coordinate, { icon: commIcon })
                    .bindPopup(() => { this.onModal(address, district) }).addTo(markerClusterGroup)

                }else{
                    L.marker(coordinate, { icon: indIcon })
                    .bindPopup(() => { this.onModal(address, district) }).addTo(markerClusterGroup)
                }

            })

            markerClusterGroup.addTo(this.map)


        },





        onModal: function (address, district) {


            this.selectedAddress = address
            this.selectedDistrict = district

            new bootstrap.Modal(this.modal, (address, district)).show();
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


.photo {
    width: 320px;
    max-width: 100%;
    height: 240px;
    padding: 2px;
    border: 1px solid white;

}
</style>