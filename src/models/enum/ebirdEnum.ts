export enum TaxonomyCategoryEnum {
    ALL = 'all',
    SPUH = 'spuh', // Genus or identification at broad level, e.g., swan sp. Cygnus sp.
    SLASH = 'slash', // Identification to Species-pair, e.g., Tundra/Trumpeter Swan Cygnus columbianus/buccinator
    SPECIES = 'species', // e.g., Tundra Swan Cygnus columbianus
    ISSF = 'issf', // Identifiable subspecies or group of subspecies, e.g., Tundra Swan (Bewick’s) Cygnus columbianus bewickii or Tundra Swan (Whistling) Cygnus columbianus columbianus
    HYBRID = 'hybrid', // Hybrid between two species, e.g., Tundra x Trumpeter Swan (hybrid)
    DOMESTIC = 'domestic', // Distinctly-plumaged domesticated varieties that may be free-flying (these do not count on personal lists) e.g., Mallard (Domestic type)
    FORM = 'form', // Miscellaneous other taxa, including recently-described species yet to be accepted or distinctive forms that are not universally accepted, e.g., Red-tailed Hawk (abieticola), Upland Goose (Bar-breasted)
}

export enum DetailEnum {
    SUBSET = 'simple', // Include a subset of the fields available.
    COMPLETE = 'full', // Include all of the fields available.
}

export enum SortMethodEnum {
    DATE = 'date', // Sort observations by date, most recent first.
    SPECIES = 'species', // Sort observations by taxonomy, most recent first.
}

export enum SortKeyEnum {
    DATE_OF_CHECKLIST = 'obs_dt', // Order the results by the date of the checklist
    DATE_OF_SUBMIT = 'creation_dt', // Order the results by the date it was submitted.
}

export enum RankEnum {
    THE_DAY = 'mrec', // Include latest observation of the day
    THE_FIRST_ADDED = 'create', // Include latest observation of the first added
}

export enum RankMethodEnum {
    SPECIES_SEEN = 'spp', // Order by number of species seen (spp).
    COMPLETE_CHECKLISTS = 'cl', // Order by number of complete checklists (cl).
}

export enum FileFormatEnum {
    CSV = 'csv', // Fetch the records in CSV format.
    JSON = 'json', // Fetch the records in JSON format.
}

export enum SpeciesGroupEnum {
    MERLIN = 'merlin', // Select the order in 'merlin' are returned.
    EBIRD = 'ebird', // Select the order in ebird' are returned.
}

export enum LocaleEnum {
    BULGARIAN = 'bg', // Bulgarian
    CZECH = 'cs', // Czech
    DANISH = 'da', // Danish
    GERMAN = 'de', // German
    ENGLISH = 'en', // English
    SPANISH = 'es', // Spanish
    SPANISH_ARGENTINA = 'es_AR', // Spanish_Argentina
    SPANISH_CHILE = 'es_CL', // Spanish_Chile
    SPANISH_CUBA = 'es_CU', // Spanish_Cuba
    SPANISH_SPAIN = 'es_ES', // Spanish_Spain
    SPANISH_MEXICO = 'es_MX', // Spanish_Mexico
    SPANISH_PANAMA = 'es_PA', // Spanish_Panama
    FRENCH = 'fr', // French
    HEBREW = 'he', // Hebrew (modern)
    ICELANDIC = 'is', // Icelandic
    DUTCH = 'nl', // Dutch
    NORWEGIAN = 'no', // Norwegian
    PORTUGUESE_BRAZIL = 'pt_BR', // Portuguese_Brazil
    PORTUGUESE_PORTUGAL = 'pt_PT', // Portuguese_Portugal
    RUSSIAN = 'ru', // Russian
    SERBIAN = 'sr', // Serbian
    THAI = 'th', // Thai
    TURKISH = 'tr', // Turkish
    CHINESE = 'zh', // Chinese
}

export enum RegionNameFormatEnum {
    DETAILED = 'detailed',
    DETAILED_NO_QUAL = 'detailednoqual',
    FULL = 'full',
    NAME_QUAL = 'namequal',
    NAME_ONLY = 'nameonly',
    REV_DETAILED = 'revdetailed',
}

export enum RegionTypeEnum {
    COUNTRY = 'country',
    SUBNATIONAL_1 = 'subnational1',
    SUBNATIONAL_2 = 'subnational2',
}
