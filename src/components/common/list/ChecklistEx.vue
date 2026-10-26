<template>
	<q-list class="flex flex-col gap-1">
		<div
			v-for="(bird, bIdx) in info?.obs"
			:key="bird.obsId || bird.speciesCode || bIdx"
			class="birdItemWrapper"
		>
			<q-item
				:active="isNotable(bird.speciesCode)"
				:href="`https://ebird.org/species/${bird.speciesCode}`"
				active-class="notableItem"
				class="birdItem"
				target="_blank"
			>
				<q-item-section avatar>
					{{ bird.howManyStr }}
				</q-item-section>

				<q-item-section>
					<div class="flex items-center gap-1">
						<div class="comName-font">
							{{ bird.tax?.comName ?? bird.speciesCode }}
						</div>
						<div class="sciName-font">
							{{ bird.tax?.sciName ?? bird.speciesCode }}
						</div>
					</div>
				</q-item-section>

				<!-- 鳥種備註按鈕 (有備註才顯示) -->
				<q-item-section
					v-if="bird.comments?.trim()"
					side
				>
					<q-btn
						:color="
							isExpanded(bird.obsId || bird.speciesCode)
								? isNotable(bird.speciesCode)
									? 'accent'
									: 'secondary'
								: 'grey-6'
						"
						:icon="
							isExpanded(bird.obsId || bird.speciesCode)
								? 'chat_bubble'
								: 'chat_bubble_outline'
						"
						dense
						flat
						round
						size="sm"
						@click.stop.prevent="toggleComment(bird.obsId || bird.speciesCode)"
					>
						<q-tooltip>{{ bird.comments }}</q-tooltip>
					</q-btn>
				</q-item-section>
			</q-item>

			<!-- 鳥種備註動態展開區塊 -->
			<q-slide-transition>
				<div
					v-show="bird.comments?.trim() && isExpanded(bird.obsId || bird.speciesCode)"
					:class="[
						isDarkMode ? 'bg-grey-9 text-grey-3' : 'bg-grey-2 text-grey-8',
						isNotable(bird.speciesCode) ? 'notableComment' : '',
					]"
					class="birdCommentPanel q-pa-sm q-mx-xs q-mt-xs text-caption"
				>
					<div class="flex items-start gap-1">
						<q-icon
							:color="isNotable(bird.speciesCode) ? 'accent' : 'grey-6'"
							class="q-mt-xs"
							name="notes"
							size="xs"
						/>
						<div class="col commentText">{{ bird.comments }}</div>
					</div>
				</div>
			</q-slide-transition>
		</div>
	</q-list>
</template>

<script lang="ts" setup>
	import { ref, toRefs, watch } from 'vue';

	import { IPRODUCTGetViewChecklistRes } from '@/models/product/product';

	import { useModeStore } from '@/store/modules/style';

	const props = defineProps<{
		info?: IPRODUCTGetViewChecklistRes;
		notableSpeciesCode?: string;
	}>();

	const modeStore = useModeStore();
	const { isDarkMode } = toRefs(modeStore);

	// 記錄已展開的 obsId 或 speciesCode
	const expandedIds = ref<string[]>([]);

	const isExpanded = (id: string) => expandedIds.value.includes(id);

	const toggleComment = (id: string) => {
		if (isExpanded(id)) {
			expandedIds.value = expandedIds.value.filter((item) => item !== id);
		} else {
			expandedIds.value.push(id);
		}
	};

	// 記錄已執行過預設開啟的 key，避免非同步更新時重複覆蓋使用者的開合操作
	const autoExpandedKey = ref('');

	// 監聽清單與稀有鳥種代碼：稀有鳥種若有備註，預設展開開啟
	watch(
		() => [props.info?.subId, props.notableSpeciesCode, props.info?.obs],
		() => {
			if (!props.info?.obs?.length || !props.notableSpeciesCode) return;
			const currentKey = `${props.info.subId}_${props.notableSpeciesCode}`;
			if (autoExpandedKey.value === currentKey) return;

			const notableBird = props.info.obs.find(
				(bird) => bird.speciesCode === props.notableSpeciesCode
			);
			if (notableBird) {
				autoExpandedKey.value = currentKey;
				if (notableBird.comments?.trim()) {
					const id = notableBird.obsId || notableBird.speciesCode;
					if (!expandedIds.value.includes(id)) {
						expandedIds.value.push(id);
					}
				}
			}
		},
		{ immediate: true }
	);

	/**
	 * 是否為稀有鳥
	 * @param speciesCode 物種代碼
	 */
	const isNotable = (speciesCode: string) => {
		return speciesCode === props.notableSpeciesCode;
	};
</script>

<style lang="scss" scoped>
	.birdItem {
		@include border;
		border-radius: 0.4375rem;

		&.notableItem {
			@include border($thick: 0.125rem, $color: $accent);
			color: $accent;
			background-color: rgba($accent, 0.05);
		}
	}

	.birdCommentPanel {
		border-radius: 0.4375rem;
		line-height: 1.5;

		.commentText {
			white-space: pre-wrap;
			word-break: break-word;
		}

		&.notableComment {
			border-left: 3px solid $accent;
		}
	}
</style>
