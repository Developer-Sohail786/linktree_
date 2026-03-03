export default function Learn() {
  return (
   <main className="min-h-screen bg-gray-300 flex items-center justify-center pt-28 md:pt-32">
      <div className="max-w-3xl px-6 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Learn
        </h1>

        <p className="text-gray-600 text-lg mb-8">
          Explore guides, tips, and best practices to help you build
          and grow your online presence using a single link.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-xl p-6 bg-white">
            <h2 className="text-xl font-semibold mb-2">
              Getting Started
            </h2>
            <p className="text-gray-500">
              Learn how to create your link page, add links, and
              customize your profile.
            </p>
          </div>

          <div className="border rounded-xl p-6 bg-white">
            <h2 className="text-xl font-semibold mb-2">
              Customization
            </h2>
            <p className="text-gray-500">
              Discover ways to personalize your page with themes,
              layouts, and branding options.
            </p>
          </div>

          <div className="border rounded-xl p-6 bg-white">
            <h2 className="text-xl font-semibold mb-2">
              Analytics Basics
            </h2>
            <p className="text-gray-500">
              Understand how visitors interact with your links and
              track performance over time.
            </p>
          </div>

          <div className="border rounded-xl p-6 bg-white">
            <h2 className="text-xl font-semibold mb-2">
              Growth Tips
            </h2>
            <p className="text-gray-500">
              Simple strategies to improve engagement and reach more
              people across social platforms.
            </p>
          </div>
        </div>

        <p className="text-black mt-10">
         This is for demonstration purposes only in this clone project.
        </p>
      </div>
    </main>
  )
}
