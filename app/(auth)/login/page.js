import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import LoginPage from "./login-component";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";



export const dynamic = "force-dynamic";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/generate");
  }

  return <LoginPage />;
}