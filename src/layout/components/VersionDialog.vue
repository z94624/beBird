<template>
	<BaseDialog
		v-model="isOpen"
		@close="close"
	>
		<template #title>Release Notes</template>

		<template #content>
			<div class="p-4">
				<BaseSelect
					v-model="selectedVersion"
					:options="versionOptions"
				/>

				<div class="versionDescContainer"> </div>
			</div>
		</template>
	</BaseDialog>
</template>

<script lang="ts" setup>
	import { computed, ref } from 'vue';

	import { useDialog } from '@/hooks/dialog';
	import { versionList, versionOptions } from '@/layout/utils';

	const { isOpen, open, onOpen, close, onClose } = useDialog();

	const selectedVersion = ref(versionOptions[0].value);

	const selectedVersionItem = computed(() =>
		versionList.find((vi) => vi.version === selectedVersion.value)
	);

	onOpen(() => {});

	onClose(() => {});

	defineExpose({ open, close });
</script>

<style lang="scss" scoped></style>
