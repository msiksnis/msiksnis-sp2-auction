"use client";

import { useState } from "react";

import { Button } from "@/components/Button";
import Input from "@/components/Input";
import DayPickerComponent from "./DatePicker";
import { formatISO } from "date-fns";
import { MinusCircle, PlusCircle } from "lucide-react";

type ListingFormProps = {
  onSubmit: (data: {
    title: string;
    description: string;
    tags: string[];
    media: Array<{ url: string; alt: string }>;
    date: string;
  }) => void;
  closeModal: () => void;
};

export default function ListingForm({
  onSubmit,
  closeModal,
}: ListingFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [tags, setTags] = useState([""]);
  const [media, setMedia] = useState([{ url: "" }]);

  const utcDate = new Date(
    (date ?? new Date()).getTime() -
      (date ?? new Date()).getTimezoneOffset() * 60000
  );
  const formattedDate = utcDate.toISOString();

  console.log("Selected date", formattedDate);

  const handleMediaChange = (index: number, value: string) => {
    const newMedia = [...media];
    newMedia[index].url = value;
    setMedia(newMedia);
  };

  const addMedia = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (media.length < 8) {
      setMedia([...media, { url: "" }]);
    } else {
      alert("You cannot add more than 8 images.");
    }
  };

  const removeMedia = (index: number) => {
    setMedia(media.filter((_, i) => i !== index));
  };

  return (
    <form className="p-4">
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
            value={description}
            name="description"
            placeholder="Description"
            aria-label="Description"
          />
        </div>
        <Input type="text" name="tags" placeholder="Tags" aria-label="Tags" />
        {media.map((item, index) => (
          <div key={index} className="relative space-y-2">
            <Input
              value={item.url}
              onChange={(e) => handleMediaChange(index, e.target.value)}
              type="text"
              name={`mediaUrl-${index}`}
              placeholder="Image URL"
              aria-label="Image URL"
            />
            {index > 0 && (
              <div className=" absolute top-[1.8rem] right-2 bg-white cursor-pointer">
                <MinusCircle
                  onClick={() => removeMedia(index)}
                  className="size-5 opacity-70 hover:opacity-100 transition-all duration-200"
                />
              </div>
            )}
          </div>
        ))}
        {media.length < 8 && (
          <Button
            variant="outline"
            size="sm"
            className="text-sm"
            onClick={addMedia}
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
        <Button size="full">Create</Button>
      </div>
    </form>
  );
}
