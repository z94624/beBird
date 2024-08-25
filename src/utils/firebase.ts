import { VisitorStatEnum } from '@/models/enum/firebaseEnum';

/**
 * 拜訪人次
 */
export const visitorStatNameMap = {
	[VisitorStatEnum.ONLINE]: 'Online',
	[VisitorStatEnum.TODAY]: 'Today',
	[VisitorStatEnum.TOTAL]: 'Total',
};
