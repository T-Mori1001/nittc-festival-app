"use client";

import React, { useState, useEffect } from "react";
import { Search, MapPin, Clock, Heart, Info, Calendar, Map as MapIcon, Home, ChevronLeft, Sparkles } from "lucide-react";

// 模擬店・企画データ（鶴東祭用）
const STALLS_DATA = [
  { id: 1, title: "秘伝のたこ焼き", category: "模擬店", location: "1号館前広場 A-1", time: "9:00 - 15:00", description: "外はカリッと中はトロッと！焼きたての秘伝タレたこ焼きです。" },
  { id: 2, title: "軽音部 メインステージ", category: "ステージ", location: "体育館ステージ", time: "10:30 - 12:30", description: "話題のロックバンドカバーライブ！会場一体で盛り上がりましょう！" },
  { id: 3, title: "美術部 作品展 2026", category: "展示", location: "2号館2F 201教室", time: "9:00 - 14:30", description: "部員が1年間かけて制作した油絵・イラスト・立体作品の展示。" },
  { id: 4, title: "極上手打ちそば", category: "模擬店", location: "中庭 B-3", time: "11:00 - 14:00", description: "数量限定！伝統の製法で手打ちした本格そばを提供します。" },
  { id: 5, title: "吹奏楽部 ポップスコンサート", category: "ステージ", location: "中庭特設ステージ", time: "13:00 - 14:00", description: "アニメソングからヒット曲まで、全員で楽しめる吹奏楽演奏！" },
];

// タイムスケジュールデータ
const SCHEDULE_DATA = [
  { time: "09:00 - 09:30", title: "オープニングセレモニー", location: "メインステージ" },
  { time: "10:30 - 12:30", title: "軽音部 ライブパフォーマンス", location: "体育館" },
  { time: "11:00 - 12:00", title: "ダンス部 スペシャルステージ", location: "メインステージ" },
  { time: "13:00 - 14:00", title: "吹奏楽部 ポップスコンサート", location: "中庭ステージ" },
  { time: "14:30 - 15:00", title: "グランドフィナーレ & ビンゴ大会", location: "メインステージ" },
];

