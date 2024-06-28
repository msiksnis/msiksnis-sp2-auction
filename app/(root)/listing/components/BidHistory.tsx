interface Bid {
  id: string;
  amount: number;
  bidder: {
    name: string;
  };
  created: string;
}

interface BidHistoryProps {
  bids: Bid[];
}

export default function BidHistory({ bids }: BidHistoryProps) {
  return (
    <div className="mt-4 border border-gray-300 border-t-2 border-t-black rounded-md py-6 px-4">
      <div className="">
        <p className="text-lg font-semibold pb-2">Bid History</p>
      </div>
      {bids.map((bid) => (
        <div key={bid.id} className="flex py-0.5">
          <div className="mr-1 font-medium">{bid.amount}</div>
          <div className="mx-1">credits by</div>
          <div className="ml-1 font-medium capitalize">{bid.bidder.name}</div>
        </div>
      ))}
    </div>
  );
}
