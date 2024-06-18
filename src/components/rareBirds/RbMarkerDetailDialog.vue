<template>
	<BaseDialog
		v-model="isOpen"
		@close="close"
	>
		<template #title>
			<div class="flex no-wrap gap-1">
				<div class="userComName text-4xl text-primary_e">{{ userComName }}</div>
				<div class="flex flex-col">
					<div class="sciName text-sm text-secondary_e">{{ obs?.sciName ?? '' }}</div>
					<div class="comName text-sm text-secondary_e">{{ obs?.comName ?? '' }}</div>
				</div>
			</div>
		</template>

		<template #content></template>
	</BaseDialog>
</template>

<script lang="ts" setup>
	import { computed, ref } from 'vue';

	import { IDATAOBSGetRecentNotableObsInRegionItem } from '@/models/data/obs';
	import { IREFTAXGetEbirdTaxonomyRes } from '@/models/ref/taxonomy';

	import { useDialog } from '@/hooks/dialog';
	import { IMap } from '@/models/common/base';

	const { isOpen, open, onOpen, close, onClose } = useDialog();

	const obs = ref<IDATAOBSGetRecentNotableObsInRegionItem>();
	const userComNameDict = ref<IMap<IREFTAXGetEbirdTaxonomyRes>>();

	// 當地俗名
	const userComName = computed(() => {
		if (!obs.value || !userComNameDict.value) return;
		return userComNameDict.value[obs.value.speciesCode].comName;
	});

	onOpen((o: IDATAOBSGetRecentNotableObsInRegionItem, ucnd: IMap<IREFTAXGetEbirdTaxonomyRes>) => {
		obs.value = o;
		userComNameDict.value = ucnd;
	});

	onClose(() => {});

	defineExpose({ open, close });
</script>

<style lang="scss" scoped>
	.userComName {
		font-weight: 700;
	}
	.sciName {
		font-style: italic;
	}
</style>
