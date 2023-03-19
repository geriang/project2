<template>
    <div>
        <div class="form-floating mb-3">
            <input type="text" class="form-control" id="floatingInput" placeholder="demo" @input="updateValue($event.target.value)">
            <label for="floatingInput">{{this.title}}</label>
        </div>
    </div>
</template>

<script>


export default{
    props: ["title"],
    methods: {
        updateValue(value){
            this.$emit("input", value);
        }
    },
    data: function(){
        return{
           
        }
    }
}

</script>

<style scoped></style>