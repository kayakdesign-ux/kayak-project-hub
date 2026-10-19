import React from 'react';
import { RiverSpot } from '../types/kayak';
import { X, Compass, AlertTriangle, Navigation, Anchor } from 'lucide-react';

interface SpotDetailModalProps {
  spot: RiverSpot | null;
  onClose: () => void;
}

export const SpotDetailModal: React.FC<SpotDetailModalProps> = ({ spot, onClose }) => {
  if (!spot) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-teal-700 font-semibold mb-1">
              <span>{spot.region}</span>
              <span aria-hidden="true">·</span>
              <span>{spot.prefecture}</span>
              <span aria-hidden="true">·</span>
              <span className="font-bold">{spot.difficulty}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{spot.name}</h3>
            <p className="text-xs text-slate-500 mt-0.5">河川: {spot.riverName} (区間長: 約{spot.distanceKm}km)</p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6 text-xs">
          {/* Status & Access strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div>
              <div className="text-slate-500 text-[11px]">推奨水量目安</div>
              <div className="text-slate-900 font-medium mt-0.5">{spot.flowLevel}</div>
            </div>
            <div>
              <div className="text-slate-500 text-[11px]">ベストシーズン</div>
              <div className="text-slate-900 font-medium mt-0.5">{spot.bestSeason}</div>
            </div>
            <div>
              <div className="text-slate-500 text-[11px]">推奨ボートタイプ</div>
              <div className="text-teal-700 font-medium mt-0.5">{spot.recommendedBoats.join(', ')}</div>
            </div>
          </div>

          {/* Put-in & Take-out */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2">
            <div className="flex items-start gap-2">
              <Navigation className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-500 font-medium">エントリー (Put-in): </span>
                <span className="text-slate-900 font-medium">{spot.putIn}</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Anchor className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-500 font-medium">イグジット (Take-out): </span>
                <span className="text-slate-900 font-medium">{spot.takeOut}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-semibold text-slate-800 mb-1.5">ゲレンデ概要</h4>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed bg-slate-50 p-3.5 rounded-lg border border-slate-200">
              {spot.description}
            </p>
          </div>

          {/* Key Rapids */}
          <div>
            <h4 className="text-xs font-semibold text-slate-800 mb-2">名物瀬・主要難所の攻略</h4>
            <div className="space-y-2">
              {spot.keyRapids.map((rapid, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex flex-col gap-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-xs">{rapid.name}</span>
                    <span className="font-mono text-teal-700 font-semibold">{rapid.classLevel}</span>
                  </div>
                  <p className="text-slate-600 text-xs">{rapid.description}</p>
                  {rapid.hazardNote && (
                    <div className="text-amber-800 text-[11px] flex items-center gap-1 mt-0.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{rapid.hazardNote}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Hazards & Safety */}
          {spot.hazards && spot.hazards.length > 0 && (
            <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4">
              <h4 className="text-xs font-bold text-amber-900 mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>危険箇所・注意事項</span>
              </h4>
              <ul className="space-y-1 text-slate-700">
                {spot.hazards.map((h, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-amber-600 leading-none mt-0.5">•</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Scouting Advice */}
          <div className="bg-teal-50/70 border border-teal-200 rounded-xl p-4">
            <h4 className="text-xs font-bold text-teal-900 mb-1 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-teal-700" />
              <span>スカウティング（下見）のアドバイス</span>
            </h4>
            <p className="text-teal-900/90 leading-relaxed">{spot.scoutingAdvice}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end pt-6 border-t border-slate-100 mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};
