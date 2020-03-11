interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface Northeast {
  lat: number;
  lng: number;
}

interface Southwest {
  lat: number;
  lng: number;
}

interface Bounds {
  northeast: Northeast;
  southwest: Southwest;
}

interface Location {
  lat: number;
  lng: number;
}

interface Northeast {
  lat: number;
  lng: number;
}

interface Southwest {
  lat: number;
  lng: number;
}

interface Viewport {
  northeast: Northeast;
  southwest: Southwest;
}

interface Geometry {
  bounds: Bounds;
  location: Location;
  location_type: string;
  viewport: Viewport;
}

interface Result {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry?: Geometry;
  place_id?: string;
  types?: string[];
}

export interface Payload {
  results: Result[];
  status: string;
}

