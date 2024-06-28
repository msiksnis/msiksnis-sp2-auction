import { create } from "zustand";

import { Listing } from "@/types/ListingTypes";

interface EditListingFormState {
  listing: Listing;
  updateListing: (data: Partial<Listing>) => void;
}

export const useEditListingStore = create<EditListingFormState>((set) => ({
  listing: {} as Listing,
  updateListing: (data) =>
    set((state) => ({
      listing: { ...state.listing, ...data },
    })),
}));
