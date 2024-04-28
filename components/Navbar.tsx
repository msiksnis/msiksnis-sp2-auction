import Link from "next/link";
import { cookies } from "next/headers";
import Image from "next/image";
import { Search } from "lucide-react";

import MobileMenu from "./MobileMenu";
import UserButton from "./UserButton";
import NavLinks from "./NavLinks";

export type UserProps = {
  name?: string;
  avatar?: string;
};

export default function Navbar() {
  const isLoggedIn = cookies().get("accessToken");
  const userName = cookies().get("userName");
  const userAvatar = cookies().get("userAvatar");

  const name = userName?.value;
  const avatar = userAvatar?.value;

  return (
    <div className="flex justify-between items-center md:py-5 px-6 md:px-4 lg:px-10">
      <NavLinks />
      <Link href="/">
        <Image
          src="/assets/logo_m.svg"
          alt="logo"
          priority
          width={150}
          height={100}
          className="scale-75 md:scale-100 -ml-6 sm:ml-0 lg:-ml-6 w-auto"
        />
      </Link>
      <div className="flex items-center space-x-4 xl:space-x-10">
        <div className="hidden md:block relative cursor-pointer group">
          <div className="hidden xl:flex items-center w-36 text-sm text-gray-500 bg-gray-100 h-10 px-4 rounded-full placeholder:text-sm placeholder:font-light">
            Search...
          </div>
          <div className="xl:hidden size-9 bg-gray-100 rounded-full border"></div>
          <Search className="absolute right-2 xl:right-4 top-2 xl:top-3 size-5 opacity-60 group-hover:scale-105 group-hover:opacity-100 transition-all duration-300" />
        </div>
        {isLoggedIn ? (
          <>
            <div className="hidden md:block">
              <UserButton name={name} avatar={avatar} />
            </div>
            <div className="md:hidden">
              <MobileMenu name={name} avatar={avatar} />
            </div>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="xl:pl-4 whitespace-nowrap hover:underline underline-offset-2 text-sm md:text-base text-slate-950 transition-all"
            >
              Log in
            </Link>
            <button className="rounded-full bg-slate-950 py-1 px-2 md:h-9 md:px-4 lg:px-6 xl:px-8 text-sm md:text-base text-white whitespace-nowrap shadow hover:bg-slate-800 transition-all">
              <Link href="/signup">Sign up</Link>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
