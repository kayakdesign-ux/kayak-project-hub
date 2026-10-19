import React from 'react';
import { Waves, PhoneCall, SlidersHorizontal } from 'lucide-react';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Wordmark & Statement */}
          <div className="space-y-3 md:col-span-1">
            <a
              href="#"
              className="text-base font-bold tracking-tight text-white flex items-center gap-2 font-mono"
            >
              <Waves className="w-4 h-4 text-teal-400" />
              <span>New to Kayaker.jp</span>
            </a>
            <p className="text-slate-400 text-xs leading-relaxed">
              激流（ホワイトウォーター）の世界へ踏み出す、すべての初心者とパドラーへ。確かな知識とギア選びで、より自由で安全な川旅を。
            </p>
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="mt-2 text-slate-500 hover:text-teal-400 transition-colors flex items-center gap-1.5 text-[11px]"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>アフィリエイト収益管理（管理者）</span>
              </button>
            )}
          </div>

          {/* Col 2: Site Navigation */}
          <div>
            <div className="text-slate-200 font-semibold mb-3">ナビゲーション</div>
            <ul className="space-y-2">
              <li>
                <a href="#gear-guide" className="hover:text-teal-400 transition-colors">
                  ギア・ボート選び
                </a>
              </li>
              <li>
                <a href="#paddle-guide" className="hover:text-teal-400 transition-colors">
                  パドル選び徹底ガイド
                </a>
              </li>
              <li>
                <a href="#paddler-tips" className="hover:text-teal-400 transition-colors">
                  カヤッカーなら知っててTips 16選
                </a>
              </li>
              <li>
                <a href="#kayaker-essence" className="hover:text-teal-400 transition-colors">
                  カヤッカーなら知っててEssence
                </a>
              </li>
              <li>
                <a href="#river-flow-tips" className="hover:text-teal-400 transition-colors">
                  川の読み方・リバーフローTips
                </a>
              </li>
              <li>
                <a href="#safety-training" className="hover:text-teal-400 transition-colors">
                  安全講習・レスキューマニュアル
                </a>
              </li>
              <li>
                <a href="#river-map" className="hover:text-teal-400 transition-colors">
                  全国難易度マップ
                </a>
              </li>
              <li>
                <a href="#glossary" className="hover:text-teal-400 transition-colors">
                  カヤック用語事典
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-teal-400 transition-colors">
                  About（サイト紹介・プロフィール）
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: River Safety Disclaimer */}
          <div>
            <div className="text-slate-200 font-semibold mb-3">河川安全免責 ＆ PR表記</div>
            <p className="text-slate-400 leading-relaxed text-[11px] mb-2">
              自然河川は水量・天候により刻一刻と変化します。当サイトの情報は参考値であり、現地での最終判断、水量確認、およびスカウティングはパドラー個人の自己責任において実施してください。
            </p>
            <p className="text-slate-500 text-[10px] leading-relaxed">
              ※当サイトはAmazonアソシエイト・楽天等の各種アフィリエイトプログラムに参加しており、適格販売により紹介手数料を得ています。
            </p>
          </div>

          {/* Col 4: Emergency Contacts */}
          <div>
            <div className="text-slate-200 font-semibold mb-3 flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
              <span>緊急連絡先ダイヤル</span>
            </div>
            <div className="space-y-2 text-slate-300 text-[11px]">
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-400">水難・救難（消防）:</span>
                <span className="font-mono font-bold text-white">119番</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-400">緊急通報（警察）:</span>
                <span className="font-mono font-bold text-white">110番</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-slate-400">河川感潮域・海上:</span>
                <span className="font-mono font-bold text-white">118番</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <div>© {new Date().getFullYear()} New to Kayaker.jp. All rights reserved. Whitewater Kayak Portal.</div>
          <div className="flex items-center gap-4">
            <span>Leave No Trace（自然保護とゴミ持ち帰り）</span>
            <span aria-hidden="true">·</span>
            <span>Always Paddle with a Buddy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
