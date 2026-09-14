"use client";

import React, { useState, useMemo } from "react";
import {
  Map,
  Store,
  Calendar,
  Search,
  MapPin,
  ChevronRight,
  X,
  Compass
} from "lucide-react";

interface StallItem {
  id: number;
  title: string;
  category: "模擬店" | "クラス企画" | "キッチンカー";
  subcategory: string;
  grade: "1年" | "2年" | "3年" | "4年" | "外部" | "部活";
  dept: string;
  location: string;
  zoneId: string;
  description: string;
  icon: string;
  instagram?: string;
  menu?: string[];
}

const STALLS_DATA: StallItem[] = [
  // --- 第一体育館 (gym1) ---
  {
    id: 5,
    title: "パリッとジューシー餃子",
    category: "模擬店",
    subcategory: "フード",
    grade: "2年",
    dept: "機械 (2M)",
    location: "第一体育館 模擬店エリア",
    zoneId: "gym1",
    description: "2M（機械工学科）特製！鉄板で一気に焼き上げるパリッとジューシーな絶品焼き餃子！",
    icon: "🥟",
    menu: ["特製焼き餃子 (5個入)", "ピリ辛キムチ餃子"]
  },
  {
    id: 6,
    title: "できたてポップコーン",
    category: "模擬店",
    subcategory: "スナック",
    grade: "2年",
    dept: "電気 (2E)",
    location: "第一体育館 模擬店エリア",
    zoneId: "gym1",
    description: "2E（電気電子工学科）がお届けする弾ける香ばしさ！選べるフレーバーポップコーン！",
    icon: "🍿",
    menu: ["バター醤油", "塩キャラメル", "コンソメ"]
  },
  {
    id: 7,
    title: "山形名物 玉こん",
    category: "模擬店",
    subcategory: "フード",
    grade: "2年",
    dept: "情報 (2I)",
    location: "第一体育館 模擬店エリア",
    zoneId: "gym1",
    description: "2I（情報コース）秘伝の出汁がしっかり染み込んだ熱々の山形名物・玉こんにゃく！からしを添えてどうぞ！",
    icon: "🍡",
    menu: ["特製出汁玉こんにゃく (1本)"]
  },
  {
    id: 8,
    title: "極上炭火風 焼き鳥",
    category: "模擬店",
    subcategory: "フード",
    grade: "2年",
    dept: "物質 (2B)",
    location: "第一体育館 模擬店エリア",
    zoneId: "gym1",
    description: "2B（物質工学科）香ばしく焼き上げる秘伝タレ＆塩のやみつき焼き鳥！",
    icon: "🍢",
    menu: ["ももタレ", "皮塩", "つくね"]
  },

  // --- 昇降口前広場 (entrance) ---
  {
    id: 101,
    title: "ラーメン もっけだの",
    category: "キッチンカー",
    subcategory: "ラーメン",
    grade: "外部",
    dept: "キッチンカー",
    location: "学生昇降口前広場",
    zoneId: "entrance",
    description: "スープと麺にこだわり抜いた自慢の本格ラーメン！高専祭で味わう極上の一杯をご賞味あれ！",
    icon: "🍜",
    instagram: "https://www.instagram.com/mokkedanonoodle/",
    menu: ["特製醤油ラーメン", "濃厚味噌ラーメン", "チャーシュー丼"]
  },
  {
    id: 102,
    title: "祇園はんなりCafé",
    category: "キッチンカー",
    subcategory: "和スイーツ",
    grade: "外部",
    dept: "キッチンカー",
    location: "学生昇降口前広場",
    zoneId: "entrance",
    description: "とろける口溶けの本格本わらび餅や、出来立てふわふわのベビーカステラなど京都の味覚をお届け！",
    icon: "🍡",
    instagram: "https://www.instagram.com/gion_hannari_cafe/",
    menu: ["極上本わらび餅", "焼きたてベビーカステラ", "抹茶ラテ"]
  },
  {
    id: 103,
    title: "フェリチタプラス",
    category: "キッチンカー",
    subcategory: "エスニック・ドリンク",
    grade: "外部",
    dept: "キッチンカー",
    location: "学生昇降口前広場",
    zoneId: "entrance",
    description: "フルーツたっぷりのフレッシュスムージー＆スパイシーで食欲をそそる本格ガパオライス！",
    icon: "🥤",
    instagram: "https://www.instagram.com/felicitaplus.sakata/",
    menu: ["特製ガパオライス", "季節のフルーツスムージー", "タピオカミルクティー"]
  },

  // --- 1号館 (bldg1) ---
  {
    id: 1,
    title: "ほっとサンド 1-1",
    category: "模擬店",
    subcategory: "軽食",
    grade: "1年",
    dept: "1-1",
    location: "1号館 1F (111教室)",
    zoneId: "bldg1",
    description: "1-1による熱々で外はサクッ、中はジュワッ！香ばしい絶品ほっとサンドをご賞味あれ！",
    icon: "🥪",
    menu: ["ハムチーズサンド", "ツナマヨサンド", "あんバターサンド"]
  },
  {
    id: 2,
    title: "ドリンクショップ 1-2",
    category: "模擬店",
    subcategory: "ドリンク",
    grade: "1年",
    dept: "1-2",
    location: "1号館 1F (112教室)",
    zoneId: "bldg1",
    description: "1-2がお届けする冷たくてシュワっと美味しい各種ソフトドリンク＆スペシャルソーダ！",
    icon: "🍹",
    menu: ["メロンソーダ", "コーラ", "レモネード", "オレンジジュース"]
  },
  {
    id: 3,
    title: "カラフルわたあめ 1-3",
    category: "模擬店",
    subcategory: "スイーツ",
    grade: "1年",
    dept: "1-3",
    location: "1号館 1F (121教室)",
    zoneId: "bldg1",
    description: "1-3作！フワフワ甘くて可愛い映え間違いなしのカラフルビッグわたあめ！",
    icon: "🍥",
    menu: ["レインボーわたあめ", "いちご味", "ブルーハワイ味"]
  },
  {
    id: 4,
    title: "モチモチクレープ 1-4",
    category: "模擬店",
    subcategory: "スイーツ",
    grade: "1年",
    dept: "1-4",
    location: "1号館 1F (122教室)",
    zoneId: "bldg1",
    description: "1-4手作り生地のボリューム満点トッピングクレープ！甘党集合！",
    icon: "🥞",
    menu: ["チョコバナナ生クリーム", "イチゴスペシャル", "キャラメルナッツ"]
  },
  {
    id: 10,
    title: "RETRO & NEW ゲームカフェ",
    category: "クラス企画",
    subcategory: "体験・カフェ",
    grade: "3年",
    dept: "電気 (3E)",
    location: "1号館 1F (123教室)",
    zoneId: "bldg1",
    description: "3Eみんなでワイワイ楽しめる対戦ゲーム＆懐かしのレトロゲームを取り揃えた憩いの空間！",
    icon: "🎮",
    menu: ["フリープレイ＋フリードリンク"]
  },

  // --- 7号館 (bldg7) ---
  {
    id: 9,
    title: "戦慄のお化け屋敷 - 廃病棟の迷宮 -",
    category: "クラス企画",
    subcategory: "アトラクション",
    grade: "3年",
    dept: "機械 (3M)",
    location: "7号館 1F (711・712教室)",
    zoneId: "bldg7",
    description: "3Mギミック満載！機械工学科の技術を結集した本格的な恐怖があなたを襲う…絶叫必至！",
    icon: "👻",
    menu: ["入場チケット"]
  },
  {
    id: 14,
    title: "キッキングスナイパー",
    category: "クラス企画",
    subcategory: "体感ゲーム",
    grade: "4年",
    dept: "電気 (4E)",
    location: "7号館 2F (722教室)",
    zoneId: "bldg7",
    description: "4E動くターゲットを狙って力強くシュート！高得点を狙って豪華景品をゲットしよう！",
    icon: "⚽",
    menu: ["3球チャレンジ"]
  },
  {
    id: 16,
    title: "高専版・芸能人格付けチェック",
    category: "クラス企画",
    subcategory: "バラエティ",
    grade: "4年",
    dept: "物質 (4B)",
    location: "7号館 1F (713教室)",
    zoneId: "bldg7",
    description: "4Bあなたの一流度が試される！高級品と激安品を見破れるか！？全問正解で「一流高専生」の称号を！",
    icon: "🍷",
    menu: ["格付け挑戦チケット"]
  },

  // --- 機械実習工場 (factory) ---
  {
    id: 20,
    title: "ロボコン部 操縦体験＆超科学射的",
    category: "クラス企画",
    subcategory: "部活動体験",
    grade: "部活",
    dept: "ロボコン部",
    location: "機械実習工場 1F",
    zoneId: "factory",
    description: "高専ロボコン出場機体を実際に自分で操縦しよう！精密メカでターゲットを打ち抜く射的ゲームも同時開催！",
    icon: "🤖",
    menu: ["操縦体験", "射的ゲーム"]
  }
];

