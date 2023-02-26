<template>
    <div>
        <div id="map">
            <l-map :zoom="zoom" :center="center">
                <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
            </l-map>
        </div>


    </div>
</template>

<script>
import { LMap, LTileLayer } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";
// import "dist/leaflet.markercluster-src.js"

export default {
    components: { LMap, LTileLayer },

    data: function () {
        return {
            zoom: 11.5,
            center: [1.3521, 103.8198],
            url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
        }
    }


}

</script>


<style scoped>

#map {
    height: 100vh;
}

</style>