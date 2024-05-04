import { useState, useEffect } from "react";

function useTimeLeft(endsAt: string): string {
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const end = new Date(endsAt).getTime();
    const timeLeft = end - now;

    if (timeLeft <= 0) {
      return "Auction ended";
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);

    if (days > 0) {
      return `${days} day${days !== 1 ? "s" : ""} left`;
    } else {
      return `Closes in ${hours}h ${minutes}m ${seconds}s`;
    }
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return timeLeft;
}

export default useTimeLeft;
