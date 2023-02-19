<template>
<div>
 <h1>This is a form</h1>

 <div class="container-fluid m-1 p-1" >
<FormBlockDrop :title="formBlockTitle4" v-model="listingTypeValue" :dropDownValues= "formBlockArray4"/>
<FormBlockText :title="formBlockTitle" v-model="listingValue"/>
<FormBlockText :title="formBlockTitle2" v-model="addressValue"/>
<FormBlockText :title="formBlockTitle3" v-model="postalCodeValue"/>
<FormBlockDrop :title="formBlockTitle5" v-model="propertyTypeValue" :dropDownValues= "formBlockArray5"/>
<FormBlockLongText :title="formBlockTitle6" v-model="descriptionValue"/>
</div>
</div>
</template>

<script>
import FormBlockText from "@/components/FormBlockText.vue"
import FormBlockDrop from "@/components/FormBlockDrop.vue"
import FormBlockLongText from "@/components/FormBlockLongText.vue"


export default {
    name: "PropertyForm",
    components: {FormBlockText, FormBlockDrop, FormBlockLongText},
    data: function(){
        return{
            formBlockTitle: "Listing Details",
            formBlockTitle2: "Address",
            formBlockTitle3: "Postal Code",
            formBlockTitle4: "Listing Type",
            formBlockTitle5: "Property Type",
            formBlockTitle6: "Description",
            listingValue:"",
            addressValue:"",
            postalCodeValue:"",
            listingTypeValue:"",
            propertyTypeValue:"",
            descriptionValue:"",
            formBlockArray4: ["For Sale","For Rent","Room Rental"],
            formBlockArray5: ["Commercial","Residential","Industrial"]

        }
    }
}

</script>

<style scoped>

</style>