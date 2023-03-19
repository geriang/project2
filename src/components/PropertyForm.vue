<template>
    <div>
        <div class="container-fluid m-1 p-1">
            <div class="mt-3"><h5>Upload Listing Details</h5></div>
        </div>
        <div>
        <form ref="anyName">
            <!-- Property form does not update full address data when there are changes in address -->
            <!-- how to ensure that any changes made to address after selection can be captured in the propertyform -->
            <FormBlockDrop :title="formBlockTitle1" v-model="listingTypeValue" :dropDownValues="formBlockArray1" />
            <FormBlockDrop :title="formBlockTitle10" v-model="listingSubTypeValue" :dropDownValues="formBlockArray2" />
            <FormAddressBlock :title="formBlockTitle2" v-model="addressValue" @updateAddressValue="getAddress"
                @updateFullAddressData="getFullAddressData" />
            <FormBlockDrop :title="formBlockTitle3" v-model="propertyTypeValue" :dropDownValues="formBlockArray3" />
            <FormSubTypeBlock :title="formBlockTitle4" v-model="propertySubTypeValue"
                :selectedPropertyType="this.propertyTypeValue" @updateSubTypeValue="getSubType"
                @updateRoomNoValue="getRoomValue" />
            <FormBlockText :title="formBlockTitle9" v-model="headLineValue" />
            <FormBlockText :title="formBlockTitle6" v-model="sizeBuiltValue" />
            <FormBlockText :title="formBlockTitle7" v-model="sizeLandValue" />
            <FormBlockText :title="formBlockTitle8" v-model="priceValue" />
            <div class="mb-3">
                <div class="form-floating">
                    <textarea class="form-control" placeholder="write a property description" id="floatingTextarea"
                        v-model="descriptionValue"></textarea>
                    <label for="floatingTextarea">{{ this.formBlockTitle5 }}</label>
                </div>
                <div class="d-flex justify-content-end">
                    <button type="button" class="btn btn-outline-dark btn-sm" @click="consultChatGpt">Auto-fill</button>
                </div>
            </div>
        </form>
            <div class="d-flex justify-content-center">
                <button type="button" class="btn btn-danger" @click="postData">Submit</button>
            </div>
        </div>
    </div>
</template>

<script>
import FormBlockText from "@/components/FormBlockText.vue"
import FormBlockDrop from "@/components/FormBlockDrop.vue"
import FormAddressBlock from "@/components/FormAddressBlock.vue"
import FormSubTypeBlock from "@/components/FormSubTypeBlock.vue"
import axios from "axios"

const queryChatGpt = "http://localhost:5000/filldescription"
const postListingApiUrl = "http://localhost:5000/listing_details/create/"
const postPropertyApiUrl = "http://localhost:5000/property_details/create"



