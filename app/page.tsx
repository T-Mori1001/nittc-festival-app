"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Map,
  Store,
  Calendar,
  Search,
  MapPin,
  ChevronRight,
  X,
  ExternalLink,
  Layers,
  Radio,
  Car,
  Clock,
  Navigation,
  Info,
  AlertTriangle,
  Globe,
} from "lucide-react";

// Instagramアイコン用SVG
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

// 出店・企画・施設データ型
interface StallItem {
  id: number;
  title: string;
  category: "模擬店" | "クラス企画" | "キッチンカー" | "校内施設・サービス";
  grade: string;
  dept: string;
  location: string;
  zoneId: string;
  floor?: "1F" | "2F" | "3F";
  roomNo?: string;
  description: string;
  icon: string;
  instagram?: string;
  menu?: string[];
}

// 全出店・企画・施設データ
const STALLS_DATA: StallItem[] = [
  // --- 1号館 (bldg1) 1F ---
  {
    id: 1,
    title: "ほっとサンド",
    category: "模擬店",
    grade: "1-1",
    dept: "1年1組",
    location: "1号館 1F 111教室",
    zoneId: "bldg1",
    floor: "1F",
    roomNo: "111教室",
    description: "1-1による熱々で外はサクッ、中はジュワッ！香ばしい絶品ほっとサンド！",
    icon: "🥪",
    menu: ["ほっとサンド"],
  },
  {
    id: 2,
    title: "ドリンク",
    category: "模擬店",
    grade: "1-2",
    dept: "1年2組",
    location: "1号館 1F 112教室",
    zoneId: "bldg1",
    floor: "1F",
    roomNo: "112教室",
    description: "1-2がお届けする冷たくてシュワっと美味しい各種ソフトドリンク！",
    icon: "🍹",
    menu: ["ソフトドリンク各種"],
  },
  {
    id: 13,
    title: "ホスト",
    category: "クラス企画",
    grade: "4M",
    dept: "4年 機械コース (4M)",
    location: "1号館 1F 113教室",
    zoneId: "bldg1",
    floor: "1F",
    roomNo: "113教室",
    description: "4Mのメンバーが華麗にお出迎え！？非日常の最高のおもてなし空間！",
    icon: "🌹",
  },

  // --- 1号館 (bldg1) 2F ---
  {
    id: 3,
    title: "わたあめ",
    category: "模擬店",
    grade: "1-3",
    dept: "1年3組",
    location: "1号館 2F 121教室",
    zoneId: "bldg1",
    floor: "2F",
    roomNo: "121教室",
    description: "1-3作！フワフワ甘くて可愛いビッグわたあめ！",
    icon: "🍥",
    menu: ["わたあめ"],
  },
  {
    id: 4,
    title: "クレープ",
    category: "模擬店",
    grade: "1-4",
    dept: "1年4組",
    location: "1号館 2F 122教室",
    zoneId: "bldg1",
    floor: "2F",
    roomNo: "122教室",
    description: "1-4手作り生地のボリューム満点トッピングクレープ！",
    icon: "🥞",
    menu: ["手作りクレープ"],
  },
  {
    id: 10,
    title: "ゲームカフェ",
    category: "クラス企画",
    grade: "3E",
    dept: "3年 電気・電子コース (3E)",
    location: "1号館 2F 123教室",
    zoneId: "bldg1",
    floor: "2F",
    roomNo: "123教室",
    description: "3Eみんなでワイワイ楽しめる対戦ゲーム＆レトロゲームが揃ったゲームカフェ！",
    icon: "🎮",
  },

  // --- 1号館 (bldg1) 3F ---
  {
    id: 15,
    title: "カジノ",
    category: "クラス企画",
    grade: "4I",
    dept: "4年 情報コース (4I)",
    location: "1号館 3F 131教室",
    zoneId: "bldg1",
    floor: "3F",
    roomNo: "131教室",
    description: "4I特製カジノ！本格的なテーブルゲームでスリリングな心理戦を楽しもう！",
    icon: "🎲",
  },
  {
    id: 11,
    title: "バー",
    category: "クラス企画",
    grade: "3I",
    dept: "3年 情報コース (3I)",
    location: "1号館 3F 132教室",
    zoneId: "bldg1",
    floor: "3F",
    roomNo: "132教室",
    description: "3Iがお届けするおしゃれで落ち着いた雰囲気のノンアルコールバー！",
    icon: "🍸",
  },
  {
    id: 12,
    title: "喫茶店",
    category: "クラス企画",
    grade: "3B",
    dept: "3年 生物・化学コース (3B)",
    location: "1号館 3F 133教室",
    zoneId: "bldg1",
    floor: "3F",
    roomNo: "133教室",
    description: "3Bによるゆったり寛げる特製喫茶店！こだわりのドリンクでおもてなし。",
    icon: "☕",
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
    menu: ["特製焼き餃子"],
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
    menu: ["フレーバーポップコーン"],
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
    menu: ["山形名物 玉こんにゃく"],
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
    menu: ["やみつき焼き鳥"],
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
    description: "3Mギミック満載！機械コースの技術を結集した本格的な恐怖があなたを襲う…！",
    icon: "👻",
  },
  {
    id: 14,
    title: "キッキングスナイパー",
    category: "クラス企画",
    grade: "4E",
    dept: "4年 電気・電子コース (4E)",
    location: "7号館 2F 722教室",
    zoneId: "bldg7",
    description: "4E動くターゲットを狙って力強くシュート！高得点を狙って豪華景品をゲット！",
    icon: "⚽",
  },
  {
    id: 16,
    title: "格付けチェック",
    category: "クラス企画",
    grade: "4B",
    dept: "4年 生物・化学コース (4B)",
    location: "7号館 マルチメディア教室",
    zoneId: "bldg7",
    description: "4Bあなたの一流度が試される！高級品と激安品を見破れるか！？",
    icon: "🍷",
  },

  // --- 昇降口前広場 (entrance) ---
  {
    id: 101,
    title: "ラーメン もっけだの",
    category: "キッチンカー",
    grade: "外部",
    dept: "キッチンカー",
    location: "学生昇降口前広場",
    zoneId: "entrance",
    description: "スープと麺にこだわり抜いた自慢の本格ラーメン！高専祭で味わう極上の一杯！",
    icon: "🍜",
    instagram: "https://www.instagram.com/mokkedanonoodle/",
    menu: ["ラーメン"],
  },
  {
    id: 102,
    title: "祇園はんなりCafé",
    category: "キッチンカー",
    grade: "外部",
    dept: "キッチンカー",
    location: "学生昇降口前広場",
    zoneId: "entrance",
    description: "とろける口溶けの本格本わらび餅や、出来立てふわふわのベビーカステラ！",
    icon: "🍡",
    instagram: "https://www.instagram.com/gion_hannari_cafe/",
    menu: ["本わらび餅", "ベビーカステラ等"],
  },
  {
    id: 103,
    title: "フェリチタプラス",
    category: "キッチンカー",
    grade: "外部",
    dept: "キッチンカー",
    location: "学生昇降口前広場",
    zoneId: "entrance",
    description: "フルーツたっぷりのフレッシュスムージー＆スパイシーで食欲をそそる本格ガパオライス！",
    icon: "🥤",
    instagram: "https://www.instagram.com/felicitaplus.sakata/",
    menu: ["スムージー", "ガパオライス等"],
  },

  // --- 校内施設・サービス ---
  {
    id: 201,
    title: "総合メディアセンター",
    category: "校内施設・サービス",
    grade: "施設",
    dept: "図書館・情報基盤",
    location: "第一体育館 西側",
    zoneId: "media_center",
    description: "図書室や情報処理施設が設置された総合メディアセンターです。休憩場所としてもご利用いただけます。",
    icon: "📚",
  },
  {
    id: 202,
    title: "ヤマザキショップ 鶴岡高専店",
    category: "校内施設・サービス",
    grade: "店舗",
    dept: "学内購買",
    location: "総合メディアセンター 西側隣接",
    zoneId: "yamazaki",
    description: "パン、お菓子、飲料、文房具などを販売している校内売店です。",
    icon: "🏪",
  },
  {
    id: 203,
    title: "金券販売所",
    category: "校内施設・サービス",
    grade: "本部",
    dept: "実行委員会",
    location: "1号館 東端（7号館前通路）",
    zoneId: "ticket_sales",
    description: "模擬店等で使用できる金券の販売を行っています。お買い求めはこちらでお済ませください。",
    icon: "🎟️",
  },
];

