<template>
    <div>
        <q-layout view="hHh lpR fFf">

            <q-header reveal elevated class="bg-white text-primary_e">
                <q-toolbar>
                    <div @click="goHome">
                        <q-icon :name="`img:${EbirdLogo}`" style="width: 100%; height: 26px;" />
                    </div>

                    <q-toolbar-title></q-toolbar-title>

                    <q-btn icon="menu" flat round @click="toggleLeftDrawer" />
                </q-toolbar>
            </q-header>

            <q-drawer v-model="leftDrawerOpen" side="right" behavior="mobile" :width="200" overlay bordered
                class="text-primary_e">
                <q-scroll-area class="fit">
                    <q-list class="layoutMenuList">

                        <template v-for="(menuItem, mIdx) in menuList" :key="mIdx">
                            <q-item :to="menuItem.to" :active="menuItem.name === selectedMenu" clickable
                                :class="[`${menuItem.name === 'rareBirds' ? 'rareBirdsItem' : ''}`]"
                                @click="() => onSelectMenu(menuItem.name)">
                                <q-item-section avatar>
                                    <q-icon :name="menuItem.icon" />
                                </q-item-section>
                                <q-item-section>
                                    {{ menuItem.label }}
                                </q-item-section>
                            </q-item>
                            <q-separator :key="'sep' + mIdx" v-if="menuItem.separator" />
                        </template>

                    </q-list>
                </q-scroll-area>
            </q-drawer>

            <q-page-container style="height: 100vh">
                <router-view />
            </q-page-container>

        </q-layout>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import EbirdLogo from '@/assets/images/eBird.svg';

import { PageEnum } from '@/models/enum/pageEnum';
import { menuList } from './utils';

const router = useRouter();

const leftDrawerOpen = ref(false);
const selectedMenu = ref('rareBirds');

/**
 * 開關選單
 */
const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value;
}

/**
 * 導向首頁
 */
const goHome = () => {
    router.replace(PageEnum.BASE_HOME);
}

/**
 * 選擇選單
 */
const onSelectMenu = (menuName: string) => {
    selectedMenu.value = menuName;
}
</script>

<style lang="scss" scoped></style>