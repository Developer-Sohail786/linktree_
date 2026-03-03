import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import RegisterPage from "./register-component";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";




export const dynamic = "force-dynamic";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/generate");
  }

  return <RegisterPage />;
}
