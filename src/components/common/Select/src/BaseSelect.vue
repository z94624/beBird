<template>
	<q-select
		ref="selectRef"
		:="attrs"
		:modelValue="modelValue"
		:standout="standout"
		emit-value
		map-options
		@update:model-value="(value) => emit('update:model-value', value)"
	>
		<template
			#[slot]="scope"
			v-for="(slot, sIdx) in Object.keys(slots)"
			:key="sIdx"
		>
			<slot
				:="scope"
				:name="slot"
			></slot>
		</template>
	</q-select>
</template>

<script lang="ts" setup>
	import { QSelect, QSelectProps } from 'quasar';
	import { ref, useAttrs, useSlots } from 'vue';

	const emit = defineEmits<{
		(e: 'update:model-value', v: any): void;
	}>();
	const props = withDefaults(
		defineProps<{
			modelValue: any;
			standout?: boolean | string;
		}>(),
		{
			standout: 'bg-secondary text-primary',
		}
	);

	const attrs: Partial<QSelectProps> = useAttrs();
	const slots: Partial<QSelect> = useSlots();

	const selectRef = ref();

	defineExpose({ selectRef });
</script>

<style lang="scss" scoped></style>
