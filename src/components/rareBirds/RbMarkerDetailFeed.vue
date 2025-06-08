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
						class="bg-secondary w-[2.083125rem] h-[2.083125rem] m-[0.2084375rem] flex justify-center items-center"
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
					:description="descTEXT"
					:hashtags="userComName"
					:network="media.network"
					:title="`${userComName} [${obs?.sciName ?? '{sciName}'}]`"
					:url="checklistUrl"
					class="w-full flex no-wrap items-center gap-4"
				>
					<q-icon
						:class="[media.customIcon ? 'm-[0.2084375rem]' : '']"
						:name="media.customIcon ? `img:${media.icon}` : media.icon"
						:size="media.customIcon ? '2.083125rem' : '2.5rem'"
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
	import { useI18n } from 'vue-i18n';
	import { useClipboard } from '@vueuse/core';

	import { mdiGmail, mdiFacebook } from '@quasar/extras/mdi-v7';
	import LineLogo from '@/assets/icons/lineLogo.svg';
	import MessengerLogo from '@assets/icons/messengerLogo.svg';
	import TwitterLogo from '@assets/icons/twitterLogo.svg';
	import TelegramLogo from '@/assets/icons/telegramLogo.svg';
	import SkypeLogo from '@assets/icons/skypeLogo.svg';

	import { IDATAOBSGetRecentNotableObsInRegionItem } from '@/models/data/obs';

	import { useQuasarTool } from '@/hooks/useQuasarTool';
	import { useProductStore } from '@/store/modules/product';
	import { extractTextFromHtml } from '@/utils/convert';
	import { getGoogleMapsPlaceURL } from '@/utils/ebird';
	import { WebLangEnum } from '@/models/enum/languageEnum';

	const props = defineProps<{
		notableObs?: IDATAOBSGetRecentNotableObsInRegionItem;
		userComName?: string;
	}>();

	const { t, locale } = useI18n();
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

	const descHTML = computed(() => {
		if (!obs.value) return '';
		const { comName, howMany, obsDt, locName, lat, lng } = obs.value;
		const mapUrl = getGoogleMapsPlaceURL(lat, lng);
		return `${locale.value === WebLangEnum.AMERICA ? comName : `${props.userComName} (${comName})`} (${howMany})<br />
- ${obsDt} by ${checklistInfo.value?.userDisplayName}<br />
- ${locName}<br />
- ${t('info_map')}${t('colon')}<a href="${mapUrl}">${mapUrl}</a><br />
- ${t('info_checklist')}${t('colon')}<a href="${checklistUrl.value}">${checklistUrl.value}</a><br />
- ${t('info_note')}${t('colon')}${notableDetail.value?.comments}<br />
(${t('info_source')}${t('colon')}<a href="https://z94624.github.io/beBird/">https://z94624.github.io/beBird</a>)`;
	});
	const descTEXT = computed(() => extractTextFromHtml(descHTML.value));

	/**
	 * 複製紀錄清單資訊
	 */
	const onCopyToClipboard = () => {
		copy(descTEXT.value || checklistUrl.value).then(() => {
			$notify.info(t('info_listInfoCopied'));
		});
	};

	/**
	 * 啟動原生分享功能
	 */
	const activateWebShareAPI = () => {
		if (navigator.share) {
			navigator.share({
				title: props.userComName,
				text: descTEXT.value,
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
		onClick?: any;
		network?: string;
	}
	const mediaList: IMedia[] = [
		{
			icon: 'content_copy',
			name: t('copyToClipboard'),
			onClick: onCopyToClipboard,
		},
		{
			icon: mdiGmail,
			iconColor: '#d44638',
			name: t('email'),
			network: 'email',
		},
		{
			icon: mdiFacebook,
			iconColor: '#1877F2',
			name: t('facebook'),
			network: 'facebook',
		},
		{
			icon: MessengerLogo,
			customIcon: true,
			name: t('messenger'),
			network: 'messenger',
		},
		{
			icon: LineLogo,
			customIcon: true,
			name: t('line'),
			network: 'line',
		},
		{
			icon: TwitterLogo,
			customIcon: true,
			name: t('twitter'),
			network: 'twitter',
		},
		{
			icon: TelegramLogo,
			customIcon: true,
			name: t('telegram'),
			network: 'telegram',
		},
		{
			icon: SkypeLogo,
			customIcon: true,
			name: t('skype'),
			network: 'skype',
		},
		{
			icon: 'more_horiz',
			name: t('shareToApps'),
			onClick: activateWebShareAPI,
		},
	];
</script>

<style lang="scss" scoped></style>
