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
					v-for="category in categoryList"
					v-model:selected="categoryActiveDict[category.name]"
					:key="category"
					:color="$q.dark.isActive ? category.colorDark : category.colorLight"
					:icon="category.icon"
				>
					{{ $t(category.name) }}
				</ClickableChip>
			</div>

			<div class="flex-1 overflow-y-auto w-full p-4">
				<div class="grid grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					<template
						v-for="item in filteredAttributions"
						:key="item.id"
					>
						<IntersectedCard @click="openUrl(item.url)">
							<q-card-section class="flex justify-between items-start no-wrap gap-2">
								<div class="min-w-0">
									<div
										:class="`text-${$q.dark.isActive ? categoryMap[item.category].colorDark : categoryMap[item.category].colorLight}`"
										class="text-h6 ellipsis"
									>
										{{ item.title }}
									</div>
									<div
										:class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-8'"
										class="text-sm"
									>
										{{ item.author }}
									</div>
								</div>

								<BaseIcon
									:color="
										$q.dark.isActive
											? categoryMap[item.category].colorDark
											: categoryMap[item.category].colorLight
									"
									:name="categoryMap[item.category].icon"
									class="shrink-0"
									size="sm"
								/>
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
	interface ICategoryItem {
		name: string;
		icon: string;
		colorLight: string;
		colorDark: string;
	}
	const categoryList: ICategoryItem[] = [
		{
			name: 'mapGeo',
			icon: 'o_map',
			colorLight: 'green-8',
			colorDark: 'green-4',
		},
		{
			name: 'apiService',
			icon: 'o_api',
			colorLight: 'cyan-8',
			colorDark: 'cyan-4',
		},
		{
			name: 'designUi',
			icon: 'o_design_services',
			colorLight: 'orange-8',
			colorDark: 'orange-4',
		},
	];
	// 將 Array 轉為 Map 結構，讓渲染卡片時能以 O(1) 速度取得對應的分類屬性 (Icon/Color)
	const categoryMap = computed(() =>
		categoryList.reduce((obj, category) => {
			obj[category.name] = category;
			return obj;
		}, {} as IMap<ICategoryItem>)
	);

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
		categoryList.reduce((obj, category) => {
			obj[category.name] = true;
			return obj;
		}, {} as IMap<boolean>)
	);

	// 根據選擇的分類過濾資源
	const filteredAttributions = computed(() =>
		attributionList.value.filter((item) => categoryActiveDict[item.category])
	);
</script>

<style lang="scss" scoped></style>
