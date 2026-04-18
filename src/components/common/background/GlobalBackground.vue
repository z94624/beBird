<template>
	<div class="global-background fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
		<div
			ref="hologramContainerRef"
			class="hologram-container absolute inset-0 w-full h-full flex items-center justify-center"
		>
			<div class="svg-wrapper w-full h-full">
				<svg
					class="observation-starfield-canvas w-full h-full"
					preserveAspectRatio="xMidYMid slice"
					viewBox="0 0 1920 1080"
					xmlns="http://www.w3.org/2000/svg"
				>
					<defs>
						<radialGradient
							id="sighting-glow"
							cx="50%"
							cy="50%"
							r="50%"
						>
							<stop
								offset="0%"
								stop-color="var(--sighting-point-color)"
								stop-opacity="1"
							/>
							<stop
								offset="40%"
								stop-color="var(--sighting-point-color)"
								stop-opacity="0.8"
							/>
							<stop
								offset="100%"
								stop-color="var(--sighting-point-color)"
								stop-opacity="0"
							/>
						</radialGradient>

						<filter
							id="wind-blur"
							height="140%"
							width="140%"
							x="-20%"
							y="-20%"
						>
							<feGaussianBlur stdDeviation="8" />
						</filter>
					</defs>

					<g
						class="globe-grid"
						fill="none"
						stroke="var(--bg-line-color)"
						stroke-width="1.5"
					>
						<circle
							class="globe-outline"
							cx="960"
							cy="540"
							r="1200"
						/>
						<ellipse
							v-for="i in 11"
							:key="`lat-${i}`"
							:ry="i * 100"
							class="globe-line"
							cx="960"
							cy="540"
							rx="1200"
						/>
						<ellipse
							v-for="i in 11"
							:key="`lon-${i}`"
							:rx="i * 100"
							class="globe-line"
							cx="960"
							cy="540"
							ry="1200"
						/>
					</g>

					<g
						v-for="route in migrationRoutes"
						:key="route.renderKey"
						class="migration-system"
					>
					<!-- 手機版關閉高斯模糊濾鏡 -->
						<path
							:d="route.pathData"
							:style="{
								animationDuration: `${route.duration}s`,
								animationDelay: `${route.delay}s`,
							}"
							class="flyway-stream"
							fill="none"
							:filter="!isMobile ? 'url(#wind-blur)' : ''"
							pathLength="100"
							@animationend="regenerateRoute(route)"
						/>

						<g class="sighting-points">
							<g
								v-for="point in route.points"
								:key="point.id"
								:style="{
									transform: `translate(${point.x}px, ${point.y}px)`,
									animationDelay: `${route.delay + route.duration * point.triggerRatio}s`,
								}"
								class="observation-group"
							>
								<circle
									:r="point.r"
									class="echo-ring"
									cx="0"
									cy="0"
									fill="none"
									stroke="var(--sighting-point-color)"
									stroke-width="1.5"
									vector-effect="non-scaling-stroke"
								/>
								<circle
									:r="point.r"
									class="core-point"
									cx="0"
									cy="0"
									fill="url(#sighting-glow)"
								/>
							</g>
						</g>
					</g>
				</svg>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';

import { usePlatform } from '@/hooks/platform';

	interface Point {
		id: string;
		x: number;
		y: number;
		r: number;
		triggerRatio: number;
	}

	interface MigrationRoute {
		id: number;
		renderKey: number;
		pathData: string;
		duration: number;
		delay: number;
		points: Point[];
}

const { isMobile } = usePlatform();

	const migrationRoutes = ref<MigrationRoute[]>([]);
	// 手機版減少路線數量，減輕 DOM 節點壓力
