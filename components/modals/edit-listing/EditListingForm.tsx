"use client";

import { useState } from "react";
import { LoaderCircle, PlusCircle, X } from "lucide-react";
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
  tags: z.array(z.object({ tag: z.string() }).optional()),
  media: z.array(
    z.object({
      url: z.string().url().optional(),
      alt: z.string().optional(),
    })
  ),
});

type ListingFormInputs = z.infer<typeof editListingSchema>;

type EditListingFormProps = {
  closeModal: () => void;
  onSubmit: () => void;
  initialData: Listing;
};

export default function EditListingForm({
  closeModal,
  initialData,
}: EditListingFormProps) {
  const [newTag, setNewTag] = useState("");
  const [newMediaUrl, setNewMediaUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [warningMessage, setwarningMessage] = useState("");

  const router = useRouter();

  const initialState = {
    title: initialData.title || ("" as string),
    description: initialData.description || ("" as string),
    tags: initialData.tags.map((tag) => ({ tag })) || ([] as { tag: string }[]),
    media: initialData.media || ([] as { url: string; alt?: string }[]),
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

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control,
    name: "media",
  });

  const watchAllFields = watch();
  console.log("Watch all fields", watchAllFields);

  const handleAddImage = () => {
    if (imageFields.length < 8) {
      appendImage({ url: "", alt: "" });
    } else {
      setwarningMessage("You cannot add more than 8 media in total.");
    }
  };

  const addMedia = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (imageFields.length < 8) {
      appendImage({ url: newMediaUrl, alt: initialState.title });
      setNewMediaUrl("");
    } else {
      setwarningMessage("You cannot add more than 8 images in total.");
    }
  };

  const removeMedia = (index: number) => {
    removeImage(index);
    setwarningMessage("");
  };

  const onSubmit = async (data: ListingFormInputs) => {
    const transformedData = {
      ...data,
      tags: data.tags.map((tag) => tag?.tag),
    };

    try {
      setIsLoading(true);
      await axios.put(`/api/listings/${initialData.id}`, transformedData);
      router.refresh();
      toast.success("Listing updated successfully.");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
      closeModal();
    }
  };

  const handleAddTag = () => {
    const newTags = newTag
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    newTags.forEach((tag) => appendTag({ tag }));
    setNewTag("");
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

        <div className="pt-2">
          <label className="text-sm font-medium">Description</label>
          <textarea
            rows={2}
            placeholder={initialData.description || "Description"}
            aria-label="Description"
            {...register("description")}
            className={`w-full rounded-md border-0 mt-1 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-sm placeholder:text-slate-400 sm:text-sm sm:leading-6 focus:outline-none focus:border-black focus:ring-1 focus:ring-black invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 ${initialData.description ? "placeholder:text-slate-500" : ""}`}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Tags</label>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-4 mt-2">
            {tagFields.map(({ id, tag }, index) => (
              <div key={id}>
                <div className="relative group inline-block">
                  <div className="rounded-md ring-1 ring-slate-700 text-center px-4 py-1 cursor-default">
                    {tag}
                  </div>
                  <button
                    onClick={() => removeTag(index)}
                    className="opacity-0 group-hover:opacity-100 transition-all duration-200 p-0.5 absolute -top-2.5 -right-2.5 bg-white border rounded-full"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Input
              type="text"
              label=""
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Enter new tag"
              className="rounded-md border-gray-300 p-2"
            />
            <div className="mt-4">
              <Button
                type="button"
                variant="secondary"
                className="border border-slate-500"
                onClick={handleAddTag}
              >
                <PlusCircle className="size-4 mr-2" />
                Add Tag
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <label className="text-sm font-medium">Images</label>
          <div className="grid grid-cols-4 gap-2 pt-2">
            {imageFields.map(({ id, url }, index) => (
              <div key={id} className="relative group">
                <img src={url} className="size-32 rounded-md object-cover" />
                <div className="absolute top-1 right-1 bg-white/70 rounded-full p-0.5 cursor-pointer opacity-50 group-hover:opacity-100 transition duration-300 ease-in-out">
                  <X onClick={() => removeMedia(index)} className="size-4" />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Input
              type="text"
              label=""
              value={newMediaUrl}
              onChange={(e) => setNewMediaUrl(e.target.value)}
              placeholder="Enter image URL"
              className="rounded-md border-gray-300 p-2 mt-2"
              disabled={imageFields.length === 8}
            />
            <div className=" flex items-center mt-4">
              <Button
                type="button"
                variant="secondary"
                className="border border-slate-500"
                onClick={addMedia}
              >
                <PlusCircle className="size-4 mr-2" />
                Add Image
              </Button>
              {warningMessage && (
                <div className="text-amber-600 text-sm ml-4">
                  {warningMessage}
                </div>
              )}
            </div>
          </div>
        </div>
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
