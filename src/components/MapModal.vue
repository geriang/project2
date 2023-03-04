<template>
    <div class="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true" ref="propertyModal">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Listing Details</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="row">

                            <div class="col-md-4">District {{ district }}</div>


                            <div class="col-md-4">{{ address }}</div>
                        </div>
                        <div class="row">
                            <div class="col-md-3 ms-auto">.col-md-3 .ms-auto</div>
                            <div class="col-md-2 ms-auto">.col-md-2 .ms-auto</div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 ms-auto">.col-md-6 .ms-auto</div>
                        </div>
                        <div class="row">
                            <div class="col-sm-9">
                                Level 1: .col-sm-9
                                <div class="row">
                                    <div class="col-8 col-sm-6">
                                        Level 2: .col-8 .col-sm-6
                                    </div>
                                    <div class="col-4 col-sm-6">
                                        Level 2: .col-4 .col-sm-6
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Understood</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import Lmarker from 'vue2-leaflet'


export default {
    components: {  },
    props: [ "district", "address"],

    data: function () {
        return {


        }


    }

}


</script>

<style scoped></style>