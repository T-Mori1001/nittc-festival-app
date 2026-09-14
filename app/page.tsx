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
  Truck,
  Cog,
  Cpu,
  Zap,
  Code,
  Wrench,
  Bot,
  Terminal,
} from "lucide-react";

// 模擬店・クラス企画・キッチンカー全データ
const STALLS_DATA = [
  // --- 1年 (クラス模擬店) ---
  {
    id: 1,
    title: "ほっとサンド",
    category: "模擬店",
    subcategory: "軽食",
    grade: "1年",
    dept: "1-1",
    location: "111",
    description: "1-1による熱々で香ばしい絶品ほっとサンド！",
    icon: "🥪",
  },
  {
    id: 2,
    title: "ドリンク",
    category: "模擬店",
    subcategory: "ドリンク",
    grade: "1年",
    dept: "1-2",
    location: "112",
    description: "1-2がお届けする冷たくて美味しい各種ドリンク！",
    icon: "🍹",
  },
  {
    id: 3,
    title: "わたあめ",
    category: "模擬店",
    subcategory: "スイーツ",
    grade: "1年",
    dept: "1-3",
    location: "121",
    description: "1-3フワフワ甘くて可愛いカラフルわたあめ！",
    icon: "🍥",
  },
  {
    id: 4,
    title: "クレープ",
    category: "模擬店",
    subcategory: "スイーツ",
    grade: "1年",
    dept: "1-4",
    location: "122",
    description: "1-4手作り生地のボリューム満点トッピングクレープ！",
    icon: "🥞",
  },

  // --- 2年 (クラス模擬店) ---
  {
    id: 5,
    title: "餃子",
    category: "模擬店",
    subcategory: "フード",
    grade: "2年",
    dept: "機械",
    location: "第一体育館",
    description: "2M特製！外はパリッと中はジューシーな絶品餃子！",
    icon: "🥟",
  },
  {
    id: 6,
    title: "ポップコーン",
    category: "模擬店",
    subcategory: "スナック",
    grade: "2年",
    dept: "電気",
    location: "第一体育館",
    description: "2Eがお届けする出来立て弾ける香ばしいポップコーン！",
    icon: "🍿",
  },
  {
    id: 7,
    title: "玉こん",
    category: "模擬店",
    subcategory: "フード",
    grade: "2年",
    dept: "情報",
    location: "第一体育館",
    description: "2I秘伝の出汁がしっかり染み込んだ山形名物・玉こんにゃく！",
    icon: "🍡",
  },
  {
    id: 8,
    title: "焼き鳥",
    category: "模擬店",
    subcategory: "フード",
    grade: "2年",
    dept: "物質",
    location: "第一体育館",
    description: "2B香ばしいタレと塩でジューシーに焼き上げる本格焼き鳥！",
    icon: "🍢",
  },

  // --- 3年 (クラス企画) ---
  {
    id: 9,
    title: "お化け屋敷",
    category: "クラス企画",
    subcategory: "体験・アトラクション",
    grade: "3年",
    dept: "機械",
    location: "711・712",
    description: "3M本格的な恐怖があなたを襲う…絶叫必至のお化け屋敷！",
    icon: "👻",
  },
  {
    id: 10,
    title: "ゲームカフェ",
    category: "クラス企画",
    subcategory: "カフェ・体験",
    grade: "3年",
    dept: "電気",
    location: "123",
    description: "3Eみんなでワイワイ楽しめるレトロ＆最新ゲームカフェ！",
    icon: "🎮",
  },
  {
    id: 11,
    title: "バー",
    category: "クラス企画",
    subcategory: "カフェ・ドリンク",
    grade: "3年",
    dept: "情報",
    location: "132",
    description: "3Iシックで落ち着いた雰囲気のノンアルコールカクテルバー！",
    icon: "🍸",
  },
  {
    id: 12,
    title: "喫茶店",
    category: "クラス企画",
    subcategory: "カフェ・レトロ",
    grade: "3年",
    dept: "物質",
    location: "133",
    description: "3Bほっと一息つける落ち着いたレトロ空間喫茶店。",
    icon: "☕",
  },

  // --- 4年 (クラス企画) ---
  {
    id: 13,
    title: "ホスト",
    category: "クラス企画",
    subcategory: "エンタメ",
    grade: "4年",
    dept: "機械",
    location: "113",
    description: "4M最高の接客とパフォーマンスでおもてなし！高専ホストクラブ★",
    icon: "🤵",
  },
  {
    id: 14,
    title: "キッキングスナイパー",
    category: "クラス企画",
    subcategory: "体感ゲーム",
    grade: "4年",
    dept: "電気",
    location: "722",
    description: "4Eターゲットを狙って力強くシュート！高得点で景品ゲット！",
    icon: "⚽",
  },
  {
    id: 15,
    title: "カジノ",
    category: "クラス企画",
    subcategory: "体感ゲーム",
    grade: "4年",
    dept: "情報",
    location: "131",
    description: "4I本格ディーラーがお出迎えする大人の頭脳心理バトル！",
    icon: "🎲",
  },
  {
    id: 16,
    title: "格付けチェック",
    category: "クラス企画",
    subcategory: "バラエティ",
    grade: "4年",
    dept: "物質",
    location: "マルチメディア教室",
    description: "4Bあなたの一流度が試される！高専版・格付けチェック！",
    icon: "🍷",
  },

  // --- キッチンカー ---
  {
    id: 17,
    title: "もっけだの",
    category: "キッチンカー",
    subcategory: "ラーメン",
    grade: "外部",
    dept: "キッチンカー",
    location: "学生昇降口前",
    description: "スープと麺にこだわった絶品ラーメンのキッチンカー！",
    icon: "🍜",
  },
  {
    id: 18,
    title: "祇園はんなりCafé",
    category: "キッチンカー",
    subcategory: "和スイーツ",
    grade: "外部",
    dept: "キッチンカー",
    location: "学生昇降口前",
    description: "本格本わらび餅やふわふわベビーカステラ等の和風スイーツ！",
    icon: "🍡",
  },
  {
    id: 19,
    title: "フェリチタプラス",
    category: "キッチンカー",
    subcategory: "エスニック・ドリンク",
    grade: "外部",
    dept: "キッチンカー",
    location: "学生昇降口前",
    description: "フレッシュなスムージー＆スパイシーで本格的なガパオライス！",
    icon: "🥤",
  },

  // --- 部活動 ---
  {
    id: 20,
    title: "ロボット体験＆射的ゲーム",
    category: "クラス企画",
    subcategory: "部活動体験",
    grade: "部活",
    dept: "ロボコン部",
    location: "実習棟 1F",
    description: "高専ロボットを自分で操縦してターゲットを狙おう！景品もあるよ！",
    icon: "🤖",
  },
];

