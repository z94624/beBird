<template>
	<Map>
		<template #search-menu>
			<q-form
				class="q-gutter-md"
				no-error-focus
				no-reset-focus
			>
				<BaseSelect
					v-model="country"
					:options="countryOptions"
					label="國家"
				/>

				<div>
					<span>時間間隔(幾天以前)</span>
					<DaysBackSlider v-model="back" />
				</div>
			</q-form>
		</template>
	</Map>
</template>

<script lang="ts" setup>
	import { ref } from 'vue';

	const back = ref<number | null>(1);
</script>

<style lang="scss" scoped></style>
