<template>
	<BaseSelect
		v-model="selectedRegion"
		:options="regionOptions"
		label="地區"
	/>
</template>

<script lang="ts" setup>
	import { computed, onBeforeMount, ref, watch } from 'vue';
	import { QSelectOption } from 'quasar';

	import { ISubRegionItem } from '@/models/ref/region';

	import { useCountryRegionStore } from '@/store/modules/geodata';
	import { RegionTypeEnum } from '@/models/enum/ebirdEnum';

	const emit = defineEmits<{
		(e: 'update:region', v: string): void;
	}>();
	const props = defineProps<{
		region?: string;
		country?: string;
	}>();

	const countryRegionStore = useCountryRegionStore();

	const regionOptions = ref<QSelectOption[]>([]);

	const selectedRegion = computed({
		get: () => regionOptions.value.find((region) => region.value === props.region),
		set: (rObj: any) => emit('update:region', rObj.value),
	});

	/**
	 * 國家改變，地區選項跟著變
	 */
	watch(
		() => props.country,
		() => {
			updateRegionOptions();
		}
	);

	/**
	 * 更新地區選項
	 */
	const updateRegionOptions = () => {
		countryRegionStore
			.getSubRegionListInfo(RegionTypeEnum.SUBNATIONAL_1, props.country!)
			.then((data: ISubRegionItem[]) => {
				regionOptions.value = data.map((region) => ({
					label: region.name,
					value: region.code,
				}));
			});
	};

	onBeforeMount(() => {
		updateRegionOptions();
	});
</script>

<style lang="scss" scoped></style>
@/store/modules/geodata
