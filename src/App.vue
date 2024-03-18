<template>
    <div></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { getRecentObsInRegionApi } from './api/data/obs';
import { DATAOBSGetRecentObsInRegionReq } from './models/data/obs';

onMounted(() => {
    getRecentObsInRegionApi('TW', new DATAOBSGetRecentObsInRegionReq())
        .then((res) => {
            console.log(res);
        });
});
</script>

<style scoped lang="scss"></style>
