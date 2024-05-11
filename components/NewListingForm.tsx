"use client";

import { useState } from "react";
import { MinusCircle, PlusCircle } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";
import * as z from "zod";
import { redirect } from "next/navigation";

import DayPickerComponent from "./DatePicker";
import { Button } from "@/components/Button";
import Input from "@/components/Input";
import newListingAction from "@/app/actions/newListingAction";
import toast from "react-hot-toast";

function SubmitButton() {
  const { pending } = useFormStatus();
  if (pending) {
    return (
      <Button size="full" type="submit" disabled>
        Creating...
      </Button>
    );
  }

  return (
    <Button size="full" type="submit">
      Create
    </Button>
  );
}

type ListingFormProps = {
  closeModal: () => void;
  onSubmit: () => void;
};

const initialState = {
  title: "",
  description: "",
  endsAt: "",
  tags: [],
  media: [],
};

export default function ListingForm({ closeModal }: ListingFormProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [images, setImages] = useState([{ url: "", alt: "" }]);

  const [state, formAction] = useFormState(newListingAction, initialState);

  console.log("State:", state);

  const handleImagesChange = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index].url = value;
    setImages(newImages);
  };

  const addImages = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (images.length < 8) {
      setImages([...images, { url: "", alt: "" }]);
    } else {
      alert("You cannot add more than 8 images.");
    }
  };

  const removeImages = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  if (state.success) {
    toast.success(state.message || "Listing created successfully.");
    closeModal();
    redirect("/");
  }

  return (
    <form className="p-4" action={formAction}>
      <div className="mt-2 mb-10 space-y-4">
        <Input
          type="text"
          name="title"
          placeholder="Title"
          aria-label="Title"
          className="invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
        />
        <DayPickerComponent date={date} setDate={setDate} />
        <div className="pt-1">
          <Input
            textarea
            rows={2}
            name="description"
            placeholder="Description"
            aria-label="Description"
          />
        </div>
        <Input type="text" name="tags" placeholder="Tags" aria-label="Tags" />
        {images.map((imageUrl, index) => (
          <div key={index} className="relative space-y-2">
            <Input
              value={imageUrl.url}
              onChange={(e) => handleImagesChange(index, e.target.value)}
              type="text"
              name="images"
              placeholder="Image URL"
              aria-label="Image URL"
            />
            {index > 0 && (
              <div className=" absolute top-[1.8rem] right-2  bg-white pl-2 cursor-pointer">
                <MinusCircle
                  onClick={() => removeImages(index)}
                  className="size-5 opacity-70 hover:opacity-100 transition-all duration-200"
                />
              </div>
            )}
          </div>
        ))}
        {images.length < 8 && (
          <Button
            variant="outline"
            size="sm"
            className="text-sm"
            onClick={addImages}
          >
            <PlusCircle className="size-[1.125rem] mr-2" />
            Add another
          </Button>
        )}
      </div>
      <div className="flex space-x-3">
        <Button variant="secondary" size="full" onClick={closeModal}>
          Cancel
        </Button>
        <SubmitButton />
      </div>
    </form>
  );
}
