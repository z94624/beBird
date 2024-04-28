<template>
	<q-select
		:="attrs"
		:standout="standout"
		@update:model-value="(value) => emit('update:model-value', value)"
	>
		<template
			#[slot]
			v-for="(slot, sIdx) in Object.keys(slots)"
			:key="sIdx"
		>
			<slot :name="slot"></slot>
		</template>
	</q-select>
</template>

<script lang="ts" setup>
	import { useAttrs, useSlots } from 'vue';

	const emit = defineEmits<{
		(e: 'update:model-value', v: any): void;
	}>();
	const props = withDefaults(
		defineProps<{
			standout: boolean | string;
		}>(),
		{
			standout: 'bg-secondary text-primary',
		}
	);

	const attrs = useAttrs();
	const slots = useSlots();
</script>

<style lang="scss" scoped></style>