const EVENTS_DATA = [
  {
    stageId: "main",
    stageName: "メインステージ",
    location: "第一体育館",
    badgeColor: "bg-rose-500 text-white",
    schedule: [
      {
        id: "m1",
        time: "09:30 - 10:30",
        title: "オープニング ＆ 腕立て選手権",
        org: "実行委員会",
        desc: "高専生の筋肉の頂点を決める熱いバトル！誰が一番腕立て伏せができるかを競い合うオープニングイベント！",
        tag: "競技・体験",
        icon: "💪"
      },
      {
        id: "m2",
        time: "11:30 - 12:30",
        title: "爆笑！高専生有志 漫才ステージ",
        org: "有志団体",
        desc: "学内の爆笑王たちが集結！高専あるあるから本格コントまで、会場を笑顔の渦に巻き込みます！",
        tag: "お笑い",
        icon: "🎙️"
      },
      {
        id: "m3",
        time: "13:30 - 14:30",
        title: "ダンスパフォーマンス LIVE",
        org: "ダンス同好会 ＆ 有志",
        desc: "キレキレのロックダンスからヒップホップまで！エネルギー溢れる最高のステージパフォーマンス！",
        tag: "ダンス",
        icon: "💃"
      },
      {
        id: "m4",
        time: "14:30 - 15:30",
        title: "グランドエンディング ＆ フィナーレ",
        org: "全校生徒・実行委員会",
        desc: "高専祭2026のフィナーレ！全校生徒と来場者の皆様で盛り上がる感動のクライマックス！",
        tag: "セレモニー",
        icon: "🎆"
      }
    ]
  }
];

