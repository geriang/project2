<template>
    <div>
        <div id="map"></div>

        <!-- Modal -->
        <div class="modal fade" id="mainModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true" ref="propertyModal">
            <div class="modal-dialog modal-dialog-scrollable modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">{{ selectedDistrict }} | {{ selectedProject }}
                        </h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">

                            <div class="row">
                                <div class="col-sm-12">

                                    <h6 class="fw-bold">
                                        {{ selectedPropertyType }} ({{ selectedPropertySubType }})
                                    </h6>

                                </div>

                            </div>

                            <div class="row mb-2">
                                <div class="col-sm-12">

                                    <h6>
                                        {{ selectedBlock }} {{ selectedStreetName }} {{ selectedPostalCode }}
                                    </h6>

                                </div>

                            </div>


                            <div class="row mb-2">

                                <div class="btn-group" role="group" aria-label="Basic outlined example">

                                    <button type="button" class="btn btn-outline-danger" @click="showForSale"><span
                                            class="badge text-bg-dark">{{ selectedForSaleListings }}</span>
                                        For Sale
                                    </button>
                                    <button type="button" class="btn btn-outline-danger" @click="showForRent"><span
                                            class="badge text-bg-dark">{{ selectedForRentListings }}</span>
                                        For Rent
                                    </button>
                                </div>

                            </div>

                            <!-- card -->
                            <div v-if="showForSaleListings">
                                <div class="card border-danger mb-2" style="max-width: 800px;"
                                    v-for="(s, _id ) in selectedFilteredForSale" :key="_id">
                                    <div class="row g-0">
                                        <div class="col-md-4 align-self-center">
                                            <div style="position: relative;">
                                                <span class="badge text-bg-danger"
                                                    style="position: absolute; top: 5px; left: 5px;">{{ s.listingType.type
                                                    }}</span>
                                                <span class="badge text-bg-success" v-if="!(s.listingType.subType)"
                                                    style="position: absolute; top: 5px; left: 75px;">{{
                                                        s.listingType.subType }}</span>
                                            </div>
                                            <img src="https://sgp.sg/wp-content/uploads/2022/10/Screenshot_20221006_170423_edit_14248157671783.jpg"
                                                class="img-fluid rounded-start" alt="">
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">

                                                <h6 class="card-title fw-bold">{{ s.description.headline }}</h6>
                                                <div class="row">
                                                    <div class="col-ms-8">
                                                        <span><img src="../assets/dollarIcon.png" alt="">${{ s.price.amount
                                                        }} {{ s.price.state }}</span>
                                                    </div>
                                                    <div class="col-ms-8">
                                                        <span><img src="../assets/sizeIcon.png" alt="">{{ s.size.built
                                                        }}sqft<span v-if="s.size.land"> | {{ s.size.land }}sqft
                                                                (land)</span></span>
                                                    </div>

                                                </div>
                                                <div class="row">
                                                    <div class="col-8">
                                                        <span><img src="../assets/dollarIcon2.png" alt="">${{
                                                            s.price.builtPsf }}psf<span v-if="s.price.landPsf"> |
                                                                ${{ s.price.landPsf }}psf (land)</span>
                                                        </span>
                                                    </div>


                                                </div>

                                                <p class="card-text"><small class="text-muted">Posted {{ Math.floor(((new
                                                    Date().getTime()) - new Date(s.created)) / (1000 * 60 * 60 * 24)) }}
                                                        day(s) ago</small>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div v-if="showForRentListings">
                                <div class="card border-danger mb-2" style="max-width: 800px;"
                                    v-for="(s, _id ) in selectedFilteredForRent" :key="_id">
                                    <div class="row g-0">
                                        <div class="col-md-4 align-self-center">
                                            <div style="position: relative;">
                                                <span class="badge text-bg-danger"
                                                    style="position: absolute; top: 5px; left: 5px;">{{ s.listingType.type
                                                    }}</span>
                                                <span class="badge text-bg-success"
                                                    style="position: absolute; top: 5px; left: 75px;">{{
                                                        s.listingType.subType }}</span>
                                            </div>
                                            <img src="https://sgp.sg/wp-content/uploads/2022/10/Screenshot_20221006_170423_edit_14248157671783.jpg"
                                                class="img-fluid rounded-start" alt="">
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">

                                                <h5 class="card-title">{{ s.description.headline }}</h5>
                                                <div class="row">
                                                    <div class="col-ms-8">
                                                        <span><img src="../assets/dollarIcon.png" alt="">${{ s.price.amount
                                                        }} {{ s.price.state }}</span>
                                                    </div>
                                                    <div class="col-ms-8">
                                                        <span><img src="../assets/sizeIcon.png" alt="">{{ s.size.built
                                                        }}sqft<span v-if="s.size.land"> | {{ s.size.land }}sqft
                                                                (land)</span></span>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-8">
                                                        <span><img src="../assets/dollarIcon2.png" alt="">${{
                                                            s.price.builtPsf }}psf<span v-if="s.price.landPsf"> |
                                                                ${{ s.price.landPsf }}psf (land)</span>
                                                        </span>
                                                    </div>
                                                </div>

                                                <p class="card-text"><small class="text-muted">Posted {{ Math.floor(((new
                                                    Date().getTime()) - new Date(s.created)) / (1000 * 60 * 60 * 24)) }}
                                                        day(s) ago</small>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div class="modal fade" id="exampleModalToggle2" aria-hidden="true"
                                aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalToggleLabel2">Modal 2</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            Hide this modal and show the first with the button below.
                                        </div>
                                        <div class="modal-footer">
                                            <button class="btn btn-primary" data-bs-target="#exampleModalToggle"
                                                data-bs-toggle="modal" data-bs-dismiss="modal">Back to first</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <a class="btn btn-primary" data-bs-toggle="modal" href="#exampleModalToggle" role="button">Open
                                first modal</a>

                            <!-- <div class="row">

                                <div class="row justify-content-center">

                                    <img class="photo" v-for="i in image" :key="i" :src=i alt="Image">

                                </div>

                            </div>


                            <div class="row">

                                <div class="col-sm-6">

                                </div>
                                <div class="col-sm-6">

                                </div>
                            </div> -->



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
            // modal:null,
            propertyData: {},
            selectedDistrict: null,
            selectedProject: null,
            selectedBlock: null,
            selectedStreetName: null,
            selectedPostalCode: null,
            selectedPropertyType: null,
            selectedPropertySubType: null,
            selectedListingDetails: {},
            selectedForSaleListings: 0,
            selectedForRentListings: 0,
            selectedFilteredForSale: [],
            selectedFilteredForRent: [],
            showForSaleListings: true,
            showForRentListings: false,
            // extractedListingDetail: {
            //     headline: ""
            // },
            image: ["https://sgp.sg/wp-content/uploads/2022/12/IMG_20221216_120530_594.jpg", "https://sgp.sg/wp-content/uploads/2022/10/Screenshot_20221006_170423_edit_14248157671783.jpg", "https://sgp.sg/wp-content/uploads/2022/10/Screenshot_20221006_170646_edit_14217361546267.jpg", "https://sgp.sg/wp-content/uploads/2022/09/IMG20220929183423-1.jpg"]


        }
    },
    async created() {

        let propertyDetails = []
        let response = await axios.get(getDataApiUrl)
        let data = response.data
        // console.log(data)
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
                let district = propData.district
                let project = propData.address.project
                let block = propData.address.block
                let streetName = propData.address.streetName
                let postalCode = propData.address.postalCode
                let propertyType = propData.propertyType.type
                let propertySubType = propData.propertyType.subType
                let listingDetails = propData.listingDetails


                if (propertyType === "HDB" || propertyType === "Condo" || propertyType === "Landed") {
                    L.marker(coordinate, { icon: resiIcon })
                        .bindPopup(() => { this.onModal(district, project, block, streetName, postalCode, propertyType, propertySubType, listingDetails) }).addTo(markerClusterGroup)
                } else if (propertyType === "Office" || propertyType === "Retail" || propertyType === "Land") {
                    L.marker(coordinate, { icon: commIcon })
                        .bindPopup(() => { this.onModal(district, project, block, streetName, postalCode, propertyType, propertySubType, listingDetails) }).addTo(markerClusterGroup)

                } else {
                    L.marker(coordinate, { icon: indIcon })
                        .bindPopup(() => { this.onModal(district, project, block, streetName, postalCode, propertyType, propertySubType, listingDetails) }).addTo(markerClusterGroup)
                }

            })

            markerClusterGroup.addTo(this.map)


        },


        onModal: function (district, project, block, streetName, postalCode, propertyType, propertySubType, listingDetails) {

            this.selectedDistrict = district
            this.selectedProject = project
            this.selectedBlock = block
            this.selectedStreetName = streetName
            this.selectedPostalCode = postalCode
            this.selectedPropertyType = propertyType
            this.selectedPropertySubType = propertySubType
            this.selectedListingDetails = listingDetails
            console.log(this.selectedListingDetails)

            new bootstrap.Modal(this.modal, (district, project, block, streetName, postalCode, propertyType, propertySubType, listingDetails)).show();


        },

        showForSale: function () {
            this.showForSaleListings = true
            this.showForRentListings = false
        },

        showForRent: function () {
            this.showForRentListings = true
            this.showForSaleListings = false
        }



    },

    mounted() {
        this.modal = this.$refs.propertyModal;

    },

    watch: {
        selectedListingDetails: function (selectedListingDetails) {
            this.selectedFilteredForSale = []
            this.selectedFilteredForRent = []
            this.selectedForSaleListings = 0
            this.selectedForRentListings = 0
            for (let l of selectedListingDetails) {

                let listingType = l.listingType.type
                if (listingType === "For Sale") {
                    this.selectedForSaleListings += 1
                    this.selectedFilteredForSale.push(l)
                } else {
                    this.selectedForRentListings += 1
                    this.selectedFilteredForRent.push(l)
                }

                // let listingSubType = l.listingType.subType
                // console.log(listingPriceAmount, listingPriceState, listingType, listingSubType, listingHeadLine)

                // this.extractedListingDetail.headline = listingHeadLine
            }

            // set a count type == sale/rent (for loop)
            // ( "value == for")

        }

    },

    // computed: {
    //     weeksInMarket: function(){
    //         let saleListingsCreated = this.selectedFilteredForSale.created
    //         let rentListingsCreated = this.selectedFilteredForRent.created
    //         for( s in saleListingsCreated){

    //         }
    //     }


    // }



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

}</style>