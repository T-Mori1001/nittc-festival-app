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
  Instagram,
  Clock,
  Info,
  Layers,
  Award,
  Music,
  Tv,
  X,
  Share2,
  CheckCircle2
} from "lucide-react";

// 全企画・店舗データ (キッチンカーはInstagram URL付き)
const STALLS_DATA = [
  // --- キッチンカー (学生昇降口前) ---
  {
    id: 101,
    title: "ラーメン もっけだの",
    category: "キッチンカー",
    subcategory: "ラーメン",
    grade: "外部",
    dept: "キッチンカー",
    location: "学生昇降口前",
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
    location: "学生昇降口前",
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
    location: "学生昇降口前",
    zoneId: "entrance",
    description: "フルーツたっぷりのフレッシュスムージー＆スパイシーで食欲をそそる本格ガパオライス！",
    icon: "🥤",
    instagram: "https://www.instagram.com/felicitaplus.sakata/",
    menu: ["特製ガパオライス", "季節のフルーツスムージー", "タピオカミルクティー"]
  },

  // --- 1年 (クラス模擬店) ---
  {
    id: 1,
    title: "ほっとサンド",
    category: "模擬店",
    subcategory: "軽食",
    grade: "1年",
    dept: "1-1",
    location: "111教室",
    zoneId: "building1",
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
    location: "112教室",
    zoneId: "building1",
    description: "1-2がお届けする冷たくてシュワっと美味しい各種ソフトドリンク＆スペシャルソーダ！",
    icon: "🍹",
    menu: ["メロンソーダ", "コーラ", "レモネード", "オレンジジュース"]
  },
  {
    id: 3,
    title: "カラフルわたあめ",
    category: "模擬店",
    subcategory: "スイーツ",
    grade: "1年",
    dept: "1-3",
    location: "121教室",
    zoneId: "building1",
    description: "1-3作！フワフワ甘くて可愛い映え間違いなしのカラフルビッグわたあめ！",
    icon: "🍥",
    menu: ["レインボーわたあめ", "いちご味", "ブルーハワイ味"]
  },
  {
    id: 4,
    title: "モチモチクレープ",
    category: "模擬店",
    subcategory: "スイーツ",
    grade: "1年",
    dept: "1-4",
    location: "122教室",
    zoneId: "building1",
    description: "1-4手作り生地のボリューム満点トッピングクレープ！甘党集合！",
    icon: "🥞",
    menu: ["チョコバナナ生クリーム", "イチゴスペシャル", "キャラメルナッツ"]
  },

  // --- 2年 (クラス模擬店) ---
  {
    id: 5,
    title: "パリッとジューシー餃子",
    category: "模擬店",
    subcategory: "フード",
    grade: "2年",
    dept: "機械",
    location: "第一体育館",
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
    dept: "電気",
    location: "第一体育館",
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
    dept: "情報",
    location: "第一体育館",
    zoneId: "gym1",
    description: "2I（情報コース）秘伝の出汁がしっかり染み込んだ熱々の山形名物・玉こんにゃく！からしを添えてどうぞ！",
    icon: "🍡",
    menu: ["特製出汁玉こんにゃく (1本)"]
  },
  {
    id: 8,
    title: "極上焼き鳥",
    category: "模擬店",
    subcategory: "フード",
    grade: "2年",
    dept: "物質",
    location: "第一体育館",
    zoneId: "gym1",
    description: "2B（物質工学科）手炭火風で香ばしく焼き上げる秘伝タレ＆塩のやみつき焼き鳥！",
    icon: "🍢",
    menu: ["ももタレ", "皮塩", "つくね"]
  },

  // --- 3年 (クラス企画) ---
  {
    id: 9,
    title: "戦慄のお化け屋敷",
    category: "クラス企画",
    subcategory: "アトラクション",
    grade: "3年",
    dept: "機械",
    location: "711・712教室",
    zoneId: "building7",
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
    dept: "電気",
    location: "123教室",
    zoneId: "building1",
    description: "3Eみんなでワイワイ楽しめる対戦ゲーム＆懐かしのレトロゲームを取り揃えた憩いの空間！",
    icon: "🎮",
    menu: ["フリープレイ＋フリードリンク"]
  },
  {
    id: 11,
    title: "ナイトスタイル BAR",
    category: "クラス企画",
    subcategory: "カフェ・ドリンク",
    grade: "3年",
    dept: "情報",
    location: "132教室",
    zoneId: "building1",
    description: "3Iシックで大人っぽい雰囲気の中で楽しむオリジナルノンアルコールカクテル専門店！",
    icon: "🍸",
    menu: ["サイバーブルーカクテル", "ネオンピンクソーダ", "ミックスナッツ"]
  },
  {
    id: 12,
    title: "レトロ昭和喫茶",
    category: "クラス企画",
    subcategory: "カフェ・レトロ",
    grade: "3年",
    dept: "物質",
    location: "133教室",
    zoneId: "building1",
    description: "3Bほっと一息つける純喫茶風レトロ空間。本格ドリップコーヒーとクリームソーダをご用意。",
    icon: "☕",
    menu: ["昭和クリームソーダ", "ハンドドリップコーヒー", "自家製プリン"]
  },

  // --- 4年 (クラス企画) ---
  {
    id: 13,
    title: "高専ホストクラブ★",
    category: "クラス企画",
    subcategory: "エンタメ",
    grade: "4年",
    dept: "機械",
    location: "113教室",
    zoneId: "building1",
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
    dept: "電気",
    location: "722教室",
    zoneId: "building7",
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
    dept: "情報",
    location: "131教室",
    zoneId: "building1",
    description: "4I本格ディーラーがお出迎え！ポーカー・ブラックジャックで繰り広げられる大人の心理戦！",
    icon: "🎲",
    menu: ["カジノチップセット"]
  },
  {
    id: 16,
    title: "高専版・格付けチェック",
    category: "クラス企画",
    subcategory: "バラエティ",
    grade: "4年",
    dept: "物質",
    location: "マルチメディア教室",
    zoneId: "multi",
    description: "4Bあなたの一流度が試される！高級品と激安品を見破れるか！？全問正解で「一流高専生」の称号を！",
    icon: "🍷",
    menu: ["格付け挑戦チケット"]
  },

  // --- 部活動 ---
  {
    id: 20,
    title: "ロボット体験＆超科学射的",
    category: "クラス企画",
    subcategory: "部活動体験",
    grade: "部活",
    dept: "ロボコン部",
    location: "実習棟 1F",
    zoneId: "lab",
    description: "高専ロボコン出場機体を実際に自分で操縦しよう！精密メカでターゲットを打ち抜く射的ゲームも同時開催！",
    icon: "🤖",
    menu: ["操縦体験", "射的ゲーム"]
  }
];

