<template>
	<BaseSelect
		v-model="selectedRegion"
		:options="regionOptions"
		clearable
		label="地區"
	/>
</template>

<script lang="ts" setup>
	import { computed, onBeforeMount, ref, watch } from 'vue';
	import { QSelectOption } from 'quasar';

	import { ISubRegionItem } from '@/models/ref/region';

	import { useQuasarTool } from '@/hooks/useQuasarTool';
	import { useCountryRegionStore } from '@/store/modules/geodata';
	import { RegionTypeEnum } from '@/models/enum/ebirdEnum';

	const emit = defineEmits<{
		(e: 'update:region', v: string): void;
		(e: 'loading', v: boolean): void;
	}>();
	const props = defineProps<{
		region?: string;
		country?: string;
	}>();

	const { $notify } = useQuasarTool();
	const countryRegionStore = useCountryRegionStore();

	const regionOptions = ref<QSelectOption[]>([]);

	const selectedRegion = computed({
		get: () => regionOptions.value.find((region) => region.value === props.region),
		set: (rObj: any) => emit('update:region', rObj ? rObj.value : rObj),
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
		emit('loading', true);
		countryRegionStore
			.getSubRegionListInfo(RegionTypeEnum.SUBNATIONAL_1, props.country!)
			.then((data) => {
				$notify.success('成功：更新地區');
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
