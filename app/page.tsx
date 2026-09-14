"use client";

import React, { useState, useMemo } from "react";
import {
  MapPin,
  Store,
  Calendar,
  Search,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Heart,
  Utensils,
  Truck,
  Wrench,
  Clock,
  Info,
  X,
  Share2,
  CheckCircle2,
  Compass,
  Layers,
  Car,
  Bike,
  Building2,
  Coffee,
  HelpCircle,
} from "lucide-react";

// カスタム Instagram アイコン (lucide-reactにないためビルドエラー防止)
const InstagramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

// ----------------------------------------------------------------------
// データ定義
// ----------------------------------------------------------------------

// 建屋・ゾーン定義（実際の鶴岡高専の配置に準拠）
const ZONES = [
  {
    id: "building1",
    name: "1号館（一般教室棟・管理棟）",
    shortName: "1号館",
    type: "classroom",
    description: "1年模擬店、3年・4年クラス企画、本部",
    color: "bg-blue-500 text-white border-blue-600",
    badge: "主要会場",
    floors: ["1F", "2F"],
  },
  {
    id: "foodtrucks",
    name: "学生昇降口前広場",
    shortName: "昇降口前広場",
    type: "foodtruck",
    description: "人気キッチンカー出店エリア",
    color: "bg-amber-500 text-white border-amber-600",
    badge: "キッチンカー",
    floors: ["屋外"],
  },
  {
    id: "gym1",
    name: "第一体育館",
    shortName: "第一体育館",
    type: "stage",
    description: "メインステージイベント ＆ 2年模擬店エリア",
    color: "bg-rose-500 text-white border-rose-600",
    badge: "ステージ & 2年店",
    floors: ["1F"],
  },
  {
    id: "courtyard",
    name: "中庭サブステージ",
    shortName: "中庭",
    type: "stage",
    description: "アコースティックライブ / eスポーツ会場",
    color: "bg-emerald-500 text-white border-emerald-600",
    badge: "サブステージ",
    floors: ["屋外"],
  },
  {
    id: "building7",
    name: "7号館",
    shortName: "7号館",
    type: "attraction",
    description: "3Mお化け屋敷・4Eキッキングスナイパー",
    color: "bg-purple-500 text-white border-purple-600",
    badge: "大型企画",
    floors: ["1F", "2F"],
  },
  {
    id: "media",
    name: "総合メディアセンター",
    shortName: "メディアセンター",
    type: "attraction",
    description: "4B芸能人格付けチェック",
    color: "bg-teal-500 text-white border-teal-600",
    badge: "体験企画",
    floors: ["マルチメディア教室"],
  },
  {
    id: "workshop",
    name: "3号館・機械実習工場",
    shortName: "実習工場",
    type: "academic",
    description: "ロボコン部体験・作品展示",
    color: "bg-indigo-500 text-white border-indigo-600",
    badge: "展示体験",
    floors: ["1F"],
  },
];