export default function FestivalApp() {
  const [isEntered, setIsEntered] = useState(false);
  const [activeTab, setActiveTab] = useState<"home" | "schedule" | "map">("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("すべて");
  const [favorites, setFavorites] = useState<number[]>([]);

  // お気に入り（LocalStorage）
  useEffect(() => {
    const saved = localStorage.getItem("tsuruto_favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const toggleFavorite = (id: number) => {
    const updated = favorites.includes(id)
      ? favorites.filter((favId) => favId !== id)
      : [...favorites, id];
    setFavorites(updated);
    localStorage.setItem("tsuruto_favorites", JSON.stringify(updated));
  };

  const filteredStalls = STALLS_DATA.filter((item) => {
    const matchesSearch = item.title.includes(searchQuery) || item.description.includes(searchQuery);
    const matchesCategory = selectedCategory === "すべて" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // ----------------------------------------------------
  // 1. トップ画面（画像デザイン再現：青基調）
  // ----------------------------------------------------
  if (!isEntered) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 via-blue-50 to-indigo-100 flex flex-col items-center justify-center relative overflow-hidden px-6 text-center select-none">
        
        {/* 背景のカラフル＆青系紙吹雪デコレーション */}
        <div className="absolute inset-0 pointer-events-none opacity-80">
          <div className="absolute top-10 left-8 w-4 h-8 bg-blue-500 rounded-sm rotate-45 shadow-sm" />
          <div className="absolute top-16 right-12 w-6 h-3 bg-cyan-400 rounded-sm -rotate-12 shadow-sm" />
          <div className="absolute top-32 left-1/4 w-3 h-6 bg-amber-400 rounded-sm rotate-12 shadow-sm" />
          <div className="absolute top-28 right-1/4 w-5 h-5 bg-rose-400 rounded-sm rotate-45 shadow-sm" />
          <div className="absolute top-1/2 left-6 w-5 h-3 bg-indigo-500 rounded-sm -rotate-45 shadow-sm" />
          <div className="absolute top-1/2 right-8 w-4 h-7 bg-sky-400 rounded-sm rotate-12 shadow-sm" />
          <div className="absolute bottom-24 left-12 w-6 h-3 bg-teal-400 rounded-sm rotate-45 shadow-sm" />
          <div className="absolute bottom-32 right-16 w-3 h-6 bg-blue-600 rounded-sm -rotate-12 shadow-sm" />
        </div>

        {/* サブタイトル */}
        <p className="text-xs sm:text-sm tracking-[0.3em] font-bold text-sky-600 mb-3 uppercase">
          TSURUTO FESTIVAL 2026
        </p>

        {/* メインタイトルロゴ */}
        <h1 className="text-6xl sm:text-7xl font-black text-blue-950 tracking-wider mb-6 drop-shadow-sm font-sans">
          鶴東祭
        </h1>

        {/* 開催日時バッジ */}
        <div className="bg-white/80 backdrop-blur-md border border-blue-100/80 shadow-md rounded-full px-6 py-2.5 flex items-center justify-center gap-3 mb-12 text-xs sm:text-sm font-bold text-slate-700">
          <span>2026.8.30 SUN</span>
          <span className="text-blue-200">|</span>
          <span>9:00〜15:00</span>
        </div>

        {/* 入場ボタン */}
        <button
          onClick={() => setIsEntered(true)}
          className="w-64 sm:w-72 py-4 rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-blue-500 text-white font-bold text-lg shadow-lg shadow-blue-500/30 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 border border-white/20"
        >
          入場する 🎉
        </button>

        {/* キャプション */}
        <p className="mt-5 text-xs text-slate-500 font-medium tracking-wide">
          鶴東祭をお楽しみください！
        </p>
      </div>
    );
  }

  // ----------------------------------------------------
  // 2. メイン画面（案内アプリ本体：青ベースのUI）
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-24">
      {/* ヘッダー */}
      <header className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white p-4 sticky top-0 z-50 shadow-md">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEntered(false)}
              className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
              title="トップに戻る"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-black tracking-wide flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-sky-300" /> 鶴東祭 2026
            </h1>
          </div>
          <span className="text-[10px] bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full font-bold border border-white/20">
            本日開催中
          </span>
        </div>
      </header>

      {/* メインコンテンツエリア */}
      <main className="max-w-md mx-auto p-4 space-y-5">
        {/* タブ 1: 企画一覧（ホーム） */}
        {activeTab === "home" && (
          <>
            {/* 検索バー */}
            <div className="relative">
              <Search className="absolute left-3.5 top-3 text-blue-400 w-4 h-4" />
              <input
                type="text"
                placeholder="企画名やキーワードで探す..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-blue-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm text-sm"
              />
            </div>

            {/* カテゴリフィルター */}
            <div className="flex gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
              {["すべて", "模擬店", "ステージ", "展示"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap font-bold transition ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-blue-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* リアルタイムお知らせバナー */}
            <div className="bg-blue-50 border border-blue-200/60 p-3.5 rounded-2xl flex items-start gap-3 text-blue-900 text-xs shadow-sm">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold mb-0.5">【校内アナウンス】</p>
                <p className="text-blue-700 leading-relaxed">
                  体育館前の模擬店エリアは12:00頃が混雑ピーク予想です。お早めのご利用をおすすめします。
                </p>
              </div>
            </div>

            {/* 企画カードリスト */}
            <div className="space-y-3.5">
              {filteredStalls.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition space-y-2 relative"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                      {item.category}
                    </span>
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

                  <h3 className="font-bold text-base text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>

                  <div className="pt-2 text-[11px] text-slate-500 flex flex-wrap gap-4 border-t border-slate-100">
                    <div className="flex items-center gap-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-blue-500" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-blue-500" />
                      <span>{item.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* タブ 2: タイムスケジュール */}
        {activeTab === "schedule" && (
          <div className="space-y-4">
            <h2 className="font-bold text-base text-slate-800 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" /> タイムスケジュール
            </h2>
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
              <div className="relative border-l-2 border-blue-200 ml-2 pl-4 space-y-6">
                {SCHEDULE_DATA.map((event, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-blue-600 border-2 border-white ring-2 ring-blue-100" />
                    <span className="text-[11px] font-bold text-blue-600 tracking-wide">
                      {event.time}
                    </span>
                    <h3 className="font-bold text-sm text-slate-900 mt-0.5">
                      {event.title}
                    </h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-slate-400" /> {event.location}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* タブ 3: 校内マップ */}
        {activeTab === "map" && (
          <div className="space-y-4">
            <h2 className="font-bold text-base text-slate-800 flex items-center gap-2">
              <MapIcon className="w-4 h-4 text-blue-600" /> 校内案内マップ
            </h2>
            <div className="bg-slate-100 rounded-2xl h-72 flex items-center justify-center border-2 border-dashed border-blue-200 relative overflow-hidden shadow-inner">
              <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-blue-50">
                <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-2 animate-bounce" />
                <p className="text-sm font-bold text-slate-700">校内マップ画像表示エリア</p>
                <p className="text-xs text-slate-400 mt-1">
                  （`public/map.jpg` を設置して表示）
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ボトムナビゲーションバー */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200/80 px-6 py-2 z-50 shadow-lg">
        <div className="max-w-md mx-auto flex justify-around">
          <button
            onClick={() => setActiveTab("home")}
            className={`flex flex-col items-center text-[10px] font-bold gap-1 transition ${
              activeTab === "home" ? "text-blue-600" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <Home className="w-5 h-5" />
            企画一覧
          </button>
          <button
            onClick={() => setActiveTab("schedule")}
            className={`flex flex-col items-center text-[10px] font-bold gap-1 transition ${
              activeTab === "schedule" ? "text-blue-600" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <Calendar className="w-5 h-5" />
            日程
          </button>
          <button
            onClick={() => setActiveTab("map")}
            className={`flex flex-col items-center text-[10px] font-bold gap-1 transition ${
              activeTab === "map" ? "text-blue-600" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <MapIcon className="w-5 h-5" />
            マップ
          </button>
        </div>
      </nav>
    </div>
  );
}