import React from 'react';
import { Waves, Sparkles, SlidersHorizontal } from 'lucide-react';

interface HeaderProps {
  onOpenQuiz: () => void;
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuiz, onOpenAdmin }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single element) */}
        <a
          href="#"
          className="text-lg font-bold tracking-tight text-slate-900 hover:text-teal-600 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 font-mono"
        >
          <Waves className="w-5 h-5 text-teal-600" />
          <span>New to Kayaker.jp</span>
        </a>

        {/* Zone 2: 4-5 Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <a
            href="#gear-guide"
            className="hover:text-teal-600 transition-colors whitespace-nowrap shrink-0"
          >
            ギア選び
          </a>
          <a
            href="#paddle-guide"
            className="hover:text-teal-600 transition-colors whitespace-nowrap shrink-0"
          >
            パドルの選び方
          </a>
          <a
            href="#paddler-tips"
            className="hover:text-teal-600 transition-colors whitespace-nowrap shrink-0"
          >
            知っててTips
          </a>
          <a
            href="#kayaker-essence"
            className="hover:text-teal-600 transition-colors whitespace-nowrap shrink-0"
          >
            知っててEssence
          </a>
          <a
            href="#river-flow-tips"
            className="hover:text-teal-600 transition-colors whitespace-nowrap shrink-0"
          >
            川Tips
          </a>
          <a
            href="#safety-training"
            className="hover:text-teal-600 transition-colors whitespace-nowrap shrink-0"
          >
            安全講習＆救助
          </a>
          <a
            href="#river-map"
            className="hover:text-teal-600 transition-colors whitespace-nowrap shrink-0"
          >
            リバーマップ
          </a>
          <a
            href="#glossary"
            className="hover:text-teal-600 transition-colors whitespace-nowrap shrink-0"
          >
            用語集
          </a>
          <a
            href="#about"
            className="hover:text-teal-600 transition-colors whitespace-nowrap shrink-0"
          >
            About
          </a>
        </nav>

        {/* Zone 3: Actions (Quiz & Admin trigger) */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenAdmin}
            className="px-3 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 shadow-xs"
            title="アフィリエイト収益管理"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-teal-600" />
            <span className="hidden sm:inline">収益管理</span>
          </button>

          <button
            onClick={onOpenQuiz}
            className="px-4 py-2 text-xs font-bold text-white bg-teal-600 rounded-lg hover:bg-teal-500 active:bg-teal-700 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>初心者ギア診断</span>
          </button>
        </div>
      </div>
    </header>
  );
};
