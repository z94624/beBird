import { FileFormatEnum, RegionNameFormatEnum } from '../enum/ebirdEnum';

/**
 * Region Info
 */
export class REFREGIONGetRegionInfoReq {
    constructor(data?: REFREGIONGetRegionInfoReq) {
        if (!data) return;
        const { regionNameFormat = RegionNameFormatEnum.FULL, delim = ',' } = data;
        this.regionNameFormat = regionNameFormat;
        this.delim = delim;
    }
    regionNameFormat?: RegionNameFormatEnum = RegionNameFormatEnum.FULL; // Control how the name is displayed.
    delim?: string = ','; // The characters used to separate elements in the name.
}
export interface IREFREGIONGetRegionInfoRes {
    result: string;
    bounds: IREFREGIONGetRegionInfoItem;
}
export interface IREFREGIONGetRegionInfoItem {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
}

/**
 * Sub Region List
 */
export class REFREGIONGetSubRegionListReq {
    constructor(data?: REFREGIONGetSubRegionListReq) {
        if (!data) return;
        const { fmt = FileFormatEnum.JSON } = data;
        this.fmt = fmt;
    }
    fmt?: FileFormatEnum = FileFormatEnum.JSON; // Fetch the records in CSV or JSON format.
}
