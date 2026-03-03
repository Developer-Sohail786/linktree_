import clientPromise from "@/lib/mongodb";
import Link from "next/link";
import { notFound } from "next/navigation";
import ClickCount from "./click-count"; // Capitalized

export const dynamic = "force-dynamic";

export default async function Page({ params }) {
  const { handle: rawHandle } = await params;

  if (!rawHandle) return notFound();

  const normalizedHandle = rawHandle.trim().toLowerCase();

  const client = await clientPromise;
  const db = client.db("Linktree");
  const collection = db.collection("links");

  const item = await collection.findOne({ handle: normalizedHandle });

  if (!item) return notFound();
  const serializedLinks = item.links.map((link) => ({
  ...link,
  _id: link._id.toString(),
}));

  return (
    <div className="flex min-h-screen bg-linear-to-b from-purple-100 to-white justify-center items-start pt-24 sm:pt-28 md:pt-32 px-4">
      <div className="photo flex justify-center flex-col items-center gap-4 w-full max-w-md">
        <img
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
          src={item.pic}
          alt="pic from db"
        />

        <span className="font-bold text-lg sm:text-xl text-center">
          @{item.handle}
        </span>

        <span className="w-full max-w-xs sm:max-w-sm text-center text-sm sm:text-base">
          {item.desc}
        </span>

        <ClickCount links={serializedLinks} handle={item.handle} />

     
      </div>
    </div>
  );
}