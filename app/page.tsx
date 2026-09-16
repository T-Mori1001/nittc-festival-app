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
            /* アニメーション時間を1.5sに伸ばし、よりゆったり表示 */
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
              {/* アニメーションの遅延間隔を広げてゆったりドロップ */}
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

          {/* 高専HP QR ＆ 高専祭インスタ QR を並列表示 */}
          <div className="flex items-center justify-center gap-6 pt-2 z-10 w-full">
            {/* 高専HP */}
            <div className="flex flex-col items-center gap-1.5">
              <img
                src="/高専QR.png"
                alt="鶴岡高専 公式HP QRコード"
                className="w-22 h-22 object-contain shadow-md rounded-xl border border-slate-200 bg-white p-1"
              />
              <div className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-teal-600" />
                <span>高専 HP</span>
              </div>
            </div>

            {/* 高専祭インスタ */}
            <div className="flex flex-col items-center gap-1.5">
              <img
                src="/インスタQR.png"
                alt="高専祭公式 Instagram QRコード"
                className="w-22 h-22 object-contain shadow-md rounded-xl border border-slate-200 bg-white p-1"
              />
              <div className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
                <InstagramIcon className="w-3.5 h-3.5 text-pink-600" />
                <span>公式インスタ</span>
              </div>
            </div>
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
                    {/* デフォルトは非表示、ピンをタップ（選択）時のみ場所名を表示 */}
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
                    <span>1号館のフロア詳細マップ（1F / 2F / 3F）を開く</span>
                  </button>
                )}

                {/* そのエリアの企画・施設一覧 */}
                <div className="space-y-2">
                  <h4 className="text-xs font-extrabold text-slate-800 flex items-center gap-1">
                    <span>📍 {currentZone.name} の出展・施設一覧</span>
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
                      このエリアに関する個別のアトラクションリストは以上です。
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white p-5 rounded-3xl border border-slate-200 text-center text-slate-500 font-bold text-xs space-y-1 shadow-sm">
                <p className="text-xl">📍</p>
                <p>マップ上のピンをタップすると場所の詳細が表示されます</p>
              </div>
            )}
          </div>
        )}

        {/* タブ 2: 企画一覧 */}
        {activeTab === "stalls" && (
          <div className="space-y-4">
            {/* 検索・フィルター */}
            <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="企画名・出し物・クラス・場所で検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {["すべて", "模擬店", "クラス企画", "キッチンカー", "校内施設・サービス"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-black shrink-0 transition ${
                      selectedCategory === cat
                        ? "bg-orange-500 text-white shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* 一覧リスト */}
            <div className="space-y-2">
              <p className="text-xs font-extrabold text-slate-500 px-1">
                該当件数: {filteredStalls.length}件
              </p>

              {filteredStalls.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {filteredStalls.map((stall) => (
                    <div
                      key={stall.id}
                      onClick={() => setModalItem(stall)}
                      className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md cursor-pointer transition flex flex-col justify-between space-y-3 group"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl p-2.5 bg-orange-50 rounded-2xl group-hover:scale-110 transition shrink-0">
                            {stall.icon}
                          </span>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-black px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full">
                                {stall.grade}
                              </span>
                              <span className="text-[10px] font-extrabold text-slate-400">
                                {stall.category}
                              </span>
                            </div>
                            <h3 className="font-black text-base text-slate-900 mt-1 line-clamp-1">
                              {stall.title}
                            </h3>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {stall.description}
                      </p>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500">
                        <span className="flex items-center gap-1 truncate max-w-[80%]">
                          <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                          <span className="truncate">{stall.location}</span>
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-orange-500 group-hover:translate-x-0.5 transition" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white p-8 rounded-3xl text-center border border-slate-200 text-slate-400 font-bold space-y-2">
                  <p className="text-2xl">🔍</p>
                  <p className="text-xs">条件に該当する出店・企画が見つかりませんでした</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* タブ 3: ステージ企画 */}
        {activeTab === "events" && (
          <div className="space-y-4">
            {EVENTS_DATA.map((stage) => (
              <div key={stage.stageId} className="space-y-3">
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-4 rounded-3xl shadow-md flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎭</span>
                    <div>
                      <h2 className="font-black text-base">{stage.stageName}</h2>
                      <p className="text-xs opacity-80 font-medium">場所: {stage.location}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedZoneId(stage.locationZoneId);
                      setActiveTab("map");
                    }}
                    className="text-xs bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-full font-bold transition flex items-center gap-1"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>マップ表示</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {stage.schedule.map((event) => {
                    const isLive = liveEvent?.id === event.id;

                    return (
                      <div
                        key={event.id}
                        className={`p-4 rounded-3xl border transition relative overflow-hidden ${
                          isLive
                            ? "bg-gradient-to-r from-orange-500/10 to-rose-500/10 border-orange-500 ring-2 ring-orange-400/50 shadow-md"
                            : "bg-white border-slate-200 shadow-sm"
                        }`}
                      >
                        {isLive && (
                          <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-500 to-rose-500 text-white text-[10px] font-black px-3 py-1 rounded-bl-2xl uppercase tracking-wider flex items-center gap-1">
                            <Radio className="w-3 h-3 animate-pulse" />
                            <span>LIVE 実施中</span>
                          </div>
                        )}

                        <div className="flex items-start gap-3">
                          <span className="text-3xl p-2 bg-slate-100 rounded-2xl shrink-0 mt-1">
                            {event.icon}
                          </span>
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-black text-orange-600 flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                {event.time}
                              </span>
                              <span className="text-[10px] font-extrabold px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                                {event.tag}
                              </span>
                            </div>

                            <h3 className="font-black text-base text-slate-900">{event.title}</h3>
                            <p className="text-xs text-slate-500 font-bold">主催: {event.org}</p>
                            <p className="text-xs text-slate-600 leading-relaxed pt-1">{event.desc}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* タブ 4: 交通・アクセス */}
        {activeTab === "access" && (
          <div className="space-y-4">
            {/* 駐車場についての注意書きアラート */}
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-3xl shadow-sm flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h3 className="text-xs font-black text-amber-900">
                  【重要】ご来場時のお車のご利用について
                </h3>
                <p className="text-xs text-amber-800 font-medium leading-relaxed">
                  <strong>※臨時駐車場はございません。</strong>
                  校内の指定駐車場は駐車台数に大変限りがございます。ご来校の際は可能な限り公共交通機関（路線バス等）のご利用にご協力をお願いいたします。
                </p>
              </div>
            </div>

            {/* 本校へのアクセス ＆ Googleマップ */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <span className="text-3xl p-2.5 bg-sky-50 rounded-2xl text-sky-600">🏫</span>
                <div>
                  <h2 className="font-black text-lg text-slate-900">鶴岡高専へのアクセス</h2>
                  <p className="text-xs text-slate-500 font-bold">〒997-8511 山形県鶴岡市井岡字沢田104</p>
                </div>
              </div>

              {/* 指定座標（38.70950241993693, 139.79776942224186）を中心としたマップ */}
              <div className="space-y-2">
                <div className="relative w-full h-80 rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100">
                  <iframe
                    title="鶴岡工業高等専門学校 Google Map"
                    src="https://maps.google.com/maps?q=38.70950241993693,139.79776942224186&t=&z=17&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0"
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <p className="text-[11px] text-center font-bold text-slate-400">
                  ※ 指やマウス操作で自由な移動・拡大・縮小が可能です
                </p>
              </div>

              {/* 交通手段の案内 */}
              <div className="space-y-3 pt-2">
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-black text-slate-800">
                    <Navigation className="w-4 h-4 text-sky-600" />
                    <span>JR鶴岡駅から路線バス</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    JR鶴岡駅より庄内交通バス「湯野浜温泉行き（加茂経由）」乗車（約20分）、「高専前」バス停下車すぐ。
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-black text-slate-800">
                    <Car className="w-4 h-4 text-emerald-600" />
                    <span>お車でお越しの場合</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    山形自動車道「鶴岡IC」より約10分。構内駐車場の誘導に従って駐車してください。
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-black text-slate-800">
                    <Info className="w-4 h-4 text-slate-600" />
                    <span>ご来場にあたってのお願い</span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside font-medium">
                    <li>校内は全面禁煙です。</li>
                    <li>酒類の持ち込み・飲酒は厳禁となっております。</li>
                  </ul>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=38.70950241993693,139.79776942224186"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-black text-xs shadow transition flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Google マップアプリで開く</span>
              </a>
            </div>
          </div>
        )}
      </main>

      {/* モーダル1: 出店・施設詳細 */}
      {modalItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-4xl p-3 bg-orange-50 rounded-2xl">{modalItem.icon}</span>
                  <div>
                    <span className="text-[10px] font-black px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full">
                      {modalItem.grade}
                    </span>
                    <h3 className="text-lg font-black text-slate-900 mt-0.5">{modalItem.title}</h3>
                    <p className="text-xs text-slate-500 font-bold">{modalItem.dept}</p>
                  </div>
                </div>
                <button
                  onClick={() => setModalItem(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2 text-xs text-slate-700 font-medium leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                <p>{modalItem.description}</p>
              </div>

              {modalItem.menu && (
                <div className="space-y-1.5">
                  <span className="text-xs font-extrabold text-slate-800">🍽️ 取扱・提供メニュー</span>
                  <div className="flex flex-wrap gap-1.5">
                    {modalItem.menu.map((m, i) => (
                      <span
                        key={i}
                        className="text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200/80 px-2.5 py-1 rounded-xl"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs font-extrabold text-slate-600">
                  <MapPin className="w-4 h-4 text-orange-500" />
                  <span>{modalItem.location}</span>
                </div>

                {modalItem.instagram && (
                  <a
                    href={modalItem.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-bold text-pink-600 hover:underline pt-1"
                  >
                    <InstagramIcon className="w-4 h-4 text-pink-600" />
                    <span>公式 Instagram を見る</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => {
                    setSelectedZoneId(modalItem.zoneId);
                    setActiveTab("map");
                    setModalItem(null);
                  }}
                  className="w-full py-3 bg-slate-900 text-white rounded-2xl text-xs font-black shadow hover:bg-slate-800 transition flex items-center justify-center gap-1.5"
                >
                  <MapPin className="w-4 h-4" />
                  <span>マップで場所を確認</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* モーダル2: 1号館フロア詳細 */}
      {isBldg1ModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-400" />
                <h3 className="font-black text-base">1号館 フロア詳細マップ</h3>
              </div>
              <button
                onClick={() => setIsBldg1ModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-full transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex border-b border-slate-200 bg-slate-100 p-1.5 gap-1.5">
              {(["1F", "2F", "3F"] as const).map((floor) => (
                <button
                  key={floor}
                  onClick={() => setCurrentFloor(floor)}
                  className={`flex-1 py-2 rounded-xl text-xs font-black transition ${
                    currentFloor === floor
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {floor}
                </button>
              ))}
            </div>

            <div className="p-4 space-y-4 overflow-y-auto">
              <div className="relative w-full bg-slate-100 border-2 border-slate-300 rounded-2xl p-4 min-h-[160px] flex flex-col justify-center">
                <div className="text-center mb-2 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                  1号館 {currentFloor} 配置イメージ
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {floorStalls.map((stall) => (
                    <button
                      key={stall.id}
                      onClick={() => {
                        setIsBldg1ModalOpen(false);
                        setModalItem(stall);
                      }}
                      className="p-3 bg-white border border-blue-200 rounded-xl shadow-sm hover:border-blue-500 hover:shadow transition flex flex-col items-center text-center space-y-1"
                    >
                      <span className="text-xl">{stall.icon}</span>
                      <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                        {stall.roomNo}
                      </span>
                      <span className="text-xs font-black text-slate-800 line-clamp-1">
                        {stall.title}
                      </span>
                      <span className="text-[9px] font-bold text-slate-400">{stall.grade}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-extrabold text-slate-700">
                  📍 {currentFloor} の催し物一覧 ({floorStalls.length}件)
                </h4>

                <div className="space-y-2">
                  {floorStalls.map((stall) => (
                    <div
                      key={stall.id}
                      onClick={() => {
                        setIsBldg1ModalOpen(false);
                        setModalItem(stall);
                      }}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-2xl hover:bg-white hover:shadow-sm cursor-pointer transition flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{stall.icon}</span>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[9px] font-black px-1.5 py-0.2 bg-blue-100 text-blue-800 rounded">
                              {stall.roomNo}
                            </span>
                            <span className="text-[10px] font-bold text-slate-500">
                              {stall.grade} ({stall.category})
                            </span>
                          </div>
                          <h5 className="font-black text-xs text-slate-900 mt-0.5">{stall.title}</h5>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}