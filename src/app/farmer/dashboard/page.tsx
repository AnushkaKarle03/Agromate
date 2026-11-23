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
  status: string;
  _count: {
    applications: number;
  };
}

export default function FarmerDashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  useEffect(() => {
    const fetchMyJobs = async () => {
      const token = localStorage.getItem('agromate_token');
      try {
        const res = await fetch('/api/jobs/my-posts', {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
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

    fetchMyJobs();
  }, []);

  const filtered = filterStatus === 'ALL' ? jobs : jobs.filter((j) => j.status === filterStatus);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Farmer Management Dashboard</h1>
          <p className="text-xs text-slate-500">Track your posted labour requirements and incoming workers</p>
        </div>
        <Link
          href="/farmer/jobs/new"
          className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-lg text-xs shadow transition"
        >
          + Post New Labour Need
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 border-b border-slate-200 pb-2 text-xs font-semibold">
        {['ALL', 'OPEN', 'FILLED', 'CANCELLED'].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-3 py-1.5 rounded-md transition ${
              filterStatus === st
                ? 'bg-green-700 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {st} ({st === 'ALL' ? jobs.length : jobs.filter((j) => j.status === st).length})
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12 text-sm text-slate-500">Loading your postings...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-white p-8 rounded-xl border border-slate-200 text-center space-y-3">
          <p className="text-sm text-slate-600">No labour postings found in this section.</p>
          <Link
            href="/farmer/jobs/new"
            className="inline-block px-4 py-2 bg-green-700 text-white text-xs font-semibold rounded-lg"
          >
            Create Your First Post
          </Link>
        </div>
      ) : (
        <div className="grid gap-3">
          {filtered.map((job) => (
            <div
              key={job.id}
              className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 transition flex flex-col sm:flex-row justify-between gap-3"
            >
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-slate-900 text-base">{job.title}</h3>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      job.status === 'OPEN'
                        ? 'bg-green-100 text-green-800'
                        : job.status === 'FILLED'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {job.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Crop: <span className="font-medium text-slate-700">{job.cropType}</span> • Activity:{' '}
                  <span className="font-medium text-slate-700">{job.activity}</span> • Location:{' '}
                  <span className="font-medium text-slate-700">{job.district}</span>
                </p>
                <div className="mt-2 text-xs flex items-center space-x-4 text-slate-600">
                  <span>Wage: <b className="text-slate-900">₹{job.dailyWage} / day</b></span>
                  <span>Needed: <b className="text-slate-900">{job.workersNeeded} workers</b></span>
                  <span>
                    Dates: {new Date(job.startDate).toLocaleDateString()} -{' '}
                    {new Date(job.endDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex sm:flex-col justify-between sm:justify-center items-end gap-2 border-t sm:border-t-0 pt-2 sm:pt-0">
                <Link
                  href={`/farmer/jobs/${job.id}/applicants`}
                  className="px-3 py-1.5 bg-green-50 text-green-800 font-semibold rounded-lg text-xs hover:bg-green-100 border border-green-200"
                >
                  Review Applicants ({job._count?.applications || 0}) →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
