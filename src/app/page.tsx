import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="space-y-8 py-4">
      {/* Hero Section */}
      <section className="text-center py-8 bg-gradient-to-b from-green-50 to-white rounded-2xl p-6 border border-green-100 shadow-sm">
        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full mb-3">
          🌾 Direct Agricultural Labour Marketplace
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
          Connect with Farm Labour <br />
          <span className="text-green-700">Faster, Fairer & Direct</span>
        </h1>
        <p className="mt-4 text-sm text-slate-600 max-w-xl mx-auto">
          No middlemen. No hidden fees. Farmers post seasonal labor needs; farm workers and crew teams find reliable daily work instantly.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/farmer/jobs/new"
            className="w-full sm:w-auto px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-xl shadow transition text-center"
          >
            Post Labour Need (Farmer)
          </Link>
          <Link
            href="/labourer/feed"
            className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-slate-50 text-green-800 font-semibold rounded-xl border-2 border-green-600 transition text-center"
          >
            Find Farm Work (Labourer)
          </Link>
        </div>
      </section>

      {/* Role Cards */}
      <section className="grid sm:grid-cols-2 gap-4">
        {/* Farmer Card */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-green-400 transition">
          <div className="text-3xl mb-2">🚜</div>
          <h2 className="text-lg font-bold text-slate-900">For Farmers & Landowners</h2>
          <p className="text-xs text-slate-600 mt-1 mb-4">
            Need workers for wheat harvesting, paddy transplanting, or weeding? Post in 2 minutes.
          </p>
          <ul className="text-xs text-slate-700 space-y-1.5 mb-5">
            <li>✓ Set your wage, dates, and worker count</li>
            <li>✓ Review applicant experience & crew size</li>
            <li>✓ Direct phone call & WhatsApp connection</li>
          </ul>
          <Link
            href="/farmer/dashboard"
            className="block text-center text-xs font-semibold bg-green-100 text-green-800 py-2 rounded-lg hover:bg-green-200"
          >
            Open Farmer Dashboard →
          </Link>
        </div>

        {/* Labourer Card */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-green-400 transition">
          <div className="text-3xl mb-2">🧑‍🌾</div>
          <h2 className="text-lg font-bold text-slate-900">For Labourers & Crew Leaders</h2>
          <p className="text-xs text-slate-600 mt-1 mb-4">
            Looking for daily or seasonal farm work? Browse active jobs nearby with clear pay.
          </p>
          <ul className="text-xs text-slate-700 space-y-1.5 mb-5">
            <li>✓ Transparent daily wage (₹ / day)</li>
            <li>✓ Filter by district and farm activity</li>
            <li>✓ One-tap direct application</li>
          </ul>
          <Link
            href="/labourer/feed"
            className="block text-center text-xs font-semibold bg-green-100 text-green-800 py-2 rounded-lg hover:bg-green-200"
          >
            Browse Active Jobs →
          </Link>
        </div>
      </section>
    </div>
  );
}
