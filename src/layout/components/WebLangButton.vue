<template>
	<BaseButton :="attrs">
		<country-flag :country="locale.split('-')[1]" />

		<q-menu class="!max-w-none">
			<q-list>
				<q-item
					v-for="webLang in WebLangEnum"
					v-close-popup
					:key="webLang"
					:active="webLang === locale"
					class="items-center !pl-0 !pr-3 !py-0"
					clickable
					@click="onSelectWebsiteLanguage(webLang)"
				>
					<country-flag
						:country="webLang.split('-')[1]"
						shadow
					/>
					<span>
						{{ webLangCountryNameMap[webLang] }} ({{ webLangNameMap[webLang] }})
					</span>
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
	import { webLangCountryNameMap, webLangNameMap } from '@/utils/options';
	import { WebLangEnum } from '@/models/enum/language';

	const { locale } = useI18n();

	const attrs: Partial<QBtnProps> = useAttrs();
	const taxonomyStore = useTaxonomyStore();
	const { taxInfoDict } = toRefs(taxonomyStore);

	/**
	 * 切換網站語言時，先清空物種資訊字典
	 */
	watch(locale, () => {
		taxInfoDict.value = {};
	});

	/**
	 * 選擇網站語言
	 */
	const onSelectWebsiteLanguage = (webLang: WebLangEnum) => {
		locale.value = webLang;
		localStorage.setItem('i18n-locale', webLang);
	};
</script>

<style lang="scss" scoped></style>
