import Link from "next/link";
import { cookies } from "next/headers";

import Image from "next/image";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
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
    <div className="flex justify-between items-center md:py-5 px-6 md:px-10">
      <NavLinks />
      <Link href="/">
        <Image
          src="/assets/logo_m.svg"
          alt="logo"
          priority
          width={150}
          height={100}
          className="scale-75 md:scale-100 -ml-6 w-auto"
        />
      </Link>
      <div className="flex items-center space-x-10">
        <div className="hidden md:block relative">
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-100 h-10 px-4 rounded-full placeholder:text-sm placeholder:font-light"
          />
          <MagnifyingGlassIcon className="absolute right-4 top-3 size-5 opacity-60" />
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
              className="pl-4 whitespace-nowrap hover:underline underline-offset-2"
            >
              Log in
            </Link>
            <button className="rounded-full bg-slate-950 h-10 px-8 text-white whitespace-nowrap shadow hover:bg-slate-800 transition-all">
              <Link href="/signup">Sign up</Link>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
