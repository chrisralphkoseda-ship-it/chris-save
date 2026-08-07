import React, { useState } from 'react';

export const LiveDashboard: React.FC = () => {
  const [quickLogText, setQuickLogText] = useState('');

  return (
    <div className="max-w-md mx-auto p-4 bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 shadow-2xl space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-emerald-400 flex items-center justify-center shadow-lg">
            <div className="w-4 h-4 bg-emerald-200 rotate-45 transform" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Chris</h2>
            <p className="text-xs text-slate-400">Young Adult • Willow Creek</p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-500 text-white">
          Focused
        </span>
      </div>

      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase text-slate-400">Needs</h3>
        <div className="grid grid-cols-2 gap-3">
          {['Energy', 'Hunger', 'Bladder', 'Hygiene', 'Fun', 'Social'].map((need) => (
            <div key={need} className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/50">
              <div className="flex justify-between text-xs mb-1">
                <span>{need}</span>
                <span>80%</span>
              </div>
              <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-2 rounded-full" style={{ width: '80%' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
