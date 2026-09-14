"use client";

import React, { useState, useMemo } from "react";
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
  Clock,
  Info,
  X,
  Share2,
  CheckCircle2,
  Compass,
  Layers,
  Eye,
  Navigation,
  Car,
  Bike,
  Building2,
  Shield,
  Coffee,
  HelpCircle,
  Camera
} from "lucide-react";

// Custom SVG Instagram Icon
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
  // --- Kitchen Cars (学生昇降口前) ---
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

  // --- 1年 (クラス模擬店 1-1 〜 1-4) ---
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

  // --- 2年 (学科別模擬店 2M, 2E, 2I, 2B) ---
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

  // --- 3年 (学科別クラス企画 3M, 3E, 3I, 3B) ---
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
  {
    id: 11,
    title: "サイバーナイト BAR",
    category: "クラス企画",
    subcategory: "カフェ・ドリンク",
    grade: "3年",
    dept: "情報 (3I)",
    location: "1号館 2F (132教室)",
    zoneId: "bldg1",
    description: "3Iシックで大人っぽい雰囲気の中で楽しむオリジナルノンアルコールカクテル専門店！",
    icon: "🍸",
    menu: ["サイバーブルーカクテル", "ネオンピンクソーダ", "ミックスナッツ"]
  },
  {
    id: 12,
    title: "レトロ昭和純喫茶",
    category: "クラス企画",
    subcategory: "カフェ・レトロ",
    grade: "3年",
    dept: "物質 (3B)",
    location: "1号館 2F (133教室)",
    zoneId: "bldg1",
    description: "3Bほっと一息つける純喫茶風レトロ空間。本格ドリップコーヒーとクリームソーダをご用意。",
    icon: "☕",
    menu: ["昭和クリームソーダ", "ハンドドリップコーヒー", "自家製プリン"]
  },

  // --- 4年 (学科別クラス企画 4M, 4E, 4I, 4B) ---
  {
    id: 13,
    title: "高専ホストクラブ★",
    category: "クラス企画",
    subcategory: "エンタメ",
    grade: "4年",
    dept: "機械 (4M)",
    location: "1号館 1F (113教室)",
    zoneId: "bldg1",
    description: "4M最高の接客と洗練されたパフォーマンスでおもてなし！高専男子による至高のエンタメ空間！",
    icon: "🤵",
    menu: ["シャンパンタワー風チェキ撮影", "オリジナルドリンク"]
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
    id: 15,
    title: "高専カジノ - Casino Royale -",
    category: "クラス企画",
    subcategory: "頭脳ゲーム",
    grade: "4年",
    dept: "情報 (4I)",
    location: "1号館 2F (131教室)",
    zoneId: "bldg1",
    description: "4I本格ディーラーがお出迎え！ポーカー・ブラックジャックで繰り広げられる大人の心理戦！",
    icon: "🎲",
    menu: ["カジノチップセット"]
  },
  {
    id: 16,
    title: "高専版・芸能人格付けチェック",
    category: "クラス企画",
    subcategory: "バラエティ",
    grade: "4年",
    dept: "物質 (4B)",
    location: "総合メディアセンター 1F",
    zoneId: "media",
    description: "4Bあなたの一流度が試される！高級品と激安品を見破れるか！？全問正解で「一流高専生」の称号を！",
    icon: "🍷",
    menu: ["格付け挑戦チケット"]
  },

  // --- 部活動展示 ---
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
    badgeColor: "bg-blue-600 text-white",
    note: "※会場には座席および立ち見エリアがございます。館内での飲食も可能です。",
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
  },
  {
    stageId: "sub",
    stageName: "サブステージ",
    location: "中庭ステージ (雨天時: 視聴覚教室)",
    badgeColor: "bg-emerald-600 text-white",
    note: "※屋外中庭エリアです。雨天時は別校舎の視聴覚教室に会場を変更いたします。",
    schedule: [
      {
        id: "s1",
        time: "10:30 - 12:00",
        title: "軽音部 アコースティックアワー",
        org: "軽音楽部",
        desc: "爽やかな秋空の下でお届けするアコースティックバンド＆ソロ演奏。心地よい音楽をお楽しみください。",
        tag: "音楽",
        icon: "🎸"
      },
      {
        id: "s2",
        time: "13:00 - 14:00",
        title: "鶴岡高専 eスポーツ大会 決勝戦",
        org: "情報処理部",
        desc: "校内予選を勝ち抜いた猛者たちが激突！大画面スクリーンでリアルタイムライブ解説付きの頂上決戦！",
        tag: "ゲーム",
        icon: "🎮"
      }
    ]
  }
];

