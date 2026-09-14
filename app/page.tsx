"use client";

import React, { useState } from "react";
import {
  Map,
  Store,
  Calendar,
  Grid,
  Search,
  MapPin,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  Heart,
  Utensils,
  CupSoda,
  Gamepad2,
  Palette,
  Cog,
  Cpu,
  Zap,
  Code,
  Wrench,
  Bot,
  Terminal,
} from "lucide-react";

// 模擬店・企画データ
const STALLS_DATA = [
  {
    id: 1,
    title: "もちもちタピオカ",
    category: "フード",
    subcategory: "ドリンク",
    grade: "3年",
    dept: "情報",
    price: "200円",
    location: "屋外ブース A-1",
    description: "文化祭のお供にもちもちタピオカ！ミルクティー＆黒糖風味。",
    icon: "🧋",
  },
  {
    id: 2,
    title: "アサイーボウル",
    category: "フード",
    subcategory: "デザート",
    grade: "2年",
    dept: "電気",
    price: "350円",
    location: "普通棟 2C",
    description: "フルーツたっぷりで見た目もかわいい♡彩り豊かなアサイーボウル！！",
    icon: "🍧",
  },
  {
    id: 3,
    title: "フリフリポテト",
    category: "フード",
    subcategory: "スナック",
    grade: "1年",
    dept: "機械",
    price: "300円",
    location: "体育館脇 B-2",
    description: "シャカシャカ振って味変！コンソメ・バター醤油・塩フレーバー！",
    icon: "🍟",
  },
  {
    id: 4,
    title: "鉄板焼きそば",
    category: "フード",
    subcategory: "メイン",
    grade: "3年",
    dept: "物質",
    price: "300円",
    location: "中庭 C-1",
    description: "秘伝のソースと香ばしい香りがたまらない！特製鉄板焼きそば。",
    icon: "🍜",
  },
  {
    id: 5,
    title: "ロボット体験＆射的ゲーム",
    category: "展示・体験",
    subcategory: "部活動",
    grade: "部活",
    dept: "ロボコン部",
    price: "100円",
    location: "実習棟 1F",
    description: "高専ロボットを自分で操縦してターゲットを狙おう！景品もあるよ！",
    icon: "🤖",
  },
];

// タイムスケジュール
const EVENTS_DATA = [
  {
    stage: "メインステージ（体育館）",
    note: "会場には座席・立ち見エリアがあります。飲食も可能です。",
    items: [
      {
        time: "09:30 - 10:00",
        title: "オープニング＆開会式",
        org: "実行委員会",
        desc: "高専祭2026スタート！熱狂のカーニバルの幕開けです！",
      },
      {
        time: "11:30 - 12:00",
        title: "吹奏楽部パフォーマンス",
        org: "吹奏楽部",
        desc: "親しみやすい楽曲を、吹奏楽ならではの豊かな響きでお届けします。",
      },
      {
        time: "12:45 - 13:30",
        title: "有志団体・ダンス発表会",
        org: "ダンス同好会＆有志",
        desc: "有志の発表やダンスのパフォーマンスで会場をいっぱいに盛り上げます！",
      },
      {
        time: "14:30 - 15:30",
        title: "グランドフィナーレ＆ビンゴ大会",
        org: "全校生徒",
        desc: "豪華賞品が当たる大ビンゴ大会！最高の締めくくりにしましょう！",
      },
    ],
  },
  {
    stage: "サブステージ（中庭）",
    note: "雨天時は視聴覚教室に変更となります。",
    items: [
      {
        time: "10:30 - 12:00",
        title: "軽音部 アコースティックアワー",
        org: "軽音部",
        desc: "爽やかな秋空に響くアコースティックライブをお楽しみください。",
      },
      {
        time: "13:00 - 14:00",
        title: "eスポーツ大会 決勝戦",
        org: "情報処理部",
        desc: "学内最強ゲーマーが決まる熱いバトルを大画面でライブ中継！",
      },
    ],
  },
];

