'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  cropType: string;
  activity: string;
  dailyWage: number;
  startDate: string;
  endDate: string;
  district: string;
  status: string;
  workersOffered: number;
  createdAt: string;
  farmer: {
    name: string;
    farmName?: string;
    phone: string | null;
    canCall: boolean;
  };
}

export default function LabourerApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      const token = localStorage.getItem('agromate_token');
      if (!token) return;

      try {
        const res = await fetch('/api/applications/my-applications', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok && data.applications) {
          setApplications(data.applications);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/labourer/feed" className="text-xs text-green-700 hover:underline">
            ← Back to Job Feed
          </Link>
          <h1 className="text-xl font-bold text-slate-900 mt-1">My Job Applications</h1>
          <p className="text-xs text-slate-500">Track application statuses and call farmers when accepted</p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10 text-sm text-slate-500">Loading your applications...</div>
      ) : applications.length === 0 ? (
        <div className="bg-white p-8 rounded-xl border border-slate-200 text-center space-y-3">
          <p className="text-sm text-slate-600">You haven't applied to any farm jobs yet.</p>
          <Link
            href="/labourer/feed"
            className="inline-block px-4 py-2 bg-green-700 text-white text-xs font-semibold rounded-lg"
          >
            Browse Work Feed
          </Link>
        </div>
      ) : (
        <div className="grid gap-3">
          {applications.map((app) => (
            <div
              key={app.id}
              className={`p-4 rounded-xl border transition ${
                app.status === 'ACCEPTED'
                  ? 'bg-green-50/60 border-green-300'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-slate-900 text-base">{app.jobTitle}</h3>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        app.status === 'ACCEPTED'
                          ? 'bg-green-600 text-white'
                          : app.status === 'REJECTED'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mt-1">
                    Farmer: <span className="font-semibold text-slate-800">{app.farmer.name}</span>{' '}
                    {app.farmer.farmName && `(${app.farmer.farmName})`} • Pay:{' '}
                    <span className="font-bold text-green-700">₹{app.dailyWage}/day</span>
                  </p>

                  <p className="text-xs text-slate-500 mt-0.5">
                    Location: {app.district} • Applied on:{' '}
                    {new Date(app.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  {app.farmer.canCall && app.farmer.phone && (
                    <div className="flex space-x-2">
                      <a
                        href={`tel:${app.farmer.phone}`}
                        className="px-3 py-1.5 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-lg text-xs flex items-center space-x-1"
                      >
                        <span>📞</span>
                        <span>Call Farmer</span>
                      </a>
                      <a
                        href={`https://wa.me/91${app.farmer.phone}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-xs flex items-center space-x-1"
                      >
                        <span>💬</span>
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  )}

                  {!app.farmer.canCall && app.status === 'PENDING' && (
                    <span className="text-xs text-slate-400 italic">
                      Waiting for farmer review...
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
