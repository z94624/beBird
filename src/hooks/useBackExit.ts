import { onMounted, onUnmounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useQuasarTool } from './useQuasarTool';
import { useI18n } from 'vue-i18n';
import { usePlatform } from '@/hooks/platform';

/**
 * 處理行動端返回鍵攔截邏輯
 * 透過注入「哨兵狀態（Sentinel State）」來精準區分「子頁返回」與「退出程式」
 * 解決單頁應用（SPA）在 Android 物理返回鍵容易直接退出應用的 UX 問題
 */
export const useBackExit = () => {
	const route = useRoute();
	const { $notify } = useQuasarTool();
	const { t } = useI18n();
	const { isAndroid } = usePlatform();

	/**
	 * 上次按下返回鍵的時間戳（毫秒）
	 */
	let backPressTime = 0;

	/**
	 * 哨兵狀態標記，用於識別歷史堆疊中的攔截層
	 */
	const SENTINEL_KEY = 'bebird-exit-interceptor';

	/**
	 * 執行哨兵狀態注入
	 * * 邏輯準則：
	 * 1. 僅在 Android 平台執行
	 * 2. 僅在首頁（RareBirds）執行
	 * 3. 關鍵判斷：!window.history.state?.back
	 * 當該值為空時，代表目前處於歷史堆疊的最底層（即 App 的入口原點）
	 * 這能避免在從子頁面 push 回首頁時誤觸攔截
	 */
	const pushSentinelState = () => {
		const currentState = window.history.state;

		if (
			isAndroid &&
			route.name === 'RareBirds' &&
			!currentState?.back &&
			currentState?.sentinel !== SENTINEL_KEY
		) {
			window.history.pushState(
				{ ...currentState, sentinel: SENTINEL_KEY },
				'',
				window.location.href
			);
		}
	};

	/**
	 * 處理瀏覽器 PopState 事件（點擊物理返回鍵時觸發）
	 * * @param event - PopStateEvent 包含目標頁面的 state 資訊
	 */
	const handlePopState = (event: PopStateEvent) => {
		/**
		 * 非 Android 或非首頁時，不執行攔截邏輯，交由系統預設行為處理
		 */
		if (!isAndroid || route.name !== 'RareBirds') return;

		/**
		 * 情況 A：回退到哨兵層
		 * 使用者可能是從「子分頁」按返回回到「首頁」，此時 state 會帶有 SENTINEL_KEY
		 * 我們應保持沈默，讓畫面停留在首頁
		 */
		if (event.state?.sentinel === SENTINEL_KEY) return;

		/**
		 * 情況 B：背後仍有歷史紀錄
		 * 如果 vue-router 的 state.back 有值，代表使用者是可以回退到上一頁的
		 * 此時不應攔截退出提示
		 */
		if (window.history.state?.back) return;

		/**
		 * 情況 C：真正的退出攔截
		 * 已經在原點且無處可退，執行「連按兩次退出」邏輯
		 */
		const currentTime = new Date().getTime();

		if (currentTime - backPressTime < 2000) {
			/**
			 * 2 秒內第二次觸發：執行真正的 back 動作來退出 App
			 */
			window.history.back();
		} else {
			/**
			 * 第一次嘗試退出：更新時間、彈出提示、並將使用者「推回」哨兵狀態
			 */
			backPressTime = currentTime;
			$notify.info(t('backExit'), 'bottom');

			/**
			 * 由於 PopState 已經讓指標移動，我們必須立即補回哨兵防止使用者連續回退過頭
			 */
			pushSentinelState();
		}
	};

	/**
	 * 監聽路由變化
	 * * 確保從子頁面回到首頁時，哨兵機制能重新就緒
	 * 使用 setTimeout 延遲 100 毫秒，是為了確保 vue-router 已完成內部 state 的寫入
	 */
	watch(
		() => route.name,
		(newName) => {
			if (newName === 'RareBirds') {
				setTimeout(pushSentinelState, 100);
			}
		},
		{ immediate: true }
	);

	/**
	 * 生命週期管理
	 */
	onMounted(() => {
		window.addEventListener('popstate', handlePopState);
	});

	onUnmounted(() => {
		window.removeEventListener('popstate', handlePopState);
	});
};