// ステージ企画データ
const EVENTS_DATA = [
  {
    stageId: "main",
    stageName: "メインステージ",
    location: "第一体育館",
    locationZoneId: "gym1",
    schedule: [
      {
        id: "m1",
        time: "09:30 - 10:30",
        startTime: "09:30",
        endTime: "10:30",
        title: "オープニング ＆ 腕立て選手権",
        org: "実行委員会",
        desc: "高専生の筋肉の頂点を決める熱いバトル！誰が一番腕立て伏せができるかを競い合うオープニングイベント！",
        tag: "競技・体験",
        icon: "💪",
      },
      {
        id: "m2",
        time: "11:30 - 12:30",
        startTime: "11:30",
        endTime: "12:30",
        title: "爆笑！高専生有志 漫才ステージ",
        org: "有志団体",
        desc: "学内の爆笑王たちが集結！高専あるあるから本格コントまで、会場を笑顔の渦に巻き込みます！",
        tag: "お笑い",
        icon: "🎙️",
      },
      {
        id: "m3",
        time: "13:30 - 14:30",
        startTime: "13:30",
        endTime: "14:30",
        title: "ダンスパフォーマンス LIVE",
        org: "ダンス同好会 ＆ 有志",
        desc: "キレキレのロックダンスからヒップホップまで！エネルギー溢れる最高のステージパフォーマンス！",
        tag: "ダンス",
        icon: "💃",
      },
      {
        id: "m4",
        time: "14:30 - 15:30",
        startTime: "14:30",
        endTime: "15:30",
        title: "グランドエンディング ＆ フィナーレ",
        org: "全校生徒・実行委員会",
        desc: "高専祭2026のフィナーレ！全校生徒と来場者の皆様で盛り上がる感動のクライマックス！",
        tag: "セレモニー",
        icon: "🎆",
      },
    ],
  },
];

