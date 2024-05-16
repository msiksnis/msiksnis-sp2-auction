import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import LoginForm from "./components/LoginForm";

export default function Page() {
  const isLoggedIn: any = cookies().get("accessToken");

  if (isLoggedIn) {
    redirect("/");
  }

  return <LoginForm />;
}
