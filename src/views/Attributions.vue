<template>
	<q-page padding>
		<div class="page-content-container flex flex-col items-center gap-4">
			<!-- Quote -->
			<div class="text-center p-4">
				<blockquote>
					<p>{{ $t('attrQuote') }}</p>
				</blockquote>
			</div>

			<!-- Category Chips -->
			<div class="flex justify-center items-center gap-2 p-4">
				<ClickableChip
					v-for="category in categories"
					v-model:selected="categoryActiveDict[category]"
					:key="category"
				>
					{{ $t(category) }}
				</ClickableChip>
			</div>

			<!-- Attribution Cards -->
			<div
				class="grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4"
			>
			</div>
		</div>
	</q-page>
</template>

<script lang="ts" setup>
	import { computed, reactive, ref } from 'vue';

	import { IMap } from '@/models/common/base';

	// 定義分類
	const categories = ['mapGeo', 'apiService', 'vueEcosystem', 'designUi'];

	// 資源清單資料
	interface IAttributionItem {
		id: number;
		title: string;
		author: string;
		url: string;
		category: string;
		htmlQuote?: string;
	}
	const attributionList = ref<IAttributionItem[]>([
		{
			id: 1,
			title: 'Leaflet',
			author: 'Volunteer Developers',
			url: 'https://leafletjs.com/',
			category: 'mapGeo',
			htmlQuote:
				'<p>Leaflet is the leading open-source JavaScript library for mobile-friendly interactive maps.</p>',
		},
		{
			id: 2,
			title: 'Vue Leaflet',
			author: 'Volunteer Developers',
			url: 'https://github.com/vue-leaflet/vue-leaflet',
			category: 'mapGeo',
			htmlQuote: '<p>Vue Leaflet is a set of Vue.js components for Leaflet maps.</p>',
		},
		{
			id: 3,
			title: 'Leaflet-providers',
			author: 'Volunteer Developers',
			url: 'https://github.com/leaflet-extras/leaflet-providers',
			category: 'mapGeo',
			htmlQuote:
				'<p>Leaflet-providers is a plugin for Leaflet that provides a collection of tile providers.</p>',
		},
		{
			id: 4,
			title: 'country-region-data',
			author: 'Volunteer Developers',
			url: 'https://github.com/country-regions/country-region-data',
			category: 'mapGeo',
			htmlQuote:
				'<p>Country-Region-Data is a database of countries, regions, and cities.</p>',
		},
		{
			id: 5,
			title: 'eBird API 2.0',
			author: 'Cornell Lab of Ornithology',
			url: 'https://documenter.getpostman.com/view/664302/S1ENwy59',
			category: 'apiService',
		},
		{
			id: 6,
			title: 'Tomorrow.io',
			author: 'Tomorrow.io',
			url: 'https://www.tomorrow.io/weather-api/',
			category: 'apiService',
		},
		{
			id: 7,
			title: 'Sunrise Sunset API',
			author: 'sunrisesunset.io',
			url: 'https://sunrisesunset.io/api/',
			category: 'apiService',
		},
		{
			id: 8,
			title: 'Firebase',
			author: 'Google',
			url: 'https://firebase.google.com/',
			category: 'apiService',
		},
		{
			id: 9,
			title: 'EmailJS',
			author: 'EmailJS',
			url: 'https://www.emailjs.com/',
			category: 'apiService',
		},
		{
			id: 10,
			title: 'Vue Social Sharing',
			author: 'nicolasbeauvais',
			url: 'https://github.com/nicolasbeauvais/vue-social-sharing',
			category: 'vueEcosystem',
		},
		{
			id: 11,
			title: 'vue-country-flag',
			author: 'ubaldop',
			url: 'https://github.com/ubaldop/vue-country-flag',
			category: 'vueEcosystem',
		},
		{
			id: 12,
			title: 'VueFire',
			author: 'VueFire Team',
			url: 'https://vuefire.vuejs.org/',
			category: 'vueEcosystem',
		},
		{
			id: 13,
			title: 'Weather Animated Icons',
			author: 'Freepik - Flaticon',
			url: 'https://www.flaticon.com/free-animated-icons/rain',
			category: 'designUi',
			htmlQuote:
				'<a href="https://www.flaticon.com/free-animated-icons/rain" title="rain animated icons" target="_blank" class="text-primary text-weight-medium text-decoration-none">Rain animated icons created by Freepik - Flaticon</a>',
		},
		{
			id: 14,
			title: 'Lovart',
			author: 'Lovart',
			url: 'https://www.lovart.ai/',
			category: 'designUi',
		},
		{
			id: 15,
			title: 'Dark-Light-Mode-Switch',
			author: 'opensource-coding',
			url: 'https://github.com/opensource-coding/Dark-Light-Mode-Switch',
			category: 'designUi',
		},
	]);

	// 控制分類晶片的 Active 狀態 (預設全部為 true)
	const categoryActiveDict = reactive<IMap<boolean>>(
		categories.reduce((obj, category) => {
			obj[category] = true;
			return obj;
		}, {} as IMap<boolean>)
	);

	// 根據選擇的分類過濾資源
	const filteredAttributions = computed(() =>
		attributionList.value.filter((item) => categoryActiveDict[item.category])
	);
</script>

<style lang="scss" scoped></style>
