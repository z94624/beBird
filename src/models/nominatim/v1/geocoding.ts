/**
 * Common Output Formats
 */
export type NominatimFormat = 'xml' | 'json' | 'jsonv2' | 'geojson' | 'geocodejson';

/**
 * Common Parameters for Search, Reverse, and Lookup
 */
export class NOMINATIMBaseReq {
	constructor(data?: NOMINATIMBaseReq) {
		if (!data) return;
		const {
			format = 'jsonv2',
			addressdetails = undefined,
			extratags = undefined,
			namedetails = undefined,
			'accept-language': acceptLanguage = undefined,
			email = undefined,
			debug = undefined,
		} = data;
		this.format = format;
		this.addressdetails = addressdetails;
		this.extratags = extratags;
		this.namedetails = namedetails;
		this['accept-language'] = acceptLanguage;
		this.email = email;
		this.debug = debug;
	}
	format?: NominatimFormat = 'jsonv2';
	addressdetails?: 0 | 1 = undefined;
	extratags?: 0 | 1 = undefined;
	namedetails?: 0 | 1 = undefined;
	'accept-language'?: string = undefined;
	email?: string = undefined;
	debug?: 0 | 1 = undefined;
}

/**
 * Search queries
 * search OSM objects by name or type
 */
export class NOMINATIMSearchBaseReq extends NOMINATIMBaseReq {
	constructor(data?: NOMINATIMSearchBaseReq) {
		super(data);
		if (!data) return;
		const {
			countrycodes = undefined,
			exclude_place_ids = undefined,
			limit = undefined,
			viewbox = undefined,
			bounded = undefined,
			polygon_geojson = undefined,
			polygon_kml = undefined,
			polygon_svg = undefined,
			polygon_text = undefined,
			polygon_threshold = undefined,
			layer = undefined,
			featureType = undefined,
		} = data;
		this.countrycodes = countrycodes;
		this.exclude_place_ids = exclude_place_ids;
		this.limit = limit;
		this.viewbox = viewbox;
		this.bounded = bounded;
		this.polygon_geojson = polygon_geojson;
		this.polygon_kml = polygon_kml;
		this.polygon_svg = polygon_svg;
		this.polygon_text = polygon_text;
		this.polygon_threshold = polygon_threshold;
		this.layer = layer;
		this.featureType = featureType;
	}
	countrycodes?: string = undefined;
	exclude_place_ids?: string = undefined;
	limit?: number = undefined;
	viewbox?: string = undefined;
	bounded?: 0 | 1 = undefined;
	polygon_geojson?: 0 | 1 = undefined;
	polygon_kml?: 0 | 1 = undefined;
	polygon_svg?: 0 | 1 = undefined;
	polygon_text?: 0 | 1 = undefined;
	polygon_threshold?: number = undefined;
	layer?: string = undefined;
	featureType?: string = undefined;
}

export class NOMINATIMSearchFreeformReq extends NOMINATIMSearchBaseReq {
	constructor(data?: NOMINATIMSearchFreeformReq) {
		super(data);
		if (!data) return;
		const { q = '' } = data;
		this.q = q;
	}
	q: string = ''; // Free-form query string to search for
}

export class NOMINATIMSearchStructuredReq extends NOMINATIMSearchBaseReq {
	constructor(data?: NOMINATIMSearchStructuredReq) {
		super(data);
		if (!data) return;
		const {
			amenity = undefined,
			street = undefined,
			city = undefined,
			county = undefined,
			state = undefined,
			country = undefined,
			postalcode = undefined,
		} = data;
		this.amenity = amenity;
		this.street = street;
		this.city = city;
		this.county = county;
		this.state = state;
		this.country = country;
		this.postalcode = postalcode;
	}
	amenity?: string = undefined; // name and/or type of POI
	street?: string = undefined; // housenumber and streetname
	city?: string = undefined; // city
	county?: string = undefined; // county
	state?: string = undefined; // state
	country?: string = undefined; // country
	postalcode?: string = undefined; // postal code
}

export interface INOMINATIMSearchItem {
	place_id: number;
	licence: string;
	osm_type: string;
	osm_id: number;
	boundingbox: string[];
	lat: string;
	lon: string;
	display_name: string;
	place_rank?: number;
	category: string;
	type: string;
	importance: number;
	icon?: string;
	address?: Record<string, string>;
	extratags?: Record<string, string>;
	namedetails?: Record<string, string>;
	geojson?: any;
}

export type INOMINATIMSearchRes = INOMINATIMSearchItem[];

/**
 * Reverse queries
 * reverse geocoding generates an address from a latitude and longitude
 */
