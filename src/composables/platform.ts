import { Platform } from 'quasar';

export const usePlatform = () => {
    const { mobile } = Platform.is;

    // 是否為手機版
    const isMobile = !!mobile;

    return { isMobile };
};
