<template>
    <div>
        <div class="container-fluid m-1 p-1">
            <div class="mt-3">
                <h5>Edit Listing Details</h5>
            </div>

        </div>
        <div v-show="formPage1">
            <form :key="editFormComponentKey">
                <EditListingAddress @updateSelectedData="getData" />
                <FormBlockText :title="formBlockTitle1" v-model="project" :passedValue="project" />
                <FormBlockDrop :title="formBlockTitle2" v-model="propertyType" :passedValue="propertyType"
                    :dropDownValues="formBlockArray1" />
                <EditFormSubTypeBlock :title="formBlockTitle3" v-model="subType" :passedValue="subType"
                    :selectedPropertyType="this.propertyType" @updateSubTypeValue="getSubType" />
                <FormBlockDrop :title="formBlockTitle4" v-model="tenure" :passedValue="tenure"
                    :dropDownValues="formBlockArray2" />
                <FormBlockText :title="formBlockTitle5" v-model="wef" :passedValue="wef" />
                <FormBlockText :title="formBlockTitle6" v-model="top" :passedValue="top" />

            </form>
            <div class="d-flex justify-content-center mt-4" v-if="buttonPage1">
                <button type="button" class="btn btn-danger" style="width:100px" @click="toPage2">Next</button>
            </div>
        </div>

        <div class="mb-3" v-show="formPage2">
            <form :key="editFormComponentKey">
                <div class="m-1" v-for="(l, _id) in listingData" :key="_id">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"
                            @click="selectListingToEdit(l, _id)">
                        <label class="form-check-label" for="flexRadioDefault1">
                            {{ l.listingType.type }} - {{ l.unit }} [{{ l.size.built }}sqft] [${{ l.price.amount }}]
                        </label>
                        <span v-if="deleteButton === _id"><button type="button" class="btn btn-danger btn-sm m-1 p-1"
                                @click="showWarningDeleteModal">Delete</button></span>

                    </div>
                </div>
                <div class="d-flex justify-content-around mt-4">
                    <button type="button" class="btn btn-danger" style="width:100px" @click="toPage1">Back</button>
                    <button type="button" class="btn btn-danger" style="width:100px" @click="toPage3"
                        v-show="editButton">Edit</button>
                </div>
            </form>

            <!-- Modal -->
            <b-modal ref="warningDeleteModal" hide-footer hide-header centered>
                <div class="d-block text-center">
                    <h5>Do you want to delete {{ blockAndStreet }} {{ this.unit }} {{ this.project }} ?</h5>
                </div>
                <div class="d-flex justify-content-around mt-4">
                    <b-button class="mt-2" variant="outline-danger" style="width: 100px" block
                        @click="hideWarningDeleteModal">No</b-button>
                    <b-button class="mt-2" variant="outline-danger" style="width: 100px" block
                        @click="deleteListing">Yes</b-button>
                </div>
            </b-modal>
            <!-- Modal -->
            <b-modal ref="confirmDeleteModal" hide-footer hide-header centered no-close-on-backdrop>
                <div class="d-block text-center">
                    <h5>{{ blockAndStreet }} {{ this.unit }} {{ this.project }} is deleted.</h5>
                </div>
                <div class="d-flex justify-content-around mt-4">
                    <b-button class="mt-2" variant="outline-danger" style="width: 100px" block
                        @click="hideConfirmDeleteModal">Close</b-button>
                </div>
            </b-modal>


        </div>
        <div v-show="formPage3">
            <form :key="editFormComponentKey">
                <FormBlockText :title="formBlockTitle7" v-model="unit" :passedValue="unit" />
                <FormBlockDrop :title="formBlockTitle8" v-model="noOfRoom" :passedValue="noOfRoom"
                    :dropDownValues="formBlockArray8" />
                <FormBlockDrop :title="formBlockTitle9" v-model="listingType" :passedValue="listingType"
                    :dropDownValues="formBlockArray3" />
                <FormBlockDrop :title="formBlockTitle10" v-model="listingSubType" :passedValue="listingSubType"
                    :dropDownValues="formBlockArray4" />
                <FormBlockDrop :title="formBlockTitle11" v-model="term" :passedValue="term"
                    :dropDownValues="formBlockArray5" />
                <FormBlockText :title="formBlockTitle12" v-model="sizeBuilt" :passedValue="sizeBuilt" />
                <FormBlockText :title="formBlockTitle13" v-model="sizeLand" :passedValue="sizeLand" />
                <FormBlockText :title="formBlockTitle14" v-model="price" :passedValue="price" />
                <FormBlockDrop :title="formBlockTitle15" v-model="priceState" :passedValue="priceState"
                    :dropDownValues="formBlockArray6" />
                <FormBlockDrop :title="formBlockTitle16" v-model="gst" :passedValue="gst"
                    :dropDownValues="formBlockArray7" />
                <FormBlockText :title="formBlockTitle17" v-model="maintFee" :passedValue="maintFee" />
                <FormBlockText :title="formBlockTitle18" v-model="headline" :passedValue="headline" />
                <FormBlockLongText :title="formBlockTitle19" v-model="description" :passedValue="description" />
                <FormBlockText :title="formBlockTitle20" v-model="picUrl.pic1" :passedValue="picUrl.pic1" />
                <FormBlockText :title="formBlockTitle21" v-model="picUrl.pic2" :passedValue="picUrl.pic2"/>
                <FormBlockText :title="formBlockTitle22" v-model="picUrl.pic3" :passedValue="picUrl.pic3"/>
                <FormBlockText :title="formBlockTitle23" v-model="picUrl.pic4" :passedValue="picUrl.pic4"/>
                <div class="d-flex justify-content-around mt-4">
                    <button type="button" class="btn btn-danger" style="width:100px" @click="toPage2">Back</button>
                    <button type="button" class="btn btn-danger" style="width:100px"
                        @click="showWarningEditModal">Update</button>
                </div>
            </form>
            <!-- Modal -->
            <b-modal ref="warningEditModal" hide-footer hide-header centered>
                <div class="d-block text-center">
                    <h5>Do you want to edit {{ blockAndStreet }} {{ unit }} {{ project }} ?</h5>
                </div>
                <div class="d-flex justify-content-around mt-4">
                    <b-button class="mt-2" variant="outline-danger" style="width: 100px" block
                        @click="hideWarningEditModal">No</b-button>
                    <b-button class="mt-2" variant="outline-danger" style="width: 100px" block
                        @click="editPropertyAndListing">Yes</b-button>
                </div>
            </b-modal>
            <!-- Modal -->
            <b-modal ref="confirmEditModal" hide-footer hide-header centered no-close-on-backdrop>
                <div class="d-block text-center">
                    <h5>{{ blockAndStreet }} {{ unit }} {{ project }} is edited successfully.</h5>
                </div>
                <div class="d-flex justify-content-around mt-4">
                    <b-button class="mt-2" variant="outline-danger" style="width: 100px" block
                        @click="hideConfirmEditModal">Close</b-button>
                </div>
            </b-modal>
        </div>



    </div>
