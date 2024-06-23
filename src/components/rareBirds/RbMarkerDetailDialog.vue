<template>
	<BaseDialog
		v-model="isOpen"
		@close="close"
	>
		<template #title>
			<div class="flex no-wrap gap-1">
				<div class="text-3xl">{{ userComName }}</div>
				<div class="flex flex-col">
					<div class="text-xs italic">{{ obs?.sciName ?? '' }}</div>
					<div class="text-xs">{{ obs?.comName ?? '' }}</div>
				</div>
			</div>
		</template>

		<template #content>
			<BaseTabs
				v-model="tab"
				align="justify"
				dense
			>
				<q-tab
					icon="list_alt"
					name="list"
				/>
				<q-tab
					icon="share"
					name="share"
				/>
			</BaseTabs>

			<q-tab-panels
				v-model="tab"
				animated
				keep-alive
			>
				<q-tab-panel name="list">
					<RbMarkerDetailList :notableObs="obs" />
				</q-tab-panel>
				<q-tab-panel name="share"></q-tab-panel>
			</q-tab-panels>
		</template>
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
	const tab = ref('list');

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

<style lang="scss" scoped></style>
