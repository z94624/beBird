/**
 * Search queries
 * search OSM objects by name or type
 */
export class NOMINATIMSearchBaseReq {
	constructor(data?: NOMINATIMSearchBaseReq) {
		if (!data) return;
	}
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

export interface INOMINATIMSearchRes {}
