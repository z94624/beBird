<template>
	<q-toggle
		ref="toggleRef"
		:="attrs"
		:model-value="modelValue"
	>
		<template
			#[slot]
			v-for="(slot, sIdx) in Object.keys(slots)"
			:key="sIdx"
		>
			<slot :name="slot"></slot>
		</template>
	</q-toggle>
</template>

<script lang="ts" setup>
	import { ref, useAttrs, useSlots } from 'vue';
	import { QToggle, QToggleProps } from 'quasar';

	const props = defineProps<{
		modelValue: any;
	}>();

	const attrs: Partial<QToggleProps> = useAttrs();
	const slots: Partial<QToggle> = useSlots();

	const toggleRef = ref();

	defineExpose({ toggleRef });
</script>

<style lang="scss" scoped></style>
