<template>
	<div></div>
</template>

<script lang="ts" setup>
	import { onMounted, toRefs } from 'vue';

	import { useProductStore } from '@/store/modules/product';

	const props = defineProps<{
		subId?: string;
	}>();

	const productStore = useProductStore();
	const { checklistInfo } = toRefs(productStore);

	onMounted(() => {
		// 取得記錄清單詳細資訊
		if (props.subId) {
			productStore.getViewChecklistInfo(props.subId);
		}
	});
</script>

<style lang="scss" scoped></style>
