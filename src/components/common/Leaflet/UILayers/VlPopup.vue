<template>
	<l-popup
		:="attrs"
		:options="popupOptions"
	>
		<template #default>
			<q-card
				class="popupCard flex flex-col gap-2"
				flat
			>
				<q-card-section class="!px-2 !pt-2 !pb-0">
					<div class="ellipsis-2-lines">
						<slot name="location"></slot>
					</div>
				</q-card-section>

				<q-card-section class="!px-2 !py-0">
					<slot name="content"></slot>
				</q-card-section>

				<q-card-actions
					align="center"
					class="!px-2 !py-0 no-wrap"
				>
					<slot name="buttons">
						<BaseButton
							class="flex-1"
							color="info"
							dense
							icon="o_info"
							label="細節"
							size="sm"
							@click="emit('detail')"
						/>
						<HrefButton
							:href="navigationUrl"
							:icon="mdiCarArrowRight"
							color="positive"
							dense
							label="導航"
							size="sm"
						/>
					</slot>
				</q-card-actions>

				<q-separator />

				<q-card-section class="!px-2 !pt-0 !pb-2">
					<div class="remark">
						<slot name="remark"></slot>
					</div>
				</q-card-section>
			</q-card>
		</template>
	</l-popup>
</template>

<script lang="ts" setup>
	import { computed, useAttrs, useSlots } from 'vue';
	import { LPopup } from '@vue-leaflet/vue-leaflet';
	import { PopupOptions } from 'leaflet';
	import { mdiCarArrowRight } from '@quasar/extras/mdi-v7';

	const emit = defineEmits<{
		(e: 'detail'): void;
	}>();

	const props = defineProps<{
		options?: PopupOptions;
		navigationUrl?: string;
	}>();

	const attrs = useAttrs();
	const slots = useSlots();

	const popupOptions = computed(() => ({
		offset: [0, -25],
		closeButton: false,
		...(props.options || {}),
	}));
</script>

<style lang="scss" scoped>
	.popupCard {
		border-radius: 12px;

		.remark {
			font-size: 0.625rem;
			line-height: 0.75rem;
			color: var(--q-secondaryLight_e);
		}
	}
</style>
