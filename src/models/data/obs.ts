import {
	DetailEnum,
	LocaleEnum,
	RankEnum,
	SortMethodEnum,
	TaxonomyCategoryEnum,
} from '../enum/ebirdEnum';

/**
 * Common Class
 */
export class DATAOBSCommon {
	constructor(data?: DATAOBSCommon) {
		if (!data) return;
		const {
			back = 5,
			hotspot = false,
			maxResults = undefined,
			sppLocale = LocaleEnum.ENGLISH,
		} = data;
		this.back = back;
		this.hotspot = hotspot;
		this.maxResults = maxResults;
		this.sppLocale = sppLocale;
	}
	back?: number = 5; // 1-30；The number of days back to fetch observations.
	hotspot?: boolean = false; // Only fetch observations from hotspots.
	maxResults?: number = undefined; // Only fetch this number of observations.
	sppLocale?: LocaleEnum = LocaleEnum.ENGLISH; // Use this language for species common names.
}

/**
 * Recent observations in a region
 */
export class DATAOBSGetRecentObsInRegionReq extends DATAOBSCommon {
	constructor(data?: DATAOBSGetRecentObsInRegionReq) {
		super(data);
		if (!data) return;
		const { cat = undefined, includeProvisional = false, r = undefined } = data;
		this.cat = cat;
		this.includeProvisional = includeProvisional;
		this.r = r;
	}
	cat?: TaxonomyCategoryEnum[] = undefined; // Only fetch observations from these taxonomic categories.
	includeProvisional?: boolean = false; // Include observations which have not yet been reviewed.
	r?: string[] = undefined; // Fetch observations from up to 10 locations.
}
export interface IDATAOBSGetRecentObsInRegionItem
	extends IDATAOBSGetRecentObsOfSpeciesInRegionItem {
	subId: string;
}

/**
 * Recent notable observations in a region
 */
export class DATAOBSGetRecentNotableObsInRegionReq extends DATAOBSCommon {
	constructor(data?: DATAOBSGetRecentNotableObsInRegionReq) {
		super(data);
		if (!data) return;
		const { detail = DetailEnum.SUBSET, r = undefined } = data;
		this.detail = detail;
		this.r = r;
	}
	detail?: DetailEnum = DetailEnum.SUBSET; // Include a subset (simple), or all (full), of the fields available.
	r?: string[] = undefined; // Fetch observations from up to 10 locations.
}
export interface IDATAOBSGetRecentNotableObsInRegionItem
	extends IDATAOBSGetRecentObsOfSpeciesInRegionItem {
	subId: string;
	exoticCategory: string;
}

/**
 * Recent observations of a species in a region
 */
export class DATAOBSGetRecentObsOfSpeciesInRegionReq extends DATAOBSCommon {
	constructor(data?: DATAOBSGetRecentObsOfSpeciesInRegionReq) {
		super(data);
		if (!data) return;
		const { includeProvisional = false, r = undefined } = data;
		this.includeProvisional = includeProvisional;
		this.r = r;
	}
	includeProvisional?: boolean = false; // Include observations which have not yet been reviewed.
	r?: string[] = undefined; // Fetch observations from up to 10 locations.
}
export interface IDATAOBSGetRecentObsOfSpeciesInRegionItem {
	comName: string;
	howMany: number;
	lat: number;
	lng: number;
	locId: string;
	locName: string;
	locationPrivate: boolean;
	obsDt: string; // YYYY-MM-DD HH:mm
	obsReviewed: boolean;
	obsValid: boolean;
	sciName: string;
	speciesCode: string;
}

/**
 * Recent nearby observations
 */
