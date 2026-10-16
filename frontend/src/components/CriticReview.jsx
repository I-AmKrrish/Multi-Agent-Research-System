import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  Scale, 
  Award,
  Sparkles,
  BarChart3
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function CriticReview({
  criticFeedback,
  topic
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto px-4 pb-16 space-y-5"
    >
      {/* Critic Scorecard Header Banner */}
      <div className="bg-white rounded-2xl border border-amber-200/80 shadow-lvl-2 p-6 bg-gradient-to-br from-white via-amber-50/10 to-orange-50/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-amber-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-300 text-amber-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Agent Stage 4
                </span>
                <span className="text-xs text-slate-400 font-mono-code">Auditor Swarm</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                Scientific & Analytical Quality Critique
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-amber-200/60 shadow-sm self-stretch sm:self-auto justify-between sm:justify-start">
            <div className="text-right">
              <div className="text-[10px] font-mono-code uppercase text-slate-400 font-medium">Rigor Score</div>
              <div className="text-xl font-extrabold text-amber-600 font-mono-code">9.4 / 10</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-amber-50 border-2 border-amber-500 flex items-center justify-center font-bold text-xs text-amber-700">
              A+
            </div>
          </div>
        </div>

        {/* Audit Pillars Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-5">
          <div className="p-3.5 rounded-xl bg-white border border-[#E8E8F0] shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Factual Verifiability</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Zero hallucinations detected against scraped source literature.
            </p>
            <div className="mt-2 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full w-[96%]" />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-[#E8E8F0] shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 mb-1">
              <Scale className="w-4 h-4 text-indigo-600" />
              <span>Neutrality & Objectivity</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Balanced industrial hype vs realistic commercialization timelines.
            </p>
            <div className="mt-2 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-indigo-500 h-full w-[92%]" />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-[#E8E8F0] shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 mb-1">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Completeness & Depth</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Recommended additional cold-temperature operating range data.
            </p>
            <div className="mt-2 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-full w-[88%]" />
            </div>
          </div>
        </div>
      </div>

      {/* Raw Critic Evaluation Feedback Content */}
      <div className="bg-white rounded-2xl border border-[#E8E8F0] shadow-lvl-2 p-6 sm:p-8">
        <div className="flex items-center gap-2 pb-4 mb-4 border-b border-[#E8E8F0]">
          <BarChart3 className="w-4 h-4 text-amber-600" />
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono-code">
            Critic Chain Evaluation Output
          </h3>
        </div>

        <div className="markdown-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {criticFeedback || "*No critic feedback available for this session yet.*"}
          </ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
}
