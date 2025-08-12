import { createContext } from "react";

export const ListingContext = createContext<any>({
  listings: [],
  setListings: () => {},
  isLoading: false,
  setLoading: () => {},
  error: null,
  setError: () => {},
  fetchListings: () => Promise.resolve([]),
  createListing: () => Promise.resolve(),
  updateListing: () => Promise.resolve(),
  deleteListing: () => Promise.resolve(),
});