<template>
    <div>
        <q-layout view="hHh lpR fFf">

            <q-header elevated class="bg-white text-primary_e">
                <q-toolbar>
                    <q-toolbar-title :shrink="true" class="cursor-pointer" @click="goHome">
                        <q-icon :name="`img:${EbirdLogo}`" style="width: 100%; height: 26px;" />
                    </q-toolbar-title>

                    <q-tabs align="left" inline-label class="layoutHeaderTabs">
                        <q-route-tab v-for="(menuItem, mIdx) in menuList" :key="mIdx" :to="menuItem.to"
                            :label="menuItem.label" :name="menuItem.name"
                            :class="[`${menuItem.name === 'rareBirds' ? 'rareBirdsTab' : ''}`]" />
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
import EbirdLogo from '@/assets/images/eBird.svg';

import { PageEnum } from '@/models/enum/pageEnum';
import { menuList } from './utils';

const router = useRouter();

/**
 * 導向首頁
 */
const goHome = () => {
    router.replace(PageEnum.BASE_HOME);
}
</script>

<style lang="scss" scoped></style>