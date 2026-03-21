<template>
	<BaseChip
		:="attrs"
		:class="[{ 'glass-chip--selected': selected }]"
		:selected="selected"
		class="glass-chip"
		clickable
	>
		<template
			#[slot]
			v-for="(slot, sIdx) in Object.keys(slots)"
			:key="sIdx"
		>
			<slot :name="slot"></slot>
		</template>
	</BaseChip>
</template>

<script lang="ts" setup>
	import { useAttrs, useSlots, computed } from 'vue';
	import { QChip, QChipProps } from 'quasar';

	import { isHexColor } from '@/utils/common';

	const props = withDefaults(
		defineProps<{
			selected?: boolean;
			activeColor?: string; // 支援 Quasar 顏色名稱 (如 'secondary') 或色碼 (如 '#ff5722')
		}>(),
		{
			selected: false,
			activeColor: 'primary', // 預設使用 primary
		}
	);

	const attrs: Partial<QChipProps> = useAttrs();
	const slots: Partial<QChip> = useSlots();

	// 解析顏色：如果是色碼或 var() 就直接使用，否則轉換為 Quasar 的 CSS 變數
	const parsedColor = computed(() => {
		const color = props.activeColor;
		if (isHexColor(color)) {
			return color;
		}
		return `var(--q-${color})`;
	});
</script>

<style lang="scss" scoped>
	/* 預設狀態 (未選取)：使用極淡的白色毛玻璃與細邊框 */
	.glass-chip {
		background: rgba(255, 255, 255, 0.25) !important;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px); /* 支援 Safari */
		border: 1px solid rgba(255, 255, 255, 0.4) !important;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
		color: #666 !important;
		transition: all 0.3s ease;

		/* Hover 效果：稍微增加亮度與陰影 */
		&:hover {
			background: rgba(255, 255, 255, 0.4) !important;
			box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
			transform: translateY(-1px);
		}

		/* 選取狀態 (Active)：套用動態顏色 */
		&.glass-chip--selected {
			background: rgba(255, 255, 255, 0.65) !important;

			/* 透過 v-bind 注入 Vue 的 computed 變數 */
			border-color: v-bind(parsedColor) !important;
			color: v-bind(parsedColor) !important;
			font-weight: 600;

			/* 使用 modern CSS 的 color-mix 來處理陰影透明度，不再依賴 Quasar 的 -rgb 變數 */
			box-shadow: 0 4px 12px color-mix(in srgb, v-bind(parsedColor) 15%, transparent);
		}
	}

	/* 支援深色模式 (Dark Mode) 的毛玻璃 */
	.body--dark {
		.glass-chip {
			background: rgba(30, 30, 30, 0.3) !important;
			border: 1px solid rgba(255, 255, 255, 0.1) !important;
			color: #bbb !important;
			box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

			&:hover {
				background: rgba(50, 50, 50, 0.4) !important;
			}

			&.glass-chip--selected {
				background: rgba(255, 255, 255, 0.15) !important;
				border-color: v-bind(parsedColor) !important;
				color: v-bind(parsedColor) !important;
			}
		}
	}
</style>