// 構内図画像上のピン位置情報（メディアセンターを削除し7号館を配置）
const CAMPUS_ZONES = [
  {
    id: "gym1",
    name: "第一体育館",
    subName: "メインステージ ＆ 2年模擬店",
    pinLabel: "第一体育館",
    color: "bg-rose-500",
    lightBg: "bg-rose-50 border-rose-300 text-rose-900",
    icon: "🏟️",
    top: "72%",
    left: "30%",
    desc: "高専祭の超メイン会場！ステージプログラムと2年生4学科による焼き餃子・ポップコーン・玉こん・焼き鳥！"
  },
  {
    id: "entrance",
    name: "昇降口前広場",
    subName: "キッチンカーエリア",
    pinLabel: "昇降口前広場",
    color: "bg-amber-500",
    lightBg: "bg-amber-50 border-amber-300 text-amber-900",
    icon: "🚚",
    top: "58%",
    left: "63%",
    desc: "人気のキッチンカー3店が集結！ラーメンもっけだの、祇園はんなりCafé、フェリチタプラス！"
  },
  {
    id: "bldg1",
    name: "1号館",
    subName: "一般教室棟・管理棟",
    pinLabel: "1号館",
    color: "bg-blue-500",
    lightBg: "bg-blue-50 border-blue-300 text-blue-900",
    icon: "🏫",
    top: "38%",
    left: "40%",
    desc: "キャンパス中央に位置するメイン校舎。1年生の軽食・スイーツ模擬店や各種クラス企画を展開！"
  },
  {
    id: "bldg7",
    name: "7号館",
    subName: "アトラクション棟",
    pinLabel: "7号館",
    color: "bg-purple-500",
    lightBg: "bg-purple-50 border-purple-300 text-purple-900",
    icon: "👻",
    top: "26%",
    left: "72%",
    desc: "体験型アトラクション満載！機械工学科特製の恐怖お化け屋敷やキッキングスナイパー、格付けチェック！"
  },
  {
    id: "factory",
    name: "機械実習工場",
    subName: "モノづくり拠点",
    pinLabel: "実習工場",
    color: "bg-emerald-500",
    lightBg: "bg-emerald-50 border-emerald-300 text-emerald-900",
    icon: "⚙️",
    top: "16%",
    left: "16%",
    desc: "高専ならではの技術体験！全国大会出場のロボコン部機体を直接操縦できます！"
  },
  {
    id: "parking",
    name: "正門・駐車場",
    subName: "アプローチ",
    pinLabel: "駐車場",
    color: "bg-sky-500",
    lightBg: "bg-sky-50 border-sky-300 text-sky-900",
    icon: "🅿️",
    top: "84%",
    left: "86%",
    desc: "ご来場者様用駐車場および駐輪場です。"
  }
];

