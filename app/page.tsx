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
  ArrowRight,
  Cog,
  Cpu,
  Zap,
  Code,
  Bot,
  Terminal,
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
// データ定義 (コース名修正、キッチンカーInstagramリンク追加)
// ----------------------------------------------------------------------

// 建屋・ゾーン定義
const ZONES = [
  { id: "building1", name: "1号館（一般教室棟・管理棟）", shortName: "1号館", type: "classroom", description: "1年模擬店、3年・4年クラス企画、本部", color: "bg-blue-100 text-blue-900 border-blue-300", badge: "主要会場", floors: ["1F", "2F"] },
  { id: "foodtrucks", name: "学生昇降口前広場", shortName: "昇降口前広場", type: "foodtruck", description: "人気キッチンカー出店エリア", color: "bg-amber-100 text-amber-900 border-amber-300", badge: "キッチンカー", floors: ["屋外"] },
  { id: "gym1", name: "第一体育館", shortName: "第一体育館", type: "stage", description: "メインステージイベント ＆ 2年模擬店エリア", color: "bg-rose-100 text-rose-900 border-rose-300", badge: "ステージ & 2年店", floors: ["1F"] },
  { id: "courtyard", name: "中庭サブステージ", shortName: "中庭", type: "stage", description: "アコースティックライブ / eスポーツ会場", color: "bg-emerald-100 text-emerald-900 border-emerald-300", badge: "サブステージ", floors: ["屋外"] },
  { id: "building7", name: "7号館", shortName: "7号館", type: "attraction", description: "3Mお化け屋敷・4Eキッキングスナイパー", color: "bg-purple-100 text-purple-900 border-purple-300", badge: "大型企画", floors: ["1F", "2F"] },
  { id: "media", name: "総合メディアセンター", shortName: "メディアセンター", type: "attraction", description: "4B芸能人格付けチェック", color: "bg-teal-100 text-teal-900 border-teal-300", badge: "体験企画", floors: ["マルチメディア教室"] },
  { id: "workshop", name: "3号館・機械実習工場", shortName: "実習工場", type: "academic", description: "ロボコン部体験・作品展示", color: "bg-indigo-100 text-indigo-900 border-indigo-300", badge: "展示体験", floors: ["1F"] },
];

