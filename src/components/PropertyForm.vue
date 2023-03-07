<template>
    <div>
        <div class="container-fluid m-1 p-1">
            <h1>Basic Details</h1>

            <!-- Property form does not update full address data when there are changes in address -->
            <!-- how to ensure that any changes made to address after selection can be captured in the propertyform -->
            <FormBlockDrop :title="formBlockTitle1" v-model="listingTypeValue" :dropDownValues="formBlockArray1" />
            <FormAddressBlock :title="formBlockTitle2" v-model="addressValue" @updateAddressValue="getAddress"
                @updateFullAddressData="getFullAddressData" />
            <FormBlockDrop :title="formBlockTitle3" v-model="propertyTypeValue" :dropDownValues="formBlockArray3" />
            <FormSubTypeBlock :title="formBlockTitle4" v-model="propertySubTypeValue"
                :selectedPropertyType="this.propertyTypeValue" @updateSubTypeValue="getSubType"
                @updateRoomNoValue="getRoomValue" />
            <FormBlockText :title="formBlockTitle9" v-model="headLineValue" />
            <FormBlockLongText :title="formBlockTitle5" v-model="descriptionValue" />
            <FormBlockText :title="formBlockTitle6" v-model="sizeBuiltValue" />
            <FormBlockText :title="formBlockTitle7" v-model="sizeLandValue" />
            <FormBlockText :title="formBlockTitle8" v-model="priceValue" />
            <button type="button" class="btn btn-danger" @click="postData">Submit</button>
        </div>
    </div>
</template>

<script>
import FormBlockText from "@/components/FormBlockText.vue"
import FormBlockDrop from "@/components/FormBlockDrop.vue"
import FormBlockLongText from "@/components/FormBlockLongText.vue"
import FormAddressBlock from "@/components/FormAddressBlock.vue"
import FormSubTypeBlock from "@/components/FormSubTypeBlock.vue"
import axios from "axios"

const postListingApiUrl = "http://localhost:5000/listing_details/create/"
// const END_URL = "63ef83e27aad1cd42e13dd96/63ef8627383836ca595b4e07"
const postPropertyApiUrl = "http://localhost:5000/property_details/create"



export default {
    name: "PropertyForm",
    components: { FormBlockText, FormBlockDrop, FormBlockLongText, FormAddressBlock, FormSubTypeBlock },
    data: function () {
        return {

            formBlockTitle1: "Listing Type",
            formBlockTitle2: "Address",
            formBlockTitle3: "Property Type",
            formBlockTitle4: "Sub Type",
            formBlockTitle5: "Description",
            formBlockTitle6: "Built-in Area (sqft)",
            formBlockTitle7: "Land Area (sqft)",
            formBlockTitle8: "Price (SGD)",
            formBlockTitle9: "Headline",
            addressValue: "",
            fullAddressData: {},
            listingTypeValue: "",
            propertyTypeValue: "",
            propertySubTypeValue: "",
            roomNoValue: "",
            descriptionValue: "",
            sizeBuiltValue: "",
            sizeLandValue: "",
            priceValue: "",
            headLineValue: "",
            formBlockArray1: [" ", "For Sale", "For Rent", "Room Rental"],
            formBlockArray3: [" ", "HDB", "Condo", "Landed", "Retail", "Office", "Industrial", "Land"],

        }
    },
    methods: {

        getAddress: function (selectedAddress) {
            this.addressValue = selectedAddress

        },

        getFullAddressData: function (fullAddressData) {
            this.fullAddressData = fullAddressData

        },

        getSubType: function (selectedSubType) {
            this.propertySubTypeValue = selectedSubType
        },

        getRoomValue: function (selectedRoomValue) {
            this.roomNoValue = selectedRoomValue

        },

        postData: async function(){
            const getListingId = await this.postListing()
            await this.postProperty(getListingId)
        },

        postListing: async function () {

            let listingData = {
                "listingType": {
                    "type": this.listingTypeValue,
                    "subType": "",
                    "term": "Vacant Possession"
                },
                "price": {
                    "amount": this.priceValue,
                    "state": "negotiable",
                    "builtPsf": "$XXXXpsf",
                    "landPsf": "$XXXXpsf"
                },
                "size": {
                    "built": this.sizeBuiltValue,
                    "land": this.sizeLandValue
                },
                "description": {
                    "headline": this.headLineValue,
                    "mainText": this.descriptionValue,
                    "maintFee": "$XXX",
                    "gst": "GST"
                },
                "media": {
                    "photo": "photo",
                    "video": "video"
                }

            }

            let postListingResponse = await axios.post(postListingApiUrl, listingData)
            let getListingId = postListingResponse.data.id
            console.log(getListingId)
            return getListingId

        },

        postProperty: async function (getListingId) {
            console.log(getListingId)
            let propertyData = {

                "address": {
                    "country": "Singapore",
                    "postalCode": this.fullAddressData.postalCode,
                    "streetName": this.fullAddressData.roadName,
                    "block": this.fullAddressData.block,
                    "unit": "units",
                    "project": this.fullAddressData.building
                },
                "district": this.fullAddressData.district,
                "propertyType": {
                    "type": this.propertyTypeValue,
                    "subType": this.propertySubTypeValue,
                },
                "tenure": "",
                "top": "",
                "coordinates": this.fullAddressData.coordinates,
                "listing_details": [
                    {"lid" : getListingId}
                ]

            }

            let postPropertyResponse = await axios.post(postPropertyApiUrl, propertyData)
            console.log(postPropertyResponse)
            // console.log(getListingId)

        }





    },

    watch: {


    },

    computed: {

    },

}

</script>

<style scoped></style>