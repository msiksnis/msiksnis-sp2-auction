"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

import { getTimeLeft } from "@/lib/time-converter";
import { Listing } from "@/types/ListingTypes";
import { Button } from "@/components/Button";
import { Pencil, Trash2 } from "lucide-react";
import AlertModal from "@/components/modals/AlertModal";
import EditListingModal from "@/components/modals/edit-listing/EditListingModal";

const filteringOptions = [
  { value: "all", label: "All" },
  { value: "ending_soon", label: "Ending soon" },
  { value: "active", label: "Active" },
];

interface FilteredDataProps {
  data: Listing[];
  loggedInUser: string;
}

export default function FilteredListings({
  data,
  loggedInUser,
}: FilteredDataProps) {
  const [filteredData, setFilteredData] = useState(data);
  const [selectedLabel, setSelectedLabel] = useState("All");
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isEditListingModalOpen, setIsEditListingModalOpen] = useState(false);
  const [currentListingId, setCurrentListingId] = useState<string | null>(null);

  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const filterParam = searchParams.get("filter");

  // Handles the filter change and updates the URL with the new filter
  const handleFilterChange = (filter: string, label: string): void => {
    setSelectedLabel(label);
    router.push(`/profile/${params.userName}/listings?filter=${filter}`, {
      scroll: false,
    });
  };

  // Filters the data based on the search param and updates the filtered data state
  useEffect(() => {
    switch (filterParam) {
      case "all":
        setFilteredData(data);
        break;
      case "active":
        setFilteredData(
          data?.filter((item) => new Date(item.endsAt) > new Date())
        );
        break;
      case "ending_soon":
        setFilteredData(
          data?.filter(
            (item) =>
              new Date(item.endsAt).getTime() > new Date().getTime() &&
              new Date(item.endsAt).getTime() - new Date().getTime() <=
                24 * 60 * 60 * 1000 // 24 hours
          )
        );
        break;
      default:
        setFilteredData(data);
    }
  }, [filterParam, data]);

  const openAlertModal = (listingId: string | null) => {
    setCurrentListingId(listingId);
    setIsAlertModalOpen(true);
  };

  const closeAlertModal = () => {
    setCurrentListingId(null);
    setIsAlertModalOpen(false);
  };

  const openEditListingModal = (listingId: string | null) => {
    setCurrentListingId(listingId);
    setIsEditListingModalOpen(true);
  };

  const closeEditListingModal = () => {
    setCurrentListingId(null);
    setIsEditListingModalOpen(false);
  };

  const onDelete = () => {
    if (!currentListingId) return;

    const deleteListing = async () => {
      const response = await axios.delete(`/api/listings/${currentListingId}`);
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

    closeAlertModal();
  };

  return (
    <>
      <div className="flex items-center overflow-x-scroll no-scrollbar space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-10 mt-10">
        {filteringOptions.map((option, index) => (
          <Button
            variant="secondary"
            rounded="full"
            key={index}
            value={option.value}
            onClick={() => {
              handleFilterChange(option.value, option.label);
            }}
          >
            {option.label}
          </Button>
        ))}
      </div>
      {!filteredData?.length || !data.length ? (
        <div className="mt-10">No '{selectedLabel}' listings</div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
          {filteredData.map(({ id, title, _count, media, endsAt }, index) => (
            <div key={index} className="relative">
              <Link
                href={`/listing/${id}`}
                className="relative overflow-hidden"
              >
                {media.length > 0 && (
                  <img
                    src={media[0].url}
                    alt={media[0].alt}
                    className="h-52 w-full object-cover bg-slate-100 rounded-lg"
                  />
                )}
                <div className="py-2">
                  <h2 className="text-lg font-semibold overflow-hidden truncate max-w-[85%]">
                    {title}
                  </h2>
                  <p className="absolute top-44 right-2 rounded-full text-sm bg-white border py-0.5 px-3">
                    {_count.bids} bids
                  </p>
                  <p className="text-sm">{getTimeLeft(endsAt)}</p>
                </div>
              </Link>
              {loggedInUser === params.userName && (
                <div className="absolute bottom-1 right-3">
                  <div
                    onClick={() => openEditListingModal(id)}
                    className="size-7 rounded-full hover:bg-slate-100 flex justify-center items-center cursor-pointer"
                  >
                    <Pencil className="size-4 text-green-500" />
                  </div>
                  <div
                    onClick={() => openAlertModal(id)}
                    className="size-7 rounded-full hover:bg-slate-100 flex justify-center items-center cursor-pointer"
                  >
                    <Trash2 className="size-4 text-red-500" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {isAlertModalOpen && (
        <AlertModal
          isOpen={isAlertModalOpen}
          closeModal={closeAlertModal}
          onClose={() => setIsAlertModalOpen(false)}
          onConfirm={onDelete}
        />
      )}
      {isEditListingModalOpen && (
        <EditListingModal
          isOpen={isEditListingModalOpen}
          closeModal={closeEditListingModal}
          onClose={() => setIsEditListingModalOpen(false)}
          id={currentListingId as string}
        />
      )}
    </>
  );
}