</template>




<script>
import EditListingAddress from './EditListingAddress.vue';
import FormBlockText from './FormBlockText.vue';
import FormBlockDrop from './FormBlockDrop.vue';
import EditFormSubTypeBlock from './EditFormSubTypeBlock.vue';
import FormBlockLongText from './FormBlockLongText.vue';
import { BModal } from 'bootstrap-vue'
import axios from 'axios'

const deleteListingDataApiUrl = `${process.env.VUE_APP_DEV_SERVER}/listing_details/delete/`
const updatePropertyApiUrl = `${process.env.VUE_APP_DEV_SERVER}/property_details/update/`
const updateListingApiUrl = `${process.env.VUE_APP_DEV_SERVER}/listing_details/update/`



export default {

    components: { EditListingAddress, FormBlockText, FormBlockDrop, EditFormSubTypeBlock, FormBlockLongText, BModal },

    data: function () {
        return {

            editFormComponentKey: 0,
            formPage1: true,
            buttonPage1: false,
            formPage2: false,
            deleteButton: false,
            editButton: false,
            formPage3: false,

            // field labels,
            formBlockTitle1: "Project/Estate",
            formBlockTitle2: "Property Type",
            formBlockTitle3: "Sub-type",
            formBlockTitle4: "Tenure",
            formBlockTitle5: "With Effect From",
            formBlockTitle6: "TOP Year",
            formBlockTitle7: "Unit No.",
            formBlockTitle8: "Number of Rooms",
            formBlockTitle9: "Listing Type",
            formBlockTitle10: "Sub-type",
            formBlockTitle11: "Condition/Term",
            formBlockTitle12: "Built-in Area (sqft)",
            formBlockTitle13: "Land Area (sqft)",
            formBlockTitle14: "Price (SGD)",
            formBlockTitle15: "Price Indication",
            formBlockTitle16: "GST",
            formBlockTitle17: "Maintenance Fee",
            formBlockTitle18: "Headline",
            formBlockTitle19: "Description",
            formBlockTitle20: "Picture URL (Cover Photo)",
            formBlockTitle21: "Photo URL",
            formBlockTitle22: "Photo URL",
            formBlockTitle23: "Photo URL",

            // dropdown values 
            formBlockArray1: ["", "HDB", "Condo", "Landed", "Retail", "Office", "Industrial", "Land"],
            formBlockArray2: ["", "30-year", "60-year", "99-year", "103-year", "110-year", "999-year", "9999-year", "Freehold"],
            formBlockArray3: ["", "For Sale", "For Rent", "Room Rental"],
            formBlockArray4: ["", "Owner Sale", "Mortgagee Sale", "Receiver Sale", "Bank Sale", "Estate Sale", "MCST Sale", "Owner Auction", "Bank Auction"],
            formBlockArray5: ["", "Vacant Possession", "Sale with Tenancy", "Sale with/without Tenancy"],
            formBlockArray6: ["", "Starting From", "Negotiable", "Indicative Guide Price"],
            formBlockArray7: ["", "Yes", "No"],
            formBlockArray8: ["", "Studio", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
            // property listing v-model
            propertyId: "",
            blockAndStreet: "",
            project: "",
            propertyType: "",
            subType: "",
            tenure: "",
            wef: "",
            top: "",
            // listing data
            listingData: [],
            listingId: "",
            unit: "",
            noOfRoom: "",
            listingType: "",
            listingSubType: "",
            term: "",
            sizeBuilt: "",
            builtPsf: "",
            sizeLand: "",
            landPsf: "",
            price: "",
            priceState: "",
            gst: "",
            maintFee: "",
            headline: "",
            description: "",
            picUrl: { pic1: "", pic2: "", pic3: "", pic4: "" }

        }
    },

    methods: {

        getData: function (data) {
            // console.log(data)
            this.buttonPage1 = false
            this.blockAndStreet = `${data.address.block} ${data.address.streetName}`
            this.project = data.address.project
            this.propertyType = data.propertyType.type
            this.subType = data.propertyType.subType
            this.tenure = data.tenure
            this.wef = data.wef
            this.top = data.top
            this.listingData = data.listingDetails
            // console.log(this.listingData)
            this.buttonPage1 = true

            this.propertyId = data._id
            // console.log(this.propertyId)



        },

        getSubType: function (selectedSubType) {
            this.subType = selectedSubType
        },

        toPage3: function () {
            this.formPage1 = false
            this.formPage2 = false
            this.formPage3 = true
        },

        toPage2: function () {
            this.formPage1 = false
            this.formPage2 = true
            this.formPage3 = false
        },
        toPage1: function () {
            this.formPage1 = true
            this.formPage2 = false
            this.formPage3 = false
        },
        selectListingToEdit: function (l, _id) {
            this.deleteButton = _id
            this.editButton = true
            this.unit = l.unit
            this.listingType = l.listingType.type
            this.listingSubType = l.listingType.subType
            this.noOfRoom = l.rooms
            this.term = l.listingType.term
            this.sizeBuilt = l.size.built
            this.sizeLand = l.size.land
            this.price = l.price.amount
            this.priceState = l.price.state
            this.gst = l.description.gst
            this.maintFee = l.description.maintFee
            this.headline = l.description.headline
            this.description = l.description.mainText
            this.listingId = l._id
            this.picUrl = l.media.photo

            // console.log(l.media.photo)
            // console.log(this.picUrl.pic1)

            // console.log(_id)
            // console.log(this.listingId)




        },
        // delete Listing
        deleteListing: async function () {
            this.hideWarningDeleteModal()
            await axios.delete(`${deleteListingDataApiUrl}${this.listingId}`)
            await axios.put(`${updatePropertyApiUrl}${this.propertyId}/${this.listingId}`)
            this.showConfirmDeleteModal()

            // edit Property & Listing
        },
        editPropertyAndListing: async function () {
            
            let propertyData = {

                "address": {
                    "project": this.project
                },
                "propertyType": {
                    "type": this.propertyType,
                    "subType": this.subType,
                },
                "tenure": this.tenure,
                "wef": this.wef,
                "top": this.top,

            }
            let listingData = {
                "listingType": {
                    "type": this.listingType,
                    "subType": this.listingSubType,
                    "term": this.term
                },
                "price": {
                    "amount": this.price,
                    "state": this.priceState,
                    "builtPsf": this.builtPsf,
                    "landPsf": this.landPsf
                },
                "size": {
                    "built": this.sizeBuilt,
                    "land": this.sizeLand
                },
                "description": {
                    "headline": this.headline,
                    "mainText": this.description,
                    "maintFee": this.maintFee,
                    "gst": this.gst
                },
                "media": {
                    "photo": this.picUrl,
                    "video": "video"
                },
                "unit": this.unit,
                "rooms": this.noOfRoom

            }
            this.hideWarningEditModal()
            await axios.put(`${updatePropertyApiUrl}${this.propertyId}`, propertyData)
            await axios.put(`${updateListingApiUrl}${this.listingId}`, listingData)
            this.showConfirmEditModal()
        },

        // Delete warning Modals
        showWarningDeleteModal: function () {
            this.$refs['warningDeleteModal'].show()
        },

        hideWarningDeleteModal: function () {
            this.$refs['warningDeleteModal'].hide()
        },

        showConfirmDeleteModal: function () {
            this.$refs['confirmDeleteModal'].show()
        },

        hideConfirmDeleteModal: function () {
            this.$refs['confirmDeleteModal'].hide()
            this.refreshEditForm()
            this.toPage1()
            this.buttonPage1 = false
        },

        // Edit warning Modals

        showWarningEditModal: function () {
            this.$refs['warningEditModal'].show()
        },

        hideWarningEditModal: function () {
            this.$refs['warningEditModal'].hide()
        },

        showConfirmEditModal: function () {
            this.$refs['confirmEditModal'].show()
        },

        hideConfirmEditModal: function () {
            this.$refs['confirmEditModal'].hide()
            this.refreshEditForm()
            this.toPage1()
            this.buttonPage1 = false
        },

        refreshEditForm: function () {
            this.editFormComponentKey += 1;
        }


    },

    watch: {

        calculateBuiltPsf: function (value) {
            this.builtPsf = value

        },

        calculateLandPsf: function (value) {
            this.landPsf = value
        },


    },

    computed: {

        calculateBuiltPsf: function () {
            return Math.round(this.price / this.sizeBuilt)
        },

        calculateLandPsf: function () {
            return Math.round(this.price / this.sizeLand)
        }


    },



}



</script>


<style scoped></style>

