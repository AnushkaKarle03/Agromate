'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Applicant {
  id: string;
  labourerName: string;
  phone: string;
  isPhoneMasked: boolean;
  skills: string;
  experienceYears: number;
  isCrewLeader: boolean;
  crewSize: number;
  district: string;
  village?: string;
  workersOffered: number;
  applicantNote?: string;
  status: string;
  createdAt: string;
}

export default function JobApplicantsPage() {
  const params = useParams();
  const [jobTitle, setJobTitle] = useState('');
  const [workersNeeded, setWorkersNeeded] = useState(0);
  const [jobStatus, setJobStatus] = useState('');
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApplicants = async () => {
    const token = localStorage.getItem('agromate_token');
    try {
      const res = await fetch(`/api/jobs/${params.id}/applicants`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();
      if (res.ok) {
        setJobTitle(data.jobTitle);
        setWorkersNeeded(data.workersNeeded);
        setJobStatus(data.status);
        setApplicants(data.applicants || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, [params.id]);

  const handleDecision = async (applicationId: string, decision: 'ACCEPT' | 'REJECT') => {
    const token = localStorage.getItem('agromate_token');
    try {
      const res = await fetch(`/api/applications/${applicationId}/decision`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ decision }),
      });

      if (res.ok) {
        // Refresh applicants to reveal phone numbers and update status
        fetchApplicants();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/farmer/dashboard" className="text-xs text-green-700 hover:underline">
            ← Back to Dashboard
          </Link>
          <h1 className="text-xl font-bold text-slate-900 mt-1">Applicants for: {jobTitle}</h1>
          <p className="text-xs text-slate-500">
            Workers Needed: <b>{workersNeeded}</b> • Job Status:{' '}
            <span className="font-semibold text-green-700">{jobStatus}</span>
          </p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10 text-sm text-slate-500">Loading applicants...</div>
      ) : applicants.length === 0 ? (
        <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-sm text-slate-600">
          No applicants yet for this posting. Check back soon as workers browse the feed.
        </div>
      ) : (
        <div className="grid gap-4">
          {applicants.map((app) => (
            <div
              key={app.id}
              className={`p-4 rounded-xl border transition ${
                app.status === 'ACCEPTED'
                  ? 'bg-green-50/50 border-green-300'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-slate-900 text-base">{app.labourerName}</h3>
                    {app.isCrewLeader && (
                      <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Mukaddam (Crew of {app.crewSize})
                      </span>
                    )}
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
                    Skills: <span className="font-medium text-slate-800">{app.skills}</span> • Experience:{' '}
                    <span className="font-medium text-slate-800">{app.experienceYears} yrs</span> • Location:{' '}
                    <span className="font-medium text-slate-800">{app.district}</span>
                  </p>

                  <div className="mt-2 text-xs">
                    Phone Number:{' '}
                    <b className="text-slate-900 tracking-wide font-mono">{app.phone}</b>
                    {app.isPhoneMasked && (
                      <span className="text-slate-400 text-[10px] ml-2">
                        (Accept candidate to reveal verified phone)
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {app.status === 'PENDING' && (
                    <>
                      <button
                        onClick={() => handleDecision(app.id, 'ACCEPT')}
                        className="px-3 py-1.5 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-lg text-xs"
                      >
                        Accept Worker
                      </button>
                      <button
                        onClick={() => handleDecision(app.id, 'REJECT')}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs border"
                      >
                        Decline
                      </button>
                    </>
                  )}

                  {app.status === 'ACCEPTED' && (
                    <div className="flex space-x-2">
                      <a
                        href={`tel:${app.phone}`}
                        className="px-3 py-1.5 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-lg text-xs flex items-center space-x-1"
                      >
                        <span>📞</span>
                        <span>Call Now</span>
                      </a>
                      <a
                        href={`https://wa.me/91${app.phone}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-xs flex items-center space-x-1"
                      >
                        <span>💬</span>
                        <span>WhatsApp</span>
                      </a>
                    </div>
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
