<template>
	<BaseDialog v-model="isOpen"></BaseDialog>
</template>

<script lang="ts" setup>
	const isOpen = ref(false);

	const open = () => {
		isOpen.value = true;
	};

	const close = () => {
		isOpen.value = false;
	};

	defineExpose({ open, close });
</script>

<style lang="scss" scoped></style>
