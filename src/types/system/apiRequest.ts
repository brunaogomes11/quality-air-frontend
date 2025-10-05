export interface ApiRequestSortParam<T> {
  by: keyof T;
  direction: "asc" | "desc";
}

export interface ApiRequestParams<
  T extends object = Record<string, unknown>,
  TFilter = unknown,
> {
  page?: number;
  size?: number;
  filter?: TFilter;
  sort?: ApiRequestSortParam<T>[];
}
