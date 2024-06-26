<template>
	<q-list
		dense
		separator
	>
		<q-item
			v-ripple
			clickable
			@click="onCopyToClipboard"
		>
			<q-item-section avatar>
				<BaseButton
					color="secondary"
					icon="content_copy"
					round
					size="sm"
					text-color="primary"
				/>
			</q-item-section>
			<q-item-section>分享清單</q-item-section>
		</q-item>

		<ShareNetwork
			:description="description"
			:hashtags="userComName"
			:url="checklistUrl"
			network="facebook"
			title="分享紀錄清單至 Facebook"
		>
			<q-item
				v-ripple
				clickable
			>
				<q-item-section avatar>
					<q-icon
						:name="mdiFacebook"
						class="text-[#1877F2]"
						size="40px"
					/>
				</q-item-section>
				<q-item-section>動態消息</q-item-section>
			</q-item>
		</ShareNetwork>
	</q-list>
</template>

<script lang="ts" setup>
	import { computed, toRefs } from 'vue';
	import { useClipboard } from '@vueuse/core';
	import { mdiFacebook } from '@quasar/extras/mdi-v7';

	import { IDATAOBSGetRecentNotableObsInRegionItem } from '@/models/data/obs';

	import { useQuasarTool } from '@/hooks/useQuasarTool';
	import { useProductStore } from '@/store/modules/product';

	const props = defineProps<{
		notableObs?: IDATAOBSGetRecentNotableObsInRegionItem;
		userComName?: string;
	}>();

	const { copy } = useClipboard();
	const { $notify } = useQuasarTool();
	const productStore = useProductStore();
	const { checklistInfo } = toRefs(productStore);

	const obs = computed(() => props.notableObs);

	const checklistUrl = computed(() =>
		obs.value ? `https://ebird.org/checklist/${obs.value.subId}` : 'https://ebird.org/home'
	);

	// 紀錄清單詳細資訊中，稀有鳥資料
	const notableDetail = computed(() =>
		checklistInfo.value?.obs.find((o) => o.speciesCode === obs.value?.speciesCode)
	);

	const description = computed(() => {
		if (!obs.value) return;
		const { comName, howMany, obsDt, locName, lat, lng } = obs.value;
		const mapUrl = `http://maps.google.com/?ie=UTF8&t=p&z=13&q=${lat},${lng}&ll=${lat},${lng}`;
		return `
			${props.userComName} (${comName}) (${howMany})<br />
			- ${obsDt} by ${checklistInfo.value?.userDisplayName}<br />
			- ${locName}<br />
			- 地圖: <a href="${mapUrl}">${mapUrl}</a><br />
			- 紀錄清單: <a href="${checklistUrl.value}">${checklistUrl.value}</a><br />
			- 備註: ${notableDetail.value?.comments}
		`;
	});

	/**
	 * 複製紀錄清單資訊
	 */
	const onCopyToClipboard = () => {
		copy(description.value || checklistUrl.value).then(() => {
			$notify.info('成功：複製紀錄清單資訊');
		});
	};
</script>

<style lang="scss" scoped></style>
