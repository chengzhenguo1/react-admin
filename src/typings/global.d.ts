export interface IDictionary<T> {
  [key: string]: T
}

export interface PageResponseData {
  dataTotal?: number;
  pageTotal?: number;
  page?: number;
  size?: number;
}
