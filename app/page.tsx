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
  Layers,
  Radio,
  Car,
  Clock,
  Navigation,
  Info,
} from "lucide-react";

// InstagramアイコンをインラインSVGで定義
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

// 出店・企画・キッチンカーのデータ型定義
interface StallItem {
  id: number;
  title: string;
  category: "模擬店" | "クラス企画" | "キッチンカー";
  grade: string;
  dept: string;
  location: string;
  zoneId: string;
  floor?: "1F" | "2F" | "3F";
  roomNo?: string;
  pinPos?: { top: string; left: string };
  description: string;
  icon: string;
  instagram?: string;
  menu?: string[];
}

// 出店・企画データ
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
    pinPos: { top: "25.5%", left: "61.5%" },
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
    floor: "1F",
    roomNo: "112教室",
    pinPos: { top: "25.5%", left: "41.5%" },
    description: "1-2がお届けする冷たくてシュワっと美味しい各種ソフトドリンク！",
    icon: "🍹",
    menu: ["ソフトドリンク各種"]
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
    pinPos: { top: "25.5%", left: "21.5%" },
    description: "4Mのイケメンたちが華麗にお出迎え！？非日常の最高のおもてなし空間！",
    icon: "🌹"
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
    pinPos: { top: "25.5%", left: "61.5%" },
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
    location: "1号館 2F 122教室",
    zoneId: "bldg1",
    floor: "2F",
    roomNo: "122教室",
    pinPos: { top: "25.5%", left: "44.0%" },
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
    location: "1号館 2F 123教室",
    zoneId: "bldg1",
    floor: "2F",
    roomNo: "123教室",
    pinPos: { top: "25.5%", left: "21.5%" },
    description: "3Eみんなでワイワイ楽しめる対戦ゲーム＆レトロゲームが揃ったゲームカフェ！",
    icon: "🎮"
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
    pinPos: { top: "25.5%", left: "46.0%" },
    description: "4I特製カジノ！本格的なテーブルゲームでスリリングな心理戦を楽しもう！",
    icon: "🎲"
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
    pinPos: { top: "25.5%", left: "32.0%" },
    description: "3Iがお届けするおしゃれで落ち着いた雰囲気のノンアルコールバー！",
    icon: "🍸"
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
    pinPos: { top: "25.5%", left: "18.0%" },
    description: "3Bによるゆったり寛げる特製喫茶店！こだわりのドリンクでおもてなし。",
    icon: "☕"
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
    description: "4E動くターゲットを狙って力強くシュート！高得点を狙って豪華景品をゲットしよう！",
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

// ステージ企画データ
const EVENTS_DATA = [
  {
    stageId: "main",
    stageName: "メインステージ",
    location: "第一体育館",
    locationZoneId: "gym1",
    badgeColor: "bg-rose-500 text-white",
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
        icon: "💪"
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
        icon: "🎙️"
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
        icon: "💃"
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
        icon: "🎆"
      }
    ]
  }
];

// キャンパスマップのゾーン（建物）データ
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
    subName: "一般教室棟 (1F/2F/3F)",
    pinLabel: "1号館",
    color: "bg-blue-500",
    lightBg: "bg-blue-50 border-blue-300 text-blue-900",
    icon: "🏫",
    top: "38%",
    left: "40%",
    desc: "キャンパス中央に位置するメイン校舎。タップして各階（1F/2F/3F）の詳細マップ・配置図を確認できます！"
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

