import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ handle: null }, { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db("Linktree");

//   find user
  const user= await db.collection("users").findOne(
    {email: session.user.email}
  )
  if(!user){
    return NextResponse.json(
        {handle:null}
    )
  }

  const linkDoc = await db.collection("links").findOne({
    userId: user._id.toString(),
  });

  return Response.json({
    handle: linkDoc?.handle || null
  });
}