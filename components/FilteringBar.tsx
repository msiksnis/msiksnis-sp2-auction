"use client";

import Link from "next/link";
import { filteringOptions } from "../lib/filtering-options";

export default function FilteringBar() {
  return (
    <>
      <div className="h-10 flex items-center overflow-x-scroll no-scrollbar space-x-4 md:space-x-10 px-6 md:px-10 md:justify-around">
        {filteringOptions.map((option) => (
          <div key={option.value}>
            <Link
              href={option.value}
              className="flex text-lg rounded-full px-5 py-1 bg-slate-100 hover:bg-slate-200 transition-all duration-200 group"
            >
              <div className="opacity-70 group-hover:opacity-100 transition-all duration-200">
                {option.label}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
