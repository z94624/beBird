<template>
    <div class="w-full h-full relative">
        <l-map ref="map" :zoom="zoom" :center="[23.97565, 120.9738819]" :use-global-leaflet="false">
            <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base"
                name="OpenStreetMap"></l-tile-layer>
        </l-map>

        <div class="searchMenuContainer">
            <q-select v-model="model" :options="[
            'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
        ]" label="Standard" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";
import { ref } from "vue";

const zoom = ref(8);
const model = ref(null);
</script>

<style lang="scss" scoped>
.searchMenuContainer {
    position: absolute;
    top: 10px;
    left: 53.2px;
    z-index: 400;
    padding: 12px;
    background-color: $primary;

    .q-select {
        background-color: white;
    }
}
</style>