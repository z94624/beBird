/**
 * 檢查今天是否在聖誕假期期間(12/25~01/05)
 * @returns 是否在聖誕假期期間
 */
export const checkIsInChristmasSeason = (): boolean => {
	const nowMonth = new Date().getMonth() + 1;
	const nowDate = new Date().getDate();

	if ((nowMonth === 12 && nowDate >= 25) || (nowMonth === 1 && nowDate <= 5)) {
		return true;
	} else {
		return false;
	}
};
