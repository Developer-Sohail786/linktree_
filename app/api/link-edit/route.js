import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PUT(req) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        )
    }




    const { linkId, link, linktext } = await req.json()

    if (!link || !linktext) {
        return NextResponse.json(
            { message: "All fields required" },
            { status: 400 }
        )
    }

    const client = await clientPromise
    const db = client.db("Linktree")

    const result = await db.collection("links").updateOne(
        { userId: session.user.id, "links._id": new ObjectId(linkId) },
        {
            $set: {
                "links.$.link": link,
                "links.$.linktext": linktext,
            }
        }
    )

    if (result.modifiedCount === 0) {
        return NextResponse.json(
            { message: "Not found" },
            { status: 404 }
        )
    }
    return NextResponse.json(
        { success: true }
    )
}