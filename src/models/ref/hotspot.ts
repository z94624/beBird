import { FileFormatEnum } from '../enum/ebirdEnum';

/**
 * Hotspots in a region
 */
export class REFHOTSPOTGetHotspotsInRegionReq {
    constructor(data?: REFHOTSPOTGetHotspotsInRegionReq) {
        if (!data) return;
        const { back = undefined, fmt = FileFormatEnum.JSON } = data;
        this.back = back;
        this.fmt = fmt;
    }
    back?: number = undefined; // Only fetch hotspots which have been visited up to 'back' days ago.
    fmt?: FileFormatEnum = FileFormatEnum.JSON; // Fetch the records in CSV or JSON format.
}

/**
 * Nearby hotspots
 */
export class REFHOTSPOTGetNearbyHotspotsReq {
    constructor(data?: REFHOTSPOTGetNearbyHotspotsReq) {
        if (!data) return;
        const { back = undefined, dist = 25, fmt = FileFormatEnum.JSON, lat = 0, lng = 0 } = data;
        this.back = back;
        this.dist = dist;
        this.fmt = fmt;
        this.lat = lat;
        this.lng = lng;
    }
    back?: number = undefined; // Only fetch hotspots which have been visited up to 'back' days ago.
    dist?: number = 25; // The search radius from the given position, in kilometers.
    fmt?: FileFormatEnum = FileFormatEnum.JSON; // Fetch the records in CSV or JSON format.
    lat: number = 0; // Required. Latitude to 2 decimal places.
    lng: number = 0; // Required. Longitude to 2 decimal places.
}

/**
 * Hotspot Info
 */
export interface IREFHOTSPOTGetHotspotInfoRes {
    locId: string;
    name: string;
    latitude: number;
    longitude: number;
    countryCode: string;
    countryName: string;
    subnational1Name: string;
    subnational1Code: string;
    subnational2Code: string;
    subnational2Name: string;
    isHotspot: boolean;
    hierarchicalName: string;
    locID: string;
}
