import { FileFormatEnum, LocaleEnum, TaxonomyCategoryEnum } from '../enum/ebirdEnum';

/**
 * eBird Taxonomy
 */
export class REFTAXGetEbirdTaxonomyReq {
    constructor(data?: REFTAXGetEbirdTaxonomyReq) {
        if (!data) return;
        const {
            cat = undefined,
            fmt = FileFormatEnum.CSV,
            locale = LocaleEnum.ENGLISH,
            species = undefined,
            version = undefined,
        } = data;
        this.cat = cat;
        this.fmt = fmt;
        this.locale = locale;
        this.species = species;
        this.version = version;
    }
    cat?: TaxonomyCategoryEnum[] = undefined; // Only fetch records from these taxonomic categories.
    fmt?: FileFormatEnum = FileFormatEnum.CSV; // Fetch the records in CSV or JSON format.
    locale?: LocaleEnum = LocaleEnum.ENGLISH; // Use this language for common names.
    species?: string = undefined; // Only fetch records for these species.
    version?: string = undefined; // Fetch a specific version of the taxonomy.
}
export interface IREFTAXGetEbirdTaxonomyRes {
    SCIENTIFIC_NAME: string;
    COMMON_NAME: string;
    SPECIES_CODE: string;
    CATEGORY: TaxonomyCategoryEnum;
    TAXON_ORDER: number;
    COM_NAME_CODES: string;
    SCI_NAME_CODES: string;
    BANDING_CODES: string;
    ORDER: string;
    FAMILY_COM_NAME: string;
    FAMILY_SCI_NAME: string;
    REPORT_AS: string;
    EXTINCT: string;
    EXTINCT_YEAR: string;
}

/**
 * Taxonomy Versions
 */
export interface IREFTAXGetTaxonomyVersionsItem {
    authorityVer: number;
    latest: boolean;
}

/**
 * Taxonomic Groups
 */
export class REFTAXGetTaxonomicGroupsReq {
    constructor(data?: REFTAXGetTaxonomicGroupsReq) {
        if (!data) return;
        const { groupNameLocale = LocaleEnum.ENGLISH } = data;
        this.groupNameLocale = groupNameLocale;
    }
    groupNameLocale?: LocaleEnum = LocaleEnum.ENGLISH; // Locale for species group names. English names are returned for any non-listed locale or any non-translated group name
}
export interface IREFTAXGetTaxonomicGroupsItem {
    groupName: string;
    groupOrder: number;
    taxonOrderBounds: number[][];
}
