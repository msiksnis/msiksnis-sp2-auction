"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import "react-day-picker/dist/style.css";

import { Button } from "../../Button";
import ListingForm from "./NewListingForm";

type NewListingModalProps = {
  closeModal: () => void;
};

export default function NewListingModal({ closeModal }: NewListingModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);

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
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [closeModal]);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex justify-center items-center p-4">
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white border border-slate-900 rounded-lg shadow-lg outline-none focus:outline-none no-scrollbar"
      >
        <div className="flex items-start justify-between p-4 border-b border-slate-200">
          <div className="">
            <h2 className="text-xl font-semibold">New Listing</h2>
            <h3 className="text-gray-500 text-sm">Create a new auction item</h3>
          </div>
          <Button
            onClick={closeModal}
            variant="ghost"
            size="icon"
            rounded="full"
          >
            <X className="size-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        <ListingForm onSubmit={closeModal} closeModal={closeModal} />
      </div>
    </div>
  );
}
