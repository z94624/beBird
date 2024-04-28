<template>
	<q-slider
		:="attrs"
		style="width: -webkit-fill-available"
	>
		<template
			#[slot]
			v-for="(slot, sIdx) in Object.keys(slots)"
			:key="sIdx"
		>
			<slot :name="slot"></slot>
		</template>
	</q-slider>
</template>

<script lang="ts" setup>
	import { useAttrs, useSlots } from 'vue';

	const attrs = useAttrs();
	const slots = useSlots();
</script>

<style lang="scss" scoped></style>
