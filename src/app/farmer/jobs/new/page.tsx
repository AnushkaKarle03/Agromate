'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ACTIVITIES = [
  { id: 'HARVESTING', label: '🌾 Harvesting' },
  { id: 'WEEDING', label: '🌿 Weeding' },
  { id: 'SOWING', label: '🌱 Sowing / Planting' },
  { id: 'SPRAYING', label: '🧪 Spraying' },
  { id: 'PACKAGING', label: '📦 Packaging' },
  { id: 'GENERAL', label: '🚜 General Farm Work' },
];

export default function NewJobPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [cropType, setCropType] = useState('Wheat');
  const [activity, setActivity] = useState('HARVESTING');
  const [workersNeeded, setWorkersNeeded] = useState(5);
  const [dailyWage, setDailyWage] = useState(500);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(
    new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]
  );
  const [district, setDistrict] = useState('Pune');
  const [village, setVillage] = useState('');
  const [additionalPerks, setAdditionalPerks] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const token = localStorage.getItem('agromate_token');
    if (!token) {
      router.push('/auth/login');
      return;
    }

    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          cropType,
          activity,
          workersNeeded: Number(workersNeeded),
          dailyWage: Number(dailyWage),
          startDate,
          endDate,
          district,
          village,
          additionalPerks,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to post job');
        setLoading(false);
        return;
      }

      router.push('/farmer/dashboard');
    } catch {
      setError('Network error');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto my-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <h1 className="text-xl font-bold text-slate-900 mb-1">Post Farm Labour Requirement</h1>
      <p className="text-xs text-slate-500 mb-4">
        Specify your crop, required tasks, dates, and wages for local workers
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Job Title</label>
          <input
            type="text"
            required
            placeholder="e.g. Urgent Wheat Harvesters Needed for 4 Days"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Crop Type</label>
            <input
              type="text"
              required
              placeholder="e.g. Wheat, Sugarcane"
              value={cropType}
              onChange={(e) => setCropType(e.target.value)}
              className="w-full px-3 py-1.5 border rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">District</label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full px-3 py-1.5 border rounded-lg text-sm bg-white"
            >
              <option value="Pune">Pune</option>
              <option value="Nashik">Nashik</option>
              <option value="Ahmednagar">Ahmednagar</option>
              <option value="Solapur">Solapur</option>
              <option value="Satara">Satara</option>
              <option value="Nagpur">Nagpur</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Nature of Work</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {ACTIVITIES.map((act) => (
              <button
                type="button"
                key={act.id}
                onClick={() => setActivity(act.id)}
                className={`py-2 px-2 rounded-lg text-xs font-semibold border text-center transition ${
                  activity === act.id
                    ? 'bg-green-700 text-white border-green-700 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {act.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Labourers Needed</label>
            <input
              type="number"
              min="1"
              required
              value={workersNeeded}
              onChange={(e) => setWorkersNeeded(parseInt(e.target.value) || 1)}
              className="w-full px-3 py-1.5 border rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Daily Wage (₹ / Worker)</label>
            <input
              type="number"
              min="100"
              step="50"
              required
              value={dailyWage}
              onChange={(e) => setDailyWage(parseInt(e.target.value) || 100)}
              className="w-full px-3 py-1.5 border rounded-lg text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Start Date</label>
            <input
              type="date"
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-1.5 border rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">End Date</label>
            <input
              type="date"
              required
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-1.5 border rounded-lg text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Perks / Notes (Optional)</label>
          <input
            type="text"
            placeholder="e.g. Lunch provided, morning tea included"
            value={additionalPerks}
            onChange={(e) => setAdditionalPerks(e.target.value)}
            className="w-full px-3 py-1.5 border rounded-lg text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-lg text-sm transition"
        >
          {loading ? 'Publishing Post...' : 'Publish Labour Requirement'}
        </button>
      </form>
    </div>
  );
}
