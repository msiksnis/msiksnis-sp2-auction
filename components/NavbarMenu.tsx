"use client";

import { useEffect, useRef, useState } from "react";
import { Rotate as Hamburger } from "hamburger-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Plus } from "lucide-react";

import { UserProps } from "./Navbar";
import { LogoutButton } from "./LogoutButton";
import NewListingModal from "./modals/new-listing/NewListingModal";

export default function NavbarMenu({ name, avatar }: UserProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setOpen(!isOpen);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative">
      {isModalOpen && <NewListingModal closeModal={closeModal} />}
      <Hamburger toggled={isOpen} toggle={setOpen} rounded size={30} />
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 390, damping: 30 }}
          className="border border-slate-800 rounded-md shadow z-20 bg-bg absolute top-20 right-0"
        >
          <div className="whitespace-nowrap font-medium rounded-md py-2 px-6">
            <div className="text-center py-2 max-w-32 truncate">{name}</div>
            <div className="flex flex-col space-y-1 border-t border-slate-800">
              <Link
                href={`/profile/${name}`}
                className="mt-2 link py-1"
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
              <button
                onClick={() => {
                  openModal();
                  toggleMenu();
                }}
                className="flex items-center link py-1"
              >
                <Plus className="size-5 pr-1" /> New Listing
              </button>
            </div>
            <div className="py-2 mt-2 border-t border-slate-800">
              <LogoutButton>Logout</LogoutButton>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
