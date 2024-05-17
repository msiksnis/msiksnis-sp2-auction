"use client";

import { useEffect, useState } from "react";
import { Rotate as Hamburger } from "hamburger-react";
import Link from "next/link";
import { Plus } from "lucide-react";

import { UserProps } from "./Navbar";
import NewListingModal from "./modals/new-listing/NewListingModal";
import { LogoutButton } from "./LogoutButton";
import { Button } from "./Button";

export default function MobileMenu({ name, avatar }: UserProps) {
  const [isOpen, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMenu = () => setOpen(!isOpen);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <>
      <Hamburger toggled={isOpen} toggle={setOpen} rounded />
      {isOpen && (
        <div className="fixed inset-0 top-20 flex flex-col items-start h-screen whitespace-nowrap font-medium bg-bg z-50 pt-10 px-6">
          <div className="flex justify-between items-end w-full">
            <div className="text-xl py-2">{name}</div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                openModal();
                toggleMenu();
              }}
              className="mb-2"
            >
              <Plus className="size-5 pr-1" />
              New Listing
            </Button>
          </div>
          <div className="flex flex-col space-y-1 text-lg border-t border-slate-800 w-full">
            <Link
              href={`/profile/${name}`}
              className="mt-10 link py-1"
              onClick={toggleMenu}
            >
              Profile
            </Link>
            <Link
              href={`/profile/${name}/listings`}
              className="link py-1"
              onClick={toggleMenu}
            >
              My Listings
            </Link>
            <Link
              href={`/profile/${name}/winnings`}
              className="link py-1"
              onClick={toggleMenu}
            >
              My Winnings
            </Link>
            <Link
              href={`/profile/${name}/active-bids`}
              className="link py-1"
              onClick={toggleMenu}
            >
              My Active Bids
            </Link>
            <Link
              href={`/profile/${name}/favorites`}
              className="link py-1"
              onClick={toggleMenu}
            >
              My Favorites
            </Link>
          </div>
          <div className="py-2 mt-10 border-t border-slate-800 w-full">
            <LogoutButton size="large">Log out</LogoutButton>
          </div>
        </div>
      )}
      {isModalOpen && <NewListingModal closeModal={closeModal} />}
    </>
  );
}
