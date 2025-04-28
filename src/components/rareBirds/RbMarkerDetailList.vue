<template>
	<Checklist
		:info="checklistInfo || []"
		:notableSpeciesCode="notableObs?.speciesCode"
	/>
</template>

<script lang="ts" setup>
	import { computed, onMounted, toRefs } from 'vue';

	import { IDATAOBSGetRecentNotableObsInRegionItem } from '@/models/data/obs';

	import { useProductStore } from '@/store/modules/product';
	import { useTaxonomyStore } from '@/store/modules/taxonomy';

	const props = defineProps<{
		notableObs?: IDATAOBSGetRecentNotableObsInRegionItem;
	}>();

	const productStore = useProductStore();
	const { checklistInfo } = toRefs(productStore);
	const taxonomyStore = useTaxonomyStore();
	const { taxInfoDict } = toRefs(taxonomyStore);

	/**
	 * 篩選出沒有獲取過物種資訊的物種代碼
	 */
	const speciesCodes = computed(() => {
		const oldSpeciesCodes = Object.keys(taxInfoDict.value);
		return checklistInfo.value?.obs
			.map((o) => o.speciesCode)
			.filter((code) => !oldSpeciesCodes.includes(code));
	});

	onMounted(() => {
		// 取得記錄清單詳細資訊
		if (props.notableObs) {
			productStore.getViewChecklistInfo(props.notableObs.subId).then(async () => {
				if (speciesCodes.value?.length) {
					// 取得各鳥種分類資訊
					await taxonomyStore.getEbirdTaxonomyInfo(speciesCodes.value.join(','));
				}
				// 待物種資訊字典完整後...
				checklistInfo.value!.obs = checklistInfo.value!.obs.map((o) => ({
					...o,
					tax: taxInfoDict.value[o.speciesCode],
				}));
			});
		}
	});
</script>

<style lang="scss" scoped></style>
