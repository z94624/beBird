import { ref } from 'vue';

import { Func } from '@/types/common';

export const useDialog = () => {
	// 跳窗開啟狀態
	const isOpen = ref(false);

	/**
	 * 開啟跳窗
	 */
	const _openCallback = ref<Func | null>(null);
	const onOpen = (callback: Func) => {
		_openCallback.value = callback;
	};
	const open = async (...args: any[]) => {
		if (_openCallback.value) {
			await _openCallback.value(...args);
		} else {
			throw new Error('缺少 onOpen 註冊');
		}
		isOpen.value = true;
	};

	/**
	 * 關閉跳窗
	 */
	const _closeCallback = ref<Func | null>(null);
	const onClose = (callback: Func) => {
		_closeCallback.value = callback;
	};
	const close = async (...args: any[]) => {
		if (_closeCallback.value) {
			await _closeCallback.value(...args);
		} else {
			throw new Error('缺少 onClose 註冊');
		}
		isOpen.value = false;
	};

	return {
		open,
		onOpen,
		close,
		onClose,
		isOpen,
	};
};
