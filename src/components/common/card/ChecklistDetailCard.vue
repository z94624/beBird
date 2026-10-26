<template>
	<q-card
		class="checklistDetailCard pl-2"
		flat
	>
		<q-chat-message
			:bg-color="isDarkMode ? 'grey-9' : 'grey-2'"
			:name="messageName"
			:stamp="info?.obsDt"
			:text-color="text_name_mode"
			size="11"
		>
			<template #default>
				<!-- 清單按鈕 -->
				<HrefButton
					v-if="checklistUrl"
					:href="checklistUrl"
					:label="$t('ebird.info.checklist')"
					:size="isTextSizeMd ? 'sm' : isTextSizeLg ? 'md' : 'lg'"
					color="secondary"
					dense
					icon="list_alt"
				/>

				<!-- 清單註解 -->
				<p>{{ messageText }}</p>
			</template>
		</q-chat-message>
	</q-card>
</template>

<script lang="ts" setup>
	import { computed, toRefs } from 'vue';
	import { useI18n } from 'vue-i18n';

	import { IPRODUCTGetViewChecklistRes } from '@/models/product/product';

	import { useModeStore, useTextSizeStore } from '@/store/modules/style';
	import { getChecklistURL } from '@/utils/ebird';

	const props = defineProps<{
		info?: IPRODUCTGetViewChecklistRes;
		notableLocName?: string;
	}>();

	const { t } = useI18n();
	const textSizeStore = useTextSizeStore();
	const { isTextSizeMd, isTextSizeLg } = toRefs(textSizeStore);
	const modeStore = useModeStore();
	const { isDarkMode, text_name_mode } = toRefs(modeStore);

	// 清單連結
	const checklistUrl = computed(() => props.info?.subId && getChecklistURL(props.info.subId));

	// 清單觀察者(含地點)
	const messageName = computed(() => {
		const user = props.info?.userDisplayName || t('ebird.info.observer');
		return props.notableLocName
			? `${user} ${t('ebird.info.at')} ${props.notableLocName}`
			: user;
	});

	// 清單註解
	const messageText = computed(() => {
		const comments = props.info?.comments?.trim();
		return comments || t('ebird.info.noComments');
	});
</script>

<style lang="scss" scoped></style>
