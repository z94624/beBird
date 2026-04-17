<template>
	<q-icon
		:="attrs"
		:size="iconSize"
		class="baseIcon"
	>
		<template
			#[slot]
			v-for="(slot, sIdx) in Object.keys(slots)"
			:key="sIdx"
		>
			<slot :name="slot"></slot>
		</template>
	</q-icon>
</template>

<script lang="ts" setup>
	import { computed, toRefs, useAttrs, useSlots } from 'vue';
	import { QIcon, QIconProps } from 'quasar';

	import { useTextSizeStore } from '@/store/modules/style';

	const props = defineProps<{
		size?: string;
	}>();

	const attrs: Partial<QIconProps> = useAttrs();
	const slots: Partial<QIcon> = useSlots();
	const textSizeStore = useTextSizeStore();
	const { textSizeMultiplier } = toRefs(textSizeStore);

	const iconSize = computed(() => {
		switch (props.size) {
			case 'xs':
				return `${1.125 * textSizeMultiplier.value}rem`;
			case 'sm':
				return `${1.5 * textSizeMultiplier.value}rem`;
			case 'md':
				return `${2 * textSizeMultiplier.value}rem`;
			case 'lg':
				return `${2.375 * textSizeMultiplier.value}rem`;
			case 'xl':
				return `${2.875 * textSizeMultiplier.value}rem`;
			default:
				return props.size
					? textSizeStore.dynamicSize(props.size).value
					: `${2 * textSizeMultiplier.value}rem`;
		}
	});
</script>

<style lang="scss" scoped></style>
