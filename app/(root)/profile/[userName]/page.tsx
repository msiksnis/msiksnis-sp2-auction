import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import UserData from "../components/UserData";

export async function generateMetadata({
  params,
}: {
  params: { userName: string };
}): Promise<Metadata> {
  const userName = params.userName;

  return {
    title: `Auction House | ${userName}`,
  };
}

export default function ProfilePage({
  params,
}: {
  params: { userName: string };
}) {
  const isLoggedIn: boolean = cookies().get("accessToken") !== undefined;
  const userName = cookies().get("userName");

  const name = userName?.value;

  if (!isLoggedIn) {
    redirect("/login");
  }

  if (name !== params.userName) {
    return (
      <div className="flex px-6 text-center mt-44 md:mt-60 justify-center items-center">
        This is not your profile. You can view and edit only your own profile.
      </div>
    );
  }

  return (
    <div className="px-6 md:px-10 my-10 md:my-20 max-w-3xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-medium">
        Hello {params.userName}
      </h1>
      <div className="border-t mt-2 md:mt-4">
        <UserData params={params} />
      </div>
    </div>
  );
}
