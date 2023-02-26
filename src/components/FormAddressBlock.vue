<template>
    <div>
        <div class="form-floating mb-3">
            <input type="text" class="form-control" id="floatingInput" placeholder="demo" v-model="inputAddress"
                @keyup="fetchData" @input="addressDropDown = !addressDropDown"/>
            <ul class="list-group" v-if="addressDropDown">
                <li v-for="(a, index) in addressData" :key="a"><a class="list-group-item" @click="(select(index, a), addressDropDown=!addressDropDown)">{{ a
                }}</a></li>

            </ul>
            <label for="floatingInput">{{ this.title }}</label>
       

        </div>
    </div>
</template>

<script>
import axios from "axios"
export default {

    data: function () {
        return {

            inputAddress: "",
            addressData: [],
            addressDropDown: false
        

        }
    },
    props: ["title", "dropDownValues"],
    methods: {

        fetchData: async function () {
            this.addressData = []
            const baseApiUrl = "https://developers.onemap.sg/commonapi/search?searchVal=";
            let endpoint = `${baseApiUrl}${this.inputAddress}&returnGeom=Y&getAddrDetails=Y&pageNum=1`
            let response = await axios.get(endpoint)
            let list = response.data.results
            for (let i = 0; i < 8; i++) {
                let data = list[i].ADDRESS;
                let dataLowerCaps = data.toLowerCase();
                let dataString = dataLowerCaps.split(" ");
                for (let i = 0; i < dataString.length; i++) {
                    dataString[i] = dataString[i].charAt(0).toUpperCase() + dataString[i].slice(1);
                }
                let finalData = dataString.join(" ")
                this.addressData.push(finalData)
            }

        },

        // updateValue: function (value) {
        //     this.$emit("input", value);
        // },

        select: function(index, a) {
            this.inputAddress = this.addressData[index]
            this.$emit("update" , a )
           
        }
      


    }
}

</script>

<style scoped></style>
