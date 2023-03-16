<template>
    <div>
        <div class="form-floating mb-3">
            <input type="text" class="form-control" id="floatingInput" placeholder="demo" v-model="inputAddress"
                @keyup="fetchData">
            <ul class="list-group" v-if="addressDropDown">
                <!-- check the rendering here -->
                <li v-for="(a, index) in addressData" :key="a"><a class="list-group-item" @click="(select(index, a))">{{ a
                }}</a></li>

            </ul>
            <label for="floatingInput">{{ this.title }}</label>


        </div>
    </div>
</template>

<script>
import axios from "axios"


const baseApiUrl = "https://developers.onemap.sg/commonapi/search?searchVal=";

export default {

    data: function () {
        return {

            inputAddress: "",
            addressData: [],
            fullAddressData: {
                block: "",
                roadName: "",
                building: "",
                postalCode: "",
                district: "",
                coordinates: []
            },
            addressDropDown: false,
            districtTable: {
                "D1": ["01", "02", "03", "04", "05", "06"],
                "D2": ["07", "08"],
                "D3": ["14", "15", "16"],
                "D4": ["09", "10"],
                "D5": ["11", "12", "13"],
                "D6": ["17"],
                "D7": ["18", "19"],
                "D8": ["20", "21"],
                "D9": ["22", "23"],
                "D10": ["24", "25", "26", "27"],
                "D11": ["28", "29", "30"],
                "D12": ["31", "32", "33"],
                "D13": ["34", "35", "36"],
                "D14": ["38", "39", "40", "41"],
                "D15": ["42", "43", "44", "45"],
                "D16": ["46", "47", "48"],
                "D17": ["49", "50", "81"],
                "D18": ["51", "52"],
                "D19": ["53", "54", "55", "82"],
                "D20": ["56", "57"],
                "D21": ["58", "59"],
                "D22": ["60", "61", "62", "63", "64"],
                "D23": ["65", "66", "67", "68"],
                "D24": ["69", "70", "71"],
                "D25": ["72", "73"],
                "D26": ["77", "78"],
                "D27": ["75", "76"],
                "D28": ["79", "80"]
            }


        }
    },
    props: ["title", "dropDownValues"],
    methods: {

        fetchData: async function () {

            if (this.inputAddress === "") {
                this.addressDropDown = false
                this.addressData = []
            } else {
                this.addressData = []
                this.addressDropDown = true
                let endpoint = `${baseApiUrl}${this.inputAddress}&returnGeom=Y&getAddrDetails=Y&pageNum=1`
                let response = await axios.get(endpoint)
                let list = response.data.results

                for (let i = 0; i < 8; i++) {
                    // do a conditional statement to filter out no address found in onemap
                    // rendering list more than once... need to check 
                    let data = list[i].ADDRESS;
                    // let rawCoordinates = [list[i].LATITUDE, list[i].LONGTITUDE]
                    let dataLowerCaps = data.toLowerCase();
                    let dataString = dataLowerCaps.split(" ");
                    for (let i = 0; i < dataString.length; i++) {
                        dataString[i] = dataString[i].charAt(0).toUpperCase() + dataString[i].slice(1);
                    }
                    let finalData = dataString.join(" ")
                    this.addressData.push(finalData)
                }
            }

        },


        select: function (index, a) {
            this.inputAddress = this.addressData[index]
            this.$emit("updateAddressValue", a)
            this.$emit("updateFullAddressData", this.fullAddressData)
            this.addressDropDown = false

        }


    },

    watch: {
        inputAddress: async function () {
            this.fullAddressData = {}
            let endpoint = `${baseApiUrl}${this.inputAddress}&returnGeom=Y&getAddrDetails=Y&pageNum=1`
            let response = await axios.get(endpoint)
            // Block
            this.fullAddressData.block = response.data.results[0].BLK_NO
            // Road Name
            let roadName = response.data.results[0].ROAD_NAME
            let roadNameLowerCaps = roadName.toLowerCase()
            let roadNameString = roadNameLowerCaps.split(" ")
            for (let i = 0; i < roadNameString.length; i++) {
                roadNameString[i] = roadNameString[i].charAt(0).toUpperCase() + roadNameString[i].slice(1);
            }
            this.fullAddressData.roadName = roadNameString.join(" ")
            // Building
            let buildingName = response.data.results[0].BUILDING
            let buildingNameLowerCaps = buildingName.toLowerCase()
            let buildingNameString = buildingNameLowerCaps.split(" ")
            for (let i = 0; i < buildingNameString.length; i++) {
                buildingNameString[i] = buildingNameString[i].charAt(0).toUpperCase() + buildingNameString[i].slice(1);
            }
            this.fullAddressData.building = buildingNameString.join(" ")
            // Postal Code
            this.fullAddressData.postalCode = response.data.results[0].POSTAL
            // Coordinates
            this.fullAddressData.coordinates = [response.data.results[0].LATITUDE, response.data.results[0].LONGTITUDE]
            // District
            let firstTwoDigit = this.fullAddressData.postalCode.substring(0, 2)
            for (let [key, i] of Object.entries(this.districtTable)) {
                if (i.includes(firstTwoDigit)) {
                    this.fullAddressData.district = key
                }

            }


        }
    },


}



</script>

<style scoped></style>
