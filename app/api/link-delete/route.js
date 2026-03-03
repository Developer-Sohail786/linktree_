import { getServerSession } from "next-auth";

import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { authOptions } from "../auth/[...nextauth]/route";
import { ObjectId } from "mongodb";

export async function DELETE(req) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { linkId } = await req.json()
   

    const client = await clientPromise
    const db = client.db("Linktree")

   const result = await db.collection("links").updateOne(
  { userId: session.user.id },
  {
    $pull: {
      links: { _id: new ObjectId(linkId) },
    },
  }
);

const tree = await db.collection("links").findOne({
  userId: session.user.id,
});





    return NextResponse.json({ success: true })
}