// 出店・企画データ
const STALLS_DATA = [
  // --- キッチンカー ---
  {
    id: "kc-1",
    title: "ラーメン もっけだの",
    category: "キッチンカー",
    course: "外部店舗",
    location: "学生昇降口前広場",
    zoneId: "foodtrucks",
    room: "屋外ブース①",
    description: "庄内名物のコク旨ラーメン！熱々の絶品ラーメンをご賞味あれ！",
    menu: ["中華そば: 800円", "特製チャーシュー麺: 1,000円"],
    instagram: "https://www.instagram.com/mokkedanonoodle/",
    handle: "@mokkedanonoodle",
    isFood: true,
    isPopular: true,
  },
  {
    id: "kc-2",
    title: "祇園はんなりCafé",
    category: "キッチンカー",
    course: "外部店舗",
    location: "学生昇降口前広場",
    zoneId: "foodtrucks",
    room: "屋外ブース②",
    description: "京都風の抹茶スイーツや濃厚ソフトクリーム、カフェドリンクをお届け！",
    menu: ["抹茶ラテ: 500円", "京都宇治抹茶ソフト: 450円", "パフェ: 650円"],
    instagram: "https://www.instagram.com/gion_hannari_cafe/",
    handle: "@gion_hannari_cafe",
    isFood: true,
    isPopular: true,
  },
  {
    id: "kc-3",
    title: "フェリチタプラス",
    category: "キッチンカー",
    course: "外部店舗",
    location: "学生昇降口前広場",
    zoneId: "foodtrucks",
    room: "屋外ブース③",
    description: "酒田発！サクサクのチュロスと絶品クレープ・ドリンクのフルコース！",
    menu: ["揚げたてチュロス: 400円", "贅沢クレープ: 550円〜"],
    instagram: "https://www.instagram.com/felicitaplus.sakata/",
    handle: "@felicitaplus.sakata",
    isFood: true,
    isPopular: true,
  },

  // --- 1年模擬店（1号館 1F）---
  {
    id: "1-1",
    title: "1-1 絶品ほっとサンド",
    category: "1年模擬店",
    course: "1年生",
    location: "1号館 1F",
    zoneId: "building1",
    room: "111教室",
    description: "外はカリッと中はトロ〜り熱々チーズのホットサンドです！",
    menu: ["ハムチーズサンド: 300円", "ツナマヨサンド: 300円"],
    isFood: true,
  },
  {
    id: "1-2",
    title: "1-2 カラフルシュワシュワドリンク",
    category: "1年模擬店",
    course: "1年生",
    location: "1号館 1F",
    zoneId: "building1",
    room: "112教室",
    description: "映える！推し色を選べるオリジナルソーダドリンクスタンド！",
    menu: ["映えカラーソーダ: 250円"],
    isFood: true,
  },
  {
    id: "1-3",
    title: "1-3 ジャンボわたあめ本舗",
    category: "1年模擬店",
    course: "1年生",
    location: "1号館 1F",
    zoneId: "building1",
    room: "121教室",
    description: "顔より大きい！？ふわふわカラフルわたあめ！",
    menu: ["レインボーわたあめ: 200円"],
    isFood: true,
  },
  {
    id: "1-4",
    title: "1-4 もちもちスイーツクレープ",
    category: "1年模擬店",
    course: "1年生",
    location: "1号館 1F",
    zoneId: "building1",
    room: "122教室",
    description: "手作り生地のもちもちクレープ！チョコバナナが一番人気！",
    menu: ["チョコバナナクレープ: 350円", "イチゴ生クリーム: 350円"],
    isFood: true,
  },

  // --- 2年模擬店（第一体育館）---
  {
    id: "2-M",
    title: "2M パリッと肉汁餃子",
    category: "2年模擬店",
    course: "機械コース",
    location: "第一体育館",
    zoneId: "gym1",
    room: "体育館ブース1",
    description: "機械コースが鉄板の温度管理にこだわって焼き上げる本格餃子！",
    menu: ["焼き餃子(5個): 400円"],
    isFood: true,
  },
  {
    id: "2-E",
    title: "2E 爆発ポップコーンFactory",
    category: "2年模擬店",
    course: "電気・電子コース",
    location: "第一体育館",
    zoneId: "gym1",
    room: "体育館ブース2",
    description: "バター醤油・塩キャラメルフレーバーの出来立てポップコーン！",
    menu: ["キャラメル/バター醤油: 250円"],
    isFood: true,
  },
  {
    id: "2-I",
    title: "2I 伝統の秘伝玉こんにゃく",
    category: "2年模擬店",
    course: "情報コース",
    location: "第一体育館",
    zoneId: "gym1",
    room: "体育館ブース3",
    description: "山形名物！味がしっかり染み込んだ熱々の玉こんにゃく！",
    menu: ["玉こんにゃく(1串): 150円"],
    isFood: true,
  },
  {
    id: "2-B",
    title: "2B 炭火風香るやきとり屋",
    category: "2年模擬店",
    course: "化学・生物コース",
    location: "第一体育館",
    zoneId: "gym1",
    room: "体育館ブース4",
    description: "ジューシーな焼き鳥！タレと塩でお好みの味を選べます。",
    menu: ["焼き鳥(3本): 350円"],
    isFood: true,
  },

  // --- 3年・4年・部活企画 ---
  {
    id: "3-M",
    title: "3M 廃病院からの脱出 (お化け屋敷)",
    category: "クラス企画",
    course: "機械コース",
    location: "7号館 1F",
    zoneId: "building7",
    room: "711・712教室",
    description: "機械コースの本気仕掛け！悲鳴必至の本格ホラーハウス。",
    isFood: false,
    isPopular: true,
  },
  {
    id: "3-E",
    title: "3E レトロレトロゲームカフェ",
    category: "クラス企画",
    course: "電気・電子コース",
    location: "1号館 1F",
    zoneId: "building1",
    room: "123教室",
    description: "電子工作で自作したアーケードゲーム機で遊べるレトロカフェ！",
    isFood: false,
  },
  {
    id: "3-I",
    title: "3I KOSEN Cyber BAR (ノンアル)",
    category: "クラス企画",
    course: "情報コース",
    location: "1号館 2F",
    zoneId: "building1",
    room: "132教室",
    description: "LEDライティングがおしゃれなサイバー空間で楽しむノンアルカクテル。",
    isFood: true,
  },
  {
    id: "3-B",
    title: "3B 科学の不思議純喫茶",
    category: "クラス企画",
    course: "化学・生物コース",
    location: "1号館 2F",
    zoneId: "building1",
    room: "133教室",
    description: "色が変わるハーブティーや実験風スイーツを楽しめる実験的カフェ！",
    isFood: true,
  },
  {
    id: "4-M",
    title: "4M 鶴高ホストクラブ 〜極上のひととき〜",
    category: "クラス企画",
    course: "機械コース",
    location: "1号館 1F",
    zoneId: "building1",
    room: "113教室",
    description: "4Mのイケメン（？）たちがスーツ姿で温かいおもてなしをお届け！",
    isFood: false,
  },
  {
    id: "4-E",
    title: "4E リアル体感！キッキングスナイパー",
    category: "クラス企画",
    course: "電気・電子コース",
    location: "7号館 2F",
    zoneId: "building7",
    room: "722教室",
    description: "動くターゲットを狙って蹴り飛ばせ！高得点者には豪華景品あり！",
    isFood: false,
  },
  {
    id: "4-I",
    title: "4I KOSEN CASINO (カジノ)",
    category: "クラス企画",
    course: "情報コース",
    location: "1号館 2F",
    zoneId: "building1",
    room: "131教室",
    description: "ブラックジャック・ルーレットでチップを増やそう！本格カジノ体験。",
    isFood: false,
  },
  {
    id: "4-B",
    title: "4B 芸能人格付けチェック to KOSEN",
    category: "クラス企画",
    course: "化学・生物コース",
    location: "総合メディアセンター",
    zoneId: "media",
    room: "マルチメディア教室",
    description: "一流高専生は誰だ！？味覚や音感の違いを見極める体験型ゲーム！",
    isFood: false,
  },
  {
    id: "club-robocon",
    title: "ロボコン部 実演＆操縦体験コーナー",
    category: "部活展示",
    course: "部活動",
    location: "3号館・機械実習工場",
    zoneId: "workshop",
    room: "実習工場 1F",
    description: "高専ロボコン出場マシンを実際に操縦できるチャンス！巨大メカの迫力を体感しよう。",
    isFood: false,
    isPopular: true,
  },
];

