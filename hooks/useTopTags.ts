import { useMemo } from "react";

interface Listing {
  tags: string[];
}

const useTopTags = (listings: Listing[], count: number = 9): string[] => {
  return useMemo(() => {
    const tagMap: { [tag: string]: number } = {};

    // Gets the frequency of each tag
    listings.forEach((listing) => {
      listing.tags.forEach((tag) => {
        if (tagMap[tag]) {
          tagMap[tag]++;
        } else {
          tagMap[tag] = 1;
        }
      });
    });

    // Converts the tagMap into an array and sorts by frequency
    const sortedTags = Object.entries(tagMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, count)
      .map((item) => item[0]);

    return sortedTags;
  }, [listings, count]);
};

export default useTopTags;
