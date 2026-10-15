<template>
	<div class="checklistDetailContainer flex flex-col gap-3">
		<!-- 清單摘要資訊卡片 -->
		<q-card
			class="checklistSummaryCard flex flex-col gap-2.5 p-3.5"
			flat
		>
			<div class="summaryHeader flex flex-wrap items-center justify-between gap-2">
				<div class="flex flex-wrap items-center gap-2">
					<!-- 觀察者資訊 -->
					<div class="observerInfo flex items-center gap-1.5">
						<q-icon
							class="observerIcon"
							color="primary"
							name="person_outline"
							size="18px"
						/>
						<span
							v-if="isLoaded && (checklistInfo?.userDisplayName || notableObs?.subId)"
							class="observerName text-sm font-semibold"
						>
							{{ checklistInfo?.userDisplayName || $t('ebird.info.observer') }}
						</span>
						<q-skeleton
							v-else-if="!isLoaded"
							class="text-sm"
							type="text"
							width="80px"
						/>
					</div>

					<!-- 鳥種數標籤 -->
					<BaseChip
						v-if="isLoaded && speciesCount !== undefined"
						class="speciesChip"
						color="secondary"
						dense
						icon="flutter_dash"
						size="sm"
						text-color="white"
					>
						{{ $t('ebird.info.species', { count: speciesCount }) }}
					</BaseChip>
					<q-skeleton
						v-else-if="!isLoaded"
						height="22px"
						type="QChip"
						width="65px"
					/>
				</div>

				<!-- 開啟原始清單按鈕 -->
				<HrefButton
					v-if="checklistUrl"
					:href="checklistUrl"
					:label="$t('ebird.info.openChecklist')"
					:size="isTextSizeMd ? 'sm' : isTextSizeLg ? 'md' : 'lg'"
					class="checklistLinkBtn"
					color="secondary"
					icon="open_in_new"
				/>
			</div>

			<!-- 清單詮釋資料列 -->
			<div class="metaRow flex flex-wrap items-center gap-x-4 gap-y-1 text-xs opacity-75">
				<!-- 清單代碼 -->
				<div
					v-if="notableObs?.subId"
					class="flex items-center gap-1"
				>
					<q-icon
						name="tag"
						size="13px"
					/>
					<span class="font-mono">{{ notableObs.subId }}</span>
				</div>

				<!-- 紀錄時間 -->
				<div
					v-if="obsTime"
					class="flex items-center gap-1"
				>
					<q-icon
						name="schedule"
						size="13px"
					/>
					<span>{{ obsTime }}</span>
				</div>

				<!-- 觀察地點 -->
				<div
					v-if="notableObs?.locName"
					class="ellipsis flex max-w-full items-center gap-1"
				>
					<q-icon
						name="place"
						size="13px"
					/>
					<span class="ellipsis">{{ notableObs.locName }}</span>
				</div>
			</div>

			<!-- 觀察者備註 -->
			<div
				v-if="isLoaded && checklistInfo?.comments?.trim()"
				class="commentsCard flex flex-col gap-1 rounded-lg p-2.5"
			>
				<div class="commentsTitle flex items-center gap-1 text-xs font-medium">
					<q-icon
						name="format_quote"
						size="14px"
					/>
					<span>{{ $t('ebird.info.observerNotes') }}</span>
				</div>
				<div
					class="commentsContent whitespace-pre-line break-words text-xs leading-relaxed"
				>
					{{ checklistInfo.comments }}
				</div>
			</div>
		</q-card>

		<!-- 鳥種清單骨架屏 (載入中) -->
		<div
			v-if="!isLoaded"
			class="flex flex-col gap-1.5"
		>
			<div
				v-for="i in 5"
				:key="i"
				class="birdItemSkeleton flex items-center justify-between p-2"
			>
				<div class="flex items-center gap-2">
					<q-skeleton
						size="20px"
						type="circle"
					/>
					<q-skeleton
						class="text-sm"
						type="text"
						width="120px"
					/>
				</div>
				<q-skeleton
					class="text-xs"
					type="text"
					width="40px"
				/>
			</div>
		</div>

		<!-- 鳥種清單 (已載入) -->
		<Checklist
			v-else
			:info="checklistInfo!"
			:notableSpeciesCode="notableObs?.speciesCode"
		/>
	</div>
