"use client";

import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Input from "../Input";

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
    <>
      <div className="fixed inset-0 z-50 bg-black/80">
        <div ref={modalRef} className="w-auto my-10 mx-auto max-w-2xl">
          <div className="border border-slate-900 rounded-lg p-4 shadow-lg flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between">
              <div className="text-xl">New Listing</div>
              <button
                onClick={closeModal}
                className="rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none"
              >
                <X size={20} />
                <span className="sr-only">Close</span>
              </button>
            </div>

            <form className="my-10">
              <label className="text-sm">Email</label>
              <Input
                type="email"
                name="email"
                placeholder="Enter your email address"
                aria-label="Email"
                className="invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              />
            </form>
            <div className="flex items-center justify-end">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                type="button"
              >
                Close
              </button>
              <button
                className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                type="button"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
