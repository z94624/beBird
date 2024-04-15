<template>
    <div>
        <q-layout view="hHh lpR fFf">

            <q-header elevated class="bg-white text-primary_e">
                <q-toolbar>
                    <q-toolbar-title :shrink="true" class="cursor-pointer" @click="goHome">
                        <EbirdLogo width="100%" height="26" />
                    </q-toolbar-title>

                    <q-tabs align="left" inline-label class="layoutHeaderTabs">
                        <q-route-tab to="/rare-birds-map" label="稀有鳥地圖" name="rareBirds" class="rareBirdsTab" />
                        <q-route-tab to="/bird-watching-map" label="鳥人賞鳥地圖" name="birdWatching" />
                        <q-route-tab to="/bird-distribution-map" label="鳥類分布地圖" name="birdDistribution" />
                        <q-route-tab to="/bird-composition-map" label="地區組成地圖" name="birdComposition" />
                        <q-route-tab to="/routine-route-map" label="例行路線地圖" name="routineRoute" />
                    </q-tabs>
                </q-toolbar>
            </q-header>

            <q-page-container style="height: 100vh">
                <router-view />
            </q-page-container>

        </q-layout>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import EbirdLogo from '@/assets/images/components/EbirdLogo.vue';

import { PageEnum } from '@/models/enum/pageEnum';

const router = useRouter();

/**
 * 導向首頁
 */
const goHome = () => {
    router.replace(PageEnum.BASE_HOME);
}
</script>

<style lang="scss" scoped></style>