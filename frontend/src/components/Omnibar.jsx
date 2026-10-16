import React, { useState } from 'react';
import { Sparkles, ArrowRight, Compass, Cpu, Layers, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const SUGGESTIONS = [
  "Solid-State Battery Electrolytes Breakthroughs",
  "Autonomous Agent Orchestration in 2026",
  "Quantum Computing Topological Qubits",
  "Next-Gen Small Modular Nuclear Reactors"
];

export default function Omnibar({
  onLaunchResearch,
  isRunning,
  activeTopic
}) {
  const [topic, setTopic] = useState('');
  const [researchMode, setResearchMode] = useState('deep'); // 'deep' | 'fast' | 'technical'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!topic.trim() || isRunning) return;
    onLaunchResearch(topic.trim(), researchMode);
  };

  const handleSelectSuggestion = (suggestion) => {
    setTopic(suggestion);
    if (!isRunning) {
      onLaunchResearch(suggestion, researchMode);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border border-[#E8E8F0] shadow-lvl-2 p-3 sm:p-4 relative focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all duration-200"
      >
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Main Input Field */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>

            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={isRunning}
              placeholder="What scientific, technical, or market topic should the multi-agent swarm investigate?"
              className="flex-1 bg-transparent text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none disabled:opacity-60"
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={!topic.trim() || isRunning}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide text-white transition-all flex-shrink-0 ${
                !topic.trim() || isRunning
                  ? 'bg-slate-300 cursor-not-allowed opacity-80'
                  : 'btn-primary-gradient cursor-pointer'
              }`}
            >
              {isRunning ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Synthesizing...</span>
                </>
              ) : (
                <>
                  <span>Launch Agents</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </div>

          {/* Research Depth Mode Toggles */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-1.5 text-slate-500">
              <span className="font-mono-code text-[11px] font-medium uppercase tracking-wider text-slate-400">
                Agent Protocol:
              </span>
              <button
                type="button"
                onClick={() => setResearchMode('deep')}
                className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                  researchMode === 'deep'
                    ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200/60'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Deep Synthesis (4-Agent Swarm)
              </button>
              <button
                type="button"
                onClick={() => setResearchMode('fast')}
                className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                  researchMode === 'fast'
                    ? 'bg-sky-50 text-sky-700 font-semibold border border-sky-200/60'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Executive Fast-Track
              </button>
              <button
                type="button"
                onClick={() => setResearchMode('technical')}
                className={`px-2.5 py-1 rounded-md transition-all font-medium ${
                  researchMode === 'technical'
                    ? 'bg-purple-50 text-purple-700 font-semibold border border-purple-200/60'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Scientific Audit Focus
              </button>
            </div>

            <span className="text-[11px] text-slate-400 font-mono-code hidden sm:inline">
              Press ↵ Enter to launch
            </span>
          </div>
        </form>
      </motion.div>

      {/* Suggested Inquiries Quick-Tags */}
      <div className="flex items-center flex-wrap gap-2 mt-3 text-xs">
        <span className="text-[11px] font-mono-code font-semibold uppercase tracking-wider text-slate-400">
          Try Inquiries:
        </span>
        {SUGGESTIONS.map((sug, i) => (
          <button
            key={i}
            onClick={() => handleSelectSuggestion(sug)}
            disabled={isRunning}
            className="text-[11px] px-2.5 py-1 rounded-full bg-white border border-[#E8E8F0] hover:border-indigo-300 hover:bg-indigo-50/50 hover:text-indigo-600 text-slate-600 transition-all font-medium shadow-sm"
          >
            {sug}
          </button>
        ))}
      </div>
    </div>
  );
}
