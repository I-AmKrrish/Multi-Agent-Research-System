import React, { useState } from 'react';
import { 
  Download, 
  Copy, 
  Check, 
  Share2, 
  SlidersHorizontal, 
  Sparkles, 
  ShieldCheck, 
  FileText, 
  Terminal,
  ExternalLink,
  SplitSquareVertical
} from 'lucide-react';

export default function Header({
  activeTopic,
  confidenceScore = 94,
  activeView,
  setActiveView,
  onDownloadMarkdown,
  onCopyReport,
  isTelemetryOpen,
  setIsTelemetryOpen
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopyReport();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="h-16 bg-white border-b border-[#E8E8F0] px-6 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md bg-white/95">
      {/* Breadcrumb & Topic title */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono-code font-medium">
          <span>Workspaces</span>
          <span>/</span>
          <span className="text-slate-600">Synthesis Dossier</span>
        </div>
        <div className="h-4 w-px bg-slate-200" />
        <div className="flex items-center gap-2 min-w-0">
          <h2 className="text-sm font-semibold text-slate-900 truncate max-w-xs md:max-w-md lg:max-w-lg">
            {activeTopic || "New Autonomous Research Session"}
          </h2>
          <span className="flex-shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-mono-code font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {confidenceScore}% Fidelity
          </span>
        </div>
      </div>

      {/* View Switcher Tabs & Actions */}
      <div className="flex items-center gap-2">
        {/* View Mode Pills */}
        <div className="hidden sm:flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200/80 text-xs font-medium">
          <button
            onClick={() => setActiveView('report')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
              activeView === 'report'
                ? 'bg-white text-slate-900 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-indigo-500" />
            <span>Report</span>
          </button>

          <button
            onClick={() => setActiveView('critic')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
              activeView === 'critic'
                ? 'bg-white text-slate-900 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
            <span>Critic Audit</span>
          </button>

          <button
            onClick={() => setActiveView('sources')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
              activeView === 'sources'
                ? 'bg-white text-slate-900 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ExternalLink className="w-3.5 h-3.5 text-sky-500" />
            <span>Sources</span>
          </button>

          <button
            onClick={() => setActiveView('dual')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
              activeView === 'dual'
                ? 'bg-white text-slate-900 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <SplitSquareVertical className="w-3.5 h-3.5 text-purple-500" />
            <span>Split View</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 pl-2 border-l border-slate-200">
          <button
            onClick={handleCopy}
            title="Copy Report Markdown"
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200 relative"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>

          <button
            onClick={onDownloadMarkdown}
            title="Download Report .md"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-white border border-[#E8E8F0] hover:bg-slate-50 hover:border-slate-300 shadow-sm transition-all"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden md:inline">Export .md</span>
          </button>

          <button
            onClick={() => setIsTelemetryOpen(!isTelemetryOpen)}
            title="Toggle Telemetry Drawer"
            className={`p-2 rounded-lg border transition-all ${
              isTelemetryOpen
                ? 'bg-indigo-50 border-indigo-200 text-indigo-600'
                : 'bg-white border-[#E8E8F0] text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Terminal className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
