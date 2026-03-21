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
		</div>
	</q-page>
</template>

<script lang="ts" setup>
	import { reactive } from 'vue';

	import { IMap } from '@/models/common/base';

	// 定義分類
	const categories = ['mapGeo', 'apiService', 'vueEcosystem', 'designUi'];

	// 控制分類晶片的 Active 狀態 (預設全部為 true)
	const categoryActiveDict = reactive<IMap<boolean>>(
		categories.reduce((obj, category) => {
			obj[category] = true;
			return obj;
		}, {} as IMap<boolean>)
	);
</script>

<style lang="scss" scoped></style>
