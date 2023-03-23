<template>
    <div>
        <div>
            <div class="container-fluid m-1 p-1">
                <div class="mt-3">
                    <h5>Upload Listing Details</h5>
                </div>
            </div>
            <form ref="anyName">
                <div>
                    <div v-show="page1">
                        <!-- Property form does not update full address data when there are changes in address -->
                        <!-- how to ensure that any changes made to address after selection can be captured in the propertyform -->
                        <FormAddressBlock :title="formBlockTitle2" v-model="addressValue" @updateAddressValue="getAddress"
                            @updateFullAddressData="getFullAddressData" />
                        <FormBlockDrop :title="formBlockTitle3" v-model="propertyTypeValue" :passedValue="propertyTypeValue"
                            :dropDownValues="formBlockArray3" />
                        <FormSubTypeBlock :title="formBlockTitle4" v-model="propertySubTypeValue"
                            :passedValue="propertySubTypeValue" :selectedPropertyType="this.propertyTypeValue"
                            @updateSubTypeValue="getSubType" @updateRoomNoValue="getRoomValue" />
                        <FormBlockDrop :title="formBlockTitle11" v-model="tenureValue" :dropDownValues="formBlockArray4"
                            :passedValue="tenureValue" />
                        <FormBlockText :title="formBlockTitle12" v-model="wefValue" :passedValue="wefValue" />
                        <FormBlockText :title="formBlockTitle13" v-model="topValue" :passedValue="topValue" />
                        <div class="d-flex justify-content-center mt-4">
                            <button type="button" class="btn btn-danger" style="width: 100px" @click="goToPage2"
                                v-if="showPage1Button">Next</button>
                        </div>

                    </div>
                    <div v-show="page2">
                        <FormBlockText :title="formBlockTitle14" v-model="unitValue" />
                        <FormBlockDrop :title="formBlockTitle1" v-model="listingTypeValue"
                            :dropDownValues="formBlockArray1" />
                        <FormBlockDrop :title="formBlockTitle10" v-model="listingSubTypeValue"
                            :dropDownValues="formBlockArray2" />
                        <FormBlockDrop :title="formBlockTitle15" v-model="termValue" :dropDownValues="formBlockArray5" />
                        <FormBlockText :title="formBlockTitle6" v-model="sizeBuiltValue" />
                        <FormBlockText :title="formBlockTitle7" v-model="sizeLandValue" />
                        <FormBlockText :title="formBlockTitle8" v-model="priceValue" />
                        <FormBlockDrop :title="formBlockTitle16" v-model="priceStateValue"
                            :dropDownValues="formBlockArray6" />
                        <div class="d-flex justify-content-around mt-4">
                            <button type="button" class="btn btn-danger" style="width: 100px"
                                @click="goToPage1">Back</button>
                            <button type="button" class="btn btn-danger" style="width: 100px"
                                @click="goToPage3">Next</button>
                        </div>

                    </div>
                    <div v-show="page3">
                        <FormBlockDrop :title="formBlockTitle17" v-model="gstValue" :dropDownValues="formBlockArray7" />
                        <FormBlockText :title="formBlockTitle18" v-model="maintFeeValue" />
                        <FormBlockText :title="formBlockTitle9" v-model="headlineValue" />
                        <div class="mb-3">
                            <div class="form-floating">
                                <textarea class="form-control" placeholder="write a property description"
                                    id="floatingTextarea" v-model="descriptionValue"></textarea>
                                <label for="floatingTextarea">{{ this.formBlockTitle5 }}</label>
                            </div>
                            <div class="d-flex justify-content-end">
                                <button type="button" class="btn btn-outline-dark btn-sm"
                                    @click="consultChatGpt">Auto-fill</button>
                            </div>
                        </div>
                        <FormBlockText :title="formBlockTitle19" v-model="picUrl.pic1" />
                        <FormBlockText :title="formBlockTitle20" v-model="picUrl.pic2" />
                        <FormBlockText :title="formBlockTitle21" v-model="picUrl.pic3" />
                        <FormBlockText :title="formBlockTitle22" v-model="picUrl.pic4" />
                        <div class="d-flex justify-content-around mt-4">
                            <button type="button" class="btn btn-danger" style="width: 100px"
                                @click="goToPage2">Back</button>
                            <button type="button" class="btn btn-danger" style="width: 100px"
                                @click="showWarningSubmitModal">Submit</button>
                        </div>
                    </div>

                </div>
            </form>

            <!-- Modal -->
            <b-modal ref="warningSubmitModal" hide-footer hide-header centered>
                <div class="d-block text-center">
                    <h5>Do you want to upload {{ addressValue }} {{ unitValue }} ?</h5>
                </div>
                <div class="d-flex justify-content-around mt-4">
                    <b-button class="mt-2" variant="outline-danger" style="width: 100px" block
                        @click="hideWarningSubmitModal">No</b-button>
                    <b-button class="mt-2" variant="outline-danger" style="width: 100px" block
                        @click="postData">Yes</b-button>
                </div>
            </b-modal>
            <b-modal ref="confirmSubmitModal" hide-footer hide-header centered no-close-on-backdrop>
                <div class="d-block text-center">
                    <h5>Successfully uploaded {{ addressValue }} {{ unitValue }}</h5>
                </div>
                <div class="d-flex justify-content-around mt-4">
                    <b-button class="mt-2" variant="outline-danger" style="width: 100px" block
                        @click="hideConfirmSubmitModal">Close</b-button>

                </div>
            </b-modal>
        </div>
    </div>
