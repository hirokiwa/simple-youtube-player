export type LocationValue = Readonly<{
  pathname: string
  search: string
}>

export const createLocationValue = (locationReference: Location): LocationValue => ({
  pathname: locationReference.pathname,
  search: locationReference.search,
})
