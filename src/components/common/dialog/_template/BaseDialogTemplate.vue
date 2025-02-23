<template>
	<BaseDialog
		v-model="isOpen"
		@close="close"
	>
		<template #title></template>

		<template #content></template>
	</BaseDialog>
</template>

<script lang="ts" setup>
	import { useDialog } from '@/hooks/dialog';

	const { isOpen, open, onOpen, close, onClose } = useDialog();

	onOpen(() => {});

	onClose(() => {});

	defineExpose({ open, close });
</script>

<style lang="scss" scoped></style>
