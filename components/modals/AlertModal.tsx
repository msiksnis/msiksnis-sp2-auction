"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "../Button";

interface AlertModalProps {
  isOpen: boolean;
  closeModal: () => void;
  onClose: () => void;
  onConfirm: () => void;
}

export default function AlertModal({
  isOpen,
  closeModal,
  onClose,
  onConfirm,
}: AlertModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

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
        className="w-full max-w-xl overflow-y-auto bg-white border border-slate-900 rounded-lg shadow-lg outline-none focus:outline-none mb-40"
      >
        <div className="flex flex-col p-4">
          <div className="">
            <h2 className="text-xl font-semibold">Delete this listing?</h2>
            <h3 className="text-gray-500">This cannot be undone.</h3>
          </div>
          <div className="flex space-x-2 mt-10">
            <Button size="full" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button size="full" variant="destructive" onClick={onConfirm}>
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
