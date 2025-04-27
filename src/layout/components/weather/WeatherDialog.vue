<template>
	<BaseDialog
		v-model="isOpen"
		:full-width="isMobile"
		@close="close"
	>
		<template #title>天氣面板</template>

		<template #content>
			<!-- 手機版 -->
			<template v-if="isMobile">
				<BaseTabs
					v-model="tab"
					align="left"
					dense
				>
					<q-tab name="tomorrow">
						<TomorrowIcon
							height="28"
							only-icon
						/>
					</q-tab>
				</BaseTabs>

				<q-tab-panels
					v-model="tab"
					animated
					keep-alive
				>
					<q-tab-panel name="tomorrow">
						<WeatherPanel :weather-data="weatherData" />
					</q-tab-panel>
				</q-tab-panels>
			</template>

			<!-- 電腦版 -->
			<template v-else>
				<q-splitter
					v-model="split"
					:limits="[15, 15]"
				>
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
								<WeatherPanel :weather-data="weatherData" />
							</q-tab-panel>
						</q-tab-panels>
					</template>
				</q-splitter>
			</template>
		</template>
	</BaseDialog>
</template>

<script lang="ts" setup>
	import { ref } from 'vue';
	import TomorrowIcon from '@/assets/icons/weather/providers/TomorrowIcon.vue';
	import WeatherPanel from './WeatherPanel.vue';

	import { useDialog } from '@/hooks/dialog';
	import { usePlatform } from '@/hooks/platform';
	import { WeatherPanelInfo } from './types';

	const { isOpen, open, onOpen, close, onClose } = useDialog();
	const { isMobile } = usePlatform();

	const split = ref(15);
	const tab = ref('tomorrow');
	const weatherData = ref<WeatherPanelInfo>(new WeatherPanelInfo());

	onOpen((data: WeatherPanelInfo) => {
		weatherData.value = data;
	});

	onClose(() => {});

	defineExpose({ open, close });
</script>

<style lang="scss" scoped></style>
