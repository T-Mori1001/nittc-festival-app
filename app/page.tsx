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
  ExternalLink,
} from "lucide-react";

// Lucideから削除されたInstagramアイコンをインラインSVGで定義
const InstagramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

interface StallItem {
  id: number;
  title: string;
  category: "模擬店" | "クラス企画" | "キッチンカー";
  grade: string;
  dept: string;
  location: string;
  zoneId: string;
  description: string;
  icon: string;
  instagram?: string;
  menu?: string[];
}

const STALLS_DATA: StallItem[] = [
  // --- 1号館 (bldg1) ---
  {
    id: 1,
    title: "ほっとサンド",
    category: "模擬店",
    grade: "1-1",
    dept: "1年1組",
    location: "1号館 1F 111教室",
    zoneId: "bldg1",
    description: "1-1による熱々で外はサクッ、中はジュワッ！香ばしい絶品ほっとサンド！",
    icon: "🥪",
    menu: ["ほっとサンド"]
  },
  {
    id: 2,
    title: "ドリンク",
    category: "模擬店",
    grade: "1-2",
    dept: "1年2組",
    location: "1号館 1F 112教室",
    zoneId: "bldg1",
    description: "1-2がお届けする冷たくてシュワっと美味しい各種ソフトドリンク！",
    icon: "🍹",
    menu: ["ソフトドリンク各種"]
  },
  {
    id: 3,
    title: "わたあめ",
    category: "模擬店",
    grade: "1-3",
    dept: "1年3組",
    location: "1号館 1F 121教室",
    zoneId: "bldg1",
    description: "1-3作！フワフワ甘くて可愛いビッグわたあめ！",
    icon: "🍥",
    menu: ["わたあめ"]
  },
  {
    id: 4,
    title: "クレープ",
    category: "模擬店",
    grade: "1-4",
    dept: "1年4組",
    location: "1号館 1F 122教室",
    zoneId: "bldg1",
    description: "1-4手作り生地のボリューム満点トッピングクレープ！",
    icon: "🥞",
    menu: ["手作りクレープ"]
  },
  {
    id: 10,
    title: "ゲームカフェ",
    category: "クラス企画",
    grade: "3E",
    dept: "3年 電気・電子コース (3E)",
    location: "1号館 1F 123教室",
    zoneId: "bldg1",
    description: "3Eみんなでワイワイ楽しめる対戦ゲーム＆レトロゲームが揃ったゲームカフェ！",
    icon: "🎮"
  },
  {
    id: 11,
    title: "バー",
    category: "クラス企画",
    grade: "3I",
    dept: "3年 情報コース (3I)",
    location: "1号館 1F 132教室",
    zoneId: "bldg1",
    description: "3Iがお届けするおしゃれで落ち着いた雰囲気のノンアルコールバー！",
    icon: "🍸"
  },
  {
    id: 12,
    title: "喫茶店",
    category: "クラス企画",
    grade: "3B",
    dept: "3年 生物・化学コース (3B)",
    location: "1号館 1F 133教室",
    zoneId: "bldg1",
    description: "3Bによるゆったり寛げる特製喫茶店！こだわりのドリンクでおもてなし。",
    icon: "☕"
  },
  {
    id: 13,
    title: "ホスト",
    category: "クラス企画",
    grade: "4M",
    dept: "4年 機械コース (4M)",
    location: "1号館 1F 113教室",
    zoneId: "bldg1",
    description: "4Mのイケメンたちが華麗にお出迎え！？非日常の最高のおもてなし空間！",
    icon: "🌹"
  },
  {
    id: 15,
    title: "カジノ",
    category: "クラス企画",
    grade: "4I",
    dept: "4年 情報コース (4I)",
    location: "1号館 1F 131教室",
    zoneId: "bldg1",
    description: "4I特製カジノ！本格的なテーブルゲームでスリリングな心理戦を楽しもう！",
    icon: "🎲"
  },

  // --- 第一体育館 (gym1) ---
  {
    id: 5,
    title: "餃子",
    category: "模擬店",
    grade: "2M",
    dept: "2年 機械コース (2M)",
    location: "第一体育館 模擬店エリア",
    zoneId: "gym1",
    description: "2M特製！鉄板で一気に焼き上げるパリッとジューシーな絶品焼き餃子！",
    icon: "🥟",
    menu: ["特製焼き餃子"]
  },
  {
    id: 6,
    title: "ポップコーン",
    category: "模擬店",
    grade: "2E",
    dept: "2年 電気・電子コース (2E)",
    location: "第一体育館 模擬店エリア",
    zoneId: "gym1",
    description: "2Eがお届けする弾ける香ばしさ！選べるフレーバーポップコーン！",
    icon: "🍿",
    menu: ["フレーバーポップコーン"]
  },
  {
    id: 7,
    title: "玉こん",
    category: "模擬店",
    grade: "2I",
    dept: "2年 情報コース (2I)",
    location: "第一体育館 模擬店エリア",
    zoneId: "gym1",
    description: "2I秘伝の出汁がしっかり染み込んだ熱々の山形名物・玉こんにゃく！",
    icon: "🍡",
    menu: ["山形名物 玉こんにゃく"]
  },
  {
    id: 8,
    title: "焼き鳥",
    category: "模擬店",
    grade: "2B",
    dept: "2年 生物・化学コース (2B)",
    location: "第一体育館 模擬店エリア",
    zoneId: "gym1",
    description: "2B香ばしく焼き上げる秘伝タレ＆塩のやみつき焼き鳥！",
    icon: "🍢",
    menu: ["やみつき焼き鳥"]
  },

  // --- 7号館 (bldg7) ---
  {
    id: 9,
    title: "お化け屋敷",
    category: "クラス企画",
    grade: "3M",
    dept: "3年 機械コース (3M)",
    location: "7号館 1F (711・712教室)",
    zoneId: "bldg7",
    description: "3Mギミック満載！機械コースの技術を結集した本格的な恐怖があなたを襲う…絶叫必至！",
    icon: "👻"
  },
  {
    id: 14,
    title: "キッキングスナイパー",
    category: "クラス企画",
    grade: "4E",
    dept: "4年 電気・電子コース (4E)",
    location: "7号館 2F 722教室",
    zoneId: "bldg7",
    description: "4E動くターゲットを狙ってシュート！高得点を狙って豪華景品をゲットしよう！",
    icon: "⚽"
  },
  {
    id: 16,
    title: "格付けチェック",
    category: "クラス企画",
    grade: "4B",
    dept: "4年 生物・化学コース (4B)",
    location: "7号館 マルチメディア教室",
    zoneId: "bldg7",
    description: "4Bあなたの一流度が試される！高級品と激安品を見破れるか！？全問正解で「一流高専生」の称号を！",
    icon: "🍷"
  },

  // --- 昇降口前広場 (entrance) ---
  {
    id: 101,
    title: "ラーメン もっけだの",
    category: "キッチンカー",
    grade: "外部",
    dept: "キッチンカー",
    location: "学生昇降口前",
    zoneId: "entrance",
    description: "スープと麺にこだわり抜いた自慢の本格ラーメン！高専祭で味わう極上の一杯をご賞味あれ！",
    icon: "🍜",
    instagram: "https://www.instagram.com/mokkedanonoodle/",
    menu: ["ラーメン"]
  },
  {
    id: 102,
    title: "祇園はんなりCafé",
    category: "キッチンカー",
    grade: "外部",
    dept: "キッチンカー",
    location: "学生昇降口前",
    zoneId: "entrance",
    description: "とろける口溶けの本格本わらび餅や、出来立てふわふわのベビーカステラなど京都の味覚をお届け！",
    icon: "🍡",
    instagram: "https://www.instagram.com/gion_hannari_cafe/",
    menu: ["本わらび餅", "ベビーカステラ等"]
  },
  {
    id: 103,
    title: "フェリチタプラス",
    category: "キッチンカー",
    grade: "外部",
    dept: "キッチンカー",
    location: "学生昇降口前",
    zoneId: "entrance",
    description: "フルーツたっぷりのフレッシュスムージー＆スパイシーで食欲をそそる本格ガパオライス！",
    icon: "🥤",
    instagram: "https://www.instagram.com/felicitaplus.sakata/",
    menu: ["スムージー", "ガパオライス等"]
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
    desc: "高専祭の超メイン会場！ステージプログラムと2年生4コース（2M, 2E, 2I, 2B）による餃子・ポップコーン・玉こん・焼き鳥！"
  },
  {
    id: "entrance",
    name: "学生昇降口前",
    subName: "キッチンカーエリア",
    pinLabel: "学生昇降口前",
    color: "bg-amber-500",
    lightBg: "bg-amber-50 border-amber-300 text-amber-900",
    icon: "🚚",
    top: "58%",
    left: "63%",
    desc: "話題のキッチンカー3店が集結！ラーメンもっけだの、祇園はんなりCafé、フェリチタプラス！"
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
    desc: "キャンパス中央に位置するメイン校舎。1年生の各種模擬店および3・4年生の趣向を凝らしたクラス企画を展開！"
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
    desc: "体験型アトラクション満載！3M特製お化け屋敷、4Eキッキングスナイパー、4B格付けチェック！"
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

export default function Page() {
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
        stall.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stall.grade.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [searchQuery]);

  const zoneStalls = useMemo(() => {
    return STALLS_DATA.filter((s) => s.zoneId === selectedZoneId);
  }, [selectedZoneId]);

  const currentZone = CAMPUS_ZONES.find((z) => z.id === selectedZoneId) || CAMPUS_ZONES[0];

  if (!isEntered) {
    return (
      <div className="min-h-screen bg-[#FFFDF7] text-slate-800 flex flex-col items-center justify-between py-12 px-6 relative overflow-hidden select-none font-sans">
        {/* コンフェッティ（紙吹雪）装飾 */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-4 left-4 w-4 h-6 bg-orange-400 rounded-sm rotate-12" />
          <div className="absolute top-3 right-4 w-5 h-3 bg-blue-500 rounded-sm -rotate-45" />
          <div className="absolute top-2 right-12 w-3 h-4 bg-pink-500 rounded-sm rotate-12" />
          <div className="absolute top-4 right-20 w-4 h-3 bg-teal-500 rounded-sm rotate-45" />

          <div className="absolute top-14 left-1/2 -translate-x-32 w-5 h-3 bg-pink-400 rounded-sm -rotate-12" />
          <div className="absolute top-16 left-1/2 -translate-x-12 w-6 h-3 bg-orange-500 rounded-sm rotate-12" />
          <div className="absolute top-14 left-1/2 translate-x-12 w-4 h-3 bg-teal-400 rounded-sm -rotate-45" />
          <div className="absolute top-16 left-1/2 translate-x-24 w-4 h-3 bg-red-400 rounded-sm rotate-45" />

          <div className="absolute top-32 left-10 w-6 h-4 bg-blue-600 rounded-sm -rotate-45" />
          <div className="absolute top-36 left-24 w-4 h-5 bg-pink-500 rounded-sm rotate-12" />
          <div className="absolute top-36 right-24 w-5 h-4 bg-teal-500 rounded-sm -rotate-12" />

          <div className="absolute top-48 left-16 w-5 h-3 bg-amber-400 rounded-sm rotate-45" />
          <div className="absolute top-52 left-32 w-4 h-6 bg-amber-500 rounded-sm -rotate-12" />
          <div className="absolute top-56 left-48 w-4 h-3 bg-red-500 rounded-sm rotate-12" />
          <div className="absolute top-52 right-44 w-3 h-5 bg-blue-500 rounded-sm -rotate-45" />

          <div className="absolute bottom-20 left-2 w-5 h-3 bg-red-500 rounded-sm rotate-12" />
        </div>

        {/* 空白スペーサー */}
        <div />

        {/* メインコンテンツブロック */}
        <div className="w-full max-w-sm flex flex-col items-center text-center z-10 my-auto space-y-6">
          {/* サブタイトル英字 */}
          <div className="text-teal-600 font-extrabold text-xs tracking-[0.25em] font-sans">
            TSURUOKA KOSEN FESTIVAL 2026
          </div>

          {/* メインタイトル：「熱狂の高専祭」（高専祭の真上にカーニバル） */}
          <div className="flex items-baseline justify-center font-black tracking-tight text-[#E53935] drop-shadow-sm font-sans">
            <span className="text-4xl sm:text-5xl">熱狂の</span>
            <div className="relative inline-block ml-1">
              {/* 「高専祭」の真上にぴったり配置されたカーニバル */}
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[11px] sm:text-xs font-black text-rose-500 tracking-widest whitespace-nowrap">
                カーニバル
              </span>
              <span className="text-5xl sm:text-6xl">高専祭</span>
            </div>
          </div>

          {/* 日時バッジ（カプセルデザイン） */}
          <div className="bg-white/95 border border-slate-200/80 shadow-sm rounded-full px-5 py-2.5 flex items-center justify-center gap-2 text-xs font-extrabold text-slate-700">
            <span className="text-rose-600">2026.10.24 SAT</span>
            <span className="text-slate-300">|</span>
            <span>9:30〜15:30</span>
            <span className="text-slate-400 font-normal">@鶴岡高専</span>
          </div>

          {/* 入場ボタン */}
          <div className="pt-4 w-full flex flex-col items-center space-y-3">
            <button
              onClick={() => setIsEntered(true)}
              className="w-full max-w-[260px] py-4 rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 text-white text-base font-black tracking-wider shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 border border-white/30"
            >
              <span>入場する</span>
              <span className="text-lg">🎉</span>
            </button>

            {/* 下部メッセージ */}
            <p className="text-xs text-slate-500 font-semibold tracking-wide">
              鶴岡高専祭をお楽しみください！
            </p>
          </div>
        </div>

        {/* 空白スペーサー */}
        <div />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-2.5 flex items-center justify-between gap-2">
          {/* 左上ロゴ：「高専ロゴ.jpg」アイコン + 「高専祭」テキスト */}
          <button onClick={() => setIsEntered(false)} className="flex items-center gap-2.5 text-left shrink-0">
            <img src="/高専ロゴ.jpg" alt="高専ロゴ" className="w-9 h-9 object-contain" />
            <span className="font-black text-lg text-slate-800">高専祭</span>
          </button>

          {/* 右上ナビゲーション */}
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
            {/* インタラクティブ構内図 */}
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
                  placeholder="クラス・企画名・料理名・場所で検索..."
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
                  className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm cursor-pointer hover:shadow-md transition space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-3xl p-2 bg-slate-50 rounded-2xl">{stall.icon}</span>
                        <div>
                          <span className="text-[10px] font-black px-2 py-0.5 bg-orange-100 text-orange-700 rounded border border-orange-200">
                            {stall.grade}
                          </span>
                          <h4 className="font-black text-sm text-slate-800 mt-0.5">{stall.title}</h4>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2">{stall.description}</p>
                  </div>

                  <div className="pt-2 border-t flex items-center justify-between text-[11px] text-slate-500 font-bold">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" />
                      <span>{stall.location}</span>
                    </div>

                    {stall.instagram && (
                      <a
                        href={stall.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-pink-600 bg-pink-50 hover:bg-pink-100 px-2 py-1 rounded-full text-[10px] font-bold border border-pink-200 transition"
                      >
                        <InstagramIcon className="w-3 h-3" />
                        <span>Instagram</span>
                      </a>
                    )}
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
              className="absolute right-4 top-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <span className="text-4xl p-3 bg-slate-50 rounded-2xl">{modalItem.icon}</span>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-700">
                    {modalItem.grade}
                  </span>
                  <span className="text-xs font-bold text-slate-500">{modalItem.category}</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 mt-0.5">{modalItem.title}</h3>
                <p className="text-xs text-slate-500 font-bold">{modalItem.dept}</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 font-medium bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
              {modalItem.description}
            </p>

            {modalItem.menu && modalItem.menu.length > 0 && (
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-400">提供内容・メニュー</span>
                <div className="flex flex-wrap gap-1.5">
                  {modalItem.menu.map((m, i) => (
                    <span key={i} className="text-xs font-extrabold px-2.5 py-1 bg-amber-50 text-amber-800 rounded-lg border border-amber-200">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="text-xs font-bold text-slate-700 flex items-center justify-between pt-2 border-t">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-rose-500" />
                <span>場所: {modalItem.location}</span>
              </div>

              {modalItem.instagram && (
                <a
                  href={modalItem.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-white bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:opacity-90 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm transition"
                >
                  <InstagramIcon className="w-4 h-4" />
                  <span>公式 Instagram</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}