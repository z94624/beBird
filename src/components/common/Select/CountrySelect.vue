<template>
	<BaseSelect
		v-model="selectedCountry"
		:options="filteredOptions"
		input-debounce="0"
		label="國家"
		use-input
		@filter="filterCountry"
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
	const props = defineProps<{
		country?: string;
	}>();

	const preferredLanguageStore = usePreferredLanguageStore();
	const { userCountryCode } = toRefs(preferredLanguageStore);
	const countryRegionStore = useCountryRegionStore();
	const { countryOptions } = toRefs(countryRegionStore);

	const filteredOptions = ref<QSelectOption[]>([]);
	const selectedCountry = ref<string>(GeoDataEnum.COUNTRYCODE_OF_TAIWAN);

	watch(
		countryOptions,
		(nv) => {
			filteredOptions.value = nv;
		},
		{ immediate: true, deep: true }
	);

	watch(selectedCountry, (nv) => {
		emit('update:country', nv);
	});

	/**
	 * 關鍵字篩選選項
	 */
	const filterCountry = (keyword: string, update: Function) => {
		if (!keyword) {
			update(() => {
				filteredOptions.value = countryOptions.value;
			});
			return;
		}

		update(() => {
			filteredOptions.value = countryOptions.value.filter((option) =>
				option.label.toLowerCase().includes(keyword.toLowerCase())
			);
		});
	};

	onMounted(() => {
		selectedCountry.value = countryOptions.value.find(
			(country) => country.value === userCountryCode.value
		)!.value;
	});
</script>

<style lang="scss" scoped></style>
