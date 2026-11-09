<template>
	<BaseButton
		:="attrs"
		:icon="textSizeInfo.icon"
		:text-color="text_name_mode"
	>
		<q-menu class="!max-w-none">
			<q-list>
				<q-item
					v-for="[name, value] in Object.entries(textSizeDict)"
					v-close-popup
					:key="name"
					:active="value.multiplier === textSizeMultiplier"
					class="items-center"
					clickable
					@click="onSelectWebsiteTextSize(value)"
				>
					<q-item-section avatar>
						<q-icon
							:name="value.icon"
							:size="`calc(2.4rem * ${value.multiplier})`"
						/>
					</q-item-section>

					<q-item-section>
						<span
							:style="{
								fontSize: `${value.multiplier}rem`,
							}"
						>
							{{ $t(`common.textSize.${name}`) }}
						</span>
					</q-item-section>
				</q-item>
			</q-list>
		</q-menu>
	</BaseButton>
</template>

<script lang="ts" setup>
	import { toRefs, useAttrs, watch } from 'vue';
	import { QBtnProps } from 'quasar';

	import { useModeStore, useTextSizeStore } from '@/store/modules/style';

	const attrs: Partial<QBtnProps> = useAttrs() as any;
	const textSizeStore = useTextSizeStore();
	const { textSizeDict, textSizeMultiplier, textSizeInfo } = toRefs(textSizeStore);
	const modeStore = useModeStore();
	const { text_name_mode } = toRefs(modeStore);

	/**
	 * ?¸æ?ç¶²ç?å­—é?å¤§å?
	 */
	const onSelectWebsiteTextSize = (dictVal: {
		nick: string;
		multiplier: number;
		icon: string;
	}) => {
		const { multiplier } = dictVal;
		textSizeMultiplier.value = multiplier;
		localStorage.setItem('textSizeMultiplier', multiplier.toString());
	};

	/**
	 * 'data-text-size' attribute å¿…é?è¨­å???body
	 * ?¦å?å¦‚è·³çª—é€é? portal ?¹å?å°‡ç„¡æ³•è¨­å®?
	 */
	watch(
		textSizeInfo,
		(nv) => {
			document.body.setAttribute('data-text-size', nv.nickName);
		},
		{
			immediate: true,
		}
	);
</script>

<style lang="scss" scoped></style>
