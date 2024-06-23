<template>
	<Checklist
		:info="checklistInfo || []"
		:notableSpeciesCode="notableObs?.speciesCode"
	/>
</template>

<script lang="ts" setup>
	import { onMounted, toRefs } from 'vue';

	import { IDATAOBSGetRecentNotableObsInRegionItem } from '@/models/data/obs';

	import { useProductStore } from '@/store/modules/product';

	const props = defineProps<{
		notableObs?: IDATAOBSGetRecentNotableObsInRegionItem;
	}>();

	const productStore = useProductStore();
	const { checklistInfo } = toRefs(productStore);

	onMounted(() => {
		// 取得記錄清單詳細資訊
		if (props.notableObs) {
			productStore.getViewChecklistInfo(props.notableObs.subId);
		}
	});
</script>

<style lang="scss" scoped></style>
