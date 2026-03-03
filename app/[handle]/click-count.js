"use client";

export default function ClickCount({ links, handle }) {
  return (
    <div className="links w-full">
      {links.map((linkItem, index) => (
        <button
          key={index}
          onClick={async () => {
            await fetch("/api/link-click", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                linkId: linkItem._id,
                handle,
              }),
            });

            window.open(linkItem.link, "_blank", "noopener,noreferrer");
          }}
          className="w-full"
        >
          <div className="bg-purple-100 text-black py-3 sm:py-4 cursor-pointer shadow-lg px-4 w-full text-center font-semibold rounded-md my-3 hover:scale-[1.02] transition">
            {linkItem.linktext}
          </div>
        </button>
      ))}
    </div>
  );
}