</template>

<script lang="ts" setup>
	import { computed, toRefs, watch } from 'vue';

	import { IDATAOBSGetRecentNotableObsInRegionItem } from '@/models/data/obs';

	import { useProductStore } from '@/store/modules/product';
	import { useTaxonomyStore } from '@/store/modules/taxonomy';
	import { useTextSizeStore } from '@/store/modules/style';
	import { getChecklistURL } from '@/utils/ebird';

	const props = defineProps<{
		notableObs?: IDATAOBSGetRecentNotableObsInRegionItem;
	}>();

	const productStore = useProductStore();
	const { checklistInfo } = toRefs(productStore);
	const taxonomyStore = useTaxonomyStore();
	const { taxInfoDict } = toRefs(taxonomyStore);
	const textSizeStore = useTextSizeStore();
	const { isTextSizeMd, isTextSizeLg } = toRefs(textSizeStore);

	const isLoaded = computed(() => {
		return !!(props.notableObs?.subId && checklistInfo.value?.subId === props.notableObs.subId);
	});

	const checklistUrl = computed(() => {
		return props.notableObs?.subId ? getChecklistURL(props.notableObs.subId) : '';
	});

	const speciesCount = computed(() => {
		if (!isLoaded.value || !checklistInfo.value) return undefined;
		return checklistInfo.value.numSpecies ?? checklistInfo.value.obs?.length ?? 0;
	});

	const obsTime = computed(() => {
		return checklistInfo.value?.obsDt || props.notableObs?.obsDt;
	});

	/**
	 * 篩選出沒有獲取過物種資訊的物種代碼
	 */
	const speciesCodes = computed(() => {
		const oldSpeciesCodes = Object.keys(taxInfoDict.value);
		return checklistInfo.value?.obs
			.map((o) => o.speciesCode)
			.filter((code) => !oldSpeciesCodes.includes(code));
	});

	const fetchChecklistData = async (subId?: string) => {
		if (!subId) return;
		if (checklistInfo.value?.subId === subId) {
			return;
		}
		try {
			await productStore.getViewChecklistInfo(subId);
			if (speciesCodes.value?.length) {
				// 取得各鳥種分類資訊
				await taxonomyStore.getEbirdTaxonomyInfo(speciesCodes.value.join(','));
			}
			// 待物種資訊字典完整後...
			if (checklistInfo.value?.obs) {
				checklistInfo.value.obs = checklistInfo.value.obs.map((o) => ({
					...o,
					tax: taxInfoDict.value[o.speciesCode],
				}));
			}
		} catch (error) {
			console.error('Failed to fetch checklist info:', error);
		}
	};

	watch(
		() => props.notableObs?.subId,
		(newSubId) => {
			fetchChecklistData(newSubId);
		},
		{ immediate: true }
	);
</script>

<style lang="scss" scoped>
	.checklistDetailContainer {
		width: 100%;
	}

	.checklistSummaryCard {
		@include border;
		border-radius: 0.75rem;
		background: rgba($primary, 0.03);
		transition: all 0.25s ease-in-out;

		.observerInfo {
			.observerName {
				letter-spacing: 0.01em;
			}
		}

		.speciesChip {
			font-weight: 500;
		}

		.checklistLinkBtn {
			border-radius: 0.4375rem;
			font-weight: 500;
		}

		.metaRow {
			border-top: 1px dashed var(--q-line);
			padding-top: 0.5rem;
		}

		.commentsCard {
			@include border($thick: 0.0625rem, $color: rgba($primary, 0.2));
			border-left: 0.25rem solid $primary;
			background-color: rgba($primary, 0.04);
			border-radius: 0.5rem;

			.commentsTitle {
				color: $primary;
				letter-spacing: 0.02em;
			}

			.commentsContent {
				opacity: 0.88;
			}
		}
	}

	.birdItemSkeleton {
		@include border;
		border-radius: 0.4375rem;
	}

	:global([data-mode='dark']) {
		.checklistSummaryCard {
			background: rgba(255, 255, 255, 0.03);

			.commentsCard {
				background-color: rgba($primary, 0.1);
				border-color: rgba($primary, 0.3);
				border-left-color: $primary;
			}
		}
	}
</style>
