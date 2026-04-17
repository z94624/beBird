import { Loading, Notify, QLoadingShowOptions, QNotifyCreateOptions } from 'quasar';
import { IMap } from '@/models/common/base';

const notificationMap: IMap<number> = {};
const timeout = 3000;

export const useQuasarTool = () => {
	const _setTimer = (msg: string) => {
		notificationMap[msg] = 1;
		setTimeout(() => {
			delete notificationMap[msg];
		}, timeout);
	};
	/**
	 * Notify
	 * https://quasar.dev/quasar-plugins/notify
	 */
	const $notify = {
		success: (msg: string, pos?: QNotifyCreateOptions['position']) => {
			if (notificationMap[msg]) return;
			_setTimer(msg);
			Notify.create({
				type: 'positive',
				message: msg,
				position: pos || 'top',
				timeout,
			});
		},
		error: (msg: string, pos?: QNotifyCreateOptions['position']) => {
			if (notificationMap[msg]) return;
			_setTimer(msg);
			Notify.create({
				type: 'negative',
				message: msg,
				position: pos || 'top',
				timeout,
			});
		},
		info: (msg: string, pos?: QNotifyCreateOptions['position']) => {
			if (notificationMap[msg]) return;
			_setTimer(msg);
			Notify.create({
				type: 'info',
				message: msg,
				position: pos || 'top',
				timeout,
			});
		},
		warning: (msg: string, pos?: QNotifyCreateOptions['position']) => {
			if (notificationMap[msg]) return;
			_setTimer(msg);
			Notify.create({
				type: 'warning',
				message: msg,
				position: pos || 'top',
				timeout,
			});
		},
		loading: (msg: string, pos?: QNotifyCreateOptions['position']) => {
			if (notificationMap[msg]) return;
			_setTimer(msg);
			Notify.create({
				type: 'ongoing',
				message: msg,
				position: pos || 'top',
				timeout,
			});
		},
	};

	/**
	 * Loading
	 * https://quasar.dev/quasar-plugins/loading
	 */
	const $loading = {
		on: (options?: QLoadingShowOptions) => {
			Loading.show(options);
		},
		off: () => {
			Loading.hide();
		},
	};

	return {
		$notify,
		$loading,
	};
};
