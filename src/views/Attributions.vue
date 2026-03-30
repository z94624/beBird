<template>
	<q-page
		class="flex flex-col h-full overflow-hidden"
		padding
	>
		<div class="page-content-container flex flex-col flex-1 w-full max-h-full">
			<div class="text-center p-4 shrink-0">
				<blockquote>
					<p>{{ $t('attrQuote') }}</p>
				</blockquote>
			</div>

			<div class="flex justify-center items-center gap-2 p-4 shrink-0">
				<ClickableChip
					v-for="category in categories"
					v-model:selected="categoryActiveDict[category]"
					:key="category"
				>
					{{ $t(category) }}
				</ClickableChip>
			</div>

			<div class="flex-1 overflow-y-auto w-full p-4">
				<div
					class="grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
				>
					<template
						v-for="item in filteredAttributions"
						:key="item.id"
					>
						<IntersectedCard @click="openUrl(item.url)">
							<q-card-section>
								<h6>{{ item.title }}</h6>
								<div class="text-sm text-grey-8">{{ item.author }}</div>
							</q-card-section>

							<q-separator inset />

							<q-card-section>
								{{ $t(item.quoteKey) }}
							</q-card-section>
						</IntersectedCard>
					</template>
				</div>
			</div>
		</div>
	</q-page>
</template>

<script lang="ts" setup>
	import { computed, reactive, ref } from 'vue';

	import { openUrl } from '@/utils/common';
	import { IMap } from '@/models/common/base';

	// 定義分類
	const categories = ['mapGeo', 'apiService', 'designUi'];

	// 資源清單資料
	interface IAttributionItem {
		id: number;
		title: string;
		author: string;
		url: string;
		category: string;
		quoteKey: string;
	}

	const attributionList = ref<IAttributionItem[]>([
		// 🗺️ Map & Geo
		{
			id: 1,
			title: 'Leaflet',
			author: 'Volodymyr Agafonkin & Contributors',
			url: 'https://leafletjs.com/',
			category: 'mapGeo',
			quoteKey: 'leafletQuote',
		},

		// ☁️ API & Service
		{
			id: 2,
			title: 'eBird API 2.0',
			author: 'Cornell Lab of Ornithology',
			url: 'https://ebird.org/home',
			category: 'apiService',
			quoteKey: 'ebirdQuote',
		},
		{
			id: 3,
			title: 'Tomorrow.io Weather API',
			author: 'Tomorrow.io',
			url: 'https://www.tomorrow.io/',
			category: 'apiService',
			quoteKey: 'tomorrowQuote',
		},
		{
			id: 4,
			title: 'Sunset and Sunrise Times API',
			author: 'SunriseSunset.io',
			url: 'https://sunrisesunset.io/',
			category: 'apiService',
			quoteKey: 'sunriseQuote',
		},

		// 🎨 Design & UI
		{
			id: 5,
			title: 'Weather Animated Icons',
			author: 'Freepik - Flaticon',
			url: 'https://www.flaticon.com/animated-icons',
			category: 'designUi',
			quoteKey: 'flaticonQuote',
		},
		{
			id: 6,
			title: 'Lovart',
			author: 'Lovart',
			url: 'https://www.lovart.ai/',
			category: 'designUi',
			quoteKey: 'lovartQuote',
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
