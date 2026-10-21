<template>
	<q-card
		class="checklistDetailCard flex flex-col gap-2.5 p-3.5"
		flat
	>
	</q-card>
</template>

<script lang="ts" setup>
	import { IPRODUCTGetViewChecklistRes } from '@/models/product/product';

	const props = defineProps<{
		info: IPRODUCTGetViewChecklistRes;
	}>();
</script>

<style lang="scss" scoped>
	.checklistDetailCard {
		@include border;

		background-color: rgba($primary, 0.03);
	}
</style>
