"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { X } from "lucide-react";

import { Button } from "../../Button";
import EditListingForm from "./EditListingForm";
import Loading from "@/app/loading";
import { Listing } from "@/types/ListingTypes";

interface EditListingModalProps {
  isOpen: boolean;
  closeModal: () => void;
  onClose: () => void;
  id: string;
}

export default function EditListingModal({
  isOpen,
  closeModal,
  id,
}: EditListingModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [listingDetails, setListingDetails] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen && id) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`/api/listings/${id}`);
          setListingDetails(response.data.data);
          setError("");
        } catch (error) {
          console.error("Failed to fetch listing details:", error);
          setError("Failed to fetch listing details");
        }
        setLoading(false);
      };

      fetchData();
    }
  }, [isOpen, id]);

  useEffect(() => {
    setIsMounted(true);

    document.body.style.overflow = "hidden";

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
  }, [closeModal]);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex justify-center items-center p-4">
      <div
        ref={modalRef}
        className="relative w-full max-w-xl min-h-[70vh] max-h-[90vh] overflow-y-auto no-scrollbar bg-white border border-slate-900 rounded-lg shadow-lg outline-none focus:outline-none"
      >
        <div className="flex items-start justify-between p-4 border-b border-slate-200">
          <h2 className="text-xl font-semibold mt-1">Edit listing</h2>
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
        {loading ? (
          <Loading />
        ) : error ? (
          <div className="flex justify-center items-center text-red-500 mt-20">
            {error}
          </div>
        ) : (
          <EditListingForm
            onSubmit={closeModal}
            closeModal={closeModal}
            initialData={listingDetails!}
          />
        )}
      </div>
    </div>
  );
}
