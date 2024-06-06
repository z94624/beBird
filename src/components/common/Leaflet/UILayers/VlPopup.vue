<template>
	<l-popup
		:="attrs"
		:options="popupOptions"
	>
		<template #default>
			<q-card
				class="popupCard"
				flat
			>
				<q-card-section>
					<slot name="location"></slot>
				</q-card-section>

				<q-card-section>
					<slot name="content"></slot>
				</q-card-section>

				<q-card-actions class="no-wrap">
					<slot name="buttons">
						<BaseButton
							color="info"
							dense
							icon="o_info"
							label="細節"
							size="sm"
						/>
						<BaseButton
							:icon="mdiCarArrowRight"
							color="positive"
							dense
							label="導航"
							size="sm"
						/>
					</slot>
				</q-card-actions>
			</q-card>
		</template>
	</l-popup>
</template>

<script lang="ts" setup>
	import { computed, useAttrs, useSlots } from 'vue';
	import { LPopup } from '@vue-leaflet/vue-leaflet';
	import { PopupOptions } from 'leaflet';
	import { mdiCarArrowRight } from '@quasar/extras/mdi-v7';

	const props = defineProps<{
		options?: PopupOptions;
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
	}
</style>
