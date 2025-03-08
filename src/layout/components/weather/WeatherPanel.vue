<template>
	<q-card>
		<q-card-section>
			<div class="bg-black min-h-[100px] rounded-t-[50%]"></div>
		</q-card-section>

		<q-card-section>B</q-card-section>
	</q-card>
</template>

<script lang="ts" setup>
	import { WeatherPanelInfo } from './types';

	const props = defineProps<{
		weatherData: WeatherPanelInfo;
	}>();
</script>

<script lang="scss" scoped></script>
