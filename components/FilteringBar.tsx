"use client";

import { filteringOptions } from "../lib/filtering-options";
import { Button } from "./Button";

export default function FilteringBar() {
  return (
    <>
      <div className="h-10 flex items-center overflow-x-scroll no-scrollbar space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-10 px-6 md:px-10 md:justify-around">
        {filteringOptions.map((option) => (
          <div key={option.value}>
            <Button variant="secondary" rounded="full" value={option.value}>
              <div className="opacity-70 group-hover:opacity-100 transition-all duration-200">
                {option.label}
              </div>
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}
