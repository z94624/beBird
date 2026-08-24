<template>
	<q-icon
		:="attrs"
		:name="name"
		class="googleMarkerIcon"
		color="white"
		size="16px"
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
	import { computed, useAttrs, useSlots } from 'vue';
	import { QIcon, QIconProps, colors } from 'quasar';

	import { isHexColor } from '@/utils/common';

	const props = withDefaults(
		defineProps<{
			name?: string;
			bgColor?: string;
		}>(),
		{
			name: 'location_on',
			bgColor: 'primary',
		}
	);

	const attrs: Partial<QIconProps> = useAttrs();
	const slots: Partial<QIcon> = useSlots();

	const { getPaletteColor } = colors;

	const backgroundColor = computed(() =>
		isHexColor(props.bgColor) ? props.bgColor : getPaletteColor(props.bgColor)
	);
</script>

<style lang="scss" scoped>
	.googleMarkerIcon {
		background-color: v-bind(backgroundColor);
		padding: 3.6px;
		border-radius: 50%;
		border: 3px solid #ffffff;
		box-shadow: 0 3.5px 5px rgba(0, 0, 0, 0.3);
	}
</style>
