<template>
	<div></div>
</template>

<script lang="ts" setup>
	import { toRefs } from 'vue';

	import { useVisitorStatStore } from '@/store/modules/firebase';

	const visitorStatStore = useVisitorStatStore();
	const { online, today, total } = toRefs(visitorStatStore);
</script>

<style lang="scss" scoped></style>
