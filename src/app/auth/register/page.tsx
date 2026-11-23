'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<'FARMER' | 'LABOURER'>('LABOURER');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [district, setDistrict] = useState('Pune');
  const [taluka, setTaluka] = useState('');
  const [village, setVillage] = useState('');
  const [farmName, setFarmName] = useState('');
  const [skills, setSkills] = useState('Harvesting');
  const [isCrewLeader, setIsCrewLeader] = useState(false);
  const [crewSize, setCrewSize] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role,
          phone,
          password,
          fullName,
          district,
          taluka,
          village,
          farmName: role === 'FARMER' ? farmName : undefined,
          skills: role === 'LABOURER' ? skills : undefined,
          isCrewLeader: role === 'LABOURER' ? isCrewLeader : undefined,
          crewSize: role === 'LABOURER' ? crewSize : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Registration failed');
        setLoading(false);
        return;
      }

      localStorage.setItem('agromate_token', data.token);
      localStorage.setItem('agromate_user', JSON.stringify(data.user));

      if (role === 'FARMER') {
        router.push('/farmer/dashboard');
      } else {
        router.push('/labourer/feed');
      }
    } catch {
      setError('Network error during registration');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <h1 className="text-xl font-bold text-slate-900 mb-1">Create an Agromate Account</h1>
      <p className="text-xs text-slate-500 mb-4">Choose your role to get started</p>

      {/* Role Picker */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <button
          type="button"
          onClick={() => setRole('LABOURER')}
          className={`py-2 px-3 rounded-lg text-xs font-semibold border text-center transition ${
            role === 'LABOURER'
              ? 'bg-green-700 text-white border-green-700'
              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
          }`}
        >
          🧑‍🌾 Farm Labourer
        </button>
        <button
          type="button"
          onClick={() => setRole('FARMER')}
          className={`py-2 px-3 rounded-lg text-xs font-semibold border text-center transition ${
            role === 'FARMER'
              ? 'bg-green-700 text-white border-green-700'
              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
          }`}
        >
          🚜 Farmer / Landowner
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
          <input
            type="text"
            required
            placeholder="e.g. Ramesh Patil"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-3 py-1.5 border rounded-lg text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number</label>
          <input
            type="tel"
            required
            placeholder="10-digit mobile number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-1.5 border rounded-lg text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
          <input
            type="password"
            required
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-1.5 border rounded-lg text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
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
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Village / Town</label>
            <input
              type="text"
              placeholder="e.g. Baramati"
              value={village}
              onChange={(e) => setVillage(e.target.value)}
              className="w-full px-3 py-1.5 border rounded-lg text-sm"
            />
          </div>
        </div>

        {role === 'FARMER' ? (
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Farm / Estate Name (Optional)</label>
            <input
              type="text"
              placeholder="e.g. Green Valley Farms"
              value={farmName}
              onChange={(e) => setFarmName(e.target.value)}
              className="w-full px-3 py-1.5 border rounded-lg text-sm"
            />
          </div>
        ) : (
          <div className="space-y-3 pt-1 border-t">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Skill</label>
              <select
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full px-3 py-1.5 border rounded-lg text-sm bg-white"
              >
                <option value="Harvesting">Harvesting</option>
                <option value="Weeding">Weeding</option>
                <option value="Sowing / Planting">Sowing / Planting</option>
                <option value="Spraying">Spraying</option>
                <option value="General Farm Labour">General Farm Labour</option>
              </select>
            </div>
            <div className="flex items-center space-x-2 pt-1">
              <input
                type="checkbox"
                id="crewLeader"
                checked={isCrewLeader}
                onChange={(e) => setIsCrewLeader(e.target.checked)}
                className="h-4 w-4 text-green-600 rounded"
              />
              <label htmlFor="crewLeader" className="text-xs text-slate-700 font-medium">
                I am a Crew Leader (Mukaddam / Toli)
              </label>
            </div>
            {isCrewLeader && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Crew Size (Number of Workers)</label>
                <input
                  type="number"
                  min="2"
                  max="50"
                  value={crewSize}
                  onChange={(e) => setCrewSize(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-1.5 border rounded-lg text-sm"
                />
              </div>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 mt-2 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-lg text-sm transition"
        >
          {loading ? 'Creating account...' : 'Complete Registration'}
        </button>
      </form>

      <p className="mt-4 text-center text-xs text-slate-600">
        Already registered?{' '}
        <Link href="/auth/login" className="font-semibold text-green-700 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
