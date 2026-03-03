
"use client"
import { useState } from "react"
import { useForm } from "react-hook-form";
import { MdEdit, MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function DashboardComponent({ tree, handle }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [links, setlinks] = useState(tree?.links || [])
  const [editingId, seteditingId] = useState(null)
  const [editData, seteditData] = useState({ link: "", linktext: "" })
  const router = useRouter();

  const deleteLink = async (id) => {
    const res = await fetch("/api/link-delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ linkId: id }),
    })

    if (res.ok) {
      setlinks((prev) => prev.filter((l) => l._id !== id));
    }
  }

  const onSubmit = async (data) => {
    const res = await fetch("/api/link-add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })

    const result = await res.json();
    if (res.ok) {
      setlinks((prev) => [...prev, result.link])
      reset()
    }
  }

  return (
    <div className="min-h-screen p-6 md:p-10 bg-gray-100">


      <div className="relative mb-8">


        <h1 className="text-3xl font-bold text-center">
          Dashboard
        </h1>


        <div className="mt-4 flex justify-center md:mt-0 md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2">
          <button
            onClick={() => router.push(`/${handle}`)}
            className="bg-black text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-800 w-auto"
          >
            View Public Page
          </button>
        </div>

      </div>
      {/* FORM SECTION */}
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col gap-4 w-full md:w-1/2"
        >

          <input
            type="text"
            placeholder="Enter your link Text here"
            className="border p-2 rounded w-full"
            {...register("linktext", { required: "Field cannot be empty" })}
          />
          {errors.linktext && (
            <p className="text-red-500 text-sm">
              {errors.linktext.message}
            </p>
          )}

          <input
            type="url"
            placeholder="Enter the URL here"
            className="border p-2 rounded w-full"
            {...register("link", {
              required: "Field cannot be empty",
              pattern: {
                value: /^(https?:\/\/)/,
                message: "Must start with http or https",
              },
            })}
          />
          {errors.link && (
            <p className="text-sm text-red-500">
              {errors.link.message}
            </p>
          )}


          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-black text-white cursor-pointer p-2 rounded w-1/2 md:w-1/4 self-center"
          >
            {isSubmitting ? "Adding..." : "Add Link"}
          </button>



        </form>
      </div>

      {/* EMPTY STATE */}
      {links.length === 0 && (
        <p className="text-gray-500 text-center">
          No links yet.
        </p>
      )}

      {/* LINKS LIST */}
      <div className="space-y-4 max-w-4xl mx-auto">

        {links.map((link) => (
          <div
            key={link._id}
            className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row md:justify-between md:items-center gap-4"
          >

            {editingId === link._id ? (
              <div className="flex flex-col gap-2 w-full md:mr-4">

                <input
                  className="border p-2 rounded w-full"
                  value={editData.linktext}
                  onChange={(e) =>
                    seteditData({ ...editData, linktext: e.target.value })
                  }
                />

                <input
                  className="border p-2 rounded w-full"
                  value={editData.link}
                  onChange={(e) =>
                    seteditData({ ...editData, link: e.target.value })
                  }
                />

                <div className="flex gap-2 mt-2 flex-wrap">
                  <button
                    className="bg-black text-white px-4 py-2 rounded w-1/2 md:w-auto"
                    onClick={async () => {
                      const res = await fetch("/api/link-edit", {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          linkId: link._id,
                          ...editData,
                        }),
                      });

                      if (res.ok) {
                        setlinks((prev) =>
                          prev.map((l) =>
                            l._id === link._id ? { ...l, ...editData } : l
                          )
                        );
                        seteditingId(null);
                      }
                    }}
                  >
                    Save
                  </button>

                  <button
                    className="text-gray-500 w-1/2 md:w-auto"
                    onClick={() => seteditingId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>

            ) : (

              <>
                <div className="wrap-break-word max-w-full md:max-w-md">
                  <p className="font-semibold wrap-break-word">
                    {link.linktext}
                  </p>
                  <p className="text-sm text-gray-500 break-all">
                    {link.link}
                  </p>
                  <p className="text-sm text-gray-400">
                    Clicks: {link.clicks || 0}
                  </p>
                </div>

                <div className="flex w-full md:w-auto gap-4">
                  <button
                    className="text-black cursor-pointer text-xl w-1/2 text-center md:w-auto"
                    onClick={() => {
                      seteditingId(link._id);
                      seteditData({
                        link: link.link,
                        linktext: link.linktext,
                      });
                    }}
                  >
                    <MdEdit />
                  </button>

                  <button
                    onClick={() => deleteLink(link._id)}
                    className="text-red-500 cursor-pointer text-xl w-1/2 text-center md:w-auto"
                  >
                    <MdDelete />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}

      </div>
    </div>
  );
}