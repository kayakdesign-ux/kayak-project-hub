import React, { useState } from 'react';
import {
  RIVER_SIGNS,
  RIVER_HAZARDS,
  BODY_HAZARDS,
  RESCUE_GEARS,
  FLOW_PROTOCOLS,
  TEAM_RESCUE_TIERS,
} from '../data/riverSafetyData';
import { SAFETY_CHECKLIST } from '../data/safetyData';
import {
  LifeBuoy,
  AlertTriangle,
  ShieldAlert,
  CheckCircle2,
  Volume2,
  Users,
  Compass,
  ArrowRight,
  RotateCcw,
  Square,
  CheckSquare,
  Info,
  Waves,
  HeartPulse,
  Flame,
  ThermometerSnowflake,
  Droplet,
  ExternalLink,
} from 'lucide-react';
import rescueRopeworkImg from '../assets/images/rescue_ropework_positioning_1792156164656.jpg';
import rescueThrowBagImg from '../assets/images/rescue_throw_bag_correct_1792154246228.jpg';

export const SafetySection: React.FC = () => {
  // Active filter or selected item for Chapter 02 (River vs Body)
  const [hazardTab, setHazardTab] = useState<'river' | 'body' | 'all'>('all');
  
  // Selected flow protocol in Chapter 04
  const [selectedFlowType, setSelectedFlowType] = useState<'slow' | 'swift' | 'violent'>('swift');

  // Selected team rescue tier in Chapter 04
  const [selectedTier, setSelectedTier] = useState<number>(1);

  // Pre-trip checklist state with localStorage
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('rapidpulse_safety_checklist');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('rapidpulse_safety_checklist', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const resetChecklist = () => {
    setCheckedItems({});
    try {
      localStorage.removeItem('rapidpulse_safety_checklist');
    } catch (e) {
      console.error(e);
    }
  };

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalCount = SAFETY_CHECKLIST.length;
  const isAllChecked = checkedCount === totalCount;

  const currentFlow = FLOW_PROTOCOLS.find((f) => f.flowType === selectedFlowType) || FLOW_PROTOCOLS[1];
  const currentTier = TEAM_RESCUE_TIERS.find((t) => t.tierNumber === selectedTier) || TEAM_RESCUE_TIERS[0];

  return (
    <section id="safety-training" className="py-20 lg:py-28 bg-slate-100/90 border-b border-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* ========================================================================= */}
        {/* SECTION 02 MAIN HEADER & CHAPTER QUICK JUMP BAR */}
        {/* ========================================================================= */}
        <div className="border-b border-slate-300 pb-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-teal-800 font-bold mb-2 uppercase tracking-wider">
                <span className="px-2 py-0.5 bg-teal-100 rounded text-teal-900">Section 03</span>
                <span aria-hidden="true">·</span>
                <span>WhiteWater Safety & Rescue Master Manual</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                安全講習 ＆ レスキューマニュアル
              </h2>
              <p className="text-slate-700 text-base mt-2 max-w-3xl leading-relaxed">
                激流での事故原因の9割は事前の知識と装備の誤用によるものです。
                水上の共通言語「リバーサイン」、川と身体のハザード、命を繋ぐレスキュー用具、そして流速別の実践救助手順を体系化しました。
              </p>
            </div>

            {/* Quick Warning Callout */}
            <div className="bg-rose-50 border-2 border-rose-300 rounded-xl p-4 text-xs text-rose-950 max-w-md shadow-sm shrink-0">
              <div className="flex items-center gap-2 font-bold text-rose-900 text-sm mb-1">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>最優先の安全鉄則（黄金律）</span>
              </div>
              <p className="leading-snug text-rose-900/90 font-medium">
                激流の瀬の中では絶対に立とうとしない（フットエントラップメント防止）。
                優先順位は常に「自分 ＞ 仲間 ＞ スイマー ＞ パドル ＞ ボート」を死守すること。
              </p>
            </div>
          </div>

          {/* Subnav Quick Navigation Pills */}
          <div className="mt-8 pt-4 border-t border-slate-200 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 mr-2">章へジャンプ:</span>
            <a
              href="#chapter-01"
              className="px-3 py-1.5 text-xs font-medium bg-white hover:bg-teal-50 hover:text-teal-700 text-slate-700 rounded-lg border border-slate-300 shadow-xs transition-colors"
            >
              Chap 01: リバーサイン (7選)
            </a>
            <a
              href="#chapter-02"
              className="px-3 py-1.5 text-xs font-medium bg-white hover:bg-teal-50 hover:text-teal-700 text-slate-700 rounded-lg border border-slate-300 shadow-xs transition-colors"
            >
              Chap 02: 川の5大危険 & 身体の3大危険
            </a>
            <a
              href="#chapter-03"
              className="px-3 py-1.5 text-xs font-medium bg-white hover:bg-teal-50 hover:text-teal-700 text-slate-700 rounded-lg border border-slate-300 shadow-xs transition-colors"
            >
              Chap 03: 命を守るレスキュー用具
            </a>
            <a
              href="#chapter-04"
              className="px-3 py-1.5 text-xs font-medium bg-white hover:bg-teal-50 hover:text-teal-700 text-slate-700 rounded-lg border border-slate-300 shadow-xs transition-colors"
            >
              Chap 04: 実践レスキューマニュアル
            </a>
            <a
              href="#chapter-checklist"
              className="px-3 py-1.5 text-xs font-medium bg-teal-50 hover:bg-teal-100 text-teal-800 rounded-lg border border-teal-300 shadow-xs transition-colors"
            >
              出艇前チェックリスト
            </a>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CHAPTER 01: リバーサイン（手話・パドル・ホイッスル） */}
        {/* ========================================================================= */}
        <div id="chapter-01" className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-300 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-teal-700 font-bold mb-1">
                <span className="px-2 py-0.5 bg-teal-100 rounded text-teal-900">Chapter 01</span>
                <span>River Communication Protocols</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                リバーサイン（手話・パドル・ホイッスル）
              </h3>
              <p className="text-slate-600 text-sm mt-1">
                轟音の激流では声は一切届きません。世界共通の「手話」「パドルの構え」「救助笛の吹鳴」で瞬時に意思疎通を図ります。
              </p>
            </div>
            <div className="text-xs bg-slate-200/80 text-slate-700 px-3 py-2 rounded-lg font-mono">
              全7シグナル（最重要 2 / 重要 2 / 誘導・集合 3）
            </div>
          </div>

          {/* Cards Grid: 7 River Signs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RIVER_SIGNS.map((sign) => (
              <div
                key={sign.id}
                className="bg-white rounded-2xl border-2 border-slate-200 hover:border-teal-400 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Badge: Importance & Visual Indicator */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border shadow-2xs ${sign.importanceColor}`}
                    >
                      {sign.importance}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                      {sign.enTitle}
                    </span>
                  </div>

                  <h4 className="text-lg font-extrabold text-slate-900 mb-2">{sign.title}</h4>

                  {/* SVG Gesture Schematic Visual Box */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 mb-4 flex items-center gap-3">
                    <div className="w-14 h-14 rounded-lg bg-teal-900/5 border border-teal-200/50 flex items-center justify-center shrink-0">
                      {/* Interactive Gesture SVGs */}
                      {sign.visualType === 'sos' && (
                        <svg className="w-9 h-9 text-rose-600" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          {/* Person with arms crossed in X overhead */}
                          <circle cx="24" cy="30" r="4" fill="currentColor" />
                          <path d="M24 34v10" />
                          <path d="M12 10 L36 26" strokeWidth="3" />
                          <path d="M36 10 L12 26" strokeWidth="3" />
                        </svg>
                      )}
                      {sign.visualType === 'first-aid' && (
                        <svg className="w-9 h-9 text-rose-600" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          {/* Hand on head */}
                          <circle cx="24" cy="24" r="6" />
                          <path d="M24 30v14" />
                          <path d="M14 16 C18 10, 24 10, 24 18" strokeWidth="3" />
                          <path d="M32 20v-6h4" />
                        </svg>
                      )}
                      {sign.visualType === 'go' && (
                        <svg className="w-9 h-9 text-emerald-600" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          {/* Arm pointing straight up */}
                          <circle cx="24" cy="28" r="4" />
                          <path d="M24 32v12" />
                          <path d="M24 24 V6 M20 10 L24 6 L28 10" strokeWidth="3" />
                        </svg>
                      )}
                      {sign.visualType === 'stop' && (
                        <svg className="w-9 h-9 text-amber-600" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          {/* Arms spread horizontal */}
                          <circle cx="24" cy="24" r="4" />
                          <path d="M24 28v14" />
                          <path d="M6 24 H42" strokeWidth="3" />
                        </svg>
                      )}
                      {sign.visualType === 'eddy' && (
                        <svg className="w-9 h-9 text-teal-600" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          {/* Swirling circle spiral */}
                          <circle cx="24" cy="30" r="4" />
                          <path d="M24 34v10" />
                          <path d="M24 26 L34 16" />
                          <path d="M38 12 A 6 6 0 1 0 32 16 A 10 10 0 1 0 24 8" strokeWidth="2.5" />
                        </svg>
                      )}
                      {sign.visualType === 'eddy-point' && (
                        <svg className="w-9 h-9 text-teal-600" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          {/* Pointing sharply forward */}
                          <circle cx="20" cy="26" r="4" />
                          <path d="M20 30v14" />
                          <path d="M20 22 L38 12 M34 8 L38 12 L34 16" strokeWidth="3" />
                        </svg>
                      )}
                      {sign.visualType === 'gather' && (
                        <svg className="w-9 h-9 text-sky-600" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          {/* Arms overhead circle */}
                          <circle cx="24" cy="28" r="4" />
                          <path d="M24 32v12" />
                          <path d="M14 26 C12 14, 36 14, 34 26" strokeWidth="3" />
                        </svg>
                      )}
                    </div>

                    <div className="text-xs space-y-1">
                      <div className="text-slate-800 font-bold leading-tight">
                        {sign.gesture}
                      </div>
                    </div>
                  </div>

                  {/* Paddle Sign & Whistle Codes */}
                  <div className="space-y-2 text-xs text-slate-700 bg-slate-50/70 p-3 rounded-lg border border-slate-200/80 mb-3">
                    <div className="flex items-start gap-1.5">
                      <span className="font-bold text-teal-800 shrink-0">🛶 パドル:</span>
                      <span className="leading-snug">{sign.paddleGesture}</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <Volume2 className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span className="font-bold text-amber-800 shrink-0">救助笛:</span>
                      <span className="leading-snug font-mono text-slate-800">{sign.whistleCode}</span>
                    </div>
                  </div>

                  {/* Meaning */}
                  <div className="text-xs text-slate-600 mb-3">
                    <span className="font-bold text-slate-800 block mb-0.5">伝達意図:</span>
                    {sign.meaning}
                  </div>
                </div>

                {/* Practical Tip */}
                <div className="pt-3 border-t border-slate-100 text-[11px] text-teal-900 bg-teal-50/50 p-2.5 rounded-lg border border-teal-100">
                  <span className="font-bold block mb-0.5">💡 現場での実践指示:</span>
                  {sign.actionGuidance}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CHAPTER 02: 川の５つの危険 ＆ ３つの体の危険 */}
        {/* ========================================================================= */}
        <div id="chapter-02" className="space-y-8 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-300 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-teal-700 font-bold mb-1">
                <span className="px-2 py-0.5 bg-teal-100 rounded text-teal-900">Chapter 02</span>
                <span>River Hazards & Physiological Traps</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                川の５つの危険 ＆ ３つの体の危険
              </h3>
              <p className="text-slate-600 text-sm mt-1">
                水理環境がもたらす「川の物理ハザード」と、過酷な激流環境で命を脅かす「生体生理ハザード」を徹底解明。
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center bg-slate-200/80 p-1 rounded-xl text-xs font-bold text-slate-700 shrink-0">
              <button
                onClick={() => setHazardTab('all')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  hazardTab === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                すべて (8項目)
              </button>
              <button
                onClick={() => setHazardTab('river')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  hazardTab === 'river' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                🌊 川の危険 (5選)
              </button>
              <button
                onClick={() => setHazardTab('body')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  hazardTab === 'body' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                ❤️‍🩹 体の危険 (3選)
              </button>
            </div>
          </div>

          {/* Subsection 1: 川の5つの危険 */}
          {(hazardTab === 'all' || hazardTab === 'river') && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-800 bg-slate-200/60 px-3 py-1.5 rounded-lg w-fit">
                <Waves className="w-4 h-4 text-teal-600" />
                <span>川の５つの危険（環境・構造物ハザード）</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {RIVER_HAZARDS.map((hazard) => (
                  <div
                    key={hazard.id}
                    className="bg-white rounded-2xl border-2 border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono font-bold text-slate-400">
                          HAZARD #{hazard.number}
                        </span>
                        <span
                          className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${hazard.dangerColor}`}
                        >
                          {hazard.dangerLevel}
                        </span>
                      </div>

                      <h4 className="text-base font-extrabold text-slate-900 mb-1 leading-snug">
                        {hazard.name}
                      </h4>
                      <div className="text-[11px] font-mono text-slate-400 mb-3">{hazard.enName}</div>

                      <p className="text-xs text-slate-700 leading-relaxed mb-3 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        {hazard.summary}
                      </p>

                      <div className="text-xs text-slate-600 mb-4 space-y-1">
                        <span className="font-bold text-slate-800 block text-[11px]">発生メカニズム:</span>
                        <p className="leading-relaxed">{hazard.mechanism}</p>
                      </div>

                      {/* Escape Protocol */}
                      <div className="mb-4">
                        <span className="font-bold text-rose-900 block text-xs mb-1.5 flex items-center gap-1">
                          <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                          脱出プロトコル ＆ 対処法:
                        </span>
                        <ul className="space-y-1.5 text-xs text-slate-700">
                          {hazard.escapeProtocol.map((proto, idx) => (
                            <li key={idx} className="flex items-start gap-1.5 leading-snug">
                              <span className="text-rose-500 font-bold shrink-0 mt-0.5">・</span>
                              <span>{proto}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 text-[11px] text-teal-900 bg-teal-50/60 p-2.5 rounded-lg">
                      <span className="font-bold block mb-0.5">🛡️ 事前予防策:</span>
                      {hazard.prevention}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Subsection 2: 3つの体の危険 */}
          {(hazardTab === 'all' || hazardTab === 'body') && (
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-800 bg-slate-200/60 px-3 py-1.5 rounded-lg w-fit">
                <HeartPulse className="w-4 h-4 text-rose-600" />
                <span>３つの体の危険（生体生理ハザード）</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {BODY_HAZARDS.map((body) => (
                  <div
                    key={body.id}
                    className="bg-white rounded-2xl border-2 border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5">
                          {body.id === 'body-dehydration' && <Droplet className="w-4 h-4 text-sky-500" />}
                          {body.id === 'body-hypothermia' && <ThermometerSnowflake className="w-4 h-4 text-cyan-600" />}
                          {body.id === 'body-hyperthermia' && <Flame className="w-4 h-4 text-amber-500" />}
                          <span className="text-xs font-mono font-bold text-slate-400">
                            BODY #{body.number}
                          </span>
                        </div>
                        <span
                          className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${body.dangerColor}`}
                        >
                          {body.dangerLevel}
                        </span>
                      </div>

                      <h4 className="text-base font-extrabold text-slate-900 mb-1 leading-snug">
                        {body.name}
                      </h4>
                      <div className="text-[11px] font-mono text-slate-400 mb-3">{body.enName}</div>

                      <p className="text-xs text-slate-700 leading-relaxed mb-3 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        {body.summary}
                      </p>

                      <div className="text-xs text-slate-600 mb-4 space-y-1">
                        <span className="font-bold text-slate-800 block text-[11px]">生理的メカニズム:</span>
                        <p className="leading-relaxed">{body.mechanism}</p>
                      </div>

                      {/* Escape & Emergency Treatment */}
                      <div className="mb-4">
                        <span className="font-bold text-amber-900 block text-xs mb-1.5 flex items-center gap-1">
                          <HeartPulse className="w-3.5 h-3.5 text-amber-600" />
                          現場での緊急応急処置:
                        </span>
                        <ul className="space-y-1.5 text-xs text-slate-700">
                          {body.escapeProtocol.map((proto, idx) => (
                            <li key={idx} className="flex items-start gap-1.5 leading-snug">
                              <span className="text-amber-500 font-bold shrink-0 mt-0.5">・</span>
                              <span>{proto}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 text-[11px] text-teal-900 bg-teal-50/60 p-2.5 rounded-lg">
                      <span className="font-bold block mb-0.5">🛡️ 水上での予防プロトコル:</span>
                      {body.prevention}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* CHAPTER 03: 命を守るレスキュー用具 */}
        {/* ========================================================================= */}
        <div id="chapter-03" className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-300 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-teal-700 font-bold mb-1">
                <span className="px-2 py-0.5 bg-teal-100 rounded text-teal-900">Chapter 03</span>
                <span>Life-Saving Rescue Equipment Anatomy</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                命を守るレスキュー用具
              </h3>
              <p className="text-slate-600 text-sm mt-1">
                ホワイトウォーター救助を成立させる4大専門装備。作動原理、やってはいけない致命的NG操作、適正スペックを解説。
              </p>
            </div>
          </div>

          {/* Rescue Image Banner */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900 text-white rounded-2xl overflow-hidden shadow-lg border border-slate-800">
            <div className="relative h-64 md:h-auto min-h-[220px]">
              <img
                src={rescueThrowBagImg}
                alt="スローバッグのアンダーハンド投擲"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] font-mono bg-teal-500 text-white px-2 py-0.5 rounded font-bold uppercase">
                  Throw Bag Technique
                </span>
                <p className="text-xs text-slate-200 mt-1 font-medium">
                  手元でロープ端末を保持し、バッグ本体を力強く押し出すアンダースロー投擲。
                </p>
              </div>
            </div>

            <div className="relative h-64 md:h-auto min-h-[220px]">
              <img
                src={rescueRopeworkImg}
                alt="レスキュアーのポジショニングと連携"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] font-mono bg-amber-500 text-white px-2 py-0.5 rounded font-bold uppercase">
                  Rescuer Stance
                </span>
                <p className="text-xs text-slate-200 mt-1 font-medium">
                  ロープを手首に絶対に巻かず、低重心スタンスで岩に体重を預けて衝撃を逃がす。
                </p>
              </div>
            </div>
          </div>

          {/* 4 Rescue Gears Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RESCUE_GEARS.map((gear) => (
              <div
                key={gear.id}
                className="bg-white rounded-2xl border-2 border-slate-200 p-6 shadow-sm hover:shadow-md transition-all space-y-4"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-teal-700 uppercase tracking-wider block mb-1">
                    {gear.enName}
                  </span>
                  <h4 className="text-lg font-extrabold text-slate-900">{gear.name}</h4>
                  <p className="text-xs text-teal-800 font-medium mt-1 bg-teal-50 p-2 rounded-lg border border-teal-100">
                    役割: {gear.role}
                  </p>
                </div>

                <div className="space-y-1.5 text-xs text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-900 block text-xs">
                    ⚙️ {gear.mechanismTitle}
                  </span>
                  <p className="leading-relaxed">{gear.mechanismDesc}</p>
                </div>

                {/* DO & DONT */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-emerald-950">
                    <span className="font-bold text-emerald-800 block mb-1">⭕ 正しい運用 (DO):</span>
                    <p className="leading-snug">{gear.doAndDont.do}</p>
                  </div>
                  <div className="bg-rose-50 border border-rose-200 rounded-lg p-3 text-rose-950">
                    <span className="font-bold text-rose-800 block mb-1">❌ 致命的NG操作 (DON'T):</span>
                    <p className="leading-snug">{gear.doAndDont.dont}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600">
                  <div>
                    <span className="font-bold text-slate-800">推奨仕様: </span>
                    <span className="text-slate-700">{gear.recommendedSpec}</span>
                  </div>
                  <div className="text-[11px] text-teal-700 font-mono bg-teal-50 px-2 py-0.5 rounded">
                    要点検: {gear.criticalCheck}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CHAPTER 04: 実践レスキューマニュアル */}
        {/* ========================================================================= */}
        <div id="chapter-04" className="space-y-10 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-300 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-teal-700 font-bold mb-1">
                <span className="px-2 py-0.5 bg-teal-100 rounded text-teal-900">Chapter 04</span>
                <span>Live Action Rescue & Self-Rescue Protocols</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                実践レスキューマニュアル
              </h3>
              <p className="text-slate-600 text-sm mt-1">
                沈脱（ウェットエグジット）直後の流速別ボート回収プロトコル、自力脱出泳法、そしてチームスローロープレスキューの3段階システム。
              </p>
            </div>
          </div>

          {/* Module 4-A: 流速別ボート回収プロトコル（緩流・急流・激流） */}
          <div className="bg-white rounded-2xl border-2 border-slate-300 p-6 lg:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-teal-800 uppercase tracking-wider block">
                  Protocol 01
                </span>
                <h4 className="text-xl font-extrabold text-slate-900">
                  沈脱（ウェットエグジット）からボート回収プロトコル
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  川の流速（緩流・急流・激流）に応じて、回収の判断と優先順位が180度変わります。
                </p>
              </div>

              {/* Selector Tabs */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-700 shrink-0">
                <button
                  onClick={() => setSelectedFlowType('slow')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    selectedFlowType === 'slow' ? 'bg-teal-600 text-white shadow-xs' : 'hover:text-slate-900'
                  }`}
                >
                  🟢 緩流（プール・静水）
                </button>
                <button
                  onClick={() => setSelectedFlowType('swift')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    selectedFlowType === 'swift' ? 'bg-teal-600 text-white shadow-xs' : 'hover:text-slate-900'
                  }`}
                >
                  🟡 急流（Class II〜III）
                </button>
                <button
                  onClick={() => setSelectedFlowType('violent')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    selectedFlowType === 'violent' ? 'bg-teal-600 text-white shadow-xs' : 'hover:text-slate-900'
                  }`}
                >
                  🔴 激流（Class IV〜V）
                </button>
              </div>
            </div>

            {/* Selected Protocol Highlight Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <span className="text-xs font-bold text-teal-800">対象水域:</span>
                  <h5 className="text-lg font-extrabold text-slate-900">{currentFlow.flowRate}</h5>
                </div>
                <div className="bg-teal-900 text-white px-4 py-2 rounded-xl text-xs font-mono font-bold shadow-sm">
                  鉄則: {currentFlow.goldenRule}
                </div>
              </div>

              {/* Action Columns */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="font-bold text-teal-800 block mb-1 text-xs">🛶 ボートの扱い</span>
                  <p className="text-slate-700 leading-relaxed">{currentFlow.boatHandling}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="font-bold text-teal-800 block mb-1 text-xs">🏓 パドルの扱い</span>
                  <p className="text-slate-700 leading-relaxed">{currentFlow.paddleHandling}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="font-bold text-teal-800 block mb-1 text-xs">🏊 スイマー本人の行動</span>
                  <p className="text-slate-700 leading-relaxed">{currentFlow.swimmerAction}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="font-bold text-teal-800 block mb-1 text-xs">👥 周囲チームの行動</span>
                  <p className="text-slate-700 leading-relaxed">{currentFlow.teamAction}</p>
                </div>
              </div>

              {/* Step by Step Breakdown */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-800 block">実践実行ステップ:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {currentFlow.steps.map((st, i) => (
                    <div
                      key={i}
                      className="bg-white p-3 rounded-lg border border-slate-200 text-xs text-slate-800 leading-relaxed flex items-start gap-2"
                    >
                      <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-900 flex items-center justify-center font-mono font-bold text-[11px] shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{st}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Module 4-B: 2大泳法の使い分け（フローティングポジション vs アグレッシブスイム） */}
          <div className="bg-white rounded-2xl border-2 border-slate-300 p-6 lg:p-8 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-mono font-bold text-teal-800 uppercase tracking-wider block">
                Protocol 02
              </span>
              <h4 className="text-xl font-extrabold text-slate-900">
                スイム姿勢：フローティングポジション（ディフェンシブ） vs アグレッシブスイム
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                川で泳ぐ時は「流される姿勢」と「突破する姿勢」を瞬時にスイッチする必要があります。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Defensive Swim */}
              <div className="bg-slate-50 border-2 border-teal-200 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-teal-900 bg-teal-100 px-2.5 py-0.5 rounded-full">
                    防御姿勢（Defensive Swim）
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">White Flat Position</span>
                </div>
                <h5 className="text-base font-extrabold text-slate-900">
                  フローティングポジション（足上げ下流向き）
                </h5>
                <p className="text-xs text-slate-700 leading-relaxed">
                  仰向けになり、両膝を軽く曲げて足先を水面から突き出し、視界を下流（進行方向）に向けます。両手はパドルのように広げて左右のバランスを取ります。
                </p>
                <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs space-y-1 text-slate-800">
                  <span className="font-bold text-rose-700 block">⚠️ 最大の目的:</span>
                  <p>
                    「川底の岩に足が挟まるフットエントラップメントの完全防止」。迫り来る岩は足裏でクッションのように蹴って受け流します。
                  </p>
                </div>
              </div>

              {/* Aggressive Swim */}
              <div className="bg-slate-50 border-2 border-amber-200 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full">
                    攻撃的泳法（Aggressive Swim）
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">Crawl & Sprint</span>
                </div>
                <h5 className="text-base font-extrabold text-slate-900">
                  アグレッシブスイム（長時間の漂流防止・エディ脱出）
                </h5>
                <p className="text-xs text-slate-700 leading-relaxed">
                  うつ伏せになり、顔を上げて前方の目標を見据えながら、全力のクロールで水をかいて突き進みます。
                </p>
                <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs space-y-1 text-slate-800">
                  <span className="font-bold text-amber-800 block">⚡ スイッチするタイミング:</span>
                  <p>
                    「エディライン（本流と反流域の境目）を斜め45度で突破する時」「下流の倒木や滝から必死で逃げる時」「投げられたロープに飛びつく時」。
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Module 4-C: チームスローロープレスキュー（3段階システム） */}
          <div className="bg-white rounded-2xl border-2 border-slate-300 p-6 lg:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-teal-800 uppercase tracking-wider block">
                  Protocol 03
                </span>
                <h4 className="text-xl font-extrabold text-slate-900">
                  チームスローロープレスキュー（3段階ピラミッド）
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  1人だけで救助は成立しません。状況と被救助者の状態に応じて3つの階層で救助網を張ります。
                </p>
              </div>

              {/* Tier Selection Buttons */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-700 shrink-0">
                <button
                  onClick={() => setSelectedTier(1)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    selectedTier === 1 ? 'bg-teal-600 text-white shadow-xs' : 'hover:text-slate-900'
                  }`}
                >
                  第1段階: 基本投擲 & バックアップ
                </button>
                <button
                  onClick={() => setSelectedTier(2)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    selectedTier === 2 ? 'bg-teal-600 text-white shadow-xs' : 'hover:text-slate-900'
                  }`}
                >
                  第2段階: Go to throw
                </button>
                <button
                  onClick={() => setSelectedTier(3)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    selectedTier === 3 ? 'bg-teal-600 text-white shadow-xs' : 'hover:text-slate-900'
                  }`}
                >
                  第3段階: ライブベイト
                </button>
              </div>
            </div>

            {/* Current Tier Detail Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div>
                  <span className="text-xs font-mono font-bold text-teal-700">TIER {currentTier.tierNumber}</span>
                  <h5 className="text-lg font-extrabold text-slate-900">{currentTier.tierName}</h5>
                  <span className="text-xs font-mono text-slate-500">{currentTier.enName}</span>
                </div>
                <div className="text-xs bg-white px-3 py-1.5 rounded-lg border border-slate-300 text-slate-800 font-medium">
                  {currentTier.role}
                </div>
              </div>

              {/* Procedure Steps */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-900 block">救助連携手順プロトコル:</span>
                <ul className="space-y-2 text-xs text-slate-800">
                  {currentTier.procedure.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-white p-3 rounded-lg border border-slate-200">
                      <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
                <div className="bg-rose-50 border border-rose-200 rounded-lg p-3 text-rose-950">
                  <span className="font-bold text-rose-900 block mb-0.5">⚠️ 留意リスク ＆ 注意点:</span>
                  <p>{currentTier.keyRisk}</p>
                </div>
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-3 text-teal-950">
                  <span className="font-bold text-teal-900 block mb-0.5">🎒 必要装備:</span>
                  <p>{currentTier.requiredGear}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PRE-TRIP SAFETY CHECKLIST (PERSISTENT WITH LOCALSTORAGE) */}
        {/* ========================================================================= */}
        <div id="chapter-checklist" className="bg-white rounded-2xl border-2 border-slate-300 p-6 lg:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-teal-800 font-bold mb-1">
                <span className="px-2 py-0.5 bg-teal-100 rounded text-teal-900">Pre-Launch Inspection</span>
                <span>出艇前セーフティチェック</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                出艇前 必須安全点検チェックリスト
              </h3>
              <p className="text-slate-600 text-xs mt-0.5">
                川へ艇を浮かべる直前に必ず1項目ずつ全員で確認してください。ブラウザに自動保存されます。
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-xs font-mono font-bold text-slate-500">点検完了率</div>
                <div className="text-lg font-black font-mono text-teal-600">
                  {checkedCount} / {totalCount} ({Math.round((checkedCount / totalCount) * 100)}%)
                </div>
              </div>
              <button
                onClick={resetChecklist}
                className="px-3 py-2 text-xs font-bold text-slate-600 hover:text-rose-600 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors flex items-center gap-1"
                title="チェックをリセット"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>リセット</span>
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                isAllChecked ? 'bg-emerald-500' : 'bg-teal-600'
              }`}
              style={{ width: `${(checkedCount / totalCount) * 100}%` }}
            />
          </div>

          {isAllChecked && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950 flex items-center gap-3 text-xs font-bold">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>全項目の安全点検が完了しました！ 水位・天候を確認し、安全第一でホワイトウォーターへ出撃しましょう。</span>
            </div>
          )}

          {/* Checklist Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {SAFETY_CHECKLIST.map((item) => {
              const isChecked = !!checkedItems[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                    isChecked
                      ? 'bg-teal-50/70 border-teal-300 text-slate-800'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <button
                    type="button"
                    className="mt-0.5 text-teal-600 shrink-0 focus:outline-hidden"
                    aria-label={isChecked ? 'チェック解除' : 'チェックする'}
                  >
                    {isChecked ? (
                      <CheckSquare className="w-5 h-5 fill-teal-600 text-white" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-400" />
                    )}
                  </button>

                  <div className="text-xs space-y-0.5">
                    <span className={`font-bold block ${isChecked ? 'text-teal-950' : 'text-slate-900'}`}>
                      {item.title}
                    </span>
                    <p className="text-slate-600 leading-snug">{item.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
