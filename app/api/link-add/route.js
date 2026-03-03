import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return NextResponse.json({
            message: "Unauthorized"
        }, { status: 401 })
    }
    const { link, linktext } = await req.json()

    // server validation

    if (!link || !linktext) {
        return NextResponse.json(
            { message: "All fields required" },
            { status: 400 }
        )
    }
// db conn
    const client = await clientPromise
    const db = client.db("Linktree")

    const newLink = {
        _id: new ObjectId(),
        link,
        linktext,
        click: 0
    };

    const result = await db.collection("links").updateOne(
        {userId: session.user.id},
        {$push:{links: newLink}}
    )

    if(result.modifiedCount===0){
        return NextResponse.json(
            {message:"Tree not found"},
            {status:404}
        )
    }
    return NextResponse.json(
        {success:true, link: newLink}
    )
}