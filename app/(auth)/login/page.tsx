import { cookies } from "next/headers";

import LoginForm from "./components/LoginForm";

export default function Page() {
  const isLoggedIn: any = cookies().get("accessToken");

  const loggedIn = !!isLoggedIn;

  return <LoginForm loggedIn={loggedIn} />;
}
