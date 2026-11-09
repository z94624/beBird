<template>
	<BaseButton :="attrs">
		<country-flag :country="locale.split('-')[1]" />

		<q-menu class="!max-w-full">
			<q-list>
				<q-item
					v-for="webLang in WebLangEnum"
					v-close-popup
					:key="webLang"
					:active="webLang === locale"
					:class="[isTextSizeMd ? '!py-0 !pl-0 !pr-3' : isTextSizeLg ? 'gap-1' : 'gap-2']"
					class="items-center"
					clickable
					@click="onSelectWebsiteLanguage(webLang)"
				>
					<country-flag
						:country="webLang.split('-')[1]"
						shadow
					/>
					<div class="ellipsis text-base">
						{{ webLangCountryNameMap[webLang] }} ({{ webLangNameMap[webLang] }})
					</div>
				</q-item>
			</q-list>
		</q-menu>
	</BaseButton>
</template>

<script lang="ts" setup>
	import { toRefs, useAttrs, watch } from 'vue';
	import { QBtnProps } from 'quasar';
	import { useI18n } from 'vue-i18n';

	import { useTaxonomyStore } from '@/store/modules/taxonomy';
	import { useTextSizeStore } from '@/store/modules/style';
	import { webLangCountryNameMap, webLangNameMap } from '@/utils/options';
	import { WebLangEnum } from '@/models/enum/languageEnum';

	const { locale } = useI18n();

	const attrs: Partial<QBtnProps> = useAttrs() as any;
	const taxonomyStore = useTaxonomyStore();
	const { taxInfoDict } = toRefs(taxonomyStore);
	const textSizeStore = useTextSizeStore();
	const { isTextSizeMd, isTextSizeLg } = toRefs(textSizeStore);

	/**
	 * ?‡æ?ç¶²ç?èªžè??‚ï??ˆæ?ç©ºç‰©ç¨®è?è¨Šå???
	 */
	watch(locale, () => {
		taxInfoDict.value = {};
	});

	/**
	 * ?¸æ?ç¶²ç?èªžè?
	 */
	const onSelectWebsiteLanguage = (webLang: WebLangEnum) => {
		locale.value = webLang;
		localStorage.setItem('i18n-locale', webLang);
	};
</script>

<style lang="scss" scoped></style>
