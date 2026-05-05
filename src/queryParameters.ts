export type QueryParameterMap = Readonly<Record<string, string>>

export const createQueryParameterMap = (searchText: string): QueryParameterMap =>
  Object.fromEntries(new URLSearchParams(searchText))

export const findQueryParameterValue = (
  queryParameterMap: QueryParameterMap,
  queryParameterName: string,
): string => queryParameterMap[queryParameterName] ?? ""
