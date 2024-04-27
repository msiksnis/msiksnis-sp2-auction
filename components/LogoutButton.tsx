"use client";

import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const response = await fetch("/api/logout", {
      method: "POST",
    });

    if (response.ok) {
      router.refresh();
    } else {
      alert("Logout failed");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600 transition-colors duration-300"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
