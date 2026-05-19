"use client"

import Image from "next/image"
import { ToastContainer, toast } from 'react-toastify';
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";




const Generate = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [links, setlinks] = useState([{ link: "", linktext: "" }])
  const [handle, sethandle] = useState(searchParams.get('handle'))
  const [desc, setdesc] = useState("")
  const [selectedFile, setselectedFile] = useState(null)
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState(null);



  const handleChange = (index, link, linktext) => {
    setlinks((initialLinks) => {
      return initialLinks.map((item, i) => {
        if (i == index) {
          return { link, linktext }
        }
        else {
          return item
        }
      })
    })
  }

  const addLink = () => {
    setlinks(links.concat([{ link: "", linktext: "" }]))
  }
  const submitLinks = async () => {

    if (loading) return;   // to double click
    setLoading(true);

    if (!selectedFile) {
      toast.error("Please upload a profile picture");
      return;
    }

    if (!handle || handle.length < 3) {
      toast.error("Handle must be at least 3 characters");
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(handle)) {
      toast.error("Handle can only contain letters, numbers and underscore");
      return;
    }

    if (!links.length || !links[0].linktext) {
      toast.error("At least one link is required");
      return;
    }


    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "linktree_Profiles");

    const cloudResponse = await fetch(
      "https://api.cloudinary.com/v1_1/dxhlhbrfv/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const cloudData = await cloudResponse.json();

    if (!cloudData.secure_url) {
      toast.error("Image upload failed");
      return;
    }

    const imageUrl = cloudData.secure_url;

    for (let item of links) {
      try {
        const url = new URL(item.link);

        if (url.protocol !== "http:" && url.protocol !== "https:") {
          toast.error("Only http or https URLs are allowed");
          return;
        }

      } catch {
        toast.error("Please enter a valid URL");
        return;
      }
    }
    const res = await fetch("/api/tree", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        links,
        handle,
        pic: imageUrl,
        desc,
      }),
    });

    const result = await res.json();

    if (result.success) {
      toast.success(result.message);
      router.push("/dashboard");
    } else {
      toast.error(result.message);
    }
  };

  const optimizeWithAI = async () => {

    try {

      if (!desc.trim() && !links.length) {
        return;
      }

      setAiLoading(true);

      const response = await fetch("/api/ai-optimize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          desc,
          links: links.map((item) => ({
            title: item.linktext,
          })),
        }),
      });

      const data = await response.json();
      console.log(data);

      if (data.success) {

        setAiSuggestions(data.data);

      }
      else{
        toast.error(data.message)
      }

    } catch (error) {

    toast.error(
  "AI service unavailable right now due to high traffic"
);

    } finally {

      setAiLoading(false);
    }
  };
  return (
    <>
      <div className='bg-[#E9C0E9] min-h-screen grid grid-cols-1 lg:grid-cols-2'>


        <div className='col1 text-gray-700 flex items-center justify-center flex-col px-4 lg:px-0'>

          <h1 className="font-bold text-3xl lg:text-4xl my-6 lg:my-8 text-center">
            Create your linktree
          </h1>

          <div className="inputs flex flex-col gap-5 w-full max-w-xl">


            <div className="item">
              <h2 className="font-semibold text-xl lg:text-2xl">
                Claim your Handle
              </h2>

              <div className="mx-0 lg:mx-4">
                <input
                  value={handle || ""}
                  onChange={e => sethandle(e.target.value)}
                  className="bg-white px-4 py-2 focus:outline-pink-500 rounded-full my-2 w-full lg:w-auto lg:relative lg:right-6"
                  type="text"
                  placeholder="Choose a Handle"
                />
              </div>
            </div>

            <div className="item">
              <h2 className="font-semibold text-xl lg:text-2xl">
                Add links
              </h2>

              {links && links.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="mx-0 lg:mx-4 flex flex-col lg:block"
                  >
                    <input
                      value={item.link || ""}
                      onChange={e => handleChange(index, e.target.value, item.linktext)}
                      className="bg-white px-4 py-2 focus:outline-pink-500 rounded-full my-2 w-full lg:w-auto lg:mx-2 lg:relative lg:right-6"
                      type="text"
                      placeholder="Enter link"
                    />

                    <input
                      value={item.linktext || ""}
                      onChange={e => handleChange(index, item.link, e.target.value)}
                      className="bg-white px-4 py-2 focus:outline-pink-500 rounded-full my-2 w-full lg:w-auto"
                      type="text"
                      placeholder="Enter link text"
                    />


                  </div>
                )
              })}
              <button
                onClick={() => addLink()}
                className="border bg-slate-800 text-white px-4 py-2 rounded-full my-2 lg:mx-2 cursor-pointer w-fit"
              >
                + Add Link
              </button>

              <button
                type="button"
                onClick={optimizeWithAI}
                disabled={aiLoading}
                className="border bg-purple-600 text-white px-4 py-2 rounded-full my-2 cursor-pointer w-fit hover:bg-purple-700 disabled:opacity-50"
              >
                {
                  aiLoading
                    ? "Optimizing..."
                    : " Optimize With AI"
                }
              </button>
           {
  aiSuggestions && (
    <div className="mt-6 rounded-3xl border border-purple-200 bg-gradient-to-br from-white to-purple-50 p-6 shadow-xl">

      {/* TOP */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
             AI Suggestions
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Review AI improvements before applying changes
          </p>
        </div>

        <div className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold w-fit">
          AI Powered
        </div>

      </div>

      {/* BIO SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">

        {/* BEFORE */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

          <p className="text-sm font-semibold text-gray-400 mb-3">
            Current Bio
          </p>

          <p className="font-medium text-gray-800">
            {desc}
          </p>

        </div>

        {/* AFTER */}
        <div className="bg-gradient-to-r from-purple-100 to-indigo-100 border border-purple-300 rounded-2xl p-5 shadow-sm">

          <p className="text-sm font-semibold text-purple-600 mb-3">
            AI Optimized Bio
          </p>

          <p className="font-medium text-gray-800">
            {aiSuggestions.bio}
          </p>

        </div>

      </div>

      {/* LINKS */}
      <div className="space-y-4">

        {
          links.map((item, index) => (

            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >

              {/* BEFORE */}
              <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">

                <p className="text-xs text-gray-400 mb-2">
                  Current Title
                </p>

                <p className="font-medium text-gray-800">
                  {item.linktext}
                </p>

              </div>

              {/* AFTER */}
              <div className="bg-gradient-to-r from-purple-100 to-indigo-100 border border-purple-300 rounded-2xl p-4 shadow-sm">

                <p className="text-xs text-purple-500 mb-2">
                  AI Suggested Title
                </p>

                <p className="font-medium text-gray-800">
                  {aiSuggestions.links[index]?.title}
                </p>

              </div>

            </div>
          ))
        }

      </div>

      {/* APPLY BUTTON */}
      <div className="mt-6 flex justify-end">

        <button
          type="button"
          onClick={() => {

            setdesc(aiSuggestions.bio);

            setlinks((prev) =>
              prev.map((item, index) => ({
                ...item,
                linktext:
                  aiSuggestions.links[index]?.title || item.linktext,
              }))
            );

            setAiSuggestions(null);
          }}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
        >
           Apply AI Changes
        </button>

      </div>

    </div>
  )
}
            </div>


            <div className="item">
              <h2 className="font-semibold text-xl lg:text-2xl">
                Add picture and finalize
              </h2>

              <div className=" flex flex-col gap-2">
                <input
                  type="file"
                  accept="image/*"
                  id="profileUpload"
                  className="hidden"
                  onChange={(e) => setselectedFile(e.target.files[0])}
                />

                <label
                  htmlFor="profileUpload"
                  className="bg-white px-4 py-2 rounded-full cursor-pointer w-1/2 text-center border-none"
                >
                  {selectedFile ? selectedFile.name : "Upload Profile Picture"}
                </label>

                <input
                  value={desc}
                  onChange={e => setdesc(e.target.value)}
                  className="bg-white relative left-[-12] px-4 py-2 focus:outline-pink-500 rounded-full my-2 w-full lg:w-auto lg:mx-2 lg:relative lg:right-6"
                  type="text"
                  placeholder="Enter description"
                />

                <button
                  disabled={loading || !selectedFile || !handle || !links.length || !links[0].linktext}
                  onClick={submitLinks}
                  className="disabled:bg-slate-500 border-none bg-slate-800 text-white px-6 py-2 rounded-full my-5 cursor-pointer w-7/12 lg:w-fit lg:relative lg:right-6"
                >
                  {loading ? "Creating..." : "Create your Link Tree"}
                </button>
              </div>
            </div>

          </div>
        </div>


        <div className='col2 hidden lg:block h-screen bg-[#E9C0E9]'>
          <Image
            className="h-full object-contain"
            src="https://raw.githubusercontent.com/CodeWithHarry/Sigma-Web-Dev-Course/refs/heads/main/Video%20137/linktree-clone/public/generate.png"
            alt="Generate"
            width={600}
            height={600}
          />
        </div>

      </div>

      <ToastContainer />
    </>
  )
}

export default Generate
