<!-- Developed for FormAddressBlock -->
<template>
    <div>
        <div class="form-floating mb-3" data-bs-toggle="dropdown">
            <input type="text" class="form-control" id="floatingInput" placeholder="demo" @change="fetchData"
                @input="updateValue($event.target.value)" />
            <ul class="dropdown-menu">
                <li v-for="d in this.dropDownValues" :key="d" :value="d"><a class="dropdown-item" v-on:click="select">{{ d
                }}</a></li>
                <!-- <li><a class="dropdown-item">Another action</a></li> -->

            </ul>
            <label for="floatingInput">{{ this.title }}</label>

        </div>
    </div>
</template>

<script>
export default {
    data: function(){
        return{

        }
    },
    props: ["title", "dropDownValues"],
    methods: {
        updateValue(value) {
            this.$emit("input", value);
        },
        fetchData() {
            this.$emit("fetchData")
        },
        select() {
            this.$emit("selectData")
        }


    }
}

</script>

<style scoped></style>
