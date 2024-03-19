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

export enum DataDetailEnum {
    SIMPLE = 'simple', // Include a subset of the fields available.
    FULL = 'full', // Include all of the fields available.
}

export enum DataSortEnum {
    DATE = 'date', // Sort observations by date, most recent first.
    SPECIES = 'species', // Sort observations by taxonomy, most recent first.
}

export enum DataRankEnum {
    MREC = 'mrec', // Include latest observation of the day
    CREATE = 'create', // Include latest observation of the first added
}
