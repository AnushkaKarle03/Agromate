import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="space-y-8 py-4">
      {/* Hero Section */}
      <section className="text-center py-8 bg-gradient-to-b from-green-50 to-white rounded-3xl p-6 border border-green-100 shadow-sm">
        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full mb-3">
          🌾 Unified Agricultural Marketplace — Direct & Transparent
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
          Farm Labour & Machinery <br />
          <span className="text-green-700">One Account, Every Role</span>
        </h1>
        <p className="mt-3 text-sm text-slate-600 max-w-xl mx-auto">
          In rural India, a farmer is also a labourer, and a machine owner is also a farmer. With Agromate, one single login lets you switch seamlessly between hiring labour, finding work, and renting equipment.
        </p>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <Link
            href="/farmer/jobs/new"
            className="px-5 py-2.5 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-xl shadow transition text-xs sm:text-sm"
          >
            🚜 Post Labour Need (Farmer)
          </Link>
          <Link
            href="/labourer/feed"
            className="px-5 py-2.5 bg-white hover:bg-slate-50 text-green-800 font-semibold rounded-xl border-2 border-green-600 transition text-xs sm:text-sm"
          >
            🌾 Find Farm Work (Labourer)
          </Link>
          <Link
            href="/machinery/hub"
            className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl shadow transition text-xs sm:text-sm"
          >
            ⚙️ Machinery Hub (Rent / Offer)
          </Link>
        </div>
      </section>

      {/* Role Switching Highlight Banner */}
      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🔄</span>
          <div>
            <span className="font-bold text-emerald-950 text-sm">Single Unified Login with Role Switching</span>
            <p className="text-emerald-800">
              No need for separate accounts. Log in once and switch between <b>Farmer</b>, <b>Labourer</b>, and <b>Machine Owner</b> with one tap from the header!
            </p>
          </div>
        </div>
        <Link
          href="/auth/login"
          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl whitespace-nowrap shadow-xs transition"
        >
          Sign In Now →
        </Link>
      </div>

      {/* 3 Core Pillars */}
      <section className="grid sm:grid-cols-3 gap-4">
        {/* Pillar 1: Farmer */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-green-400 transition flex flex-col justify-between">
          <div>
            <div className="text-3xl mb-2">🚜</div>
            <h2 className="text-base font-bold text-slate-900">Farmer Mode</h2>
            <p className="text-xs text-slate-600 mt-1 mb-3">
              Facing urgent harvesting or sowing deadlines? Post your labour needs in 2 minutes.
            </p>
            <ul className="text-xs text-slate-700 space-y-1 mb-4">
              <li>✓ Set wage (₹/day) & headcount</li>
              <li>✓ Review applicant experience</li>
              <li>✓ Direct Call & WhatsApp contacts</li>
            </ul>
          </div>
          <Link
            href="/farmer/dashboard"
            className="block text-center text-xs font-semibold bg-green-100 text-green-800 py-2 rounded-xl hover:bg-green-200"
          >
            Open Farmer Dashboard →
          </Link>
        </div>

        {/* Pillar 2: Labourer */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-green-400 transition flex flex-col justify-between">
          <div>
            <div className="text-3xl mb-2">🧑‍🌾</div>
            <h2 className="text-base font-bold text-slate-900">Labourer Mode</h2>
            <p className="text-xs text-slate-600 mt-1 mb-3">
              Looking for reliable agricultural work without middleman cuts? Browse openings nearby.
            </p>
            <ul className="text-xs text-slate-700 space-y-1 mb-4">
              <li>✓ Transparent daily wage figures</li>
              <li>✓ Filter by district & crop task</li>
              <li>✓ 1-Tap quick apply</li>
            </ul>
          </div>
          <Link
            href="/labourer/feed"
            className="block text-center text-xs font-semibold bg-green-100 text-green-800 py-2 rounded-xl hover:bg-green-200"
          >
            Browse Farm Jobs →
          </Link>
        </div>

        {/* Pillar 3: Machine Owner */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-amber-400 transition flex flex-col justify-between">
          <div>
            <div className="text-3xl mb-2">⚙️</div>
            <h2 className="text-base font-bold text-slate-900">Machine Owner Mode</h2>
            <p className="text-xs text-slate-600 mt-1 mb-3">
              Own a tractor, harvester, or drone? Rent your machinery to nearby farms during peak seasons.
            </p>
            <ul className="text-xs text-slate-700 space-y-1 mb-4">
              <li>✓ Set hourly & per-acre rental rates</li>
              <li>✓ List rotavators & plows</li>
              <li>✓ Receive direct farmer bookings</li>
            </ul>
          </div>
          <Link
            href="/machinery/hub"
            className="block text-center text-xs font-semibold bg-amber-100 text-amber-900 py-2 rounded-xl hover:bg-amber-200"
          >
            Explore Machinery Hub →
          </Link>
        </div>
      </section>
    </div>
  );
}
