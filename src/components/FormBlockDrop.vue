<template>
    <div>
        <div class="form-floating mb-3">
            <select class="form-select" id="floatingSelect" aria-label="Floating label select example"
                @input="updateValue($event.target.value)">
                <option v-for="d in this.dropDownValues" :key="d" :value="d">{{ d }}</option>
            </select>
            <label for="floatingSelect">{{ this.title }}</label>
        </div>
    </div>
</template>

<script>
export default {
    props: ["title", "dropDownValues"],
    methods: {
        updateValue(value) {
            this.$emit("input", value);
        }
    }
}

</script>

<style scoped></style>


  