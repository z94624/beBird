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
							:label="$t('detail')"
							:size="isTextSizeMd ? 'sm' : isTextSizeLg ? 'md' : 'lg'"
							class="flex-1"
							color="info"
							icon="o_info"
							@click="emit('detail')"
						/>
						<HrefButton
							:href="navigationUrl"
							:icon="mdiCarArrowRight"
							:label="$t('navigation')"
							:size="isTextSizeMd ? 'sm' : isTextSizeLg ? 'md' : 'lg'"
							color="positive"
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
	import { computed, toRefs, useAttrs, useSlots } from 'vue';
	import { LPopup } from '@vue-leaflet/vue-leaflet';
	import { PopupOptions } from 'leaflet';
	import { mdiCarArrowRight } from '@quasar/extras/mdi-v7';

	import { useTextSizeStore } from '@/store/modules/style';

	const emit = defineEmits<{
		(e: 'detail'): void;
	}>();

	const props = defineProps<{
		options?: PopupOptions;
		navigationUrl?: string;
	}>();

	const attrs = useAttrs();
	const slots = useSlots();
	const textSizeStore = useTextSizeStore();
	const { isTextSizeMd, isTextSizeLg } = toRefs(textSizeStore);

	const popupOptions = computed(() => ({
		offset: [0, -25],
		closeButton: false,
		...(props.options || {}),
	}));
</script>

<style lang="scss" scoped>
	.popupCard {
		border-radius: 0.75rem;

		// 字體大小 text-sizes.scss
		.remark {
			color: var(--q-secondaryLight_e);
		}
	}
</style>