</template>

<script>
import FormBlockText from "@/components/FormBlockText.vue"
import FormBlockDrop from "@/components/FormBlockDrop.vue"
import FormAddressBlock from "@/components/FormAddressBlock.vue"
import FormSubTypeBlock from "@/components/FormSubTypeBlock.vue"
import { BModal } from 'bootstrap-vue'
import axios from "axios"

const queryChatGpt = "http://localhost:5000/filldescription"
const postListingApiUrl = "http://localhost:5000/listing_details/create/"
const postPropertyApiUrl = "http://localhost:5000/property_details/create/"
const checkPropertyApiUrl = "http://localhost:5000/property_details/check/"
const addListingIdApiUrl = "http://localhost:5000/property_details/add/"



export default {
    components: { FormBlockText, FormBlockDrop, FormAddressBlock, FormSubTypeBlock, BModal },
    data: function () {
        return {

            // form page
            page1: true,
            page2: false,
            page3: false,

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
            formBlockTitle11: "Tenure",
            formBlockTitle12: "With Effect From",
            formBlockTitle13: "TOP Year",
            formBlockTitle14: "Unit No.",
            formBlockTitle15: "Condition/Term",
            formBlockTitle16: "Price Indication",
            formBlockTitle17: "GST",
            formBlockTitle18: "Maintanence Fee",
            formBlockTitle19: "Picture URL (Cover Photo)",
            formBlockTitle20: "Photo URL",
            formBlockTitle21: "Photo URL",
            formBlockTitle22: "Photo URL",
            //   Property data properties

            addressValue: "",
            fullAddressData: {},
            propertyTypeValue: "",
            propertySubTypeValue: "",
            roomNoValue: "",
            tenureValue: "",
            wefValue: "",
            topValue: "",
            existingPropertyDataId: "",


            // Listing data
            unitValue: "",
            listingTypeValue: "",
            listingSubTypeValue: "",
            termValue: "",
            sizeBuiltValue: "",
            sizeLandValue: "",
            priceValue: "",
            priceStateValue: "",
            builtPsfValue: "",
            landPsfValue: "",
            gstValue: "",
            maintFeeValue: "",
            headlineValue: "",
            descriptionValue: "",
            picUrl: { pic1: "", pic2: "", pic3: "", pic4: "" },

            // Dropdown Arrays
            formBlockArray1: ["", "For Sale", "For Rent", "Room Rental"],
            formBlockArray2: ["", "Owner Sale", "Mortgagee Sale", "Receiver Sale", "Bank Sale", "Estate Sale", "MCST Sale", "Owner Auction", "Bank Auction"],
            formBlockArray3: ["", "HDB", "Condo", "Landed", "Retail", "Office", "Industrial", "Land"],
            formBlockArray4: ["", "30-year", "60-year", "99-year", "103-year", "110-year", "999-year", "9999-year", "Freehold"],
            formBlockArray5: ["", "Vacant Possession", "Sale with Tenancy", "Sale with/without Tenancy"],
            formBlockArray6: ["", "Starting From", "Negotiable", "Indicative Guide Price"],
            formBlockArray7: ["", "Yes", "No"],


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



        // Post Listing Details, retreive listing ID and post Property Details with listing ID
        postData: async function () {

            if (this.existingPropertyDataId) {
                console.log("update")
                this.hideWarningSubmitModal()
                const getListingId = await this.postListing()
                await this.postExistingProperty(getListingId)
                this.showConfirmSubmitModal()

            } else {
                this.hideWarningSubmitModal()
                const getListingId = await this.postListing()
                await this.postProperty(getListingId)
                this.showConfirmSubmitModal()
            }


        },

        // Post Listing Details
        postListing: async function () {

            let listingData = {
                "listingType": {
                    "type": this.listingTypeValue,
                    "subType": this.listingSubTypeValue,
                    "term": this.termValue,
                },
                "price": {
                    "amount": this.priceValue,
                    "state": this.priceStateValue,
                    "builtPsf": this.builtPsfValue,
                    "landPsf": this.landPsfValue
                },
                "size": {
                    "built": this.sizeBuiltValue,
                    "land": this.sizeLandValue
                },
                "description": {
                    "headline": this.headlineValue,
                    "mainText": this.descriptionValue,
                    "maintFee": this.maintFeeValue,
                    "gst": this.gstValue
                },
                "media": {
                    "photo": this.picUrl,
                    "video": "video"
                },
                "unit": this.unitValue,
                "rooms": this.roomNoValue

            }

            let postListingResponse = await axios.post(postListingApiUrl, listingData)
            let getListingId = postListingResponse.data.id
            return getListingId

        },

        // Post new Property Details
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
                "tenure": this.tenureValue,
                "wef": this.wefValue,
                "top": this.topValue,
                "coordinates": this.fullAddressData.coordinates,
                "listingDetails":
                    [{ "_id": getListingId }]


            }

            await axios.post(postPropertyApiUrl, propertyData)

            this.$refs.anyName.reset()

        },


        postExistingProperty: async function (getListingId) {
            await axios.put(`${addListingIdApiUrl}${this.existingPropertyDataId}/${getListingId}`)
            console.log(getListingId)
            console.log(this.existingPropertyDataId)


            this.$refs.anyName.reset()

        },

        // Chatgpt Function
        async consultChatGpt() {


            let chatGptPrompt = `write me a 5 sentence property description based on the following details:Country: "Singapore", Street Name: ${this.fullAddressData.roadName}, Development Name: ${this.fullAddressData.building}, District: ${this.fullAddressData.district}, Property Type: ${this.propertyTypeValue},${this.propertySubTypeValue}, Property Tenure: ${this.tenureValue}, Listing Type: ${this.listingTypeValue}, ${this.listingSubTypeValue}, Sale Condition: ${this.termValue}, Price: ${this.priceValue}, Price indication: ${this.priceStateValue}, Built-in PSF: ${this.builtPsfValue}, Land PSF: ${this.landPsfValue}, Built-in size: ${this.sizeBuiltValue}, Built-in land: ${this.sizeLandValue}, Maintanence Fee: ${this.maintFeeValue}, Description Headline: ${this.headLineValue}`

            let chatGptAnswer = await axios.post(queryChatGpt, { message: chatGptPrompt })
            this.descriptionValue = chatGptAnswer.data.reply

        },

        // Submit warning Modals
        showWarningSubmitModal: function () {
            this.$refs['warningSubmitModal'].show()
        },

        hideWarningSubmitModal: function () {
            this.$refs['warningSubmitModal'].hide()
        },

        showConfirmSubmitModal: function () {
            this.$refs['confirmSubmitModal'].show()
        },

        hideConfirmSubmitModal: function () {
            this.$refs['confirmSubmitModal'].hide()

        },

        goToPage1: function () {
            this.page1 = true
            this.page2 = false
            this.page3 = false
        },

        goToPage2: function () {
            this.page1 = false
            this.page2 = true
            this.page3 = false
        },

        goToPage3: function () {
            this.page1 = false
            this.page2 = false
            this.page3 = true
        }

    },

    watch: {

        calculateBuiltPsf: function (value) {
            this.builtPsfValue = value

        },

        calculateLandPsf: function (value) {
            this.landPsfValue = value
        },

        fullAddressData: async function (value) {
            let checkPostalCode = value.postalCode
            let result = await axios.get(`${checkPropertyApiUrl}${checkPostalCode}`)
            if (result.data) {
                this.propertyTypeValue = result.data.propertyType.type
                this.propertySubTypeValue = result.data.propertyType.subType
                this.tenureValue = result.data.tenure
                this.wefValue = result.data.top
                this.topValue = result.data.wef
                this.existingPropertyDataId = result.data._id
            }

        }


    },

    computed: {

        calculateBuiltPsf: function () {
            return Math.round(this.priceValue / this.sizeBuiltValue)
        },

        calculateLandPsf: function () {
            return Math.round(this.priceValue / this.sizeLandValue)
        },

        showPage1Button: function () {
            return this.inputAddress !== ""
        }

    },

}

</script>

<style scoped></style>