// 出店・企画データ
const STALLS_DATA = [
  // --- キッチンカー ---
  { id: "kc-1", title: "ラーメン もっけだの", category: "キッチンカー", course: "外部店舗", location: "学生昇降口前広場", zoneId: "foodtrucks", room: "屋外ブース①", description: "庄内名物のコク旨ラーメン！熱々の絶品ラーメンをご賞味あれ！", menu: ["中華そば: 800円", "特製チャーシュー麺: 1,000円"], instagram: "https://www.instagram.com/mokkedanonoodle/", handle: "@mokkedanonoodle", isFood: true, isPopular: true },
  { id: "kc-2", title: "祇園はんなりCafé", category: "キッチンカー", course: "外部店舗", location: "学生昇降口前広場", zoneId: "foodtrucks", room: "屋外ブース②", description: "京都風の抹茶スイーツや濃厚ソフトクリーム、カフェドリンクをお届け！", menu: ["抹茶ラテ: 500円", "京都宇治抹茶ソフト: 450円", "パフェ: 650円"], instagram: "https://www.instagram.com/gion_hannari_cafe/", handle: "@gion_hannari_cafe", isFood: true, isPopular: true },
  { id: "kc-3", title: "フェリチタプラス", category: "キッチンカー", course: "外部店舗", location: "学生昇降口前広場", zoneId: "foodtrucks", room: "屋外ブース③", description: "酒田発！サクサクのチュロスと絶品クレープ・ドリンクのフルコース！", menu: ["揚げたてチュロス: 400円", "贅沢クレープ: 550円〜"], instagram: "https://www.instagram.com/felicitaplus.sakata/", handle: "@felicitaplus.sakata", isFood: true, isPopular: true },
  // --- 模擬店 ---
  { id: "1-1", title: "1-1 絶品ほっとサンド", category: "1年模擬店", course: "1年生", location: "1号館 1F", zoneId: "building1", room: "111教室", description: "外はカリッと中はトロ〜り熱々チーズのホットサンドです！", isFood: true },
  { id: "1-2", title: "1-2 カラフルシュワシュワドリンク", category: "1年模擬店", course: "1年生", location: "1号館 1F", zoneId: "building1", room: "112教室", description: "映える！推し色を選べるオリジナルソーダドリンクスタンド！", isFood: true },
  { id: "1-3", title: "1-3 ジャンボわたあめ本舗", category: "1年模擬店", course: "1年生", location: "1号館 1F", zoneId: "building1", room: "121教室", description: "顔より大きい！？ふわふわカラフルわたあめ！", isFood: true },
  { id: "1-4", title: "1-4 もちもちスイーツクレープ", category: "1年模擬店", course: "1年生", location: "1号館 1F", zoneId: "building1", room: "122教室", description: "手作り生地のもちもちクレープ！チョコバナナが一番人気！", isFood: true },
  { id: "2-M", title: "2M パリッと肉汁餃子", category: "2年模擬店", course: "機械コース", location: "第一体育館", zoneId: "gym1", room: "体育館ブース1", description: "機械コースが鉄板の温度管理にこだわって焼き上げる本格餃子！", isFood: true },
  { id: "2-E", title: "2E 爆発ポップコーンFactory", category: "2年模擬店", course: "電気・電子コース", location: "第一体育館", zoneId: "gym1", room: "体育館ブース2", description: "バター醤油・塩キャラメルフレーバーの出来立てポップコーン！", isFood: true },
  { id: "2-I", title: "2I 伝統の秘伝玉こんにゃく", category: "2年模擬店", course: "情報コース", location: "第一体育館", zoneId: "gym1", room: "体育館ブース3", description: "山形名物！味がしっかり染み込んだ熱々の玉こんにゃく！", isFood: true },
  { id: "2-B", title: "2B 炭火風香るやきとり屋", category: "2年模擬店", course: "化学・生物コース", location: "第一体育館", zoneId: "gym1", room: "体育館ブース4", description: "ジューシーな焼き鳥！タレと塩でお好みの味を選べます。", isFood: true },
  // --- 企画・部活 ---
  { id: "3-M", title: "3M 廃病院からの脱出 (お化け屋敷)", category: "クラス企画", course: "機械コース", location: "7号館 1F", zoneId: "building7", room: "711・712教室", description: "機械コースの本気仕掛け！悲鳴必至の本格ホラーハウス。", isPopular: true },
  { id: "3-E", title: "3E レトロレトロゲームカフェ", category: "クラス企画", course: "電気・電子コース", location: "1号館 1F", zoneId: "building1", room: "123教室", description: "電子工作で自作したアーケードゲーム機で遊べるレトロカフェ！" },
  { id: "3-I", title: "3I KOSEN Cyber BAR (ノンアル)", category: "クラス企画", course: "情報コース", location: "1号館 2F", zoneId: "building1", room: "132教室", description: "LEDライティングがおしゃれなサイバー空間で楽しむノンアルカクテル。", isFood: true },
  { id: "3-B", title: "3B 科学の不思議純喫茶", category: "クラス企画", course: "化学・生物コース", location: "1号館 2F", zoneId: "building1", room: "133教室", description: "色が変わるハーブティーや実験風スイーツを楽しめる実験的カフェ！", isFood: true },
  { id: "4-M", title: "4M 鶴高ホストクラブ 〜極上のひととき〜", category: "クラス企画", course: "機械コース", location: "1号館 1F", zoneId: "building1", room: "113教室", description: "4Mのイケメン（？）たちがスーツ姿で温かいおもてなしをお届け！" },
  { id: "4-E", title: "4E リアル体感！キッキングスナイパー", category: "クラス企画", course: "電気・電子コース", location: "7号館 2F", zoneId: "building7", room: "722教室", description: "動くターゲットを狙って蹴り飛ばせ！高得点者には豪華景品あり！" },
  { id: "4-I", title: "4I KOSEN CASINO (カジノ)", category: "クラス企画", course: "情報コース", location: "1号館 2F", zoneId: "building1", room: "131教室", description: "ブラックジャック・ルーレットでチップを増やそう！本格カジノ体験。" },
  { id: "4-B", title: "4B 芸能人格付けチェック to KOSEN", category: "クラス企画", course: "化学・生物コース", location: "総合メディアセンター", zoneId: "media", room: "マルチメディア教室", description: "一流高専生は誰だ！？味覚や音感の違いを見極める体験型ゲーム！" },
  { id: "club-robocon", title: "ロボコン部 実演＆操縦体験コーナー", category: "部活展示", course: "部活動", location: "3号館・機械実習工場", zoneId: "workshop", room: "実習工場 1F", description: "高専ロボコン出場マシンを実際に操縦できるチャンス！巨大メカの迫力を体感しよう。", isPopular: true },
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
  const [isEntered, setIsEntered] = useState(false); // タイトル画面の表示状態
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
        stall.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCourse && matchSearch;
    });
  }, [selectedCourse, searchQuery, favorites]);

  // 選択中の建屋ゾーン
  const stallsInActiveZone = STALLS_DATA.filter((s) => s.zoneId === selectedZoneId);

  // ------------------------------------------------------------------
  // 1. Title / Landing Screen (タイトル画面 - ポップ＆ライト)
  // ------------------------------------------------------------------
  if (!isEntered) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-950 flex flex-col items-center justify-center relative overflow-hidden px-6 text-center select-none font-sans antialiased">
        {/* CSS アニメーション定義 */}
        <style jsx global>{`
          @keyframes charPopIn {
            0% { opacity: 0; transform: translateY(22px) scale(0.7); }
            70% { opacity: 1; transform: translateY(-5px) scale(1.08); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes spinSlow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes floatSlow {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-12px) rotate(6deg); }
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
            animation: spinSlow 14s linear infinite;
          }
          .animate-float-icon {
            animation: floatSlow 4s ease-in-out infinite;
          }
          .animate-float-delayed {
            animation: floatSlow 5s ease-in-out 2s infinite;
          }
        `}</style>

        {/* 背景装飾（浮遊する工学モチーフアイコン） */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none opacity-20">
          <div className="absolute top-8 -left-8 text-blue-500 animate-spin-gear"><Cog className="w-32 h-32" /></div>
          <div className="absolute top-28 left-16 text-indigo-400 animate-spin-gear" style={{ animationDirection: "reverse", animationDuration: "18s" }}><Cog className="w-16 h-16" /></div>
          <div className="absolute top-12 right-6 text-sky-400 animate-float-icon"><Cpu className="w-16 h-16" /></div>
          <div className="absolute top-36 right-24 text-blue-300 animate-float-delayed"><Zap className="w-9 h-9" /></div>
          <div className="absolute bottom-24 left-6 text-indigo-400 animate-float-delayed"><Code className="w-14 h-14" /></div>
          <div className="absolute bottom-40 left-20 text-sky-400 animate-float-icon"><Terminal className="w-10 h-10" /></div>
          <div className="absolute bottom-12 -right-6 text-blue-500 animate-spin-gear" style={{ animationDuration: "22s" }}><Cog className="w-28 h-28" /></div>
          <div className="absolute bottom-32 right-16 text-indigo-400 animate-float-icon"><Bot className="w-12 h-12" /></div>
          <div className="absolute bottom-10 right-28 text-sky-300 animate-float-delayed"><Wrench className="w-8 h-8 -rotate-45" /></div>
        </div>

        {/* サブタイトル */}
        <p className="animate-fade text-xs sm:text-sm tracking-[0.2em] text-blue-700 mb-3 uppercase drop-shadow z-10" style={{ animationDelay: "0.1s" }}>
          KOSEN FESTIVAL 2026
        </p>

        {/* メインタイトル（1文字ずつポップイン） */}
        <h1 className="flex flex-col items-center justify-center tracking-wide mb-10 z-10">
          <div className="text-3xl sm:text-5xl text-slate-900 drop-shadow-[0_4px_12px_rgba(0,0,0,0.2)] flex justify-center gap-1 font-extrabold">
            {"熱狂の".split("").map((char, index) => (
              <span key={index} className="animate-char inline-block" style={{ animationDelay: `${0.25 + index * 0.1}s` }}>{char}</span>
            ))}
          </div>
          <div className="relative inline-block text-center mt-2">
            <div className="text-5xl sm:text-7xl text-blue-600 drop-shadow-[0_0_20px_rgba(37,99,235,0.4)] flex justify-center gap-1 font-black">
              {"高専祭".split("").map((char, index) => (
                <span key={index} className="animate-char inline-block" style={{ animationDelay: `${0.6 + index * 0.12}s` }}>{char}</span>
              ))}
            </div>
            <div className="text-base sm:text-2xl tracking-[0.25em] text-indigo-500 mt-2 drop-shadow flex justify-center gap-1 font-bold">
              {"カーニバル".split("").map((char, index) => (
                <span key={index} className="animate-char inline-block" style={{ animationDelay: `${1.0 + index * 0.08}s` }}>{char}</span>
              ))}
            </div>
          </div>
        </h1>

        {/* 日時＆場所 */}
        <div className="animate-fade bg-white backdrop-blur-md border border-slate-200 shadow-lg shadow-blue-500/10 rounded-full px-6 py-3 flex flex-wrap items-center justify-center gap-2.5 mb-10 text-xs sm:text-sm font-bold text-slate-800 z-10" style={{ animationDelay: "1.5s" }}>
          <span className="text-blue-700">10/24 [SAT]</span>
          <span className="text-slate-300">|</span>
          <span>9:30〜17:00</span>
          <span className="text-slate-300">|</span>
          <span className="text-indigo-600">@鶴岡高専</span>
        </div>

        {/* 入場ボタン */}
        <div className="animate-fade z-10" style={{ animationDelay: "1.7s" }}>
          <button
            onClick={() => setIsEntered(true)}
            className="w-64 sm:w-72 py-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg tracking-wider font-extrabold shadow-lg shadow-blue-500/40 hover:shadow-xl hover:shadow-blue-500/60 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2.5 border-2 border-white/50"
          >
            入場する 🎉
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* フッター補足 */}
        <p className="animate-fade mt-6 text-xs text-slate-500 font-medium z-10" style={{ animationDelay: "1.9s" }}>
          タップしてキャンパス案内図＆催しをチェック！
        </p>
      </div>
    );
  }

  // ------------------------------------------------------------------
  // 2. Main App Screen (メイン画面 - マップ・企画一覧・タイムスケジュール)
  // ------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 pb-16 font-sans antialiased">
      {/* ------------------------------------------------------------------ */}
      {/* Header / Navbar                                                     */}
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
                      <span className="bg-amber-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full大変申し訳ございません！以前のデプロイエラーの修正対応時に、タイトル画面の表示ロジック（`if (!isEntered)`）が脱落してしまっていました。

