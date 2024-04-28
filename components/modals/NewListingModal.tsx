"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

import Input from "../Input";
import { Button } from "../Button";

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

            <form className="my-10">
              <Input
                type="email"
                name="email"
                placeholder="Enter your email address"
                aria-label="Email"
                className="invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              />
            </form>
            <div className="flex items-center justify-end space-x-2">
              <Button variant="secondary" size="full" onClick={closeModal}>
                Close
              </Button>
              <Button size="full">Submit</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
