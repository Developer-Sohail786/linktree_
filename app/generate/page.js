import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Generate from "./GenerateClient";

export default async function GeneratePage(){
    const session=await getServerSession(authOptions)
    if(!session){
        redirect("/login?callbackUrl=/generate")
    }
    return <Generate />
}