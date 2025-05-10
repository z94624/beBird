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
				style="position: sticky; top: 3.125rem; z-index: 1"
			>
				<q-tab
					icon="list_alt"
					name="list"
				/>
				<q-tab
					icon="rss_feed"
					name="feed"
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
				<q-tab-panel name="feed">
					<RbMarkerDetailFeed
						:notableObs="obs"
						:userComName="userComName"
					/>
				</q-tab-panel>
			</q-tab-panels>
		</template>
	</BaseDialog>
</template>

<script lang="ts" setup>
	import { computed, ref, toRefs } from 'vue';

	import { IDATAOBSGetRecentNotableObsInRegionItem } from '@/models/data/obs';

	import { useDialog } from '@/hooks/dialog';
	import { useTaxonomyStore } from '@/store/modules/taxonomy';

	const { isOpen, open, onOpen, close, onClose } = useDialog();
	const taxonomyStore = useTaxonomyStore();
	const { taxInfoDict } = toRefs(taxonomyStore);

	const obs = ref<IDATAOBSGetRecentNotableObsInRegionItem>();
	const tab = ref('list');

	// 當地俗名
	const userComName = computed(() => {
		if (!obs.value || !taxInfoDict.value) return;
		return taxInfoDict.value[obs.value.speciesCode]?.comName ?? obs.value.comName;
	});

	onOpen((o: IDATAOBSGetRecentNotableObsInRegionItem) => {
		obs.value = o;
	});

	onClose(() => {
		obs.value = undefined;
		tab.value = 'list';
	});

	defineExpose({ open, close });
</script>

<style lang="scss" scoped></style>
