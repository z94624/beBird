import { RankMethodEnum, SortKeyEnum } from '../enum/ebirdEnum';
import { IREFTAXGetEbirdTaxonomyRes } from '../ref/taxonomy';

/**
 * Top 100
 */
export class PRODUCTGetTop100Req {
	constructor(data?: PRODUCTGetTop100Req) {
		if (!data) return;
		const { rankedBy = RankMethodEnum.SPECIES_SEEN, maxResults = undefined } = data;
		this.rankedBy = rankedBy;
		this.maxResults = maxResults;
	}
	rankedBy?: RankMethodEnum = RankMethodEnum.SPECIES_SEEN; // Order by number of complete checklists (cl) or by number of species seen (spp).
	maxResults?: number = undefined; // Only fetch this number of contributors.
}

/**
 * Checklist feed on a date
 */
export class PRODUCTGetChecklistFeedOnDateReq {
	constructor(data?: PRODUCTGetChecklistFeedOnDateReq) {
		if (!data) return;
		const { sortKey = SortKeyEnum.DATE_OF_CHECKLIST, maxResults = 10 } = data;
		this.sortKey = sortKey;
		this.maxResults = maxResults;
	}
	sortKey?: SortKeyEnum = SortKeyEnum.DATE_OF_CHECKLIST; // Order the results by the date of the checklist or by the date it was submitted.
	maxResults?: number = 10; // Only fetch this number of checklists.
}

/**
 * View Checklist
 */
export interface IPRODUCTGetViewChecklistRes {
	allObsReported: boolean;
	checklistId: string;
	comments: string;
	creationDt: string; // YYYY-MM-DD HH:mm
	lastEditedDt: string; // YYYY-MM-DD HH:mm
	locId: string;
	numObservers: number;
	numSpecies: number;
	obs: IPRODUCTGetViewChecklistItem[];
	obsDt: string; // YYYY-MM-DD HH:mm
	obsTimeValid: boolean;
	projId: string;
	protocolId: string;
	subAux?: IPRODUCTGetViewChecklistAux[];
	subAuxAi?: IPRODUCTGetViewChecklistAuxAi[];
	subId: string;
	submissionMethodCode: string;
	subnational1Code: string;
	userDisplayName: string;
}
export interface IPRODUCTGetViewChecklistItem {
	comments?: string;
	hideFlags: any[];
	howManyAtleast: number;
	howManyAtmost: number;
	howManyStr: string;
	obsDt: string; // YYYY-MM-DD HH:mm
	obsId: string;
	present: boolean;
	projId: string;
	speciesCode: string;
	subId: string;
	subnational1Code: string;
	// 自訂：分類資訊
	tax?: IREFTAXGetEbirdTaxonomyRes;
}
export interface IPRODUCTGetViewChecklistAux {
	auxCode: string;
	entryMethodCode: string;
	fieldName: string;
	subId: string;
}
export interface IPRODUCTGetViewChecklistAuxAi {}
