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
                  disabled={!selectedFile || !handle || !links.length || !links[0].linktext}
                  onClick={() => submitLinks()}
                  className="disabled:bg-slate-500 border-none bg-slate-800 text-white px-6 py-2 rounded-full my-5 cursor-pointer w-7/12 lg:w-fit lg:relative lg:right-6"
                >
                  Create your Link Tree
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