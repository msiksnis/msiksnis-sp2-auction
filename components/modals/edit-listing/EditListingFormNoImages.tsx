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
  tags: z.array(z.object({ tag: z.string() }).optional()),
  images: z.array(
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
  initialData: {
    id: string;
    title: string;
    description: string;
    tags: string[];
    media: { url: string; alt?: string }[];
  };
  appendTag: (tag: string) => void;
  removeTag: (index: number) => void;
  tagFields: { id: string; tag: string }[];
};

export default function EditListingForm({
  closeModal,
  initialData,
}: EditListingFormProps) {
  const [newTag, setNewTag] = useState("");
  const [newImages, setNewImages] = useState<{ url: string; alt: string }[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
    name: "images",
  });

  console.log("Watch images", watch("images"));
  console.log("ListingFormInputs:", getValues());

  const description = watch("description");
  console.log("Current description:", description);
  const title = watch("title");
  console.log("Current title:", title);

  const handleAddImage = () => {
    if (imageFields.length < 8) {
      appendImage({ url: "", alt: "" });
    } else {
      setErrorMessage("You cannot add more than 8 images in total.");
    }
  };

  const addImages = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const totalImages = initialState.media.length + newImages.length;

    if (totalImages < 8) {
      setNewImages([...newImages, { url: "", alt: "" }]);
    } else {
      setErrorMessage("You cannot add more than 8 images in total.");
    }
  };

  const removeImages = (index: number) => {
    removeImage(index);
  };

  const onSubmit = async (data: ListingFormInputs) => {
    console.log("Form data:", data);

    try {
      setIsLoading(true);
      await axios.put(`/api/listings/${initialData.id}`, data);
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
            placeholder={initialData.description || "Description"}
            aria-label="Description"
            {...register("description")}
            className={`w-full rounded-md border-0 mt-1 py-1.5 px-2 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-sm placeholder:text-slate-400 sm:text-sm sm:leading-6 focus:outline-none focus:border-black focus:ring-1 focus:ring-black invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 ${initialData.description ? "placeholder:text-slate-500" : ""}`}
          />
        </div>

        <label className="text-sm font-medium mt-4">Tags</label>
        <div className="flex items-center space-x-3">
          {tagFields.map((field, index) => (
            <div key={field.id} className="">
              <div className="relative group">
                <Input
                  {...register(`tags.${index}` as const)}
                  defaultValue={field.tag}
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
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Enter new tag"
            className="rounded-md border-gray-300 p-2"
          />
          <Button
            onClick={() => {
              appendTag({ tag: newTag });
              setNewTag("");
            }}
          >
            Add Tag
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-2 pt-4">
          {initialState.media.map((media, index) => (
            <div key={index} className="relative group">
              <img
                src={media.url}
                alt={media.alt}
                className="size-32 rounded-md object-cover"
              />
              <div className="absolute top-1 right-1 bg-white/70 rounded-full p-0.5 cursor-pointer opacity-50 group-hover:opacity-100 transition duration-300 ease-in-out">
                <X onClick={() => removeImages(index)} className="size-4" />
              </div>
            </div>
          ))}
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
