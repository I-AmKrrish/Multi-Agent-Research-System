import React, { useState } from 'react';
import { 
  X, 
  Terminal, 
  Activity, 
  Cpu, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Layers, 
  Filter,
  Zap,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

export default function TelemetryDrawer({
  isOpen,
  onClose,
  logs = [],
  metrics = {}
}) {
  const [filterAgent, setFilterAgent] = useState('all');

  if (!isOpen) return null;

  const filteredLogs = filterAgent === 'all' 
    ? logs 
    : logs.filter(l => l.agent?.toLowerCase().includes(filterAgent.toLowerCase()));

  return (
    <aside className="w-80 md:w-96 flex-shrink-0 bg-white border-l border-[#E8E8F0] flex flex-col h-screen select-none shadow-xl z-30 fixed right-0 top-0 bottom-0">
      {/* Header */}
      <div className="h-16 px-4 border-b border-[#E8E8F0] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-mono-code font-bold uppercase tracking-wider text-slate-800">
              Agent Telemetry & Logs
            </h3>
            <p className="text-[10px] text-slate-400 font-mono-code">Runtime Verification Stream</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Metrics Topbar */}
      <div className="p-3 bg-slate-50 border-b border-[#E8E8F0] grid grid-cols-2 gap-2 text-xs font-mono-code">
        <div className="p-2 rounded-lg bg-white border border-[#E8E8F0]">
          <div className="text-[10px] text-slate-400 uppercase">Tokens Processed</div>
          <div className="font-bold text-slate-800 text-sm">{metrics.tokens || "18,420"}</div>
        </div>

        <div className="p-2 rounded-lg bg-white border border-[#E8E8F0]">
          <div className="text-[10px] text-slate-400 uppercase">Swarm Latency</div>
          <div className="font-bold text-slate-800 text-sm">{metrics.duration || "14.2s"}</div>
        </div>

        <div className="p-2 rounded-lg bg-white border border-[#E8E8F0]">
          <div className="text-[10px] text-slate-400 uppercase">Sources Index</div>
          <div className="font-bold text-slate-800 text-sm">{metrics.sourcesCount || 6} Domains</div>
        </div>

        <div className="p-2 rounded-lg bg-white border border-[#E8E8F0]">
          <div className="text-[10px] text-slate-400 uppercase">Critic Quality</div>
          <div className="font-bold text-emerald-600 text-sm">{metrics.critiqueScore || "9.2/10"}</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="p-2 border-b border-[#E8E8F0] flex items-center gap-1 overflow-x-auto text-[11px] font-mono-code">
        <button
          onClick={() => setFilterAgent('all')}
          className={`px-2 py-1 rounded transition-colors ${
            filterAgent === 'all'
              ? 'bg-slate-900 text-white font-semibold'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilterAgent('search')}
          className={`px-2 py-1 rounded transition-colors ${
            filterAgent === 'search'
              ? 'bg-sky-600 text-white font-semibold'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Search
        </button>
        <button
          onClick={() => setFilterAgent('reader')}
          className={`px-2 py-1 rounded transition-colors ${
            filterAgent === 'reader'
              ? 'bg-blue-600 text-white font-semibold'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Reader
        </button>
        <button
          onClick={() => setFilterAgent('writer')}
          className={`px-2 py-1 rounded transition-colors ${
            filterAgent === 'writer'
              ? 'bg-indigo-600 text-white font-semibold'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Writer
        </button>
        <button
          onClick={() => setFilterAgent('critic')}
          className={`px-2 py-1 rounded transition-colors ${
            filterAgent === 'critic'
              ? 'bg-amber-600 text-white font-semibold'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Critic
        </button>
      </div>

      {/* Event Stream List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 font-mono-code text-xs">
        {filteredLogs.length === 0 ? (
          <div className="text-center py-10 text-slate-400">
            No telemetry logs recorded yet.
          </div>
        ) : (
          filteredLogs.map((log, index) => {
            let badgeColor = "bg-slate-100 text-slate-700";
            if (log.agent?.toLowerCase().includes("search")) {
              badgeColor = "bg-sky-50 text-sky-700 border-sky-200";
            } else if (log.agent?.toLowerCase().includes("reader")) {
              badgeColor = "bg-blue-50 text-blue-700 border-blue-200";
            } else if (log.agent?.toLowerCase().includes("writer")) {
              badgeColor = "bg-indigo-50 text-indigo-700 border-indigo-200";
            } else if (log.agent?.toLowerCase().includes("critic")) {
              badgeColor = "bg-amber-50 text-amber-700 border-amber-200";
            }

            return (
              <div 
                key={index}
                className="p-2.5 rounded-xl border border-[#E8E8F0] bg-[#FAFAFC] hover:bg-white transition-all space-y-1 shadow-sm"
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className={`px-1.5 py-0.5 rounded border font-semibold ${badgeColor}`}>
                    {log.agent}
                  </span>
                  <span className="text-slate-400 font-mono-code">{log.time}</span>
                </div>
                <p className="text-[11px] text-slate-700 leading-relaxed font-sans font-medium">
                  {log.text}
                </p>
              </div>
            );
          })
        )}
      </div>

      {/* Terminal Footer */}
      <div className="p-3 border-t border-[#E8E8F0] bg-slate-50 flex items-center justify-between text-[11px] font-mono-code text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Swarm Telemetry Pipe</span>
        </span>
        <span className="text-slate-400">v2.4.0</span>
      </div>
    </aside>
  );
}
