"use client";

import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import toast from "react-hot-toast";
import { LoaderCircle, Pencil, Trash2 } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import axios from "axios";

import { Button } from "@/components/Button";
import { Listing } from "@/types/ListingTypes";
import useTimeLeft from "@/hooks/useTimeLeft";
import bidAction from "@/app/actions/bidAction";
import AlertModal from "@/components/modals/AlertModal";

function SubmitButton() {
  const { pending } = useFormStatus();
  if (pending) {
    return (
      <Button size="full" type="submit" disabled>
        <LoaderCircle className="size-4 mr-2 animate-spin" />
        Placing bid...
      </Button>
    );
  }

  return (
    <Button size="full" type="submit">
      Place bid
    </Button>
  );
}

const inititialState = {
  amount: 0,
  message: null,
};

interface SingleListingProps {
  data: Listing;
  isLoggedIn: boolean;
  userName: string;
}

export default function SingleListing({
  data,
  isLoggedIn,
  userName,
}: SingleListingProps) {
  const [showAllImages, setShowAllImages] = useState(false);
  if (!data) {
    redirect(`/profile/${userName}/listings`);
  }
  const [currentBidInput, setCurrentBidInput] = useState(
    data.bids && data.bids.length > 0 ? data.bids[0].amount + 1 : 0
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [state, formAction] = useFormState(bidAction, inititialState);

  const { id, title, description, media, endsAt, bids } = data;

  const timeLeft = useTimeLeft(endsAt);

  const router = useRouter();

  const bidAmount =
    bids && bids.length > 0 ? Math.max(...bids.map((bid) => bid.amount)) : 0;
  const enterBid = bidAmount + 1;
  const fixedOne = bidAmount + 1;
  const fixedFive = bidAmount + 5;
  const fixedTwenty = bidAmount + 20;

  const singularPluralCredit = bidAmount === 1 ? "credit" : "credits";
  const singularPluralFixedCredit = fixedOne === 1 ? "credit" : "credits";

  const toggleImagesDisplay = () => {
    setShowAllImages(!showAllImages);
  };

  const handleBid = (amount: number) => {
    setCurrentBidInput(amount);
    const inputElement = document.getElementById(
      "amountInput"
    ) as HTMLInputElement;
    if (inputElement && inputElement.form) {
      inputElement.value = amount.toString();
      inputElement.form.requestSubmit();
    }
  };

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
    }

    if (state.error) {
      toast.error(state.error);
    }
  }, [state.success, state.error, state.message]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onDelete = () => {
    if (!id) return;

    const deleteListing = async () => {
      const response = await axios.delete(`/api/listings/${id}`);
      return response.data;
    };

    toast.promise(deleteListing(), {
      loading: "Deleting listing...",
      success: () => {
        router.refresh();
        return "Listing deleted successfully!";
      },
      error: "Something went wrong. Please try again.",
    });

    closeModal();
    redirect("/");
  };

  return (
    <>
      {isModalOpen && (
        <AlertModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          onClose={() => setIsModalOpen(false)}
          onConfirm={onDelete}
        />
      )}

      <div className="grid grid-cols-5 md:gap-x-10 xl:gap-x-20">
        <div className="md:col-span-3">
          <div className="px-20 pb-6">
            <h1 className="text-5xl font-medium">{title}</h1>
            <h2 className="pt-4 text-lg">{description}</h2>
          </div>
          <img
            src={media[0].url}
            alt={media[0].alt}
            className="w-full rounded-md object-fill"
          />
          {showAllImages && (
            <div>
              {media.map(
                (img, index) =>
                  index !== 0 && (
                    <img
                      key={index}
                      src={img.url}
                      alt={img.alt}
                      className="w-full rounded-md object-fill my-4"
                    />
                  )
              )}
            </div>
          )}
          <div className="my-6 flex justify-center">
            {media.length > 1 && (
              <Button
                size="wider"
                variant="outline"
                onClick={toggleImagesDisplay}
              >
                {showAllImages ? "See less" : "See all images"}
              </Button>
            )}
          </div>
        </div>
        <div className="hidden md:block col-span-2">
          <div className="flex justify-between items-end lg:px-10">
            <div className="mb-1">{timeLeft}</div>
            <div className="flex">
              <div className="relative group size-9 rounded-full hover:bg-slate-100 flex justify-center items-center cursor-pointer">
                <Pencil className="size-4 text-green-500" />
                <div className="absolute -top-5 hidden group-hover:block text-xs">
                  Edit
                </div>
              </div>
              <div
                onClick={() => openModal()}
                className="relative group size-9 rounded-full hover:bg-slate-100 flex justify-center items-center cursor-pointer"
              >
                <Trash2 className="size-4 text-red-500" />
                <div className="absolute -top-5 hidden group-hover:block text-xs">
                  Delete
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 border border-gray-300 border-t-2 border-t-black rounded-md py-6 px-4">
            <div className="flex flex-col">
              <div className="uppercase text-sm text-gray-800 font-light">
                Current Bid
              </div>
              <div className="text-xl font-medium">
                {bidAmount} {singularPluralCredit}
              </div>
            </div>
            {isLoggedIn ? (
              <form id="bidForm" className="my-10" action={formAction}>
                <input type="hidden" name="listingId" value={data.id} />
                <input
                  type="hidden"
                  name="amount"
                  id="amountInput"
                  value={currentBidInput}
                />
                <div className="flex flex-col lg:flex-row space-y-4 lg:space-x-4 lg:space-y-0">
                  <input
                    type="button"
                    name="amount"
                    value={`${fixedOne} ${singularPluralFixedCredit}`}
                    onClick={() => handleBid(fixedOne)}
                    placeholder={`${enterBid} ${singularPluralFixedCredit}`}
                    className="flex justify-center w-full rounded-md border border-black h-8 px-3 shadow-sm text-xs font-medium text-center focus:outline-none cursor-pointer hover:bg-slate-100"
                  />
                  <input
                    type="button"
                    name="amount"
                    value={`${fixedFive} ${singularPluralCredit}`}
                    onClick={() => handleBid(fixedFive)}
                    placeholder={`${enterBid} or more credits`}
                    className="flex justify-center w-full rounded-md border border-black h-8 px-3 shadow-sm text-xs font-medium text-center focus:outline-none cursor-pointer hover:bg-slate-100"
                  />
                  <input
                    type="button"
                    name="amount"
                    value={`${fixedTwenty} ${singularPluralCredit}`}
                    onClick={() => handleBid(fixedTwenty)}
                    placeholder={`${enterBid} or more credits`}
                    className="flex justify-center w-full rounded-md border border-black h-8 px-3 shadow-sm text-xs font-medium text-center focus:outline-none cursor-pointer hover:bg-slate-100"
                  />
                </div>
                <div className="my-4 space-y-4">
                  <input
                    type="number"
                    name="amount"
                    onChange={(e) => setCurrentBidInput(Number(e.target.value))}
                    placeholder={`${enterBid} or more credits`}
                    className="w-full rounded-md border-0 mt-1 py-1.5 px-4 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-sm placeholder:text-slate-500 sm:text-sm sm:leading-6 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                  />
                  <SubmitButton />
                </div>
              </form>
            ) : (
              <div className="text-center text-lg mt-10">
                Please log in to place a bid
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
