"use client";

import { useEffect, useState } from "react";
import { LoaderCircle, MinusCircle, PlusCircle, X } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";
import toast from "react-hot-toast";

import { Button } from "@/components/Button";
import Input from "@/components/Input";
import newListingAction from "@/app/actions/newListingAction";
import { Listing } from "@/types/ListingTypes";

function SubmitButton() {
  const { pending } = useFormStatus();
  if (pending) {
    return (
      <Button size="full" type="submit" disabled>
        <LoaderCircle className="size-4 mr-2 animate-spin" />
        Saving...
      </Button>
    );
  }

  return (
    <Button size="full" type="submit">
      Save
    </Button>
  );
}

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
  const [images, setImages] = useState([
    ...initialData.data.media.map((img) => ({ url: img.url, alt: img.alt })),
  ]);
  const [newImages, setNewImages] = useState<{ url: string; alt: string }[]>(
    []
  );
  const [showImageInputs, setShowImageInputs] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const initialState = {
    title: initialData.data.title || "",
    description: initialData.data.description || "",
    tags: initialData.data.tags || [],
    media: initialData.data.media || [],
  };

  console.log(initialState);

  const [state, formAction] = useFormState(newListingAction, initialState);

  const handleImagesChange = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index].url = value;
    setImages(newImages);
  };

  // const addImages = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   e.preventDefault();
  //   if (images.length < 8) {
  //     setImages([...images, { url: "", alt: "" }]);
  //     setShowImageInputs(true);
  //   } else {
  //     setErrorMessage("You cannot add more than 8 images in total.");
  //   }
  // };

  // const removeImages = (index: number) => {
  //   const filteredImages = images.filter((_, i) => i !== index);
  //   setImages(filteredImages);
  //   setErrorMessage("");
  //   if (filteredImages.length === 0) {
  //     setShowImageInputs(false);
  //   }
  // };
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
    const filteredImages = newImages.filter((_, i) => i !== index);
    setNewImages(filteredImages);
  };

  useEffect(() => {
    if (state.success) {
      toast.success(state.message || "Listing updated successfully.");
      closeModal();
    }
  }, [state.success]);

  return (
    <form className="p-4" action={formAction}>
      <div className="mt-2 mb-10 space-y-4">
        <Input
          type="text"
          name="title"
          label="Title"
          placeholder={initialState.title || "Title"}
          aria-label="Title"
          className={`invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 ${initialState.title && "placeholder:text-slate-500"}`}
        />
        <div className="pt-1">
          <Input
            textarea
            rows={2}
            label="Description"
            name="description"
            placeholder={initialState.description || "Description"}
            aria-label="Description"
            className={initialState.description && "placeholder:text-slate-500"}
          />
        </div>
        <Input
          type="text"
          name="tags"
          placeholder="Tags"
          value={initialState.tags.join(", ")}
          aria-label="Tags"
          className={initialState.tags && "placeholder:text-slate-500"}
        />
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
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            className="text-sm"
            onClick={addImages}
          >
            <PlusCircle className="size-[1.125rem] mr-2" />
            Add another image
          </Button>
          {errorMessage && (
            <div className="text-xs text-red-500">{errorMessage}</div>
          )}
        </div>
        {images.map((image, index) => (
          <div key={index} className="relative space-y-2">
            <Input
              value={image.url}
              onChange={(e) => handleImagesChange(index, e.target.value)}
              type="text"
              name={`images[${index}].url`}
              label=" "
              placeholder="Image URL"
              aria-label="Image URL"
            />
            <div className="absolute top-1 right-2 bg-white pl-2 cursor-pointer">
              <MinusCircle
                onClick={() => removeImages(index)}
                className="size-5 opacity-70 hover:opacity-100 transition-all duration-200"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex space-x-3 mt-auto">
        <Button variant="secondary" size="full" onClick={closeModal}>
          Cancel
        </Button>
        <SubmitButton />
      </div>
    </form>
  );
}
