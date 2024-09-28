<template>
	<div>
		<FormLabel
			:="props"
			:required="isRequired"
		/>

		<q-input
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
		</q-input>
	</div>
</template>

<script lang="ts" setup>
	import { computed, useAttrs, useSlots } from 'vue';
	import { QInput, QInputProps, ValidationRule } from 'quasar';

	import { requiredValid } from '@/utils/validation';

	const props = defineProps<{
		modelValue: string | number | null | undefined;
		// FormLabel
		title?: string;
		titleColor?: string;
		tips?: string;
		tipsColor?: string;
		rules?: ValidationRule[];
	}>();

	const attrs: Partial<QInputProps> = useAttrs();
	const slots: Partial<QInput> = useSlots();

	/**
	 * 是否為必填
	 */
	const isRequired = computed(() => (props.rules || []).indexOf(requiredValid) > -1);
</script>

<style lang="scss" scoped></style>
