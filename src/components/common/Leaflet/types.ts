import { LatLng, Point } from 'leaflet';

/**
 * Leaflet Marker Click Event
 */
export interface MarkerClickEvent {
	containerPoint: Point;
	latlng: LatLng;
	layerPoint: Point;
	originalEvent: PointerEvent;
	sourceTarget: EventTarget;
	target: EventTarget;
	type: string;
}
