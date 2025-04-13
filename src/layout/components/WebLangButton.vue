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
					@click="locale = webLang"
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
	import { useAttrs } from 'vue';
	import { QBtnProps } from 'quasar';
	import { useI18n } from 'vue-i18n';

	import { webLangCountryNameMap, webLangNameMap } from '@/utils/options';
	import { WebLangEnum } from '@/models/enum/language';

	const { locale } = useI18n();

	const attrs: Partial<QBtnProps> = useAttrs();
</script>

<style lang="scss" scoped></style>
