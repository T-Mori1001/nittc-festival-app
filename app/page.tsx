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

// Custom SVG Instagram Icon to replace lucide-react Instagram import and prevent build errors
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
    badgeColor: "bg-blue-600",
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
    badgeColor: "bg-emerald-600",
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
    color: "#f59e0b",
    lightBg: "bg-amber-500/10 border-amber-500/40 text-amber-300",
    icon: "🚚",
    floors: ["屋外広場"],
    desc: "人気のキッチンカー3店が集結！ラーメンもっけだの、祇園はんなりCafé、フェリチタプラス！"
  },
  {
    id: "bldg1",
    name: "1号館",
    subName: "一般教室棟・管理棟",
    color: "#3b82f6",
    lightBg: "bg-blue-500/10 border-blue-500/40 text-blue-300",
    icon: "🏫",
    floors: ["1F: 1年生模擬店(1-1〜1-4) / 3Eカフェ / 4Mホスト", "2F: 3I BAR / 3B純喫茶 / 4Iカジノ"],
    desc: "キャンパス中央に位置するメイン校舎。1年生の軽食・スイーツ模擬店や上級生の企画が盛りだくさん！"
  },
  {
    id: "gym1",
    name: "第一体育館",
    subName: "メインステージ ＆ 2年模擬店",
    color: "#ef4444",
    lightBg: "bg-rose-500/10 border-rose-500/40 text-rose-300",
    icon: "🏟️",
    floors: ["アリーナ: ステージイベント", "周遊スペース: 2M/2E/2I/2B 模擬店"],
    desc: "高専祭のメイン会場！ステージプログラムと2年生4学科による焼き餃子・ポップコーン・玉こん・焼き鳥！"
  },
  {
    id: "bldg7",
    name: "7号館",
    subName: "アトラクション棟",
    color: "#a855f7",
    lightBg: "bg-purple-500/10 border-purple-500/40 text-purple-300",
    icon: "👻",
    floors: ["1F: 3M お化け屋敷", "2F: 4E キッキングスナイパー"],
    desc: "体験型アトラクション満載！機械工学科特製の恐怖お化け屋敷とキッキングスナイパー！"
  },
  {
    id: "media",
    name: "総合メディアセンター",
    subName: "図書館・メディアホール",
    color: "#06b6d4",
    lightBg: "bg-cyan-500/10 border-cyan-500/40 text-cyan-300",
    icon: "📚",
    floors: ["1F: 4B 高専版格付けチェック", "2F: 図書館"],
    desc: "4B（物質工学科）主催の大熱狂体験ブース『高専版・芸能人格付けチェック』を開催！"
  },
  {
    id: "factory",
    name: "機械実習工場 / 3号館",
    subName: "モノづくり・ロボット拠点",
    color: "#10b981",
    lightBg: "bg-emerald-500/10 border-emerald-500/40 text-emerald-300",
    icon: "⚙️",
    floors: ["1F: ロボコン部機体操縦＆超科学射的"],
    desc: "高専ならではの技術体験！全国大会出場のロボコン部機体を直接操縦できます！"
  },
  {
    id: "bldg2_4_5_6",
    name: "2・4・5・6・8号館",
    subName: "各学科専門棟",
    color: "#64748b",
    lightBg: "bg-slate-500/10 border-slate-500/40 text-slate-300",
    icon: "🔬",
    floors: ["電気・情報・物質 各学科実験室"],
    desc: "専門研究棟・実験室エリア。"
  },
  {
    id: "cafeteria",
    name: "福利厚生棟・学食",
    subName: "食堂・休憩スペース",
    color: "#f97316",
    lightBg: "bg-orange-500/10 border-orange-500/40 text-orange-300",
    icon: "🍔",
    floors: ["1F: 学食・売店"],
    desc: "屋内休憩エリアおよび軽食売店。"
  },
  {
    id: "parking",
    name: "正門・駐車場",
    subName: "アプローチ",
    color: "#0284c7",
    lightBg: "bg-sky-500/10 border-sky-500/40 text-sky-300",
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
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center relative overflow-hidden px-6 text-center select-none font-sans">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Dela+Gothic+One&family=M+PLUS+Rounded+1c:wght@700;800;900&display=swap');
          .font-pop { font-family: 'Dela Gothic One', 'M PLUS Rounded 1c', sans-serif; }
          @keyframes charPopIn {
            0% { opacity: 0; transform: translateY(24px) scale(0.6); }
            70% { opacity: 1; transform: translateY(-6px) scale(1.1); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @keyframes floatSlow { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
          .animate-char { animation: charPopIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; opacity: 0; }
          .animate-fade { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
          .animate-spin-gear { animation: spinSlow 16s linear infinite; }
          .animate-float-icon { animation: floatSlow 4s ease-in-out infinite; }
        `}</style>

        {/* Ambient background glows */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900/60 via-slate-950 to-slate-950 pointer-events-none" />

        {/* Floating tech background elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          <div className="absolute top-6 -left-10 text-cyan-500/20 animate-spin-gear">
            <Cog className="w-36 h-36" />
          </div>
          <div className="absolute top-12 right-8 text-sky-400/25 animate-float-icon">
            <Cpu className="w-16 h-16" />
          </div>
          <div className="absolute bottom-28 left-8 text-indigo-400/25 animate-float-icon">
            <Code className="w-14 h-14" />
          </div>
          <div className="absolute bottom-10 -right-8 text-cyan-500/20 animate-spin-gear">
            <Cog className="w-32 h-32" />
          </div>
        </div>

        {/* Badge */}
        <div
          className="animate-fade inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-bold mb-4 tracking-wider z-10 shadow-lg"
          style={{ animationDelay: "0.1s" }}
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
          <span>TSURUOKA KOSEN FESTIVAL 2026</span>
        </div>

        {/* Title */}
        <h1 className="font-pop flex flex-col items-center justify-center tracking-wide mb-8 z-10">
          <div className="text-3xl sm:text-5xl text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] flex justify-center gap-1">
            {"熱狂の高専祭".split("").map((char, index) => (
              <span
                key={index}
                className="animate-char inline-block"
                style={{ animationDelay: `${0.2 + index * 0.08}s` }}
              >
                {char}
              </span>
            ))}
          </div>

          <div className="relative inline-block text-center mt-3">
            <div className="text-5xl sm:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-blue-400 drop-shadow-[0_0_25px_rgba(56,189,248,0.7)] flex justify-center gap-1">
              {"カーニバル".split("").map((char, index) => (
                <span
                  key={index}
                  className="animate-char inline-block"
                  style={{ animationDelay: `${0.6 + index * 0.09}s` }}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
        </h1>

        {/* Info card */}
        <div
          className="animate-fade bg-slate-900/90 backdrop-blur-md border border-cyan-500/30 shadow-xl rounded-2xl px-6 py-3.5 flex flex-wrap items-center justify-center gap-3 mb-10 text-xs sm:text-sm font-bold text-slate-200 z-10"
          style={{ animationDelay: "1.2s" }}
        >
          <div className="flex items-center gap-1.5 text-cyan-300 font-extrabold">
            <Calendar className="w-4 h-4" />
            <span>2026年10月24日 (土)</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Clock className="w-4 h-4 text-sky-400" />
            <span>9:30 〜 15:30</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-1 text-sky-300">
            <MapPin className="w-4 h-4 text-rose-400" />
            <span>@鶴岡高専 キャンパス</span>
          </div>
        </div>

        {/* Enter Button */}
        <div className="animate-fade z-10" style={{ animationDelay: "1.4s" }}>
          <button
            onClick={() => setIsEntered(true)}
            className="font-pop group relative w-64 sm:w-72 py-4 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white text-lg tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 border border-cyan-300/40"
          >
            <span>アプリを起動する</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-20 font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 shadow-xl">
        <div className="max-w-2xl mx-auto px-4 py-2.5 flex items-center justify-between gap-2">
          <button
            onClick={() => setIsEntered(false)}
            className="flex items-center gap-2.5 hover:opacity-80 transition text-left shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center font-black text-white text-base shadow">
              高
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-black text-sm text-cyan-300 tracking-tight flex items-center gap-1">
                熱狂の高専祭
                <span className="text-[10px] font-bold px-1.5 py-0.2 bg-blue-950 text-cyan-200 rounded border border-cyan-500/40">
                  2026
                </span>
              </span>
              <span className="text-[10px] text-slate-400 tracking-widest -mt-0.5">
                キャンパスガイド @鶴岡高専
              </span>
            </div>
          </button>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-full border border-slate-800">
            <button
              onClick={() => setActiveTab("map")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === "map"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span>マップ</span>
            </button>

            <button
              onClick={() => setActiveTab("stalls")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === "stalls"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>企画・店舗</span>
            </button>

            <button
              onClick={() => setActiveTab("events")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === "events"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>ステージ</span>
            </button>

            <button
              onClick={() => setActiveTab("guide")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === "guide"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
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

        {/* ========================================================= */}
        {/* TAB 1: Campus Interactive Map                             */}
        {/* ========================================================= */}
        {activeTab === "map" && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 rounded-3xl p-5 border border-slate-800 shadow-2xl space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase flex items-center gap-1">
                    <Compass className="w-3 h-3 text-cyan-400" />
                    TSURUOKA KOSEN MAP
                  </span>
                  <h2 className="text-xl font-black text-white mt-0.5">鶴岡高専 構内インタラクティブ図面</h2>
                </div>
              </div>
              <p className="text-xs text-slate-300 font-medium">
                建屋をタップすると、開催企画や出し物リストを確認できます。
              </p>
            </div>

            {/* Visual Vector Map representation */}
            <div className="bg-slate-950 border-2 border-slate-800 rounded-3xl p-4 shadow-2xl space-y-3">
              <div className="bg-slate-900/90 text-slate-200 text-[10px] font-bold py-1.5 px-3 rounded-xl flex justify-between items-center border border-slate-800">
                <span className="flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-cyan-400 rotate-45" />
                  <span>🛣️ 北側: 国道345号線 / 正門アプローチ</span>
                </span>
                <span className="text-[9px] bg-cyan-950 text-cyan-300 font-extrabold px-2 py-0.5 rounded border border-cyan-800">
                  北 ↑
                </span>
              </div>

              <div className="space-y-2">
                {/* North Entrance Zone */}
                <button
                  onClick={() => setSelectedZoneId("parking")}
                  className={`w-full rounded-2xl p-2.5 text-left transition border ${
                    selectedZoneId === "parking"
                      ? "bg-sky-950 border-sky-400 text-white ring-2 ring-sky-400"
                      : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-sky-300">🅿️ 正門・受付・駐輪場</span>
                    <span className="text-[9px] bg-sky-900 text-sky-200 font-bold px-2 py-0.5 rounded-full">
                      正門アプローチ
                    </span>
                  </div>
                </button>

                {/* Main 1号館 and Kitchen Car zone */}
                <div className="grid grid-cols-12 gap-2">
                  <button
                    onClick={() => setSelectedZoneId("bldg1")}
                    className={`col-span-12 rounded-2xl p-3.5 text-left transition border ${
                      selectedZoneId === "bldg1"
                        ? "bg-blue-950 border-blue-400 text-white ring-2 ring-blue-400"
                        : "bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-black text-sm text-blue-300">🏫 1号館 (一般教室棟・管理棟)</span>
                        <p className="text-[11px] text-slate-300 mt-1">
                          1F: 111-123 (1年模擬店 / 3Eカフェ / 4Mホスト) | 2F: (3I BAR / 3B純喫茶 / 4Iカジノ)
                        </p>
                      </div>
                      <span className="bg-blue-600 text-white font-extrabold text-[10px] px-2 py-1 rounded-full shrink-0">
                        主要会場
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedZoneId("entrance")}
                    className={`col-span-12 rounded-2xl p-3 text-left transition border ${
                      selectedZoneId === "entrance"
                        ? "bg-amber-950 border-amber-400 text-white ring-2 ring-amber-400"
                        : "bg-amber-950/40 border-amber-700/50 text-slate-100 hover:border-amber-500"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🚚</span>
                        <div>
                          <span className="font-extrabold text-xs text-amber-300 block">
                            学生昇降口前広場 (キッチンカー)
                          </span>
                          <span className="text-[10px] text-amber-200">
                            ラーメンもっけだの / 祇園はんなりCafé / フェリチタプラス
                          </span>
                        </div>
                      </div>
                      <span className="bg-amber-500 text-slate-950 font-black text-[10px] px-2 py-1 rounded-full shrink-0">
                        人気店舗
                      </span>
                    </div>
                  </button>
                </div>

                {/* Gymnasium, Media Center, Workshop */}
                <div className="grid grid-cols-12 gap-2">
                  <button
                    onClick={() => setSelectedZoneId("factory")}
                    className={`col-span-4 rounded-2xl p-2.5 text-left transition border ${
                      selectedZoneId === "factory"
                        ? "bg-emerald-950 border-emerald-400 text-white ring-2 ring-emerald-400"
                        : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    <span className="text-xs font-extrabold text-emerald-300 block">⚙️ 3号館・実習工場</span>
                    <span className="text-[10px] text-slate-400">ロボコン操縦</span>
                  </button>

                  <button
                    onClick={() => setSelectedZoneId("media")}
                    className={`col-span-4 rounded-2xl p-2.5 text-left transition border ${
                      selectedZoneId === "media"
                        ? "bg-cyan-950 border-cyan-400 text-white ring-2 ring-cyan-400"
                        : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    <span className="text-xs font-black text-cyan-300 block">📚 メディアセンター</span>
                    <span className="text-[10px] text-slate-300">4B 格付け</span>
                  </button>

                  <button
                    onClick={() => setSelectedZoneId("gym1")}
                    className={`col-span-4 rounded-2xl p-2.5 text-left transition border ${
                      selectedZoneId === "gym1"
                        ? "bg-rose-950 border-rose-400 text-white ring-2 ring-rose-400"
                        : "bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700"
                    }`}
                  >
                    <span className="text-xs font-black text-rose-300 block">🏟️ 第一体育館</span>
                    <span className="text-[10px] text-slate-300">ステージ ＆ 2年模擬店</span>
                  </button>
                </div>

                {/* 7号館 & Specialized Bldgs */}
                <div className="grid grid-cols-12 gap-2">
                  <button
                    onClick={() => setSelectedZoneId("bldg7")}
                    className={`col-span-6 rounded-2xl p-2.5 text-left transition border ${
                      selectedZoneId === "bldg7"
                        ? "bg-purple-950 border-purple-400 text-white ring-2 ring-purple-400"
                        : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    <span className="text-xs font-black text-purple-300 block">👻 7号館</span>
                    <span className="text-[10px] text-slate-300">3Mお化け屋敷 / 4Eキッキング</span>
                  </button>

                  <button
                    onClick={() => setSelectedZoneId("bldg2_4_5_6")}
                    className={`col-span-6 rounded-2xl p-2.5 text-left transition border ${
                      selectedZoneId === "bldg2_4_5_6"
                        ? "bg-slate-800 border-slate-400 text-white ring-2 ring-slate-400"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <span className="text-xs font-bold text-slate-300 block">🔬 2・4・5・6・8号館</span>
                    <span className="text-[10px] opacity-80">専門研究室</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Selected Zone Details */}
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center text-xl border border-slate-800">
                    {currentZone.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white">{currentZone.name}</h3>
                    <p className="text-xs text-slate-400 font-bold">{currentZone.subName}</p>
                  </div>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${currentZone.lightBg}`}>
                  {zoneStalls.length} 件の企画
                </span>
              </div>

              <div className="space-y-2">
                {zoneStalls.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setModalItem(item)}
                    className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-900 text-cyan-200">
                            {item.grade} {item.dept}
                          </span>
                          <span className="text-xs font-black text-white">{item.title}</span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1">{item.description}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: Stalls, Projects & Kitchen Cars List               */}
        {/* ========================================================= */}
        {activeTab === "stalls" && (
          <div className="space-y-4">
            {/* Category selection */}
            <div className="grid grid-cols-5 gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
              {["すべて", "模擬店", "クラス企画", "キッチンカー", "お気に入り"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`py-2 rounded-xl text-[11px] font-bold transition ${
                    selectedCategory === cat
                      ? "bg-cyan-500 text-slate-950 font-extrabold"
                      : "text-slate-400 hover:bg-slate-900"
                  }`}
                >
                  {cat === "お気に入り" ? `キープ(${favorites.length})` : cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-3 text-slate-500 w-4 h-4" />
              <input
                type="text"
                placeholder="店名、メニュー、場所などで検索 (例: ラーメン, 1M, 体育館)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 bg-slate-950 border border-slate-800 rounded-2xl text-xs font-medium text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3 top-3 text-slate-500">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Grade & Dept filters */}
            <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400 font-bold w-10 text-[11px]">学年:</span>
                <div className="flex gap-1 flex-wrap">
                  {["すべて", "1年", "2年", "3年", "4年", "外部", "部活"].map((g) => (
                    <button
                      key={g}
                      onClick={() => setSelectedGrade(g)}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        selectedGrade === g ? "bg-cyan-500 text-slate-950" : "bg-slate-900 text-slate-400"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs border-t border-slate-900 pt-1.5">
                <span className="text-slate-400 font-bold w-10 text-[11px]">学科:</span>
                <div className="flex gap-1 flex-wrap">
                  {["すべて", "機械", "電気", "情報", "物質"].map((d) => (
                    <button
                      key={d}
                      onClick={() => setSelectedDept(d)}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        selectedDept === d ? "bg-blue-600 text-white" : "bg-slate-900 text-blue-400"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Items Cards */}
            <div className="space-y-3">
              {filteredStalls.map((item) => {
                const isFav = favorites.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => setModalItem(item)}
                    className="bg-slate-950 rounded-2xl p-4 border border-slate-800 hover:border-cyan-500/50 transition cursor-pointer relative space-y-2"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-2xl shrink-0 border border-slate-800">
                        {item.icon}
                      </div>

                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] font-black px-2 py-0.5 rounded bg-blue-600 text-white">
                            {item.category}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                            {item.dept}
                          </span>
                          <span className="text-[11px] font-extrabold text-cyan-400 ml-auto flex items-center gap-0.5">
                            <MapPin className="w-3 h-3 text-rose-500" />
                            {item.location}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <h3 className="font-black text-base text-white truncate">{item.title}</h3>
                          <button
                            onClick={(e) => toggleFavorite(item.id, e)}
                            className="p-1 hover:bg-slate-900 rounded-full"
                          >
                            <Heart
                              className={`w-5 h-5 ${isFav ? "fill-rose-500 text-rose-500" : "text-slate-600"}`}
                            />
                          </button>
                        </div>

                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{item.description}</p>

                        {/* Kitchen car specific Instagram button */}
                        {item.instagram && (
                          <div className="pt-1">
                            <a
                              href={item.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white text-[11px] font-extrabold shadow"
                            >
                              <InstagramIcon className="w-3.5 h-3.5" />
                              <span>公式Instagram</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: Event Stage Timetable                              */}
        {/* ========================================================= */}
        {activeTab === "events" && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 rounded-3xl p-5 border border-slate-800">
              <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase">
                STAGE PROGRAM
              </span>
              <h2 className="text-xl font-black text-white">2026.10.24 (土) タイムスケジュール</h2>
            </div>

            {EVENTS_DATA.map((stage) => (
              <div key={stage.stageId} className="space-y-3">
                <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <h3 className="font-black text-base text-white">{stage.stageName}</h3>
                  <span className="text-xs font-bold text-cyan-400 bg-slate-900 px-2.5 py-1 rounded-full border border-slate-800">
                    📍 {stage.location}
                  </span>
                </div>

                <div className="space-y-2.5 pl-3 border-l-2 border-cyan-500/40 ml-2">
                  {stage.schedule.map((item) => (
                    <div
                      key={item.id}
                      className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-1 relative"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-950 bg-cyan-400 px-2 py-0.5 rounded-full">
                          {item.time}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400">{item.tag}</span>
                      </div>
                      <div className="flex items-center gap-2 pt-1">
                        <span className="text-xl">{item.icon}</span>
                        <h4 className="font-black text-sm text-white">{item.title}</h4>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: General Guide & Info                               */}
        {/* ========================================================= */}
        {activeTab === "guide" && (
          <div className="space-y-4">
            {/* Kitchen Cars Instagram Quick Links Banner */}
            <div className="bg-gradient-to-r from-purple-800 via-pink-600 to-amber-500 rounded-3xl p-4 text-white space-y-3">
              <div className="flex items-center gap-2">
                <InstagramIcon className="w-6 h-6" />
                <h3 className="font-black text-base">出店キッチンカー Instagram</h3>
              </div>
              <div className="grid grid-cols-1 gap-2 text-xs font-extrabold">
                <a
                  href="https://www.instagram.com/mokkedanonoodle/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-md p-2.5 rounded-xl flex items-center justify-between"
                >
                  <span>🍜 ラーメン もっけだの (@mokkedanonoodle)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://www.instagram.com/gion_hannari_cafe/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-md p-2.5 rounded-xl flex items-center justify-between"
                >
                  <span>🍡 祇園はんなりCafé (@gion_hannari_cafe)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://www.instagram.com/felicitaplus.sakata/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-md p-2.5 rounded-xl flex items-center justify-between"
                >
                  <span>🥤 フェリチタプラス (@felicitaplus.sakata)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* General Instructions */}
            <div className="bg-slate-950 rounded-3xl p-5 border border-slate-800 space-y-3">
              <h3 className="font-black text-base text-white flex items-center gap-2 border-b border-slate-800 pb-2">
                <Info className="w-5 h-5 text-cyan-400" />
                <span>ご来場者様へのご案内 ＆ 注意事項</span>
              </h3>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="bg-slate-900 p-3 rounded-2xl border border-amber-500/30">
                  <h4 className="font-bold text-amber-300">👟 上履き・スリッパのご持参</h4>
                  <p className="mt-1">
                    校舎内および第一体育館は全館土足厳禁です。必ず上履きおよび靴袋をご持参ください。
                  </p>
                </div>

                <div className="bg-slate-900 p-3 rounded-2xl border border-blue-500/30">
                  <h4 className="font-bold text-blue-300">🚲 自転車でご来場の方</h4>
                  <p className="mt-1">正門を入って右手の指定駐輪場をご利用ください。</p>
                </div>

                <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800">
                  <h4 className="font-bold text-slate-200">🚗 お車でご来場の方</h4>
                  <p className="mt-1">構内南側グラウンド横の臨時駐車場をご利用ください。</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================= */}
      {/* Item Detail Modal                                         */}
      {/* ========================================================= */}
      {modalItem && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={() => setModalItem(null)}
        >
          <div
            className="bg-slate-900 w-full max-w-lg rounded-t-3xl sm:rounded-3xl p-6 space-y-4 border border-slate-800 text-white max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{modalItem.icon}</span>
                <div>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-blue-600">
                    {modalItem.category}
                  </span>
                  <h3 className="font-black text-lg mt-0.5">{modalItem.title}</h3>
                  <p className="text-xs text-slate-400">主催: {modalItem.dept}</p>
                </div>
              </div>
              <button onClick={() => setModalItem(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex justify-between">
                <span className="text-slate-400">場所</span>
                <span className="font-bold text-cyan-300">📍 {modalItem.location}</span>
              </div>

              <div>
                <h4 className="font-bold text-slate-400 mb-1">詳細説明</h4>
                <p className="bg-slate-950 p-3 rounded-2xl border border-slate-800 leading-relaxed text-slate-200">
                  {modalItem.description}
                </p>
              </div>

              {modalItem.menu && (
                <div>
                  <h4 className="font-bold text-slate-400 mb-1">提供メニュー</h4>
                  <div className="flex flex-wrap gap-1">
                    {modalItem.menu.map((m, idx) => (
                      <span key={idx} className="bg-cyan-950 text-cyan-200 border border-cyan-800 px-2.5 py-1 rounded-full">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {modalItem.instagram && (
                <a
                  href={modalItem.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-extrabold text-xs shadow flex items-center justify-center gap-2"
                >
                  <InstagramIcon className="w-4 h-4" />
                  <span>Instagramで詳細を見る</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={(e) => toggleFavorite(modalItem.id, e)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <Heart className={`w-4 h-4 ${favorites.includes(modalItem.id) ? "fill-rose-500 text-rose-500" : ""}`} />
                <span>{favorites.includes(modalItem.id) ? "キープ済み" : "キープする"}</span>
              </button>

              <button
                onClick={() => handleShare(modalItem)}
                className="py-2.5 px-4 rounded-xl bg-cyan-500 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5"
              >
                <Share2 className="w-4 h-4" />
                <span>共有</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Copy Toast Notification */}
      {copiedNotification && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-950 text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-2xl z-50 flex items-center gap-2 border border-cyan-500/50">
          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          <span>クリップボードにコピーしました！</span>
        </div>
      )}
    </div>
  );
}