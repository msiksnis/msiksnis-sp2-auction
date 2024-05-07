"use client";

import { useState, useRef } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";

import { UserProps } from "./Navbar";
import LogoutButton from "./LogoutButton";
import NewListingModal from "./modals/NewListingModal";

export default function UserButton({ name, avatar }: UserProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {isModalOpen && <NewListingModal closeModal={closeModal} />}
      <div className="relative">
        <div ref={menuRef} onClick={toggleMenu}>
          <img
            src={avatar}
            alt="avatar"
            className="hidden md:block hover:-rotate-[10deg] transition-all duration-300 ring-1 ring-slate-900 rounded-full size-10 cursor-pointer"
          />
        </div>
        <div className="absolute top-14 right-0 overflow-hidden z-20">
          <div
            className={
              isUserMenuOpen
                ? "translate-x-0 transition-all duration-200"
                : "translate-x-40 transition-all duration-200"
            }
          >
            <div className="whitespace-nowrap font-medium bg-white rounded-md p-2">
              <div className="text-cente py-2 max-w-32 truncate">{name}</div>
              <div className="flex flex-col space-y-1 border-t border-slate-800">
                <Link href={`/profile/${name}`} className="mt-2 link py-1">
                  Profile
                </Link>
                <Link href="/my-listings" className="link py-1">
                  My Listings
                </Link>
                <Link href="/my-winnings" className="link py-1">
                  My Winnings
                </Link>
                <Link href="/my-active-bids" className="link py-1">
                  My Active Bids
                </Link>
                <button
                  onClick={openModal}
                  className="flex items-center link py-1"
                >
                  <Plus className="size-5 pr-1" /> New Listing
                </button>
              </div>
              <div className="border-t mt-2 border-slate-800 pt-1">
                <LogoutButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