const CAMPUS_ZONES = [
  {
    id: "entrance",
    name: "学生昇降口前広場",
    subName: "キッチンカーエリア",
    color: "#d97706",
    lightBg: "bg-amber-50 border-amber-300 text-amber-900",
    icon: "🚚",
    floors: ["屋外広場"],
    desc: "人気のキッチンカー3店が集結！ラーメンもっけだの、祇園はんなりCafé、フェリチタプラス！"
  },
  {
    id: "bldg1",
    name: "1号館",
    subName: "一般教室棟・管理棟",
    color: "#2563eb",
    lightBg: "bg-blue-50 border-blue-300 text-blue-900",
    icon: "🏫",
    floors: ["1F: 1年生模擬店(1-1〜1-4) / 3Eカフェ / 4Mホスト", "2F: 3I BAR / 3B純喫茶 / 4Iカジノ"],
    desc: "キャンパス中央に位置するメイン校舎。1年生の軽食・スイーツ模擬店や上級生の企画が盛りだくさん！"
  },
  {
    id: "gym1",
    name: "第一体育館",
    subName: "メインステージ ＆ 2年模擬店",
    color: "#dc2626",
    lightBg: "bg-rose-50 border-rose-300 text-rose-900",
    icon: "🏟️",
    floors: ["アリーナ: ステージイベント", "周遊スペース: 2M/2E/2I/2B 模擬店"],
    desc: "高専祭のメイン会場！ステージプログラムと2年生4学科による焼き餃子・ポップコーン・玉こん・焼き鳥！"
  },
  {
    id: "bldg7",
    name: "7号館",
    subName: "アトラクション棟",
    color: "#9333ea",
    lightBg: "bg-purple-50 border-purple-300 text-purple-900",
    icon: "👻",
    floors: ["1F: 3M お化け屋敷", "2F: 4E キッキングスナイパー"],
    desc: "体験型アトラクション満載！機械工学科特製の恐怖お化け屋敷とキッキングスナイパー！"
  },
  {
    id: "media",
    name: "総合メディアセンター",
    subName: "図書館・メディアホール",
    color: "#0891b2",
    lightBg: "bg-cyan-50 border-cyan-300 text-cyan-900",
    icon: "📚",
    floors: ["1F: 4B 高専版格付けチェック", "2F: 図書館"],
    desc: "4B（物質工学科）主催の大熱狂体験ブース『高専版・芸能人格付けチェック』を開催！"
  },
  {
    id: "factory",
    name: "機械実習工場 / 3号館",
    subName: "モノづくり・ロボット拠点",
    color: "#059669",
    lightBg: "bg-emerald-50 border-emerald-300 text-emerald-900",
    icon: "⚙️",
    floors: ["1F: ロボコン部機体操縦＆超科学射的"],
    desc: "高専ならではの技術体験！全国大会出場のロボコン部機体を直接操縦できます！"
  },
  {
    id: "bldg2_4_5_6",
    name: "2・4・5・6・8号館",
    subName: "各学科専門棟",
    color: "#475569",
    lightBg: "bg-slate-100 border-slate-300 text-slate-800",
    icon: "🔬",
    floors: ["電気・情報・物質 各学科実験室"],
    desc: "専門研究棟・実験室エリア。"
  },
  {
    id: "cafeteria",
    name: "福利厚生棟・学食",
    subName: "食堂・休憩スペース",
    color: "#ea580c",
    lightBg: "bg-orange-50 border-orange-300 text-orange-900",
    icon: "🍔",
    floors: ["1F: 学食・売店"],
    desc: "屋内休憩エリアおよび軽食売店。"
  },
  {
    id: "parking",
    name: "正門・駐車場",
    subName: "アプローチ",
    color: "#0284c7",
    lightBg: "bg-sky-50 border-sky-300 text-sky-900",
    icon: "🅿️",
    floors: ["正門 / 守衛室 / 駐輪場"],
    desc: "正門受付、自転車駐輪場および案内所。"
  }
];