以前の「ポップで工学・テクノロジー感のあるアニメーション（歯車のゆっくり回転、アイコンのふわふわ浮遊）」の演出を再現しつつ、ご要望にあった「明るい配色（ライトモード）」でタイトル画面を再実装した全体のコードです。

---

### `src/app/page.tsx` 全体コード

このコードをそのまま `src/app/page.tsx` に貼り付けてください。タイトル画面から入場し、明るめのカラーテーマになった構内図マップや企画一覧に滑らかに遷移するWebアプリが完成します。

```tsx
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
  ArrowRight,
  Cog,
  Cpu,
  Zap,
  Code,
  Bot,
  Terminal,
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

// 建屋・ゾーン定義
const ZONES = [
  { id: "building1", name: "1号館（一般教室棟・管理棟）", shortName: "1号館", type: "classroom", description: "1年模擬店、3年・4年クラス企画、本部", color: "bg-blue-100 text-blue-900 border-blue-300", badge: "主要会場", floors: ["1F", "2F"] },
  { id: "foodtrucks", name: "学生昇降口前広場", shortName: "昇降口前広場", type: "foodtruck", description: "人気キッチンカー出店エリア", color: "bg-amber-100 text-amber-900 border-amber-300", badge: "キッチンカー", floors: ["屋外"] },
  { id: "gym1", name: "第一体育館", shortName: "第一体育館", type: "stage", description: "メインステージイベント ＆ 2年模擬店エリア", color: "bg-rose-100 text-rose-900 border-rose-300", badge: "ステージ & 2年店", floors: ["1F"] },
  { id: "courtyard", name: "中庭サブステージ", shortName: "中庭", type: "stage", description: "アコースティックライブ / eスポーツ会場", color: "bg-emerald-100 text-emerald-900 border-emerald-300", badge: "サブステージ", floors: ["屋外"] },
  { id: "building7", name: "7号館", shortName: "7号館", type: "attraction", description: "3Mお化け屋敷・4Eキッキングスナイパー", color: "bg-purple-100 text-purple-900 border-purple-300", badge: "大型企画", floors: ["1F", "2F"] },
  { id: "media", name: "総合メディアセンター", shortName: "メディアセンター", type: "attraction", description: "4B芸能人格付けチェック", color: "bg-teal-100 text-teal-900 border-teal-300", badge: "体験企画", floors: ["マルチメディア教室"] },
  { id: "workshop", name: "3号館・機械実習工場", shortName: "実習工場", type: "academic", description: "ロボコン部体験・作品展示", color: "bg-indigo-100 text-indigo-900 border-indigo-300", badge: "展示体験", floors: ["1F"] },
];

// 出店・企画データ
const STALLS_DATA = [
  // --- キッチンカー ---
  { id: "kc-1", title: "ラーメン もっけだの", category: "キッチンカー", course: "外部店舗", location: "学生昇降口前広場", zoneId: "foodtrucks", room: "屋外ブース①", description: "庄内名物のコク旨ラーメン！熱々の絶品ラーメンをご賞味あれ！", instagram: "[https://www.instagram.com/mokkedanonoodle/](https://www.instagram.com/mokkedanonoodle/)", handle: "@mokkedanonoodle", isFood: true },
  { id: "kc-2", title: "祇園はんなりCafé", category: "キッチンカー", course: "外部店舗", location: "学生昇降口前広場", zoneId: "foodtrucks", room: "屋外ブース②", description: "京都風の抹茶スイーツや濃厚ソフトクリーム、カフェドリンクをお届け！", instagram: "[https://www.instagram.com/gion_hannari_cafe/](https://www.instagram.com/gion_hannari_cafe/)", handle: "@gion_hannari_cafe", isFood: true },
  { id: "kc-3", title: "フェリチタプラス", category: "キッチンカー", course: "外部店舗", location: "学生昇降口前広場", zoneId: "foodtrucks", room: "屋外ブース③", description: "酒田発！サクサクのチュロスと絶品クレープ・ドリンクのフルコース！", instagram: "[https://www.instagram.com/felicitaplus.sakata/](https://www.instagram.com/felicitaplus.sakata/)", handle: "@felicitaplus.sakata", isFood: true },
  // --- 模擬店 (1年・2年) ---
  { id: "1-1", title: "1-1 絶品ほっとサンド", category: "1年模擬店", course: "1年生", location: "1号館 1F", zoneId: "building1", room: "111教室", description: "外はカリッと中はトロ〜り熱々チーズのホットサンド！", isFood: true },
  { id: "1-2", title: "1-2 カラフルソーダ", category: "1年模擬店", course: "1年生", location: "1号館 1F", zoneId: "building1", room: "112教室", description: "映える！推し色を選べるカラフルシュワシュワドリンク！", isFood: true },
  { id: "2-M", title: "2M パリッと肉汁餃子", category: "2年模擬店", course: "機械コース", location: "第一体育館", zoneId: "gym1", room: "体育館ブース1", description: "機械コースが鉄板にこだわった焼き上げる本格餃子！", isFood: true },
  { id: "2-E", title: "2E 爆発ポップコーンFactory", category: "2年模擬店", course: "電気・電子コース", location: "第一体育館", zoneId: "gym1", room: "体育館ブース2", description: "出来立て弾ける香ばしいポップコーン！", isFood: true },
  // --- クラス企画 (3年・4年・部活) ---
  { id: "3-M", title: "3M 廃病院からの脱出 (お化け屋敷)", category: "クラス企画", course: "機械コース", location: "7号館 1F", zoneId: "building7", room: "711・712教室", description: "悲鳴必至！機械コースの技術が光る本格ホラーハウス。" },
  { id: "3-E", title: "3E レトロレトロゲームカフェ", category: "クラス企画", course: "電気・電子コース", location: "1号館 1F", zoneId: "building1", room: "123教室", description: "自作アーケードゲーム機で遊べるレトロカフェ！" },
  { id: "3-I", title: "3I Cyber BAR (ノンアル)", category: "クラス企画", course: "情報コース", location: "1号館 2F", zoneId: "building1", room: "132教室", description: "LEDがおしゃれなサイバー空間で楽しむドリンク。", isFood: true },
  { id: "4-E", title: "4E リアル！キッキングスナイパー", category: "クラス企画", course: "電気・電子コース", location: "7号館 2F", zoneId: "building7", room: "722教室", description: "ターゲットを狙って蹴り飛ばせ！豪華景品あり！" },
  { id: "4-B", title: "4B 芸能人格付けチェック KOSEN版", category: "クラス企画", course: "化学・生物コース", location: "メディアセンター", zoneId: "media", room: "マルチメディア教室", description: "あなたの一流度が試される！味覚や音感の格付けチェック！" },
  { id: "club-robocon", title: "ロボコン部 マシン実演＆操縦体験", category: "部活展示", course: "部活動", location: "実習工場 1F", zoneId: "workshop", room: "実習工場", description: "巨大メカを操縦できるチャンス！迫力のロボット体験。" },
];

// ステージタイムテーブルデータ
const STAGE_TIMETABLE = [
  { time: "10:00 - 10:30", title: "オープニングセレモニー", location: "第一体育館 メインステージ", desc: "高専祭開幕！吹奏楽部によるオープニング演奏" },
  { time: "10:45 - 11:45", title: "漢気！筋肉腕立て伏せ大会", location: "第一体育館 メインステージ", desc: "学科対抗の熱き筋トレバトル！" },
  { time: "12:00 - 13:00", title: "中庭アコースティックライブ", location: "中庭サブステージ", desc: "軽音部による爽やかな秋空ライブ" },
  { time: "13:15 - 14:15", title: "高専お笑いグランプリ2026", location: "第一体育館 メインステージ", desc: "学生芸人による漫才＆コント頂上決戦" },
  { time: "14:30 - 15:30", title: "eスポーツ大会 決勝戦", location: "中庭サブステージ", desc: "大画面モニターで繰り広げられる熱狂バトル！" },
  { time: "16:30 - 17:00", title: "フィナーレ ＆ 大抽選会", location: "第一体育館 メインステージ", desc: "感動のグランドフィナーレと豪華抽選会！" },
];

export default function App() {
  const [isEntered, setIsEntered] = useState(false); // タイトル画面の表示状態
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
        stall.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCourse && matchSearch;
    });
  }, [selectedCourse, searchQuery, favorites]);

  // 選択中の建屋ゾーン内の企画
  const stallsInActiveZone = STALLS_DATA.filter((s) => s.zoneId === selectedZoneId);

  // ------------------------------------------------------------------
  // 1. Title / Landing Screen (タイトル画面 - 明るいポップモード)
  // ------------------------------------------------------------------
  if (!isEntered) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-950 flex flex-col items-center justify-center relative overflow-hidden px-6 text-center select-none font-sans antialiased">
        {/* CSS アニメーション定義 */}
        <style jsx global>{`
          @keyframes charPopIn {
            0% { opacity: 0; transform: translateY(22px) scale(0.7); }
            70% { opacity: 1; transform: translateY(-5px) scale(1.08); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes spinSlow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes floatSlow {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-12px) rotate(6deg); }
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
            animation: spinSlow 14s linear infinite;
          }
          .animate-float-icon {
            animation: floatSlow 4s ease-in-out infinite;
          }
          .animate-float-delayed {
            animation: floatSlow 5s ease-in-out 2s infinite;
          }
        `}</style>

        {/* 明るい背景装飾（浮遊するテクノロジーアイコン） */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none opacity-20">
          <div className="absolute top-8 -left-8 text-blue-500 animate-spin-gear"><Cog className="w-32 h-32"/></div>
          <div className="absolute top-28 left-16 text-indigo-400 animate-spin-gear" style={{ animationDirection: "reverse", animationDuration: "18s" }}><Cog className="w-16 h-16"/></div>
          <div className="absolute top-12 right-6 text-sky-400 animate-float-icon"><Cpu className="w-16 h-16"/></div>
          <div className="absolute top-36 right-24 text-blue-300 animate-float-delayed"><Zap className="w-9 h-9"/></div>
          <div className="absolute bottom-24 left-6 text-indigo-400 animate-float-delayed"><Code className="w-14 h-14"/></div>
          <div className="absolute bottom-40 left-20 text-sky-400 animate-float-icon"><Terminal className="w-10 h-10"/></div>
          <div className="absolute bottom-12 -right-6 text-blue-500 animate-spin-gear" style={{ animationDuration: "22s" }}><Cog className="w-28 h-28"/></div>
          <div className="absolute bottom-32 right-16 text-indigo-400 animate-float-icon"><Bot className="w-12 h-12"/></div>
          <div className="absolute bottom-10 right-28 text-sky-300 animate-float-delayed"><Wrench className="w-8 h-8 -rotate-45"/></div>
        </div>

        {/* サブタイトル */}
        <p className="animate-fade text-xs sm:text-sm tracking-[0.2em] text-blue-700 mb-3 uppercase drop-shadow z-10" style={{ animationDelay: "0.1s" }}>
          KOSEN FESTIVAL 2026
        </p>

        {/* メインタイトル（1文字ずつポップイン） */}
        <h1 className="flex flex-col items-center justify-center tracking-wide mb-10 z-10 font-extrabold">
          <div className="text-3xl sm:text-5xl text-slate-900 drop-shadow-[0_4px_12px_rgba(0,0,0,0.2)] flex justify-center gap-1">
            {"熱狂の".split("").map((char, index) => (
              <span key={index} className="animate-char inline-block" style={{ animationDelay: `${0.25 + index * 0.1}s` }}>{char}</span>
            ))}
          </div>
          <div className="relative inline-block text-center mt-2 font-black">
            <div className="text-5xl sm:text-7xl text-blue-600 drop-shadow-[0_0_20px_rgba(37,99,235,0.4)] flex justify-center gap-1">
              {"高専祭".split("").map((char, index) => (
                <span key={index} className="animate-char inline-block" style={{ animationDelay: `${0.6 + index * 0.12}s` }}>{char}</span>
              ))}
            </div>
            <div className="text-base sm:text-2xl tracking-[0.25em] text-indigo-500 mt-2 drop-shadow flex justify-center gap-1 font-bold">
              {"カーニバル".split("").map((char, index) => (
                <span key={index} className="animate-char inline-block" style={{ animationDelay: `${1.0 + index * 0.08}s` }}>{char}</span>
              ))}
            </div>
          </div>
        </h1>

        {/* 日時＆場所 */}
        <div className="animate-fade bg-white border border-slate-200 shadow-lg shadow-blue-500/10 rounded-full px-6 py-3 flex flex-wrap items-center justify-center gap-2.5 mb-10 text-xs sm:text-sm font-bold text-slate-800 z-10" style={{ animationDelay: "1.5s" }}>
          <span className="text-blue-700">10/24 [SAT]</span>
          <span className="text-slate-300">|</span>
          <span>9:30〜17:00</span>
          <span className="text-slate-300">|</span>
          <span className="text-indigo-600">@鶴岡高専</span>
        </div>

        {/* 入場ボタン */}
        <div className="animate-fade z-10" style={{ animationDelay: "1.7s" }}>
          <button
            onClick={() => setIsEntered(true)}
            className="w-64 sm:w-72 py-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg tracking-wider font-extrabold shadow-lg shadow-blue-500/40 hover:shadow-xl hover:shadow-blue-500/60 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2.5 border-2 border-white/50"
          >
            入場する 🎉
            <ArrowRight className="w-5 h-5"/>
          </button>
        </div>

        {/* フッター補足 */}
        <p className="animate-fade mt-6 text-xs text-slate-500 font-medium z-10" style={{ animationDelay: "1.9s" }}>
          タップして構内案内図＆催しをチェック！
        </p>
      </div>
    );
  }

  // ------------------------------------------------------------------
  // 2. Main App Screen (メイン画面 - 明るいテーマ)
  // ------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 pb-16 font-sans antialiased">
      {/* ------------------------------------------------------------------ */}
      {/* Header / Navbar                                                     */}
      {/* ------------------------------------------------------------------ */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md pt-3 pb-2.5 px-4 border-b border-slate-200 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
          {/* ブランドロゴ */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-black text-lg shadow-md shadow-blue-500/20">
              高
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 text-base leading-tight tracking-tight whitespace-nowrap">
                  熱狂的高専祭 2026
                </span>
                <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap">
                  鶴岡高専
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-none mt-0.5 whitespace-nowrap">
                キャンパスガイド ＆ リアルタイム案内
              </p>
            </div>
          </div>

          {/* ナビゲーションタブ */}
          <nav className="flex items-center gap-1 bg-slate-100 p-1 rounded-full border border-slate-200 shrink-0">
            {[
              { id: "map", label: "マップ", Icon: Compass },
              { id: "stalls", label: "企画・店舗", Icon: Store },
              { id: "timetable", label: "ステージ", Icon: Calendar },
            ].map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === id
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                }`}
              >
                <Icon "text-blue-600"}`} "text-white" ${activeTab="==" : ? className="{`w-3.5" h-3.5 id shrink-0/>
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* Main Container                                                     */}
      {/* ------------------------------------------------------------------ */}
      <main className="max-w-5xl mx-auto px-3 sm:px-4 pt-4">

        {/* ================================================================ */}
        {/* TAB 1: キャンパスマップ (校内配置図・ライトテーマ)                       */}
        {/* ================================================================ */}
        {activeTab === "map" && (
          <div className="space-y-4">
            {/* タイトルカード */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-blue-600 uppercase">TSURUOKA KOSEN MAP</span>
                <h2 className="text-xl font-extrabold text-slate-900 leading-tight [word-break:keep-all]">
                  鶴岡高専 構内インタラクティブ案内図
                </h2>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  建物をタップすると出展企画やライブ、キッチンカーの出店情報を確認できます。
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200 shrink-0">
                <Car className="w-4 h-4 text-blue-500"/>
                <span className="whitespace-nowrap">正門・駐車場：構内東側より進入</span>
              </div>
            </div>

            {/* グラフィカル校内レイアウト (崩れ修正済み) */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
              {/* 国道・正門 */}
              <div className="bg-slate-50 rounded-xl px-3 py-2 border border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
                <div className="flex items-center gap-2 font-medium">
                  <span className="text-base shrink-0">🛣️</span>
                  <span>北側：国道345号線 / 正門アプローチ</span>
                </div>
                <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap">北↑</span>
              </div>

              {/* 構内ビジュアルマップ */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-1">
                {/* 左側：メイン校舎・昇降口・実習工場ゾーン */}
                <div className="md:col-span-8 space-y-3">
                  {/* 1号館 */}
                  <div
                    onClick={() => setSelectedZoneId("building1")}
                    className={`cursor-pointer transition-all duration-200 p-4 rounded-2xl border-2 relative ${
                      selectedZoneId === "building1"
                        ? "bg-blue-50/50 border-blue-500 shadow-md ring-2 ring-blue-400/30"
                        : "bg-white border-blue-200 hover:border-blue-400 hover:bg-blue-50/20"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2 gap-2">
                      <div className="flex items-center gap-2 truncate">
                        <Building2 className="w-5 h-5 text-blue-600 shrink-0"/>
                        <h3 className="font-bold text-slate-900 text-sm sm:text-base whitespace-nowrap truncate">1号館（一般教室棟・管理棟）</h3>
                      </div>
                      <span className="bg-blue-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">主要会場</span>
                    </div>
                    <div className="text-xs text-slate-600 leading-relaxed space-y-0.5">
                      <p>1F: 111-122 (1年店) / 123 (3Eカフェ) / 113 (4Mホスト)</p>
                      <p>2F: 132 (3I BAR) / 133 (3B純喫茶) / 131 (4Iカジノ)</p>
                    </div>
                  </div>

                  {/* キッチンカー広場 */}
                  <div
                    onClick={() => setSelectedZoneId("foodtrucks")}
                    className={`cursor-pointer transition-all duration-200 p-4 rounded-2xl border-2 relative ${
                      selectedZoneId === "foodtrucks"
                        ? "bg-amber-50/50 border-amber-500 shadow-md ring-2 ring-amber-400/30"
                        : "bg-amber-50/20 border-amber-200 hover:border-amber-400 hover:bg-amber-50/50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5 gap-2">
                      <div className="flex items-center gap-2 truncate">
                        <Truck className="w-5 h-5 text-amber-600 shrink-0"/>
                        <h3 className="font-bold text-slate-900 text-sm sm:text-base whitespace-nowrap truncate">学生昇降口前広場</h3>
                      </div>
                      <span className="bg-amber-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">🚚 キッチンカー</span>
                    </div>