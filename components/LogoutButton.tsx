"use client";

import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const res = await fetch("/api/logout", {
      method: "POST",
    });

    if (res.ok) {
      router.refresh();
    } else {
      alert("Logout failed");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="hover:underline underline-offset-2 w-full text-left"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
