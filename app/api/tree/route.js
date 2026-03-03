import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";


export async function POST(req) {

    const session=await getServerSession(authOptions)
    if(!session){
        return NextResponse.json(
            {success:false, message:"Unauthorized"},
            {status:401}
        )
    }

    //user is authenticated
    const userId=session.user.id
    
    const {links,handle,pic,desc}= await req.json()

    const client= await clientPromise
    const db= client.db("Linktree")
    const collection= db.collection("links")

    // if the data is already claimed
const normalizedHandle=handle?.trim().toLowerCase()
if(!normalizedHandle){
    return NextResponse.json(
        {success:false,message:"Invalid handle"},
        {status:400}
    )
}
   const existing= await collection.findOne({handle:normalizedHandle})

    if(existing){
        return NextResponse.json({success:false,error:true,message:"Handle is already claimed!"})
    }


  const linksWithId = links.map((l) => ({
  _id: new ObjectId(),
  link: l.link,
  linktext: l.linktext
}))

await collection.insertOne({
  userId,
  handle: normalizedHandle,
  links: linksWithId,
  pic,
  desc,
  createdAt: new Date()
})
  return NextResponse.json(
    {
        success:true,
        error:false,
        message:"Data added"
    }
  )



}