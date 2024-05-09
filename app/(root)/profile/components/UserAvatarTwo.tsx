"use client";

import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import toast from "react-hot-toast";

import { Button } from "@/components/Button";
import editUserAvatarAction from "@/app/actions/editUserAvatarAction";

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

interface UserAvatarProps {
  avatar: {
    url: string;
  };
}

const initialState = {
  avatar: "",
  state: {
    success: false,
    message: "",
  },
};

export default function UserAvatar({ userName }: { userName: string }) {
  const [user, setUser] = useState<UserAvatarProps | null>(null);
  const [changeAvatar, setChangeAvatar] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const [state, formAction] = useFormState(editUserAvatarAction, initialState);

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
  }, [userName, state.success]);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      changeAvatar && setChangeAvatar(false);
    }
  }, [state.success]);

  if (loading) return <div className="pt-10">Loading...</div>;

  return (
    <>
      <div className="">
        <div className="border-b pb-4">
          <form action={formAction}>
            <input type="hidden" name="name" value={userName} />
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
                    name="avatarUrl"
                    placeholder="Enter new avatar URL"
                    className="bg-bg border-b border-slate-700 placeholder:text-sm w-full rounded-none focus:outline-none"
                  />
                  <input type="hidden" name="avatarAlt" value="Users Avatar" />
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
      </div>
    </>
  );
}
