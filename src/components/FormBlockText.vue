<template>
    <div>
        <div class="form-floating mb-3">
            <input type="text" class="form-control" id="floatingInput" placeholder="demo" v-model="value" @input="updateValue($event.target.value)">
            <label for="floatingInput">{{this.title}}</label>
        </div>
    </div>
</template>

<script>


export default{
    props: ["title", "passedValue"],
    methods: {
        updateValue(value){
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