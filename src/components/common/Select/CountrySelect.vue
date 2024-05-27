<template>
	<BaseSelect
		v-model="selectedCountry"
		:options="countryOptions"
		label="國家"
	/>
</template>

<script lang="ts" setup>
	import { onMounted, ref, toRefs, watch } from 'vue';

	import { usePreferredLanguageStore } from '@/store/modules/language';
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

	const preferredLanguageStore = usePreferredLanguageStore();
	const { userCountryCode } = toRefs(preferredLanguageStore);
	const countryRegionStore = useCountryRegionStore();
	const { countryOptions } = toRefs(countryRegionStore);

	const selectedCountry = ref<QSelectOption>();

	watch(
		() => props.country,
		(nv) => {
			selectedCountry.value = countryOptions.value.find((country) => country.value === nv);
		},
		{ immediate: true }
	);

	watch(selectedCountry, (nv) => {
		emit('update:country', nv ? nv.value : GeoDataEnum.COUNTRYCODE_OF_TAIWAN);
	});

	onMounted(() => {
		selectedCountry.value = countryOptions.value.find(
			(country) => country.value === userCountryCode.value
		);
	});
</script>

<style lang="scss" scoped></style>
