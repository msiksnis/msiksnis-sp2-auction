"use client";

import { useState } from "react";
import { LoaderCircle, MinusCircle, PlusCircle, X } from "lucide-react";
import toast from "react-hot-toast";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import axios from "axios";

import { Button } from "@/components/Button";
import Input from "@/components/Input";
import { Listing } from "@/types/ListingTypes";

const editListingSchema = z.object({
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
});

type ListingFormInputs = z.infer<typeof editListingSchema>;

type EditListingFormProps = {
  closeModal: () => void;
  onSubmit: () => void;
  initialData: {
    data: Listing;
  };
};

export default function EditListingForm({
  closeModal,
  initialData,
}: EditListingFormProps) {
  const [newTag, setNewTag] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const initialState = {
    title: initialData.data.title || "",
    description: initialData.data.description || "",
    tags: initialData.data.tags.map((tag) => ({ value: tag })),
  };

  const {
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<ListingFormInputs>({
    resolver: zodResolver(editListingSchema),
    defaultValues: initialState,
  });

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control,
    name: "tags",
  });

  console.log("Initial tags:", initialData.data.tags);

  console.log("tagFields:", tagFields);

  // console.log("ListingFormInputs:", getValues());

  const onSubmit = async (data: ListingFormInputs) => {
    console.log("Form data:", data);

    try {
      setIsLoading(true);
      await axios.put(`/api/listings/${initialData.data.id}`, data);
      router.refresh();
      toast.success("Listing updated successfully.");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="p-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-2 mb-10 space-y-4">
        <div>
          <label className="text-sm font-medium">Title</label>
          <input
            type="text"
            placeholder="Title"
            aria-label="Title"
            {...register("title")}
            className={`w-full rounded-md border-0 mt-1 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-sm placeholder:text-slate-400 sm:text-sm sm:leading-6 focus:outline-none focus:border-black focus:ring-1 focus:ring-black invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 ${initialState.title && "placeholder:text-slate-500"}`}
          />
        </div>
        <div className="">
          <label className="text-sm font-medium">Description</label>
          <textarea
            rows={2}
            placeholder={initialData.data.description || "Description"}
            aria-label="Description"
            {...register("description")}
            className={`w-full rounded-md border-0 mt-1 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-sm placeholder:text-slate-400 sm:text-sm sm:leading-6 focus:outline-none focus:border-black focus:ring-1 focus:ring-black invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 ${initialData.data.description ? "placeholder:text-slate-500" : ""}`}
          />
        </div>

        <label className="text-sm font-medium mt-4">Tags</label>
        <div className="flex items-center space-x-3">
          {tagFields.map((tag, index) => (
            <div key={tag.id} className="">
              <div className="relative group">
                <Input
                  {...register(`tags` as const)}
                  defaultValue={tag.value}
                  className="rounded-md border-gray-300"
                />
                <button
                  onClick={() => removeTag(index)}
                  className="opacity-0 group-hover:opacity-100 transition-all duration-300 p-0.5 absolute -top-1 -right-2.5 bg-white border rounded-full"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div>
          <input
            type="text"
            value={newTag.value}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Enter new tag"
            className="rounded-md border-gray-300 p-2"
          />
          <Button
            onClick={() => {
              appendTag(newTag);
              setNewTag(""); // Clear input after adding
            }}
          >
            Add Tag
          </Button>
        </div>

        {errorMessage && (
          <div className="text-red-500 text-sm">{errorMessage}</div>
        )}
      </div>
      <div className="flex space-x-3 mt-auto">
        <Button variant="secondary" size="full" onClick={closeModal}>
          Cancel
        </Button>
        <Button type="submit" size="full">
          {isLoading ? (
            <div className="flex items-center">
              <LoaderCircle className="animate-spin mr-2" />
              Saving...
            </div>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </form>
  );
}
