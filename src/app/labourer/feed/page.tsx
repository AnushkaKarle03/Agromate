'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Job {
  id: string;
  title: string;
  cropType: string;
  activity: string;
  workersNeeded: number;
  dailyWage: number;
  startDate: string;
  endDate: string;
  district: string;
  village?: string;
  additionalPerks?: string;
  farmer: {
    fullName: string;
    farmName?: string;
    district: string;
  };
}

export default function LabourerJobFeed() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [district, setDistrict] = useState('');
  const [activity, setActivity] = useState('');
  const [loading, setLoading] = useState(true);
  const [appliedJobs, setAppliedJobs] = useState<Record<string, boolean>>({});

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (district) params.append('district', district);
      if (activity) params.append('activity', activity);

      const res = await fetch(`/api/jobs?${params.toString()}`);
      const data = await res.json();
      if (res.ok && data.jobs) {
        setJobs(data.jobs);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [district, activity]);

  const handleApply = async (jobId: string) => {
    const token = localStorage.getItem('agromate_token');
    if (!token) {
      window.location.href = '/auth/login';
      return;
    }

    try {
      const res = await fetch(`/api/jobs/${jobId}/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setAppliedJobs((prev) => ({ ...prev, [jobId]: true }));
      } else {
        const data = await res.json();
        alert(data.error || 'Could not apply');
      }
    } catch {
      alert('Network error');
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Available Farm Work Opportunities</h1>
          <p className="text-xs text-slate-500">Discover active labour requirements with transparent daily pay</p>
        </div>
        <Link
          href="/labourer/applications"
          className="text-xs font-semibold px-3 py-1.5 bg-green-100 text-green-800 rounded-lg hover:bg-green-200"
        >
          My Applications Track →
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-wrap gap-2 items-center text-xs">
        <span className="font-semibold text-slate-700">Filter By:</span>
        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="px-2 py-1.5 border rounded-lg bg-slate-50"
        >
          <option value="">All Districts</option>
          <option value="Pune">Pune</option>
          <option value="Nashik">Nashik</option>
          <option value="Ahmednagar">Ahmednagar</option>
          <option value="Solapur">Solapur</option>
          <option value="Satara">Satara</option>
        </select>

        <select
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          className="px-2 py-1.5 border rounded-lg bg-slate-50"
        >
          <option value="">All Tasks</option>
          <option value="HARVESTING">Harvesting</option>
          <option value="WEEDING">Weeding</option>
          <option value="SOWING">Sowing / Planting</option>
          <option value="SPRAYING">Spraying</option>
          <option value="PACKAGING">Packaging</option>
          <option value="GENERAL">General Work</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-12 text-sm text-slate-500">Finding nearby work...</div>
      ) : jobs.length === 0 ? (
        <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-sm text-slate-600">
          No matching jobs found right now. Try clearing filters.
        </div>
      ) : (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-green-300 transition flex flex-col sm:flex-row justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-slate-900 text-lg">{job.title}</h3>
                  <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {job.activity}
                  </span>
                </div>

                <p className="text-xs text-slate-600">
                  Farmer: <span className="font-medium text-slate-800">{job.farmer.fullName}</span>{' '}
                  {job.farmer.farmName && `(${job.farmer.farmName})`} • Location:{' '}
                  <span className="font-medium text-slate-800">
                    {job.district} {job.village && `• ${job.village}`}
                  </span>
                </p>

                <div className="pt-2 flex flex-wrap gap-3 text-xs text-slate-600">
                  <div className="bg-slate-50 px-2 py-1 rounded border">
                    Pay: <b className="text-green-700 text-sm">₹{job.dailyWage}</b> / day
                  </div>
                  <div className="bg-slate-50 px-2 py-1 rounded border">
                    Openings: <b className="text-slate-800">{job.workersNeeded} workers</b>
                  </div>
                  <div className="bg-slate-50 px-2 py-1 rounded border">
                    Duration: {new Date(job.startDate).toLocaleDateString()} -{' '}
                    {new Date(job.endDate).toLocaleDateString()}
                  </div>
                </div>

                {job.additionalPerks && (
                  <p className="text-xs text-emerald-700 pt-1">✨ {job.additionalPerks}</p>
                )}
              </div>

              <div className="flex sm:flex-col justify-end items-end gap-2 border-t sm:border-t-0 pt-3 sm:pt-0">
                <button
                  onClick={() => handleApply(job.id)}
                  disabled={appliedJobs[job.id]}
                  className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs shadow transition ${
                    appliedJobs[job.id]
                      ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                      : 'bg-green-700 hover:bg-green-800 text-white'
                  }`}
                >
                  {appliedJobs[job.id] ? '✓ Applied' : 'Apply Now (1-Tap)'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
