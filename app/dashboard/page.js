import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

import clientPromise from "@/lib/mongodb";
import DashboardComponent from "./dashboard-component";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions)
    if (!session) {
        redirect("/login")
    }

    const client = await clientPromise
    const db = client.db("Linktree")

    const tree = await db.collection("links")
        .find({ userId: session.user.id })
        .sort({ createdAt: -1 })
        .limit(1)
        .next();

    return (
  <DashboardComponent
    tree={JSON.parse(JSON.stringify(tree))}
    handle={tree?.handle}
  />
);
}