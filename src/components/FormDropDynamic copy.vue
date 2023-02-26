<!-- developed for FormSubTypeBlock -->
<template>
    <div>
        <div class="form-floating mb-3" @click="showDropDown = !showDropDown">
            <input type="text" class="form-control" id="floatingInput" placeholder="demo" v-model="searchQuery" />
            <ul class="list-group" v-if="showDropDown">
                <li v-for="(d, index) in filteredData" :key="d"><a class="list-group-item"
                        @click="(select(d, index), showDropDown = !showDropDown)">{{ d
                        }}</a></li>



            </ul>
            <label for="floatingInput">{{ this.title }}</label>

        </div>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            showDropDown: false,
            searchQuery: "",
            data: ["1-Room / Studio", "2I (Improved)", "2S (Standard)", "2A", "3A", "3NG (New Generation)", "3A (Modified)", "3NG (Modified)", "3I (Improved)", "3S (Simplified)", "3STD (Standard)", "4A", "4NG (New Generation)", "4PA (4 Room Premium Apartment)", "4S (Simplified)", "4I (Improved)", "4STD (Standard)", "5A", "5I", "5PA (5 Room Premium Apartment)", "5S", "Jumbo", "EA (Exec Apartment)", "EM (Exec Maisonette)", "MG (Multi-Generation)", "Terrace"]
          
        }

    },
    props: ["title"],
    methods: {

        select: function (d, index) {
            this.searchQuery = this.filteredData[index]
            this.$emit("update", d)

        }

    },
    computed: {
        filteredData: function () {

            // return this.data
            // .map((d,index) => ({d,index}))
            // .filter(d => this.searchQuery.toLowerCase(d.index))


            // return this.data.filter(d => d.toLowerCase().includes(this.searchQuery.toLowerCase()))

            // let filtered = this.data.map((d, index) => ({ index }))
            //     .filter((d) => {
            //         this.searchQueryRegex.test(d.index)

            //     })
            // return filtered


            return this.data
                .map((index, d) => ({ d, index})) // add index to each item
                .filter(d=> this.searchQueryRegex.test(d.index)) // filter by index
                .map(d => d.index); // return array of indexes only
 

        },
        searchQueryRegex() {
            return new RegExp(this.searchQuery, 'i'); // create regular expression for search query
        }



    }

}




</script>

<style scoped></style>
