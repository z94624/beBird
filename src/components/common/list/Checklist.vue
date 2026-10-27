<template>
	<q-list class="flex flex-col gap-1">
		<q-item
			v-for="(bird, bIdx) in info?.obs"
			:key="bird.obsId"
			:active="isNotable(bird.speciesCode)"
			:href="`https://ebird.org/species/${bird.speciesCode}`"
			active-class="notableItem"
			class="birdItem flex-col"
			target="_blank"
		>
			<!-- 上半部：鳥種主要資訊 -->
			<div class="no-wrap flex items-center">
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

				<!-- 鳥種備註按鈕 -->
				<q-item-section
					v-if="bird.comments?.trim()"
					side
				>
					<BaseButton
						:icon="isExpanded(bird.obsId) ? 'chat_bubble' : 'chat_bubble_outline'"
						:text-color="isNotable(bird.speciesCode) ? 'accent' : 'grey-6'"
						round
						size="sm"
						@click.stop.prevent="toggleCommentButton(bird.obsId)"
					/>
				</q-item-section>
			</div>

			<!-- 下半部：Separator 與動態展開備註區塊 -->
			<q-slide-transition>
				<div v-show="isExpanded(bird.obsId)">
					<q-separator spaced />

					<!-- 鳥種備註 -->
					<div class="flex items-start gap-1">
						<BaseIcon
							name="notes"
							size="xs"
						/>
						<span class="birdComment text-caption">{{ bird.comments }}</span>
					</div>
				</div>
			</q-slide-transition>
		</q-item>
	</q-list>
</template>

<script lang="ts" setup>
	import { ref } from 'vue';

	import { IPRODUCTGetViewChecklistRes } from '@/models/product/product';

	const props = defineProps<{
		info?: IPRODUCTGetViewChecklistRes;
		notableSpeciesCode?: string;
	}>();

	// 已展開的鳥種備註的 obsId
	const expandedIds = ref<string[]>([]);

	/**
	 * 是否為稀有鳥
	 * @param speciesCode 物種代碼
	 */
	const isNotable = (speciesCode: string) => {
		return speciesCode === props.notableSpeciesCode;
	};

	/**
	 * 鳥種備註是否已展開
	 * @param obsId 鳥種紀錄 ID
	 */
	const isExpanded = (obsId: string) => expandedIds.value.includes(obsId);

	/**
	 * 開闔鳥種備註
	 * @param obsId 鳥種紀錄 ID
	 */
	const toggleCommentButton = (obsId: string) => {
		if (isExpanded(obsId)) {
			expandedIds.value = expandedIds.value.filter((id) => id !== obsId);
		} else {
			expandedIds.value.push(obsId);
		}
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

	.birdComment {
		white-space: pre-wrap;
		word-break: break-word;
		user-select: text;
	}
</style>