export default {
    components: { FormBlockText, FormBlockDrop, FormAddressBlock, FormSubTypeBlock },
    data: function () {
        return {

            // titles of form blocks 
            formBlockTitle1: "Listing Type",
            formBlockTitle2: "Address",
            formBlockTitle3: "Property Type",
            formBlockTitle4: "Sub-type",
            formBlockTitle5: "Description",
            formBlockTitle6: "Built-in Area (sqft)",
            formBlockTitle7: "Land Area (sqft)",
            formBlockTitle8: "Price (SGD)",
            formBlockTitle9: "Headline",
            formBlockTitle10: "Type of Sale",
            //   Property data properties

            addressValue: "",
            fullAddressData: {},
            listingTypeValue: "",
            listingSubTypeValue: "",
            propertyTypeValue: "",
            propertySubTypeValue: "",
            roomNoValue: "",
            descriptionValue: "",
            sizeBuiltValue: "",
            sizeLandValue: "",
            priceValue: "",
            builtPsfValue: "",
            landPsfValue: "",
            headLineValue: "",
            // Dropdown Arrays
            formBlockArray1: [" ", "For Sale", "For Rent", "Room Rental"],
            formBlockArray2: [" ", "Owner Sale", "Mortgagee Sale", "Receiver Sale", "Bank Sale", "Estate Sale", "MCST Sale", "Owner Auction", "Bank Auction"],
            formBlockArray3: [" ", "HDB", "Condo", "Landed", "Retail", "Office", "Industrial", "Land"],


        }
    },
    methods: {

        // Functions to receive data properties from Child component via $emit
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

        resetFormData: function (){

            this.addressValue = ""
            this.fullAddressData = {}
            this.listingTypeValue = "",
            this.listingSubTypeValue = ""
            this.propertyTypeValue = ""
            this.propertySubTypeValue = ""
            this.roomNoValue = ""
            this.descriptionValue = ""
            this.sizeBuiltValue = ""
            this.sizeLandValue = ""
            this.priceValue = ""
            this.builtPsfValue = ""
            this.landPsfValue = ""
            this.headLineValue = ""

        },

        // Post Listing Details, retreive listing ID and post Property Details with listing ID
        postData: async function () {
            const getListingId = await this.postListing()
            console.log(getListingId)
            await this.postProperty(getListingId)
        },

        // Post Listing Details
        postListing: async function () {

            let listingData = {
                "listingType": {
                    "type": this.listingTypeValue,
                    "subType": this.listingSubTypeValue,
                    "term": "Vacant Possession"
                },
                "price": {
                    "amount": this.priceValue,
                    "state": "negotiable",
                    "builtPsf": this.builtPsfValue,
                    "landPsf": this.landPsfValue
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
                },
                "unit": "",
                "rooms": this.roomNoValue

            }

            let postListingResponse = await axios.post(postListingApiUrl, listingData)
            let getListingId = postListingResponse.data.id
            return getListingId

        },

        // Post Property Details
        postProperty: async function (getListingId) {
            let propertyData = {

                "address": {
                    "country": "Singapore",
                    "postalCode": this.fullAddressData.postalCode,
                    "streetName": this.fullAddressData.roadName,
                    "block": this.fullAddressData.block,
                    "project": this.fullAddressData.building
                },
                "district": this.fullAddressData.district,
                "propertyType": {
                    "type": this.propertyTypeValue,
                    "subType": this.propertySubTypeValue,
                },
                "tenure": "",
                "wef" : "",
                "top": "",
                "coordinates": this.fullAddressData.coordinates,
                "listingDetails": [
                    { "lid": getListingId }
                ]

            }

            await axios.post(postPropertyApiUrl, propertyData)

            this.$refs.anyName.reset()


        },

        // Chatgpt Function
        async consultChatGpt() {


                  let chatGptPrompt = `write me a 5 sentence property description based on the following details:
                            Country: "Singapore",Postal Code: ${this.fullAddressData.postalCode}, Street Name: ${this.fullAddressData.roadName},Block: ${this.fullAddressData.block},
                            Development Name: ${this.fullAddressData.building},District: ${this.fullAddressData.district}, Property Type: ${this.propertyTypeValue},${this.propertySubTypeValue},
                            Listing Type: ${this.listingTypeValue}, ${this.listingSubTypeValue}, Sale Condition: "Vacant Possession", Price: ${this.priceValue}, Built-in PSF: ${this.builtPsfValue},
                            Land PSF: ${this.landPsfValue}, Built-in size: ${this.sizeBuiltValue}, Built-in land: ${this.sizeLandValue}, Description Headline: ${this.headLineValue}`

        
            let chatGptAnswer = await axios.post(queryChatGpt, {message: chatGptPrompt} )
            this.descriptionValue = chatGptAnswer.data.reply
          
        },



    },

    watch: {

        calculateBuiltPsf: function (value) {
            this.builtPsfValue = value

        },

        calculateLandPsf: function (value) {
            this.landPsfValue = value
        },


    },

    computed: {

        calculateBuiltPsf: function () {
            return Math.round(this.priceValue / this.sizeBuiltValue)
        },

        calculateLandPsf: function () {
            return Math.round(this.priceValue / this.sizeLandValue)
        }


    },

}

</script>

<style scoped></style>