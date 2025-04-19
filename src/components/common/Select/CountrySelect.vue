<template>
	<BaseSelect
		v-model="selectedCountry"
		:label="$t('country')"
		:options="filteredOptions"
		input-debounce="0"
		use-input
		@filter="filterCountry"
	>
		<template #option="scope">
			<q-item :="scope.itemProps">
				<q-item-section avatar>
					<country-flag
						:country="scope.opt.value.toLowerCase()"
						shadow
					/>
				</q-item-section>
				<q-item-section>
					{{ scope.opt.label }}
				</q-item-section>
			</q-item>
		</template>
	</BaseSelect>
</template>

<script lang="ts" setup>
	import { computed, onMounted, ref, toRefs, watch } from 'vue';

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

	const filteredOptions = ref<QSelectOption[]>([]);

	const selectedCountry = computed({
		get: () => props.country,
		set: (val: string) => emit('update:country', val),
	});

	watch(
		countryOptions,
		(nv) => {
			filteredOptions.value = nv;
		},
		{ immediate: true, deep: true }
	);

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
		if (!selectedCountry.value) {
			selectedCountry.value = countryOptions.value.find(
				(option) => option.value === userCountryCode.value
			)!.value;
		}
	});
</script>

<style lang="scss" scoped></style>
