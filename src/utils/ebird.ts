import { date } from 'quasar';

/**
 * 取得紀錄距現在相隔天數
 * @param obsDt eBird 紀錄時間格式字串
 * @returns 距離現在的天數
 */
export const getDateDiffFromNow = (obsDt: string): number => {
	const obsDate = date.extractDate(obsDt, 'YYYY-MM-DD HH:mm');
	const diff = date.getDateDiff(new Date(), obsDate, 'days');
	return diff;
};
