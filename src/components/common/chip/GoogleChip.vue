<template>
	<BaseChip
		:="attrs"
		:color="bg_name_mode"
		:text-color="text_name_mode"
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
	import { toRefs, useAttrs, useSlots } from 'vue';
	import { QChip, QChipProps } from 'quasar';

	import { useModeStore } from '@/store/modules/style';

	const attrs: Partial<QChipProps> = useAttrs();
	const slots: Partial<QChip> = useSlots();

	// 主題模式 Store (控制深淺色)
	const modeStore = useModeStore();
	const { bg_name_mode, text_name_mode } = toRefs(modeStore);
</script>

<style lang="scss" scoped>
	.googleChip {
		@extend %g-map-hintBtn;
	}
</style>
