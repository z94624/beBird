<template>
	<BaseSelect
		v-model="selectedCountry"
		:options="countryOptions"
		label="國家"
	/>
</template>

<script lang="ts" setup>
	import { computed, toRefs } from 'vue';

	import { useCountryRegionStore } from '@/store/modules/country';

	const emit = defineEmits<{
		(e: 'update:country', v: string): void;
	}>();
	const props = withDefaults(
		defineProps<{
			country?: string;
		}>(),
		{
			country: 'TW',
		}
	);

	const countryRegionStore = useCountryRegionStore();
	const { countryOptions } = toRefs(countryRegionStore);

	const selectedCountry = computed({
		get: () => countryOptions.value.find((country) => country.value === props.country),
		set: (cObj) => emit('update:country', cObj.value),
	});
</script>

<style lang="scss" scoped></style>
