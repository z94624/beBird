<template>
	<div>
		<FormLabel
			:="props"
			:required="isRequired"
		/>

		<q-field
			:="attrs"
			:model-value="modelValue"
			:rules="rules"
		>
			<template #control>
				<q-editor
					:="attrs"
					:model-value="modelValue"
          class="w-full"
				>
					<template
						#[slot]
						v-for="(slot, sIdx) in Object.keys(slots)"
						:key="sIdx"
					>
						<slot :name="slot"></slot>
					</template>
				</q-editor>
			</template>
		</q-field>
	</div>
</template>

<script lang="ts" setup>
	import { computed, useAttrs, useSlots } from 'vue';
	import { QEditor, QEditorProps, ValidationRule } from 'quasar';

	import { requiredValid } from '@/utils/validation';

	const props = defineProps<{
		modelValue: string;
		rules?: ValidationRule[];
		// FormLabel
		title?: string;
		titleColor?: string;
		tips?: string;
		tipsColor?: string;
	}>();

	const attrs: Partial<QEditorProps> = useAttrs();
	const slots: Partial<QEditor> = useSlots();

	/**
	 * 是否為必填
	 */
	const isRequired = computed(() => (props.rules || []).indexOf(requiredValid) > -1);
</script>

<style lang="scss" scoped></style>
