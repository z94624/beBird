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
	import { usePreferredLanguageStore } from '@/store/modules/language';
	import { LocaleEnum } from '@/models/enum/ebirdEnum';

	const props = defineProps<{
		notableObs?: IDATAOBSGetRecentNotableObsInRegionItem;
	}>();

	const productStore = useProductStore();
	const { checklistInfo } = toRefs(productStore);
	const taxonomyStore = useTaxonomyStore();
	const preferredLanguageStore = usePreferredLanguageStore();
	const { userLangCode } = toRefs(preferredLanguageStore);

	const speciesCodes = computed(() => checklistInfo.value?.obs.map((o) => o.speciesCode));

	onMounted(() => {
		// 取得記錄清單詳細資訊
		if (props.notableObs) {
			productStore.getViewChecklistInfo(props.notableObs.subId).then(() => {
				if (speciesCodes.value) {
					// 取得各鳥種分類資訊
					taxonomyStore
						.getEbirdTaxonomyInfo(
							userLangCode.value as LocaleEnum,
							speciesCodes.value.join(',')
						)
						.then((data) => {
							checklistInfo.value!.obs = checklistInfo.value!.obs.map((o) => ({
								...o,
								tax: data.find((s) => s.speciesCode === o.speciesCode),
							}));
						});
				}
			});
		}
	});
</script>

<style lang="scss" scoped></style>