// トップ画面の工学モチーフ浮遊アニメーション用データ
const TECH_FLOATING_ITEMS = [
  { icon: "⚙️", top: "8%", left: "10%", size: "text-3xl", delay: "0s", duration: "7s" },
  { icon: "🤖", top: "16%", right: "8%", size: "text-4xl", delay: "0.5s", duration: "6.5s" },
  { icon: "🔩", top: "25%", left: "6%", size: "text-2xl", delay: "1s", duration: "8s" },
  { icon: "⚡", top: "35%", right: "12%", size: "text-3xl", delay: "0.3s", duration: "5.5s" },
  { icon: "🔧", top: "45%", left: "12%", size: "text-3xl", delay: "1.2s", duration: "6.8s" },
  { icon: "💻", top: "52%", right: "6%", size: "text-3xl", delay: "0.8s", duration: "7.5s" },
  { icon: "🔌", top: "66%", left: "8%", size: "text-2xl", delay: "1.5s", duration: "6.2s" },
  { icon: "⚙️", top: "75%", right: "10%", size: "text-5xl", delay: "0.2s", duration: "9s" },
  { icon: "🤖", top: "84%", left: "18%", size: "text-3xl", delay: "1.1s", duration: "7.2s" },
];

export default function Page() {
  const [isEntered, setIsEntered] = useState(false);
  const [activeTab, setActiveTab] = useState<"map" | "stalls" | "events" | "access">("map");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("すべて");
  const [selectedZoneId, setSelectedZoneId] = useState("gym1");
  const [modalItem, setModalItem] = useState<StallItem | null>(null);

  // 1号館フロア詳細モーダル用ステート
  const [isBldg1ModalOpen, setIsBldg1ModalOpen] = useState(false);
  const [currentFloor, setCurrentFloor] = useState<"1F" | "2F" | "3F">("1F");

  // リアルタイムイベント特定ロジック（シミュレーション時刻を使用）
  const liveEvent = useMemo(() => {
    const simulateDate = new Date(2026, 9, 24, 12, 0, 0); // 月は0から始まるため10月=9
    const currentTime = simulateDate;

    for (const stage of EVENTS_DATA) {
      for (const event of stage.schedule) {
        const [startHour, startMin] = event.startTime.split(":").map(Number);
        const [endHour, endMin] = event.endTime.split(":").map(Number);
        const startDate = new Date(2026, 9, 24, startHour, startMin, 0);
        const endDate = new Date(2026, 9, 24, endHour, endMin, 0);

        if (currentTime >= startDate && currentTime <= endDate) {
          return { ...event, stageName: stage.stageName, locationZoneId: stage.locationZoneId };
        }
      }
    }
    return null;
  }, []);

  // 検索クエリおよびカテゴリ指定に基づいて出店・企画をフィルタリング
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

  // 地図上で選択されたゾーン（建物）の出店・企画
  const zoneStalls = useMemo(() => {
    return STALLS_DATA.filter((s) => s.zoneId === selectedZoneId);
  }, [selectedZoneId]);

  // 1号館詳細モーダルで選択された階の出店・企画
  const floorStalls = useMemo(() => {
    return STALLS_DATA.filter((s) => s.zoneId === "bldg1" && s.floor === currentFloor);
  }, [currentFloor]);

  // 現在選択されているゾーン（建物）のデータ
  const currentZone = CAMPUS_ZONES.find((z) => z.id === selectedZoneId) || CAMPUS_ZONES[0];

  // トップ画面タイトルの文字ドロップ演出用データ
  const titlePart1 = ["熱", "狂", "の"];
  const titlePart2 = ["カ", "ー", "ニ", "バ", "ル"];
  const titlePart3 = ["高", "専", "祭"];

  // トップページ（入場ボタンがあるページ）
  if (!isEntered) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col items-center justify-between py-12 px-6 relative overflow-hidden select-none font-sans">
        {/* アニメーション用スタイル定義 */}
        <style>{`
          @keyframes floatTech {
            0% { transform: translateY(0px) rotate(0deg) scale(1); }
            50% { transform: translateY(-18px) rotate(180deg) scale(1.1); }
            100% { transform: translateY(0px) rotate(360deg) scale(1); }
          }
          @keyframes dropChar {
            0% { transform: translateY(-70px) scale(0.3); opacity: 0; }
            60% { transform: translateY(14px) scale(1.15); opacity: 1; }
            80% { transform: translateY(-4px) scale(0.95); }
            100% { transform: translateY(0) scale(1); opacity: 1; }
          }
          .animate-float-tech {
            animation: floatTech linear infinite;
          }
          .animate-drop-char {
            display: inline-block;
            animation: dropChar 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
        `}</style>

        {/* 背景：工学モチーフ浮遊要素 */}
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

        {/* メインコンテンツブロック */}
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
                    style={{ animationDelay: `${index * 0.1}s` }}
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
                      style={{ animationDelay: `${0.3 + index * 0.08}s` }}
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
                      style={{ animationDelay: `${0.7 + index * 0.1}s` }}
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

          <div className="flex flex-col items-center gap-2 pt-2 z-10">
            <img src="/insta_qr.png" alt="公式Instagram QRコード" className="w-24 h-24 object-contain shadow-md rounded-xl border border-slate-200" />
            <div className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
              <InstagramIcon className="w-4 h-4 text-pink-600" />
              <span>公式 Instagram</span>
            </div>
          </div>

          <div className="pt-4 w-full flex flex-col items-center space-y-3">
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

  // アプリケーションメイン画面（入場後）
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20 font-sans relative">
      {/* リアルタイムピックアップバナー */}
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
                  <span>{liveEvent.stageName}: {liveEvent.title}</span>
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

      {/* Header */}
      <header className={`sticky ${liveEvent ? "top-[76px] sm:top-[72px]" : "top-0"} z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all`}>
        <div className="max-w-2xl mx-auto px-4 py-2.5 flex items-center justify-between gap-2">
          <button onClick={() => setIsEntered(false)} className="flex items-center gap-2.5 text-left shrink-0">
            <img src="/高専ロゴ.jpg" alt="高専ロゴ" className="w-9 h-9 object-contain" />
            <span className="font-black text-lg text-slate-800">高専祭</span>
          </button>

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
            <button
              onClick={() => setActiveTab("access")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                activeTab === "access" ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white" : "text-slate-600 hover:text-slate-900"
              }`}
              title="交通・アクセス"
            >
              <Car className="w-4 h-4" />
              {activeTab === "access" && <span>アクセス</span>}
            </button>
          </nav>
        </div>
      </header>

      {/* メインコンテナ */}
      <main className="max-w-2xl mx-auto px-4 pt-4 pb-12 space-y-4">
        {/* タブ 1: Map */}
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
                          : isLiveStageZone
                            ? "bg-red-600 text-white border-red-700 animate-pulse"
                            : "bg-white/95 text-slate-800 border-slate-200 group-hover:bg-orange-500 group-hover:text-white"
                      }`}
                    >
                      {isLiveStageZone ? (
                        <Radio className="w-3 h-3 animate-live-fade" />
                      ) : (
                        <span>{zone.icon}</span>
                      )}
                      <span>{zone.pinLabel}</span>
                    </div>

                    <div className="relative flex items-center justify-center">
                      {(isSelected || isLiveStageZone) && (
                        <span className={`absolute w-8 h-8 rounded-full ${isLiveStageZone ? "bg-red-500/50" : "bg-rose-500/40"} animate-ping`} />
                      )}
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shadow-lg text-white border-2 border-white transition ${
                          isSelected ? "bg-rose-600 ring-4 ring-rose-300" : isLiveStageZone ? "bg-red-700" : `${zone.color}`
                        }`}
                      >
                        <MapPin className="w-4 h-4" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* 選択されたゾーン（建物）の詳細表示 */}
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

              {/* 1号館が選択されている場合、フロア詳細モーダルを開くボタンを表示 */}
              {selectedZoneId === "bldg1" && (
                <button
                  onClick={() => setIsBldg1ModalOpen(true)}
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-black text-xs shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
                >
                  <Layers className="w-4 h-4" />
                  <span>1号館のフロア詳細図（1F / 2F / 3F）を開く</span>
                </button>
              )}

              {/* その場所の企画一覧 */}
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

        {/* タブ 2: Stalls (企画・出店一覧) */}
        {activeTab === "stalls" && (
          <div className="space-y-4">
            {/* 検索・フィルターバー */}
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

              {/* カテゴリ切り替えボタン */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {["すべて", "模擬店", "クラス企画", "キッチンカー"].map((cat) => (
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

            {/* 企画一覧表示 */}
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

        {/* タブ 3: Events (ステージ企画) */}
        {activeTab === "events" && (
          <div className="space-y-4">
            {EVENTS_DATA.map((stage) => (
              <div key={stage.stageId} className="space-y-3">
                {/* ステージ見出し */}
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

                {/* タイムテーブルリスト */}
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

        {/* タブ 4: Access (交通・アクセス) */}
        {activeTab === "access" && (
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <span className="text-3xl p-2 bg-sky-50 rounded-2xl text-sky-600">🚌</span>
                <div>
                  <h2 className="font-black text-lg text-slate-900">鶴岡高専へのアクセス</h2>
                  <p className="text-xs text-slate-500 font-medium">山形県鶴岡市井岡字沢田104</p>
                </div>
              </div>

              {/* 交通手段カードリスト */}
              <div className="space-y-3">
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-black text-slate-800">
                    <Navigation className="w-4 h-4 text-sky-600" />
                    <span>JR鶴岡駅から路線バス</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    JR鶴岡駅より庄内交通バス「湯野浜温泉行き（加茂経由）」乗車、約20分。「高専前」下車すぐ。
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-black text-slate-800">
                    <Car className="w-4 h-4 text-emerald-600" />
                    <span>お車でお越しの場合・駐車場</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    山形自動車道「鶴岡IC」より約10分。構内の指定来場者用駐車場をご利用ください。
                  </p>
                </div>

                <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-black text-amber-900">
                    <Info className="w-4 h-4 text-amber-600" />
                    <span>ご来場にあたっての注意事項</span>
                  </div>
                  <ul className="text-xs text-amber-800 space-y-1 list-disc list-inside font-medium">
                    <li>校内は全面禁煙です。</li>
                    <li>酒類の持ち込み・飲酒は厳禁となっております。</li>
                    <li>駐車場には限りがございますので、可能な限り公共交通機関をご利用ください。</li>
                  </ul>
                </div>
              </div>

              {/* 外部マップで開くボタン */}
              <a
                href="https://maps.google.com/?q=鶴岡高等専門学校"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-black text-xs shadow transition flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Google マップで地図を開く</span>
              </a>
            </div>
          </div>
        )}
      </main>

      {/* --- モーダル1: 出店・企画詳細モーダル --- */}
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
                  <span className="text-xs font-extrabold text-slate-800">🍽️ 提供メニュー・取扱品</span>
                  <div className="flex flex-wrap gap-1.5">
                    {modalItem.menu.map((m, i) => (
                      <span key={i} className="text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200/80 px-2.5 py-1 rounded-xl">
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

      {/* --- モーダル2: 1号館フロア詳細モーダル --- */}
      {isBldg1ModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            {/* モーダルヘッダー */}
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

            {/* フロア切り替えタブ */}
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

            {/* モーダルコンテンツ (スクロール可) */}
            <div className="p-4 space-y-4 overflow-y-auto">
              {/* フロア簡易レイアウト図（グラフィカル表現） */}
              <div className="relative w-full bg-slate-100 border-2 border-slate-300 rounded-2xl p-4 min-h-[160px] flex flex-col justify-center">
                <div className="text-center mb-2 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                  1号館 {currentFloor} 配置イメージ
                </div>

                {/* 廊下と教室配置 */}
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

              {/* 当該フロアの企画リスト */}
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