<template>
    <div>

        <l-map :zoom="zoom" :center="center">
            <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                <l-marker v-for="(marker, index) in markers" :key="index" :lat-lng="marker.latlng">
                    <l-popup>{{ marker.message }}</l-popup>
                </l-marker>
        </l-map>
        <!-- <l-marker v-for="(marker, index) in markers" :key="index" :lat-lng="marker.latlng"></l-marker> -->
    </div>
    <!-- building -->
    <!-- postal code -->
    <!-- district -->
    <!-- block -->
    <!-- road name -->
</template>

<script>
// import Lmarker from 'vue2-leaflet'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';

export default {
    components: { LMap, LTileLayer, LMarker },

    data: function () {
        return {

            zoom: 11.5,
            center: [1.3521, 103.8198],
            url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
            markers: [
                {

                    latlng: [1.3644, 103.9915],
                    message: "Marker 1"
                },
                {
                    latlng: [1.3007, 103.8550],
                    message: "Marker 2"
                }
            ]

        }
    }


}


</script>

<style scoped></style>