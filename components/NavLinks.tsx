"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex space-x-10 whitespace-nowrap text-lg">
      <Link
        href="/all-listings"
        className={`relative opacity-70 hover:opacity-100 transition-all duration-200 w-full font-medium pb-0.5 ${
          pathname === "/" ? "opacity-100" : "opacity-70"
        }`}
      >
        All listings
        <div
          className={`${pathname === "/all-listings" ? "active-link" : ""}`}
        />
      </Link>
      <Link
        href="/ending-soon"
        className={`relative opacity-70 hover:opacity-100 transition-all duration-200 w-full font-medium pb-0.5 ${
          pathname === "/" ? "opacity-100" : "opacity-70"
        }`}
      >
        Ending soon
        <div
          className={`${pathname === "/ending-soon" ? "active-link" : ""}`}
        />
      </Link>
      <Link
        href="/new"
        className={`relative opacity-70 hover:opacity-100 transition-all duration-200 w-full font-medium pb-0.5 ${
          pathname === "/" ? "opacity-100" : "opacity-70"
        }`}
      >
        New
        <div className={`${pathname === "/new" ? "active-link" : ""}`} />
      </Link>
    </div>
  );
}
