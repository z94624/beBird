<template>
	<div class="global-background fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
		<div class="pure-vignette-overlay absolute inset-0 z-10"></div>

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
						<path
							:d="route.pathData"
							:style="{
								animationDuration: `${route.duration}s`,
								animationDelay: `${route.delay}s`,
							}"
							class="flyway-stream"
							fill="none"
							filter="url(#wind-blur)"
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
									stroke-width="2"
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

	const migrationRoutes = ref<MigrationRoute[]>([]);
	const totalRoutes = 8;

	// --- 真 3D 透視與平移控制 ---
	const hologramContainerRef = ref<HTMLDivElement | null>(null);

	let normX = 0;
	let normY = 0;
	let smoothX = 0;
	let smoothY = 0;
	let animationFrameId: number;

	const handleMouseMove = (e: MouseEvent) => {
		// 取得 -1 到 1 的座標
		normX = (e.clientX / window.innerWidth) * 2 - 1;
		normY = (e.clientY / window.innerHeight) * 2 - 1;
	};

	const smoothPan = () => {
		// 1. Lerp 插值：保持如同奶油般的滑順跟隨
		smoothX += (normX - smoothX) * 0.08;
		smoothY += (normY - smoothY) * 0.08;

		if (hologramContainerRef.value) {
			// 2. CSS 3D Transforms
			// translate: 基礎的反向平移 (推鏡頭)
			const translateX = smoothX * -30;
			const translateY = smoothY * -30;

			// rotateX/Y: 真正的 3D 傾斜，讓畫面像是一塊漂浮的螢幕
			// 滑鼠往右，螢幕右側往後退 (rotateY)；滑鼠往下，螢幕下方往後退 (rotateX)
			const rotateX = smoothY * 4; // 上下傾斜 4 度
			const rotateY = smoothX * -4; // 左右傾斜 4 度

			// 將 perspective (透視深度) 與 transform 結合
			hologramContainerRef.value.style.transform = `scale(1.1) perspective(1500px) translate3d(${translateX}px, ${translateY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
		}

		animationFrameId = requestAnimationFrame(smoothPan);
	};

	// --- 路線邏輯 (保持不變) ---
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

	const regenerateRoute = (route: MigrationRoute) => {
		Object.assign(route, generateRouteData(route.id));
	};

	onMounted(() => {
		const routes: MigrationRoute[] = [];
		for (let i = 0; i < totalRoutes; i++) {
			routes.push(generateRouteData(i));
		}
		migrationRoutes.value = routes;
		window.addEventListener('mousemove', handleMouseMove);
		smoothPan();
	});

	onUnmounted(() => {
		window.removeEventListener('mousemove', handleMouseMove);
		cancelAnimationFrame(animationFrameId);
	});
</script>

<style lang="scss" scoped>
	/* --- 1. 基礎背景與品牌色變數綁定 --- */
	.global-background {
		/* 對齊 quasar.ts 中的 lightBg: '#f5f5f5' */
		background-color: var(--q-lightBg, #f5f5f5);

		/* 背景網格線，維持原本的低調對比 */
		--bg-line-color: rgba(100, 110, 120, 0.08);

		/* 對齊 quasar-variables.scss 中的 $primary (紫嘯鶇主題色) */
		--sighting-point-color: var(--q-primary);

		transition: background-color 0.6s ease;
	}

	.body--dark .global-background {
		/* 對齊 quasar-variables.scss 中的 $dark-page: '#121212' */
		background-color: var(--q-dark-page, #121212);

		--bg-line-color: rgba(255, 255, 255, 0.04);

		/* 深色模式下，若 var(--q-primary) 太暗，可使用 CSS color-mix 提亮，
       或保留你原本設計的輕柔紫色 (#8b88f8)。這裡我們用原生變數確保切換主題時的統一性。 */
		--sighting-point-color: var(--q-primary);
	}

	/* --- 2. 純淨漸層光暈 --- */
	.pure-vignette-overlay {
		background: radial-gradient(
			circle at center,
			rgba(0, 0, 0, 0) 0%,
			rgba(0, 0, 0, 0.01) 40%,
			rgba(0, 0, 0, 0.02) 60%,
			rgba(0, 0, 0, 0.04) 80%,
			rgba(0, 0, 0, 0.06) 100%
		);
		pointer-events: none;
	}

	.body--dark .pure-vignette-overlay {
		background: radial-gradient(
			circle at center,
			rgba(0, 0, 0, 0) 0%,
			rgba(0, 0, 0, 0.05) 30%,
			rgba(0, 0, 0, 0.15) 50%,
			rgba(0, 0, 0, 0.3) 75%,
			rgba(0, 0, 0, 0.6) 100%
		);
	}

	/* --- 3. 真 3D 容器設定 --- */
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

	/* --- 4. 遷徙流與動畫 (輔助色對齊) --- */
	.flyway-stream {
		stroke-width: 22px;
		stroke-linecap: round;
		/* 這裡的 54, 130, 75 正好是 $secondary (#36824b) 的 RGB 值。
       使用現代 CSS 的 color-mix 直接引用 Quasar 的 secondary 變數並設定 25% 透明度！*/
		stroke: color-mix(in srgb, var(--q-secondary) 25%, transparent);
		stroke-dasharray: 20 120;
		animation: fly-across linear both;
	}

	.body--dark .flyway-stream {
		/* 深色模式下的氣流，如果你希望維持偏紫色的光澤，可以混入 primary 色 */
		stroke: color-mix(in srgb, var(--q-primary) 20%, transparent);
	}

	.observation-group {
		animation: trigger-point 3s ease-out both;
	}
	.core-point {
		animation: core-pulse 1s infinite ease-in-out alternate;
	}
	.echo-ring {
		animation: echo-expand 3s ease-out forwards;
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
			transform: scale(0.5);
			opacity: 1;
			stroke-width: 2px;
		}
		100% {
			transform: scale(4);
			opacity: 0;
			stroke-width: 0.5px;
		}
	}
</style>