export default function FestivalApp() {
  const [isEntered, setIsEntered] = useState(false);
  const [activeTab, setActiveTab] = useState<"map" | "stalls" | "events" | "guide">("stalls");

  // フィルター用State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGrade, setSelectedGrade] = useState<string>("すべて");
  const [selectedDept, setSelectedDept] = useState<string>("すべて");
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // 模擬店フィルター処理
  const filteredStalls = STALLS_DATA.filter((stall) => {
    const matchSearch =
      stall.title.includes(searchQuery) || stall.description.includes(searchQuery);
    const matchGrade = selectedGrade === "すべて" || stall.grade === selectedGrade;
    const matchDept = selectedDept === "すべて" || stall.dept === selectedDept;
    return matchSearch && matchGrade && matchDept;
  });

  // ----------------------------------------------------
  // 1. トップ（ランディング）画面 (1文字ずつ出現 ＆ 機械・情報系イラスト)
  // ----------------------------------------------------
  if (!isEntered) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center relative overflow-hidden px-6 text-center select-none">
        {/* CSSアニメーション定義 */}
        <style jsx>{`
          @keyframes charPopIn {
            0% {
              opacity: 0;
              transform: translateY(20px) scale(0.8);
            }
            70% {
              opacity: 1;
              transform: translateY(-4px) scale(1.05);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes spinSlow {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          @keyframes floatSlow {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-12px) rotate(6deg);
            }
          }
          .animate-char {
            animation: charPopIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            opacity: 0;
            will-change: transform, opacity;
          }
          .animate-fade {
            animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            opacity: 0;
            will-change: transform, opacity;
          }
          .animate-spin-gear {
            animation: spinSlow 14s linear infinite;
          }
          .animate-float-icon {
            animation: floatSlow 4s ease-in-out infinite;
          }
          .animate-float-delayed {
            animation: floatSlow 5s ease-in-out 2s infinite;
          }
        `}</style>

        {/* 背景のグラデーション */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/60 via-slate-950 to-slate-950 pointer-events-none" />

        {/* 機械・情報系モチーフの背景浮遊イラスト（歯車・CPU・コード・ロボット等） */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          {/* 左上：回転する歯車 */}
          <div className="absolute top-8 -left-8 text-sky-500/25 animate-spin-gear">
            <Cog className="w-32 h-32" />
          </div>
          <div
            className="absolute top-28 left-16 text-cyan-400/30 animate-spin-gear"
            style={{ animationDirection: "reverse", animationDuration: "18s" }}
          >
            <Cog className="w-16 h-16" />
          </div>

          {/* 右上：CPU・回路・雷 */}
          <div className="absolute top-12 right-6 text-blue-400/30 animate-float-icon">
            <Cpu className="w-16 h-16" />
          </div>
          <div className="absolute top-36 right-24 text-cyan-300/30 animate-float-delayed">
            <Zap className="w-9 h-9" />
          </div>

          {/* 左下：コード・端末 */}
          <div className="absolute bottom-24 left-6 text-indigo-400/30 animate-float-delayed">
            <Code className="w-14 h-14" />
          </div>
          <div className="absolute bottom-40 left-20 text-sky-400/25 animate-float-icon">
            <Terminal className="w-10 h-10" />
          </div>

          {/* 右下：大きな歯車・ロボット・工具 */}
          <div
            className="absolute bottom-12 -right-6 text-cyan-500/25 animate-spin-gear"
            style={{ animationDuration: "22s" }}
          >
            <Cog className="w-28 h-28" />
          </div>
          <div className="absolute bottom-32 right-16 text-blue-400/30 animate-float-icon">
            <Bot className="w-12 h-12" />
          </div>
          <div className="absolute bottom-10 right-28 text-sky-300/30 animate-float-delayed">
            <Wrench className="w-8 h-8 -rotate-45" />
          </div>
        </div>

        {/* サブタイトル (0.1秒後) */}
        <p
          className="animate-fade text-xs sm:text-sm tracking-[0.25em] font-black text-cyan-400 mb-4 uppercase drop-shadow z-10"
          style={{ animationDelay: "0.1s" }}
        >
          KOSEN FESTIVAL 2026
        </p>

        {/* タイトル：1文字ずつアニメーション (スマホ消え対策済み) */}
        <h1 className="flex flex-col items-center justify-center font-black tracking-wider mb-8 z-10">
          {/* 「熱狂の」 */}
          <div className="text-3xl sm:text-5xl text-white drop-shadow-md flex justify-center gap-1">
            {"熱狂の".split("").map((char, index) => (
              <span
                key={index}
                className="animate-char inline-block"
                style={{ animationDelay: `${0.25 + index * 0.1}s` }}
              >
                {char}
              </span>
            ))}
          </div>

          <div className="relative inline-block text-center mt-2">
            {/* 「高専祭」 - スマホで消えない鮮やかなネオンシアンカラー */}
            <div className="text-5xl sm:text-7xl font-black text-cyan-300 drop-shadow-[0_0_15px_rgba(56,189,248,0.6)] tracking-tight flex justify-center gap-1">
              {"高専祭".split("").map((char, index) => (
                <span
                  key={index}
                  className="animate-char inline-block text-cyan-300"
                  style={{ animationDelay: `${0.6 + index * 0.12}s` }}
                >
                  {char}
                </span>
              ))}
            </div>

            {/* 「カーニバル」 */}
            <div className="text-sm sm:text-lg font-extrabold italic tracking-[0.3em] text-sky-200 mt-1 drop-shadow flex justify-center gap-1">
              {"カーニバル".split("").map((char, index) => (
                <span
                  key={index}
                  className="animate-char inline-block text-sky-200"
                  style={{ animationDelay: `${1.0 + index * 0.08}s` }}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
        </h1>

        {/* 日時＆場所バッジ (1.5秒後) */}
        <div
          className="animate-fade bg-slate-900/90 backdrop-blur-md border border-cyan-500/30 shadow-lg shadow-cyan-500/10 rounded-full px-6 py-3 flex flex-wrap items-center justify-center gap-2.5 mb-10 text-xs sm:text-sm font-bold text-slate-200 z-10"
          style={{ animationDelay: "1.5s" }}
        >
          <span className="text-cyan-300">10/24 [SAT]</span>
          <span className="text-slate-600">|</span>
          <span>9:30〜15:30</span>
          <span className="text-slate-600">|</span>
          <span className="text-sky-300">@鶴岡高専</span>
        </div>

        {/* 入場ボタン (1.7秒後) */}
        <div className="animate-fade z-10" style={{ animationDelay: "1.7s" }}>
          <button
            onClick={() => setIsEntered(true)}
            className="w-64 sm:w-72 py-4 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-extrabold text-lg shadow-lg shadow-blue-500/40 hover:shadow-xl hover:shadow-blue-500/60 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 border border-cyan-300/30"
          >
            入場する 🎉
          </button>
        </div>

        {/* 補足テキスト (1.9秒後) */}
        <p
          className="animate-fade mt-5 text-xs text-slate-400 font-medium z-10"
          style={{ animationDelay: "1.9s" }}
        >
          タップしてキャンパスマップ＆催しをチェック！
        </p>
      </div>
    );
  }

  // ----------------------------------------------------
  // 2. メインアプリ画面
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-16 font-sans">
      {/* 2-1. 上部ヘッダー */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md pt-3 pb-2 px-4 border-b border-blue-100 shadow-sm">
        <div className="max-w-md mx-auto flex items-center justify-between gap-2">
          {/* 左側：ロゴ＆戻るボタン */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setIsEntered(false)}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100 transition"
              title="トップに戻る"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex flex-col leading-none">
              <span className="text-base sm:text-lg font-black tracking-tight text-blue-700">
                熱狂の高専祭
              </span>
              <span className="text-[9px] font-extrabold italic tracking-widest text-sky-500 self-end -mt-0.5">
                カーニバル
              </span>
            </div>
          </div>

          {/* 右側：丸型アイコンタブ */}
          <nav className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {/* 1. マップ */}
            <button
              onClick={() => setActiveTab("map")}
              className={`flex items-center gap-1 px-3 py-2 rounded-full font-bold text-xs transition-all duration-200 shrink-0 ${
                activeTab === "map"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/30 px-3.5"
                  : "bg-sky-50 text-sky-700 hover:bg-sky-100"
              }`}
            >
              <Map className="w-4 h-4" />
              {activeTab === "map" && <span>マップ</span>}
            </button>

            {/* 2. 模擬店 */}
            <button
              onClick={() => setActiveTab("stalls")}
              className={`flex items-center gap-1 px-3 py-2 rounded-full font-bold text-xs transition-all duration-200 shrink-0 ${
                activeTab === "stalls"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/30 px-3.5"
                  : "bg-blue-50 text-blue-700 hover:bg-blue-100"
              }`}
            >
              <Store className="w-4 h-4" />
              {activeTab === "stalls" && <span>模擬店</span>}
            </button>

            {/* 3. イベント */}
            <button
              onClick={() => setActiveTab("events")}
              className={`flex items-center gap-1 px-3 py-2 rounded-full font-bold text-xs transition-all duration-200 shrink-0 ${
                activeTab === "events"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/30 px-3.5"
                  : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
              }`}
            >
              <Calendar className="w-4 h-4" />
              {activeTab === "events" && <span>イベント</span>}
            </button>

            {/* 4. その他 */}
            <button
              onClick={() => setActiveTab("guide")}
              className={`flex items-center gap-1 px-3 py-2 rounded-full font-bold text-xs transition-all duration-200 shrink-0 ${
                activeTab === "guide"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/30 px-3.5"
                  : "bg-cyan-50 text-cyan-700 hover:bg-cyan-100"
              }`}
            >
              <Grid className="w-4 h-4" />
              {activeTab === "guide" && <span>その他</span>}
            </button>
          </nav>
        </div>
      </header>

      {/* 2-2. メインコンテンツエリア */}
      <main className="max-w-md mx-auto p-4 space-y-4">
        {/* TAB 1: マップ */}
        {activeTab === "map" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-white px-3 py-1 rounded-full text-xs font-bold text-slate-600 border border-slate-200 shadow-sm">
                現在のマップ: <strong className="text-blue-600">敷地内全体</strong>
              </span>
              <span className="text-[11px] text-slate-400 font-bold">▲ 上へ</span>
            </div>

            <div className="rounded-3xl overflow-hidden border-2 border-white shadow-sm relative aspect-[4/3] flex flex-col items-center justify-center p-4 bg-gradient-to-br from-sky-50 via-blue-100 to-indigo-100">
              <MapPin className="w-10 h-10 text-blue-600 animate-bounce drop-shadow-md" />
              <p className="font-extrabold text-sm text-slate-700 mt-2">キャンパスマップエリア</p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                （`public/map.jpg` を配置して画像表示）
              </p>

              <div className="absolute top-6 left-12 bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow">
                1号館
              </div>
              <div className="absolute top-1/3 right-10 bg-cyan-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow">
                体育館
              </div>
              <div className="absolute bottom-8 left-1/3 bg-indigo-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow">
                中庭ステージ
              </div>
            </div>

            <div className="pt-2">
              <h2 className="font-extrabold text-base text-slate-800 mb-2 px-1">
                このフロアの模擬店
                <span className="text-xs font-bold text-slate-400 ml-2">敷地内全体</span>
              </h2>

              <div className="space-y-2.5">
                {STALLS_DATA.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-sky-50 flex items-center justify-center text-2xl shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-extrabold text-sm text-slate-800">{item.title}</h3>
                        <p className="text-xs text-slate-400 font-medium">{item.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                        {item.price}
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: 模擬店 */}
        {activeTab === "stalls" && (
          <div className="space-y-4">
            <div className="flex items-center justify-around bg-white p-2.5 rounded-3xl shadow-sm border border-slate-100">
              <button className="flex flex-col items-center gap-1 text-[10px] font-extrabold text-blue-700 bg-blue-50 p-2 rounded-2xl w-14">
                <Store className="w-5 h-5 text-blue-600" /> 全体
              </button>
              <button className="flex flex-col items-center gap-1 text-[10px] font-extrabold text-slate-500 hover:text-blue-600 p-2 rounded-2xl w-14">
                <Utensils className="w-5 h-5 text-sky-500" /> フード
              </button>
              <button className="flex flex-col items-center gap-1 text-[10px] font-extrabold text-slate-500 hover:text-cyan-600 p-2 rounded-2xl w-14">
                <CupSoda className="w-5 h-5 text-cyan-500" /> ドリンク
              </button>
              <button className="flex flex-col items-center gap-1 text-[10px] font-extrabold text-slate-500 hover:text-indigo-600 p-2 rounded-2xl w-14">
                <Gamepad2 className="w-5 h-5 text-indigo-500" /> ゲーム
              </button>
              <button className="flex flex-col items-center gap-1 text-[10px] font-extrabold text-slate-500 hover:text-violet-600 p-2 rounded-2xl w-14">
                <Palette className="w-5 h-5 text-violet-500" /> 展示
              </button>
            </div>

            <div className="relative">
              <Search className="absolute left-3.5 top-3 text-blue-400 w-4 h-4" />
              <input
                type="text"
                placeholder="キーワードで検索 (例: タピオカ, 焼きそば)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm text-xs font-medium"
              />
            </div>

            <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm space-y-3">
              <p className="text-xs font-extrabold text-slate-600 flex items-center gap-1">
                絞り込む条件 <span className="text-[10px] font-normal text-slate-400">複数選択できます</span>
              </p>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400 font-bold w-10 text-[11px]">学年</span>
                <div className="flex gap-1.5 flex-wrap">
                  {["すべて", "1年", "2年", "3年", "部活"].map((g) => (
                    <button
                      key={g}
                      onClick={() => setSelectedGrade(g)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                        selectedGrade === g
                          ? "bg-blue-600 text-white shadow-sm"
                          : "bg-blue-50 text-blue-800 hover:bg-blue-100"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400 font-bold w-10 text-[11px]">学科</span>
                <div className="flex gap-1.5 flex-wrap">
                  {["すべて", "機械", "電気", "情報", "物質"].map((d) => (
                    <button
                      key={d}
                      onClick={() => setSelectedDept(d)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                        selectedDept === d
                          ? "bg-blue-600 text-white shadow-sm"
                          : "bg-blue-50 text-blue-800 hover:bg-blue-100"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {filteredStalls.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition space-y-2 relative overflow-hidden"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-sky-50 flex items-center justify-center text-3xl shrink-0 border border-blue-200/50 shadow-inner">
                      {item.icon}
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="bg-blue-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                          {item.category}
                        </span>
                        <span className="bg-sky-100 text-sky-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                          {item.subcategory}
                        </span>
                        <span className="text-[11px] text-slate-400 font-bold ml-auto">
                          {item.location}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <h3 className="font-extrabold text-base text-slate-800">{item.title}</h3>
                        <button
                          onClick={() => toggleFavorite(item.id)}
                          className="text-slate-300 hover:text-rose-500 transition"
                        >
                          <Heart
                            className={`w-5 h-5 ${
                              favorites.includes(item.id)
                                ? "fill-rose-500 text-rose-500"
                                : ""
                            }`}
                          />
                        </button>
                      </div>

                      <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-50 flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-bold">
                      {item.grade}（{item.dept}）
                    </span>
                    <span className="font-black text-blue-600 text-sm">{item.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: イベントタイムテーブル */}
        {activeTab === "events" && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 rounded-3xl p-5 text-white shadow-lg shadow-blue-500/20 relative overflow-hidden">
              <p className="text-[11px] font-bold tracking-widest text-cyan-200 uppercase">
                イベントタイムテーブル
              </p>
              <h2 className="text-xl font-black mt-0.5 mb-1">2026.10.24 SAT 9:30〜15:30</h2>
              <p className="text-xs text-white/90 font-medium flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                当日は進行中のイベントがリアルタイムでチェックできます✨
              </p>
            </div>

            {EVENTS_DATA.map((section, sIdx) => (
              <div key={sIdx} className="space-y-2">
                <div className="px-1">
                  <h3 className="font-black text-base text-slate-800 flex items-center gap-1.5">
                    🎤 {section.stage}
                  </h3>
                  <p className="text-xs font-medium bg-sky-50 border border-sky-100 text-sky-800 p-2 rounded-xl mt-1">
                    {section.note}
                  </p>
                </div>

                <div className="space-y-2.5">
                  {section.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-start gap-4 hover:shadow-md transition"
                    >
                      <div className="text-center shrink-0 border-r border-slate-100 pr-3 my-auto">
                        <span className="block font-black text-sm text-slate-800">
                          {item.time.split(" - ")[0]}
                        </span>
                        <span className="block text-[10px] text-slate-400 font-bold">
                          〜{item.time.split(" - ")[1]}
                        </span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                          {item.org}
                        </span>
                        <h4 className="font-extrabold text-sm text-slate-900 mt-1">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: その他 / ご案内 */}
        {activeTab === "guide" && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-sky-500 rounded-3xl p-5 text-white shadow-lg shadow-blue-500/20 relative overflow-hidden space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl border border-white/30 shrink-0">
                  📸
                </div>
                <div>
                  <h2 className="font-black text-lg">公式Instagram</h2>
                  <p className="text-xs text-white/90">文化祭の最新情報や当日の様子を投稿！</p>
                </div>
              </div>
              <p className="text-xs font-bold text-center text-cyan-100">
                ぜひフォローをお願いします！
              </p>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-full bg-white text-blue-600 font-extrabold text-xs shadow hover:bg-sky-50 transition flex items-center justify-center gap-1.5"
              >
                <span>Instagramを開く</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-3xl p-5 text-white shadow-md space-y-1">
              <p className="text-[10px] font-bold tracking-widest uppercase text-cyan-300">
                VISITOR GUIDE
              </p>
              <h2 className="text-xl font-black">ご来場案内</h2>
              <p className="text-xs text-slate-300">ご来場前にご確認ください</p>
            </div>

            <div className="space-y-3">
              <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-2xl shrink-0">
                  🕒
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-800">
                    開催日：2026年10月24日（土）
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    時間：9:30〜15:30（@鶴岡高専）
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-2xl shrink-0">
                  👟
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-800">上履き</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    校内は土足厳禁です。上履きやスリッパをご持参ください。
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-2xl shrink-0">
                  🚲
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-800">自転車でお越しの方</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    学校の敷地内に専用の駐輪場があります。
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-2xl shrink-0">
                  🚗
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-800">お車でお越しの方</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    駐車場に限りがございます。なるべく公共交通機関をご利用ください。
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}