export default function App() {
  const [isEntered, setIsEntered] = useState(false);
  const [activeTab, setActiveTab] = useState<"map" | "stalls" | "events" | "guide">("map");

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("すべて");
  const [selectedGrade, setSelectedGrade] = useState("すべて");
  const [selectedDept, setSelectedDept] = useState("すべて");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedZoneId, setSelectedZoneId] = useState("entrance");
  const [modalItem, setModalItem] = useState<StallItem | null>(null);
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Toggle favorite
  const toggleFavorite = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filter computation
  const filteredStalls = useMemo(() => {
    return STALLS_DATA.filter((stall) => {
      const matchSearch =
        stall.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stall.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stall.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stall.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (stall.menu && stall.menu.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase())));

      const matchCategory =
        selectedCategory === "すべて"
          ? true
          : selectedCategory === "お気に入り"
          ? favorites.includes(stall.id)
          : stall.category === selectedCategory;

      const matchGrade = selectedGrade === "すべて" || stall.grade === selectedGrade;
      const matchDept = selectedDept === "すべて" || stall.dept.includes(selectedDept);

      return matchSearch && matchCategory && matchGrade && matchDept;
    });
  }, [searchQuery, selectedCategory, selectedGrade, selectedDept, favorites]);

  // Stalls in selected zone
  const zoneStalls = useMemo(() => {
    return STALLS_DATA.filter((s) => s.zoneId === selectedZoneId);
  }, [selectedZoneId]);

  // Share link handler
  const handleShare = (item: StallItem) => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(`鶴岡高専祭2026: ${item.title} (${item.location})`);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2000);
    }
  };

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
          @keyframes floatConfetti {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(15deg); }
          }
          .animate-char { animation: charPopIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; opacity: 0; }
          .animate-confetti { animation: floatConfetti 3.5s ease-in-out infinite; }
        `}</style>

        {/* Soft Warm Ambient Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />

        {/* Floating Colorful Confetti Elements (Reference Image Style) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          {/* Top Left Cluster */}
          <div className="absolute top-10 left-[12%] w-4 h-2 bg-orange-500 rounded-xs rotate-45 animate-confetti" style={{ animationDelay: "0.1s" }} />
          <div className="absolute top-16 left-[22%] w-3 h-5 bg-teal-500 rounded-xs -rotate-12 animate-confetti" style={{ animationDelay: "0.4s" }} />
          <div className="absolute top-8 left-[32%] w-4 h-3 bg-rose-500 rounded-xs rotate-12 animate-confetti" style={{ animationDelay: "0.7s" }} />

          {/* Top Right Cluster */}
          <div className="absolute top-7 right-[15%] w-3 h-3 bg-amber-400 rounded-xs rotate-45 animate-confetti" style={{ animationDelay: "0.3s" }} />
          <div className="absolute top-14 right-[25%] w-5 h-2.5 bg-sky-500 rounded-xs -rotate-45 animate-confetti" style={{ animationDelay: "0.6s" }} />
          <div className="absolute top-20 right-[10%] w-3.5 h-4 bg-emerald-500 rounded-xs rotate-12 animate-confetti" style={{ animationDelay: "0.2s" }} />

          {/* Around Main Title */}
          <div className="absolute top-[32%] left-[8%] w-5 h-3 bg-sky-500 rounded-xs -rotate-45 animate-confetti" style={{ animationDelay: "0.5s" }} />
          <div className="absolute top-[36%] left-[18%] w-3.5 h-5 bg-rose-500 rounded-xs rotate-12 animate-confetti" style={{ animationDelay: "0.8s" }} />
          <div className="absolute top-[30%] right-[14%] w-4 h-3 bg-amber-400 rounded-xs -rotate-12 animate-confetti" style={{ animationDelay: "0.3s" }} />
          <div className="absolute top-[37%] right-[7%] w-3 h-5 bg-teal-500 rounded-xs rotate-45 animate-confetti" style={{ animationDelay: "0.9s" }} />

          {/* Bottom Area */}
          <div className="absolute bottom-16 left-[10%] w-4 h-2.5 bg-rose-400 rounded-xs rotate-12 animate-confetti" style={{ animationDelay: "0.2s" }} />
          <div className="absolute bottom-20 right-[12%] w-3.5 h-4 bg-orange-400 rounded-xs -rotate-45 animate-confetti" style={{ animationDelay: "0.7s" }} />
        </div>

        {/* English Subtitle Badge */}
        <div className="inline-flex items-center gap-1.5 text-teal-600 font-extrabold text-xs sm:text-sm tracking-[0.25em] mb-4 z-10 font-pop">
          TSURUOKA KOSEN FESTIVAL 2026
        </div>

        {/* Main Title Section */}
        <h1 className="font-pop flex flex-col items-center justify-center tracking-tight mb-6 z-10">
          {/* 熱狂の高専祭 (Solid Vivid Red/Coral - Always visible) */}
          <div className="text-4xl sm:text-6xl text-rose-500 font-black drop-shadow-sm flex justify-center gap-0.5">
            {"熱狂の高専祭".split("").map((char, index) => (
              <span
                key={index}
                className="animate-char inline-block"
                style={{ animationDelay: `${0.1 + index * 0.07}s` }}
              >
                {char}
              </span>
            ))}
          </div>

          {/* カーニバル - FIXED: Solid Orange with Drop Shadow to guarantee 100% visibility on Mobile Safari */}
          <div className="text-5xl sm:text-7xl text-orange-500 font-black drop-shadow-sm flex justify-center gap-1 mt-1">
            {"カーニバル".split("").map((char, index) => (
              <span
                key={index}
                className="animate-char inline-block"
                style={{ animationDelay: `${0.5 + index * 0.08}s` }}
              >
                {char}
              </span>
            ))}
          </div>
        </h1>

        {/* Date / Time Card (Pop Pill Style) */}
        <div className="bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-sm rounded-full px-6 py-2.5 flex items-center justify-center gap-3 mb-8 text-xs sm:text-sm font-black text-slate-700 z-10 font-pop">
          <span className="text-rose-500">2026.10.24 SAT</span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-600">9:30 〜 15:30</span>
        </div>

        {/* Pop Entrance Pill Button (Vibrant Orange Gradient matching reference) */}
        <div className="z-10 flex flex-col items-center gap-3">
          <button
            onClick={() => setIsEntered(true)}
            className="font-pop group relative px-10 py-4 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 text-white text-lg font-black tracking-wider shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 border border-white/40"
          >
            <span>入場する</span>
            <span className="text-xl">🎉</span>
          </button>

          <p className="text-xs font-bold text-slate-400 tracking-wider font-pop">
            高専祭をお楽しみください！
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20 font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-2.5 flex items-center justify-between gap-2">
          <button
            onClick={() => setIsEntered(false)}
            className="flex items-center gap-2.5 hover:opacity-80 transition text-left shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-500 via-amber-500 to-rose-500 flex items-center justify-center font-black text-white text-base shadow-sm">
              高
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-black text-sm text-slate-800 tracking-tight flex items-center gap-1">
                熱狂の高専祭
                <span className="text-[10px] font-bold px-1.5 py-0.2 bg-orange-100 text-orange-700 rounded border border-orange-200">
                  2026
                </span>
              </span>
              <span className="text-[10px] text-slate-500 tracking-widest -mt-0.5">
                キャンパスガイド @鶴岡高専
              </span>
            </div>
          </button>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 bg-slate-100 p-1 rounded-full border border-slate-200">
            <button
              onClick={() => setActiveTab("map")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === "map"
                  ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span>マップ</span>
            </button>

            <button
              onClick={() => setActiveTab("stalls")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === "stalls"
                  ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>企画・店舗</span>
            </button>

            <button
              onClick={() => setActiveTab("events")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === "events"
                  ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>ステージ</span>
            </button>

            <button
              onClick={() => setActiveTab("guide")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === "guide"
                  ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>案内</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-2xl mx-auto px-4 pt-4 pb-12 space-y-4">

        {/* TAB 1: Campus Interactive Map */}
        {activeTab === "map" && (
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black tracking-widest text-orange-600 uppercase flex items-center gap-1">
                    <Compass className="w-3 h-3 text-orange-600" />
                    TSURUOKA KOSEN MAP
                  </span>
                  <h2 className="text-xl font-black text-slate-800 mt-0.5">鶴岡高専 構内インタラクティブ図面</h2>
                </div>
              </div>
              <p className="text-xs text-slate-600 font-medium">
                建屋をタップすると、開催企画や出し物リストを確認できます。
              </p>
            </div>

            {/* Visual Vector Map representation */}
            <div className="bg-slate-100 border-2 border-slate-200 rounded-3xl p-4 shadow-sm space-y-3">
              <div className="bg-white text-slate-700 text-[10px] font-bold py-1.5 px-3 rounded-xl flex justify-between items-center border border-slate-200">
                <span className="flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-orange-600 rotate-45" />
                  <span>🛣️ 北側: 国道345号線 / 正門アプローチ</span>
                </span>
                <span className="text-[9px] bg-orange-100 text-orange-800 font-extrabold px-2 py-0.5 rounded border border-orange-200">
                  北 ↑
                </span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setSelectedZoneId("parking")}
                  className={`w-full rounded-2xl p-2.5 text-left transition border ${
                    selectedZoneId === "parking"
                      ? "bg-sky-50 border-sky-400 text-sky-900 ring-2 ring-sky-300 shadow-sm"
                      : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-sky-700">🅿️ 正門・受付・駐輪場</span>
                    <span className="text-[9px] bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded-full border border-sky-200">
                      正門アプローチ
                    </span>
                  </div>
                </button>

                <div className="grid grid-cols-12 gap-2">
                  <button
                    onClick={() => setSelectedZoneId("bldg1")}
                    className={`col-span-12 rounded-2xl p-3.5 text-left transition border ${
                      selectedZoneId === "bldg1"
                        ? "bg-blue-50 border-blue-400 text-blue-900 ring-2 ring-blue-300 shadow-sm"
                        : "bg-white border-slate-200 text-slate-800 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-black text-sm text-blue-700">🏫 1号館 (一般教室棟・管理棟)</span>
                        <p className="text-[11px] text-slate-600 mt-1">
                          1F: 111-123 (1年模擬店 / 3Eカフェ / 4Mホスト) | 2F: (3I BAR / 3B純喫茶 / 4Iカジノ)
                        </p>
                      </div>
                      <span className="bg-blue-600 text-white font-extrabold text-[10px] px-2 py-1 rounded-full shrink-0 shadow-sm">
                        主要会場
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedZoneId("entrance")}
                    className={`col-span-12 rounded-2xl p-3 text-left transition border ${
                      selectedZoneId === "entrance"
                        ? "bg-amber-50 border-amber-400 text-amber-900 ring-2 ring-amber-300 shadow-sm"
                        : "bg-amber-50/60 border-amber-200 text-slate-800 hover:border-amber-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🚚</span>
                        <div>
                          <span className="font-extrabold text-xs text-amber-800 block">
                            学生昇降口前広場 (キッチンカー)
                          </span>
                          <span className="text-[10px] text-amber-700">
                            ラーメンもっけだの / 祇園はんなりCafé / フェリチタプラス
                          </span>
                        </div>
                      </div>
                      <span className="bg-amber-500 text-white font-black text-[10px] px-2 py-1 rounded-full shrink-0 shadow-sm">
                        人気店舗
                      </span>
                    </div>
                  </button>
                </div>

                <div className="grid grid-cols-12 gap-2">
                  <button
                    onClick={() => setSelectedZoneId("factory")}
                    className={`col-span-4 rounded-2xl p-2.5 text-left transition border ${
                      selectedZoneId === "factory"
                        ? "bg-emerald-50 border-emerald-400 text-emerald-900 ring-2 ring-emerald-300 shadow-sm"
                        : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    <span className="text-xs font-extrabold text-emerald-700 block">⚙️ 3号館・実習工場</span>
                    <span className="text-[10px] text-slate-500">ロボコン操縦</span>
                  </button>

                  <button
                    onClick={() => setSelectedZoneId("media")}
                    className={`col-span-4 rounded-2xl p-2.5 text-left transition border ${
                      selectedZoneId === "media"
                        ? "bg-cyan-50 border-cyan-400 text-cyan-900 ring-2 ring-cyan-300 shadow-sm"
                        : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    <span className="text-xs font-black text-cyan-700 block">📚 メディアセンター</span>
                    <span className="text-[10px] text-slate-600">4B 格付け</span>
                  </button>

                  <button
                    onClick={() => setSelectedZoneId("gym1")}
                    className={`col-span-4 rounded-2xl p-2.5 text-left transition border ${
                      selectedZoneId === "gym1"
                        ? "bg-rose-50 border-rose-400 text-rose-900 ring-2 ring-rose-300 shadow-sm"
                        : "bg-white border-slate-200 text-slate-800 hover:border-slate-300"
                    }`}
                  >
                    <span className="text-xs font-black text-rose-700 block">🏟️ 第一体育館</span>
                    <span className="text-[10px] text-slate-600">ステージ ＆ 2年模擬店</span>
                  </button>
                </div>

                <div className="grid grid-cols-12 gap-2">
                  <button
                    onClick={() => setSelectedZoneId("bldg7")}
                    className={`col-span-6 rounded-2xl p-2.5 text-left transition border ${
                      selectedZoneId === "bldg7"
                        ? "bg-purple-50 border-purple-400 text-purple-900 ring-2 ring-purple-300 shadow-sm"
                        : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    <span className="text-xs font-black text-purple-700 block">👻 7号館 (アトラクション)</span>
                    <span className="text-[10px] text-slate-500">お化け屋敷 / キッキング</span>
                  </button>

                  <button
                    onClick={() => setSelectedZoneId("bldg2_4_5_6")}
                    className={`col-span-6 rounded-2xl p-2.5 text-left transition border ${
                      selectedZoneId === "bldg2_4_5_6"
                        ? "bg-slate-100 border-slate-400 text-slate-900 ring-2 ring-slate-300 shadow-sm"
                        : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    <span className="text-xs font-black text-slate-700 block">🔬 2・4・5・6・8号館</span>
                    <span className="text-[10px] text-slate-500">専門研究棟・実験室</span>
                  </button>
                </div>

                <button
                  onClick={() => setSelectedZoneId("cafeteria")}
                  className={`w-full rounded-2xl p-2.5 text-left transition border ${
                    selectedZoneId === "cafeteria"
                      ? "bg-orange-50 border-orange-400 text-orange-900 ring-2 ring-orange-300 shadow-sm"
                      : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-orange-700">🍔 福利厚生棟・学食 / 休憩所</span>
                    <span className="text-[9px] bg-orange-100 text-orange-800 font-bold px-2 py-0.5 rounded-full border border-orange-200">
                      キャンパス南端
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Selected Zone Detail Card */}
            <div className={`rounded-3xl p-5 border shadow-sm space-y-3 ${currentZone.lightBg}`}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{currentZone.icon}</span>
                    <div>
                      <h3 className="text-lg font-black">{currentZone.name}</h3>
                      <p className="text-xs opacity-80 font-bold">{currentZone.subName}</p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-xs leading-relaxed opacity-90">{currentZone.desc}</p>

              {currentZone.floors && (
                <div className="space-y-1 pt-1 border-t border-current/10">
                  <span className="text-[10px] font-bold uppercase tracking-wider block opacity-75">フロア・エリア構成</span>
                  {currentZone.floors.map((f, i) => (
                    <div key={i} className="text-xs font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0 opacity-60" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-2">
                <h4 className="text-xs font-extrabold mb-2 flex items-center gap-1">
                  <span>このエリアの企画・店舗 ({zoneStalls.length}件)</span>
                </h4>
                {zoneStalls.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {zoneStalls.map((stall) => (
                      <div
                        key={stall.id}
                        onClick={() => setModalItem(stall)}
                        className="bg-white hover:bg-slate-50 text-slate-800 p-3 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md cursor-pointer transition flex items-center gap-3"
                      >
                        <span className="text-2xl p-2 bg-slate-100 rounded-xl shrink-0">{stall.icon}</span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-orange-100 text-orange-700">
                              {stall.grade}
                            </span>
                            <span className="text-xs font-black truncate">{stall.title}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 truncate mt-0.5">{stall.location}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic py-2">このエリアに個別の出店企画はありません。</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Stalls & Class Projects */}
        {activeTab === "stalls" && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="店名・料理・クラス・教室で検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
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

              <div className="space-y-2">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  <span className="text-[10px] font-bold text-slate-400 shrink-0 mr-1">カテゴリ:</span>
                  {["すべて", "模擬店", "クラス企画", "キッチンカー", "お気に入り"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1 rounded-full text-xs font-extrabold shrink-0 transition ${
                        selectedCategory === cat
                          ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-sm"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {cat === "お気に入り" ? `❤️ お気に入り (${favorites.length})` : cat}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  <span className="text-[10px] font-bold text-slate-400 shrink-0 mr-1">学年区分:</span>
                  {["すべて", "1年", "2年", "3年", "4年", "外部", "部活"].map((gr) => (
                    <button
                      key={gr}
                      onClick={() => setSelectedGrade(gr)}
                      className={`px-2.5 py-0.5 rounded-lg text-xs font-bold shrink-0 transition ${
                        selectedGrade === gr
                          ? "bg-slate-800 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {gr}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between px-1 text-xs font-bold text-slate-500">
              <span>検索結果: {filteredStalls.length} 件</span>
              {favorites.length > 0 && (
                <span className="text-rose-600 flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                  お気に入り {favorites.length} 件
                </span>
              )}
            </div>

            {filteredStalls.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredStalls.map((stall) => {
                  const isFav = favorites.includes(stall.id);
                  return (
                    <div
                      key={stall.id}
                      onClick={() => setModalItem(stall)}
                      className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition cursor-pointer relative flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-3xl p-2 bg-slate-50 border border-slate-100 rounded-2xl group-hover:scale-110 transition-transform">
                              {stall.icon}
                            </span>
                            <div>
                              <div className="flex items-center gap-1">
                                <span className="text-[10px] font-black px-2 py-0.5 bg-orange-50 text-orange-700 rounded-md border border-orange-200">
                                  {stall.grade}
                                </span>
                                <span className="text-[10px] font-bold text-slate-500">
                                  {stall.category}
                                </span>
                              </div>
                              <h3 className="font-black text-sm text-slate-800 mt-0.5 group-hover:text-orange-600 transition">
                                {stall.title}
                              </h3>
                            </div>
                          </div>

                          <button
                            onClick={(e) => toggleFavorite(stall.id, e)}
                            className="p-1.5 rounded-full hover:bg-slate-100 transition shrink-0"
                          >
                            <Heart
                              className={`w-5 h-5 transition ${
                                isFav ? "fill-rose-500 text-rose-500" : "text-slate-300 hover:text-rose-400"
                              }`}
                            />
                          </button>
                        </div>

                        <p className="text-xs text-slate-600 line-clamp-2 font-medium mb-3">
                          {stall.description}
                        </p>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-slate-100">
                        <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500">
                          <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                          <span className="truncate">{stall.location}</span>
                        </div>

                        {stall.menu && (
                          <div className="flex flex-wrap gap-1">
                            {stall.menu.slice(0, 3).map((m, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-md"
                              >
                                {m}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
                <Search className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="text-sm font-bold text-slate-600">該当する企画・店舗が見つかりませんでした。</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("すべて");
                    setSelectedGrade("すべて");
                  }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
                >
                  フィルターをリセット
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Events & Stage Schedule */}
        {activeTab === "events" && (
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-[10px] font-black tracking-widest text-orange-600 uppercase flex items-center gap-1">
                <Calendar className="w-3 h-3 text-orange-600" />
                STAGE PROGRAM
              </span>
              <h2 className="text-xl font-black text-slate-800">ステージタイムスケジュール</h2>
              <p className="text-xs text-slate-600 font-medium">
                第一体育館メインステージおよび屋外中庭サブステージの全演目プログラムです。
              </p>
            </div>

            {EVENTS_DATA.map((stage) => (
              <div key={stage.stageId} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold ${stage.badgeColor}`}>
                      {stage.stageName}
                    </span>
                    <span className="text-xs font-extrabold text-slate-700 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" />
                      {stage.location}
                    </span>
                  </div>
                </div>

                <div className="divide-y divide-slate-100">
                  {stage.schedule.map((item) => (
                    <div key={item.id} className="p-4 hover:bg-slate-50/80 transition space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-black text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
                          {item.time}
                        </span>
                        <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {item.tag}
                        </span>
                      </div>

                      <div className="flex items-start gap-2 pt-1">
                        <span className="text-xl mt-0.5">{item.icon}</span>
                        <div>
                          <h4 className="font-black text-sm text-slate-800">{item.title}</h4>
                          <p className="text-[11px] font-bold text-slate-500">{item.org}</p>
                          <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {stage.note && (
                  <div className="p-3 bg-slate-50 border-t border-slate-100 text-[11px] font-semibold text-slate-500 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                    <span>{stage.note}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: Campus Guide & FAQ */}
        {activeTab === "guide" && (
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <span className="text-[10px] font-black tracking-widest text-orange-600 uppercase flex items-center gap-1">
                <Grid className="w-3 h-3 text-orange-600" />
                INFORMATION GUIDE
              </span>
              <h2 className="text-xl font-black text-slate-800">高専祭 ご案内 ＆ アクセス</h2>

              <div className="space-y-2 text-xs font-semibold text-slate-600 leading-relaxed">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-2.5">
                  <Building2 className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold text-slate-800 block">鶴岡工業高等専門学校</span>
                    <span>〒997-8511 山形県鶴岡市井岡字沢田104</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-2.5">
                  <Car className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold text-slate-800 block">お車でご来場のお客様へ</span>
                    <span>敷地内の指定来場者駐車場をご利用ください。満車の場合は案内誘導員の指示に従ってください。</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-2.5">
                  <Shield className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold text-slate-800 block">校内での注意事項</span>
                    <span>敷地内は全面禁煙・飲酒禁止です。ゴミは各所に設置された指定ゴミ箱にて分別回収にご協力をお願いいたします。</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="font-black text-sm text-slate-800 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-orange-600" />
                <span>よくあるご質問 (FAQ)</span>
              </h3>

              <div className="space-y-2 text-xs">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <p className="font-extrabold text-orange-700">Q. 入場料や予約は必要ですか？</p>
                  <p className="text-slate-600 font-semibold mt-1">
                    どなたでも入場無料・事前予約不要でご来場いただけます！
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <p className="font-extrabold text-orange-700">Q. 喫食スペースはありますか？</p>
                  <p className="text-slate-600 font-semibold mt-1">
                    第一体育館内・学食（福利厚生棟）・中庭ベンチエリアにてご自由にお食事いただけます。
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Detail Modal Dialog */}
      {modalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade">
          <div className="bg-white border border-slate-200 text-slate-800 w-full max-w-md rounded-3xl p-6 shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalItem(null)}
              className="absolute right-4 top-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <span className="text-4xl p-3 bg-slate-50 border border-slate-100 rounded-2xl">{modalItem.icon}</span>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-700">
                    {modalItem.grade}
                  </span>
                  <span className="text-xs font-bold text-slate-500">{modalItem.dept}</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 mt-0.5">{modalItem.title}</h3>
              </div>
            </div>

            <p className="text-xs text-slate-600 font-medium leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
              {modalItem.description}
            </p>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                <span>場所: {modalItem.location}</span>
              </div>

              {modalItem.menu && modalItem.menu.length > 0 && (
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <span className="text-xs font-black text-slate-700 block">提供メニュー・企画内容:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {modalItem.menu.map((m, i) => (
                      <span key={i} className="text-xs font-bold px-3 py-1 bg-slate-100 text-slate-700 rounded-xl">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 flex items-center gap-2">
              <button
                onClick={(e) => toggleFavorite(modalItem.id, e)}
                className={`flex-1 py-2.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 border transition ${
                  favorites.includes(modalItem.id)
                    ? "bg-rose-50 border-rose-200 text-rose-600"
                    : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Heart className={`w-4 h-4 ${favorites.includes(modalItem.id) ? "fill-rose-500 text-rose-500" : ""}`} />
                <span>{favorites.includes(modalItem.id) ? "お気に入り解除" : "お気に入り追加"}</span>
              </button>

              <button
                onClick={() => handleShare(modalItem)}
                className="p-2.5 rounded-2xl bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 transition"
              >
                <Share2 className="w-4 h-4" />
              </button>

              {modalItem.instagram && (
                <a
                  href={modalItem.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white font-bold text-xs flex items-center gap-1 hover:opacity-90 transition shadow-sm"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Copy Notification Toast */}
      {copiedNotification && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 animate-fade">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>企画情報をクリップボードにコピーしました！</span>
        </div>
      )}
    </div>
  );
}