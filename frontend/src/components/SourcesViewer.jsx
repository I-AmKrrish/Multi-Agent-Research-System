import React, { useState } from 'react';
import { 
  Globe, 
  ExternalLink, 
  Copy, 
  Check, 
  FileCode, 
  Database, 
  Search, 
  FileText,
  Bookmark
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function SourcesViewer({
  searchResults = '',
  scrapedContent = '',
  topic
}) {
  const [copiedSection, setCopiedSection] = useState(null);

  const handleCopy = (text, section) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  // Extract URLs from searchResults string
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const detectedUrls = searchResults ? searchResults.match(urlRegex) || [] : [];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto px-4 pb-16 space-y-6"
    >
      {/* Search Engine Retrieval Sources */}
      <div className="bg-white rounded-2xl border border-[#E8E8F0] shadow-lvl-1 p-6">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E8E8F0]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Agent 1: Tavily Search Ingestion
              </h3>
              <p className="text-xs text-slate-500">
                Extracted URLs and index results discovered for: "{topic}"
              </p>
            </div>
          </div>

          <button
            onClick={() => handleCopy(searchResults, 'search')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-all"
          >
            {copiedSection === 'search' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Raw</span>
              </>
            )}
          </button>
        </div>

        {/* Detected URL badges */}
        {detectedUrls.length > 0 && (
          <div className="mb-4 space-y-2">
            <div className="text-[11px] font-mono-code font-semibold uppercase tracking-wider text-slate-400">
              Primary Source Citations ({detectedUrls.length})
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {detectedUrls.map((url, idx) => {
                let domain = '';
                try {
                  domain = new URL(url).hostname;
                } catch {
                  domain = url;
                }
                return (
                  <a
                    key={idx}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200/80 hover:border-sky-300 hover:bg-sky-50/40 transition-all text-xs group"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-slate-500 group-hover:text-sky-600 flex-shrink-0">
                        <Globe className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-slate-800 truncate group-hover:text-sky-700">
                          {domain}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono-code truncate max-w-[200px]">
                          {url}
                        </div>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-600 flex-shrink-0 ml-2" />
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* Raw Search Results text */}
        <div className="bg-slate-50 p-4 rounded-xl border border-[#E8E8F0] font-mono-code text-xs text-slate-700 whitespace-pre-wrap max-h-64 overflow-y-auto leading-relaxed">
          {searchResults || "No search results captured."}
        </div>
      </div>

      {/* Scraped Content Deep Dive */}
      <div className="bg-white rounded-2xl border border-[#E8E8F0] shadow-lvl-1 p-6">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E8E8F0]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Agent 2: Scraped Source Content
              </h3>
              <p className="text-xs text-slate-500">
                Authoritative article text harvested by the Reader Agent for synthesis
              </p>
            </div>
          </div>

          <button
            onClick={() => handleCopy(scrapedContent, 'scraped')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-all"
          >
            {copiedSection === 'scraped' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Text</span>
              </>
            )}
          </button>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-[#E8E8F0] font-mono-code text-xs text-slate-700 whitespace-pre-wrap max-h-80 overflow-y-auto leading-relaxed">
          {scrapedContent || "No scraped content available."}
        </div>
      </div>
    </motion.div>
  );
}
