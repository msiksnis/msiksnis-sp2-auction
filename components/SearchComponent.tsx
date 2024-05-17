"use client";

import { Search } from "lucide-react";
import SearchModal from "./modals/SearchModal";
import { useState } from "react";

export default function SearchComponent() {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const openSearchModal = () => {
    setIsSearchModalOpen(true);
  };

  const closeSearchModal = () => {
    setIsSearchModalOpen(false);
  };
  return (
    <>
      <div className="relative cursor-pointer group" onClick={openSearchModal}>
        <div className="hidden xl:flex items-center w-36 text-sm text-gray-500 bg-gray-100 h-10 px-4 rounded-full placeholder:text-sm placeholder:font-light">
          Search...
        </div>
        <div className="xl:hidden size-8 bg-gray-100 rounded-full border"></div>
        <Search className="absolute right-1.5 xl:right-4 top-1.5 xl:top-3 size-5 opacity-60 group-hover:scale-105 group-hover:opacity-100 transition-all duration-300" />
      </div>
      {isSearchModalOpen && (
        <SearchModal
          isOpen={isSearchModalOpen}
          closeModal={closeSearchModal}
          onClose={() => setIsSearchModalOpen(false)}
        />
      )}
    </>
  );
}
