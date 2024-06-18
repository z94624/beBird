<template>
	<q-badge
		:="attrs"
		rounded
	>
		<template
			#[slot]
			v-for="(slot, sIdx) in Object.keys(slots)"
			:key="sIdx"
		>
			<slot :name="slot"></slot>
		</template>
	</q-badge>
</template>

<script lang="ts" setup>
	import { useAttrs, useSlots } from 'vue';
	import { QBadge, QBadgeProps } from 'quasar';

	const attrs: Partial<QBadgeProps> = useAttrs();
	const slots: Partial<QBadge> = useSlots();
</script>

<style lang="scss" scoped></style>
