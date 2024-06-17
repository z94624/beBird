<template>
	<BaseDialog
		v-model="isOpen"
		@close="close"
	>
		<template #title></template>
	</BaseDialog>
</template>

<script lang="ts" setup>
	import { useDialog } from '@/hooks/dialog';

	const { isOpen, open, close } = useDialog();

	defineExpose({ open, close });
</script>

<style lang="scss" scoped></style>
