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
  Camera, // ⭕ Instagramの代わりにCamera等を使用（またはSVGアイコン）
} from "lucide-react";

// 全企画・店舗データ
const STALLS_DATA = [
  // --- キッチンカー (学生昇降口前) ---
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

  // --- 1年 (クラス模擬店 - 1号館1F) ---
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

  // --- 2年 (クラス模擬店 - 第一体育館) ---
  {
    id: 5,
    title: "パリッとジューシー餃子",
    category: "模擬店",
    subcategory: "フード",
    grade: "2年",
    dept: "機械",
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
    dept: "電気",
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
    dept: "情報",
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
    dept: "物質",
    location: "第一体育館 模擬店エリア",
    zoneId: "gym1",
    description: "2B（物質工学科）香ばしく焼き上げる秘伝タレ＆塩のやみつき焼き鳥！",
    icon: "🍢",
    menu: ["ももタレ", "皮塩", "つくね"]
  },

  // --- 3年・4年 (クラス企画) ---
  {
    id: 9,
    title: "戦慄のお化け屋敷 - 廃病棟の迷宮 -",
    category: "クラス企画",
    subcategory: "アトラクション",
    grade: "3年",
    dept: "機械",
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
    dept: "電気",
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
    dept: "情報",
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
    dept: "物質",
    location: "1号館 2F (133教室)",
    zoneId: "bldg1",
    description: "3Bほっと一息つける純喫茶風レトロ空間。本格ドリップコーヒーとクリームソーダをご用意。",
    icon: "☕",
    menu: ["昭和クリームソーダ", "ハンドドリップコーヒー", "自家製プリン"]
  },
  {
    id: 13,
    title: "高専ホストクラブ★",
    category: "クラス企画",
    subcategory: "エンタメ",
    grade: "4年",
    dept: "機械",
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
    dept: "電気",
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
    dept: "情報",
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
    dept: "物質",
    location: "総合メディアセンター 1F",
    zoneId: "media",
    description: "4Bあなたの一流度が試される！高級品と激安品を見破れるか！？全問正解で「一流高専生」の称号を！",
    icon: "🍷",
    menu: ["格付け挑戦チケット"]
  },

  // --- 部活動・展示 ---
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

// キャンパスマップの各建屋・エリアの正確な定義データ
const CAMPUS_ZONES = [
  {
    id: "entrance",
    name: "学生昇降口前広場",
    subName: "キッチンカーエリア",
    color: "#f59e0b",
    lightBg: "bg-amber-500/10 border-amber-500/40 text-amber-300",
    icon: "🚚",
    floors: ["屋外広場"],
    desc: "人気のキッチンカー3店が集結！ラーメン、わらび餅、ガパオライス＆ドリンク！"
  },
  {
    id: "bldg1",
    name: "1号館",
    subName: "一般教室棟・管理棟",
    color: "#3b82f6",
    lightBg: "bg-blue-500/10 border-blue-500/40 text-blue-300",
    icon: "🏫",
    floors: ["1F: 1年生模擬店 / 3年・4年企画", "2F: 事務局・3I/3B/4Iクラス企画"],
    desc: "キャンパスの中央に位置するメイン校舎。1Fにほっとサンドやクレープ、2FにカジノやBAR！"
  },
  {
    id: "gym1",
    name: "第一体育館",
    subName: "メインステージ ＆ 2年模擬店",
    color: "#ef4444",
    lightBg: "bg-rose-500/10 border-rose-500/40 text-rose-300",
    icon: "🏟️",
    floors: ["アリーナ: ステージイベント", "周遊スペース: 2年クラス模擬店"],
    desc: "高専祭のメイン会場！オープニング、ダンス、軽音ライブと2年生の焼き餃子・焼き鳥など！"
  },
  {
    id: "bldg7",
    name: "7号館",
    subName: "アトラクション棟",
    color: "#a855f7",
    lightBg: "bg-purple-500/10 border-purple-500/40 text-purple-300",
    icon: "👻",
    floors: ["1F: 3M お化け屋敷", "2F: 4E キッキングスナイパー"],
    desc: "体験型アトラクション満載！機械科特製の恐怖お化け屋敷とキッキングスナイパー！"
  },
  {
    id: "media",
    name: "総合メディアセンター",
    subName: "図書館・メディアホール",
    color: "#06b6d4",
    lightBg: "bg-cyan-500/10 border-cyan-500/40 text-cyan-300",
    icon: "📚",
    floors: ["1F: 4B 高専版格付けチェック", "2F: 図書館"],
    desc: "静かな学習空間から大熱狂の体験ブースへ！4B主催『格付けチェック』を開催！"
  },
  {
    id: "factory",
    name: "機械実習工場 / 3号館",
    subName: "モノづくり・ロボット拠点",
    color: "#10b981",
    lightBg: "bg-emerald-500/10 border-emerald-500/40 text-emerald-300",
    icon: "⚙️",
    floors: ["1F: ロボコン部機体操縦＆超科学射的", "2F: CAD・設計室"],
    desc: "高専ならではのモノづくり体験！全国レベルのロボコン機体を操縦しよう！"
  },
  {
    id: "bldg2_4_5_6",
    name: "2・4・5・6・8号館",
    subName: "各学科専門棟 / 地域連携",
    color: "#64748b",
    lightBg: "bg-slate-500/10 border-slate-500/40 text-slate-300",
    icon: "🔬",
    floors: ["研究室・実験室・PC演習室"],
    desc: "電気電子・情報・物質の専門研究棟。作品展示や研究体験コーナー！"
  },
  {
    id: "cafeteria",
    name: "福利厚生棟・学食",
    subName: "食堂・売店・休憩スペース",
    color: "#f97316",
    lightBg: "bg-orange-500/10 border-orange-500/40 text-orange-300",
    icon: "🍔",
    floors: ["1F: 学食・売店", "2F: 学生ホール"],
    desc: "ご来場者の屋内休憩スペースや売店コーナーを完備。"
  },
  {
    id: "dorm",
    name: "鶴風寮 (学生寮)",
    subName: "男子寮・女子寮",
    color: "#ec4899",
    lightBg: "bg-pink-500/10 border-pink-500/40 text-pink-300",
    icon: "🏢",
    floors: ["1〜5号館"],
    desc: "全校生の多くが生活するキャンパス南東の寮エリア。（※一般立入制限あり）"
  },
  {
    id: "sports",
    name: "第二体育館 / 武道館 / グラウンド",
    subName: "屋外スポーツエリア",
    color: "#84cc16",
    lightBg: "bg-lime-500/10 border-lime-500/40 text-lime-300",
    icon: "⚽",
    floors: ["陸上競技場 / 第1・第2グラウンド / テニスコート"],
    desc: "南側に広がる広大な広場。臨時の一般来場者駐車場も併設。"
  },
  {
    id: "parking",
    name: "正門・駐車場・駐輪場",
    subName: "交通・受付アプローチ",
    color: "#0284c7",
    lightBg: "bg-sky-500/10 border-sky-500/40 text-sky-300",
    icon: "🅿️",
    floors: ["国道345号線側 正門 / 守衛室"],
    desc: "正門受付、自転車駐輪場、一般来場者用駐車場アプローチ。"
  }
];

export default function App() {
  const [isEntered, setIsEntered] = useState(false);
  const [activeTab, setActiveTab] = useState("map"); // 'map' | 'stalls' | 'events' | 'guide'

  // フィルター・検索ステート
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("すべて");
  const [selectedGrade, setSelectedGrade] = useState("すべて");
  const [selectedDept, setSelectedDept] = useState("すべて");
  const [favorites, setFavorites] = useState([]);
  const [selectedZoneId, setSelectedZoneId] = useState("entrance");
  const [modalItem, setModalItem] = useState(null);
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [mapFilterType, setMapFilterType] = useState("all"); // 'all' | 'food' | 'event' | 'stage'

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

      return matchSearch && matchCategory && matchGrade && matchDept;
    });
  }, [searchQuery, selectedCategory, selectedGrade, selectedDept, favorites]);

  // 選択されたZoneで絞り込んだ企画リスト
  const zoneStalls = useMemo(() => {
    return STALLS_DATA.filter((s) => s.zoneId === selectedZoneId);
  }, [selectedZoneId]);

  // シェア処理
  const handleShare = (item) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`鶴岡高専祭2026: ${item.title} (${item.location})`);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2000);
    }
  };

  // 選択中のZone情報
  const currentZone = CAMPUS_ZONES.find((z) => z.id === selectedZoneId) || CAMPUS_ZONES[0];

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

        {/* 背景グラデーション・ライト */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900/60 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse-glow pointer-events-none" />

        {/* 背景のメカニカル・ギミック背景 */}
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
            <span>アプリを起動する</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <p
          className="animate-fade mt-6 text-xs text-slate-400 font-medium z-10 flex items-center gap-1"
          style={{ animationDelay: "1.6s" }}
        >
          <Info className="w-3.5 h-3.5 text-cyan-400" />
          <span>インタラクティブ校内図でリアルタイム散策！</span>
        </p>
      </div>
    );
  }

  // ----------------------------------------------------
  // 2. メインアプリ画面
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-20 font-sans selection:bg-cyan-500 selection:text-white">
      {/* 上部固定ヘッダー */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 shadow-xl">
        <div className="max-w-2xl mx-auto px-4 py-2.5 flex items-center justify-between gap-2">
          {/* ロゴ・トップへ */}
          <button
            onClick={() => setIsEntered(false)}
            className="flex items-center gap-2.5 hover:opacity-80 transition text-left group shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center font-black text-white text-base shadow-md shadow-cyan-500/20 group-hover:scale-105 transition">
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

          {/* メインナビゲーションタブ */}
          <nav className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-full border border-slate-800">
            <button
              onClick={() => setActiveTab("map")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === "map"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span>校内マップ</span>
            </button>

            <button
              onClick={() => setActiveTab("stalls")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === "stalls"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>企画・店舗</span>
            </button>

            <button
              onClick={() => setActiveTab("events")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === "events"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>ステージ</span>
            </button>

            <button
              onClick={() => setActiveTab("guide")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === "guide"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
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
        {/* TAB 1: 超スタイリッシュ・グラフィカルキャンパスマップ      */}
        {/* ========================================================= */}
        {activeTab === "map" && (
          <div className="space-y-4">
            {/* 校内マップ タイトル＆フィルターヘッダー */}
            <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 rounded-3xl p-5 border border-slate-800 shadow-2xl relative overflow-hidden space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase flex items-center gap-1">
                    <Compass className="w-3 h-3 text-cyan-400 animate-spin-slow" />
                    TSURUOKA KOSEN MAP
                  </span>
                  <h2 className="text-xl font-black text-white mt-0.5 flex items-center gap-2">
                    鶴岡高専 構内イラスト図面
                  </h2>
                </div>
                <div className="flex items-center gap-1 text-[10px] bg-slate-800/80 px-2.5 py-1 rounded-full text-slate-300 border border-slate-700">
                  <Eye className="w-3 h-3 text-cyan-400" />
                  <span>建物をタップして詳細表示</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                実物の高専構内配置図に基づいたインタラクティブマップです。建屋をタップするとフロア案内の閲覧や模擬店・アトラクションの絞り込みができます。
              </p>

              {/* クイックカテゴリフィルター */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar pt-1 border-t border-slate-800">
                {[
                  { id: "all", label: "全体表示", icon: "🌐" },
                  { id: "food", label: "模擬店・グルメ", icon: "🍜" },
                  { id: "event", label: "企画・アトラクション", icon: "👻" },
                  { id: "stage", label: "ステージ会場", icon: "🏟️" }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setMapFilterType(f.id)}
                    className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition flex items-center gap-1 border ${
                      mapFilterType === f.id
                        ? "bg-cyan-500 text-slate-950 border-cyan-300 shadow-md shadow-cyan-500/20 font-extrabold"
                        : "bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800"
                    }`}
                  >
                    <span>{f.icon}</span>
                    <span>{f.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* ============================================================ */}
            {/* スタイリッシュ 2D ベクター風キャンパスマップ (SVG & Visual) */}
            {/* ============================================================ */}
            <div className="bg-slate-950 border-2 border-slate-800 rounded-3xl p-4 shadow-2xl relative overflow-hidden select-none">
              
              {/* 方位 & 国道345号線 (北側アプローチ) */}
              <div className="bg-slate-900/90 text-slate-200 text-[10px] font-bold py-1.5 px-3 rounded-xl flex justify-between items-center border border-slate-800 mb-3">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Navigation className="w-3.5 h-3.5 text-cyan-400 rotate-45" />
                  <span>🛣️ 北側: 国道345号線 / 正門アプローチ</span>
                </span>
                <span className="text-[9px] bg-cyan-950 text-cyan-300 font-extrabold px-2 py-0.5 rounded border border-cyan-800">
                  北 ↑
                </span>
              </div>

              {/* キャンパスグラフィック配置グリッド */}
              <div className="space-y-3">

                {/* --- NORTH ZONE: 正門・8号館・駐輪場・地域連携 --- */}
                <div className="grid grid-cols-12 gap-2">
                  <button
                    onClick={() => setSelectedZoneId("parking")}
                    className={`col-span-12 rounded-2xl p-2.5 text-left transition relative border ${
                      selectedZoneId === "parking"
                        ? "bg-sky-950/90 border-sky-400 text-white shadow-lg ring-2 ring-sky-400"
                        : "bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm">正門</span>
                        <span className="font-extrabold text-xs text-sky-300">
                          守衛室・駐輪場 / 8号館 (地域連携)
                        </span>
                      </div>
                      <span className="text-[9px] bg-sky-900 text-sky-200 font-bold px-2 py-0.5 rounded-full">
                        正門受付
                      </span>
                    </div>
                  </button>
                </div>

                {/* --- CENTER ZONE: 1号館 (メイン校舎) ＆ 前庭キッチンカー --- */}
                <div className="grid grid-cols-12 gap-2">
                  {/* 1号館 (中央横長) */}
                  <button
                    onClick={() => setSelectedZoneId("bldg1")}
                    className={`col-span-12 rounded-2xl p-3.5 text-left transition relative border overflow-hidden ${
                      selectedZoneId === "bldg1"
                        ? "bg-blue-950 border-blue-400 text-white shadow-xl ring-2 ring-blue-400"
                        : "bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-base">🏫</span>
                          <span className="font-black text-sm text-blue-300">1号館</span>
                          <span className="text-[10px] text-slate-400 font-semibold">
                            (一般教室棟・管理棟)
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 mt-1 font-medium">
                          1F: 111-123教室 (1年模擬店 / 3Eカフェ / 4Mホスト) <br />
                          2F: 131-133教室 (3I BAR / 3B純喫茶 / 4Iカジノ)
                        </p>
                      </div>
                      <span className="bg-blue-600 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-full shrink-0 shadow">
                        出店多数 ★
                      </span>
                    </div>
                  </button>

                  {/* 1号館前広場: キッチンカー */}
                  <button
                    onClick={() => setSelectedZoneId("entrance")}
                    className={`col-span-12 rounded-2xl p-3 text-left transition relative border ${
                      selectedZoneId === "entrance"
                        ? "bg-amber-950 border-amber-400 text-white shadow-xl ring-2 ring-amber-400"
                        : "bg-gradient-to-r from-amber-950/60 to-slate-900 border-amber-700/50 text-slate-100 hover:border-amber-500"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🚚</span>
                        <div>
                          <span className="font-extrabold text-xs text-amber-300 block">
                            1号館前・学生昇降口広場 (キッチンカー)
                          </span>
                          <span className="text-[10px] text-amber-200/90 font-medium">
                            ラーメンもっけだの / 祇園はんなりCafé / フェリチタプラス
                          </span>
                        </div>
                      </div>
                      <span className="bg-amber-500 text-slate-950 font-black text-[10px] px-2.5 py-1 rounded-full shrink-0 shadow">
                        人気No.1 グルメ
                      </span>
                    </div>
                  </button>
                </div>

                {/* --- MID-SOUTH ZONE: メディアセンター / 専門棟 / 第一体育館 --- */}
                <div className="grid grid-cols-12 gap-2">
                  
                  {/* 西側: 3号館＆機械実習工場 */}
                  <button
                    onClick={() => setSelectedZoneId("factory")}
                    className={`col-span-4 rounded-2xl p-2.5 text-left transition border flex flex-col justify-between ${
                      selectedZoneId === "factory"
                        ? "bg-emerald-950 border-emerald-400 text-white ring-2 ring-emerald-400 shadow-lg"
                        : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    <div>
                      <span className="text-xs font-extrabold text-emerald-300 block">
                        ⚙️ 3号館・実習工場
                      </span>
                      <p className="text-[10px] text-slate-400 mt-1">ロボコン操縦＆科学射的</p>
                    </div>
                    <span className="text-[9px] text-emerald-400 font-bold mt-2">1F 工場棟</span>
                  </button>

                  {/* 中央: 総合メディアセンター ＆ 福利厚生棟 */}
                  <div className="col-span-4 space-y-2">
                    <button
                      onClick={() => setSelectedZoneId("media")}
                      className={`w-full rounded-2xl p-2 text-left transition border ${
                        selectedZoneId === "media"
                          ? "bg-cyan-950 border-cyan-400 text-white ring-2 ring-cyan-400 shadow-lg"
                          : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                      }`}
                    >
                      <span className="text-xs font-black text-cyan-300 block">
                        📚 メディアセンター
                      </span>
                      <span className="text-[9px] text-slate-300">4B 格付けチェック</span>
                    </button>

                    <button
                      onClick={() => setSelectedZoneId("cafeteria")}
                      className={`w-full rounded-2xl p-2 text-left transition border ${
                        selectedZoneId === "cafeteria"
                          ? "bg-orange-950 border-orange-400 text-white ring-2 ring-orange-400 shadow-lg"
                          : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                      }`}
                    >
                      <span className="text-xs font-bold text-orange-300 block">
                        🍔 福利厚生棟 (学食)
                      </span>
                      <span className="text-[9px] text-slate-400">屋内休憩・売店</span>
                    </button>
                  </div>

                  {/* 東側: 第一体育館 (メインステージ＆2年模擬店) */}
                  <button
                    onClick={() => setSelectedZoneId("gym1")}
                    className={`col-span-4 rounded-2xl p-2.5 text-left transition border flex flex-col justify-between ${
                      selectedZoneId === "gym1"
                        ? "bg-rose-950 border-rose-400 text-white ring-2 ring-rose-400 shadow-xl"
                        : "bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-rose-300">🏟️ 第一体育館</span>
                      </div>
                      <p className="text-[10px] text-slate-300 mt-1 font-medium">
                        ・メインステージ <br />・2年模擬店 (餃子/焼き鳥/玉こん)
                      </p>
                    </div>
                    <span className="text-[9px] text-rose-400 font-extrabold mt-1">※上履き必須</span>
                  </button>

                </div>

                {/* --- EAST & SOUTH ZONE: 7号館 / 2・4・5・6号館 / 鶴風寮 / グラウンド --- */}
                <div className="grid grid-cols-12 gap-2">
                  
                  {/* 7号館 (アトラクション棟) */}
                  <button
                    onClick={() => setSelectedZoneId("bldg7")}
                    className={`col-span-5 rounded-2xl p-2.5 text-left transition border ${
                      selectedZoneId === "bldg7"
                        ? "bg-purple-950 border-purple-400 text-white ring-2 ring-purple-400 shadow-lg"
                        : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    <span className="text-xs font-black text-purple-300 block">
                      👻 7号館 (アトラクション)
                    </span>
                    <span className="text-[10px] text-slate-300 mt-0.5 block">
                      3Mお化け屋敷 / 4Eキッキング
                    </span>
                  </button>

                  {/* 2・4・5・6号館 */}
                  <button
                    onClick={() => setSelectedZoneId("bldg2_4_5_6")}
                    className={`col-span-7 rounded-2xl p-2.5 text-left transition border ${
                      selectedZoneId === "bldg2_4_5_6"
                        ? "bg-slate-800 border-slate-400 text-white ring-2 ring-slate-400"
                        : "bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <span className="text-xs font-bold text-slate-300 block">
                      🔬 2・4・5・6号館 (専門実験棟)
                    </span>
                    <span className="text-[10px] opacity-80">電気・情報・物質コース実験室</span>
                  </button>

                  {/* 南側: 第二体育館・グラウンド & 鶴風寮 */}
                  <button
                    onClick={() => setSelectedZoneId("sports")}
                    className={`col-span-7 rounded-2xl p-2 text-left transition border ${
                      selectedZoneId === "sports"
                        ? "bg-lime-950 border-lime-400 text-white ring-2 ring-lime-400"
                        : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <span className="text-xs font-bold text-lime-300 block">
                      ⚽ 第二体育館 / 武道館 / グラウンド
                    </span>
                    <span className="text-[9px] opacity-75">臨時駐車場併設エリア</span>
                  </button>

                  <button
                    onClick={() => setSelectedZoneId("dorm")}
                    className={`col-span-5 rounded-2xl p-2 text-left transition border ${
                      selectedZoneId === "dorm"
                        ? "bg-pink-950 border-pink-400 text-white ring-2 ring-pink-400"
                        : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <span className="text-xs font-bold text-pink-300 block">🏢 鶴風寮 (学生寮)</span>
                    <span className="text-[9px] opacity-75">キャンパス南東</span>
                  </button>

                </div>

              </div>

              <div className="text-center text-[10px] text-slate-500 font-bold pt-3 flex items-center justify-center gap-1">
                <Info className="w-3 h-3 text-cyan-400" />
                <span>マップ上の建物をタップすると、下の「建屋インスペクター」に企画が表示されます</span>
              </div>
            </div>

            {/* ============================================================ */}
            {/* 選択中の建屋・エリア インスペクター (詳細＆出店リスト)      */}
            {/* ============================================================ */}
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-4">
              {/* 建屋見出し */}
              <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-2xl border border-slate-800 shadow">
                    {currentZone.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-black tracking-wider text-cyan-400 uppercase">
                      ZONE INSPECTOR
                    </span>
                    <h3 className="text-lg font-black text-white">{currentZone.name}</h3>
                    <p className="text-xs text-slate-400 font-bold">{currentZone.subName}</p>
                  </div>
                </div>

                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${currentZone.lightBg}`}>
                  {zoneStalls.length} 件の企画
                </span>
              </div>

              {/* フロア構成・説明 */}
              <div className="space-y-2">
                <p className="text-xs text-slate-300 font-medium leading-relaxed bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
                  {currentZone.desc}
                </p>

                {currentZone.floors && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {currentZone.floors.map((fl, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-cyan-300"
                      >
                        📍 {fl}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* この建屋の出店・企画カードリスト */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-extrabold text-slate-400 tracking-wider uppercase">
                  【 {currentZone.name} 】で開催中のイベント・模擬店一覧
                </h4>

                {zoneStalls.length === 0 ? (
                  <div className="bg-slate-900/50 p-6 rounded-2xl text-center text-slate-500 font-bold text-xs border border-slate-800/80">
                    このエリアには展示・模擬店企画の登録がありません。（自由展示または展示準備中）
                  </div>
                ) : (
                  zoneStalls.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setModalItem(item)}
                      className="bg-slate-900 p-4 rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition cursor-pointer flex items-start gap-3.5 group shadow-sm"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-slate-950 flex items-center justify-center text-2xl shrink-0 border border-slate-800 group-hover:scale-105 transition">
                        {item.icon}
                      </div>

                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                              item.category === "模擬店"
                                ? "bg-blue-600 text-white"
                                : item.category === "クラス企画"
                                ? "bg-purple-600 text-white"
                                : "bg-amber-500 text-slate-950"
                            }`}
                          >
                            {item.category}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                            {item.subcategory}
                          </span>
                          <span className="text-[11px] font-bold text-cyan-400 ml-auto">
                            {item.location}
                          </span>
                        </div>

                        <h5 className="font-black text-sm text-white truncate group-hover:text-cyan-300 transition">
                          {item.title}
                        </h5>
                        <p className="text-xs text-slate-400 line-clamp-1">{item.description}</p>
                      </div>

                      <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition self-center shrink-0" />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: 企画・店舗・キッチンカー 一覧 ＆ キーワード検索     */}
        {/* ========================================================= */}
        {activeTab === "stalls" && (
          <div className="space-y-4">
            {/* カテゴリ切替 */}
            <div className="grid grid-cols-5 gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
              <button
                onClick={() => setSelectedCategory("すべて")}
                className={`flex flex-col items-center justify-center py-2 rounded-xl text-[11px] font-bold transition ${
                  selectedCategory === "すべて"
                    ? "bg-slate-800 text-white shadow"
                    : "text-slate-400 hover:bg-slate-900"
                }`}
              >
                <Store className="w-4 h-4 mb-0.5" />
                全体
              </button>

              <button
                onClick={() => setSelectedCategory("模擬店")}
                className={`flex flex-col items-center justify-center py-2 rounded-xl text-[11px] font-bold transition ${
                  selectedCategory === "模擬店"
                    ? "bg-blue-600 text-white shadow"
                    : "text-blue-400 hover:bg-slate-900"
                }`}
              >
                <Utensils className="w-4 h-4 mb-0.5" />
                模擬店
              </button>

              <button
                onClick={() => setSelectedCategory("クラス企画")}
                className={`flex flex-col items-center justify-center py-2 rounded-xl text-[11px] font-bold transition ${
                  selectedCategory === "クラス企画"
                    ? "bg-purple-600 text-white shadow"
                    : "text-purple-400 hover:bg-slate-900"
                }`}
              >
                <Sparkles className="w-4 h-4 mb-0.5" />
                企画
              </button>

              <button
                onClick={() => setSelectedCategory("キッチンカー")}
                className={`flex flex-col items-center justify-center py-2 rounded-xl text-[11px] font-bold transition ${
                  selectedCategory === "キッチンカー"
                    ? "bg-amber-500 text-slate-950 shadow"
                    : "text-amber-400 hover:bg-slate-900"
                }`}
              >
                <Truck className="w-4 h-4 mb-0.5" />
                🚚 車
              </button>

              <button
                onClick={() => setSelectedCategory("お気に入り")}
                className={`flex flex-col items-center justify-center py-2 rounded-xl text-[11px] font-bold transition ${
                  selectedCategory === "お気に入り"
                    ? "bg-rose-600 text-white shadow"
                    : "text-rose-400 hover:bg-slate-900"
                }`}
              >
                <Heart className="w-4 h-4 mb-0.5" />
                キープ ({favorites.length})
              </button>
            </div>

            {/* 検索バー */}
            <div className="relative">
              <Search className="absolute left-3.5 top-3 text-slate-500 w-4 h-4" />
              <input
                type="text"
                placeholder="店名、メニュー、場所などで検索 (例: ラーメン, 体育館, お化け屋敷)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 bg-slate-950 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 text-xs font-medium text-white shadow"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-3 text-slate-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* 学年・学科サブフィルター */}
            <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2.5">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400 font-bold w-12 text-[11px] shrink-0">学年</span>
                <div className="flex gap-1 flex-wrap">
                  {["すべて", "1年", "2年", "3年", "4年", "外部", "部活"].map((g) => (
                    <button
                      key={g}
                      onClick={() => setSelectedGrade(g)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition ${
                        selectedGrade === g
                          ? "bg-cyan-500 text-slate-950"
                          : "bg-slate-900 text-slate-400 hover:bg-slate-800"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs pt-2 border-t border-slate-900">
                <span className="text-slate-400 font-bold w-12 text-[11px] shrink-0">学科</span>
                <div className="flex gap-1 flex-wrap">
                  {["すべて", "機械", "電気", "情報", "物質"].map((d) => (
                    <button
                      key={d}
                      onClick={() => setSelectedDept(d)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition ${
                        selectedDept === d
                          ? "bg-blue-600 text-white"
                          : "bg-slate-900 text-blue-400 hover:bg-slate-800"
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
                <span className="text-xs font-bold text-slate-400">
                  該当結果: <strong className="text-white font-extrabold">{filteredStalls.length}</strong> 件
                </span>
              </div>

              {filteredStalls.length === 0 ? (
                <div className="bg-slate-950 p-8 rounded-3xl text-center text-slate-500 font-bold text-xs border border-slate-800 space-y-2">
                  <div className="text-3xl">🔍</div>
                  <p>条件に一致する模擬店・企画が見つかりませんでした。</p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("すべて");
                      setSelectedGrade("すべて");
                      setSelectedDept("すべて");
                    }}
                    className="mt-2 px-4 py-2 bg-slate-800 text-white rounded-full text-xs font-bold"
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
                      className="bg-slate-950 rounded-2xl p-4 border border-slate-800 hover:border-cyan-500/50 transition cursor-pointer relative overflow-hidden group shadow-md"
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="w-13 h-13 rounded-2xl bg-slate-900 flex items-center justify-center text-3xl shrink-0 border border-slate-800 group-hover:scale-105 transition">
                          {item.icon}
                        </div>

                        <div className="flex-1 space-y-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span
                              className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                                item.category === "模擬店"
                                  ? "bg-blue-600 text-white"
                                  : item.category === "クラス企画"
                                  ? "bg-purple-600 text-white"
                                  : "bg-amber-500 text-slate-950"
                              }`}
                            >
                              {item.category}
                            </span>

                            <span className="bg-slate-900 text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-800">
                              {item.subcategory}
                            </span>

                            <span className="text-[11px] font-extrabold text-cyan-400 ml-auto flex items-center gap-0.5">
                              <MapPin className="w-3 h-3 text-rose-500" />
                              {item.location}
                            </span>
                          </div>

                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-black text-base text-white truncate">
                              {item.title}
                            </h3>

                            <button
                              onClick={(e) => toggleFavorite(item.id, e)}
                              className="p-1.5 hover:bg-slate-900 rounded-full transition shrink-0"
                            >
                              <Heart
                                className={`w-5 h-5 transition ${
                                  isFav
                                    ? "fill-rose-500 text-rose-500 scale-110"
                                    : "text-slate-600 hover:text-slate-400"
                                }`}
                              />
                            </button>
                          </div>

                          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>

                          {item.instagram && (
                            <div className="pt-2 flex items-center gap-2">
                              <a
                                href={item.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white text-xs font-extrabold shadow hover:opacity-95 transition"
                              >
                                <Instagram className="w-3.5 h-3.5" />
                                <span>公式Instagram</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-slate-900 flex items-center justify-between text-xs font-semibold text-slate-400">
                        <span className="bg-slate-900 px-2 py-0.5 rounded text-[11px]">
                          主催: {item.dept} ({item.grade})
                        </span>
                        <span className="text-cyan-400 font-bold flex items-center gap-0.5 group-hover:translate-x-1 transition">
                          詳細をみる <ChevronRight className="w-3.5 h-3.5" />
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
        {/* TAB 3: イベントステージ タイムテーブル                    */}
        {/* ========================================================= */}
        {activeTab === "events" && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 rounded-3xl p-5 text-white shadow-xl border border-slate-800 space-y-1">
              <span className="text-[10px] font-black tracking-widest text-cyan-400 uppercase">
                STAGE PROGRAM
              </span>
              <h2 className="text-xl font-black">2026.10.24 (土) タイムスケジュール</h2>
              <p className="text-xs text-slate-300">
                第一体育館メインステージ ＆ 中庭サブステージの全ライブプログラム
              </p>
            </div>

            {EVENTS_DATA.map((stage) => (
              <div key={stage.stageId} className="space-y-3">
                <div className="bg-slate-950 p-4 rounded-3xl border border-slate-800 shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${stage.badgeColor}`} />
                      <h3 className="font-black text-base text-white">{stage.stageName}</h3>
                    </div>
                    <span className="text-xs font-extrabold text-cyan-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                      📍 {stage.location}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1.5 font-medium">{stage.note}</p>
                </div>

                <div className="space-y-3 pl-2 border-l-2 border-cyan-500/40 ml-3">
                  {stage.schedule.map((item) => (
                    <div
                      key={item.id}
                      className="bg-slate-950 p-4 rounded-2xl border border-slate-800 shadow relative ml-3 hover:border-cyan-500/50 transition space-y-2"
                    >
                      <div className="absolute -left-[25px] top-5 w-4 h-4 rounded-full bg-cyan-500 border-4 border-slate-900 shadow" />

                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1 font-black text-xs text-slate-950 bg-cyan-400 px-2.5 py-0.5 rounded-full">
                          <Clock className="w-3.5 h-3.5" />
                          {item.time}
                        </span>

                        <span className="text-[11px] font-bold text-slate-300 bg-slate-900 px-2.5 py-0.5 rounded border border-slate-800">
                          {item.tag}
                        </span>
                      </div>

                      <div className="flex items-start gap-2.5 pt-1">
                        <span className="text-2xl shrink-0">{item.icon}</span>
                        <div>
                          <h4 className="font-black text-base text-white leading-snug">
                            {item.title}
                          </h4>
                          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-900 text-xs font-bold text-slate-400 flex justify-between">
                        <span>出演: {item.org}</span>
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
        {/* TAB 4: ご案内・各種注意事項                                */}
        {/* ========================================================= */}
        {activeTab === "guide" && (
          <div className="space-y-4">
            {/* 高専祭 公式Instagramカード */}
            <div className="bg-gradient-to-r from-purple-700 via-pink-600 to-amber-500 rounded-3xl p-5 text-white shadow-xl space-y-3 relative overflow-hidden">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl border border-white/30 shrink-0">
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
                className="w-full py-3 rounded-2xl bg-white text-purple-700 font-extrabold text-xs shadow hover:bg-slate-100 transition flex items-center justify-center gap-2"
              >
                <Instagram className="w-4 h-4" />
                <span>公式Instagramを開く</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* 注意事項 */}
            <div className="bg-slate-950 rounded-3xl p-5 border border-slate-800 shadow space-y-4">
              <h3 className="font-black text-base text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <Info className="w-5 h-5 text-cyan-400" />
                <span>ご来場者様へのご案内 ＆ 注意事項</span>
              </h3>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-900 border border-amber-500/30">
                  <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-sm shrink-0">
                    👟
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-white">上履き・スリッパのご持参</h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      校内（校舎棟・第一体育館）は全館一律で<strong className="text-amber-400">土足厳禁</strong>となっております。必ず上履き（スリッパ等）および靴袋をご持参ください。
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-900 border border-blue-500/30">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                    🚲
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-white">自転車でご来場の方</h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      正門を入って右手の指定駐輪場をご利用ください。路上駐輪は固くお断りいたします。
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                  <div className="w-9 h-9 rounded-xl bg-slate-800 text-white flex items-center justify-center font-bold text-sm shrink-0">
                    🚗
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-white">お車でご来場の方</h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      構内南側グラウンド横に臨時駐車場を設けております。台数に限りがございますので、乗り合わせでのご来場にご協力ください。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 開催概要 */}
            <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800 space-y-2 text-xs">
              <h3 className="font-black text-sm text-white mb-2">開催概要</h3>
              <div className="flex justify-between py-1.5 border-b border-slate-900">
                <span className="text-slate-400">イベント名</span>
                <span className="font-bold text-white">鶴岡高専 高専祭2026</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-900">
                <span className="text-slate-400">テーマ</span>
                <span className="font-bold text-cyan-300">熱狂の高専祭カーニバル</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-900">
                <span className="text-slate-400">日時</span>
                <span className="font-bold text-white">2026年10月24日(土) 9:30-15:30</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400">会場</span>
                <span className="font-bold text-white">鶴岡工業高等専門学校 (山形県鶴岡市)</span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================= */}
      {/* モーダルダイアログ (企画・店舗の詳細表示)                 */}
      {/* ========================================================= */}
      {modalItem && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade"
          onClick={() => setModalItem(null)}
        >
          <div
            className="bg-slate-900 w-full max-w-lg rounded-t-3xl sm:rounded-3xl p-6 space-y-4 border border-slate-800 shadow-2xl max-h-[85vh] overflow-y-auto text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-slate-950 flex items-center justify-center text-3xl shrink-0 border border-slate-800 shadow">
                  {modalItem.icon}
                </div>
                <div>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-blue-600 text-white">
                    {modalItem.category}
                  </span>
                  <h3 className="font-black text-lg text-white mt-0.5">
                    {modalItem.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-bold">
                    主催: {modalItem.dept} ({modalItem.grade})
                  </p>
                </div>
              </div>

              <button
                onClick={() => setModalItem(null)}
                className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-bold">場所・教室</span>
                <span className="font-black text-cyan-300 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                  📍 {modalItem.location}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-xs text-slate-400 mb-1">紹介文</h4>
                <p className="text-sm text-slate-200 leading-relaxed font-medium bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
                  {modalItem.description}
                </p>
              </div>

              {modalItem.menu && modalItem.menu.length > 0 && (
                <div>
                  <h4 className="font-bold text-xs text-slate-400 mb-1.5">提供メニュー・アトラクション</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {modalItem.menu.map((m, idx) => (
                      <span
                        key={idx}
                        className="bg-sky-950 text-cyan-200 border border-cyan-800 text-xs px-3 py-1 rounded-full font-bold"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {modalItem.instagram && (
                <div className="pt-2">
                  <a
                    href={modalItem.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-black text-xs shadow hover:opacity-95 transition flex items-center justify-center gap-2"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>公式Instagramで最新情報をチェック！</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={(e) => toggleFavorite(modalItem.id, e)}
                className={`flex-1 py-3 rounded-2xl font-black text-xs transition flex items-center justify-center gap-2 border ${
                  favorites.includes(modalItem.id)
                    ? "bg-rose-950 text-rose-300 border-rose-800"
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
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
                className="py-3 px-4 rounded-2xl bg-cyan-500 text-slate-950 font-black text-xs hover:bg-cyan-400 transition flex items-center justify-center gap-1.5"
              >
                <Share2 className="w-4 h-4" />
                <span>共有</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* コピー通知トースト */}
      {copiedNotification && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-950 text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-2xl z-50 flex items-center gap-2 border border-cyan-500/50 animate-fade">
          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          <span>クリップボードにコピーしました！</span>
        </div>
      )}
    </div>
  );
}