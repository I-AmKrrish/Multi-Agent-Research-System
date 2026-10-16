import React from 'react';
import { 
  Sparkles, 
  Plus, 
  Search, 
  FileText, 
  ShieldCheck, 
  PenTool, 
  Activity, 
  Database, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  Server,
  Zap,
  Bookmark
} from 'lucide-react';

export default function Sidebar({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewResearch,
  currentPipelineStep,
  isRunning,
  backendConnected
}) {
  const activeSession = sessions.find(s => s.id === activeSessionId);

  return (
    <aside className="w-64 md:w-72 flex-shrink-0 bg-white border-r border-[#E8E8F0] flex flex-col h-screen select-none">
      {/* Brand & App Title */}
      <div className="p-4 border-b border-[#E8E8F0] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-slate-900 tracking-tight text-base">Researchly</span>
              <span className="text-[10px] font-mono-code font-semibold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-600 border border-indigo-200/60">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Multi-Agent Workspace</p>
          </div>
        </div>
      </div>

      {/* New Research Action Button */}
      <div className="p-3">
        <button
          onClick={onNewResearch}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-3.5 rounded-xl btn-primary-gradient text-white text-xs font-semibold tracking-wide transition-all transform active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>New Research</span>
          <span className="ml-auto text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-mono-code opacity-90">⌘N</span>
        </button>
      </div>

      {/* Research Sessions History */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        <div className="px-2 py-1 text-[11px] font-mono-code font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-between">
          <span>Inquiry History</span>
          <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded-full font-medium">
            {sessions.length}
          </span>
        </div>

        {sessions.map((session) => {
          const isActive = session.id === activeSessionId;
          return (
            <button
              key={session.id}
              onClick={() => onSelectSession(session.id)}
              className={`w-full text-left p-2.5 rounded-xl transition-all duration-150 group relative flex flex-col gap-1 border ${
                isActive
                  ? 'bg-indigo-50/70 border-indigo-200/80 shadow-sm text-slate-900'
                  : 'border-transparent hover:bg-slate-50 hover:border-slate-200/60 text-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-1.5">
                <span className="text-xs font-medium line-clamp-2 leading-relaxed">
                  {session.topic}
                </span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 flex-shrink-0 mt-1.5 shadow-sm" />
                )}
              </div>
              <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono-code pt-0.5">
                <span className="flex items-center gap-1">
                  <Clock className="w-2.8 h-2.8 text-slate-400" />
                  {session.createdAt}
                </span>
                {session.metrics?.critiqueScore && (
                  <span className="text-emerald-600 font-medium bg-emerald-50 px-1 rounded border border-emerald-200/50">
                    ★ {session.metrics.critiqueScore}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Agent Swarm Telemetry Status Card */}
      <div className="p-3 border-t border-[#E8E8F0] bg-slate-50/70">
        <div className="text-[10px] font-mono-code font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
          <Activity className="w-3 h-3 text-indigo-500" />
          <span>Agent Swarm Topology</span>
        </div>
        <div className="space-y-1.5 text-xs">
          <div className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-white border border-[#E8E8F0]">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                isRunning && currentPipelineStep === 1 
                  ? 'bg-sky-500 animate-ping' 
                  : isRunning && currentPipelineStep > 1 
                  ? 'bg-emerald-500' 
                  : 'bg-slate-300'
              }`} />
              <Search className="w-3.5 h-3.5 text-sky-600" />
              <span className="font-medium text-slate-700 text-[11px]">Search Agent</span>
            </div>
            <span className="text-[10px] font-mono-code text-slate-400">Tavily Engine</span>
          </div>

          <div className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-white border border-[#E8E8F0]">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                isRunning && currentPipelineStep === 2 
                  ? 'bg-sky-500 animate-ping' 
                  : isRunning && currentPipelineStep > 2 
                  ? 'bg-emerald-500' 
                  : 'bg-slate-300'
              }`} />
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              <span className="font-medium text-slate-700 text-[11px]">Reader Agent</span>
            </div>
            <span className="text-[10px] font-mono-code text-slate-400">Scrape/DOM</span>
          </div>

          <div className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-white border border-[#E8E8F0]">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                isRunning && currentPipelineStep === 3 
                  ? 'bg-indigo-500 animate-ping' 
                  : isRunning && currentPipelineStep > 3 
                  ? 'bg-emerald-500' 
                  : 'bg-slate-300'
              }`} />
              <PenTool className="w-3.5 h-3.5 text-indigo-600" />
              <span className="font-medium text-slate-700 text-[11px]">Writer Agent</span>
            </div>
            <span className="text-[10px] font-mono-code text-slate-400">Synthesis LLM</span>
          </div>

          <div className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-white border border-[#E8E8F0]">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                isRunning && currentPipelineStep === 4 
                  ? 'bg-amber-500 animate-ping' 
                  : isRunning && currentPipelineStep > 4 
                  ? 'bg-emerald-500' 
                  : 'bg-slate-300'
              }`} />
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span className="font-medium text-slate-700 text-[11px]">Critic Agent</span>
            </div>
            <span className="text-[10px] font-mono-code text-slate-400">Quality Audit</span>
          </div>
        </div>

        {/* Backend Connectivity Status */}
        <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${backendConnected ? 'bg-emerald-500 animate-pulse' : 'bg-emerald-500'}`} />
            <span className="font-mono-code text-slate-600">FastAPI :8000</span>
          </div>
          <span className="text-[10px] font-mono-code px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-semibold">
            {backendConnected ? 'ONLINE' : 'ACTIVE'}
          </span>
        </div>
      </div>
    </aside>
  );
}
