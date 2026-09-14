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
  // 1. トップ（ランディング）画面
  // ----------------------------------------------------
  if (!isEntered) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center relative overflow-hidden px-6 text-center select-none">
        {/* 背景のカラフル紙吹雪デコレーション */}
        <div className="absolute inset-0 pointer-events-none opacity-80">
          <div className="absolute top-12 left-10 w-4 h-8 bg-orange-400 rounded-full rotate-45 shadow-sm" />
          <div className="absolute top-20 right-12 w-6 h-3 bg-pink-400 rounded-full -rotate-12 shadow-sm" />
          <div className="absolute top-36 left-1/4 w-4 h-4 bg-yellow-400 rounded-full rotate-12 shadow-sm" />
          <div className="absolute top-28 right-1/4 w-5 h-5 bg-rose-400 rounded-full rotate-45 shadow-sm" />
          <div className="absolute bottom-32 left-12 w-6 h-3 bg-teal-400 rounded-full rotate-45 shadow-sm" />
          <div className="absolute bottom-20 right-16 w-4 h-7 bg-indigo-400 rounded-full -rotate-12 shadow-sm" />
        </div>

        {/* サブタイトル */}
        <p className="text-xs sm:text-sm tracking-[0.25em] font-extrabold text-orange-500 mb-3 uppercase">
          KOSEN FESTIVAL 2026
        </p>

        {/* メインタイトル */}
        <h1 className="text-4xl sm:text-6xl font-black text-slate-800 tracking-wider mb-6 leading-tight">
          熱狂の高専祭
          <span className="block text-2xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 mt-2 font-black">
            ～カーニバル～
          </span>
        </h1>

        {/* 日時ピルバッジ */}
        <div className="bg-white/90 backdrop-blur-md border border-orange-100 shadow-md rounded-full px-6 py-3 flex items-center justify-center gap-3 mb-10 text-xs sm:text-sm font-bold text-slate-700">
          <span>2026.10.24 SAT</span>
          <span className="text-orange-300">|</span>
          <span>9:30〜15:30</span>
        </div>

        {/* 入場ボタン */}
        <button
          onClick={() => setIsEntered(true)}
          className="w-64 sm:w-72 py-4 rounded-full bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 text-white font-extrabold text-lg shadow-lg shadow-orange-500/30 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 border border-white/20"
        >
          入場する 🎉
        </button>

        <p className="mt-5 text-xs text-slate-400 font-medium">
          タップしてキャンパスマップ＆催しをチェック！
        </p>
      </div>
    );
  }

  // ----------------------------------------------------
  // 2. メインアプリ画面
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-800 pb-16 font-sans">
      {/* 2-1. 上部ヘッダー＆丸アイコンナビゲーション */}
      <header className="sticky top-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-md pt-3 pb-2 px-4 border-b border-orange-100/60 shadow-sm">
        <div className="max-w-md mx-auto flex items-center justify-between gap-2">
          {/* 左側：ロゴ＆戻るボタン */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setIsEntered(false)}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-200/50 transition"
              title="トップに戻る"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-black tracking-tight text-orange-600 flex items-center gap-1">
              高専祭
            </h1>
          </div>

          {/* 右側：丸型アイコンタブ */}
          <nav className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {/* 1. マップ */}
            <button
              onClick={() => setActiveTab("map")}
              className={`flex items-center gap-1 px-3 py-2 rounded-full font-bold text-xs transition-all duration-200 shrink-0 ${
                activeTab === "map"
                  ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-md shadow-orange-500/30 px-3.5"
                  : "bg-blue-50 text-blue-600 hover:bg-blue-100/80"
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
                  ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-md shadow-orange-500/30 px-3.5"
                  : "bg-orange-50 text-orange-600 hover:bg-orange-100/80"
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
                  ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-md shadow-orange-500/30 px-3.5"
                  : "bg-purple-50 text-purple-600 hover:bg-purple-100/80"
              }`}
            >
              <Calendar className="w-4 h-4" />
              {activeTab === "events" && <span>イベント</span>}
            </button>

            {/* 4. その他 / ご案内 */}
            <button
              onClick={() => setActiveTab("guide")}
              className={`flex items-center gap-1 px-3 py-2 rounded-full font-bold text-xs transition-all duration-200 shrink-0 ${
                activeTab === "guide"
                  ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-md shadow-orange-500/30 px-3.5"
                  : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100/80"
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
        {/* ========================================== */}
        {/* TAB 1: マップ */}
        {/* ========================================== */}
        {activeTab === "map" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-white px-3 py-1 rounded-full text-xs font-bold text-slate-600 border border-slate-200 shadow-sm">
                現在のマップ: <strong className="text-orange-600">敷地内全体</strong>
              </span>
              <span className="text-[11px] text-slate-400 font-bold">▲ 上へ</span>
            </div>

            <div className="bg-emerald-900/10 rounded-3xl overflow-hidden border-2 border-white shadow-sm relative aspect-[4/3] flex flex-col items-center justify-center p-4 bg-gradient-to-br from-emerald-50 via-teal-100 to-sky-100">
              <MapPin className="w-10 h-10 text-rose-500 animate-bounce drop-shadow-md" />
              <p className="font-extrabold text-sm text-slate-700 mt-2">キャンパスマップエリア</p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                （`public/map.jpg` を配置して画像表示）
              </p>

              <div className="absolute top-6 left-12 bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow">
                1号館
              </div>
              <div className="absolute top-1/3 right-10 bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow">
                体育館
              </div>
              <div className="absolute bottom-8 left-1/3 bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow">
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
                      <div className="w-11 h-11 rounded-2xl bg-orange-50 flex items-center justify-center text-2xl shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-extrabold text-sm text-slate-800">{item.title}</h3>
                        <p className="text-xs text-slate-400 font-medium">{item.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-100">
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

        {/* ========================================== */}
        {/* TAB 2: 模擬店 */}
        {/* ========================================== */}
        {activeTab === "stalls" && (
          <div className="space-y-4">
            <div className="flex items-center justify-around bg-white p-2.5 rounded-3xl shadow-sm border border-slate-100">
              <button className="flex flex-col items-center gap-1 text-[10px] font-extrabold text-emerald-700 bg-emerald-50 p-2 rounded-2xl w-14">
                <Store className="w-5 h-5 text-emerald-600" /> 全体
              </button>
              <button className="flex flex-col items-center gap-1 text-[10px] font-extrabold text-slate-500 hover:text-orange-500 p-2 rounded-2xl w-14">
                <Utensils className="w-5 h-5 text-orange-400" /> フード
              </button>
              <button className="flex flex-col items-center gap-1 text-[10px] font-extrabold text-slate-500 hover:text-sky-500 p-2 rounded-2xl w-14">
                <CupSoda className="w-5 h-5 text-sky-400" /> ドリンク
              </button>
              <button className="flex flex-col items-center gap-1 text-[10px] font-extrabold text-slate-500 hover:text-purple-500 p-2 rounded-2xl w-14">
                <Gamepad2 className="w-5 h-5 text-purple-400" /> ゲーム
              </button>
              <button className="flex flex-col items-center gap-1 text-[10px] font-extrabold text-slate-500 hover:text-pink-500 p-2 rounded-2xl w-14">
                <Palette className="w-5 h-5 text-pink-400" /> 展示
              </button>
            </div>

            <div className="relative">
              <Search className="absolute left-3.5 top-3 text-orange-400 w-4 h-4" />
              <input
                type="text"
                placeholder="キーワードで検索 (例: タピオカ, 焼きそば)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm text-xs font-medium"
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
                          ? "bg-emerald-500 text-white shadow-sm"
                          : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
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
                          ? "bg-emerald-500 text-white shadow-sm"
                          : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
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
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-50 flex items-center justify-center text-3xl shrink-0 border border-orange-200/50 shadow-inner">
                      {item.icon}
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="bg-rose-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                          {item.category}
                        </span>
                        <span className="bg-orange-100 text-orange-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
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
                    <span className="font-black text-rose-500 text-sm">{item.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 3: イベントタイムテーブル */}
        {/* ========================================== */}
        {activeTab === "events" && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 rounded-3xl p-5 text-white shadow-lg shadow-orange-500/20 relative overflow-hidden">
              <p className="text-[11px] font-bold tracking-widest text-orange-200 uppercase">
                イベントタイムテーブル
              </p>
              <h2 className="text-xl font-black mt-0.5 mb-1">2026.10.24 SAT 9:30〜15:30</h2>
              <p className="text-xs text-white/90 font-medium flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                当日は進行中のイベントがリアルタイムでチェックできます✨
              </p>
            </div>

            {EVENTS_DATA.map((section, sIdx) => (
              <div key={sIdx} className="space-y-2">
                <div className="px-1">
                  <h3 className="font-black text-base text-slate-800 flex items-center gap-1.5">
                    🎤 {section.stage}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium bg-amber-50 border border-amber-100 text-amber-800 p-2 rounded-xl mt-1">
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
                        <span className="text-[10px] font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full">
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

        {/* ========================================== */}
        {/* TAB 4: その他 / ご案内 */}
        {/* ========================================== */}
        {activeTab === "guide" && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 rounded-3xl p-5 text-white shadow-lg shadow-pink-500/20 relative overflow-hidden space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl border border-white/30 shrink-0">
                  📸
                </div>
                <div>
                  <h2 className="font-black text-lg">公式Instagram</h2>
                  <p className="text-xs text-white/90">文化祭の最新情報や当日の様子を投稿！</p>
                </div>
              </div>
              <p className="text-xs font-bold text-center text-pink-100">
                ぜひフォローをお願いします！
              </p>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-full bg-white text-pink-600 font-extrabold text-xs shadow hover:bg-pink-50 transition flex items-center justify-center gap-1.5"
              >
                <span>Instagramを開く</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-5 text-white shadow-md space-y-1">
              <p className="text-[10px] font-bold tracking-widest uppercase text-orange-200">
                VISITOR GUIDE
              </p>
              <h2 className="text-xl font-black">ご来場案内</h2>
              <p className="text-xs text-white/90">ご来場前にご確認ください</p>
            </div>

            <div className="space-y-3">
              <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl shrink-0">
                  🕒
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-800">
                    開催日：2026年10月24日（土）
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    時間：9:30〜15:30（15:00販売終了）
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl shrink-0">
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
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl shrink-0">
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
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl shrink-0">
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