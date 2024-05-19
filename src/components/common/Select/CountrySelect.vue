<template>
	<BaseSelect
		v-model="selectedCountry"
		:options="countryOptions"
		label="國家"
	/>
</template>

<script lang="ts" setup>
	import { computed, ref, toRefs, watch } from 'vue';
	import { usePreferredLanguages } from '@vueuse/core';

	import { useCountryRegionStore } from '@/store/modules/geodata';
	import { GeoDataEnum } from '@/models/enum/geoEnum';
	import { QSelectOption } from 'quasar';

	const emit = defineEmits<{
		(e: 'update:country', v: string): void;
	}>();
	const props = withDefaults(
		defineProps<{
			country?: string;
		}>(),
		{
			country: GeoDataEnum.COUNTRYCODE_OF_TAIWAN,
		}
	);

	const userLangs = usePreferredLanguages();
	const countryRegionStore = useCountryRegionStore();
	const { countryOptions } = toRefs(countryRegionStore);

	const selectedCountry = ref<QSelectOption>();

	const userCountries = computed(() =>
		userLangs.value.filter((lang) => lang.includes('-')).map((lang) => lang.split('-')[1])
	);

	watch(
		() => props.country,
		(nv) => {
			selectedCountry.value = countryOptions.value.find((country) => country.value === nv);
		},
		{ immediate: true }
	);

	watch(
		userLangs,
		() => {
			if (!userCountries.value.includes(GeoDataEnum.COUNTRYCODE_OF_TAIWAN)) {
				selectedCountry.value = countryOptions.value.find(
					(country) => country.value === userCountries.value[0]
				);
			}
		},
		{ immediate: true, deep: true }
	);

	watch(selectedCountry, (nv) => {
		emit('update:country', nv ? nv.value : GeoDataEnum.COUNTRYCODE_OF_TAIWAN);
	});
</script>

<style lang="scss" scoped></style>
