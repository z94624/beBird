<template>
	<q-list
		dense
		separator
	>
		<template
			v-for="(media, mIdx) in mediaList"
			:key="mIdx"
		>
			<q-item
				v-if="media.onClick"
				v-ripple
				clickable
				@click="media.onClick"
			>
				<div class="w-full flex no-wrap items-center gap-4">
					<div
						class="bg-secondary w-[33.33px] h-[33.33px] m-[3.335px] flex justify-center items-center"
						style="border-radius: 50%"
					>
						<q-icon
							:name="media.customIcon ? `img:${media.icon}` : media.icon"
							color="primary"
							size="xs"
						/>
					</div>
					<span>{{ media.name }}</span>
				</div>
			</q-item>

			<q-item
				v-else
				v-ripple
				clickable
			>
				<ShareNetwork
					:description="description"
					:hashtags="userComName"
					:network="media.network"
					:url="checklistUrl"
					class="w-full flex no-wrap items-center gap-4"
				>
					<q-icon
						:class="[media.customIcon ? 'm-[3.335px]' : '']"
						:name="media.customIcon ? `img:${media.icon}` : media.icon"
						:size="media.customIcon ? '33.33px' : '40px'"
						:style="{
							color: media.iconColor,
						}"
					/>
					<span>{{ media.name }}</span>
				</ShareNetwork>
			</q-item>
		</template>
	</q-list>
</template>

<script lang="ts" setup>
	import { computed, toRefs } from 'vue';
	import { useClipboard } from '@vueuse/core';

	import { mdiGmail, mdiFacebook } from '@quasar/extras/mdi-v7';
	import LineLogo from '@/assets/icons/lineLogo.svg';
	import MessengerLogo from '@assets/icons/messengerLogo.svg';
	import TwitterLogo from '@assets/icons/twitterLogo.svg';
	import SkypeLogo from '@assets/icons/skypeLogo.svg';

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

	/**
	 * 啟動原生分享功能
	 */
	const activateWebShareAPI = () => {
		if (navigator.share) {
			navigator.share({
				title: props.userComName,
				text: description.value,
				url: checklistUrl.value,
			});
		}
	};

	/**
	 * 分享途徑列表
	 */
	interface IMedia {
		icon: string;
		iconColor?: string;
		customIcon?: boolean;
		name: string;
		onClick?: Function;
		network?: string;
	}
	const mediaList: IMedia[] = [
		{
			icon: 'content_copy',
			name: 'Copy',
			onClick: onCopyToClipboard,
		},
		{
			icon: mdiGmail,
			iconColor: '#d44638',
			name: 'Email',
			network: 'email',
		},
		{
			icon: mdiFacebook,
			iconColor: '#1877F2',
			name: 'Facebook',
			network: 'facebook',
		},
		{
			icon: MessengerLogo,
			customIcon: true,
			name: 'Messenger',
			network: 'messenger',
		},
		{
			icon: LineLogo,
			customIcon: true,
			name: 'LINE',
			network: 'line',
		},
		{
			icon: TwitterLogo,
			customIcon: true,
			name: 'Twitter',
			network: 'twitter',
		},
		{
			icon: SkypeLogo,
			customIcon: true,
			name: 'Skype',
			network: 'skype',
		},
		{
			icon: 'more_horiz',
			name: 'More',
			onClick: activateWebShareAPI,
		},
	];
</script>

<style lang="scss" scoped></style>
