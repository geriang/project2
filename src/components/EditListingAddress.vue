<template>
    <div class="form-floating mb-3">
        <input type="text" class="form-control" id="floatingInput" placeholder="demo" v-model="inputAddress"
            @keyup="searchProperty"/>
        <ul class="list-group" v-if="searchDropDown">

            <li v-for="(r, index ) in result" :key="index"><a class="list-group-item" @click="(select(r, index))">
                    {{ r }}
                </a></li>

        </ul>
        <label for="floatingInput">Property Address</label>

        <!-- <div>{{ result }}</div> -->


    </div>
</template>


<script>


import axios from 'axios'


const getDataApiUrl = "http://localhost:5000/property_details"

export default {

    components: {},

    data: function () {
        return {
            inputAddress: "",
            formBlockTitle1: "Property Address",
            searchDropDown: false,
            result: [],
            getPostalCode : "",
            allPropertyData: [],
            selectedProperty: {}

        }
    },

    methods: {
        searchProperty: async function () {

            if (this.inputAddress === " ") {
                this.result = []
                this.searchDropDown = false
            } else {
                this.searchDropDown = true
                this.result = []
                const result = await axios.get(`${getDataApiUrl}/${this.inputAddress}`)
                let allAddresses = result.data
                this.allPropertyData = allAddresses
                for (let a of allAddresses) {
                    let fullStreetName = `${a.address.block} ${a.address.streetName} Singapore ${a.address.postalCode}`
                    this.result.push(fullStreetName)
                }
            }
        },
        // this.searchDropDown = true

        select: function (r, index) {
            this.inputAddress = this.result[index]
            this.getPostalCode = this.inputAddress.slice(-6)
            this.searchDropDown = false
          



        },
        closeDropDown: function () {
            this.searchDropDown = false
        }

    },
    watch: {

        getPostalCode: function(postalCode){
            for(let a of this.allPropertyData ){
                if (a.address.postalCode === postalCode)
                this.selectedProperty = a
                this.$emit("updateSelectedData", this.selectedProperty)
                
            }
            
            
        },

    }


}

</script>

<style scoped></style>