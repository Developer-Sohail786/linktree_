'use client'

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [text, settext] = useState("")
  const router = useRouter()

  const createTree = () => {
    if (!text.trim()) return
    router.push(`/generate?handle=${text}`)
  }

  return (
    <main>
      <section className="bg-[#254f1a] min-h-screen grid grid-cols-1 lg:grid-cols-2 px-6 sm:px-10 md:px-16 lg:px-[10vw] py-16 items-center">

        {/* LEFT COLUMN */}
        <div className="flex justify-center flex-col gap-4 text-center lg:text-left">

          <p className="text-yellow-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold">
            Everything you
          </p>

          <p className="text-yellow-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold">
            are. In one,
          </p>

          <p className="text-yellow-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold">
            simple link in bio
          </p>

          <p className="text-yellow-300 text-base sm:text-lg md:text-xl mt-2">
            Join 50M+ people using LinkTree...
          </p>

          {/* INPUT + BUTTON */}
          <div className="input-btn flex flex-col sm:flex-row gap-3 mt-6 w-full sm:w-auto">

            <input
              value={text}
              onChange={(e) => settext(e.target.value)}
              className="px-4 py-3  focus:outline-green-800 rounded-md bg-white text-black w-1/2 sm:w-1/2"
              type="text"
              placeholder="Enter your handle"
            />

            <button
              onClick={createTree}
              className="bg-pink-300 cursor-pointer rounded-full px-6 py-3 font-semibold w-1/2 sm:w-1/2">
              Claim your Tree
            </button>

          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex items-center justify-center mt-10 lg:mt-0">
          <Image
            src="https://raw.githubusercontent.com/CodeWithHarry/Sigma-Web-Dev-Course/refs/heads/main/Video%20137/linktree-clone/public/home.png"
            alt="hero image"
            width={500}
            height={300}
            className="w-[80%] sm:w-[70%] md:w-[60%] lg:w-125 h-auto"/>
        </div>

      </section>
    </main>
  );
}