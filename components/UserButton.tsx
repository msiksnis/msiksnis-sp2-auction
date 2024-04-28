"use client";

import { useState, useRef, useEffect } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";

import { UserProps } from "./Navbar";
import LogoutButton from "./LogoutButton";

export default function UserButton({ name, avatar }: UserProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !(menuRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setIsOpen(false); // It will close the menu if the click is outside the menu
      }
    };

    // Binds the event listener to the document
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbinds the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef} onClick={toggleMenu} className="relative">
      <img
        src={avatar}
        alt="avatar"
        className="hidden md:block hover:-rotate-[10deg] transition-all duration-300 ring-1 ring-slate-900 rounded-full size-10 cursor-pointer"
      />
      <div className="absolute top-14 right-0 overflow-hidden z-20">
        <div
          className={
            isOpen
              ? "translate-x-0 transition-all duration-200"
              : "translate-x-40 transition-all duration-200"
          }
        >
          <div className="whitespace-nowrap font-medium">
            <div className="text-cente py-2">{name}</div>
            <div className="flex flex-col space-y-1 border-t border-slate-800">
              <Link href="/profile" className="mt-2 link py-1">
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
              <button className="flex items-center link py-1">
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
  );
}
