"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/Button";

export default function NoToken({ seller }: { seller: string }) {
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(encodeURIComponent(window.location.href));
  }, []);

  return (
    <div className="flex items-center border-t mt-20 pt-10 md:pt-20 text-lg font-medium">
      <Link href={`/login?redirect=${currentUrl}`}>
        <Button variant="link" className="px-0 text-lg">
          Log in
        </Button>
      </Link>
      &nbsp;to see more from {seller}
    </div>
  );
}
