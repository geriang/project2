<template>

<div>
        <div class="container-fluid m-1 p-1">
            <div class="mt-3"><h5>Edit Listing Details</h5></div>

        </div>
        <form>
        <EditListingAddress />

        <!-- :title="formBlockTitle2" v-model="addressValue" -->

        </form>

        <!-- @updateAddressValue="getAddress"
        @updateFullAddressData="getFullAddressData"  -->

</div>


</template>




<script>
import EditListingAddress from './EditListingAddress.vue';
import axios from 'axios'


const getDataApiUrl = "http://localhost:5000/property_details"

export default{

    components: {EditListingAddress, },

    data: function(){
        return{
            addressValue: "",
            formBlockTitle1: "Property Address",
            // inputAddress: ""
        }
    },

    method: {
        searchProperty: async function(){
        const result = await axios.get(`${getDataApiUrl}+${this.addressValue}`)
        console.log(result)
    },

    }

}



</script>


<style scoped>

</style>

