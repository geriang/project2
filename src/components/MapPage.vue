<template>
    <div>
        <div id="map"></div>

        <!-- Modal -->
        <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
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
                                    <div class="row g-0" @click="openSalePropertyProfile(_id)" data-bs-dismiss="modal">
                                        <div class="col-md-4 align-self-center">
                                            <div style="position: relative;">
                                                <span class="badge text-bg-danger"
                                                    style="position: absolute; top: 5px; left: 5px;">{{ s.listingType.type
                                                    }}</span>
                                                <span class="badge text-bg-success" v-if="!(s.listingType.subType)"
                                                    style="position: absolute; top: 5px; left: 75px;">{{
                                                        s.listingType.subType }}</span>
                                            </div>
                                            <img :src="s.media.photo.pic1" class="img-fluid rounded-start" alt="image">
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
                                    <div class="row g-0" @click="openRentPropertyProfile(_id)" data-bs-dismiss="modal">
                                        <div class="col-md-4 align-self-center">
                                            <div style="position: relative;">
                                                <span class="badge text-bg-danger"
                                                    style="position: absolute; top: 5px; left: 5px;">{{ s.listingType.type
                                                    }}</span>
                                                <span class="badge text-bg-success"
                                                    style="position: absolute; top: 5px; left: 75px;">{{
                                                        s.listingType.subType }}</span>
                                            </div>
                                            <img :src="s.media.photo.pic1" class="img-fluid rounded-start" alt="">
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
                            <!-- Property Profile Modal -->
                            <b-modal id="modal-lg" size="lg" ref="propertyProfileModal" hide-footer hide-header centered>
                                <div class="row">
                                    <div class="col-sm-6">
                                        <h5>Property Profile</h5>
                                    </div>
                                    <div class="col-sm-6 d-block text-end">
                                        <h6>SGxProperty</h6>
                                    </div>
                                </div>
                                <div class="row" style="border:solid red 1px">
                                </div>
                                <!-- Type of Sale -->
                                <div class="row my-1">
                                    <h5>{{ propertyProfileListingSubType }}</h5>
                                </div>

                                <!-- images -->
                                <div class="d-block text-center">
                                    <div class="row">

                                        <div class="row justify-content-center">

                                            <img class="photo" v-for="p in propertyProfileImages" :key="p" :src=p
                                                alt="Image">

                                        </div>
                                    </div>
                                </div>
                                <!-- headline -->
                                <div class="row my-1" style="border:solid red 1px">
                                </div>
                                <div class="row my-1">
                                    <h6 class="fw-bold">{{ propertyProfileHeadline }}</h6>
                                </div>
                                <!-- district and address -->
                                <div class="row mt-1">
                                    <h6>District {{ selectedDistrict }} - {{ selectedProject }}</h6>
                                </div>
                                <div class="row">
                                    <h6>{{ selectedBlock }} {{ selectedStreetName }} Singapore {{ selectedPostalCode }}</h6>
                                </div>
                                <!-- description -->
                                <div class="row mt-1">
                                    <h6>Description</h6>
                                </div>
                                <div class="row">
                                    <p class="fw-light">{{ propertyProfileDescription }}</p>
                                </div>
                                <!-- table of listing data -->


                                <div class="row my-1">
                                    <div class="col-sm-6">
                                        <div class="row">
                                            <div class="col-6">
                                                <h6 class="fw-light">Type</h6>
                                            </div>
                                            <div class="col-6">
                                                <h6>{{ selectedPropertyType }}</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="row">
                                            <div class="col-6">
                                                <h6 class="fw-light">Sub Type</h6>
                                            </div>
                                            <div class="col-6">
                                                <h6>{{ selectedPropertySubType }}</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row my-1">
                                    <div class="col-sm-6">
                                        <div class="row">
                                            <div class="col-6">
                                                <h6 class="fw-light">Tenure</h6>
                                            </div>
                                            <div class="col-6">
                                                <h6>{{ selectedPropertyTenure }}</h6>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="col-sm-6">
                                        <div class="row">
                                            <div class="col-6">
                                                <h6 class="fw-light">W.E.F</h6>
                                            </div>
                                            <div class="col-6">
                                                <h6>{{ selectedPropertyWef }}</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row my-1">
                                    <div class="col-sm-6">
                                        <div class="row">
                                            <div class="col-6">
                                                <h6 class="fw-light">TOP</h6>
                                            </div>
                                            <div class="col-6">
                                                <h6>{{ selectedPropertyTop }}</h6>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="col-sm-6">
                                        <div class="row">
                                            <div class="col-6">
                                                <h6 class="fw-light">Sale Condition</h6>
                                            </div>
                                            <div class="col-6">
                                                <h6>{{ propertyProfileTerm }}</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row my-1">
                                    <div class="col-sm-6">
                                        <div class="row">
                                            <div class="col-6">
                                                <h6 class="fw-light">Land Area</h6>
                                            </div>
                                            <div class="col-6">
                                                <h6>{{ propertyProfileLandSize }}</h6>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="col-sm-6">
                                        <div class="row">
                                            <div class="col-6">
                                                <h6 class="fw-light">Floor Area</h6>
                                            </div>
                                            <div class="col-6">
                                                <h6>{{ propertyProfileBuiltSize }}</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row my-1">
                                    <div class="col-sm-6">
                                        <div class="row">
                                            <div class="col-6">
                                                <h6 class="fw-light">Maintanence Fee</h6>
                                            </div>
                                            <div class="col-6">
                                                <h6>{{ propertyProfileMaintFee }}</h6>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="col-sm-6">
                                        <div class="row">
                                            <div class="col-6">
                                                <h6 class="fw-light">GST</h6>
                                            </div>
                                            <div class="col-6">
                                                <h6>{{ propertyProfileGst }}</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row my-1">
                                    <div class="col-sm-6">
                                        <div class="row">
                                            <div class="col-6">
                                                <h6 class="fw-light">Unit No.</h6>
                                            </div>
                                            <div class="col-6">
                                                <h6>{{ propertyProfileUnit }}</h6>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="col-sm-6">
                                        <div class="row">
                                            <div class="col-6">
                                                <h6 class="fw-light">No. of Rooms</h6>
                                            </div>
                                            <div class="col-6">
                                                <h6>{{ propertyProfileRooms }}</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="d-flex justify-content-center mt-4">

                                    <b-button class="mt-2" variant="outline-danger" style="width: 100px" block
                                        @click="closePropertyProfile">Close</b-button>
                                </div>
                            </b-modal>
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
import resiMarker from "@/assets/resiMarker.png"
import commMarker from "@/assets/commMarker.png"
import indMarker from "@/assets/indMarker.png"
import axios from "axios";
import * as bootstrap from 'bootstrap';
import { BModal } from 'bootstrap-vue'


