<template>
	<q-dialog :="getBindingValues">
		<q-card style="max-width: 75vw">
			<slot name="header">
				<q-toolbar class="dialogHeader text-white bg-primaryDark_e">
					<slot name="title-before"></slot>
					<q-toolbar-title>
						<slot name="title"></slot>
					</q-toolbar-title>
					<slot name="title-after"></slot>

					<BaseButton
						flat
						icon="close"
						round
						@click="emit('close')"
					/>
				</q-toolbar>
			</slot>

			<slot name="body">
				<slot name="content"></slot>
			</slot>

			<slot name="footer">
				<q-card-actions v-if="$slots.actions">
					<slot name="actions"></slot>
				</q-card-actions>
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

<style lang="scss" scoped>
	.dialogHeader {
		position: sticky;
		top: 0;
		z-index: 1;
	}
</style>
