"use client";

import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import toast from "react-hot-toast";

import editUserBioAction from "@/app/actions/editUserBioAction";
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

interface UserBioProps {
  bio: string;
}

const initialState = {
  bio: "",
};

export default function UserBio({ userName }: { userName: string }) {
  const [user, setUser] = useState<UserBioProps | null>(null);
  const [changeBio, setChangeBio] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const [state, formAction] = useFormState(editUserBioAction, initialState);

  const toggleChangeBio = () => {
    setChangeBio(!changeBio);
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
      changeBio && setChangeBio(false);
    }
  }, [state.success]);

  if (loading) return <div className="pt-10">Loading...</div>;

  return (
    <div className="border-b pb-4">
      <form className="flex flex-col" action={formAction}>
        <input type="hidden" name="name" value={userName} />
        <div className="text-sm mb-2 uppercase">Bio</div>
        <label className="text-xl mb-4">{user?.bio}</label>
        {changeBio && (
          <div className="">
            <input
              type="text"
              name="bio"
              placeholder="Enter new bio"
              className="bg-bg border-b border-slate-500 placeholder:text-sm w-full  rounded-none focus:outline-none"
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
  );
}
