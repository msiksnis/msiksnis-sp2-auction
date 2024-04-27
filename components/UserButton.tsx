"use client";

import { UserProps } from "./Navbar";

export default function UserButton({ name, avatar }: UserProps) {
  return (
    <>
      <div className="">
        <img
          src={avatar}
          alt="avatar"
          className="hidden md:block rounded-full size-10 cursor-pointer"
        />
      </div>
    </>
  );
}