export default function App() {
  const [isEntered, setIsEntered] = useState(false);
  const [activeTab, setActiveTab] = useState<"map" | "stalls" | "events">("map");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedZoneId, setSelectedZoneId] = useState("gym1");
  const [modalItem, setModalItem] = useState<StallItem | null>(null);

  const filteredStalls = useMemo(() => {
    return STALLS_DATA.filter((stall) => {
      return (
        stall.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stall.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stall.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [searchQuery]);

  const zoneStalls = useMemo(() => {
    return STALLS_DATA.filter((s) => s.zoneId === selectedZoneId);
  }, [selectedZoneId]);

  const currentZone = CAMPUS_ZONES.find((z) => z.id === selectedZoneId) || CAMPUS_ZONES[0];

  if (!isEntered) {
    return (
      <div className="min-h-screen bg-[#FFFDF7] text-slate-800 flex flex-col items-center justify-center relative overflow-hidden px-6 text-center select-none font-sans">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@700;800;900&display=swap');
          .font-pop { font-family: 'M PLUS Rounded 1c', sans-serif; }
          @keyframes charPopIn {
            0% { opacity: 0; transform: translateY(20px) scale(0.7); }
            70% { opacity: 1; transform: translateY(-4px) scale(1.08); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
          .animate-char { animation: charPopIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; opacity: 0; }
        `}</style>

        <div className="inline-flex items-center gap-1.5 text-teal-600 font-extrabold text-xs sm:text-sm tracking-[0.25em] mb-4 z-10 font-pop">
          TSURUOKA KOSEN FESTIVAL 2026
        </div>

        {/* トップ画面タイトル：ふりがな（カーニバル）表記 */}
        <h1 className="font-pop flex flex-col items-center justify-center tracking-tight mb-6 z-10">
          <div className="flex items-center gap-1.5 mb-1 bg-amber-100 text-amber-800 px-3 py-1 rounded-full border border-amber-300 shadow-sm">
            <span className="text-[11px] font-black bg-amber-500 text-white px-1.5 py-0.2 rounded">ふりがな</span>
            <span className="text-sm font-black tracking-widest">カーニバル</span>
          </div>
          <div className="text-4xl sm:text-6xl text-rose-500 font-black drop-shadow-sm flex justify-center gap-0.5">
            {"熱狂の高専祭".split("").map((char, index) => (
              <span key={index} className="animate-char inline-block" style={{ animationDelay: `${0.1 + index * 0.07}s` }}>
                {char}
              </span>
            ))}
          </div>
        </h1>

        <button
          onClick={() => setIsEntered(true)}
          className="font-pop px-10 py-4 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 text-white text-lg font-black tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 border border-white/40 z-10"
        >
          <span>マップを見る</span>
          <span className="text-xl">🗺️</span>
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-2.5 flex items-center justify-between gap-2">
          <button onClick={() => setIsEntered(false)} className="flex items-center gap-2 text-left shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-500 via-amber-500 to-rose-500 flex items-center justify-center font-black text-white text-base shadow-sm">
              高
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-black text-sm text-slate-800">熱狂の高専祭2026</span>
              <span className="text-[10px] text-slate-500">鶴岡高専キャンパス</span>
            </div>
          </button>

          {/* 右上ナビゲーション：タップ時のみテキスト表示 */}
          <nav className="flex items-center gap-1 bg-slate-100 p-1 rounded-full border border-slate-200">
            <button
              onClick={() => setActiveTab("map")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                activeTab === "map" ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white" : "text-slate-600 hover:text-slate-900"
              }`}
              title="マップ"
            >
              <Map className="w-4 h-4" />
              {activeTab === "map" && <span>マップ</span>}
            </button>
            <button
              onClick={() => setActiveTab("stalls")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                activeTab === "stalls" ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white" : "text-slate-600 hover:text-slate-900"
              }`}
              title="企画一覧"
            >
              <Store className="w-4 h-4" />
              {activeTab === "stalls" && <span>企画一覧</span>}
            </button>
            <button
              onClick={() => setActiveTab("events")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                activeTab === "events" ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white" : "text-slate-600 hover:text-slate-900"
              }`}
              title="ステージ"
            >
              <Calendar className="w-4 h-4" />
              {activeTab === "events" && <span>ステージ</span>}
            </button>
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-2xl mx-auto px-4 pt-4 pb-12 space-y-4">
        {activeTab === "map" && (
          <div className="space-y-4">
            {/* Header info (文字削除済み) */}
            <div className="bg-white rounded-3xl px-4 py-3 border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-orange-600" />
                <span className="text-xs font-black tracking-widest text-orange-600 uppercase">
                  INTERACTIVE MAP
                </span>
              </div>
              <span className="text-xs bg-orange-100 text-orange-800 font-extrabold px-3 py-1 rounded-full border border-orange-200">
                ピンをタップ！
              </span>
            </div>

            {/* Interactive Image Map */}
            <div className="relative w-full rounded-3xl overflow-hidden border-2 border-slate-200 shadow-md bg-slate-200 aspect-[4/3]">
              <img
                src="/校内図.jpeg"
                alt="鶴岡高専 構内図"
                className="w-full h-full object-cover select-none"
              />

              {CAMPUS_ZONES.map((zone) => {
                const isSelected = selectedZoneId === zone.id;
                return (
                  <button
                    key={zone.id}
                    onClick={() => setSelectedZoneId(zone.id)}
                    style={{ top: zone.top, left: zone.left }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-10 flex flex-col items-center group ${
                      isSelected ? "scale-125 z-30" : "hover:scale-110"
                    }`}
                  >
                    <div
                      className={`px-2 py-0.5 rounded-full text-[10px] font-black whitespace-nowrap shadow-md mb-0.5 border flex items-center gap-1 ${
                        isSelected
                          ? "bg-slate-900 text-white border-slate-700 ring-2 ring-rose-400"
                          : "bg-white/95 text-slate-800 border-slate-200 group-hover:bg-orange-500 group-hover:text-white"
                      }`}
                    >
                      <span>{zone.icon}</span>
                      <span>{zone.pinLabel}</span>
                    </div>

                    <div className="relative flex items-center justify-center">
                      {isSelected && (
                        <span className="absolute w-8 h-8 rounded-full bg-rose-500/40 animate-ping" />
                      )}
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shadow-lg text-white border-2 border-white transition ${
                          isSelected ? "bg-rose-600 ring-4 ring-rose-300" : `${zone.color}`
                        }`}
                      >
                        <MapPin className="w-4 h-4" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Location Details */}
            <div className={`rounded-3xl p-5 border shadow-sm space-y-4 transition-all ${currentZone.lightBg}`}>
              <div className="flex items-start justify-between gap-2 border-b border-current/10 pb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl p-2 bg-white/80 rounded-2xl shadow-sm">{currentZone.icon}</span>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">{currentZone.name}</h3>
                    <p className="text-xs font-bold opacity-80">{currentZone.subName}</p>
                  </div>
                </div>
                <span className="text-xs font-black px-3 py-1 bg-white/90 rounded-full shadow-sm">
                  出店・企画 ({zoneStalls.length}件)
                </span>
              </div>

              <p className="text-xs leading-relaxed font-medium opacity-90">{currentZone.desc}</p>

              <div className="space-y-2">
                <h4 className="text-xs font-extrabold text-slate-800 flex items-center gap-1">
                  <span>📍 {currentZone.name} の出展・企画一覧</span>
                </h4>

                {zoneStalls.length > 0 ? (
                  <div className="grid grid-cols-1 gap-2">
                    {zoneStalls.map((stall) => (
                      <div
                        key={stall.id}
                        onClick={() => setModalItem(stall)}
                        className="bg-white text-slate-800 p-3.5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md cursor-pointer transition flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl p-2 bg-slate-50 rounded-xl">{stall.icon}</span>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-black px-2 py-0.2 bg-orange-100 text-orange-700 rounded">
                                {stall.grade}
                              </span>
                              <span className="text-[10px] font-bold text-slate-500">{stall.category}</span>
                            </div>
                            <h5 className="font-black text-sm text-slate-900 mt-0.5">{stall.title}</h5>
                            <p className="text-[11px] text-slate-500 font-medium">{stall.location}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white/60 p-4 rounded-2xl text-center text-xs text-slate-500 font-bold border border-slate-200">
                    この場所には現在個別の催し物リストはありません。
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Stalls */}
        {activeTab === "stalls" && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="企画名・料理名・場所で検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredStalls.map((stall) => (
                <div
                  key={stall.id}
                  onClick={() => setModalItem(stall)}
                  className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm cursor-pointer hover:shadow-md transition space-y-2"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2 bg-slate-50 rounded-2xl">{stall.icon}</span>
                    <div>
                      <span className="text-[10px] font-black px-2 py-0.5 bg-orange-50 text-orange-700 rounded border border-orange-200">
                        {stall.grade}
                      </span>
                      <h4 className="font-black text-sm text-slate-800 mt-0.5">{stall.title}</h4>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2">{stall.description}</p>
                  <div className="text-[11px] text-slate-500 font-bold pt-2 border-t flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span>{stall.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Events */}
        {activeTab === "events" && (
          <div className="space-y-4">
            {EVENTS_DATA.map((stage) => (
              <div key={stage.stageId} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-black ${stage.badgeColor}`}>
                    {stage.stageName} ({stage.location})
                  </span>
                </div>
                <div className="divide-y divide-slate-100">
                  {stage.schedule.map((item) => (
                    <div key={item.id} className="p-4 space-y-1">
                      <span className="text-xs font-black text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                        {item.time}
                      </span>
                      <h4 className="font-black text-sm text-slate-800 mt-1">{item.title}</h4>
                      <p className="text-xs text-slate-600 font-medium">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Detail Modal */}
      {modalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 text-slate-800 w-full max-w-md rounded-3xl p-6 shadow-2xl relative space-y-4">
            <button
              onClick={() => setModalItem(null)}
              className="absolute right-4 top-4 p-2 rounded-full bg-slate-100 text-slate-500"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <span className="text-4xl p-3 bg-slate-50 rounded-2xl">{modalItem.icon}</span>
              <div>
                <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-700">
                  {modalItem.grade}
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-0.5">{modalItem.title}</h3>
              </div>
            </div>
            <p className="text-xs text-slate-600 font-medium bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
              {modalItem.description}
            </p>
            <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-rose-500" />
              <span>場所: {modalItem.location}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}