export class NOMINATIMReverseReq extends NOMINATIMBaseReq {
	constructor(data?: NOMINATIMReverseReq) {
		super(data);
		if (!data) return;
		const {
			lat = 0,
			lon = 0,
			zoom = 5,
			polygon_geojson = undefined,
			polygon_kml = undefined,
			polygon_svg = undefined,
			polygon_text = undefined,
			polygon_threshold = undefined,
		} = data;
		this.lat = lat;
		this.lon = lon;
		this.zoom = zoom;
		this.polygon_geojson = polygon_geojson;
		this.polygon_kml = polygon_kml;
		this.polygon_svg = polygon_svg;
		this.polygon_text = polygon_text;
		this.polygon_threshold = polygon_threshold;
	}
	lat: number = 0;
	lon: number = 0;
	zoom?: number = 5;
	polygon_geojson?: 0 | 1 = undefined;
	polygon_kml?: 0 | 1 = undefined;
	polygon_svg?: 0 | 1 = undefined;
	polygon_text?: 0 | 1 = undefined;
	polygon_threshold?: number = undefined;
}

export interface INOMINATIMReverseRes {
	place_id: number;
	licence: string;
	osm_type: string;
	osm_id: number;
	lat: string;
	lon: string;
	display_name: string;
	address?: Record<string, string>;
	boundingbox: string[];
	extratags?: Record<string, string>;
	namedetails?: Record<string, string>;
	geojson?: any;
}

/**
 * Lookup queries
 * look up the address and other details of one or multiple OSM objects like node, way or relation
 */
export class NOMINATIMLookupReq extends NOMINATIMBaseReq {
	constructor(data?: NOMINATIMLookupReq) {
		super(data);
		if (!data) return;
		const {
			osm_ids = '',
			polygon_geojson = undefined,
			polygon_kml = undefined,
			polygon_svg = undefined,
			polygon_text = undefined,
			polygon_threshold = undefined,
		} = data;
		this.osm_ids = osm_ids;
		this.polygon_geojson = polygon_geojson;
		this.polygon_kml = polygon_kml;
		this.polygon_svg = polygon_svg;
		this.polygon_text = polygon_text;
		this.polygon_threshold = polygon_threshold;
	}
	osm_ids: string = ''; // A comma-separated list of OSM ids (e.g., N123, W456, R789)
	polygon_geojson?: 0 | 1 = undefined;
	polygon_kml?: 0 | 1 = undefined;
	polygon_svg?: 0 | 1 = undefined;
	polygon_text?: 0 | 1 = undefined;
	polygon_threshold?: number = undefined;
}

export type INOMINATIMLookupRes = INOMINATIMSearchItem[];

/**
 * Status queries
 * check if the API is up and functioning
 */
export class NOMINATIMStatusReq {
	constructor(data?: NOMINATIMStatusReq) {
		if (!data) return;
		const { format = 'json' } = data;
		this.format = format;
	}
	format?: 'text' | 'json' = 'json';
}

export interface INOMINATIMStatusRes {
	status: number;
	message: string;
	data_updated: string;
	software_version: string;
	database_version: string;
}

/**
 * Details queries
 * show all details about a single place
 */
export class NOMINATIMDetailsReq {
	constructor(data?: NOMINATIMDetailsReq) {
		if (!data) return;
		const {
			place_id = undefined,
			osmtype = undefined,
			osmid = undefined,
			class: placeClass = undefined,
			addressdetails = undefined,
			keywords = undefined,
			linkedplaces = undefined,
			hierarchy = undefined,
			group_hierarchy = undefined,
			polygon_geojson = undefined,
			'accept-language': acceptLanguage = undefined,
			email = undefined,
			format = 'json',
		} = data;
		this.place_id = place_id;
		this.osmtype = osmtype;
		this.osmid = osmid;
		this.class = placeClass;
		this.addressdetails = addressdetails;
		this.keywords = keywords;
		this.linkedplaces = linkedplaces;
		this.hierarchy = hierarchy;
		this.group_hierarchy = group_hierarchy;
		this.polygon_geojson = polygon_geojson;
		this['accept-language'] = acceptLanguage;
		this.email = email;
		this.format = format;
	}
	place_id?: number = undefined;
	osmtype?: 'N' | 'W' | 'R' = undefined;
	osmid?: number = undefined;
	class?: string = undefined;
	addressdetails?: 0 | 1 = undefined;
	keywords?: 0 | 1 = undefined;
	linkedplaces?: 0 | 1 = undefined;
	hierarchy?: 0 | 1 = undefined;
	group_hierarchy?: 0 | 1 = undefined;
	polygon_geojson?: 0 | 1 = undefined;
	'accept-language'?: string = undefined;
	email?: string = undefined;
	format?: 'json' | 'html' = 'json';
}

export interface INOMINATIMDetailsRes {
	place_id: number;
	parent_place_id?: number;
	osm_type: string;
	osm_id: number;
	category: string;
	type: string;
	admin_level?: number;
	localname: string;
	names: Record<string, string>;
	addresstags?: Record<string, string>;
	housenumber?: string;
	calculated_postcode?: string;
	country_code?: string;
	indexed_date?: string;
	importance?: number;
	calculated_importance?: number;
	extratags?: Record<string, string>;
	calculated_wikipedia?: string;
	icon?: string;
	rank_address?: number;
	rank_search?: number;
	isarea?: boolean;
	centroid?: {
		type: string;
		coordinates: number[];
	};
	geometry?: {
		type: string;
		coordinates: any[];
	};
}
