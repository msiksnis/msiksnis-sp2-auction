"use client";

import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import toast from "react-hot-toast";

import editUserBioAction from "@/app/actions/editUserBioAction";
import { Button } from "@/components/Button";
import { LoaderCircle } from "lucide-react";

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
        <LoaderCircle className="size-4 mr-2 animate-spin" />
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
  userName: string;
}

const initialState = {
  bio: "",
};

export default function UserBio({ userName, bio }: UserBioProps) {
  const [changeBio, setChangeBio] = useState<boolean>(false);

  const [state, formAction] = useFormState(editUserBioAction, initialState);

  const toggleChangeBio = () => {
    setChangeBio(!changeBio);
  };

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      changeBio && setChangeBio(false);
    }
  }, [state.success]);

  return (
    <div className="border-b pb-4">
      <form className="flex flex-col" action={formAction}>
        <input type="hidden" name="name" value={userName} />
        <div className="text-sm mb-2 uppercase">Bio</div>
        <label className="text-xl mb-4">{bio}</label>
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
