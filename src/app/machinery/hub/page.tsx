'use client';

import { useState } from 'react';
import Link from 'next/link';

interface MachineItem {
  id: string;
  title: string;
  type: string;
  ownerName: string;
  phone: string;
  district: string;
  village: string;
  ratePerHour: number;
  ratePerAcre: number;
  specs: string;
  isAvailable: boolean;
}

export default function MachineryHubPage() {
  const [districtFilter, setDistrictFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const [machines, setMachines] = useState<MachineItem[]>([
    {
      id: 'm-1',
      title: 'Mahindra 575 DI (45 HP) with 42-Blade Rotavator',
      type: 'TRACTOR',
      ownerName: 'Vikas Shinde',
      phone: '9822001122',
      district: 'Pune',
      village: 'Baramati',
      ratePerHour: 800,
      ratePerAcre: 1400,
      specs: 'Includes experienced driver, suitable for deep plowing & rotavating',
      isAvailable: true,
    },
    {
      id: 'm-2',
      title: 'Claas Crop Tiger 30 Combine Harvester',
      type: 'HARVESTER',
      ownerName: 'Santosh Gaikwad',
      phone: '9833445566',
      district: 'Nashik',
      village: 'Niphad',
      ratePerHour: 1800,
      ratePerAcre: 2400,
      specs: 'Ideal for wheat, soyabean & gram harvesting with minimum grain loss',
      isAvailable: true,
    },
    {
      id: 'm-3',
      title: 'Agricultural 16L Drone Sprayer with GPS RTK',
      type: 'SPRAYER',
      ownerName: 'Aniket More',
      phone: '9877889900',
      district: 'Ahmednagar',
      village: 'Rahata',
      ratePerHour: 600,
      ratePerAcre: 450,
      specs: 'Covers 1 acre in 7 minutes, uniform chemical spray & zero crop trampling',
      isAvailable: true,
    },
    {
      id: 'm-4',
      title: 'John Deere 5050D 4WD with Reversible MB Plough',
      type: 'TRACTOR',
      ownerName: 'Dnyaneshwar Patil',
      phone: '9855667788',
      district: 'Solapur',
      village: 'Pandharpur',
      ratePerHour: 950,
      ratePerAcre: 1600,
      specs: 'Heavy duty sugarcane residue mulching & land leveling',
      isAvailable: true,
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState('TRACTOR');
  const [newHourly, setNewHourly] = useState('850');
  const [newAcre, setNewAcre] = useState('1500');
  const [newDistrict, setNewDistrict] = useState('Pune');
  const [newSpecs, setNewSpecs] = useState('');

  const handleAddMachine = (e: React.FormEvent) => {
    e.preventDefault();
    const item: MachineItem = {
      id: 'm-' + Date.now(),
      title: newTitle,
      type: newType,
      ownerName: 'You (Machine Owner)',
      phone: '9822001122',
      district: newDistrict,
      village: 'Local Field',
      ratePerHour: parseInt(newHourly) || 800,
      ratePerAcre: parseInt(newAcre) || 1400,
      specs: newSpecs || 'Available on demand',
      isAvailable: true,
    };
    setMachines([item, ...machines]);
    setShowAddModal(false);
    alert('✓ Your agricultural machinery has been listed for hire!');
  };

  const filtered = machines.filter((m) => {
    if (districtFilter && m.district !== districtFilter) return false;
    if (typeFilter && m.type !== typeFilter) return false;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-3xl p-6 shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs bg-amber-800 text-amber-200 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
            🚜 Agri-Machinery & Custom Hiring
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-2 tracking-tight">
            Farm Equipment & Machinery Hub
          </h1>
          <p className="text-xs sm:text-sm text-amber-100 mt-1 max-w-xl">
            Rent tractors, harvesters, drone sprayers, and rotavators directly from nearby machine owners with transparent hourly and per-acre rates.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 bg-white text-amber-900 font-bold rounded-xl text-xs sm:text-sm shadow hover:bg-amber-50 transition"
        >
          + List Your Equipment
        </button>
      </div>

      {/* Filter Controls */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 flex flex-wrap gap-3 items-center text-xs">
        <span className="font-bold text-slate-700">Filter Machinery:</span>
        <select
          value={districtFilter}
          onChange={(e) => setDistrictFilter(e.target.value)}
          className="px-3 py-1.5 border rounded-lg bg-slate-50 text-xs"
        >
          <option value="">All Maharashtra Districts</option>
          <option value="Pune">Pune</option>
          <option value="Nashik">Nashik</option>
          <option value="Ahmednagar">Ahmednagar</option>
          <option value="Solapur">Solapur</option>
        </select>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-3 py-1.5 border rounded-lg bg-slate-50 text-xs"
        >
          <option value="">All Equipment Types</option>
          <option value="TRACTOR">🚜 Tractors & Ploughs</option>
          <option value="HARVESTER">🌾 Harvesters & Threshers</option>
          <option value="SPRAYER">🧪 Drone & Boom Sprayers</option>
        </select>
      </div>

      {/* Machinery Listings Grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {filtered.map((m) => (
          <div
            key={m.id}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-amber-400 transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {m.type}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  📍 {m.village}, {m.district}
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-base mt-2">{m.title}</h3>
              <p className="text-xs text-slate-600 mt-1">Owner: <b>{m.ownerName}</b></p>
              <p className="text-xs text-slate-500 mt-1">{m.specs}</p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <div className="text-base font-extrabold text-amber-800">
                  ₹{m.ratePerHour} <span className="text-xs font-normal text-slate-500">/ hr</span>
                </div>
                <div className="text-[11px] text-slate-500">₹{m.ratePerAcre} / acre</div>
              </div>

              <div className="flex space-x-2">
                <a
                  href={`tel:${m.phone}`}
                  className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs flex items-center space-x-1 shadow-xs transition"
                >
                  <span>📞 Call</span>
                </a>
                <a
                  href={`https://wa.me/91${m.phone}?text=Hi, I am interested in hiring your ${m.title} on Agromate.`}
                  target="_blank"
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center space-x-1 shadow-xs transition"
                >
                  <span>💬 WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Equipment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-6 rounded-3xl shadow-xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">List Equipment for Hire</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddMachine} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Machine Model & Attachment
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Swaraj 744 FE 48 HP with Rotavator"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    className="w-full px-3 py-1.5 border rounded-xl text-xs bg-white"
                  >
                    <option value="TRACTOR">🚜 Tractor</option>
                    <option value="HARVESTER">🌾 Harvester</option>
                    <option value="SPRAYER">🧪 Drone/Sprayer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">District</label>
                  <select
                    value={newDistrict}
                    onChange={(e) => setNewDistrict(e.target.value)}
                    className="w-full px-3 py-1.5 border rounded-xl text-xs bg-white"
                  >
                    <option value="Pune">Pune</option>
                    <option value="Nashik">Nashik</option>
                    <option value="Ahmednagar">Ahmednagar</option>
                    <option value="Solapur">Solapur</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Hourly Rate (₹/hr)</label>
                  <input
                    type="number"
                    min="100"
                    required
                    value={newHourly}
                    onChange={(e) => setNewHourly(e.target.value)}
                    className="w-full px-3 py-1.5 border rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Acre Rate (₹/acre)</label>
                  <input
                    type="number"
                    min="100"
                    required
                    value={newAcre}
                    onChange={(e) => setNewAcre(e.target.value)}
                    className="w-full px-3 py-1.5 border rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Attachments & Notes
                </label>
                <input
                  type="text"
                  placeholder="e.g. Laser land leveler included, diesel included"
                  value={newSpecs}
                  onChange={(e) => setNewSpecs(e.target.value)}
                  className="w-full px-3 py-1.5 border rounded-xl text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs shadow transition mt-2"
              >
                Publish Equipment Listing
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
