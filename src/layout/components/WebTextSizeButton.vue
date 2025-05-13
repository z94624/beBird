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
					@click="textSizeMultiplier = value.multiplier"
				>
					<q-icon
						:name="value.icon"
						:size="`calc(2.4rem * ${value.multiplier})`"
					/>
					<span
						:style="{
							fontSize: `${value.multiplier}rem`,
						}"
					>
						{{ $t(name) }}
					</span>
				</q-item>
			</q-list>
		</q-menu>
	</BaseButton>
</template>

<script lang="ts" setup>
	import { toRefs, useAttrs } from 'vue';
	import { QBtnProps } from 'quasar';

	import { useTextSizeStore } from '@/store/modules/style';

	const attrs: Partial<QBtnProps> = useAttrs();
	const textSizeStore = useTextSizeStore();
	const { textSizeDict, textSizeMultiplier, textSizeInfo } = toRefs(textSizeStore);
</script>

<style lang="scss" scoped></style>
