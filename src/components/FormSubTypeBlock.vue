<template>
    <div>
        <div class="form-floating mb-3" @click="showSubTypeDropDown = !showSubTypeDropDown">
            <input type="text" class="form-control" id="floatingInput" placeholder="demo" v-model="searchQuery" />
            <ul class="list-group" v-show="showSubTypeDropDown">
                <li v-for="(d, index) in filteredData" :key="d" @click="(select(d, index), showSubTypeDropDown = !showSubTypeDropDown)"><a
                        class="list-group-item">{{ d
                        }}</a></li>
            </ul>
            <label for="floatingInput">{{ this.title }}</label>

        </div>
         <FormBlockDrop v-show ="showRoomDropDown" :title="formBlockTitle1" v-model="noOfRoom" :dropDownValues="noOfRooms" @input="updateRoomValue" />
    </div>
</template>

<script>
import FormBlockDrop from "@/components/FormBlockDrop.vue"

export default {

    components: {FormBlockDrop},

    data: function () {
        return {
            showSubTypeDropDown: false,
            showRoomDropDown: false,
            data: [],
            searchQuery: "",
            subType: {
                HDB: ["1-Room / Studio", "2I (Improved)", "2S (Standard)", "2A", "3A", "3NG (New Generation)", "3A (Modified)", "3NG (Modified)", "3I (Improved)", "3S (Simplified)", "3STD (Standard)", "4A", "4NG (New Generation)", "4PA (4 Room Premium Apartment)", "4S (Simplified)", "4I (Improved)", "4STD (Standard)", "5A", "5I", "5PA (5 Room Premium Apartment)", "5S", "Jumbo", "EA (Exec Apartment)", "EM (Exec Maisonette)", "MG (Multi-Generation)", "Terrace"],
                Condo: ["Apartment", "Cluster House", "Condominium", "Executive Condominium", "Walk-up"],
                Landed: ["Good Class Bungalow", "Conservation House", "Corner Terrace", "Detached House", "Bungalow House", "Cluster House", "Land Only", "Semi-Detached House", "Shophouse", "Terrace House", "Town House"],
                Retail: ["Food & Beverage", "Mall Shop", "Medical", "Other Retail", "Shop / Shophouse"],
                Office: ["Business / Science Park", "Office"],
                Industrial: ["Dormitory", "Factory / Workshop (B2)", "Light Industrial (B1)", "Warehouse"],
                Land: ["Land with Building / En-bloc", "Land Only"]
            },
            noOfRooms: [" ", "Studio", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
            formBlockTitle1: "No of Rooms",
            noOfRoom: ""

        }

    },

    props: ["title", "selectedPropertyType"],
    methods: {

        select: function (d, index) {
            this.searchQuery = this.filteredData[index]
            this.$emit("updateSubTypeValue", d)
        },

        updateRoomValue: function (noOfRoom) {
            this.$emit("updateRoomNoValue", noOfRoom)
    
        }



    },

    computed: {
        filteredData: function () {

            // return this.updateData(this.searchResult)       
            let searchResult = this.data
                .map((index, d) => ({ d, index })) // add index to each item
                .filter(d => this.searchQueryRegex.test(d.index)) // filter by index
                .map(d => d.index); // return array of indexes only

            return searchResult

            // return this.data
            // .map((d,index) => ({d,index}))
            // .filter(d => this.searchQuery.toLowerCase(d.index))


            // return this.data.filter(d => d.toLowerCase().includes(this.searchQuery.toLowerCase()))

            // let filtered = this.data.map((d, index) => ({ index }))
            //     .filter((d) => {
            //         this.searchQueryRegex.test(d.index)

            //     })
            // return filtered

            // return this.subType.HDB
            //     .map((index, d) => ({ d, index })) // add index to each item
            //     .filter(d => this.searchQueryRegex.test(d.index)) // filter by index
            //     .map(d => d.index); // return array of indexes only

        },
        searchQueryRegex() {
            return new RegExp(this.searchQuery, 'i'); // create regular expression for search query
        }

    },
    watch: {
        selectedPropertyType: function () {
            this.data = this.subType[this.selectedPropertyType]
            if (this.selectedPropertyType === "HDB" || this.selectedPropertyType === "Condo" || this.selectedPropertyType === "Landed"){
                this.showRoomDropDown = !this.showRoomDropDown
            }

        }
       
        }


    

}


</script>



<style scoped></style>
