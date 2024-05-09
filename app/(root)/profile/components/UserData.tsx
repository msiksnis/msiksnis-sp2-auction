"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

import { Button } from "@/components/Button";
import UserAvatar from "./UserAvatar";
import UserBio from "./UserBio";

interface User {
  name: string;
  email: string;
  credits: number;
}

export default function UserData({
  userName,
  isLoggedIn,
}: {
  userName: string;
  isLoggedIn: boolean;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserByName = async () => {
      const res = await fetch(`/api/profile/${userName}`);
      if (!res.ok) {
        throw new Error("User not found!");
      }
      const userData = await res.json();
      setUser(userData);
      setLoading(false);
    };

    fetchUserByName();
  }, [userName]);

  if (!isLoggedIn) {
    redirect("/login");
  }

  if (loading) return <div className="pt-10">Loading...</div>;

  return (
    <div className="py-10 space-y-10">
      <div className="border-b pb-4">
        <div className="text-sm mb-2 uppercase">Name</div>
        <div className="text-xl">{user?.name}</div>
        <Button variant="link" disabled className="p-0 mt-4">
          Name can't be changed
        </Button>
      </div>
      <UserAvatar userName={userName} />
      <div className="border-b pb-4">
        <div className="text-sm mb-2 uppercase">Email</div>
        <div className="text-xl">{user?.email}</div>
        <Button variant="link" disabled className="p-0 mt-4">
          Email can't be changed
        </Button>
      </div>
      <UserBio userName={userName} />
      <div className="border-b pb-4">
        <div className="text-sm mb-2 uppercase">Credits</div>
        <div className="text-xl">{user?.credits}</div>
      </div>
    </div>
  );
}