// タイムスケジュール
const EVENTS_DATA = [
  {
    stage: "メインステージ（第一体育館）",
    note: "会場には座席・立ち見エリアがあります。飲食も可能です。",
    items: [
      {
        time: "09:30 - 10:30",
        title: "腕立て選手権",
        org: "実行委員会",
        desc: "誰が一番腕立て伏せができるかを競う、白熱の筋肉バトル！",
      },
      {
        time: "11:30 - 12:30",
        title: "漫才",
        org: "有志団体",
        desc: "会場を爆笑の渦に巻き込む！高専生有志によるお笑いステージ！",
      },
      {
        time: "13:30 - 14:30",
        title: "ダンス",
        org: "ダンス同好会＆有志",
        desc: "キレキレのダンスパフォーマンスで会場の盛り上がりは最高潮に！",
      },
      {
        time: "14:30 - 15:30",
        title: "エンディング",
        org: "全校生徒",
        desc: "高専祭2026のフィナーレ！最高の締めくくりにしましょう！",
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
  const [selectedCategory, setSelectedCategory] = useState<string>("すべて");
  const [selectedGrade, setSelectedGrade] = useState<string>("すべて");
  const [selectedDept, setSelectedDept] = useState<string>("すべて");
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // 模擬店・企画フィルター処理
  const filteredStalls = STALLS_DATA.filter((stall) => {
    const matchSearch =
      stall.title.includes(searchQuery) ||
      stall.description.includes(searchQuery) ||
      stall.location.includes(searchQuery);
    const matchCategory =
      selectedCategory === "すべて" || stall.category === selectedCategory;
    const matchGrade = selectedGrade === "すべて" || stall.grade === selectedGrade;
    const matchDept = selectedDept === "すべて" || stall.dept === selectedDept;
    return matchSearch && matchCategory && matchGrade && matchDept;
  });

  // ----------------------------------------------------
  // 1. トップ（ランディング）画面
  // ----------------------------------------------------
  if (!isEntered) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center relative overflow-hidden px-6 text-center select-none">
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Dela+Gothic+One&family=M+PLUS+Rounded+1c:wght@800;900&display=swap');

          .font-pop {
            font-family: 'Dela Gothic One', 'M PLUS Rounded 1c', sans-serif;
          }

          @keyframes charPopIn {
            0% {
              opacity: 0;
              transform: translateY(22px) scale(0.7);
            }
            70% {
              opacity: 1;
              transform: translateY(-5px) scale(1.08);
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

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/60 via-slate-950 to-slate-950 pointer-events-none" />

        {/* 背景装飾 */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          <div className="absolute top-8 -left-8 text-sky-500/25 animate-spin-gear">
            <Cog className="w-32 h-32" />
          </div>
          <div
            className="absolute top-28 left-16 text-cyan-400/30 animate-spin-gear"
            style={{ animationDirection: "reverse", animationDuration: "18s" }}
          >
            <Cog className="w-16 h-16" />
          </div>
          <div className="absolute top-12 right-6 text-blue-400/30 animate-float-icon">
            <Cpu className="w-16 h-16" />
          </div>
          <div className="absolute top-36 right-24 text-cyan-300/30 animate-float-delayed">
            <Zap className="w-9 h-9" />
          </div>
          <div className="absolute bottom-24 left-6 text-indigo-400/30 animate-float-delayed">
            <Code className="w-14 h-14" />
          </div>
          <div className="absolute bottom-40 left-20 text-sky-400/25 animate-float-icon">
            <Terminal className="w-10 h-10" />
          </div>
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

        <p
          className="animate-fade font-pop text-xs sm:text-sm tracking-[0.2em] text-cyan-400 mb-3 uppercase drop-shadow z-10"
          style={{ animationDelay: "0.1s" }}
        >
          KOSEN FESTIVAL 2026
        </p>

        <h1 className="font-pop flex flex-col items-center justify-center tracking-wide mb-8 z-10">
          <div className="text-3xl sm:text-5xl text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] flex justify-center gap-1">
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
            <div className="text-5xl sm:text-7xl text-cyan-300 drop-shadow-[0_0_20px_rgba(56,189,248,0.7)] flex justify-center gap-1">
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

            <div className="text-base sm:text-2xl tracking-[0.25em] text-sky-200 mt-2 drop-shadow flex justify-center gap-1">
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

        <div className="animate-fade z-10" style={{ animationDelay: "1.7s" }}>
          <button
            onClick={() => setIsEntered(true)}
            className="font-pop w-64 sm:w-72 py-4 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white text-lg tracking-wider shadow-lg shadow-blue-500/40 hover:shadow-xl hover:shadow-blue-500/60 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 border border-cyan-300/30"
          >
            入場する 🎉
          </button>
        </div>

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
      {/* 上部ヘッダー */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md pt-3 pb-2 px-4 border-b border-blue-100 shadow-sm">
        <div className="max-w-md mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setIsEntered(false)}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100 transition"
              title="トップに戻る"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex flex-col leading-none font-pop">
              <span className="text-base sm:text-lg tracking-tight text-blue-700">
                熱狂の高専祭
              </span>
              <span className="text-[10px] tracking-widest text-sky-500 self-end -mt-0.5">
                カーニバル
              </span>
            </div>
          </div>

          <nav className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
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

            <button
              onClick={() => setActiveTab("stalls")}
              className={`flex items-center gap-1 px-3 py-2 rounded-full font-bold text-xs transition-all duration-200 shrink-0 ${
                activeTab === "stalls"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/30 px-3.5"
                  : "bg-blue-50 text-blue-700 hover:bg-blue-100"
              }`}
            >
              <Store className="w-4 h-4" />
              {activeTab === "stalls" && <span>企画・店舗</span>}
            </button>

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

      {/* メインコンテンツ */}
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
                第一体育館
              </div>
              <div className="absolute bottom-8 left-1/3 bg-amber-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow">
                学生昇降口前（キッチンカー）
              </div>
            </div>

            <div className="pt-2">
              <h2 className="font-extrabold text-base text-slate-800 mb-2 px-1">
                このフロアの店舗・企画
                <span className="text-xs font-bold text-slate-400 ml-2">敷地内全体</span>
              </h2>

              <div className="space-y-2.5">
                {STALLS_DATA.slice(0, 6).map((item) => (
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
                        <p className="text-xs text-slate-400 font-medium">
                          {item.location} ({item.grade})
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                        {item.category}
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: 模擬店・クラス企画・キッチンカー */}
        {activeTab === "stalls" && (
          <div className="space-y-4">
            {/* 種別（カテゴリー）切り替えボタン：キッチンカー枠を追加！ */}
            <div className="grid grid-cols-4 gap-1.5 bg-white p-2 rounded-3xl shadow-sm border border-slate-100">
              <button
                onClick={() => setSelectedCategory("すべて")}
                className={`flex flex-col items-center justify-center py-2 rounded-2xl text-[11px] font-extrabold transition-all ${
                  selectedCategory === "すべて"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                <Store className="w-5 h-5 mb-0.5" />
                全体
              </button>

              <button
                onClick={() => setSelectedCategory("模擬店")}
                className={`flex flex-col items-center justify-center py-2 rounded-2xl text-[11px] font-extrabold transition-all ${
                  selectedCategory === "模擬店"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                <Utensils className="w-5 h-5 mb-0.5 text-sky-500" />
                模擬店
              </button>

              <button
                onClick={() => setSelectedCategory("クラス企画")}
                className={`flex flex-col items-center justify-center py-2 rounded-2xl text-[11px] font-extrabold transition-all ${
                  selectedCategory === "クラス企画"
                    ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                    : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                <Sparkles className="w-5 h-5 mb-0.5 text-purple-500" />
                クラス企画
              </button>

              <button
                onClick={() => setSelectedCategory("キッチンカー")}
                className={`flex flex-col items-center justify-center py-2 rounded-2xl text-[11px] font-extrabold transition-all ${
                  selectedCategory === "キッチンカー"
                    ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
                    : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                <Truck className="w-5 h-5 mb-0.5 text-amber-500" />
                キッチンカー
              </button>
            </div>

            {/* 検索バー */}
            <div className="relative">
              <Search className="absolute left-3.5 top-3 text-blue-400 w-4 h-4" />
              <input
                type="text"
                placeholder="名称や内容・場所で検索 (例: ラーメン, 体育館)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200/80 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm text-xs font-medium"
              />
            </div>

            {/* 絞り込みフィルター */}
            <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm space-y-3">
              <p className="text-xs font-extrabold text-slate-600 flex items-center justify-between">
                <span>詳細絞り込み</span>
                <span className="text-[10px] font-normal text-slate-400">
                  該当: {filteredStalls.length} 件
                </span>
              </p>

              {/* 学年フィルター */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400 font-bold w-10 text-[11px] shrink-0">学年</span>
                <div className="flex gap-1.5 flex-wrap">
                  {["すべて", "1年", "2年", "3年", "4年", "外部", "部活"].map((g) => (
                    <button
                      key={g}
                      onClick={() => setSelectedGrade(g)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition ${
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

              {/* 学科フィルター */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400 font-bold w-10 text-[11px] shrink-0">学科</span>
                <div className="flex gap-1.5 flex-wrap">
                  {["すべて", "機械", "電気", "情報", "物質"].map((d) => (
                    <button
                      key={d}
                      onClick={() => setSelectedDept(d)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition ${
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

            {/* 一覧カード表示 */}
            <div className="space-y-3">
              {filteredStalls.length === 0 ? (
                <div className="bg-white p-8 rounded-3xl text-center text-slate-400 font-bold text-xs shadow-sm">
                  該当する企画・店舗が見つかりませんでした 🔍
                </div>
              ) : (
                filteredStalls.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition space-y-2 relative overflow-hidden"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-100 to-sky-50 flex items-center justify-center text-3xl shrink-0 border border-blue-200/50 shadow-inner">
                        {item.icon}
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {/* カテゴリバッジ */}
                          <span
                            className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                              item.category === "模擬店"
                                ? "bg-blue-600 text-white"
                                : item.category === "クラス企画"
                                ? "bg-purple-600 text-white"
                                : "bg-amber-500 text-white"
                            }`}
                          >
                            {item.category}
                          </span>

                          <span className="bg-sky-100 text-sky-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                            {item.subcategory}
                          </span>

                          <span className="text-[11px] text-slate-400 font-bold ml-auto">
                            📍 {item.location}
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <h3 className="font-extrabold text-base text-slate-800">
                            {item.title}
                          </h3>
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

                        <p className="text-xs text-slate-500 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-50 flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-bold">
                        主催: {item.grade}（{item.dept}）
                      </span>
                      <span className="font-extrabold text-slate-600 text-xs">
                        {item.location}
                      </span>
                    </div>
                  </div>
                ))
              )}
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