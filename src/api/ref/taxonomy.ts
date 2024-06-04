import { SpeciesGroupEnum } from '@/models/enum/ebirdEnum';
import {
	IREFTAXGetEbirdTaxonomyRes,
	REFTAXGetEbirdTaxonomyReq,
	REFTAXGetTaxonomicGroupsReq,
} from '@/models/ref/taxonomy';
import ebird from '@/plugins/axios';

/**
 * eBird Taxonomy
 * @param params Query parameters
 */
export const getEbirdTaxonomyApi = (params: REFTAXGetEbirdTaxonomyReq) => {
	return ebird.get<IREFTAXGetEbirdTaxonomyRes[]>('/ref/taxonomy/ebird', { params });
};

/**
 * Taxonomic Forms
 * @param speciesCode The species code from the taxonomy.
 */
export const getTaxonomicFormsApi = (speciesCode: string) => {
	return ebird.get(`/ref/taxon/forms/${speciesCode}`);
};

/**
 * Taxa Locale Codes
 */
export const getTaxaLocaleCodesApi = () => {
	return ebird.get('/ref/taxa-locales/ebird');
};

/**
 * Taxonomy Versions
 */
export const getTaxonomyVersionsApi = () => {
	return ebird.get('/ref/taxonomy/versions');
};

/**
 * Taxonomic Groups
 * @param speciesGrouping Select the order in which groups are returned, either 'merlin' or 'ebird'.
 * @param params Query parameters
 */
export const getTaxonomicGroupsApi = (
	speciesGrouping: SpeciesGroupEnum,
	params: REFTAXGetTaxonomicGroupsReq
) => {
	return ebird.get(`/ref/sppgroup/${speciesGrouping}`, { params });
};
