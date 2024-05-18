import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Button } from "@/components/Button";
import UserAvatar from "./UserAvatar";
import UserBio from "./UserBio";
import { revalidatePath } from "next/cache";

interface User {
  name: string;
  avatar: {
    url: string;
    alt: string;
  };
  email: string;
  bio: string;
  credits: number;
}

export default async function UserData({
  params,
}: {
  params: { userName: string };
}) {
  const isLoggedIn = cookies().get("accessToken") ? true : false;
  const accessToken = cookies().get("accessToken")?.value;

  const url = process.env.API_PROFILES + `/${params!.userName}`;
  const userData = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": process.env.API_KEY || "",
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  if (!isLoggedIn) {
    redirect("/login");
  }

  revalidatePath("/profile");

  const user: User = userData.data;
  return (
    <div className="py-10 space-y-10">
      <div className="border-b pb-4">
        <div className="text-sm mb-2 uppercase">Name</div>
        <h1 className="text-xl">{user?.name}</h1>
        <Button variant="link" disabled className="p-0 mt-4">
          Name can't be changed
        </Button>
      </div>
      <UserAvatar userName={params!.userName} avatar={user?.avatar.url} />
      <div className="border-b pb-4">
        <div className="text-sm mb-2 uppercase">Email</div>
        <div className="text-xl">{user?.email}</div>
        <Button variant="link" disabled className="p-0 mt-4">
          Email can't be changed
        </Button>
      </div>
      <UserBio userName={params!.userName} bio={user?.bio} />
      <div className="border-b pb-4">
        <div className="text-sm mb-2 uppercase">Credits</div>
        <div className="text-xl">{user?.credits}</div>
      </div>
    </div>
  );
}
