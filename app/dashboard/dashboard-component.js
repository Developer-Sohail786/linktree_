
"use client"
import { useState } from "react"
import { useForm } from "react-hook-form";
import { MdEdit, MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DashboardComponent({ tree, handle }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();
  const linkText = watch("linktext");
  const [links, setlinks] = useState(tree?.links || [])
  const [editingId, seteditingId] = useState(null)
  const [editData, seteditData] = useState({ link: "", linktext: "" })
  const [aiLoading, setAiLoading] = useState(false);
  const [optimizedTitle, setOptimizedTitle] = useState("");

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
  // AI optimize
  const optimizeWithAI = async () => {

    try {

      if (!linkText.trim()) {
        return;
      }

      setAiLoading(true);

      const response = await fetch("/api/ai-optimize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          links: [
            {
              title: linkText,
            },
          ],
        }),
      });

      const data = await response.json();

      if (data.success) {

        setOptimizedTitle(data.data.title);

      }
      else {
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


            {...register("linktext", {
              required: "Field cannot be empty",
            })}
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

          <div className="flex justify-around">
            <button
              type="button"
              onClick={optimizeWithAI}
              disabled={aiLoading}
              className="bg-black text-white px-4 py-2 rounded-lg disabled:opacity-50 cursor-pointer hover:bg-gray-700"
            >
              {
                aiLoading
                  ? "Optimizing..."
                  : "Optimize with AI"
              }
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-black text-white cursor-pointer p-2 rounded w-1/2 md:w-1/4 self-center hover:bg-gray-700"
            >
              {isSubmitting ? "Adding..." : "Add Link"}
            </button>
          </div>
          {
            optimizedTitle && (
              <div className="mt-8 rounded-3xl border border-purple-200 bg-linear-to-br from-white to-purple-50 p-6 shadow-xl">

                {/* TOP SECTION */}
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

                {/* BEFORE / AFTER SECTION */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  {/* BEFORE */}
                  <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">

                    <p className="text-sm font-semibold text-gray-400 mb-3">
                      Current Title
                    </p>

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
                        #
                      </div>

                      <div>
                        <p className="font-semibold text-gray-800 break-all">
                          {linkText}
                        </p>

                        <p className="text-sm text-gray-400">
                          Existing title
                        </p>
                      </div>

                    </div>

                  </div>

                  {/* AFTER */}
                  <div className="bg-linear-to-r from-purple-100 to-indigo-100 border border-purple-300 rounded-2xl p-5 shadow-sm relative overflow-hidden">

                    <div className="absolute top-3 right-4 text-purple-500 text-xl">

                    </div>

                    <p className="text-sm font-semibold text-purple-600 mb-3">
                      AI Suggested Title
                    </p>

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center">
                        🚀
                      </div>

                      <div>
                        <p className="font-semibold text-gray-800 break-all">
                          {optimizedTitle}
                        </p>

                        <p className="text-sm text-purple-500">
                          Optimized for better engagement
                        </p>
                      </div>

                    </div>

                  </div>

                </div>

                {/* AI INSIGHT */}
                <div className="mt-5 bg-purple-50 border border-purple-200 rounded-2xl p-4">

                  <p className="text-sm text-purple-700 leading-relaxed">
                    AI improved your title to make it more clickable,
                    professional, and engaging for visitors.
                  </p>

                </div>

                {/* BUTTONS */}
                <div className="mt-6 flex flex-col sm:flex-row justify-end gap-4">

                  <button
                    type="button"
                    onClick={() => setOptimizedTitle("")}
                    className="px-5 py-3 rounded-2xl border border-gray-300 text-gray-600 font-semibold hover:bg-gray-100 transition-all duration-300 cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      // apply optimized title to input field
                      setValue("linktext", optimizedTitle);

                      // hide AI suggestion box
                      setOptimizedTitle("");

                    }}
                    className="px-6 py-3 rounded-2xl bg-linear-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                  >
                    Apply AI Changes
                  </button>

                </div>

              </div>
            )
          }
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
      <ToastContainer />
    </div>
  );
}