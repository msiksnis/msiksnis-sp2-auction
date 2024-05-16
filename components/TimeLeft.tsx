import { useEffect, useState } from "react";
import useTimeLeft from "@/hooks/useTimeLeft";

export default function TimeLeft({ endsAt }: { endsAt: string }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const timeLeft = useTimeLeft(endsAt);

  if (!isMounted) {
    return null;
  }

  return <div className="mb-1">{timeLeft}</div>;
}
