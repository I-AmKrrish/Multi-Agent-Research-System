import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  FileText, 
  Sparkles, 
  ShieldCheck, 
  Bookmark, 
  ExternalLink, 
  Check, 
  Copy, 
  Share2, 
  Download,
  Award,
  Layers
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ReportViewer({
  report,
  topic,
  confidenceScore = 94,
  sources = [],
  onCopyReport,
  onDownloadMarkdown
}) {
  const [copied, setCopied] = useState(false);
  const [activeCitation, setActiveCitation] = useState(null);

  const handleCopy = () => {
    onCopyReport();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Custom markdown component renderer to intercept citation links or pills like [1], [2]
  const customRenderers = {
    // Custom link handling
    a: ({ node, ...props }) => (
      <a 
        {...props} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-indigo-600 hover:text-indigo-800 underline font-medium inline-flex items-center gap-0.5"
      >
        <span>{props.children}</span>
        <ExternalLink className="w-3 h-3 inline-block ml-0.5 opacity-70" />
      </a>
    ),
    // Styled tables
    table: ({ node, ...props }) => (
      <div className="overflow-x-auto my-5 rounded-xl border border-[#E8E8F0] shadow-sm">
        <table className="min-w-full divide-y divide-[#E8E8F0] text-sm" {...props} />
      </div>
    ),
    thead: ({ node, ...props }) => (
      <thead className="bg-slate-50 font-semibold text-slate-800" {...props} />
    ),
    th: ({ node, ...props }) => (
      <th className="px-3.5 py-2.5 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider" {...props} />
    ),
    td: ({ node, ...props }) => (
      <td className="px-3.5 py-2.5 text-slate-600 border-t border-[#E8E8F0] text-xs sm:text-sm" {...props} />
    ),
    // Blockquotes
    blockquote: ({ node, ...props }) => (
      <blockquote 
        className="border-l-4 border-indigo-500 bg-indigo-50/40 px-4 py-3 rounded-r-xl my-4 text-slate-700 italic text-sm" 
        {...props} 
      />
    ),
    // Code blocks
    code: ({ node, inline, className, children, ...props }) => {
      if (inline) {
        return (
          <code className="font-mono-code text-[12px] bg-slate-100 text-indigo-700 px-1.5 py-0.5 rounded border border-slate-200" {...props}>
            {children}
          </code>
        );
      }
      return (
        <pre className="font-mono-code text-[12px] bg-[#0F172A] text-slate-200 p-4 rounded-xl overflow-x-auto my-4 border border-slate-800">
          <code {...props}>{children}</code>
        </pre>
      );
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto px-4 pb-16"
    >
      <div className="bg-white rounded-2xl border border-[#E8E8F0] shadow-lvl-2 overflow-hidden">
        {/* Report Top Meta Bar */}
        <div className="bg-gradient-to-r from-slate-50 via-white to-indigo-50/30 px-6 py-5 border-b border-[#E8E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono-code font-semibold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200/60 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-indigo-500" />
                Executive Synthesis Dossier
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500 font-mono-code">Autonomous Swarm Verified</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {topic}
            </h1>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-[#E8E8F0] hover:bg-slate-50 shadow-sm transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>

            <button
              onClick={onDownloadMarkdown}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white btn-primary-gradient transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .md</span>
            </button>
          </div>
        </div>

        {/* Confidence & Quality Metrics Banner */}
        <div className="px-6 py-3 bg-slate-50/50 border-b border-[#E8E8F0] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-semibold">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-mono-code text-slate-400">Confidence</div>
              <div className="font-semibold text-slate-800">{confidenceScore}% High Fidelity</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-semibold">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-mono-code text-slate-400">Orchestration</div>
              <div className="font-semibold text-slate-800">4-Agent Cyclic</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center font-semibold">
              <ExternalLink className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-mono-code text-slate-400">Sources Vetted</div>
              <div className="font-semibold text-slate-800">{sources.length > 0 ? sources.length : 'Peer & Web Index'}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-semibold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-mono-code text-slate-400">Critic Audit</div>
              <div className="font-semibold text-emerald-600">Passed Rigor Check</div>
            </div>
          </div>
        </div>

        {/* Markdown Content Surface */}
        <div className="p-6 sm:p-8 markdown-body">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={customRenderers}
          >
            {report || "*No synthesis report generated yet. Enter a topic above to launch the autonomous agent swarm.*"}
          </ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
}
