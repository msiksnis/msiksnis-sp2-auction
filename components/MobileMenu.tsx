"use client";

import { useState } from "react";
import { Cross as Hamburger } from "hamburger-react";
import { UserProps } from "./Navbar";

export default function MobileMenu({ name, avatar }: UserProps) {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Hamburger toggled={isOpen} toggle={setOpen} />
      {isOpen && (
        <div className="fixed top-20 left-0 right-0 bg-gray-900 bg-opacity-50 z-50">
          <div className="flex flex-col items-center justify-center h-screen">
            <img src={avatar} alt="avatar" className="rounded-full size-10" />
            <p>{name}</p>
          </div>
        </div>
      )}
    </>
  );
}