// 校内マップのピン座標
const CAMPUS_ZONES = [
  {
    id: "bldg1",
    name: "1号館",
    subName: "一般教室棟 (1F/2F/3F)",
    pinLabel: "1号館",
    color: "bg-blue-500",
    lightBg: "bg-blue-50 border-blue-300 text-blue-900",
    icon: "🏫",
    top: "27%",
    left: "53%",
    desc: "キャンパス中央に位置するメイン校舎。1F〜3Fにクラス企画・模擬店が出展しています。",
  },
  {
    id: "bldg7",
    name: "7号館",
    subName: "アトラクション棟",
    pinLabel: "7号館",
    color: "bg-purple-500",
    lightBg: "bg-purple-50 border-purple-300 text-purple-900",
    icon: "👻",
    top: "20%",
    left: "86%",
    desc: "3Mお化け屋敷、4Eキッキングスナイパー、4B格付けチェックを開催！",
  },
  {
    id: "ticket_sales",
    name: "金券販売",
    subName: "金券購入エリア",
    pinLabel: "金券販売",
    color: "bg-emerald-500",
    lightBg: "bg-emerald-50 border-emerald-300 text-emerald-900",
    icon: "🎟️",
    top: "27%",
    left: "73%",
    desc: "模擬店や各種販売で使用する金券をお買い求めいただけます。",
  },
  {
    id: "entrance",
    name: "学生昇降口前広場",
    subName: "キッチンカーエリア",
    pinLabel: "学生昇降口前",
    color: "bg-amber-500",
    lightBg: "bg-amber-50 border-amber-300 text-amber-900",
    icon: "🚚",
    top: "45%",
    left: "78%",
    desc: "話題のキッチンカー3店（ラーメン、スイーツ、ガパオライス）が集結！",
  },
  {
    id: "gym1",
    name: "第一体育館",
    subName: "メインステージ ＆ 模擬店",
    pinLabel: "第一体育館",
    color: "bg-rose-500",
    lightBg: "bg-rose-50 border-rose-300 text-rose-900",
    icon: "🏟️",
    top: "72%",
    left: "52%",
    desc: "メインステージイベントと2年生模擬店（餃子・ポップコーン・玉こん・焼き鳥）の会場です。",
  },
  {
    id: "media_center",
    name: "総合メディアセンター",
    subName: "図書室・情報施設",
    pinLabel: "総合メディアセンター",
    color: "bg-indigo-500",
    lightBg: "bg-indigo-50 border-indigo-300 text-indigo-900",
    icon: "📚",
    top: "72%",
    left: "28%",
    desc: "第一体育館西側に位置する図書・情報メディアの総合施設です。",
  },
  {
    id: "yamazaki",
    name: "ヤマザキショップ 鶴岡高専店",
    subName: "学内売店",
    pinLabel: "ヤマザキショップ",
    color: "bg-orange-500",
    lightBg: "bg-orange-50 border-orange-300 text-orange-900",
    icon: "🏪",
    top: "78%",
    left: "11%",
    desc: "総合メディアセンター西側に隣接する学内売店です。",
  },
  {
    id: "parking",
    name: "駐車場",
    subName: "校内駐車場",
    pinLabel: "駐車場",
    color: "bg-sky-500",
    lightBg: "bg-sky-50 border-sky-300 text-sky-900",
    icon: "🅿️",
    top: "78%",
    left: "93%",
    desc: "校内関係者・許可車用駐車場です。台数に限りがあります。",
  },
];

