export type MediaItem = {
  url: string;
  alt: string;
};

export type PersonAvatar = {
  url: string;
  alt: string;
};

export type PersonBanner = {
  url: string;
  alt: string;
};

export type Person = {
  name: string;
  email: string;
  bio: string | null;
  avatar: PersonAvatar;
  banner: PersonBanner;
};

export type Bid = {
  id: string;
  amount: number;
  bidder: Person;
  created: string;
};

export type Listing = {
  id: string;
  title: string;
  description: string;
  media: MediaItem[];
  tags: string[];
  created: string;
  updated: string;
  endsAt: string;
  bids: Bid[];
  seller: Person;
  _count: {
    bids: number;
  };
};

export type ListingsProps = {
  data: Listing[];
};
