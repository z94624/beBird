<template>
	<q-page class="attributions-page relative-position overflow-hidden">
		<div class="mesh-bg-1"></div>
		<div class="mesh-bg-2"></div>

		<div class="q-pa-md q-pa-lg-xl relative-position z-top container-max-width">
			<div class="text-center q-mb-xl">
				<h1 class="text-h3 text-weight-bold q-mb-sm">Attributions</h1>
				<p class="text-subtitle1 text-grey-7 q-mt-md quote-text">
					" beBird 的誕生，站在許多開源巨人的肩膀上。感謝以下優質資源與社群的貢獻。"
				</p>
			</div>

			<div class="flex flex-center q-mb-lg gap-sm">
				<q-chip
					v-for="category in categories"
					v-model:selected="activeCategories[category]"
					:key="category"
					:color="activeCategories[category] ? 'primary' : 'grey-3'"
					:outline="!activeCategories[category]"
					:text-color="activeCategories[category] ? 'white' : 'grey-7'"
					class="cursor-pointer transition-color"
					clickable
				>
					{{ category }}
				</q-chip>
			</div>

			<div class="row q-col-gutter-lg">
				<template
					v-for="item in filteredAttributions"
					:key="item.id"
				>
					<div class="col-12 col-sm-6 col-md-4">
						<div
							v-intersection="onIntersection"
							class="reveal-card"
						>
							<q-card class="glass-card full-height flex column">
								<q-card-section class="flex-1">
									<div class="text-overline text-primary q-mb-xs">{{
										item.category
									}}</div>
									<div class="text-h6 q-mb-sm">{{ item.title }}</div>
									<div class="text-caption text-grey-8">
										Author:
										<span class="text-weight-medium">{{ item.author }}</span>
									</div>
								</q-card-section>

								<q-card-actions
									align="right"
									class="q-px-md q-pb-md"
								>
									<div
										v-if="item.htmlQuote"
										v-html="item.htmlQuote"
										class="html-quote-wrap text-caption"
									></div>
									<q-btn
										v-else
										:href="item.url"
										color="primary"
										flat
										icon-right="open_in_new"
										label="Visit"
										no-caps
										size="sm"
										target="_blank"
									/>
								</q-card-actions>
							</q-card>
						</div>
					</div>
				</template>
			</div>

			<div
				v-if="filteredAttributions.length === 0"
				class="text-center q-mt-xl text-grey-6"
			>
				<q-icon
					class="q-mb-md"
					name="o_visibility_off"
					size="4rem"
				/>
				<div class="text-h6">目前沒有符合的分類</div>
			</div>
		</div>
	</q-page>
</template>

<script lang="ts" setup>
	import { ref, reactive, computed } from 'vue';

	// 定義分類
	const categories = ['Icon', 'API', 'Open Source', 'Design'];

	// 控制分類晶片的 Active 狀態 (預設全部為 true)
	const activeCategories = reactive<Record<string, boolean>>({
		Icon: true,
		API: true,
		'Open Source': true,
		Design: true,
	});

	// 資源清單資料
	const attributions = ref([
		{
			id: 1,
			title: 'Weather Animated Icons',
			author: 'Freepik - Flaticon',
			url: 'https://www.flaticon.com/free-animated-icons/rain',
			category: 'Icon',
			htmlQuote:
				'<a href="https://www.flaticon.com/free-animated-icons/rain" title="rain animated icons" target="_blank" class="text-primary text-weight-medium text-decoration-none">Rain animated icons created by Freepik - Flaticon</a>',
		},
		{
			id: 2,
			title: 'Sunrise Sunset API',
			author: 'sunrisesunset.io',
			url: 'https://sunrisesunset.io/api/',
			category: 'API',
			htmlQuote: '',
		},
		{
			id: 3,
			title: 'Dark / Light Mode Switch',
			author: 'opensource-coding',
			url: 'https://github.com/opensource-coding/Dark-Light-Mode-Switch',
			category: 'Open Source',
			htmlQuote: '',
		},
	]);

	// 根據選擇的分類過濾資源
	const filteredAttributions = computed(() => {
		return attributions.value.filter((item) => activeCategories[item.category]);
	});

	/**
	 * 處理捲動進場動畫
	 * 當元素進入可視範圍 (isIntersecting 為 true) 時加入顯示用 class
	 */
	const onIntersection = (entry: IntersectionObserverEntry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('reveal-active');
		} else {
			// 若希望往上滑動時能再次觸發動畫，可保留以下這行；若希望只動畫一次則註解掉
			entry.target.classList.remove('reveal-active');
		}
	};
</script>

<style lang="scss" scoped>
	/* 限制內容最大寬度並居中 */
	.container-max-width {
		max-width: 1200px;
		margin: 0 auto;
	}

	/* 引言字體樣式 */
	.quote-text {
		font-style: italic;
		letter-spacing: 0.5px;
	}

	/* --- 捲動進場動畫 (Scroll Reveal) --- */
	.reveal-card {
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
	}
	.reveal-active {
		opacity: 1;
		transform: translateY(0);
	}

	/* --- 毛玻璃卡片設計 (Glassmorphism) --- */
	.glass-card {
		background: rgba(255, 255, 255, 0.65); /* 淺色模式下的半透明白 */
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border: 1px solid rgba(255, 255, 255, 0.5);
		box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
		border-radius: 16px;
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;

		&:hover {
			transform: translateY(-5px);
			box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.12);
		}
	}

	/* 深色模式下的毛玻璃調整 (請依據您的深色模式 class 調整) */
	.body--dark .glass-card {
		background: rgba(30, 30, 30, 0.65);
		border: 1px solid rgba(255, 255, 255, 0.08);
		box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
	}

	/* --- 背景微光漸層 (Mesh Gradient) --- */
	/* 利用品牌藍 #6d6ae4 與 品牌綠 #36824b 打造極度模糊的背景光暈 */
	.mesh-bg-1,
	.mesh-bg-2 {
		position: absolute;
		border-radius: 50%;
		filter: blur(100px);
		z-index: 0;
		opacity: 0.15; /* 控制光暈強度 */
		animation: float 15s infinite ease-in-out alternate;
	}

	.mesh-bg-1 {
		top: -10%;
		left: -10%;
		width: 50vw;
		height: 50vw;
		background-color: #6d6ae4;
	}

	.mesh-bg-2 {
		bottom: -10%;
		right: -10%;
		width: 60vw;
		height: 60vw;
		background-color: #36824b;
		animation-delay: -5s;
	}

	.body--dark .mesh-bg-1,
	.body--dark .mesh-bg-2 {
		opacity: 0.25; /* 深色模式下可稍微調亮光暈 */
	}

	/* 簡單的漂浮動畫讓背景更有生命力 */
	@keyframes float {
		0% {
			transform: translate(0, 0) scale(1);
		}
		100% {
			transform: translate(5%, 5%) scale(1.1);
		}
	}

	/* Flaticon HTML 連結樣式覆寫 */
	.html-quote-wrap :deep(a) {
		text-decoration: none;
		transition: opacity 0.3s;
		&:hover {
			opacity: 0.7;
		}
	}
</style>
