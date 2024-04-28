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

				<DaysBackSlider v-model="standard" />
			</q-form>
		</template>
	</Map>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped></style>
