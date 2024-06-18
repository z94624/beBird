<template>
	<BaseIndicator
		:="attrs"
		:style="{
			backgroundColor: customColor,
			color: getContrastColor(customColor),
		}"
	>
		<template
			#[slot]
			v-for="(slot, sIdx) in Object.keys(slots)"
			:key="sIdx"
		>
			<slot :name="slot"></slot>
		</template>
	</BaseIndicator>
</template>

<script lang="ts" setup>
	import { computed, useAttrs, useSlots } from 'vue';
	import { QBadge, QBadgeProps } from 'quasar';

	import { MigrationStatusEnum } from '@/models/enum/guideEnum';
	import { getContrastColor } from '@/utils/convert';

	const props = defineProps<{
		status: MigrationStatusEnum;
	}>();

	const attrs: Partial<QBadgeProps> = useAttrs();
	const slots: Partial<QBadge> = useSlots();

	const customColor = computed(() => {
		switch (props.status) {
			case MigrationStatusEnum.RESIDENT:
				return '#4e341d'; // Earth
			case MigrationStatusEnum.WINTER:
				return '#abf0ff'; // Snowflake
			case MigrationStatusEnum.SUMMER:
				return '#FFCC33'; // Sunglow
			case MigrationStatusEnum.PASSAGE:
				return '#D1F1F9'; // Wind
			case MigrationStatusEnum.VAGRANT:
				return '#941b0c'; // Phoenix
			case MigrationStatusEnum.SEA:
				return '#064273'; // Ocean
			case MigrationStatusEnum.EXOTIC:
				return '#B200ED'; // Violet
			default:
				return 'var(--q-primary)';
		}
	});
</script>

<style lang="scss" scoped></style>
