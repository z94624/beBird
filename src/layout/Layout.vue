<template>
    <div>
        <q-layout view="hHh lpR fFf">

            <q-header elevated class="bg-white text-primary_e">
                <q-toolbar>
                    <q-toolbar-title :shrink="true">
                        <EbirdLogo width="auto" height="26" />
                    </q-toolbar-title>

                    <q-tabs align="left">
                        <q-route-tab to="/rare-birds-map" label="稀有鳥地圖" />
                        <q-route-tab to="/bird-watching-map" label="賞鳥時空地圖" />
                        <q-route-tab to="/bird-distribution-map" label="分布時空地圖" />
                        <q-route-tab to="/bird-composition-map" label="組成時空地圖" />
                        <q-route-tab to="/routine-route-map" label="例行路線地圖" />
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
import EbirdLogo from '@/assets/images/components/EbirdLogo.vue';
</script>

<style lang="scss" scoped></style>