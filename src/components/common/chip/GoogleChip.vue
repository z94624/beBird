<template>
	<BaseChip
		:="attrs"
		class="googleChip"
	>
		<template
			#[slot]
			v-for="(slot, sIdx) in Object.keys(slots)"
			:key="sIdx"
		>
			<slot :name="slot"></slot>
		</template>
	</BaseChip>
</template>

<script lang="ts" setup>
	import { useAttrs, useSlots } from 'vue';
	import { QChip, QChipProps } from 'quasar';

	const attrs: Partial<QChipProps> = useAttrs();
	const slots: Partial<QChip> = useSlots();
</script>

<style lang="scss" scoped>
	.googleChip {
		@extend %g-map-hintBtn;
	}
</style>
