"use client";

import { useEffect, useRef, useState } from "react";

import Input from "../Input";
import { Listing } from "@/types/ListingTypes";
import Link from "next/link";

interface SearchModalProps {
  isOpen: boolean;
  closeModal: () => void;
  onClose: () => void;
}

export default function SearchModal({
  isOpen,
  closeModal,
  onClose,
}: SearchModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);

    // To prevent scrolling for backround content when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, closeModal]);

  function debounce(func: (...args: any[]) => void, delay: number) {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

  const handleSearch = debounce(async (query: string) => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`/api/search?q=${query}`);
      const { data } = await res.json();
      const resultsWithMedia = data.filter(
        (item: Listing) => item.media.length > 0
      );
      setSearchResults(resultsWithMedia);
    } catch (error) {
      console.error("Error searching for items", error);
    } finally {
      setIsLoading(false);
    }
  }, 400);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex justify-center px-4">
      <div
        ref={modalRef}
        className="w-full max-w-xl max-h-[80vh] md:max-h-[95vh] no-scrollbar overflow-y-auto bg-white rounded-lg shadow-lg outline-none focus:outline-none mb-10 h-fit mt-24 md:mt-5 p-4"
      >
        <div className="">
          <Input
            type="text"
            autoFocus
            label=""
            placeholder="Search for items..."
            value={searchQuery}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-4">
          {isLoading ? (
            <div>Loading...</div>
          ) : searchResults.length > 0 ? (
            searchResults.map((result) => (
              <Link
                href={`/listing/${result.id}`}
                onClick={onClose}
                key={result.id}
                className="flex items-center p-2 border-b border-gray-200"
              >
                {result.media[0] && (
                  <img
                    src={result.media[0].url}
                    alt={result.media[0].alt}
                    className="h-10 w-14 object-cover rounded-md my-1 mr-4"
                  />
                )}
                <h1 className="text-lg font-medium first-letter:capitalize">
                  {result.title}
                </h1>
              </Link>
            ))
          ) : (
            <div>
              {searchQuery ? (
                <div>No results found for "{searchQuery}"</div>
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
