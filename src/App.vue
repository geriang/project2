<!-- npm run serve -->
<!-- Passing values to parent via props and emit -->
<!-- https://learnvue.co/tutorials/v-model-guide#using-vue-v-model-in-custom-components -->
<!-- https://www.youtube.com/watch?v=xtmZVV9QpaA -->
<template>
  <div>
    <h1>Hello World</h1>
    <PropertyForm/>
  </div>
</template>

<script>
import PropertyForm from "@/components/PropertyForm.vue"

export default {
  name: 'App',
  components: {
    PropertyForm
  }
}
</script>

<style></style>
