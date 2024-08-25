export class VisitorStat {
	constructor(data?: VisitorStat) {
		if (!data) return;
		const { online = 0, today = 0, total = 0 } = data;
		this.online = online;
		this.today = today;
		this.total = total;
	}
	online?: number = 0; // 在線人數
	today?: number = 0; // 當日人數
	total?: number = 0; // 總拜訪人數
}
