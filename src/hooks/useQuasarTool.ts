import { Notify } from 'quasar';
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
		success: (msg: string) => {
			if (notificationMap[msg]) return;
			_setTimer(msg);
			Notify.create({
				type: 'positive',
				message: msg,
				position: 'top',
				timeout,
			});
		},
		error: (msg: string) => {
			if (notificationMap[msg]) return;
			_setTimer(msg);
			Notify.create({
				type: 'negative',
				message: msg,
				position: 'top',
				timeout,
			});
		},
		info: (msg: string) => {
			if (notificationMap[msg]) return;
			_setTimer(msg);
			Notify.create({
				type: 'info',
				message: msg,
				position: 'top',
				timeout,
			});
		},
		warning: (msg: string) => {
			if (notificationMap[msg]) return;
			_setTimer(msg);
			Notify.create({
				type: 'warning',
				message: msg,
				position: 'top',
				timeout,
			});
		},
		loading: (msg: string) => {
			if (notificationMap[msg]) return;
			_setTimer(msg);
			Notify.create({
				type: 'ongoing',
				message: msg,
				position: 'top',
				timeout,
			});
		},
	};

	return {
		$notify,
	};
};
