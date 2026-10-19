import React, { useState } from 'react';
import { GlossaryTerm } from '../types/kayak';
import { X, Plus, BookOpen } from 'lucide-react';

interface AddTermModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTerm: (term: GlossaryTerm) => void;
}

export const AddTermModal: React.FC<AddTermModalProps> = ({ isOpen, onClose, onAddTerm }) => {
  const [term, setTerm] = useState('');
  const [kana, setKana] = useState('');
  const [enTerm, setEnTerm] = useState('');
  const [category, setCategory] = useState<'flow' | 'technique' | 'hazard' | 'gear' | 'slang'>('technique');
  const [shortDef, setShortDef] = useState('');
  const [fullDef, setFullDef] = useState('');
  const [contextUsage, setContextUsage] = useState('');
  const [relatedTermsInput, setRelatedTermsInput] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!term.trim() || !shortDef.trim()) return;

    const newTerm: GlossaryTerm = {
      id: `user-term-${Date.now()}`,
      term: term.trim(),
      kana: kana.trim() || term.trim(),
      enTerm: enTerm.trim(),
      category,
      shortDef: shortDef.trim(),
      fullDef: fullDef.trim() || shortDef.trim(),
      contextUsage: contextUsage.trim(),
      relatedTerms: relatedTermsInput
        .split(/[,、]/)
        .map((t) => t.trim())
        .filter(Boolean),
      isUserAdded: true,
    };

    onAddTerm(newTerm);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-teal-600" />
            <h3 className="text-lg font-bold text-slate-900">新しいカヤック用語を登録</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-medium mb-1">
                用語名 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="例: クランチ、サーフィン"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">読みがな（ひらがな）</label>
              <input
                type="text"
                placeholder="例: くらんち"
                value={kana}
                onChange={(e) => setKana(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-medium mb-1">英名（English）</label>
              <input
                type="text"
                placeholder="例: Crunch / Cartwheel"
                value={enTerm}
                onChange={(e) => setEnTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">分類（カテゴリー）</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white"
              >
                <option value="flow">水流・地形 (Hydrology)</option>
                <option value="technique">パドリング技術 (Technique)</option>
                <option value="hazard">危険物・トラップ (Hazard)</option>
                <option value="gear">ギア・装備 (Gear)</option>
                <option value="slang">川言葉・スラング (Slang)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">
              概要（一行要約） <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="短く分かりやすい要約を入力してください"
              value={shortDef}
              onChange={(e) => setShortDef(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">詳細解説・背景</label>
            <textarea
              rows={3}
              placeholder="どういう状況で発生するか、注意点やコツなどを入力"
              value={fullDef}
              onChange={(e) => setFullDef(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">現場での使われ方の例（例文）</label>
            <input
              type="text"
              placeholder="例: 「あそこのエディラインは強いからしっかりエッジングして！」"
              value={contextUsage}
              onChange={(e) => setContextUsage(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">関連用語（カンマ区切り）</label>
            <input
              type="text"
              placeholder="例: エディ, フェリー, ロール"
              value={relatedTermsInput}
              onChange={(e) => setRelatedTermsInput(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900 rounded-lg border border-slate-200 hover:bg-slate-50"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-500 transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>用語集に追加</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
