import { TaxonomyCategoryEnum } from '../enum/ebirdEnum';

/**
 * Recent observations in a region
 */
export class DATAOBSGetRecentObsInRegionReq {
    constructor(data: DATAOBSGetRecentObsInRegionReq) {
        if (!data) return;
        const {
            back = 14,
            cat = null,
            hotspot = false,
            includeProvisional = false,
            maxResults = null,
            r = null,
            sppLocale = 'en',
        } = data;
        this.back = back;
        this.cat = cat;
        this.hotspot = hotspot;
        this.includeProvisional = includeProvisional;
        this.maxResults = maxResults;
        this.r = r;
        this.sppLocale = sppLocale;
    }
    back?: number = 14; // 1-30；The number of days back to fetch observations.
    cat?: TaxonomyCategoryEnum[] | null = null; // Only fetch observations from these taxonomic categories.
    hotspot?: boolean = false; // Only fetch observations from hotspots.
    includeProvisional?: boolean = false; // Include observations which have not yet been reviewed.
    maxResults?: number | null = null; // Only fetch this number of observations.
    r?: string[] | null = null; // Fetch observations from up to 10 locations.
    sppLocale?: string = 'en'; // Use this language for species common names.
}
