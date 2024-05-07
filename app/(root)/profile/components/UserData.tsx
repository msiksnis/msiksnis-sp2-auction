"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";

import { Button } from "@/components/Button";

function SubmitButton() {
  const { pending } = useFormStatus();
  if (pending) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="mt-4 h-6 md:h-8 md:px-6"
        type="submit"
        disabled
      >
        Saving...
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="mt-4 h-6 md:h-8 md:px-6"
      type="submit"
    >
      Save
    </Button>
  );
}

interface User {
  name: string;
  email: string;
  bio: string;
  avatar: {
    url: string;
  };
  credits: number;
}

const initialState = {
  bio: "",
  avatar: "",
};

export default function UserData({
  userName,
  isLoggedIn,
}: {
  userName: string;
  isLoggedIn: boolean;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [changeBio, setChangeBio] = useState<boolean>(false);
  const [changeAvatar, setChangeAvatar] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // const [state, formAction] = useFormState(editUserData, initialState);

  const toggleChangeBio = () => {
    setChangeBio(!changeBio);
  };

  const toggleChangeAvatar = () => {
    setChangeAvatar(!changeAvatar);
  };

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
      <div className="border-b pb-4">
        <form className="">
          <div className="flex items-end">
            <img
              src={user?.avatar.url}
              alt="avatar"
              className="size-24 md:size-36 rounded-full ring ring-black ring-offset-1 mb-4"
            />
            {changeAvatar && (
              <div className="ml-6 flex-grow">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter new avatar URL"
                  className="bg-bg border-b border-slate-700 placeholder:text-sm w-full focus:outline-none"
                />
                <SubmitButton />
              </div>
            )}
            {!changeAvatar && (
              <Button
                variant="ghost"
                onClick={toggleChangeAvatar}
                className="px-0 h-4 ml-6 text-blue-700 hover:bg-bg"
              >
                Change
              </Button>
            )}
          </div>
        </form>
      </div>
      <div className="border-b pb-4">
        <div className="text-sm mb-2 uppercase">Email</div>
        <div className="text-xl">{user?.email}</div>
        <Button variant="link" disabled className="p-0 mt-4">
          Email can't be changed
        </Button>
      </div>
      <div className="border-b pb-4">
        <form className="flex flex-col">
          <div className="text-sm mb-2 uppercase">Bio</div>
          <label className="text-xl mb-4">{user?.bio}</label>
          {changeBio && (
            <div className="">
              <input
                type="text"
                name="name"
                placeholder="Enter new bio"
                className="bg-bg border-b border-slate-500 placeholder:text-sm w-full focus:outline-none"
              />
              <SubmitButton />
            </div>
          )}
        </form>
        {!changeBio && (
          <Button
            variant="ghost"
            onClick={toggleChangeBio}
            className="p-0 text-blue-700 hover:bg-bg"
          >
            Change
          </Button>
        )}
      </div>
    </div>
  );
}
