<template>
    <div>
        <h1>This is a form</h1>

        <div class="container-fluid m-1 p-1">
            <!-- <FormBlockDrop :title="formBlockTitle4" v-model="listingTypeValue" :dropDownValues="formBlockArray4" />
                <FormBlockText :title="formBlockTitle" v-model="listingValue" /> -->
            <!-- <FormBlockText :title="formBlockTitle2" v-model="addressValue" @change="loadData"/> -->
            <FormBlockText :title="formBlockTitle3" v-model="postalCodeValue" />
            <FormBlockDrop :title="formBlockTitle5" v-model="propertyTypeValue" :dropDownValues="formBlockArray5" />
            <FormBlockLongText :title="formBlockTitle6" v-model="descriptionValue" />
            <!-- <input v-model="addressValue" @change="loadData" /> -->
            <!-- <FormAddressBlock :title="formBlockTitle2" v-model="addressValue" :dropDownValues="addressValueResult" @fetchData="loadData" @selectData="update"/> -->
            <FormAddressBlock :title="formBlockTitle2" v-model="addressValue" @update="getAddress"/>
        </div>
    </div>
</template>

<script>
import FormBlockText from "@/components/FormBlockText.vue"
import FormBlockDrop from "@/components/FormBlockDrop.vue"
import FormBlockLongText from "@/components/FormBlockLongText.vue"
import FormAddressBlock from "@/components/FormAddressBlock.vue"
// import axios from "axios"



export default {
    name: "PropertyForm",
    components: { FormBlockText, FormBlockDrop, FormBlockLongText, FormAddressBlock },
    data: function () {
        return {
            // onemapBaseURL: "",
            formBlockTitle: "Listing Details",
            formBlockTitle2: "Address",
            formBlockTitle3: "Postal Code",
            formBlockTitle4: "Listing Type",
            formBlockTitle5: "Property Type",
            formBlockTitle6: "Description",
            listingValue: "",
            addressValue: "",
            postalCodeValue: "",
            listingTypeValue: "",
            propertyTypeValue: "",
            descriptionValue: "",
            formBlockArray4: ["For Sale", "For Rent", "Room Rental"],
            formBlockArray5: ["Commercial", "Residential", "Industrial"],

        }
    },
    methods: {

        getAddress: function(selectedAddress){
            this.addressValue = selectedAddress

        }
     

    },
    computed: {
        // loadData: async function () {
        //     const result = []
        //     const baseApiUrl = "https://developers.onemap.sg/commonapi/search?searchVal=";
        //     let endpoint = `${baseApiUrl}${this.addressValue}&returnGeom=Y&getAddrDetails=Y&pageNum=1`
        //     let response = await axios.get(endpoint)
        //     let list = response.data.results
        //     for (let i = 0; i < 8; i++){
        //         let data = list[i].ADDRESS;
        //         let dataLowerCaps = data.toLowerCase(); 
        //         let dataString = dataLowerCaps.split(" ");
        //         for (let i = 0; i < dataString.length; i++){
        //             dataString[i] = dataString[i].charAt(0).toUpperCase() + dataString[i].slice(1);

        //         }
        //         let finalData = dataString.join(" ")
        //         result.push(finalData);

        //     }
        //     return result
        // }
    },

}

</script>

<style scoped></style>