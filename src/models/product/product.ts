import { RankMethodEnum, SortKeyEnum } from '../enum/ebirdEnum';

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
    projId: string;
    subId: string;
    protocolId: string;
    locId: string;
    durationHrs: number;
    allObsReported: boolean;
    creationDt: string; // YYYY-MM-DD HH:mm
    lastEditedDt: string; // YYYY-MM-DD HH:mm
    obsDt: string; // YYYY-MM-DD HH:mm
    obsTimeValid: boolean;
    checklistId: string;
    numObservers: number;
    subnational1Code: string;
    submissionMethodCode: string;
    userDisplayName: string;
    obs: IPRODUCTGetViewChecklistItem[];
}
export interface IPRODUCTGetViewChecklistItem {
    speciesCode: string;
    hideFlags: [];
    obsDt: string; // YYYY-MM-DD HH:mm
    subnational1Code: string;
    howManyAtleast: number;
    howManyAtmost: number;
    howManyStr: string;
    present: boolean;
    projId: string;
    subId: string;
    obsId: string;
    obsAux?: IPRODUCTGetViewChecklistAux[];
}
export interface IPRODUCTGetViewChecklistAux {
    subId: string;
    obsId: string;
    speciesCode: string;
    fieldName: string;
    entryMethodCode: string;
    auxCode: string;
    value: string;
}
