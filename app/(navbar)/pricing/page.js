export default function Pricing() {
  return (
    <main className="min-h-screen bg-gray-300 flex items-center justify-center pt-28 md:pt-32">
      <div className="max-w-4xl px-6 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Pricing
        </h1>

        <p className="text-gray-600 text-lg mb-10">
          Choose a plan that fits your needs. Upgrade anytime to unlock
          advanced customization, analytics, and integrations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Free */}
          <div className="border rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-2">Free</h2>
            <p className="text-gray-500 mb-4">For getting started</p>
            <p className="text-3xl font-bold mb-6">₹0</p>
            <ul className="text-gray-600 space-y-2">
              <li>Basic link page</li>
              <li>Unlimited links</li>
              <li>Standard themes</li>
            </ul>
          </div>

          {/* Pro */}
          <div className="border rounded-xl p-6 bg-gray-50">
            <h2 className="text-xl font-semibold mb-2">Pro</h2>
            <p className="text-gray-500 mb-4">For creators</p>
            <p className="text-3xl font-bold mb-6">₹499 / month</p>
            <ul className="text-gray-600 space-y-2">
              <li>Custom branding</li>
              <li>Advanced analytics</li>
              <li>Priority support</li>
            </ul>
          </div>

          {/* Business */}
          <div className="border rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-2">Business</h2>
            <p className="text-gray-500 mb-4">For teams & brands</p>
            <p className="text-3xl font-bold mb-6">Custom</p>
            <ul className="text-gray-600 space-y-2">
              <li>Team access</li>
              <li>Premium integrations</li>
              <li>Dedicated support</li>
            </ul>
          </div>
        </div>

        <p className="text-black mt-10">
          Pricing is for demonstration purposes only in this clone project.
        </p>
      </div>
    </main>
  )
}
