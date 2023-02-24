<template>
    <div>
        <div class="form-floating mb-3">
            <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea" @input="updateValue($event.target.value)"></textarea>
            <label for="floatingTextarea">{{ this.title }}</label>
        </div>
    </div>
</template>

<script>
export default {
    props: ["title"],
    methods: {
        updateValue(value) {
            this.$emit("input", value);
        }
    }

}

</script>

<style scoped></style>