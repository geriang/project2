<template>
    <div>
        <div class="container-fluid m-1 p-1">
            <h1>Basic Details</h1>
            <FormBlockDrop :title="formBlockTitle1" v-model="listingTypeValue" :dropDownValues="formBlockArray1" />
            <FormAddressBlock :title="formBlockTitle2" v-model="addressValue" @update="getAddress" />
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

const API_URL = "http://localhost:5000/listing_details/create/"
const END_URL = "63ef83e27aad1cd42e13dd96/63ef8627383836ca595b4e07"



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
            // listingValue: "",
            addressValue: "",
            // postalCodeValue: "",
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
            // formBlockArray4: [" ", "1-Room / Studio", "2I (Improved)", "2S (Standard)", "2A", "3A", "3NG (New Generation)", "3A (Modified)", "3NG (Modified)", "3I (Improved)", "3S (Simplified)", "3STD (Standard)", "4A", "4NG (New Generation)", "4PA (4 Room Premium Apartment)", "4S (Simplified)", "4I (Improved)", "4STD (Standard)", "5A", "5I", "5PA (5 Room Premium Apartment)", "5S", "Jumbo", "EA (Exec Apartment)", "EM (Exec Maisonette)", "MG (Multi-Generation)", "Terrace"],
            // formBlockArray5: [" ", "Apartment", "Cluster House", "Condominium", "Executive Condominium", "Walk-up"],
            // formBlockArray6: [" ", "Good Class Bungalow", "Conservation House", "Corner Terrace", "Detached House", "Bungalow House", "Cluster House", "Land Only", "Semi-Detached House", "Shophouse", "Terrace House", "Town House"],
            // formBlockArray7: [" ", "Food & Beverage", "Mall Shop", "Medical", "Other Retail", "Shop / Shophouse"],
            // formBlockArray8: [" ", "Business / Science Park", "Office"],
            // formBlockArray9: [" ", "Dormitory", "Factory / Workshop (B2)", "Light Industrial (B1)", "Warehouse"],
            // formBlockArray10: [" ", "Land with Building / En-bloc", "Land Only"]
        }
    },
    methods: {

        getAddress: function (selectedAddress) {
            this.addressValue = selectedAddress

        },

        getSubType: function (selectedSubType) {
            this.propertySubTypeValue = selectedSubType
        },

        getRoomValue: function (selectedRoomValue) {
            this.roomNoValue = selectedRoomValue

        },

        postData: async function () {

            let data = {
                "listingType": {
                    "type": this.propertyTypeValue,
                    "subType": this.propertySubTypeValue,
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

            let postResponse = await axios.post(API_URL + END_URL, data)
            console.log(postResponse.data)

        }





    },

    watch: {


    },

    computed: {

    },

}

</script>

<style scoped></style>