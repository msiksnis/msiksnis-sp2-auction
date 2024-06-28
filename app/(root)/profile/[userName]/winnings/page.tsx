import { Metadata } from "next";
import { format } from "date-fns";
import { cookies } from "next/headers";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: { userName: string };
}): Promise<Metadata> {
  const userName = params.userName;

  return {
    title: `Auction House | ${userName}'s Winnings`,
  };
}

interface Win {
  id: string;
  title: string;
  media: {
    url: string;
    alt: string;
  }[];
  endsAt: string;
}

export default async function Page({
  params,
}: {
  params: { userName: string };
}) {
  const accessToken = cookies().get("accessToken")?.value;

  const url = process.env.API_PROFILES + `/${params.userName}?_wins=true&`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": process.env.API_KEY || "",
      "Content-Type": "application/json",
    },
  });
  const { data } = await res.json();

  console.log(data);

  const { wins } = data as { wins: Win[] };

  return (
    <div className="mt-10 md:mt-14 px-6 md:px-10">
      <h1 className="text-2xl md:text-3xl font-medium">My winnings</h1>
      <div className="mt-6 md:mt-10">
        {wins.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
            {wins.map((win) => (
              <Link href={`/listing/${win.id}`} key={win.id}>
                {win.media.length > 0 && (
                  <div className="w-full h-52 overflow-hidden rounded-lg mb-4">
                    <img
                      src={win.media[0].url}
                      alt={win.media[0].alt}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                <h3 className="text-lg font-semibold mb-2">{win.title}</h3>
                <p className="text-sm text-gray-500">
                  Won on: {format(new Date(win.endsAt), "dd/MM/yyyy")}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            You have not won any listings yet.
          </p>
        )}
      </div>
    </div>
  );
}