// 工学モチーフ浮遊アニメーションデータ
const TECH_FLOATING_ITEMS = [
  { icon: "⚙️", top: "8%", left: "10%", size: "text-3xl", delay: "0s", duration: "10s" },
  { icon: "🤖", top: "16%", right: "8%", size: "text-4xl", delay: "0.8s", duration: "9.5s" },
  { icon: "🔩", top: "25%", left: "6%", size: "text-2xl", delay: "1.5s", duration: "11s" },
  { icon: "⚡", top: "35%", right: "12%", size: "text-3xl", delay: "0.5s", duration: "8.5s" },
  { icon: "🔧", top: "45%", left: "12%", size: "text-3xl", delay: "1.8s", duration: "10s" },
  { icon: "💻", top: "52%", right: "6%", size: "text-3xl", delay: "1.2s", duration: "11s" },
  { icon: "🔌", top: "66%", left: "8%", size: "text-2xl", delay: "2s", duration: "9s" },
  { icon: "⚙️", top: "75%", right: "10%", size: "text-5xl", delay: "0.4s", duration: "12s" },
  { icon: "🤖", top: "84%", left: "18%", size: "text-3xl", delay: "1.6s", duration: "10.5s" },
];

export default function Page() {
  const [isEntered, setIsEntered] = useState(false);
  const [activeTab, setActiveTab] = useState<"map" | "stalls" | "events" | "access">("map");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("すべて");
  const [selectedZoneId, setSelectedZoneId] = useState<string | null>(null);
  const [modalItem, setModalItem] = useState<StallItem | null>(null);

  // 1号館フロア詳細モーダル用ステート
  const [isBldg1ModalOpen, setIsBldg1ModalOpen] = useState(false);
  const [currentFloor, setCurrentFloor] = useState<"1F" | "2F" | "3F">("1F");

  // 現在時刻ステート（リアルタイム更新）
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // リアルタイムイベント特定ロジック（時間内のみピックアップ）
  const liveEvent = useMemo(() => {
    if (!currentTime) return null;

    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    const currentTotalMinutes = currentHours * 60 + currentMinutes;

    for (const stage of EVENTS_DATA) {
      for (const event of stage.schedule) {
        const [startHour, startMin] = event.startTime.split(":").map(Number);
        const [endHour, endMin] = event.endTime.split(":").map(Number);

        const startTotalMinutes = startHour * 60 + startMin;
        const endTotalMinutes = endHour * 60 + endMin;

        if (currentTotalMinutes >= startTotalMinutes && currentTotalMinutes <= endTotalMinutes) {
          return {
            ...event,
            stageName: stage.stageName,
            locationZoneId: stage.locationZoneId,
          };
        }
      }
    }
    return null;
  }, [currentTime]);

  // 検索・カテゴリフィルタリング
  const filteredStalls = useMemo(() => {
    return STALLS_DATA.filter((stall) => {
      const matchesSearch =
        stall.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stall.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stall.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stall.grade.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "すべて" || stall.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // 地図上で選択されたゾーンのデータ
  const zoneStalls = useMemo(() => {
    if (!selectedZoneId) return [];
    return STALLS_DATA.filter((s) => s.zoneId === selectedZoneId);
  }, [selectedZoneId]);

  // 1号館フロア別データ
  const floorStalls = useMemo(() => {
    return STALLS_DATA.filter((s) => s.zoneId === "bldg1" && s.floor === currentFloor);
  }, [currentFloor]);

  // 現在選択中のゾーン情報
  const currentZone = CAMPUS_ZONES.find((z) => z.id === selectedZoneId);

  // タイトルアニメーション文字
  const titlePart1 = ["熱", "狂", "の"];
  const titlePart2 = ["カ", "ー", "ニ", "バ", "ル"];
  const titlePart3 = ["高", "専", "祭"];

  // 1. 入場前トップ画面
  if (!isEntered) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col items-center justify-between py-12 px-6 relative overflow-hidden select-none font-sans">
        <style>{`
          @keyframes floatTech {
            0% { transform: translateY(0px) rotate(0deg) scale(1); }
            50% { transform: translateY(-18px) rotate(180deg) scale(1.1); }
            100% { transform: translateY(0px) rotate(360deg) scale(1); }
          }
          @keyframes dropChar {
            0% { transform: translateY(-80px) scale(0.2); opacity: 0; }
            65% { transform: translateY(12px) scale(1.1); opacity: 1; }
            85% { transform: translateY(-3px) scale(0.98); }
            100% { transform: translateY(0) scale(1); opacity: 1; }
          }
          .animate-float-tech {
            animation: floatTech linear infinite;
          }
          .animate-drop-char {
            display: inline-block;
            animation: dropChar 1.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
          }
        `}</style>

        {/* 背景アニメーション */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {TECH_FLOATING_ITEMS.map((item, idx) => (
            <div
              key={idx}
              style={{
                top: item.top,
                left: item.left,
                right: item.right,
                animationDuration: item.duration,
                animationDelay: item.delay,
              }}
              className={`absolute ${item.size} opacity-70 animate-float-tech filter drop-shadow-sm`}
            >
              {item.icon}
            </div>
          ))}
        </div>

        <div />

        {/* メインタイトル ＆ 入場ボタン */}
        <div className="w-full max-w-sm flex flex-col items-center text-center z-10 my-auto space-y-6">
          <div className="text-teal-600 font-extrabold text-xs tracking-[0.25em] font-sans">
            TSURUOKA KOSEN FESTIVAL 2026
          </div>

          <div className="flex flex-col items-center justify-center font-black tracking-tight font-sans">
            <div className="flex items-baseline justify-center text-[#E53935] drop-shadow-sm">
              <div className="text-4xl sm:text-5xl flex">
                {titlePart1.map((char, index) => (
                  <span
                    key={index}
                    className="animate-drop-char"
                    style={{ animationDelay: `${index * 0.18}s` }}
                  >
                    {char}
                  </span>
                ))}
              </div>

              <div className="relative inline-block ml-1">
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[11px] sm:text-xs font-black text-rose-500 tracking-widest whitespace-nowrap flex">
                  {titlePart2.map((char, index) => (
                    <span
                      key={index}
                      className="animate-drop-char"
                      style={{ animationDelay: `${0.6 + index * 0.15}s` }}
                    >
                      {char}
                    </span>
                  ))}
                </span>

                <div className="text-5xl sm:text-6xl flex">
                  {titlePart3.map((char, index) => (
                    <span
                      key={index}
                      className="animate-drop-char"
                      style={{ animationDelay: `${1.3 + index * 0.18}s` }}
                    >
                      {char}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/95 border border-slate-200/80 shadow-md rounded-full px-5 py-2.5 flex items-center justify-center gap-2 text-xs font-extrabold text-slate-700">
            <span className="text-rose-600">2026.10.24 SAT</span>
            <span className="text-slate-300">|</span>
            <span>9:30〜15:30</span>
            <span className="text-slate-400 font-normal">@鶴岡高専</span>
          </div>

          {/* 高専HP QR ＆ 高専祭インスタ QR（タップで各直接サイトへ遷移） */}
          <div className="flex items-center justify-center gap-6 pt-2 z-10 w-full">
            {/* 高専HP */}
            <a
              href="https://www.tsuruoka-nct.ac.jp/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 group hover:scale-105 active:scale-95 transition-all cursor-pointer"
              title="鶴岡高専 公式HPを開く"
            >
              <img
                src="/高専QR.png"
                alt="鶴岡高専 公式HP QRコード"
                className="w-22 h-22 object-contain shadow-md rounded-xl border border-slate-200 bg-white p-1 group-hover:border-teal-500 group-hover:shadow-lg transition-all"
              />
              <div className="text-[11px] font-bold text-slate-600 group-hover:text-teal-600 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-teal-600" />
                <span>高専 HP</span>
                <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-teal-600" />
              </div>
            </a>

            {/* 高専祭インスタ (URL修正済み) */}
            <a
              href="https://www.instagram.com/nittc_kosensai2026?stkn=cjgxeW1rbW5hbjBn"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 group hover:scale-105 active:scale-95 transition-all cursor-pointer"
              title="高専祭公式 Instagramを開く"
            >
              <img
                src="/インスタQR.png"
                alt="高専祭公式 Instagram QRコード"
                className="w-22 h-22 object-contain shadow-md rounded-xl border border-slate-200 bg-white p-1 group-hover:border-pink-500 group-hover:shadow-lg transition-all"
              />
              <div className="text-[11px] font-bold text-slate-600 group-hover:text-pink-600 flex items-center gap-1">
                <InstagramIcon className="w-3.5 h-3.5 text-pink-600" />
                <span>公式インスタ</span>
                <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-pink-600" />
              </div>
            </a>
          </div>

          <div className="pt-2 w-full flex flex-col items-center space-y-3">
            <button
              onClick={() => setIsEntered(true)}
              className="w-full max-w-[260px] py-4 rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 text-white text-base font-black tracking-wider shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 border border-white/30"
            >
              <span>入場する</span>
              <span className="text-lg">⚙️</span>
            </button>

            <p className="text-xs text-slate-500 font-semibold tracking-wide">
              鶴岡高専祭をお楽しみください！
            </p>
          </div>
        </div>

        <div />
      </div>
    );
  }

  // 2. 入場後アプリメイン画面
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20 font-sans relative">
      {/* リアルタイムLIVEバナー（時間内のみ表示） */}
      {liveEvent && (
        <div className="sticky top-0 z-50 bg-gradient-to-r from-orange-500 to-red-600 text-white border-b border-white/20 shadow-xl overflow-hidden">
          <style>{`
            @keyframes liveFade {
              0%, 100% { opacity: 0.3; }
              50% { opacity: 1; }
            }
            @keyframes liveWave {
              0% { transform: scaleY(0.4); }
              50% { transform: scaleY(1); }
              100% { transform: scaleY(0.4); }
            }
            .animate-live-fade { animation: liveFade 1.5s ease-in-out infinite; }
            .animate-live-wave { animation: liveWave 0.8s ease-in-out infinite; transform-origin: bottom; }
          `}</style>

          <div className="max-w-2xl mx-auto p-4 flex items-center justify-between gap-4 relative">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-black tracking-widest uppercase mb-1 opacity-90">
                <Radio className="w-4 h-4 animate-live-fade" />
                <span>ただいま実施中のステージ企画！</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-2 text-[13px] sm:text-base font-bold">
                <span className="flex items-center gap-1">
                  <span className="text-xl">{liveEvent.icon}</span>
                  <span>
                    {liveEvent.stageName}: {liveEvent.title}
                  </span>
                </span>
                <span className="text-xs sm:text-sm font-black bg-white/20 px-2 py-0.5 rounded flex items-center gap-1.5 shrink-0 w-fit">
                  <span>{liveEvent.time}</span>
                  <div className="flex items-end gap-0.5 h-3">
                    <div className="w-0.5 h-full bg-white animate-live-wave" style={{ animationDelay: "0s" }} />
                    <div className="w-0.5 h-full bg-white animate-live-wave" style={{ animationDelay: "0.2s" }} />
                    <div className="w-0.5 h-full bg-white animate-live-wave" style={{ animationDelay: "0.1s" }} />
                  </div>
                  <span className="text-[10px] font-black tracking-wider text-amber-100">LIVE</span>
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setActiveTab("events");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="bg-white/95 text-red-700 px-3 py-1.5 rounded-full text-xs font-black shadow hover:bg-white hover:scale-105 transition flex items-center gap-1.5 shrink-0"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>詳細・場所</span>
            </button>
          </div>
        </div>
      )}

      {/* ヘッダー・ナビゲーション */}
      <header
        className={`sticky ${
          liveEvent ? "top-[76px] sm:top-[72px]" : "top-0"
        } z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all`}
      >
        <div className="max-w-2xl mx-auto px-4 py-2.5 flex items-center justify-between gap-2">
          <button onClick={() => setIsEntered(false)} className="flex items-center gap-2.5 text-left shrink-0">
            <img src="/高専ロゴ.jpg" alt="高専ロゴ" className="w-9 h-9 object-contain" />
            <span className="font-black text-lg text-slate-800">高専祭</span>
          </button>

          <nav className="flex items-center gap-1 bg-slate-100 p-1 rounded-full border border-slate-200">
            <button
              onClick={() => setActiveTab("map")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                activeTab === "map"
                  ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              title="マップ"
            >
              <Map className="w-4 h-4" />
              {activeTab === "map" && <span>マップ</span>}
            </button>
            <button
              onClick={() => setActiveTab("stalls")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                activeTab === "stalls"
                  ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              title="企画一覧"
            >
              <Store className="w-4 h-4" />
              {activeTab === "stalls" && <span>企画一覧</span>}
            </button>
            <button
              onClick={() => setActiveTab("events")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                activeTab === "events"
                  ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              title="ステージ"
            >
              <Calendar className="w-4 h-4" />
              {activeTab === "events" && <span>ステージ</span>}
            </button>
            <button
              onClick={() => setActiveTab("access")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                activeTab === "access"
                  ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              title="交通・アクセス"
            >
              <Car className="w-4 h-4" />
              {activeTab === "access" && <span>アクセス</span>}
            </button>
          </nav>
        </div>
      </header>

      {/* メインエリア */}
      <main className="max-w-2xl mx-auto px-4 pt-4 pb-12 space-y-4">
        {/* タブ 1: 校内マップ */}
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
                const isLiveStageZone = liveEvent?.locationZoneId === zone.id;

                return (
                  <button
                    key={zone.id}
                    onClick={() =>
                      setSelectedZoneId((prev) => (prev === zone.id ? null : zone.id))
                    }
                    style={{ top: zone.top, left: zone.left }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-10 flex flex-col items-center group ${
                      isSelected ? "scale-125 z-30" : "hover:scale-110"
                    }`}
                  >
                    {isSelected && (
                      <div className="px-2.5 py-1 rounded-full text-[11px] font-black whitespace-nowrap shadow-lg mb-1 border border-slate-700 bg-slate-900 text-white ring-2 ring-rose-400 flex items-center gap-1 animate-in fade-in zoom-in-90 duration-200">
                        <span>{zone.icon}</span>
                        <span>{zone.pinLabel}</span>
                      </div>
                    )}

                    <div className="relative flex items-center justify-center">
                      {(isSelected || isLiveStageZone) && (
                        <span
                          className={`absolute w-8 h-8 rounded-full ${
                            isLiveStageZone ? "bg-red-500/50" : "bg-rose-500/40"
                          } animate-ping`}
                        />
                      )}
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shadow-lg text-white border-2 border-white transition ${
                          isSelected
                            ? "bg-rose-600 ring-4 ring-rose-300"
                            : isLiveStageZone
                            ? "bg-red-700"
                            : `${zone.color}`
                        }`}
                      >
                        <MapPin className="w-4 h-4" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* 選択されたスポットの詳細パネル */}
            {currentZone ? (
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
                    対象リスト ({zoneStalls.length}件)
                  </span>
                </div>

                <p className="text-xs leading-relaxed font-medium opacity-90">{currentZone.desc}</p>

                {/* 1号館の場合はフロアモーダルボタンを表示 */}
                {selectedZoneId === "bldg1" && (
                  <button
                    onClick={() => setIsBldg1ModalOpen(true)}
                    className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-black text-xs shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
                  >
                    <Layers className="w-4 h-4" />
                    <span>1号館のフロアマップ（1F/2F/3F）を見る</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}

                {/* ゾーン内の企画リスト */}
                <div className="space-y-2 pt-1">
                  {zoneStalls.map((stall) => (
                    <div
                      key={stall.id}
                      onClick={() => setModalItem(stall)}
                      className="bg-white/90 hover:bg-white p-3 rounded-2xl border border-black/5 shadow-sm flex items-center justify-between cursor-pointer transition active:scale-[0.98]"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-2xl">{stall.icon}</span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                              {stall.grade}
                            </span>
                            <h4 className="font-bold text-slate-800 text-sm truncate">{stall.title}</h4>
                          </div>
                          <p className="text-[11px] text-slate-500 truncate">{stall.location}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-3xl border border-slate-200 text-center space-y-2 text-slate-500 shadow-sm">
                <MapPin className="w-8 h-8 text-rose-500 mx-auto animate-bounce" />
                <p className="text-xs font-bold text-slate-700">マップ上のピンをタップしてください</p>
                <p className="text-[11px]">各エリアの企画や施設情報を確認できます</p>
              </div>
            )}
          </div>
        )}

        {/* タブ 2: 企画・模擬店一覧 */}
        {activeTab === "stalls" && (
          <div className="space-y-4">
            {/* 検索 ＆ フィルター */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="企画名、クラス、メニューから検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 shadow-sm transition"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* カテゴリタグ */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {["すべて", "模擬店", "クラス企画", "キッチンカー", "校内施設・サービス"].map(
                  (cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3.5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition ${
                        selectedCategory === cat
                          ? "bg-slate-900 text-white shadow"
                          : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {cat}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* 一覧グリッド */}
            <div className="grid gap-3">
              {filteredStalls.length > 0 ? (
                filteredStalls.map((stall) => (
                  <div
                    key={stall.id}
                    onClick={() => setModalItem(stall)}
                    className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition cursor-pointer flex items-center justify-between gap-3 group active:scale-[0.99]"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition">
                        {stall.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-black px-2 py-0.5 bg-rose-50 text-rose-600 rounded-full">
                            {stall.grade}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400">
                            {stall.category}
                          </span>
                        </div>
                        <h3 className="font-bold text-slate-900 text-sm truncate">{stall.title}</h3>
                        <p className="text-[11px] text-slate-500 truncate flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 shrink-0" />
                          <span className="truncate">{stall.location}</span>
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-rose-500 transition shrink-0" />
                  </div>
                ))
              ) : (
                <div className="bg-white p-8 rounded-3xl text-center text-slate-400 font-bold text-xs space-y-2">
                  <Info className="w-6 h-6 mx-auto text-slate-300" />
                  <p>該当する企画が見つかりませんでした。</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* タブ 3: ステージスケジュール */}
        {activeTab === "events" && (
          <div className="space-y-4">
            {EVENTS_DATA.map((stage) => (
              <div key={stage.stageId} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] font-black tracking-widest text-rose-500 uppercase">STAGE</span>
                    <h3 className="text-xl font-black text-slate-900">{stage.stageName}</h3>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-extrabold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span>{stage.location}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {stage.schedule.map((event) => (
                    <div
                      key={event.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 hover:border-slate-300 transition"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-black text-rose-600 bg-rose-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{event.time}</span>
                        </span>
                        <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                          {event.tag}
                        </span>
                      </div>

                      <div className="flex items-start gap-2.5 pt-1">
                        <span className="text-2xl shrink-0">{event.icon}</span>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{event.title}</h4>
                          <p className="text-[11px] font-semibold text-slate-500">{event.org}</p>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">{event.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* タブ 4: アクセス情報 */}
        {activeTab === "access" && (
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <Navigation className="w-6 h-6 text-rose-500" />
                <div>
                  <h3 className="font-black text-lg text-slate-900">会場・アクセス指南</h3>
                  <p className="text-xs text-slate-500">鶴岡工業高等専門学校</p>
                </div>
              </div>

              <div className="space-y-3 text-xs leading-relaxed text-slate-700 font-medium">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-rose-500" />
                    <span>所在地</span>
                  </div>
                  <p>〒997-8511 山形県鶴岡市井岡字沢田104</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Car className="w-4 h-4 text-blue-500" />
                    <span>お車でお越しの方</span>
                  </div>
                  <p>山形自動車道「鶴岡IC」より車で約10分。</p>
                  <p className="text-[11px] text-amber-700 font-bold mt-1">
                    ※ 校内駐車場（グラウンド側）をご利用いただけますが、台数に限りがございます。
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/60 text-amber-900 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-amber-900">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>ご来場時の注意事項</span>
                  </div>
                  <p className="text-[11px]">
                    ・校内は全面禁煙です。<br />
                    ・ゴミは各自でお持ち帰りいただくか、指定のゴミ箱をご利用ください。<br />
                    ・模擬店のご利用には「金券」が必要となります（一部除く）。
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 1号館フロアマップ モーダル */}
      {isBldg1ModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            {/* モーダルヘッダー */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-400" />
                <div>
                  <h3 className="font-black text-base">1号館 フロアマップ</h3>
                  <p className="text-[11px] text-slate-400">クラス企画 ＆ 模擬店エリア</p>
                </div>
              </div>
              <button
                onClick={() => setIsBldg1ModalOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-slate-300 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* フロア切り替えタブ */}
            <div className="flex border-b border-slate-200 bg-slate-100 p-1.5 gap-1.5">
              {(["1F", "2F", "3F"] as const).map((floor) => (
                <button
                  key={floor}
                  onClick={() => setCurrentFloor(floor)}
                  className={`flex-1 py-2.5 text-xs font-black rounded-xl transition ${
                    currentFloor === floor
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-white text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {floor}
                </button>
              ))}
            </div>

            {/* フロアコンテンツ */}
            <div className="p-4 overflow-y-auto space-y-3 flex-1">
              <div className="text-xs font-extrabold text-slate-500 flex items-center justify-between mb-2">
                <span>{currentFloor} 設置企画・模擬店</span>
                <span>全 {floorStalls.length} 件</span>
              </div>

              {floorStalls.map((stall) => (
                <div
                  key={stall.id}
                  onClick={() => {
                    setIsBldg1ModalOpen(false);
                    setModalItem(stall);
                  }}
                  className="p-3.5 rounded-2xl border border-slate-200 bg-white hover:border-blue-400 shadow-sm transition cursor-pointer flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-2xl p-2 bg-slate-100 rounded-xl shrink-0">{stall.icon}</span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-black px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full">
                          {stall.grade}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400">{stall.roomNo}</span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm truncate">{stall.title}</h4>
                      <p className="text-[11px] text-slate-500 truncate">{stall.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 企画・出店詳細モーダル */}
      {modalItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            {/* モーダルヘッダー */}
            <div className="p-5 border-b border-slate-100 flex items-start justify-between bg-slate-50">
              <div className="flex items-center gap-3.5">
                <span className="text-4xl p-3 bg-white rounded-2xl shadow-sm border border-slate-100">
                  {modalItem.icon}
                </span>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-black px-2.5 py-0.5 bg-rose-50 text-rose-600 rounded-full">
                      {modalItem.grade}
                    </span>
                    <span className="text-xs font-bold text-slate-400">{modalItem.category}</span>
                  </div>
                  <h3 className="font-black text-xl text-slate-900">{modalItem.title}</h3>
                </div>
              </div>
              <button
                onClick={() => setModalItem(null)}
                className="p-2 rounded-full hover:bg-slate-200 text-slate-400 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* モーダル本文 */}
            <div className="p-5 overflow-y-auto space-y-4">
              <div className="p-3 bg-slate-100 rounded-2xl flex items-center gap-2 text-xs font-bold text-slate-700">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                <span>場所: {modalItem.location}</span>
              </div>

              <div className="space-y-1">
                <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">概要・紹介</h4>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {modalItem.description}
                </p>
              </div>

              {/* メニューがある場合 */}
              {modalItem.menu && modalItem.menu.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">販売メニュー</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {modalItem.menu.map((m, idx) => (
                      <span key={idx} className="px-3 py-1 bg-rose-50 text-rose-700 rounded-full text-xs font-bold">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Instagram リンクがある場合 */}
              {modalItem.instagram && (
                <div className="pt-2">
                  <a
                    href={modalItem.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xs shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
                  >
                    <InstagramIcon className="w-4 h-4 text-white" />
                    <span>公式 Instagram を見る</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>

            {/* 閉じるボタン */}
            <div className="p-4 border-t border-slate-100 bg-slate-50">
              <button
                onClick={() => setModalItem(null)}
                className="w-full py-3 bg-slate-900 text-white rounded-2xl text-xs font-bold shadow hover:bg-slate-800 transition"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}