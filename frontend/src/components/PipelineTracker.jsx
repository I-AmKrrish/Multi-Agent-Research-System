import React from 'react';
import { 
  Search, 
  BookOpen, 
  PenTool, 
  ShieldCheck, 
  CheckCircle2, 
  Loader2, 
  ArrowRight,
  Sparkles,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

const STEPS = [
  {
    step: 1,
    name: "Search Agent",
    tool: "Tavily Web Engine",
    description: "Broad query expansion & source indexing",
    icon: Search,
    color: "sky",
    activeBorder: "border-sky-400",
    badgeBg: "bg-sky-50 text-sky-700 border-sky-200"
  },
  {
    step: 2,
    name: "Reader Agent",
    tool: "Deep Content Scraper",
    description: "Extracting DOM & tokenizing technical literature",
    icon: BookOpen,
    color: "blue",
    activeBorder: "border-blue-400",
    badgeBg: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    step: 3,
    name: "Writer Agent",
    tool: "LangChain Synthesis",
    description: "Structuring executive findings & comparative matrices",
    icon: PenTool,
    color: "indigo",
    activeBorder: "border-indigo-400",
    badgeBg: "bg-indigo-50 text-indigo-700 border-indigo-200"
  },
  {
    step: 4,
    name: "Critic Agent",
    tool: "Rigor & Bias Audit",
    description: "Cross-verifying citations & logical consistency",
    icon: ShieldCheck,
    color: "amber",
    activeBorder: "border-amber-400",
    badgeBg: "bg-amber-50 text-amber-700 border-amber-200"
  }
];

export default function PipelineTracker({
  currentStep,
  isRunning,
  elapsedSeconds = 0,
  stageMessage = ''
}) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 mb-6">
      <div className="bg-white rounded-2xl border border-[#E8E8F0] shadow-lvl-1 p-4">
        {/* Pipeline Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E8E8F0]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
            <h3 className="text-xs font-mono-code font-semibold uppercase tracking-wider text-slate-700">
              Autonomous Multi-Agent Orchestration Sequence
            </h3>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono-code">
            {isRunning && (
              <span className="flex items-center gap-1.5 text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200/60 font-medium">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Elapsed: {elapsedSeconds}s</span>
              </span>
            )}
            <span className="text-slate-400">
              Pipeline Stage: <span className="text-slate-900 font-semibold">{currentStep}/4</span>
            </span>
          </div>
        </div>

        {/* 4 Agent Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative">
          {STEPS.map((s) => {
            const isCompleted = currentStep > s.step;
            const isCurrent = isRunning && currentStep === s.step;
            const isPending = currentStep < s.step;
            const Icon = s.icon;

            return (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: s.step * 0.1 }}
                className={`relative p-3.5 rounded-xl border transition-all duration-300 ${
                  isCurrent
                    ? `${s.activeBorder} bg-gradient-to-b from-white to-indigo-50/20 shadow-md ring-2 ring-indigo-500/10 agent-active-pulse`
                    : isCompleted
                    ? 'border-emerald-200/80 bg-emerald-50/20 text-slate-900'
                    : 'border-[#E8E8F0] bg-slate-50/50 text-slate-500 opacity-75'
                }`}
              >
                {/* Step indicator header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      isCurrent
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : isCompleted
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 text-slate-500'
                    }`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-semibold text-slate-900">
                      {s.name}
                    </span>
                  </div>

                  <div>
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : isCurrent ? (
                      <Loader2 className="w-4 h-4 text-indigo-600 animate-spin" />
                    ) : (
                      <span className="text-[10px] font-mono-code text-slate-400">
                        #{s.step}
                      </span>
                    )}
                  </div>
                </div>

                {/* Subtitle & details */}
                <div className="space-y-1">
                  <div className="text-[11px] font-mono-code font-medium text-slate-500 flex items-center gap-1">
                    <Zap className="w-2.8 h-2.8 text-indigo-500" />
                    <span>{s.tool}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                    {s.description}
                  </p>
                </div>

                {/* Status chip */}
                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono-code">
                  <span className={`px-1.5 py-0.5 rounded font-medium ${
                    isCurrent
                      ? 'bg-indigo-100 text-indigo-800 animate-pulse'
                      : isCompleted
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-500'
                  }`}>
                    {isCurrent ? 'PROCESSING' : isCompleted ? 'VERIFIED' : 'QUEUED'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Live stage action alert message */}
        {stageMessage && isRunning && (
          <div className="mt-3 px-3 py-2 rounded-xl bg-indigo-50/70 border border-indigo-200/60 flex items-center gap-2 text-xs font-mono-code text-indigo-900">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
            <span className="font-semibold text-indigo-700">Current Action:</span>
            <span className="truncate">{stageMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
}
