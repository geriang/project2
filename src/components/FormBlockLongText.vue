<template>
    <div>
        <div class="form-floating mb-3">
            <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea" v-model="value" @input="updateValue($event.target.value)"></textarea>
            <label for="floatingTextarea">{{ this.title }}</label>
        </div>
    </div>
</template>

<script>
export default {
    props: ["title", "passedValue"],
    methods: {
        updateValue(value) {
            this.$emit("input", value);
        }
    },
    data: function(){
        return{
            value:""
        }
    },
    watch: {
        passedValue: function(newValue){
            this.value = newValue
        }
    }

}

</script>

<style scoped></style>