// タイムスケジュールデータ
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
    location: "中庭（雨天時: 視聴覚教室）",
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

// キャンパスマップゾーン定義
const MAP_ZONES = [
  { id: "all", name: "キャンパス全体", desc: "すべてのエリア" },
  { id: "entrance", name: "学生昇降口前", desc: "キッチンカーエリア" },
  { id: "gym1", name: "第一体育館", desc: "メインステージ & 2年模擬店" },
  { id: "building1", name: "1号館", desc: "1年模擬店 / 3年・4年企画" },
  { id: "building7", name: "7号館", desc: "お化け屋敷・キッキングスナイパー" },
  { id: "multi", name: "マルチメディア教室", desc: "4B 格付けチェック" },
  { id: "lab", name: "実習棟 1F", desc: "ロボコン部体験" }
];

export default function App() {
  const [isEntered, setIsEntered] = useState(false);
  const [activeTab, setActiveTab] = useState("stalls"); // 'map' | 'stalls' | 'events' | 'guide'

  // フィルター・検索ステート
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("すべて");
  const [selectedGrade, setSelectedGrade] = useState("すべて");
  const [selectedDept, setSelectedDept] = useState("すべて");
  const [favorites, setFavorites] = useState([]);
  const [activeMapZone, setActiveMapZone] = useState("all");
  const [modalItem, setModalItem] = useState(null);
  const [copiedNotification, setCopiedNotification] = useState(false);

  // お気に入りトグル
  const toggleFavorite = (id, e) => {
    if (e) e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // フィルタリング計算
  const filteredStalls = useMemo(() => {
    return STALLS_DATA.filter((stall) => {
      const matchSearch =
        stall.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stall.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stall.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stall.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (stall.menu && stall.menu.some(m => m.toLowerCase().includes(searchQuery.toLowerCase())));

      const matchCategory =
        selectedCategory === "すべて"
          ? true
          : selectedCategory === "お気に入り"
          ? favorites.includes(stall.id)
          : stall.category === selectedCategory;

      const matchGrade = selectedGrade === "すべて" || stall.grade === selectedGrade;
      const matchDept = selectedDept === "すべて" || stall.dept === selectedDept;
      const matchZone = activeMapZone === "all" || stall.zoneId === activeMapZone;

      return matchSearch && matchCategory && matchGrade && matchDept && matchZone;
    });
  }, [searchQuery, selectedCategory, selectedGrade, selectedDept, favorites, activeMapZone]);

  // シェア用ダミーコピー処理
  const handleShare = (item) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`鶴岡高専祭2026: ${item.title} (${item.location})`);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2000);
    }
  };

  // ----------------------------------------------------
  // 1. ランディング（トップ）画面
  // ----------------------------------------------------
  if (!isEntered) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center relative overflow-hidden px-6 text-center select-none font-sans">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Dela+Gothic+One&family=M+PLUS+Rounded+1c:wght@700;800;900&display=swap');

          .font-pop {
            font-family: 'Dela Gothic One', 'M PLUS Rounded 1c', sans-serif;
          }

          @keyframes charPopIn {
            0% {
              opacity: 0;
              transform: translateY(24px) scale(0.6);
            }
            70% {
              opacity: 1;
              transform: translateY(-6px) scale(1.1);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(24px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes spinSlow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes floatSlow {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-12px) rotate(6deg); }
          }
          @keyframes pulseGlow {
            0%, 100% { opacity: 0.4; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.05); }
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
            animation: spinSlow 16s linear infinite;
          }
          .animate-float-icon {
            animation: floatSlow 4s ease-in-out infinite;
          }
          .animate-float-delayed {
            animation: floatSlow 5s ease-in-out 2s infinite;
          }
          .animate-pulse-glow {
            animation: pulseGlow 3s ease-in-out infinite;
          }
        `}</style>

        {/* 背景のグラデーション・ネオンエフェクト */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900/50 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse-glow pointer-events-none" />

        {/* 背景装飾（高専らしい歯車や回路等のアイコン） */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          <div className="absolute top-6 -left-10 text-cyan-500/20 animate-spin-gear">
            <Cog className="w-36 h-36" />
          </div>
          <div
            className="absolute top-32 left-12 text-blue-400/20 animate-spin-gear"
            style={{ animationDirection: "reverse", animationDuration: "20s" }}
          >
            <Cog className="w-20 h-20" />
          </div>
          <div className="absolute top-12 right-8 text-sky-400/25 animate-float-icon">
            <Cpu className="w-16 h-16" />
          </div>
          <div className="absolute top-40 right-28 text-cyan-300/30 animate-float-delayed">
            <Zap className="w-10 h-10" />
          </div>
          <div className="absolute bottom-28 left-8 text-indigo-400/25 animate-float-delayed">
            <Code className="w-14 h-14" />
          </div>
          <div className="absolute bottom-44 left-24 text-sky-400/25 animate-float-icon">
            <Terminal className="w-10 h-10" />
          </div>
          <div
            className="absolute bottom-10 -right-8 text-cyan-500/20 animate-spin-gear"
            style={{ animationDuration: "24s" }}
          >
            <Cog className="w-32 h-32" />
          </div>
          <div className="absolute bottom-36 right-20 text-blue-400/30 animate-float-icon">
            <Bot className="w-12 h-12" />
          </div>
          <div className="absolute bottom-12 right-32 text-sky-300/30 animate-float-delayed">
            <Wrench className="w-9 h-9 -rotate-45" />
          </div>
        </div>

        {/* ヘッダーサブタイトル */}
        <div
          className="animate-fade inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-bold mb-4 tracking-wider z-10 shadow-lg shadow-cyan-500/10"
          style={{ animationDelay: "0.1s" }}
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
          <span>TSURUOKA KOSEN FESTIVAL 2026</span>
        </div>

        {/* メインタイトル */}
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

        {/* 開催情報カード */}
        <div
          className="animate-fade bg-slate-900/90 backdrop-blur-md border border-cyan-500/30 shadow-xl shadow-cyan-950/50 rounded-2xl px-6 py-3.5 flex flex-wrap items-center justify-center gap-3 mb-10 text-xs sm:text-sm font-bold text-slate-200 z-10"
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

        {/* 入場ボタン */}
        <div className="animate-fade z-10" style={{ animationDelay: "1.4s" }}>
          <button
            onClick={() => setIsEntered(true)}
            className="font-pop group relative w-64 sm:w-72 py-4 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white text-lg tracking-widest shadow-xl shadow-blue-500/40 hover:shadow-cyan-400/50 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 border border-cyan-300/40 overflow-hidden"
          >
            <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
            <span>入場する</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <p
          className="animate-fade mt-6 text-xs text-slate-400 font-medium z-10 flex items-center gap-1"
          style={{ animationDelay: "1.6s" }}
        >
          <Info className="w-3.5 h-3.5 text-cyan-400" />
          <span>タップして模擬店・キッチンカー・イベントを閲覧！</span>
        </p>
      </div>
    );
  }

  // ----------------------------------------------------
  // 2. メインアプリ画面
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 pb-20 font-sans selection:bg-cyan-500 selection:text-white">
      {/* 上部ヘッダー */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-lg text-white">
        <div className="max-w-2xl mx-auto px-4 py-2.5 flex items-center justify-between gap-2">
          {/* ロゴ・トップへ戻るボタン */}
          <button
            onClick={() => setIsEntered(false)}
            className="flex items-center gap-2 hover:opacity-80 transition text-left group"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-black text-white text-sm shadow-md group-hover:scale-105 transition">
              高
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-black text-sm text-cyan-300 tracking-tight flex items-center gap-1">
                熱狂の高専祭
                <span className="text-[10px] font-normal px-1.5 py-0.2 bg-blue-900/80 text-cyan-200 rounded border border-cyan-500/30">2026</span>
              </span>
              <span className="text-[10px] text-slate-400 tracking-widest -mt-0.5">
                カーニバル @鶴岡高専
              </span>
            </div>
          </button>

          {/* メインナビゲーションタブ */}
          <nav className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-full border border-slate-700">
            <button
              onClick={() => setActiveTab("stalls")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === "stalls"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow"
                  : "text-slate-300 hover:text-white hover:bg-slate-700/50"
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>企画・店舗</span>
            </button>

            <button
              onClick={() => setActiveTab("map")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === "map"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow"
                  : "text-slate-300 hover:text-white hover:bg-slate-700/50"
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span>マップ</span>
            </button>

            <button
              onClick={() => setActiveTab("events")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === "events"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow"
                  : "text-slate-300 hover:text-white hover:bg-slate-700/50"
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>ステージ</span>
            </button>

            <button
              onClick={() => setActiveTab("guide")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === "guide"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow"
                  : "text-slate-300 hover:text-white hover:bg-slate-700/50"
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>案内</span>
            </button>
          </nav>
        </div>
      </header>

      {/* メインコンテンツエリア */}
      <main className="max-w-2xl mx-auto px-4 pt-4 pb-12 space-y-4">

        {/* ========================================================= */}
        {/* TAB 1: 企画・店舗・キッチンカー 一覧 & 検索              */}
        {/* ========================================================= */}
        {activeTab === "stalls" && (
          <div className="space-y-4">
            {/* メインカテゴリー選択タブ */}
            <div className="grid grid-cols-5 gap-1.5 bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200">
              <button
                onClick={() => setSelectedCategory("すべて")}
                className={`flex flex-col items-center justify-center py-2 rounded-xl text-[11px] font-bold transition-all ${
                  selectedCategory === "すべて"
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Store className="w-4 h-4 mb-0.5" />
                全体
              </button>

              <button
                onClick={() => setSelectedCategory("模擬店")}
                className={`flex flex-col items-center justify-center py-2 rounded-xl text-[11px] font-bold transition-all ${
                  selectedCategory === "模擬店"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-blue-600 hover:bg-blue-50"
                }`}
              >
                <Utensils className="w-4 h-4 mb-0.5" />
                模擬店
              </button>

              <button
                onClick={() => setSelectedCategory("クラス企画")}
                className={`flex flex-col items-center justify-center py-2 rounded-xl text-[11px] font-bold transition-all ${
                  selectedCategory === "クラス企画"
                    ? "bg-purple-600 text-white shadow-sm"
                    : "text-purple-600 hover:bg-purple-50"
                }`}
              >
                <Sparkles className="w-4 h-4 mb-0.5" />
                企画
              </button>

              <button
                onClick={() => setSelectedCategory("キッチンカー")}
                className={`flex flex-col items-center justify-center py-2 rounded-xl text-[11px] font-bold transition-all relative ${
                  selectedCategory === "キッチンカー"
                    ? "bg-amber-500 text-white shadow-sm"
                    : "text-amber-600 hover:bg-amber-50"
                }`}
              >
                <Truck className="w-4 h-4 mb-0.5" />
                <span>🚚 車</span>
              </button>

              <button
                onClick={() => setSelectedCategory("お気に入り")}
                className={`flex flex-col items-center justify-center py-2 rounded-xl text-[11px] font-bold transition-all relative ${
                  selectedCategory === "お気に入り"
                    ? "bg-rose-500 text-white shadow-sm"
                    : "text-rose-600 hover:bg-rose-50"
                }`}
              >
                <Heart className="w-4 h-4 mb-0.5" />
                <span>キープ ({favorites.length})</span>
              </button>
            </div>

            {/* キーワード検索バー */}
            <div className="relative">
              <Search className="absolute left-3.5 top-3 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="店名、メニュー、場所などで検索 (例: ラーメン, 体育館)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-sm text-xs font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* サブフィルター (学年 & 学科) */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm space-y-2.5">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400 font-bold w-12 text-[11px] shrink-0">学年</span>
                <div className="flex gap-1 flex-wrap">
                  {["すべて", "1年", "2年", "3年", "4年", "外部", "部活"].map((g) => (
                    <button
                      key={g}
                      onClick={() => setSelectedGrade(g)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition ${
                        selectedGrade === g
                          ? "bg-slate-900 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs pt-1 border-t border-slate-100">
                <span className="text-slate-400 font-bold w-12 text-[11px] shrink-0">学科</span>
                <div className="flex gap-1 flex-wrap">
                  {["すべて", "機械", "電気", "情報", "物質"].map((d) => (
                    <button
                      key={d}
                      onClick={() => setSelectedDept(d)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition ${
                        selectedDept === d
                          ? "bg-blue-600 text-white"
                          : "bg-blue-50 text-blue-800 hover:bg-blue-100"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 企画・店舗カード一覧 */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold text-slate-500">
                  該当結果: <strong className="text-slate-900 font-extrabold">{filteredStalls.length}</strong> 件
                </span>
                {activeMapZone !== "all" && (
                  <button
                    onClick={() => setActiveMapZone("all")}
                    className="text-[11px] text-blue-600 font-bold hover:underline flex items-center gap-0.5"
                  >
                    <span>エリア絞り込み解除</span>
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {filteredStalls.length === 0 ? (
                <div className="bg-white p-8 rounded-3xl text-center text-slate-400 font-bold text-xs shadow-sm space-y-2">
                  <div className="text-3xl">🔍</div>
                  <p>条件に一致する模擬店・企画が見つかりませんでした。</p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("すべて");
                      setSelectedGrade("すべて");
                      setSelectedDept("すべて");
                      setActiveMapZone("all");
                    }}
                    className="mt-2 px-4 py-2 bg-slate-900 text-white rounded-full text-xs font-bold"
                  >
                    フィルターをリセット
                  </button>
                </div>
              ) : (
                filteredStalls.map((item) => {
                  const isFav = favorites.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => setModalItem(item)}
                      className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 hover:shadow-md transition cursor-pointer relative overflow-hidden group"
                    >
                      <div className="flex items-start gap-3.5">
                        {/* 絵文字アイコン */}
                        <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-slate-50 to-sky-100 flex items-center justify-center text-3xl shrink-0 border border-slate-200/60 shadow-inner group-hover:scale-105 transition">
                          {item.icon}
                        </div>

                        {/* 詳細コンテンツ */}
                        <div className="flex-1 space-y-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span
                              className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                                item.category === "模擬店"
                                  ? "bg-blue-600 text-white"
                                  : item.category === "クラス企画"
                                  ? "bg-purple-600 text-white"
                                  : "bg-amber-500 text-white"
                              }`}
                            >
                              {item.category}
                            </span>

                            <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                              {item.subcategory}
                            </span>

                            <span className="text-[11px] font-extrabold text-slate-500 ml-auto flex items-center gap-0.5">
                              <MapPin className="w-3 h-3 text-rose-500" />
                              {item.location}
                            </span>
                          </div>

                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-black text-base text-slate-900 truncate">
                              {item.title}
                            </h3>

                            {/* お気に入りハートボタン */}
                            <button
                              onClick={(e) => toggleFavorite(item.id, e)}
                              className="p-1.5 hover:bg-rose-50 rounded-full transition shrink-0"
                            >
                              <Heart
                                className={`w-5 h-5 transition ${
                                  isFav
                                    ? "fill-rose-500 text-rose-500 scale-110"
                                    : "text-slate-300 hover:text-slate-400"
                                }`}
                              />
                            </button>
                          </div>

                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>

                          {/* Instagram リンクボタン (キッチンカーの場合目立たせる) */}
                          {item.instagram && (
                            <div className="pt-2 flex items-center gap-2">
                              <a
                                href={item.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white text-xs font-extrabold shadow-sm hover:opacity-95 transition"
                              >
                                <Instagram className="w-3.5 h-3.5" />
                                <span>公式Instagramをみる</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                        <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                          主催: {item.dept} ({item.grade})
                        </span>
                        <span className="text-cyan-600 font-bold flex items-center gap-0.5 group-hover:translate-x-1 transition">
                          詳細を見る <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: インタラクティブ・キャンパスマップ                */}
        {/* ========================================================= */}
        {activeTab === "map" && (
          <div className="space-y-4">
            <div className="bg-slate-900 text-white rounded-3xl p-5 shadow-lg relative overflow-hidden">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-[10px] font-bold tracking-widest text-cyan-400 uppercase">
                    TSURUOKA KOSEN MAP
                  </span>
                  <h2 className="text-xl font-black">キャンパス構内マップ</h2>
                </div>
                <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] px-2.5 py-1 rounded-full font-bold">
                  タップでエリア選択
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                以下のエリアボタンまたはマップピンをタップして、各スポットに出店している模擬店・企画を絞り込めます。
              </p>
            </div>

            {/* エリアフィルターピル */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {MAP_ZONES.map((zone) => (
                <button
                  key={zone.id}
                  onClick={() => setActiveMapZone(zone.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition border ${
                    activeMapZone === zone.id
                      ? "bg-cyan-500 text-slate-950 border-cyan-400 font-extrabold shadow-md"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {zone.name}
                </button>
              ))}
            </div>

            {/* 視覚的ビジュアルマップ */}
            <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-4 relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden shadow-inner flex flex-col justify-between">
              {/* 背景グリッド */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-40 pointer-events-none" />

              {/* マップタイトル・凡例 */}
              <div className="relative z-10 flex items-center justify-between text-xs font-bold text-slate-400">
                <span className="flex items-center gap-1 text-cyan-400">
                  <MapPin className="w-4 h-4" /> 鶴岡高専 校内案内図
                </span>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">北 ↑</span>
              </div>

              {/* 簡易構内レイアウト配置 (グラフィカル・インタラクティブ) */}
              <div className="relative z-10 grid grid-cols-3 grid-rows-3 gap-2 h-full my-2">
                {/* 1号館 */}
                <button
                  onClick={() => setActiveMapZone("building1")}
                  className={`col-span-2 row-span-1 rounded-2xl border p-2 text-left transition relative overflow-hidden flex flex-col justify-between ${
                    activeMapZone === "building1"
                      ? "bg-cyan-600/40 border-cyan-400 text-cyan-200 shadow-lg ring-2 ring-cyan-400"
                      : "bg-slate-800/80 border-slate-700 text-slate-200 hover:border-slate-500"
                  }`}
                >
                  <span className="font-extrabold text-xs">🏫 1号館 (教室棟)</span>
                  <span className="text-[10px] opacity-80">1年模擬店 / 3年・4年企画</span>
                </button>

                {/* 実習棟 */}
                <button
                  onClick={() => setActiveMapZone("lab")}
                  className={`col-span-1 row-span-1 rounded-2xl border p-2 text-left transition flex flex-col justify-between ${
                    activeMapZone === "lab"
                      ? "bg-cyan-600/40 border-cyan-400 text-cyan-200 shadow-lg ring-2 ring-cyan-400"
                      : "bg-slate-800/80 border-slate-700 text-slate-200 hover:border-slate-500"
                  }`}
                >
                  <span className="font-extrabold text-xs">🤖 実習棟</span>
                  <span className="text-[10px] opacity-80">ロボコン体験</span>
                </button>

                {/* 7号館 */}
                <button
                  onClick={() => setActiveMapZone("building7")}
                  className={`col-span-1 row-span-1 rounded-2xl border p-2 text-left transition flex flex-col justify-between ${
                    activeMapZone === "building7"
                      ? "bg-cyan-600/40 border-cyan-400 text-cyan-200 shadow-lg ring-2 ring-cyan-400"
                      : "bg-slate-800/80 border-slate-700 text-slate-200 hover:border-slate-500"
                  }`}
                >
                  <span className="font-extrabold text-xs">👻 7号館</span>
                  <span className="text-[10px] opacity-80">お化け屋敷・他</span>
                </button>

                {/* マルチメディア教室 */}
                <button
                  onClick={() => setActiveMapZone("multi")}
                  className={`col-span-1 row-span-1 rounded-2xl border p-2 text-left transition flex flex-col justify-between ${
                    activeMapZone === "multi"
                      ? "bg-cyan-600/40 border-cyan-400 text-cyan-200 shadow-lg ring-2 ring-cyan-400"
                      : "bg-slate-800/80 border-slate-700 text-slate-200 hover:border-slate-500"
                  }`}
                >
                  <span className="font-extrabold text-xs">🍷 マルチ棟</span>
                  <span className="text-[10px] opacity-80">格付けチェック</span>
                </button>

                {/* 第一体育館 (メイン) */}
                <button
                  onClick={() => setActiveMapZone("gym1")}
                  className={`col-span-1 row-span-2 rounded-2xl border p-2 text-left transition flex flex-col justify-between ${
                    activeMapZone === "gym1"
                      ? "bg-blue-600/40 border-blue-400 text-blue-200 shadow-lg ring-2 ring-blue-400"
                      : "bg-slate-800/80 border-slate-700 text-slate-200 hover:border-slate-500"
                  }`}
                >
                  <span className="font-extrabold text-xs text-amber-300">🏟️ 第一体育館</span>
                  <span className="text-[10px] opacity-80">メインステージ / 2年模擬店</span>
                </button>

                {/* 学生昇降口前 (キッチンカー) */}
                <button
                  onClick={() => setActiveMapZone("entrance")}
                  className={`col-span-2 row-span-1 rounded-2xl border p-2.5 text-left transition flex items-center justify-between ${
                    activeMapZone === "entrance"
                      ? "bg-amber-500/30 border-amber-400 text-amber-200 shadow-lg ring-2 ring-amber-400"
                      : "bg-amber-950/40 border-amber-800/60 text-amber-200 hover:border-amber-600"
                  }`}
                >
                  <div>
                    <span className="font-black text-xs block text-amber-300">
                      🚚 学生昇降口前 (キッチンカーエリア)
                    </span>
                    <span className="text-[10px] opacity-90">ラーメン / 祇園はんなりCafé / フェリチタプラス</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-amber-300" />
                </button>
              </div>

              <div className="relative z-10 text-center text-[10px] text-slate-400 font-bold">
                ※該当エリアをタップすると下のリストが自動更新されます
              </div>
            </div>

            {/* 選択中のエリアの店舗リスト */}
            <div className="space-y-3 pt-2">
              <h3 className="font-black text-sm text-slate-800 flex items-center justify-between px-1">
                <span>選択中: {MAP_ZONES.find((z) => z.id === activeMapZone)?.name}</span>
                <span className="text-xs font-normal text-slate-500">
                  {filteredStalls.length} 件
                </span>
              </h3>

              <div className="space-y-2.5">
                {filteredStalls.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setModalItem(item)}
                    className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between hover:shadow-md transition cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-2xl shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-900">{item.title}</h4>
                        <p className="text-xs text-slate-500 font-medium">
                          📍 {item.location} ({item.grade})
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100 shrink-0">
                      {item.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: イベントステージ タイムテーブル                    */}
        {/* ========================================================= */}
        {activeTab === "events" && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-5 text-white shadow-lg relative overflow-hidden">
              <span className="text-[10px] font-bold tracking-widest text-cyan-400 uppercase">
                STAGE SCHEDULE
              </span>
              <h2 className="text-xl font-black mt-0.5">2026.10.24 (土) タイムスケジュール</h2>
              <p className="text-xs text-slate-300 mt-1">
                第一体育館メインステージ ＆ 中庭サブステージの全演目プログラム
              </p>
            </div>

            {EVENTS_DATA.map((stage) => (
              <div key={stage.stageId} className="space-y-3">
                <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${stage.badgeColor}`} />
                      <h3 className="font-black text-base text-slate-900">{stage.stageName}</h3>
                    </div>
                    <span className="text-xs font-extrabold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                      📍 {stage.location}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1.5 font-medium">{stage.note}</p>
                </div>

                <div className="space-y-3 pl-2 border-l-2 border-blue-200 ml-3">
                  {stage.schedule.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm relative ml-3 hover:shadow-md transition space-y-2"
                    >
                      {/* タイムラインのポインター */}
                      <div className="absolute -left-[25px] top-5 w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow-sm" />

                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1 font-black text-sm text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                          <Clock className="w-3.5 h-3.5" />
                          {item.time}
                        </span>

                        <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {item.tag}
                        </span>
                      </div>

                      <div className="flex items-start gap-2.5 pt-1">
                        <span className="text-2xl shrink-0">{item.icon}</span>
                        <div>
                          <h4 className="font-black text-base text-slate-900 leading-snug">
                            {item.title}
                          </h4>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-100 text-xs font-bold text-slate-400 flex justify-between">
                        <span>出演・主催: {item.org}</span>
                        <span>@{stage.location}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: ご案内・その他 (公式Instagram・注意事項)           */}
        {/* ========================================================= */}
        {activeTab === "guide" && (
          <div className="space-y-4">
            {/* 高専祭 公式Instagramカード */}
            <div className="bg-gradient-to-r from-purple-700 via-pink-600 to-amber-500 rounded-3xl p-5 text-white shadow-lg space-y-3 relative overflow-hidden">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl border border-white/30 shrink-0 shadow">
                  📸
                </div>
                <div>
                  <h2 className="font-black text-lg">高専祭 公式Instagram</h2>
                  <p className="text-xs text-white/90">当日の様子や最新アナウンスをリアルタイム配信中！</p>
                </div>
              </div>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-2xl bg-white text-purple-700 font-extrabold text-xs shadow-md hover:bg-slate-50 transition flex items-center justify-center gap-2"
              >
                <Instagram className="w-4 h-4" />
                <span>公式Instagramアカウントを開く</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* ご来場者様へのお知らせ・注意事項 */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-black text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <Info className="w-5 h-5 text-cyan-600" />
                <span>ご来場される皆様へのご案内</span>
              </h3>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-amber-50 border border-amber-200/60">
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-sm shrink-0">
                    👟
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">上履き・スリッパのご持参</h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      校内（校舎棟・体育館）は全館一律で<strong>土足厳禁</strong>となっております。ご来場の際は必ず上履き（スリッパ等）および下駄箱用の靴袋をご持参ください。
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-blue-50 border border-blue-200/60">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                    🚲
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">自転車でご来場の方</h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      校門を入って右手の指定駐輪場をご利用ください。敷地内での路上駐輪は固くお断りいたします。
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center font-bold text-sm shrink-0">
                    🚗
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">お車でご来場の方</h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      構内グラウンド横に臨時駐車場を設けておりますが、台数に限りがございます。可能な限り公共交通機関や乗り合わせでのご来場をお願い申し上げます。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 開催概要カード */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-2 text-xs">
              <h3 className="font-black text-sm text-slate-900 mb-2">開催概要</h3>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">イベント名</span>
                <span className="font-bold text-slate-800">鶴岡高専 高専祭2026</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">テーマ</span>
                <span className="font-bold text-slate-800">熱狂の高専祭カーニバル</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">日時</span>
                <span className="font-bold text-slate-800">2026年10月24日(土) 9:30-15:30</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">会場</span>
                <span className="font-bold text-slate-800">独立行政法人国立高等専門学校機構 鶴岡工業高等専門学校</span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================= */}
      {/* 3. モーダルダイアログ (企画・店舗の詳細表示)             */}
      {/* ========================================================= */}
      {}
      {modalItem && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade"
          onClick={() => setModalItem(null)}
        >
          <div
            className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl p-6 space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* モーダルヘッダー */}
            <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-100 to-blue-50 flex items-center justify-center text-3xl shrink-0 border border-blue-200">
                  {modalItem.icon}
                </div>
                <div>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-blue-600 text-white">
                    {modalItem.category}
                  </span>
                  <h3 className="font-black text-lg text-slate-900 mt-0.5">
                    {modalItem.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-bold">
                    主催: {modalItem.dept} ({modalItem.grade})
                  </p>
                </div>
              </div>

              <button
                onClick={() => setModalItem(null)}
                className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* モーダル本文 */}
            <div className="space-y-3">
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-bold">場所・教室</span>
                <span className="font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                  📍 {modalItem.location}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-xs text-slate-400 mb-1">紹介文</h4>
                <p className="text-sm text-slate-700 leading-relaxed font-medium bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  {modalItem.description}
                </p>
              </div>

              {/* メニュー・提供内容がある場合 */}
              {modalItem.menu && modalItem.menu.length > 0 && (
                <div>
                  <h4 className="font-bold text-xs text-slate-400 mb-1.5">提供メニュー・内容</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {modalItem.menu.map((m, idx) => (
                      <span
                        key={idx}
                        className="bg-sky-50 text-sky-900 border border-sky-200 text-xs px-3 py-1 rounded-full font-bold"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* キッチンカー専用 Instagram ボタン */}
              {modalItem.instagram && (
                <div className="pt-2">
                  <a
                    href={modalItem.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-black text-xs shadow-md hover:opacity-95 transition flex items-center justify-center gap-2"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>公式Instagramで最新情報をチェック！</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>

            {/* モーダルアクション */}
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={(e) => toggleFavorite(modalItem.id, e)}
                className={`flex-1 py-3 rounded-2xl font-black text-xs transition flex items-center justify-center gap-2 border ${
                  favorites.includes(modalItem.id)
                    ? "bg-rose-50 text-rose-600 border-rose-200"
                    : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${
                    favorites.includes(modalItem.id) ? "fill-rose-500 text-rose-500" : ""
                  }`}
                />
                <span>
                  {favorites.includes(modalItem.id) ? "キープ済み" : "お気に入りに追加"}
                </span>
              </button>

              <button
                onClick={() => handleShare(modalItem)}
                className="py-3 px-4 rounded-2xl bg-slate-900 text-white font-black text-xs hover:bg-slate-800 transition flex items-center justify-center gap-1.5"
              >
                <Share2 className="w-4 h-4" />
                <span>共有</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* コピー完了トースト通知 */}
      {copiedNotification && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-2xl z-50 flex items-center gap-2 border border-slate-700 animate-fade">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>クリップボードにコピーしました！</span>
        </div>
      )}
    </div>
  );
}