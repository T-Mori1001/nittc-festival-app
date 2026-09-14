"use client";

import React, { useState, useEffect } from "react";
import { Search, MapPin, Clock, Heart, Info, Calendar, Map as MapIcon, Home } from "lucide-react";

// 模擬店・企画データ
const STALLS_DATA = [
  { id: 1, title: "秘伝のたこ焼き", category: "模擬店", location: "1号館前広場 A-1", time: "10:00 - 17:00", description: "外はカリッと中はトロッと！美味しい焼き立てたこ焼きです。" },
  { id: 2, title: "軽音部メインステージ", category: "ステージ", location: "体育館ステージ", time: "13:00 - 15:00", description: "バンド演奏ライブ！盛り上がること間違いなし！" },
  { id: 3, title: "美術部作品展示", category: "展示", location: "2号館2F 201教室", time: "10:00 - 16:30", description: "部員が1年間かけて制作した油絵・イラストの展示。" },
  { id: 4, title: "本格手打ちそば", category: "模擬店", location: "中庭 B-3", time: "11:00 - 15:00", description: "数量限定！手打ちの本格そばを提供します。" },
];

// タイムスケジュールデータ
const SCHEDULE_DATA = [
  { time: "10:00 - 10:30", title: "オープニングセレモニー", location: "メインステージ" },
  { time: "11:00 - 12:30", title: "ダンス部 パフォーマンス", location: "メインステージ" },
  { time: "13:00 - 15:00", title: "軽音部ライブ", location: "体育館" },
  { time: "15:30 - 16:30", title: "お笑いライブ＆ビンゴ大会", location: "メインステージ" },
];

export default function FestivalApp() {
  const [activeTab, setActiveTab] = useState<"home" | "schedule" | "map">("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("すべて");
  const [favorites, setFavorites] = useState<number[]>([]);

  // お気に入りの永続化 (LocalStorage)
  useEffect(() => {
    const saved = localStorage.getItem("festival_favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const toggleFavorite = (id: number) => {
    const updated = favorites.includes(id)
      ? favorites.filter((favId) => favId !== id)
      : [...favorites, id];
    setFavorites(updated);
    localStorage.setItem("festival_favorites", JSON.stringify(updated));
  };

  const filteredStalls = STALLS_DATA.filter((item) => {
    const matchesSearch = item.title.includes(searchQuery) || item.description.includes(searchQuery);
    const matchesCategory = selectedCategory === "すべて" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      {/* ヘッダー */}
      <header className="bg-indigo-600 text-white p-4 sticky top-0 z-50 shadow-md">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-wide">鶴岡高専　第42回高専祭「熱狂の高専祭～カーニバル～」 2026</h1>
          <span className="text-xs bg-indigo-500 px-2 py-1 rounded-full">本日開催中</span>
        </div>
      </header>

      {/* メインコンテンツエリア */}
      <main className="max-w-md mx-auto p-4 space-y-6">
        {/* 1. ホーム / 模擬店一覧タブ */}
        {activeTab === "home" && (
          <>
            {/* 検索バー */}
            <div className="relative">
              <Search className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="企画名・出し物を検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              />
            </div>

            {/* カテゴリフィルター */}
            <div className="flex gap-2 overflow-x-auto pb-1 text-sm">
              {["すべて", "模擬店", "ステージ", "展示"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full whitespace-nowrap font-medium transition ${
                    selectedCategory === cat
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-slate-600 border border-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* お知らせバナー */}
            <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl flex items-start gap-2 text-amber-800 text-sm">
              <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">【お知らせ】</p>
                <p>体育館前の模擬店エリアは現在大変混雑しております。</p>
              </div>
            </div>

            {/* 企画カードリスト */}
            <div className="space-y-4">
              {filteredStalls.map((item) => (
                <div key={item.id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-2 relative">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-600">
                      {item.category}
                    </span>
                    <button onClick={() => toggleFavorite(item.id)} className="text-slate-400 hover:text-red-500">
                      <Heart className={`w-5 h-5 ${favorites.includes(item.id) ? "fill-red-500 text-red-500" : ""}`} />
                    </button>
                  </div>
                  <h3 className="font-bold text-lg text-slate-900">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.description}</p>
                  
                  <div className="pt-2 text-xs text-slate-500 flex flex-wrap gap-4 border-t border-slate-50">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{item.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* 2. タイムスケジュールタブ */}
        {activeTab === "schedule" && (
          <div className="space-y-4">
            <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-600" /> 本日のタイムスケジュール
            </h2>
            <div className="relative border-l-2 border-indigo-200 ml-3 pl-4 space-y-6">
              {SCHEDULE_DATA.map((event, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[23px] top-1.5 w-3 h-3 rounded-full bg-indigo-600 border-2 border-white" />
                  <span className="text-xs font-bold text-indigo-600">{event.time}</span>
                  <h3 className="font-bold text-slate-900 mt-0.5">{event.title}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" /> {event.location}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. マップタブ */}
        {activeTab === "map" && (
          <div className="space-y-4">
            <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
              <MapIcon className="w-5 h-5 text-indigo-600" /> 校内アクセスマップ
            </h2>
            <div className="bg-slate-200 rounded-xl h-64 flex items-center justify-center border-2 border-dashed border-slate-300 relative overflow-hidden">
              {/* ※ 実際に使う際は校内図の画像 <img src="/map.jpg" /> に置き換えます */}
              <div className="text-center p-4">
                <MapPin className="w-10 h-10 text-indigo-600 mx-auto mb-2 animate-bounce" />
                <p className="text-sm font-bold text-slate-600">構内マップ画像表示エリア</p>
                <p className="text-xs text-slate-400 mt-1">（画像ファイルを指定して配置してください）</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* フッターナビゲーション (スマホ風ボトムバー) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-2">
        <div className="max-w-md mx-auto flex justify-around">
          <button
            onClick={() => setActiveTab("home")}
            className={`flex flex-col items-center text-xs gap-1 ${activeTab === "home" ? "text-indigo-600 font-bold" : "text-slate-400"}`}
          >
            <Home className="w-5 h-5" />
            企画一覧
          </button>
          <button
            onClick={() => setActiveTab("schedule")}
            className={`flex flex-col items-center text-xs gap-1 ${activeTab === "schedule" ? "text-indigo-600 font-bold" : "text-slate-400"}`}
          >
            <Calendar className="w-5 h-5" />
            日程
          </button>
          <button
            onClick={() => setActiveTab("map")}
            className={`flex flex-col items-center text-xs gap-1 ${activeTab === "map" ? "text-indigo-600 font-bold" : "text-slate-400"}`}
          >
            <MapIcon className="w-5 h-5" />
            マップ
          </button>
        </div>
      </nav>
    </div>
  );
}