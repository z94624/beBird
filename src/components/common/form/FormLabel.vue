<template>
	<label :="attrs">
		<div class="formLabel flex justify-between items-center gap-2">
			<div class="formLabel__top-left">
				<span
					v-if="title"
					:style="{
						color: titleColor,
					}"
				>
					{{ title }}
				</span>

				<sup
					v-if="required"
					class="text-negative"
				>
					*
				</sup>

				<small
					v-if="tips"
					:style="{
						color: tipsColor,
					}"
				>
					{{ tips }}
				</small>
			</div>

			<div class="formLabel__top-right">
				<slot name="top-right"></slot>
			</div>
		</div>
	</label>
</template>

<script lang="ts" setup>
	import { useAttrs } from 'vue';

	const props = defineProps<{
		title?: string; // 表單題目標題
		titleColor?: string; // 表單題目標題字體顏色
		tips?: string; // 表單題目提示
		tipsColor?: string; // 表單題目提示字體顏色
		required?: boolean; // 必選填
	}>();

	const attrs = useAttrs();
</script>

<style lang="scss" scoped></style>