// ステージタイムテーブルデータ
const STAGE_TIMETABLE = [
  { time: "10:00 - 10:30", title: "オープニングセレモニー", location: "第一体育館 メインステージ", desc: "高専祭開幕宣言！吹奏楽部によるオープニング演奏" },
  { time: "10:45 - 11:45", title: "漢気！筋肉腕立て伏せ大会", location: "第一体育館 メインステージ", desc: "学科対抗の熱き筋トレバトル！" },
  { time: "12:00 - 13:00", title: "中庭アコースティックライブ", location: "中庭サブステージ", desc: "軽音部による爽やかな秋空アコースティック演奏" },
  { time: "13:15 - 14:15", title: "高専お笑いグランプリ2026", location: "第一体育館 メインステージ", desc: "学生芸人による白熱の漫才＆コント頂上決戦" },
  { time: "14:30 - 15:30", title: "eスポーツ大会 決勝戦 (スマブラ)", location: "中庭サブステージ", desc: "大画面モニターで繰り広げられる熱狂バトル！" },
  { time: "15:45 - 16:30", title: "ダンス部 パフォーマンス", location: "第一体育館 メインステージ", desc: "キレキレのダンスで体育館を揺らす！" },
  { time: "16:30 - 17:00", title: "フィナーレ ＆ 大抽選会", location: "第一体育館 メインステージ", desc: "豪華景品が当たる！感動のグランドフィナーレ" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<"map" | "stalls" | "timetable">("map");
  const [selectedZoneId, setSelectedZoneId] = useState<string | null>("building1");
  const [selectedCourse, setSelectedCourse] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedStallDetail, setSelectedStallDetail] = useState<any | null>(null);

  // お気に入り切り替え
  const toggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // フィルタリング処理
  const filteredStalls = useMemo(() => {
    return STALLS_DATA.filter((stall) => {
      const matchCourse =
        selectedCourse === "ALL" ||
        (selectedCourse === "FAV" && favorites.includes(stall.id)) ||
        stall.course === selectedCourse;
      const matchSearch =
        stall.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stall.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stall.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (stall.menu && stall.menu.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchCourse && matchSearch;
    });
  }, [selectedCourse, searchQuery, favorites]);

  // 選択中の建屋ゾーン
  const activeZoneObj = ZONES.find((z) => z.id === selectedZoneId);
  const stallsInActiveZone = STALLS_DATA.filter((s) => s.zoneId === selectedZoneId);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans pb-16 antialiased">
      {/* ------------------------------------------------------------------ */}
      {/* Header / Navbar (明るく崩れないヘッダー)                              */}
      {/* ------------------------------------------------------------------ */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center justify-between gap-2">
          {/* ブランドロゴ */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-black text-lg shadow-md shadow-blue-500/20">
              高
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 text-base leading-tight tracking-tight">
                  熱狂的高専祭 2026
                </span>
                <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap">
                  鶴岡高専
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-none mt-0.5">
                キャンパスガイド ＆ リアルタイム案内
              </p>
            </div>
          </div>

          {/* ナビゲーションタブ */}
          <nav className="flex items-center bg-slate-100 p-1 rounded-full border border-slate-200/80 shrink-0">
            <button
              onClick={() => setActiveTab("map")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === "map"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Compass className="w-3.5 h-3.5 shrink-0" />
              <span>マップ</span>
            </button>
            <button
              onClick={() => setActiveTab("stalls")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === "stalls"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Store className="w-3.5 h-3.5 shrink-0" />
              <span>企画・店舗</span>
            </button>
            <button
              onClick={() => setActiveTab("timetable")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === "timetable"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              <span>ステージ</span>
            </button>
          </nav>
        </div>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* Main Container                                                     */}
      {/* ------------------------------------------------------------------ */}
      <main className="max-w-5xl mx-auto px-3 sm:px-4 pt-4">

        {/* ================================================================ */}
        {/* TAB 1: キャンパスマップ (校内配置図)                                */}
        {/* ================================================================ */}
        {activeTab === "map" && (
          <div className="space-y-4">
            {/* セクションタイトル */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-blue-600 uppercase">
                  TSURUOKA KOSEN MAP
                </span>
                <h2 className="text-lg font-bold text-slate-900 leading-tight [word-break:keep-all]">
                  鶴岡高専 構内インタラクティブ案内図
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  建物をタップすると出展企画・出店リストを確認できます。
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 p-2 rounded-xl border border-slate-200 shrink-0">
                <Car className="w-4 h-4 text-blue-500" />
                <span>正門・駐車場：構内東側より進入</span>
              </div>
            </div>

            {/* グラフィカル校内レイアウト (マップ表示) */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
              {/* 方角指示バー */}
              <div className="bg-slate-50 rounded-xl px-3 py-2 border border-slate-200 flex items-center justify-between text-xs text-slate-600">
                <div className="flex items-center gap-2 font-medium">
                  <span className="text-base">🛣️</span>
                  <span>北側：国道345号線 / 正門アプローチ</span>
                </div>
                <span className="bg-blue-600 text-white font-extrabold px-2 py-0.5 rounded text-[10px]">
                  北 ↑
                </span>
              </div>

              {/* 構内ビジュアルマップ（グリッド構造） */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-1">
                {/* 左側：メイン校舎・昇降口・実習工場ゾーン (8列) */}
                <div className="md:col-span-8 space-y-3">
                  {/* 1号館（主要教室棟） */}
                  <div
                    onClick={() => setSelectedZoneId("building1")}
                    className={`cursor-pointer transition-all duration-200 p-4 rounded-xl border-2 relative ${
                      selectedZoneId === "building1"
                        ? "bg-blue-50 border-blue-500 shadow-md ring-2 ring-blue-400/30"
                        : "bg-white border-blue-200 hover:border-blue-400 hover:bg-blue-50/40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-blue-600" />
                        <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                          1号館（一般教室棟・管理棟）
                        </h3>
                      </div>
                      <span className="bg-blue-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                        主要会場
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      1F: 111-122 (1年模擬店) / 123 (3Eゲームカフェ) / 113 (4Mホスト)<br />
                      2F: 132 (3I BAR) / 133 (3B純喫茶) / 131 (4Iカジノ)
                    </p>
                  </div>

                  {/* 学生昇降口前広場（キッチンカー出店場所） */}
                  <div
                    onClick={() => setSelectedZoneId("foodtrucks")}
                    className={`cursor-pointer transition-all duration-200 p-4 rounded-xl border-2 relative ${
                      selectedZoneId === "foodtrucks"
                        ? "bg-amber-50 border-amber-500 shadow-md ring-2 ring-amber-400/30"
                        : "bg-amber-50/50 border-amber-200 hover:border-amber-400 hover:bg-amber-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <Truck className="w-5 h-5 text-amber-600" />
                        <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                          🚚 学生昇降口前広場
                        </h3>
                      </div>
                      <span className="bg-amber-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                        キッチンカーエリア
                      </span>
                    </div>
                    <p className="text-xs text-amber-900/90 font-medium">
                      ・ラーメン もっけだの ・祇園はんなりCafé ・フェリチタプラス
                    </p>
                  </div>

                  {/* 下部 3分割エリア：3号館・メディアセンター・7号館 */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {/* 3号館・実習工場 */}
                    <div
                      onClick={() => setSelectedZoneId("workshop")}
                      className={`cursor-pointer p-3 rounded-xl border-2 transition-all ${
                        selectedZoneId === "workshop"
                          ? "bg-indigo-50 border-indigo-500 ring-2 ring-indigo-400/30"
                          : "bg-white border-slate-200 hover:border-indigo-300"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-bold text-xs text-slate-800 mb-1">
                        <Wrench className="w-3.5 h-3.5 text-indigo-600" />
                        <span className="truncate">3号館・実習工場</span>
                      </div>
                      <p className="text-[11px] text-slate-500">ロボコン部体験</p>
                    </div>

                    {/* 総合メディアセンター */}
                    <div
                      onClick={() => setSelectedZoneId("media")}
                      className={`cursor-pointer p-3 rounded-xl border-2 transition-all ${
                        selectedZoneId === "media"
                          ? "bg-teal-50 border-teal-500 ring-2 ring-teal-400/30"
                          : "bg-white border-slate-200 hover:border-teal-300"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-bold text-xs text-slate-800 mb-1">
                        <Info className="w-3.5 h-3.5 text-teal-600" />
                        <span className="truncate">メディアセンター</span>
                      </div>
                      <p className="text-[11px] text-slate-500">4B 格付けチェック</p>
                    </div>

                    {/* 7号館 */}
                    <div
                      onClick={() => setSelectedZoneId("building7")}
                      className={`cursor-pointer p-3 rounded-xl border-2 transition-all ${
                        selectedZoneId === "building7"
                          ? "bg-purple-50 border-purple-500 ring-2 ring-purple-400/30"
                          : "bg-white border-slate-200 hover:border-purple-300"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-bold text-xs text-slate-800 mb-1">
                        <Building2 className="w-3.5 h-3.5 text-purple-600" />
                        <span className="truncate">7号館</span>
                      </div>
                      <p className="text-[11px] text-slate-500">3Mお化け屋敷 / 4E</p>
                    </div>
                  </div>
                </div>

                {/* 右側：第一体育館 ＆ 中庭サブステージ (4列) */}
                <div className="md:col-span-4 space-y-3">
                  {/* 第一体育館 */}
                  <div
                    onClick={() => setSelectedZoneId("gym1")}
                    className={`cursor-pointer transition-all p-4 rounded-xl border-2 h-auto flex flex-col justify-between ${
                      selectedZoneId === "gym1"
                        ? "bg-rose-50 border-rose-500 shadow-md ring-2 ring-rose-400/30"
                        : "bg-white border-rose-200 hover:border-rose-400 hover:bg-rose-50/30"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xl">🎪</span>
                        <span className="bg-rose-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                          メイン会場
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-base mb-1">第一体育館</h3>
                      <p className="text-xs text-slate-600 leading-relaxed mb-3">
                        ・メインステージイベント（腕立て/お笑い/ダンス）<br />
                        ・2年模擬店（餃子/ポップコーン/玉こん/焼き鳥）
                      </p>
                    </div>
                    <div className="text-[11px] font-bold text-rose-600 bg-rose-100/70 px-2.5 py-1 rounded-lg text-center">
                      タップで出展企画を確認
                    </div>
                  </div>

                  {/* 中庭サブステージ */}
                  <div
                    onClick={() => setSelectedZoneId("courtyard")}
                    className={`cursor-pointer transition-all p-3.5 rounded-xl border-2 ${
                      selectedZoneId === "courtyard"
                        ? "bg-emerald-50 border-emerald-500 ring-2 ring-emerald-400/30"
                        : "bg-white border-slate-200 hover:border-emerald-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5 font-bold text-xs text-slate-800">
                        <span>🌳</span>
                        <span>中庭サブステージ</span>
                      </div>
                      <span className="bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                        屋外
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">軽音部ライブ / eスポーツ決勝</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 選択した建屋ゾーン内の企画一覧 ( Zone Inspector ) */}
            {activeZoneObj && (
              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      SELECTED ZONE
                    </span>
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <span>{activeZoneObj.name}</span>
                      <span className="text-xs font-normal text-slate-500">
                        ({stallsInActiveZone.length}件の出展)
                      </span>
                    </h3>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${activeZoneObj.color}`}>
                    {activeZoneObj.badge}
                  </span>
                </div>

                {/* 店舗・企画カードリスト */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {stallsInActiveZone.map((stall) => (
                    <div
                      key={stall.id}
                      onClick={() => setSelectedStallDetail(stall)}
                      className="bg-slate-50 hover:bg-slate-100/80 rounded-xl p-3.5 border border-slate-200 transition-all cursor-pointer flex flex-col justify-between space-y-2 group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                              {stall.room}
                            </span>
                            <span className="text-[11px] font-bold text-slate-500">
                              {stall.course}
                            </span>
                          </div>
                          <h4 className="font-bold text-slate-900 text-sm mt-1 group-hover:text-blue-600 transition-colors">
                            {stall.title}
                          </h4>
                        </div>
                        <button
                          onClick={(e) => toggleFavorite(stall.id, e)}
                          className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors shrink-0"
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              favorites.includes(stall.id) ? "fill-rose-500 text-rose-500" : ""
                            }`}
                          />
                        </button>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {stall.description}
                      </p>

                      {/* キッチンカー専用 Instagram ボタン */}
                      {stall.instagram && (
                        <a
                          href={stall.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="mt-1 inline-flex items-center gap-1.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm hover:opacity-95 transition-opacity self-start"
                        >
                          <InstagramIcon className="w-3.5 h-3.5" />
                          <span>Instagramを見る ({stall.handle})</span>
                          <ExternalLink className="w-3 h-3 ml-0.5" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================================================================ */}
        {/* TAB 2: 企画・店舗一覧 (コース別フィルター付き)                       */}
        {/* ================================================================ */}
        {activeTab === "stalls" && (
          <div className="space-y-4">
            {/* 検索 ＆ フィルターエリア */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
              {/* 検索窓 */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="店名・料理名・キーワードで検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
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

              {/* コース指定フィルター（すべて・コース名・お気に入り） */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { id: "ALL", label: "すべて" },
                  { id: "FAV", label: `♥ お気に入り (${favorites.length})` },
                  { id: "外部店舗", label: "🚚 キッチンカー" },
                  { id: "1年生", label: "1年生" },
                  { id: "機械コース", label: "機械コース" },
                  { id: "電気・電子コース", label: "電気・電子コース" },
                  { id: "情報コース", label: "情報コース" },
                  { id: "化学・生物コース", label: "化学・生物コース" },
                ].map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedCourse(filter.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                      selectedCourse === filter.id
                        ? "bg-slate-900 text-white shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 店舗・企画カードグリッド */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredStalls.map((stall) => (
                <div
                  key={stall.id}
                  onClick={() => setSelectedStallDetail(stall)}
                  className="bg-white hover:border-blue-300 rounded-2xl p-4 border border-slate-200 shadow-sm transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="bg-blue-100 text-blue-700 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                          {stall.category}
                        </span>
                        <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-md">
                          {stall.course}
                        </span>
                      </div>
                      <button
                        onClick={(e) => toggleFavorite(stall.id, e)}
                        className="p-1 text-slate-300 hover:text-rose-500 transition-colors shrink-0"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            favorites.includes(stall.id) ? "fill-rose-500 text-rose-500" : ""
                          }`}
                        />
                      </button>
                    </div>

                    <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors leading-snug">
                      {stall.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {stall.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-slate-500 font-medium truncate">
                      <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      <span className="truncate">
                        {stall.location} ({stall.room})
                      </span>
                    </div>

                    {/* キッチンカーInstagramボタン */}
                    {stall.instagram ? (
                      <a
                        href={stall.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-[11px] px-2.5 py-1 rounded-lg hover:opacity-90 transition-opacity shrink-0"
                      >
                        <InstagramIcon className="w-3.5 h-3.5" />
                        <span>Instagram</span>
                      </a>
                    ) : (
                      <span className="text-blue-600 font-bold flex items-center gap-0.5 shrink-0">
                        詳細 <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {filteredStalls.length === 0 && (
              <div className="bg-white rounded-2xl p-8 text-center text-slate-400 space-y-2 border border-slate-200">
                <HelpCircle className="w-8 h-8 mx-auto text-slate-300" />
                <p className="text-xs">該当する企画・店舗が見つかりませんでした。</p>
              </div>
            )}
          </div>
        )}

        {/* ================================================================ */}
        {/* TAB 3: ステージタイムテーブル                                      */}
        {/* ================================================================ */}
        {activeTab === "timetable" && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
              <span className="text-[10px] font-bold tracking-widest text-rose-600 uppercase">
                STAGE SCHEDULE
              </span>
              <h2 className="text-lg font-bold text-slate-900 leading-tight">
                体育館・中庭ステージ タイムテーブル
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                第一体育館メインステージと中庭サブステージの全演目スケジュール
              </p>
            </div>

            <div className="space-y-3">
              {STAGE_TIMETABLE.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-rose-300 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-rose-50 text-rose-700 font-black text-xs px-3 py-2 rounded-xl border border-rose-200 shrink-0 text-center min-w-[100px]">
                      <Clock className="w-3.5 h-3.5 mx-auto mb-0.5 text-rose-500" />
                      {item.time}
                    </div>
                    <div>
                      <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mb-1">
                        📍 {item.location}
                      </span>
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* ------------------------------------------------------------------ */}
      {/* 店舗・企画 詳細モーダル                                              */}
      {/* ------------------------------------------------------------------ */}
      {selectedStallDetail && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4 relative animate-in fade-in zoom-in duration-200">
            {/* 閉じるボタン */}
            <button
              onClick={() => setSelectedStallDetail(null)}
              className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* モーダルヘッダー */}
            <div className="space-y-1 pr-8">
              <div className="flex items-center gap-2">
                <span className="bg-blue-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                  {selectedStallDetail.category}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  {selectedStallDetail.course}
                </span>
              </div>
              <h3 className="text-xl font-black text-slate-900 leading-snug">
                {selectedStallDetail.title}
              </h3>
            </div>

            {/* 場所・場所アイコン */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 flex items-center gap-2 text-xs font-medium text-slate-700">
              <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
              <span>
                場所: {selectedStallDetail.location} ({selectedStallDetail.room})
              </span>
            </div>

            {/* 説明 */}
            <p className="text-xs text-slate-600 leading-relaxed">
              {selectedStallDetail.description}
            </p>

            {/* メニューリスト（飲食のみ） */}
            {selectedStallDetail.menu && (
              <div className="bg-amber-50/60 p-3.5 rounded-xl border border-amber-200 space-y-1.5">
                <h4 className="text-xs font-bold text-amber-900 flex items-center gap-1">
                  <Utensils className="w-3.5 h-3.5 text-amber-600" />
                  <span>提供メニュー例</span>
                </h4>
                <ul className="text-xs text-amber-950 space-y-0.5 pl-4 list-disc">
                  {selectedStallDetail.menu.map((m: string, i: number) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Instagramダイレクトリンク（キッチンカー） */}
            {selectedStallDetail.instagram && (
              <a
                href={selectedStallDetail.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xs py-3 rounded-xl shadow-md hover:opacity-90 transition-opacity w-full"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>Instagram公式ページを開く ({selectedStallDetail.handle})</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {/* アクション */}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={(e) => toggleFavorite(selectedStallDetail.id, e)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${
                  favorites.includes(selectedStallDetail.id)
                    ? "bg-rose-50 border-rose-200 text-rose-600"
                    : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${
                    favorites.includes(selectedStallDetail.id)
                      ? "fill-rose-500 text-rose-500"
                      : ""
                  }`}
                />
                <span>
                  {favorites.includes(selectedStallDetail.id)
                    ? "お気に入りから外す"
                    : "お気に入りに追加"}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}