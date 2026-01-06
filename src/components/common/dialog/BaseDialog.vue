<template>
	<q-dialog :="getBindingValues">
		<q-card
			:style="{
				width: contentWidth,
			}"
			style="min-width: 50vw"
		>
			<slot name="header">
				<q-toolbar class="dialogHeader">
					<slot name="title-before"></slot>
					<q-toolbar-title>
						<slot name="title"></slot>
					</q-toolbar-title>
					<slot name="title-after"></slot>

					<BaseButton
						:text-color="text_name_mode"
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
	import { computed, toRefs, useAttrs, useSlots } from 'vue';
	import { QDialog, QDialogProps } from 'quasar';

	import { useModeStore } from '@/store/modules/style';

	const emit = defineEmits<{
		(e: 'close'): void;
	}>();

	const props = defineProps<{
		contentWidth?: string; // 內容寬度
		fullWidth?: boolean;
		fullscreen?: boolean; // 全螢幕模式
	}>();

	const attrs: Partial<QDialogProps> = useAttrs();
	const slots: Partial<QDialog> = useSlots();
	const modeStore = useModeStore();
	const { text_name_mode } = toRefs(modeStore);

	const getBindingValues = computed(() => {
		return {
			...props,
			...attrs,
			// 全螢幕
			maximized: props.fullscreen,
			fullWidth: props.fullscreen || props.fullWidth,
			fullHeight: props.fullscreen,
		};
	});
</script>

<style lang="scss" scoped>
	.dialogHeader {
		background-color: $primary;
	}
</style>
