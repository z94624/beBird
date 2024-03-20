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
