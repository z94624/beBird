<template>
	<q-dialog :="getBindingValues">
		<q-card class="w-[75%]">
			<slot name="header">
				<q-toolbar class="text-primary bg-secondary">
					<q-toolbar-title>
						<slot name="title"></slot>
					</q-toolbar-title>

					<BaseButton
						flat
						icon="close"
						padding
						round
						@click="emit('close')"
					/>
				</q-toolbar>
			</slot>

			<slot name="body">
				<q-card-section></q-card-section>
			</slot>

			<slot name="actions">
				<q-card-actions></q-card-actions>
			</slot>
		</q-card>
	</q-dialog>
</template>

<script lang="ts" setup>
	import { computed, useAttrs, useSlots } from 'vue';
	import { QDialog, QDialogProps } from 'quasar';

	const emit = defineEmits<{
		(e: 'close'): void;
	}>();

	const props = defineProps<{
		fullscreen?: boolean; // 全螢幕模式
	}>();

	const attrs: Partial<QDialogProps> = useAttrs();
	const slots: Partial<QDialog> = useSlots();

	const getBindingValues = computed(() => {
		return {
			...props,
			...attrs,
			// 全螢幕
			maximized: props.fullscreen,
			fullWidth: props.fullscreen,
			fullHeight: props.fullscreen,
		};
	});
</script>

<style lang="scss" scoped></style>