const totalRoutes = isMobile ? 2 : 8;

	/**
	 * 真 3D 透視與平移控制
	 * 負責儲存滑鼠狀態與容器參考
	 */
	const hologramContainerRef = ref<HTMLDivElement | null>(null);

	let normX = 0;
	let normY = 0;
	let smoothX = 0;
	let smoothY = 0;
	let animationFrameId: number;

	/**
	 * 監聽滑鼠移動
	 * 將螢幕座標轉換為 -1 到 1 的正規化座標，供 3D 旋轉計算使用
	 */
	const handleMouseMove = (e: MouseEvent) => {
		normX = (e.clientX / window.innerWidth) * 2 - 1;
		normY = (e.clientY / window.innerHeight) * 2 - 1;
	};

	/**
	 * 平滑視角更新函數 (requestAnimationFrame)
	 * 1. Lerp 插值：保持如同奶油般的滑順視角跟隨
	 * 2. CSS 3D Transforms：將座標轉換為推鏡頭與傾斜效果
	 */
	const smoothPan = () => {
		smoothX += (normX - smoothX) * 0.08;
		smoothY += (normY - smoothY) * 0.08;

		if (hologramContainerRef.value) {
			// translate: 基礎的反向平移 (推鏡頭)
			const translateX = smoothX * -30;
			const translateY = smoothY * -30;

			/**
			 * rotateX/Y: 真正的 3D 傾斜，讓畫面像是一塊漂浮的螢幕
			 * 滑鼠往右，螢幕右側往後退 (rotateY)
			 * 滑鼠往下，螢幕下方往後退 (rotateX)
			 */
			const rotateX = smoothY * 4;
			const rotateY = smoothX * -4;

			// 將 perspective (透視深度) 與 transform 結合
			hologramContainerRef.value.style.transform = `scale(1.1) perspective(1500px) translate3d(${translateX}px, ${translateY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
		}

		animationFrameId = requestAnimationFrame(smoothPan);
	};

	/**
	 * 二次貝茲曲線 (Quadratic Bezier) 取樣計算
	 * 根據時間進度 t (0~1) 找出曲線上的特定 x, y 座標
	 */
	const getPointOnBezier = (
		p0: { x: number; y: number },
		p1: { x: number; y: number },
		p2: { x: number; y: number },
		t: number
	) => {
		const x = Math.pow(1 - t, 2) * p0.x + 2 * (1 - t) * t * p1.x + Math.pow(t, 2) * p2.x;
		const y = Math.pow(1 - t, 2) * p0.y + 2 * (1 - t) * t * p1.y + Math.pow(t, 2) * p2.y;
		return { x, y };
	};

	/**
	 * 產生單一遷徙路線與觀測點資料
	 * 隨機生成起點、終點、控制點，並在路徑上隨機散佈觀測打卡點
	 */
	const generateRouteData = (id: number): MigrationRoute => {
		const startX = Math.random() * 2120 - 100;
		const startY = Math.random() * 1280 - 100;
		const angle = Math.random() * Math.PI * 2;
		const distance = 500 + Math.random() * 1000;

		const endX = startX + Math.cos(angle) * distance;
		const endY = startY + Math.sin(angle) * distance;
		const cpX = (startX + endX) / 2 + (Math.random() - 0.5) * 800;
		const cpY = (startY + endY) / 2 + (Math.random() - 0.5) * 800;

		const pathData = `M ${startX},${startY} Q ${cpX},${cpY} ${endX},${endY}`;

		const points: Point[] = [];
		const numPoints = Math.floor(Math.random() * 3) + 1;
		const pathTravelSpan = 120;

		for (let i = 0; i < numPoints; i++) {
			const t = 0.15 + Math.random() * 0.7;
			const coords = getPointOnBezier(
				{ x: startX, y: startY },
				{ x: cpX, y: cpY },
				{ x: endX, y: endY },
				t
			);

			const scatterRange = 80;
			const offsetX = (Math.random() - 0.5) * scatterRange;
			const offsetY = (Math.random() - 0.5) * scatterRange;

			points.push({
				id: `${id}-pt-${i}-${Date.now()}`,
				x: coords.x + offsetX,
				y: coords.y + offsetY,
				r: Math.random() * 4 + 4,
				triggerRatio: (t * 100) / pathTravelSpan,
			});
		}

		return {
			id,
			renderKey: Date.now() + Math.random(),
			pathData,
			duration: 6 + Math.random() * 8,
			delay: Math.random() * 4,
			points,
		};
	};

	/**
	 * 重新生成動畫結束的路線
	 * 透過覆寫屬性觸發 Vue 的響應式更新
	 */
	const regenerateRoute = (route: MigrationRoute) => {
		Object.assign(route, generateRouteData(route.id));
	};

	onMounted(() => {
		const routes: MigrationRoute[] = [];
		for (let i = 0; i < totalRoutes; i++) {
			routes.push(generateRouteData(i));
		}
		migrationRoutes.value = routes;

		// 手機版不啟動滑鼠監聽與 3D 運算
		if (!isMobile) {
			window.addEventListener('mousemove', handleMouseMove);
			smoothPan();
		}
	});

	onUnmounted(() => {
		window.removeEventListener('mousemove', handleMouseMove);
		cancelAnimationFrame(animationFrameId);
	});
</script>

<style lang="scss" scoped>
	/**
   * 1. 基礎背景與品牌色變數綁定
   */
	.global-background {
		background-color: var(--q-lightBg, #f5f5f5);

		/**
     * 網格 (陸塊/基石)
     * 統一使用 secondary (綠色) 基礎，混入 12% 顯色
     */
		--bg-line-color: color-mix(in srgb, var(--q-secondary) 12%, transparent);

		/**
     * 觀測點 (資料打卡)
     * 使用 accent (睛紅) 做出寶石般的標示感
     */
		--sighting-point-color: var(--q-accent);

		transition: background-color 0.6s ease;
	}

	.body--dark .global-background {
		background-color: var(--q-dark-page, #121212);

		/**
     * 深色模式下的網格
     * 綠色網格的透明度降至 8%，維持太空暗度中的低調基石感
     */
		--bg-line-color: color-mix(in srgb, var(--q-secondary) 8%, transparent);

		--sighting-point-color: var(--q-accent);
	}

	/**
   * 2. 真 3D 容器設定
   * 啟用 hardware acceleration 並設定透視中心點
   */
	.hologram-container {
		will-change: transform;
		transform-origin: center center;
		transform: scale(1.1) perspective(1500px) translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg);
	}

	.svg-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.observation-starfield-canvas {
		width: 100%;
		height: 100%;
	}

	.globe-line,
	.globe-outline {
		stroke-dasharray: 2 6;
		stroke-linecap: round;
	}

	/**
   * 3. 遷徙流與動畫
   */
	.flyway-stream {
		stroke-width: 22px;
		stroke-linecap: round;

		/**
     * 氣流 (鳥類)
     * 統一使用 primary (紫色) 基礎，混入 25% 顯色
     */
		stroke: color-mix(in srgb, var(--q-primary) 25%, transparent);
		stroke-dasharray: 20 120;
		animation: fly-across linear both;
	}

	.body--dark .flyway-stream {
		/**
     * 深色模式下的氣流
     * 透明度微調為 20% 避免過度曝光
     */
		stroke: color-mix(in srgb, var(--q-primary) 20%, transparent);
	}

	.observation-group {
		animation: trigger-point 3s ease-out both;
	}
	.core-point {
		animation: core-pulse 1s infinite ease-in-out alternate;
	}
	.echo-ring {
		animation: echo-expand 7s ease-out forwards;
	}

	@keyframes fly-across {
		0% {
			stroke-dashoffset: 20;
		}
		100% {
			stroke-dashoffset: -100;
		}
	}

	@keyframes trigger-point {
		0% {
			opacity: 0;
		}
		15% {
			opacity: 1;
		}
		60% {
			opacity: 0.7;
		}
		100% {
			opacity: 0;
		}
	}

	@keyframes core-pulse {
		0% {
			transform: scale(0.8);
		}
		100% {
			transform: scale(1.4);
		}
	}

	@keyframes echo-expand {
		0% {
			transform: scale(1);
			opacity: 1;
		}
		100% {
			/* 修正：增加 scale 放大倍率至 3，讓擴散感更明顯 */
			transform: scale(3);
			opacity: 0;
		}
	}
</style>
