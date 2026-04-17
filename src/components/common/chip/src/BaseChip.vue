<template>
	<q-chip
		:="attrs"
		:size="chipSize"
		class="baseChip"
	>
		<template
			#[slot]
			v-for="(slot, sIdx) in Object.keys(slots)"
			:key="sIdx"
		>
			<slot :name="slot"></slot>
		</template>
	</q-chip>
</template>

<script lang="ts" setup>
	import { computed, toRefs, useAttrs, useSlots } from 'vue';
	import { QChip, QChipProps } from 'quasar';

	import { useTextSizeStore } from '@/store/modules/style';

	const props = defineProps<{
		size?: string;
	}>();

	const attrs: Partial<QChipProps> = useAttrs();
	const slots: Partial<QChip> = useSlots();
	const textSizeStore = useTextSizeStore();
	const { textSizeMultiplier } = toRefs(textSizeStore);

	const chipSize = computed(() => {
		switch (props.size) {
			case 'xs':
				return `${0.5 * textSizeMultiplier.value}rem`;
			case 'sm':
				return `${0.625 * textSizeMultiplier.value}rem`;
			case 'md':
				return `${0.875 * textSizeMultiplier.value}rem`;
			case 'lg':
				return `${1.25 * textSizeMultiplier.value}rem`;
			case 'xl':
				return `${1.5 * textSizeMultiplier.value}rem`;
			default:
				return props.size
					? textSizeStore.dynamicSize(props.size).value
					: `${0.875 * textSizeMultiplier.value}rem`;
		}
	});
</script>

<style lang="scss" scoped></style>
