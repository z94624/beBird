import { DataDetailEnum, DataSortEnum, TaxonomyCategoryEnum } from '../enum/ebirdEnum';

/**
 * Common Class
 */
export class DATAOBSCommon {
    constructor(data?: DATAOBSCommon) {
        if (!data) return;
        const { back = 14, hotspot = false, maxResults = undefined, sppLocale = 'en' } = data;
        this.back = back;
        this.hotspot = hotspot;
        this.maxResults = maxResults;
        this.sppLocale = sppLocale;
    }
    back?: number = 14; // 1-30；The number of days back to fetch observations.
    hotspot?: boolean = false; // Only fetch observations from hotspots.
    maxResults?: number = undefined; // Only fetch this number of observations.
    sppLocale?: string = 'en'; // Use this language for species common names.
}

/**
 * Recent observations in a region
 */
export class DATAOBSGetRecentObsInRegionReq extends DATAOBSCommon {
    constructor(data?: DATAOBSGetRecentObsInRegionReq) {
        if (!data) return;
        super(data);
        const { cat = undefined, includeProvisional = false, r = undefined } = data;
        this.cat = cat;
        this.includeProvisional = includeProvisional;
        this.r = r;
    }
    cat?: TaxonomyCategoryEnum[] = undefined; // Only fetch observations from these taxonomic categories.
    includeProvisional?: boolean = false; // Include observations which have not yet been reviewed.
    r?: string[] = undefined; // Fetch observations from up to 10 locations.
}

/**
 * Recent notable observations in a region
 */
export class DATAOBSGetRecentNotableObsInRegionReq extends DATAOBSCommon {
    constructor(data?: DATAOBSGetRecentNotableObsInRegionReq) {
        if (!data) return;
        super(data);
        const { detail = DataDetailEnum.SIMPLE, r = undefined } = data;
        this.detail = detail;
        this.r = r;
    }
    detail?: DataDetailEnum = DataDetailEnum.SIMPLE; // Include a subset (simple), or all (full), of the fields available.
    r?: string[] = undefined; // Fetch observations from up to 10 locations.
}

/**
 * Recent observations of a species in a region
 */
export class DATAOBSGetRecentObsOfSpeciesInRegionReq extends DATAOBSCommon {
    constructor(data?: DATAOBSGetRecentObsOfSpeciesInRegionReq) {
        if (!data) return;
        super(data);
        const { includeProvisional = false, r = undefined } = data;
        this.includeProvisional = includeProvisional;
        this.r = r;
    }
    includeProvisional?: boolean = false; // Include observations which have not yet been reviewed.
    r?: string[] = undefined; // Fetch observations from up to 10 locations.
}

/**
 * Recent nearby observations
 */
export class DATAOBSGetRecentNearbyObsReq extends DATAOBSCommon {
    constructor(data?: DATAOBSGetRecentNearbyObsReq) {
        if (!data) return;
        super(data);
        const {
            cat = undefined,
            dist = 25,
            includeProvisional = false,
            lat = 0,
            lng = 0,
            sort = DataSortEnum.DATE,
        } = data;
        this.cat = cat;
        this.dist = dist;
        this.includeProvisional = includeProvisional;
        this.lat = lat;
        this.lng = lng;
        this.sort = sort;
    }
    cat?: TaxonomyCategoryEnum[] = undefined; // Only fetch observations from these taxonomic categories.
    dist?: number = 25; // The search radius from the given position, in kilometers.
    includeProvisional?: boolean = false; // Include observations which have not yet been reviewed.
    lat: number = 0; // Required. Latitude to 2 decimal places.
    lng: number = 0; // Required. Longitude to 2 decimal places.
    sort?: DataSortEnum = DataSortEnum.DATE; // Sort observations by taxonomy or by date, most recent first.
}
