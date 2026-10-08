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
				<q-card-section class="!px-2 !pb-0 !pt-2">
					<div class="ellipsis-2-lines break-all">
						<slot name="location"></slot>
					</div>
				</q-card-section>

				<q-card-section class="!px-2 !py-0">
					<slot name="content"></slot>
				</q-card-section>

				<q-card-actions
					align="center"
					class="!px-2 !py-0"
				>
					<slot name="buttons">
						<div class="flex w-full flex-col gap-1">
							<!-- 細節按鈕 -->
							<BaseButton
								:label="$t('common.detail')"
								:size="isTextSizeMd ? 'sm' : isTextSizeLg ? 'md' : 'lg'"
								class="w-full"
								color="primary"
								icon="o_info"
								@click="emit('detail')"
							/>

							<q-btn-group
								class="externalActions w-full"
								push
								spread
							>
								<!-- 清單按鈕 -->
								<HrefButton
									v-if="checklistUrl"
									:href="checklistUrl"
									:label="$t('common.checklist')"
									:size="isTextSizeMd ? 'sm' : isTextSizeLg ? 'md' : 'lg'"
									color="secondary"
									icon="list_alt"
								/>
								<!-- 導航按鈕 -->
								<HrefButton
									v-if="navigationUrl"
									:href="navigationUrl"
									:icon="mdiCarArrowRight"
									:label="$t('common.navigation')"
									:size="isTextSizeMd ? 'sm' : isTextSizeLg ? 'md' : 'lg'"
									color="secondary"
								/>
							</q-btn-group>
						</div>
					</slot>
				</q-card-actions>

				<q-separator />

				<q-card-section class="!px-2 !pb-2 !pt-0">
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
		checklistUrl?: string;
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

		// 外連工具列群組：統一視覺風格
		.externalActions {
			:deep(.q-btn) {
				flex: 1;
			}
		}

		// 字體大小 text-sizes.scss
		.remark {
		}
	}
</style>
