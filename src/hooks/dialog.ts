import { ref } from 'vue';

export const useDialog = () => {
	// 跳窗開啟狀態
	const isOpen = ref(false);

	/**
	 * 開啟跳窗
	 */
	const open = () => {
		isOpen.value = true;
	};

	/**
	 * 關閉跳窗
	 */
	const close = () => {
		isOpen.value = false;
	};

	return {
		open,
		close,
		isOpen,
	};
};
