<template>
	<BaseIndicator
		:="attrs"
		:color="color"
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

	import { RarityEnum } from '@/models/enum/guideEnum';

	const props = defineProps<{
		rarity: RarityEnum;
	}>();

	const attrs: Partial<QBadgeProps> = useAttrs();
	const slots: Partial<QBadge> = useSlots();

	const color = computed(() => {
		switch (props.rarity) {
			case RarityEnum.NORMAL:
				return 'green-13';
			case RarityEnum.UNCOMMON:
				return 'blue-13';
			case RarityEnum.RARE:
				return 'red-13';
			default:
				return 'primary';
		}
	});
</script>

<style lang="scss" scoped></style>
