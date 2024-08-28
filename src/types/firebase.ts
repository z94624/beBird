import { getFormattedDateTimeNow } from '@/utils/common';

export class FirebaseBebirdVisitorsStatistics {
	constructor(data?: FirebaseBebirdVisitorsStatistics) {
		if (!data) return;
		const {
			onlineInfo = new VisitorsStatisticsInfo(),
			todayInfo = new VisitorsStatisticsInfo(),
			totalInfo = new VisitorsStatisticsInfo(),
		} = data;
		this.onlineInfo = onlineInfo;
		this.todayInfo = todayInfo;
		this.totalInfo = totalInfo;
	}
	onlineInfo: VisitorsStatisticsInfo = new VisitorsStatisticsInfo(); // 在線人次資訊
	todayInfo: VisitorsStatisticsInfo = new VisitorsStatisticsInfo(); // 當日人次資訊
	totalInfo: VisitorsStatisticsInfo = new VisitorsStatisticsInfo(); // 歷史人次資訊
}
export class VisitorsStatisticsInfo {
	constructor(data?: VisitorsStatisticsInfo) {
		if (!data) return;
		const { updatedTime = getFormattedDateTimeNow(), visitorNumber = 0 } = data;
		this.updatedTime = updatedTime;
		this.visitorNumber = visitorNumber;
	}
	updatedTime: string = getFormattedDateTimeNow(); // 更新時間
	visitorNumber: number = 0; // 人次
}
