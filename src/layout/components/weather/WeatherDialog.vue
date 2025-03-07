<template>
	<BaseDialog
		v-model="isOpen"
		@close="close"
	>
		<template #title>天氣面板</template>

		<template #content>
			<q-splitter v-model="split">
				<template v-slot:before>
					<BaseTabs
						v-model="tab"
						align="left"
						dense
						vertical
					>
						<q-tab name="tomorrow">
							<TomorrowIcon
								height="28"
								only-icon
							/>
						</q-tab>
					</BaseTabs>
				</template>

				<template v-slot:after>
					<q-tab-panels
						v-model="tab"
						animated
						keep-alive
					>
						<q-tab-panel name="tomorrow">
							<WeatherPanel />
						</q-tab-panel>
					</q-tab-panels>
				</template>
			</q-splitter>
		</template>
	</BaseDialog>
</template>

<script lang="ts" setup>
	import { ref } from 'vue';
	import TomorrowIcon from '@/assets/icons/weather/providers/TomorrowIcon.vue';
	import WeatherPanel from './WeatherPanel.vue';

	import { useDialog } from '@/hooks/dialog';

	const { isOpen, open, onOpen, close, onClose } = useDialog();

	const split = ref(15);
	const tab = ref('tomorrow');

	onOpen(() => {});

	onClose(() => {});

	defineExpose({ open, close });
</script>

<style lang="scss" scoped></style>
