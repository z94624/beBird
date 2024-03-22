import { SpeciesGroupEnum } from '@/models/enum/ebirdEnum';
import { REFTAXGetEbirdTaxonomyReq, REFTAXGetTaxonomicGroupsReq } from '@/models/ref/taxonomy';
import { ebird } from '@/utils/http/axios';

/**
 * eBird Taxonomy
 * @param params Query parameters
 */
export const getEbirdTaxonomyApi = (params: REFTAXGetEbirdTaxonomyReq) => {
    return ebird.request({
        url: '/ref/taxonomy/ebird',
        params,
    });
};

/**
 * Taxonomic Forms
 * @param speciesCode The species code from the taxonomy.
 */
export const getTaxonomicFormsApi = (speciesCode: string) => {
    return ebird.request({
        url: `/ref/taxon/forms/${speciesCode}`,
    });
};

/**
 * Taxa Locale Codes
 */
export const getTaxaLocaleCodesApi = () => {
    return ebird.request({
        url: '/ref/taxa-locales/ebird',
    });
};

/**
 * Taxonomy Versions
 */
export const getTaxonomyVersionsApi = () => {
    return ebird.request({
        url: '/ref/taxonomy/versions',
    });
};

/**
 * Taxonomic Groups
 * @param speciesGrouping Select the order in which groups are returned, either 'merlin' or 'ebird'.
 * @param params Query parameters
 */
export const getTaxonomicGroupsApi = (
    speciesGrouping: SpeciesGroupEnum,
    params: REFTAXGetTaxonomicGroupsReq,
) => {
    return ebird.request({
        url: `/ref/sppgroup/${speciesGrouping}`,
        params,
    });
};
