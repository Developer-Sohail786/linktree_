import clientPromise from "@/lib/mongodb"
import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
export async function POST(req) {
    const {linkId, handle}=await req.json()

    if(!linkId || !handle){
        return NextResponse(
            {message:"Invalid"},
            {status:400}
        )
    }
    const client = await clientPromise
    const db= client.db("Linktree")

    await db.collection("links").updateOne(
        {handle, "links._id":new ObjectId(linkId)},
        {$inc:{"links.$.clicks":1}}
    )
    return NextResponse.json({success:true})
}