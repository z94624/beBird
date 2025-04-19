<template>
	<BaseSelect
		v-model="selectedRegion"
		:label="$t('region')"
		:options="filteredOptions"
		clearable
		input-debounce="0"
		use-input
		@filter="filterRegion"
	/>
</template>

<script lang="ts" setup>
	import { computed, onBeforeMount, ref, watch } from 'vue';
	import { QSelectOption } from 'quasar';

	import { useQuasarTool } from '@/hooks/useQuasarTool';
	import { useCountryRegionStore } from '@/store/modules/geodata';
	import { RegionTypeEnum } from '@/models/enum/ebirdEnum';

	const emit = defineEmits<{
		(e: 'update:region', v: string | undefined): void;
		(e: 'loading', v: boolean): void;
	}>();
	const props = defineProps<{
		region?: string;
		country?: string;
	}>();

	const { $notify } = useQuasarTool();
	const countryRegionStore = useCountryRegionStore();

	const filteredOptions = ref<QSelectOption[]>([]);
	const regionOptions = ref<QSelectOption[]>([]);

	const selectedRegion = computed({
		get: () => props.region,
		set: (rObj: string | undefined) => emit('update:region', rObj),
	});

	watch(
		regionOptions,
		(nv) => {
			filteredOptions.value = nv;
		},
		{ deep: true }
	);

	/**
	 * 國家改變，地區選項跟著變
	 */
	watch(
		() => props.country,
		() => {
			selectedRegion.value = undefined;
			updateRegionOptions();
		}
	);

	/**
	 * 關鍵字篩選選項
	 */
	const filterRegion = (keyword: string, update: Function) => {
		if (!keyword) {
			update(() => {
				filteredOptions.value = regionOptions.value;
			});
			return;
		}

		update(() => {
			filteredOptions.value = regionOptions.value.filter((option) =>
				option.label.toLowerCase().includes(keyword.toLowerCase())
			);
		});
	};

	/**
	 * 更新地區選項
	 */
	const updateRegionOptions = () => {
		emit('loading', true);
		countryRegionStore
			.getSubRegionListInfo(RegionTypeEnum.SUBNATIONAL_1, props.country!)
			.then((data) => {
				// $notify.success('成功：更新地區');
				regionOptions.value = data.map((region) => ({
					label: region.name,
					value: region.code,
				}));
			})
			.catch(() => {
				$notify.error('失敗：更新地區');
			})
			.finally(() => {
				emit('loading', false);
			});
	};

	onBeforeMount(() => {
		updateRegionOptions();
	});
</script>

<style lang="scss" scoped></style>
@/store/modules/geodata
