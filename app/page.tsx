import Hero from "@/components/Hero";

const url = process.env.API_BASE + "/auction/listings";

export default async function Home() {
  const allListings = await fetch(url);

  const allListingsData = await allListings.json();

  console.log("allListingsData", allListingsData);

  return (
    <div className="">
      <Hero />
    </div>
  );
}