export class DATAOBSGetRecentNearbyObsReq extends DATAOBSCommon {
	constructor(data?: DATAOBSGetRecentNearbyObsReq) {
		super(data);
		if (!data) return;
		const {
			cat = undefined,
			dist = 25,
			includeProvisional = false,
			lat = 0,
			lng = 0,
			sort = SortMethodEnum.DATE,
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
	sort?: SortMethodEnum = SortMethodEnum.DATE; // Sort observations by taxonomy or by date, most recent first.
}
// IDATAOBSGetRecentNearbyObsItem 用 IDATAOBSGetRecentObsOfSpeciesInRegionItem

/**
 * Recent nearby observations of a species
 */
export class DATAOBSGetRecentNearbyObsOfSpeciesReq extends DATAOBSCommon {
	constructor(data?: DATAOBSGetRecentNearbyObsOfSpeciesReq) {
		super(data);
		if (!data) return;
		const { dist = 25, includeProvisional = false, lat = 0, lng = 0 } = data;
		this.dist = dist;
		this.includeProvisional = includeProvisional;
		this.lat = lat;
		this.lng = lng;
	}
	dist?: number = 25; // The search radius from the given position, in kilometers.
	includeProvisional?: boolean = false; // Include observations which have not yet been reviewed.
	lat: number = 0; // Required. Latitude to 2 decimal places.
	lng: number = 0; // Required. Longitude to 2 decimal places.
}

/**
 * Nearest observations of a species
 */
export class DATAOBSGetNearestObsOfSpeciesReq extends DATAOBSCommon {
	constructor(data?: DATAOBSGetRecentNearbyObsOfSpeciesReq) {
		super(data);
		if (!data) return;
		const { includeProvisional = false, lat = 0, lng = 0, dist = undefined } = data;
		this.includeProvisional = includeProvisional;
		this.lat = lat;
		this.lng = lng;
		this.dist = dist;
	}
	includeProvisional?: boolean = false; // Include observations which have not yet been reviewed.
	lat: number = 0; // Required. Latitude to 2 decimal places.
	lng: number = 0; // Required. Longitude to 2 decimal places.
	dist?: number = undefined; // The search radius from the given position, in kilometers.
}

/**
 * Recent nearby notable observations
 */
export class DATAOBSGetRecentNearbyNotableObsReq extends DATAOBSCommon {
	constructor(data?: DATAOBSGetRecentNearbyNotableObsReq) {
		super(data);
		if (!data) return;
		const { detail = DetailEnum.SUBSET, dist = 25, lat = 0, lng = 0 } = data;
		this.detail = detail;
		this.dist = dist;
		this.lat = lat;
		this.lng = lng;
	}
	detail?: DetailEnum = DetailEnum.SUBSET; // Include a subset (simple), or all (full), of the fields available.
	dist?: number = 25; // The search radius from the given position, in kilometers.
	lat: number = 0; // Required. Latitude to 2 decimal places.
	lng: number = 0; // Required. Longitude to 2 decimal places.
}

/**
 * Recent checklists feed
 */
export class DATAOBSGetRecentChecklistsFeedReq {
	constructor(data?: DATAOBSGetRecentChecklistsFeedReq) {
		if (!data) return;
		const { maxResults = 10 } = data;
		this.maxResults = maxResults;
	}
	maxResults?: number = 10; // Only fetch this number of checklists.
}

/**
 * Historic observations on a date
 */
export class DATAOBSGetHistoricObsOnDateReq {
	constructor(data?: DATAOBSGetHistoricObsOnDateReq) {
		if (!data) return;
		const {
			cat = undefined,
			detail = DetailEnum.SUBSET,
			hotspot = false,
			includeProvisional = false,
			maxResults = undefined,
			rank = RankEnum.THE_DAY,
			r = undefined,
			sppLocale = LocaleEnum.ENGLISH,
		} = data;
		this.cat = cat;
		this.detail = detail;
		this.hotspot = hotspot;
		this.includeProvisional = includeProvisional;
		this.maxResults = maxResults;
		this.rank = rank;
		this.r = r;
		this.sppLocale = sppLocale;
	}
	cat?: TaxonomyCategoryEnum[] = undefined; // Only fetch observations from these taxonomic categories.
	detail?: DetailEnum = DetailEnum.SUBSET; // Include a subset (simple), or all (full), of the fields available.
	hotspot?: boolean = false; // Only fetch observations from hotspots.
	includeProvisional: boolean = false; // Include observations which have not yet been reviewed.
	maxResults?: number = undefined; // Only fetch this number of observations.
	rank?: RankEnum = RankEnum.THE_DAY; // Include latest observation of the day, or the first added
	r?: string[] = undefined; // Fetch observations from up to 10 locations.
	sppLocale?: LocaleEnum = LocaleEnum.ENGLISH; // Use this language for species common names.
}
