import Link from "next/link";
import { cookies } from "next/headers";
import Image from "next/image";

import MobileMenu from "./MobileMenu";
import NavLinks from "./NavLinks";
import { Button } from "./Button";
import NavbarMenu from "./NavbarMenu";
import SearchComponent from "./SearchComponent";

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
      <div className="flex items-center">
        <SearchComponent />
        {isLoggedIn ? (
          <div className="pl-4 xl:pl-10 space-x-4 xl:space-x-10">
            <div className="hidden md:flex space-x-4">
              <img
                src={avatar}
                alt="avatar"
                className="hidden md:block hover:-rotate-[10deg] transition-all duration-300 ring-1 ring-slate-900 rounded-full size-10"
              />
              <div className="-mt-1">
                <NavbarMenu name={name} avatar={avatar} />
              </div>
            </div>
            <div className="md:hidden">
              <MobileMenu name={name} avatar={avatar} />
            </div>
          </div>
        ) : (
          <div className="flex items-center pl-4 space-x-4">
            <Link
              href="/login"
              className="xl:pl-4 whitespace-nowrap hover:underline underline-offset-2 text-sm md:text-base text-slate-950 transition-all"
            >
              Log in
            </Link>
            <Button rounded="full" className="hidden md:block">
              <Link href="/signup">Sign up</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
