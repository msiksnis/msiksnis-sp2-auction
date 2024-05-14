"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import NewListingModal from "@/components/modals/new-listing/NewListingModal";
import { Button } from "@/components/Button";

export default function NewListingButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {isModalOpen && <NewListingModal closeModal={closeModal} />}
      <div className="mt-1">
        <Button onClick={openModal}>
          <Plus className="size-5 md:mr-2" />
          <span className="hidden md:block">New lisiting</span>
        </Button>
      </div>
    </>
  );
}
