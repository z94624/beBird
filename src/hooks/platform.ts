import { Platform } from 'quasar';

export const usePlatform = () => {
	const { mobile, android } = Platform.is;

	return {
		isMobile: mobile, // 是否為手機版
		isAndroid: android, // 是否為 Android 裝置
	};
};
