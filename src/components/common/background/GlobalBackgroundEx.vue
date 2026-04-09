<template>
	<div class="global-background fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
		<div class="svg-container">
			<svg
				class="observation-starfield-canvas"
				preserveAspectRatio="xMidYMid slice"
				viewBox="0 0 1920 1080"
				xmlns="http://www.w3.org/2000/svg"
			>
				<defs>
					<radialGradient
						id="sighting-glow"
						cx="50%"
						cy="50%"
						fx="50%"
						fy="50%"
						r="50%"
					>
						<stop
							offset="0%"
							stop-color="var(--sighting-point-color)"
							stop-opacity="0.9"
						/>
						<stop
							offset="50%"
							stop-color="var(--sighting-point-color)"
							stop-opacity="0.4"
						/>
						<stop
							offset="100%"
							stop-color="var(--sighting-point-color)"
							stop-opacity="0"
						/>
					</radialGradient>
				</defs>

				<g
					class="map-grid"
					fill="none"
					stroke="var(--bg-line-color)"
					stroke-width="0.8"
				>
					<path
						v-for="i in 12"
						:key="`lat-${i}`"
						:d="`M -100,${i * 100 - 50} H 2020`"
						class="grid-line"
					/>
					<path
						v-for="i in 21"
						:key="`lon-${i}`"
						:d="`M ${i * 100 - 50},-100 V 1180`"
						class="grid-line"
					/>
				</g>

				<g fill="none">
					<path
						class="line-flight"
						d="M -100,750 C 400,550 800,950 1400,650 S 1900,800 2100,700"
					/>
					<path
						class="line-flight-secondary"
						d="M -100,350 C 500,150 900,450 1500,250 S 1800,450 2100,350"
					/>
				</g>

				<g
					class="sighting-points"
					fill="url(#sighting-glow)"
				>
					<circle
						v-for="point in observationPoints"
						:key="point.id"
						:cx="point.x"
						:cy="point.y"
						:r="point.r"
						:style="{
							animationDelay: `${point.delay}s`,
							animationDuration: `${point.duration}s`,
						}"
						class="observation-circle"
						@animationiteration="randomizePosition(point)"
					/>
				</g>
			</svg>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { ref, onMounted } from 'vue';

	// 定義觀測點的資料結構
	interface Point {
		id: number;
		x: number;
		y: number;
		r: number;
		delay: number;
		duration: number;
	}

	// 改為響應式 ref，才能動態更新座標
	const observationPoints = ref<Point[]>([]);
	const totalPoints = 45; // 數量稍微調降，因為位置會一直變換，避免畫面過於躁動

	// 初始化圓點
	onMounted(() => {
		const points: Point[] = [];
		for (let i = 0; i < totalPoints; i++) {
			points.push({
				id: i,
				x: Math.random() * 2120 - 100,
				y: Math.random() * 1280 - 100,
				r: Math.random() * 10 + 6, // 半徑 6~16px
				delay: Math.random() * 5,
				duration: Math.random() * 3 + 4, // 呼吸週期 4~7 秒
			});
		}
		observationPoints.value = points;
	});

	// 核心魔法：當某個圓點的 CSS 動畫完成一次循環（此時透明度剛好為 0）時觸發。
	// 我們在這個瞬間將它移動到新的隨機座標，使用者完全不會看到「瞬間移動」的破綻！
	const randomizePosition = (point: Point) => {
		point.x = Math.random() * 2120 - 100;
		point.y = Math.random() * 1280 - 100;
	};
</script>

<style lang="scss" scoped>
	/* --- 顏色與深淺色模式適配 --- */

	.global-background {
		background-color: var(--q-lightBg, #f5f5f5);
		/* 淺色模式：加深網格顏色，讓其清晰可見但不刺眼 */
		--bg-line-color: rgba(0, 0, 0, 0.08);
		--sighting-point-color: #6d6ae4;
		transition: background-color 0.6s ease;
	}

	.body--dark .global-background {
		background-color: var(--q-dark-page, #121212);
		/* 深色模式：提高白色的透明度 */
		--bg-line-color: rgba(255, 255, 255, 0.06);
		--sighting-point-color: #9e9cf2;
	}

	/* --- 畫布設定 --- */

	.svg-container {
		width: 100%;
		height: 100%;
	}

	.observation-starfield-canvas {
		width: 100%;
		height: 100%;
		animation: canvas-drift 60s linear infinite alternate;
	}

	/* 網格線條：加大間距使其更像地圖座標 */
	.grid-line {
		stroke-dasharray: 4 12;
		transition: stroke 0.6s ease;
	}

	/* --- 飛行軌跡 (強調賞鳥主題) --- */

	.line-flight,
	.line-flight-secondary {
		stroke-width: 2.5px;
		stroke-dasharray: 8 16;
		stroke-linecap: round;
		/* 淺色模式使用 eBird 綠色加強版 */
		stroke: rgba(54, 130, 75, 0.35);
		animation: track-forward 40s linear infinite;
	}

	.line-flight-secondary {
		stroke-width: 1.5px;
		stroke-dasharray: 4 12;
		animation-duration: 60s;
		opacity: 0.7;
	}

	.body--dark .line-flight,
	.body--dark .line-flight-secondary {
		/* 深色模式使用亮紫色 */
		stroke: rgba(158, 156, 242, 0.35);
	}

	/* --- 觀測點呼吸動畫 --- */

	.observation-circle {
		/* 使用 ease-in-out 讓淡入淡出更柔和 */
		animation: point-breathe infinite ease-in-out;
		transform-origin: center;
		transform-box: fill-box;
	}

	/* --- 動畫 Keyframes --- */

	@keyframes canvas-drift {
		0% {
			transform: translate(-0.5%, -0.5%) scale(1);
		}
		100% {
			transform: translate(0.5%, 0.5%) scale(1.02);
		}
	}

	@keyframes track-forward {
		0% {
			stroke-dashoffset: 1000;
		}
		100% {
			stroke-dashoffset: 0;
		}
	}

	/* 呼吸動畫：0% 與 100% 必須完全透明 (opacity: 0)，這樣改變座標時才不會閃爍跳動 */
	@keyframes point-breathe {
		0% {
			opacity: 0;
			transform: scale(0.5);
		}
		50% {
			opacity: 1;
			transform: scale(1.2); /* 呼吸變大 */
		}
		100% {
			opacity: 0;
			transform: scale(0.5);
		}
	}
</style>
