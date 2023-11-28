export interface Location {
  ID: number;
  name_TH?: string;
  name_EN?: string;
  lname_CN?: string;
  locations: Location[];
}

export interface LocationType {
  location_type_ID: number;
  location_type_order: number;
  location_type_name_TH?: string;
  location_type_name_EN?: string;
  location_type_name_CN?: string;
  locations: Location[];
}
