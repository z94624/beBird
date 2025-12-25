<template>
	<BaseDialog
		v-model="isOpen"
		fullscreen
		@close="close"
	>
		<template #title>{{ $t('version') }}</template>

		<template #content>
			<div class="p-4 flex flex-col gap-4">
				<BaseSelect
					v-model="selectedVersion"
					:options="versionOptions"
				/>

				<div>{{ selectedVersionItem.releaseDate }}</div>

				<div class="versionDescContainer flex flex-col gap-4">
					<template
						v-for="(updates, uIdx) in [
							selectedVersionItem.features,
							selectedVersionItem.fixes,
							selectedVersionItem.changes,
							selectedVersionItem.perfs,
						]"
						:key="uIdx"
					>
						<div v-if="updates">
							<h4 class="text-primary">
								{{ ['Features', 'Fixes', 'Changes', 'Perfs'][uIdx] }}
							</h4>

							<div class="pl-7 mt-2">
								<li
									v-for="(item, iIdx) in updates"
									:key="iIdx"
								>
									{{ item }}
								</li>
							</div>
						</div>
					</template>
				</div>
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

	const selectedVersionItem = computed(
		() => versionList.find((vi) => vi.version === selectedVersion.value)!
	);

	onOpen(() => {});

	onClose(() => {});

	defineExpose({ open, close });
</script>

<style lang="scss" scoped></style>
