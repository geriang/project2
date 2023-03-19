<template>
    <div>
        <div class="form-floating mb-3">
            <select class="form-select" id="floatingSelect" aria-label="Floating label select example" v-model="value"
                @input="updateValue($event.target.value)">
                <option v-for="d in this.dropDownValues" :key="d" :value="d">{{ d }}</option>
            </select>
            <label for="floatingSelect">{{ this.title }}</label>
        </div>
    </div>
</template>

<script>
export default {
    props: ["title", "dropDownValues", "passedValue"],
    data: function(){
        return{
            value: ""
        }
    },
    methods: {
        updateValue(value) {
            this.$emit("input", value);
        },
 
    },
    watch: {
        passedValue: function(newValue){
            this.value = newValue
        },

    }
}

</script>

<style scoped></style>


  