<template>
	<q-list class="flex flex-col gap-1">
		<q-item
			v-for="(bird, bIdx) in info.obs"
			:key="bIdx"
			:active="isNotable(bird.speciesCode)"
			:class="[`${isNotable(bird.speciesCode) ? 'notableItem' : 'normalItem'}`]"
			:href="`https://ebird.org/species/${bird.speciesCode}`"
			class="birdItem"
			target="_blank"
		>
			<q-item-section avatar>{{ bird.howManyStr }}</q-item-section>

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
		</q-item>
	</q-list>
</template>

<script lang="ts" setup>
	import { IPRODUCTGetViewChecklistRes } from '@/models/product/product';

	const props = defineProps<{
		info: IPRODUCTGetViewChecklistRes;
		notableSpeciesCode?: string;
	}>();

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
			border: 0.125rem solid $secondary;
		}
	}
</style>
