<template>
	<BaseButton
		:="attrs"
		:icon="textSizeInfo.icon"
		text-color="primary"
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
							{{ $t(name) }}
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

	import { useTextSizeStore } from '@/store/modules/style';

	const attrs: Partial<QBtnProps> = useAttrs();
	const textSizeStore = useTextSizeStore();
	const { textSizeDict, textSizeMultiplier, textSizeInfo } = toRefs(textSizeStore);

	/**
	 * 選擇網站字體大小
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
	 * 'data-text-size' attribute 必須設定在 body
	 * 否則如跳窗透過 portal 方式將無法設定
	 */
	watch(
		textSizeInfo,
		(nv) => {
			document.querySelector('body')?.setAttribute('data-text-size', nv.nickName);
		},
		{
			immediate: true,
		}
	);
</script>

<style lang="scss" scoped></style>
