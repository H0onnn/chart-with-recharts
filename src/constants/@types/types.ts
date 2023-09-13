export interface DataEntry {
  id: string;
  value_area: number;
  value_bar: number;
}

export interface DataResponse {
  [key: string]: DataEntry;
}

export interface DataInterface {
  type: string;
  version: number;
  response: DataResponse;
}