const getDataApiUrl = `${process.env.VUE_APP_DEV_SERVER}/property_details`


export default {
    components: { BModal },

    data: function () {
        return {
            map: null,

            propertyData: {},
            selectedDistrict: null,
            selectedProject: null,
            selectedBlock: null,
            selectedStreetName: null,
            selectedPostalCode: null,
            selectedPropertyType: null,
            selectedPropertySubType: null,
            selectedPropertyTenure: null,
            selectedPropertyWef: null,
            selectedPropertyTop: null,
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
            // Property Profile Data
            selectedSalePropertyProfile: {},
            selectedRentPropertyProfile: {},
            propertyProfileImages: {},
            propertyProfileListingSubType: "",
            propertyProfileDescription: "",
            propertyProfileBuiltSize: "",
            propertyProfileLandSize: "",
            propertyProfileTerm: "",
            propertyProfileMaintFee: "",
            propertyProfileGst: "",
            propertyProfileUnit: "",
            propertyProfileRooms: "",
            propertyProfileHeadline: "",



        }
    },
    async created() {

        let propertyDetails = []
        let response = await axios.get(getDataApiUrl, {
                                                        withCredentials: true,
                                                        // headers: {'Content-Type': 'application/json',}
                                                        })
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
                let tenure = propData.tenure
                let wef = propData.wef
                let top = propData.top


                if (propertyType === "HDB" || propertyType === "Condo" || propertyType === "Landed") {
                    L.marker(coordinate, { icon: resiIcon })
                        .bindPopup(() => { this.onModal(district, project, block, streetName, postalCode, propertyType, propertySubType, listingDetails, tenure, wef, top) }).addTo(markerClusterGroup)
                } else if (propertyType === "Office" || propertyType === "Retail" || propertyType === "Land") {
                    L.marker(coordinate, { icon: commIcon })
                        .bindPopup(() => { this.onModal(district, project, block, streetName, postalCode, propertyType, propertySubType, listingDetails, tenure, wef, top) }).addTo(markerClusterGroup)

                } else {
                    L.marker(coordinate, { icon: indIcon })
                        .bindPopup(() => { this.onModal(district, project, block, streetName, postalCode, propertyType, propertySubType, listingDetails, tenure, wef, top) }).addTo(markerClusterGroup)
                }

            })

            markerClusterGroup.addTo(this.map)


        },


        onModal: function (district, project, block, streetName, postalCode, propertyType, propertySubType, listingDetails, tenure, wef, top) {

            this.selectedDistrict = district
            this.selectedProject = project
            this.selectedBlock = block
            this.selectedStreetName = streetName
            this.selectedPostalCode = postalCode
            this.selectedPropertyType = propertyType
            this.selectedPropertySubType = propertySubType
            this.selectedListingDetails = listingDetails
            this.selectedPropertyTenure = tenure
            this.selectedPropertyWef = wef
            this.selectedPropertyTop = top
            // console.log(this.selectedListingDetails)

            new bootstrap.Modal(this.modal, (district, project, block, streetName, postalCode, propertyType, propertySubType, listingDetails, tenure, wef, top)).show();


        },

        showForSale: function () {
            this.showForSaleListings = true
            this.showForRentListings = false
        },

        showForRent: function () {
            this.showForRentListings = true
            this.showForSaleListings = false
        },

        openSalePropertyProfile: function (_id) {
            this.selectedSalePropertyProfile = {}
            this.propertyProfileImages = {}
            this.propertyProfileListingSubType = ""
            this.propertyProfileHeadline = ""
            this.propertyProfileDescription = ""
            this.propertyProfileBuiltSize = ""
            this.propertyProfileLandSize = ""
            this.propertyProfileTerm = ""
            this.propertyProfileMaintFee = ""
            this.propertyProfileGst = ""
            this.propertyProfileRooms = ""
            this.propertyProfileUnit = ""

            this.$refs['propertyProfileModal'].show()
            this.selectedSalePropertyProfile = this.selectedFilteredForSale[_id]
            this.propertyProfileImages = this.selectedSalePropertyProfile.media.photo
            this.propertyProfileListingSubType = this.selectedSalePropertyProfile.listingType.subType
            this.propertyProfileHeadline = this.selectedSalePropertyProfile.description.headline
            this.propertyProfileDescription = this.selectedSalePropertyProfile.description.mainText
            this.propertyProfileBuiltSize = this.selectedSalePropertyProfile.size.built
            this.propertyProfileLandSize = this.selectedSalePropertyProfile.size.land
            this.propertyProfileTerm = this.selectedSalePropertyProfile.listingType.term
            this.propertyProfileMaintFee = this.selectedSalePropertyProfile.description.maintFee
            this.propertyProfileGst = this.selectedSalePropertyProfile.description.gst
            this.propertyProfileRooms = this.selectedSalePropertyProfile.rooms
            this.propertyProfileUnit = this.selectedSalePropertyProfile.unit


            console.log(this.selectedSalePropertyProfile)
        },

        openRentPropertyProfile: function (_id) {
            this.selectedRentPropertyProfile = {}
            this.propertyProfileImages = {}
            this.propertyProfileListingSubType = ""
            this.propertyProfileHeadline = ""
            this.propertyProfileDescription = ""
            this.propertyProfileBuiltSize = ""
            this.propertyProfileTerm = ""
            this.propertyProfileMaintFee = ""
            this.propertyProfileGst = ""
            this.propertyProfileRooms = ""
            this.propertyProfileUnit = ""

            this.$refs['propertyProfileModal'].show()
            this.selectedRentPropertyProfile = this.selectedFilteredForRent[_id]
            this.propertyProfileImages = this.selectedRentPropertyProfile.media.photo
            this.propertyProfileListingSubType = this.selectedRentPropertyProfile.listingType.subType
            this.propertyProfileHeadline = this.selectedRentPropertyProfile.description.headline
            this.propertyProfileDescription = this.selectedRentPropertyProfile.description.mainText
            this.propertyProfileBuiltSize = this.selectedRentPropertyProfile.size.built
            this.propertyProfileLandSize = this.selectedRentPropertyProfile.size.land
            this.propertyProfileTerm = this.selectedRentPropertyProfile.listingType.term
            this.propertyProfileMaintFee = this.selectedRentPropertyProfile.description.maintFee
            this.propertyProfileGst = this.selectedRentPropertyProfile.description.gst
            this.propertyProfileRooms = this.selectedRentPropertyProfile.rooms
            this.propertyProfileUnit = this.selectedRentPropertyProfile.unit




            console.log(this.selectedRentPropertyProfile)
        },

        closePropertyProfile: function () {
            this.$refs['propertyProfileModal'].hide()
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

            // console.log(this.selectedFilteredForRent)
            // console.log(this.selectedFilteredForSale)

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

}
</style>